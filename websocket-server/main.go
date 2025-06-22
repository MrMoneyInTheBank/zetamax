package main

import (
	"fmt"
	"net/http"

	"github.com/rs/cors"

	"websocket-server/routes"
)

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/ws/health", routes.Health)
	mux.HandleFunc("/ws/create-room", routes.CreateRoom)
	mux.HandleFunc("/ws/delete-room", routes.DeleteRoom)
	mux.HandleFunc("/ws/list-rooms", routes.ListRooms)

	handler := cors.AllowAll().Handler(mux)

	http.ListenAndServe(":8080", handler)

	fmt.Println("Hello, World!")
}
