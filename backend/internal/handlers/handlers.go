package handlers

import (
	"encoding/json"
	"fmt"
	"io"
	"math"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"github.com/rileythomp/starbattle/backend/internal/log"
	"github.com/rileythomp/starbattle/backend/internal/logic"
)

type (
	Route struct {
		Method  string
		Path    string
		Handler gin.HandlerFunc
	}

	TokenRequest struct {
		Token string `json:"token,omitempty"`
	}

	Response struct {
		Code    int    `json:"code"`
		Token   string `json:"token,omitempty"`
		Message string `json:"message"`
	}
)

var (
	Routes = []Route{
		{
			Method:  http.MethodGet,
			Path:    "/starbattle/health",
			Handler: CheckHealth,
		},
		{
			Method:  http.MethodGet,
			Path:    "/starbattle/version",
			Handler: GetVersion,
		},
		{
			Method:  http.MethodGet,
			Path:    "/starbattle/users/:name",
			Handler: GetUserByName,
		},
		{
			Method:  http.MethodGet,
			Path:    "/starbattle/daily-game",
			Handler: GetDailyGame,
		},
	}

	upgrader = websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool {
			return r.Header.Get("Origin") == os.Getenv("ALLOW_ORIGIN")
		},
	}
)

func CheckHealth(c *gin.Context) {
	log.Infof("Received health check")
	c.String(http.StatusOK, "OK")
}

func GetVersion(c *gin.Context) {
	log.Infof("Received version request")
	info := struct {
		Name    string `json:"name"`
		Domain  string `json:"domain"`
		Version string `json:"version"`
	}{
		Name:    os.Getenv("HEROKU_APP_NAME"),
		Domain:  os.Getenv("HEROKU_APP_DEFAULT_DOMAIN_NAME"),
		Version: os.Getenv("HEROKU_RELEASE_VERSION"),
	}
	c.JSON(http.StatusOK, info)
}

func parseBody(body io.ReadCloser, v any) error {
	msg, err := io.ReadAll(body)
	if err != nil {
		return err
	}
	return json.Unmarshal(msg, v)
}

func closeConnWithMsg(conn *websocket.Conn, code int, msg string, args ...any) {
	_ = conn.WriteJSON(Response{Code: code, Message: fmt.Sprintf(msg, args...)})
	_ = conn.Close()
}

func respondWithError(c *gin.Context, code int, msg string, args ...any) {
	c.JSON(code, Response{Code: code, Message: fmt.Sprintf(msg, args...)})
}

func GetUserByName(c *gin.Context) {
	log.Infof("Received request to get user by name")

	name := c.Param("name")
	user, err := logic.GetUserByName(c, name)
	if err != nil {
		respondWithError(c, http.StatusInternalServerError, "Unable to get user by name")
		return
	}

	c.JSON(http.StatusOK, user)
}

type Cell struct {
	Row    int    `json:"row"`
	Column int    `json:"column"`
	Color  string `json:"color"`
}

func getCellColor(cell int) string {
	switch cell {
	case 0:
		return "#f3bcbd"
	case 1:
		return "#c9e2e0"
	case 2:
		return "#bcdbba"
	case 3:
		return "#b6c9dd"
	case 4:
		return "#f8e9bc"
	case 5:
		return "#dfcad9"
	case 6:
		return "#f9d2b1"
	case 7:
		return "#ffd8dc"
	default:
		return "white"
	}
}

func getBoard(boardStr string) [][]Cell {
	numCells := len(boardStr)
	length := int(math.Sqrt(float64(numCells)))
	board := [][]Cell{}
	for i := 0; i < length; i++ {
		row := []Cell{}
		for j := 0; j < length; j++ {
			row = append(row, Cell{
				Row:    i,
				Column: j,
				Color:  getCellColor(int(boardStr[i*length+j] - 'A')),
			})
		}
		board = append(board, row)
	}
	return board
}

func GetDailyGame(c *gin.Context) {
	log.Infof("Received request to get daily game")

	boardStr := "DDDDDDDDDDDBDDDDBBBBFFFFBBBFFFHHBGEEEEEHBGEGCCEHBGGGGCAHCCCCCCCC"

	board := getBoard(boardStr)

	game := struct {
		Board [][]Cell `json:"board"`
	}{
		Board: board,
	}

	c.JSON(http.StatusOK, game)
}
