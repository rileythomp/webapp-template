package handlers

import (
	"encoding/json"
	"fmt"
	"io"
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

func GetDailyGame(c *gin.Context) {
	log.Infof("Received request to get daily game")

	game := struct {
		Board [][]int `json:"board"`
	}{
		Board: [][]int{
			{1, 2, 3, 4, 5, 6, 7, 8},
			{1, 2, 3, 4, 5, 6, 7, 8},
			{1, 2, 3, 4, 5, 6, 7, 8},
			{1, 2, 3, 4, 5, 6, 7, 8},
			{1, 2, 3, 4, 5, 6, 7, 8},
			{1, 2, 3, 4, 5, 6, 7, 8},
			{1, 2, 3, 4, 5, 6, 7, 8},
			{1, 2, 3, 4, 5, 6, 7, 8},
		},
	}

	c.JSON(http.StatusOK, game)
}
