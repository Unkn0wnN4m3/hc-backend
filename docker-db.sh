# Test db
docker run -d --rm --name hc-db-backend -e MYSQL_ROOT_PASSWORD="super-secret" -p 3306:3306 mysql:8
