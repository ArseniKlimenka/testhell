# Обновление среды с версии 6.20.7 до версии 27.12.6

## Шаги установки:
- docker compose down
- git checkout master
- git pull
- git clean -fdx
- git checkout .
- установить node 18
> протестировано на node 18.19.0
- dotnet tool restore
- npm install -g @adinsure-ops/ops-cli
- npm install --global yarn
- yarn install
- docker compose pull
- docker compose up -d
- Можно включить обновление VS Code
> ранее мы отключали обновление VS Code т.к. новая версия студии не работала с AdInsure плагином
- В VS Code необходимо нажать в меню сверху: Terminal -> Run Task... -> Install AdInsure Studio
- Для удобства работы желательно установить расширение для VS Code: `EditorConfig for VS Code`

## Для тех кто имеет локально развёрнутый сервер:
- структура папок должна выглядить так:
```
├── 📂RGSL
│   ├── 📂implementation
│   └── 📂mono
```
- перейти в папку mono
- git fetch origin
- git clean -fdx
- git checkout v27.12.6
- Download the .Net 6 runtime from official website and install it
> https://dotnet.microsoft.com/download/dotnet/6.0
- сделать build имплементации
- скопировать конфиги на сервер
- сделать build серверной части. При этом будет ошибка build-а JsonSchema. На это можно не обращать внимания.
> Будет исправлено в задаче [LJADIRDSUP-12168](https://jira.adacta-fintech.com/browse/LJADIRDSUP-12168)

## Для сред тестирования и prod:
- Произвести апгрейд базы данных по инструкции из файла `DbUpgrade_27-12-6` в папке `administration` (Выполнить non-breaking скрипты).
- Ensure Active MQ has no pending messages. Можно заранее отключить job-ы, допустим, за пол дня до начала обновления.
- update elasticsearch to 8.4.3

Если необходимо обновление с сохранением базы, то инструкция тут:
> https://www.elastic.co/guide/en/elastic-stack/8.4/upgrading-elastic-stack.html

Если база не нужна, то можно удалить старую ES и устновить новую:
> C:\ES\elasticsearch-old\bin>elasticsearch-service.bat remove
> C:\ES\elasticsearch-8.4.3\bin>elasticsearch-service.bat install

In ES settings set `xpack.security.enabled: false` in `elasticsearch.yml` file to disable security. Not recommended on production environment.
Set `action.auto_create_index: -adinsure_index,+*`
[Instruction link](https://docs.adinsure.com/27.x/administration/prerequisites/elasticsearch/)

- Обновить .NET
https://dotnet.microsoft.com/en-us/download/dotnet/6.0
Download ASP.NET Core Runtime Hosting Bundle

- Update node to version 18.19.1
remove old node
install new node
https://nodejs.org/download/release/v18.19.1/

- Upgrade of PDFReactor to 11.4. If needed.
- Open ActiveMQ broker admin portal, find virtual queue `Consumer.ActivityIndexationConsumer.VirtualTopic.AdInsure.Core.Activity.ActivityEvent` (it should suppose to have 0 active consumers) and remove it.
- Произвести апгрейд базы данных по инструкции из файла `DbUpgrade_27-12-6` в папке `administration` (Выполнить breaking скрипты).
- Обновление сервера

Update system environment variables:
```
$Env:ADINSURE_databases__Main__connectionString = <предыдущее значение>;Encrypt=False
$env:ADINSURE_SIGNALR_databases__Main__databaseProvider = MicrosoftSqlServer
$env:ADINSURE_SIGNALR_databases__Main__connectionString = <предыдущее значение>;Encrypt=False
$Env:ADINSURE_SERVER_HOME = C:\AdInsure\server
$Env:ADINSURE_IDENTITYSERVER_HOME = C:\AdInsure\IdentityServer
$Env:ADINSURE_SIGNALR_HOME = C:\AdInsure\signalr
$Env:ADINSURE_CLIENT_HOME = C:\AdInsure\client
$env:ADINSURE_SCHEDULER = C:\AdInsure\scheduler
```

Скачиваем файл `AdInsure-27.12.6`:
> https://gitlabru.adacta-fintech.ru/adinsure/package-registry/-/packages/97921

In all all scripts replace `ADINSURE_databases:Main:connectionString` to `ADINSURE_databases__Main__connectionString` if not fixed yet.

Move DB configs to destination folders.

Remove old `extensions` folder content from the server folder.

Install `Application Initialization` in the windows features.

Upgrade Scheduler:
Скачиваем файл `AdInsureScheduler-6.0.0.zip`:
> https://gitlabru.adacta-fintech.ru/adinsure/package-registry/-/packages/44772

Запускаем .\setup.ps1 -Force
Скопировать конфиги для scheduler-а

Запускаем установку:
```
.\server\setup.ps1 -Force
.\IdentityServer\setup.ps1 -Force
.\signalr\setup.ps1 -Force
.\client\setup.ps1 -Force
```

- Install SAS

https://docs.adinsure.com/27.x/administration/install-configure/configure/asset-server/asset-server-iis/
https://docs.adinsure.com/27.x/administration/install-configure/configure/server/adinsure-configuration/#configuring-webdav-for-the-static-assets-server-sas

      ADINSURE_appSettings__AdInsure__Settings__SASWebDav__BaseUrl: "http://sas:80/"
      ADINSURE_appSettings__AdInsure__Settings__SASWebDav__Password: "adinsure"
      ADINSURE_appSettings__AdInsure__Settings__SASWebDav__Username: "adinsure"

- Publish from deploy package
> pwsh ./install.ps1 -Force
> pwsh ./.build/ci/Invoke-Publish.ps1 -TargetEnvironment $TARGET_ENVIRONMENT -Force
- Check ES