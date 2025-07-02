---
issue: ADIRGSLSUPP-706
link: https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-706

update 1: https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1026
update 2: https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1166
update 3: https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1332
---

### Архивация устаревших данных

* Созданы таблицы для хранения устаревших данных:

| Current table | Archive table |
| --- | --- |
| ```PTY.PARTY_HISTORY```| ```PTY_IMPL.PARTY_HISTORY_ARCH``` |
| ```PAS.CONTRACT_HISTORY```|```PAS_IMPL.CONTRACT_HISTORY_ARCH```|
| ```ORG.SERVICE_PROVIDER_HISTORY```|```ORG_IMPL.SERVICE_PROVIDER_HISTORY_ARCH```|
| ```BFX.MESSAGE_OUTBOX```|```BFX_IMPL.MESSAGE_OUTBOX_ARCH```|
| ```BFX.DOCUMENT_SYNC_BATCH```|```BFX_IMPL.DOCUMENT_SYNC_BATCH_ARCH```|
| ```BFX.ETL_EXECUTION_STATUS```|```BFX_IMPL.ETL_EXECUTION_STATUS_ARCH```|
| ```BFX.INTEGRATION_MESSAGE_GROUP```|```BFX_IMPL.INTEGRATION_MESSAGE_GROUP_ARCH```|
| ```BFX.INTEGRATION_MESSAGE_ERROR```|```BFX_IMPL.INTEGRATION_MESSAGE_ERROR_ARCH```|
| ```BFX.ATTACHMENT_RELATED_ENTITY```|```BFX_IMPL.ATTACHMENT_RELATED_ENTITY_ARCH```|
| ```BFX.ATTACHMENT```|```BFX_IMPL.ATTACHMENT_ARCH```|
| ```BFX.FILE_METADATA```|```BFX_IMPL.FILE_METADATA_ARCH```|
| ```BFX.NOTIFICATION_MAILBOX```|```BFX_IMPL.NOTIFICATION_MAILBOX_ARCH```|
| ```BFX.NOTIFICATION_JOURNAL```|```BFX_IMPL.NOTIFICATION_JOURNAL_ARCH```|
| ```BFX.AUDIT_TRAIL```|```BFX_IMPL.AUDIT_TRAIL_ARCH```|
| ```BFX.CODE_TABLE_ITEM_HISTORY```|```BFX_IMPL.CODE_TABLE_ITEM_HISTORY_ARCH```|
| ```CFX.USER_APPLICATION_ROLE_HISTORY```|```CFX_IMPL.USER_APPLICATION_ROLE_HISTORY_ARCH```|
| ```ORG.APPLICATION_USER_GROUP_ASSIGNMENT_HISTORY```|```ORG_IMPL.APPLICATION_USER_GROUP_ASSIGNMENT_HISTORY_ARCH```|

> **Current table**  Таблица с актуальными данными или данными за текущий месяц.
> **Archive table**  Таблица с неактуальными данными или данными старше одного месяца.

> :warning: **ВАЖНО!!!**
<span style="color:red">Для полноценного анализа данных нужно выполнить объеденение таблиц Current table и Archive table.</span>

**После паблиша необходимо выполнить скрипты для создания процедур архивации:**
```database\sql\migration\ADIRGSLSUPP-706-archive-application-user-group-assignment-history-procedure.sql```
```database\sql\migration\ADIRGSLSUPP-706-archive-attachment-related-entity-procedure.sql.sql```
```database\sql\migration\ADIRGSLSUPP-706-archive-attachment-procedure.sql```
```database\sql\migration\ADIRGSLSUPP-706-archive-audit-trail-procedure.sql```
```database\sql\migration\ADIRGSLSUPP-706-archive-code-table-item-history-procedure.sql```
```database\sql\migration\ADIRGSLSUPP-706-archive-contract-history-procedure.sql```
```database\sql\migration\ADIRGSLSUPP-706-archive-document-sync-batch-procedure.sql```
```database\sql\migration\ADIRGSLSUPP-706-archive-etl-execution-status-procedure.sql```
```database\sql\migration\ADIRGSLSUPP-706-archive-file-metadata-procedure.sql```
```database\sql\migration\ADIRGSLSUPP-706-archive-integration-message-error-procedure.sql```
```database\sql\migration\ADIRGSLSUPP-706-archive-integration-message-group-procedure.sql```
```database\sql\migration\ADIRGSLSUPP-706-archive-message-outbox-procedure.sql```
```database\sql\migration\ADIRGSLSUPP-706-archive-notification-journal-procedure.sql```
```database\sql\migration\ADIRGSLSUPP-706-archive-notification-mailbox-procedure.sql```
```database\sql\migration\ADIRGSLSUPP-706-archive-party-history-procedure.sql```
```database\sql\migration\ADIRGSLSUPP-706-archive-service-provider-history-procedure.sql```
```database\sql\migration\ADIRGSLSUPP-706-archive-user-application-role-history-procedure.sql```

