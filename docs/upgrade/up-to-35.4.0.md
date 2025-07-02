# Обновление среды с версии 27.12.6 до версии 35.4.0

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

## Для сред тестирования и prod:
### Можно выполнить заранее перед установкой.
Его можно выполнить на рабочей среде 27-й версии заранее. Скрипты находятся в архиве с платформой тут `AdInsure-35.4.0.zip\server\database\sql\migration`.
- Скачиваем файл `AdInsure-35.4.0`:
> https://gitlabru.adacta-fintech.ru/adinsure/package-registry/-/packages/138068
- Выполняем скрипт `database\sql\migration\7.10_032.000.000_011.sql`.
> Данный скрипт выполняется очень долго. Желательно запустить на ночь.
- Ищем то что не получилось удалить предыдущим скриптом с помощью скрипта `database\sql\migration\7.10_032.000.000_012.sql`.
На среде pre-prod были найдены данные в связанной таблице `BFX.RECENT_DOCUMENT`. Удаляем их следующим запросом:
```sql
delete from BFX.RECENT_DOCUMENT where ENTITY_REF_ID in
(
select ENTITY_ID from (
  << текст запроса database\sql\migration\7.10_032.000.000_012.sql >>
) t
)
```
После удаления записей из `BFX.RECENT_DOCUMENT` необходимо повторить скрипт `database\sql\migration\7.10_032.000.000_011.sql`.
- создаём индекс: `database\sql\Schema\7.10_032.000.000_006.sql`

### Непосредственно перед установкой
- Выполняем скрипт `database\sql\migration\7.10_028.000.000_004.sql`.
- Выполняем SQL:
```sql
UPDATE BFX.ATTACHMENT_TYPE SET SYS_SOURCE_SYSTEM = 'config'
GO
UPDATE BFX.CONSTRAINT_TYPE SET SYS_SOURCE_SYSTEM = 'config'
GO
UPDATE BFX.CODE_TABLE_ITEM SET SYS_SOURCE_SYSTEM = 'config'
GO
UPDATE BFX.CODE_TABLE_ITEM_HISTORY SET SYS_SOURCE_SYSTEM = 'config'
GO
UPDATE BFX.HIERARCHICAL_CODE_TABLE_ITEM SET SYS_SOURCE_SYSTEM = 'config'
GO
UPDATE BFX.HIERARCHICAL_CODE_TABLE_ITEM_HISTORY SET SYS_SOURCE_SYSTEM = 'config'
GO
UPDATE ORG.ORGANISATION_UNIT SET SYS_SOURCE_SYSTEM = 'config'
GO
UPDATE ORG.APPLICATION_USER_GROUP SET SYS_SOURCE_SYSTEM = 'config'
GO
insert into BFX.DB_SCHEMA_VERSION values
('7.10_029.000.000_010', '7.10_029.000.000_010.sql', getdate(), null, 0, null, null, 0, 0),
('7.10_029.000.000_011', '7.10_029.000.000_011.sql', getdate(), null, 0, null, null, 0, 0),
('7.10_029.000.000_013', '7.10_029.000.000_013.sql', getdate(), null, 0, null, null, 0, 0),
('7.10_029.000.000_014', '7.10_029.000.000_014.sql', getdate(), null, 0, null, null, 0, 0),
('7.10_029.000.000_015', '7.10_029.000.000_015.sql', getdate(), null, 0, null, null, 0, 0),
('7.10_029.000.000_016', '7.10_029.000.000_016.sql', getdate(), null, 0, null, null, 0, 0),
('7.10_029.000.000_017', '7.10_029.000.000_017.sql', getdate(), null, 0, null, null, 0, 0),
('7.10_029.000.000_018', '7.10_029.000.000_018.sql', getdate(), null, 0, null, null, 0, 0)
go

-- BFX.ASSET
IF NOT EXISTS (SELECT NAME FROM SYS.indexes WHERE NAME = 'IDX_ASSET_ENTITY_REF_ID')
BEGIN
    CREATE INDEX IDX_ASSET_ENTITY_REF_ID ON BFX.ASSET(ENTITY_REF_ID);
END

-- BFX.IMPORT_RECORD_STATUS
IF NOT EXISTS (SELECT NAME FROM SYS.indexes WHERE NAME = 'IDX_IMPORT_RECORD_STATUS_RESULT_ENTITY_ID')
BEGIN
    CREATE INDEX IDX_IMPORT_RECORD_STATUS_RESULT_ENTITY_ID ON BFX.IMPORT_RECORD_STATUS(RESULT_ENTITY_ID);
END

-- BFX.NOTIFICATION_MAILBOX
IF NOT EXISTS (SELECT NAME FROM SYS.indexes WHERE NAME = 'IDX_NOTIFICATION_MAILBOX_ENTITY_REF_ID')
BEGIN
    CREATE INDEX IDX_NOTIFICATION_MAILBOX_ENTITY_REF_ID ON  BFX.NOTIFICATION_MAILBOX(ENTITY_REF_ID);
END

-- BFX.RECENT_DOCUMENT
IF NOT EXISTS (SELECT NAME FROM SYS.indexes WHERE NAME = 'IDX_RECENT_DOCUMENT_ENTITY_REF_ID')
BEGIN
    CREATE INDEX IDX_RECENT_DOCUMENT_ENTITY_REF_ID ON BFX.RECENT_DOCUMENT(ENTITY_REF_ID);
END
```
- Выполняем скрипт `database\sql\migration\7.10_028.000.000_005.sql`
- Ensure Active MQ has no pending messages. Можно заранее отключить job-ы, допустим, за пол дня до начала обновления.
- Обновляем Active MQ до версии 6
- Обновить .NET до версии 8
> https://dotnet.microsoft.com/en-us/download/dotnet/8.0
> Download ASP.NET Core Runtime Hosting Bundle

### Обновление сервера (Корная часть)

- Move DB configs to destination folders.
- Remove old `extensions` folder content from the server folder.
- Запускаем установку:
```powershell
.\server\setup.ps1 -Force
.\IdentityServer\setup.ps1 -Force
.\signalr\setup.ps1 -Force
.\client\setup.ps1 -Force
```

### Обновляем Scheduler:
- Скачиваем файл `AdInsureScheduler-8.1.1.zip`:
> https://gitlabru.adacta-fintech.ru/adinsure/package-registry/-/packages/135692
- Запускаем .\setup.ps1 -Force
- Скопировать конфиги для scheduler-а

### Обновление сервера (Имплементационная часть)
```powershell
# обновление папки extension и т.д.
pwsh ./install.ps1 -OnlyDeploy -Force

# validate и publish
pwsh ./install.ps1 -OnlyPublish -Force
```

## Если есть отдельные worker-ы
При publishing-е у нас запускается реиндексация. По этому после него нельзя перезапускать service или worker.
Если у вас есть отдельный worker, рекомендуется следующий процесс:
1. Остановить все worker-ы
1. Обновить service (и далее не останавливать)
1. Сделать publishing
1. Не запуская, обновить worker-ы. После обновления они сами запустятся (и далее их не останавливать)
