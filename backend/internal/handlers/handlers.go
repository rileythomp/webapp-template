package handlers

import (
	"encoding/json"
	"fmt"
	"io"
	"math"
	"math/rand"
	"net/http"
	"os"
	"time"

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
		{
			Method:  http.MethodPost,
			Path:    "/starbattle/game",
			Handler: SaveGameResult,
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
	Row          int    `json:"row"`
	Column       int    `json:"column"`
	Color        string `json:"color"`
	BorderRight  bool   `json:"borderRight"`
	BorderBottom bool   `json:"borderBottom"`
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
				Row:          i,
				Column:       j,
				Color:        getCellColor(int(boardStr[i*length+j] - 'A')),
				BorderRight:  j < length-1 && boardStr[i*length+j] != boardStr[i*length+j+1],
				BorderBottom: i < length-1 && boardStr[i*length+j] != boardStr[(i+1)*length+j],
			})
		}
		board = append(board, row)
	}
	return board
}

var boards = []string{
	"DDDHHHHHDDDAAHHHDDDAHHEHBDCCCHEEBBBCCHEEBBBCGGEEBBBBGGEEBBBBFGGE",
	"EEEECCCCEEAEEDDGEAAEEDGGAAAAADGGAAABBDDDAFAABBDDFFFFBBBHFFFBBBBH",
	"EEEEGGGGEEEGGGGGEEEGGGHHEEBBGCCHEBBCGCCHFFBCCCAHFBBCCCDHFFFCDDDD",
	"DDDCCCHHDDBBBCHHDDDBBCHHFFDDCCHHFDDFFCCHFFFFFFGGAFFFGGGEAFFFEEEE",
	"DDDDACCCDDDDAACCDDDAAAACDDDAGGHHBDBBBGGGBBBFEEEGBBFFFFEGBBBFFEEG",
	"BBBBBBBBEBBBBBBBEEEEABBBEEEAABBCEGGGABBCDGGAAHCCDDDDAHHCDDFFAAAC",
	"DDDDDDDFDDADBFDFDDAABFFFAAAABBBFAACGGBBBAACGGGBBCCCCGHHHCCCEEEEH",
	"GGGEEEDDGEEEEEDDGGCCEDDDGGCCCDADHHCCCBAFHHCBCBAFHHHBBBFFHHHHHBBB",
	"BBBBDDDDBBBBCDDDGBHHHDDDGBBBHFFDGGGFFFFFGAGFFEEEGAGFEEEEGAAAEEEE",
	"BBBCGGGGBDCCGGAGBDDCFFAGBHDCFAAGBHDCFFAGHHDCCCAGEDDCCAAGEEEEAAAG",
}

type Game struct {
	ID              string   `json:"id"`
	Board           [][]Cell `json:"board"`
	ServerStartTime int64    `json:"-"`
	ServerEndTime   int64    `json:"-"`
	ClientStartTime int64    `json:"clientStartTime"`
	ClientEndTime   int64    `json:"clientEndTime"`
}

var games = map[string]Game{}

func GetDailyGame(c *gin.Context) {
	log.Infof("Received request to get daily game")

	board := getBoard(boards[rand.Intn(len(boards))])
	id := fmt.Sprintf("%d", rand.Intn(1000000))

	game := Game{
		ID:              id,
		Board:           board,
		ServerStartTime: time.Now().UnixMilli(),
	}
	games[id] = game

	c.JSON(http.StatusOK, game)
}

func SaveGameResult(c *gin.Context) {
	log.Infof("Received request to save game result")

	var game Game
	if err := parseBody(c.Request.Body, &game); err != nil {
		log.Errorf("Error parsing request body: %v", err)
		respondWithError(c, http.StatusBadRequest, "Invalid request body")
		return
	}
	savedGame, ok := games[game.ID]
	if !ok {
		log.Errorf("Invalid game ID: %s", game.ID)
		respondWithError(c, http.StatusBadRequest, "Invalid game ID")
		return
	}
	if len(game.Board) == 0 {
		log.Errorf("Invalid game board: %v", game.Board)
		respondWithError(c, http.StatusBadRequest, "Invalid game board")
		return
	}
	endTime := time.Now().UnixMilli()
	if math.Abs(float64((endTime-savedGame.ServerStartTime)-(game.ClientEndTime-game.ClientStartTime))) > 1000 {
		log.Errorf("Invalid game start and end times")
		respondWithError(c, http.StatusBadRequest, "Invalid game end time")
		return
	}

	c.JSON(http.StatusCreated, struct {
		Percentile  float32 `json:"percentile"`
		Duration    float32 `json:"duration"`
		Top10       int     `json:"top10"`
		MedianTime  float32 `json:"medianTime"`
		Attempts    int     `json:"attempts"`
		SuccessRate float32 `json:"successRate"`
		Leaderboard []struct {
			Name string  `json:"name"`
			Time float32 `json:"time"`
		} `json:"leaderboard"`
	}{
		Duration:    float32(game.ClientEndTime-game.ClientStartTime) / 1000,
		Percentile:  90.12,
		Top10:       4,
		MedianTime:  123.4232,
		Attempts:    456,
		SuccessRate: 88.8,
		Leaderboard: []struct {
			Name string  `json:"name"`
			Time float32 `json:"time"`
		}{
			{Name: "Riley", Time: 3.4},
			{Name: "Riley2", Time: 456.5},
			{Name: "Riley3", Time: 789},
			{Name: "Riley4", Time: 101},
			{Name: "Riley5", Time: 12.423},
			{Name: "Riley6", Time: 131},
			{Name: "Riley7", Time: 415},
			{Name: "Riley8", Time: 161},
			{Name: "Riley9", Time: 718},
			{Name: "Riley10", Time: 192},
		},
	})
}
