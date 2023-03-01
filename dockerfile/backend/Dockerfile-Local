FROM ubuntu
FROM adoptopenjdk/openjdk11

LABEL AUTHOR jonghyun <jhbaik1501@naver.com>

ARG DISABLE_CACHE
RUN apt-get update
RUN apt-get install -y git
WORKDIR /root/app
RUN git clone https://github.com/msdio/Tamago.git /root/app
RUN git checkout main
COPY application-secret.yml /root/app/backend/src/main/resources
WORKDIR /root/app/backend/
RUN chmod +x gradlew 
RUN ./gradlew build -x test
WORKDIR /root/app/backend/build/libs

CMD [ "java", "-jar", "Tamago-0.0.1-SNAPSHOT.jar"]

EXPOSE 9000