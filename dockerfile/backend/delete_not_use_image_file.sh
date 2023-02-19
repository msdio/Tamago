if [ -z $(sudo docker ps --filter status=exited -q) ]; then echo "there is nothing to remove "; 
else sudo docker rm $(sudo docker ps --filter status=exited -q); fi