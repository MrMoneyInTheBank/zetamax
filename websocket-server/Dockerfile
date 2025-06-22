FROM golang:1.24

WORKDIR /zetamax-battle

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o /battle-bin

EXPOSE 8080

CMD ["/battle-bin"]
