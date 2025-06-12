#!/bin/zsh
set -e  # Exit on errors

# Constants
IMAGE_NAME="zetamax"
CONTAINER_NAME="zetamax-test-container"

# Check if the image exists
if ! docker image inspect $IMAGE_NAME &> /dev/null; then
  echo "Image '$IMAGE_NAME' not found. Building now..."
  docker build -t $IMAGE_NAME .
  echo "Image built successfully."
else
  echo "Image '$IMAGE_NAME' already exists."
fi

# Check if a container with this name already exists
if docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
  echo "Container '$CONTAINER_NAME' already exists."
  
  # Check if it's running
  if docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    echo "Container is already running. Attaching to it..."
    docker attach $CONTAINER_NAME
  else
    echo "Container exists but is not running. Starting and attaching to it..."
    docker start -i $CONTAINER_NAME
  fi
else
  echo "Creating and starting new container '$CONTAINER_NAME'..."
  docker run -it --name $CONTAINER_NAME $IMAGE_NAME
fi
