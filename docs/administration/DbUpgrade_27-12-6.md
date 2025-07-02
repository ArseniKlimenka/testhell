# Миграционные скрипты для апгрейда на версию платформы 27.12.6

**1. Поочередно выполнить миграционные скрипты из каждой группы в файле ```UPGRADE-27-12-6-prepare_for_upgrade.sql```, что бы удостовериться в корректности данных в изменяемых таблицах.**

**2. Выполнить миграционные скрипты из следующих файлов:**

**Non Breaking скрипты (можно выполнить заранее)**

```
UPGRADE-27-12-6-entity_hist_cnstr.sql
UPGRADE-27-12-6-etl_exec_index.sql
UPGRADE-27-12-6-history_indexes.sql
UPGRADE-27-12-6-hub_duplicates.sql
UPGRADE-27-12-6-int_message_group_index.sql
UPGRADE-27-12-6-int_message_index.sql
UPGRADE-27-12-6-permission_indexes.sql
UPGRADE-27-12-6-reindexation_perf_fix.sql
UPGRADE-27-12-6-sat_indexes.sql
UPGRADE-27-12-6-update_providers_es.sql
```

**Breaking скрипты (выполнять непосредственно перед началом апгрейда)**

```
UPGRADE-27-12-6-entity_fix_pt_1.sql - прогон на тестовых таблицах.
UPGRADE-27-12-6-entity_fix_pt_2.sql - Если pt 1 выполнился успешно, то запустить этот скрипт. Удалит тестовые таблицы и произвидет модификацию на реальных.
UPGRADE-27-12-6-esb_table_drop.sql
UPGRADE-27-12-6-activities_event.sql
UPGRADE-27-12-6-alter_message_tables.sql
UPGRADE-27-12-6-ddl_cnstr_drop.sql
UPGRADE-27-12-6-activities_state.sql
```

**3. Выполнить скрипты платформы**
```.\build.ps1 -ExecuteScripts```
> На промышленной среды скрипты накатываются при выполнении команды `.\server\setup.ps1 -Force`

**Скрипты (выполнять непосредственно после наката скриптов, но перед апгрейдом)**

```
UPGRADE-27-12-6-after-scripts.sql
```

**4. Для уменьшения вероятности дэдлоков при выполнении ETL сервисов следует включить флаг ```READ_COMMITTED_SNAPSHOT```. Включение флага так же увеличит потребляемое место для нужд БД.**

```
SELECT is_read_committed_snapshot_on FROM sys.databases WHERE name= '{databaseName}' - проверить флаг
ALTER DATABASE {databaseName} SET READ_COMMITTED_SNAPSHOT ON - включить флаг, если выключен
```

**5. Выполнить команду dotnet tool restore в папке имплементации**

**6. Выполнить скрипты имплементации**
```.\build.ps1 -ExecuteScripts```