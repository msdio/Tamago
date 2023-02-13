# docker build --build-arg DISABLE_CACHE=$CUR_TIME -t test:1.3 .
docker build --no-cache -t test:1.3 .
docker rm release1
docker run -p 8080:9000/tcp -i -t --name release1 test:1.3