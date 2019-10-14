# https://www.digitalocean.com/community/tutorials/how-to-deploy-a-go-web-application-with-docker-and-nginx-on-ubuntu-18-04
sudo docker-compose -f nginx-proxy-compose.yaml up -d
sudo docker-compose -f go-app-compose.yaml up -d
