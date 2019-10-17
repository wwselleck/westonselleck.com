FROM golang:alpine AS build
RUN apk --no-cache add gcc g++ make git
WORKDIR /go/src/app
COPY . .
RUN go get ./...
RUN GOOS=linux go build -ldflags="-s -w" -o ./web-app .

FROM alpine:3.9
RUN apk --no-cache add ca-certificates
COPY --from=build /go/src/app /go
WORKDIR /go
EXPOSE 80
ENTRYPOINT /go/web-app --port 80