**В планировщике заданий настроить выполнение раз в месяц следующих процедур в следующем порядке:**
```ARCHIVE_PARTY_HISTORY```
```ARCHIVE_CONTRACT_HISTORY```
```ARCHIVE_SERVICE_PROVIDER_HISTORY```
```ARCHIVE_MESSAGE_OUTBOX```
```ARCHIVE_DOCUMENT_SYNC_BATCH```
```ARCHIVE_ETL_EXECUTION_STATUS```
```ARCHIVE_INTEGRATION_MESSAGE_GROUP```
```ARCHIVE_INTEGRATION_MESSAGE_ERROR```
```ARCHIVE_ATTACHMENT_RELATED_ENTITY```
```ARCHIVE_ATTACHMENT```
```ARCHIVE_FILE_METADATA```
```ARCHIVE_NOTIFICATION_MAILBOX```
```ARCHIVE_NOTIFICATION_JOURNAL```
```ARCHIVE_AUDIT_TRAIL```
```ARCHIVE_CODE_TABLE_ITEM_HISTORY```
```ARCHIVE_USER_APPLICATION_ROLE_HISTORY```
```ARCHIVE_APPLICATION_USER_GROUP_ASSIGNMENT_HISTORY```

**Массовое выполнение скриптов (пример для локальной среды):**
**Создание\пересоздание таблиц:**
PowerShell -> cd \implementation\database\sql\Schema -> Запустить команду одной строкой:
```SQLCMD -S localhost -U LOGIN -P PASSWORD -d ADINSURE_TEST -i 8.50_006.020.007_20231201105951_adirgslsupp_706_create_pty_party_history_arch.sql,8.50_006.020.007_20231201120254_adirgslsupp_706_create_pas_contract_history_arch.sql,8.50_006.020.007_20231201143355_adirgslsupp_706_create_org_service_provider_history_arch.sql,8.50_006.020.007_20231205083853_adirgslsupp_706_create_bfx_message_outbox_arch.sql,8.50_006.020.007_20231205095012_adirgslsupp_706_create_bfx_document_sync_batch_arch.sql,8.50_006.020.007_20231205100723_adirgslsupp_706_create_bfx_etl_execution_status_arch.sql,8.50_006.020.007_20231205110545_adirgslsupp_706_create_bfx_integration_message_group_arch.sql,8.50_006.020.007_20231205111759_adirgslsupp_706_create_bfx_integration_message_error_arch.sql,8.50_006.020.007_20231205112557_adirgslsupp_706_create_bfx_attachment_arch.sql,8.50_006.020.007_20231205114046_adirgslsupp_706_create_bfx_file_metadata_arch.sql,8.50_006.020.007_20231205121532_adirgslsupp_706_create_bfx_notification_mailbox_arch.sql,8.50_006.020.007_20231205123238_adirgslsupp_706_create_bfx_notification_journal_arch.sql,8.50_006.020.007_20231205123835_adirgslsupp_706_create_bfx_audit_trail_arch.sql,8.50_006.020.007_20231205132013_adirgslsupp_706_create_bfx_code_table_item_history_arch.sql,8.50_006.020.007_20231205133421_adirgslsupp_706_create_cfx_user_application_role_history_arch.sql,8.50_006.020.007_20231205134027_adirgslsupp_706_create_org_application_user_group_assignment_history_arch.sql,8.50_006.020.007_20240119102611_adirgslsupp_706_create_bfx_attachment_related_entity_arch.sql```

**Создание\пересоздание процедур:**
PowerShell -> cd \implementation\database\sql\migration -> Запустить команду одной строкой:
```SQLCMD -S localhost -U LOGIN -P PASSWORD -d ADINSURE_TEST -i ADIRGSLSUPP-706-archive-application-user-group-assignment-history-procedure.sql,ADIRGSLSUPP-706-archive-attachment-related-entity-procedure.sql.sql,ADIRGSLSUPP-706-archive-attachment-procedure.sql,ADIRGSLSUPP-706-archive-audit-trail-procedure.sql,ADIRGSLSUPP-706-archive-code-table-item-history-procedure.sql,ADIRGSLSUPP-706-archive-contract-history-procedure.sql,ADIRGSLSUPP-706-archive-document-sync-batch-procedure.sql,ADIRGSLSUPP-706-archive-etl-execution-status-procedure.sql,ADIRGSLSUPP-706-archive-file-metadata-procedure.sql,ADIRGSLSUPP-706-archive-integration-message-error-procedure.sql,ADIRGSLSUPP-706-archive-integration-message-group-procedure.sql,ADIRGSLSUPP-706-archive-message-outbox-procedure.sql,ADIRGSLSUPP-706-archive-notification-journal-procedure.sql,ADIRGSLSUPP-706-archive-notification-mailbox-procedure.sql,ADIRGSLSUPP-706-archive-party-history-procedure.sql,ADIRGSLSUPP-706-archive-service-provider-history-procedure.sql,ADIRGSLSUPP-706-archive-user-application-role-history-procedure.sql```

**Перенос записей частями:**
Для ```database\sql\migration\ADIRGSLSUPP-706-archive-contract-history-procedure.sql``` раскомментировать строку 
```-- TOP NUMBER_OF_CONTRACTS_TO_SELECT```
изменить значение ```NUMBER_OF_CONTRACTS_TO_SELECT``` на нужное количество договоров для выборки например 
```TOP 1000``` 
для переноса 1000 договоров в архив.
Выполнить скрипт вручную.
