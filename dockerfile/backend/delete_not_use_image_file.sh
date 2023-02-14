 sudo docker rm $(sudo docker ps --filter status=exited -q)
 sudo docker image prune -a 