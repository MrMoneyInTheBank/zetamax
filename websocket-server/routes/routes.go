package routes

import (
	"encoding/json"
	"net/http"

	"websocket-server/room"
)

func CreateRoom(w http.ResponseWriter, req *http.Request) {
	if req.Method != http.MethodGet {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return
	} else {
		room.RoomsMutex.Lock()
		defer room.RoomsMutex.Unlock()
	}

	roomPtr := room.CreateRoom()
	room.Rooms[roomPtr.ID] = roomPtr

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	response := map[string]string{"roomID": roomPtr.ID}
	jsonResponse, err := json.Marshal(response)
	if err != nil {
		http.Error(w, "Something went wrong in json marshalling", http.StatusInternalServerError)
		return
	}

	w.Write(jsonResponse)
}

func DeleteRoom(w http.ResponseWriter, req *http.Request) {
	if req.Method != http.MethodDelete {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return
	} else if req.Header.Get("Content-Type") != "application/json" {
		http.Error(w, "Content-Type must be application/json", http.StatusUnsupportedMediaType)
		return
	} else {
		room.RoomsMutex.Lock()
		defer room.RoomsMutex.Unlock()
	}

	var requestBody struct {
		RoomID string `json:"roomID"`
	}
	if err := json.NewDecoder(req.Body).Decode(&requestBody); err != nil {
		http.Error(w, "Failed to parse JSON body", http.StatusBadRequest)
		return
	}

	roomID := requestBody.RoomID
	if roomID == "" {
		http.Error(w, "Missing room ID", http.StatusBadRequest)
		return
	}

	if _, exists := room.Rooms[roomID]; !exists {
		http.Error(w, "Room does not exist", http.StatusNotFound)
		return
	}

	delete(room.Rooms, roomID)

	w.WriteHeader(http.StatusOK)

	response := map[string]string{
		"message": "Deleted room",
	}
	jsonResponse, err := json.Marshal(response)
	if err != nil {
		http.Error(w, "Something went wrong in json marshalling", http.StatusInternalServerError)
		return
	}

	w.Write(jsonResponse)
}

func ListRooms(w http.ResponseWriter, req *http.Request) {
	if req.Method != http.MethodGet {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return
	} else {
		room.RoomsMutex.Lock()
		defer room.RoomsMutex.Unlock()
	}

	rooms := make([]string, 0)
	for roomID := range room.Rooms {
		rooms = append(rooms, roomID)
	}

	response := struct {
		RoomCount int      `json:"roomCount"`
		Rooms     []string `json:"rooms"`
	}{
		RoomCount: len(rooms),
		Rooms:     rooms,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	jsonResponse, err := json.Marshal(response)
	if err != nil {
		http.Error(w, "Something went wrong in json marshalling", http.StatusInternalServerError)
		return
	}

	w.Write(jsonResponse)
}

