# docker build --build-arg DISABLE_CACHE=$CUR_TIME -t test:1.3 .
sudo docker build --no-cache -t test:1.3 .
if [ -z $(sudo docker ps -a -f "name=release1" -q) ]; then echo "null input"; else sudo docker stop release1
sudo docker rm release1; fi
sudo docker run -d -p 8080:9000/tcp -i --name release1 test:1.3