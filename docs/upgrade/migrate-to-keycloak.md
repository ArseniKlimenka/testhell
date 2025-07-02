# Обновление среды с IdentityServer на Keycloak

## Обновление среды (без сохранения данных в БД):
- docker compose down -v
- git checkout master
- git pull
- yarn install
- docker compose pull
- docker compose up -d

## Обновление среды (c сохранения данных в БД):
- docker compose down
- git checkout master
- git pull
- yarn install
- docker compose pull

Создаём базу для keycloak:
```sql
create database keycloak
go

use keycloak
go

create login keycloak
with password = 'adinsure', check_policy = off;
go

create user keycloak
for login keycloak;
go

exec sp_addrolemember N'db_owner', N'keycloak'
go
```

> Для создания БД, необходимо зайти под учётной записью администратора. Если вы работаете с базой в docker-е, то можно зайти под записью sa Krneki123!

- docker compose up -d
- Мигрируем данные:
```node .\node_modules\@adinsure-tools\upgrade-scripts\dist\scripts\19.0.0\migrate-users.js```
   Оставляем всё по умолчанию. Указываем только user federation id = `c97980e9-0c85-4e25-9863-bbf2c90b4d5e`.

## Что ещё необходимо учитывать при переходе на keycloak
- Keycloak в отличии от Identity ссылается обратно на server. Соответственно если сервер запущен не в контейнере, то любые изменения пользователя в keycloak не будут отражены в adinsure т.к. keycloak будет ссылаться на него внутри контейнеров.
- При каждом запуске контейнеров заново накатываются настройки keycloak. Пользователь Administrator является частью этой настройки. Т.е. если вы поменяете ему, например, имя, то при сделующем запуске оно сбросится.
- docker compose up запускается значительно дольше. И даже когда он до конца отработает, то контейнер `keycloak-config` только запустится, по этому у вас сразу не получится авторизоваться в adinsure. Нужно будет подождать секунд 30 пока контейне не завершит работу.

## В postman необходимо сделать следующие изменения
```
{{IS_URI}}/realms/adinsure/protocol/openid-connect/token
Secret: VnVbvQA3Ofl5hT2naidPKHQ0dSPJMLvg
password: ptkrf123#
```
