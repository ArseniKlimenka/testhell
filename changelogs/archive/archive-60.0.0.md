# 60.0.0-rc1 (2023-12-27)

### Breaking Changes (4 changes)

- [ADIRGSLSUPP-1050](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1050): Доработка листа согласования для дожитий.

    **Доп. указания**
    Перед паблишем должны быть выполнены автоматические скрипты:
    8.50_006.020.007_20231220080518_ewt_inquiries_text_fields.sql
    8.50_006.020.007_20231220080538_pas_inquiries_text_fields.sql

    После паблиша должны быть выполнены миграционные скрипты:
    ADIRGSLSUPP-1050-create-and-populate-backup.sql - создание и заполнения бэкапа
    ADIRGSLSUPP-1050-fix-inquiry-data.sql - датафикс для запросов в смежные подразделения
    ADIRGSLSUPP-1050-update-inquiry-ass.sql - заполнение данных в асс для запросов в смежные подразделения

- [ADIRGSLSUPP-754](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-754): Изменён тип атрибута barrierAutoCall, скорректированы маппинги для этого атрибута

    Для апдейта значений поля barrierAutoCall необходимо выполнить скрипт "database\sql\migration\ADIRGSLSUPP-754-update-barrierAutoCall.sql"

    Скрипт по откату изменений на бэкап - "database\sql\migration\ADIRGSLSUPP-754-reverse-barrierAutoCall-update-from-backup.sql"

- [ADIRGSLSUPP-847](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-847): После установки необходимо выполнить скрипты:
    database\sql\migration\get_transformed_transactions.sql
    database\sql\migration\impl_ldwh_zds_algl_2.sql

- [ADIRGSLSUPP-965](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-965): Необходимо выполнить скрипт:
    database\sql\migration\get_transformed_transactions.sql


### New Features (69 changes)

- [ADIRGSLSUPP-1001](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1001): Изменить коды коллективных договоров на уникальные и доработать отбор в АД

- [ADIRGSLSUPP-1011](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1011): Отображение РСД на Договоре

- [ADIRGSLSUPP-1012](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1012): Реализована лестница ставок КВ

- [ADIRGSLSUPP-1013](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1013): БФКО РВ_НОТА_ХР 4.0 sql script

- [ADIRGSLSUPP-1014](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1014): БФКО. Правки по продуктк NOTEV1BFKO

- [ADIRGSLSUPP-1015](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1015): Правки печатной формы Драйвер Гарантия Привилегия

- [ADIRGSLSUPP-1019](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1019): Очистка таблицы BFX.DOCUMENT_SYNC_BATCH перед реиндексом

- [ADIRGSLSUPP-1028](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1028): Внести правки по печатной форме ДГ ВТБ

- [ADIRGSLSUPP-1031](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1031): В поиске по контрагентам ввести ограничения.

- [ADIRGSLSUPP-1032](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1032): БФКО РВ_НОТА_доработки

- [ADIRGSLSUPP-1033](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1033): БФКО РВ. Правки по НОТЕ.

- [ADIRGSLSUPP-1034](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1034): Внести правки в график траншей Базис Инвест

- [ADIRGSLSUPP-1035](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1035): Ошибка КА. Регресс.

- [ADIRGSLSUPP-1036](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1036): Исправлена валидация банковские счетов

- [ADIRGSLSUPP-1038](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1038): Исправление доступности чекбоксов датагрида комиссии.

- [ADIRGSLSUPP-1041](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1041): Не отрабатывает джоб по расторжениям на предпроде

- [ADIRGSLSUPP-1042](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1042): Тестирование ХР 4.0

- [ADIRGSLSUPP-1043](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1043): Тразишены по техническим допникам

- [ADIRGSLSUPP-1046](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1046): Доработка валидаций и триггеров на коллективном договоре

- [ADIRGSLSUPP-1047](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1047): Расчет СП при превышении лимитов для продукта НОТА ХР4.0

- [ADIRGSLSUPP-1049](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1049): Скорректировать дату закрытия продукта НОТА ВЛ 6.0

- [ADIRGSLSUPP-1051](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1051): Скорректировать базовый актив НОТА ВЛ 6.0

- [ADIRGSLSUPP-1053](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1053): Доработка валидации застрахованного и выгодоприобретателя в системе.

- [ADIRGSLSUPP-1054](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1054): Создание роли исключающей ограничение на поиск контрагента по ФИ + ДР.

- [ADIRGSLSUPP-1056](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1056): Маппинг Хедлайнеры роста 4.0 БФКО (00814)

- [ADIRGSLSUPP-1057](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1057): установить ограничение по возрасту Базис Инвест

- [ADIRGSLSUPP-1058](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1058): Настроить новое поле по поиску КА по PartyCode.

- [ADIRGSLSUPP-1060](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1060): Налоговые справки:

    * Добавлена пометка о миграции договора.
    * Настроен автоматический расчёт оплаченных суммы в налоговом периоде.
    * Предустановлен чек-бокс "Плательщик совпадает со страхователем".
    * По умолчанию заявитель = страхователь.
    * Добавлен функционал копирования справки.
    * Перенесен функционал в раздел Банковские выписки".
    * Скорректирован поиск дубликатов.
    * Настроено автоматическое заполнение застрахованного если страхователь = застрахованный.
    * Заблокирован любой расчёт взносов, кроме автоматического, если не установлен чек-бокс ручная корректировка.

- [ADIRGSLSUPP-1061](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1061): Печатные формы_Налоговые справки_замечания

- [ADIRGSLSUPP-1064](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1064): Правки по печатным формам ХР 4.0

- [ADIRGSLSUPP-1066](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1066): Правка по ограничение возраста Базис Инвест Зенит

- [ADIRGSLSUPP-1070](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1070): Создание продуктов под миграцию (4 продукта)

- [ADIRGSLSUPP-1071](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1071): БФКО РВ_НОТА_Замечания по печатным формам Хедлайнеры роста 4.0

- [ADIRGSLSUPP-1072](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1072): Правки ограничения по возрасту Базис Инвест

- [ADIRGSLSUPP-1078](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1078): ВТБ. Продукт для сотрудников. Стратегия на пять. Гарант.

- [ADIRGSLSUPP-1079](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1079): Настройка продукта Корп НСиБ пулы.

- [ADIRGSLSUPP-1080](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1080): БФКО. НОТЫ. Изменение инвест параметров.

- [ADIRGSLSUPP-1081](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1081): ВТБ_НОТА_Корректировка ПФ после транша.ВТБ_НОТА_Корректировка ПФ после транша.

- [ADIRGSLSUPP-1083](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1083): Перенос продуктов в ADS

- [ADIRGSLSUPP-1086](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1086): Правки в инвест параметрах ВЛ 6.0

- [ADIRGSLSUPP-1088](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1088): Ошибка в кастомном сервисе get-contract-custom-data на ПРОДЕ

- [ADIRGSLSUPP-1090](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1090): ВТБ_сотрудники_Маппинг_Стратагия на пять. Гарант с 0 КВ

- [ADIRGSLSUPP-1098](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1098): Справки для налоговой:

    * Платежи отображаются за выбранный период.

- [ADIRGSLSUPP-1101](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1101): На карточке ЮЛ валидация на обязательность заполнения поля "Бенефициарный владелец" только для роли Страхователь.

- [ADIRGSLSUPP-133](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-133): Доработка грида условий вознаграждения.

- [ADIRGSLSUPP-136](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-136): Доработка табельного номера агента на АД.

- [ADIRGSLSUPP-143](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-143): Скрыты поля на пользовательском интерфейсе, добавлена выгрузка условий вознаграждения

- [ADIRGSLSUPP-184](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-184): АВР:

    * Несколько платежей по одному взносу будут отображаться в АВР одной строкой
    * Строка будет попадать в АВР только после даты последнего платежа
    * В поле "Дата поступления" будет отображаться дата последнего платежа

- [ADIRGSLSUPP-275](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-275): Справки для налогового вычета:

    * Добавлена информация о сотруднике, который выдал справку в зависимости от конфигурации.

- [ADIRGSLSUPP-425](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-425): Отчет ИСЖ не выгружается после переключения миграционной базы в продуктив

- [ADIRGSLSUPP-49](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-49): Доработки по убыткам - анализ

- [ADIRGSLSUPP-577](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-577): Результаты тестирования по задаче Новая роль в КК и внесение до 4 Бенефициарных владельцев

- [ADIRGSLSUPP-637](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-637): Нереиндексация всего батча при наличии нереиндексируемого элемента.

- [ADIRGSLSUPP-718](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-718): Добавлена возможность сделать взаимозачет на договор, которого нет в системе.

- [ADIRGSLSUPP-720](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-720): Добавлен кастомный сервис для измения контрагентов (физлиц)

- [ADIRGSLSUPP-740](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-740): Настроить в АДШ информационный баннер

- [ADIRGSLSUPP-806](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-806): Разрешить все транзишены под актером System

- [ADIRGSLSUPP-825](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-825): Исправление отображения вложений для некоторых конфигураций дс на расторжение

- [ADIRGSLSUPP-873](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-873): Кастомный сервис get-contract-custom-data: сумма в paidAmount неверна

- [ADIRGSLSUPP-879](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-879): Фиксированный курс - доработка фин. операций

- [ADIRGSLSUPP-880](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-880): Доработки дожитий

- [ADIRGSLSUPP-910](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-910): Внести изменения в appsettings.json ПРОДУКТИВА.

- [ADIRGSLSUPP-920](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-920): ПФ для налоговых справок

- [ADIRGSLSUPP-939](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-939): Доработка печатки страхового акта для дожитий

- [ADIRGSLSUPP-943](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-943): Ошибка оформления КСЖ.

- [ADIRGSLSUPP-944](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-944): КОРП: Доработка загрузчика и вкладки по Списку Застрахованных

- [ADIRGSLSUPP-983](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-983): Валютная переоценка - не формируются проводки при закрытии периода

- [ADIRGSLSUPP-988](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-988): БФКО РВ_НОТА_Хедлайнеры роста 4.0_Печатные формы

- [ADIRGSLSUPP-998](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-998): АВР:

    * Добавлен новый столбец в АВР и в Эксель выгрузку «Нестандартное КВ по договору»
    * Исправлены ошибки при выгрузке эксель.


### Fixed (13 changes)

- [ADIRGSLSUPP-1018](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1018): Ошибка при квитовке платежа_Cannot insert the value NULL into column 'OBJECT_CODE', table 'AdInsure_PRD.ACC_IMPL.MATCHING_POLICY'; column does not allow nulls

- [ADIRGSLSUPP-1023](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1023): Договоры:

    * Исправлена страховая сумма при смене продукта

- [ADIRGSLSUPP-1026](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1026): Архивация устаревших данных

    Исправлена ошибка внешнего ключа для таблицы BFX_IMPL.ATTACHMENT_ARCH

- [ADIRGSLSUPP-1027](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1027): Ошибка при загрузке платежей Продуктив

- [ADIRGSLSUPP-1048](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1048): АВР_Журнал АВР фильтры

- [ADIRGSLSUPP-1069](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1069): Ошибка по отображению статуса по оплате платежей после миграции технического ДС

- [ADIRGSLSUPP-1100](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1100): Integration test EndowmentPaymentOrder failed

- [ADIRGSLSUPP-439](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-439): Восстановление авторизаций для документа дедупликации.

- [ADIRGSLSUPP-641](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-641): Завис документ РСД на тестовой среде

- [ADIRGSLSUPP-950](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-950): Журнал платежей_экспорт в Excel

- [ADIRGSLSUPP-971](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-971): Проводки по КВ Брокерам - анализ

- [ADIRGSLSUPP-974](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-974): Валютная переоценка- не сформирована проводка Отражение расхода от валютной переоценки - анализ

- [ADIRGSLSUPP-986](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-986): Ошибки при формировании PAYMENT_PLAN_SAT после удаления договора

# 59.0.0-rc1 (2023-12-08)

### Breaking Changes (12 changes)

- [ADIRGSL-3747](https://jira.adacta-fintech.com/browse/ADIRGSL-3747): Договоры:

    * Добавлены таблицы аналитической подсистемы, которые содержат данные по котировкам и договорам созданным из других договоров.

    **После паблиша необходимо выполнить скрипты:**
    ```database\sql\migration\ADIRGSL-3747-update-created-from-quote-sat.sql```
    ```database\sql\migration\ADIRGSL-3747-update-created-from-policy-sat.sql```

- [ADIRGSLSUPP-493](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-493): Устранение проблем с платформой. Перемещение данных АСС АД из таблиц платформы в имплементационные.

    **Доп указания**
    1.После паблиша выполнить вручную скрипты из файла ADIRGSLSUPP-493-move-aa-data-to-impl.sql для переноса данных.
    2.После паблиша выполнить вручную скрипты из файлов: impl_ldwh_zag_agr.sql, impl_ldwh_zds_algl_2.sql, impl_ldwh_zins_cont.sqlz, impl_ldwh_zpartner.sql для пересоздания view и процедур.

- [ADIRGSLSUPP-657](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-657):
    * Валидации на коллективных договорах

        **Перед паблишем необходимо выполнить корректировочный скрипт:**
        `database\sql\migration\ADIRGSLSUPP-657-alter-inquiry-sat.sql`
- [ADIRGSLSUPP-706](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-706): Архивация устаревших данных

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

    **В планировщике заданий настроить выполнение раз в месяц следующих процедур:**
    ```ARCHIVE_PARTY_HISTORY```
    ```ARCHIVE_CONTRACT_HISTORY```
    ```ARCHIVE_SERVICE_PROVIDER_HISTORY```
    ```ARCHIVE_MESSAGE_OUTBOX```
    ```ARCHIVE_DOCUMENT_SYNC_BATCH```
    ```ARCHIVE_ETL_EXECUTION_STATUS```
    ```ARCHIVE_INTEGRATION_MESSAGE_GROUP```
    ```ARCHIVE_INTEGRATION_MESSAGE_ERROR```
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
    ```SQLCMD -S localhost -U LOGIN -P PASSWORD -d ADINSURE_TEST -i 8.50_006.020.007_20231201105951_adirgslsupp_706_create_pty_party_history_arch.sql,8.50_006.020.007_20231201120254_adirgslsupp_706_create_pas_contract_history_arch.sql,8.50_006.020.007_20231201143355_adirgslsupp_706_create_org_service_provider_history_arch.sql,8.50_006.020.007_20231205083853_adirgslsupp_706_create_bfx_message_outbox_arch.sql,8.50_006.020.007_20231205095012_adirgslsupp_706_create_bfx_document_sync_batch_arch.sql,8.50_006.020.007_20231205100723_adirgslsupp_706_create_bfx_etl_execution_status_arch.sql,8.50_006.020.007_20231205110545_adirgslsupp_706_create_bfx_integration_message_group_arch.sql,8.50_006.020.007_20231205111759_adirgslsupp_706_create_bfx_integration_message_error_arch.sql,8.50_006.020.007_20231205112557_adirgslsupp_706_create_bfx_attachment_arch.sql,8.50_006.020.007_20231205114046_adirgslsupp_706_create_bfx_file_metadata_arch.sql,8.50_006.020.007_20231205121532_adirgslsupp_706_create_bfx_notification_mailbox_arch.sql,8.50_006.020.007_20231205123238_adirgslsupp_706_create_bfx_notification_journal_arch.sql,8.50_006.020.007_20231205123835_adirgslsupp_706_create_bfx_audit_trail_arch.sql,8.50_006.020.007_20231205132013_adirgslsupp_706_create_bfx_code_table_item_history_arch.sql,8.50_006.020.007_20231205133421_adirgslsupp_706_create_cfx_user_application_role_history_arch.sql,8.50_006.020.007_20231205134027_adirgslsupp_706_create_org_application_user_group_assignment_history_arch.sql```

    **Создание\пересоздание процедур:**
    PowerShell -> cd \implementation\database\sql\migration -> Запустить команду одной строкой:
    ```SQLCMD -S localhost -U LOGIN -P PASSWORD -d ADINSURE_TEST -i ADIRGSLSUPP-706-archive-application-user-group-assignment-history-procedure.sql,ADIRGSLSUPP-706-archive-attachment-procedure.sql,ADIRGSLSUPP-706-archive-audit-trail-procedure.sql,ADIRGSLSUPP-706-archive-code-table-item-history-procedure.sql,ADIRGSLSUPP-706-archive-contract-history-procedure.sql,ADIRGSLSUPP-706-archive-document-sync-batch-procedure.sql,ADIRGSLSUPP-706-archive-etl-execution-status-procedure.sql,ADIRGSLSUPP-706-archive-file-metadata-procedure.sql,ADIRGSLSUPP-706-archive-integration-message-error-procedure.sql,ADIRGSLSUPP-706-archive-integration-message-group-procedure.sql,ADIRGSLSUPP-706-archive-message-outbox-procedure.sql,ADIRGSLSUPP-706-archive-notification-journal-procedure.sql,ADIRGSLSUPP-706-archive-notification-mailbox-procedure.sql,ADIRGSLSUPP-706-archive-party-history-procedure.sql,ADIRGSLSUPP-706-archive-service-provider-history-procedure.sql,ADIRGSLSUPP-706-archive-user-application-role-history-procedure.sql```

- [ADIRGSLSUPP-751](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-751): Договоры:

    * Исправлены взносы в журнале договоров.

    **Примечание**
    Выполнить скрипт:
    ```database\sql\migration\ADIRGSLSUPP-751-update-contract-risk-premium.sql```

    После выполнения скриптов выполнить переиндексацию ES по договорам.

- [ADIRGSLSUPP-780](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-780): После установки необходимо выполнить:
    database\sql\migration\get_transformed_transactions.sql

- [ADIRGSLSUPP-800](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-800): После установки необходимо выполнить ETL "FixCommissionActWithoutDocumentEtl" без параметров.

- [ADIRGSLSUPP-831](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-831): Доработка расчета ндфл для дожитий и расторжений.

    **Доп. информация**
    Следующие скрипты должны быть выполнены ДО паблиша:
    8.50_006.020.007_20231122142539_ewt_manual_pit.sql
    8.50_006.020.007_20231122142602_cln_manual_pit.sql

- [ADIRGSLSUPP-860](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-860): Маппинг Базис Инвест 17 стратегий для ЗЕНИТ

- [ADIRGSLSUPP-863](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-863): ZINS_CONT обновление view.
    Необходимо выполнить скрипт:
    database\sql\migration\impl_ldwh_zins_cont.sql

- [ADIRGSLSUPP-878](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-878): Реализован фиксированный курс для договоров страхования и связанных сущностей.

    **Доп указания**
    Перед паблишем необходимо выплнить следующие автоматические скрипты:
    1. 8.50_006.020.007_20231205111829_po_and_ie_fixed_ech_rate.sql
    2. 8.50_006.020.007_20231205111730_clm_and_ie_fixed_ech_rate.sql
    3. 8.50_006.020.007_20231205111342_exchange_rate_and_eval_flag.sql
    4. 8.50_006.020.007_20231205111521_cnl_amendment_fixed_ech_rate.sql
    5. 8.50_006.020.007_20231205111642_ewt_fixed_ech_rate.sql

    Перед паблишем необходимо сделать реиндес следующих индексов: contract, claim, endowment, insuredevent и paymentorder

    Так же выполнить миграционный скрипт (до или после паблиша, но после предыдущих скриптов) для апдейта данных асс для коллективных договоров: ADIRGSLSUPP-878-update-ass-for-collective.sql

- [ADIRGSLSUPP-958](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-958): После установки необходимо выполнить:
    database/sql/migration/acc_impl_v_rsd_job_pp_data.sql


### New Features (93 changes)

- [ADIRGSLSUPP-144](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-144): АД. ДС на изменение условий вознаграждения

- [ADIRGSLSUPP-182](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-182): АВР:

    * Добавлены в выгрузку поля:
        * САД
        * Статус САД (ФЛ, ИП)
        * Филиал ПАО СК "Росгосстрах"
        * Регион филиала

- [ADIRGSLSUPP-199](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-199): РСД. Добавление записей в документ

- [ADIRGSLSUPP-275](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-275): Справки для налогового вычета:

    * Добавлен функционал создание справки
    * Добавлен функционал поиска справок

- [ADIRGSLSUPP-31](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-31): Organize possibility to generate scripts for RGSL users with custom base db-migrate (from DbUp 0.15.4) and disable online-mode db-scripts

- [ADIRGSLSUPP-394](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-394): Доработка загрузчика по импорту данных субагентов

- [ADIRGSLSUPP-454](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-454): Атрибут "Кто разместил" для вложений во всех сущностях (Контрагент, Котировка, Договор, ДС (в том числе Расторжение), Убыток, Дожитие, Заявка) видим только пользователям с ролью GeneralBackOffice.

- [ADIRGSLSUPP-548](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-548): Переделана нумерация допников по типу "номер договора/номер допника"

- [ADIRGSLSUPP-577](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-577): Результаты тестирования по задаче Новая роль в КК и внесение до 4 Бенефициарных владельцев

- [ADIRGSLSUPP-590](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-590): Исправления для фильтра по продукту в уловиях АД

- [ADIRGSLSUPP-638](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-638): Добавлены кнопки в дс для ад для обновления информации об организации и участниках

- [ADIRGSLSUPP-669](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-669): БФКО_Нота высшая лига 6.0

- [ADIRGSLSUPP-670](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-670): БФКО_НОТА Высшая лига_Печатные формы_Высшая лига 6.0

- [ADIRGSLSUPP-698](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-698): ВТБ_TERM LIFE

- [ADIRGSLSUPP-707](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-707): Доработка расторжений

- [ADIRGSLSUPP-720](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-720): Добавлен кастомный сервис для измения контрагентов (физлиц)

- [ADIRGSLSUPP-785](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-785): Создание новой роли SkipPassport

- [ADIRGSLSUPP-802](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-802): Нет записи в POLICY_HUB

- [ADIRGSLSUPP-806](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-806): Разрешить все транзишены под актером System

- [ADIRGSLSUPP-809](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-809): АВР:

    * Исправлена сортировка по столбцу «Имя агента»
    * Изменено отображение «Тип агента»
    * Сделано в фильтрах значение «Тип акта» – Мультивыбор

- [ADIRGSLSUPP-818](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-818): Скорректировать проводки по уменьшению премии при досрочном расторжении кредита

- [ADIRGSLSUPP-823](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-823): Кастомный сервис - get-contract-custom-data, вывод данных в договорах с рассрочкой.

- [ADIRGSLSUPP-825](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-825): Исправлена ошибка "Cannot read property 'paymentLineSum' of undefined" при открытии некоторых ДС на расторжение.

- [ADIRGSLSUPP-833](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-833): Включение логирования для отправки событий подписчикам

- [ADIRGSLSUPP-834](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-834): Разблокировано ручное КВ для ОПЕРУ для договоров в статусе Проект.

- [ADIRGSLSUPP-841](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-841): Ограничения в поисковых DataSource.

- [ADIRGSLSUPP-847](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-847): Добавление проводок 3.5.5. и 3.5.6- Возврат переплаты

- [ADIRGSLSUPP-848](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-848): Ошибка при транзишене мигрированного допника

- [ADIRGSLSUPP-849](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-849): Доработка валидации банковских счетов для расторжений.

- [ADIRGSLSUPP-850](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-850): Заведение продуктов для миграции

- [ADIRGSLSUPP-858](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-858): Правки по результатам тестирования Зенит 17 БА

- [ADIRGSLSUPP-862](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-862): Добавлено заполнение риска для ДИД

- [ADIRGSLSUPP-864](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-864): КСП по проводкам типа Начисление вознаграждения посредникам (Оценка) и (Факт) - анализ

- [ADIRGSLSUPP-870](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-870): Дозаведение новых продуктов для миграции 16.11.2023

- [ADIRGSLSUPP-858](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-858): Правки по результатам тестирования Зенит 17 БА

- [ADIRGSLSUPP-875](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-875): Сохранять обменный курс при квитовке

- [ADIRGSLSUPP-876](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-876): Маппинг Стратегия на пять Гарант Ультра ВТБ

- [ADIRGSLSUPP-881](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-881): Изменить адрес в конфигах Adinsure PROD.

- [ADIRGSLSUPP-882](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-882): ВТБ_Стратегия на пять. Гарант ультра. Правки по результатам тестирования.

- [ADIRGSLSUPP-883](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-883): ВТБ. Изменение даты открытия продукта Стратегия на пять. Гарант Ультра.

- [ADIRGSLSUPP-883](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-883): Обновление графиков траншей БИ

- [ADIRGSLSUPP-889](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-889): Установить время жизни токена 1 час.

- [ADIRGSLSUPP-894](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-894): Контрагенты ИП_ошибка при создании

- [ADIRGSLSUPP-897](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-897): Добавить связку с агентским договором на коллективный договор

- [ADIRGSLSUPP-898](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-898): Доработки по продукту НОТА ВЛ 6.0

- [ADIRGSLSUPP-899](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-899): на дате транша 22.11.2023 не в САП подтянулись не корректные Стратегии

- [ADIRGSLSUPP-900](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-900): Изменение appsettings.json для ТЕСТ среды.

- [ADIRGSLSUPP-901](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-901): Вернуть определение эквивалента платежа в валюте договора на payment_date

- [ADIRGSLSUPP-902](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-902): Скорректировать настройки НОТА ВЛ 6.0

- [ADIRGSLSUPP-903](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-903): маппинг Высшая Лига 6.0 БФКО (00806)

- [ADIRGSLSUPP-904](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-904): Доработка парольной политики.

- [ADIRGSLSUPP-905](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-905): Скорректировать согласующее подразделение Драйвер Гарантия

- [ADIRGSLSUPP-906](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-906): Правки после тестирования Зенит 17 БА

- [ADIRGSLSUPP-908](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-908): ВТБ. Изменение ставки в Драйвер гарантия ультра.

- [ADIRGSLSUPP-909](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-909): ВТБ_Правки по СНП Гарант Ультра (методология)

- [ADIRGSLSUPP-911](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-911): Внести правки по Заявлению Нота ВЛ 6.0

- [ADIRGSLSUPP-915](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-915): Разработка загрузчика по смене паролей пользователям.

- [ADIRGSLSUPP-916](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-916): Правки после тестирования продукта NOTE1BFKO4

- [ADIRGSLSUPP-917](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-917): ОАС. Изменение сегмента.

- [ADIRGSLSUPP-921](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-921): Настройка продуктов Драйвер гарантия партнера ВТБ

- [ADIRGSLSUPP-922](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-922): Не формируется печатная форма договора у БФКО

- [ADIRGSLSUPP-925](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-925): Настройка печатных форм НОТА ВЛ 6.0

- [ADIRGSLSUPP-926](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-926): АВР_ручная ставка КВ

- [ADIRGSLSUPP-930](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-930): Исправлена валидация номера у банковских аккаунтов

- [ADIRGSLSUPP-931](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-931): Активация логирования ЛКК на проде

- [ADIRGSLSUPP-933](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-933): Реализована отдельная группа для создания ДС на изменение для договоров страхования

- [ADIRGSLSUPP-934](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-934): ВТБ. Корректировка кешбека.

- [ADIRGSLSUPP-937](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-937): Исправления по результатам тестирования ЗЕНИТ 17 БА

- [ADIRGSLSUPP-938](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-938): Правки по печатным формам Зенит 17 БА

- [ADIRGSLSUPP-941](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-941): ВТБ_Настройка в AdInsure доступа партнёру к продукту "Стратегия на пять. Ультра"

- [ADIRGSLSUPP-945](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-945): КОРП: Обработка ручных ставок КВ из загрузчика

- [ADIRGSLSUPP-948](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-948): Маппинг Драйвер Гарантия Ультра сегмент Прайм $ в конце/ежегодно 00808 и 00809

- [ADIRGSLSUPP-949](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-949): Скорректировать префикс для Драйвер Гарантия Ультра ВТБ

- [ADIRGSLSUPP-952](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-952): ВТБ_смена даты запуска 01.12._Стратегия на пять Гарант Ультра_Драйвер гарантия 4 года

- [ADIRGSLSUPP-957](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-957): Исправлен расчёт суммы в валюте договора и в рублях для расторжений по валютному договору

- [ADIRGSLSUPP-959](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-959): Добавление рекомендаций стратегий и правки по продуктам IBIZENIT17

- [ADIRGSLSUPP-961](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-961): повышение лимитов Драйвер Гарантия ультра ВТБ

- [ADIRGSLSUPP-962](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-962): Обнуление графика по расторгнутым мигрированным договорам

- [ADIRGSLSUPP-963](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-963): Внести изменения в файл ПРОДУКИВА - AdInsure\server\conf\NLog-impl.config

- [ADIRGSLSUPP-967](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-967): Изменение бизнес-кода по мигрируемому продукту I735VTBP

- [ADIRGSLSUPP-968](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-968): Изменить конфиг тестового Идентити сервера.

- [ADIRGSLSUPP-970](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-970): Добавить роли партнера в загрузчик

- [ADIRGSLSUPP-973](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-973): Исправить окно графика Траншей для Базис Инвест

- [ADIRGSLSUPP-975](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-975): Ошибка: Body не должно иметь дополнительные свойства (technicalData).

- [ADIRGSLSUPP-978](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-978): Правки по печатным формам ВЛ 6.0

- [ADIRGSLSUPP-979](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-979): Правки по результатам тестирования ВЛ 6.0

- [ADIRGSLSUPP-982](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-982): Настройка ПИФ Индекса для стратегий IBIZENIT17

- [ADIRGSLSUPP-984](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-984): внести исправления по результатам тестирования IBIZENIT17

- [ADIRGSLSUPP-985](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-985): Маппинг Драйвер Гарантия сегмент Привилегия $ в конце/ежегодно 00812 и 00813

- [ADIRGSLSUPP-987](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-987): БФКО РВ. Создание продукта НОТА.

- [ADIRGSLSUPP-990](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-990): Дополнить график траншей Базис Инвест

- [ADIRGSLSUPP-996](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-996): Правки по результатам тестирования Драйвер Гарантия Привилегия

- [ADIRGSLSUPP-999](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-999): Установка даты activeFrom для Базис Инвест Зенит


### Fixed (7 changes)

- [ADIRGSLSUPP-595](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-595): АВР:

    * Исправлено отображение статуса договоров в строках акта.

- [ADIRGSLSUPP-596](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-596): АВР_таймауты при авто-заполнении

- [ADIRGSLSUPP-624](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-624): РСД не формируется по валютным договорам

- [ADIRGSLSUPP-820](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-820): АВР_тестирование ADIRGSLSUPP-491 АВР_Ручное КВ

- [ADIRGSLSUPP-824](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-824): Ошибка при проведении сторно КВ оценка и начислении КВ факт по валютному договору

- [ADIRGSLSUPP-928](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-928): Fix integration tests

- [ADIRGSLSUPP-954](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-954): Договоры:

    * Исправлен расчёт премии.

# 58.0.0-rc1 (2023-11-13)

### Breaking Changes (4 changes)

- [ADIRGSLSUPP-590](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-590): Доработка формы агентских договоров.

    **Примечание**
    Автоматический скрипт 7.10_006.020.007_446.sql должен быть выполнен до паблиша.

- [ADIRGSLSUPP-591](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-591): АВР:

    * Добавлена сортировка в грид по полям:
        * САД
        * Статус САД (ФЛ, ИП)
        * Филиал ПАО СК "Росгосстрах"
        * Регион филиала
    * Для столбеца Статус САД настроено заполнение в соответствии со значением, которое указано в атрибуте "Вид приема" (receiveType) на карточке сотрудника:
        * 44 = ИП
        * 43 = ФЛ

    ACC поставщика услуг:

    * Добавлен новый столбец RECEIVE_TYPE ("Вид приема") в ORG_IMPL.SERVICE_PROVIDER_INFO_SAT

    **Примечание**
    После паблиша выполнить скрипт ```database\sql\migration\ADIRGSLSUPP-591-update-service-provider-receive-type.sql```

- [ADIRGSLSUPP-751](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-751): Договоры:

    * Исправлен некорректный расчёт суммы прeмии по рискам

    **Примечание**
    Выполнить скрипт:
    ```database\sql\migration\ADIRGSLSUPP-751-update-contract-risk-premium.sql```

    После выполнения скриптов выполнить переиндексацию ES по договорам.

- [ADIRGSLSUPP-807](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-807): После установки необходимо выполнить скрипт:
    database\sql\migration\get_transformed_transactions.sql


### New Features (107 changes)

- [ADIRGSLSUPP-122](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-122): Реализовано автоматическое создание ДС на расторжение для убытков по рискам смерти.

- [ADIRGSLSUPP-134](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-134): Возвращен ручной внутренний номер для АД.

- [ADIRGSLSUPP-135](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-135): Добавлена кнопка удаления для выбранных условий вознаграждения АД.

- [ADIRGSLSUPP-166](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-166): Доработки иморта УВ для АД

- [ADIRGSLSUPP-349](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-349): Дедупликации через UI:

    * Настроено сохранение данных.

- [ADIRGSLSUPP-439](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-439): Массовые операции ППО - Расторжение по инициативе Общества

- [ADIRGSLSUPP-459](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-459): Доработки расчета НДФЛ для расторжений.

- [ADIRGSLSUPP-49](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-49): Доработки по убыткам - анализ

- [ADIRGSLSUPP-501](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-501): Корректировка типа карточек для продуктов ДМС.

- [ADIRGSLSUPP-511](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-511): Добавлена проверка поля creatorUsername

- [ADIRGSLSUPP-522](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-522): БФКО_розница КСП КСЖ потребы - коробка с лечением КЗ

- [ADIRGSLSUPP-526](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-526): Включение события регистрации новых пользователей в Личном кабинете

- [ADIRGSLSUPP-530](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-530): Изменена валидация на даты заявления в дожитиях

- [ADIRGSLSUPP-580](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-580): Заведение продуктов по индивидуальным сделкам для миграции

- [ADIRGSLSUPP-584](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-584): Валидации на карточке ЮЛ

- [ADIRGSLSUPP-585](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-585): Дополнительные соглашения (ФИН и НЕ ФИН):

    * Настроены валидации на дату ДС

- [ADIRGSLSUPP-595](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-595): АВР:

    * Увеличен таймаут запроса по автозаполнению строк.
    * Изменён фильтр Статус платежа по строкам на Да\Нет.
    * Исключена проверка пересечения АВР если статус АВР удалён.

- [ADIRGSLSUPP-596](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-596): АВР:

    * Оптимизирован скрипт автозаполнения строк.

- [ADIRGSLSUPP-600](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-600): Текст сообщения по отправке доступов на мейл

- [ADIRGSLSUPP-610](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-610): Доработка алгоритма назначения задач для ДС на расторжение.

- [ADIRGSLSUPP-615](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-615): Отображение суммы оплаты в кастомном сервисе поиск договоров клиента

- [ADIRGSLSUPP-637](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-637): Нереиндексация всего батча при наличии нереиндексируемого элемента - анализ

- [ADIRGSLSUPP-642](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-642): БФКО РВ_согласия на обработку перс. данных

- [ADIRGSLSUPP-643](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-643): Доработка ДС на расторжение.

- [ADIRGSLSUPP-645](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-645): БФКО_РВ_НОТА_АКТУАЛЬНЫЕ ТРЕНДЫ_правки по печатным формам

- [ADIRGSLSUPP-646](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-646): БФКО РВ. Корректировки по продукту Нота.

- [ADIRGSLSUPP-647](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-647): Маппинг НОТА Актуальные тренды 3 года БФКО

- [ADIRGSLSUPP-654](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-654): Работа с кастомным сервисом get-contract-custom-data

- [ADIRGSLSUPP-655](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-655): GetEFRProductsReverseOptional:

    * Произведена оптимизация сервиса.

- [ADIRGSLSUPP-656](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-656): Дополнить график траншей

- [ADIRGSLSUPP-657](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-657): Валидации на коллективных договорах - анализ

- [ADIRGSLSUPP-661](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-661): Правки по результатам тестирования, ВЛ 5.0

- [ADIRGSLSUPP-662](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-662): Внести правки по печатным формам ВЛ 5.0

- [ADIRGSLSUPP-664](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-664): Корректировка проводок по сторно премии при финансовых изменениях

- [ADIRGSLSUPP-667](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-667): Корректировка конфигов тестовой среды.

- [ADIRGSLSUPP-672](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-672): Замена устанавливаемой даты при сосдании ДС на восстановление

- [ADIRGSLSUPP-676](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-676): БФКО РВ_Актуальные тренды_Правки в печатных формах.

- [ADIRGSLSUPP-678](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-678): БФКО РВ. Корректировка кода партнера.

- [ADIRGSLSUPP-679](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-679): БФКО_Базис Инвест_Базис Актив_КИД не должен присутствовать в договорах

- [ADIRGSLSUPP-680](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-680): БФКО. НОТА. Правки в мед. декларациях

- [ADIRGSLSUPP-684](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-684): БФКО_Актуальные тренды_правки по печаткам

- [ADIRGSLSUPP-686](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-686): Отчет по Ноте: исключить из отбора аннулированные платежи

- [ADIRGSLSUPP-687](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-687): Ошибка при печати договоров

- [ADIRGSLSUPP-689](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-689): Внести правки по ВЛ 5.0

- [ADIRGSLSUPP-691](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-691): Договоры:

    * Исправлены данные с ошибкой: Body не должно иметь дополнительные свойства (finKnowledgeQuestionnaire или finKnowledgeQuestionnaire2023).

- [ADIRGSLSUPP-692](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-692): ВТБ_Форма информаций банка_печатная форма

- [ADIRGSLSUPP-693](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-693): АВР: неверный счет учета для КВ факт

- [ADIRGSLSUPP-694](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-694): Валидации для ЮЛ с ролью Агент

- [ADIRGSLSUPP-695](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-695): Добавить курсовые разницы во вью Связанные платежи

- [ADIRGSLSUPP-696](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-696): ВТБ. Создание партнера.

- [ADIRGSLSUPP-697](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-697): ВТБ.Продукты.Стратегия на пять.Гарант.Драйвер Гарантия Ультра

- [ADIRGSLSUPP-699](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-699): Скорректировать дату наблюдения StrategyInstruments

- [ADIRGSLSUPP-702](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-702): ВТБ. Корректировки в продуктах. Драйвер Гарантия Ультра. СНП.гарант.

- [ADIRGSLSUPP-703](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-703): ВТБ_заявления на страхование_Стратегия на пять гарант_Драйвер гарантия Ультра

- [ADIRGSLSUPP-704](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-704): Маппинг Драйвер Гарантия для патнера ВТБ.

- [ADIRGSLSUPP-708](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-708): Журнала запросов и Реестр для Почты РФ:

    * Поле Текст запроса обязательно для заполнения только при выборе "Иное" в Причине запроса;
    * В грид Журнала запросов в столбец Ошибки запроса будет отображаться информация из поля Причина запроса;
    * В EXCEL реестре Почты РФ выведена шапка таблицы с названием столбцов;
    * В столбец F будут отображаться Имя и Отчество;
    * Ошибки запроса будут выгружаться в последнем столбце J.

- [ADIRGSLSUPP-710](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-710): ВТБ Премиум. Продукт Драйвер гарантия.

- [ADIRGSLSUPP-711](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-711): ОАС_Коллективные договоры_скрыть для агента

- [ADIRGSLSUPP-712](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-712): Добавлен отсутствующий changeType для истории модификации договоров.

- [ADIRGSLSUPP-714](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-714): Правки по КСЖ Моя уверенность

- [ADIRGSLSUPP-715](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-715): Маппинг Страт_5_Гарант_ВТБ

- [ADIRGSLSUPP-717](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-717): ВТБ. Изменение даты запусков продуктов ВТБ.

- [ADIRGSLSUPP-719](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-719): ВТБ_Правки в части печатных форм

- [ADIRGSLSUPP-721](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-721): ВТБ_форма уведомления для Страхователей от 70 лет (включительно) и старше

- [ADIRGSLSUPP-723](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-723): Добавить роли нового партнера ВТБ в загрузчик

- [ADIRGSLSUPP-724](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-724): Доработан SendEventEtlService, теперь туда надо на вход подавать ещё и подписчика, по которому должен улететь ивент. Перенастроено расписание для этог сервиса, сделано разделение по подписчикам

- [ADIRGSLSUPP-727](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-727): Внести правки по результатам тестирования ВЛ 5.0

- [ADIRGSLSUPP-728](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-728): Ошибка при печати договора Invalid time value

- [ADIRGSLSUPP-730](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-730): Полезная информация. Добавление инструкции ВТБ

- [ADIRGSLSUPP-731](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-731): Маппинг Драйвер Гарантия ВТБ Премиум. Корректировка передачи валют

- [ADIRGSLSUPP-734](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-734): Добавление номера телефона для тестирования кода электрополисов на препрод и тест

- [ADIRGSLSUPP-735](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-735): Котировка НСЖ:

    * Подтверждение декларации Страхователя (Застрахованный 2) не будет удаляться при изменении Даты заключения и Периодичности оплаты в статусе "На рассмотрении СК"

- [ADIRGSLSUPP-736](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-736): ВТБ_Правки в печатных формах

- [ADIRGSLSUPP-737](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-737): ВТБ_не пересчитывается СС при указании инвест. параметров вручную

- [ADIRGSLSUPP-739](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-739): ОАС_Детский капитал

- [ADIRGSLSUPP-741](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-741): Продукты ВТБ:

    * Настроен расчет страховой суммы по риску DLP36404 (Смерть ЛП) = страховой премии свыше лимита 60000000 руб.

- [ADIRGSLSUPP-742](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-742): Скорректировать значение gracePeriodDays

- [ADIRGSLSUPP-747](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-747): ОАС_Надежный капитал

- [ADIRGSLSUPP-748](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-748): Внести правки по КСЖ Моя Уверенность

- [ADIRGSLSUPP-749](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-749): ОАС_не обновились суммы в json

- [ADIRGSLSUPP-759](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-759): ВТБ_правки по продуктам Стратегия на пять. Гарант и Драйвер гарантия (Ультра)

- [ADIRGSLSUPP-762](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-762): БФКО_Корректировка_срока_риска_ПР_КСЖ "Моя защита" с 05.10.2023

- [ADIRGSLSUPP-768](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-768): ВТБ. Создание продукта Стратегия на пять. Гарант Ультра

- [ADIRGSLSUPP-769](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-769): 17 стратегий зенит настройка продукта

- [ADIRGSLSUPP-770](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-770): Добавлен функционал защиты против brute force attack.

- [ADIRGSLSUPP-771](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-771): Ошибка при создании технического ДС

- [ADIRGSLSUPP-773](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-773): ОАС_Детский капитал_тестирование 31.10.2023

- [ADIRGSLSUPP-774](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-774): Скорректировать префикс 17 БА

- [ADIRGSLSUPP-775](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-775): Транзишен Completed_to_Activated

- [ADIRGSLSUPP-787](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-787): Внести правки по продукту КСЖ Моя уверенность

- [ADIRGSLSUPP-788](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-788): ВТБ. Драйвер гарантия (Ультра). Корректировки расчета СС.

- [ADIRGSLSUPP-790](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-790): Договоры не отображаются в UI+ ошибка транзишена - У пользователя нет доступа к данному документу

- [ADIRGSLSUPP-794](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-794): Акцепт. Смена ставок и кешбека.

- [ADIRGSLSUPP-797](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-797): КСЖ. Добавление рисков для ошибочных договоров.

- [ADIRGSLSUPP-799](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-799): Маппинг КСЖ Моя уверенность

- [ADIRGSLSUPP-801](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-801): Добавлен фильтр по тому, является ли договор мигрированным

- [ADIRGSLSUPP-808](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-808): ПСБ масс и ОРС. Изменение кешбека и ставок.

- [ADIRGSLSUPP-810](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-810): Договоры:

    * Выданы права на создание Дожитий и ДИД для ОПЕРУ

- [ADIRGSLSUPP-813](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-813): Создание рисков для миграции

- [ADIRGSLSUPP-814](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-814): Инновационные решения_ошибка при отправке документов клиенту_Базис актив

- [ADIRGSLSUPP-819](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-819): ПСБ масс и ОРС. Изменение кешбека и ставок.

- [ADIRGSLSUPP-823](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-823): Кастомный сервис - get-contract-custom-data, вывод данных в договорах с рассрочкой.

- [ADIRGSLSUPP-828](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-828): ВТБ_Стратегия на пять. Гарант Ультра. ПФ и расчет.

- [ADIRGSLSUPP-829](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-829): Изменение кешбека у ряда патреров в продуктах СНП.Гарант

- [ADIRGSLSUPP-837](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-837): Скорректировать кредитные программы Моя Защита 3

- [ADIRGSLSUPP-846](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-846): Скорректировать печатные формы для продукта Надежный капитал Классика 2.0

- [ADIRGSLSUPP-93](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-93): Фин модуль: настройка проводок по финансовым изменениям


### Fixed (13 changes)

- [ADIRGSLSUPP-170](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-170): РНВ. Перевод в статус Подтвержден из Журнала РНВ

- [ADIRGSLSUPP-594](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-594): Доработка проводок при загрузке платежа по конкретному GUID

- [ADIRGSLSUPP-640](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-640): Неверно определяется сумма рублевого платежа в валюте договора при квитовке

- [ADIRGSLSUPP-641](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-641): Завис документ РСД на тестовой среде

- [ADIRGSLSUPP-650](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-650): Ошибка импорта реестра платежей

- [ADIRGSLSUPP-659](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-659): Review long running queries

- [ADIRGSLSUPP-675](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-675): Фин учет: доработка проводок при расчетах с брокером. Результат тестирования

- [ADIRGSLSUPP-681](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-681): Нестабильность работы джоба по загрузке курсов валют

- [ADIRGSLSUPP-784](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-784): Котировки:

    * Исправлена проблема с установкой пустых объектов деклараций для котировок отличных от НСЖ

- [ADIRGSLSUPP-792](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-792): Проводки по удаленным из акта строкам не должны формироваться

- [ADIRGSLSUPP-796](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-796): Форма страховой выплаты:

    * Добавлен выбор формы страховой выплаты "В счет оплаты взносов" для Дожитий и ДС на расторжение.

- [ADIRGSLSUPP-804](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-804): Ошибка при закрытии периода - анализ

- [ADIRGSLSUPP-826](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-826): Некорректный ОФР - Валютная переоценка

# 57.0.0-rc1 (2023-10-11)

### Breaking Changes (4 changes)

- [ADIRGSLSUPP-192](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-192): Инструкция:
    - перед установкой необходимо удалить индекс в ES: adinsure_index_bank_statement_item
    - после установки запустить reindex для платежей. Можно перезапустить переиндексацию всего, но это будет долго. Чтобы переиндексировать только платежи необходимо выполнить сервис /api/rgsl/accounting/shared/search-documents/bank-statement/reindex с пустым запросом {}.

- [ADIRGSLSUPP-565](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-565): Инструкция:
    - перед установкой необходимо удалить индекс в ES: adinsure_index_bank_statement_item
    - после установки запустить reindex для платежей. Можно перезапустить переиндексацию всего, но это будет долго. Чтобы переиндексировать только платежи необходимо выполнить сервис /api/rgsl/accounting/shared/search-documents/bank-statement/reindex с пустым запросом {}.

- [ADIRGSLSUPP-578](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-578): Исправлены ссылки на несуществующих контрагентов по договорам.

    1. Выполнить скрипт database\sql\migration\ADIRGSLSUPP-582-docs-with-broken-party-links-fix.sql
    2. Выполнить массовую реиндексацию по договорам.

- [ADIRGSLSUPP-604](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-604): После установки необходимо выполнить скрипт:
    database\sql\migration\get_transformed_transactions.sql


### New Features (44 changes)

- [ADIRGSLSUPP-121](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-121): Заявка постпродажного сопровождения:

    * Добавлена возможность создания повторной заявки на расторжение в случае если ДС в статусе отказано.

- [ADIRGSLSUPP-424](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-424): fixed manual run if ci-environment is absent

    no mailing if the receipient is absent

- [ADIRGSLSUPP-44](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-44): Доработка расчета НДФЛ для дожитий.

- [ADIRGSLSUPP-445](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-445): Добавлена новая джоба для отмены договоров, которые старше 100 дней, и по ним не оплачен/оплачен не до конца первый взнос

- [ADIRGSLSUPP-457](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-457): ПСБ результат теста ПФ после миграции

- [ADIRGSLSUPP-477](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-477): Результат тестирования акцепт и инвесты по оас

- [ADIRGSLSUPP-481](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-481): Продление льготного периода по платежам на договоре

- [ADIRGSLSUPP-483](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-483): Настроен журнал запросов для работы ОПЕРУ.

- [ADIRGSLSUPP-491](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-491): АВР_Ручное КВ

- [ADIRGSLSUPP-510](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-510): Переработка статусной модели дожитий.

- [ADIRGSLSUPP-511](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-511): В конфигурационную таблицу BFX_IMPL.SEND_EVENT_CONFIGURATION добавлено поле API_SENDER
    Добавлена проверка apiSender при создании записи для таблицы BFX_IMPL.SEND_EVENT

- [ADIRGSLSUPP-525](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-525): Внести правки по результатам тестирования СМ Оптима и 17 стратегий

- [ADIRGSLSUPP-529](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-529): Журнал запросов:

    * Реализован механизм Массовой смены статусов из «Создан» --> «Согласован» с автоматическим проставлением текста ответа «Согласовано»

- [ADIRGSLSUPP-545](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-545): ELMA365 Вывод в тест и прод

- [ADIRGSLSUPP-546](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-546): Доработка статусной можели ДС на расторжение.

- [ADIRGSLSUPP-547](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-547): Исправление логики определения суммы платежа в валюте договора

- [ADIRGSLSUPP-549](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-549): Изменение реестра для интеграции с САПом для переключения ЕФР на АДШ

- [ADIRGSLSUPP-550](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-550): Скорректировать кредитные тарифы "Защита кредита 3"

- [ADIRGSLSUPP-554](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-554): Рефакторинг по фильтрации доп. сервисов по доп. условиям

- [ADIRGSLSUPP-559](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-559): БФКО_НОТА_Высшая лига 5.0._реализация заявления - исправлен код продукта

- [ADIRGSLSUPP-561](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-561): Андеррайтинг_тестирование ADIRGSLSUPP-355

- [ADIRGSLSUPP-568](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-568): Сервис обратного маппинга (GetEFRProductsReverseOptional):

    * Изменён код ответа с 422 на 200 при отсутствии данных по запросу.

    Сервис обратного маппинга (GetEFRProductsFiltred):

    * Изменён код ответа с 422 на 200 в обработанных ошибках по запросу.

- [ADIRGSLSUPP-572](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-572): Выровнен UI и сервис по КА

- [ADIRGSLSUPP-573](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-573): Доработан инричмент "/beneficiaries" для продуктов "ПРО Генетику", "ПРО Здоровье", "ПРО ЗОЖ" удаляет теги "isHeritors" и "isNotHeritors" из JSON.

- [ADIRGSLSUPP-577](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-577): Результаты тестирования по задаче Новая роль в КК и внесение до 4 Бенефициарных владельцев

- [ADIRGSLSUPP-586](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-586): БФКО РВ.Продукт. НОТА. Актуальные тренды.

- [ADIRGSLSUPP-587](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-587): БФКО РВ_НОТА_Актуальные тренды_печатные формы по продукту

- [ADIRGSLSUPP-588](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-588): БФКО Премиум_НОТА_Высшая лига 5.0_печатные формы

- [ADIRGSLSUPP-597](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-597): Ошибка в кастомном сервисе get-contract-custom-data

- [ADIRGSLSUPP-602](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-602): Изменение текста ошибки по инициатору

- [ADIRGSLSUPP-609](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-609): Закрытие продукта EBMOPTIMAOAS2

- [ADIRGSLSUPP-615](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-615): Отображение суммы оплаты в кастомном сервисе поиск договоров клиента

- [ADIRGSLSUPP-616](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-616): Изменение типа карточки для ЛКК в указанных продуктах.

- [ADIRGSLSUPP-621](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-621): БФКО, ОАС, Зенит изменение ставок в БИ и ДГ. ПСБ РВ закрытие продукта ДГ.

- [ADIRGSLSUPP-623](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-623): Заменить ПИФ индекс 17 БА

- [ADIRGSLSUPP-626](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-626): БФКО_Изменить в печатной форме цена опциона в формуле

- [ADIRGSLSUPP-627](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-627): Скорректировать валидацию по сроку кредита Моя Защита

- [ADIRGSLSUPP-628](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-628): Изменение типа карточки для ЛКК в указанных продуктах.

- [ADIRGSLSUPP-629](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-629): Скорректировать наименование стратегии для продукта 17 БА

- [ADIRGSLSUPP-630](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-630): Аномально быстрый рост application.log

- [ADIRGSLSUPP-634](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-634): Скорректировать Пиф индексов для 17 стратегий. Базис Инвест

- [ADIRGSLSUPP-635](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-635): Джоб по переводу договоров в Подписан - изменить время запуска

- [ADIRGSLSUPP-639](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-639): БФКО_КСЖ_Снять валидацию для продуктов Моя Защита.

- [ADIRGSLSUPP-82](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-82): АВР. Создание актов с дополняющими/не пересекающимися видами страхования или продуктами


### Fixed (6 changes)

- [ADIRGSLSUPP-195](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-195): Аккаунтинг_тест: не сформировались проводки по сторно премии при досрочном расторжении кредита

- [ADIRGSLSUPP-589](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-589): Исправлена буква Е в классифицированных ошибках с кириллицы на латиницу.

- [ADIRGSLSUPP-592](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-592): Ошибка при запросе в сервис

- [ADIRGSLSUPP-599](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-599): Маппинг Нота Высшая Лига 5.0 для БФКО

- [ADIRGSLSUPP-601](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-601): Правки по результатам тестирования ВЛ 5.0

- [ADIRGSLSUPP-603](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-603): Сервис GetEFRProductsReverseOptional:

    * Исправлена ошибка в сервисе Cannot read property 'products' of undefined
    * Обновлён скрипт импорта данных database\sql\migration\efr_product_risk_actual_data.sql для таблицы PAS_IMPL.EFR_PRODUCT_RISK

# 56.0.0-rc1 (2023-09-28)

### Breaking Changes (5 changes)

- [ADIRGSLSUPP-129](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-129): Перестрахование:

    * Добавлен новый "Тип поставщика услуг" = "Перестраховщик".
    * Переработан импорт перестрахования.
    * Обновлено представление информации договора на вкладке "Перестрахование".

    После установки необходимо выполнить скрипт:
    database\sql\migration\ADIRGSLSUPP-129-Clean-not-linked-reinsurer-imports.sql

- [ADIRGSLSUPP-406](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-406): Доработка получателей для ДС на расторжение.

    **Deployment notes**

    Скрипт 7.10_006.020.007_418.sql должен быть выполнен до паблиша.

    Скрипты, которые нужно выполнить после паблиша:
    1.ADIRGSLSUPP-406-create-and-populate-backup.sql
    2.ADIRGSLSUPP-406-execute-body-update.sql

- [ADIRGSLSUPP-480](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-480): Реализован функционал запросов для дожитий

    Скрипты, которые нужно выполнить после паблиша:
    database\sql\migration\ADIRGSLSUPP-480-reason-to-reasons-array.sql

- [ADIRGSLSUPP-514](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-514): Рекомендованные стратегии:

    * Добавлена возможность задавать период.

    Перед установкой необходимо выполнить скрипт:
    database\sql\migration\ADIRGSLSUPP-514-recommended-strategies-backup.sql

    После установки необходимо выполнить скрипт:
    database\sql\migration\ADIRGSLSUPP-514-recommended-strategies-update-from-backup.sql

- [ADIRGSLSUPP-543](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-543): Инструкция:
    - перед установкой необходимо удалить индекс в ES: adinsure_index_bank_statement_item
    - после установки запустить reindex для платежей. Можно перезапустить переиндексацию всего, но это будет долго. Чтобы переиндексировать только платежи необходимо выполнить сервис /api/rgsl/accounting/shared/search-documents/bank-statement/reindex с пустым запросом {}.


### New Features (42 changes)

- [ADIRGSLSUPP-123](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-123): Переработка статусной модели для ДС на расторжение.

- [ADIRGSLSUPP-311](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-311): Добавить новую роль в КК и возможность внесения до 4-х бенефициарных владельцев в карточку ЮЛ.

- [ADIRGSLSUPP-35](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-35): Добавлено описание текущей структуры таблиц ДСЖ в описание в GIT.

- [ADIRGSLSUPP-352](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-352): Пересчет СС по рискам c ОУСВ и возвратом взносов по продуктам ОАС с учетом текущего алгоритма по списку договоров

    Для пересчёта у пользователя должна быть роль `RecalcInsuredSum`.
    Пересчёт доступен по пути: `Администрация -> Исправление страховых сумм`.

    Для пересчёта необходимо заполнить экселевский файл с номерами договоров.
    Номера договоров необходимо указать в столбце A начиная со второй строки.

- [ADIRGSLSUPP-413](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-413): Расторжение по ИК_доработка.

- [ADIRGSLSUPP-424](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-424): .build/ES-Reindex.ps1 sends an email to $GITLAB_USER_EMAIL , the address can be overridden by the parameter -mailTo <e@mail>

    Mail server credentials are read from conf/rgsl-prod/server/implSettings.json , can be overridden by the parameter -mailCfg <path>

- [ADIRGSLSUPP-457](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-457): ПСБ результат теста ПФ после миграции

- [ADIRGSLSUPP-462](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-462): Изменение типа карточки для ЛКК в указанных продуктах.

- [ADIRGSLSUPP-479](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-479): Реализована причина запроса для запросов в смежные подразделения.

    **Deployment notes**
    Должны быть выполнены автоматические скрипты:
    1. 7.10_006.020.007_419.sql
    2. 7.10_006.020.007_420.sql

- [ADIRGSLSUPP-484](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-484): Реестр для почты РФ:

    * Настроен джоб по подготовке данных для отчета.
    * Настроена выгрузка данных в виде отчета в формате Excel.

- [ADIRGSLSUPP-489](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-489): Разработать печатные формы для НОТА ВЛ 4.0

- [ADIRGSLSUPP-494](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-494): Заменить заявление по реинвестам на старое

- [ADIRGSLSUPP-498](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-498): Маппинг Базис Инвест 17 стратегий для БФКО

- [ADIRGSLSUPP-502](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-502): Заявление для реинвестов. Новое

- [ADIRGSLSUPP-504](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-504): Доработка файла strategyConfiguration

- [ADIRGSLSUPP-507](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-507): Доработка выгрузки реестра договоров для загрузки в SAP 17 стратегий

- [ADIRGSLSUPP-516](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-516): Заявлене реинвесты_не выводится улица в адрес Страхователя/Застрахованного

- [ADIRGSLSUPP-517](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-517): ПСБРВ.ОАС.Реинвес.Драйвер гарантия. Изменение ставок.

- [ADIRGSLSUPP-521](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-521): БФКО_Изменение наименования сервиса ПРО Генетика

- [ADIRGSLSUPP-523](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-523): БФКО.ПСБ.СМП. Изменение инвест параметров.

- [ADIRGSLSUPP-524](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-524): БФКО. КСЖ. добавлены программы из CMP в CMP3.

- [ADIRGSLSUPP-525](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-525): Внести правки по результатам тестирования СМ Оптима и 17 стратегий

- [ADIRGSLSUPP-527](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-527): Доработка ДС на расторжение в случае расторжения реестром в ПОхл.

- [ADIRGSLSUPP-528](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-528): БФКО_СМП_ПСБ_Реинвесты_изменение цены опциона в Печатной форме

- [ADIRGSLSUPP-532](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-532): БФКО Премиум_НОТА_Высшая лига 4.0. Правки по результатам тестирования печатных форм

- [ADIRGSLSUPP-535](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-535): Сервис витрины продуктов:

    * Доработана минимальная сумма по мед сервисам.

- [ADIRGSLSUPP-536](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-536): БФКО. НОТА Высшая лига 4.0. правки.

- [ADIRGSLSUPP-539](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-539): Добавить пользователя, для направления рассылки по электрополисам на тесте и предпроде

- [ADIRGSLSUPP-544](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-544): Форма выпуска по мигрированным продуктам

- [ADIRGSLSUPP-549](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-549): Изменение реестра для интеграции с САПом для переключения ЕФР на АДШ

- [ADIRGSLSUPP-550](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-550): Скорректировать кредитные тарифы "Защита кредита 3"

- [ADIRGSLSUPP-551](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-551): БФКО_Коробки ДМС_Выгодоприобритатели_мед. памятки в ЕФР

- [ADIRGSLSUPP-553](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-553): Маппинг КСЖ Защита Кредита 3.0 для БФКО

- [ADIRGSLSUPP-557](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-557): БФКО. НОТА. Изменение в ИД регистационного номера и даты.

- [ADIRGSLSUPP-559](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-559): БФКО_НОТА_Высшая лига 5.0._реализация заявления. Доработка факт. адресов

- [ADIRGSLSUPP-560](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-560): БФКО_НОТА_Создание новой стратегии_Высшая лига 5.0

- [ADIRGSLSUPP-563](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-563): ПСБ. Драйвер гарантия. Изменение ставок.

- [ADIRGSLSUPP-571](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-571): Ошибка на проде по эл полисам на примере КСЖ авто и на реинвестах Uncaught (in promise): [object Undefined]

- [ADIRGSLSUPP-574](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-574): Маппинг Базис Гарант 3 года для БФКО

- [ADIRGSLSUPP-81](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-81): Изменение порядка списания начислений премии и кв оценка при расторжении договора

- [ADIRGSLSUPP-87](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-87): Фин учет: доработка проводок при расчетах с брокером

- [ADIRGSLSUPP-93](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-93): Фин модуль: настройка проводок по финансовым изменениям


### Fixed (11 changes)

- [ADIRGSLSUPP-379](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-379): Реестр загружен на продуктив несколько раз к одной банковской выписке

- [ADIRGSLSUPP-398](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-398): Реинвестирование_Заявление на дожитие_правки в части вывода адреса - доработка после теста

- [ADIRGSLSUPP-437](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-437): Не работает импорт платежей через excel

- [ADIRGSLSUPP-470](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-470): Исправлены таймауты в витрине задач.

- [ADIRGSLSUPP-495](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-495): Тестирование формирования XML сообщений для Росфинмониторинга.

- [ADIRGSLSUPP-496](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-496): Доработать информацию на вкладке "Cвязанные платежи"

- [ADIRGSLSUPP-505](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-505): Реинвестирование:

    * Исправлена отправка документов на почту.
    * Исправлена ошибка при печати заявления на получение страховых выплат.

- [ADIRGSLSUPP-506](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-506): Исправлен таймаут при выгрузке неназначенных задач из витрины.

- [ADIRGSLSUPP-508](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-508): Заявки постпродажного сопровождения:

    * Обновление данных при инициализации документа исправлено.

- [ADIRGSLSUPP-531](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-531): Не выполнилась загрузка банковских выписок за 18.09.23 на продуктиве

- [ADIRGSLSUPP-555](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-555): Ошибка загрузки реестра платежей Сбербанк Эквайринг

# 55.0.0-rc1 (2023-09-08)

### Breaking Changes (11 changes)

- [ADIRGSL-3034](https://jira.adacta-fintech.com/browse/ADIRGSL-3034): #### Механизм дедупликации контрагентов:

    > :warning: **КРИТИЧЕСКИ ВАЖНО!!!**
    <span style="color:red">Перед выполнением скриптов сделать полную резервную копию БД и проверить, что она успешно восстанавливается!</span>
    <span style="color:red">Не выполнять скрипты ни при каких условиях без резервной копии БД.</span>

    ##### Выполнить скрипты по порядку:

    > Создаём таблицу PTY_IMPL.PARTY_DEDUP_INFO в которую будет записываться информация о дедупликации.
    1. database\sql\migration\ADIRGSL-3034-create-party-dedup-info-table.sql
    `ID` - порядковый номер записи
    `PARTY_CODE` - код дубликата
    `DEDUPL_NUMBER` - код мастера
    `IS_PROCESSED` - информация об обработке (обработано/нет)
    `ERROR` - информация об ошибке
    `UPDATED_DOCUMENTS` - информация об обновленных документах
    `DATE` - дата записи

    _дополнительно создаем индекс согласно рекомендациям IBS:_
    _database\sql\migration\ADIRGSL-3034-create-party-dedup-info-table-index.sql_

    > Создаём таблицу PTY_IMPL.PARTY_DEDUP_DELETED в которой будет храниться информация об удаленных контрагентах из PTY.PARTY.
    2. database\sql\migration\ADIRGSL-3034-create-party-dedup-deleted-table.sql

    > Заполняем таблицу контрагентами по которым требуется произвести дедупликацию PTY_IMPL.PARTY_DEDUP_INFO.
    3. database\sql\migration\ADIRGSL-3034-update-party-dedup-info.sql

    > Запускаем процесс дедупликации, обновляем документы, таблицы, делаем копию контрагента, которого будем удалять и удаляем его.
    4. database\sql\migration\ADIRGSL-3034-update-dedup-docs.sql

    5. Выполнить полную переиндексацию Elasticsearch.

    6. Перезапустить IIS.

    ##### Дополнительная информация по скрипту из пункта 4:
    > Чтобы сократить количество обрабатываемых документов можно расскоментировать дополнительное условие и указать для `pdi.ID` промежуток `ID` которые нужно обработать, выполнить скрипт, затем указать следующий промежуток и т.д.
    ```
    SELECT pdi.ID, pdi.PARTY_CODE, p.PARTY_ID, pdi.DEDUPL_NUMBER, d.PARTY_ID DEDUPL_ID
    FROM PTY_IMPL.PARTY_DEDUP_INFO pdi
    LEFT JOIN PTY.PARTY p ON p.PARTY_CODE = pdi.PARTY_CODE
    LEFT JOIN PTY.PARTY d ON d.PARTY_CODE = pdi.DEDUPL_NUMBER
    WHERE pdi.IS_PROCESSED = 0
    --AND pdi.ID BETWEEN 0 and 50
    ```
    > Начинать тестирование на каждой новой среде рекомендуется с дедупликации одного контрагента, например установив его ID:
    `pdi.ID BETWEEN 1 and 1`

    ##### Тестирование:
    После применения скриптов требуется проверить работу функционала всей системы в целом.
    Создать все типы документов которые есть в системе, проверить разные продукты, проверить работу как обновленных так и не обновленных документов, которые уже были в системе.

    Для ускорения проверки изменений в теле документов, можно использовать скрипты, которые сохранят body в папку для дальнейшего сравнения, скрипты запускать из командной строки.
    Создать котировку, договор.
    Затем для этого договора создать заявку постпродажного сопровождения, страховое событие, убыток, дожитие, расчёт на выплату.
    Автозаменой изменить номер договора в скриптах. Выполнить каманды ниже до обновления из командной строки (может потребоваться загрузка Microsoft Command Line Utilities 15 for SQL Server https://go.microsoft.com/fwlink/?linkid=2230791 для работы утилиты sqlcmd), запустить скрипт дедупликации, выполнить каманды ниже после обновления.
    В папке c:\sql\ выбрать файлы для сравнения например POLICY_BODY.json и POLICY_BODY_UPD.json, сравнить например notepad++ плагином compare.

    Для работы скриптов
    ```
    -- Запустить до обновления
    sqlcmd -S localhost -d ADINSURE_TEST -U adinsure -P adinsure -f 65001 -y 0 -Q "set nocount on; SELECT BODY FROM PAS.CONTRACT WHERE CONTRACT_NUMBER = N'НОМЕР_ДОГОВОРА'" -o c:\sql\POLICY_BODY.json
    sqlcmd -S localhost -d ADINSURE_TEST -U adinsure -P adinsure -f 65001 -y 0 -Q "set nocount on; SELECT COMMON_BODY FROM PAS.CONTRACT WHERE CONTRACT_NUMBER = N'НОМЕР_ДОГОВОРА'" -o c:\sql\POLICY_COMMON_BODY.json
    sqlcmd -S localhost -d ADINSURE_TEST -U adinsure -P adinsure -f 65001 -y 0 -Q "set nocount on; SELECT SNAPSHOT_BODY FROM PAS.CONTRACT WHERE CONTRACT_NUMBER = N'НОМЕР_ДОГОВОРА'" -o c:\sql\POLICY_SNAPSHOT_BODY.json
    sqlcmd -S localhost -d ADINSURE_TEST -U adinsure -P adinsure -f 65001 -y 0 -Q "set nocount on; SELECT BODY FROM PAS.CONTRACT WHERE CONTRACT_NUMBER = N'НОМЕР_ДОГОВОРА/1'" -o c:\sql\POLICY_AMENDMENT_BODY.json
    sqlcmd -S localhost -d ADINSURE_TEST -U adinsure -P adinsure -f 65001 -y 0 -Q "set nocount on; SELECT COMMON_BODY FROM PAS.CONTRACT WHERE CONTRACT_NUMBER = N'НОМЕР_ДОГОВОРА/1'" -o c:\sql\POLICY_AMENDMENT_COMMON_BODY.json
    sqlcmd -S localhost -d ADINSURE_TEST -U adinsure -P adinsure -f 65001 -y 0 -Q "set nocount on; SELECT SNAPSHOT_BODY FROM PAS.CONTRACT WHERE CONTRACT_NUMBER = N'НОМЕР_ДОГОВОРА/1'" -o c:\sql\POLICY_AMENDMENT_SNAPSHOT_BODY.json
    sqlcmd -S localhost -d ADINSURE_TEST -U adinsure -P adinsure -f 65001 -y 0 -Q "set nocount on; SELECT BODY FROM PAS.CONTRACT WHERE CONTRACT_NUMBER LIKE N'%РАС%' AND ORIGINAL_DOCUMENT_ID = (SELECT ORIGINAL_DOCUMENT_ID FROM PAS.CONTRACT WHERE CONTRACT_NUMBER = N'НОМЕР_ДОГОВОРА')" -o c:\sql\POLICY_CANCELLATION_BODY.json
    sqlcmd -S localhost -d ADINSURE_TEST -U adinsure -P adinsure -f 65001 -y 0 -Q "set nocount on; SELECT COMMON_BODY FROM PAS.CONTRACT WHERE CONTRACT_NUMBER LIKE N'%РАС%' AND ORIGINAL_DOCUMENT_ID = (SELECT ORIGINAL_DOCUMENT_ID FROM PAS.CONTRACT WHERE CONTRACT_NUMBER = N'НОМЕР_ДОГОВОРА')" -o c:\sql\POLICY_CANCELLATION_COMMON_BODY.json
    sqlcmd -S localhost -d ADINSURE_TEST -U adinsure -P adinsure -f 65001 -y 0 -Q "set nocount on; SELECT SNAPSHOT_BODY FROM PAS.CONTRACT WHERE CONTRACT_NUMBER LIKE N'%РАС%' AND ORIGINAL_DOCUMENT_ID = (SELECT ORIGINAL_DOCUMENT_ID FROM PAS.CONTRACT WHERE CONTRACT_NUMBER = N'НОМЕР_ДОГОВОРА')" -o c:\sql\POLICY_CANCELLATION_SNAPSHOT_BODY.json
    sqlcmd -S localhost -d ADINSURE_TEST -U adinsure -P adinsure -f 65001 -y 0 -Q "set nocount on; SELECT BODY FROM CLM.CLAIM WHERE JSON_VALUE(BODY, '$.mainAttributes.contract.number') = N'НОМЕР_ДОГОВОРА'" -o c:\sql\CLAIM_BODY.json
    sqlcmd -S localhost -d ADINSURE_TEST -U adinsure -P adinsure -f 65001 -y 0 -Q "set nocount on; SELECT COMMON_BODY FROM CLM.CLAIM WHERE JSON_VALUE(BODY, '$.mainAttributes.contract.number') = N'НОМЕР_ДОГОВОРА'" -o c:\sql\CLAIM_COMMON_BODY.json
    sqlcmd -S localhost -d ADINSURE_TEST -U adinsure -P adinsure -f 65001 -y 0 -Q "set nocount on; SELECT BODY FROM BFX.UNIVERSAL_DOCUMENT ud LEFT JOIN CFX.PUBLISHED_ARTIFACT pa ON pa.PUBLISHED_ARTIFACT_ID = ud.PUBLISHED_ARTIFACT_ID WHERE pa.CODE_NAME = 'LifeInsuranceRequest' AND JSON_VALUE(BODY, '$.contract.number') = N'НОМЕР_ДОГОВОРА'" -o c:\sql\REQUEST_BODY.json
    sqlcmd -S localhost -d ADINSURE_TEST -U adinsure -P adinsure -f 65001 -y 0 -Q "set nocount on; SELECT COMMON_BODY FROM BFX.UNIVERSAL_DOCUMENT ud LEFT JOIN CFX.PUBLISHED_ARTIFACT pa ON pa.PUBLISHED_ARTIFACT_ID = ud.PUBLISHED_ARTIFACT_ID WHERE pa.CODE_NAME = 'LifeInsuranceRequest' AND JSON_VALUE(BODY, '$.contract.number') = N'НОМЕР_ДОГОВОРА'" -o c:\sql\REQUEST_COMMON_BODY.json
    sqlcmd -S localhost -d ADINSURE_TEST -U adinsure -P adinsure -f 65001 -y 0 -Q "set nocount on; SELECT BODY FROM BFX.UNIVERSAL_DOCUMENT ud LEFT JOIN CFX.PUBLISHED_ARTIFACT pa ON pa.PUBLISHED_ARTIFACT_ID = ud.PUBLISHED_ARTIFACT_ID WHERE pa.CODE_NAME = 'Endowment' AND JSON_VALUE(BODY, '$.mainAttributes.contract.number') = N'НОМЕР_ДОГОВОРА'" -o c:\sql\ENDOWMENT_BODY.json
    sqlcmd -S localhost -d ADINSURE_TEST -U adinsure -P adinsure -f 65001 -y 0 -Q "set nocount on; SELECT COMMON_BODY FROM BFX.UNIVERSAL_DOCUMENT ud LEFT JOIN CFX.PUBLISHED_ARTIFACT pa ON pa.PUBLISHED_ARTIFACT_ID = ud.PUBLISHED_ARTIFACT_ID WHERE pa.CODE_NAME = 'Endowment' AND JSON_VALUE(BODY, '$.mainAttributes.contract.number') = N'НОМЕР_ДОГОВОРА'" -o c:\sql\ENDOWMENT_COMMON_BODY.json
    sqlcmd -S localhost -d ADINSURE_TEST -U adinsure -P adinsure -f 65001 -y 0 -Q "set nocount on; SELECT BODY FROM BFX.UNIVERSAL_DOCUMENT ud LEFT JOIN CFX.PUBLISHED_ARTIFACT pa ON pa.PUBLISHED_ARTIFACT_ID = ud.PUBLISHED_ARTIFACT_ID WHERE pa.CODE_NAME = 'LifeInsuranceAttachmentVerification' AND JSON_VALUE(BODY, '$.number') = N'НОМЕР_ДОГОВОРА'" -o c:\sql\VERIFICATION_BODY.json
    sqlcmd -S localhost -d ADINSURE_TEST -U adinsure -P adinsure -f 65001 -y 0 -Q "set nocount on; SELECT COMMON_BODY FROM BFX.UNIVERSAL_DOCUMENT ud LEFT JOIN CFX.PUBLISHED_ARTIFACT pa ON pa.PUBLISHED_ARTIFACT_ID = ud.PUBLISHED_ARTIFACT_ID WHERE pa.CODE_NAME = 'LifeInsuranceAttachmentVerification' AND JSON_VALUE(BODY, '$.number') = N'НОМЕР_ДОГОВОРА'" -o c:\sql\VERIFICATION_COMMON_BODY.json
    sqlcmd -S localhost -d ADINSURE_TEST -U adinsure -P adinsure -f 65001 -y 0 -Q "set nocount on; SELECT BODY FROM ACC.PAYMENT_ORDER WHERE JSON_VALUE(BODY, '$.paymentOrderInformation.referenceNumber') = N'НОМЕР_ДОГОВОРА'" -o c:\sql\PAYMENT_ORDER_BODY.json
    sqlcmd -S localhost -d ADINSURE_TEST -U adinsure -P adinsure -f 65001 -y 0 -Q "set nocount on; SELECT COMMON_BODY FROM ACC.PAYMENT_ORDER WHERE JSON_VALUE(BODY, '$.paymentOrderInformation.referenceNumber') = N'НОМЕР_ДОГОВОРА'" -o c:\sql\PAYMENT_ORDER_COMMON_BODY.json

    -- Запустить после обновления
    sqlcmd -S localhost -d ADINSURE_TEST -U adinsure -P adinsure -f 65001 -y 0 -Q "set nocount on; SELECT BODY FROM PAS.CONTRACT WHERE CONTRACT_NUMBER = N'НОМЕР_ДОГОВОРА'" -o c:\sql\POLICY_BODY_UPD.json
    sqlcmd -S localhost -d ADINSURE_TEST -U adinsure -P adinsure -f 65001 -y 0 -Q "set nocount on; SELECT COMMON_BODY FROM PAS.CONTRACT WHERE CONTRACT_NUMBER = N'НОМЕР_ДОГОВОРА'" -o c:\sql\POLICY_COMMON_BODY_UPD.json
    sqlcmd -S localhost -d ADINSURE_TEST -U adinsure -P adinsure -f 65001 -y 0 -Q "set nocount on; SELECT SNAPSHOT_BODY FROM PAS.CONTRACT WHERE CONTRACT_NUMBER = N'НОМЕР_ДОГОВОРА'" -o c:\sql\POLICY_SNAPSHOT_BODY_UPD.json
    sqlcmd -S localhost -d ADINSURE_TEST -U adinsure -P adinsure -f 65001 -y 0 -Q "set nocount on; SELECT BODY FROM PAS.CONTRACT WHERE CONTRACT_NUMBER = N'НОМЕР_ДОГОВОРА/1'" -o c:\sql\POLICY_AMENDMENT_BODY_UPD.json
    sqlcmd -S localhost -d ADINSURE_TEST -U adinsure -P adinsure -f 65001 -y 0 -Q "set nocount on; SELECT COMMON_BODY FROM PAS.CONTRACT WHERE CONTRACT_NUMBER = N'НОМЕР_ДОГОВОРА/1'" -o c:\sql\POLICY_AMENDMENT_COMMON_BODY_UPD.json
    sqlcmd -S localhost -d ADINSURE_TEST -U adinsure -P adinsure -f 65001 -y 0 -Q "set nocount on; SELECT SNAPSHOT_BODY FROM PAS.CONTRACT WHERE CONTRACT_NUMBER = N'НОМЕР_ДОГОВОРА/1'" -o c:\sql\POLICY_AMENDMENT_SNAPSHOT_BODY_UPD.json
    sqlcmd -S localhost -d ADINSURE_TEST -U adinsure -P adinsure -f 65001 -y 0 -Q "set nocount on; SELECT BODY FROM PAS.CONTRACT WHERE CONTRACT_NUMBER LIKE N'%РАС%' AND ORIGINAL_DOCUMENT_ID = (SELECT ORIGINAL_DOCUMENT_ID FROM PAS.CONTRACT WHERE CONTRACT_NUMBER = N'НОМЕР_ДОГОВОРА')" -o c:\sql\POLICY_CANCELLATION_BODY_UPD.json
    sqlcmd -S localhost -d ADINSURE_TEST -U adinsure -P adinsure -f 65001 -y 0 -Q "set nocount on; SELECT COMMON_BODY FROM PAS.CONTRACT WHERE CONTRACT_NUMBER LIKE N'%РАС%' AND ORIGINAL_DOCUMENT_ID = (SELECT ORIGINAL_DOCUMENT_ID FROM PAS.CONTRACT WHERE CONTRACT_NUMBER = N'НОМЕР_ДОГОВОРА')" -o c:\sql\POLICY_CANCELLATION_COMMON_BODY_UPD.json
    sqlcmd -S localhost -d ADINSURE_TEST -U adinsure -P adinsure -f 65001 -y 0 -Q "set nocount on; SELECT SNAPSHOT_BODY FROM PAS.CONTRACT WHERE CONTRACT_NUMBER LIKE N'%РАС%' AND ORIGINAL_DOCUMENT_ID = (SELECT ORIGINAL_DOCUMENT_ID FROM PAS.CONTRACT WHERE CONTRACT_NUMBER = N'НОМЕР_ДОГОВОРА')" -o c:\sql\POLICY_CANCELLATION_SNAPSHOT_BODY_UPD.json
    sqlcmd -S localhost -d ADINSURE_TEST -U adinsure -P adinsure -f 65001 -y 0 -Q "set nocount on; SELECT BODY FROM CLM.CLAIM WHERE JSON_VALUE(BODY, '$.mainAttributes.contract.number') = N'НОМЕР_ДОГОВОРА'" -o c:\sql\CLAIM_BODY_UPD.json
    sqlcmd -S localhost -d ADINSURE_TEST -U adinsure -P adinsure -f 65001 -y 0 -Q "set nocount on; SELECT COMMON_BODY FROM CLM.CLAIM WHERE JSON_VALUE(BODY, '$.mainAttributes.contract.number') = N'НОМЕР_ДОГОВОРА'" -o c:\sql\CLAIM_COMMON_BODY_UPD.json
    sqlcmd -S localhost -d ADINSURE_TEST -U adinsure -P adinsure -f 65001 -y 0 -Q "set nocount on; SELECT BODY FROM BFX.UNIVERSAL_DOCUMENT WHERE JSON_VALUE(BODY, '$.contract.number') = N'НОМЕР_ДОГОВОРА'" -o c:\sql\REQUEST_BODY_UPD.json
    sqlcmd -S localhost -d ADINSURE_TEST -U adinsure -P adinsure -f 65001 -y 0 -Q "set nocount on; SELECT COMMON_BODY FROM BFX.UNIVERSAL_DOCUMENT WHERE JSON_VALUE(BODY, '$.contract.number') = N'НОМЕР_ДОГОВОРА'" -o c:\sql\REQUEST_COMMON_BODY_UPD.json
    sqlcmd -S localhost -d ADINSURE_TEST -U adinsure -P adinsure -f 65001 -y 0 -Q "set nocount on; SELECT BODY FROM BFX.UNIVERSAL_DOCUMENT ud LEFT JOIN CFX.PUBLISHED_ARTIFACT pa ON pa.PUBLISHED_ARTIFACT_ID = ud.PUBLISHED_ARTIFACT_ID WHERE pa.CODE_NAME = 'Endowment' AND JSON_VALUE(BODY, '$.mainAttributes.contract.number') = N'НОМЕР_ДОГОВОРА'" -o c:\sql\ENDOWMENT_BODY_UPD.json
    sqlcmd -S localhost -d ADINSURE_TEST -U adinsure -P adinsure -f 65001 -y 0 -Q "set nocount on; SELECT COMMON_BODY FROM BFX.UNIVERSAL_DOCUMENT ud LEFT JOIN CFX.PUBLISHED_ARTIFACT pa ON pa.PUBLISHED_ARTIFACT_ID = ud.PUBLISHED_ARTIFACT_ID WHERE pa.CODE_NAME = 'Endowment' AND JSON_VALUE(BODY, '$.mainAttributes.contract.number') = N'НОМЕР_ДОГОВОРА'" -o c:\sql\ENDOWMENT_COMMON_BODY_UPD.json
    sqlcmd -S localhost -d ADINSURE_TEST -U adinsure -P adinsure -f 65001 -y 0 -Q "set nocount on; SELECT BODY FROM BFX.UNIVERSAL_DOCUMENT ud LEFT JOIN CFX.PUBLISHED_ARTIFACT pa ON pa.PUBLISHED_ARTIFACT_ID = ud.PUBLISHED_ARTIFACT_ID WHERE pa.CODE_NAME = 'LifeInsuranceAttachmentVerification' AND JSON_VALUE(BODY, '$.number') = N'НОМЕР_ДОГОВОРА'" -o c:\sql\VERIFICATION_BODY_UPD.json
    sqlcmd -S localhost -d ADINSURE_TEST -U adinsure -P adinsure -f 65001 -y 0 -Q "set nocount on; SELECT COMMON_BODY FROM BFX.UNIVERSAL_DOCUMENT ud LEFT JOIN CFX.PUBLISHED_ARTIFACT pa ON pa.PUBLISHED_ARTIFACT_ID = ud.PUBLISHED_ARTIFACT_ID WHERE pa.CODE_NAME = 'LifeInsuranceAttachmentVerification' AND JSON_VALUE(BODY, '$.number') = N'НОМЕР_ДОГОВОРА'" -o c:\sql\VERIFICATION_COMMON_BODY_UPD.json
    sqlcmd -S localhost -d ADINSURE_TEST -U adinsure -P adinsure -f 65001 -y 0 -Q "set nocount on; SELECT BODY FROM ACC.PAYMENT_ORDER WHERE JSON_VALUE(BODY, '$.paymentOrderInformation.referenceNumber') = N'НОМЕР_ДОГОВОРА'" -o c:\sql\PAYMENT_ORDER_BODY_UPD.json
    sqlcmd -S localhost -d ADINSURE_TEST -U adinsure -P adinsure -f 65001 -y 0 -Q "set nocount on; SELECT COMMON_BODY FROM ACC.PAYMENT_ORDER WHERE JSON_VALUE(BODY, '$.paymentOrderInformation.referenceNumber') = N'НОМЕР_ДОГОВОРА'" -o c:\sql\PAYMENT_ORDER_COMMON_BODY_UPD.json

    ```

- [ADIRGSLSUPP-168](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-168): Исправлена ошибка при нажатии "Отправить договор" связанная с незаполненными правилами страхования.

    ###### Выполнить скрипт:
    * database\sql\migration\ADIRGSLSUPP-168-update-cacb-empty-insurance-rules.sql

- [ADIRGSLSUPP-320](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-320): Обновление PARTY_CODE в АСС после массовой дедупликации

    Выполнить скрипты:
    1. database\sql\migration\ADIRGSLSUPP-320-update-qoute-holder-codes.sql
    2. database\sql\migration\ADIRGSLSUPP-320-update-quote-insured-codes.sql
    3. database\sql\migration\ADIRGSLSUPP-320-update-policy-holder-codes.sql
    4. database\sql\migration\ADIRGSLSUPP-320-update-policy-insured-codes.sql

- [ADIRGSLSUPP-350](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-350): Добавить в журнал договоров поиск по номеру будущего договора (НОТА).

    После паблиша необходимо выполнить переиндексацию ES по котировкам и договорам.

- [ADIRGSLSUPP-356](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-356): Постпродажное сопровождение:

    * Исправлены ошибки при создании ДС на расторжение из заявки.
    * Из списка "ДС созданные из Заявки" убраны ссылки на Дожития.
    * Сотруднику ОПЕРУ добавлены недостающие права.

    Выполнить скрипты строго по порядку:
    1. database\sql\migration\ADIRGSLSUPP-356-Request-prepare-policy-technical-information.sql
    2. database\sql\migration\ADIRGSLSUPP-356-Request-update-policy-technical-information.sql

- [ADIRGSLSUPP-387](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-387): Анкеты финансовой грамотности на карточке контрагента:

    * Для заполнения анкет требуется пересохранить карточку контрагента.

    Для заполнения анкет по всем контрагентам выполнить скрипты:
    1. database\sql\migration\ADIRGSLSUPP-387-set-empty-finKnowledgeQuestionnaire.sql
    2. database\sql\migration\ADIRGSLSUPP-387-set-empty-finKnowledgeQuestionnaire2023.sql

- [ADIRGSLSUPP-400](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-400): Не очистился план обмена 1С по ряду платежей (продуктив) - часть 2
    Необходимо выполнить скрипт:
    database\sql\migration\get_transformed_transactions.sql

- [ADIRGSLSUPP-425](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-425): После установки необходимо выполнить скрипт:
    database/sql/migration/ADIRGSLSUPP-425-update-is-migrated.sql

- [ADIRGSLSUPP-426](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-426): Витрина задач:

    Переработан поиск для Заявок, Запросов из котировок, Убытков, ДИД/ДОЖ.
    Переработан поиск для ДС, Запросов из расторжений.
    Исправлена ошибка при закрытии заявок.

    Выполнить скрипты после паблиша (если не были выполнены ранее):
    1. database\sql\migration\ADIRGSLSUPP-426-update-claim-sat-policy-data.sql
    2. database\sql\migration\ADIRGSLSUPP-426-update-endowment-sat-policy-data.sql
    3. database\sql\migration\ADIRGSLSUPP-426-update-inquiry-sat-policy-data.sql.sql
    4. database\sql\migration\ADIRGSLSUPP-426-update-request-sat-policy-data.sql

- [ADIRGSLSUPP-435](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-435): НОТА_Договоры выпущенные с некорректной ставкой.

    * При выпуске (оформлении) договоров 25.08 и 26.08. в часть договоров осталась старая ставка 13, в часть договоров подтянулась новая ставка 15
    Необходимо найти договоры со ставкой 13 купон 3.25, 3.25, 3.25, 3.25, в продукте Нота Премиум 1 год Высшая лига 3.0 (префикс 422) и заменить в них ставку с 13 а 15, купоны с 3.25, 3.25, 3.25, 3.25 на 3,75, 3,75, 3,75, 3,75

    Для обновления данных выполнить скрипт:
    database\sql\migration\ADIRGSLSUPP-435-update-contracts-fixRate-and-participationCoeff.sql

- [ADIRGSLSUPP-461](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-461): Удалены данные анкет фин. грамотности из карточек ЮЛ.

    Выполнить скрипт:
    database\sql\migration\ADIRGSLSUPP-387-clean-LegalEntity-finKnowledgeQuestionnaires.sql


### New Features (94 changes)

- [ADIRGSLSUPP-126](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-126): Разработан сервис получения данных из конфигурации правил страхования по коду правил.

- [ADIRGSLSUPP-130](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-130): Добавлена возможность создания страхового события для договоров в статусе "Завершен"

- [ADIRGSLSUPP-165](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-165): РСД. Реализовать сторно РСД по старым условиям

- [ADIRGSLSUPP-171](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-171): Карточка ЮЛ: поменять порядок внесения сведений о лицензии.

- [ADIRGSLSUPP-180](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-180): Корректировка РНВ категории Расторжение по возврату части премии

- [ADIRGSLSUPP-240](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-240): БФКО_Базис Инвест с 17 БА

- [ADIRGSLSUPP-246](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-246): Печатные формы для продукта ДМС БФКО РВ

- [ADIRGSLSUPP-281](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-281): Настроить поиск ОПФ в карточке ЮЛ.

- [ADIRGSLSUPP-285](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-285): Отключение валидации по декларациям на доп. соглашениях.

- [ADIRGSLSUPP-290](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-290): Исправлен маппинг в common body.

- [ADIRGSLSUPP-295](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-295): Нота Высшая Лига 3.0. Печатные формы

- [ADIRGSLSUPP-297](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-297): Правки по результатам тестирования Замены сервисов

- [ADIRGSLSUPP-300](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-300): Change investmemt profit payment line in endowment by event reason

- [ADIRGSLSUPP-307](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-307): Оптимизация отчёта по Ноте

- [ADIRGSLSUPP-308](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-308): Разработан механизм дедубликации для ОПЕРУ в UI с сохранением дедуплицированного контрагента.

- [ADIRGSLSUPP-315](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-315): Создан энричмент для блока подарочных сервисов

- [ADIRGSLSUPP-323](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-323): БФКО_НОТА_Доработка в части отражения номера договора.

- [ADIRGSLSUPP-324](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-324): ПСБ масс и ОРС. Смена кешбека и ставок.

- [ADIRGSLSUPP-325](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-325): Контрагенты_снять валидации с устаревших данных

- [ADIRGSLSUPP-331](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-331): Исправление даты закрытия в продукте IDG1REINVEST (ePolicytConfiguration)

- [ADIRGSLSUPP-333](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-333): Отключить создание проводок при отсутствии журналов

- [ADIRGSLSUPP-334](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-334): Скорректировано поведение валидации на согласие с декларацией при изменении продукта.

- [ADIRGSLSUPP-336](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-336): БФКО_Печатные формы по НОТЕ_правки

- [ADIRGSLSUPP-337](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-337): Доработка корпов по результату встречи.

- [ADIRGSLSUPP-339](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-339): Скорректировано поведение енричмента при оформлении договоров КСЖ.

- [ADIRGSLSUPP-341](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-341): Добавить пользователя, кому можно направлять рассылки по электрополисам на тесте

- [ADIRGSLSUPP-342](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-342): НОТА_Высшая лига 3.0_Ошибка в заявлении

- [ADIRGSLSUPP-343](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-343): ПСБ ОРС. Изменение ставки. Драйвер гарантия 3года.

- [ADIRGSLSUPP-345](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-345): Отключена проверка даты заключения для Ноты.

- [ADIRGSLSUPP-346](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-346): Изменено определение оплаты в отчёте по Ноте.

- [ADIRGSLSUPP-347](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-347): Скорректировать инвестиционные декларации

- [ADIRGSLSUPP-348](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-348): Доработка функционала андеррайтинга.

- [ADIRGSLSUPP-347](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-347): Скорректировать настройки Драйвер Гарантия БФКО РВ

- [ADIRGSLSUPP-355](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-355): Андеррайтинг_доработка функционала (одновременное искл. и замена рисков).

- [ADIRGSLSUPP-357](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-357): Доработки и исправления для ДС на расторжение договоров

- [ADIRGSLSUPP-358](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-358): Реализован функционал запросов в смежные подразделения для ДС на расторжение.

- [ADIRGSLSUPP-359](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-359): Витрина задач:

    * Добавлены "Номер договора" и "Страхователь" в фильтры и в грид.

- [ADIRGSLSUPP-364](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-364): Добавлено действие по изменению статуса договора с Расторгнут на Действует, доступное только актеру Система.

- [ADIRGSLSUPP-366](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-366): Исправлена ошибка при экспорте реестра платежей.

- [ADIRGSLSUPP-368](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-368): Исправлена не корректная обработка обработка рнв (обновление связанных сущностей) из взаимозачета для ДС на расторжение.

- [ADIRGSLSUPP-369](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-369): Настройка параметров для теста, предпрода и прода для формирования XML сообщений для Росфинмониторинга

- [ADIRGSLSUPP-370](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-370): БФКО_НОТА_Высшая лига 3.0_Правки в ИД

- [ADIRGSLSUPP-374](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-374): Сервиса витрины:

    * Добавлен новый блок (strategies) по рекомендованным к выбору стратегиям.

- [ADIRGSLSUPP-377](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-377): Ошибочные данные в отчете по партнеру ООО «Инновационные Решения»

- [ADIRGSLSUPP-378](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-378): БФКО_НОТА_Высшая лига 3.0_изменение ставки в заявлении на страховании.

- [ADIRGSLSUPP-380](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-380): БФКО. НОТА. Изменение ставки.

- [ADIRGSLSUPP-381](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-381): Сервис обратного мэппинга:

    * Доработан поиск по связке код продукта + код стратегии.
    * Добавлен скрипт обновления данных database\sql\migration\efr_product_risk_actual_data.sql для таблицы PAS_IMPL.EFR_PRODUCT_RISK

- [ADIRGSLSUPP-382](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-382): Не очистился план обмена 1С по ряду платежей (продуктив) - часть 2

- [ADIRGSLSUPP-383](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-383): БФКО_НОТА_Высшая лига 3.0_Правки в заявлении на страхование с 18.08.

- [ADIRGSLSUPP-384](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-384): БФКО.Нота.Высшая лига3.0.Изменение ставки.

- [ADIRGSLSUPP-385](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-385): Доработка конфигурационного файла в части валютных договоров

- [ADIRGSLSUPP-389](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-389): Некорректное отображение мигрированных договоров в интеграции.

- [ADIRGSLSUPP-390](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-390): Событийная модель в системе и передача информации о событиях партнёрам новому подписчику ELMA365.

- [ADIRGSLSUPP-391](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-391): В файл implSettings.json для PROD добавлен путь к сетевой папке вложений

- [ADIRGSLSUPP-392](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-392): БФКО_НОТА_Правки в заявлении на страхование

- [ADIRGSLSUPP-393](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-393): Отображение ДИД на договоре:

    Для каждого сочетания Договор + Дата События + Тип выплаты будет отображена последняя загруженная версия суммы.

- [ADIRGSLSUPP-396](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-396): Добавление стратегий Базис Инвест 17 и правки Стань миллионером Оптима

- [ADIRGSLSUPP-398](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-398): Реинвестирование. Заявление на дожитие. Правки в части вывода адреса

- [ADIRGSLSUPP-399](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-399): Доработан запрос договора в энричменте участников договора для дожитий, расторжений, убытков и дид.

- [ADIRGSLSUPP-401](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-401): Изменение кешбеков и ставок.

- [ADIRGSLSUPP-403](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-403): Исправление кодировки для формы страховой выплаты "В счёт оплаты взноса"

- [ADIRGSLSUPP-405](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-405): Увеличен таймаут для запросов по сложным джобам.

- [ADIRGSLSUPP-407](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-407): Добавлена задержка при выгрузке отчета по пользователям. В отчет добавлен столбец с кодом подразделения.

- [ADIRGSLSUPP-408](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-408): Корректировка сегмента продаж в настройке продуктов под миграцию.

- [ADIRGSLSUPP-41](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-41): Добавление клиентской логики для расчёта ДИД в ППО
    Добавление серверной логики для расчёта ДИД в ППО (Настройка автоматического расчёта в дожитиях/ДИД/расторжениях)

- [ADIRGSLSUPP-410](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-410): Отключение триггера на ручной адрес для apiSender API_EFR.

- [ADIRGSLSUPP-415](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-415): ПСБ масс и ОРС_СМП_обновление ставок и кешбека c 30.08. НОТА_обновление дат наблюдений

- [ADIRGSLSUPP-416](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-416): Исправлены ошибки при загрузке реестров КСЖ.

- [ADIRGSLSUPP-418](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-418): Настройка событийной модели для ЕФР в продуктиве.

- [ADIRGSLSUPP-419](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-419): Разработан инричмент, который подтягивает наименование «currencyDesc» и числовой код валюты «currencyNumericCode» при заполнении буквенного кода «currencyCode».

    ###### Вызов инричмента:
    ```
    	"enrichFields": [
    		"/basicConditions[SetCurrency]"
    	]
    ```

- [ADIRGSLSUPP-420](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-420): Исправлены ошибки при загрузке пользователей.

- [ADIRGSLSUPP-422](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-422): Правки по Базис Инвест ОАС, ПСБ РВ, Стань Миллионером. Оптима

- [ADIRGSLSUPP-423](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-423): Отключение валидации для договоров isMigrated=true по проверке на allowCalcFromPremium/allowCalcFromInsuredSum.

- [ADIRGSLSUPP-432](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-432): Закрыть кнопку возможности распечатать договор продукта НОТА

- [ADIRGSLSUPP-433](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-433): Добавить пользователей, кому можно направлять рассылки по электрополисам на тесте и предпроде

- [ADIRGSLSUPP-434](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-434): Добавление нового продукта Драйвер гарантия и правки СМ Оптима

- [ADIRGSLSUPP-436](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-436): Включить выгрузку PartyCode и PartyID в реестр для загрузки в САП

- [ADIRGSLSUPP-442](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-442): ПСБ. Драйвер гарантия 5 лет. Изменение ставки.

- [ADIRGSLSUPP-450](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-450): Исправлена видимость договоров после массового реиндекса.

- [ADIRGSLSUPP-451](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-451): Ошибка в лимите СС по фин резерву

- [ADIRGSLSUPP-452](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-452): Удаленное реинвестирование_доработка заявления на выплату по Дожитию

- [ADIRGSLSUPP-458](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-458): Изменён расчёт периода охлаждения при расторжении договора страхования.

- [ADIRGSLSUPP-460](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-460): Доработка расчета рисков и СС для НОТА Высшая лига 4.0

- [ADIRGSLSUPP-464](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-464): В контракте 95700-77016752 (Подписан) по рискам указаны нулевые суммы

- [ADIRGSLSUPP-465](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-465): Заявление по продукту НОТА Высшая лига 4.0

- [ADIRGSLSUPP-468](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-468): Настройка продукта Нота Высшая лига 4.0

- [ADIRGSLSUPP-474](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-474): Доработки по Нота Высшая лига 4.0

- [ADIRGSLSUPP-476](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-476): Правки расчета рисков и СС для НОТА Высшая лига 4.0

- [ADIRGSLSUPP-486](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-486): Маппинг Нота Высшая Лига 4.0 для БФКО

- [ADIRGSLSUPP-61](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-61): Выбор инициатора с учетом дочерних подразделений.

- [ADIRGSLSUPP-69](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-69): Скрипт по удалению РНВ и сервис по доведению документов-источников до финального статуса без РНВ

- [ADIRGSLSUPP-77](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-77): Разработан функционал рекомендаций к выбору стратегий.

- [ADIRGSLSUPP-82](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-82): АВР. Создание актов с дополняющими/не пересекающимися видами страхования или продуктами

- [ADIRGSLSUPP-98](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-98): Добавлена выгрузка данных по связанным платежам в excel файл с подсчётом итоговых сумм.


### Fixed (9 changes)

- [ADIRGSL-3016](https://jira.adacta-fintech.com/browse/ADIRGSL-3016): Проводки. РНВ. Частичный взaимозачет

- [ADIRGSLSUPP-120](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-120): Заявки постпродажного сопровождения:

    * Исправлены ошибки при открытии заявки.
    * Исправлен формат даты поступления заявления в СК.

- [ADIRGSLSUPP-282](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-282): Ошибка при загрузке реестра платежей (продуктив)

- [ADIRGSLSUPP-322](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-322): Аккаунтинг_тест: тестирование валютной переоценки_ч1

- [ADIRGSLSUPP-327](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-327): Создать индексы на на таблицах в БД миграции

- [ADIRGSLSUPP-329](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-329): Очень медленно идут очереди на среде миграции

- [ADIRGSLSUPP-344](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-344): Не отработали джобы на препроде после переноса БД миграции

- [ADIRGSLSUPP-70](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-70): Исправлена ошибка при удалении контрагента.

- [ADIRGSLSUPP-92](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-92): Исправлен принцип опрделения const tabNames

# 54.0.0-rc1 (2023-08-07)

### Breaking Changes (7 changes)

- [ADIRGSL-3201](https://jira.adacta-fintech.com/browse/ADIRGSL-3201): Реализована отмена взаимозачета в РНВ

    **Deployment notes**
    Скрипт 7.10_006.020.007_360.sql должен быть выполнен до паблиша.
    Необходимо сделать реиндекс индекса PaymentOrder

- [ADIRGSL-3612](https://jira.adacta-fintech.com/browse/ADIRGSL-3612): Реализовано добавление нескольких одинаковых ВП для дожитий/дид

    **Deployment notes**
    До паблиша должны быть выполнены автоматические скрипты:
    1.7.10_006.020.007_355.sql
    2.7.10_006.020.007_356.sql

    После паблиша выполнить миграционные скрипты:
    1.ADIRGSL-3612-endowment-backup.sql
    2.ADIRGSL-3612-update-endowment-body.sql
    3.ADIRGSL-3612-update-endowment-ass.sql

- [ADIRGSL-3644](https://jira.adacta-fintech.com/browse/ADIRGSL-3644): После установки необходимо выполнить скрипт на удаление данных из более не используемых таблиц:
    database\sql\migration\ADIRGSL-3644-remove-old-data.sql

- [ADIRGSLSUPP-70](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-70): Базовый UI для дедупликации.

    После установки необходимо выполнить скрипт:
    database\sql\migration\ADIRGSLSUPP-70-execute_deduplication procedure.sql

- [ADIRGSLSUPP-86](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-86): После установки необходимо выполнить скрипт:
    database\sql\migration\impl_ldwh_zpartner.sql

- [ADIRGSLSUPP-88](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-88): После установки необходимо выполнить скрипт:
    database\sql\migration\impl_ldwh_zins_cont.sql

- [ADIRGSLSUPP-89](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-89): После установки необходимо выполнить скрипт:
    database\sql\migration\impl_ldwh_zloss.sql


### New Features (93 changes)

- [ADIRGSL-2136](https://jira.adacta-fintech.com/browse/ADIRGSL-2136): БФКО РВ. Продукт ДМС.

- [ADIRGSL-2806](https://jira.adacta-fintech.com/browse/ADIRGSL-2806): Настроены оповещение ОПЕРу, в случае если выплата не произведена в течение 5 рабочих с даты передачи документов в бухгалтерию.

- [ADIRGSL-3294](https://jira.adacta-fintech.com/browse/ADIRGSL-3294): Андеррайтинг_доработки по продуктам для ОАС

- [ADIRGSL-3321](https://jira.adacta-fintech.com/browse/ADIRGSL-3321): КСЖ_доработка вылидации на срок + новое поле в загрузчике

- [ADIRGSL-3344](https://jira.adacta-fintech.com/browse/ADIRGSL-3344): Отключить триггеры на комплаенс для договоров ДМС

- [ADIRGSL-3504](https://jira.adacta-fintech.com/browse/ADIRGSL-3504): Правки по результатам тестирования Драйвер гарантия БФКО РВ

- [ADIRGSL-3513](https://jira.adacta-fintech.com/browse/ADIRGSL-3513): Ограничена возможность выбора неактивных пользователей в качестве инициаторов по договору.

- [ADIRGSL-3514](https://jira.adacta-fintech.com/browse/ADIRGSL-3514): Разработан функционал по загрузке ДИД в БД и отображению на договоре.

- [ADIRGSL-3522](https://jira.adacta-fintech.com/browse/ADIRGSL-3522): Журнал договоров_ изменить поиск по АД

- [ADIRGSL-3590](https://jira.adacta-fintech.com/browse/ADIRGSL-3590): Сервис витрины продуктов:

    * В блоке services сделан вывод САПовских кодов.
    * В блоке variants сделан вывод нового тега InshdFlg.

- [ADIRGSL-3605](https://jira.adacta-fintech.com/browse/ADIRGSL-3605): НОТА_при создании договора не меняются даты по рискам

- [ADIRGSL-3611](https://jira.adacta-fintech.com/browse/ADIRGSL-3611): Создан энричмент для заполнения анкет контрагентов без ответов.

- [ADIRGSL-3615](https://jira.adacta-fintech.com/browse/ADIRGSL-3615): Создан энричмент для заполнения наименования пакетов по кодам пакетов.

- [ADIRGSL-3617](https://jira.adacta-fintech.com/browse/ADIRGSL-3617): Исправление проблемы с чекбоксом "Указать сумму к выплате" для дожитий.

- [ADIRGSL-3619](https://jira.adacta-fintech.com/browse/ADIRGSL-3619): Доработка отчета для оперу по НОТЕ.

- [ADIRGSL-3623](https://jira.adacta-fintech.com/browse/ADIRGSL-3623): Андеррайтинг НСЖ и ИСЖ - доработка по результату тестирования 2

- [ADIRGSL-3632](https://jira.adacta-fintech.com/browse/ADIRGSL-3632): Печатные формы для продукта НОТА Высшая лига 2.0.

- [ADIRGSL-3649](https://jira.adacta-fintech.com/browse/ADIRGSL-3649): Исправление отображения действия "Создать страховое событие"

- [ADIRGSL-3655](https://jira.adacta-fintech.com/browse/ADIRGSL-3655): Верификация_Кнопка «на проверку» доступна всем.

- [ADIRGSL-3656](https://jira.adacta-fintech.com/browse/ADIRGSL-3656): Ошибка на виртуальной машине

- [ADIRGSL-3659](https://jira.adacta-fintech.com/browse/ADIRGSL-3659): Возврат валидации в продукте "Моя защита"4 КСЖ потребы

- [ADIRGSL-3660](https://jira.adacta-fintech.com/browse/ADIRGSL-3660): Доработка загрузки строк АВР (Доп.КВ)

- [ADIRGSL-3662](https://jira.adacta-fintech.com/browse/ADIRGSL-3662): АВР_код точки РМД

- [ADIRGSL-3663](https://jira.adacta-fintech.com/browse/ADIRGSL-3663): Исправлена ошибка с отбором contract versions, когда отуствуют dimensions на старых документах.

- [ADIRGSL-3664](https://jira.adacta-fintech.com/browse/ADIRGSL-3664): Изменение шаблона для продукта Финансовый резерв

- [ADIRGSL-3665](https://jira.adacta-fintech.com/browse/ADIRGSL-3665): Зенит. Новый продукт. Стратегия на пять.Гарант

- [ADIRGSL-3669](https://jira.adacta-fintech.com/browse/ADIRGSL-3669): Тестовая реализация сервиса для реиндекса конкретной сущности.

- [ADIRGSL-3676](https://jira.adacta-fintech.com/browse/ADIRGSL-3676): БФКО. НОТА. Правки инвест.параметров.

- [ADIRGSL-3677](https://jira.adacta-fintech.com/browse/ADIRGSL-3677): РНВ. Перевод в статус Подтвержден из Журнала РНВ

- [ADIRGSL-3680](https://jira.adacta-fintech.com/browse/ADIRGSL-3680): БФКО РВ. Добавление продукта ДМС.

- [ADIRGSL-3681](https://jira.adacta-fintech.com/browse/ADIRGSL-3681): Правки по печатным формам НОТА Премиум 1 год

- [ADIRGSL-3682](https://jira.adacta-fintech.com/browse/ADIRGSL-3682): Верификация_ошибки

- [ADIRGSL-3685](https://jira.adacta-fintech.com/browse/ADIRGSL-3685): Нота_доработать триггер на комплаенс

- [ADIRGSL-3687](https://jira.adacta-fintech.com/browse/ADIRGSL-3687): Правки заявления по НОТЕ премиум NOTE1BFKO

- [ADIRGSL-3688](https://jira.adacta-fintech.com/browse/ADIRGSL-3688): БФКО. Изменени КУ в Базис Актив 3 и 5 лет.

- [ADIRGSL-3689](https://jira.adacta-fintech.com/browse/ADIRGSL-3689): Создание нового продукта НСЖ "Стань миллионером. Оптима" со сниженной ставкой для ОАС

- [ADIRGSL-3690](https://jira.adacta-fintech.com/browse/ADIRGSL-3690): Добавление в UI в АВР поиск по Примечанию/"Notes"

- [ADIRGSL-3692](https://jira.adacta-fintech.com/browse/ADIRGSL-3692): Правки в параметрак продуктов-СНП.ГарантЗенит и НОТА1БФКО.

- [ADIRGSL-3694](https://jira.adacta-fintech.com/browse/ADIRGSL-3694): Исправлен период действия по продукту для миграции R532OAS

- [ADIRGSL-3695](https://jira.adacta-fintech.com/browse/ADIRGSL-3695): Маппинг продукта Стратегия на пять. Гарант для Зенит масс

- [ADIRGSL-3696](https://jira.adacta-fintech.com/browse/ADIRGSL-3696): Печать заявления после согласования заявки НОТА

- [ADIRGSL-3697](https://jira.adacta-fintech.com/browse/ADIRGSL-3697): Формирование XML сообщений для Росфинмониторинга.

- [ADIRGSL-3698](https://jira.adacta-fintech.com/browse/ADIRGSL-3698): Журнал договоров не отображается у ОПЕРУ

- [ADIRGSL-3699](https://jira.adacta-fintech.com/browse/ADIRGSL-3699): Слетело условие "Страхователь = Застрахованный" для электрополисов в 53 релизе (тест)

- [ADIRGSL-3702](https://jira.adacta-fintech.com/browse/ADIRGSL-3702): Внести правки печатную форму Информационного уведомления по форме банка

- [ADIRGSL-3703](https://jira.adacta-fintech.com/browse/ADIRGSL-3703): Заменить сервис для продукта Стратегия на пять Гарант Зенит

- [ADIRGSL-3704](https://jira.adacta-fintech.com/browse/ADIRGSL-3704): Скорректировать текст в Анкете Фин Грамотности Нота 1 год премиум

- [ADIRGSL-3708](https://jira.adacta-fintech.com/browse/ADIRGSL-3708): Добавлена роль "ExcludeEBMOPTIMA". При добавлении данной роли пользователю станет недоступен для оформления продукт EBMOPTIMAOAS2.

- [ADIRGSL-3709](https://jira.adacta-fintech.com/browse/ADIRGSL-3709): Внести правки в раздел ДИД

- [ADIRGSL-3713](https://jira.adacta-fintech.com/browse/ADIRGSL-3713): Правки по продуктам NOTE1BFKO и EBMGZENIT

- [ADIRGSL-3714](https://jira.adacta-fintech.com/browse/ADIRGSL-3714): Доработки по продуктам NOTE1BFKO и EBMGZENIT

- [ADIRGSL-3715](https://jira.adacta-fintech.com/browse/ADIRGSL-3715): Внести правки по результатам тестирования продуктов EBMGZENIT и NOTE1BFKO

- [ADIRGSL-3716](https://jira.adacta-fintech.com/browse/ADIRGSL-3716): Скорректировать Инф уведомление банка EBMGZENIT

- [ADIRGSL-3718](https://jira.adacta-fintech.com/browse/ADIRGSL-3718): Внесены изменения в implSettings.json и messagingSettings.json среды ПРЕДПРОД

- [ADIRGSL-3719](https://jira.adacta-fintech.com/browse/ADIRGSL-3719): Заменить сервис ПФП на налоговый вычет

- [ADIRGSL-3721](https://jira.adacta-fintech.com/browse/ADIRGSL-3721): Внести правки в ВС по результатам тестирования

- [ADIRGSL-3722](https://jira.adacta-fintech.com/browse/ADIRGSL-3722): Корректировки по продукту NOTE1BFKO

- [ADIRGSL-3723](https://jira.adacta-fintech.com/browse/ADIRGSL-3723): Внесены изменения в implSettings.json и messagingSettings.json среды ПРЕДПРОД

- [ADIRGSL-3724](https://jira.adacta-fintech.com/browse/ADIRGSL-3724): Внести корректировки по продуктам EBMGZENIT IBI3BFKO

- [ADIRGSLSUPP-119](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-119): Исправлено обнуление суммы выплаты для расторжений после отвязки платежа.

- [ADIRGSLSUPP-150](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-150): Добавлена валидация на допустмые формы выпуска согласно настройкам продукта при вызове создания котировки сервисом.
    Добавлена валидация на допустмые формы расчета (от СС/премии) согласно настройкам продукта при вызове создания котировки сервисом.

- [ADIRGSLSUPP-156](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-156): Полезная информация. Создание раздела инструкции для СМП.

- [ADIRGSLSUPP-167](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-167): Снова создаются дубли при загрузке реестров КСЖ.

- [ADIRGSLSUPP-174](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-174): LDWH: корректировка ZAG_AGR и ZINS_CONT.

- [ADIRGSLSUPP-176](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-176): Создание нового Действия для заявки.

- [ADIRGSLSUPP-191](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-191): Правка дата схемы для ДС на расторжение АД

- [ADIRGSLSUPP-286](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-286): Нота Высшая Лига 3.0. Заявление на страхование

- [ADIRGSLSUPP-287](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-287): Добавлен новый тип ошибки верификации вложений «Отсутствует ключевой информационный документ»

- [ADIRGSLSUPP-288](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-288): БФКО. Продукт НОТА Высшая лига 3.0.

- [ADIRGSLSUPP-289](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-289): Правки по результатам тестирования Стань миллионером Оптима

- [ADIRGSLSUPP-291](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-291): Реинвесты. Корректировка ВС. Стратегия на пять.Гарант.

- [ADIRGSLSUPP-296](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-296): Донастройка отражения ПФ по сервису TaxDeduction11 в Электрополисах

- [ADIRGSLSUPP-297](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-297): Правки по результатам тестирования Замены сервисов

- [ADIRGSLSUPP-299](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-299): БФКО Премиум_НОТА_ВЫсшая лига 3.0_Правки по заявлению на страхование.

- [ADIRGSLSUPP-301](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-301): ПСБ РВ. Смена ставок. Драйвер гарантия.

- [ADIRGSLSUPP-302](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-302): БФКО. Смена ставок. Базис актив.

- [ADIRGSLSUPP-303](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-303): ПСБ. Смена кешбека. Корректировка кешбека-Акцепт.

- [ADIRGSLSUPP-307](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-307): Ошибка по отчету НОТЫ

- [ADIRGSLSUPP-314](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-314): БФКО_НОТА Высшая лига 3.0 Маппинг

- [ADIRGSLSUPP-316](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-316): Настроены ограничения вывода дополнительных сервисов в зависимости от годовой премии

- [ADIRGSLSUPP-318](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-318): Результат тестирования процесса по корп продуктам - ошибки.

- [ADIRGSLSUPP-41](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-41): Добавление клиентской логики для расчёта ДИД в ППО
    Добавление серверной логики для расчёта ДИД в ППО (Настройка автоматического расчёта в дожитиях/ДИД/расторжениях)

- [ADIRGSLSUPP-47](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-47): Исправление проблемы с созданием ДС на фин изменения

- [ADIRGSLSUPP-58](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-58): Настройка процесса по корп продуктам без тарификации.

- [ADIRGSLSUPP-60](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-60): Реализован сервис полной модификации договоров/дс

- [ADIRGSLSUPP-64](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-64): Множественный выбор в поисковиках витрины и жуд

- [ADIRGSLSUPP-68](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-68): Сервис обновления данных платежа из 1С по конкретному GUID

- [ADIRGSLSUPP-69](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-69): Скрипт по удалению РНВ и сервис по доведению документов-источников до финального статуса без РНВ

- [ADIRGSLSUPP-71](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-71): Корректировка валидации на дубли контрагентов.

- [ADIRGSLSUPP-79](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-79): Изменено заполнение блока анкет без ответов на контрагенте через один энричмент.

- [ADIRGSLSUPP-83](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-83): АВР_Статус платежа

- [ADIRGSLSUPP-90](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-90): Исправлены триггеры для страхователя (застрахованного 2)

- [ADIRGSLSUPP-92](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-92): Вкладка "Проводки": доработка отображения, фильтр, выгрузка


### Fixed (11 changes)

- [ADIRGSL-2673](https://jira.adacta-fintech.com/browse/ADIRGSL-2673): Integration tests with the amendments now work on the pipeline.

- [ADIRGSL-3472](https://jira.adacta-fintech.com/browse/ADIRGSL-3472): Долгая идентификация платежей

- [ADIRGSL-3498](https://jira.adacta-fintech.com/browse/ADIRGSL-3498): Исправлена выборка кодов перестраховщика где коды имеют не числовое значение.

- [ADIRGSL-3643](https://jira.adacta-fintech.com/browse/ADIRGSL-3643): Ошибка при миграции АВР_Deadlock victim

- [ADIRGSL-3645](https://jira.adacta-fintech.com/browse/ADIRGSL-3645): АВР_Ошибка работы сервиса: Object reference not set to an instance of an object.

- [ADIRGSL-3671](https://jira.adacta-fintech.com/browse/ADIRGSL-3671): Оферта:

    * Исправлено добавление вложений и отправка уведомлений на почту.

- [ADIRGSL-3672](https://jira.adacta-fintech.com/browse/ADIRGSL-3672): Ошибка маппинга в асс для РНВ

- [ADIRGSL-3705](https://jira.adacta-fintech.com/browse/ADIRGSL-3705): PDF is not accessable

- [ADIRGSL-3707](https://jira.adacta-fintech.com/browse/ADIRGSL-3707): 1 Маппинг продукта "Стань миллионером. Оптима" со сниженной ставкой для ОАС
    2 Фикс маппинга реинвестов

- [ADIRGSL-3729](https://jira.adacta-fintech.com/browse/ADIRGSL-3729): Ошибка при загрузке реестра платежей (продуктив)

- [ADIRGSLSUPP-94](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-94): Не отображаются оплаченные заявки по НОТе в отчете

# 53.0.0-rc1 (2023-07-05)

### Breaking Changes (3 changes)

- [ADIRGSL-3335](https://jira.adacta-fintech.com/browse/ADIRGSL-3335): Создан продукт ДСЖ, компонент стратегий ДСЖ и структура настроек ДСЖ.

    Перед паблишем необходимо выполнить скрипт:
    database\sql\migration\ADIRGSL-2958-add-unit-linked-tables.sql

- [ADIRGSL-3457](https://jira.adacta-fintech.com/browse/ADIRGSL-3457): Корректировка данных в колонке DEATH_AND_CI клиентского view

    **После деплоя необходимо выполнить корректировочные скрипты:**
    1. database\sql\migration\impl_ldwh_zins_cont.sql

- [ADIRGSL-3531](https://jira.adacta-fintech.com/browse/ADIRGSL-3531): Детский капитал:

    * Исправлена ошибка для старых договоров, по которым нет деклараций для страхователя в теле документа.

    КИД:

    * Исправлена ошибка при генерации.

    **Deployment Notes**

    После паблиша выполнить скрипт.

    1. database\sql\migration\ADIRGSL-3531-update-declarationMedicalPolicyHolder.sql


### New Features (66 changes)

- [ADIRGSL-2696](https://jira.adacta-fintech.com/browse/ADIRGSL-2696): Разработана форма для операции массовой смены статуса документов Дожития

- [ADIRGSL-2998](https://jira.adacta-fintech.com/browse/ADIRGSL-2998): Добавлено логирование шагов реиндексации в скрипте.

- [ADIRGSL-3173](https://jira.adacta-fintech.com/browse/ADIRGSL-3173): Внесены исправления по результату тестирования Андеррайтинга ИСЖ (2-4 пункты)

- [ADIRGSL-3215](https://jira.adacta-fintech.com/browse/ADIRGSL-3215): Исправления в dataSchema ДС в связи с доработками деклараций

- [ADIRGSL-3222](https://jira.adacta-fintech.com/browse/ADIRGSL-3222): IC revaluation

- [ADIRGSL-3266](https://jira.adacta-fintech.com/browse/ADIRGSL-3266): Добавлена возможность выпуска договора из согласованной котировки до даты крайнего срока оплаты первого взноса (включительно).

- [ADIRGSL-3328](https://jira.adacta-fintech.com/browse/ADIRGSL-3328): Корректировка отображения ролей для визуализации валидаций на карточке ЮЛ (тотображение роли Агент).

- [ADIRGSL-3345](https://jira.adacta-fintech.com/browse/ADIRGSL-3345): Реализован автоматический расчет НДФЛ для расторжений.

- [ADIRGSL-3362](https://jira.adacta-fintech.com/browse/ADIRGSL-3362): Fix integration test

- [ADIRGSL-3485](https://jira.adacta-fintech.com/browse/ADIRGSL-3485): Реализован импорт условий вознаграждения для АД

- [ADIRGSL-3487](https://jira.adacta-fintech.com/browse/ADIRGSL-3487): Реализовано множественное копирование условий вознагражления для АД.

- [ADIRGSL-3488](https://jira.adacta-fintech.com/browse/ADIRGSL-3488): Реализовано множественное заполнение даты начала/окончания для условий вознаграждения.

- [ADIRGSL-3498](https://jira.adacta-fintech.com/browse/ADIRGSL-3498): Реализована возможность загрузки данных в таблицу БД по перестрахованию из excel-файла через интерфейс.

- [ADIRGSL-3525](https://jira.adacta-fintech.com/browse/ADIRGSL-3525): Удаление комментария при транзишене для документа верификации 2. Откат изменений.

- [ADIRGSL-3530](https://jira.adacta-fintech.com/browse/ADIRGSL-3530): Переименованы атрибуты базовых параметров инвестирования в UI

- [ADIRGSL-3534](https://jira.adacta-fintech.com/browse/ADIRGSL-3534): Добавить пользователей, кому можно направлять рассылки по электрополисам на тесте и предпроде

- [ADIRGSL-3536](https://jira.adacta-fintech.com/browse/ADIRGSL-3536): Маппинг продуктов для внутр. реинвестирования: Инновац. Технологии

- [ADIRGSL-3537](https://jira.adacta-fintech.com/browse/ADIRGSL-3537): Корректировка продукта НОТА

- [ADIRGSL-3538](https://jira.adacta-fintech.com/browse/ADIRGSL-3538): БФКО. Нота. Изменение даты оплаты.

- [ADIRGSL-3540](https://jira.adacta-fintech.com/browse/ADIRGSL-3540): Не подтягиваются правила страхования в заявке

- [ADIRGSL-3541](https://jira.adacta-fintech.com/browse/ADIRGSL-3541): Доработка сервиса списка вложений.

- [ADIRGSL-3542](https://jira.adacta-fintech.com/browse/ADIRGSL-3542): Доработка по вн. реинвестам

- [ADIRGSL-3543](https://jira.adacta-fintech.com/browse/ADIRGSL-3543): Корректировки по продуктам вн. реинвестирование

- [ADIRGSL-3545](https://jira.adacta-fintech.com/browse/ADIRGSL-3545): Журнал платежей. Поиск по банковскому счету

- [ADIRGSL-3546](https://jira.adacta-fintech.com/browse/ADIRGSL-3546): Журнал платежей. Изменение назначения платежа - массовая операция

- [ADIRGSL-3549](https://jira.adacta-fintech.com/browse/ADIRGSL-3549): Доработка валидаций в РНВ на номера счетов

- [ADIRGSL-3550](https://jira.adacta-fintech.com/browse/ADIRGSL-3550): Перенесена логика автоматического заполнения выгодоприобретателя по оферте из UI в сервис (инричмент).

- [ADIRGSL-3551](https://jira.adacta-fintech.com/browse/ADIRGSL-3551): Добавление пользователей для рассылки по электрополисам на тесте и предпроде

- [ADIRGSL-3554](https://jira.adacta-fintech.com/browse/ADIRGSL-3554): Корректировка строк декларации продуктов НОТА

- [ADIRGSL-3560](https://jira.adacta-fintech.com/browse/ADIRGSL-3560): Реализовано бюджетное правило для АД.

    **Deployment notes**
    Перед паблишем должны быть выполнены скрипты:
    7.10_006.020.007_343.sql
    7.10_006.020.007_344.sql
    .

- [ADIRGSL-3561](https://jira.adacta-fintech.com/browse/ADIRGSL-3561): Внесены исправления в implSettings.json

- [ADIRGSL-3562](https://jira.adacta-fintech.com/browse/ADIRGSL-3562): Доработка ДС на фин изменения

- [ADIRGSL-3570](https://jira.adacta-fintech.com/browse/ADIRGSL-3570): В заявление по НОТЕ не тянется дата и номер заявления.

- [ADIRGSL-3571](https://jira.adacta-fintech.com/browse/ADIRGSL-3571): С 23.06.2023 для менеджера отключена возможность оформлять заявки по продукту БФКО Нота Премиум (3 года)

- [ADIRGSL-3572](https://jira.adacta-fintech.com/browse/ADIRGSL-3572): Замена заявления по результатам тестирования

- [ADIRGSL-3576](https://jira.adacta-fintech.com/browse/ADIRGSL-3576): Добавлена роль "ExcludeREINVEST". При добавлении данной роли пользователю станут недоступны для оформления продукты IBA5REINVEST, IBA3REINVEST, IDG3REINVEST, IDG5REINVEST.

- [ADIRGSL-3577](https://jira.adacta-fintech.com/browse/ADIRGSL-3577): Добавить пользователей, кому можно направлять рассылки по электрополисам на тесте и предпроде

- [ADIRGSL-3578](https://jira.adacta-fintech.com/browse/ADIRGSL-3578): Дработка ДС на расторжение.

- [ADIRGSL-3581](https://jira.adacta-fintech.com/browse/ADIRGSL-3581): Результат тестирования по продуктам вн. реинвестирования

- [ADIRGSL-3582](https://jira.adacta-fintech.com/browse/ADIRGSL-3582): Корректировки кэшбэка, СП по риску СЛП.

- [ADIRGSL-3583](https://jira.adacta-fintech.com/browse/ADIRGSL-3583): LDWH: доработка view ALGL2 - поля PRODUKC и ZZIEDENTNR.

- [ADIRGSL-3587](https://jira.adacta-fintech.com/browse/ADIRGSL-3587): ОАС - МВЗ и Ордер субагентов в проводках

- [ADIRGSL-3591](https://jira.adacta-fintech.com/browse/ADIRGSL-3591): Ошибка печати в эл полисах

- [ADIRGSL-3592](https://jira.adacta-fintech.com/browse/ADIRGSL-3592): БФКО. Нота. Изменение дат наблюдений.

- [ADIRGSL-3593](https://jira.adacta-fintech.com/browse/ADIRGSL-3593): Исправлены пункты мед. деклараций по Детскому капиталу Классика 2.0

- [ADIRGSL-3601](https://jira.adacta-fintech.com/browse/ADIRGSL-3601): Сняты ограничения на выпуск договора Ноты для ОПЕРУ

- [ADIRGSL-3602](https://jira.adacta-fintech.com/browse/ADIRGSL-3602): Правки по результатам тестирования СНПГ СМП

- [ADIRGSL-3603](https://jira.adacta-fintech.com/browse/ADIRGSL-3603): Заявление и ИД для НОТЫ Высшая лига 2.0

- [ADIRGSL-3606](https://jira.adacta-fintech.com/browse/ADIRGSL-3606): Реинвесты. Памятка ПФП. Расшир.андеррайтинг.

- [ADIRGSL-3607](https://jira.adacta-fintech.com/browse/ADIRGSL-3607): У нового партнера Реинвест не отображаются продукты.

- [ADIRGSL-3608](https://jira.adacta-fintech.com/browse/ADIRGSL-3608): Исправлено формаирования строки с выкупной суммой для РНВ при наличии НДФЛ.

- [ADIRGSL-3610](https://jira.adacta-fintech.com/browse/ADIRGSL-3610): Реинвесты. Базис Актив памятка ПФП. Срок +30 дней

- [ADIRGSL-3614](https://jira.adacta-fintech.com/browse/ADIRGSL-3614): БФКО. НОТА. Высшая лига 2.0

- [ADIRGSL-3616](https://jira.adacta-fintech.com/browse/ADIRGSL-3616): Доработка сервиса миграции АВР

- [ADIRGSL-3617](https://jira.adacta-fintech.com/browse/ADIRGSL-3617): Добавлена возможность прямой установки вылаты для ВП дожитий.

- [ADIRGSL-3626](https://jira.adacta-fintech.com/browse/ADIRGSL-3626): Правки по результатам тестирования БГ 2.0

- [ADIRGSL-3627](https://jira.adacta-fintech.com/browse/ADIRGSL-3627): Правки по заявлению на страхование НОТА Высшая лига 2.0

- [ADIRGSL-3630](https://jira.adacta-fintech.com/browse/ADIRGSL-3630): Правки для фин дс.

- [ADIRGSL-3635](https://jira.adacta-fintech.com/browse/ADIRGSL-3635): Корректировка PRODUCT GROUP в BFX_IMPL.PRODUCTS

- [ADIRGSL-3636](https://jira.adacta-fintech.com/browse/ADIRGSL-3636): БФКО. НОТА. Мед. декларация.

- [ADIRGSL-3637](https://jira.adacta-fintech.com/browse/ADIRGSL-3637): Миграция АВР с нулевыми суммами

- [ADIRGSL-3639](https://jira.adacta-fintech.com/browse/ADIRGSL-3639): Скорректирован маппинг в ES по поиску договоров для избежания ошибки: "all shards failed".

- [ADIRGSL-3640](https://jira.adacta-fintech.com/browse/ADIRGSL-3640): Маппинг продукта НОТА ПРЕМИУМ Высшая Лига 2.0- 1 год

- [ADIRGSL-3642](https://jira.adacta-fintech.com/browse/ADIRGSL-3642): Добавить пользователей, кому можно направлять рассылки по электрополисам на тесте и предпроде

- [ADIRGSL-3647](https://jira.adacta-fintech.com/browse/ADIRGSL-3647): Добавлена авторизация актера System от роли System.

- [ADIRGSL-3650](https://jira.adacta-fintech.com/browse/ADIRGSL-3650): ПСБ РВ.Смена ставок. Драйвер гарантия.


### Fixed (9 changes)

- [ADIRGSL-3402](https://jira.adacta-fintech.com/browse/ADIRGSL-3402): Изменено условие проверки наличия верификаций

- [ADIRGSL-3472](https://jira.adacta-fintech.com/browse/ADIRGSL-3472): Долгая идентификация платежей

- [ADIRGSL-3480](https://jira.adacta-fintech.com/browse/ADIRGSL-3480): Добавить ИД платежа в грид журнала идентификаций

- [ADIRGSL-3516](https://jira.adacta-fintech.com/browse/ADIRGSL-3516): АВР_разница в копейку между КВ, РУБ и Итого КВ к выплате

- [ADIRGSL-3544](https://jira.adacta-fintech.com/browse/ADIRGSL-3544): Тестирование РСД: ошибка

- [ADIRGSL-3574](https://jira.adacta-fintech.com/browse/ADIRGSL-3574): Ошибка при квитовке РНВ на выплату НДФЛ

- [ADIRGSL-3575](https://jira.adacta-fintech.com/browse/ADIRGSL-3575): Исправлены ошибки связанные с отправкой почты и ПФ по продуктам реинвестирования.

- [ADIRGSL-3598](https://jira.adacta-fintech.com/browse/ADIRGSL-3598): Исправлено формирование реквизитов получателя РНВ для реквеста сервиса

- [ADIRGSL-3631](https://jira.adacta-fintech.com/browse/ADIRGSL-3631): Исправлена отправка документов на почту для электронных полисов.

# 52.0.0-rc1 (2023-06-16)

### Breaking Changes (4 changes)

- [ADIRGSL-3493](https://jira.adacta-fintech.com/browse/ADIRGSL-3493): Данные изменения касаются только тестовой среды РГСЖ, на которой производится миграция договоров!

    1. После (или перед, в данном случае разницы нет) установки необходимо выполнить скрипт:
    **database/sql/migration/ADIRGSL-3121-remove-terminated-migration-contacts.sql**

    2. Изменён скрипт удаления мигрированных договоров **database/sql/migration/removeMigratedContract.sql**.
    Эту информацию необходимо довести до сведения ответственных за миграцию на тестовой среде.

- [ADIRGSL-3362](https://jira.adacta-fintech.com/browse/ADIRGSL-3362): Для вызова сервиса в качестве временного решения используется утилита `curl`.

    Для вызова сервиса необходимо настроить пути к утилите, сертификату и указать пароль в файле `environmentVariables.json`.
    По умолчанию настроено:

    - путь к утилите `"rgsl.sendEvent.efr.curlPath": "C:\AdExtensions\curl.exe"`
    - путь к сертификату `"rgsl.sendEvent.efr.certPath": "C:\AdExtensions\healthchecker-client.pem"`
    - путь к ключу сертификата `"rgsl.sendEvent.efr.keyPath": "C:\AdExtensions\healthchecker-key.pem"`
    - путь к паролю сертификата `"rgsl.sendEvent.efr.passPhrase": "1234"`

- [ADIRGSL-3432](https://jira.adacta-fintech.com/browse/ADIRGSL-3432): Необходимо выполнить скрипт:
    database\sql\migration\get_transformed_transactions.sql

- [ADIRGSL-3493](https://jira.adacta-fintech.com/browse/ADIRGSL-3493): После установки необходимо выполнить скрипт:
    database/sql/migration/ADIRGSL-3493-remove-allocationInformation.sql


### New Features (35 changes)

- [ADIRGSL-1212](https://jira.adacta-fintech.com/browse/ADIRGSL-1212): Исправлен скрипт обновления планировщика задач.

- [ADIRGSL-2879](https://jira.adacta-fintech.com/browse/ADIRGSL-2879): Добавлено описание сред РГСЖ.

- [ADIRGSL-3087](https://jira.adacta-fintech.com/browse/ADIRGSL-3087): НОТА - настройка ПФ

- [ADIRGSL-3222](https://jira.adacta-fintech.com/browse/ADIRGSL-3222): Заполнение таблицы pas_impl.P_INVOICED_COMMISSION при уменьшении КВ Оценк из при подтверждении акта.

- [ADIRGSL-3228](https://jira.adacta-fintech.com/browse/ADIRGSL-3228): Сервиса витрины продуктов:

    * Добавлен новый блок с сервисами доступными для продукта

- [ADIRGSL-3295](https://jira.adacta-fintech.com/browse/ADIRGSL-3295): Базовая настройка процесса по корп продуктам

- [ADIRGSL-3324](https://jira.adacta-fintech.com/browse/ADIRGSL-3324): Рефакторинг использования contractVersions.

- [ADIRGSL-3328](https://jira.adacta-fintech.com/browse/ADIRGSL-3328): Для карточки контрагента ФЛ добавлен тип "Заявитель".

- [ADIRGSL-3338](https://jira.adacta-fintech.com/browse/ADIRGSL-3338): Базовая реализация логики расчетов для фин ДС.
    Реализована модификация рисков для фин ДС.

- [ADIRGSL-3340](https://jira.adacta-fintech.com/browse/ADIRGSL-3340): Реализована модификация страховой суммы и взноса для фин ДС.

- [ADIRGSL-3351](https://jira.adacta-fintech.com/browse/ADIRGSL-3351): Правки в печатных формах для продуктов Базис инвест и Базис актив

- [ADIRGSL-3368](https://jira.adacta-fintech.com/browse/ADIRGSL-3368): Доработка дожитий

- [ADIRGSL-3388](https://jira.adacta-fintech.com/browse/ADIRGSL-3388): Доступность ПФ для API_EFR

- [ADIRGSL-3389](https://jira.adacta-fintech.com/browse/ADIRGSL-3389): КСЖ_снять проверку на регистр

- [ADIRGSL-3407](https://jira.adacta-fintech.com/browse/ADIRGSL-3407): Добавление типа вложения по договору

- [ADIRGSL-3410](https://jira.adacta-fintech.com/browse/ADIRGSL-3410): Настройка продуктов для вн. реинвестирования

- [ADIRGSL-3430](https://jira.adacta-fintech.com/browse/ADIRGSL-3430): РСД. Добавление записей в документ

- [ADIRGSL-3431](https://jira.adacta-fintech.com/browse/ADIRGSL-3431): Платежи: новый банковский счет ВТБ с 30.05.23

- [ADIRGSL-3436](https://jira.adacta-fintech.com/browse/ADIRGSL-3436): Неверная сторнировка КВ оценка

- [ADIRGSL-3459](https://jira.adacta-fintech.com/browse/ADIRGSL-3459): Изменение уведомление "информация по продуктах НСЖ"

- [ADIRGSL-3462](https://jira.adacta-fintech.com/browse/ADIRGSL-3462): Переименован триггер (регион Ингушетия) на следующее наименование: «Выборочная проверка для целей внутреннего учета»

- [ADIRGSL-3473](https://jira.adacta-fintech.com/browse/ADIRGSL-3473): Доработка реестра данных из Адиншур в САП

- [ADIRGSL-3478](https://jira.adacta-fintech.com/browse/ADIRGSL-3478): Реализация доработок по продуктам реинвестирования

- [ADIRGSL-3479](https://jira.adacta-fintech.com/browse/ADIRGSL-3479): Результат тестирования печатных форм по НОТЕ NOTE3BFKO

- [ADIRGSL-3486](https://jira.adacta-fintech.com/browse/ADIRGSL-3486): Доработки для фин ДС

- [ADIRGSL-3489](https://jira.adacta-fintech.com/browse/ADIRGSL-3489): Исправлена ошибка при выборе продукта по КСЖ.

- [ADIRGSL-3495](https://jira.adacta-fintech.com/browse/ADIRGSL-3495): БФКО. Нота. Корректировка настроек продукта.

- [ADIRGSL-3501](https://jira.adacta-fintech.com/browse/ADIRGSL-3501): Удаление КИД из ПФ NOTE3BFKO

- [ADIRGSL-3503](https://jira.adacta-fintech.com/browse/ADIRGSL-3503): Корректировка Печатных форм NOTE3BFKO

- [ADIRGSL-3507](https://jira.adacta-fintech.com/browse/ADIRGSL-3507): Доработка сервиса поиска договоров страхователя (договора в статусе проект)

- [ADIRGSL-3519](https://jira.adacta-fintech.com/browse/ADIRGSL-3519): Заявки постпродажного сопровождения:

    * Закрыт доступ сотрудников БФКО к модулю Адакта по расторжению договоров кредитного страхования жизни (продукты «Защита кредита», «Моя защита», «Моя стабильность»).

- [ADIRGSL-3520](https://jira.adacta-fintech.com/browse/ADIRGSL-3520): Минорные правки в печатных формах продукта НОТА

- [ADIRGSL-3521](https://jira.adacta-fintech.com/browse/ADIRGSL-3521): Доработан скрипт удаления мигрированных договоров.

- [ADIRGSL-3525](https://jira.adacta-fintech.com/browse/ADIRGSL-3525): Удаление комментария при транзишене для документа верификации 2.

- [ADIRGSL-3527](https://jira.adacta-fintech.com/browse/ADIRGSL-3527): Внесения правок в продукты реинвест


### Improvements (1 changes)

- [ADIRGSL-3398](https://jira.adacta-fintech.com/browse/ADIRGSL-3398): Рефакторинг мед. декларации для Страхователя.


### Fixed (9 changes)

- [ADIRGSL-3357](https://jira.adacta-fintech.com/browse/ADIRGSL-3357): АВР_статус Генерация 15.05.23

- [ADIRGSL-3463](https://jira.adacta-fintech.com/browse/ADIRGSL-3463): Ручная идентификация - ошибка не найден SAP GL Account

- [ADIRGSL-3467](https://jira.adacta-fintech.com/browse/ADIRGSL-3467): Исправлено отображение в документах ПФ «Лекарственный навигатор».

- [ADIRGSL-3474](https://jira.adacta-fintech.com/browse/ADIRGSL-3474): Исправлено отображение ПФ Дополнительные документы банка.

- [ADIRGSL-3476](https://jira.adacta-fintech.com/browse/ADIRGSL-3476): Исправление валидации декларации для Страхователя.

- [ADIRGSL-3477](https://jira.adacta-fintech.com/browse/ADIRGSL-3477): Электронный договор:

    * Исправлен выбор номера телефона и почты на вкладке "Дополнительные условия".
    * Исправлена отправка смс кода.
    * Исправлена повторная отправка кода для Агента.
    * Исправлена печатная форма "Памятка по Налоговому вычету 7".

- [ADIRGSL-3506](https://jira.adacta-fintech.com/browse/ADIRGSL-3506): НСЖ Надежный капитал Классика 2.0:

    * Исправлена ошибка при расчёте.

    НСЖ Надежный капитал Классика 2.0 и Детский капитал 2.0:

    * Исправлена дата начала по риску Инвалидность 1,2 НС ОУСВ.

- [ADIRGSL-3511](https://jira.adacta-fintech.com/browse/ADIRGSL-3511): Заявление на страхование:

    * Исправлена конвертация даты для одного из выгодоприобретателей.

- [ADIRGSL-3512](https://jira.adacta-fintech.com/browse/ADIRGSL-3512): Исправлена отправка документов на почту для продукта "Достойный век".

# 51.0.0-rc1 (2023-06-02)

### Breaking Changes (3 changes)

- [ADIRGSL-3083](https://jira.adacta-fintech.com/browse/ADIRGSL-3083): Часть update-скрипта перенесена в миграционный

    После обновления запустить скрипт
    database\sql\migration\ADIRGSL-3083-update-body-isdbo.sql

- [ADIRGSL-3374](https://jira.adacta-fintech.com/browse/ADIRGSL-3374): Отчёт по Ноте.

    **Deployment notes**
        После установки запустить скрипт implementation\database\sql\migration\ADIRGSL-3374-create-investment-sat.sql

- [ADIRGSL-3381](https://jira.adacta-fintech.com/browse/ADIRGSL-3381): Исправлено некорректное отображение связанных заявок на карточке договора (ДС).

    **Deployment Notes**
    Если не были ранее выполнены скрипты задачи ADIRGSL-3235:
    После паблиша выполнить скрипты строго по порядку.
    1. database\sql\migration\ADIRGSL-3235-update-request-hub.sql
    2. database\sql\migration\ADIRGSL-3235-update-request-sat.sql
    3. database\sql\migration\ADIRGSL-3235-update-request-contract-link.sql
    4. database\sql\migration\ADIRGSL-3235-update-request-applicant-link.sql
    5. database\sql\migration\ADIRGSL-3235-update-request-holder-link.sql
    6. database\sql\migration\ADIRGSL-3235-update-request-change-types-sat.sql
    В случае если скрипты были выполнены:
    Перевыполнить скрипты:
    1. database\sql\migration\ADIRGSL-3235-update-request-contract-link.sql
    2. database\sql\migration\ADIRGSL-3235-update-request-applicant-link.sql
    3. database\sql\migration\ADIRGSL-3235-update-request-holder-link.sql


### New Features (63 changes)

- [ADIRGSL-2482](https://jira.adacta-fintech.com/browse/ADIRGSL-2482): Настроены продукты Нота БФКО для масс сегмента.

- [ADIRGSL-2958](https://jira.adacta-fintech.com/browse/ADIRGSL-2958): Подготовлена структура таблиц, представлений и логирование изменений для конфигурации продуктов Модуля ИСЖ (~unit-linked) в БД.

- [ADIRGSL-3024](https://jira.adacta-fintech.com/browse/ADIRGSL-3024): Дубликаты_КСЖ потреб_часть 2 - настройка Моя защита

- [ADIRGSL-3028](https://jira.adacta-fintech.com/browse/ADIRGSL-3028): Исправлена ошибка при получении данных по отменённому договору.

- [ADIRGSL-3140](https://jira.adacta-fintech.com/browse/ADIRGSL-3140): Валютная переоценка, UI для вызова сервиса на конец отчетного периода

- [ADIRGSL-3156](https://jira.adacta-fintech.com/browse/ADIRGSL-3156): Сервис обратного маппинга:

    * Исправлена фильтрация, после изменения данных в таблице PAS_IMPL.EFR_PRODUCT_RISK.
    * Добавлены автотесты по сервису.

- [ADIRGSL-3160](https://jira.adacta-fintech.com/browse/ADIRGSL-3160): Добавлена автоматическая валидация кода разработчика при добавления текста ошибок, в том числе при переводе текста на русский язык.

    Каждое описание ошибки должно начинаться с буквы:

    Е - ошибка, процесс останавливается, сообщение транслируется в ответ сервиса;
    W - предупреждение, процесс не останавливается, сообщение транслируется в ответ сервиса;
    N - информация, процесс не останавливается, сообщение транслируется в ответ сервиса.

    Ранее работы велись по задаче ADIRGSL-2470

- [ADIRGSL-3230](https://jira.adacta-fintech.com/browse/ADIRGSL-3230): Электронные договора:

    * Добавлен функционал автоматического прикрепления памяток с типом вложения "Памятка, содержащая порядок получения сервисов".

- [ADIRGSL-3237](https://jira.adacta-fintech.com/browse/ADIRGSL-3237): Исправлен расчет премии и СС по рискам

- [ADIRGSL-3243](https://jira.adacta-fintech.com/browse/ADIRGSL-3243): РСД. Добавить фильтры для поиска записей в документе

- [ADIRGSL-3254](https://jira.adacta-fintech.com/browse/ADIRGSL-3254): Добавлено поле сardType в настройку продуктов.

- [ADIRGSL-3274](https://jira.adacta-fintech.com/browse/ADIRGSL-3274): Миграция. АВР. Создание таблицы - включение кв в актах созданных до периода миграции

- [ADIRGSL-3275](https://jira.adacta-fintech.com/browse/ADIRGSL-3275): Миграция. АВР. Доработка алгоритма payable commission

- [ADIRGSL-3282](https://jira.adacta-fintech.com/browse/ADIRGSL-3282): Миграция. Исходящие платежи. История по выплатам

- [ADIRGSL-3284](https://jira.adacta-fintech.com/browse/ADIRGSL-3284): Миграция. Договоры. История по выплатам

- [ADIRGSL-3291](https://jira.adacta-fintech.com/browse/ADIRGSL-3291): Добавление исключения валидации на вложения контрагентов при подписании договора для пользователя с ролью SkipAttachmentsValidationAPI.

- [ADIRGSL-3295](https://jira.adacta-fintech.com/browse/ADIRGSL-3295): Базовая настройка процесса по корп продуктам.

- [ADIRGSL-3311](https://jira.adacta-fintech.com/browse/ADIRGSL-3311): Настройка "Базис Гарант 2.0" (тип продукта Бонд репак) 3 года

- [ADIRGSL-3322](https://jira.adacta-fintech.com/browse/ADIRGSL-3322): 1) Разработан механизм формирования XML-файла для Росфинмониторинга.
    2) В файле настроек implSettings.json обновилась добавленная на предыдущем этапе настройка "appSettings -> AdInsure -> Settings -> RGSL -> Integration -> Rosfinmonitoring". Добавлены параметры - на текущий момент константы, которые будут использоваться для заполнения тэгов <ВерсияФормата>, <ВерсПрог>, <ИДКорр>
    3) В файле настроек environmentVariables.json добавилась настройка "rgsl.organisationUnit.headUnitCode". Как её значение, записывается код подразделения, которое для данной среды является головным подразделением. Его данные (и данные связанного с этим подразделением юрлица-контрагента) будут использоваться для заполнения тэгов <ИнфНФОП>, <ИнфНФО>, а также одного из тегов <УчастникОп>
    4) В файле настроек environmentVariables.json добавилась настройка "rgsl.rosfinmonitoring.authorizedPersonTabNumber". Как её значение записывается табельный номер сотрудника, который для данной среды является уполномоченным для формирования XML-файлов. Его данные (и данные связанного с этим сотрудником физлица-контрагента) будут использоваться для заполнения тэгов <УполнСотрудн>, <ФИОУполнСотрудн>, <ТелУполнСотрудн>, <ЭлектроннаяПочта>
    5) Добавлены JOB для автоматического запуска данного механизма по расписанию

- [ADIRGSL-3353](https://jira.adacta-fintech.com/browse/ADIRGSL-3353): Добавление пользователей для рассылки по электрополисам на тесте и предпроде

- [ADIRGSL-3360](https://jira.adacta-fintech.com/browse/ADIRGSL-3360): Замена заявлений для продуктов Базис и Стратегия на пять.

- [ADIRGSL-3361](https://jira.adacta-fintech.com/browse/ADIRGSL-3361): Уточнение валидации при миграции контрагентов (проверка на дубли).

- [ADIRGSL-3365](https://jira.adacta-fintech.com/browse/ADIRGSL-3365): Достойный век:

    * Объединён размер взноса по рискам в ПФ.
    * Выкупные суммы вычисляются без учета дополнительного риска "Травма".
    * Электрополис доступен с 01.06.2023.
    * Смешанный риск для единовременной рассрочки доступен с 01.06.2023.
    * Смешанный риск для возрастных клиентов (78 на дату начала) доступен с 01.06.2023.
    * Выкупные суммы вычисляются без учета дополнительного риска "Травма" с 01.06.2023.

- [ADIRGSL-3368](https://jira.adacta-fintech.com/browse/ADIRGSL-3368): Дожития:

    * Добавлена в сущность договора на вкладку "История" в компонент "Связанные документы" информация о Дожитиях и ДИД по договору.
    * Добавлена в сущность Дожития/ДИД вкладка "История" с информацией по изменению статуса (аналогично убыткам).

- [ADIRGSL-3372](https://jira.adacta-fintech.com/browse/ADIRGSL-3372): Заведение продуктов для миграции_3 этап_часть 3

- [ADIRGSL-3377](https://jira.adacta-fintech.com/browse/ADIRGSL-3377): Исправлен поиск по убыткам

- [ADIRGSL-3378](https://jira.adacta-fintech.com/browse/ADIRGSL-3378): 1) Добавлен новый переход для документа РНВ: из статуса "Проект" в статус "Подтверждено"
    2) В журнал РНВ добавлена возможность массово переводить РНВ из статуса "Проект" в статус "Подтверждено"

- [ADIRGSL-3379](https://jira.adacta-fintech.com/browse/ADIRGSL-3379): Корректировка графика траншей

- [ADIRGSL-3380](https://jira.adacta-fintech.com/browse/ADIRGSL-3380): Заявление по продукту НОТА_БФКО Премиум

- [ADIRGSL-3383](https://jira.adacta-fintech.com/browse/ADIRGSL-3383): Включение трехлетнего продукта Базис Актв в БФКО розница

- [ADIRGSL-3386](https://jira.adacta-fintech.com/browse/ADIRGSL-3386): некорректно отображается информация в клике по анкете фин грамотности в рамках договоров оформленных в Адиншур

- [ADIRGSL-3387](https://jira.adacta-fintech.com/browse/ADIRGSL-3387): Доработка сериса загрузки платежей

- [ADIRGSL-3391](https://jira.adacta-fintech.com/browse/ADIRGSL-3391): Заблокировано создание агентом договора по Ноте.

- [ADIRGSL-3393](https://jira.adacta-fintech.com/browse/ADIRGSL-3393): Заявление на страхование для продукта НОТА

- [ADIRGSL-3395](https://jira.adacta-fintech.com/browse/ADIRGSL-3395): Разработка инричмента по заполнению данных по рискам.

- [ADIRGSL-3397](https://jira.adacta-fintech.com/browse/ADIRGSL-3397): Переименован продукт Нота на 3 года для масс сегмента
    Добавлена стратегия "Высшая лига"
    Настроены триггеры на андеррайтинг на возраст и сумму премии для Ноты

- [ADIRGSL-3398](https://jira.adacta-fintech.com/browse/ADIRGSL-3398): Донастройка медицинской декларации по здоровью для Страхователя на продукте «Детский капитал Классика 2.0».

- [ADIRGSL-3409](https://jira.adacta-fintech.com/browse/ADIRGSL-3409): Корректировка заявления на страхование_НОТА

- [ADIRGSL-3413](https://jira.adacta-fintech.com/browse/ADIRGSL-3413): 1) В результаты поиска журнала РНВ добавлен столбец "Договоры страхования"
    2) Добавлен экспорт журнала РНВ в Excel
    3) Фильтр "Номер договора" заменён на мультифильтр "Номера договоров"

- [ADIRGSL-3418](https://jira.adacta-fintech.com/browse/ADIRGSL-3418): Добавление атрибута historicalAgentAgreement

- [ADIRGSL-3420](https://jira.adacta-fintech.com/browse/ADIRGSL-3420): Результат тестирования по заявлению НОТА

- [ADIRGSL-3421](https://jira.adacta-fintech.com/browse/ADIRGSL-3421): Доработка по внесению новых заявлений на страхование

- [ADIRGSL-3422](https://jira.adacta-fintech.com/browse/ADIRGSL-3422): Декларация для продукту НОТА NOTE3BFKO

- [ADIRGSL-3423](https://jira.adacta-fintech.com/browse/ADIRGSL-3423): Добавление риска для миграции

- [ADIRGSL-3425](https://jira.adacta-fintech.com/browse/ADIRGSL-3425): Исправление Ноты по результату тестирования 26.05.2023

- [ADIRGSL-3426](https://jira.adacta-fintech.com/browse/ADIRGSL-3426): ОАС Детский капитал:

    * Дополнительный риск «КЗ ОУСВ» для Страхователя доступен, если Страхователь и Застрахованный разные лица.

- [ADIRGSL-3430](https://jira.adacta-fintech.com/browse/ADIRGSL-3430): РСД. Добавление записей в документ

- [ADIRGSL-3434](https://jira.adacta-fintech.com/browse/ADIRGSL-3434): БФКО. НОТА. Замена префикса

- [ADIRGSL-3435](https://jira.adacta-fintech.com/browse/ADIRGSL-3435): Добавлена роль "ExcludeNOTE". При добавлении данной роли пользователю станут недоступны для оформления продукты NOTE2BFKO и NOTE3BFKO.

- [ADIRGSL-3437](https://jira.adacta-fintech.com/browse/ADIRGSL-3437): Достойный век_тестирование 30.05.23

- [ADIRGSL-3438](https://jira.adacta-fintech.com/browse/ADIRGSL-3438): Добавлена роль SkipGiftServicesValidationAPI. При наличии этой роли у пользователя будет пропускаться валидация на обязательность наличия подарочных сервисов.

- [ADIRGSL-3439](https://jira.adacta-fintech.com/browse/ADIRGSL-3439): Правки декларации ТКБ по результатам тестирования 22.05

- [ADIRGSL-3442](https://jira.adacta-fintech.com/browse/ADIRGSL-3442): Доработка деклараций по продукту НОТА

- [ADIRGSL-3443](https://jira.adacta-fintech.com/browse/ADIRGSL-3443): Добавлена возможность корректировать инвест. параметры по продуктам Драйвер гарантия

- [ADIRGSL-3445](https://jira.adacta-fintech.com/browse/ADIRGSL-3445): Маппинг продукта НОТА ПРЕМИУМ Высшая Лига. Партнер БФКО

- [ADIRGSL-3447](https://jira.adacta-fintech.com/browse/ADIRGSL-3447): Защита кредита. Изменение схем кв на предидущие настройки

- [ADIRGSL-3448](https://jira.adacta-fintech.com/browse/ADIRGSL-3448): Маппинг продукта Достойный век 2.0 для ОАС НОВЫЙ

- [ADIRGSL-3451](https://jira.adacta-fintech.com/browse/ADIRGSL-3451): Стань миллионером_увеличение возраста в тарифах

- [ADIRGSL-3452](https://jira.adacta-fintech.com/browse/ADIRGSL-3452): Скорректировать текст СМС сообщения для электрополисов

- [ADIRGSL-3455](https://jira.adacta-fintech.com/browse/ADIRGSL-3455): Буква Е в классифицированных ошибках.

- [ADIRGSL-3458](https://jira.adacta-fintech.com/browse/ADIRGSL-3458): Изменения в реестре для загрузки данных из Адиншур в САП с 5.6.2023

- [ADIRGSL-3460](https://jira.adacta-fintech.com/browse/ADIRGSL-3460): Заявка постпродажного сопровождения:

    * Для заявки на расторжение "Дата поступления в СК" заполняется датой перевода статуса на рассмотрении в СК.

- [ADIRGSL-3461](https://jira.adacta-fintech.com/browse/ADIRGSL-3461): Корректировка печатных форм и эл.писем для продукта Достойный век 2.0


### Fixed (9 changes)

- [ADIRGSL-2673](https://jira.adacta-fintech.com/browse/ADIRGSL-2673): Payment order errors

- [ADIRGSL-3143](https://jira.adacta-fintech.com/browse/ADIRGSL-3143): АВР_ошибка при автозаполнении АВР

- [ADIRGSL-3250](https://jira.adacta-fintech.com/browse/ADIRGSL-3250): Информативное сообщение ошибки.

- [ADIRGSL-3331](https://jira.adacta-fintech.com/browse/ADIRGSL-3331): Ошибка при идентификации платежа_Maximum cycle count reached

- [ADIRGSL-3357](https://jira.adacta-fintech.com/browse/ADIRGSL-3357): АВР. Откат статуса "Генерация" в случае ошибки.

- [ADIRGSL-3390](https://jira.adacta-fintech.com/browse/ADIRGSL-3390): ДМС:

    * Исправлены ошибки: Необходимо заполнить "Доля", Необходимо заполнить "Родственная связь" для продуктов: Про ЗОЖ, Про Здоровье, про Генетику (партнёр БФКО).

- [ADIRGSL-3401](https://jira.adacta-fintech.com/browse/ADIRGSL-3401): Достойный век 2.0:

    * Период ожидания по сервису исправлен на 30 дней.
    * Изменен текст смс-сообщения.
    * Добавлены дополнительные документы в письмо с эл.договором.
    * Добавлены отдельные печатные формы по дополнительным документам.
    * Скорректирован текст в разделе иные условия.
    * Исключена Травма при расчете СС по риску Смерть ЛП ВВ/Смерть ЛП смеш.
    * Добавлено округление взноса и разбивки до целого числа для клиентов в возрасте 78 лет.

- [ADIRGSL-3405](https://jira.adacta-fintech.com/browse/ADIRGSL-3405): Поиск заявок:

    * Исправлен большой заголовок передаваемый в запросе.

- [ADIRGSL-3433](https://jira.adacta-fintech.com/browse/ADIRGSL-3433): Ошибка при идентификации платежей_Exception has been thrown by the target of an invocation

# 50.0.0-rc1 (2023-05-17)

### Breaking Changes (2 changes)

- [ADIRGSL-2647](https://jira.adacta-fintech.com/browse/ADIRGSL-2647): Доработка ДС на расторжение договоров страхования.

    **Deployment Notes**
    Скрипт 7.10_006.020.007_276.sql должен быть выполнен ДО паблиша.
    Для миграции старых ДС прилагаются миграционные скрипты:
    1. ADIRGSL-3043-create-cancellation-backup.sql - создание таблицы для бэкапа ДС
    2. ADIRGSL-3043-populate-cancellation-backup.sql - заполнение таблицы бэкапа ДС
    3. ADIRGSL-3043-execute-cancellation-migration.sql - выполнение миграции ДС. предназначен для выполнения ТОЛЬКО ОДИН раз. Если при обработке документа произойдет ошибка, то в логах будет отображен его номер. Только по таким документам скрипт можно запускать повторно (в этом случае добавить фильтр по номерам документов в скрипт первоначальной выборки), т.к. в случае ошибки изменения документа не сохраняются.
    4. ADIRGSL-3194-utf-convert-procedure.sql - создание/обновление процедуры для конверсии текста в UTF-8
    5. ADIRGSL-3194-canellation-ass-update.sql - обновление/добавление данных для асс

- [ADIRGSL-3235](https://jira.adacta-fintech.com/browse/ADIRGSL-3235): Заявки постпродажного сопровождения:

    * Настроена аналитическая подсистема.
    * Поиск заявок связан с аналитической подсистемой.

    **Deployment Notes**
    После паблиша выполнить скрипты строго по порядку.
    1. database\sql\migration\ADIRGSL-3235-update-request-hub.sql
    2. database\sql\migration\ADIRGSL-3235-update-request-sat.sql
    3. database\sql\migration\ADIRGSL-3235-update-request-contract-link.sql
    4. database\sql\migration\ADIRGSL-3235-update-request-applicant-link.sql
    5. database\sql\migration\ADIRGSL-3235-update-request-holder-link.sql
    6. database\sql\migration\ADIRGSL-3235-update-request-change-types-sat.sql


### New Features (33 changes)

- [ADIRGSL-2834](https://jira.adacta-fintech.com/browse/ADIRGSL-2834): Добавление атрибутов в структуру вывода информации по ДС.

- [ADIRGSL-2998](https://jira.adacta-fintech.com/browse/ADIRGSL-2998): В связи с увеличением времени выполнения каждого отдельного сервиса реиндексации на прод. среде
    и потери актуальности сессии за это время добавлен дополнительный запрос авторизации.

- [ADIRGSL-3014](https://jira.adacta-fintech.com/browse/ADIRGSL-3014): Согласование с СК_не активны запросы в смежные подразделения

- [ADIRGSL-3028](https://jira.adacta-fintech.com/browse/ADIRGSL-3028): Изменена обработка undefined значений.

- [ADIRGSL-3076](https://jira.adacta-fintech.com/browse/ADIRGSL-3076): Добавлена возможность восстановливать через UI платежи, которые находятся в статусе Аннулирован.

- [ADIRGSL-3110](https://jira.adacta-fintech.com/browse/ADIRGSL-3110): Доработка сервиса поиска /чтения договоров

- [ADIRGSL-3187](https://jira.adacta-fintech.com/browse/ADIRGSL-3187): Тех. допники для миграции: обнуление payment_plan по расторгнутым договорам.

- [ADIRGSL-3199](https://jira.adacta-fintech.com/browse/ADIRGSL-3199): В журнал идентификаций добавлен фильтр "Действующие". При отключённой галочке фильтра показывает также отменённые идентификации и отмены идентификаций. По умолчанию включена.

- [ADIRGSL-3223](https://jira.adacta-fintech.com/browse/ADIRGSL-3223): В схему данных контрагента в блок partyGeneralData добавлен новый атрибут innerBankId (string).

- [ADIRGSL-3229](https://jira.adacta-fintech.com/browse/ADIRGSL-3229): Стратегия на пять. Гарант:

    * Добавлена максимальная страховая сумма.

- [ADIRGSL-3244](https://jira.adacta-fintech.com/browse/ADIRGSL-3244): РСД. Удаление записей в документе

- [ADIRGSL-3251](https://jira.adacta-fintech.com/browse/ADIRGSL-3251): 1) Выполнена "альфа-версия" процедуры формирования XML-файла.
    2) В файле настроек implSettings.json обновилась добавленная на предыдущем этапе настройка "appSettings -> AdInsure -> Settings -> RGSL -> Integration -> Rosfinmonitoring". Добавлены параметры - на текущий момент константы, которые будут использоваться для заполнения тэгов <ВерсияФормата>, <ВерсПрог>, <ИДКорр>
    3) В файле настроек environmentVariables.json добавилась настройка "rgsl.organisationUnit.headUnitCode". Как её значение, записывается код подразделения, которое для данной среды является головным подразделением. Его данные (и данные связанного с этим подразделением юрлица-контрагента) будут использоваться для заполнения тэгов <ИнфНФОП>, <ИнфНФО>, а также одного из тегов <УчастникОп>
    4) В файле настроек environmentVariables.json добавилась настройка "rgsl.rosfinmonitoring.authorizedPersonTabNumber". Как её значение записывается табельный номер сотрудника, который для данной среды является уполномоченным для формирования XML-файлов. Его данные (и данные связанного с этим сотрудником физлица-контрагента) будут использоваться для заполнения тэгов <УполнСотрудн>, <ФИОУполнСотрудн>, <ТелУполнСотрудн>, <ЭлектроннаяПочта>

- [ADIRGSL-3277](https://jira.adacta-fintech.com/browse/ADIRGSL-3277): Андеррайтинг НСЖ_тестирование 31.03.2023 - реализация.

- [ADIRGSL-3288](https://jira.adacta-fintech.com/browse/ADIRGSL-3288): КСЖ_валидации на срок страхования

- [ADIRGSL-3291](https://jira.adacta-fintech.com/browse/ADIRGSL-3291): Добавлена роль SkipAttachmentsValidationAPI для перевода договоров из статуса "Проект" в статус "Подписан" (transition - Draft_to_Active, actor - Agent) без обязательного приложения документации "Подписанный договор страхования" и "Дополнительные документы банка".

- [ADIRGSL-3300](https://jira.adacta-fintech.com/browse/ADIRGSL-3300): Доработка НФИ и РАС ДС для договоров.

- [ADIRGSL-3306](https://jira.adacta-fintech.com/browse/ADIRGSL-3306): Добавлено условие по дате рождения для проверки на совпадение выгодоприобретателя с застрахованным для мигрированных договоров.

- [ADIRGSL-3307](https://jira.adacta-fintech.com/browse/ADIRGSL-3307): Изменение КВ в старом-текущем продукте "Защита кредита" с 10.05.2023

- [ADIRGSL-3309](https://jira.adacta-fintech.com/browse/ADIRGSL-3309): Изменение даты запуска на продуктов Базис инветс и Базис актив с расширением воз.границ на 15.05.

- [ADIRGSL-3310](https://jira.adacta-fintech.com/browse/ADIRGSL-3310): Доработка деклараций ТКБ по результатам тестирования

- [ADIRGSL-3314](https://jira.adacta-fintech.com/browse/ADIRGSL-3314): Снятие валидации в продукте "Моя защита"4 КСЖ потребы

- [ADIRGSL-3315](https://jira.adacta-fintech.com/browse/ADIRGSL-3315): Скорректирован алгоритм расчета периодических страховых сумм по продуктам ОАС (Детский капитал классика, Надежный капитал классика, Достойный век), добавлен учет периодичности при определении периодов.

- [ADIRGSL-3316](https://jira.adacta-fintech.com/browse/ADIRGSL-3316): Реализовать заявления на страхование

- [ADIRGSL-3317](https://jira.adacta-fintech.com/browse/ADIRGSL-3317): Результат тестирования по продуктам Базис инвест и Базис актив расширение возраст.границ

- [ADIRGSL-3319](https://jira.adacta-fintech.com/browse/ADIRGSL-3319): Результат тестирования печатных форм Базис гарант 2.0 БФКО

- [ADIRGSL-3326](https://jira.adacta-fintech.com/browse/ADIRGSL-3326): Убрана валидация на поле "Дата выдачи" для документов с типами "Паспорт гражданина Российской Федерации" и "Свидетельство о рождении (для РФ)" при миграции

- [ADIRGSL-3330](https://jira.adacta-fintech.com/browse/ADIRGSL-3330): Правки в ЭП Базис гарант 2.0 БФКО

- [ADIRGSL-3333](https://jira.adacta-fintech.com/browse/ADIRGSL-3333): Создание базовой оболочки для группы продуктов ДСЖ. Тестировать пока нечего.

- [ADIRGSL-3346](https://jira.adacta-fintech.com/browse/ADIRGSL-3346): Минорные правки для Базис гарант 2.0

- [ADIRGSL-3362](https://jira.adacta-fintech.com/browse/ADIRGSL-3362): Событийная модель. Вызов сервиса БФКО с сертификатом.

- [ADIRGSL-3364](https://jira.adacta-fintech.com/browse/ADIRGSL-3364): Добавлена возможность мигрировать договоры без настроенного условия комиссионного вознаграждения. Для этого в body договора добавлен признак commission.skipCommItemsValidation. Если передать там true, то валидация будет отключена. В случае отсутствия данного свойства или если его значение false, то все сработает как и сейчас.

- [ADIRGSL-3365](https://jira.adacta-fintech.com/browse/ADIRGSL-3365): Достойный век:

    * Изменена дата начала действия новых правил продукта на 25.05.2023.

- [ADIRGSL-3370](https://jira.adacta-fintech.com/browse/ADIRGSL-3370): Достойный век_скорректировать декларацию


### Improvements (1 changes)

- [ADIRGSL-3332](https://jira.adacta-fintech.com/browse/ADIRGSL-3332): Произведён рефакторинг сервиса загрузки субагентов с целью снижения нагрузки на базу данных.


### Fixed (6 changes)

- [ADIRGSL-2964](https://jira.adacta-fintech.com/browse/ADIRGSL-2964): Сервис маппинга продуктов и рисков:

    * Исправлен вывод ошибки об обязательных каверах.

- [ADIRGSL-3156](https://jira.adacta-fintech.com/browse/ADIRGSL-3156): Проведена типизация сообщений об ошибках в кастомных сервисах.

- [ADIRGSL-3257](https://jira.adacta-fintech.com/browse/ADIRGSL-3257): КСЖ Авто:

    * Исправлен вывод двух версий договора в ПФ.

- [ADIRGSL-3263](https://jira.adacta-fintech.com/browse/ADIRGSL-3263): Исправлена автоподстановка email на вкладке дополнительные условия договора.

- [ADIRGSL-3331](https://jira.adacta-fintech.com/browse/ADIRGSL-3331): Ошибка при идентификации платежа_Maximum cycle count reached

- [ADIRGSL-3343](https://jira.adacta-fintech.com/browse/ADIRGSL-3343): Продукт "Надежный капитал. Классика 2.0":

    * Исправлена возможность подключения риска "Критические заболевания ОУСВ" при условии, что Страхователь не равен Застрахованному.

# 49.0.0-rc1 (2023-05-03)

### Breaking Changes (2 changes)

- [ADIRGSL-2922](https://jira.adacta-fintech.com/browse/ADIRGSL-2922): Реализована возможность доплаты существующему выгодоприобретателю для убытков.

    **Deployment Notes**
    Скрипт 7.10_006.020.007_244.sql должен быть выполнен ДО паблиша.

    В связи с обновлением статусной модели убытков нужно повторно выполнить скрипт из файла impl_ldwh_zloss.sql

    Для обновления старых убытков необходимо воспользоваться миграционными скриптами:
    1)ADIRGSL-2922-claim-backup-creation.sql - создать и заполнить таблицу бэкапов.
    2)ADIRGSL-2922-execute-claim-update.sql - обновить убытки и асс для них
    3)ADIRGSL-2922-ass-claim-bank-account-update.sql - доп обновление асс для убытков
    До выполнения этих скриптов НЕ ДОБАВЛЯТЬ задублированных ВП на убытках.

- [ADIRGSL-3260](https://jira.adacta-fintech.com/browse/ADIRGSL-3260): КИД:

    * Ограничены действия с вложениями КИД для ЭП.
    * Пользователю с ролью "Система" разрешано удалять и добавлять вложения с типом "Ключевой информационный документ".

    **Deployment Notes**
    Скрипт database\sql\migration\ADIRGSL-3260-update-kid-attachment-type.sql должен быть выполнен после паблиша.
    Скрипт database\sql\migration\ADIRGSL-3260-remove-kid-attachment-backup.sql выполнить после полного тестирования задачи на старых и новых договорах.


### New Features (51 changes)

- [ADIRGSL-2000](https://jira.adacta-fintech.com/browse/ADIRGSL-2000): Запрет на создание контрагента через UI, если уже создан контрагент с таким же номером паспорта.

- [ADIRGSL-2695](https://jira.adacta-fintech.com/browse/ADIRGSL-2695): После перевода в статус "Завершен" договора, в котором есть риски группы "Дожития", автоматически создаётся сущность "Дожитие".

- [ADIRGSL-2895](https://jira.adacta-fintech.com/browse/ADIRGSL-2895): АВР. Часть 2. Добавление новых атрибутов в акте

- [ADIRGSL-2945](https://jira.adacta-fintech.com/browse/ADIRGSL-2945): РСД. Выгрузка документа в эксель

- [ADIRGSL-2964](https://jira.adacta-fintech.com/browse/ADIRGSL-2964): Сервис маппинга продуктов и рисков:

    * Добавлен столбец VPDAUSM в таблицу маппинга продуктов и рисков PAS_IMPL.EFR_PRODUCT_RISK.
    * Доработана логика сервиса маппинга продуктов и рисков.
    * Расширен атрибутивный состав ответа сервиса.
    * Исправлен фильтр по каверам.

- [ADIRGSL-3022](https://jira.adacta-fintech.com/browse/ADIRGSL-3022): Достойный век 2.0 с 15.05.2023:

    * Обновлены тарифы.
    * Изменена логика подключения рисков.
    * Добавлен новый риск "Смерть ЛП смеш" с динамической СС.
    * Обновлены правила страхования с 01.04.2023.

- [ADIRGSL-3023](https://jira.adacta-fintech.com/browse/ADIRGSL-3023): Дубликаты_КСЖ потреб_часть 2 - настройка Защита кредита

- [ADIRGSL-3027](https://jira.adacta-fintech.com/browse/ADIRGSL-3027): ДС на нефинансовые и финансовые изменения:

    * Добавлена возможность создания контрагента из формы поиска контрагента.

- [ADIRGSL-3028](https://jira.adacta-fintech.com/browse/ADIRGSL-3028): Добавлена обработка дополнительных соглашений.

- [ADIRGSL-3042](https://jira.adacta-fintech.com/browse/ADIRGSL-3042): Сервис обратного маппинга:

    * По несуществующему продукту, сервис будет возвращать ошибку: "Е: Данные не найдены".

- [ADIRGSL-3073](https://jira.adacta-fintech.com/browse/ADIRGSL-3073):
    * Изменена логика определения статуса договора в журнале заявок.
- [ADIRGSL-3083](https://jira.adacta-fintech.com/browse/ADIRGSL-3083): В структуру договора body.initiator добавлен признак isDBO

- [ADIRGSL-3089](https://jira.adacta-fintech.com/browse/ADIRGSL-3089): 1) Верификация вложений не производится для договоров с признаком isDBO
    2) Галочка "Документация корректна" при автозаполнении АВР игнорируется для договоров с признаком isDBO и договоров по группе РСЖ

- [ADIRGSL-3104](https://jira.adacta-fintech.com/browse/ADIRGSL-3104): 1) Выполнена демо-версия формирования XML-файла для входящих идентифицированных на договор платежей. Для остальных платежей возможна либо работа с ошибками, либо вообще не будет работать. Также в нынешнем виде в XML-файле отсутствуют данные по участникам операции, т.е. внутри тэга <УчастникОп> будут заполнены только тэги <СтатусУчастника> и <КодУчастника>.
    2) В настройках, а именно в файле implSettings.json появилась новая настройка appSettings -> AdInsure -> Settings -> RGSL -> Integration -> Rosfinmonitoring. В этой секции в переменной OutputFolder необходимо указать путь (включая завершающий обратный слэш) к катологу, в который планируется выгружать файлы.
    3) В журнале платежей в меню "Действия" сделан пункт меню "Создать XML-файл для Росфинмониторинга"

- [ADIRGSL-3131](https://jira.adacta-fintech.com/browse/ADIRGSL-3131): ZUONR: изменить логику с учетом номера счета ЕПС
    * Для обновление процедуры необходимо выполнить файл get_transformed_transactions.sql

- [ADIRGSL-3133](https://jira.adacta-fintech.com/browse/ADIRGSL-3133): БФКО. КСЖ потребы.

- [ADIRGSL-3157](https://jira.adacta-fintech.com/browse/ADIRGSL-3157): Заведение продуктов для миграции_3 этап_часть 2

- [ADIRGSL-3163](https://jira.adacta-fintech.com/browse/ADIRGSL-3163): запуск "Драйвер Гарантия" в Совкомбанк

- [ADIRGSL-3188](https://jira.adacta-fintech.com/browse/ADIRGSL-3188): Тех. допники для миграции: обновлять график платежей.

- [ADIRGSL-3188](https://jira.adacta-fintech.com/browse/ADIRGSL-3188): Изменён адрес Printouts для среды rgsl-migr.

- [ADIRGSL-3208](https://jira.adacta-fintech.com/browse/ADIRGSL-3208): Доработан сервис генерации вложений ЭП.
    api/rgsl/common/shared/digitalSignature/sign-contracts-attachments
    Для включения генерации вложений без ЭЦП следует установить флаг "RegenerateBaseAttachment" : true для нужного договора.

- [ADIRGSL-3209](https://jira.adacta-fintech.com/browse/ADIRGSL-3209): Доработка доступности вложений для электронных договоров.

- [ADIRGSL-3221](https://jira.adacta-fintech.com/browse/ADIRGSL-3221): Cкорректировать наименования вложений для продукта КСЖ авто.

- [ADIRGSL-3227](https://jira.adacta-fintech.com/browse/ADIRGSL-3227): Маппинг продуктов КСЖ с коротким сроком страхования. БФКО Розница

- [ADIRGSL-3229](https://jira.adacta-fintech.com/browse/ADIRGSL-3229): Стратегия на пять. Гарант:

    * Реализована возможность расчета от СС с 10.05.2023.

- [ADIRGSL-3231](https://jira.adacta-fintech.com/browse/ADIRGSL-3231): СМП Банк. Настройка продуктов. Стартегия на пять. Гарант. Базис Актив. Надежный выбор 2.0

- [ADIRGSL-3233](https://jira.adacta-fintech.com/browse/ADIRGSL-3233): БФКО. Корректировка настроек Базис гарант 2.0

- [ADIRGSL-3234](https://jira.adacta-fintech.com/browse/ADIRGSL-3234): БФКО. Базис гарант 2.0 правки в печатных формах

- [ADIRGSL-3242](https://jira.adacta-fintech.com/browse/ADIRGSL-3242): РСД. Реализовать сторно РСД по старым условиям

- [ADIRGSL-3246](https://jira.adacta-fintech.com/browse/ADIRGSL-3246): БФКО Розница_закрыть продукты Базис Инвест 3 года, Базис Актив 3 года с 30.04.2023

- [ADIRGSL-3249](https://jira.adacta-fintech.com/browse/ADIRGSL-3249): КСЖ_Защита кредита 4 CCP4

- [ADIRGSL-3252](https://jira.adacta-fintech.com/browse/ADIRGSL-3252): Внесение дополнительных правок по продуктам СМП

- [ADIRGSL-3253](https://jira.adacta-fintech.com/browse/ADIRGSL-3253): КСЖ_добавить префиксы

- [ADIRGSL-3255](https://jira.adacta-fintech.com/browse/ADIRGSL-3255): Маппинг Стратегия на пять- Гарант. Базис Актив. Надежный выбор 2.0 для СМП Банк

- [ADIRGSL-3256](https://jira.adacta-fintech.com/browse/ADIRGSL-3256): Уточнения в продуктах для миграции

- [ADIRGSL-3259](https://jira.adacta-fintech.com/browse/ADIRGSL-3259): РСД. etl service статус выволнения

- [ADIRGSL-3261](https://jira.adacta-fintech.com/browse/ADIRGSL-3261): КСЖ продукты_тестирование 26.04.2023

- [ADIRGSL-3271](https://jira.adacta-fintech.com/browse/ADIRGSL-3271): СМП_Стратегия на пять. Гарант_ПФ

- [ADIRGSL-3272](https://jira.adacta-fintech.com/browse/ADIRGSL-3272): СМП_тестирование продукты настройки

- [ADIRGSL-3276](https://jira.adacta-fintech.com/browse/ADIRGSL-3276): СМП_тестирование печатных форм

- [ADIRGSL-3278](https://jira.adacta-fintech.com/browse/ADIRGSL-3278): СМП_тестирование продуктов 28.04.23

- [ADIRGSL-3279](https://jira.adacta-fintech.com/browse/ADIRGSL-3279): КСЖ_тестирование 28.04.23

- [ADIRGSL-3281](https://jira.adacta-fintech.com/browse/ADIRGSL-3281): КИД восстанови здоровье тестирование 21 04

- [ADIRGSL-3285](https://jira.adacta-fintech.com/browse/ADIRGSL-3285): СМП_Надежный выбор 2.0

- [ADIRGSL-3286](https://jira.adacta-fintech.com/browse/ADIRGSL-3286): БФКО_расширение возрастных границ "Базис Инвест" и "Базис Актив" с 17.05.2023

- [ADIRGSL-3287](https://jira.adacta-fintech.com/browse/ADIRGSL-3287): Загрузчик пользователей для СМП

- [ADIRGSL-3293](https://jira.adacta-fintech.com/browse/ADIRGSL-3293): БФКО Базис гарант 2.0. испраления по продукту

- [ADIRGSL-3297](https://jira.adacta-fintech.com/browse/ADIRGSL-3297): СМП. Надежный выбор 2.0. удаление заявления на страхование.

- [ADIRGSL-3301](https://jira.adacta-fintech.com/browse/ADIRGSL-3301): Улучшена производительность работы отправки событий.

- [ADIRGSL-3302](https://jira.adacta-fintech.com/browse/ADIRGSL-3302): Правки по маппингу для продуктов Надежный выбор 2.0 и Базис Актив СМП

- [ADIRGSL-3303](https://jira.adacta-fintech.com/browse/ADIRGSL-3303): Добавлен фильтра по статусу для вложений ЭП.


### Fixed (6 changes)

- [ADIRGSL-2673](https://jira.adacta-fintech.com/browse/ADIRGSL-2673): integration test failed

- [ADIRGSL-3115](https://jira.adacta-fintech.com/browse/ADIRGSL-3115): КИД:

    * Исправлена кириллица в названии параметра функции.

- [ADIRGSL-3143](https://jira.adacta-fintech.com/browse/ADIRGSL-3143): АВР_ошибка при автозаполнении АВР

- [ADIRGSL-3159](https://jira.adacta-fintech.com/browse/ADIRGSL-3159): Добавлены исправления замечаний по результатам тестирования триггера на премию для региона Ингушетия.

- [ADIRGSL-3240](https://jira.adacta-fintech.com/browse/ADIRGSL-3240): РСД. Тестирование. Договоры без реинвестирования

- [ADIRGSL-3258](https://jira.adacta-fintech.com/browse/ADIRGSL-3258): РСД. Проверить корректно ли отработал etl service

# 48.0.0-rc1 (2023-04-18)

### Breaking Changes (2 changes)

- [ADIRGSL-2721](https://jira.adacta-fintech.com/browse/ADIRGSL-2721): Корректировка данных по сумме премии в журнале договоров

    **После деплоя необходимо выполнить корректировочные скрипты:**
    1. database\sql\migration\impl_ldwh_zins_cont.sql

- [ADIRGSL-2818](https://jira.adacta-fintech.com/browse/ADIRGSL-2818): Корректировка данных по сумме премии в журнале договоров

    **После деплоя необходимо выполнить корректировочные скрипты в указанном порядке:**
    1. `database\sql\migration\ADIRGSL-2818-ass-correction.sql`
    2. `database\sql\migration\ADIRGSL-2818-common-body-correction.sql` - примерное время выполнения - 20 минут

    **После выполнения скриптов необходимо выполнить реиндексацию документов elastic search**


### New Features (99 changes)

- [ADIRGSL-2000](https://jira.adacta-fintech.com/browse/ADIRGSL-2000): Запрет на создание контрагента через UI, если уже создан контрагент с таким же номером паспорта.

- [ADIRGSL-2482](https://jira.adacta-fintech.com/browse/ADIRGSL-2482): Настройка продуктов "Нота СЖ (2 года)" и "Нота СЖ (3 года)"

- [ADIRGSL-2544](https://jira.adacta-fintech.com/browse/ADIRGSL-2544): РСД. Мониторинг появления платежей после формирования РСД

- [ADIRGSL-2616](https://jira.adacta-fintech.com/browse/ADIRGSL-2616): Добавлена возможность загрузки через миграциию договоров, по которым в рисках указана нулевая премия при ненулевой страховой сумме. Для загрузки таких договоров в body договора должжен быть определён атрибут migrationAttributes со значением isMigrated = true.

- [ADIRGSL-2631](https://jira.adacta-fintech.com/browse/ADIRGSL-2631): Валютная переоценка. Конфигурация проводок.

- [ADIRGSL-2793](https://jira.adacta-fintech.com/browse/ADIRGSL-2793): Изменена логика перехода в раздел "Идентификации" из журнала платежей через меню "Показать идентификации с этим платежом". Теперь открываются идентификации с тем же ID платежа (ранее открывались идентификации с тем же номером платежа)

- [ADIRGSL-2795](https://jira.adacta-fintech.com/browse/ADIRGSL-2795): На вкладку "Связанные платежи" договора добавлен атрибут "ид платежа"

- [ADIRGSL-2830](https://jira.adacta-fintech.com/browse/ADIRGSL-2830): АВР. Технический агент (dummy)

- [ADIRGSL-2889](https://jira.adacta-fintech.com/browse/ADIRGSL-2889): НСЖ_Замена провайдера в шаблоне договора в декларации.

- [ADIRGSL-2895](https://jira.adacta-fintech.com/browse/ADIRGSL-2895): АВР. Часть 2. Добавление новых атрибутов в акте

- [ADIRGSL-2896](https://jira.adacta-fintech.com/browse/ADIRGSL-2896): Добавлено поле "Примечание" в журнал акта и реестр.

- [ADIRGSL-2923](https://jira.adacta-fintech.com/browse/ADIRGSL-2923): Достойный век 2.0:

    * Добавлена валидация: Сумма долей выгодоприобретателей должна быть ровно 100%.

- [ADIRGSL-2947](https://jira.adacta-fintech.com/browse/ADIRGSL-2947): РСД. Аннулирование фиктивных платежей

- [ADIRGSL-2948](https://jira.adacta-fintech.com/browse/ADIRGSL-2948): РСД. Алгоритм компенсации в расчете суммы РСД

- [ADIRGSL-2974](https://jira.adacta-fintech.com/browse/ADIRGSL-2974): Проводки. Начисление и сторно КВ Оценка

- [ADIRGSL-2976](https://jira.adacta-fintech.com/browse/ADIRGSL-2976): КИД_Стань миллионером_Стратегия на пять. Гарант

- [ADIRGSL-2980](https://jira.adacta-fintech.com/browse/ADIRGSL-2980): АВР. Учет изменений ставок КВ Оценка/КВ к выплате

- [ADIRGSL-2981](https://jira.adacta-fintech.com/browse/ADIRGSL-2981): РСД. Проводки

- [ADIRGSL-2986](https://jira.adacta-fintech.com/browse/ADIRGSL-2986): В платёж добавлены атрбуты для типа дебетора и кредитора. Предполагается заполнение значениями ФЛ, ЮЛ, ИП, либо без значения, но валидация не предусмотрена.

- [ADIRGSL-2989](https://jira.adacta-fintech.com/browse/ADIRGSL-2989): Перенос настроек по событийной модели в БД.
    Настройки хранятся в таблицах:
    `BFX_IMPL.SEND_EVENT_TYPE`
    `BFX_IMPL.SEND_EVENT_CONFIGURATION`

- [ADIRGSL-2990](https://jira.adacta-fintech.com/browse/ADIRGSL-2990): Реализация КИД в продуктах БСЖ (Базис гарант)

- [ADIRGSL-2997](https://jira.adacta-fintech.com/browse/ADIRGSL-2997): Доработаны строки состовляющих выплаты для дожитий и дид.

- [ADIRGSL-2998](https://jira.adacta-fintech.com/browse/ADIRGSL-2998): Технические изменения. В скрипт реиндексации добавлена возможность указания массива индексов для реиндексации.
    Параметр -index заменён на -indices. По-прежнему, параметр является не обязательным.
    Пример вызова:

    `.\ES-Reindex.ps1 -environment local -indices AgentAgreement, Claim`

    Допустимые значения аналогичные для параметра -index.

- [ADIRGSL-3002](https://jira.adacta-fintech.com/browse/ADIRGSL-3002): Кастомный сервис по доп. сервисам контрагента.

- [ADIRGSL-3007](https://jira.adacta-fintech.com/browse/ADIRGSL-3007): Настройка маппинга для передачи сервисов по продуктам БФКО

- [ADIRGSL-3008](https://jira.adacta-fintech.com/browse/ADIRGSL-3008): Необходимо разработать сервис для пересчета payable commission

- [ADIRGSL-3014](https://jira.adacta-fintech.com/browse/ADIRGSL-3014): Нота - настройка процесса.

- [ADIRGSL-3017](https://jira.adacta-fintech.com/browse/ADIRGSL-3017): Explain your changes here

- [ADIRGSL-3021](https://jira.adacta-fintech.com/browse/ADIRGSL-3021): ОАС_Достойный век 2.0 - обновить ПФ

- [ADIRGSL-3028](https://jira.adacta-fintech.com/browse/ADIRGSL-3028): Формат даты атрибутов startDate и endDate изменён на DD.MM.YYYY

- [ADIRGSL-3032](https://jira.adacta-fintech.com/browse/ADIRGSL-3032): Версионность деклараций в шаблоне договора по датам.

- [ADIRGSL-3033](https://jira.adacta-fintech.com/browse/ADIRGSL-3033): Запрет создания электронного полиса при регистрации e-mail из "черного списка".

    Таблица для хранения чёрного списка `BFX_IMPL.EMAIL_BLACK_LIST`

- [ADIRGSL-3042](https://jira.adacta-fintech.com/browse/ADIRGSL-3042): Сервис обратного маппинга:

    * Произведена доработка согласно ТЗ версии 5.

- [ADIRGSL-3046](https://jira.adacta-fintech.com/browse/ADIRGSL-3046): Валидация при расчете РСД

- [ADIRGSL-3047](https://jira.adacta-fintech.com/browse/ADIRGSL-3047): Implemented additional beneficiaries for endowments.

- [ADIRGSL-3054](https://jira.adacta-fintech.com/browse/ADIRGSL-3054): Изменение исторической доходности по продуктам ИСЖ - к 11.04.23.

- [ADIRGSL-3056](https://jira.adacta-fintech.com/browse/ADIRGSL-3056): КИД+правила в продуктах "Финансовый резерв" и "Вектор здоровья Премиум 2.0

- [ADIRGSL-3057](https://jira.adacta-fintech.com/browse/ADIRGSL-3057): Добавлен КИД в ПФ для продуктов: "Надежный выбор 2.0", "Надежный выбор Премиум 2.0", "Премиум выбор Лайт".

- [ADIRGSL-3061](https://jira.adacta-fintech.com/browse/ADIRGSL-3061): Настроен КИД по продуктам ДМС ОАС.

- [ADIRGSL-3062](https://jira.adacta-fintech.com/browse/ADIRGSL-3062): КИД исправления:

    * Надежный капитал. Классика 2.0, Детский капитал. Классика 2.0.
    * Драйвер Гарантия.
    * Базис Гарант.
    * Стань миллионером. Стратегия на пять.

- [ADIRGSL-3069](https://jira.adacta-fintech.com/browse/ADIRGSL-3069): Доработка продуктовых настроек в части валютных продуктов. strategyConfiguration.

- [ADIRGSL-3071](https://jira.adacta-fintech.com/browse/ADIRGSL-3071): Новые правила. Замена правил.

- [ADIRGSL-3079](https://jira.adacta-fintech.com/browse/ADIRGSL-3079): Базис гаран. БФКО. 5 лет. добавление разбивки до 80 лет.

- [ADIRGSL-3080](https://jira.adacta-fintech.com/browse/ADIRGSL-3080): КИД_КСЖ АВТО_корректировки в действующем

- [ADIRGSL-3085](https://jira.adacta-fintech.com/browse/ADIRGSL-3085): Доработан алгоритм расчета периодических СС ОУСВ для случая, когда срок действия риска меньше срока действия договора.

- [ADIRGSL-3086](https://jira.adacta-fintech.com/browse/ADIRGSL-3086): Закрытие продукта Премиум Гарант Плюс для партнера Зенит

- [ADIRGSL-3088](https://jira.adacta-fintech.com/browse/ADIRGSL-3088): Удаление комментария при транзишене для документа верификации:
    -  transition:
       -  Cancelled_to_Draft_System
    -  очищаемые поля:
       -  Типы ошибок
       -  Комментарий СК

- [ADIRGSL-3092](https://jira.adacta-fintech.com/browse/ADIRGSL-3092): Fixed data schema for comm calc enrichment

- [ADIRGSL-3093](https://jira.adacta-fintech.com/browse/ADIRGSL-3093): Электронные полисы и оферты:

    * Внесены изменения в текст, который приходит в сообщении вместе с проектом договора для всех продуктов.

- [ADIRGSL-3097](https://jira.adacta-fintech.com/browse/ADIRGSL-3097): КИД:

    * Изменена верстка для всех продуктов.
    * Исправлены замечания для продуктов "Надежный выбор 2.0", "Надежный выбор Премиум 2.0", "Премиум выбор Лайт".

- [ADIRGSL-3098](https://jira.adacta-fintech.com/browse/ADIRGSL-3098): В сервисе ActiveContractsForOperationEtlService, используемый в job ActiveContractsForOperation изменён параметр "форма выпуска" - теперь можно использовать несколько значений формы выпуска. Сейчас используются "Бумага" и "Оферта"

- [ADIRGSL-3100](https://jira.adacta-fintech.com/browse/ADIRGSL-3100): Результат тестирования по замене провайдера и корректировке деклараций.

- [ADIRGSL-3101](https://jira.adacta-fintech.com/browse/ADIRGSL-3101): Результат тестирования ДМС БФКО (коробки)

- [ADIRGSL-3102](https://jira.adacta-fintech.com/browse/ADIRGSL-3102): Закрытие продуктов с 01.04.2023 EBMGMINBANK EBMAKBARS EPGPAKBARS

- [ADIRGSL-3105](https://jira.adacta-fintech.com/browse/ADIRGSL-3105): КСЖ_проверка на дубли_тестирование

- [ADIRGSL-3107](https://jira.adacta-fintech.com/browse/ADIRGSL-3107): Результат тестирования внедрения КИД в КСЖ

- [ADIRGSL-3108](https://jira.adacta-fintech.com/browse/ADIRGSL-3108): Добавлена возможность в статусе Завершён договора создавать Дожитие и ДИД
    Внесены правки в расчет НДФЛ в Дожитиях

- [ADIRGSL-3111](https://jira.adacta-fintech.com/browse/ADIRGSL-3111): КИД:

    * Рефакторинг Раздел III. ТЕРРИТОРИЯ СТРАХОВАНИЯ.
    * Рефакторинг Раздел IV. КАК ПОЛУЧИТЬ СТРАХОВУЮ ВЫПЛАТУ.
    * Рефакторинг Раздел V. КАК ВЕРНУТЬ СТРАХОВУЮ ПРЕМИЮ.
    * Исправлена ошибка с выбранными рисками, при открытии печатных форм продуктов Генетический чек-ап.

- [ADIRGSL-3112](https://jira.adacta-fintech.com/browse/ADIRGSL-3112): По продукту “Стань миллионером” изменить кешбек на 25,50% с 05.04.2023 (было 23%)

- [ADIRGSL-3113](https://jira.adacta-fintech.com/browse/ADIRGSL-3113): Вернуть формирование проводок для платежей с типом is_migrated = 1

- [ADIRGSL-3114](https://jira.adacta-fintech.com/browse/ADIRGSL-3114): Расчет курсовой разницы. Создать интеграционный тест.

- [ADIRGSL-3115](https://jira.adacta-fintech.com/browse/ADIRGSL-3115): КИД:

    * Подготовлен прототип раздельных ПФ с разными рисками.

- [ADIRGSL-3119](https://jira.adacta-fintech.com/browse/ADIRGSL-3119): Fix insuredAgeOnStartDateMandatoryAgreement

- [ADIRGSL-3123](https://jira.adacta-fintech.com/browse/ADIRGSL-3123): КИД:

    * Исправлены подписи в договорах, где присутствует КИД.

- [ADIRGSL-3124](https://jira.adacta-fintech.com/browse/ADIRGSL-3124): КИД:

    * Настроен вывод ПФ для продукта "Достойный век 2.0".

- [ADIRGSL-3125](https://jira.adacta-fintech.com/browse/ADIRGSL-3125): ОАС. Детский Капитал. Доработка тарификации для учета заменяющихся рисков.

- [ADIRGSL-3126](https://jira.adacta-fintech.com/browse/ADIRGSL-3126): Технические изменения.

- [ADIRGSL-3127](https://jira.adacta-fintech.com/browse/ADIRGSL-3127): КИД:

    * Исправлены замечания после установки ХФ 47.0.6.

- [ADIRGSL-3128](https://jira.adacta-fintech.com/browse/ADIRGSL-3128): Исправлена ошибка при печати ПФ по Гарант защиты.

- [ADIRGSL-3129](https://jira.adacta-fintech.com/browse/ADIRGSL-3129): КИД:

    * Маппинг Раздел I. ЧТО ЗАСТРАХОВАНО?
    * Маппинг Раздел II. ЧТО НЕ ЗАСТРАХОВАНО?
    * Маппинг Раздел III. ТЕРРИТОРИЯ СТРАХОВАНИЯ.
    * Маппинг Раздел IV. КАК ПОЛУЧИТЬ СТРАХОВУЮ ВЫПЛАТУ?
    * Маппинг Раздел V. КАК ВЕРНУТЬ СТРАХОВУЮ ПРЕМИЮ?
    * Правила Премиум выбор Лайт.
    * КСЖ. РЖ08 и РЖ36 правила №9 (в редакции от 01.04.2023), а во всех остальных правила № 12 (в редакции от 01.04.2023).
    * КСЖ. Подписи. Формат Раздел IV. КАК ПОЛУЧИТЬ СТРАХОВУЮ ВЫПЛАТУ.

- [ADIRGSL-3132](https://jira.adacta-fintech.com/browse/ADIRGSL-3132): Правки по результатам тестирования деклараций

- [ADIRGSL-3135](https://jira.adacta-fintech.com/browse/ADIRGSL-3135): КСЖ_доработка логики для продукта Моя защита 4.0

- [ADIRGSL-3136](https://jira.adacta-fintech.com/browse/ADIRGSL-3136): Оферта:

    * Подпись СК без подписи Страхователя и Застрахованного.

- [ADIRGSL-3139](https://jira.adacta-fintech.com/browse/ADIRGSL-3139): КИД:

    * Добавлен маппинг для Раздел I. ЧТО ЗАСТРАХОВАНО? по продуктам Драйвер Гарантия.

- [ADIRGSL-3140](https://jira.adacta-fintech.com/browse/ADIRGSL-3140): Валютная переоценка, UI для вызова сервиса на конец отчетного периода

- [ADIRGSL-3141](https://jira.adacta-fintech.com/browse/ADIRGSL-3141): Исправление типа сообщения "Согласование СК не требуется"

- [ADIRGSL-3146](https://jira.adacta-fintech.com/browse/ADIRGSL-3146): КСЖ_тестирование_Дубликаты_04.04.2023

- [ADIRGSL-3149](https://jira.adacta-fintech.com/browse/ADIRGSL-3149): Электронные полисы и оферты:

    * Внесены изменения в текст, который приходит в сообщении вместе с проектом договора для всех продуктов.
    * Для эл. полиса во второе письмо прикладываться КИД не будет.

- [ADIRGSL-3151](https://jira.adacta-fintech.com/browse/ADIRGSL-3151): Добавлена обработка отсутствующего контрагента при формировании триггеров.

- [ADIRGSL-3152](https://jira.adacta-fintech.com/browse/ADIRGSL-3152): КИД КСЖ АВТО:

    * Исправлен текст раздела VII.
    * Скорректировано наименование КИД.
    * Информация о Страховщике перенесена под QR-код.
    * Скорректировано форматирование фразы «В иных случаях страховая премия возврату не подлежит.»
    * Выровнен текст дополнительные страховые риски.

- [ADIRGSL-3153](https://jira.adacta-fintech.com/browse/ADIRGSL-3153): БФКО. ДМС. Изменение даты запуска.

- [ADIRGSL-3158](https://jira.adacta-fintech.com/browse/ADIRGSL-3158): БФКО. Базис гарант 2.0.

- [ADIRGSL-3165](https://jira.adacta-fintech.com/browse/ADIRGSL-3165): Добавление роли MedLifeBFKOMass в загрузчик пользователей.

- [ADIRGSL-3168](https://jira.adacta-fintech.com/browse/ADIRGSL-3168): КИД:

    * Исправлены замечания по продуктам: Надежный капитал. Классика 2.0 и Детский капитал. Классика 2.0.
    * Отцентрована секция "В иных случаях".

- [ADIRGSL-3172](https://jira.adacta-fintech.com/browse/ADIRGSL-3172): ПФ. Восстанови здоровье Лайт. Форматирование блока срок действия.

- [ADIRGSL-3175](https://jira.adacta-fintech.com/browse/ADIRGSL-3175): Обновление маппинга для продукта КСЖ - Защита кредита

- [ADIRGSL-3176](https://jira.adacta-fintech.com/browse/ADIRGSL-3176): Письмо для оферты

- [ADIRGSL-3178](https://jira.adacta-fintech.com/browse/ADIRGSL-3178): Доработка деклараций продукта "Достойный век 2.0" для ОАС по результатам тестирования

- [ADIRGSL-3179](https://jira.adacta-fintech.com/browse/ADIRGSL-3179): Результат тестирования ДМС коробки БФКО

- [ADIRGSL-3182](https://jira.adacta-fintech.com/browse/ADIRGSL-3182): Обновление мед. деклараций в Бонд Репак

- [ADIRGSL-3192](https://jira.adacta-fintech.com/browse/ADIRGSL-3192): Корректировка маппинга ДМС коробки БФКО

- [ADIRGSL-3195](https://jira.adacta-fintech.com/browse/ADIRGSL-3195): Технические изменения. Добавлены настройки для новой среды РГСЛ rgsl-migr.

- [ADIRGSL-3197](https://jira.adacta-fintech.com/browse/ADIRGSL-3197): БФКО ДМС. Изменение даты вступления в силу договора.

- [ADIRGSL-3198](https://jira.adacta-fintech.com/browse/ADIRGSL-3198): Внесение правок по результатам тестирования

- [ADIRGSL-3205](https://jira.adacta-fintech.com/browse/ADIRGSL-3205): КСЖ_доработка валидации на срок

- [ADIRGSL-3210](https://jira.adacta-fintech.com/browse/ADIRGSL-3210): Корректировки программ ДМС коробочное БФКО.

- [ADIRGSL-3212](https://jira.adacta-fintech.com/browse/ADIRGSL-3212): Исправление графика траншей

- [ADIRGSL-3218](https://jira.adacta-fintech.com/browse/ADIRGSL-3218): Маппинг Базис Гарант 2.0 для БФКО розн

- [ADIRGSL-3219](https://jira.adacta-fintech.com/browse/ADIRGSL-3219): БФКО Прайвет. Замена кода партнера.


### Fixed (12 changes)

- [ADIRGSL-2892](https://jira.adacta-fintech.com/browse/ADIRGSL-2892): Исправлено заполнение поля: Фактическая дата расторжения

- [ADIRGSL-2897](https://jira.adacta-fintech.com/browse/ADIRGSL-2897): АВР. Информация по расторгнутым договорам.

- [ADIRGSL-2924](https://jira.adacta-fintech.com/browse/ADIRGSL-2924): Исправлено отображение таблицы истории платежа

- [ADIRGSL-2993](https://jira.adacta-fintech.com/browse/ADIRGSL-2993): Исправлена сортировка по номеру в журнале договоров

- [ADIRGSL-3016](https://jira.adacta-fintech.com/browse/ADIRGSL-3016): Проводки. РНВ. Частичный взaимозачет

- [ADIRGSL-3045](https://jira.adacta-fintech.com/browse/ADIRGSL-3045): Исправлено заполнение исторических данных для платежей, АВР и закрытых периодов: в качесте пользователя теперь берётся текущий пользователь

- [ADIRGSL-3050](https://jira.adacta-fintech.com/browse/ADIRGSL-3050): Доработка карточки ЮЛ по результатам тестирования задачи ADIRGSL-2929

- [ADIRGSL-3078](https://jira.adacta-fintech.com/browse/ADIRGSL-3078): Платежи.Реестр. Изменение назнчения платежа

- [ADIRGSL-3138](https://jira.adacta-fintech.com/browse/ADIRGSL-3138): 47.011_Эл полисы БФКО не прикладываются во вложения и не уходят на почту клиенту подписанные и некорректная подпись СК на договоре

- [ADIRGSL-3155](https://jira.adacta-fintech.com/browse/ADIRGSL-3155): КИД:

    * Исправлена часть замечаний указанная в файлах тестирования.
    * Изменен способ переноса последней секции на другую страницу.

- [ADIRGSL-3162](https://jira.adacta-fintech.com/browse/ADIRGSL-3162): АВР. Расчет НДСД, компенсация

- [ADIRGSL-3181](https://jira.adacta-fintech.com/browse/ADIRGSL-3181): Событийная модель. Изменить запрос к сервису внешнего партнёра.

# 47.0.0-rc1 (2023-03-24)

### Breaking Changes (7 changes)

- [ADIRGSL-1728](https://jira.adacta-fintech.com/browse/ADIRGSL-1728): Добавлен скрипт по корректировке признака isLife на рисках в body. Старый скрипт по корректировке данных в commonBody также рекоммендую запустить повторно, там совсем немного строк проапдейтится. Новый будет работать дольше, там 40+ тысяч апдейтов body.

    После паблиша необходимо выполнить скрипты (могут выполняться долго, отбор идет около 10 минут + апдейт):
    database\sql\migration\ADIRGSL-1728-common-body-isLife-update.sql
    database\sql\migration\ADIRGSL-1728-body-isLife-update.sql

- [ADIRGSL-2757](https://jira.adacta-fintech.com/browse/ADIRGSL-2757): Поиск убытков:

    * Добавлены новые атрибуты, по которым можно осуществлять поиск и фильтрацию (отбор) убытков в журнале.
    * В UI табличной части отфильтрованного диапазона добавлены новые столбцы.

    > **Необходимо выполнить корректировочные скрипты:**
    > database\sql\migration\ADIRGSL-2757-update-claim-body.sql
    > database\sql\migration\ADIRGSL-2757-update-claim-cbody.sql
    > database\sql\migration\ADIRGSL-2757-update-insuredEvent-body.sql
    > database\sql\migration\ADIRGSL-2757-update-insuredEvent-cbody.sql

    > После выполнения скриптов необходима переиндексация ES.

- [ADIRGSL-2780](https://jira.adacta-fintech.com/browse/ADIRGSL-2780): Реализованы дополнительные типы ставок КВ.

    **Deployment notes**
    Выполнить 7.10_006.020.007_206.sql скрипт ДО паблишинга.

- [ADIRGSL-2810](https://jira.adacta-fintech.com/browse/ADIRGSL-2810): Реализован функционал расчета НДФЛ для дожитий.

    Был обновлен ответ сервиса поиска контрагентов:
    https://adinsure-test-server.rgsl.ru/api/entity-infrastructure/datasource/execute?configurationCodeName=GeneralPartyDataSource
    Добавлены поля:
    partyExcludedPersons,
    partyTaxResidencies

    **Deployment Notes*
    Выполнить вручную скрипт database\sql\migration\ADIRGSL-2810-update-bank-statement-items.sql.
    Выполнить реиндекс ES.

- [ADIRGSL-2929](https://jira.adacta-fintech.com/browse/ADIRGSL-2929): Доработана карточка юридического лица:

    * Доработан блок «Адрес»: добавлены типы адресов для англоязычного ввода
    * Доработан блок «Данные Организации»: добавлены поля англоязычного наименования и англоязычного сокращённого наименования
    * В справочник атрибута «Роль (для визуализации валидаций)» добавлены значения «Страхователь» и «Застрахованный»
    * Добавлен новый блок «Информация о регистрирующем органе», туда также вынесены поля «ОГРН/ОГРНИП» и «Дата государственной регистрации»
    * Добавлен новый блок «Информация о лицензируемой деятельности, туда вынесены поля «Номер лицензии/разрешения», «Наименование органа, выдавшего лицензию (разрешение)» и «Дата выдачи лицензии (разрешения)». Предполагается множественный ввод этих данных
    * Для нерезидентов убрана валидация на предмет обязательности заполнения поля «ОГРН/ОГРНИП»

    > **Необходимо выполнить корректировочные скрипты:**
    > database\sql\migration\ADIRGSL-2929-move-license-to-sat.sql

    > После выполнения скриптов необходима переиндексация ES.

- [ADIRGSL-2939](https://jira.adacta-fintech.com/browse/ADIRGSL-2939): Доработана карточка юридического лица:
    * Доработано поле ввода «Сайт»: добавлено поле выбора наличия официального сайта
    * Доработан блок «Информация о лицензируемой деятельности»: добавлено поле выбора наличия лицензии
    * Для роли «Страхователь» добавлена обязательность заполнения полей выбора, описанных выше.

    Доработана карточка Физического лица для категории «Индивидуальный предприниматель»:
    * Дорабавлено поле ввода «Сайт» с полем выбора наличия официального сайта
    * Дорабавлен блок «Информация о лицензируемой деятельности» с полем выбора наличия лицензии
    * Для роли «Страхователь» добавлена обязательность заполнения полей выбора, описанных выше.

    > **Необходимо выполнить корректировочные скрипты:**
    > database\sql\migration\ADIRGSL-2939-add-site-component.sql

    > После выполнения скриптов необходима переиндексация ES.

- [ADIRGSL-3026](https://jira.adacta-fintech.com/browse/ADIRGSL-3026): Реализовано указание банковских реквизитов для дожитий и убытков.

    **Deployment Notes**
    Выполнить реиндекс ES


### New Features (41 changes)

- [ADIRGSL-1944](https://jira.adacta-fintech.com/browse/ADIRGSL-1944): Убытки:

    * Разработан функционал отправки уведомлений на п/я о задачах поступивших в группу.

- [ADIRGSL-2470](https://jira.adacta-fintech.com/browse/ADIRGSL-2470): Добавление классификации в ответы об ошибках

- [ADIRGSL-2517](https://jira.adacta-fintech.com/browse/ADIRGSL-2517): Заявление на досрочное прекращение

- [ADIRGSL-2656](https://jira.adacta-fintech.com/browse/ADIRGSL-2656): Исправления по результатам тестирования.

- [ADIRGSL-2694](https://jira.adacta-fintech.com/browse/ADIRGSL-2694): Добавлены настройки авторизации для сервиса по смене статуса договора на "Завершен".

- [ADIRGSL-2701](https://jira.adacta-fintech.com/browse/ADIRGSL-2701): Расчет курсовой разницы. КУРСОВАЯ РАЗНИЦА, РУБ

- [ADIRGSL-2725](https://jira.adacta-fintech.com/browse/ADIRGSL-2725): Добавлен тип модификации для корректного отображения на закладке ИСТОРИЯ.

- [ADIRGSL-2860](https://jira.adacta-fintech.com/browse/ADIRGSL-2860): Отражение договоров для внешних пользователей сервисов

- [ADIRGSL-2872](https://jira.adacta-fintech.com/browse/ADIRGSL-2872): Для продуктов агентской сети «Надежный капитал Классика 2.0» и «Детский капитал Классика 2.0» настроен триггер на ограничение по сумме премии и региону Ингушетия.

- [ADIRGSL-2873](https://jira.adacta-fintech.com/browse/ADIRGSL-2873): 1. Добавлена системная настройка продукта для выбора типа Страхователя (ЮЛ/ФЛ/оба).
    2. Для текущих продуктов везде установлено ФЛ.

- [ADIRGSL-2880](https://jira.adacta-fintech.com/browse/ADIRGSL-2880): ОАС. Изменения в декларации страх.застрах.ТКБ

- [ADIRGSL-2885](https://jira.adacta-fintech.com/browse/ADIRGSL-2885): БФКО_Финансовый резерв_тарификация для андеррайтеров

- [ADIRGSL-2904](https://jira.adacta-fintech.com/browse/ADIRGSL-2904): Проверка Контрагентов на дубли при загрузке Бордеро КСЖ

- [ADIRGSL-2907](https://jira.adacta-fintech.com/browse/ADIRGSL-2907): Андеррайтинг_доработка инвест. продуктов

- [ADIRGSL-2921](https://jira.adacta-fintech.com/browse/ADIRGSL-2921): БФКО РВ_ДМС_Печатные формы

- [ADIRGSL-2938](https://jira.adacta-fintech.com/browse/ADIRGSL-2938): Андеррайтинг_доработка продуктов НСЖ.

    Добавлена возможность настраивать параметры "Коэффициент андеррайтера" и "Надбавка андеррайтера, ‰" по продуктам в разрезе рисков.
    Настройка производится в файле underwriterCoeffConfiguration.xlsx и функциях тарификации (Premium.js)

- [ADIRGSL-2943](https://jira.adacta-fintech.com/browse/ADIRGSL-2943): Зенит_замена уведомления по форме банка. Релиз 22.03.

- [ADIRGSL-2951](https://jira.adacta-fintech.com/browse/ADIRGSL-2951): Надежный капитал Классика 2.0 корректировка риска

- [ADIRGSL-2971](https://jira.adacta-fintech.com/browse/ADIRGSL-2971): ПСБ. Вектор здоровья Премиум 2.0.Удаление единовр.взноса.

- [ADIRGSL-2984](https://jira.adacta-fintech.com/browse/ADIRGSL-2984): Маппинг продуктов ДМС: PRO ЗОЖ, Здоровье, Генетика для БФКО

- [ADIRGSL-2989](https://jira.adacta-fintech.com/browse/ADIRGSL-2989): Изменение даты отправки событий на 31.12.2030

- [ADIRGSL-2991](https://jira.adacta-fintech.com/browse/ADIRGSL-2991): Добавлен сервис по загрузке динамики официального курса заданной валюты.

    **Ссылка на сервис**: api/rgsl/common/shared/cbr-integration/load-currency-dynamic

    **Входные параметры**:
    FromDate - Запрашиваемая дата начала периода
    ToDate - Запрашиваемая дата конца периода
    CurrencyCode - Запрашиваемый 3-х буквенный код ISO валюты (например, USD, EUR и т.д.)

- [ADIRGSL-2994](https://jira.adacta-fintech.com/browse/ADIRGSL-2994): Печатная форма (proBFKOPolicyPrintout) договора для продуктов КСЖ и ДМС(коробки):

    * Добавлена отдельная нумерации для ключевого информационного документа.

- [ADIRGSL-2996](https://jira.adacta-fintech.com/browse/ADIRGSL-2996): Корректировки_ДМС_БФКО

- [ADIRGSL-3006](https://jira.adacta-fintech.com/browse/ADIRGSL-3006): БФКО. ДМС. Смена даты запуска на 27.03.

- [ADIRGSL-3020](https://jira.adacta-fintech.com/browse/ADIRGSL-3020): Достойный век 2.0:

    * Настроен выпуск электронного полиса.
    * Настроена отправка ключевого информационного документа на почту.

- [ADIRGSL-3028](https://jira.adacta-fintech.com/browse/ADIRGSL-3028): Доработка сервиса поиска договоров по страхователю

- [ADIRGSL-3029](https://jira.adacta-fintech.com/browse/ADIRGSL-3029): Подарочные сервисы:

    * Отображение сервисов зависит от суммы всех премий по рискам.
    * Исправлено наименование вложения файла pdf для ПРО ЗОЖ.

    Печатные формы У-109-2:
    * Исправлен блок подписи гражданина, часть которого переносилась на новую страницу.

- [ADIRGSL-3031](https://jira.adacta-fintech.com/browse/ADIRGSL-3031): Заведение продуктов для миграции_3 этап.

- [ADIRGSL-3035](https://jira.adacta-fintech.com/browse/ADIRGSL-3035): Зенит_замена уведомления по форме банка только для Драйвер гарантия. Релиз 22.03.

- [ADIRGSL-3036](https://jira.adacta-fintech.com/browse/ADIRGSL-3036): Учет валюты при формировании проводок по расторжению после восстановления.

- [ADIRGSL-3038](https://jira.adacta-fintech.com/browse/ADIRGSL-3038): ДМС БФКО:

    * Для продуктов PROGENTICSBFKO, PROHEALTHBFKO, PROZOZHBFKO сделаны доработки согласно требованиям во вложении к задаче.

- [ADIRGSL-3040](https://jira.adacta-fintech.com/browse/ADIRGSL-3040): ДМС БФКО_дополнительные правки по печатным формам

- [ADIRGSL-3048](https://jira.adacta-fintech.com/browse/ADIRGSL-3048): Результат тестирования уведомления. Зенит.

- [ADIRGSL-3052](https://jira.adacta-fintech.com/browse/ADIRGSL-3052): Обновление данных в скрипте интеграции с САП

- [ADIRGSL-3058](https://jira.adacta-fintech.com/browse/ADIRGSL-3058): БФКО дополнительные сервисы:

    * Исправлен расчёт премии при выводе доп. сервисов.
    * Исправлена дата начала сервисов.
    * Исправлена информация по минимальной сумме взноса.

- [ADIRGSL-3059](https://jira.adacta-fintech.com/browse/ADIRGSL-3059): Постпродажное сопровождение - Заявка:

    * Заблокирована возможность создания заявки на внесение изменений для Агента.

- [ADIRGSL-3063](https://jira.adacta-fintech.com/browse/ADIRGSL-3063): Корректировка раздела "полезная информация" ОАС

- [ADIRGSL-3065](https://jira.adacta-fintech.com/browse/ADIRGSL-3065): В таблицу рисков добавлены новые атрибуты PAYMENT_FORM и RISKS_GROUP

- [ADIRGSL-3070](https://jira.adacta-fintech.com/browse/ADIRGSL-3070): Перенос даты запусков продуктов ДМС БФКО на 10.04.2023

- [ADIRGSL-3075](https://jira.adacta-fintech.com/browse/ADIRGSL-3075): Обновлено время запуска джоба для перевода договора из проекта в подписан.


### Fixed (5 changes)

- [ADIRGSL-2118](https://jira.adacta-fintech.com/browse/ADIRGSL-2118): исправлена грамматическая ошибка

- [ADIRGSL-2673](https://jira.adacta-fintech.com/browse/ADIRGSL-2673): Integration tests failed

- [ADIRGSL-2800](https://jira.adacta-fintech.com/browse/ADIRGSL-2800): Проводки. РНВ по документу Дожитие

- [ADIRGSL-2842](https://jira.adacta-fintech.com/browse/ADIRGSL-2842): Исправлены шаблоны сопоставления для номера договора в описании платежа

- [ADIRGSL-3004](https://jira.adacta-fintech.com/browse/ADIRGSL-3004): Вопрос по формированию АВР по мигрированному договору

# 46.0.0-rc1 (2023-03-10)

### Breaking Changes (3 changes)

- [ADIRGSL-2815](https://jira.adacta-fintech.com/browse/ADIRGSL-2815): добавлен фильтр по продукту условий в АгД.

    **Deployment notes**
    Необходимо сделать реиндекс ES.

- [ADIRGSL-2926](https://jira.adacta-fintech.com/browse/ADIRGSL-2926): 1) Обновлено значение поля ZUONR, теперь для проводок по платежам с типом "Распределение платежей" выводится ID платежа
    2) Исправлен интеграционный тест, необходимый для получения тестовых данных для основной задачи

    **Deployment notes**
    После установки запустить скрипт implementation\database\sql\migration\get_transformed_transactions.sql

- [ADIRGSL-2955](https://jira.adacta-fintech.com/browse/ADIRGSL-2955): ##### Подарочные сервисы:

    * Для продуктов БФКО при определенной сумме взноса, указанных в ТЗ задачи, заключенных с 27.03.2023, требуется дополнительно указать «Дополнительный сервис».
    * Добавлены памятки в печатные формы и электрополисы.
    * Чтобы после создания котировки через сервис, не возникала ошибка валидации для данных продуктов, можно сразу указать «Дополнительный сервис» указав в корне запроса:
    `"giftServices": {
        "selectedGiftServices": {
          "giftServiceDescription": "ПРО Здоровье",
          "giftServiceCodes": [
            "MED85"
          ]
        }
      }
    `


### New Features (30 changes)

- [ADIRGSL-2543](https://jira.adacta-fintech.com/browse/ADIRGSL-2543): РСД. Доработка функционала платежей

- [ADIRGSL-2587](https://jira.adacta-fintech.com/browse/ADIRGSL-2587): Обновление имени контрагента в карточке пользователя при импорте САД.

- [ADIRGSL-2656](https://jira.adacta-fintech.com/browse/ADIRGSL-2656): Исправления после тестирования сервиса поиска по страхователю.

- [ADIRGSL-2692](https://jira.adacta-fintech.com/browse/ADIRGSL-2692): Сервис продукт-риск:

    * Добавлен фильтр по признаку EFR для сервиса витрины

- [ADIRGSL-2751](https://jira.adacta-fintech.com/browse/ADIRGSL-2751): Валидации на создание котировки и договора при вызове сервиса.

- [ADIRGSL-2821](https://jira.adacta-fintech.com/browse/ADIRGSL-2821): 1) Добавлен сервис автоматического перевода договоров из статуса Проект в статус Подписан, если имеются не идентифицированные платежи со ссылкой на такой договор
    2) Добалена кнопка вызова этого сервиса из меню "Банковские выписки -> Сервисы"
    3) Добавлен вызов этого сервиса по расписанию планировщика ежедневно в 0:00

- [ADIRGSL-2822](https://jira.adacta-fintech.com/browse/ADIRGSL-2822): Добавлен новый тип ошибки верификации вложений «Требуется прикрепление всех необходимых документов»

- [ADIRGSL-2823](https://jira.adacta-fintech.com/browse/ADIRGSL-2823): Изменена последовательность вызовов постобработки загрузчика Субагентов.

- [ADIRGSL-2865](https://jira.adacta-fintech.com/browse/ADIRGSL-2865): Добавлен статус "Отменен" для убытков.

- [ADIRGSL-2877](https://jira.adacta-fintech.com/browse/ADIRGSL-2877): Небольшие исправления для НФИ ДС.

- [ADIRGSL-2878](https://jira.adacta-fintech.com/browse/ADIRGSL-2878): Постпродажное сопровождение - Заявка:

    * Добавлена возможность создания заявки на расторжение, если ДС на расторжение был отменен.
    * Добавлена возможность поиска заявок в журнале заявок без указания критерий.
    * Произведен откат доработок по автоматическому переходу в статус «На рассмотрении СК» для роли БО.

- [ADIRGSL-2883](https://jira.adacta-fintech.com/browse/ADIRGSL-2883): РСД. Создать интеграционный тест

- [ADIRGSL-2899](https://jira.adacta-fintech.com/browse/ADIRGSL-2899): БФКО. Базис гарант5 до 80 лет

- [ADIRGSL-2900](https://jira.adacta-fintech.com/browse/ADIRGSL-2900): Доработка продуктовых настроек в части валютных продуктов. Обращаю внимание, что в схему данных договора/котировки добавлен атрибут currencyCode в блок triggersConditions.

- [ADIRGSL-2927](https://jira.adacta-fintech.com/browse/ADIRGSL-2927): БФКО. Подукты ДМС.

- [ADIRGSL-2928](https://jira.adacta-fintech.com/browse/ADIRGSL-2928): ДМС_БФКО розницы_Печатные формы

- [ADIRGSL-2942](https://jira.adacta-fintech.com/browse/ADIRGSL-2942): Разблокирован диагноз для убытков.

- [ADIRGSL-2946](https://jira.adacta-fintech.com/browse/ADIRGSL-2946): Технические доработки для обеспечения работы с верификаторами вложений сервисами.

- [ADIRGSL-2952](https://jira.adacta-fintech.com/browse/ADIRGSL-2952): Замена схем комиссий в маппинге по продукту Защита Кредита 3.0

- [ADIRGSL-2959](https://jira.adacta-fintech.com/browse/ADIRGSL-2959): Для данных по стратегии инвестирования будет заполняться поле investmentStrategyDescription если оно пустое

- [ADIRGSL-2960](https://jira.adacta-fintech.com/browse/ADIRGSL-2960): Для данных по контрагентам в соответствующих частях body договора будет заполняться PartyID

- [ADIRGSL-2961](https://jira.adacta-fintech.com/browse/ADIRGSL-2961): Акцепт. Базис гарант 1 год. Закрытие продукта.

- [ADIRGSL-2966](https://jira.adacta-fintech.com/browse/ADIRGSL-2966): БФКО ДМС:

    * Доработаны возрастные границы в части застрахованного лица.
    * Добавлена возможность для ОПЕРУ создавать договор, когда один взрослый человек может по доверенности оформить договор на другого совершеннолетнего.

- [ADIRGSL-2967](https://jira.adacta-fintech.com/browse/ADIRGSL-2967): БФКО. ДМС. Корректировка скрипта и кода программы.

- [ADIRGSL-2968](https://jira.adacta-fintech.com/browse/ADIRGSL-2968): РНВ типа Claim. Создать нитегрционный тест

- [ADIRGSL-2972](https://jira.adacta-fintech.com/browse/ADIRGSL-2972): Добавлена настройка планировщика задач для ежедневной загрузки ключевой ставки Центробанка РФ.

- [ADIRGSL-2975](https://jira.adacta-fintech.com/browse/ADIRGSL-2975): Скорректирован маппинг в отчете ИСЖ.

- [ADIRGSL-2977](https://jira.adacta-fintech.com/browse/ADIRGSL-2977): Endowment. Create integration test

- [ADIRGSL-2978](https://jira.adacta-fintech.com/browse/ADIRGSL-2978): БФКО.Закрытие продукта Стратегия на5.Забота.

- [ADIRGSL-2985](https://jira.adacta-fintech.com/browse/ADIRGSL-2985): Не подтягивается информация об АД в договор - исправлено


### Fixed (3 changes)

- [ADIRGSL-2800](https://jira.adacta-fintech.com/browse/ADIRGSL-2800): Проводки. РНВ по документу Дожитие

- [ADIRGSL-2949](https://jira.adacta-fintech.com/browse/ADIRGSL-2949): РСД. Журнал поиска

- [ADIRGSL-2950](https://jira.adacta-fintech.com/browse/ADIRGSL-2950): Договор не меняет статус на расторгнут

# 45.0.0-rc1 (2023-02-28)

### Breaking Changes (2 changes)

- [ADIRGSL-2829](https://jira.adacta-fintech.com/browse/ADIRGSL-2829): Реализован признак технического АД.

    **Deployment notes**
    Необходимо произвести реиндекс ES и выполнить скрипт 7.10_006.020.007_172.sql перед паблишем!

- [ADIRGSL-2874](https://jira.adacta-fintech.com/browse/ADIRGSL-2874): Исправление поиска по Страхователю/Застрахованному для Котировок.

    После установки необходимо пересоздать документы Elastic Search.


### New Features (31 changes)

- [ADIRGSL-1867](https://jira.adacta-fintech.com/browse/ADIRGSL-1867): Реализован массовый блокиратор пользователей. Блокировка доступа производится по имени пользователя. После обработки формируется отчет со статусом результата блокировки пользователя.

- [ADIRGSL-2470](https://jira.adacta-fintech.com/browse/ADIRGSL-2470): Добавление классификации в ответы об ошибках

- [ADIRGSL-2543](https://jira.adacta-fintech.com/browse/ADIRGSL-2543): РСД. Переход на договор по ссылке.

- [ADIRGSL-2656](https://jira.adacta-fintech.com/browse/ADIRGSL-2656): Исправлен сервис поиска договоров по страхователю.

- [ADIRGSL-2692](https://jira.adacta-fintech.com/browse/ADIRGSL-2692): Корректировки по учету даты закрытия в сервисе витрины для ЕФР.

- [ADIRGSL-2703](https://jira.adacta-fintech.com/browse/ADIRGSL-2703): Правка сервиса. Не запускался.

- [ADIRGSL-2723](https://jira.adacta-fintech.com/browse/ADIRGSL-2723): Изменение ИД по Базис Инвест.

- [ADIRGSL-2725](https://jira.adacta-fintech.com/browse/ADIRGSL-2725): Реализован механизм установки АгД и пересчет комиссии для старых договоров.

- [ADIRGSL-2729](https://jira.adacta-fintech.com/browse/ADIRGSL-2729): КСЖ. БФКО. Добавление программы

- [ADIRGSL-2770](https://jira.adacta-fintech.com/browse/ADIRGSL-2770): БФКО Прайвет. Драйвер гарантия

- [ADIRGSL-2789](https://jira.adacta-fintech.com/browse/ADIRGSL-2789): Доработка валидации банковских счетов для дожитий и убытков.

- [ADIRGSL-2842](https://jira.adacta-fintech.com/browse/ADIRGSL-2842): Добавлены новые шаблоны для распознавания номера договора из описания платежа

    <5 цифр>-<7 цифр>
    Пример: 88000-5362128

    <5 цифр>-<8 цифр>/<1 цифра>
    Пример: 96300-54509269/2

- [ADIRGSL-2858](https://jira.adacta-fintech.com/browse/ADIRGSL-2858): Для продукта БФКО Фин. резерв исправлен доступ к печати для варианта расчета премии от СС

- [ADIRGSL-2864](https://jira.adacta-fintech.com/browse/ADIRGSL-2864): Отключение валидации на обязательность пола выгодоприобретателя.

- [ADIRGSL-2876](https://jira.adacta-fintech.com/browse/ADIRGSL-2876): Подготовка описания работы с функционалом справочников ИСЖ.

- [ADIRGSL-2888](https://jira.adacta-fintech.com/browse/ADIRGSL-2888): Валидация на периодичность договора

- [ADIRGSL-2892](https://jira.adacta-fintech.com/browse/ADIRGSL-2892): АВР. Часть 1. Переименовать/скорректировать текущие атрибуты акта

- [ADIRGSL-2893](https://jira.adacta-fintech.com/browse/ADIRGSL-2893): Добавлено создание документа на верификацию вложений для договоров ДМС (кроме оферты по общим правилам)

- [ADIRGSL-2896](https://jira.adacta-fintech.com/browse/ADIRGSL-2896): Исправлен формат EXCEL файла.
    Журнал АВР добавить Примечание.

- [ADIRGSL-2902](https://jira.adacta-fintech.com/browse/ADIRGSL-2902): Маппинг продукта КСЖ_Гарант защиты_РЖ36

- [ADIRGSL-2905](https://jira.adacta-fintech.com/browse/ADIRGSL-2905): Базис Инвест_Инвест декларация_правки по результатам тестирования.

- [ADIRGSL-2906](https://jira.adacta-fintech.com/browse/ADIRGSL-2906): Постпродажное сопровождение - Заявка:

    * Банковские реквизиты контрагента теперь подтягиваются из карточки контрагента, а не договора.
    * Добавлена дополнительная проверка, подтверждающая, что договор найден в системе, если заявка была перезагружена до сохранения.

- [ADIRGSL-2908](https://jira.adacta-fintech.com/browse/ADIRGSL-2908): КСЖ авто_результат тестирования

- [ADIRGSL-2911](https://jira.adacta-fintech.com/browse/ADIRGSL-2911): Актуализация справочника рисков для Корпоративного бизнеса

- [ADIRGSL-2912](https://jira.adacta-fintech.com/browse/ADIRGSL-2912): Сообщение об окончании срока действия продукта

- [ADIRGSL-2914](https://jira.adacta-fintech.com/browse/ADIRGSL-2914): Обновление инвест. параметров_хедж.

- [ADIRGSL-2917](https://jira.adacta-fintech.com/browse/ADIRGSL-2917): КСЖ Моя защита 4.0 - корректировки по результатам тестирования.

- [ADIRGSL-2918](https://jira.adacta-fintech.com/browse/ADIRGSL-2918): ПСБ розница. Драйвер гарантия.Смена ставки 3года. Закрыте 5,7 лет

- [ADIRGSL-2933](https://jira.adacta-fintech.com/browse/ADIRGSL-2933): ПСБ. Вектор здоровья Премиум 2.0. удаление единовр.оплаты

- [ADIRGSL-2934](https://jira.adacta-fintech.com/browse/ADIRGSL-2934): ПСБ. Вектотр здоровья 2.0.

- [ADIRGSL-2937](https://jira.adacta-fintech.com/browse/ADIRGSL-2937): КСЖпотреб_корректировка маппинга


### Fixed (3 changes)

- [ADIRGSL-2324](https://jira.adacta-fintech.com/browse/ADIRGSL-2324): Исправлен запрос для выборки РНВ для ручной идентификации

- [ADIRGSL-2509](https://jira.adacta-fintech.com/browse/ADIRGSL-2509): Исправлено условие отбора роли пользователя для валидаии даты выпуска договора.

- [ADIRGSL-2849](https://jira.adacta-fintech.com/browse/ADIRGSL-2849): Разрешить не указывать поле payDate.

# 44.0.0-rc1 (2023-02-16)

### Breaking Changes (3 changes)

- [ADIRGSL-1565](https://jira.adacta-fintech.com/browse/ADIRGSL-1565): Корректировка ПФ КСЖ.

    После паблиша необходимо выполнить скрипт:
    database\sql\migration\ADIRGSL-1565-update-cdms-insurance-rules.sql

- [ADIRGSL-2703](https://jira.adacta-fintech.com/browse/ADIRGSL-2703): Таблица для расчета ДЗ.
    Заполнение РСД документа.

    После установки необходимо выполнить скрипт:
    ADIRGSL-2703-fill-deadline-date.sql

- [ADIRGSL-2801](https://jira.adacta-fintech.com/browse/ADIRGSL-2801): #### Постпродажное сопровождение - Заявка:

    * Скрыта из доступных ПФ в заявке на внесение изменений ПФ "Заявка"
    * Переименована ПФ "Заявка" в "Заявление о расторжении/получении ВС"
    * Настроено дефолтное заполнение атрибута Инициатор значением "Заявитель" с возможностью редактирования
    * Атрибут Инициатор обязателен для заполнения
    * В журнале заявок для Типа обращения = "Внесение изменений" в атрибуте "Причина расторжения" значение не будет заполнятся
    * Добавлен в журнал Заявок статус договора (в фильтры и в грид)
    * Добавлен в выгружаемый отчет и экспорт Заявок статус договора
    * Заблокированы поля для редактирования в статусе "Согласовано"
    * При нахождении договора для заявки сразу будет блокироваться поле для ввода номера договора

    > **После деплоя необходимо выполнить корректировочные скрипты:**
    > database\sql\migration\ADIRGSL-2801-update-ud-body-contract-state-code.sql
    > database\sql\migration\ADIRGSL-2801-update-ud-cbody-contract-state-code.sql
    > database\sql\migration\ADIRGSL-2801-update-ud-body-modification-amendment-reason.sql
    > database\sql\migration\ADIRGSL-2801-update-ud-cbody-modification-amendment-reason.sql


### New Features (31 changes)

- [ADIRGSL-2350](https://jira.adacta-fintech.com/browse/ADIRGSL-2350): Добавление новых полей в раздел "Базовые инвест. параметры" и весь связанный с ним функционал.

- [ADIRGSL-2417](https://jira.adacta-fintech.com/browse/ADIRGSL-2417): New anketa

- [ADIRGSL-2509](https://jira.adacta-fintech.com/browse/ADIRGSL-2509): Добавить доп. роль для выпуска договоров будущей датой для менеджера.

- [ADIRGSL-2541](https://jira.adacta-fintech.com/browse/ADIRGSL-2541): РСД. Журнал поиска

- [ADIRGSL-2630](https://jira.adacta-fintech.com/browse/ADIRGSL-2630): Проводки. Корректировка по SAP_GL_ACCOUNT

- [ADIRGSL-2710](https://jira.adacta-fintech.com/browse/ADIRGSL-2710): #### Сервис обратного маппинга АДШ-ЕФР

    * Добавлен новый атрибут в выходных данных efrProductDescription

    Адрес сервиса: `{{SERVER_URI}}/api/core/shared/integration-services/GetEFRProductsReverseOptional/1`

- [ADIRGSL-2777](https://jira.adacta-fintech.com/browse/ADIRGSL-2777): Добавлена возможность настраивать на один код продукта несколько префиксов, в зависимости от валюты.

- [ADIRGSL-2796](https://jira.adacta-fintech.com/browse/ADIRGSL-2796): Обновление кода анкет.

- [ADIRGSL-2808](https://jira.adacta-fintech.com/browse/ADIRGSL-2808): provider address correction

- [ADIRGSL-2811](https://jira.adacta-fintech.com/browse/ADIRGSL-2811): ОАС_Детский капитал. Классика 2.0_замена памятки

- [ADIRGSL-2828](https://jira.adacta-fintech.com/browse/ADIRGSL-2828): ПСБ РВ "Драйвер Гарантия"- обновление ставок с 13.02.23

- [ADIRGSL-2832](https://jira.adacta-fintech.com/browse/ADIRGSL-2832): БФКО_МИнБанк_ОАС_ПСБ масс и ОРС_Стратегия на пять. Гарнт правки в части риска СНС

- [ADIRGSL-2833](https://jira.adacta-fintech.com/browse/ADIRGSL-2833): Изменение настроек по обработке системных событий. Добавлен таймаут в размере 30 секунд между попытками обработки, что суммарно дает удвоенное время на обработку.

- [ADIRGSL-2835](https://jira.adacta-fintech.com/browse/ADIRGSL-2835): Добавлена проверка на дату начала действия.

- [ADIRGSL-2836](https://jira.adacta-fintech.com/browse/ADIRGSL-2836): Шаблон Восстанови здоровье

- [ADIRGSL-2838](https://jira.adacta-fintech.com/browse/ADIRGSL-2838): Доработка сервиса поиска вложений по договору.

- [ADIRGSL-2839](https://jira.adacta-fintech.com/browse/ADIRGSL-2839): ОАС_обновление ставок с 13.02.23 по продуктам "Базис"

- [ADIRGSL-2841](https://jira.adacta-fintech.com/browse/ADIRGSL-2841): Добавлена роль "ExcludeEBMG". При добавлении данной роли пользователю станут недоступны для оформления продукты ПСБ "Стратегия на пять. Гарант" (EBMG и EBMGP).

- [ADIRGSL-2843](https://jira.adacta-fintech.com/browse/ADIRGSL-2843): Добавлено автоматическое наследование роли SalesBFKOGroup из группы salesBFKOAuto и роли SalesBFKOAutoGroup из группы salesBFKO.

- [ADIRGSL-2844](https://jira.adacta-fintech.com/browse/ADIRGSL-2844): Добавлен новый компонент договора AllocationInformation для ФИ и НФИ ДС

- [ADIRGSL-2845](https://jira.adacta-fintech.com/browse/ADIRGSL-2845): КСЖ - доработка валидаций загрузчика бордеро.

- [ADIRGSL-2846](https://jira.adacta-fintech.com/browse/ADIRGSL-2846): Базис Актив_БФКО_ПСБ_обновление опциона

- [ADIRGSL-2849](https://jira.adacta-fintech.com/browse/ADIRGSL-2849): Ошибки при миграции АВР

- [ADIRGSL-2850](https://jira.adacta-fintech.com/browse/ADIRGSL-2850): Базис Актив_БФКО_ПСБ_обновление цены опциона в печатной форме

- [ADIRGSL-2854](https://jira.adacta-fintech.com/browse/ADIRGSL-2854): Базис Актив_БФКО_ПСБ_обновление цены опциона в ЭП

- [ADIRGSL-2855](https://jira.adacta-fintech.com/browse/ADIRGSL-2855): ПСБ розница. Стратегия на пять.Гарант

- [ADIRGSL-2856](https://jira.adacta-fintech.com/browse/ADIRGSL-2856): Скорректирован тариф для мигрированных продуктов в части поддержки динамических СС.

- [ADIRGSL-2861](https://jira.adacta-fintech.com/browse/ADIRGSL-2861): Базис Актив_БФКО_ПСБ_обновление опциона в ЭП(памятка ЦБ)

- [ADIRGSL-2862](https://jira.adacta-fintech.com/browse/ADIRGSL-2862): Корректировки цены опциона в печатной форме договора

- [ADIRGSL-2863](https://jira.adacta-fintech.com/browse/ADIRGSL-2863): Корректировка валидации просрочки паспорта.

- [ADIRGSL-662](https://jira.adacta-fintech.com/browse/ADIRGSL-662): Загрузка инвест. параметров. Корректировка UI, переводов.


### Fixed (2 changes)

- [ADIRGSL-2673](https://jira.adacta-fintech.com/browse/ADIRGSL-2673): Исправлены тесты

- [ADIRGSL-2800](https://jira.adacta-fintech.com/browse/ADIRGSL-2800): Проводки. РНВ по документу Дожитие

# 43.0.0-rc1 (2023-02-08)

### Breaking Changes (3 changes)

- [ADIRGSL-2693](https://jira.adacta-fintech.com/browse/ADIRGSL-2693): Реализована проверка участников дожития через сервис КПК.
    Был дополнен ответ сервиса поиска контрагентов.

    **Примечание**
    Необходимо выполнить реиндексацию ES.

- [ADIRGSL-2711](https://jira.adacta-fintech.com/browse/ADIRGSL-2711): #### Исправлены скрипты для новых продуктов:

    * "Драйвер Гарантия (2 года) с периодической выплатой дохода".
    * "Драйвер Гарантия (3 года) с периодической выплатой дохода".

    > **После деплоя необходимо выполнить корректировочные скрипты:**
    > database\sql\migration\ADIRGSL-2711-update-quote-body-guaranteed-income.sql
    > database\sql\migration\ADIRGSL-2711-update-policy-body-guaranteed-income.sql

- [ADIRGSL-2733](https://jira.adacta-fintech.com/browse/ADIRGSL-2733): Исправлена ошибка поиска договора по форме выпуска

    **Deployment notes**
    1) После деплоя необходимо выполнить корректировочные скрипты
        database\sql\migration\ADIRGSL-2733-ES-contact-update.sql
    2) Запустить реиндекс ES


### New Features (21 changes)

- [ADIRGSL-2494](https://jira.adacta-fintech.com/browse/ADIRGSL-2494): Отключено устаревшее предупреждение про отвязку платежей.

- [ADIRGSL-2533](https://jira.adacta-fintech.com/browse/ADIRGSL-2533): Результаты тестирования - ADIRGSL-2281.

- [ADIRGSL-2649](https://jira.adacta-fintech.com/browse/ADIRGSL-2649): Добавлено отключение кнопки "Отправить договор" для внутреннего аудитора.

- [ADIRGSL-2692](https://jira.adacta-fintech.com/browse/ADIRGSL-2692): Сервисы продукты-риск:

    * Добавлен атрибут даты окончания по каждому продукту в ответе сервиса обратного мэппинга
    * Добавлен фильтр по активным продуктам на текущую дату для сервиса витрины

- [ADIRGSL-2694](https://jira.adacta-fintech.com/browse/ADIRGSL-2694): Добавлен статус договора "Завершён"

- [ADIRGSL-2702](https://jira.adacta-fintech.com/browse/ADIRGSL-2702): БФКО_Финансовый резерв - добавить возможность расчета от СС.

- [ADIRGSL-2710](https://jira.adacta-fintech.com/browse/ADIRGSL-2710): #### Разработан сервис обратного маппинга АДШ-ЕФР

    Адрес сервиса: `{{SERVER_URI}}/api/core/shared/integration-services/GetEFRProductsReverseOptional/1`

- [ADIRGSL-2732](https://jira.adacta-fintech.com/browse/ADIRGSL-2732): Корректировка по изменению даты заключения при копировании котировки.

- [ADIRGSL-2751](https://jira.adacta-fintech.com/browse/ADIRGSL-2751): Валидации на создание котировки и договора при вызове сервиса

- [ADIRGSL-2769](https://jira.adacta-fintech.com/browse/ADIRGSL-2769): Рефакторинг сервиса КПК "CheckContractors".

- [ADIRGSL-2776](https://jira.adacta-fintech.com/browse/ADIRGSL-2776): Доработана валидация банковских счетов выгодоприобретателей для дожитий/дид.

- [ADIRGSL-2782](https://jira.adacta-fintech.com/browse/ADIRGSL-2782): Маппинг "Драйвер Гарантия" на 2 и 3 года с ежегодной выплатой, ПСБ РВ

- [ADIRGSL-2783](https://jira.adacta-fintech.com/browse/ADIRGSL-2783): Стратегия на пять. Инвест. Ошибка при создании договора

- [ADIRGSL-2784](https://jira.adacta-fintech.com/browse/ADIRGSL-2784): ОАС_Обновление правил_результат тестирования

- [ADIRGSL-2791](https://jira.adacta-fintech.com/browse/ADIRGSL-2791): БФКО.Базис гарант 5 лет.

- [ADIRGSL-2792](https://jira.adacta-fintech.com/browse/ADIRGSL-2792): Добавлена строка НДФЛ для основного РНВ дожитий/дид

- [ADIRGSL-2797](https://jira.adacta-fintech.com/browse/ADIRGSL-2797): Постпродажное сопровождение - заявка на расторжение:

    * Изменен текст предупреждения для продуктов КСЖ.

- [ADIRGSL-2802](https://jira.adacta-fintech.com/browse/ADIRGSL-2802): Постпродажное сопровождение - заявка на расторжение:

    * Исправлена информация о добавленных вложениях.
    * При переходе в статус "Согласовано" автоматически создаётся ДС на расторжение.

- [ADIRGSL-2813](https://jira.adacta-fintech.com/browse/ADIRGSL-2813): Дата открытия продукта ПСБ РВ_Драйвер гарантия_ежегодная выплата изменена на 08.02.2023
    Внесены правки в печатных формах договора и декларациях

- [ADIRGSL-2825](https://jira.adacta-fintech.com/browse/ADIRGSL-2825): Доработана валидация налогового вычета при расторжении договора.

- [ADIRGSL-2827](https://jira.adacta-fintech.com/browse/ADIRGSL-2827): ОАС_Стань Миллионером 2.0_изменение даты закрытия


### Fixed (1 changes)

- [ADIRGSL-2794](https://jira.adacta-fintech.com/browse/ADIRGSL-2794): АВР_ошибка 03.02.2023

# 42.0.0-rc1 (2023-02-01)

### Breaking Changes (3 changes)

- [ADIRGSL-2668](https://jira.adacta-fintech.com/browse/ADIRGSL-2668): Добвалена возможность отмены договора из статуса Действует при условии, что договор не идентифицирован

    **После деплоя необходимо выполнить корректировочные скрипты:**
    database\sql\migration\ADIRGSL-2668-add_body_allocationInformation.sql

- [ADIRGSL-2711](https://jira.adacta-fintech.com/browse/ADIRGSL-2711): Настроены новые продукты:

    * "Драйвер Гарантия (2 года) с периодической выплатой дохода".
    * "Драйвер Гарантия (3 года) с периодической выплатой дохода".

    > **После деплоя необходимо выполнить корректировочные скрипты:**
    > database\sql\migration\ADIRGSL-2711-update-quote-body-guaranteed-income.sql
    > database\sql\migration\ADIRGSL-2711-update-policy-body-guaranteed-income.sql

- [ADIRGSL-2724](https://jira.adacta-fintech.com/browse/ADIRGSL-2724): Improvements for endowments and related po printouts.

    **Deployment notes**
    ES must be reindexed!!!


### New Features (31 changes)

- [ADIRGSL-2026](https://jira.adacta-fintech.com/browse/ADIRGSL-2026): Настроены варианты ограничения СС по риску Смерть НС ВВ (для UW).

- [ADIRGSL-2250](https://jira.adacta-fintech.com/browse/ADIRGSL-2250): Добавлен раздел "FAQ. Часто задаваемые вопросы"

- [ADIRGSL-2398](https://jira.adacta-fintech.com/browse/ADIRGSL-2398): Скорректирована ссылка на переход в журнал договоров из дашборда.

- [ADIRGSL-2479](https://jira.adacta-fintech.com/browse/ADIRGSL-2479): Скорректированы ставки купонов для Драйвер Гарантия с периодической выплатой дохода

- [ADIRGSL-2484](https://jira.adacta-fintech.com/browse/ADIRGSL-2484): Доработка карточки контрагента по результату тестирования ДС на НФИ - корректировки по результатам тестирования (обновление даты при загрузке формы).

- [ADIRGSL-2504](https://jira.adacta-fintech.com/browse/ADIRGSL-2504): Корректировка конфигурации продукта ОАС Стань миллионером 2.0.

- [ADIRGSL-2512](https://jira.adacta-fintech.com/browse/ADIRGSL-2512): Корректировка расчета графика платежей КСЖ.

- [ADIRGSL-2540](https://jira.adacta-fintech.com/browse/ADIRGSL-2540): Технические корректировки загрузчика САД.

- [ADIRGSL-2554](https://jira.adacta-fintech.com/browse/ADIRGSL-2554): Событийная модель в системе и передача информации о событиях партнёрам.

- [ADIRGSL-2644](https://jira.adacta-fintech.com/browse/ADIRGSL-2644): Для контрагента-ИП добавлена валидация наличия данных в блоке "Сведения об индивидуальном предпринимателе"

- [ADIRGSL-2649](https://jira.adacta-fintech.com/browse/ADIRGSL-2649): Создание роли. Внутренний Аудит.

    Добавлены роли:
    OrganisationViewer - просмотр данных по орг. структуре
    PaymentsViewer - просмотр данных по платежам
    PaymentOrderViewer - просмотр данных по РНВ
    ViewerCommissionAct - просмотр данных по АВР
    ViewerAA - просмотр данных по АД

    Добавлена группа audit с автоматическим наследованием ролей:
    General
    GeneralBackOffice
    PartyViewer
    OrganisationViewer
    PaymentsViewer
    PaymentOrderViewer
    ViewerCommissionAct
    ViewerAA

- [ADIRGSL-2653](https://jira.adacta-fintech.com/browse/ADIRGSL-2653): Компонент "Периоды налогового резидентства" перенесён на вкладку "Дополнительная информация"

- [ADIRGSL-2654](https://jira.adacta-fintech.com/browse/ADIRGSL-2654): Implemented tax deduction table for policy cancellation amendments.

- [ADIRGSL-2686](https://jira.adacta-fintech.com/browse/ADIRGSL-2686): БФКО. Базис гарант5 до 80 лет.

- [ADIRGSL-2690](https://jira.adacta-fintech.com/browse/ADIRGSL-2690): Дожития и ДИД:

    * Настроена модель АСС

- [ADIRGSL-2719](https://jira.adacta-fintech.com/browse/ADIRGSL-2719): Обновление правил страхования

- [ADIRGSL-2728](https://jira.adacta-fintech.com/browse/ADIRGSL-2728): Исправление ПФ Памятки НВ

- [ADIRGSL-2732](https://jira.adacta-fintech.com/browse/ADIRGSL-2732): Добавлен пересчет дат при копировании котировки.

- [ADIRGSL-2735](https://jira.adacta-fintech.com/browse/ADIRGSL-2735): Устранение использования старых классов, поддержка которых будет прекращена в новой версии AdInsure.

- [ADIRGSL-2736](https://jira.adacta-fintech.com/browse/ADIRGSL-2736): Корректировка поведения UI по указанию инициатора.

- [ADIRGSL-2738](https://jira.adacta-fintech.com/browse/ADIRGSL-2738): Не создаётся документ на верификацию вложений для мигрированных договоров

- [ADIRGSL-2741](https://jira.adacta-fintech.com/browse/ADIRGSL-2741): История изменения анкеты фин. грамотности:

    * Добавлена история для анкеты с 2023 года.

- [ADIRGSL-2743](https://jira.adacta-fintech.com/browse/ADIRGSL-2743): Корректировка отображения выпадающего списка стратегий.

- [ADIRGSL-2744](https://jira.adacta-fintech.com/browse/ADIRGSL-2744): Замчания по результатам тестирования ПСБ масс Стратегия на пять. Гарант.

- [ADIRGSL-2745](https://jira.adacta-fintech.com/browse/ADIRGSL-2745): Доп. обработчики форматов дат из бордеро.

- [ADIRGSL-2752](https://jira.adacta-fintech.com/browse/ADIRGSL-2752): Корректировка отображения суммы в QR-коде для продукта ОАС Достойный век.

- [ADIRGSL-2753](https://jira.adacta-fintech.com/browse/ADIRGSL-2753): Восстанови здоровье, корректировка пунктов Декларации

- [ADIRGSL-2759](https://jira.adacta-fintech.com/browse/ADIRGSL-2759): Правки в памятке и в шаблоне договора

- [ADIRGSL-2762](https://jira.adacta-fintech.com/browse/ADIRGSL-2762): Детский капитал. Классика. Корректировка декларации (партнер ОАС)

- [ADIRGSL-2765](https://jira.adacta-fintech.com/browse/ADIRGSL-2765): Стратегия на пять. Гарант. Корректировки динамики текста по рискам в шаблоне договора.

- [ADIRGSL-2769](https://jira.adacta-fintech.com/browse/ADIRGSL-2769): Рефакторинг сервиса проверки черных списков.


### Fixed (4 changes)

- [ADIRGSL-2300](https://jira.adacta-fintech.com/browse/ADIRGSL-2300): если is_migrated установлен true, не должен создаваться проводок по платежу

- [ADIRGSL-2324](https://jira.adacta-fintech.com/browse/ADIRGSL-2324): Выполнены доработки и исправления по форме ручной идентификации РНВ: произведена настройка фильтров и сортировок

- [ADIRGSL-2605](https://jira.adacta-fintech.com/browse/ADIRGSL-2605): Откат всей транзакции при ошибке создания РНВ по платежу

- [ADIRGSL-2665](https://jira.adacta-fintech.com/browse/ADIRGSL-2665): Валютные договоры. Платежи. Ошибка работы сервиса: Zero allocation amount

# 41.0.0-rc1 (2023-01-24)

### Breaking Changes (3 changes)

- [ADIRGSL-2223](https://jira.adacta-fintech.com/browse/ADIRGSL-2223): Implemented PO management for endowments.
    Added printouts for insurance act

    **Deployment Notes**
    ES must be reindexed

- [ADIRGSL-2484](https://jira.adacta-fintech.com/browse/ADIRGSL-2484): Доработка карточки контрагента по результату тестирования ДС на НФИ.

    После паблиша необходимо выполнить скрипт:
    database\sql\migration\ADIRGSL-2484-update-party-body.sql

- [ADIRGSL-2590](https://jira.adacta-fintech.com/browse/ADIRGSL-2590): Постпродажное сопровождение - Заявка:

    * Изменена видимость и обязательность дополнительного атрибута "Тип изменений"
    * Сделан обязательным для заполнения атрибут "Способ подачи заявления"
    * Атрибут "Дата поступления заявления в СК" заполняется автоматичеки датой перевода в статус "НА РАССМОТРЕНИИ СК" с возможностью корректировки
    * При оформлении заявки сотрудником ОПЕРУ заявка автоматически переходит в статус "НА РАССМОТРЕНИИ СК" после сохранения заявки, которой был присвоен номер
    * В статусе "оформить ДС" и последующих недоступен для редактирования атрибут "Инициатор"
    * Исправлен выпуск ДС к договору ДМС из заявки
    * Добавлены ссылки на созданные ДС из заявки

    > **После деплоя необходимо выполнить корректировочный скрипт:**
    > database\sql\migration\ADIRGSL-2590-update-request-number-in-contracts.sql


### New Features (29 changes)

- [ADIRGSL-2323](https://jira.adacta-fintech.com/browse/ADIRGSL-2323): Не блокирующая ошибка в UI при изменении назначения платежа.

- [ADIRGSL-2373](https://jira.adacta-fintech.com/browse/ADIRGSL-2373): Fix after testing

- [ADIRGSL-2380](https://jira.adacta-fintech.com/browse/ADIRGSL-2380): Внутренние уведомления_андеррайтинг.

- [ADIRGSL-2398](https://jira.adacta-fintech.com/browse/ADIRGSL-2398): Обработка ошибки при фильтрации по партнеру в журнале договоров

- [ADIRGSL-2417](https://jira.adacta-fintech.com/browse/ADIRGSL-2417): Обновление анкеты фин. грамотности:

    * Изменена дата начала действия новой анкеты фин грамотности на 24.01.2023.

- [ADIRGSL-2373](https://jira.adacta-fintech.com/browse/ADIRGSL-2373): Создан кастомный скрипт для целей удаления мигрированного договора из базы данных с тестовой среды для исправления ошибок миграции.

- [ADIRGSL-2512](https://jira.adacta-fintech.com/browse/ADIRGSL-2512): РСД. Новый документ

- [ADIRGSL-2616](https://jira.adacta-fintech.com/browse/ADIRGSL-2616): Добавлена возможность загрузки через миграциию договором с графиком платежей, содержащим "кредитные каникулы", т.е. строки с нулевым платежом за период. Для загрузки договора с нулевым платежом за период надо чтобы продукт, по которому загружается договор, был определён как миграционный (isMigrated = true). После загрузки надо исправить суммы по рискам

- [ADIRGSL-2623](https://jira.adacta-fintech.com/browse/ADIRGSL-2623): Создание продуктов для миграции  (2 этап).

    В рамках задачи также добавлена новая группа продуктов - РСЖ. Сделана на базе НСЖ. С точки зрения интеграций/сервисов все будет аналогично НСЖ, но только надо Accumulated менять на Risk. Например, для создания договора использовать RiskLifeInsurancePolicy вместо AccumulatedLifeInsurancePolicy и т.п.

- [ADIRGSL-2639](https://jira.adacta-fintech.com/browse/ADIRGSL-2639): Маппинг EBMGBFKO

- [ADIRGSL-2641](https://jira.adacta-fintech.com/browse/ADIRGSL-2641): ОАС_Детский капитал_изменение логики расчета.

- [ADIRGSL-2646](https://jira.adacta-fintech.com/browse/ADIRGSL-2646): Заявка постпродажного сопровождения:

    * Атрибуты «Дата поступления в СК», «Способ подачи заявления» и «Инициатор» скрыты для продавца (менеджера).
    * Если в причине расторжения всего одна причина, то она заполняется сразу.
    * Исправлена опечатка в заявлении СВЕДЕНИЯ.
    * В тип документа добавлена зависимость от причины обращения, если изменение, то не выводится заявление на расторжение, если расторжение, то не выводится заявление на изменение.
    * Если процесс идет от заявки и далее передается в СК, то автоматически заполняется дата получения СК равная дате перевода статуса «передать в СК».
    * Добавлена возможность создавать «Заявку» через «Действия» с карточки договора, в этом случае в Заявке заполняются все атрибуты договора.

- [ADIRGSL-2648](https://jira.adacta-fintech.com/browse/ADIRGSL-2648): Обновление памятки по налоговому вычету с 27.01.2023

- [ADIRGSL-2653](https://jira.adacta-fintech.com/browse/ADIRGSL-2653): 1) Добавлена форма ввода "Периоды налогового резидентства" на карточку физического лица
    2) Добавлена форма ввода "Список лиц, исключаемых из списка 3-х лиц по отношению к данному контрагенту" на вкладке "Дополнительная информация" карточки физического лица

- [ADIRGSL-2661](https://jira.adacta-fintech.com/browse/ADIRGSL-2661): ПСБ масс и ОРС. Стратения на пять.Гарант

- [ADIRGSL-2674](https://jira.adacta-fintech.com/browse/ADIRGSL-2674): Корректировка раздела "полезная информация"

- [ADIRGSL-2678](https://jira.adacta-fintech.com/browse/ADIRGSL-2678): Скорректирована валидация комиссии

- [ADIRGSL-2682](https://jira.adacta-fintech.com/browse/ADIRGSL-2682): Исправления по результатам тестирования Драйвер гарантия для андеррайтеров

- [ADIRGSL-2685](https://jira.adacta-fintech.com/browse/ADIRGSL-2685): ОАС. Стань миллионером 2.0. Корректировки

- [ADIRGSL-2687](https://jira.adacta-fintech.com/browse/ADIRGSL-2687): ОАС. Закрытие продукта Стань миллионером

- [ADIRGSL-2688](https://jira.adacta-fintech.com/browse/ADIRGSL-2688): Updated beneficiaries bank accounts validation for claims and endowments.

- [ADIRGSL-2697](https://jira.adacta-fintech.com/browse/ADIRGSL-2697): Маппинг продукта Моя Защита 4.0. Партнер БФКО Розница

- [ADIRGSL-2698](https://jira.adacta-fintech.com/browse/ADIRGSL-2698): Маппинг продукта Стратегия на Пять. Гарант. Партнер ПСБ масс и ОРС.

- [ADIRGSL-2699](https://jira.adacta-fintech.com/browse/ADIRGSL-2699): Расширение ответа сервиса AttachmentsByContractNumberDataSource.
    Добавлены поля:
    fileName - наименование файла
    mediaType - медиа тип
    totalSize - размер файла в байтах

- [ADIRGSL-2700](https://jira.adacta-fintech.com/browse/ADIRGSL-2700): Восстанови здоровье, корректировка шаблона договора

- [ADIRGSL-2704](https://jira.adacta-fintech.com/browse/ADIRGSL-2704): Доп атрибут email в карточку менеджера в структуре для бфко - Реализация.

    Важно! Для поддержки текущей структуры пользователей после релиза с данной задачей необходимо проапдейтить БД и добавить информацию об актуальном e-mail, а именно:
    1. Ноебходимо проапдейтить body сотрудников (org.service_provider), добавить actualEmail
    2. Аналогично необходимо проапдейтить таблицу ORG_IMPL.SERVICE_PROVIDER_INFO_SAT, столбец ACTUAL_EMAIL

- [ADIRGSL-2708](https://jira.adacta-fintech.com/browse/ADIRGSL-2708): Добавление атрибута ЕФР для отключения валидации по анкете.

- [ADIRGSL-2717](https://jira.adacta-fintech.com/browse/ADIRGSL-2717): Правки в шаблоне договора - Стратегия на пять. Гарант. ПСБ масс и ОРС

- [ADIRGSL-944](https://jira.adacta-fintech.com/browse/ADIRGSL-944): Дополнительные соглашения - добавление истории доп.соглашений по договорам страхования.


### Fixed (3 changes)

- [ADIRGSL-2622](https://jira.adacta-fintech.com/browse/ADIRGSL-2622): РНВ. Страховые выплаты. Обновление связанных сущностей

- [ADIRGSL-2673](https://jira.adacta-fintech.com/browse/ADIRGSL-2673): fix integration tests

- [ADIRGSL-2707](https://jira.adacta-fintech.com/browse/ADIRGSL-2707): АВР_статус Генерация

# 40.0.0-rc1 (2023-01-12)

### Breaking Changes (6 changes)

- [ADIRGSL-2473](https://jira.adacta-fintech.com/browse/ADIRGSL-2473): Обновлены клиентские view: добавлено поле со ставкой КВ

    **Deployment Notes**

    Требуется выполнить скрипты:
    1) implementation\database\sql\migration\get_transformed_transactions.sql

- [ADIRGSL-2553](https://jira.adacta-fintech.com/browse/ADIRGSL-2553): Improvements for endowment.

    **Deployment notes**
    ES must be reindexed!

- [ADIRGSL-2584](https://jira.adacta-fintech.com/browse/ADIRGSL-2584): После деплоя выполнить скрипт:
    database\sql\migration\sapFilesIntergationHelper.sql

- [ADIRGSL-2614](https://jira.adacta-fintech.com/browse/ADIRGSL-2614): Implemented default values for claim beneficiaries.

    **Deployment notes**
    ES must be reindexed!

- [ADIRGSL-2642](https://jira.adacta-fintech.com/browse/ADIRGSL-2642): Журнал заявок:

    * Настроен поиск по первым символам номера договора и ввода нескольких номеров договоров (по аналогии с журналом договоров).
    * Система при вводе номера договора распознаёт не только Заглавные буквы, но и маленькие.

    **Deployment Notes**

    * После паблиша необходимо выполнить переиндексацию Elasticsearch

- [ADIRGSL-2650](https://jira.adacta-fintech.com/browse/ADIRGSL-2650): Скрипт ES-Reindex:

    * Исправлено удаление индекса заявки постпродажного сопровождения LifeInsuranceRequest

    **Deployment Notes**

    * Удалить вручную индекс Elasticsearch (adinsure_index_life_insurance_request)
    * После паблиша необходимо выполнить переиндексацию Elasticsearch (будет создан новый индекс adinsure_index_lifeinsurancerequest, который будет корректно удаляться при выполнении скрипта)


### New Features (29 changes)

- [ADIRGSL-1565](https://jira.adacta-fintech.com/browse/ADIRGSL-1565): Печатные формы для дубликатов КСЖ

- [ADIRGSL-1929](https://jira.adacta-fintech.com/browse/ADIRGSL-1929): Корректировка раздела "полезная информация".

- [ADIRGSL-1976](https://jira.adacta-fintech.com/browse/ADIRGSL-1976): Обновление атрибутов доп. сервисов договора.

- [ADIRGSL-1989](https://jira.adacta-fintech.com/browse/ADIRGSL-1989): Дополнительные сервисы с 01.09.2022.

- [ADIRGSL-2196](https://jira.adacta-fintech.com/browse/ADIRGSL-2196): Обновление Дополнительных сервисов.

- [ADIRGSL-2240](https://jira.adacta-fintech.com/browse/ADIRGSL-2240): Внедрение сервиса в Акцепте и Зенит масс.

- [ADIRGSL-2324](https://jira.adacta-fintech.com/browse/ADIRGSL-2324): Добавлена ручная идентификация РНВ

- [ADIRGSL-2373](https://jira.adacta-fintech.com/browse/ADIRGSL-2373): Изменена проверка при загрузке бордеро по КСЖ.

- [ADIRGSL-2413](https://jira.adacta-fintech.com/browse/ADIRGSL-2413): Андеррайтинг_доработка продуктов типа Bond Repack - разработка

- [ADIRGSL-2417](https://jira.adacta-fintech.com/browse/ADIRGSL-2417): Обновление анкеты фин. грамотности:

    * Добавлена новая анкета в карточку контрагента с пунктами действующими с 2023 года.
    * Доработаны валидации на договоре в зависимости от даты заключения и страховых продуктов.

    > **Интеграция:**
    >
    > * Внесены изменения в dataSchema NaturalPerson.
    > * Изменены валидации validatePolicyHolder.js компонента PolicyHolder

- [ADIRGSL-2433](https://jira.adacta-fintech.com/browse/ADIRGSL-2433): Removed 'no result' message from comm calc service processing on UI.
    Updated efault message

- [ADIRGSL-2504](https://jira.adacta-fintech.com/browse/ADIRGSL-2504): ОАС. Стань миллионером 2.0

- [ADIRGSL-2508](https://jira.adacta-fintech.com/browse/ADIRGSL-2508): КСЖ_ замена риска "Травма" на "Безработицу"_20.01.2022.

- [ADIRGSL-2531](https://jira.adacta-fintech.com/browse/ADIRGSL-2531): Added new payment type for claim\endowment beneficiaries.

- [ADIRGSL-2548](https://jira.adacta-fintech.com/browse/ADIRGSL-2548): Updated agency info code table.

- [ADIRGSL-2567](https://jira.adacta-fintech.com/browse/ADIRGSL-2567): Ген. чекап:

    * Настроено автоматическое заполнение инициатора текущим пользователем, при создании договора из продукта НСЖ.

- [ADIRGSL-2593](https://jira.adacta-fintech.com/browse/ADIRGSL-2593): Non fin change amendment improvements.

- [ADIRGSL-2607](https://jira.adacta-fintech.com/browse/ADIRGSL-2607): АВР_договоры не попадают в АВР

- [ADIRGSL-2611](https://jira.adacta-fintech.com/browse/ADIRGSL-2611): Исправлена ошибка логирования реестра.
    Исправлена ошибка SQL IN 2100 limit.
    Добавлено право актору System на сохранение и перевод статуса.
    Исправлены тесты.
    Добавлена валидация цикла для исключения вечного цикла.
    Исправлена ошибка вечного цикла (Обходное решение для корной ошибки LJADIRDSUP-5814)

- [ADIRGSL-2612](https://jira.adacta-fintech.com/browse/ADIRGSL-2612): ОАС_ Бизис Инвест, изменение КВ с 01.01.23.

- [ADIRGSL-2619](https://jira.adacta-fintech.com/browse/ADIRGSL-2619): Опечатка в UI на импорте платежей.

- [ADIRGSL-2620](https://jira.adacta-fintech.com/browse/ADIRGSL-2620): Updated comm items validation for policies.

- [ADIRGSL-2624](https://jira.adacta-fintech.com/browse/ADIRGSL-2624): C 10.01.2023 закрыт продукт Базис Гарант (3 года) для БФКО

- [ADIRGSL-2633](https://jira.adacta-fintech.com/browse/ADIRGSL-2633): Подтягивание ФИО застрахованного в блок подписей в ПФ.

- [ADIRGSL-2651](https://jira.adacta-fintech.com/browse/ADIRGSL-2651): Improvements and fixes for endowment document.

- [ADIRGSL-2656](https://jira.adacta-fintech.com/browse/ADIRGSL-2656): Добавлена возможность исключение продуктов в сервисе поиска договоров.

    Для исключения продуктов необходимо добавить коды продуктов в таблицу `PAS_IMPL.CONTRACT_SEARCH_EXCLUDE_PRODUCT`.

- [ADIRGSL-2659](https://jira.adacta-fintech.com/browse/ADIRGSL-2659): Расширение атрибутов сервиса миграции АВР - разработка

- [ADIRGSL-2664](https://jira.adacta-fintech.com/browse/ADIRGSL-2664): Updated initiator search logic for contract modification view.

- [ADIRGSL-2670](https://jira.adacta-fintech.com/browse/ADIRGSL-2670): Обновление инвест. параметров с 16.01.23


### Improvements (1 changes)

- [ADIRGSL-2581](https://jira.adacta-fintech.com/browse/ADIRGSL-2581): Печатные формы ДМС:

    * Изменены правила отображения ПФ вместо продукта используется значение из столбца policyPrintout в productConfiguration.


### Fixed (2 changes)

- [ADIRGSL-2605](https://jira.adacta-fintech.com/browse/ADIRGSL-2605): Платежи. Отвязка платежей с расторгнутых договоров на PROD РГСЖ

- [ADIRGSL-2635](https://jira.adacta-fintech.com/browse/ADIRGSL-2635): Исправлена работа формы поиска строк АВР в случае использования большого количества значений фильтра номеров договоров

# 39.0.0-rc1 (2022-12-27)

### Breaking Changes (6 changes)

- [ADIRGSL-2215](https://jira.adacta-fintech.com/browse/ADIRGSL-2215): Журнал заявок:

    * Настроен поиск по первым символам номера и ввода нескольких номеров (по аналогии с журналом договоров).
    * Система при вводе номера распознаёт не только Заглавные буквы, но и маленькие.

    **Deployment Notes**

    * После паблиша необходимо выполнить переиндексацию Elasticsearch

- [ADIRGSL-2351](https://jira.adacta-fintech.com/browse/ADIRGSL-2351): Разработан кастомный сервис поиска договоров по страхователю

    * После паблиша необходимо выполнить переиндексацию Elasticsearch

- [ADIRGSL-2475](https://jira.adacta-fintech.com/browse/ADIRGSL-2475): После деплоя выполнить скрипт:
    database\sql\migration\sapFilesIntergationHelper.sql

- [ADIRGSL-2540](https://jira.adacta-fintech.com/browse/ADIRGSL-2540): Доработки по загрузчику САД.

    Перед паблишем необходимо выполнить переиндексацию ES.

    После паблиша необходимо выполнить скрипт:
    database\sql\migration\ADIRGSL-2540-employee-common-body-update.sql

    После выполнения скрипта необходимо снова выполнить переиндексацию ES.

- [ADIRGSL-2550](https://jira.adacta-fintech.com/browse/ADIRGSL-2550): Удаление ветки"АО "МИнБанк " НА УДАЛЕНИЕ" из орг. структуры.

    **Deployment Notes**

    Требуется выполнить скрипт: implementation\database\sql\migration\ADIRGSL-2550-remove-branch-tree

- [ADIRGSL-2551](https://jira.adacta-fintech.com/browse/ADIRGSL-2551): После деплоя выполнить скрипт:
    database\sql\migration\sapFilesIntergationHelper.sql


### New Features (22 changes)

- [ADIRGSL-1686](https://jira.adacta-fintech.com/browse/ADIRGSL-1686): Добавлен утилитарный скрипт для удаления ES индексов.

- [ADIRGSL-1940](https://jira.adacta-fintech.com/browse/ADIRGSL-1940): Added ability for operations to change policy issue form in draft state.

- [ADIRGSL-2407](https://jira.adacta-fintech.com/browse/ADIRGSL-2407): Папка extensions/server/wwwroot/documents удалена из extensions, тк РГСЖ планирует управлять этой папкой вручную, поэтому при деплое обновлять их не нужно.

- [ADIRGSL-2414](https://jira.adacta-fintech.com/browse/ADIRGSL-2414): Печатная форма полис-сертификат:

    * Добавлена подпись застрахованного.

- [ADIRGSL-2434](https://jira.adacta-fintech.com/browse/ADIRGSL-2434): Implemented commission recalculation service, commission validation and commission claculation for platform contract service (CreateDocument method).
    Updated enrichment namings.
    Updated enrichent namings for functions.

- [ADIRGSL-2489](https://jira.adacta-fintech.com/browse/ADIRGSL-2489): Реестр по периоду охлаждения:

    * Добавлены столбцы O (Сумма возврата, руб*) и Y (Дата заявления на расторжение договора*).

- [ADIRGSL-2490](https://jira.adacta-fintech.com/browse/ADIRGSL-2490): КСЖ - Бордеро валидации:

    * Перенесен срок страхования из-за валидации схемы insuranceProduct.

- [ADIRGSL-2491](https://jira.adacta-fintech.com/browse/ADIRGSL-2491): Изменение логики и валидаций компонента Мед. Декларация для продукта Достойный Век 2.0 ОАС

- [ADIRGSL-2500](https://jira.adacta-fintech.com/browse/ADIRGSL-2500): Updated branch selection for contract modification service.

- [ADIRGSL-2505](https://jira.adacta-fintech.com/browse/ADIRGSL-2505): Added personal data change type selection and mapping for nf change amendment

- [ADIRGSL-2511](https://jira.adacta-fintech.com/browse/ADIRGSL-2511): Настроено автоматическое сохранение ПФ Договора во вложения с типом "Подписанный договор страхования" при переводе статуса договора из "Проект" в "Подписан" для продуктов ДМС с формой выпуска Оферта (Восстанови Здоровье (все)).

- [ADIRGSL-2549](https://jira.adacta-fintech.com/browse/ADIRGSL-2549): Печатные формы:

    * Изменена дата смены подписанта с Пушкарева на Белову с 21.12.2022.

- [ADIRGSL-2556](https://jira.adacta-fintech.com/browse/ADIRGSL-2556): Договоры:

    * Добавлены недостающие атрибуты в data schema версий договора.

- [ADIRGSL-2561](https://jira.adacta-fintech.com/browse/ADIRGSL-2561): Корректировка конфигурации видимости продуктов МИНБАНК.

- [ADIRGSL-2562](https://jira.adacta-fintech.com/browse/ADIRGSL-2562): Исправлен ApiDataProvider на ClassDataProvider для корректной работы функционала на Docker сервере.

- [ADIRGSL-2566](https://jira.adacta-fintech.com/browse/ADIRGSL-2566): Отключение валидаций по мигрированным ДС.

- [ADIRGSL-2569](https://jira.adacta-fintech.com/browse/ADIRGSL-2569): Договор ДМС:

    * Исправлен компонент секции выгодоприобретателей.

- [ADIRGSL-2591](https://jira.adacta-fintech.com/browse/ADIRGSL-2591): Fixed incorrect input schema for create payment order sink group.

- [ADIRGSL-2594](https://jira.adacta-fintech.com/browse/ADIRGSL-2594): Updated RC env variables for payments.

- [ADIRGSL-2606](https://jira.adacta-fintech.com/browse/ADIRGSL-2606): Настройка отображения для МИНБАНК

- [ADIRGSL-2609](https://jira.adacta-fintech.com/browse/ADIRGSL-2609): МИНБАНК - добавление в InitialData.

- [ADIRGSL-2610](https://jira.adacta-fintech.com/browse/ADIRGSL-2610): Создание продуктов для миграции.


### Fixed (7 changes)

- [ADIRGSL-2430](https://jira.adacta-fintech.com/browse/ADIRGSL-2430): Проводки. РНВ. Зачет на другой договор

- [ADIRGSL-2493](https://jira.adacta-fintech.com/browse/ADIRGSL-2493): Расторжение в периоде охлаждения. Создание рнв

- [ADIRGSL-2503](https://jira.adacta-fintech.com/browse/ADIRGSL-2503): Исправлено отображение графика платежей для расторгнутых договоров

- [ADIRGSL-2547](https://jira.adacta-fintech.com/browse/ADIRGSL-2547): Исправления в UserDataProvider

- [ADIRGSL-2557](https://jira.adacta-fintech.com/browse/ADIRGSL-2557): АВР_ в ставках КВ – пропали сотые

- [ADIRGSL-2558](https://jira.adacta-fintech.com/browse/ADIRGSL-2558): Исправлена ошибка фильтра "Возраст страхователя"

- [ADIRGSL-2574](https://jira.adacta-fintech.com/browse/ADIRGSL-2574): АВР_оптимизация. Добавлена пагинация строк.

# 38.0.0-rc1 (2022-12-15)

### Breaking Changes (4 changes)

- [ADIRGSL-2305](https://jira.adacta-fintech.com/browse/ADIRGSL-2305): После деплоя выполнить скрипт:
    database\sql\migration\sapFilesIntergationHelper.sql

- [ADIRGSL-2365](https://jira.adacta-fintech.com/browse/ADIRGSL-2365): После деплоя выполнить скрипт:
    database\sql\migration\sapFilesIntergationHelper.sql

- [ADIRGSL-2451](https://jira.adacta-fintech.com/browse/ADIRGSL-2451): После деплоя выполнить скрипт:
    database\sql\migration\sapFilesIntergationHelper.sql

- [ADIRGSL-2465](https://jira.adacta-fintech.com/browse/ADIRGSL-2465): Обновлены клиентские view по запросу клиента

    **Deployment Notes**

    Требуется выполнить скрипты:
    1) implementation\database\sql\migration\get_transformed_transactions.sql
    2) implementation\database\sql\migration\impl_ldwh_zds_algl_2.sql
    3) implementation\database\sql\migration\impl_ldwh_zins_cont.sql


### New Features (29 changes)

- [ADIRGSL-2243](https://jira.adacta-fintech.com/browse/ADIRGSL-2243): Постпродажное сопровождение - Заявка:

    * Настроена видимость Заявок с типом обращения "Внесение изменений" в журнале заявок.
    * Исправлены тексты предупреждений.
    * Атрибут "Дата поступления заявления в СК" сделан невидимым для агента.
    * При регистрации Заявки агентом (не ОПЕРУ) атрибут "Инициатор" заполняется по умолчанию значением = "Заявитель", недоступен для изменения.
    * Для "Внесение изменений" сделаны обязательным для заполнения атрибуты "Подтип изменения" и "Класс изменения".
    * Атрибут "Причина изменений" сделан доступным и обязательным для заполнения только для типа обращения "Внесение изменений", если инициатор = "Страховщик", иначе атрибут скрыт.
    * Для действий "Согласовать" и "Оформить ДС" добавлены валидации.
    * Для агента временно закрыт ДС на внесение изменений, оставлен только для ОПЕРУ.

- [ADIRGSL-2273](https://jira.adacta-fintech.com/browse/ADIRGSL-2273): КВ. Оценка/Факт. Алгоритм компенсации

- [ADIRGSL-2277](https://jira.adacta-fintech.com/browse/ADIRGSL-2277): Сервис маппинга продуктов и рисков:

    * Добавлена валидация обязательности каверов.

- [ADIRGSL-2296](https://jira.adacta-fintech.com/browse/ADIRGSL-2296): 1) Убрана уникальность номера платежа.
    2) В РНВ ссылка на документ-основание (поле REFERENCE_NUMBER) для возврата платежей заменена с номера платежа на его ID
    3) В реквесте для интеграции РНВ в 1С в параметр "hi:InvoiceNumber" передаётся ID платежа

- [ADIRGSL-2300](https://jira.adacta-fintech.com/browse/ADIRGSL-2300): Подготовить описание сервиса идентификации платежей (для целей миграции)

- [ADIRGSL-2328](https://jira.adacta-fintech.com/browse/ADIRGSL-2328): Обновлена форма "Витрина задач":
    1) Добавлена возможность множественного выбора значений фильтра “Статус договора”
    2) При открытии вкладки "Неназначенные задачи" для фильтра "Статус договора" устанавливается значение "Действует"
    3) Фильтр "Возраст страхователя" рашширен до диапазонного

- [ADIRGSL-2341](https://jira.adacta-fintech.com/browse/ADIRGSL-2341): Изменен процесс оформления эл полисов для обеспечения интеграции в ЕФР

- [ADIRGSL-2368](https://jira.adacta-fintech.com/browse/ADIRGSL-2368): МИнБанк. Стратегия на пять. Гарант

- [ADIRGSL-2376](https://jira.adacta-fintech.com/browse/ADIRGSL-2376): АВР. Загрузка доп.кв - доработки

- [ADIRGSL-2386](https://jira.adacta-fintech.com/browse/ADIRGSL-2386): КВ. Оценка

- [ADIRGSL-2414](https://jira.adacta-fintech.com/browse/ADIRGSL-2414): Печатные формы:

    * Добавлен новый подписант Белова, действует с 01.01.2023 даты заключения договора.
    * Добавлены новые правила страхования для продуктов указанных в задаче, действуют с 01.01.2023 даты заключения договора.

- [ADIRGSL-2431](https://jira.adacta-fintech.com/browse/ADIRGSL-2431): Добавлены риски для миграции

- [ADIRGSL-2432](https://jira.adacta-fintech.com/browse/ADIRGSL-2432): В таблицу продуктов добавлен атрибут PRODUCT_CLASS

- [ADIRGSL-2438](https://jira.adacta-fintech.com/browse/ADIRGSL-2438): ДМС - котировка:

    * Добавлена секция выгодоприобретателей на основе данных застрахованного.

- [ADIRGSL-2446](https://jira.adacta-fintech.com/browse/ADIRGSL-2446): скорректирована ссылка в полисе-сертификате

- [ADIRGSL-2462](https://jira.adacta-fintech.com/browse/ADIRGSL-2462): Improvements for non financial change amendments for policies.

- [ADIRGSL-2463](https://jira.adacta-fintech.com/browse/ADIRGSL-2463): Постпродажное сопровождение - Заявка:

    * Изменено расположение элементов в интерфейсе: Дата подписания заявления, Дата поступления заявления в СК.
    * Добавлен атрибут «Тип изменений».
    * При создании заявки значение для инициатора по умолчанию «Заявитель».

- [ADIRGSL-2464](https://jira.adacta-fintech.com/browse/ADIRGSL-2464): Отображение результатов в загрузчике САД.

- [ADIRGSL-2467](https://jira.adacta-fintech.com/browse/ADIRGSL-2467): Оптимизация job-а AutoAllocatePaymentsEtlService

- [ADIRGSL-2469](https://jira.adacta-fintech.com/browse/ADIRGSL-2469): Загрузка платежа без paymentSourceId

- [ADIRGSL-2478](https://jira.adacta-fintech.com/browse/ADIRGSL-2478): Обновление инвест. параметров с 09.12.2022

- [ADIRGSL-2485](https://jira.adacta-fintech.com/browse/ADIRGSL-2485): Обновлен график траншей

- [ADIRGSL-2486](https://jira.adacta-fintech.com/browse/ADIRGSL-2486): МИнБанк. Стратегия на пять.Гарант. Изменения

- [ADIRGSL-2490](https://jira.adacta-fintech.com/browse/ADIRGSL-2490): КСЖ - Бордеро валидации:

    * Возраст застрахованного на дату окончания срока страхования не должен превышать 80 лет.
    * Срок страхования не превышает 7 лет.

- [ADIRGSL-2492](https://jira.adacta-fintech.com/browse/ADIRGSL-2492): Котировки:

    * Дата заключения, дата подписания заявления, дата поступления заявления в СК, дата принятия в работу заявления по умолчанию равны текущей дате при копировании котировки.
    * Исправлен маппинг партнера при создании ДМС из договора.

- [ADIRGSL-2495](https://jira.adacta-fintech.com/browse/ADIRGSL-2495): Изменения по БФКО в части иных условий и деклараций

- [ADIRGSL-2513](https://jira.adacta-fintech.com/browse/ADIRGSL-2513): Перенесена даты запуска по МинБанку на 16.12.2022

- [ADIRGSL-2515](https://jira.adacta-fintech.com/browse/ADIRGSL-2515): Перенос запуска продукта Стратегия на пять. Гарант МинБанк на 20.12.2022

- [ADIRGSL-2520](https://jira.adacta-fintech.com/browse/ADIRGSL-2520): Создание договора - Достойный век 2.0:

    * Добавлена проверка на существование риска при округлении премии.


### Fixed (4 changes)

- [ADIRGSL-2086](https://jira.adacta-fintech.com/browse/ADIRGSL-2086): Постпродажное сопровождение - Заявка:

    * Исправлена ошибка при получении даты согласования при создании ДС.

- [ADIRGSL-2468](https://jira.adacta-fintech.com/browse/ADIRGSL-2468): Исправлена ошибка загрузки платежей из Excel

- [ADIRGSL-2507](https://jira.adacta-fintech.com/browse/ADIRGSL-2507): Постпродажное сопровождение - Заявка:

    * ДС из заявки на изменение создаётся на основе последней активной версии договора.

- [ADIRGSL-2530](https://jira.adacta-fintech.com/browse/ADIRGSL-2530): Исправлен мапинг рисков для продуктов с рисками 'JL36404' & 'D36404'

# 37.0.0-rc1 (2022-12-05)

### Breaking Changes (5 changes)

- [ADIRGSL-2334](https://jira.adacta-fintech.com/browse/ADIRGSL-2334): Обновлены клиентские view: изменен рассчет поля SGTXT

    **Deployment Notes**

    Требуется выполнить скрипты:
    1) implementation\database\sql\migration\get_transformed_transactions.sql

- [ADIRGSL-2387](https://jira.adacta-fintech.com/browse/ADIRGSL-2387): Контрагенты:

    * Исправлен поиск по контрагентам.

    **Deployment Notes**

    Выполнить вручную скрипт:

    1. database/sql/migration/ADIRGSL-1747-update-party-common-body.sql

    После выполнения скрипта выполнить переиндексацию Elasticsearch.

    После тестирования удалить резервные копии, выполнив скрипт:

    1. database/sql/migration/ADIRGSL-1747-remove-backups.sql

- [ADIRGSL-2416](https://jira.adacta-fintech.com/browse/ADIRGSL-2416): После деплоя выполнить скрипт:
    database\sql\migration\sapFilesIntergationHelper.sql

- [ADIRGSL-2418](https://jira.adacta-fintech.com/browse/ADIRGSL-2418): Детский капитал:

    * Исправлено значение чекбокса застрахованного на подтверждаю для декларации страхователя и застрахованного в договорах с пропущенной валидацией.

    Выполнить скрипт: database\sql\migration\ADIRGSL-2418-update-declaration-insured-confirmed.sql

- [ADIRGSL-2419](https://jira.adacta-fintech.com/browse/ADIRGSL-2419): После деплоя надо выполнить скрипт:
    database\sql\migration\sapFilesIntergationHelper.sql


### New Features (49 changes)

- [ADIRGSL-1212](https://jira.adacta-fintech.com/browse/ADIRGSL-1212): Доработан запрос пользователей.

- [ADIRGSL-2242](https://jira.adacta-fintech.com/browse/ADIRGSL-2242): Добавлен новый столбец " Вариант программы", он выводится после столбца "Продукт" в:
    * содержимом акта (строках акта)
    * журнале строк АВР
    * выгрузке акта
    * выгрузке строк акта

- [ADIRGSL-2247](https://jira.adacta-fintech.com/browse/ADIRGSL-2247): Продукты для тестовой миграции.

- [ADIRGSL-2266](https://jira.adacta-fintech.com/browse/ADIRGSL-2266): Загрузка банковской выписки из Excel: доработка заполнения некоторых полей

- [ADIRGSL-2268](https://jira.adacta-fintech.com/browse/ADIRGSL-2268): Автоматическая отвязка платежей при создании ДС (Расторжение/ДС на фин.изменение)

- [ADIRGSL-2281](https://jira.adacta-fintech.com/browse/ADIRGSL-2281): Доработка валидации просроченные паспорта

- [ADIRGSL-2292](https://jira.adacta-fintech.com/browse/ADIRGSL-2292): Заявка на расторжение:

    * Настроен функционал блокировки повторного создания Заявки на расторжение, по договорам, по которым данная заявка уже создана, а статус Заявки не «Отменена».

- [ADIRGSL-2293](https://jira.adacta-fintech.com/browse/ADIRGSL-2293): Подготовить описание сервиса загрузки АВР (для миграции)

- [ADIRGSL-2298](https://jira.adacta-fintech.com/browse/ADIRGSL-2298): Универсальный справочник рисков - актуализация.

- [ADIRGSL-2318](https://jira.adacta-fintech.com/browse/ADIRGSL-2318): РНВ категории Возврат. Доработка запроса передаваемого в 1-С при передаче РНВ

- [ADIRGSL-2322](https://jira.adacta-fintech.com/browse/ADIRGSL-2322): Cервис маппинга продуктов и рисков:

    * Добавлен тип продукта в запрос сервиса

- [ADIRGSL-2352](https://jira.adacta-fintech.com/browse/ADIRGSL-2352): Отключение валидаций для миграции по ЭП

- [ADIRGSL-2357](https://jira.adacta-fintech.com/browse/ADIRGSL-2357): Implemented initiator modification service for contract documents.
    Updated mappings for versions without initiator.

- [ADIRGSL-2362](https://jira.adacta-fintech.com/browse/ADIRGSL-2362): Добавлен расчет максимальной страховой суммы для БФКО

- [ADIRGSL-2385](https://jira.adacta-fintech.com/browse/ADIRGSL-2385): Разблокированы ЭП для продуктов БФКО

- [ADIRGSL-2390](https://jira.adacta-fintech.com/browse/ADIRGSL-2390): Продукты Восстанови здоровье:

    * Переименованы наименования продуктов.
    * Настроено автоматическое заполнение атрибута "Размер страховой суммы" без возможности редактирования.
    * Скрыт атрибут "Вариант выплаты по дожитию".

- [ADIRGSL-2392](https://jira.adacta-fintech.com/browse/ADIRGSL-2392): Постпродажное сопровождение - Заявка:

    * Исправлена логика расчета даты окончания периода охлаждения. Учтен день заключения при расчете.

- [ADIRGSL-2396](https://jira.adacta-fintech.com/browse/ADIRGSL-2396): ОАС_тестирование ПФ по продукту Надежный капитал. Классика 2.0

- [ADIRGSL-2397](https://jira.adacta-fintech.com/browse/ADIRGSL-2397): Добавлены пользователи для рассылки по электрополисам на тесте и предпроде

- [ADIRGSL-2399](https://jira.adacta-fintech.com/browse/ADIRGSL-2399): БФКО_Забота о семье_тестирование 25.11.2022

- [ADIRGSL-2401](https://jira.adacta-fintech.com/browse/ADIRGSL-2401): Изменён рассчёт даты выпуска АВР для новых актов (по умолчанию): теперь это первое число календарного месяца, следующего отчетным периодом, закрытым для типа "АВР".

- [ADIRGSL-2402](https://jira.adacta-fintech.com/browse/ADIRGSL-2402): Восстанови здоровье:

    * Исправлены замечания по печатным формам.

- [ADIRGSL-2408](https://jira.adacta-fintech.com/browse/ADIRGSL-2408): Добработка тарификции по Достойный век.

- [ADIRGSL-2409](https://jira.adacta-fintech.com/browse/ADIRGSL-2409): ОАС. Надежный век. Возможность печати ПФ при незаполненных выгодоприобретателях.

- [ADIRGSL-2410](https://jira.adacta-fintech.com/browse/ADIRGSL-2410): ОАС_тестирование 28.11.2022.

- [ADIRGSL-2411](https://jira.adacta-fintech.com/browse/ADIRGSL-2411): ОАС_тестирование 28.11.2022 НК и ДК ПФ

- [ADIRGSL-2412](https://jira.adacta-fintech.com/browse/ADIRGSL-2412): Восстанови здоровье:

    * Изменены наименования продуктов для интерфейса и ПФ.
    * Застрахованный всегда совпадает со страхователем.

    Генетический чек-ап:

    * В программе ДМС подпись только для страхователя.
    * Исправлены замечания по тексту в ПФ.

- [ADIRGSL-2420](https://jira.adacta-fintech.com/browse/ADIRGSL-2420): Технические изменения, связанные с подготовкой к обновлению ядра.

- [ADIRGSL-2421](https://jira.adacta-fintech.com/browse/ADIRGSL-2421): Платежи. Загрузка платежа на взаимозачет (фиктивный платеж)

- [ADIRGSL-2422](https://jira.adacta-fintech.com/browse/ADIRGSL-2422): Восстанови здоровье:

    * Изменен набор рисков для страховых продуктов.

- [ADIRGSL-2423](https://jira.adacta-fintech.com/browse/ADIRGSL-2423): ОАС_тестирование 29.11.2022.

- [ADIRGSL-2424](https://jira.adacta-fintech.com/browse/ADIRGSL-2424): В GL_ADDITIONAL_ATTRIBUTES добавлены атрибуты BANK_STATEMENT_ITEM_ID, COMMISSION_ACT_ID, CONTRACT_NUMBER, PAYMENT_ORDER_NUMBER

- [ADIRGSL-2426](https://jira.adacta-fintech.com/browse/ADIRGSL-2426): Added missing binding for digital signature service.

- [ADIRGSL-2427](https://jira.adacta-fintech.com/browse/ADIRGSL-2427): Генетический чек-ап:

    * Настроено ограничение на выпуск нескольких договоров для одного ЗЛ с аналогичным покрытием.
    * Исправлены замечания по ПФ.

- [ADIRGSL-2428](https://jira.adacta-fintech.com/browse/ADIRGSL-2428): ОАС_Достойный век ПФ - тестирование 29.11.2022

- [ADIRGSL-2429](https://jira.adacta-fintech.com/browse/ADIRGSL-2429): ОАС_Детский капитал 2.0 ПФ - тестирование 29.11.2022

- [ADIRGSL-2436](https://jira.adacta-fintech.com/browse/ADIRGSL-2436): Восстанови здоровье:

    * Исправлены замечания по ПФ.

- [ADIRGSL-2437](https://jira.adacta-fintech.com/browse/ADIRGSL-2437): Add new ETL service for manual policy fixes

- [ADIRGSL-2439](https://jira.adacta-fintech.com/browse/ADIRGSL-2439): Редактирование даты заключения под актером Андеррайтер в статусе На рассмотрении СК.

- [ADIRGSL-2441](https://jira.adacta-fintech.com/browse/ADIRGSL-2441): Восстанови здоровье:

    * Удалена валидация прикрепления подписанного договора страхования при переводе договора в статус Подписан.

- [ADIRGSL-2443](https://jira.adacta-fintech.com/browse/ADIRGSL-2443): Доработки по продуктам ОАС

- [ADIRGSL-2444](https://jira.adacta-fintech.com/browse/ADIRGSL-2444): ОАС_тестирования _01.12.2022 - ПФ ДВ, ДК и НК

- [ADIRGSL-2445](https://jira.adacta-fintech.com/browse/ADIRGSL-2445): ДМС:

    * Исправлены замечания по ПФ Восстанови здоровье.
    * Исправлены валидации по продуктам Генетический чек-ап.

- [ADIRGSL-2447](https://jira.adacta-fintech.com/browse/ADIRGSL-2447): ОАС_Детский капитал_тестирование 01.12.2022.

- [ADIRGSL-2448](https://jira.adacta-fintech.com/browse/ADIRGSL-2448): Обновление инвест. параметров с 05.12.2022.

- [ADIRGSL-2449](https://jira.adacta-fintech.com/browse/ADIRGSL-2449): Дата запуска по ОАС Достойный век 2.0 перенесена на 03.12.2022

- [ADIRGSL-2450](https://jira.adacta-fintech.com/browse/ADIRGSL-2450): ОАС_тестирование 02.12.2022.

- [ADIRGSL-2454](https://jira.adacta-fintech.com/browse/ADIRGSL-2454): ОАС_тестирование 02.12.2022 ПФ

- [ADIRGSL-2457](https://jira.adacta-fintech.com/browse/ADIRGSL-2457): НСЖ:

    * Связанные ДМС перенесены на вкладку дополнительные условия.
    * Добавлены права для агента на исполнение сервиса по созданию ДМС.

    ДМС:

    * Связанные документы НСЖ перенесены на вкладку дополнительные условия.


### Fixed (5 changes)

- [ADIRGSL-2338](https://jira.adacta-fintech.com/browse/ADIRGSL-2338): ОАС_тестирование Достойный век 14.11.2022 - ПФ

- [ADIRGSL-2379](https://jira.adacta-fintech.com/browse/ADIRGSL-2379): ОАС_тестирование_Детский капитал 22.11.2022 ПФ

- [ADIRGSL-2393](https://jira.adacta-fintech.com/browse/ADIRGSL-2393): Исправлена ошибка при идентификации платежа на реестр: tolerance учитывать не нужно

- [ADIRGSL-2395](https://jira.adacta-fintech.com/browse/ADIRGSL-2395): Исправлено отображение процентных значений в файле-выгрузке

- [ADIRGSL-2400](https://jira.adacta-fintech.com/browse/ADIRGSL-2400): Исправлена ошибка вычисления полного года в строках АВР

# 36.0.0-rc1 (2022-11-25)

### Breaking Changes (6 changes)

- [ADIRGSL-2304](https://jira.adacta-fintech.com/browse/ADIRGSL-2304): После деплоя необходимо выполнить скрипт:
    database\sql\migration\sapFilesIntergationHelper.sql

- [ADIRGSL-2306](https://jira.adacta-fintech.com/browse/ADIRGSL-2306): После деплоя необходимо выполнить скрипт:
    database\sql\migration\sapFilesIntergationHelper.sql

- [ADIRGSL-2308](https://jira.adacta-fintech.com/browse/ADIRGSL-2308): После деплоя необходимо выполнить скрипт:
    database\sql\migration\sapFilesIntergationHelper.sql

- [ADIRGSL-2365](https://jira.adacta-fintech.com/browse/ADIRGSL-2365): После деплоя необходимо выполнить скрипт:
    database\sql\migration\sapFilesIntergationHelper.sql

- [ADIRGSL-2374](https://jira.adacta-fintech.com/browse/ADIRGSL-2374): Заявка на расторжение:

    * Изменен поиск договоров для заявки на строгое посимвольное совпадение, вместо вхождения части номера договора.
    * Подготовлен скрипт для исправления номера договора в заявке.

    После деплоя необходимо выполнить скрипт:
    database\sql\migration\ADIRGSL-2374-Update-contract-number-in-request.sql

    После выполнения скрипта, сделать реиндексацию Elasticsearch.

- [ADIRGSL-2377](https://jira.adacta-fintech.com/browse/ADIRGSL-2377): После деплоя необходимо выполнить скрипт:
    database\sql\migration\sapFilesIntergationHelper.sql


### New Features (32 changes)

- [ADIRGSL-1212](https://jira.adacta-fintech.com/browse/ADIRGSL-1212): Технические работы по восстановление работоспособности DEV среды.

- [ADIRGSL-1441](https://jira.adacta-fintech.com/browse/ADIRGSL-1441): Добавлены декларации для ДМС Генетический чек-ап

- [ADIRGSL-1532](https://jira.adacta-fintech.com/browse/ADIRGSL-1532): Корректировка по импорту субагентов.

- [ADIRGSL-1975](https://jira.adacta-fintech.com/browse/ADIRGSL-1975): Добавлена постобработка данных для загрузчика Субагентов.

- [ADIRGSL-2146](https://jira.adacta-fintech.com/browse/ADIRGSL-2146): Implemented contract attachments sign service.

- [ADIRGSL-2173](https://jira.adacta-fintech.com/browse/ADIRGSL-2173): Добавлено техническое дополнительное соглашение по медицине.

- [ADIRGSL-2222](https://jira.adacta-fintech.com/browse/ADIRGSL-2222): Implemented attachments for endowments.

- [ADIRGSL-2245](https://jira.adacta-fintech.com/browse/ADIRGSL-2245): Часть.1 Переход на имплементационную таблицу отчетных периодов
    Часть.2 Добавлен пользовательский интерфейс для работы с отчетными периодами

- [ADIRGSL-2258](https://jira.adacta-fintech.com/browse/ADIRGSL-2258): ПФ БФКО_Стратегия на пять. Забота о себе и ПФ БФКО_Стратегия на пять. Забота о семье

- [ADIRGSL-2282](https://jira.adacta-fintech.com/browse/ADIRGSL-2282): Событийная модель в системе и передача информации о событиях партнёрам.

- [ADIRGSL-2286](https://jira.adacta-fintech.com/browse/ADIRGSL-2286): Improvements for policy non fin change amendments.

- [ADIRGSL-2311](https://jira.adacta-fintech.com/browse/ADIRGSL-2311): Добавлен импорт реестров по формату Открытие

- [ADIRGSL-2313](https://jira.adacta-fintech.com/browse/ADIRGSL-2313): Корректировки по продукту "Достойный век" ОАС.

- [ADIRGSL-2329](https://jira.adacta-fintech.com/browse/ADIRGSL-2329): Журнал договоров_поиск инициатора.

- [ADIRGSL-2331](https://jira.adacta-fintech.com/browse/ADIRGSL-2331): АВР. Убрать проверку при создании PC

- [ADIRGSL-2335](https://jira.adacta-fintech.com/browse/ADIRGSL-2335): Отключение валидаций для мигрируемых договоров КСЖ

- [ADIRGSL-2336](https://jira.adacta-fintech.com/browse/ADIRGSL-2336): Права для группы пользователей ОПЕРУ и УКСП

- [ADIRGSL-2353](https://jira.adacta-fintech.com/browse/ADIRGSL-2353): Автоматическое заполнение телефона и e-mail с карточки страхователя в форме выпуска для эл. полисов.

- [ADIRGSL-2355](https://jira.adacta-fintech.com/browse/ADIRGSL-2355): Восстанови здоровье:

    * Изменен состав рисков
    * Изменена разбивка премии по рискам
    * Исправлены ссылки на создание чек-апов в Надежном капитале
    * Сделано доступным для ОПЕРУ создание ДМС из Надежный капитал и Детский капитал
    * Настроена обязательность заполнения декларации ЗЛ, если страхователь и ЗЛ не совпадают
    * Для продуктов ДМС Генетический чек-ап скрыт компонент по мед. декларациям и убрана проверка на обязательность

- [ADIRGSL-2356](https://jira.adacta-fintech.com/browse/ADIRGSL-2356): ДМС и НСЖ:

    * Добавлена в котировку и договор ДМС ссылка на договор НСЖ, из которого оформлен ДМС.
    * Добавлены в договор НСЖ ссылки на котировки и договоры ДМС, которые оформлены из НСЖ.

- [ADIRGSL-2360](https://jira.adacta-fintech.com/browse/ADIRGSL-2360): Открыть кнопку "Выгрузить отчет" для всех пользователей.

- [ADIRGSL-2363](https://jira.adacta-fintech.com/browse/ADIRGSL-2363): По продукту БФКО_Стратегия на пять. Забота о семье обновлены правила страхования и изменено полное наименование риска

- [ADIRGSL-2364](https://jira.adacta-fintech.com/browse/ADIRGSL-2364): Корректировки по продукту "Достойный век" ОАС.

- [ADIRGSL-2366](https://jira.adacta-fintech.com/browse/ADIRGSL-2366): Добавлен импорт банковской выписки из файла формата Excel.

- [ADIRGSL-2369](https://jira.adacta-fintech.com/browse/ADIRGSL-2369): Перенесена дата запуска продукта БФКО_Стратегия на пять. Инвест на 23.11.2022

- [ADIRGSL-2370](https://jira.adacta-fintech.com/browse/ADIRGSL-2370): Корректировки по продукту Детский капитал ОАС.

- [ADIRGSL-2371](https://jira.adacta-fintech.com/browse/ADIRGSL-2371): Корректировки по продуктам БФКО:
    -Стратегия на пять. Забота о себе
    -Стратегия на пять. Забота о семье

- [ADIRGSL-2381](https://jira.adacta-fintech.com/browse/ADIRGSL-2381): ОАС ДМС:

    * Исправлены наименования продуктов Генетический чек-ап
    * Исправлены замечания по печатным формам
    * Скрыт раздел выгодоприобретателей для продуктов Генетический чек-ап и Восстанови здоровье

- [ADIRGSL-2383](https://jira.adacta-fintech.com/browse/ADIRGSL-2383): Добавлено ожидание окончания загрузки поисковика договоров перед возмодностью осуществления поиска.

- [ADIRGSL-2385](https://jira.adacta-fintech.com/browse/ADIRGSL-2385): Исправления после тестирования от 23.11.22

- [ADIRGSL-2388](https://jira.adacta-fintech.com/browse/ADIRGSL-2388): Изменение печатной формы КСЖ авто

- [ADIRGSL-2392](https://jira.adacta-fintech.com/browse/ADIRGSL-2392): Постпродажное сопровождение - Заявка:

    * Исправлена логика расчета даты окончания периода охлаждения.

# 35.0.0-rc1 (2022-11-18)

### Breaking Changes (3 changes)

- [ADIRGSL-2278](https://jira.adacta-fintech.com/browse/ADIRGSL-2278): Добавлен новый атрибут "Вариант программы" для договоров КСЖ


    **Deployment Notes**

    Требуется выполнить скрипты:
    1) implementation\database\sql\migration\ADIRGSL-2278-update-program-version.sql

- [ADIRGSL-2287](https://jira.adacta-fintech.com/browse/ADIRGSL-2287): Расширение атрибутов реестра загрузки из Адиншур в САП.

    После деплоя необходимо выполнить скрипт:
    database\sql\migration\sapFilesIntergationHelper.sql

- [ADIRGSL-2305](https://jira.adacta-fintech.com/browse/ADIRGSL-2305): Маппинг продукта Детский капитал Классика 2.0 для ОАС

    После деплоя необходимо выполнить скрипт:
    database\sql\migration\sapFilesIntergationHelper.sql


### New Features (36 changes)

- [ADIRGSL-1975](https://jira.adacta-fintech.com/browse/ADIRGSL-1975): Создан загрузчик по учёту субагентов.

- [ADIRGSL-2121](https://jira.adacta-fintech.com/browse/ADIRGSL-2121): Implemented policy non fin change amendment letter printout.

- [ADIRGSL-2182](https://jira.adacta-fintech.com/browse/ADIRGSL-2182): Изменение печатной формы КСЖ авто

- [ADIRGSL-2197](https://jira.adacta-fintech.com/browse/ADIRGSL-2197): На форме "Кандидаты к выплате КВ" переработаны фильтры "Агент" и "№ Договора посредника", добавлен фильтр "Документация корректна"

- [ADIRGSL-2208](https://jira.adacta-fintech.com/browse/ADIRGSL-2208): Обновление coolOffPeriodDays на +1 день

- [ADIRGSL-2254](https://jira.adacta-fintech.com/browse/ADIRGSL-2254): Восстанови здоровье для ОАС:

    * Настроена печатная форма анкеты идентификации.
    * Настроена печатная форма договора, включает программу ДМС, памятку по сервису и квитанцию на оплату.

- [ADIRGSL-2255](https://jira.adacta-fintech.com/browse/ADIRGSL-2255): ДМС Генетический чек-ап для ОАС:

    * Настроена печатная форма договора, включает программу ДМС и памятку по сервису.

- [ADIRGSL-2265](https://jira.adacta-fintech.com/browse/ADIRGSL-2265): Добавлен вариант формата даты перечисления

- [ADIRGSL-2267](https://jira.adacta-fintech.com/browse/ADIRGSL-2267): ЗЕНИТ. Базис инвест. Драйвер гарантия. Добавление сервиса ПФП

- [ADIRGSL-2274](https://jira.adacta-fintech.com/browse/ADIRGSL-2274): Риски для миграции

- [ADIRGSL-2276](https://jira.adacta-fintech.com/browse/ADIRGSL-2276): Корректировка шаблона памятки ВСС (Драйвер Гарантия)

- [ADIRGSL-2279](https://jira.adacta-fintech.com/browse/ADIRGSL-2279): Отключение валидаций по банковскому счету и паспорта к/а

- [ADIRGSL-2289](https://jira.adacta-fintech.com/browse/ADIRGSL-2289): Стратегия на пять. Гарант_тестирование 10.11.2022.

- [ADIRGSL-2294](https://jira.adacta-fintech.com/browse/ADIRGSL-2294): Внесены исправления в ПФ и декларациях

- [ADIRGSL-2295](https://jira.adacta-fintech.com/browse/ADIRGSL-2295): Маппинг продуктов для партнера Зенит.

- [ADIRGSL-2299](https://jira.adacta-fintech.com/browse/ADIRGSL-2299): Стратегия на пять. Инвест_тестирование 10.11.2022.

- [ADIRGSL-2301](https://jira.adacta-fintech.com/browse/ADIRGSL-2301): По продуктам БФКО с 15.11.2022 обновлены правила страхования

- [ADIRGSL-2302](https://jira.adacta-fintech.com/browse/ADIRGSL-2302): Добавление сайта на карточку ЮЛ

- [ADIRGSL-2308](https://jira.adacta-fintech.com/browse/ADIRGSL-2308): Маппинг для продуктов БФКО.

- [ADIRGSL-2309](https://jira.adacta-fintech.com/browse/ADIRGSL-2309): Стратегия на пять. Защита семьи_тестироваие 11.11.2022.

- [ADIRGSL-2312](https://jira.adacta-fintech.com/browse/ADIRGSL-2312): ОАС_тестирование Детский капитал/Надежный капитал 14.11.2022.

- [ADIRGSL-2314](https://jira.adacta-fintech.com/browse/ADIRGSL-2314): Стратегия на пять. Гарант_тестирование 14.11.2022.

- [ADIRGSL-2315](https://jira.adacta-fintech.com/browse/ADIRGSL-2315): Стратегия на пять. Инвест_тестирование 14.11.2022.

- [ADIRGSL-2325](https://jira.adacta-fintech.com/browse/ADIRGSL-2325): БФКО_Стратегия на пять_закрыть с 16.11.2022.

- [ADIRGSL-2326](https://jira.adacta-fintech.com/browse/ADIRGSL-2326): ПСБ (масс и ОРС)_замена инвест параметров Драйвер гарантия 3 года с 17.11.2022.

- [ADIRGSL-2327](https://jira.adacta-fintech.com/browse/ADIRGSL-2327): Добавление рисков в рамках задачи ADIRGSL-2327

- [ADIRGSL-2330](https://jira.adacta-fintech.com/browse/ADIRGSL-2330): Выгрузка журнала договора по кнопке выгрузить отчет - изменения.

- [ADIRGSL-2332](https://jira.adacta-fintech.com/browse/ADIRGSL-2332): Добавлена роль "ExcludeEBMP". При добавлении данной роли пользователю станут недоступны для оформления продукты БФКО "Стратегия на пять. Забота о себе" и "Стратегия на пять. Забота о семье".

- [ADIRGSL-2333](https://jira.adacta-fintech.com/browse/ADIRGSL-2333): ДМС Генетический чек-ап для НК и ДК:

    * Предоставлена возможность менять ЗЛ в котировке ДМС
    * Дата заключения заполняется автоматически при создании котировки и равна дате заключения договора НСЖ
    * Срок страхования и размер страховой суммы заполняются автоматически при создании котировки ДМС
    * При оформлении ДМС из НСЖ_Детский капитал. Классика 2.0 предлагается оформить оба Генетических чек-апа

- [ADIRGSL-2339](https://jira.adacta-fintech.com/browse/ADIRGSL-2339): БФКО розница_Стратегия на пять. Инвест_перенос даты запуска на 21.11.2022.

- [ADIRGSL-2340](https://jira.adacta-fintech.com/browse/ADIRGSL-2340): Обновление инвест. параметров с 21.11.2022.

- [ADIRGSL-2342](https://jira.adacta-fintech.com/browse/ADIRGSL-2342): Обновление инвест. параметров с 21.11.2022_2.

- [ADIRGSL-2343](https://jira.adacta-fintech.com/browse/ADIRGSL-2343): Добавление риска для миграции

- [ADIRGSL-2344](https://jira.adacta-fintech.com/browse/ADIRGSL-2344): Корректировка отображения рисков по пакетам в ПФ продукта Финансовый резерв.

- [ADIRGSL-2346](https://jira.adacta-fintech.com/browse/ADIRGSL-2346): Заявка на расторжение:

    * Сделано доступным для заполнения/изменения атрибут "Банковские реквизиты" в статусе Заявки "На рассмотрении СК" для роли "БО".

- [ADIRGSL-2358](https://jira.adacta-fintech.com/browse/ADIRGSL-2358): БФКО розница_Стратегия на пять. Инвест_перенос даты запуска на 22.11.2022.


### Fixed (3 changes)

- [ADIRGSL-1925](https://jira.adacta-fintech.com/browse/ADIRGSL-1925): Добавлены декларации для ОАС_Восстанови здоровье

- [ADIRGSL-2194](https://jira.adacta-fintech.com/browse/ADIRGSL-2194): Исправлен рассчет значенийпри ручной правке КВ в АВР для нескольких строк.

- [ADIRGSL-2224](https://jira.adacta-fintech.com/browse/ADIRGSL-2224): Продукт Достойный век 2.0 (НСЖ):

    * Скорректирована периодичность уплаты взносов для расчета премии.

    Продукты по ОАС:

    * Настроена первичная конфигурация группы продуктов Восстанови здоровье
    * Настроена первичная конфигурация группы продуктов Генетичексий чек-ап
    * Настроена тарификация для группы продуктов ДМС

# 34.0.0-rc1 (2022-11-10)

### Breaking Changes (1 changes)

- [ADIRGSL-2270](https://jira.adacta-fintech.com/browse/ADIRGSL-2270): Обновлен клиентский view

    **Deployment Notes**

    Требуется выполнить скрипты:
    1) implementation\database\sql\migration\get_transformed_transactions.sql


### New Features (13 changes)

- [ADIRGSL-2013](https://jira.adacta-fintech.com/browse/ADIRGSL-2013): Добавлен перевод ошибок
    Исправление мелких ошибок

- [ADIRGSL-2020](https://jira.adacta-fintech.com/browse/ADIRGSL-2020): Доработка унифицированного дата сорса для универсальных документов.

- [ADIRGSL-2194](https://jira.adacta-fintech.com/browse/ADIRGSL-2194): Правка КВ в АВР возможна для нескольких строк.

- [ADIRGSL-2197](https://jira.adacta-fintech.com/browse/ADIRGSL-2197): АВР. Информации о наличие Payable commission у агентов

- [ADIRGSL-2226](https://jira.adacta-fintech.com/browse/ADIRGSL-2226): Зенит. Драйвер гарантия.5лет.

- [ADIRGSL-2228](https://jira.adacta-fintech.com/browse/ADIRGSL-2228): Скорректированы сроки запуска для продуктов:
    БФКО Стратегия на пять. Гарант,
    БФКО Стратегия на пять. Инвест,
    Зенит Драйвер гарантия 5 лет

- [ADIRGSL-2229](https://jira.adacta-fintech.com/browse/ADIRGSL-2229): На ПРОД среде включен мониторинг.

- [ADIRGSL-2243](https://jira.adacta-fintech.com/browse/ADIRGSL-2243): Постпродажное сопровождение - Заявка:

    * Временно закрыта возможность для Агентов создавать заявку на внесение изменений.

- [ADIRGSL-2251](https://jira.adacta-fintech.com/browse/ADIRGSL-2251): Печатные формы для продуктов Достойный век 2.0, Надежный капитал Классика 2.0, Детский капитал Классика 2.0 для ОАС

- [ADIRGSL-2257](https://jira.adacta-fintech.com/browse/ADIRGSL-2257): БФКО_Стратегия на пять. Гарант - настройка ПФ.

- [ADIRGSL-2259](https://jira.adacta-fintech.com/browse/ADIRGSL-2259): БФКО_Стратегия на пять. Инвест - настройка ПФ.

- [ADIRGSL-2267](https://jira.adacta-fintech.com/browse/ADIRGSL-2267): Зенит. Базис инвест.Татнефть

- [ADIRGSL-2280](https://jira.adacta-fintech.com/browse/ADIRGSL-2280): Добавлен новый критерий проверки АВР на дублирование: теперь проверяется и тип акта.


### Fixed (3 changes)

- [ADIRGSL-2144](https://jira.adacta-fintech.com/browse/ADIRGSL-2144): В выбоке данныхна печать АВР учтена дата взноса

- [ADIRGSL-2224](https://jira.adacta-fintech.com/browse/ADIRGSL-2224): Продукт Достойный век 2.0 (НСЖ):

    * Скорректирована периодичность уплаты взносов для расчета премии.

- [ADIRGSL-2285](https://jira.adacta-fintech.com/browse/ADIRGSL-2285): АВР. Расчет акта. Invoiced commission не рассчиталось.

# 33.0.0-rc1 (2022-11-08)

### Breaking Changes (3 changes)

- [ADIRGSL-2091](https://jira.adacta-fintech.com/browse/ADIRGSL-2091): Добавлены доп. атрибуты рисков: признак программы и принадлежность риска к участнику договора.

    После деплоя необходимо выполнить скрипт (скрипт тяжелый, будет выполняться долго):
    database\sql\migration\ADIRGSL-2091-add-new-risks-attributes.sql

- [ADIRGSL-2108](https://jira.adacta-fintech.com/browse/ADIRGSL-2108): В случае, когда договор был переведен из статуса Подписан в статус Отменён, у сотрудника ОПЕРУ появится возможность перевести договор обратно из статуса Отменён в статус Подписан.

    **Deployment Notes**

    Требуется выполнить скрипты:
    1) database\sql\migration\ADIRGSL-2108-transition-result-update.sql

- [ADIRGSL-2217](https://jira.adacta-fintech.com/browse/ADIRGSL-2217): Обновлены клиентские view: изменено вычисление поля UPDATED_ON

    **Deployment Notes**

    Требуется выполнить скрипты:
    1) impl_ldwh_helper.sql
    2) get_transformed_transactions.sql
    3) impl_ldwh_zds_algl_2.sql


### New Features (19 changes)

- [ADIRGSL-1750](https://jira.adacta-fintech.com/browse/ADIRGSL-1750): Updated search criteria for aa external number duplicates validation.

- [ADIRGSL-1934](https://jira.adacta-fintech.com/browse/ADIRGSL-1934): Исправлена настройка сервиса установки признака ПОД/ФТ.

- [ADIRGSL-1987](https://jira.adacta-fintech.com/browse/ADIRGSL-1987): Проводки. Взаимозачет на другой договор

- [ADIRGSL-2013](https://jira.adacta-fintech.com/browse/ADIRGSL-2013): АВР. Выплата дополнительного КВ

- [ADIRGSL-2064](https://jira.adacta-fintech.com/browse/ADIRGSL-2064): Изменение деклараций в ПФ

- [ADIRGSL-2090](https://jira.adacta-fintech.com/browse/ADIRGSL-2090): Изменён принцип загрузки "маленьких платежей": идентификация теперь производится непосредственно на сам "реестр маленьких платежей", т.о. возможна его идентификация несколькими платежами. В остальном процесс остался прежним: после идентификации реестра производится формирование платежей на его основании и идентификация их на документы. В связи с правкой немного изменена интерфейсная часть формы импорта реестра платежей: в состоянии "импортировано" возможен выбор нескольких платежей, а также убрана кнопка "начать идентификацию", её роль исполняет теперь пункт меню "действия". Т.о. все манипуляции с реестром теперь осуществляются через меню "действия".

- [ADIRGSL-2157](https://jira.adacta-fintech.com/browse/ADIRGSL-2157): Исправлены ВС и СС по продукту БФКО Стратегия на пять. Гарант
    Исправлены тарифы по продукту БФКО Стратегия на пять. Защита большой семьи

- [ADIRGSL-2173](https://jira.adacta-fintech.com/browse/ADIRGSL-2173): Создан сервис создания дополнительного соглашения для корректной миграции версионности договора.

- [ADIRGSL-2193](https://jira.adacta-fintech.com/browse/ADIRGSL-2193): Отключение валидаций по мигрированным заявкам/договорам

- [ADIRGSL-2205](https://jira.adacta-fintech.com/browse/ADIRGSL-2205): Проводки. Платежи. Частичная оплата первого взноса

- [ADIRGSL-2216](https://jira.adacta-fintech.com/browse/ADIRGSL-2216): Move BSI reindexation to plugins.

- [ADIRGSL-2220](https://jira.adacta-fintech.com/browse/ADIRGSL-2220): Изменение процедуры создании договора из котировки Гарант Защиты.

- [ADIRGSL-2224](https://jira.adacta-fintech.com/browse/ADIRGSL-2224): Продукты по ОАС:

    * Настроена первичная конфигурация продуктов Надежный капитал Классика 2.0 и Детский капитал Классика 2.0
    * Настроена первичная конфигурация продуктов Достойный век 2.0

- [ADIRGSL-2228](https://jira.adacta-fintech.com/browse/ADIRGSL-2228): Настройка продуктов БФКО.

- [ADIRGSL-2236](https://jira.adacta-fintech.com/browse/ADIRGSL-2236): Implemented filters and sorting for aa comm rules table.

- [ADIRGSL-2241](https://jira.adacta-fintech.com/browse/ADIRGSL-2241): Корректировки по результатам тестирования ПФ Базис Инвест/Базис Актив.

- [ADIRGSL-2244](https://jira.adacta-fintech.com/browse/ADIRGSL-2244): Добавлена валидация об ограничении выгрузки отчета по договору за период более 1 мес. по дате заключения.

- [ADIRGSL-2262](https://jira.adacta-fintech.com/browse/ADIRGSL-2262): БА - исправить дату начала расчета ДИД.

- [ADIRGSL-2269](https://jira.adacta-fintech.com/browse/ADIRGSL-2269): Корректировка маппинга продуктов КСЖ "Защита кредита".


### Fixed (7 changes)

- [ADIRGSL-1212](https://jira.adacta-fintech.com/browse/ADIRGSL-1212): Technical changes.

- [ADIRGSL-1985](https://jira.adacta-fintech.com/browse/ADIRGSL-1985): Постпродажное сопровождение - Заявка:

    * Исправлено сообщение, если договора нет в системе.
    * Исправлено сообщение, если договор в статусе «Отменен/Расторгнут».
    * Добавлен фильтр для поля класс изменения.
    * Добавлено правило для видимости поля причина изменений.
    * Исправлена опечатка в поле причина расторжения.
    * Добавлена валидация для действия «Согласовано» по типу обращения.

- [ADIRGSL-2168](https://jira.adacta-fintech.com/browse/ADIRGSL-2168): Подготовить описание сервиса загрузки платежей (для миграции)

- [ADIRGSL-2188](https://jira.adacta-fintech.com/browse/ADIRGSL-2188): Исправлена ошибка расчёта данных в полях СРОК СТРАХОВАНИЯ и ПЕРИОД УПЛАТЫ ПРЕМИИ строк акта

- [ADIRGSL-2195](https://jira.adacta-fintech.com/browse/ADIRGSL-2195): После изменения назначения платежа не получается провести автоматическую идентификацию -ч.2

- [ADIRGSL-2272](https://jira.adacta-fintech.com/browse/ADIRGSL-2272): 1) Добавлена ссылка на АВР в журнале строк АВР
    2) Значения столбца "Итого к выплате, руб." выделены серым цветом

- [ADIRGSL-2275](https://jira.adacta-fintech.com/browse/ADIRGSL-2275): Постпродажное сопровождение - Заявка:

    * Исправлена ошибка при согласовании заявки.

# 32.0.0-rc1 (2022-10-27)

### Breaking Changes (5 changes)

- [ADIRGSL-1549](https://jira.adacta-fintech.com/browse/ADIRGSL-1549): Implemented short org name column for aa search view.

    **Deployment notes**
    ES must be reindexed

- [ADIRGSL-1985](https://jira.adacta-fintech.com/browse/ADIRGSL-1985): Постпродажное сопровождение:

    * Добавлен функционал создания ДС на изменение из заявки

    **Deployment Notes**

    Выполнить вручную скрипты в следующем порядке:

    1. database/sql/migration/ADIRGSL-1985-backup-universal-document-body.sql
    2. database/sql/migration/ADIRGSL-1985-update-ud-body.sql

    После выполнения скриптов выполнить переиндексацию Elasticsearch.

    После тестирования удалить резервные копии, выполнив скрипт:

    1. database/sql/migration/ADIRGSL-1985-remove-backup.sql

- [ADIRGSL-2132](https://jira.adacta-fintech.com/browse/ADIRGSL-2132): Initial implementation of endowments.
    Fixed payment frequency and variant data sources input schema.

    **Deployment notes**
    ES must be reindexed.

- [ADIRGSL-2192](https://jira.adacta-fintech.com/browse/ADIRGSL-2192): Постпродажное сопровождение - Журнал заявок и Создание заявки:

    * Исправлен тип суммы страхового взноса

    **Deployment Notes**

    Требуется выполнить переиндексацию Elasticsearch.

- [ADIRGSL-2200](https://jira.adacta-fintech.com/browse/ADIRGSL-2200): Обновлены клиентские view: добавлены поля UPDATED_ON, SOURCE_LINE_ID, AA_EXTERNAL_NUMBER, AGENT, WRBTR2 и DUE_DATE

    **Deployment Notes**

    Требуется выполнить скрипты:
    1) impl_ldwh_helper.sql
    2) get_transformed_transactions.sql
    3) impl_ldwh_zds_algl_2.sql


### New Features (20 changes)

- [ADIRGSL-1212](https://jira.adacta-fintech.com/browse/ADIRGSL-1212): Изменение сервиса реиндексации BSI.

- [ADIRGSL-1492](https://jira.adacta-fintech.com/browse/ADIRGSL-1492): Проверки по ЧС при загрузке договоров КСЖ.

- [ADIRGSL-1919](https://jira.adacta-fintech.com/browse/ADIRGSL-1919): Корректировка маппинга интеграции с SAP в части выбора схемы комиссии в зависимости от creditProgramId.

- [ADIRGSL-1994](https://jira.adacta-fintech.com/browse/ADIRGSL-1994): Изменение печатных форм Базис Инвест/Базис Актив

- [ADIRGSL-2086](https://jira.adacta-fintech.com/browse/ADIRGSL-2086): Постпродажное сопровождение - Заявка:

    * Добавлена секция с кнопкой вызова последнего созданного ДС на расторжение из Заявки.
    * Секция отображается в статусах создания ДС на расторжение: "Расторжение без выплаты", "Согласовано".

- [ADIRGSL-2126](https://jira.adacta-fintech.com/browse/ADIRGSL-2126): Updated beneficiaries and applicants validation for claim and endowments.

- [ADIRGSL-2150](https://jira.adacta-fintech.com/browse/ADIRGSL-2150): Добавлена возможность ввода кода нерезидента (КН)

- [ADIRGSL-1492](https://jira.adacta-fintech.com/browse/ADIRGSL-1492): Added summary description of the editable code table functionality.

- [ADIRGSL-2176](https://jira.adacta-fintech.com/browse/ADIRGSL-2176): Fixed script for aa amendments list data source.

- [ADIRGSL-2181](https://jira.adacta-fintech.com/browse/ADIRGSL-2181): Идентификация платежей: автоматическое заполнение суммы из реестра в меню поиска платежей.

- [ADIRGSL-2185](https://jira.adacta-fintech.com/browse/ADIRGSL-2185): Обновление инвест. параметров с 24.10.2022.

- [ADIRGSL-2189](https://jira.adacta-fintech.com/browse/ADIRGSL-2189): Добавление пользователей для рассылки по электрополисам на тесте и предпроде

- [ADIRGSL-2190](https://jira.adacta-fintech.com/browse/ADIRGSL-2190): Обновление инвест. параметров с 24.10.2022.

- [ADIRGSL-2213](https://jira.adacta-fintech.com/browse/ADIRGSL-2213): LDWH: убрать котировки из вью zins_cont.

- [ADIRGSL-2218](https://jira.adacta-fintech.com/browse/ADIRGSL-2218): В расчете ставки КВ (загрузка договоров) добавлено новое измерение ИД Страховой программы.

- [ADIRGSL-2225](https://jira.adacta-fintech.com/browse/ADIRGSL-2225): Закрытие "Драйвер Гарантия" на 2 года в Зенит масс c 01/11/2022.

- [ADIRGSL-2227](https://jira.adacta-fintech.com/browse/ADIRGSL-2227): Корректировка конфигурации кредитных программ.

- [ADIRGSL-2232](https://jira.adacta-fintech.com/browse/ADIRGSL-2232): Обновление инвест. параметров с 31.10.2022.

- [ADIRGSL-2235](https://jira.adacta-fintech.com/browse/ADIRGSL-2235): КСЖ_Моя защита_проверка на возраст Застрахованного.

- [ADIRGSL-803](https://jira.adacta-fintech.com/browse/ADIRGSL-803): Добавлены валидации для проверки паспорта (14 лет, 20 лет, 45 лет)


### Fixed (4 changes)

- [ADIRGSL-2001](https://jira.adacta-fintech.com/browse/ADIRGSL-2001): Оптимизация GET_TRANSACTIONS_VIEW по АВР (и в целом стали возникать тайм-ауты при работе с АВР)

- [ADIRGSL-2171](https://jira.adacta-fintech.com/browse/ADIRGSL-2171): В отображение проводок по договору добавлены проводки по допникам

- [ADIRGSL-2174](https://jira.adacta-fintech.com/browse/ADIRGSL-2174): Не формируется NVOICED_COMMISSION

- [ADIRGSL-2216](https://jira.adacta-fintech.com/browse/ADIRGSL-2216): Add new reindexation service for BSI

# 31.0.0-rc1 (2022-10-18)

### Breaking Changes (3 changes)

- [ADIRGSL-1833](https://jira.adacta-fintech.com/browse/ADIRGSL-1833): Доработка атрибута КСП в клиентских view

    Запустить скрипты после установки

- [ADIRGSL-2135](https://jira.adacta-fintech.com/browse/ADIRGSL-2135): 1) Доработка клиентских view
    2) Фикс ввода данных ОГРНИП для ИП на форме физлица-контрагента

    Запустить скрипты после установки

- [ADIRGSL-2159](https://jira.adacta-fintech.com/browse/ADIRGSL-2159): Upgraded the platform to version 6.20.7. Upgraded the studio to version 15.6.2.


### New Features (14 changes)

- [ADIRGSL-1652](https://jira.adacta-fintech.com/browse/ADIRGSL-1652): Добавление всех рисков в справочник рисков.

- [ADIRGSL-1919](https://jira.adacta-fintech.com/browse/ADIRGSL-1919): КСЖ БФКО_запуск новых продуктов.

- [ADIRGSL-1934](https://jira.adacta-fintech.com/browse/ADIRGSL-1934): Для контрагента физического лица добавлен атрибут ПОД/ФТ/ФРОМУ.

- [ADIRGSL-2056](https://jira.adacta-fintech.com/browse/ADIRGSL-2056): Галочка "Документация корректна" при автозаполнении АВР игнорируется для договоров КСЖ и договоров-оферт

- [ADIRGSL-2057](https://jira.adacta-fintech.com/browse/ADIRGSL-2057): Дополнение конфигурации договоров для возможностей миграции.

- [ADIRGSL-2060](https://jira.adacta-fintech.com/browse/ADIRGSL-2060): Разработан сервис:

    * Обратного маппинга продуктов и рисков.
    * Обновлена таблица маппинга продуктов и рисков.

- [ADIRGSL-2068](https://jira.adacta-fintech.com/browse/ADIRGSL-2068): Проводки по платежам необходимо вывести в UI

- [ADIRGSL-2124](https://jira.adacta-fintech.com/browse/ADIRGSL-2124): КСЖ_доработка загрузчика + новый атрибут.

- [ADIRGSL-2156](https://jira.adacta-fintech.com/browse/ADIRGSL-2156): Доработка сервиса загрузки банковской выписки для миграции

- [ADIRGSL-2160](https://jira.adacta-fintech.com/browse/ADIRGSL-2160): Отдлельная роль "AllowExportCredit" на выгрузку отчета по КСЖ.

- [ADIRGSL-2166](https://jira.adacta-fintech.com/browse/ADIRGSL-2166): Скорректирована видимость полей о гражданстве на карточке контрагента для продавца.

- [ADIRGSL-2167](https://jira.adacta-fintech.com/browse/ADIRGSL-2167): Updated credit programs descriptions.

- [ADIRGSL-2170](https://jira.adacta-fintech.com/browse/ADIRGSL-2170): Updated default aa rules values handling.
    Udated rules scripts to treat null db values as false for inversion and ranges bounds inclusion.
    Implemented validation of existing amendments before creation and activation for aa.

- [ADIRGSL-2180](https://jira.adacta-fintech.com/browse/ADIRGSL-2180): Отключить валидации на обязательность прикреплений документов для перехода Проект-Подписан (Оперу).


### Fixed (2 changes)

- [ADIRGSL-1979](https://jira.adacta-fintech.com/browse/ADIRGSL-1979): Постпродажное сопровождение - Журнал заявок:

    * Исправлен тип страхового взноса

- [ADIRGSL-2165](https://jira.adacta-fintech.com/browse/ADIRGSL-2165): После изменения назначения платежа не получается провести автоматическую идентификацию

# 30.0.0-rc1 (2022-10-12)

### Breaking Changes (5 changes)

- [ADIRGSL-1771](https://jira.adacta-fintech.com/browse/ADIRGSL-1771): Implemented credit program comm rule for agent agreements.

    **Deployment notes**
    7.10_006.019.001_125.sql and 7.10_006.019.001_126.sql scripts must be executed before publishing.

- [ADIRGSL-1833](https://jira.adacta-fintech.com/browse/ADIRGSL-1833): 1) Доработка атрибута КСП в клиентских view
    2) Фикс отображения проводок в соответствующих вкладках приложения

    Запустить скрипты после установки

- [ADIRGSL-1972](https://jira.adacta-fintech.com/browse/ADIRGSL-1972): Договоры:

    * Исправлен скрипт обновления таблицы АСС для для выгодоприобретателей

    **Deployment Notes**

    Выполнить вручную скрипты в следующем порядке:

    1. database/sql/migration/ADIRGSL-1972-update-contract-body-beneficiary.sql (если не был выполнен ранее)
    2. database/sql/migration/ADIRGSL-1972-update-quote-beneficiaryId-sat.sql
    3. database/sql/migration/ADIRGSL-1972-update-policy-beneficiaryId-sat.sql

    После тестирования удалить резервную копию: PAS.CONTRACT_BODY_BENEFICIARY_BACKUP

- [ADIRGSL-1979](https://jira.adacta-fintech.com/browse/ADIRGSL-1979): Постпродажное сопровождение - Журнал заявок:

    * Добавлены в грид и отчет атрибуты:

    1. Страховой взнос
    2. Агент
    3. Наименование Банка
    4. Реквизиты банка

    **Deployment Notes**

    Выполнить вручную скрипты в следующем порядке:

    1. database/sql/migration/ADIRGSL-1979-backup-contract-common-body.sql
    2. database/sql/migration/ADIRGSL-1979-backup-universal-document-body.sql
    3. database/sql/migration/ADIRGSL-1979-update-contract-common-body.sql
    4. database/sql/migration/ADIRGSL-1979-update-ud-body-partner.sql
    5. database/sql/migration/ADIRGSL-1979-update-ud-common-body-partner.sql
    6. database/sql/migration/ADIRGSL-1979-update-ud-body-amount.sql
    7. database/sql/migration/ADIRGSL-1979-update-ud-common-body-amount.sql

    После выполнения скриптов выполнить переиндексацию Elasticsearch.

    После тестирования удалить резервные копии, выполнив скрипт:

    1. database/sql/migration/ADIRGSL-1979-remove-backups.sql

- [ADIRGSL-2097](https://jira.adacta-fintech.com/browse/ADIRGSL-2097): Корректировка выгрузки договоров в части учета дочерних.

    Необходима переиндексация ES.


### New Features (38 changes)

- [ADIRGSL-1767](https://jira.adacta-fintech.com/browse/ADIRGSL-1767): Доработка реестра интеграции с SAP - смс для электрополисов.

- [ADIRGSL-1792](https://jira.adacta-fintech.com/browse/ADIRGSL-1792): Перевод договора в Подписан для ОПЕРУ без витрины задач.

- [ADIRGSL-1827](https://jira.adacta-fintech.com/browse/ADIRGSL-1827): Добавлены права андеррайтера для группы Комплаенс (без возможности установить чек-бокс "Ручная корректировка")

- [ADIRGSL-1838](https://jira.adacta-fintech.com/browse/ADIRGSL-1838): Добавление Даты рождения в печатные формы

- [ADIRGSL-1850](https://jira.adacta-fintech.com/browse/ADIRGSL-1850): Implemented combined printout for payment orders.

- [ADIRGSL-1917](https://jira.adacta-fintech.com/browse/ADIRGSL-1917): ОАС_корректировака ПФ_Стань Миллионером.

- [ADIRGSL-1932](https://jira.adacta-fintech.com/browse/ADIRGSL-1932): Добавлена история верификации вложений

- [ADIRGSL-1943](https://jira.adacta-fintech.com/browse/ADIRGSL-1943): Добавлена история верификации вложений

- [ADIRGSL-1950](https://jira.adacta-fintech.com/browse/ADIRGSL-1950): Добавлена роль AttachmentVerificator. Пользователю с такой ролью Витрина Задач открывается с предустановленной галочкой "Верификаторы вложений"

- [ADIRGSL-1986](https://jira.adacta-fintech.com/browse/ADIRGSL-1986): Проводки. НДФЛ

- [ADIRGSL-1997](https://jira.adacta-fintech.com/browse/ADIRGSL-1997): Расширение атрибутов адресных данных.

- [ADIRGSL-2008](https://jira.adacta-fintech.com/browse/ADIRGSL-2008): Добавлен флаг "Лицо без гражданства", изменение валидаций для поля "Гражданство", добавлен триггер Комплаенс "Лицо без гражданства"

- [ADIRGSL-2016](https://jira.adacta-fintech.com/browse/ADIRGSL-2016): Не изменился статус доп.соглашения на расторжение после оплаты

- [ADIRGSL-2029](https://jira.adacta-fintech.com/browse/ADIRGSL-2029): в partyPersonData добавлена строка innerBankId (Внутренний ID контрагента в банке)

- [ADIRGSL-2040](https://jira.adacta-fintech.com/browse/ADIRGSL-2040): Постпродажное сопровождение:

    * Исправлено автозаполнение банковских реквизитов при создании ДС из заявки
    * Добавлен функционал проверки ДС в нефинальном статусе

- [ADIRGSL-2059](https://jira.adacta-fintech.com/browse/ADIRGSL-2059): БФКО_Фин. резерв_изменения мин. суммы премии c 12/10/2022.

- [ADIRGSL-2062](https://jira.adacta-fintech.com/browse/ADIRGSL-2062): Постпродажное сопровождение - Заявка:

    1. Исправлено создание ДС на расторжение в статусе "На рассмотрении группы ОПЕРУ".
    2. Действие "Расторгнуть без выплаты" доступно только для причины расторжения = "Полное досрочное погашение кредита".
    3. При выборе в Заявке действия "Расторгнуть без выплаты" в созданном ДС на расторжение Составляющие выплаты будут равны 0.
    4. Добавлена в Заявку вкладка "История" с компонентами, аналогичными ДС на расторжение.
    5. В ДС на расторжение доблен компонент "Связанные заявки" с ссылкой на Заявку, из которой ДС был создан.
    6. В компоненте "Связанные документы" выводится информация о созданном ДС на расторжение.

- [ADIRGSL-2069](https://jira.adacta-fintech.com/browse/ADIRGSL-2069): Изменено отображение проводок в UI: убран столбец "Дата документа", добавлен столбец "КСП", сделана сортировка по полю "Дата проводки"

- [ADIRGSL-2093](https://jira.adacta-fintech.com/browse/ADIRGSL-2093): Техническая корректировка схемы данных компонента общей информации о контрагенте.

- [ADIRGSL-2094](https://jira.adacta-fintech.com/browse/ADIRGSL-2094): Корректировки по ПФ КСЖ.

- [ADIRGSL-2095](https://jira.adacta-fintech.com/browse/ADIRGSL-2095): Результат тестирования хотфикс 28.0.5.

- [ADIRGSL-2096](https://jira.adacta-fintech.com/browse/ADIRGSL-2096): Updated settings for electro policies on RC env.

- [ADIRGSL-2098](https://jira.adacta-fintech.com/browse/ADIRGSL-2098): Сервис предоставления витрины продуктов:

    * Доработана уникальность при выводе ответа сервиса

- [ADIRGSL-2106](https://jira.adacta-fintech.com/browse/ADIRGSL-2106): Корректировка поиска договоров по номеру:
    - если в поиске есть запятая, ищем по полным номерам, разделенным запятой;
    - если в поиске нет запятой, то ищем по первым символам.

- [ADIRGSL-2107](https://jira.adacta-fintech.com/browse/ADIRGSL-2107): Не все выписки загружаются из 1С прод в АдИншур прод

- [ADIRGSL-2109](https://jira.adacta-fintech.com/browse/ADIRGSL-2109): БФКО_Базис Актив_тестирование инвест параметров 03.10.2022.

- [ADIRGSL-2123](https://jira.adacta-fintech.com/browse/ADIRGSL-2123): Обновление инвест. параметров с 10.10.22.

- [ADIRGSL-2125](https://jira.adacta-fintech.com/browse/ADIRGSL-2125): Зенит_ Закрыть “Базис Инвест” сроком 2 года с 10.10.2022.

- [ADIRGSL-2129](https://jira.adacta-fintech.com/browse/ADIRGSL-2129): БФКО_изменение тарифов в КСЖ потреб.

- [ADIRGSL-2133](https://jira.adacta-fintech.com/browse/ADIRGSL-2133): Настроена возможность добавлять ВП в убыток в статусах: "Частично оплачен", "ОУСВ", "Передано на выплату"

- [ADIRGSL-2141](https://jira.adacta-fintech.com/browse/ADIRGSL-2141): Настройкв КВ для памятки ЦБ для Базис Инвест Зенит.

- [ADIRGSL-2143](https://jira.adacta-fintech.com/browse/ADIRGSL-2143): Changed digital signature service address for prod env.

- [ADIRGSL-2153](https://jira.adacta-fintech.com/browse/ADIRGSL-2153): Обновление инвест. параметров с 12.10.2022.

- [ADIRGSL-2158](https://jira.adacta-fintech.com/browse/ADIRGSL-2158): Выгрузка отчета по договорам - блокировка повторного нажатия кнопки.

- [ADIRGSL-2162](https://jira.adacta-fintech.com/browse/ADIRGSL-2162): Обновление инвест. параметров с 17.10.2022.

- [ADIRGSL-2163](https://jira.adacta-fintech.com/browse/ADIRGSL-2163): Обновление инвест. параметров с 17.10.2022_БФКО.

- [ADIRGSL-662](https://jira.adacta-fintech.com/browse/ADIRGSL-662): Добавлена таблица отображения периода купонов.

- [ADIRGSL-803](https://jira.adacta-fintech.com/browse/ADIRGSL-803): Отключение валидации по просроченным паспортам.


### Fixed (5 changes)

- [ADIRGSL-1686](https://jira.adacta-fintech.com/browse/ADIRGSL-1686): Fixed platform version file.

- [ADIRGSL-2004](https://jira.adacta-fintech.com/browse/ADIRGSL-2004): АВР_Фильтр по строкам акта

- [ADIRGSL-2033](https://jira.adacta-fintech.com/browse/ADIRGSL-2033): Исправлено некорректное сохранение групп продуктов в АВР

- [ADIRGSL-2116](https://jira.adacta-fintech.com/browse/ADIRGSL-2116): Витрина задач:

    * Исправлен функционал назначения исполнителя

- [ADIRGSL-2161](https://jira.adacta-fintech.com/browse/ADIRGSL-2161): Постпродажное сопровождение - Заявка:

    * Исправлен функционал фильтрации причин расторжения

# 29.0.0-rc1 (2022-09-30)

### Breaking Changes (3 changes)

- [ADIRGSL-1871](https://jira.adacta-fintech.com/browse/ADIRGSL-1871): Updated claim rejection printouts.

    **Deployment Notes**
    Contract index must be reindexed.

- [ADIRGSL-1947](https://jira.adacta-fintech.com/browse/ADIRGSL-1947): Доработка отчета по договорам.

    После деплоя необходимо вручную выполнить следующие скрипты:
    database\sql\migration\ADIRGSL-1947-contracts-ass-update.sql
    database\sql\migration\ADIRGSL-1947-contracts-report-fill.sql

- [ADIRGSL-1972](https://jira.adacta-fintech.com/browse/ADIRGSL-1972): Договоры:

    * Добавлены Id для выгодоприобретателей

    **Deployment Notes**

    После деплоя необходимо выполнить вручную скрипты в следующем порядке:

    1. database/sql/migration/ADIRGSL-1972-update-contract-body-beneficiary.sql
    2. database/sql/migration/ADIRGSL-1972-update-quote-beneficiaryId-sat.sql
    3. database/sql/migration/ADIRGSL-1972-update-policy-beneficiaryId-sat.sql

    После тестирования удалить резервную копию: PAS.CONTRACT_BODY_BENEFICIARY_BACKUP


### New Features (31 changes)

- [ADIRGSL-1687](https://jira.adacta-fintech.com/browse/ADIRGSL-1687): Корректировка сортировки загузчика на примере бордеро договоров КСЖ в рамках подготовки к разработке загрузчика орг. структуры.

- [ADIRGSL-1780](https://jira.adacta-fintech.com/browse/ADIRGSL-1780): Added changes info field for agent agreements change amendment.

- [ADIRGSL-1902](https://jira.adacta-fintech.com/browse/ADIRGSL-1902): Updated beneficiary logic.

- [ADIRGSL-1908](https://jira.adacta-fintech.com/browse/ADIRGSL-1908): Корректировка скрипта:
    database\sql\migration\ADIRGSL-1908-contracts-ass-update.sql

- [ADIRGSL-1921](https://jira.adacta-fintech.com/browse/ADIRGSL-1921): Проводки. Выкупные суммы , ДИД

- [ADIRGSL-1938](https://jira.adacta-fintech.com/browse/ADIRGSL-1938): ВВ - создание ВВ при переводе договора в статус "Действует" - откат.

- [ADIRGSL-1941](https://jira.adacta-fintech.com/browse/ADIRGSL-1941): Изменен фильтр номер доовора в журнале договоров: теперь возможен ввод нескольких договоров через запятую

- [ADIRGSL-1942](https://jira.adacta-fintech.com/browse/ADIRGSL-1942): Добавлена выгрузка в Excel витрины задач без галочки "Верификаторы вложений"

- [ADIRGSL-1945](https://jira.adacta-fintech.com/browse/ADIRGSL-1945): В витрине задач изменена последовательность вкладок

- [ADIRGSL-1949](https://jira.adacta-fintech.com/browse/ADIRGSL-1949): Изменены на максимальные значения количества строк по умолчнию в таблицах вложений и таблицах верификатора в витрине задач

- [ADIRGSL-1954](https://jira.adacta-fintech.com/browse/ADIRGSL-1954): В журнал договоров добавлен фильтр по внешнему номеру агентского договора.
    P.S. Необходима реиндексация Elastic Search

- [ADIRGSL-1957](https://jira.adacta-fintech.com/browse/ADIRGSL-1957): Неверная дата проводки по распределению авансового платежа на договор

- [ADIRGSL-1973](https://jira.adacta-fintech.com/browse/ADIRGSL-1973): КСЖ авто РГСБ_ПФ с 01.10.2022.

- [ADIRGSL-1982](https://jira.adacta-fintech.com/browse/ADIRGSL-1982): Постпродажное сопровождение:

    * Скрыты типы расторжений, кроме "Период охлаждения", для КСЖ БФКО с 29.09.2022.

- [ADIRGSL-1990](https://jira.adacta-fintech.com/browse/ADIRGSL-1990): В витрине задач добавлены новые фильтры: “Дата закрытия” и “Возраст страхователя". Фильтр "Дата создания" переименован в "Дата открытия".

- [ADIRGSL-1992](https://jira.adacta-fintech.com/browse/ADIRGSL-1992): Добавлена возможность искать договоры по неполному внешнему номеру - по первым символам.

- [ADIRGSL-1996](https://jira.adacta-fintech.com/browse/ADIRGSL-1996): Обходное решение для загрузки платежа с нецелой суммой: отсутствие суммы в фильтре + валидация на выборе платежа.

- [ADIRGSL-1999](https://jira.adacta-fintech.com/browse/ADIRGSL-1999): Implemented attachments and history for policy fin amendments.

- [ADIRGSL-2003](https://jira.adacta-fintech.com/browse/ADIRGSL-2003): Зенит_Драйвер гаранития 2 года_закрыть с 01.10.2022.

- [ADIRGSL-2004](https://jira.adacta-fintech.com/browse/ADIRGSL-2004): АВР_Фильтр по строкам акта

- [ADIRGSL-2006](https://jira.adacta-fintech.com/browse/ADIRGSL-2006): Исправлены валидации по договорам ИСЖ по электрополисам. Скорректирован текст ошибки по электрополисам.

- [ADIRGSL-2010](https://jira.adacta-fintech.com/browse/ADIRGSL-2010): В АВР убран пункт меню действий перевода АВР в статус "Оплачен / Оплачен"

- [ADIRGSL-2018](https://jira.adacta-fintech.com/browse/ADIRGSL-2018): В АВР на вкладку "Проводки по АВР" добавлены проводки "Распределение платежей"

- [ADIRGSL-2027](https://jira.adacta-fintech.com/browse/ADIRGSL-2027): Отключить всем продавцам возможность заводить договор будущими датами.

- [ADIRGSL-2028](https://jira.adacta-fintech.com/browse/ADIRGSL-2028): Постпродажное оспровождение:

    * Добавлена возможность завести заявку в статусах договоров: «Проект», «Подписан», «Действует».

- [ADIRGSL-2058](https://jira.adacta-fintech.com/browse/ADIRGSL-2058): ADIRGSL-2058: Minor changes and fixes for claim mails printouts.

- [ADIRGSL-2066](https://jira.adacta-fintech.com/browse/ADIRGSL-2066): Зенит_Драйвер гаранития 2 года_отменить закрытие.

- [ADIRGSL-2067](https://jira.adacta-fintech.com/browse/ADIRGSL-2067): БФКО_“Базис Актив” и “Базис Гарант” обновление инвест параметров с 03.10.2022.

- [ADIRGSL-2092](https://jira.adacta-fintech.com/browse/ADIRGSL-2092): Обновление ставок Бонд Репак в Промсвязьбанк РВ с 03.10.22.

- [ADIRGSL-622](https://jira.adacta-fintech.com/browse/ADIRGSL-622): Добавлен функционал редактируемого справочника "Стратегия. Инструменты".

- [ADIRGSL-803](https://jira.adacta-fintech.com/browse/ADIRGSL-803): Валидация для недействительных паспортов контрагентов


### Fixed (5 changes)

- [ADIRGSL-1564](https://jira.adacta-fintech.com/browse/ADIRGSL-1564): Начисление премии по продуктам Базис Инвест БФКО - другой алгоритм

- [ADIRGSL-1935](https://jira.adacta-fintech.com/browse/ADIRGSL-1935): Доработка реестров платежей ТКБ Лэндинг и ТКБ Эквайринг в части суммы для идентификации с банковской выпиской

- [ADIRGSL-1991](https://jira.adacta-fintech.com/browse/ADIRGSL-1991): Проводки по удаленным из акта строкам не должны формироваться

- [ADIRGSL-2017](https://jira.adacta-fintech.com/browse/ADIRGSL-2017): Не сформировались проводки по АВР

- [ADIRGSL-2084](https://jira.adacta-fintech.com/browse/ADIRGSL-2084): Исправлена ошибка загрузки реестров платежей

# 28.0.0-rc1 (2022-09-21)

### Breaking Changes (4 changes)

- [ADIRGSL-1632](https://jira.adacta-fintech.com/browse/ADIRGSL-1632): Контрагенты:

    * Исправлены таблицы и скрипты АСС почты и телефонов.

    **Deployment Notes**

    После деплоя необходимо выполнить вручную скрипты:

    1. database/sql/migration/ADIRGSL-1632-update-party-email-sat.sql
    2. database/sql/migration/ADIRGSL-1632-update-party-phone-sat.sql

- [ADIRGSL-1857](https://jira.adacta-fintech.com/browse/ADIRGSL-1857): Добавлен признак персонального менеджера на карточку сотрудника, в поисковик договоров и в поисковик поставщиков услуг.

    Необходима переиндексация ES по поставщикам услуг.

- [ADIRGSL-1908](https://jira.adacta-fintech.com/browse/ADIRGSL-1908): Переработка отчета по договорам.

    После паблиша необходимо выполнить скрипты:
    database\sql\migration\ADIRGSL-1908-contracts-ass-update.sql
    database\sql\migration\ADIRGSL-1908-contracts-report-fill.sql

- [ADIRGSL-1908](https://jira.adacta-fintech.com/browse/ADIRGSL-1908): Создание JOB-a для заполнения отчета по договорам.

    После паблиша необходимо выполнить скрипты:
    database\sql\migration\ADIRGSL-1923-create-report-job.sql

    ОБЯЗАТЕЛЬНО! Необходимо указать корректную базу данных в значении параметра @database_name.


### New Features (21 changes)

- [ADIRGSL-1721](https://jira.adacta-fintech.com/browse/ADIRGSL-1721): Витрина задач:

    * Добавлен функционал выбора пользователя для назначении исполнителя по задаче

- [ADIRGSL-1782](https://jira.adacta-fintech.com/browse/ADIRGSL-1782): Корректировка АКБАРС Стратегия на пять.

- [ADIRGSL-1860](https://jira.adacta-fintech.com/browse/ADIRGSL-1860): Постпродажное сопровождение:

    * Настроено автоматическое создание ДС на расторжение при переводе сущности «Заявка» в один из следующих статусов:
      * «Согласовано»
      * «Расторжение»

- [ADIRGSL-1875](https://jira.adacta-fintech.com/browse/ADIRGSL-1875): ОАС_возможность менять инициатора.
    Роль: AllowInitiatorChange.

- [ADIRGSL-1902](https://jira.adacta-fintech.com/browse/ADIRGSL-1902): Implemented chnge types logic for policy non financial change amendment.

- [ADIRGSL-1903](https://jira.adacta-fintech.com/browse/ADIRGSL-1903): Переработан шаблон выгрузки строк акта
    Исправлены ошибки в выводе данных в строках акта
    Исправлены синтаксические ошибки в заголовках на форме

- [ADIRGSL-1906](https://jira.adacta-fintech.com/browse/ADIRGSL-1906): АВР. Правка КВ

- [ADIRGSL-1915](https://jira.adacta-fintech.com/browse/ADIRGSL-1915): Implemented document flow for non financial change policy amendments.

- [ADIRGSL-1917](https://jira.adacta-fintech.com/browse/ADIRGSL-1917): ОАС_корректировака ПФ_Стань Миллионером.

- [ADIRGSL-1918](https://jira.adacta-fintech.com/browse/ADIRGSL-1918): БФКО_Фин. резерв_Заявление на страхование.

- [ADIRGSL-1926](https://jira.adacta-fintech.com/browse/ADIRGSL-1926): ОАС_Базис инвест_Базис гарант_корректировка деклараций.

- [ADIRGSL-1928](https://jira.adacta-fintech.com/browse/ADIRGSL-1928): БФКО_финансовый резерв_изменение согласующего подразделения.

- [ADIRGSL-1935](https://jira.adacta-fintech.com/browse/ADIRGSL-1935): Доработка реестров платежей ТКБ Лэндинг и ТКБ Эквайринг в части суммы для идентификации с банковской выпиской

- [ADIRGSL-1938](https://jira.adacta-fintech.com/browse/ADIRGSL-1938): ВВ - создание ВВ при переводе договора в статус "Действует".

- [ADIRGSL-1939](https://jira.adacta-fintech.com/browse/ADIRGSL-1939): ВВ - добавить фильтры в витрину задач для ВВ.

- [ADIRGSL-1946](https://jira.adacta-fintech.com/browse/ADIRGSL-1946): Доработки VIEW для LDWH.

- [ADIRGSL-1952](https://jira.adacta-fintech.com/browse/ADIRGSL-1952): ВВ - пополнить справочник ошибок верификации.

- [ADIRGSL-1961](https://jira.adacta-fintech.com/browse/ADIRGSL-1961): Корректировка маппинга программ в выгрузке в SAP.

- [ADIRGSL-1965](https://jira.adacta-fintech.com/browse/ADIRGSL-1965): Отключение проверки действительности паспорта для КСЖ РГСБ.

- [ADIRGSL-1970](https://jira.adacta-fintech.com/browse/ADIRGSL-1970): Implemented additional validations for epolicy verification.

- [ADIRGSL-1974](https://jira.adacta-fintech.com/browse/ADIRGSL-1974): Атрибуты субагента на карточке сотрудника.


### Fixed (4 changes)

- [ADIRGSL-1212](https://jira.adacta-fintech.com/browse/ADIRGSL-1212): Техническое исправление скрипта на изменение данных.

- [ADIRGSL-1564](https://jira.adacta-fintech.com/browse/ADIRGSL-1564): Invoiced commission storno

- [ADIRGSL-1783](https://jira.adacta-fintech.com/browse/ADIRGSL-1783): Постпродажное сопровождение:

    * Исправлено открытие ПФ "ИП об отказе в возврате взноса" при кейсе с расторжением договора.

- [ADIRGSL-1931](https://jira.adacta-fintech.com/browse/ADIRGSL-1931): Платежи. Сумма реестра СБ РФ

# 27.0.0-rc1 (2022-09-13)

### Breaking Changes (4 changes)

- [ADIRGSL-1632](https://jira.adacta-fintech.com/browse/ADIRGSL-1632): Обертка функции по полисам во вью.
    Добавлен сателит по выгодоприобретателям для полисов.
    Добавлен сателит по телефонам и почтам для контрагентов.

    **Deployment Notes**

    После деплоя необходимо выполнить вручную скрипты:

    1. database/sql/migration/ADIRGSL-1632-update-quote-sat.sql
    2. database/sql/migration/ADIRGSL-1632-update-policy-sat.sql
    3. database/sql/migration/ADIRGSL-1632-update-quote-beneficiary-sat.sql
    4. database/sql/migration/ADIRGSL-1632-update-policy-beneficiary-sat.sql
    5. database/sql/migration/ADIRGSL-1632-update-party-email-sat.sql
    6. database/sql/migration/ADIRGSL-1632-update-party-phone-sat.sql

- [ADIRGSL-1747](https://jira.adacta-fintech.com/browse/ADIRGSL-1747): Поиск контрагента:

    * Доработан сервис поиска контрагента по документу.
    * Доработан UI поиска контрагента по документу.

    **Deployment Notes**

    После деплоя необходимо выполнить вручную скрипт:

    * database/sql/migration/ADIRGSL-1747-update-party-common-body.sql

    Требуется переиндексация Elasticsearch после выполнения скрипта (adinsure_index_partysearchdocument).

- [ADIRGSL-1829](https://jira.adacta-fintech.com/browse/ADIRGSL-1829): Во view добавлен столбец "Группа продукта"

    **Deployment Notes**

    После деплоя необходимо выполнить вручную скрипты:

    1. database/sql/migration/impl_ldwh_zds_algl_2.sql
    2. database/sql/migration/impl_ldwh_zds_algl_3.sql

- [ADIRGSL-1859](https://jira.adacta-fintech.com/browse/ADIRGSL-1859): Постпродажное сопровождение - Заявка на расторжение:

    * Настроен рабочий календарь.
    * Настроено ограничение на выбор Причины расторжения = «Период охлаждения» в соответствии с условиями договора (правилами продукта).

    **Deployment Notes**

    * После деплоя необходимо выполнить вручную скрипт: database/sql/migration/ADIRGSL-1859-update-calendar-rules.sql

    * Выполнить переиндексацию Elasticsearch.


### New Features (16 changes)

- [ADIRGSL-1117](https://jira.adacta-fintech.com/browse/ADIRGSL-1117): АВР. Расширение атрибутного состава строк акта

- [ADIRGSL-1574](https://jira.adacta-fintech.com/browse/ADIRGSL-1574): Корректировка прав видимости в поисковике договоров для GeneralBackOffice.

- [ADIRGSL-1676](https://jira.adacta-fintech.com/browse/ADIRGSL-1676): Изменено отображение проводок на соответствующих вкладках (в договорах, АВР и т.д.)

- [ADIRGSL-1745](https://jira.adacta-fintech.com/browse/ADIRGSL-1745): Разработаны сервисы:

    * Предоставления витрины продуктов.
    * Маппинг продуктов и рисков.

- [ADIRGSL-1767](https://jira.adacta-fintech.com/browse/ADIRGSL-1767): Доработка реестра интеграции с SAP - смс для электрополисов. Код добавлен, но закомментирован, т.к. ждем итогового решения.

- [ADIRGSL-1824](https://jira.adacta-fintech.com/browse/ADIRGSL-1824): Заявка на расторжение постпродажного сопровождения:

    * Отключена для сотрудников ОПЕРУ необходимость назначения задачи на себя в статусе "На срассмотрении СК" для работы с документом.
    * Заполнение атрибута "Банковские реквизиты контрагента" обязательно только для Причины расторжения = "Период охлаждения".

    Изменён период охлаждения на 14 дней (с 30 дней) в productConfiguration для всех продуктов КСЖ (Гарант защиты, Защита кредита, Защита кредита 2, Моя защита, Моя стабильность, ДМС).

- [ADIRGSL-1864](https://jira.adacta-fintech.com/browse/ADIRGSL-1864): Implemented basic configuration for policy change amendments.

- [ADIRGSL-1874](https://jira.adacta-fintech.com/browse/ADIRGSL-1874): Платежи. Источники банковской выписки/реестра

- [ADIRGSL-1878](https://jira.adacta-fintech.com/browse/ADIRGSL-1878): Корректировка прав видимости в поисковике договоров для GeneralBackOffice.

- [ADIRGSL-1883](https://jira.adacta-fintech.com/browse/ADIRGSL-1883): LDWH ZLOSS: изменение формата данных.

- [ADIRGSL-1890](https://jira.adacta-fintech.com/browse/ADIRGSL-1890): Корректировка п.13 деклараций по Стань миллионером.

- [ADIRGSL-1895](https://jira.adacta-fintech.com/browse/ADIRGSL-1895): Валидация на заявку в статусе "Запрос информации".

- [ADIRGSL-1904](https://jira.adacta-fintech.com/browse/ADIRGSL-1904): АВР. Восстановление (не обновлять статус других строк)

- [ADIRGSL-1909](https://jira.adacta-fintech.com/browse/ADIRGSL-1909): Гарант Защиты. Корректировка зависимости п.1 иных условий от программы страхования.

- [ADIRGSL-1910](https://jira.adacta-fintech.com/browse/ADIRGSL-1910): КСЖ авто_увеличение страховой суммы c 19/09/2022.

- [ADIRGSL-1912](https://jira.adacta-fintech.com/browse/ADIRGSL-1912): Изменёно определение признака "реестр" при загрузке платежа


### Fixed (8 changes)

- [ADIRGSL-1212](https://jira.adacta-fintech.com/browse/ADIRGSL-1212): Fix KPK and BlackList URLs for RC environment.

- [ADIRGSL-1778](https://jira.adacta-fintech.com/browse/ADIRGSL-1778): Исправлена выгрузка отчета по договорам с фильтрами по форме выпуска и признаком реинвестирования

- [ADIRGSL-1869](https://jira.adacta-fintech.com/browse/ADIRGSL-1869): Исправлено отображение комиссий на графике платежей в договоре

- [ADIRGSL-1879](https://jira.adacta-fintech.com/browse/ADIRGSL-1879): Исправлено автозаполнение АВР с болим количеством строк (>2100)

- [ADIRGSL-1888](https://jira.adacta-fintech.com/browse/ADIRGSL-1888): Проводки. Начисление КВ Оценка (НСЖ. Стратегия на пять)

- [ADIRGSL-1897](https://jira.adacta-fintech.com/browse/ADIRGSL-1897): АВР. Восстановление строк в акте

- [ADIRGSL-1907](https://jira.adacta-fintech.com/browse/ADIRGSL-1907): Выгрузка договоров должна быть доступна только для пользователя Administrator.

- [ADIRGSL-1911](https://jira.adacta-fintech.com/browse/ADIRGSL-1911): Исправлена загрузка платежа IBOX в части извлечения имени плательщика

# 26.0.0-rc1 (2022-09-06)

### Breaking Changes (1 changes)

- [ADIRGSL-1472](https://jira.adacta-fintech.com/browse/ADIRGSL-1472): Implemented client request and rejection printouts for claims.

    **Deployment notes**
    Contract index must be reindexed.


### New Features (13 changes)

- [ADIRGSL-1522](https://jira.adacta-fintech.com/browse/ADIRGSL-1522): UI-корректировка поисковика договоров.

- [ADIRGSL-1543](https://jira.adacta-fintech.com/browse/ADIRGSL-1543): Оптимизирована выгрузка журнала договоров.

- [ADIRGSL-1793](https://jira.adacta-fintech.com/browse/ADIRGSL-1793): Начисление премии по продуктам Базис Инвест БФКО - другой алгоритм

- [ADIRGSL-1798](https://jira.adacta-fintech.com/browse/ADIRGSL-1798): In case of cancellation amendment with reason `byClientCoolOff`, we produce storno of premium increase transactions (instead of premium decrease transaction).

- [ADIRGSL-1810](https://jira.adacta-fintech.com/browse/ADIRGSL-1810): posting on cancellation amendment configuration clean up.

- [ADIRGSL-1868](https://jira.adacta-fintech.com/browse/ADIRGSL-1868): Fixed translations for product group component.

- [ADIRGSL-1872](https://jira.adacta-fintech.com/browse/ADIRGSL-1872): Зенит. Драйвер гаранития 2 года. Обновление деклараций.

- [ADIRGSL-1873](https://jira.adacta-fintech.com/browse/ADIRGSL-1873): Добавлен фильтр Банковский счет в Журнал платежей.

- [ADIRGSL-1876](https://jira.adacta-fintech.com/browse/ADIRGSL-1876): Права на просмотр блока КВ ОЦЕНКА для бэк-офиса.

- [ADIRGSL-1877](https://jira.adacta-fintech.com/browse/ADIRGSL-1877): АкБарс_Стань миллионером_тестирование 05.09.2022.

- [ADIRGSL-1880](https://jira.adacta-fintech.com/browse/ADIRGSL-1880): Зенит. Драйвер гаранития 2 года. Обновление деклараций.

- [ADIRGSL-1882](https://jira.adacta-fintech.com/browse/ADIRGSL-1882): Продукт Демо. Добавление валют, отличных от RUR.

- [ADIRGSL-662](https://jira.adacta-fintech.com/browse/ADIRGSL-662): Добавлен импорт данных для функционала редактируемых таблиц.


### Fixed (1 changes)

- [ADIRGSL-1624](https://jira.adacta-fintech.com/browse/ADIRGSL-1624): Платежи. ТКБ. Формат реестра эквайринг

# 25.0.0-rc1 (2022-09-01)

### Breaking Changes (1 changes)

- [ADIRGSL-1814](https://jira.adacta-fintech.com/browse/ADIRGSL-1814): LDWH queries were modified for some attributes. It is necessary to execute again the following scripts:
    * `database\sql\migration\get_transformed_transactions.sql`
    * `database\sql\migration\impl_ldwh_zds_algl_2.sql`
    * `database\sql\migration\impl_ldwh_zds_algl_3.sql`


### New Features (20 changes)

- [ADIRGSL-1701](https://jira.adacta-fintech.com/browse/ADIRGSL-1701): Изменена проверка на дубли при создании АВР. Теперь дубли ищутся только среди АВР в статусах "Проект/Черновик" и "Проект/На согласовании"

- [ADIRGSL-1782](https://jira.adacta-fintech.com/browse/ADIRGSL-1782): АКБАРС. Стратегия на пять.

- [ADIRGSL-1784](https://jira.adacta-fintech.com/browse/ADIRGSL-1784): Добавлен столбец статуса договора в список строк содержимого АВР

- [ADIRGSL-1793](https://jira.adacta-fintech.com/browse/ADIRGSL-1793): БФКО. Стратегия на пять. Реинвестирование.

- [ADIRGSL-1796](https://jira.adacta-fintech.com/browse/ADIRGSL-1796): В текст уведомления о поступлении задачи в группу по заявке/договору добавлено указание номера заявки/договора и партнера.

- [ADIRGSL-1828](https://jira.adacta-fintech.com/browse/ADIRGSL-1828): Доработка полезной информации для ПСБ. Добавление новых разделов.

- [ADIRGSL-1830](https://jira.adacta-fintech.com/browse/ADIRGSL-1830): БФКО_Финансовый резерв_обновление тарифов.

- [ADIRGSL-1832](https://jira.adacta-fintech.com/browse/ADIRGSL-1832): Корректировка наименования и адреса партнера в анкете фин. грамотности для ОАС.

- [ADIRGSL-1834](https://jira.adacta-fintech.com/browse/ADIRGSL-1834): ПСБ_ изменение ставок_Драйвер гарантия Прайвет.

- [ADIRGSL-1836](https://jira.adacta-fintech.com/browse/ADIRGSL-1836): Implemented transactions for commission decrease on cancellation amendment.

- [ADIRGSL-1839](https://jira.adacta-fintech.com/browse/ADIRGSL-1839): Отключение валидации на пол выгодоприобретателя на договоре.

- [ADIRGSL-1840](https://jira.adacta-fintech.com/browse/ADIRGSL-1840): Настройка продукта "Драйвер Гарантия" в Зенит (масс).

- [ADIRGSL-1844](https://jira.adacta-fintech.com/browse/ADIRGSL-1844): ОАС_тестирование 30.08.2022.

- [ADIRGSL-1847](https://jira.adacta-fintech.com/browse/ADIRGSL-1847): Язык по дефолту на стартовой странице был изменён на русский.

- [ADIRGSL-1849](https://jira.adacta-fintech.com/browse/ADIRGSL-1849): Реестр платежей ТКБ Терминал. Ошибка загрузки.

- [ADIRGSL-1851](https://jira.adacta-fintech.com/browse/ADIRGSL-1851): Корректировка маппинга ПФ для БФКО.

- [ADIRGSL-1852](https://jira.adacta-fintech.com/browse/ADIRGSL-1852): ОАС_Заявление на страхование.

- [ADIRGSL-1855](https://jira.adacta-fintech.com/browse/ADIRGSL-1855): Доработка текста внутреннего уведомления для УКСП.

- [ADIRGSL-1856](https://jira.adacta-fintech.com/browse/ADIRGSL-1856): Маппинг продукта Драйвер Гарантия. Для партнера Зенит.

- [ADIRGSL-1858](https://jira.adacta-fintech.com/browse/ADIRGSL-1858): Тестирование Стань миллионер Акцепт.


### Fixed (2 changes)

- [ADIRGSL-1212](https://jira.adacta-fintech.com/browse/ADIRGSL-1212): Scheduler configs fixed for RC env.

- [ADIRGSL-1622](https://jira.adacta-fintech.com/browse/ADIRGSL-1622): Добавлен импорт реестров по формату ТКБ Лэндинг и ТКБ Эквайринг

# 24.0.0-rc1 (2022-08-26)

### Breaking Changes (1 changes)

- [ADIRGSL-1388](https://jira.adacta-fintech.com/browse/ADIRGSL-1388): Исправлена обертка функции по убыткам (LDWH ZLOSS) во вью, после изменения analytical subsystem по убыткам.

    **Deployment Notes**

    После деплоя необходимо выполнить вручную скрипт: migration/impl_ldwh_zloss.sql


### New Features (21 changes)

- [ADIRGSL-1212](https://jira.adacta-fintech.com/browse/ADIRGSL-1212): Added changelog to deployment package.

- [ADIRGSL-1387](https://jira.adacta-fintech.com/browse/ADIRGSL-1387): Доработка полезной информации:
        - ссылки в разбивке по партнерам и пунктам можно посмотреть в файле configuration\@config-rgsl\life-insurance\lib\infoViewConfiguration.xlsx
        - файлы лежат на сервере в папке E:\AdInsure\server\wwwroot\documents

- [ADIRGSL-1618](https://jira.adacta-fintech.com/browse/ADIRGSL-1618): Добавлен импорт реестров по формату ibox эквайринг

- [ADIRGSL-1619](https://jira.adacta-fintech.com/browse/ADIRGSL-1619): Добавлен импорт реестров по формату ВТБ

- [ADIRGSL-1620](https://jira.adacta-fintech.com/browse/ADIRGSL-1620): Добавлен импорт реестров по формату РНКО

- [ADIRGSL-1621](https://jira.adacta-fintech.com/browse/ADIRGSL-1621): Добавлен импорт реестров по формату СБ РФ
    Произведён рефакторинг кода: информация о форматах файлов и лоадерах теперь расположена в одной структуре.

- [ADIRGSL-1623](https://jira.adacta-fintech.com/browse/ADIRGSL-1623): Добавлен импорт реестров по формату ТКБ Терминал

- [ADIRGSL-1669](https://jira.adacta-fintech.com/browse/ADIRGSL-1669): Added security code length validation.

- [ADIRGSL-1727](https://jira.adacta-fintech.com/browse/ADIRGSL-1727): Implemented default claim amounts calculation based on rules.

- [ADIRGSL-1800](https://jira.adacta-fintech.com/browse/ADIRGSL-1800): Доработка реестра интеграции с SAP - инвест. параметры продуктов Базис Актив и Базис Актив Премиум.

- [ADIRGSL-1803](https://jira.adacta-fintech.com/browse/ADIRGSL-1803): Маппинг продуктов для агентской сети ОАС.

- [ADIRGSL-1804](https://jira.adacta-fintech.com/browse/ADIRGSL-1804): Роль ExcludeERCP2 для ПСБ ранее исключала только продукт ERCP2, теперь будет исключать также и продукты 'IDG3', 'IDG5', 'IDG7', 'IDG10', 'IDGP3', 'IDGP5', 'IDGP7', 'IDGP10', 'IBA3', 'IBA5', 'IBAP3', 'IBAP5'.

- [ADIRGSL-1805](https://jira.adacta-fintech.com/browse/ADIRGSL-1805): Изменение тарифа в КСЖ "Защита кредита" КСЖ БФКО с 01.09.2022.

- [ADIRGSL-1807](https://jira.adacta-fintech.com/browse/ADIRGSL-1807): Корректировки по результату тестирования продуктов ОАС.

- [ADIRGSL-1811](https://jira.adacta-fintech.com/browse/ADIRGSL-1811): Рефакторинг обязательности анкеты ФГ при подписании договора.

- [ADIRGSL-1813](https://jira.adacta-fintech.com/browse/ADIRGSL-1813): Updated policy related documents script.

- [ADIRGSL-1819](https://jira.adacta-fintech.com/browse/ADIRGSL-1819): Акцепт_ошибка в Анкете финансовой грамотности.

- [ADIRGSL-1820](https://jira.adacta-fintech.com/browse/ADIRGSL-1820): Финансовый резерв. Расчет СС по ИЛП ВВ и ИНС ВВ.

- [ADIRGSL-1821](https://jira.adacta-fintech.com/browse/ADIRGSL-1821): Исправлено появление ошибки при переходе из витрины задач в задачу верификации.

- [ADIRGSL-1822](https://jira.adacta-fintech.com/browse/ADIRGSL-1822): Корректировка коэффициента для риска Потеря работы по продукту Моя стабильность.

- [ADIRGSL-1823](https://jira.adacta-fintech.com/browse/ADIRGSL-1823): Восстановление конфигурации деклараций для БИ БФКО.


### Fixed (3 changes)

- [ADIRGSL-1667](https://jira.adacta-fintech.com/browse/ADIRGSL-1667): Добавлен новый функционал для "Печатные формы_особые условия"

- [ADIRGSL-1700](https://jira.adacta-fintech.com/browse/ADIRGSL-1700): Исправлена "Ошибка по эл полисам в случае прикрепления документов банка_ПРОДУКТИВ"

- [ADIRGS-1809](https://jira.adacta-fintech.com/browse/ADIRGS-1809): Изменение правил видимости печатной офрмы в период охлаждения

# 23.0.0-rc1 (2022-08-23)

### Breaking Changes (4 changes)

- [ADIRGSL-1690](https://jira.adacta-fintech.com/browse/ADIRGSL-1690): Постпродажное сопровождение:

    * Настроен журнал заявок
    * Добавлены раздел Отчеты по заявкам и настроен экспорт реестра для периода охлаждения

    * Требуется выполнить скрипты после паблиша по порядку:
      1. database\sql\migration\ADIRGSL-1690-update-contract-common-body.sql
      2. database\sql\migration\ADIRGSL-1690-update-universal-document-requests-body.sql
      3. database\sql\migration\ADIRGSL-1690-update-ud-requests-common-body

    * После выполнения скриптов выполнить переиндексацию Elasticsearch.

- [ADIRGSL-1729](https://jira.adacta-fintech.com/browse/ADIRGSL-1729): Корректировка атрибутов для мигрированных контрагентов. Номер адреса САП разбит на 3.

    Удален атрибут:
    * addressNumberSAPAlice

    Добавлены атрибуты:
    * addressNumberSAPAliceR - Адрес регистрации
    * addressNumberSAPAliceF - Адрес фактический (проживания)
    * addressNumberSAPAliceP - Адрес корреспонденции

    После паблиша необходимо выполнить миграционный скрипт:
    database\sql\migration\ADIRGSL-1729-parties-update.sql

- [ADIRGSL-1770](https://jira.adacta-fintech.com/browse/ADIRGSL-1770): Transaction for bank statement item import with DebtroBankAccount = `40701810701700000301` is now classified as product group = `credit`.

    `GET_TRANSACTIONS_VIEW` was modified. Migration script `\database\sql\migration\get_transformed_transactions.sql` should be executed.

- [ADIRGSL-1791](https://jira.adacta-fintech.com/browse/ADIRGSL-1791): Updated ASS model for claims.

    Updated data deletion script

    **Deployment notes**

    BEFORE PUBLISHING:

    7.10_006.019.001_066.sql schema and 7.10_006.019.001_067.sql data scripts must be executed.
    Claim index must be reindexed.

    AFTER PUBLISHING:

    ADIRGSL-1791-create-ass-indexes.sql migration script must be executed.


### New Features (28 changes)

- [ADIRGSL-1405](https://jira.adacta-fintech.com/browse/ADIRGSL-1405): Возможность печати правил страхования.

- [ADIRGSL-1509](https://jira.adacta-fintech.com/browse/ADIRGSL-1509): Стань миллионером для ОАС.

- [ADIRGSL-1552](https://jira.adacta-fintech.com/browse/ADIRGSL-1552): Changed related documents script for policies to include claims.

- [ADIRGSL-1564](https://jira.adacta-fintech.com/browse/ADIRGSL-1564): Начисление премии и КВ по продуктам Базис Инвест БФКО - другой алгоритм

- [ADIRGSL-1571](https://jira.adacta-fintech.com/browse/ADIRGSL-1571): Добавление поля "Пол" + валидация обязательности заполнения для выгодоприобретателя

- [ADIRGSL-1577](https://jira.adacta-fintech.com/browse/ADIRGSL-1577): Initial implementation of claims administration view.

- [ADIRGSL-1662](https://jira.adacta-fintech.com/browse/ADIRGSL-1662): Добавлена печатная форма "Акцепт_заявление на выплату ДИД"

- [ADIRGSL-1675](https://jira.adacta-fintech.com/browse/ADIRGSL-1675): Отображение проводок добавлено на форму АВР.
    В самой форме отображения проводок добавлены столбцы "Признак сторно" и "GL счет", а также сделана группировка по полям с суммированием столбца "Сумма проводки"

- [ADIRGSL-1685](https://jira.adacta-fintech.com/browse/ADIRGSL-1685): Добавлена Печатные формы_Стань миллионером для ОАС

- [ADIRGSL-1693](https://jira.adacta-fintech.com/browse/ADIRGSL-1693): 1) По включённым и исключённым из АВР продуктам добавлен фильтр по группе.
    2) Изменён порядок загрузки при импорте тестовых данных: это позволяет сделать разными код сервис-провайдера и код party, что в свою очередь позволяет выявить ошибки, когда эти два кода перепутаны.

- [ADIRGSL-1743](https://jira.adacta-fintech.com/browse/ADIRGSL-1743): Маппинг продукта Драйвер Гарантия. Для партнера ПСБ РВ (прайвет).

- [ADIRGSL-1757](https://jira.adacta-fintech.com/browse/ADIRGSL-1757): Отключение валидаций для сервиса загрузки контрагентов для миграции.

- [ADIRGSL-1762](https://jira.adacta-fintech.com/browse/ADIRGSL-1762): Загрузчик пользователей для УАС.
    Группа: Продавец ОАС
    Роли: AccumulatedLifeOASMass, InvestmentLifeOASMass

- [ADIRGSL-1774](https://jira.adacta-fintech.com/browse/ADIRGSL-1774): New contract number format was added for parsing for auto allocation process.

- [ADIRGSL-1779](https://jira.adacta-fintech.com/browse/ADIRGSL-1779): ПСБ Базис Актив - переименование полного описания БА.

- [ADIRGSL-1783](https://jira.adacta-fintech.com/browse/ADIRGSL-1783): Постпродажное сопровождение:

    * Настроена ПФ "ИП об отказе в возврате взноса" в сущности заявки на расторжение в статусе "Расторжение без выплаты".

- [ADIRGSL-1785](https://jira.adacta-fintech.com/browse/ADIRGSL-1785): КСЖ. Актуализация тарифов по продукту "Моя стабильность" и "Защита кредита" с 22.08.2022.

- [ADIRGSL-1786](https://jira.adacta-fintech.com/browse/ADIRGSL-1786): Базис Актив_тестирование 18.08.2022.

- [ADIRGSL-1787](https://jira.adacta-fintech.com/browse/ADIRGSL-1787): ПСБ Драйвер Гарантия (масс и ОРС) правки в декларации.

- [ADIRGSL-1788](https://jira.adacta-fintech.com/browse/ADIRGSL-1788): БФКО-Базис Актив.

- [ADIRGSL-1790](https://jira.adacta-fintech.com/browse/ADIRGSL-1790): ПСБ_Драйвер Гарантия 18.08.2022.

- [ADIRGSL-1794](https://jira.adacta-fintech.com/browse/ADIRGSL-1794): ПСБ РВ и ПСБ драйвер гарантия ПСБ Базис Актив минорные замечания.

- [ADIRGSL-1795](https://jira.adacta-fintech.com/browse/ADIRGSL-1795): ПСБ перенос даты запуска Драйвер Гарантия для ПСБ Пайвет на 02/09/2022.

- [ADIRGSL-1798](https://jira.adacta-fintech.com/browse/ADIRGSL-1798): Implemented premium decrease transactions on cancellation amendment.

- [ADIRGSL-957](https://jira.adacta-fintech.com/browse/ADIRGSL-957): Базис Инвест для ОАС.

- [ADIRGSL-958](https://jira.adacta-fintech.com/browse/ADIRGSL-958): Добавлена Печатные формы_Базис Инвест для ОАС

- [ADIRGSL-961](https://jira.adacta-fintech.com/browse/ADIRGSL-961): Базис Гарант для ОАС.

- [ADIRGSL-962](https://jira.adacta-fintech.com/browse/ADIRGSL-962): Добавлена Печатные формы_Базис Гарант для ОАС


### Fixed (7 changes)

- [ADIRGSL-1739](https://jira.adacta-fintech.com/browse/ADIRGSL-1739): ПСБ Драйвер Гарантия масс и ОРС правки в декларации

- [ADIRGSL-1754](https://jira.adacta-fintech.com/browse/ADIRGSL-1754): Изменения в продукт "ПСБ Прайвет «Драйвер Гарантия» на срок 2 и 3 года"

- [ADIRGSL-1759](https://jira.adacta-fintech.com/browse/ADIRGSL-1759): Правки заявленые "БФКО тестирование 16.08.2022"

- [ADIRGSL-1768](https://jira.adacta-fintech.com/browse/ADIRGSL-1768): Правки после "Зенит_тестирование16.08.2022"

- [ADIRGSL-1776](https://jira.adacta-fintech.com/browse/ADIRGSL-1776): Правки в печатной форме по результатам: "Печатка заявления в период охлаждения для КСЖ РГСБ и БФКО актуальна на 17.08"

- [ADIRGSL-1777](https://jira.adacta-fintech.com/browse/ADIRGSL-1777): Правки по результатам тестирования

- [ADIRGSL-1797](https://jira.adacta-fintech.com/browse/ADIRGSL-1797): Внесены правки по результатам тестирования

# 22.0.0-rc1 (2022-08-15)

### Breaking Changes (4 changes)

- [ADIRGSL-1641](https://jira.adacta-fintech.com/browse/ADIRGSL-1641): Изменен VIEW для отобрахения проводок.
    Скрипт нужно запустить вручную.

- [ADIRGSL-1690](https://jira.adacta-fintech.com/browse/ADIRGSL-1690): Заявка на расторжение:

    * Доработаны замечания выделенные бирюзовым цветом в пунктах ФД:
      * 1.1 Атрибуты
      * 1.2 Статусная модель
      * 1.3 Вложения
      * 1.4 Комментарии
      * 1.6 Валидации

    * Требуется переиндексация ES Contract (adinsure_index_contract).

- [ADIRGSL-1716](https://jira.adacta-fintech.com/browse/ADIRGSL-1716): Datafix. Восстановлен Payment Plan для договоров.
    Необходимо выполнить скрипт ADIRGSL-1716-restore-payment-plan после паблиша

- [ADIRGSL-1728](https://jira.adacta-fintech.com/browse/ADIRGSL-1728): Корректировка признака isLife.


### New Features (24 changes)

- [ADIRGSL-1338](https://jira.adacta-fintech.com/browse/ADIRGSL-1338): Добавлено "костыльное" решение по обработке нетиповых строк в реестре платежей csv.

- [ADIRGSL-1468](https://jira.adacta-fintech.com/browse/ADIRGSL-1468): Стратегия на пять - риски для андеррайтера.

- [ADIRGSL-1471](https://jira.adacta-fintech.com/browse/ADIRGSL-1471): Таблица. Изменение КВ Оценка

- [ADIRGSL-1589](https://jira.adacta-fintech.com/browse/ADIRGSL-1589): В график платежей на договоре добавлены столбцы "Взнос оплачен полностью", "Сумма недоплаты", "Сумма переплаты"

- [ADIRGSL-1616](https://jira.adacta-fintech.com/browse/ADIRGSL-1616): В журнал строк АВР добавлены новые фильтры и возможность экспорта журнала в Excel

- [ADIRGSL-1664](https://jira.adacta-fintech.com/browse/ADIRGSL-1664): Акцепт. Стань миллионером.

- [ADIRGSL-1668](https://jira.adacta-fintech.com/browse/ADIRGSL-1668): Печатная форма продукта "Базис Актив"

- [ADIRGSL-1672](https://jira.adacta-fintech.com/browse/ADIRGSL-1672): Считаются большим платежом-реестром все платежи, которые
    1) которые поступили на счет 40701810438000001404
    2) назначение которых содержит "//реестр//"
    3) назначение которых содержит "Оплата страховой премии по АД № 3-100930"

- [ADIRGSL-1689](https://jira.adacta-fintech.com/browse/ADIRGSL-1689): ПФ - Заявление на расторжение для КСЖ

- [ADIRGSL-1694](https://jira.adacta-fintech.com/browse/ADIRGSL-1694): Переименование ИСЖ и НСЖ вкладки.

- [ADIRGSL-1696](https://jira.adacta-fintech.com/browse/ADIRGSL-1696): АВР. Удаление строк из акта

- [ADIRGSL-1698](https://jira.adacta-fintech.com/browse/ADIRGSL-1698): Изменение даты запуска продукта БФКО Базис Актив на 17.08.2022

- [ADIRGSL-1715](https://jira.adacta-fintech.com/browse/ADIRGSL-1715): Драйвер Гарантия Privet_тестирование_методологи.

- [ADIRGSL-1717](https://jira.adacta-fintech.com/browse/ADIRGSL-1717): АВР_отображаются удаленные договоры

- [ADIRGSL-1722](https://jira.adacta-fintech.com/browse/ADIRGSL-1722): ПСБ РВ_ Драйвер Гарантия_тестирование.

- [ADIRGSL-1723](https://jira.adacta-fintech.com/browse/ADIRGSL-1723): Тест КСЖ РГСБ Банк и ПО.

- [ADIRGSL-1726](https://jira.adacta-fintech.com/browse/ADIRGSL-1726): Updated risks validations for claims.
    Translations fixes.

- [ADIRGSL-1730](https://jira.adacta-fintech.com/browse/ADIRGSL-1730): ПСБ_Базис Актив_тестирование 10.08.2022.

- [ADIRGSL-1733](https://jira.adacta-fintech.com/browse/ADIRGSL-1733): Premium increase transactions for non-life covers with multiple installments in one year are now grouped into one with summed amount.

- [ADIRGSL-1738](https://jira.adacta-fintech.com/browse/ADIRGSL-1738): КСЖ РГСБ тест 11.08.

- [ADIRGSL-1740](https://jira.adacta-fintech.com/browse/ADIRGSL-1740): Скорректирован сервис для продуктов:
    БФКО Базис Актив (5 лет)
    ПСБ Базис Актив (3 года)
    ПСБ Базис Актив Премиум (3 года)

- [ADIRGSL-1742](https://jira.adacta-fintech.com/browse/ADIRGSL-1742): Исправлены префиксы по продукту ПСБ Базис актив Премиум для 3 и 5 лет

- [ADIRGSL-1749](https://jira.adacta-fintech.com/browse/ADIRGSL-1749): Базис Актив. Обновление справочников инвест. параметров + график траншей.

- [ADIRGSL-1755](https://jira.adacta-fintech.com/browse/ADIRGSL-1755): Fixed incorrect hub link from sat fro claims.


### Fixed (10 changes)

- [ADIRGSL-1238](https://jira.adacta-fintech.com/browse/ADIRGSL-1238): Изменена папка для печатных фом на среде pre-prod.

- [ADIRGSL-1666](https://jira.adacta-fintech.com/browse/ADIRGSL-1666): Заявление на страхования Базис Актив БФКО

- [ADIRGSL-1695](https://jira.adacta-fintech.com/browse/ADIRGSL-1695): Исправлен запрос.

- [ADIRGSL-1704](https://jira.adacta-fintech.com/browse/ADIRGSL-1704): Внесены правки по результатам тестирования

- [ADIRGSL-1706](https://jira.adacta-fintech.com/browse/ADIRGSL-1706): Исправлена ошибка загрузки содержимого шапки АВР

- [ADIRGSL-1708](https://jira.adacta-fintech.com/browse/ADIRGSL-1708): Внесены правки по результатам тестирования

- [ADIRGSL-1710](https://jira.adacta-fintech.com/browse/ADIRGSL-1710): Платежи. Ошибка при отмене идентификации на среде ТЕСТ РГСЖ

- [ADIRGSL-1713](https://jira.adacta-fintech.com/browse/ADIRGSL-1713): АВР_округление ставок

- [ADIRGSL-1737](https://jira.adacta-fintech.com/browse/ADIRGSL-1737): Коректировки по "Результаты по тестированию продукта Базис Актив ПСБ и БФКО"

- [ADIRGSL-1744](https://jira.adacta-fintech.com/browse/ADIRGSL-1744): Исправление заявленые по результатам "Зенит_тестирование 12.08.2022"

# 21.0.0-rc1 (2022-08-08)

### Breaking Changes (1 changes)

- [ADIRGSL-1388](https://jira.adacta-fintech.com/browse/ADIRGSL-1388): Обертка функции по убыткам (LDWH ZLOSS) во вью.

    **Deployment Notes**

    После деплоя необходимо выполнить вручную скрипт: migration/impl_ldwh_zloss.sql


### New Features (11 changes)

- [ADIRGSL-1375](https://jira.adacta-fintech.com/browse/ADIRGSL-1375): Миграция. Контрагенты - доп.атрибуты

- [ADIRGSL-1425](https://jira.adacta-fintech.com/browse/ADIRGSL-1425): Драйвер Гарантия ВИП - константы для ПФ.

- [ADIRGSL-1537](https://jira.adacta-fintech.com/browse/ADIRGSL-1537): Added transactions for allocation with overpayment (normal & advance).

- [ADIRGSL-1568](https://jira.adacta-fintech.com/browse/ADIRGSL-1568): Замена списка рассылки УКСП

- [ADIRGSL-1642](https://jira.adacta-fintech.com/browse/ADIRGSL-1642): ADIRGSL-1642-ES-contact-update.sql migration script must be executed before publishing.
    Contract es index should be reindexed.

    Вывести в журнал учета договоров информацию по реинвестированию и по эл полисам

- [ADIRGSL-1647](https://jira.adacta-fintech.com/browse/ADIRGSL-1647): Добавлены триггеры для адреса регистрации

- [ADIRGSL-1679](https://jira.adacta-fintech.com/browse/ADIRGSL-1679): ПФ - Анкета идентификации для продукта Премиум Гарант Плюс.

- [ADIRGSL-1688](https://jira.adacta-fintech.com/browse/ADIRGSL-1688): Корректировка выборки реестра обмена с SAP (e-mail продавца).

- [ADIRGSL-1698](https://jira.adacta-fintech.com/browse/ADIRGSL-1698): Базис Актив БФКО. Смена даты запуска.

- [ADIRGSL-1711](https://jira.adacta-fintech.com/browse/ADIRGSL-1711): ПСБ масс + ОРС. Закрытие Базис Инвест и Базис Гарант.

- [ADIRGSL-1714](https://jira.adacta-fintech.com/browse/ADIRGSL-1714): Зенит розница «Драйвер Гарантия»_закрыть.


### Fixed (7 changes)

- [ADIRGSL-1238](https://jira.adacta-fintech.com/browse/ADIRGSL-1238): Исправлены конфигурационные файлы для среды rgsl-pre-prod.

- [ADIRGSL-1524](https://jira.adacta-fintech.com/browse/ADIRGSL-1524): Страховые события:

    * Удалена лишняя таблица АСС: CLM_IMPL.IE_CONTRACT

- [ADIRGSL-1656](https://jira.adacta-fintech.com/browse/ADIRGSL-1656): Retry failed transaction postings

- [ADIRGSL-1661](https://jira.adacta-fintech.com/browse/ADIRGSL-1661): Fix previous sql script

- [ADIRGSL-1697](https://jira.adacta-fintech.com/browse/ADIRGSL-1697): Исправление в печатной форме после замены андеррайтером риска в продукте "Финрезерв"

- [ADIRGSL-1703](https://jira.adacta-fintech.com/browse/ADIRGSL-1703): Тест КСЖ РГСБ 05.08_ПФ и методологи по 8 программе
    Тестирование КСЖ РГСБ Методологи печатки

- [ADIRGSL-1707](https://jira.adacta-fintech.com/browse/ADIRGSL-1707): Исправления после тестирования КСЖ РГСБ Методологи печатки

# 20.0.0-rc1 (2022-08-04)

### New Features (16 changes)

- [ADIRGSL-1425](https://jira.adacta-fintech.com/browse/ADIRGSL-1425): Корректировка справочников по ВИП Драйверу гарантии.

- [ADIRGSL-1467](https://jira.adacta-fintech.com/browse/ADIRGSL-1467): Проводки. Распределение авансовых платежей.
    Проводки. Зачет авансовых платежей.
    Проводки. Отмена авансового платежа/Отмена зачтенного авансового платежа.

- [ADIRGSL-1520](https://jira.adacta-fintech.com/browse/ADIRGSL-1520): Изменить логику формирования файла по выгрузке агрегатных страховых сумм. Добавлена функция impl_get_credit_aggregated_sums2, имеющаяся функция impl_get_credit_aggregated_sums оставлена без изменений.

- [ADIRGSL-1544](https://jira.adacta-fintech.com/browse/ADIRGSL-1544): Доработка - ПФ для заявки

- [ADIRGSL-1630](https://jira.adacta-fintech.com/browse/ADIRGSL-1630): Добавлены права на вызов intergation services по электрополисам.

- [ADIRGSL-1650](https://jira.adacta-fintech.com/browse/ADIRGSL-1650): КСЖ РГСБ Автокредиты запуск 15.08.22 - ПФ

- [ADIRGSL-1655](https://jira.adacta-fintech.com/browse/ADIRGSL-1655): Тестирование Зенита_Методологи 29.07.

- [ADIRGSL-1659](https://jira.adacta-fintech.com/browse/ADIRGSL-1659): Маппинг продуктов Базис Актив. Для партнера ПСБ масс и ОРС и БФКО Розница.

- [ADIRGSL-1665](https://jira.adacta-fintech.com/browse/ADIRGSL-1665): Тестирование Зенит ПФ.

- [ADIRGSL-1668](https://jira.adacta-fintech.com/browse/ADIRGSL-1668): Базис актив для ПСБ и БФКО.

- [ADIRGSL-1671](https://jira.adacta-fintech.com/browse/ADIRGSL-1671): Изменить дату старта по продуктам Зенита на 16.08.

- [ADIRGSL-1673](https://jira.adacta-fintech.com/browse/ADIRGSL-1673): Тестирование КСЖ РГСБ

- [ADIRGSL-1677](https://jira.adacta-fintech.com/browse/ADIRGSL-1677): ПСБ_"Драйвер Гарантия" (Бонд Репак масс и ОРС)_тестирование.

- [ADIRGSL-1678](https://jira.adacta-fintech.com/browse/ADIRGSL-1678): Маппинг продуктов КСЖ Авто. Для партнера РГСБ.

- [ADIRGSL-1681](https://jira.adacta-fintech.com/browse/ADIRGSL-1681): График траншей 02.08.2022.

- [ADIRGSL-1682](https://jira.adacta-fintech.com/browse/ADIRGSL-1682): Для всех пользователей ОПЕРУ отключит рассылку уведомлений на емейл о том, что поступила задача.


### Fixed (3 changes)

- [ADIRGSL-1486](https://jira.adacta-fintech.com/browse/ADIRGSL-1486): Проводки. Начисление премии и КВ (специфика Non-Life)

- [ADIRGSL-1582](https://jira.adacta-fintech.com/browse/ADIRGSL-1582): Не сформирован Invoiced commission по второму взносу по договору в рассрочку.

- [ADIRGSL-1661](https://jira.adacta-fintech.com/browse/ADIRGSL-1661): Ошибка при расчете комиссии по годам.

# 19.0.0-rc1 (2022-08-01)

### New Features (5 changes)

- [ADIRGSL-1343](https://jira.adacta-fintech.com/browse/ADIRGSL-1343): Added OUSV state for claims. Added related entities update error state for payment orders.

- [ADIRGSL-1581](https://jira.adacta-fintech.com/browse/ADIRGSL-1581): КСЖ РГСБ Автокредиты - настройка продукта.

- [ADIRGSL-1646](https://jira.adacta-fintech.com/browse/ADIRGSL-1646): Fixed incorrect applicant selection in case of usage of edit party view.

- [ADIRGSL-1653](https://jira.adacta-fintech.com/browse/ADIRGSL-1653): Загрузчик пользователей ПСБ Прайвет ('Продавец ПСБ Прайвет', 'InvestmentLifePSBVIP').

- [ADIRGSL-1654](https://jira.adacta-fintech.com/browse/ADIRGSL-1654): Загрузчик пользователей для КСЖ РГСБ ('Продавец БФКОАВТО', 'CreditLifeBFKOAuto').

# 18.0.0-rc1 (2022-07-29)

### New Features (5 changes)

- [ADIRGSL-1575](https://jira.adacta-fintech.com/browse/ADIRGSL-1575): Updated group deletion script

- [ADIRGSL-1630](https://jira.adacta-fintech.com/browse/ADIRGSL-1630): Настроена дата запуска электронных полисов для БФКО 01.08.2022

- [ADIRGSL-1639](https://jira.adacta-fintech.com/browse/ADIRGSL-1639): Изменение местоположения мейла в печатках

- [ADIRGSL-1644](https://jira.adacta-fintech.com/browse/ADIRGSL-1644): Minor fixes for claims

- [ADIRGSL-1645](https://jira.adacta-fintech.com/browse/ADIRGSL-1645): Минорные правки в печатные формы "Электрополисов"

# 17.0.0-rc1 (2022-07-28)

### Breaking Changes (1 changes)

- [ADIRGSL-1575](https://jira.adacta-fintech.com/browse/ADIRGSL-1575): Replaced claims second line group with claims group.

    **Deployment Notes**

    ADIRGSL-1575-delete-obsolete-user-group.sql migration script must be executed before publishing.


### New Features (16 changes)

- [ADIRGSL-1425](https://jira.adacta-fintech.com/browse/ADIRGSL-1425): ПСБ РВ. Драйвер Гарантия

- [ADIRGSL-1500](https://jira.adacta-fintech.com/browse/ADIRGSL-1500): ПСБ масс. Драйвер гарантия

- [ADIRGSL-1510](https://jira.adacta-fintech.com/browse/ADIRGSL-1510): Добавлен триггер для контрагентов с признаком "Ввод адреса вручную" + доп. адрес liliia.shakirova2@rgsl.ru для внутренних уведомлений на комплаенс

- [ADIRGSL-1524](https://jira.adacta-fintech.com/browse/ADIRGSL-1524): Убытки и страховые события:

    * Настроена модель АСС

- [ADIRGSL-1541](https://jira.adacta-fintech.com/browse/ADIRGSL-1541): Removed ability to create insured event from Operations actor.
    Added printout description for accident loss of ability to work risk.

- [ADIRGSL-1613](https://jira.adacta-fintech.com/browse/ADIRGSL-1613): Added party validation on claim applicant selection.

- [ADIRGSL-1625](https://jira.adacta-fintech.com/browse/ADIRGSL-1625): Изменён рассчёт даты выпуска АВР для новых актов (по умолчанию): теперь это первое число календарного месяца, следующего за закрытым отчетным периодом.

- [ADIRGSL-1626](https://jira.adacta-fintech.com/browse/ADIRGSL-1626): VIEW по АВР для LDWH: поправлены форматы.

- [ADIRGSL-1627](https://jira.adacta-fintech.com/browse/ADIRGSL-1627): Убрана валидация на дату рождения выгодоприобретателя на договоре.

- [ADIRGSL-1629](https://jira.adacta-fintech.com/browse/ADIRGSL-1629): Обновление ставок БФКО розница с 01.08.2022.

- [ADIRGSL-1631](https://jira.adacta-fintech.com/browse/ADIRGSL-1631): Отключена проверка ЧС на проде.

- [ADIRGSL-1633](https://jira.adacta-fintech.com/browse/ADIRGSL-1633): Изменение ставок по Акцепту с 01.08.22 Базис Инвест (Газпром, Фосагро) и Базис Гарант.

- [ADIRGSL-1634](https://jira.adacta-fintech.com/browse/ADIRGSL-1634): Обновить Инвест. параметры в Зенит масс по продукту “Базис Инвест” с 01.08.2022.

- [ADIRGSL-1637](https://jira.adacta-fintech.com/browse/ADIRGSL-1637): Minor changes and fixes for e policies.

- [ADIRGSL-1638](https://jira.adacta-fintech.com/browse/ADIRGSL-1638): Электрополисы изменения после тестирования

- [ADIRGSL-1640](https://jira.adacta-fintech.com/browse/ADIRGSL-1640): Перенос даты открытия продуктов Базис Инвест, Драйвер Гарантия ПСБ на 15/08/2022, а Драйвер Гарантия ПСБ (ВИП) на 22/08/2022.


### Fixed (1 changes)

- [ADIRGSL-1540](https://jira.adacta-fintech.com/browse/ADIRGSL-1540): Исправлен рассчёт комиссий для графика платежей

# 16.0.0-rc1 (2022-07-26)

### Breaking Changes (2 changes)

- [ADIRGSL-1274](https://jira.adacta-fintech.com/browse/ADIRGSL-1274): Implemented E Policies.

    **Deployment notes**

    Following config lines were added:

    environmentVariables.json
    "rgsl.ePolicyNotificationParams.allowedEmails": "email1;email2" - email addresses to allow email sending. all other addresses will be ignored. if empty then all emails will be accepted.
    "rgsl.ePolicyNotificationParams.allowedPhoneNumbers": "number1;number2" - phine numbers to allow sms sending. all other numbers will be ignored. if empty then all numbers will be accepted.
    "rgsl.ePolicyNotificationParams.thorwEmailExceptions": "false" - shoul app throw error on notification sink exceptions. by default sink handles business exceptions.

    implSettings.json appSettings:AdInsure:Settings:RGSL:Integration
    "DigitalSignature": {
    	"Uri": "" (rgsl:http://esbcam-qua-01:18080/restSignPDF/upload-file. local mock: http://localhost:60000/api/rgsl/mock-services/digital-signature/simulate)
    },
    "SecuritySmsNotification": {
    	"Uri": "" (rgsl: https://gate30.edna.ru:13228/rgsl/connector4/send. local mock: http://localhost:60000/api/rgsl/mock-services/sms-notification/simulate),
    	"SecurityCodeExpirationInMinutes": "5",
    	"SecurityCodeCooldownInMinutes": "1",
    	"SmsServiceLogin": "rgsl4",
    	"SmsServicePassword": "5tUu3qwz"
    }

- [ADIRGSL-1518](https://jira.adacta-fintech.com/browse/ADIRGSL-1518): Minor fixes for claims.

    **Deployment notes**
    Claims index should be reindexed.


### New Features (19 changes)

- [ADIRGSL-1135](https://jira.adacta-fintech.com/browse/ADIRGSL-1135): Корректировка фильтра продуктов в условиях АД.

- [ADIRGSL-1367](https://jira.adacta-fintech.com/browse/ADIRGSL-1367): Корректировка вьюх по АВР для LDWH.

- [ADIRGSL-1409](https://jira.adacta-fintech.com/browse/ADIRGSL-1409): Зенит - ПФ для продукта ИСЖ_Базис Инвест

- [ADIRGSL-1434](https://jira.adacta-fintech.com/browse/ADIRGSL-1434): Зенит - ПФ для продукта НСЖ_Премиум Гарант Плюс

- [ADIRGSL-1440](https://jira.adacta-fintech.com/browse/ADIRGSL-1440): Зенит - ПФ для продукта ИСЖ_Драйвер Гарантия

- [ADIRGSL-1454](https://jira.adacta-fintech.com/browse/ADIRGSL-1454): Зенит - ПФ для продукта НСЖ_Премиум выбор Лайт

- [ADIRGSL-1496](https://jira.adacta-fintech.com/browse/ADIRGSL-1496): Зенит - ПФ для продукта НСЖ_Стань миллионером

- [ADIRGSL-1514](https://jira.adacta-fintech.com/browse/ADIRGSL-1514): Изменение валидации ФИО контрагента

- [ADIRGSL-1550](https://jira.adacta-fintech.com/browse/ADIRGSL-1550): Добавлено автозаполнение агента в журнале АВР при выборе агентских договоров.

- [ADIRGSL-1557](https://jira.adacta-fintech.com/browse/ADIRGSL-1557): Базис Инвест. Корректировка ПФ для выкупных в случае реинвестирования.

- [ADIRGSL-1562](https://jira.adacta-fintech.com/browse/ADIRGSL-1562): Minor fixes for e policies.
    Added allowed emails and phone numbers for RGSL envs.

- [ADIRGSL-1563](https://jira.adacta-fintech.com/browse/ADIRGSL-1563): Внесены изменения в печатные формы, правила отображения, список вложений

- [ADIRGSL-1569](https://jira.adacta-fintech.com/browse/ADIRGSL-1569): Blocked attachments UI actions for ePolicy attachments.

- [ADIRGSL-1570](https://jira.adacta-fintech.com/browse/ADIRGSL-1570): Тестирование ПСБ - методологи - 22.07. Корректировки.

- [ADIRGSL-1572](https://jira.adacta-fintech.com/browse/ADIRGSL-1572): Тестирование БФКО - методологи 22.07. Корректировки.

- [ADIRGSL-1573](https://jira.adacta-fintech.com/browse/ADIRGSL-1573): Маппинг продуктов c реинвестированием

- [ADIRGSL-1576](https://jira.adacta-fintech.com/browse/ADIRGSL-1576): Исправлена Оошибка при регистрации на расторжение.

- [ADIRGSL-1615](https://jira.adacta-fintech.com/browse/ADIRGSL-1615): Корректировка валидаций графика платежей.

- [ADIRGSL-880](https://jira.adacta-fintech.com/browse/ADIRGSL-880): Добавлена по продуктам БФКО форма выпуска "Эл.полис"

# 15.0.0-rc1 (2022-07-20)

### Breaking Changes (2 changes)

- [ADIRGSL-1484](https://jira.adacta-fintech.com/browse/ADIRGSL-1484): Queries `impl_ldwh_zds_algl_2` and `impl_ldwh_zds_algl_3` were fixed to avoid duplicate results.
    Following migration scripts needs to be executed again:
    * `\database\sql\migration\impl_ldwh_zds_algl_2.sql`
    * `\database\sql\migration\impl_ldwh_zds_algl_3.sql`

- [ADIRGSL-1511](https://jira.adacta-fintech.com/browse/ADIRGSL-1511): Updated aa bodies to include partners business code.

    **Deployment notes**
    Execute ADIRGSL-1511-update-aa-bodies.sql migration script.


### New Features (54 changes)

- [ADIRGSL-1097](https://jira.adacta-fintech.com/browse/ADIRGSL-1097): В график платежей договора добавлены столбцы "Ставка КВ" и "Сумма КВ"

- [ADIRGSL-1144](https://jira.adacta-fintech.com/browse/ADIRGSL-1144): Project refactoring
    АВР. Новый режим расчета АВР

- [ADIRGSL-1194](https://jira.adacta-fintech.com/browse/ADIRGSL-1194): Интеграция с 1С УСК. Сервис исходящих платежей. Тестирование

- [ADIRGSL-1215](https://jira.adacta-fintech.com/browse/ADIRGSL-1215): Fixed wrong "nonResident" flag check inside policy cancellation info data source mapping.

- [ADIRGSL-1277](https://jira.adacta-fintech.com/browse/ADIRGSL-1277): Multiple changes and fixes for agent agreements.

- [ADIRGSL-1302](https://jira.adacta-fintech.com/browse/ADIRGSL-1302): Added default PIT recipient setting for RGSL envs.

- [ADIRGSL-1352](https://jira.adacta-fintech.com/browse/ADIRGSL-1352): БФКО - реинвестирование - Базис Гарант

- [ADIRGSL-1395](https://jira.adacta-fintech.com/browse/ADIRGSL-1395): Маппинг продукта Базис Инвест для партнера Зенит.

- [ADIRGSL-1401](https://jira.adacta-fintech.com/browse/ADIRGSL-1401): Скорректирована доступность причин расторжения в зависимости от группы продуктов на сущности заявки ППО.

- [ADIRGSL-1408](https://jira.adacta-fintech.com/browse/ADIRGSL-1408): ЗЕНИТ. Базис инвест.

- [ADIRGSL-1413](https://jira.adacta-fintech.com/browse/ADIRGSL-1413): Корректировка алгоритма построения ВС по КСЖ для формирования финплана для передачи в SAP.

- [ADIRGSL-1414](https://jira.adacta-fintech.com/browse/ADIRGSL-1414): Маппинг продукта Драйвер гарантия. Партнер Зенит.

- [ADIRGSL-1418](https://jira.adacta-fintech.com/browse/ADIRGSL-1418): Договоры НСЖ и ИСЖ:

    * Во вложениях для БФКО добавлено обязательное вложение Уведомление Банка

- [ADIRGSL-1421](https://jira.adacta-fintech.com/browse/ADIRGSL-1421): Хардкод решение по декларациям для Стань миллионером.

- [ADIRGSL-1426](https://jira.adacta-fintech.com/browse/ADIRGSL-1426): ПФ для продукта ИСЖ_Драйвер Гарантия

- [ADIRGSL-1433](https://jira.adacta-fintech.com/browse/ADIRGSL-1433): Зенит - настройка продукта НСЖ_Премиум Гарант Плюс.

- [ADIRGSL-1436](https://jira.adacta-fintech.com/browse/ADIRGSL-1436): Маппинг продуктов НСЖ для партнера Зенит.

- [ADIRGSL-1438](https://jira.adacta-fintech.com/browse/ADIRGSL-1438): Transactions for underpayment are posted.

- [ADIRGSL-1439](https://jira.adacta-fintech.com/browse/ADIRGSL-1439): ЗЕНИТ. Драйвер Гарантия.

- [ADIRGSL-1450](https://jira.adacta-fintech.com/browse/ADIRGSL-1450): Добавлены печатные формы для ЭлектроПолисов

- [ADIRGSL-1452](https://jira.adacta-fintech.com/browse/ADIRGSL-1452): Интерфейс выбора формы выпуска.

- [ADIRGSL-1453](https://jira.adacta-fintech.com/browse/ADIRGSL-1453): Зенит - настройка продукта НСЖ_Премиум выбор Лайт

- [ADIRGSL-1455](https://jira.adacta-fintech.com/browse/ADIRGSL-1455): ПСБ. Замена заявлений на страхование для 2.0

- [ADIRGSL-1456](https://jira.adacta-fintech.com/browse/ADIRGSL-1456): Журнал АВР_новый фильтр

- [ADIRGSL-1460](https://jira.adacta-fintech.com/browse/ADIRGSL-1460): Стратегия на пять_тестирование 07.07.2022.

- [ADIRGSL-1461](https://jira.adacta-fintech.com/browse/ADIRGSL-1461): БФКО_Финансовый резерв_07.07.2022

- [ADIRGSL-1469](https://jira.adacta-fintech.com/browse/ADIRGSL-1469): Стратегия на пять. Корректировка текста пункта 4 для декларации здоровья для 56-65 застрахованного.

- [ADIRGSL-1470](https://jira.adacta-fintech.com/browse/ADIRGSL-1470): Для журнала АВР фильтр "Статус АВР" добавлен в список обязательных

- [ADIRGSL-1474](https://jira.adacta-fintech.com/browse/ADIRGSL-1474): Доработан демо продукт НСЖ, добавлен nonLife риск, добавлены рассрочки.
    ВАЖНО: необходимо протестировать графики оплаты и выкупных сумм для разных сценариев, т.к. затронут механизм формирования периодов.

- [ADIRGSL-1475](https://jira.adacta-fintech.com/browse/ADIRGSL-1475): Убрана разбивка по линии бизнеса при группировке по строкам акта

- [ADIRGSL-1476](https://jira.adacta-fintech.com/browse/ADIRGSL-1476): Договоры:

    * Добавлена возможность перехода в АД с вкладки комиссия.

- [ADIRGSL-1479](https://jira.adacta-fintech.com/browse/ADIRGSL-1479): Валидации по возрасту на продуктах КСЖ.

- [ADIRGSL-1480](https://jira.adacta-fintech.com/browse/ADIRGSL-1480): БФКО - реинвестирование - Базис Инвест

- [ADIRGSL-1485](https://jira.adacta-fintech.com/browse/ADIRGSL-1485): Корректировки по результатам тестирования ПСБ 2.0 от 12.07.22.

- [ADIRGSL-1487](https://jira.adacta-fintech.com/browse/ADIRGSL-1487): Скрытие анкеты фин. грамотности из печати для ряда продуктов.

- [ADIRGSL-1489](https://jira.adacta-fintech.com/browse/ADIRGSL-1489): Добавлен фильтр "Реестр" в журнал платежей

- [ADIRGSL-1490](https://jira.adacta-fintech.com/browse/ADIRGSL-1490): Скорректированы валидации на создание расторжения КСЖ (не создавалось из-за валидаций на e-mail)

- [ADIRGSL-1491](https://jira.adacta-fintech.com/browse/ADIRGSL-1491): Initial implementation of claim risks decision table.

- [ADIRGSL-1495](https://jira.adacta-fintech.com/browse/ADIRGSL-1495): Зенит - настройка продукта НСЖ_Стань миллионером

- [ADIRGSL-1500](https://jira.adacta-fintech.com/browse/ADIRGSL-1500): ПСБ_"Драйвер Гарантия" (Бонд Репак масс и ОРС)

- [ADIRGSL-1501](https://jira.adacta-fintech.com/browse/ADIRGSL-1501): Загрузчик пользователей для Зенит.

- [ADIRGSL-1504](https://jira.adacta-fintech.com/browse/ADIRGSL-1504): Уведомления 60+ БФКО.

- [ADIRGSL-1507](https://jira.adacta-fintech.com/browse/ADIRGSL-1507): ПСБ 2.0_тестирование_14.07.22.

- [ADIRGSL-1508](https://jira.adacta-fintech.com/browse/ADIRGSL-1508): Исправление маппинга для продукта "Стратегия на пять".

- [ADIRGSL-1513](https://jira.adacta-fintech.com/browse/ADIRGSL-1513): ПСБ_перенос даты запуска

- [ADIRGSL-1523](https://jira.adacta-fintech.com/browse/ADIRGSL-1523): Конфигурация для установки ru-RU языка на серверах.

- [ADIRGSL-1525](https://jira.adacta-fintech.com/browse/ADIRGSL-1525): Переработана выгрузка реестра платежей в Excel: сделал Integration Service

- [ADIRGSL-1526](https://jira.adacta-fintech.com/browse/ADIRGSL-1526): Тестирование ПСБ (Базис Инвест и Базис Инвест Премиум) от 13.07.22.

- [ADIRGSL-1530](https://jira.adacta-fintech.com/browse/ADIRGSL-1530): Маппинг продукта Драйвер Гарантия. Для партнера ПСБ масс и ОРС.

- [ADIRGSL-1534](https://jira.adacta-fintech.com/browse/ADIRGSL-1534): Скорректирована фильтрация роли при создании контрагента из котировки.

- [ADIRGSL-1538](https://jira.adacta-fintech.com/browse/ADIRGSL-1538): Add environmental and application configs for the new RC environment.

- [ADIRGSL-419](https://jira.adacta-fintech.com/browse/ADIRGSL-419): Добавлено поле Дата рождения для Выгодоприобреталеля, добавлена валидация

- [ADIRGSL-662](https://jira.adacta-fintech.com/browse/ADIRGSL-662): Доработка функционала редактирования таблиц.

- [ADIRGSL-983](https://jira.adacta-fintech.com/browse/ADIRGSL-983): Replaced manual number with business number for agent agreements.
    Preserved manual number usage for old documents.


### Fixed (9 changes)

- [ADIRGSL-1212](https://jira.adacta-fintech.com/browse/ADIRGSL-1212): RGSL.Accounting.PostSequence добавлен в messagingSettings.

- [ADIRGSL-1350](https://jira.adacta-fintech.com/browse/ADIRGSL-1350): allow SYSTEM actor to change some policy statuses

- [ADIRGSL-1389](https://jira.adacta-fintech.com/browse/ADIRGSL-1389): Исправлена работа ETL-сервиса AutoAllocatePaymentsEtlService - теперь работает через DB-datasource

- [ADIRGSL-1477](https://jira.adacta-fintech.com/browse/ADIRGSL-1477): АВР. Ручное КВ в акте (процентное значение применяется некорректно)

- [ADIRGSL-1478](https://jira.adacta-fintech.com/browse/ADIRGSL-1478): Incorrect behavior on payment allocation (after deallocation)

- [ADIRGSL-1482](https://jira.adacta-fintech.com/browse/ADIRGSL-1482): Refactoring AA rate values: All values was devided by 100.
    АВР. СТАВКА КВ ОЦЕНКА, %

- [ADIRGSL-1488](https://jira.adacta-fintech.com/browse/ADIRGSL-1488): 1) Исправлено вычисление ставки и суммы комиссии для случаев периодичности оплаты реже раза в год
    2) Столбцы со ставкой и суммой комиссии отображаются только для бэкофиса

- [ADIRGSL-1515](https://jira.adacta-fintech.com/browse/ADIRGSL-1515): Исправлен рассчёт INVOICED COMMISSION при идентификации договора: ранее не учитывался tolerance

- [ADIRGSL-1529](https://jira.adacta-fintech.com/browse/ADIRGSL-1529): АД. Расчет ставки КВ в договоре страхования не доступен при наличии ДС в проекте в АД

# 14.0.0-rc1 (2022-07-06)

### New Features (35 changes)

- [ADIRGSL-1197](https://jira.adacta-fintech.com/browse/ADIRGSL-1197): Transactions for multiple non-life installments in same year. All future transactions are generated and voided if first installment is (de)allocated.

- [ADIRGSL-1351](https://jira.adacta-fintech.com/browse/ADIRGSL-1351): Правки в печатной форме

- [ADIRGSL-1356](https://jira.adacta-fintech.com/browse/ADIRGSL-1356): Корректировки по результатам тестирования продуктов БФКО.

- [ADIRGSL-1357](https://jira.adacta-fintech.com/browse/ADIRGSL-1357): БФКО_Базис Инвест_замена Уведомления

- [ADIRGSL-1361](https://jira.adacta-fintech.com/browse/ADIRGSL-1361): Платежи. Восстановлении суммы платежа при аннулировании РНВ

- [ADIRGSL-1363](https://jira.adacta-fintech.com/browse/ADIRGSL-1363): Переставлены и переименованы поля результатов поиска в журнале АВР

- [ADIRGSL-1367](https://jira.adacta-fintech.com/browse/ADIRGSL-1367): Подготовлены вьюхи на основании таблиц по АВР для LDWH:
    IMPL_LDWH_CA_ACT
    IMPL_LDWH_CA_ACT_ITEM

- [ADIRGSL-1370](https://jira.adacta-fintech.com/browse/ADIRGSL-1370): В печатную форму продукта НСЖ_Стань миллионером добавленны Уведомление о предост.фин.услуг и Согласие на обработку перс.данных

- [ADIRGSL-1376](https://jira.adacta-fintech.com/browse/ADIRGSL-1376): ПСБ ИСЖ_изменение клиентских условия и КВ_24.06.2022.

- [ADIRGSL-1386](https://jira.adacta-fintech.com/browse/ADIRGSL-1386): Уведомление о фин услуге Акцепт

- [ADIRGSL-1391](https://jira.adacta-fintech.com/browse/ADIRGSL-1391): Additional fixes for claims.

- [ADIRGSL-1392](https://jira.adacta-fintech.com/browse/ADIRGSL-1392): Добавлен новые формат импорта реестра платежей: Сбербанк Эквайринг

- [ADIRGSL-1393](https://jira.adacta-fintech.com/browse/ADIRGSL-1393): Fixed validation on generation of small payments.

- [ADIRGSL-1396](https://jira.adacta-fintech.com/browse/ADIRGSL-1396): Маппинг продукта Стань Миллионером. Партнер БФКО розница

- [ADIRGSL-1400](https://jira.adacta-fintech.com/browse/ADIRGSL-1400): Добавлена роль "ExcludeERCP2". При добавлении данной роли продавцу ему станет недоступен для оформления продукт "Надежный выбор Премиум 2.0".

- [ADIRGSL-1401](https://jira.adacta-fintech.com/browse/ADIRGSL-1401): Сущность "Запрос" - результат тестирования № 1. Корректировки согласно описанию, кроме пп. 6-8 (см. комментарии в жире).

- [ADIRGSL-1402](https://jira.adacta-fintech.com/browse/ADIRGSL-1402): Minor fixes for claims

- [ADIRGSL-1403](https://jira.adacta-fintech.com/browse/ADIRGSL-1403): Полный номер (отформатированный) через API.

- [ADIRGSL-1404](https://jira.adacta-fintech.com/browse/ADIRGSL-1404): Обязательность e-mail для участников договора

- [ADIRGSL-1405](https://jira.adacta-fintech.com/browse/ADIRGSL-1405): Возможность печати правил страхования. Пока без UI для продавца, но можно проверить под бэк-офисом. Важно: добавлена библиотека со справочником правил (insuranceRulesConfiguration), а в библиотеке настроек продуктов (productConfiguration) оставлен только код правил.

- [ADIRGSL-1407](https://jira.adacta-fintech.com/browse/ADIRGSL-1407): Отключена валидация на анкету фин. грамотности на контрагенте

- [ADIRGSL-1410](https://jira.adacta-fintech.com/browse/ADIRGSL-1410): Вектор здоровья Премиум («КЗ_Лечение весь мир/за рубежом»)

- [ADIRGSL-1411](https://jira.adacta-fintech.com/browse/ADIRGSL-1411): Стань миллионером - корректировки.

- [ADIRGSL-1415](https://jira.adacta-fintech.com/browse/ADIRGSL-1415): Акцепт_Обновление инвест. параметров с 04.07.22

- [ADIRGSL-1416](https://jira.adacta-fintech.com/browse/ADIRGSL-1416): БФКО_Базис Гарант_изменение Ставки

- [ADIRGSL-1417](https://jira.adacta-fintech.com/browse/ADIRGSL-1417): БФКО_тестирование 30.06.2022

- [ADIRGSL-1419](https://jira.adacta-fintech.com/browse/ADIRGSL-1419): В строках акта в столбце Линия бизнеса выводится код

- [ADIRGSL-1431](https://jira.adacta-fintech.com/browse/ADIRGSL-1431): E-mail для КСЖ.

- [ADIRGSL-1432](https://jira.adacta-fintech.com/browse/ADIRGSL-1432): Стань миллионером_меняем наименование

- [ADIRGSL-1435](https://jira.adacta-fintech.com/browse/ADIRGSL-1435): ПСБ ИСЖ_изменения 04.07.2022.

- [ADIRGSL-1442](https://jira.adacta-fintech.com/browse/ADIRGSL-1442): БФКО_Финансовый резерв_05.07.2022.

- [ADIRGSL-1444](https://jira.adacta-fintech.com/browse/ADIRGSL-1444): Корректировка назначения задач в убытках
    Исключение валидации на банковские счета из обязательных

- [ADIRGSL-1445](https://jira.adacta-fintech.com/browse/ADIRGSL-1445): Убраны валидации на контрагента с сущности договора.

- [ADIRGSL-1449](https://jira.adacta-fintech.com/browse/ADIRGSL-1449): Корректировка инвест. параметров для Базис Гарант БФКО.

- [ADIRGSL-662](https://jira.adacta-fintech.com/browse/ADIRGSL-662): Создание функционала редактирования табличных расчётных значений.


### Fixed (8 changes)

- [ADIRGSL-1219](https://jira.adacta-fintech.com/browse/ADIRGSL-1219): АВР. Ошибка при подтверждении акта

- [ADIRGSL-1298](https://jira.adacta-fintech.com/browse/ADIRGSL-1298): РНВ. Документ остался в статусе Подтвержден после оплаты

- [ADIRGSL-1313](https://jira.adacta-fintech.com/browse/ADIRGSL-1313): Расчёт периудов КВ должен начинаться с начала действия полиса.

- [ADIRGSL-1313](https://jira.adacta-fintech.com/browse/ADIRGSL-1313): Сортировка invoiced commission перед постингом.
    Переименовать колонку PARTY_CODE в SERVICE_PROVIDER_CODE.

- [ADIRGSL-1350](https://jira.adacta-fintech.com/browse/ADIRGSL-1350): Проблема с переводом договоров в расторгнутый статус

- [ADIRGSL-1399](https://jira.adacta-fintech.com/browse/ADIRGSL-1399): Реестр платежей ПСБ невозможно идентифицировать

- [ADIRGSL-1412](https://jira.adacta-fintech.com/browse/ADIRGSL-1412): Slow BSI reindexing

- [ADIRGSL-1437](https://jira.adacta-fintech.com/browse/ADIRGSL-1437): АВР. Ошибка работы сервиса: Total proportion amount must be a positive number!

# 13.0.0-rc1 (2022-06-27)

### Breaking Changes (3 changes)

- [ADIRGSL-1355](https://jira.adacta-fintech.com/browse/ADIRGSL-1355): Upgraded the platform to version 6.19.1.

- [ADIRGSL-1359](https://jira.adacta-fintech.com/browse/ADIRGSL-1359): Additional changes for claims.

    **Deployent notes**
    PaymentOrder ES index shoul be reindexed.

- [ADIRGSL-1372](https://jira.adacta-fintech.com/browse/ADIRGSL-1372): Additional fixes for claims and payment orders.

    **Deployment notes**
    SQL script 7.10_006.019.001_001 must be executed before publishing.


### New Features (6 changes)

- [ADIRGSL-1348](https://jira.adacta-fintech.com/browse/ADIRGSL-1348): Добавлено скрытие фин. анкеты из доступных для печати ПФ для продуктов Базис Гарант и Премиум Гарант Плюс.

- [ADIRGSL-1351](https://jira.adacta-fintech.com/browse/ADIRGSL-1351): Создана сущность "Запрос"

- [ADIRGSL-1353](https://jira.adacta-fintech.com/browse/ADIRGSL-1353): БФКО - НСЖ - Стань миллионером. Корректировки.

- [ADIRGSL-1387](https://jira.adacta-fintech.com/browse/ADIRGSL-1387): Полезная информация скрыта от партнеров, кроме ПСБ.

- [ADIRGSL-1394](https://jira.adacta-fintech.com/browse/ADIRGSL-1394): Вынесен выбор АД на форму загрузчика КСЖ.

- [ADIRGSL-834](https://jira.adacta-fintech.com/browse/ADIRGSL-834): Отчет по инвест. параметрам.

# 12.0.0-rc1 (2022-06-24)

### Breaking Changes (3 changes)

- [ADIRGSL-1311](https://jira.adacta-fintech.com/browse/ADIRGSL-1311): В "Убытки" добавлена вкладка "Проводки по убытку"
    для отбражения всех проводок относящихся к договору
    Need to manually execute script migration/get_transformed_transactions.sql

- [ADIRGSL-1346](https://jira.adacta-fintech.com/browse/ADIRGSL-1346): Multiple changes to claim doc, po doc and insurance act.

    **Deployment notes**
    Claim ES index should be reindexed.

- [ADIRGSL-1355](https://jira.adacta-fintech.com/browse/ADIRGSL-1355): Upgraded the platform to version 6.18.1.


### New Features (18 changes)

- [ADIRGSL-1150](https://jira.adacta-fintech.com/browse/ADIRGSL-1150): Extended integration tests

- [ADIRGSL-1212](https://jira.adacta-fintech.com/browse/ADIRGSL-1212): Добавлен отсутствующий "type": "object" для объектов esMapping, у которых properties не содержит свойств (properties: {}).

- [ADIRGSL-1222](https://jira.adacta-fintech.com/browse/ADIRGSL-1222): Добавлена квитовка исходящего платежа по безакцептному списанию

- [ADIRGSL-1269](https://jira.adacta-fintech.com/browse/ADIRGSL-1269): New api test for invoiced commission

- [ADIRGSL-1286](https://jira.adacta-fintech.com/browse/ADIRGSL-1286): Refactored posting of transactions on policy cancellation (credit repayment). Now posted when amendment goes to status `SentToPayment`. Transactions are now splitted by each cover (proportionally).

- [ADIRGSL-1308](https://jira.adacta-fintech.com/browse/ADIRGSL-1308): Изменён формат имени и некоторых строк печатной формы АВР

- [ADIRGSL-1312](https://jira.adacta-fintech.com/browse/ADIRGSL-1312): Изменён формат имени и некоторых строк выгрузки АВР.
    При выгрузке и печати отчёта добавлен учёт флага группировки по договорам.
    Приведены в соответствие столбца формы строк АВР и шаблона выгрузки.

- [ADIRGSL-1330](https://jira.adacta-fintech.com/browse/ADIRGSL-1330): Внесены изменения в функционал загрузчика пользователей. Добавленна возможность создавать пользователей продавцов БФКО, Акцепт, АкБарс. Добавлена возможность отправи логина и пароля на почту, указанную в загрузочном файле. Подробнее см. в жира.

- [ADIRGSL-1339](https://jira.adacta-fintech.com/browse/ADIRGSL-1339): Changed 3 attribute values in transaction definition.

- [ADIRGSL-1341](https://jira.adacta-fintech.com/browse/ADIRGSL-1341): Передача ставки купона.

- [ADIRGSL-1345](https://jira.adacta-fintech.com/browse/ADIRGSL-1345): АКБАРС, корректировки про результатам тестирования.

- [ADIRGSL-1347](https://jira.adacta-fintech.com/browse/ADIRGSL-1347): Права продавцов на работу с верификатором вложений.

- [ADIRGSL-1349](https://jira.adacta-fintech.com/browse/ADIRGSL-1349): АКБАРС. Корректировки по результатам тестирования от 20.06.2022.

- [ADIRGSL-1353](https://jira.adacta-fintech.com/browse/ADIRGSL-1353): БФКО - НСЖ - Стань миллионером.

- [ADIRGSL-1358](https://jira.adacta-fintech.com/browse/ADIRGSL-1358): Core GL accounts and related configuration removed.

- [ADIRGSL-1364](https://jira.adacta-fintech.com/browse/ADIRGSL-1364): АК БАРС. Корректировки по результатам тестирования от 21.06.2022.

- [ADIRGSL-362](https://jira.adacta-fintech.com/browse/ADIRGSL-362): Commit autogenerated files. From now on they should no longer be ignored, but committed.

- [ADIRGSL-985](https://jira.adacta-fintech.com/browse/ADIRGSL-985): Добавлены валидации для ролей "Агент Резидент", "Агент Нерезидент" и "Агент ЮрЛицо" у в анкете контрагентов
    В создании документа "Агентский договор" изменнеа логика компонента "Участники"


### Fixed (5 changes)

- [ADIRGSL-1298](https://jira.adacta-fintech.com/browse/ADIRGSL-1298): Wrong actor name used

- [ADIRGSL-1300](https://jira.adacta-fintech.com/browse/ADIRGSL-1300): Исправлен XML-реквест в рамках интеграции с 1С УСК

- [ADIRGSL-1313](https://jira.adacta-fintech.com/browse/ADIRGSL-1313): Приведено в единое соответствие отображение агента в формах поиска агентского договора, исправлено автозаполнение агента и агентского договора в форме АВР

- [ADIRGSL-1320](https://jira.adacta-fintech.com/browse/ADIRGSL-1320): Исправлен сброс флага "Реестр" в случае "очистки" формы поиска платежей, вызываемой из формы ручной идентификации

- [ADIRGSL-1373](https://jira.adacta-fintech.com/browse/ADIRGSL-1373): АВР. Агент в акте (сброшен в интерфейсе)

# 11.0.0-rc1 (2022-06-15)

### Breaking Changes (2 changes)

- [ADIRGSL-1311](https://jira.adacta-fintech.com/browse/ADIRGSL-1311): В "Убытки" добавлена вкладка "Проводки по убытку"
    для отбражения всех проводок относящихся к договору
    Need to manually execute script migration/get_transformed_transactions.sql

- [ADIRGSL-1332](https://jira.adacta-fintech.com/browse/ADIRGSL-1332): Скорректировано поведение задачника по задачам верификации.

    Need to manually execute script migration/ADIRGSL-1332-verification-body-update.sql


### New Features (15 changes)

- [ADIRGSL-1261](https://jira.adacta-fintech.com/browse/ADIRGSL-1261): Added rgsl-pre-prod enviroment configs.

- [ADIRGSL-1261](https://jira.adacta-fintech.com/browse/ADIRGSL-1261): Валидация на ИНН для ЮЛ.

- [ADIRGSL-1264](https://jira.adacta-fintech.com/browse/ADIRGSL-1264): Корректировка реестра обмена данными с SAP Ак Барс.

- [ADIRGSL-1269](https://jira.adacta-fintech.com/browse/ADIRGSL-1269): Пересчёт оценочной комиссии на основе АгД

- [ADIRGSL-1282](https://jira.adacta-fintech.com/browse/ADIRGSL-1282): АкБарс - настройка продукта Премиум Гарант Плюс.

- [ADIRGSL-1283](https://jira.adacta-fintech.com/browse/ADIRGSL-1283): Добавлена печатная форма договора Премиум Гарант Плюс АкБарс

- [ADIRGSL-1301](https://jira.adacta-fintech.com/browse/ADIRGSL-1301): Исправлена логика заплнения таблицы в инвестиционной декларации

- [ADIRGSL-1314](https://jira.adacta-fintech.com/browse/ADIRGSL-1314): Внесены правки после тестирования

- [ADIRGSL-1317](https://jira.adacta-fintech.com/browse/ADIRGSL-1317): Изменение условий по Базис Инвест с 13.06.2022 _БФКО.

- [ADIRGSL-1321](https://jira.adacta-fintech.com/browse/ADIRGSL-1321): Минорные правки в печатной форме для продуктов Акцепт

- [ADIRGSL-1328](https://jira.adacta-fintech.com/browse/ADIRGSL-1328): Корректировка реестра обмена данными с SAP в части вывода fixRate в ROW4_18 и ROW4_19.

- [ADIRGSL-1333](https://jira.adacta-fintech.com/browse/ADIRGSL-1333): Добавлены дополнительные валидные символы в наименовании плательщика при загрузке реестра платежей (- и ')

- [ADIRGSL-1334](https://jira.adacta-fintech.com/browse/ADIRGSL-1334): Загрузка реестра КСЖ, корректировка логики определения пола.

- [ADIRGSL-1335](https://jira.adacta-fintech.com/browse/ADIRGSL-1335): Загрузка реестра КСЖ, корректировка логики моб. телефона.

- [ADIRGSL-1337](https://jira.adacta-fintech.com/browse/ADIRGSL-1337): Возврат из статуса "Документация неккоректна" для ОПЕРУ.

# 10.0.0-rc1 (2022-06-06)

### Breaking Changes (4 changes)

- [ADIRGSL-1172](https://jira.adacta-fintech.com/browse/ADIRGSL-1172): New environment variable was added that contains party code for default recipient of PIT payment order.
    Variable name: rgsl.createPaymentOrderParams.defaultPITRecipient

- [ADIRGSL-1215](https://jira.adacta-fintech.com/browse/ADIRGSL-1215): Implemented default recipient for PIT PO. Updated payment description.

    **Deployment notes**
    ADIRGSL-1215-party-common-body-update.sql migration script must be executed before publishing.
    Party es index should be reindexed.

- [ADIRGSL-1259](https://jira.adacta-fintech.com/browse/ADIRGSL-1259): Upgraded the platform to version 6.17.1. Upgraded the studio to version 15.6.1.

- [ADIRGSL-968](https://jira.adacta-fintech.com/browse/ADIRGSL-968): Updated mappings and related components for recipient on PO form.

    **Deployment notes**

    ADIRGSL-968-update-party-common-body.sql migration script must be executed before publishing.
    Party es index should be reindexed.


### New Features (52 changes)

- [ADIRGSL-1000](https://jira.adacta-fintech.com/browse/ADIRGSL-1000): Скорректировано поведение тарификации при использовании ручной корректировки андеррайтером.

- [ADIRGSL-1047](https://jira.adacta-fintech.com/browse/ADIRGSL-1047): 1) Изменён график дапуска джоба AutoAllocatePayments
    2) Добавлено меню "Сервисы" для запуска сервисов загрузки платежей и сервиса автопривязки

- [ADIRGSL-1052](https://jira.adacta-fintech.com/browse/ADIRGSL-1052): Добавлен новый критерий отбора договоров в АВР «Документация корректна»

- [ADIRGSL-1099](https://jira.adacta-fintech.com/browse/ADIRGSL-1099): Invoiced commission is recalculated after first installment is (de)allocated.

- [ADIRGSL-1103](https://jira.adacta-fintech.com/browse/ADIRGSL-1103): Платежи. Учет авансовых платежей, специфика для покрытий non-life

- [ADIRGSL-1136](https://jira.adacta-fintech.com/browse/ADIRGSL-1136): Добавлена возможность группового перевода статуса АВР из журнала

- [ADIRGSL-1143](https://jira.adacta-fintech.com/browse/ADIRGSL-1143): АВР. Новый пункт меню. Поиск по номеру договора страхования

- [ADIRGSL-1173](https://jira.adacta-fintech.com/browse/ADIRGSL-1173): Changed logic for payment lines calculation.

- [ADIRGSL-1181](https://jira.adacta-fintech.com/browse/ADIRGSL-1181): Updated total amount calculation logic after netting for payment orders.

- [ADIRGSL-1182](https://jira.adacta-fintech.com/browse/ADIRGSL-1182): Implemented manual PO creation for claim and cancellation types.

- [ADIRGSL-1184](https://jira.adacta-fintech.com/browse/ADIRGSL-1184): Платежи, создаваемые про оплате РНВ, помечаются как fake и запрещаются к отмене идентификации на них

- [ADIRGSL-1185](https://jira.adacta-fintech.com/browse/ADIRGSL-1185): В поиск журнал платежей фильтр по источнику платежа

- [ADIRGSL-1190](https://jira.adacta-fintech.com/browse/ADIRGSL-1190): Removed "Registered" state from Insured event document.

- [ADIRGSL-1193](https://jira.adacta-fintech.com/browse/ADIRGSL-1193): Fixed transaction type (Распределение платежей -> Выплаты) for transactions for paid payment order of type cancellation amendment.

- [ADIRGSL-1196](https://jira.adacta-fintech.com/browse/ADIRGSL-1196): Исправления после тестирования печатных форм

- [ADIRGSL-1197](https://jira.adacta-fintech.com/browse/ADIRGSL-1197): Added support for invoiced commission transactions for policies with multiple life and non-life installments.

- [ADIRGSL-1198](https://jira.adacta-fintech.com/browse/ADIRGSL-1198): Обновление купонных периодов по ИСЖ ПСБ.

- [ADIRGSL-1199](https://jira.adacta-fintech.com/browse/ADIRGSL-1199): Добавленна вкладка "Проводки по договору" видимость только для бек-офиса

- [ADIRGSL-1201](https://jira.adacta-fintech.com/browse/ADIRGSL-1201): АВР. Изменениие логики формирования payable commission

- [ADIRGSL-1202](https://jira.adacta-fintech.com/browse/ADIRGSL-1202): Contract searchRequest correction.

- [ADIRGSL-1206](https://jira.adacta-fintech.com/browse/ADIRGSL-1206): Implemented claim status changes after PO payment execution.

- [ADIRGSL-1213](https://jira.adacta-fintech.com/browse/ADIRGSL-1213): Корректировка выборки реестра обмена с SAP новые тарифы КСЖ.

- [ADIRGSL-1217](https://jira.adacta-fintech.com/browse/ADIRGSL-1217): Скорректировано поведение ручного добавления вложений в договор с карточки верификатора вложений.

- [ADIRGSL-1218](https://jira.adacta-fintech.com/browse/ADIRGSL-1218): Скорректировно поведение изменения адреса, введенного через DaData.

- [ADIRGSL-1224](https://jira.adacta-fintech.com/browse/ADIRGSL-1224): Created new roles for PO. Updated PO payment description for claims.

- [ADIRGSL-1225](https://jira.adacta-fintech.com/browse/ADIRGSL-1225): Добавлен новый фильтр для строк АВР: Список Договоров. Он взаимоисключаем с фильтром Номер Договора

- [ADIRGSL-1226](https://jira.adacta-fintech.com/browse/ADIRGSL-1226): Изменён порядок ролей для форм Cash Flow

- [ADIRGSL-1230](https://jira.adacta-fintech.com/browse/ADIRGSL-1230): добавлена проверка на валидные символы в наименовании плательщика при загрузке реестра платежей

- [ADIRGSL-1235](https://jira.adacta-fintech.com/browse/ADIRGSL-1235): Разбиение суммы к возврату по рискам для ПДПК.

- [ADIRGSL-1239](https://jira.adacta-fintech.com/browse/ADIRGSL-1239): Скорректирована подсказка для ПДЛ.

- [ADIRGSL-1240](https://jira.adacta-fintech.com/browse/ADIRGSL-1240): Изменение уведомления в убытке.

- [ADIRGSL-1245](https://jira.adacta-fintech.com/browse/ADIRGSL-1245): Выводить текст ошибки ответа сервиса PostXml

- [ADIRGSL-1246](https://jira.adacta-fintech.com/browse/ADIRGSL-1246): Замена заявки для продуктов Базис Инвест и Гарант от ПСБ

- [ADIRGSL-1247](https://jira.adacta-fintech.com/browse/ADIRGSL-1247): Добавлен банк для контрагента-получателя НДФЛ + скорректирована валидация р/с в карточке контрагента.

- [ADIRGSL-1251](https://jira.adacta-fintech.com/browse/ADIRGSL-1251): Скорректировано округление в тарификации.

- [ADIRGSL-1252](https://jira.adacta-fintech.com/browse/ADIRGSL-1252): Dispalyed isManual attribute in PO UI.
    Updated PO copy mapping.

- [ADIRGSL-1254](https://jira.adacta-fintech.com/browse/ADIRGSL-1254): Рефакторинг фильтра продуктов по сегментам.

- [ADIRGSL-1255](https://jira.adacta-fintech.com/browse/ADIRGSL-1255): АКЦЕПТ. Продукты ИСЖ.

- [ADIRGSL-1260](https://jira.adacta-fintech.com/browse/ADIRGSL-1260): Корректировка валидаций графика платежей на допниках.

- [ADIRGSL-1265](https://jira.adacta-fintech.com/browse/ADIRGSL-1265): Рефакторинг функционала ПФ. Внимание! Важно протестировать как новые, так и старые ПФ на предмет корректности шаблона ПФ и КВ для памятки ЦБ.

- [ADIRGSL-1266](https://jira.adacta-fintech.com/browse/ADIRGSL-1266): Removed default policy holder filter from netting search script.

- [ADIRGSL-1268](https://jira.adacta-fintech.com/browse/ADIRGSL-1268): Корректировка реестра обмена данными с SAP по Акцепт.

- [ADIRGSL-1272](https://jira.adacta-fintech.com/browse/ADIRGSL-1272): Корректировка реестра обмена данными с SAP по новым продуктам БФКО.

- [ADIRGSL-1279](https://jira.adacta-fintech.com/browse/ADIRGSL-1279): В форме АВР галочка "Сгруппировать по договору" установлена по умолчанию.
    Примечание: при ручном вводе нового АВР до сохранения документа поле "Сгруппировать по договору" будет недоступно и галочка там не будет установлена. После сохранения и/или автозаполнения галочка будет установлена.

- [ADIRGSL-1284](https://jira.adacta-fintech.com/browse/ADIRGSL-1284): Печатные формы для партнера АКЦЕПТ

- [ADIRGSL-1285](https://jira.adacta-fintech.com/browse/ADIRGSL-1285): Небольшие технические заготовки к функционалу по созданию растордений менеждером. При тестировании достаточно только проверить, что при заведении расторжения сотрудником ОПЕРУ все осталось как было.

- [ADIRGSL-1288](https://jira.adacta-fintech.com/browse/ADIRGSL-1288): Корректировка логики CС по старому Вектору здоровья.

- [ADIRGSL-1291](https://jira.adacta-fintech.com/browse/ADIRGSL-1291): Тестирование ПСБ 03.06.2022.

- [ADIRGSL-1292](https://jira.adacta-fintech.com/browse/ADIRGSL-1292): КСЖ БФКО новые программы_защита кредита 2 и моя защита.

- [ADIRGSL-1293](https://jira.adacta-fintech.com/browse/ADIRGSL-1293): В поиске АВР в качестве обязательного параметра поиска добавлены фильтры "Дата выпуска АВР" и "Дата оплаты АВР"

- [ADIRGSL-1297](https://jira.adacta-fintech.com/browse/ADIRGSL-1297): Адаптация БИК и валюты счета контрагента под API.

- [ADIRGSL-883](https://jira.adacta-fintech.com/browse/ADIRGSL-883): В поиск договоров добавлен фильтр по застрахованному, в выводе результатов добавлен столбец


### Fixed (7 changes)

- [ADIRGSL-1041](https://jira.adacta-fintech.com/browse/ADIRGSL-1041): Contract activation do not work locally

- [ADIRGSL-1208](https://jira.adacta-fintech.com/browse/ADIRGSL-1208): Document number (Присвоение) for commission act transactions is now contract number (instead of commission act number).

- [ADIRGSL-1220](https://jira.adacta-fintech.com/browse/ADIRGSL-1220): Исправлено валидационное сообщение

- [ADIRGSL-1267](https://jira.adacta-fintech.com/browse/ADIRGSL-1267): Исправлена ошибка маппинга при получении данных о договоре.

- [ADIRGSL-1275](https://jira.adacta-fintech.com/browse/ADIRGSL-1275): Платежи. Ошибка работы сервиса: Incorrect syntax near the keyword 'from'.

- [ADIRGSL-935](https://jira.adacta-fintech.com/browse/ADIRGSL-935): Fix and refactor integration tests

- [ADIRGSL-974](https://jira.adacta-fintech.com/browse/ADIRGSL-974): Исправлена ошибка вычисления ручной ставки КВ в АВР после отмены идентификации.

# 9.0.0-rc1 (2022-05-19)

### Breaking Changes (2 changes)

- [ADIRGSL-1195](https://jira.adacta-fintech.com/browse/ADIRGSL-1195): Implemented creation of multiple payment orders.

    **Deployment Notes**
    Claim es index should be reindexed.

- [ADIRGSL-1203](https://jira.adacta-fintech.com/browse/ADIRGSL-1203): Added product group column to GET_TRANSACTIONS_VIEW.

    Need to manually execute script migration/get_transformed_transactions.sql


### New Features (14 changes)

- [ADIRGSL-1005](https://jira.adacta-fintech.com/browse/ADIRGSL-1005): Fixed payment descriptions for payment order document.

- [ADIRGSL-1022](https://jira.adacta-fintech.com/browse/ADIRGSL-1022): Доработка ПФ по БФКО в части вывода ПФ с незаполненными данными по контрагенту.

- [ADIRGSL-1140](https://jira.adacta-fintech.com/browse/ADIRGSL-1140): Добавлена возможность печати отчёта по АВР для нескольких отчётов из журнала АВР

- [ADIRGSL-1154](https://jira.adacta-fintech.com/browse/ADIRGSL-1154): Корректировка размера инофрмационного сообщения о количестве открытых задач.

- [ADIRGSL-1183](https://jira.adacta-fintech.com/browse/ADIRGSL-1183): Additional fixes and improvements for claims.
    Added payment amount recalculation on injuries table changes.

- [ADIRGSL-1186](https://jira.adacta-fintech.com/browse/ADIRGSL-1186): Настройка тестовых продуктов для любого партнера.

    Продукты: Демо ИСЖ и Демо НСЖ.
    Партнер должен быть с кодом 999999.
    Группа для пользователя SalesDemo.

- [ADIRGSL-1188](https://jira.adacta-fintech.com/browse/ADIRGSL-1188): Updated recipient bank account related data for payment order.

- [ADIRGSL-1192](https://jira.adacta-fintech.com/browse/ADIRGSL-1192): При переводе РНВ в статус "Оплачен" соответствующий ему АВР также переходит в статус "Оплачен"

- [ADIRGSL-1198](https://jira.adacta-fintech.com/browse/ADIRGSL-1198): Корректировки по результатам тестирования ПСБ ИСЖ 2.0 от 16.05.2022.

- [ADIRGSL-1205](https://jira.adacta-fintech.com/browse/ADIRGSL-1205): Снят запрет на возможность активации расторжения с ненулевой суммой без согласования руководителя ОПЕРУ.

- [ADIRGSL-1207](https://jira.adacta-fintech.com/browse/ADIRGSL-1207): Добавлены доп. логи для проверки КПК.

- [ADIRGSL-1211](https://jira.adacta-fintech.com/browse/ADIRGSL-1211): Корректировка выгрузки SAP для КСЖ продутков.

- [ADIRGSL-629](https://jira.adacta-fintech.com/browse/ADIRGSL-629): Added "credit refund" payment line for payment order.

- [ADIRGSL-806](https://jira.adacta-fintech.com/browse/ADIRGSL-806): Проверка на заполнение пола отключена, Логика на определение скорретрирована


### Fixed (3 changes)

- [ADIRGSL-1187](https://jira.adacta-fintech.com/browse/ADIRGSL-1187): Платежи. Ошибка идентификации

- [ADIRGSL-1204](https://jira.adacta-fintech.com/browse/ADIRGSL-1204): Исправлена ошибка с поиском АД по агенту.

- [ADIRGSL-1209](https://jira.adacta-fintech.com/browse/ADIRGSL-1209): Оптимизирован запрос для отбора платежей при индексации.

# 8.0.0-rc1 (2022-05-12)

### Breaking Changes (2 changes)

- [ADIRGSL-1131](https://jira.adacta-fintech.com/browse/ADIRGSL-1131): Changed premium payment type from single to multi value attribute for agent agreements.

    **Deployment notes**
    Following migration scripts must be executed BEFORE publishing:
    database/sql/migration/ADIRGSL-1131-prepare-migration.sql,
    database/sql/migration/ADIRGSL-1131-execute-doc-body-migration.sql,
    database/sql/migration/ADIRGSL-1131-execute-doc-ass-migration.sql,
    database/sql/migration/ADIRGSL-1131-finish-migration.sql.

- [ADIRGSL-889](https://jira.adacta-fintech.com/browse/ADIRGSL-889): Upgraded the platform to version 6.16.2. Upgraded the studio to version 15.6.1.


### New Features (9 changes)

- [ADIRGSL-1150](https://jira.adacta-fintech.com/browse/ADIRGSL-1150): Additional attribute for commission rate was added. Attribute is filled for all commission transactions.

- [ADIRGSL-1152](https://jira.adacta-fintech.com/browse/ADIRGSL-1152): Новая линейка ИСЖ ПСБ. Добавление префиксов и инвест. настроек.

- [ADIRGSL-1154](https://jira.adacta-fintech.com/browse/ADIRGSL-1154): Добавлен вывод информации об открытых задачах на главную страницу.

- [ADIRGSL-1165](https://jira.adacta-fintech.com/browse/ADIRGSL-1165): Корректировка выборки реестра обмена с SAP.

- [ADIRGSL-1168](https://jira.adacta-fintech.com/browse/ADIRGSL-1168): Сделано блокирование полей на форме ДС на расторжение в случае, если ДС недоступно для редактирования пользователю. По аналогии с договорами.

- [ADIRGSL-1178](https://jira.adacta-fintech.com/browse/ADIRGSL-1178): Корректировк по результатам тестирования ПФ ПСБ Базис Инвест и Базис Гарант.

- [ADIRGSL-1180](https://jira.adacta-fintech.com/browse/ADIRGSL-1180): Добавлен вывод информации об открытых задачах на главную страницу.

- [ADIRGSL-1183](https://jira.adacta-fintech.com/browse/ADIRGSL-1183): Minor critical logic alterations for claims.
    Added insured event date validation for cancelled policies
    Fixed enrichments call.

- [ADIRGSL-965](https://jira.adacta-fintech.com/browse/ADIRGSL-965): Fixed manual comm reset on comm recalculation.


### Fixed (1 changes)

- [ADIRGSL-935](https://jira.adacta-fintech.com/browse/ADIRGSL-935): Fix integration test. Wrong PO request.

# 7.0.0-rc1 (2022-05-06)

### Breaking Changes (2 changes)

- [ADIRGSL-1096](https://jira.adacta-fintech.com/browse/ADIRGSL-1096): Корректировка алгоритма ВС для КСЖ со сроком страхования с лишним днем.

    After deploy need to manually execute scripts:
    migration/ADIRGSL-1096-credit_sv_update
    migration/sapFilesIntergationHelper

- [ADIRGSL-920](https://jira.adacta-fintech.com/browse/ADIRGSL-920): Implemented insurance act approval printout.
    New claim documents should bew used for testing due to common body mapping changes.

    **Deployment notes**

    Claim es index should be reindexed.


### New Features (41 changes)

- [ADIRGSL-1019](https://jira.adacta-fintech.com/browse/ADIRGSL-1019): Updated request mappings for claim search view.

- [ADIRGSL-1022](https://jira.adacta-fintech.com/browse/ADIRGSL-1022): БФКО Финансовый Резерв Печатная форма

- [ADIRGSL-1031](https://jira.adacta-fintech.com/browse/ADIRGSL-1031): БФКО Базис Гарант Печатная форма

- [ADIRGSL-1034](https://jira.adacta-fintech.com/browse/ADIRGSL-1034): БФКО Базис Инвест Печатная форма

- [ADIRGSL-1054](https://jira.adacta-fintech.com/browse/ADIRGSL-1054): В карточке АВР для даты выпуска АВР (дата проводки) добавлена возможность редактирования в статусе Согласован

- [ADIRGSL-1056](https://jira.adacta-fintech.com/browse/ADIRGSL-1056): В журнале и форме АВР для ЮЛ в соответствующие поля выводится краткое наименование

- [ADIRGSL-1057](https://jira.adacta-fintech.com/browse/ADIRGSL-1057): Переставлены поля на форме поиска АВР

- [ADIRGSL-1058](https://jira.adacta-fintech.com/browse/ADIRGSL-1058): Сделана выгрузка журнала АВР в Excel

- [ADIRGSL-1059](https://jira.adacta-fintech.com/browse/ADIRGSL-1059): В журнале АВР добавлена ссылка перехода на АВР в поле № АВР, столбец ИД скрыт

- [ADIRGSL-1060](https://jira.adacta-fintech.com/browse/ADIRGSL-1060): Измененём набор полей вывода в журнале АВР и соответствующей выгрузке

- [ADIRGSL-1061](https://jira.adacta-fintech.com/browse/ADIRGSL-1061): Переименовано поле "Дата АВР" в "Дата выпуска АВР" в журнале АВР и соответствующей выгрузке

- [ADIRGSL-1062](https://jira.adacta-fintech.com/browse/ADIRGSL-1062): В карточке АВР скрыт столбец ИД

- [ADIRGSL-1063](https://jira.adacta-fintech.com/browse/ADIRGSL-1063): Добавлено поле Дата получения оригинала АВР

- [ADIRGSL-1064](https://jira.adacta-fintech.com/browse/ADIRGSL-1064): На форме АВР исторические данные перенесены на отдельную вкладку

- [ADIRGSL-1090](https://jira.adacta-fintech.com/browse/ADIRGSL-1090): Новые продукты КСЖ БФКО.

- [ADIRGSL-1092](https://jira.adacta-fintech.com/browse/ADIRGSL-1092): Доработка для LDWH: ZAG_AGR_part2

- [ADIRGSL-1105](https://jira.adacta-fintech.com/browse/ADIRGSL-1105): Extend error message text for auto-allocation

- [ADIRGSL-1099](https://jira.adacta-fintech.com/browse/ADIRGSL-1099): On policy cancellation and reactivation we now recalculate invoiced commission and post storno of invoiced commission transactions.

- [ADIRGSL-1100](https://jira.adacta-fintech.com/browse/ADIRGSL-1100): Корректировки для Вектор здоровья 2.0 ПСБ.

- [ADIRGSL-1101](https://jira.adacta-fintech.com/browse/ADIRGSL-1101): Доработка для LDWH: ZINS_CONT.

- [ADIRGSL-1104](https://jira.adacta-fintech.com/browse/ADIRGSL-1104): Заменить TODO на null в zds_algl_2, zds_algl_3.

- [ADIRGSL-1105](https://jira.adacta-fintech.com/browse/ADIRGSL-1105): Убран Subdivision из сервиса по ЧС.

- [ADIRGSL-1108](https://jira.adacta-fintech.com/browse/ADIRGSL-1108): Корректировки по результату тестирования Вектор 2.0 ПСБ.

- [ADIRGSL-1109](https://jira.adacta-fintech.com/browse/ADIRGSL-1109): Updated activity creation and insurance act availability for claims.

- [ADIRGSL-1116](https://jira.adacta-fintech.com/browse/ADIRGSL-1116): В агентский договор добавлен атрибут "Документация корректна"

- [ADIRGSL-1120](https://jira.adacta-fintech.com/browse/ADIRGSL-1120): ПСБ 2.0. Возврат линейки 1.0.

- [ADIRGSL-1125](https://jira.adacta-fintech.com/browse/ADIRGSL-1125): Added logic to store link to cancelled document number in case of storno transaction. Fixed also LDWH queries.

- [ADIRGSL-1126](https://jira.adacta-fintech.com/browse/ADIRGSL-1126): Изменено количество строк АВР по умолчанию на 100

- [ADIRGSL-1129](https://jira.adacta-fintech.com/browse/ADIRGSL-1129): В журнале АВР на фильтре статусов скрыто значение "Пусто"

- [ADIRGSL-1132](https://jira.adacta-fintech.com/browse/ADIRGSL-1132): Set aa comm rules range bounds inclusion == true by default.

- [ADIRGSL-1138](https://jira.adacta-fintech.com/browse/ADIRGSL-1138): Из строк АВР убран столбец "Внутренний номер договора" и соответствующий ему фильтр

- [ADIRGSL-1145](https://jira.adacta-fintech.com/browse/ADIRGSL-1145): Отключение продуктов ИСЖ для ПСБ c 01/05.

- [ADIRGSL-1149](https://jira.adacta-fintech.com/browse/ADIRGSL-1149): Перенаправить интеграцию РНВ с прода на тест 1С.

- [ADIRGSL-1152](https://jira.adacta-fintech.com/browse/ADIRGSL-1152): Перезапуск линейки ИСЖ ПСБ - настройка.

- [ADIRGSL-1155](https://jira.adacta-fintech.com/browse/ADIRGSL-1155): Корректировка функционала ПФ анкеты фин. грамотности.

- [ADIRGSL-1163](https://jira.adacta-fintech.com/browse/ADIRGSL-1163): Добавлена возможность отката корректности документации.

- [ADIRGSL-978](https://jira.adacta-fintech.com/browse/ADIRGSL-978): Disabled currency editing for aa document and amendments.

- [ADIRGSL-980](https://jira.adacta-fintech.com/browse/ADIRGSL-980): Updated translation for mvz aa attribute.

- [ADIRGSL-984](https://jira.adacta-fintech.com/browse/ADIRGSL-984): Added conclusion date auto fill based on document start date for aa.

- [ADIRGSL-994](https://jira.adacta-fintech.com/browse/ADIRGSL-994): Multiple changes for cliams ui design, logic and validations.

- [ADIRGSL-996](https://jira.adacta-fintech.com/browse/ADIRGSL-996): Доработка компонента "Форма выпуска" с заделом под эл. полисы.


### Fixed (6 changes)

- [ADIRGSL-1106](https://jira.adacta-fintech.com/browse/ADIRGSL-1106): Исправлена ошибка при выборе продукта через поиск по символам в случае, когда поиск давал пустой результат.

- [ADIRGSL-1107](https://jira.adacta-fintech.com/browse/ADIRGSL-1107): Платежи. Отмена платежа, сумма доступная для привязки ≠0

- [ADIRGSL-1110](https://jira.adacta-fintech.com/browse/ADIRGSL-1110): АВР. Ошибка при заполнении поля Код продукта

- [ADIRGSL-1121](https://jira.adacta-fintech.com/browse/ADIRGSL-1121): Updated party selection logic for payment order creation on payment refund.

- [ADIRGSL-1128](https://jira.adacta-fintech.com/browse/ADIRGSL-1128): РНВ. Ошибка отправки запроса в РГСЛ

- [ADIRGSL-1146](https://jira.adacta-fintech.com/browse/ADIRGSL-1146): Не работает загрузка платежей

# 6.0.0-rc1 (2022-04-25)

### Breaking Changes (2 changes)

- [ADIRGSL-1068](https://jira.adacta-fintech.com/browse/ADIRGSL-1068): Fixes for claim document and insurance act.

    **Deployment notes**

    Claim es index should be reindexed.

- [ADIRGSL-832](https://jira.adacta-fintech.com/browse/ADIRGSL-832): Скорректирована конфигурация правил для продуктов КСЖ.

    Need to manually execute migration script: ADIRGSL-832-credit-risk-rules.sql


### New Features (14 changes)

- [ADIRGSL-1000](https://jira.adacta-fintech.com/browse/ADIRGSL-1000): Финансовый резерв БФКО. Базовая конфигурация.

- [ADIRGSL-1012](https://jira.adacta-fintech.com/browse/ADIRGSL-1012): Добавлена выгрузка строк АВР

- [ADIRGSL-1045](https://jira.adacta-fintech.com/browse/ADIRGSL-1045): Доработка для LDWH: ZAG_AGR. ZAGR_STAT.

- [ADIRGSL-1053](https://jira.adacta-fintech.com/browse/ADIRGSL-1053): Критерий отбора "Расчетный период с/по" переименован в "Дата поступления с/по"

- [ADIRGSL-1055](https://jira.adacta-fintech.com/browse/ADIRGSL-1055): В журнале АВР добавлен фильтр "Отображать только акты с выплатой"

- [ADIRGSL-1066](https://jira.adacta-fintech.com/browse/ADIRGSL-1066): Корректировки по продуктам ПСБ 2.0.

- [ADIRGSL-1070](https://jira.adacta-fintech.com/browse/ADIRGSL-1070): Доп. конфиг прав для пользователя System на растордении КСЖ.

- [ADIRGSL-1087](https://jira.adacta-fintech.com/browse/ADIRGSL-1087): Updated insurance act printout to include risk additional info.

- [ADIRGSL-1094](https://jira.adacta-fintech.com/browse/ADIRGSL-1094): Updated risks checks and validations for claims.

- [ADIRGSL-1095](https://jira.adacta-fintech.com/browse/ADIRGSL-1095): Fixes for claims and payment order.

- [ADIRGSL-888](https://jira.adacta-fintech.com/browse/ADIRGSL-888): Добавлены исправления после теста и новый ДМС

- [ADIRGSL-935](https://jira.adacta-fintech.com/browse/ADIRGSL-935): Include new scripts into the api-test

- [ADIRGSL-952](https://jira.adacta-fintech.com/browse/ADIRGSL-952): Добавлен вывод строк акта в разрезе договоров

- [ADIRGSL-967](https://jira.adacta-fintech.com/browse/ADIRGSL-967): Fixed invoiced commission transaction amount. When commission act has manual amount, we now decrease invoiced commission in original invoiced commission amount instead of commission act amount.


### Fixed (1 changes)

- [ADIRGSL-1085](https://jira.adacta-fintech.com/browse/ADIRGSL-1085): Исправлен критерий поиска

# 5.0.0-rc1 (2022-04-20)

### Breaking Changes (6 changes)

- [ADIRGSL-1025](https://jira.adacta-fintech.com/browse/ADIRGSL-1025): АВР. Нулевые суммы КВ Оценка

- [ADIRGSL-1046](https://jira.adacta-fintech.com/browse/ADIRGSL-1046): Changes for transaction attributes `XREF2` and `BLART` were implemented.

    In order for accounting to detect local currency on RGSL environments implementation setting `LocalCurrencyCode` was added to `implSetting.json` in section `appSettings.AdInsure.Settings.Core.LocalCurrencyCode`. File location:
    * conf\rgsl-prod\server\implSettings.json
    * conf\rgsl\server\implSettings.json

- [ADIRGSL-1084](https://jira.adacta-fintech.com/browse/ADIRGSL-1084): Исправлена ошибка, из-за которой в поиск дублированных актов включались удалённые

- [ADIRGSL-829](https://jira.adacta-fintech.com/browse/ADIRGSL-829): Добавлена функциональность ownership для разграничения видимости между партнерами.

    Необходимо выполнить переиндексацию ES.

- [ADIRGSL-947](https://jira.adacta-fintech.com/browse/ADIRGSL-947): Implemented injury risk payment tables.
    New claim documents should be used for testing due to schema changes.

- [ADIRGSL-964](https://jira.adacta-fintech.com/browse/ADIRGSL-964): Fixed wrong risk sum calculation for claim document. Replaced contract search view for insured event document.

    **Deployment notes**
    Contract es index should be reindexed.


### New Features (26 changes)

- [ADIRGSL-1002](https://jira.adacta-fintech.com/browse/ADIRGSL-1002): Базис Инвест БФКО. Базовая конфигурация.

- [ADIRGSL-1003](https://jira.adacta-fintech.com/browse/ADIRGSL-1003): Базис Гарант БФКО. Базовая конфигурация.

- [ADIRGSL-1006](https://jira.adacta-fintech.com/browse/ADIRGSL-1006): Transactions are generated when payment order is paid (when outgoing BSI is allocated to payment order)

- [ADIRGSL-1015](https://jira.adacta-fintech.com/browse/ADIRGSL-1015): Добавлена фильтрацию по продуктам на основании группы продуктов

- [ADIRGSL-1016](https://jira.adacta-fintech.com/browse/ADIRGSL-1016): Добавлен учет дат изменения документов и адресов в выборку по контрагентам для LDWH.

- [ADIRGSL-1018](https://jira.adacta-fintech.com/browse/ADIRGSL-1018): 1) В планировщик добавлена задача автоматической идентификации платежей
    2) После изменения назначеня платежа производится попытка автоматической идентификации платежа

- [ADIRGSL-1043](https://jira.adacta-fintech.com/browse/ADIRGSL-1043): ПСБ. Вектор 2.0. Изменение программ и доп. триггеры.

- [ADIRGSL-1044](https://jira.adacta-fintech.com/browse/ADIRGSL-1044): Integration queries (LDWH ZDS_ALGL_2 and ZDS_ALGL_3) now return also values for attributes BELEGTC, BELEGSC, BUCHUGC, VORGAST.

- [ADIRGSL-1051](https://jira.adacta-fintech.com/browse/ADIRGSL-1051): Agent agreement change amendment validation fix.

- [ADIRGSL-759](https://jira.adacta-fintech.com/browse/ADIRGSL-759): Create api test for customer BSI import service

- [ADIRGSL-857](https://jira.adacta-fintech.com/browse/ADIRGSL-857): Отчет по активным пользователям

- [ADIRGSL-872](https://jira.adacta-fintech.com/browse/ADIRGSL-872): В планировщик добавлены новые задачи

- [ADIRGSL-884](https://jira.adacta-fintech.com/browse/ADIRGSL-884): Добавлена вкладка "Связанные Платежи" на форме договора ИЖС

- [ADIRGSL-891](https://jira.adacta-fintech.com/browse/ADIRGSL-891): Implemented transactions for cancellation amendment (reason = creditRepayment)

- [ADIRGSL-896](https://jira.adacta-fintech.com/browse/ADIRGSL-896): Implemented insured event document.

- [ADIRGSL-432](https://jira.adacta-fintech.com/browse/ADIRGSL-432): Avoid failure if no person data found

- [ADIRGSL-926](https://jira.adacta-fintech.com/browse/ADIRGSL-926): Обновление выборок LDWH, добавление даты обновления.

- [ADIRGSL-931](https://jira.adacta-fintech.com/browse/ADIRGSL-931): Implemented algorithm that calculates previous period flag based on provided additional attribute `DATE_TO_CHECK_PREV_PERIOD`.

- [ADIRGSL-932](https://jira.adacta-fintech.com/browse/ADIRGSL-932): Transactions for premium increase are attached to allocation.  We don't create transaction on invoice posting anymore.

- [ADIRGSL-946](https://jira.adacta-fintech.com/browse/ADIRGSL-946): Added new attributes for claim document

- [ADIRGSL-951](https://jira.adacta-fintech.com/browse/ADIRGSL-951): Добавлена возможность сортировки строк АВР

- [ADIRGSL-954](https://jira.adacta-fintech.com/browse/ADIRGSL-954): Добавлена ссылка на договор из строки АВР

- [ADIRGSL-955](https://jira.adacta-fintech.com/browse/ADIRGSL-955): Implement queries for LDWH ZDS_ALGL_2 and ZDS_ALGL_3

- [ADIRGSL-972](https://jira.adacta-fintech.com/browse/ADIRGSL-972): Добавлен вызов проверок КПК/ЧС при создании договора из котировки. Временно будет появляться непереведенное и переведенное сообщение, перевод добавлен в ядро, приедет со следующим обновлением. С учетом, что пользователи такую ошибку не получают, а если вдруг и получат, то все равно увидят корректный текст сообщения, считаю, что временное отсутствие перевода не критично.

- [ADIRGSL-995](https://jira.adacta-fintech.com/browse/ADIRGSL-995): LDWH. Доработка по листу ZAG_AGR.

- [ADIRGSL-997](https://jira.adacta-fintech.com/browse/ADIRGSL-997): LDWH. Доработка формата updated_on.


### Fixed (18 changes)

- [ADIRGSL-1007](https://jira.adacta-fintech.com/browse/ADIRGSL-1007): Nicer error is thrown on allocation if it happens that we don't have policy holder's data in ASS.

- [ADIRGSL-1023](https://jira.adacta-fintech.com/browse/ADIRGSL-1023): АВР. Столбец Порядок оплаты страховой премии и Период уплаты премии

- [ADIRGSL-1024](https://jira.adacta-fintech.com/browse/ADIRGSL-1024): Fixed query

- [ADIRGSL-1035](https://jira.adacta-fintech.com/browse/ADIRGSL-1035): АВР. Расчет НДС в акте

- [ADIRGSL-1039](https://jira.adacta-fintech.com/browse/ADIRGSL-1039): АВР. Отбор данных по дате очередного взноса

- [ADIRGSL-1042](https://jira.adacta-fintech.com/browse/ADIRGSL-1042): List of payment lines for PO amount calculation was extended with `creditRefund`.

- [ADIRGSL-1065](https://jira.adacta-fintech.com/browse/ADIRGSL-1065): АВР. Ручное КВ, обратный пересчет значений

- [ADIRGSL-1088](https://jira.adacta-fintech.com/browse/ADIRGSL-1088): АВР. Ошибка при расчете акта

- [ADIRGSL-939](https://jira.adacta-fintech.com/browse/ADIRGSL-939): Auto allocation response handling was fixed. Error on auto allocation does not appear anymore.

- [ADIRGSL-432](https://jira.adacta-fintech.com/browse/ADIRGSL-432): Fix tolerance type on bank statement import

- [ADIRGSL-948](https://jira.adacta-fintech.com/browse/ADIRGSL-948): АВР. Добавить переводы сообщений в акте

- [ADIRGSL-950](https://jira.adacta-fintech.com/browse/ADIRGSL-950): Show button `Annul` on commission act UI

- [ADIRGSL-432](https://jira.adacta-fintech.com/browse/ADIRGSL-432): Correct commission act item count

- [ADIRGSL-963](https://jira.adacta-fintech.com/browse/ADIRGSL-963): АВР. Номер договора посредника

- [ADIRGSL-966](https://jira.adacta-fintech.com/browse/ADIRGSL-966): АВР. ТНА

- [ADIRGSL-973](https://jira.adacta-fintech.com/browse/ADIRGSL-973): Исправлена ошибка с нарушением работы поисковика при сохранении договора расчитанного при пустом значении взноса.

- [ADIRGSL-975](https://jira.adacta-fintech.com/browse/ADIRGSL-975): Исправлена ошибка при открытии договоров КСЖ.

- [ADIRGSL-988](https://jira.adacta-fintech.com/browse/ADIRGSL-988): АВР. Строки акта должны быть доступны для включения в другие акты после сторнирования

# 4.0.0-rc1 (2022-04-04)

### Breaking Changes (3 changes)

- [ADIRGSL-860](https://jira.adacta-fintech.com/browse/ADIRGSL-860): Implemented insurance  act printout.

    **Deployment notes**

    ES indexes that should be reindexed: PaymentOrder, Claim, Contract.

- [ADIRGSL-889](https://jira.adacta-fintech.com/browse/ADIRGSL-889): Upgraded the platform to version 6.14.1. Upgraded the studio to version 15.6.0.

- [ADIRGSL-914](https://jira.adacta-fintech.com/browse/ADIRGSL-914): Функционал порядка следования рисков в UI и ПФ.

    After deploy need to execute correction script: migration/ADIRGSL-894-risk-order-update


### New Features (35 changes)

- [ADIRGSL-432](https://jira.adacta-fintech.com/browse/ADIRGSL-432): Скрыта кнопка печать до сохранения на анкете контрагента

- [ADIRGSL-462](https://jira.adacta-fintech.com/browse/ADIRGSL-462): В установочный пакет добавлена папка scheduler.

- [ADIRGSL-498](https://jira.adacta-fintech.com/browse/ADIRGSL-498): Implemented payment order netting

- [ADIRGSL-580](https://jira.adacta-fintech.com/browse/ADIRGSL-580): Добавлена опция отключения интеграции ЧС, интеграция временно отключена на средах РГСЖ (всегда возвращается положительный результат). Улучшено логирование.

- [ADIRGSL-714](https://jira.adacta-fintech.com/browse/ADIRGSL-714): Проверка на наличие в системе пользователя с таким табельным номером при загрузке

- [ADIRGSL-756](https://jira.adacta-fintech.com/browse/ADIRGSL-756): Скорректирована статусная модель по расторжениям, настроены валидации, добавлены комментарии к расторжениям, дополнен список доступных вложений

- [ADIRGSL-788](https://jira.adacta-fintech.com/browse/ADIRGSL-788): Добавлен вывод значение поля линии бизнеса в строках АВР
    Добавлено автозаполнение даты выпуска АВР (даты проводки)
    Добавлена валидация дублирующих актов

- [ADIRGSL-790](https://jira.adacta-fintech.com/browse/ADIRGSL-790): Поле ИНН в Анкете клиента, в разделе "Банковские счета"

- [ADIRGSL-828](https://jira.adacta-fintech.com/browse/ADIRGSL-828): Скорректирован список вложений по убыткам

- [ADIRGSL-830](https://jira.adacta-fintech.com/browse/ADIRGSL-830): Корректировка выборки агрегатных СС.

- [ADIRGSL-839](https://jira.adacta-fintech.com/browse/ADIRGSL-839): Transactions are posted on commission act creation:
    * Commission act
    * Invoiced commission storno

- [ADIRGSL-840](https://jira.adacta-fintech.com/browse/ADIRGSL-840): Отчет по контрактам будет искать соответствия по краткому имени подразделения, вместо внутреннего кода.

- [ADIRGSL-850](https://jira.adacta-fintech.com/browse/ADIRGSL-850): Обновление тарификации по ПСБ НСЖ 2.0.

- [ADIRGSL-851](https://jira.adacta-fintech.com/browse/ADIRGSL-851): Refactoring of invoicing jobs

- [ADIRGSL-856](https://jira.adacta-fintech.com/browse/ADIRGSL-856): Декларации по новой линейке ПСБ.

- [ADIRGSL-859](https://jira.adacta-fintech.com/browse/ADIRGSL-859): Переведены ошибки при не заполнении обязательных полей в форме акта

- [ADIRGSL-861](https://jira.adacta-fintech.com/browse/ADIRGSL-861): Печатные формы для продуктов Вектор Здоровья и Надежный Выбор

- [ADIRGSL-863](https://jira.adacta-fintech.com/browse/ADIRGSL-863): Базис Гарант - базовая конфигурация.

- [ADIRGSL-865](https://jira.adacta-fintech.com/browse/ADIRGSL-865): Добавлен хардкод для подтягивания а ПФ Драйверов инвест инструментов январского окна при дате заключения 29/12/2021.

- [ADIRGSL-866](https://jira.adacta-fintech.com/browse/ADIRGSL-866): run integration tests on the pipeline

- [ADIRGSL-888](https://jira.adacta-fintech.com/browse/ADIRGSL-888): Печатные формы для продуктов Базиз: Гарант и Инвест

- [ADIRGSL-868](https://jira.adacta-fintech.com/browse/ADIRGSL-868): Корректировка поисковика договоров, изменение алгоритма формирования ссылки для непревышения лимита backLink.

- [ADIRGSL-873](https://jira.adacta-fintech.com/browse/ADIRGSL-873): Добавлены конфигурационные настройки Планировщика задач для продуктивной среды.

- [ADIRGSL-882](https://jira.adacta-fintech.com/browse/ADIRGSL-882): Корректировка выборки SAP по новым продуктам ПСБ.

- [ADIRGSL-884](https://jira.adacta-fintech.com/browse/ADIRGSL-884): На форму договора добавлена вкладка со связанными платежами

- [ADIRGSL-890](https://jira.adacta-fintech.com/browse/ADIRGSL-890): Transactions are posted when outgoing BSI is allocated to Claim payment order.

- [ADIRGSL-894](https://jira.adacta-fintech.com/browse/ADIRGSL-894): Корректировки по результатам тестирования ПСБ 2.0 НВ/НВП.

- [ADIRGSL-900](https://jira.adacta-fintech.com/browse/ADIRGSL-900): Валидация на Вектор здоровья для 2 и 3 программ.

- [ADIRGSL-910](https://jira.adacta-fintech.com/browse/ADIRGSL-910): Исправлено поведение витрины задач - ранее всегда автоматом заполнялась первая попавшаяся группа, что было неудобно в случае наличия у пользователя нескольких групп. Теперь группа будет автоматически заполняться в случае, если у пользователя только одна группа.

- [ADIRGSL-915](https://jira.adacta-fintech.com/browse/ADIRGSL-915): Обертка функций для LDWH во вью.

- [ADIRGSL-924](https://jira.adacta-fintech.com/browse/ADIRGSL-924): В убыток обавлен атрибут Способ подачи заявления

- [ADIRGSL-927](https://jira.adacta-fintech.com/browse/ADIRGSL-927): Подготовка таблиц вместо вью и функций для LDWH.

- [ADIRGSL-933](https://jira.adacta-fintech.com/browse/ADIRGSL-933): Доработка валидаций на загрузчике ПОх.

- [ADIRGSL-936](https://jira.adacta-fintech.com/browse/ADIRGSL-936): Подключен функционал автоматического определения АД и расчета ставок КВ к группам продуктов НСЖ и ИСЖ.
    ВНИМАНИЕ: для корректной работы необходимо иметь корректно созданный АД. Валидации отключены, в случае отсутствия АД просто не будет заполняться, как было ранее. Но в случае наличия АД, внутри него должны быть обязательно заданы условия вознаграждения применимые к оформляемому договору.

- [ADIRGSL-937](https://jira.adacta-fintech.com/browse/ADIRGSL-937): Изменен механизм установки партнера при создании котировки. Добавлено определение партнера по орг. структуре.


### Fixed (15 changes)

- [ADIRGSL-705](https://jira.adacta-fintech.com/browse/ADIRGSL-705): Ошибка исправлена.

- [ADIRGSL-852](https://jira.adacta-fintech.com/browse/ADIRGSL-852): Commission act. Small UI fixes.

- [ADIRGSL-853](https://jira.adacta-fintech.com/browse/ADIRGSL-853): Validate party code on payment order

- [ADIRGSL-858](https://jira.adacta-fintech.com/browse/ADIRGSL-858): remove unused fields from the reference_number table

- [ADIRGSL-864](https://jira.adacta-fintech.com/browse/ADIRGSL-864): fix rounding issue
    pre-sort act items befor inserting into DB

- [ADIRGSL-870](https://jira.adacta-fintech.com/browse/ADIRGSL-870): Сделаны исправления маппинга интеграции черных списков.

- [ADIRGSL-887](https://jira.adacta-fintech.com/browse/ADIRGSL-887): Fixed recipient account error on po form open.

- [ADIRGSL-892](https://jira.adacta-fintech.com/browse/ADIRGSL-892): Fix UI blocked by the error

- [ADIRGSL-893](https://jira.adacta-fintech.com/browse/ADIRGSL-893): fix state activity allocation

- [ADIRGSL-895](https://jira.adacta-fintech.com/browse/ADIRGSL-895): Ошибка исправлена.

- [ADIRGSL-902](https://jira.adacta-fintech.com/browse/ADIRGSL-902): Query bugfix

- [ADIRGSL-903](https://jira.adacta-fintech.com/browse/ADIRGSL-903): Do not clear actId search parameter

- [ADIRGSL-906](https://jira.adacta-fintech.com/browse/ADIRGSL-906): Fixed some controls avalability on po form.

- [ADIRGSL-907](https://jira.adacta-fintech.com/browse/ADIRGSL-907): 1) Исправлено "перемешивание" использования кода контрагента и кода поставщика услуг
    2) Исправлены интеграционные тесты
    3) Добавлена "обёртка" для получения конкретной ошибки при вызове интеграционного сервиса CreatePaymentOrder из плагина
    4) Исправлен запрос

- [ADIRGSL-935](https://jira.adacta-fintech.com/browse/ADIRGSL-935): Temporary disable failed test

# 3.0.0-rc1 (2022-03-10)

### Breaking Changes (4 changes)

- [ADIRGSL-783](https://jira.adacta-fintech.com/browse/ADIRGSL-783): Fixed some minor issues with claim document.

    **Deployment notes**'
    "Contract" index should be reindexed.

- [ADIRGSL-805](https://jira.adacta-fintech.com/browse/ADIRGSL-805): Исправлена ошибка, когда при заведении заявки инициатором проставлялся не тот, кто создал.

    After deploy need:
    1. Manually execute script migration/ADIRGSL-805-initiator-update
    2. Reindex ES

- [ADIRGSL-815](https://jira.adacta-fintech.com/browse/ADIRGSL-815): Send payment order request to the RGSL

    BREAKING! Update the environmentVariables.json according to commited settings!

- [ADIRGSL-821](https://jira.adacta-fintech.com/browse/ADIRGSL-821): В случае, когда договор был переведен из статуса проект в статус отменен, у сотрудника ОПЕРУ появится возможность перевести договор обратно из статуса отменен в статус проект.

    Need to manually execute script migration/ADIRGSL-821-transition-result-update


### New Features (41 changes)

- [ADIRGSL-462](https://jira.adacta-fintech.com/browse/ADIRGSL-462): В конфигурацию добавлены настройки для работы планировщика задач.
    Добавлена [документация по установке и обновлению](https://git.adacta-fintech.com/rgs-life/implementation/-/tree/master/docs/administration/Scheduler.md) планировщика.

- [ADIRGSL-495](https://jira.adacta-fintech.com/browse/ADIRGSL-495): updated states and attachments

- [ADIRGSL-506](https://jira.adacta-fintech.com/browse/ADIRGSL-506): Implemented payment order creation for comm acts.

- [ADIRGSL-508](https://jira.adacta-fintech.com/browse/ADIRGSL-508): Implemented payment orders creation for claims

- [ADIRGSL-567](https://jira.adacta-fintech.com/browse/ADIRGSL-567): Transactions (and related attributes) for invoiced commission were configured.

- [ADIRGSL-580](https://jira.adacta-fintech.com/browse/ADIRGSL-580): Интеграция с ЧС. Создан сервис для проверки контрагента на наличие его в черных списках.

    Для работы сервиса **НА ТЕСТОВОЙ СРЕДЕ** необходимо добавить имплементационные настройки в файл implSettings.json:
        ```
        /*RGSL plugin settings*/
        "RGSL": {
            "Integration": {
                "KPK": {
                  "UserName": "ADINSURE",
                  "Password": "wl#df9rUuW",
                  "Uri": "http://life-1cw-03/1C_KPK_LIFE2021_QUA/ws/BL.1cws"
                }
            }
        }
        ```
    Для работы сервиса **НА ПРОДЕ** необходимо добавить имплементационные настройки в файл implSettings.json:
        ```
        /*RGSL plugin settings*/
        "RGSL": {
            "Integration": {
                "KPK": {
                  "UserName": "ADINSURE",
                  "Password": "wl#df9rUuW",
                  "Uri": "http://life-1cw-03/1C_KPK_LIFE2021_PRD/ws/BL.1cws"
                }
            }
        }
        ```

- [ADIRGSL-625](https://jira.adacta-fintech.com/browse/ADIRGSL-625): Скорректирован маппинг роли при вызове проверки КПК в момент выбора контрагента в котировке.

- [ADIRGSL-670](https://jira.adacta-fintech.com/browse/ADIRGSL-670): Скорректирован маппинг статусов в запросе по договорам LDWH.

- [ADIRGSL-721](https://jira.adacta-fintech.com/browse/ADIRGSL-721): Добавлена авторизация на вызов PreparePaymentPlanBasedInvoiceETLService

- [ADIRGSL-772](https://jira.adacta-fintech.com/browse/ADIRGSL-772): Implemented comm rules validation.

- [ADIRGSL-777](https://jira.adacta-fintech.com/browse/ADIRGSL-777): Added beneficiaries attribute for claim document.

- [ADIRGSL-786](https://jira.adacta-fintech.com/browse/ADIRGSL-786): КСЖ. Скорректирована обязательность заполнения полей. Скорректирован расчет СС.

- [ADIRGSL-787](https://jira.adacta-fintech.com/browse/ADIRGSL-787): Интерфейс выбора банковского счета на форме РНВ

- [ADIRGSL-791](https://jira.adacta-fintech.com/browse/ADIRGSL-791): Скорректировано определение пола при загрузке реестра КСЖ.

- [ADIRGSL-792](https://jira.adacta-fintech.com/browse/ADIRGSL-792): Доработано определение пола по окончанию отчества при загрузке КСЖ.

- [ADIRGSL-793](https://jira.adacta-fintech.com/browse/ADIRGSL-793): Переименование импорта в период охлаждения.

- [ADIRGSL-794](https://jira.adacta-fintech.com/browse/ADIRGSL-794): Preapare first integration API test

- [ADIRGSL-799](https://jira.adacta-fintech.com/browse/ADIRGSL-799): Добавлены скобки и кавычки в валидацию поля "Кем выдан" паспорта.

- [ADIRGSL-800](https://jira.adacta-fintech.com/browse/ADIRGSL-800): При копировании заявки, на скопированной заявке, на закладке справа появится ссылка на заявку, из которой она была скопирована.

- [ADIRGSL-802](https://jira.adacta-fintech.com/browse/ADIRGSL-802): Все платежи, которые поступили на счет 40701810701700000301 считаются большим платежом-реестром.

- [ADIRGSL-804](https://jira.adacta-fintech.com/browse/ADIRGSL-804): SQL function `get_transformed_transactions` was added. It transforms accounting transactions in format for SAP.

    Example: `select * from get_transformed_transactions();`

- [ADIRGSL-807](https://jira.adacta-fintech.com/browse/ADIRGSL-807): График траншей по инвестиционным продуктам _ обновление

- [ADIRGSL-808](https://jira.adacta-fintech.com/browse/ADIRGSL-808): Изменение клиентских условий по ПСБ с 22.02.2022

- [ADIRGSL-809](https://jira.adacta-fintech.com/browse/ADIRGSL-809): Алгоритм расчета графика платежей на договоре в рамках 5968. В связи со сдвигом сроков, на текущий момент установлено применение алгоритма с 01/04/2050. Можно протестировать, но на актуальные продажи не повлияет.

- [ADIRGSL-816](https://jira.adacta-fintech.com/browse/ADIRGSL-816): Additional improvements for claim document.

- [ADIRGSL-817](https://jira.adacta-fintech.com/browse/ADIRGSL-817): Корректировка выборки реестра обмена с SAP

- [ADIRGSL-818](https://jira.adacta-fintech.com/browse/ADIRGSL-818): Configured payment transactions for:
    * Import of bank statement item
    * Cancellation (storno) of bank statement item
    * Payment allocation
    * Payment allocation cancellation (storno)

- [ADIRGSL-822](https://jira.adacta-fintech.com/browse/ADIRGSL-822): КВ по ПСБ с 01.03.2022

- [ADIRGSL-824](https://jira.adacta-fintech.com/browse/ADIRGSL-824): Скорректировано поведение по блокированию/разблокированию кнопок изменения статусов на документе верификации вложений в зависимости от наличия/отсутствия назначенной на пользователя задачи по работе с данным документом.

- [ADIRGSL-826](https://jira.adacta-fintech.com/browse/ADIRGSL-826): Fix studio problems

- [ADIRGSL-827](https://jira.adacta-fintech.com/browse/ADIRGSL-827): Надежный выбор. Новое заявление и блокировка выпуска при несогласии с мед. декларацией.

- [ADIRGSL-830](https://jira.adacta-fintech.com/browse/ADIRGSL-830): Запрос для получения выборки агрегатных СС КСЖ для последующей загрузки в SAP.

    -- data on date
    select *
      from dbo.impl_get_credit_aggregated_sums('2022-02-28')
     order by contract_number, insured_sum_type, period_number

    -- data by contract on any date
    select *
      from dbo.impl_get_credit_aggregated_sums(null)
     where contract_number in ('88000-000000370')
     order by contract_number, insured_sum_type, period_number

- [ADIRGSL-831](https://jira.adacta-fintech.com/browse/ADIRGSL-831): Добавлена конфигурация по ограничению размера файла вложения.

- [ADIRGSL-842](https://jira.adacta-fintech.com/browse/ADIRGSL-842): Добавлено версионирование тарифов КСЖ по дате, скорректированы тарифы с 05/03/2022.

- [ADIRGSL-843](https://jira.adacta-fintech.com/browse/ADIRGSL-843): Обновлен алгоритм расчета СС по КСЖ в части значения первого периода.

- [ADIRGSL-844](https://jira.adacta-fintech.com/browse/ADIRGSL-844): Implement payment order allocation

- [ADIRGSL-847](https://jira.adacta-fintech.com/browse/ADIRGSL-847): Добавлен символ № в число разрешенных символов в поле "Кем выдан" паспорта.

- [ADIRGSL-850](https://jira.adacta-fintech.com/browse/ADIRGSL-850): Подготовительные работы по настройке новой линейки ПСБ. Рефакторинг конфигурации продуктов.

    ВНИМАНИЕ: для проверки перескока дат на тесте, установлена дата перехода на новые продукты как 16/03. В следубщем релизе скорректируем на 24/03.

- [ADIRGSL-854](https://jira.adacta-fintech.com/browse/ADIRGSL-854): Добавлено наследование ролей по АВР из групп для АД и АВР.

- [ADIRGSL-855](https://jira.adacta-fintech.com/browse/ADIRGSL-855): Fixed field type in data source mapping

- [ADIRGSL-856](https://jira.adacta-fintech.com/browse/ADIRGSL-856): Первичная конфигурация продукта Базис Инвест.


### Fixed (5 changes)

- [ADIRGSL-769](https://jira.adacta-fintech.com/browse/ADIRGSL-769): Багфикс в ручной идентификации и печатной форме АВР

- [ADIRGSL-788](https://jira.adacta-fintech.com/browse/ADIRGSL-788): Добавлен вывод значение поля линии бизнеса в строках АВР

- [ADIRGSL-810](https://jira.adacta-fintech.com/browse/ADIRGSL-810): Исправлена ошибка, появляющаяся через некоторое время после выбора в витрине задач группы "Продажи ПСБ".

- [ADIRGSL-814](https://jira.adacta-fintech.com/browse/ADIRGSL-814): Багфикс в карточке и печатной форме АВР

- [ADIRGSL-819](https://jira.adacta-fintech.com/browse/ADIRGSL-819): Fixed post date for premium incrase transactions.

# 2.0.0-rc1 (2022-02-13)

### Breaking Changes (4 changes)

- [ADIRGSL-670](https://jira.adacta-fintech.com/browse/ADIRGSL-670): ASS для LDWH ZINS_CONT

    After publish need to manually execute script migration/ADIRGSL-670-contracts-ass-fill

- [ADIRGSL-731](https://jira.adacta-fintech.com/browse/ADIRGSL-731): Implemented document flow for claims.

    **Deployment notes**
    "Claim" es index should be reindexed.

- [ADIRGSL-761](https://jira.adacta-fintech.com/browse/ADIRGSL-761): Implemented claims search view.

    **Deployment notes**
    "Claim" index should be reindexed.

- [ADIRGSL-773](https://jira.adacta-fintech.com/browse/ADIRGSL-773): Корректировка выборки для интеграции по результатам тестирования от 09/02/2022.

    After publish need to manually execute script migration/sapFilesIntergationHelper


### New Features (7 changes)

- [ADIRGSL-331](https://jira.adacta-fintech.com/browse/ADIRGSL-331): Если нет триггеров, то скрывается поле для добавления вложения типа Заявление на страхование.
    Увеличено встроенное окно по вводу контрагента.

- [ADIRGSL-515](https://jira.adacta-fintech.com/browse/ADIRGSL-515): Добавлена история изменений данных платежа. Функционал доступен в журнале платежей в деталях платежа

- [ADIRGSL-633](https://jira.adacta-fintech.com/browse/ADIRGSL-633): 1) Bugfix for GetPartyBankAccountsDataProvider
    2) Calculate fields for BankStatementItemRgslSearchDataProvider

- [ADIRGSL-719](https://jira.adacta-fintech.com/browse/ADIRGSL-719): Payment order allocation

- [ADIRGSL-767](https://jira.adacta-fintech.com/browse/ADIRGSL-767): ASS для LDWH ZAG_AGR

- [ADIRGSL-774](https://jira.adacta-fintech.com/browse/ADIRGSL-774): preapare integration API test infrastructure

- [ADIRGSL-779](https://jira.adacta-fintech.com/browse/ADIRGSL-779): Скорректирован выгрузчик ошибок загрузки КСЖ. Добавлен столбец с содержанием только сообщений об ошиюках. Остальные столбцы тоже остались, но они все правее, их можно легко удалить. При необходимости более красивого решения понадобится больше трудозатрат.


### Fixed (3 changes)

- [ADIRGSL-693](https://jira.adacta-fintech.com/browse/ADIRGSL-693): Fixed validation tests

- [ADIRGSL-721](https://jira.adacta-fintech.com/browse/ADIRGSL-721): Use sequence generator for invoice numbers

- [ADIRGSL-770](https://jira.adacta-fintech.com/browse/ADIRGSL-770): Fixed incorrect encoding in claims code-tables

# 2.0.0-pre1 (2022-02-08)

### Breaking Changes (3 changes)

- [ADIRGSL-633](https://jira.adacta-fintech.com/browse/ADIRGSL-633): ASS для LDWH ZPARTNER

    After publish need to manually execute script migration/ADIRGSL-633-party-ass-fill

- [ADIRGSL-696](https://jira.adacta-fintech.com/browse/ADIRGSL-696): Обновление выборки данных для интерации с SAP.

    После деплоя необходимо выполнить скрипт migration/sapFilesIntergationHelper

- [ADIRGSL-707](https://jira.adacta-fintech.com/browse/ADIRGSL-707): Implemented claim document.

    **Deployment notes**
    Contracts index should be reindexed before publishing.


### New Features (19 changes)

- [ADIRGSL-443](https://jira.adacta-fintech.com/browse/ADIRGSL-443): Выполнена выгрузка АВР в печатную форму формата Excel

- [ADIRGSL-542](https://jira.adacta-fintech.com/browse/ADIRGSL-542): Подготовлен загрузчик договоров КСЖ, см. инструкцию в задаче.

- [ADIRGSL-550](https://jira.adacta-fintech.com/browse/ADIRGSL-550): Изменены параметры по-умолчанию для журнала платежей

- [ADIRGSL-566](https://jira.adacta-fintech.com/browse/ADIRGSL-566):
    * Definition of code tables for this kind of attributes
    * Definition of journal Additional attributes
    * Definition of General Ledger Additional attributes
    * Configuration (DB) and calculation (code) of some GL attributes
    * Validation & filtering of transaction (GL) attributes based on SAP GL Account.
    * Preparation of attribute value set for searching for posting profile
    * Configuration of posting scheme and posting profiles for premium increase (4 transaction variants)
    * Additional datasources to fetch attribute values from contract, risks and party.
- [ADIRGSL-609](https://jira.adacta-fintech.com/browse/ADIRGSL-609): Изменён формат файла загрузки реестров КСЖ на CSV кодировки UTF-8

- [ADIRGSL-690](https://jira.adacta-fintech.com/browse/ADIRGSL-690): Доп. соглашение на расторжение - доработки.

- [ADIRGSL-699](https://jira.adacta-fintech.com/browse/ADIRGSL-699): Implemented ASs mapping for payment orders.

- [ADIRGSL-706](https://jira.adacta-fintech.com/browse/ADIRGSL-706): При открытии формы поиска платеей из списка загруженных платежей даты по дефолту не проставляются

- [ADIRGSL-710](https://jira.adacta-fintech.com/browse/ADIRGSL-710): Вью с информацией и ссылками

- [ADIRGSL-711](https://jira.adacta-fintech.com/browse/ADIRGSL-711): INN(KIO) refactoring.

- [ADIRGSL-712](https://jira.adacta-fintech.com/browse/ADIRGSL-712): Resolve package dependency issue.

- [ADIRGSL-717](https://jira.adacta-fintech.com/browse/ADIRGSL-717): Скрытие Страйк Оптимум от продавца.

- [ADIRGSL-722](https://jira.adacta-fintech.com/browse/ADIRGSL-722): Доработка загрузчика договоров КСЖ + добавление новых атрибутоы на форму договора КСЖ.

- [ADIRGSL-729](https://jira.adacta-fintech.com/browse/ADIRGSL-729): Изменение логики инвест. настроек обратно с даты начала на дату заключения.

- [ADIRGSL-730](https://jira.adacta-fintech.com/browse/ADIRGSL-730): Изменение тарифов КСЖ.

- [ADIRGSL-741](https://jira.adacta-fintech.com/browse/ADIRGSL-741): Выгрузка в Excel данных по верификации.

- [ADIRGSL-743](https://jira.adacta-fintech.com/browse/ADIRGSL-743): Доработка отчета журнал договоров.

- [ADIRGSL-748](https://jira.adacta-fintech.com/browse/ADIRGSL-748): Загрузчик расторжений ПОх КСЖ.

- [ADIRGSL-749](https://jira.adacta-fintech.com/browse/ADIRGSL-749): Расторжение ПДПК.


### Fixed (4 changes)

- [ADIRGSL-705](https://jira.adacta-fintech.com/browse/ADIRGSL-705): Исправлены ошибки работы интерфейса на форме ручной идентификации

- [ADIRGSL-713](https://jira.adacta-fintech.com/browse/ADIRGSL-713): Исправлена ошибка с проставлением видимости договоров на карточке сотрудника при загрузке пользователей.

- [ADIRGSL-715](https://jira.adacta-fintech.com/browse/ADIRGSL-715): Commission act. Not all fields have to be editable.

- [ADIRGSL-728](https://jira.adacta-fintech.com/browse/ADIRGSL-728): Исправлены условия видимости продуктов.

# 1.0.0-rc1 (2022-01-25)

### New Features (9 changes)

- [ADIRGSL-442](https://jira.adacta-fintech.com/browse/ADIRGSL-442): Ролевая модель доступа добавлена для АВР

- [ADIRGSL-648](https://jira.adacta-fintech.com/browse/ADIRGSL-648): Process parallel sessions in the cash-flow.

- [ADIRGSL-666](https://jira.adacta-fintech.com/browse/ADIRGSL-666): 1. Добавлен пересчёт вычисляемых полей в шапке АВР, выполненный на основании его строк
    2. Введена таблица ставок НДС

- [ADIRGSL-685](https://jira.adacta-fintech.com/browse/ADIRGSL-685): Замена правил страхования ИСЖ, обновление данных подписанта от СК.

- [ADIRGSL-686](https://jira.adacta-fintech.com/browse/ADIRGSL-686): Implemented PIT payment order creation on policy cancellation.

- [ADIRGSL-692](https://jira.adacta-fintech.com/browse/ADIRGSL-692): Add commission act parallel sessions control.

- [ADIRGSL-697](https://jira.adacta-fintech.com/browse/ADIRGSL-697): Рефакторинг для использования PTY_IMPL в датапровайдере истории статусов.

- [ADIRGSL-698](https://jira.adacta-fintech.com/browse/ADIRGSL-698): Изменение ставок КВ для ПСБ с 01.02.2022

- [ADIRGSL-703](https://jira.adacta-fintech.com/browse/ADIRGSL-703): Добавлен триггер на единовременный взнос по продуктам НСЖ для ПСБ mass.


### Fixed (3 changes)

- [ADIRGSL-551](https://jira.adacta-fintech.com/browse/ADIRGSL-551): Clean-up SpmPolicyVersionActivated
    In allocation process selected pilicies with opened balances only

- [ADIRGSL-668](https://jira.adacta-fintech.com/browse/ADIRGSL-668):
    - fixed modules structure;
     - added required dependencies;
     - fix circle references.
- [ADIRGSL-704](https://jira.adacta-fintech.com/browse/ADIRGSL-704): Исправлена ошибка при пересчете рисков после добваления/изменения рисков.

# 1.0.0-pre19 (2022-01-18)

### Breaking Changes (8 changes)

- [ADIRGSL-314](https://jira.adacta-fintech.com/browse/ADIRGSL-314): Добавлено ограничение подразделений для пользователей, выбранных в качестве Коуча, Территориального руководителя или Регионального директора.

    After deploy need to execute script: migration/ADIRGSL-314-update-org-unit-sat

- [ADIRGSL-362](https://jira.adacta-fintech.com/browse/ADIRGSL-362): Upgraded the platform to version 6.11.0. Upgraded the studio to version 15.5.1.

- [ADIRGSL-503](https://jira.adacta-fintech.com/browse/ADIRGSL-503): Implemented payment order search view.
    Added view with related payment orders for accumulated and investment life insurance policies.

    Following es indexes should be reindexed: adinsure_index_partysearchdocument, adinsure_index_paymentorder.

- [ADIRGSL-514](https://jira.adacta-fintech.com/browse/ADIRGSL-514): move BSI search to ES

    the last MR will require to rebild ES index. To do this remove adinsure_index_bank_statement_item index (if exists)

- [ADIRGSL-578](https://jira.adacta-fintech.com/browse/ADIRGSL-578): Updated eval attr links generation.
    Rewrited code related to data creation for comm rules sattelites.

    WARNING: Due to schema changes NEW agent agreements should be used for testing.

- [ADIRGSL-579](https://jira.adacta-fintech.com/browse/ADIRGSL-579): Implemented ASs mappings for aa amendments.

    7.10_005.013.000_023.sql should be executed before publishing.

- [ADIRGSL-584](https://jira.adacta-fintech.com/browse/ADIRGSL-584): Скорректирована схема учета выбранной стратегии на договоре.

    После деплоя необходимо запустить корректировочный скрипт ADIRGSL-584-update-invest-strategy

- [ADIRGSL-681](https://jira.adacta-fintech.com/browse/ADIRGSL-681): Скорректированы наименования индексов ES.

    Необходима переиндексация ES.


### New Features (36 changes)

- [ADIRGSL-324](https://jira.adacta-fintech.com/browse/ADIRGSL-324): Добавлены подсказки по допустимому возрасту застрахованного и страхователя.
    Добавлены подсказки по допустимому размеру взноса.

- [ADIRGSL-433](https://jira.adacta-fintech.com/browse/ADIRGSL-433): АВР
    1 этап. Добавлен журнал АВР
    2 этап. Добавлена шапка формы АВР

- [ADIRGSL-436](https://jira.adacta-fintech.com/browse/ADIRGSL-436): prepare act line view

- [ADIRGSL-437](https://jira.adacta-fintech.com/browse/ADIRGSL-437): Refactoring of payable commission

- [ADIRGSL-438](https://jira.adacta-fintech.com/browse/ADIRGSL-438): Implement act item actions (UI)
    Implement act actions (UI)

- [ADIRGSL-440](https://jira.adacta-fintech.com/browse/ADIRGSL-440): Commission act refactoring
    Commission act number generation

- [ADIRGSL-445](https://jira.adacta-fintech.com/browse/ADIRGSL-445): В Журнале Актов доработано содержание результирующих строк поиска и фильтры по строкам

- [ADIRGSL-490](https://jira.adacta-fintech.com/browse/ADIRGSL-490): Implemented numbering rule for payment orders. Format example: `2021_00000001`.

- [ADIRGSL-496](https://jira.adacta-fintech.com/browse/ADIRGSL-496): Updated company bank accounts code table.

- [ADIRGSL-505](https://jira.adacta-fintech.com/browse/ADIRGSL-505):
    * Integration service for creation of payment order.
    * Craetion of `PaymentRefund` payment order from payment orverview.
- [ADIRGSL-507](https://jira.adacta-fintech.com/browse/ADIRGSL-507): Implemented payment order creation on policy cancellation.

- [ADIRGSL-531](https://jira.adacta-fintech.com/browse/ADIRGSL-531): Корректировка настроек тестовой среды Адакта.

- [ADIRGSL-533](https://jira.adacta-fintech.com/browse/ADIRGSL-533): Скорректирован механизм переиндексации ES.
    Добавлена возможность вызова переиндексации ES через плагин.

- [ADIRGSL-541](https://jira.adacta-fintech.com/browse/ADIRGSL-541): Подготовлена начальная структура для линейки продуктов КСЖ.

- [ADIRGSL-544](https://jira.adacta-fintech.com/browse/ADIRGSL-544): Выполнен импорт реестра КСЖ из xlsx-файла, т.к. провайдер для импорта из csv-файлов недоступен. Импорт осуществляется в ту же таблицу ACC_IMPL.AGGREGATED_PAYMENT_REGISTER, формат строки определяется новым полем SOURCE_FILE_FORMAT (значения: 1-ПСБ, 2-КСЖ)

- [ADIRGSL-549](https://jira.adacta-fintech.com/browse/ADIRGSL-549): В журнал платежей добавлен предустановленный фильтр по дате платежа

- [ADIRGSL-552](https://jira.adacta-fintech.com/browse/ADIRGSL-552): add 'export payments' on the payment view

- [ADIRGSL-560](https://jira.adacta-fintech.com/browse/ADIRGSL-560): Refactor invoiced commission

- [ADIRGSL-561](https://jira.adacta-fintech.com/browse/ADIRGSL-561): Добавлен загрузчик пользователей

- [ADIRGSL-565](https://jira.adacta-fintech.com/browse/ADIRGSL-565): Accounting periods were generated from 01.01.2022 until 31.12.2069.

- [ADIRGSL-568](https://jira.adacta-fintech.com/browse/ADIRGSL-568): Act items auto-population

- [ADIRGSL-585](https://jira.adacta-fintech.com/browse/ADIRGSL-585): ES reindexation improvements

- [ADIRGSL-589](https://jira.adacta-fintech.com/browse/ADIRGSL-589): Переработан формаль номера платежа при импорте из внешних систем. Новый формат:  Номер платежа (DocumentNumber) + Источник поступления денежных средств (FileSource) + Дата документа (DocumentDate)

- [ADIRGSL-590](https://jira.adacta-fintech.com/browse/ADIRGSL-590): Корректировка енричмента в рамках проверки сервисов в рамках подготовки к интеграции с БФКО.

- [ADIRGSL-596](https://jira.adacta-fintech.com/browse/ADIRGSL-596): Добавлен ручной запуск сервиса загрузки платежей с формы импорта платежей

- [ADIRGSL-603](https://jira.adacta-fintech.com/browse/ADIRGSL-603): Рефакторинг маппинга коммон боди контрагентов

- [ADIRGSL-607](https://jira.adacta-fintech.com/browse/ADIRGSL-607): Implemented reactivation amendment for investment and accumulated policies.

- [ADIRGSL-609](https://jira.adacta-fintech.com/browse/ADIRGSL-609): Шаг 1: Переименована конфигурация

- [ADIRGSL-611](https://jira.adacta-fintech.com/browse/ADIRGSL-611): Изменено поведение элементов формы при выборе договора и/или платежа

- [ADIRGSL-618](https://jira.adacta-fintech.com/browse/ADIRGSL-618): Корректировка реестра обмена данными с SAP

- [ADIRGSL-623](https://jira.adacta-fintech.com/browse/ADIRGSL-623): Корректировки продукта Страйк

- [ADIRGSL-624](https://jira.adacta-fintech.com/browse/ADIRGSL-624): Добавлены новые тип документов в справочник вложений

- [ADIRGSL-626](https://jira.adacta-fintech.com/browse/ADIRGSL-626): Added basic implementation of commission calculation for credit insurance policy.

- [ADIRGSL-628](https://jira.adacta-fintech.com/browse/ADIRGSL-628): Добавлена валидация при попытке отмены идентификации расторгнутого договора

- [ADIRGSL-678](https://jira.adacta-fintech.com/browse/ADIRGSL-678): Доп. атрибуты договоров КСЖ

- [ADIRGSL-684](https://jira.adacta-fintech.com/browse/ADIRGSL-684): Отображение закладки вложений только на сохраненной форме.


### Fixed (4 changes)

- [ADIRGSL-93](https://jira.adacta-fintech.com/browse/ADIRGSL-93): Исправлена ошибка при отмене идентификации.

- [ADIRGSL-638](https://jira.adacta-fintech.com/browse/ADIRGSL-638): Исправлена ошибка при отмене идентификации.

- [ADIRGSL-650](https://jira.adacta-fintech.com/browse/ADIRGSL-650): Fixed issues with upgrade of platform to 6.11.0
    * Duplicated binding in implementation removed

- [ADIRGSL-651](https://jira.adacta-fintech.com/browse/ADIRGSL-651): Skip `GetExchangeRate` sink for payment order type `PaymentRefund`

# 1.0.0-pre18 (2021-12-10)

### Breaking Changes (1 changes)

- [ADIRGSL-581](https://jira.adacta-fintech.com/browse/ADIRGSL-581): Added mvz and skk fields to aa ASs mapping.
    Changed aa common body mapping slightly.

    7.10_005.013.000_020.sql script should be executed before publishing!


### New Features (6 changes)

- [ADIRGSL-200](https://jira.adacta-fintech.com/browse/ADIRGSL-200): Заменены ключи интеграции с dadata на ключи РГСЖ.

- [ADIRGSL-307](https://jira.adacta-fintech.com/browse/ADIRGSL-307): Added valiation in commission ass mapping

- [ADIRGSL-329](https://jira.adacta-fintech.com/browse/ADIRGSL-329): Скорректирована последовательность полей в гриде по ВВ. Добавлено поле "Группа продуктов".

- [ADIRGSL-393](https://jira.adacta-fintech.com/browse/ADIRGSL-393): Добавлены валидации для Даты поступления заявления в СК и Даты принятия в работу заявления

- [ADIRGSL-489](https://jira.adacta-fintech.com/browse/ADIRGSL-489): Payment order document:
    * dataschema
    * UI
    * document flow

- [ADIRGSL-583](https://jira.adacta-fintech.com/browse/ADIRGSL-583): Исправлена валидация адреса на карточке контрагента - добавлено дополнительное условие на параметры "Ввод адреса вручную" и "Иностранный адрес"

# 1.0.0-pre17 (2021-12-08)

### Breaking Changes (1 changes)

- [ADIRGSL-538](https://jira.adacta-fintech.com/browse/ADIRGSL-538): Доп. соглашение на расторжение.

    ПЕРЕД деплоем необходимо выполнить корректировочный скрипт migration/ADIRGSL-538-verification_sat-correction.sql

    После деплоя необходимо выполнить корректировочный скрипт migration/ADIRGSL-538-version_state-correction.sql


### New Features (12 changes)

- [ADIRGSL-170](https://jira.adacta-fintech.com/browse/ADIRGSL-170): SAP Интеграция.

    1. Добавлена поддержка таблицы логирования результатов интеграции.
    2. Отключен вызов интеграционного сервиса в момент активации полиса.

- [ADIRGSL-307](https://jira.adacta-fintech.com/browse/ADIRGSL-307): Implemented commission calculation component and related functionality.
    Updated calculation service to supprort multiple results.
    Updated ASs mapping to include amendment data (original document specific data).
    Updated aa document search elastic data provider to support effective document dates.

- [ADIRGSL-362](https://jira.adacta-fintech.com/browse/ADIRGSL-362): Актуализация конфигурационных файлов сред.

- [ADIRGSL-433](https://jira.adacta-fintech.com/browse/ADIRGSL-433): АВР - 1 этап. Добавлен журнал АВР

- [ADIRGSL-482](https://jira.adacta-fintech.com/browse/ADIRGSL-482): Добавлена историчность в анкетe финграмотности

- [ADIRGSL-512](https://jira.adacta-fintech.com/browse/ADIRGSL-512): Добавлен столбец Источник в журнал платежей

- [ADIRGSL-531](https://jira.adacta-fintech.com/browse/ADIRGSL-531): Добавлена валидация на недоступность сервиса КПК.

- [ADIRGSL-547](https://jira.adacta-fintech.com/browse/ADIRGSL-547): Добавлен фильтр на тип плтежа в журнал платежей

- [ADIRGSL-555](https://jira.adacta-fintech.com/browse/ADIRGSL-555): В отчет добавленны поля Премия с доп рисками, валюта договора, срок страхования, день рождения страхователя, коач, территориальный директор и региональный директор.

- [ADIRGSL-559](https://jira.adacta-fintech.com/browse/ADIRGSL-559): Внесенны исправления в печатную форму

- [ADIRGSL-560](https://jira.adacta-fintech.com/browse/ADIRGSL-560): Implement invoiced commission

- [ADIRGSL-568](https://jira.adacta-fintech.com/browse/ADIRGSL-568): add commission act services


### Fixed (1 changes)

- [ADIRGSL-557](https://jira.adacta-fintech.com/browse/ADIRGSL-557): Добавлен вывод ошибки для случая отсутствия прав на исполнение сервиса GenerateSmallPayments

# 1.0.0-pre16 (2021-11-29)

### Breaking Changes (1 changes)

- [ADIRGSL-520](https://jira.adacta-fintech.com/browse/ADIRGSL-520): add SetSuccessfulFlag ETL service

    .\server\AdInsure.Server\conf\environmentVariables.json must be updated. New fields must be defined:
    - rgsl.setSuccessfulFlag.baseAddress
    - rgsl.setSuccessfulFlag.requestUri
    - rgsl.setSuccessfulFlag.user
    - rgsl.setSuccessfulFlag.password
    Values must be the same as for the 'getBankStatements' service.


### New Features (4 changes)

- [ADIRGSL-395](https://jira.adacta-fintech.com/browse/ADIRGSL-395): Скорректирован поиск по инициатору и подразделениям

- [ADIRGSL-511](https://jira.adacta-fintech.com/browse/ADIRGSL-511): Поиск платежей переименован в Журнал платежей

- [ADIRGSL-521](https://jira.adacta-fintech.com/browse/ADIRGSL-521): Администратору добавлена возможность устанавливать дату заключения на продуктах масс сегмента.

- [ADIRGSL-553](https://jira.adacta-fintech.com/browse/ADIRGSL-553): Изменение логики выбора инвест. настроек по дате

# 1.0.0-pre15 (2021-11-26)

### Breaking Changes (1 changes)

- [ADIRGSL-395](https://jira.adacta-fintech.com/browse/ADIRGSL-395): Добавлена кнопка выгрузки отчета по заданным параметрам из "Журнал Договоров".

    После деплоя необходимо выполнить скрипт migration/ADIRGSL-395-verification-errors-fill.sql


### New Features (25 changes)

- [ADIRGSL-170](https://jira.adacta-fintech.com/browse/ADIRGSL-170): Создан интеграционныq сервис для отправки данных по контрагенту в Систему SAP.
        Сервис запускается автоматически при активации полиса.

        Для работы сервисов необходимо добавить серверные настройки в файл implSettings.json:

        Для локальной среды:
        ```
        /*RGSL plugin settings*/
        "RGSL": {
            "Integration": {
                 "SAP": {
                      "Login": "TEST_ADAKTA",
                      "Password": "Xc$Fpw1zZU",
                      "CreatePartyUrl": "http://localhost:60000/api/rgsl/mock-services/sap-create-party/simulate",
                      "UpdatePartyUrl": "http://localhost:60000/api/rgsl/mock-services/sap-update-party/simulate",
                      "CreateContractUrl": "http://localhost:60000/api/rgsl/mock-services/sap-create-contract/simulate"
                }
            }
        }
        ```

        Для тестовой среды Заказчика:
        ```
        /*RGSL plugin settings*/
        "RGSL": {
            "Integration": {
                 "SAP": {
                      "Login": "TEST_ADAKTA",
                      "Password": "Xc$Fpw1zZU",
                      "CreatePartyUrl": "https://b2b-aq.rgsl.ru/sap/bc/srt/rfc/sap/zerluapi000000000100_srvc/200/zerluapi000000000100_srvc_http/zerluapi000000000100_srvc_http",
                      "UpdatePartyUrl": "https://b2b-aq.rgsl.ru/sap/bc/srt/wsdl/flv_10002A101AD1/bndg_url/sap/bc/srt/rfc/sap/zerluapi000000000172_srvc/200/zerluapi000000000172_srvc/zerluapi000000000172_srvc?sap-client=200",
                      "CreateContractUrl": "https://b2b-aq.rgsl.ru/sap/bc/srt/wsdl/flv_10002A101AD1/bndg_url/sap/bc/srt/rfc/sap/zerluapi000000000101_srvc/200/zerluapi000000000101_srvc/zerluapi000000000101_srvc?sap-client=200"
                }
            }
        }
        ```

- [ADIRGSL-309](https://jira.adacta-fintech.com/browse/ADIRGSL-309): Fixed wrong authorization for several aa views.

- [ADIRGSL-333](https://jira.adacta-fintech.com/browse/ADIRGSL-333): Имененено вычисление значений полей "Сумма остатка по договору" и "Сумма задолжности"

- [ADIRGSL-458](https://jira.adacta-fintech.com/browse/ADIRGSL-458): Fixed sorting for aa search view.

- [ADIRGSL-459](https://jira.adacta-fintech.com/browse/ADIRGSL-459): Temporary disabled agent personal number validation

- [ADIRGSL-468](https://jira.adacta-fintech.com/browse/ADIRGSL-468): Updated aa cancellation amendment translations.

- [ADIRGSL-469](https://jira.adacta-fintech.com/browse/ADIRGSL-469): Implemented AA copy operation.

- [ADIRGSL-471](https://jira.adacta-fintech.com/browse/ADIRGSL-471): Updated conclusion date validation.

- [ADIRGSL-472](https://jira.adacta-fintech.com/browse/ADIRGSL-472): Changed translation for aa activated status

- [ADIRGSL-473](https://jira.adacta-fintech.com/browse/ADIRGSL-473): Fixed 'save first' message for aa comm rules.

- [ADIRGSL-474](https://jira.adacta-fintech.com/browse/ADIRGSL-474): Implemented amendment list tab for aa.

- [ADIRGSL-481](https://jira.adacta-fintech.com/browse/ADIRGSL-481): Fixed aa doc search validity dates filter.

- [ADIRGSL-483](https://jira.adacta-fintech.com/browse/ADIRGSL-483): Updated criteria and results for aa search view.

- [ADIRGSL-484](https://jira.adacta-fintech.com/browse/ADIRGSL-484): Updated aa comments control.

- [ADIRGSL-485](https://jira.adacta-fintech.com/browse/ADIRGSL-485): Updated commission rules control for aa.

- [ADIRGSL-516](https://jira.adacta-fintech.com/browse/ADIRGSL-516): add 'Show related allocations' for selected payment

- [ADIRGSL-517](https://jira.adacta-fintech.com/browse/ADIRGSL-517): remove first installment validation

- [ADIRGSL-518](https://jira.adacta-fintech.com/browse/ADIRGSL-518): Multi allocation cancellation

- [ADIRGSL-519](https://jira.adacta-fintech.com/browse/ADIRGSL-519): Измененен формат реестра платежей: добавлено поле "Сегмент". При распределении реестра на платёж аналогичное поле заполняется и у него. Поле отображается в форме поиска платежей, возможен поиск платежа по этому полю.

- [ADIRGSL-521](https://jira.adacta-fintech.com/browse/ADIRGSL-521): Обновление настроек инвест. инструментов для ИСЖ продуктов.

- [ADIRGSL-525](https://jira.adacta-fintech.com/browse/ADIRGSL-525): Передача анкеты фин. знаний в SAP реестр. Корректировка выборки

- [ADIRGSL-528](https://jira.adacta-fintech.com/browse/ADIRGSL-528): Корректировка выборки реестра обмена с SAP

- [ADIRGSL-537](https://jira.adacta-fintech.com/browse/ADIRGSL-537): Внесены изменения в настройки КУ/Купон для ИСЖ продуктов.

- [ADIRGSL-545](https://jira.adacta-fintech.com/browse/ADIRGSL-545): Fixed issues with aa amendment details tab.

- [ADIRGSL-546](https://jira.adacta-fintech.com/browse/ADIRGSL-546): Исправлен вывод адреса в ПФ в случае указания адреса вручную.


### Improvements (2 changes)

- [ADIRGSL-212](https://jira.adacta-fintech.com/browse/ADIRGSL-212): On manual allocation view UX was improved. Selected contract stays selected even if datagrid page is changed or filter is modified.

- [ADIRGSL-437](https://jira.adacta-fintech.com/browse/ADIRGSL-437): PC implemented


### Fixed (1 changes)

- [ADIRGSL-467](https://jira.adacta-fintech.com/browse/ADIRGSL-467): Исправлено количество отображаемых ошибок на форме верификатора вложений.

# 1.0.0-pre14 (2021-11-19)

### Breaking Changes (5 changes)

- [ADIRGSL-361](https://jira.adacta-fintech.com/browse/ADIRGSL-361): Upgraded the platform to version 5.13.0. Upgraded the studio to version 14.1.2.

- [ADIRGSL-406](https://jira.adacta-fintech.com/browse/ADIRGSL-406): Уведомления о поступлении задачи в группу.

    На средах РГСЖ необходимо в implSettings задать:
    host - 10.228.210.12
    port - 25
    useSSL - false

    PROD:
    username - AdInsure
    password - Pp~?Prj"9]cMaNBbv}kBz[rdD
    sender.name - AdInsure
    sender.email - AdInsure@rgsl.ru

    TEST:
    username - Adacta_test
    password - ?v9nRDV!\H2R9)]q-Y}>
    sender.name - Adacta_test
    sender.email - Adacta_test@rgsl.ru

    На средах РГСЖ необходимо в environmentVariables задать:
    "rgsl.groupEmails.compliance": "Liliia.Shakirova@rgsl.ru;Anna.Komarova@rgsl.ru",
    "rgsl.groupEmails.podft": "Anna.Likas@rgsl.ru;Anna.Komarova@rgsl.ru",
    "rgsl.groupEmails.operations": "formation@rgsl.ru",
    "rgsl.groupEmails.legal": "legal@rgsl.ru",
    "rgsl.groupEmails.UKSP": "Liana.Khashukaeva@rgsl.ru;Tatiana.Semina@rgsl.ru;Iuliia.Argetkina@rgsl.ru;Anastasiia.Saveleva@rgsl.ru;Dmitrii.Slez@rgsl.ru"

- [ADIRGSL-411](https://jira.adacta-fintech.com/browse/ADIRGSL-411): Для Роли "Продавец", при создании контрагента, сокращен перечень документов удостоверяющих личность.

    После деплоя необходимо выполнить корректировочный скрипт: migration/ADIRGSL-411-party-documents-correction

- [ADIRGSL-460](https://jira.adacta-fintech.com/browse/ADIRGSL-460): Добавлены поля "Инициатор" и "Подразделение" в результате поиска по контрактам.

    После деплоя необходимо выполнить корректировочный скрипт: migration/ADIRGSL-460-common-body-correction.

    После выполнения скрипта необходимо переиндексировать ES.

- [ADIRGSL-467](https://jira.adacta-fintech.com/browse/ADIRGSL-467): Скорректирован справочник типов ошибок при верификации вложений.

    После деплоя необходимо выполнить корректировочный скрипт: migration/ADIRGSL-467-verification-correction.


### New Features (19 changes)

- [ADIRGSL-229](https://jira.adacta-fintech.com/browse/ADIRGSL-229): Allow **auto allocation** when payment amount is bigger than open amount on referenced document.

- [ADIRGSL-251](https://jira.adacta-fintech.com/browse/ADIRGSL-251): Добавлен поиск по статусу в поиске договоров

- [ADIRGSL-310](https://jira.adacta-fintech.com/browse/ADIRGSL-310): В секцию Вложения добавлена таблица отображающуя информацию о статусе верификации вложений

- [ADIRGSL-379](https://jira.adacta-fintech.com/browse/ADIRGSL-379): Отменить идентификацию можно только в случае отсутствия привязанных платежей с более поздней датой.

- [ADIRGSL-383](https://jira.adacta-fintech.com/browse/ADIRGSL-383): В формах идентификации в результатах поиска додавлены ссылки на договоры

- [ADIRGSL-404](https://jira.adacta-fintech.com/browse/ADIRGSL-404): Подготовлена функция для отбора данных для интеграции с SAP реестрами. Ранее уже была добавлена в базу данных. Дополнительно замержена в конфигурации.

- [ADIRGSL-410](https://jira.adacta-fintech.com/browse/ADIRGSL-410): Изменено поведение пункта меню "Изменить назначение платежа" в соответствии с ролью пользователя

- [ADIRGSL-424](https://jira.adacta-fintech.com/browse/ADIRGSL-424): validate view criteria to be populated

- [ADIRGSL-446](https://jira.adacta-fintech.com/browse/ADIRGSL-446): Добавлена возможность печати анкеты по финансовой грамотности с формы заявки/договора страхования.

- [ADIRGSL-450](https://jira.adacta-fintech.com/browse/ADIRGSL-450): Store reference (and allocation response) in ACC_IMPL.PAYMENT_REFERENCE also for small payments.

- [ADIRGSL-451](https://jira.adacta-fintech.com/browse/ADIRGSL-451): In payment overview we additionaly display auto allocation messages (success or error). For registry payments we display information for all small payments.

- [ADIRGSL-466](https://jira.adacta-fintech.com/browse/ADIRGSL-466): Исправлено отображение даты заключения на продуктах масс сегмента. Исправлено отображение валидации об анкете фин. грамотности (теперь только на проектах котировок).

- [ADIRGSL-470](https://jira.adacta-fintech.com/browse/ADIRGSL-470): Добавлена возможность ввода адреса вручную.

- [ADIRGSL-476](https://jira.adacta-fintech.com/browse/ADIRGSL-476): Для купонных продуктов ИСЖ добавлена статическая ПФ заявления на выплату ДИД с приложением.

- [ADIRGSL-486](https://jira.adacta-fintech.com/browse/ADIRGSL-486): В журнале договоров добавлены колонки: "Периодичность оплаты", "Размер взноса" и "Взнос с учетом доп. рисков".

- [ADIRGSL-487](https://jira.adacta-fintech.com/browse/ADIRGSL-487): Интеграция с SAP реестрами. Корректировка выборки.

- [ADIRGSL-488](https://jira.adacta-fintech.com/browse/ADIRGSL-488): Убрана валидация на дату заключения на договоре.

- [ADIRGSL-500](https://jira.adacta-fintech.com/browse/ADIRGSL-500): Обновлена мед. памятка для продукта Вектор здоровья Премиум.

- [ADIRGSL-504](https://jira.adacta-fintech.com/browse/ADIRGSL-504): Скорректирована обработка отчества в функции подготовки данных для загрузки в SAP реестром.


### Improvements (2 changes)

- [ADIRGSL-192](https://jira.adacta-fintech.com/browse/ADIRGSL-192): When small payments are generated we use `undefined` for debtor bank account. Until now it was hardcoded value.

- [ADIRGSL-212](https://jira.adacta-fintech.com/browse/ADIRGSL-212): Loded data section with empty values was removed from Import BSI view. All needed information is displayed in last tab `Imported data`.


### Fixed (1 changes)

- [ADIRGSL-447](https://jira.adacta-fintech.com/browse/ADIRGSL-447): Исправлено поведение поля выбора продукта в формах идентификации

# 1.0.0-pre11 (2021-11-11)

### New Features (13 changes)

- [ADIRGSL-289](https://jira.adacta-fintech.com/browse/ADIRGSL-289): Добавлено предупредждение на добавление адреса без номера дома у контрагента.

- [ADIRGSL-336](https://jira.adacta-fintech.com/browse/ADIRGSL-336): Added validation that checkes if posted payment in BA has closed expected installment and amount.

- [ADIRGSL-376](https://jira.adacta-fintech.com/browse/ADIRGSL-376): Added translations for plugins

- [ADIRGSL-418](https://jira.adacta-fintech.com/browse/ADIRGSL-418): Добавлена выгрузка договоров в эксель

- [ADIRGSL-421](https://jira.adacta-fintech.com/browse/ADIRGSL-421): Скорректированы шрифты ПФ.

- [ADIRGSL-428](https://jira.adacta-fintech.com/browse/ADIRGSL-428): Скорректирована ставка КВ для ИСЖ продуктов.

- [ADIRGSL-429](https://jira.adacta-fintech.com/browse/ADIRGSL-429): Скорректированы наименования стратегий и описания БА в продуктах ИСЖ.

- [ADIRGSL-430](https://jira.adacta-fintech.com/browse/ADIRGSL-430): Скорректирован расчет СС по ПР, теперь учитывает премию по доп. рискам.

- [ADIRGSL-431](https://jira.adacta-fintech.com/browse/ADIRGSL-431): Скорректирована работа доп. рисков на продукте Надежный выбор Премиум.

- [ADIRGSL-444](https://jira.adacta-fintech.com/browse/ADIRGSL-444): Добавлено подставление адреса регистрации в почтовый адрес в ПФ в случае если почтовый адрес на контрагенте не задан.

- [ADIRGSL-453](https://jira.adacta-fintech.com/browse/ADIRGSL-453): Добавлена памятка по порядку предоставления мед. услуг для Вектор здоровья Премиум.

- [ADIRGSL-454](https://jira.adacta-fintech.com/browse/ADIRGSL-454): Корректировки ПФ согласно вложенному в задаче в жире файлу.

- [ADIRGSL-456](https://jira.adacta-fintech.com/browse/ADIRGSL-456): Скрыт блок для быстрого добавления памятки во вложения договора, убрана валидация на обязательность этого вложения для перевода договора в подписанный статус.


### Improvements (1 changes)

- [ADIRGSL-367](https://jira.adacta-fintech.com/browse/ADIRGSL-367): Add the BFX_IMPL.RISK_TYPE table with the `IS_LIFE` column.
    Remove IPendingPaymentService.Post method. Work with common 'CheckAndPost' method.
    Validate repository criteria filled.


### Fixed (4 changes)

- [ADIRGSL-170](https://jira.adacta-fintech.com/browse/ADIRGSL-170): SAP integration. This task is continue of ADIRGSL-169 task so there is nothing new must be added to implConfig.json.

- [ADIRGSL-423](https://jira.adacta-fintech.com/browse/ADIRGSL-423): For foreign currencies we now allocate amount in payment currency and not in document currency. With this we avoid small left overs on payments, becasue of conversion differences.

- [ADIRGSL-425](https://jira.adacta-fintech.com/browse/ADIRGSL-425): Get rid of some warnings.
    Rename project folders.
    Fix DLL names.

- [ADIRGSL-447](https://jira.adacta-fintech.com/browse/ADIRGSL-447): Changed search field

# 1.0.0-pre10 (2021-11-08)

### Breaking Changes (1 changes)

- [ADIRGSL-361](https://jira.adacta-fintech.com/browse/ADIRGSL-361): Upgraded the platform to version 5.12.0. Upgraded the studio to version 14.1.2.


### New Features (7 changes)

- [ADIRGSL-228](https://jira.adacta-fintech.com/browse/ADIRGSL-228): Multicurrency support was added on UI for manual allocation.

- [ADIRGSL-400](https://jira.adacta-fintech.com/browse/ADIRGSL-400): invoice on the policy paid

- [ADIRGSL-403](https://jira.adacta-fintech.com/browse/ADIRGSL-403): Implemented analytical sub system mapping for aa document.

- [ADIRGSL-407](https://jira.adacta-fintech.com/browse/ADIRGSL-407): Скорректировано согласующее подразделение по пунктам декларации, по триггерам. Добавлены новые триггеры. См. детализацию в задаче в жире.

- [ADIRGSL-408](https://jira.adacta-fintech.com/browse/ADIRGSL-408): Скорректированы подписи в договорах. Добавлен застрахованный на договоре, добавлено автозаполнение ФИО.

- [ADIRGSL-420](https://jira.adacta-fintech.com/browse/ADIRGSL-420): Корректировки согласно описанию в жира.

- [ADIRGSL-421](https://jira.adacta-fintech.com/browse/ADIRGSL-421): Реализован функционал смены пользователем пароля самому себе.


### Fixed (2 changes)

- [ADIRGSL-396](https://jira.adacta-fintech.com/browse/ADIRGSL-396): Fix server path for the GetNewBankStatements service (Docker only)

- [ADIRGSL-402](https://jira.adacta-fintech.com/browse/ADIRGSL-402): If autoallocation (executed by user in client) of some bank statement items fails, we will display information with all error for each bank statement item.

# 1.0.0-pre9 (2021-11-03)

### Breaking Changes (1 changes)

- [ADIRGSL-361](https://jira.adacta-fintech.com/browse/ADIRGSL-361): Upgraded the platform to version 5.11.0. Upgraded the studio to version 14.1.2.


### New Features (3 changes)

- [ADIRGSL-279](https://jira.adacta-fintech.com/browse/ADIRGSL-279): After payment description is changed we show additional field (in payment details) with original payment description value.

- [ADIRGSL-408](https://jira.adacta-fintech.com/browse/ADIRGSL-408): Корректировки программ ДМС в ПФ Вектор здоровья.

- [ADIRGSL-98](https://jira.adacta-fintech.com/browse/ADIRGSL-98): Скорректирован маппинг ответа сервиса КПК.

# 1.0.0-pre8 (2021-11-02)

### New Features (2 changes)

- [ADIRGSL-404](https://jira.adacta-fintech.com/browse/ADIRGSL-404): Добавлен проброс кода альфа2 страны в код страны телефона.

- [ADIRGSL-408](https://jira.adacta-fintech.com/browse/ADIRGSL-408): Частичные крректировки ПФ, что исправлено отмечено в файле в жире.


### Fixed (3 changes)

- [ADIRGSL-245](https://jira.adacta-fintech.com/browse/ADIRGSL-245): Исправлено округление в валидации на совпадение суммы премий по рискам с размером взноса.

- [ADIRGSL-377](https://jira.adacta-fintech.com/browse/ADIRGSL-377): fix tolerance distribution logic

- [ADIRGSL-98](https://jira.adacta-fintech.com/browse/ADIRGSL-98): Исправлено получение ответа от сервера

# 1.0.0-pre7 (2021-10-29)

### New Features (8 changes)

- [ADIRGSL-258](https://jira.adacta-fintech.com/browse/ADIRGSL-258): Implement 'Pending payment' ETL service

- [ADIRGSL-279](https://jira.adacta-fintech.com/browse/ADIRGSL-279): Ability to change payment description. After change, description is parsed again and existing references are overridden. Only not allocated and partially allocated payments can be modified.

- [ADIRGSL-306](https://jira.adacta-fintech.com/browse/ADIRGSL-306): Implemented cancellation amendment for aa document

- [ADIRGSL-308](https://jira.adacta-fintech.com/browse/ADIRGSL-308): Implemented aa document search view and related components.

- [ADIRGSL-348](https://jira.adacta-fintech.com/browse/ADIRGSL-348): Все памятки добавлены в ПФ договоров.

- [ADIRGSL-369](https://jira.adacta-fintech.com/browse/ADIRGSL-369): Добавлен блок подписей для всех ПФ. Применено быстрое решение (картинка), необходим дальнейший рефакторинг.

- [ADIRGSL-372](https://jira.adacta-fintech.com/browse/ADIRGSL-372): Скорректирована валидация на доступность образцов ПФ - достаточно заполнить все на закладке Условия страхования.

- [ADIRGSL-396](https://jira.adacta-fintech.com/browse/ADIRGSL-396): Добавлен ручной запуск сервиса загрузки платежей


### Fixed (1 changes)

- [ADIRGSL-98](https://jira.adacta-fintech.com/browse/ADIRGSL-98): Исправлено получение ответа от сервера

# 1.0.0-pre6 (2021-10-27)

### New Features (17 changes)

- [ADIRGSL-169](https://jira.adacta-fintech.com/browse/ADIRGSL-169): Создан интеграционныq сервис для отправки данных по контрагенту в Систему SAP.
    Сервис запускается автоматически при активации полиса.

    Для работы сервисов необходимо добавить серверные настройки в файл implSettings.json:

    Для локальной среды:
    ```
    /*RGSL plugin settings*/
    "RGSL": {
        "Integration": {
             "SAP": {
                  "Login": "TEST_ADAKTA",
                  "Password": "Xc$Fpw1zZU",
                  "CreatePartyUrl": "http://localhost:60000/api/rgsl/mock-services/sap-create-party/simulate"
            }
        }
    }
    ```

    Для тестовой среды Заказчика:
    ```
    /*RGSL plugin settings*/
    "RGSL": {
        "Integration": {
             "SAP": {
                  "Login": "TEST_ADAKTA",
                  "Password": "Xc$Fpw1zZU",
                  "CreatePartyUrl": "https://b2b-aq.rgsl.ru/sap/bc/srt/rfc/sap/zerluapi000000000100_srvc/200/zerluapi000000000100_srvc_http/zerluapi000000000100_srvc_http"
            }
        }
    }
    ```

- [ADIRGSL-241](https://jira.adacta-fintech.com/browse/ADIRGSL-241): Для котировки добавлена возможность сразу создавать договор, если нет триггеров.

- [ADIRGSL-245](https://jira.adacta-fintech.com/browse/ADIRGSL-245): Подготовлен базовый функционал андеррайтера - возможность ручной корректировки СС/премии по рискам.

- [ADIRGSL-258](https://jira.adacta-fintech.com/browse/ADIRGSL-258): implement advance payment logic

- [ADIRGSL-261](https://jira.adacta-fintech.com/browse/ADIRGSL-261): Validation added: First installment can only be paid in full amount (tollerance is acceptable)

    When first installment is fully paid, referenced contract goes from status "Signed" to "Activated".

- [ADIRGSL-305](https://jira.adacta-fintech.com/browse/ADIRGSL-305): Implemented change amendment for agent agreement document.

- [ADIRGSL-348](https://jira.adacta-fintech.com/browse/ADIRGSL-348): Приложение для ПФ Вектор здоровья добавлено внутрь ПФ договора.

- [ADIRGSL-352](https://jira.adacta-fintech.com/browse/ADIRGSL-352): Added new fields for BANK_STATEMENT_ITEM table. Updated import service

- [ADIRGSL-370](https://jira.adacta-fintech.com/browse/ADIRGSL-370): Уточнение текстов пунктов деклараций

- [ADIRGSL-371](https://jira.adacta-fintech.com/browse/ADIRGSL-371): Договор семейства Драйвер

- [ADIRGSL-372](https://jira.adacta-fintech.com/browse/ADIRGSL-372): Добавлена возможность печати образцов ПФ договора на котировках.

- [ADIRGSL-380](https://jira.adacta-fintech.com/browse/ADIRGSL-380): Триггер на единовременный взнос по продуктам НСЖ.

- [ADIRGSL-382](https://jira.adacta-fintech.com/browse/ADIRGSL-382): Использование возрастных ограничений по определению рисков на дату оформления договора, а не на дату начала его действия.

- [ADIRGSL-388](https://jira.adacta-fintech.com/browse/ADIRGSL-388): Скрытие столбца "подразделение" в декларациях.

- [ADIRGSL-390](https://jira.adacta-fintech.com/browse/ADIRGSL-390): При создании контрагента с формы "Сотрудник" система более не запрашивает дату рождения и пол, если у пользователя есть права админа орг. структуры.

- [ADIRGSL-391](https://jira.adacta-fintech.com/browse/ADIRGSL-391): КПК - порядок атрибутов

- [ADIRGSL-394](https://jira.adacta-fintech.com/browse/ADIRGSL-394): В продукте Драйвер. Купонный Премиум изменен купон на 12,50%.


### Fixed (7 changes)

- [ADIRGSL-321](https://jira.adacta-fintech.com/browse/ADIRGSL-321): Fixed small payment date & tolerance

- [ADIRGSL-332](https://jira.adacta-fintech.com/browse/ADIRGSL-332): Removed extra symbols (line breaks, tabs) from reference document number for aggregated register import process

- [ADIRGSL-334](https://jira.adacta-fintech.com/browse/ADIRGSL-334): Fixed sorting

- [ADIRGSL-339](https://jira.adacta-fintech.com/browse/ADIRGSL-339): Changed translation

- [ADIRGSL-384](https://jira.adacta-fintech.com/browse/ADIRGSL-384): Fixed actions buttons behavior for BSI search form

- [ADIRGSL-386](https://jira.adacta-fintech.com/browse/ADIRGSL-386): Fixed search for BSI reference number field

- [ADIRGSL-98](https://jira.adacta-fintech.com/browse/ADIRGSL-98): Исправлено получение ответа от сервера

# 1.0.0-pre5 (2021-10-24)

### New Features (4 changes)

- [ADIRGSL-304](https://jira.adacta-fintech.com/browse/ADIRGSL-304): Implemented doc flow for agent agreement document.

- [ADIRGSL-309](https://jira.adacta-fintech.com/browse/ADIRGSL-309): Implemented additional actor and readonly mode for aa document.

- [ADIRGSL-374](https://jira.adacta-fintech.com/browse/ADIRGSL-374): Implemented comm rules control and related components.

- [ADIRGSL-98](https://jira.adacta-fintech.com/browse/ADIRGSL-98): fixed KPK request


### Fixed (1 changes)

- [ADIRGSL-375](https://jira.adacta-fintech.com/browse/ADIRGSL-375): fix installment open amount

# 1.0.0-pre4 (2021-10-21)

### New Features (4 changes)

- [ADIRGSL-229](https://jira.adacta-fintech.com/browse/ADIRGSL-229): Payment description if parsed and BSI can be auto allocated to multiple references.

- [ADIRGSL-325](https://jira.adacta-fintech.com/browse/ADIRGSL-325): Added role ChiefPaymentDistributor to cancel payment action

- [ADIRGSL-378](https://jira.adacta-fintech.com/browse/ADIRGSL-378): КПК - добавление вызова проверки на переходы статусов.

- [ADIRGSL-98](https://jira.adacta-fintech.com/browse/ADIRGSL-98): Fixed KPK GetContractors login.

# 1.0.0-pre3 (2021-10-20)

### New Features (16 changes)

- [ADIRGSL-166](https://jira.adacta-fintech.com/browse/ADIRGSL-166): Вектор Премиуим Плюс Допсоглашения

- [ADIRGSL-167](https://jira.adacta-fintech.com/browse/ADIRGSL-167): Исправления

- [ADIRGSL-183](https://jira.adacta-fintech.com/browse/ADIRGSL-183): Tolerance

- [ADIRGSL-241](https://jira.adacta-fintech.com/browse/ADIRGSL-241): Переработка процесса согласования котировки

- [ADIRGSL-277](https://jira.adacta-fintech.com/browse/ADIRGSL-277): У физического лица в полях ФИО добавлена автоматичееская функция, которая делает первую букву большой, а остальные маленькими.

- [ADIRGSL-278](https://jira.adacta-fintech.com/browse/ADIRGSL-278): Добавлена проверка для контрагента, должен быть указан хотя бы один номер телефона.

- [ADIRGSL-282](https://jira.adacta-fintech.com/browse/ADIRGSL-282): При оформлении договора, если сегмент продукта масс то дата заключения договора
    сбрасывается на текущий день и становится не доступной для редактирования.

- [ADIRGSL-295](https://jira.adacta-fintech.com/browse/ADIRGSL-295): Implemented aa main attributes and related components.

- [ADIRGSL-302](https://jira.adacta-fintech.com/browse/ADIRGSL-302): Created additional attributes for aa document

- [ADIRGSL-303](https://jira.adacta-fintech.com/browse/ADIRGSL-303): Added attachments for agent agreements.

- [ADIRGSL-318](https://jira.adacta-fintech.com/browse/ADIRGSL-318): Added lookup for Payer textbox

- [ADIRGSL-325](https://jira.adacta-fintech.com/browse/ADIRGSL-325): Добавлены роли PaymentDistributionUser (с привязанным актором PaymentDistributor) и PaymentDistributionAdmin (с привязанным актором ChiefPaymentDistributor). Для роли PaymentDistributionUser добавлен доступ к форме "Журнал платежей", для роли PaymentDistributionAdmin - доступ к форме "Журнал платежей", доступ к операциям идентификации и отмены идентификации

- [ADIRGSL-343](https://jira.adacta-fintech.com/browse/ADIRGSL-343): Removed unused main menu items

- [ADIRGSL-359](https://jira.adacta-fintech.com/browse/ADIRGSL-359): Изменение возрастных ограничений по программе "Вектор здоровья Премиум".

- [ADIRGSL-365](https://jira.adacta-fintech.com/browse/ADIRGSL-365): Доработки по результатам демонстрации (блокирование изменения)

- [ADIRGSL-368](https://jira.adacta-fintech.com/browse/ADIRGSL-368): Определение крайней даты оплаты


### Fixed (5 changes)

- [ADIRGSL-280](https://jira.adacta-fintech.com/browse/ADIRGSL-280): Изменена валидация на поле адреса для контрагентов. Почтовый адрес стал не обязательным,
    а фактический стал обязательным.

- [ADIRGSL-320](https://jira.adacta-fintech.com/browse/ADIRGSL-320): Fixed translations.

- [ADIRGSL-353](https://jira.adacta-fintech.com/browse/ADIRGSL-353): Installment due date (in accounting) changed to payment period start date.

- [ADIRGSL-357](https://jira.adacta-fintech.com/browse/ADIRGSL-357): Исправлена ошибка при создании подразделения (при наличии адреса).

- [ADIRGSL-98](https://jira.adacta-fintech.com/browse/ADIRGSL-98): Исправлена ошибка запроса контракторов

# 1.0.0-pre2 (2021-10-13)

### Breaking Changes (5 changes)

- [ADIRGSL-187](https://jira.adacta-fintech.com/browse/ADIRGSL-187): Upgraded the platform to version 5.9.1. Upgraded the studio to version 14.1.2.

- [ADIRGSL-293](https://jira.adacta-fintech.com/browse/ADIRGSL-293): Basic implementation of agent agreement configuration.

    **Deployment instructions**
    There might be an issue with publishing agent agreements data sources from system configuration. (SQL timeout exception)
    In order to fix it change "appSettings":"AdInsure":"Timeout" to higher value inside \Mono\server\AdInsure.Server\appSettings.json file.
    Return original timeout value after publishing.

- [ADIRGSL-323](https://jira.adacta-fintech.com/browse/ADIRGSL-323): 1)Changed how data sorce unit tests are performed. (validate-dataSources.js) It is possible now to test input mappings. Previously onlu result mappings could be tested.
    Scenario files shoud be created like this:
    input - DataSourceName/test/inputScenarios/*.json
    result - DataSourceName/test/resultScenarios/*.json

    2)Updated validate-sinks.js to include business context from example and scenario files.

    3)Fixed initially broken tests and moved old scenario files to "test/resultScenarios" folder.

    4)Changed structure of ObjectUtils.js library. Unit tests unable to resolve lib functions with an old structure of ObjectUtils.js.

    5) Implemented basic commission calculation service and related components. Added tests for some cases.

- [ADIRGSL-56](https://jira.adacta-fintech.com/browse/ADIRGSL-56): Созданы интеграционные сервисы для загрузки данных с помощью сервисов Центробанка России по:

    1. курсам валют

            URL: api/rgsl/common/shared/cbr-integration/load-currency-rates
            Default request body: {}

    2. ключевой ставки на опредённую дату

            URL: /api/rgsl/common/shared/cbr-integration/load-key-rate
            Default request body: {}

    Для работы сервисов необходимо добавить серверные настройки в файл implSettings.json:

    ```
    /*RGSL plugin settings*/
    "RGSL": {
        "Integration": {
             "Cbr": {
                  "CurrencyExchangeRatesUrl": "http://www.cbr.ru/scripts/XML_daily.asp",
                  "WebServiceDailyInfoCbrUrl": "https://www.cbr.ru/DailyInfoWebServ/DailyInfo.asmx",
                  // set below option to true for use ProxyCredentialAddressPort for Cbr requests
                  "UseProxy": "false"
            }
        }
    }
    ```

- [LJADIRD-46](https://jira.adacta-fintech.com/browse/LJADIRD-46): Добавлен интеграционный сервис для проверки клиента по черному списку из КПК.
    Запустить сервис можно по нажатию кнопки "Проверка черного списка" на странице физ. лица или юр. лица
    Сервис атоматически запускается при добавлении участника договора и изменении статуса документа, для всех его участников

    Для работы сервиса необходимо добавить имплементационные настройки в файл implSettings.json:
    ```
    /*RGSL plugin settings*/
    "RGSL": {
        "Integration": {
            "KPK": {
              "UserName": "ADINSURE",
              "Password": "wl#df9rUuW",
              "Uri": "http://life-1cw-03/1C_KPK_LIFE2021_PRD/ws/Kpk.1cws"
            }
        }
    }
    ```


### New Features (14 changes)

- [ADIRGSL-167](https://jira.adacta-fintech.com/browse/ADIRGSL-167): Памятка ЦБ

- [ADIRGSL-213](https://jira.adacta-fintech.com/browse/ADIRGSL-213): Добавлено базовое заполнение справочника курсов валют

- [ADIRGSL-227](https://jira.adacta-fintech.com/browse/ADIRGSL-227): Implement matching logic according to PP

- [ADIRGSL-259](https://jira.adacta-fintech.com/browse/ADIRGSL-259): Manual payment plan installment is now split by each risk. (1 risk = 1 item in accounting). Also risks with different durations are supported.

- [ADIRGSL-290](https://jira.adacta-fintech.com/browse/ADIRGSL-290): Для физ.лиц. добавлена проверка на дату выдачи документа.

- [ADIRGSL-292](https://jira.adacta-fintech.com/browse/ADIRGSL-292): Reworked Imported Data tab view for Bank Statenemt Item import process

- [ADIRGSL-294](https://jira.adacta-fintech.com/browse/ADIRGSL-294): Added SalesChannel, RGSChannel, CbAgentType and Agency code tables.

- [ADIRGSL-187](https://jira.adacta-fintech.com/browse/ADIRGSL-187): Filter payments to be allocated by statuses

- [ADIRGSL-322](https://jira.adacta-fintech.com/browse/ADIRGSL-322): Implemented basic agent agreements ASs model and mappings.

- [ADIRGSL-341](https://jira.adacta-fintech.com/browse/ADIRGSL-341): Критичные доработки по результатам тестирований 05-06/10/2021

- [ADIRGSL-344](https://jira.adacta-fintech.com/browse/ADIRGSL-344): Возможность добавлять вложения контрагентов на форме договора

- [ADIRGSL-345](https://jira.adacta-fintech.com/browse/ADIRGSL-345): Корректировка текста пунктов анкеты фин. грамотности.

- [ADIRGSL-347](https://jira.adacta-fintech.com/browse/ADIRGSL-347): ПФ памяток ПФП и Телемедицина

- [ADIRGSL-349](https://jira.adacta-fintech.com/browse/ADIRGSL-349): Some RGSL modules were enabled in adinsure studio. (Incorrect domain set in package.json)


### Fixed (4 changes)

- [ADIRGSL-255](https://jira.adacta-fintech.com/browse/ADIRGSL-255): Fix allocation view. Show installment amounts based on payment plan

- [ADIRGSL-326](https://jira.adacta-fintech.com/browse/ADIRGSL-326): Remove posting_date column

- [ADIRGSL-330](https://jira.adacta-fintech.com/browse/ADIRGSL-330): Исправлено поведение кнопки Рассчитать, из-за которого возникали ситуации, когда не появлялся выбор действий после сохранения.

- [ADIRGSL-342](https://jira.adacta-fintech.com/browse/ADIRGSL-342): Переименованы сбороки с RGSL.Common.*.dll на Adacta.AdInsure.RGSL.Common.*.dll

    В конфигурациях исправлена ссылка с Infrastructure.API на Common.API

# 1.0.0-pre1 (2021-10-05)

### Breaking Changes (6 changes)

- [ADIRGSL-119](https://jira.adacta-fintech.com/browse/ADIRGSL-119): Upgraded the platform to version 5.5.4. Upgraded the studio to version 13.1.5.

- [ADIRGSL-178](https://jira.adacta-fintech.com/browse/ADIRGSL-178): create a dataSource for an external XML service to receive payments
    .\server\AdInsure.Server\conf\environmentVariables.json must be updated. New fields must be defined:
    - rgsl.getBankStatements.baseAddress
    - rgsl.getBankStatements.requestUri
    - rgsl.getBankStatements.user
    - rgsl.getBankStatements.password

- [ADIRGSL-187](https://jira.adacta-fintech.com/browse/ADIRGSL-187): Upgraded the platform to version 5.6.2. Upgraded the studio to version 13.1.6.

- [ADIRGSL-213](https://jira.adacta-fintech.com/browse/ADIRGSL-213): `docker-compose.yml` was modified:
    * Local currency changed to `RUB`
    * Additional port `61616:61616` added for AMQ.

- [LJADIRD-46](https://jira.adacta-fintech.com/browse/LJADIRD-46): Добавлен интеграционный сервис для Dadata(описание сервиса https://dadata.ru/api/suggest/address/) для получения адресов.
    Запустить интеграционный сервис можно с помощью внутреннего API метода {{serverBaseUrl}}/api/rgsl/party/dadata/Dadata со строковым параметром:

    "query": "Можайский Вал, д.8"

    Для работы сервиса необходимо добавить имплементационные настройки в файл implSettings.json:
    ```
    /*RGSL plugin settings*/
    "RGSL": {
    	"ClientRootUrl": "http://localhost:60004/",
    		"Integration": {
    			"Dadata": {
    				"EnableScoringService": "true",
    				"Uri": "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address/",
    				"Token": "f949daffbafc4ac32b3ec28e2c974fc69d6ddac4"
    			}
    		}
    }
    ```

- [ADIRGSL-69](https://jira.adacta-fintech.com/browse/ADIRGSL-69): Upgraded the platform to version 5.3.1. Upgraded the studio to version 13.0.2.


### New Features (126 changes)

- [ADIRGSL-10](https://jira.adacta-fintech.com/browse/ADIRGSL-10): Fixed CI.

- [ADIRGSL-101](https://jira.adacta-fintech.com/browse/ADIRGSL-101): Написана функция для автозаполнения графика платежей
    Написана логика для компонента базовые условия, сроки действия, форма выпуска, правила страхования

- [ADIRGSL-103](https://jira.adacta-fintech.com/browse/ADIRGSL-103): Созданы компоненты: InquiriesList, Inquiry, InsurerComment.
    Создан документ: LifeInsuranceInquiry.
    Написана библиотека: AllocateUtils.
    Написаны Global Rules: UniversalDocumentStateActivityAllocation, ContractStateActivityAllocation.
    Написан view: InquiriesView.
    Написаны dataSource\dataProvider: InquiriesDataSource\InquiriesDataProvider
    Создана новая схема PAS_IMPL
    Написан ASS: QUOTE_HUB, QUOTE_SAT, QUOTE_INQUIRY_LINK, INQUIRY_HUB, INQUIRY_SAT.
    В заявке НСЖ введены Роли, Статусы, Переходы и правила.

- [ADIRGSL-104](https://jira.adacta-fintech.com/browse/ADIRGSL-104): 1. New menu items related to accounting (and missing referenced configurations from core-basic) were added to main menu:
    * Accounting
    * Bank statements
    * Billing
    * Administration (visible only to administrator) (used for testing ETL services)

    2. Script `.build\Invoke-ESReindex.ps1` had some incorrect references to environment.local settings.

- [ADIRGSL-106](https://jira.adacta-fintech.com/browse/ADIRGSL-106): Написан компонент для поиска и вставки физического лица для полей: "Сведения о единоличном исполнительном органе ЮЛ/ИП" и "Бенефициарный владелец" = "Иное физическое лицо"

- [LJADIRD-11](https://jira.adacta-fintech.com/browse/LJADIRD-11): General lib files, such as DateTimeUtils, ArrayUtils, ObjectUtils and so on have been added to the `infrastructure` folder.

- [ADIRGSL-118](https://jira.adacta-fintech.com/browse/ADIRGSL-118): Корректировки по результатам тестирования контрагентов:
    1. Валидация на смешение кириллицы и латиницы настроена в дополнение к каждому из полей ФИО ФЛ еще и на ФИО целиком
    2. В поиск страны добавлено полное наименование в дополнение к краткому
    3. Настроена обязательность указания страны регистрации для нерезидентов
    4. Добавлены поля актуальности и валидация на пересечение периодов для адресов
    5. В расширенный поиск ЮЛ добавлено полное наименование

- [ADIRGSL-120](https://jira.adacta-fintech.com/browse/ADIRGSL-120): Убрано значение "Банк" из справочника "Должностное лицо".

- [ADIRGSL-121](https://jira.adacta-fintech.com/browse/ADIRGSL-121): Добавлен функционал валидаций TIN.

- [ADIRGSL-122](https://jira.adacta-fintech.com/browse/ADIRGSL-122): Добавлены валидации на добавление/редактирование документа, телефона, e-mail'а, банковского счета контрагента. В интерфейсе, на нажатие кнопки ОК.

- [ADIRGSL-124](https://jira.adacta-fintech.com/browse/ADIRGSL-124): Creation of invoice on policy activation or on execution of ETL service.
    Invoice is posted to accounting, **but it uses hardcoded values**, which needs to modified later.

- [ADIRGSL-125](https://jira.adacta-fintech.com/browse/ADIRGSL-125): Добавлена автокоррекция первой буквы на заглавную для имени отчестве и фамилии в персональных данных участника

- [ADIRGSL-126](https://jira.adacta-fintech.com/browse/ADIRGSL-126): Добавлены подсказки к атрибутам физического лица "Место рождения" и "Публичное должностное лицо"

- [ADIRGSL-127](https://jira.adacta-fintech.com/browse/ADIRGSL-127): Добавлена валидация на дату рождения для Физических Лиц

- [ADIRGSL-130](https://jira.adacta-fintech.com/browse/ADIRGSL-130): Изменено значение сегмента в списке

- [ADIRGSL-131](https://jira.adacta-fintech.com/browse/ADIRGSL-131): Добавлена валидация в компоненте Физизического Лица у поля ИНН(КИО) для не резидентов

- [ADIRGSL-132](https://jira.adacta-fintech.com/browse/ADIRGSL-132): В компоненте ОБЩАЯ ИНФОРМАЦИЯ на карточке контрагента добавлены поля:
    "Описание цели финансово-хозяйственной деятельности" и "Источник происхождения денежных средств".
    Добавлена валидация на эти поля.

- [ADIRGSL-133](https://jira.adacta-fintech.com/browse/ADIRGSL-133): Добавлен функционал ручного ввода иностранного адреса.

- [ADIRGSL-134](https://jira.adacta-fintech.com/browse/ADIRGSL-134): Адрес проживания переименован в фактический.

- [ADIRGSL-135](https://jira.adacta-fintech.com/browse/ADIRGSL-135): Для поля Кем выдан документа в случае, если документ типа паспорт РФ сделана валидация, что поле должно содержать только символы кириллицы.

- [ADIRGSL-136](https://jira.adacta-fintech.com/browse/ADIRGSL-136): Доработан компонент выбора контрагента выгодоприобретателя с учетом массива данных.

- [ADIRGSL-137](https://jira.adacta-fintech.com/browse/ADIRGSL-137): Добавлена сортировка типов документов, скорректирован справочник типов, добавлено поле для указания наименования иного вида документа.

- [ADIRGSL-138](https://jira.adacta-fintech.com/browse/ADIRGSL-138): Добавлена валидация на дубликаты у поля email для контрагентов

- [ADIRGSL-139](https://jira.adacta-fintech.com/browse/ADIRGSL-139): Добавлен авто выбор валюты в зависимости от номера банковского счета для контрагентов

- [ADIRGSL-140](https://jira.adacta-fintech.com/browse/ADIRGSL-140): Добавлен выбор статуса Физического лица

- [ADIRGSL-141](https://jira.adacta-fintech.com/browse/ADIRGSL-141): Добавлены страны СССР и РСФСР.

- [ADIRGSL-142](https://jira.adacta-fintech.com/browse/ADIRGSL-142): Перемещены поля "Номер лицензии/разрешения" и "Наименование органа, выдавшего лицензию (разрешение)" в
    компонент Данные Органицации и добавлено поле "Дата выдачи лицензии (разрешения)".
    Добавлена валидация, если хоть одно поле заполнено, должны быть заполнены все эти три поля.

- [ADIRGSL-143](https://jira.adacta-fintech.com/browse/ADIRGSL-143): Атрибуты дефолта

- [ADIRGSL-150](https://jira.adacta-fintech.com/browse/ADIRGSL-150): Переработаны атрибуты CRS/FATCA.

- [ADIRGSL-153](https://jira.adacta-fintech.com/browse/ADIRGSL-153): Подготовлены инструменты поиска инвестиционных стратегий и выбора валют

- [ADIRGSL-155](https://jira.adacta-fintech.com/browse/ADIRGSL-155): Добавлена функция дублирования объекта из поля Страхователь в поле Застрахованный, с блокировкой на редактирование поля Страхователь

- [ADIRGSL-157](https://jira.adacta-fintech.com/browse/ADIRGSL-157): Подготовлена сущность поставщика услуг - сотрудника

- [ADIRGSL-158](https://jira.adacta-fintech.com/browse/ADIRGSL-158): Подготовлена базовая сущность групп пользователей, скорректированы роли.

- [ADIRGSL-159](https://jira.adacta-fintech.com/browse/ADIRGSL-159): Добавление тарифов по следующим продуктам:

    НСЖ:

    1. Надежный выбор
    2. Надежный выбор Премиум
    3. Вектор здоровья

    ИСЖ:

    1. Драйвер. Классика (3 года)
    2. Драйвер. Классика (5 лет)
    3. Драйвер.Купонный
    4. Драйвер. Классика Премиум (3 года)
    5. Драйвер. Классика Премиум (5 лет)
    6. Драйвер. Купонный Премиум
    7. Страйк Оптимум, Страйк Премиум
    8. Драйвер. Фиксированный Премиум

- [ADIRGSL-160](https://jira.adacta-fintech.com/browse/ADIRGSL-160): Настроен поисковик для договоров.

- [ADIRGSL-161](https://jira.adacta-fintech.com/browse/ADIRGSL-161): Декларации добавлены. Инициируется после заполнения продукта и застрахованного. Сохраняют введеные значения в случае изменения условий.

- [ADIRGSL-162](https://jira.adacta-fintech.com/browse/ADIRGSL-162): Сконфигурирована статусная модель на котировке НСЖ.

- [ADIRGSL-163](https://jira.adacta-fintech.com/browse/ADIRGSL-163): Функционал вложений и верификации документов
    Верификатор вложений создаться когда полис получает статус подписан.

- [ADIRGSL-164](https://jira.adacta-fintech.com/browse/ADIRGSL-164): Настройка компонентов под специфику продуктов

- [ADIRGSL-166](https://jira.adacta-fintech.com/browse/ADIRGSL-166): Шаблон печатной формы договора по продуктам "Надежный выбор", без блока подписи.
    Разбивка на компоненты отсутвует, требуется второй тип продуктов для сравнения.
    Добавленны библиотеки: констант и хелперов.

- [ADIRGSL-169](https://jira.adacta-fintech.com/browse/ADIRGSL-169): Интеграция с SAP.

- [ADIRGSL-171](https://jira.adacta-fintech.com/browse/ADIRGSL-171): Реализация маппинга common body

- [ADIRGSL-172](https://jira.adacta-fintech.com/browse/ADIRGSL-172): Fix sql queries to use implementation tables.
    Remove not needed hardcoded common body attributes.

- [ADIRGSL-173](https://jira.adacta-fintech.com/browse/ADIRGSL-173): Fix auto-allocation

- [ADIRGSL-174](https://jira.adacta-fintech.com/browse/ADIRGSL-174): ACC_IMPL DB schema was added.

    Only datamodel for small payments was implemented and route example (with hardcoded values) was prepared to simulate small payment generation.

    Added UI and process for small payments importing from Excel.

- [ADIRGSL-175](https://jira.adacta-fintech.com/browse/ADIRGSL-175): Integration service `GenerateSmallPayments` was implemented. For provided aggregated payment, it generates small payments (as fake bank statement items) and do auto allocation & matching as specified in small payment register.

- [ADIRGSL-176](https://jira.adacta-fintech.com/browse/ADIRGSL-176): add BSI view
    override BS loader
    add impl ASS for BSI

- [ADIRGSL-177](https://jira.adacta-fintech.com/browse/ADIRGSL-177): refactor bank statement out into separate document.

- [ADIRGSL-180](https://jira.adacta-fintech.com/browse/ADIRGSL-180): Fixed missing accounting menu for aggregated payment import.

- [ADIRGSL-183](https://jira.adacta-fintech.com/browse/ADIRGSL-183): add accounting project structure into plugings

- [ADIRGSL-184](https://jira.adacta-fintech.com/browse/ADIRGSL-184): Ограничение поиска договоров с учетом места пользователя в орг. структуре.

- [ADIRGSL-188](https://jira.adacta-fintech.com/browse/ADIRGSL-188): Добавлена информация о сотруднике-инициаторе и филиале на котировку: автоматическое определение по пользователю и возможность ручного выбора (будет дополнительно ограничено для сотрудников СК в рамках задачи по работе с ролевой моделью).

- [ADIRGSL-189](https://jira.adacta-fintech.com/browse/ADIRGSL-189): Подготовлен генератор номеров для котировок.

- [ADIRGSL-192](https://jira.adacta-fintech.com/browse/ADIRGSL-192): Aggregated payment registry: filter payments by payment_status_id

- [ADIRGSL-195](https://jira.adacta-fintech.com/browse/ADIRGSL-195): Скорректирована валидация на обязательные документы для контрагента.

- [ADIRGSL-196](https://jira.adacta-fintech.com/browse/ADIRGSL-196): Added checkbox which means if extended tolerance should be used on payment matching.

- [ADIRGSL-198](https://jira.adacta-fintech.com/browse/ADIRGSL-198): Обновление фунционала

- [ADIRGSL-199](https://jira.adacta-fintech.com/browse/ADIRGSL-199): Добавлена функция заполнения среды тестовыми данными.

- [ADIRGSL-2](https://jira.adacta-fintech.com/browse/ADIRGSL-2): Initial structure.

- [ADIRGSL-202](https://jira.adacta-fintech.com/browse/ADIRGSL-202): Решены вопросы по логике переходов статуса котировки

- [ADIRGSL-203](https://jira.adacta-fintech.com/browse/ADIRGSL-203): add UI to allocate aggregated payment

- [ADIRGSL-204](https://jira.adacta-fintech.com/browse/ADIRGSL-204): Логига компонента на проверку запросов в смежные подразделения, вынесена из логики продукта на подуровень логики компонента. Изменены связанные с этим проверки на переходы статуса. Переходы статуса дублированны в продукте инвестиционного страхования.

- [ADIRGSL-205](https://jira.adacta-fintech.com/browse/ADIRGSL-205): Корректировки по результатам первичного тестирования

- [ADIRGSL-207](https://jira.adacta-fintech.com/browse/ADIRGSL-207): Move bank statement items import to plugins
    Added bank statement item status property

- [ADIRGSL-208](https://jira.adacta-fintech.com/browse/ADIRGSL-208): Добавлен переход из несогласованной котировки в отмененную.

- [ADIRGSL-209](https://jira.adacta-fintech.com/browse/ADIRGSL-209): Список вложений актуализирован согласно ФД

- [ADIRGSL-210](https://jira.adacta-fintech.com/browse/ADIRGSL-210): Добавлена закладка с отображением истории по котировкам и договорам.

- [ADIRGSL-211](https://jira.adacta-fintech.com/browse/ADIRGSL-211): Анкета фин. грамотности. Интерфейс на карточке контрагента.

- [ADIRGSL-214](https://jira.adacta-fintech.com/browse/ADIRGSL-214): Реализован ввод контрагента без ДР и пола для администратора орг. структуры

- [ADIRGSL-215](https://jira.adacta-fintech.com/browse/ADIRGSL-215): Открытие даты заключения на редактирование

- [ADIRGSL-219](https://jira.adacta-fintech.com/browse/ADIRGSL-219): UI for manual allocation. Selection of contract and selection of payment.
    Action allocate if available on the view.

- [ADIRGSL-220](https://jira.adacta-fintech.com/browse/ADIRGSL-220): prepare an allocation view

- [ADIRGSL-221](https://jira.adacta-fintech.com/browse/ADIRGSL-221): ПФ анкеты фин. грамотности.

- [ADIRGSL-222](https://jira.adacta-fintech.com/browse/ADIRGSL-222): Исправления по результатам тестирования от 09/09/2021

- [ADIRGSL-224](https://jira.adacta-fintech.com/browse/ADIRGSL-224): ИСЖ инвестиционные параметры

- [ADIRGSL-225](https://jira.adacta-fintech.com/browse/ADIRGSL-225): Анкета фин. грамотности. Добавление даты актуальности.

- [ADIRGSL-226](https://jira.adacta-fintech.com/browse/ADIRGSL-226): Import test data refactoring

- [ADIRGSL-229](https://jira.adacta-fintech.com/browse/ADIRGSL-229): Auto allocation was implemented.
    auto allcation is executed also after aggregated payment import.

- [ADIRGSL-232](https://jira.adacta-fintech.com/browse/ADIRGSL-232): Верификация, витрина

- [ADIRGSL-233](https://jira.adacta-fintech.com/browse/ADIRGSL-233): Корректировки по результатам тестирования от 17/09/2021

- [ADIRGSL-234](https://jira.adacta-fintech.com/browse/ADIRGSL-234): Fixed query error

- [ADIRGSL-235](https://jira.adacta-fintech.com/browse/ADIRGSL-235): Fix content field names

- [ADIRGSL-242](https://jira.adacta-fintech.com/browse/ADIRGSL-242): Интерфейс добавления вложений

- [ADIRGSL-243](https://jira.adacta-fintech.com/browse/ADIRGSL-243): Обработка результатов тестирования от 20/09/2021

- [ADIRGSL-246](https://jira.adacta-fintech.com/browse/ADIRGSL-246): Скрытие продуктов

- [ADIRGSL-250](https://jira.adacta-fintech.com/browse/ADIRGSL-250): Доп. атрибуты подразделений

- [ADIRGSL-252](https://jira.adacta-fintech.com/browse/ADIRGSL-252): Налоговое резидентство

- [ADIRGSL-259](https://jira.adacta-fintech.com/browse/ADIRGSL-259): Added generation of manual payment plans. In nonrecurring installment based invoicing.

- [ADIRGSL-263](https://jira.adacta-fintech.com/browse/ADIRGSL-263): Обработка результатов тестирования от 22/09/2021

- [ADIRGSL-264](https://jira.adacta-fintech.com/browse/ADIRGSL-264): Отображение времени вложений на сервере

- [ADIRGSL-265](https://jira.adacta-fintech.com/browse/ADIRGSL-265): Remove client pay date.
    Fix INCOME_SOURCE.
    Add RGSL_GUID.

- [ADIRGSL-266](https://jira.adacta-fintech.com/browse/ADIRGSL-266): Триггеры по контрагентам

- [ADIRGSL-273](https://jira.adacta-fintech.com/browse/ADIRGSL-273): Корректировка вкладок

- [ADIRGSL-281](https://jira.adacta-fintech.com/browse/ADIRGSL-281): Типы родственных связей

- [ADIRGSL-283](https://jira.adacta-fintech.com/browse/ADIRGSL-283): Надежный выбор Премиум. Сроки действия рисков.

- [ADIRGSL-284](https://jira.adacta-fintech.com/browse/ADIRGSL-284): make a request class for a service call to be fulfilled.
    filter out payments that cannot be canceled.

- [ADIRGSL-285](https://jira.adacta-fintech.com/browse/ADIRGSL-285): remove BankStatementRgsl configuration

- [ADIRGSL-287](https://jira.adacta-fintech.com/browse/ADIRGSL-287): Change RUR to RUB for currency code on aggregated payment register importing

- [ADIRGSL-288](https://jira.adacta-fintech.com/browse/ADIRGSL-288): Обработка комментариев по результатам тестирования 30/09/2021

- [ADIRGSL-42](https://jira.adacta-fintech.com/browse/ADIRGSL-42): Upgraded the platform to version 5.0.1. Upgraded the studio to version 12.0.2.

- [ADIRGSL-44](https://jira.adacta-fintech.com/browse/ADIRGSL-44): Prepared basic party components: documents, phones, e-mails, bank accounts.

- [ADIRGSL-45](https://jira.adacta-fintech.com/browse/ADIRGSL-45): Создан компонент "Адреса" для контрагентов.
    Компонент использует интеграционный сервис Dadata для определения адресов.

- [ADIRGSL-49](https://jira.adacta-fintech.com/browse/ADIRGSL-49): General party search view adaptation without changing ES mappings.

- [ADIRGSL-51](https://jira.adacta-fintech.com/browse/ADIRGSL-51): Изменение композиции полей из раздела "Атрибуты общие для контрагентов с типами ФЛ/ИП/ЮЛ":
        1. Секция "Общая информация":
            а. Добавились поля: Бенефициарный владелец, Оценка риска, Цель установки отношений, Предполагаемый характер отношений, Цель финансово-хозяйственной деятельности, Финансовое положение, Деловая репутация и Источник происхождения денежных средств. Эти роля раньше находились в секции CRS, т.к. так описанно в ФД. Изменение положения связоно с соблюдением формальной логики в заполнении анкеты контрагента.
            б. Написанны скрипты для базы данных на основании данных из справочника, если значений больше 3, и инструменты для получения этих значений
            в. Настроенна логика и переводы.
            г. Настроенна валидация.
        2. Секция "CRS":
            а. Секция CRS разделенна на две: CRS и FATCA.
            б. Написанны скрипты для базы данных на основании данных из справочника, если значений больше 3, и инструменты для получения этих значений
            в. Настроенна валидация.
        3. Секция "Данные Физического Лица":
            а. Добавились поля: Сегмент, Должностное лицо, Степень родства.
            б. Написанны скрипты для базы данных на основании данных из справочника, если значений больше 3, и инструменты для получения этих значений
            в. Настроенна логика и переводы.
            г. Настроенна валидация.
        4. Сущности "Физ.Лицо" и "Юр.Лицо:
            а. Настроенны значения по умолчанию.
        5. Библиотеки:
            а. Написаны фунции для валидации: ИНН, Признаков для обязятельности заполнения секций  CRS и FATCA.

- [ADIRGSL-53](https://jira.adacta-fintech.com/browse/ADIRGSL-53): Компонент Данные Физического лица:
    1. Написаны схемы представления обЪектов как в интерфейсе так и в ожидаеммых данных, согласно ФД.
    2. Для выполнения требований в пункте "Сведения о единоличном исполнительном органе" компонент "Данные физического лица" подвергся корекции. Был разделен на две составляющии в завимсимости от экономиского смысла.
    3. Проведеена работа над валидацией.

- [ADIRGSL-55](https://jira.adacta-fintech.com/browse/ADIRGSL-55): Реалзация интеграции курсов валют из ЦБ

- [ADIRGSL-57](https://jira.adacta-fintech.com/browse/ADIRGSL-57): Updated party components according to new requirements: phones and bank accounts.

- [ADIRGSL-58](https://jira.adacta-fintech.com/browse/ADIRGSL-58): Added implementation ES dataProvider for parties, added basic reindexation script.

- [ADIRGSL-60](https://jira.adacta-fintech.com/browse/ADIRGSL-60): Подготовлен пример и краткая инструкция для использования Postman на локальной Docker среде.

- [ADIRGSL-63](https://jira.adacta-fintech.com/browse/ADIRGSL-63): Connecting basic attachments component on parties with required types, but with platform logic.

- [ADIRGSL-66](https://jira.adacta-fintech.com/browse/ADIRGSL-66): Prepared organisation units tree.

- [ADIRGSL-67](https://jira.adacta-fintech.com/browse/ADIRGSL-67): Подготовлена проверка на наличие дублей и минимальная структура ASS только для обеспечения данными уазанной проверки.

- [ADIRGSL-71](https://jira.adacta-fintech.com/browse/ADIRGSL-71): Moved CI to Linux and prepared dist package.

- [ADIRGSL-72](https://jira.adacta-fintech.com/browse/ADIRGSL-72): Создана базовая структура продуктов по НСЖ и ИСЖ, включающая в себя:

    1. два продукта ИСЖ и НСЖ. Данные продукты реализованы как шаблон для всех продуктов этих типов. Разделение по специфическим продуктам будет реализовано в разделе Условия Страхования;
    2. доступ к продуктам из меню и Dashboard;
    3. все компоненты, описанные в крайней версии ФД по договорам страхования.

- [ADIRGSL-81](https://jira.adacta-fintech.com/browse/ADIRGSL-81): В компонент PartyPersonData добавлен чек-бокс "Индивидуальный предприниматель". При выборе открывается таблица, где можно ввести данные: ОГРНИП, дату регистрации и дату внесения записи о прекращении деятельности. Данные проходят валидацию на правдоподобность: ОГРН на контрольные суммы, даты на достоверность относительно текущей даты и самих и себя.

- [ADIRGSL-84](https://jira.adacta-fintech.com/browse/ADIRGSL-84): Добавлен функционал ввода номера телефона целиком.

- [ADIRGSL-85](https://jira.adacta-fintech.com/browse/ADIRGSL-85): Добавлен функционал ввода иностранного банка.

- [ADIRGSL-86](https://jira.adacta-fintech.com/browse/ADIRGSL-86): В карточке контрагента физлица добавлена секция выбор роли. В зависимости от нее включаются валидации.
    В договорах при заполнении полей страхователь, застрахованный и выгодоприобретатели добавлена валидация на достаточность введенных данных для физлица этой роли.
    При переходе на ссылку открывается окно карточки физлица, там можно выбрать нужную роль и заполнить данные, после сохранения данные обновятся в базе данных. После при сохранении в котировке подтянуться новые данные и обновиться результат валидации.

- [ADIRGSL-87](https://jira.adacta-fintech.com/browse/ADIRGSL-87): Добавлены валидации на поля Фамилия, Имя и Отчество контрагента.

- [ADIRGSL-88](https://jira.adacta-fintech.com/browse/ADIRGSL-88): Написаны тесты к библиотеке в компоненте Party.

- [ADIRGSL-89](https://jira.adacta-fintech.com/browse/ADIRGSL-89): Исправления по результатам демонстрации: UI, дефолтный признак резидента, отображение отчества в поиске, валидации

- [ADIRGSL-92](https://jira.adacta-fintech.com/browse/ADIRGSL-92): Реализация функционала условий страхования. Добавлен компонент "Основные условия страхования", в который включены справочники "Страховая программа", "Партнёр" и "Продукт". Создана связь между основными условиями страхования и доступностью рисков.

- [ADIRGSL-94](https://jira.adacta-fintech.com/browse/ADIRGSL-94): Подготовлена сущность поставщика услуг - партнера. Финализация разработки с учетом всех требований будет в отдельной задаче после согласования ФД.

- [ADIRGSL-95](https://jira.adacta-fintech.com/browse/ADIRGSL-95): Build Docker client image.

- [ADIRGSL-96](https://jira.adacta-fintech.com/browse/ADIRGSL-96): Подготовлен базовый компонент выбора страхователя

- [ADIRGSL-97](https://jira.adacta-fintech.com/browse/ADIRGSL-97): Написан новый компонент для поиска с возможностью создания контагента внутри него.


### Fixed (10 changes)

- [ADIRGSL-154](https://jira.adacta-fintech.com/browse/ADIRGSL-154): Fixed common schema mapping, tariffs return values and summary schema in order to be aligned with Platform schemas.

- [ADIRGSL-230](https://jira.adacta-fintech.com/browse/ADIRGSL-230): Refactor small payments generation according to the new infrustructure

- [ADIRGSL-237](https://jira.adacta-fintech.com/browse/ADIRGSL-237): do not allocate if no document found

- [ADIRGSL-254](https://jira.adacta-fintech.com/browse/ADIRGSL-254): Payment status codetable was added and payment status description displayed on UI.

- [ADIRGSL-267](https://jira.adacta-fintech.com/browse/ADIRGSL-267): Fixed bank statement item search query

- [ADIRGSL-269](https://jira.adacta-fintech.com/browse/ADIRGSL-269): In case of small payment we display reference number, else payment description.

- [ADIRGSL-271](https://jira.adacta-fintech.com/browse/ADIRGSL-271): Fixed bank statement item search

- [ADIRGSL-272](https://jira.adacta-fintech.com/browse/ADIRGSL-272): If payment cancelled, display zero open amount

- [ADIRGSL-286](https://jira.adacta-fintech.com/browse/ADIRGSL-286): Allow to request payment by bsiId from DataSource

- [ADIRGSL-292](https://jira.adacta-fintech.com/browse/ADIRGSL-292): Blocker fix

