## Local에서 Backend를 실행하는 방법
- Docker가 설치되어 있는 경우, local의 CLI를 통해 backend-run.sh를 실행하면 됩니다.

* 참조 
- window 환경에서 git bash로 실행이 되지 않는 경우, backend-run.sh 파일을 우클릭 한 후, 연결 프로그램은 Git for Window로 변환합니다.
- backend-run.sh 파일에서 실행이 되지 않는 경우, 윈도우에 경우는 backend-run-window.sh를 눌러 실행해주세요.

## 사용방법
- http://localhost:8080/swagger-ui/index.html 에 들어가 API 명세서를 확인할 수 있습니다.
- http://localhost:8080/h2-console 에 들어가 실제 요청에 대해 데이터베이스에 반영이 되었는지 H2 Database 상태를 확인해볼 수 있습니다.

# H2 데이터 베이스를 사용하는 경우 유의사항
- JDBC URL을 jdbc:h2:~/test가 아닌 **jdbc:h2:~/test2** 로 바꿔야합니다.
- 그렇지 않으면, Database "/root/test" not found 오류가 발생
