if [ -z $(sudo docker ps --filter status=exited -q) ]; then echo "there is nothing to remove "; 
else sudo docker rm $(sudo docker ps --filter status=exited -q); fi
if [ -z $(sudo docker images -f "dangling=true" -q) ]; then echo "Nothing to delete";
else sudo docker rmi -f $(sudo docker images -f "dangling=true" -q); fi
