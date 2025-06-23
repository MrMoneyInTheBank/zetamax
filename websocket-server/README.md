# Zetamax WebSocket Server

This directory contains a stateless, Dockerized Go server that provides persistent WebSocket and HTTP endpoints for the Zetamax game. It is designed to handle real-time multiplayer game rooms, overcoming the limitations of ephemeral, stateless Next.js serverless functions.

## Why a Separate WebSocket Server?

Next.js (and most serverless platforms) do not support persistent connections required for WebSockets, as their server instances are ephemeral and stateless. To enable real-time multiplayer features in Zetamax, this Go server is deployed as a standalone, long-lived service (e.g., on Render), and is accessed by the main app via HTTP and WebSocket protocols.

## Features

- **Room Management:** Create, list, and delete game rooms via HTTP endpoints.
- **WebSocket Support:** (Planned/Extendable) for real-time game communication between players.
- **Stateless HTTP API:** For orchestration from the main Zetamax app.
- **Dockerized:** Easy deployment to any container platform.
- **CORS Enabled:** Accepts cross-origin requests from your frontend.

## Endpoints

### HTTP

- `GET /ws/health`  
  Health check endpoint. Returns a JSON message if the server is running.

- `GET /ws/create-room`  
  Creates a new game room. Returns a unique `roomID`.

- `DELETE /ws/delete-room`  
  Deletes a room. Expects a JSON body: `{ "roomID": "..." }`.

- `GET /ws/list-rooms`  
  Lists all active room IDs.

### WebSocket

- (Planned) Endpoints for real-time game communication between players in a room.

## Project Structure

```
websocket-server/
  main.go                # Entry point, sets up HTTP routes and CORS
  Dockerfile             # Container build instructions
  battle-docker-start.sh # Local Docker run helper
  routes/                # HTTP route handlers
    routes.go
  room/                  # Room management logic
    room.go
  go.mod, go.sum         # Go module dependencies
```

## Running Locally

### Prerequisites

- [Docker](https://www.docker.com/)
- [Go](https://go.dev/) (for local development)

### Build and Run with Docker

```sh
./battle-docker-start.sh
```

This script will:
- Build the Docker image if needed
- Create and start a container
- Expose port 8080
- Stream logs to your terminal

### Manual Run (for development)

```sh
go mod download
go run main.go
```

Server will listen on `:8080`.

## Deployment

This server is designed to be deployed on platforms like [Render](https://render.com/) or any Docker-compatible host.  
- Expose port `8080`.
- Use the built Docker image or the provided Dockerfile.

## Interacting from Next.js/Frontend

- Use HTTP requests to create/list/delete rooms.
- (Planned) Use WebSocket connections for real-time gameplay.

## Extending

- Add WebSocket handlers for `/ws/join-room`, `/ws/play`, etc.
- Implement player matchmaking, game state sync, etc.

## Contributing

- See [Go contribution guidelines](https://go.dev/doc/contribute) for Go best practices.
- Please open issues or PRs for bugs, improvements, or new features. 