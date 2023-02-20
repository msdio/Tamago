docker pull redis
if [ -z $(docker ps -a -f "name=some-redis" -q) ]; then echo "null input-redis"; 
else docker stop some-redis
docker rm some-redis; fi
sleep 1
winpty docker run --name some-redis -d -p 6379:6379 redis

sleep 1

docker pull baikjonghyun/tamago-local:lastest
if [ -z $(docker ps -a -f "name=release1" -q) ]; then echo "null input-tamago-local"; 
else docker stop release1
docker rm release1; fi
sleep 1
winpty docker run -d -p 8080:9000/tcp -i --name release1 baikjonghyun/tamago:lastest