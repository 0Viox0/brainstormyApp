docker pull mysql:8

docker run -d \
  --name brainstorm-mysql \
  --network host \
  -e MYSQL_ROOT_PASSWORD=123 \
  -e MYSQL_DATABASE=hehe \
  -e MYSQL_USER=viox \
  -e MYSQL_PASSWORD=123 \
  mysql:8

mysql -u root -p

GRANT ALL PRIVILEGES ON *.* TO 'viox'@'%';
