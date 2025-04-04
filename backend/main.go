package main

import (
	"flag"
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/rileythomp/webapp_template/backend/internal/auth"
	"github.com/rileythomp/webapp_template/backend/internal/handlers"
)

func main() {
	flag.Parse()
	log.SetFlags(0)

	if err := auth.SetJWTKeys(); err != nil {
		log.Fatalf("Failed to set JWT keys: %s", err)
	}

	router := gin.Default()
	if err := router.SetTrustedProxies([]string{"127.0.0.1"}); err != nil {
		log.Fatalf("Failed to set trusted proxies: %s", err)
	}
	corsConfig := cors.DefaultConfig()
	corsConfig.AllowAllOrigins = true
	corsConfig.AllowHeaders = append(corsConfig.AllowHeaders, "Access-Token")
	router.Use(cors.New(corsConfig))
	for _, route := range handlers.Routes {
		router.Handle(route.Method, route.Path, route.Handler)
	}

	port := os.Getenv("PORT")
	addr := flag.String("addr", ":"+port, "http service address")
	log.Fatal(router.Run(*addr))
}
