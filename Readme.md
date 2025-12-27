### frontend - vite + react application

.env: 
VITE_FRONTEND_URL=\<url for frontend\>

VITE_BASE_URL=\<url for backend without /api (just domain)\>

VITE_PROMPT_MAX_SYMBOLS=\<max symbols for initial input and propt inputs (just number)\>

for example:
VITE_BASE_URL=http://localhost:3000

### backend - nestjs application

#### what to do after build:
```
npx prisma generate
npx prisma migrate deploy
```

#### variables:
PORT=\<app port if needed, by default 3000\>

FOLDER_ID=\<id of folder in yandex cloud\>

API_TOKEN=\<api token to get access to yandex gpt lite\>

ENVIRONMENT=\<set this to prod\>

YANDEX_CLIENT_SECRET=\<client secret hat you can setup after creating application in yandex oauth\>

YANDEX_CLIENT_ID=\<client id that you can setup after creating application in yandex oauth\>

DATABASE_URL=\<database url\>
for example: 
DATABASE_URL=mysql://viox:123@127.0.0.1:3306/hehe
where 
* mysql - db provider
* viox - username
* 123 - user password
* 127.0.0.1 - host
* 3306 - db port
* hehe - db
IMPORTANT: when creating db, give user premissions to create new dbs

JWT_SECRET=\<jwt secret\>

NEW_USER_MAX_TOKENS=\<max tokens that users will receive when first being authorised\>

RETRY_COUNT=\<times to retry request to yandex gpt api\>

MAX_HISTORY_CONTEXT\<max history context to prevent token price going to the moon\>
