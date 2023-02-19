sudo docker pull baikjonghyun/tamago:lastest
if [ -z $(sudo docker ps -a -f "name=release1" -q) ]; then echo "null input"; 
else sudo docker stop release1
sudo docker rm release1; fi
sleep 3
sudo docker run -d -p 8080:9000/tcp -i --name release1 baikjonghyun/tamago:lastest