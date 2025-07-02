## Шаги установки:
- docker compose down
- git checkout master
- git pull
- git clean -fdx
- git checkout .
- dotnet tool restore
- verify powershell 7 installed
- npm install -g @adinsure-ops/ops-cli
- npm install --global yarn
- yarn install
- docker compose pull
- docker compose up -d
- Удаляем старый плагин AdInsure Studio из VS Code
- Устанавливаем новый плагин. В VS Code необходимо нажать в меню сверху: Terminal -> Run Task... -> Install AdInsure Studio

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
- git checkout v35.4.0
- Обновляем Visual Studio 2022 до версии не ниже 17.0.3
- Ставим .NET 8 SDK
> https://dotnet.microsoft.com/en-us/download/dotnet/8.0
- делаем build имплементации
> `.\build.ps1 -Build` или через студию
- копируем конфиги для сервера
> Из папки `RGSL/implementation/conf/local/server` в папку `mono/server/AdInsure.Server/conf`
- делаем build серверной части.
```powershell
.\build.ps1 -Build -SkipBasic
 ```