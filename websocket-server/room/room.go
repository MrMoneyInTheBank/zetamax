package room

import (
	"sync"

	"github.com/gorilla/websocket"
	"github.com/matoous/go-nanoid/v2"
)

type Room struct {
	ID      string
	player1 *websocket.Conn
	player2 *websocket.Conn
}

var (
	Rooms      = map[string]*Room{}
	RoomsMutex sync.Mutex
)

func generateRoomID() string {
	for {
		roomID, err := gonanoid.New(8)
		if err == nil {
			return roomID
		}
	}
}

func CreateRoom() *Room {
	roomID := generateRoomID()

	for {
		if _, exists := Rooms[roomID]; !exists {
			break
		} else {
			roomID = generateRoomID()
		}
	}

	room := Room{ID: roomID}
	return &room
}
