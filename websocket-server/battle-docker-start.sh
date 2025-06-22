#!/bin/zsh
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
IMAGE_NAME="zetamax-battle-server-image"
CONTAINER_NAME="zetamax-battle-server-container"

# Stop container on script exit (even with Ctrl+C)
cleanup() {
  echo "[INFO] Cleaning up: stopping container '$CONTAINER_NAME'..."
  docker stop $CONTAINER_NAME > /dev/null || true
  echo "[INFO] Container stopped."
}
trap cleanup INT TERM EXIT

# Build image if it doesn't exist
if ! docker image inspect $IMAGE_NAME &> /dev/null; then
  echo "[INFO] Building image '$IMAGE_NAME'..."
  docker build -t $IMAGE_NAME "$SCRIPT_DIR"
fi

# Create container if it doesn't exist
if ! docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
  echo "[INFO] Creating container..."
  docker create \
    --name $CONTAINER_NAME \
    -p 8080:8080 \
    -v "$SCRIPT_DIR":/app \
    -w /app \
    $IMAGE_NAME
fi

# Start the container
if ! docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
  echo "[INFO] Starting container '$CONTAINER_NAME'..."
  docker start $CONTAINER_NAME > /dev/null
else
  echo "[INFO] Container already running."
fi

# Stream logs in background
echo "[INFO] Streaming logs..."
docker logs -f $CONTAINER_NAME &
LOG_PID=$!

# Wait for logs to finish (or until Ctrl+C)
wait $LOG_PID
