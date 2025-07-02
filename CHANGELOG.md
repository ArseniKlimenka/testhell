# 82.0.0-rc1 (2025-06-30)

### Breaking Changes (5 changes)

- [ADIRGSLSUPP-3888](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3888): Настроен загрузчик атрибутов договора
    
    Перед паблишем необходимо выполнить скрипт
    `database\sql\migration\ADIRGSLSUPP-3888-alter-additional-parameters-sat.sql`

- [ADIRGSLSUPP-3971](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3971): Перед или после установки необходимо заменить путь к keycloak image-у.
    Добавлена новая переменная в .env CI_REGISTRY_KC_IMAGE

- [ADIRGSLSUPP-4355](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4355): ADS-13731_Продукт ПредДСЖ - корректировка Базовых активов
    Выполнить скрипт database/sql/migration/ADIRGSLSUPP-4355-unit-linked-tables.sql

- [ADIRGSLSUPP-4389](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4389): ОАС_Копириование продукта Персональный фонд Ультра
    После паблиша и выполнения скрипта database\sql\Data\PAS\8.50_043.011.000_20250618095408_create_preequityoas.sql необходимо выполнить скрипт:
    database\sql\migration\ADIRGSLSUPP-4389-unit-linked-tables.sql

- [ADIRGSLSUPP-4399](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4399): 1) исправлена логика заполнения атрибута manualCountry при выборе чекбокса Ввод адреса вручную
    2) добавлен скрипт удаления объекта manualCountry (атрибут Страна) для существующих контрагентов с пустыми чекбоксами Ввод адреса вручную и Иностранный адрес.
    
    После паблиша необходимо выполнить скрипт:
        database\sql\migration\8.50_043.011.000_20250620055152__adirgslsupp_4399.sql


### New Features (47 changes)

- [ADIRGSLSUPP-2222](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2222): Обновление таблицы BFX_IML.RISKS

- [ADIRGSLSUPP-3041](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3041): Добавлена предварительная фильтрация по партнёру при выборе продукта

- [ADIRGSLSUPP-3184](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3184): Настроено добавление рисков по продукту в ДС на фин изменение

- [ADIRGSLSUPP-3479](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3479): Настроено уведомление при попытке повторного формирования XML сообщения о платеже для Росфинмониторинга.

- [ADIRGSLSUPP-3912](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3912): Доработан экспорт условий комиссионного вознаграждения: добавлен столбец Описание ручной схемы КВ, переименован и обновлен столбец Код продукта, удалены столбцы Фикс. сумма, руб. вкл НДС и Инвертировать вариант, исправлено некорректное отображение значений некоторых столбцов.

- [ADIRGSLSUPP-3936](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3936): 1) исправлено некорректное отображение результатов отбора параметров экономики в журнале (дубликаты)
    2) исправлено сопоставление параметров экономики и соответствующих договоров при формировании отчета параметров экономики

- [ADIRGSLSUPP-4087](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4087): Настроено логирование запрета доступа к документам adInsure

- [ADIRGSLSUPP-4125](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4125): Добавлена кнопка "Обновить данные бенефициарных владельцев" на карточке КА

- [ADIRGSLSUPP-4131](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4131): PF-3966_ВТБ (Прайм, Привилегия и Новые территории) запуск продукта на 4 года, рубли

- [ADIRGSLSUPP-4138](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4138): ОАС запуск продукта "Драйвер Гарантия", 2 года, рубли

- [ADIRGSLSUPP-4232](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4232): PF-3987_ВТБ (сегмент розница и Новые территории) запуск продукта "Драйвер Гарантия"

- [ADIRGSLSUPP-4267](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4267): PF-3942_ВТБ (Прайм и Привилегия)_Оптимальный выбор/Ультра_настройка печатных форм

- [ADIRGSLSUPP-4275](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4275): PF-3988_ДСЖ_Добавление типа вложения

- [ADIRGSLSUPP-4283](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4283): ADS-13689 Адиншур_Зенит "Стратегия на пять. Гарант" ошибка с триггерами

- [ADIRGSLSUPP-4287](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4287): PF-3995_Зенит масс_ Драйвер Гарантия_ корректировка работы триггеров при превышении установленных лимитов

- [ADIRGSLSUPP-4311](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4311): Настроен доступ для компонента "Расчет выплаты ДСЖ"

- [ADIRGSLSUPP-4327](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4327): PF-4005_Защита чемпионов_добавление памятки

- [ADIRGSLSUPP-4330](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4330): Параметры экономики:
    
    * Выполнены доработки по результатам тестирования.

- [ADIRGSLSUPP-4333](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4333): PF-4004_Корректировка провайдера в сервисе "Образовательный консьерж"

- [ADIRGSLSUPP-4341](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4341): ADS-13662_Доработка формы смены пароля пользователя

- [ADIRGSLSUPP-4360](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4360): Настроены проверки для договора с привязкой к активу.

- [ADIRGSLSUPP-4364](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4364): предДСЖ: доработка ролей для визуализации на карточке контрагента: "Представитель выгодоприобретателя", "Выгодоприобретатель".

- [ADIRGSLSUPP-4371](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4371): 160_A24-777_Внедрение системы ДФА(двухфакторная аутентификация) - разработка

- [ADIRGSLSUPP-4372](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4372): ПредДСЖ:
    
    * Добавлено дополнительное округление процентов в п.5 и п.6 в памятке ЦБ

- [ADIRGSLSUPP-4374](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4374): Корректировка ролей для групп продавцов
    Корректировка роли PostSalesInquiry

- [ADIRGSLSUPP-4375](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4375): Маппинг Драйвер гарантия Ультра новые территории для ВТБ

- [ADIRGSLSUPP-4378](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4378): Маппинг_Драйвер Гарантия Ультра Бонд Репак 00878 00879 00880

- [ADIRGSLSUPP-4379](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4379): Отвязка платежей при создании ДС "Перевод портфеля" производится от взносов с датой => Дата перевода портфеля.

- [ADIRGSLSUPP-4385](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4385): Маппинг Драйвер гарантия для ВТБ новые территории и Экспобанк (00794, 00795, 00796, 00619)

- [ADIRGSLSUPP-4387](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4387): PF-3987_ВТБ Розница нт исправления по результатам теста ДГ

- [ADIRGSLSUPP-4394](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4394): Добавлена возможность отключения записи событий в таблицу BFX_IMPL.SEND_EVENT
    
    Для отключения записи надо установить в поле BFX_IMPL.SEND_EVENT_CONFIGURATION.IS_RECORD_DISABLED = 1

- [ADIRGSLSUPP-4401](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4401): Доработки по результатам тестирования процесса выпуска договора c привязкой к Активу

- [ADIRGSLSUPP-4403](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4403): Синхронизация конфигов с тест и GIT

- [ADIRGSLSUPP-4408](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4408): Исправлена ошибка создания ДС при передаче портфеля

- [ADIRGSLSUPP-4409](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4409): Для секции Адреса карточки контрагента:
    1) открыта возможность редактирования атрибута Страна при выборе чекбокса Ручной адрес, выпадающий список ограничен страной Россия.
    2) при выборе чекбокса Иностранный адрес из выпадающего списка исключена страна Россия.

- [ADIRGSLSUPP-4410](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4410): Скорректирована логика выбора типа заявителя в заявке ППО.

- [ADIRGSLSUPP-4412](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4412): Доработки декларации "Любительский спорт" для продукта "На всякий случай Ультра (TERMVVTB)

- [ADIRGSLSUPP-4415](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4415): ВТБ Прайм Новые тер. Драйвер гарантия Ультра

- [ADIRGSLSUPP-4421](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4421): Создание миграционных продуктов_Июнь 2025

- [ADIRGSLSUPP-4422](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4422): Доработки по результатам тестирования процесса выпуска договора c привязкой к Активу

- [ADIRGSLSUPP-4424](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4424): PF-4028_Маппинг - новые схемы КВ

- [ADIRGSLSUPP-4426](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4426): Добавлено редактирование декларативной части котировки

- [ADIRGSLSUPP-4427](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4427): Установлена дополнительная блокирующая валидация Для атрибута "Дата получения заявления"

- [ADIRGSLSUPP-4428](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4428): Переименовано наименование признака дс

- [ADIRGSLSUPP-4431](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4431): PF-4039_Скрыть предложение бандла для продукта "Стратегия на пять. Гарант" (ВТБ, сегмент Привилегия)

- [ADIRGSLSUPP-4435](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4435): PF-3942_ВТБ (Прайм и Привилегия)_Оптимальный выбор/Ультра_результаты тестирования печатных форм

- [ADIRGSLSUPP-4441](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4441): PF-4045_Экспобанк_корректировка шаблона договора по продукту "Драйвер Гарантия"


### Fixed (22 changes)

- [ADIRGSLSUPP-3284](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3284): Внесены исправления в печатную формы ФЛ согласно результатам тестирования

- [ADIRGSLSUPP-3588](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3588): Исправлено отображение условий вознаграждения на агентских договорах

- [ADIRGSLSUPP-3639](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3639): Заявка ППО:
    
    * Исправлено создание ДС на Расторжение

- [ADIRGSLSUPP-4079](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4079): Исправлено некорректное определение даты заключения договора при создании заявки в определенное время в часовом поясе, отличном от серверного.

- [ADIRGSLSUPP-4086](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4086): Исправлена отправка писем при создании запросов в смежное подразделение на котировках

- [ADIRGSLSUPP-4179](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4179): Исправление замечаний по результатам тестирования в заявке ППО.

- [ADIRGSLSUPP-4263](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4263): Исправлено название кнопки в меню

- [ADIRGSLSUPP-4289](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4289): Заявка ППО:
    
    * Исправлена ошибка при создании нефинансового ДС при отсутствии загруженных фондов по договору ДСЖ

- [ADIRGSLSUPP-4304](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4304): Убраны старые типы активов

- [ADIRGSLSUPP-4322](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4322): Ошибка при открытии документа Дожитие/ДИД

- [ADIRGSLSUPP-4331](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4331): Фильтр "Тип реестра" в Журнале платежей - разработка

- [ADIRGSLSUPP-4349](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4349): ADS-13735_Ошибка передачи сведений о суммах платежей в сервисе get-contract-custom-data

- [ADIRGSLSUPP-4359](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4359): Релиз 80. АВР. При нажатии на кнопку "Авто-заполнение" - ошибка

- [ADIRGSLSUPP-4368](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4368): Исправлено отображение некорректного времени создания запроса при расторжении

- [ADIRGSLSUPP-4381](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4381): Договоры страхования. НСЖ. ИСЖ. Ошибка: "Cannot read properties of undefined (reading 'Error')" при выборе страхователя

- [ADIRGSLSUPP-4383](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4383): Исправлена нумерация корректировок для Справок для налоговой при создании через сервис

- [ADIRGSLSUPP-4386](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4386): Скорректировано заполнение даты окончания фонда в доп. соглашениях предДСЖ, созданных через заявку ППО.

- [ADIRGSLSUPP-4396](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4396): Лесенка КВ (ДСЖ):
    
    * Исправлена ошибка после обновлении значений лесенки

- [ADIRGSLSUPP-4411](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4411): ADS-13764_ошибка  'isForeignAddress' при создание дс по не фин изм.

- [ADIRGSLSUPP-4425](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4425): Исправлена ошибка из за которой не отображались результаты проверок на карточке КА, если лицо не совпало с перечнем

- [ADIRGSLSUPP-4437](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4437): Отчет предДСЖ:
    
    * Данные о стратегиях будут выбраны из ДС

- [ADIRGSLSUPP-4451](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4451): Ошибка передачи формата даты в сервисе get-contract-custom-data

# 81.0.0-rc1 (2025-06-17)

### Breaking Changes (11 changes)

- [ADIRGSLSUPP-2311](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2311): Upgraded platform to version 43.11.0. Upgraded configuration to version 43.4.0.

- [ADIRGSLSUPP-3905](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3905): Добавлена информация о полученных документах
    
    Перед паблишем необходимо выполнить скрипт
    `database\sql\migration\ADIRGSLSUPP-3905-alter-additional-parameters-sat.sql`
    
    После паблиша необходимо выполнить ETL-service `CreateMissingAdditionalParametersEtlService` без параметров.
    
    Обязательно запустить ETL-service `CreateMissingAdditionalParametersEtlService` на препрод среде для оценки времени выполнения.
    Для проверки статуса выполнения ETL-service можно использовать запрос:
    `select STATUS, PROCESSING_MESSAGE from BFX.ETL_EXECUTION_STATUS where CONFIGURATION_NAME = 'CreateMissingAdditionalParametersEtlService' order by SYS_CREATED_ON desc`
    
    STATUS = 2 - означает, что сервис отработал без ошибок
    
    При перезапуске сервера, если ETL-service не отработал до конца, необходимо запустить ETL-service заново.

- [ADIRGSLSUPP-3934](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3934): Ошибка в договорах с Бандлом. Скрипт для исправления значения коммиссии в БД.
    Запустить скрипт database\sql\migration\8.50_043.007.000_20250512100815_adirgslsupp_3934_fix_commission_bundle.sql на продуктиве.

- [ADIRGSLSUPP-3983](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3983): 1) добавлен новый обязательный атрибут Страна в карточки контрагентов ФЛ для адресов типа Адрес Регистрации и Адрес фактического проживания
    2) реализована проверка возможности сохранения карточки контрагента для пользователей, у которых нет роли GeneralBackOffice, в зависимости от наличия договоров у контрагента
    3) добавлена новая роль PartyEditorAGENT, ограничивающая возможность редактирования отдельных атрибутов карточки контрагента в зависимости от наличия договоров у контрагента.
    4) добавлен скрипт добавления объекта manualCountry (атрибут Страна) со значением Россия в адрес для существующих контрагентов с выбранным чекбоксом Ввод адреса вручную.
    
    После паблиша необходимо выполнить скрипт:
        database\sql\migration\8.50_043.011.000_20250606163656_adirgslsupp_3983.sql

- [ADIRGSLSUPP-4039](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4039): Исправлена неправильная сортировка в поиске контрагентов.
    Нужен реиндекс для GeneralPartyDataProvider.

- [ADIRGSLSUPP-4209](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4209): Добавлена валидация на последнюю отменённую корректировку к Справкам для налоговой. Теперь все версии справок доступны для выбора в выпадающем списке версий.
    Необходимо выполнить миграционный скрипт: database\sql\migration\8.50_043.011.000_20250605120238_ADIRGSLSUPP_4209.sql

- [ADIRGSLSUPP-4263](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4263): Добавлена новая сущность Предварительный расчет по Активу
    Необходимо выполнить скрипт после паблиша database/sql/migration/ADIRGSLSUPP-4263-update-min-premium.sql

- [ADIRGSLSUPP-4293](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4293): Исправлено отображение активити для допников к Справкам для налоговой
    После паблиша необходима реиндексация активити

- [ADIRGSLSUPP-4312](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4312): Исправлена ошибка из-за которой созданный КА не попадал в индекс ES.
    Нужен реиндекс GeneralPartyDataProvider

- [ADIRGSLSUPP-4342](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4342): ПредДСЖ. Исправлены ошибки при создании заявки
    
    После паблиша необходимо выполнить миграционный скрипт database\sql\migration\ADIRGSLSUPP-4342-datafix-request-last-fund-status.sql

- [ADIRGSLSUPP-4345](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4345): Исправлены ошибки при фильтрации колонок Поиск поставщиков услуг
    Нужен реиндекс дял ServiceProviderDataProvider


### New Features (39 changes)

- [ADIRGSLSUPP-2222](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2222): Обновление таблицы BFX_IMPL.RISKS

- [ADIRGSLSUPP-2728](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2728): Работы в рамках ресертификации - группа Методология
    Добавление новой роли РostSalesInquiry

- [ADIRGSLSUPP-3246](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3246): Настроено задание по переводу котировки и договора в статус "Отменен"

- [ADIRGSLSUPP-3276](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3276): Доработан процесс выпуска договора c привязкой к Активу
    
    Для восстановления договоров, в случае если нет доступного лимита для восстановления, настроена роль SkipCheckAssetAvailableLimit

- [ADIRGSLSUPP-3284](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3284): Исправлены ошибки отображения данных в печатной форме.

- [ADIRGSLSUPP-3935](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3935): ВТБ Прайм Новые территории Драйвер гарантия

- [ADIRGSLSUPP-3936](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3936): Добавлена форма поиска Журнал параметров экономики, настроены фильтры для отбора, таблица с отображением параметров, экспорт результатов в таблицу excel.

- [ADIRGSLSUPP-3985](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3985): В выходные параметры сервиса GetVTBProducts добавлен атрибут "Код стратегии инвестирования"

- [ADIRGSLSUPP-4037](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4037): Добавлены отчеты по хранению активов:
    
    - Отчет на дату
    - Отчет за период
    - Реестр сделок

- [ADIRGSLSUPP-4062](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4062): Изменена логики дат заключения и начала действия договоров

- [ADIRGSLSUPP-4071](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4071): 1) добавлен экспорт отчета Параметры экономики в меню Отчеты по договорам
    2) добавлена валидация на выгрузку отчета на период 90 дней

- [ADIRGSLSUPP-4109](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4109): 1) отменены изменения, внесенные в ADIRGSLSUPP-4049
    2) настроена блокирующая валидация на Агентском договоре на проверку Агентства

- [ADIRGSLSUPP-4122](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4122): Исправлена расширение выгружаемых вложений из Справок для налоговой

- [ADIRGSLSUPP-4131](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4131): PF-3966_ВТБ (Прайм, Привилегия и Новые территории) запуск продукта на 4 года, рубли

- [ADIRGSLSUPP-4164](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4164): Скорректирован формат отображения данных в столбцах "ДОЛЯ АКТИВА (ТЕКУЩАЯ)" и "СТАВКА КУПОНА" закладок "Загруженная Информация" и "Импортированная Информация" формы "Импорт данных об активах в фондах" с числового на процентный.

- [ADIRGSLSUPP-4165](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4165): При ручном создании дс по расторжениям с подтипом события "по инициативе общества" и выбранным классом события "неуплата очередного взноса" , добавлена блокирующая валидация, если задолженность = 0

- [ADIRGSLSUPP-4179](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4179): Доработана Заявка ППО для процесса вывода ДС для предДСЖ.

- [ADIRGSLSUPP-4180](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4180): Доработано ДС на финансовые изменения для процесса вывода денежных средств для предДСЖ.

- [ADIRGSLSUPP-4192](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4192): ДСЖ:
    
    * Доработан отчет Реестр на списание ПРЕДДСЖ

- [ADIRGSLSUPP-4226](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4226): Добавлены валидации на даты в ДС на расторжение

- [ADIRGSLSUPP-4236](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4236): Разрешено редактирование атрибута "Тип обращения" в Заявке ППО для статуса "Проект".

- [ADIRGSLSUPP-4255](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4255): Работы в рамках ресертификации - группа Инвестиции/Продуктовая фабрика

- [ADIRGSLSUPP-4259](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4259): Маппинг Достойный Век3.0 00870

- [ADIRGSLSUPP-4262](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4262): НС. Ошибка квитовки платежей от клиентов с сокращенной карточкой в АДШ.
    После наката изменений на прод отобрать список контрагентов с незаполненными таблицами PTY_IMPL и запустить множественный вызов PartyImplRoute по списку на проде.

- [ADIRGSLSUPP-4282](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4282): Заявка ППО:
    
    * Доработана логика расчетов долей и сумм в компоненте "Базовые параметры инвестирования".
    * Вывод ISIN в ПФ будет производиться даже без наличия информации по ISIN.

- [ADIRGSLSUPP-4290](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4290): Заявка ППО. Доработана логика определения НДФЛ в блоке "Расчет выплаты ДИД".

- [ADIRGSLSUPP-4299](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4299): PF-4000_Экспобанк_запуск Драйвер Гарантия на срок 1 год

- [ADIRGSLSUPP-4304](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4304):
    - Добавлены новые типы активов
    - Снята обязательность заполнения для атрибутов:
        · Курс приобретения актива
        · Цена единицы актива
        · Цена единицы на момент окончания
    - Добавлены атрибуты
        · Поправочный коэффициент
        · Ставка купона по активу
        · Дата погашения актива
- [ADIRGSLSUPP-4307](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4307): ПредДСЖ: настройка маппинга КВ в САП

- [ADIRGSLSUPP-4328](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4328): Скрыт раздел «Кумуляция по 2 объекту страхования (Страхователь)»

- [ADIRGSLSUPP-4343](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4343): Корректировки по результатам анализа возможности передачи портфеля через ДС для ПредДСЖ.

- [ADIRGSLSUPP-4344](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4344): Работы в рамках ресертификации - группа Андеррайтинг

- [ADIRGSLSUPP-4346](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4346): ДСЖ:
    
    * Актуализирован справочник доступных статусов фонда

- [ADIRGSLSUPP-4349](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4349): ADS-13735_Ошибка передачи сведений о суммах платежей в сервисе get-contract-custom-data

- [ADIRGSLSUPP-4354](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4354): Изменены критерии отбора справок для массового подтверждения Справок для налоговой, изменены сообщения, выводимые в процессе массового подтверждения Справок для налоговой

- [ADIRGSLSUPP-4360](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4360): Настроены проверки для договора с привязкой к активу.

- [ADIRGSLSUPP-4372](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4372): ПредДСЖ:
    
    * Скорректированы проценты в п.5 и п.6 в памятке ЦБ

- [ADIRGSLSUPP-4373](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4373): PF-4000-Экспобанк "Драйвер Гарантиrя"_1 год исправление по результатам тестирования

- [ADIRGSLSUPP-4377](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4377): ПредДСЖ: корректировка минимальной доли актива.


### Fixed (19 changes)

- [ADIRGSLSUPP-2227](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2227): Исправлены опечатки в документе Убыток

- [ADIRGSLSUPP-3271](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3271): Исправлены замечания по тестированию задачи 3271.

- [ADIRGSLSUPP-3709](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3709): ADS-13329_Не формируется план оплат по договорам

- [ADIRGSLSUPP-3743](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3743): Исправлена валидация для проверок 1СКПК

- [ADIRGSLSUPP-3924](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3924): Исправлена ошибка при аннулировании ДС на расторжение

- [ADIRGSLSUPP-3970](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3970): Исправлен некорректный НДС в описании РНВ

- [ADIRGSLSUPP-4113](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4113): Изменена логика вывода уведомления о переплате в дс по расторжениям

- [ADIRGSLSUPP-4115](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4115): Налоговые справки (ADIRGSLSUPP-3678). не срабатывают валидации по отчётному году (Обращение ЛКК)

- [ADIRGSLSUPP-4178](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4178): Исправлены валидации в интеграционном сервисе по созданию Справок для налоговой

- [ADIRGSLSUPP-4248](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4248): Исправлен рассчет кумуляции для группы рисков DI

- [ADIRGSLSUPP-4264](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4264): Конфигурация продуктов:
    
    * Исправлена ошибка экспорта конфигурации, связанная с отсутствием столбца "Продукт с привязкой к активу".

- [ADIRGSLSUPP-4276](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4276): Исправлен баг с проставлением признака ФНС при создании справки на расторгнутый договор

- [ADIRGSLSUPP-4288](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4288): Исправлены ошибки ПФ:
    
    * Ошибка при открытии ПФ "Заявление на изменение структуры ИС" заявки ППО.
    * Количество знаков в пункте 5 (информация о размере денежных средств) в памятки ЦБ, ПФ договора ДСЖ.

- [ADIRGSLSUPP-4315](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4315): Исправлена Ошибка работы сервиса: Javascript system error occurred: Message: Cannot read properties of undefined (reading 'insredAgeOnStartDate')

- [ADIRGSLSUPP-4316](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4316): Эл. полис:
    
    * Исправлены названия вложений

- [ADIRGSLSUPP-4322](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4322): Ошибка при открытии документа Дожитие/ДИД

- [ADIRGSLSUPP-4332](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4332): Корректровка логики подтягивания АД к договору.

- [ADIRGSLSUPP-4335](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4335): Исправлено поведение кнопки создания и добавления вложения в Справке для налоговой

- [ADIRGSLSUPP-4347](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4347): Добавлен доступ для редактирования вкладки Анкеты для роли PartyEditorAGENT.

# 80.0.0-rc1 (2025-06-02)

### Breaking Changes (8 changes)

- [ADIRGSLSUPP-2311](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2311): Upgraded platform to version 43.10.0. Upgraded configuration to version 43.3.2.

- [ADIRGSLSUPP-3440](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3440): Исправлена ошибка items должно быть текст
    
    Выполнить скрипт после паблиша:
    ADIRGSLUPP-3440-productConf-additionalServices-datafix.sql

- [ADIRGSLSUPP-3529](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3529):
    - Поправлен текст ошибки при неуказании описания ручной схемы КВ
    - Исправлено формирование списка возможных ручных схем КВ
    - Исправлен вывод описания ручных схем КВ на АВР
    
    Необходимо выполнить миграционный скрипт после паблиша: database\sql\migration\ADIRGSLSUPP-3529-set-aa-amendment-number.sql
- [ADIRGSLSUPP-4095](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4095): Скрипт с датафиксом: database\sql\migration\ADIRGSLSUPP-3678-tax-deduction-format-fix.sql. Скрипт следует выполнять после паблиша.

- [ADIRGSLSUPP-4102](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4102): Корректировка набора инструментов для предДСЖ.
    
    После паблиша необходимо выполнить скрипт
    database\sql\migration\ADIRGSLSUPP-4102-unit-linked-tables.sql

- [ADIRGSLSUPP-4122](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4122): Исправлена расширение выгружаемых вложений из Справок для налоговой
    Необходимо выполить скрипт: database\sql\migration\8.50_043.010.000_20250530121855.sql

- [ADIRGSLSUPP-4221](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4221): Необходимо выполнить скрипт 
    `database\sql\migration\ADIRGSLSUPP-3601-datafix-consent-to-data-transfering-fns-field-on-contracts.sql`
    
    после паблиша и после выполнения скрипта 
    `database\sql\migration\ADIRGSLSUPP-3601-product-datafix.sql`

- [ADIRGSLSUPP-4224](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4224): Добавлен датафикс для Справок для налоговой, проставляющий значение о передаче данных в ФНС в зависимости от данных в договоре
    Необходимо выполнить скрипт database\sql\migration\ADIRGSLSUPP-3601-datafix-consent-to-data-transfering-fns-field-on-accounting-certificates.sql


### New Features (72 changes)

- [ADIRGSLSUPP-3281](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3281): Добавлен джоб, который рассчитывает остатки по лимитам и отправляет уведомление
    После паблиша необходимо выполнить скрипт database/sql/migration/ADIRGSLSUPP-3281-asset-new-tables-fullfillment.sql

- [ADIRGSLSUPP-3516](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3516): PF-3535_Все партнеры_Забота о будущем_Доработка для роли ОПЕРУ замены выг-ля категории "Несоверш лицо" - разработка

- [ADIRGSLSUPP-3673](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3673): Лесенка КВ:
    
    * Отключена валидация на обязательное вложение с типом "Заявление на страхование", в случае если по Котировке сработала только валидация  "E: Должно быть приложено вложение типа "Согласования с управляющим директором - УД ДРПК"".

- [ADIRGSLSUPP-3675](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3675): предДСЖ:
    
    * Доработана ПФ для Лесенки КВ.

- [ADIRGSLSUPP-3710](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3710): 1) для доп. соглашения на нефинансовые изменения настроена логика валидаций согласования комплаенс при изменении персональных данных страхователя и застрахованного лица для атрибутов: Адрес регистрации, Фактический адрес, Телефон, Публичное должностное лицо, Страна налогового резидентства, Страна Регистрации.
    2) для документов ДМС и НС в доп. соглашении на нефинансовые изменения добавлена валидация проверки изменения персональных данных страхователя и застрахованного лица.

- [ADIRGSLSUPP-3765](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3765): Добавлены проверки существования в системе контрагентов и партнера при импорте индивидуального договора. Добавлен расчет комиссионного вознаграждения для созданного договора.

- [ADIRGSLSUPP-3861](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3861): НС. Защита чемпионов 2.0

- [ADIRGSLSUPP-3863](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3863): ПредДСЖ. Доработана карточка документа Заявка ППО согласно требованиям. Добавлен новый компонент `Расчет выплаты ДСЖ`.

- [ADIRGSLSUPP-3864](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3864): ПредДСЖ: Реализована доработка ДС на расторжение согласно требованиям.

- [ADIRGSLSUPP-3866](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3866): Доработан отчет предДСЖ. В отчет теперь попадают также ДС на расторжение, класс события которых = "После периода охлаждения" и по которым был произведён перевод в статус «Ожидает расформирования».

- [ADIRGSLSUPP-3867](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3867): Создан новый отчет "Реестр на списание ПРЕДДСЖ".

- [ADIRGSLSUPP-3868](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3868): ПредДСЖ: Реализована логику заполнения данными компонента "Расчет выплаты ДСЖ" на Заявке ППО.

- [ADIRGSLSUPP-3938](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3938): PF-3915_Замена сервиса Налоговый вычет на Мультисервис

- [ADIRGSLSUPP-3971](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3971): 216_A24-2643_Доработки в отношении функционала смены паролей пользователей

- [ADIRGSLSUPP-3973](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3973): Заявка ППО:
    
    * Доработан процесс предзаполнения блока "Базовые параметры инвестирования"
    * Исправлен расчёт значения для поля "Сумма размещения в стратегии"

- [ADIRGSLSUPP-3982](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3982): НС. Защита чемпионов. Корректировка сегмента продаж

- [ADIRGSLSUPP-3983](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3983): 1) добавлен новый обязательный атрибут Страна в карточки контрагентов ФЛ для адресов типа Адрес Регистрации и Адрес фактического проживания
    2) реализована проверка возможности сохранения карточки контрагента для пользователей, у которых нет роли GeneralBackOffice, в зависимости от наличия договоров у контрагента
    3) добавлена новая роль PartyEditorAGENT, ограничивающая возможность редактирования отдельных атрибутов карточки контрагента в зависимости от наличия договоров у контрагента.

- [ADIRGSLSUPP-3985](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3985): В выходные параметры сервиса GetVTBProducts добавлен атрибут "Код стратегии инвестирования"

- [ADIRGSLSUPP-4002](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4002): Исправлены замечания к экспорту АА
    На UI добавлен тип агента "ИП"

- [ADIRGSLSUPP-4003](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4003): Некорректная работа чек-бокса "специальное предложение" ВТБ_Private

- [ADIRGSLSUPP-4004](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4004): Исправлена ошибка связанная с размером поля `EVENT_TYPE`

- [ADIRGSLSUPP-4007](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4007): Скорректирован отчёт "Отчет преДСЖ". Дата окончания формирования фонда для ДС на изменение активов будет подтягиваться только для вновь создаваемых ДС.

- [ADIRGSLSUPP-4010](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4010): PF-3866 Зенит СНПГ исправление в Памятке

- [ADIRGSLSUPP-4017](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4017): Имплементирован новый компонент "Базовые параметры актива"

- [ADIRGSLSUPP-4023](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4023): PF-3947_Иннов. решения_Драйвер Гарантия_внедрение заявления в бумажное оформление

- [ADIRGSLSUPP-4025](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4025): Создание миграционных продутов_апрель 2025

- [ADIRGSLSUPP-4051](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4051): Защита чемпионов. Откат новых тарифов.

- [ADIRGSLSUPP-4063](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4063): Исправлен нейминг выгружаемой печатки при подтверждении Справки для налоговой

- [ADIRGSLSUPP-4064](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4064): Исправлена работа массового апдейта Справок для налоговой в статус "Подтверждено"

- [ADIRGSLSUPP-4066](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4066): ПредДСЖ. Добавлено автоматическое изменение статуса ДС на расторжение на "Активы распроданы" в случае, когда  загружается файл "Данные о фондах" и в нём передана строка со статусом фонда "Распродан".

- [ADIRGSLSUPP-4067](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4067): Исправлены ошибки в работе сервиса AccountingCertificateTaxDeductionEtlService

- [ADIRGSLSUPP-4069](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4069): Исправлен доступ к удалению и редактированию вложений в Справке для налоговой

- [ADIRGSLSUPP-4073](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4073): Параметры экономики:
    
    * Настроена валидация на пересечение периодов дат заключения договора
    * Переименована вкладка Параметры экономики --> Параметры экономики НСЖ, ИСЖ
    * Отбор условий параметров экономики будет идти только по ручной ставке, если она установлена
    * На договоре в разделе дополнительные параметры экономики добавлена новая вкладка базовые параметры, для параметров которые не относятся к определенной категории, секция Согласия перенесена на эту вкладку.

- [ADIRGSLSUPP-4078](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4078): В сервис отправки СМС клиенту в headers добавлены два параметра - код продукта (ProductCode) и источник создания договора (SourceType).

- [ADIRGSLSUPP-4086](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4086):
    - Настроены уведомления на общий почтовый ящик при закрытии запросов ОПЕРУ
    - Настроены уведомление при запросе на ОПЕРУ
    - Измнены согласующие подразделения для триггеров "Страхователь 70 или более лет", "Договор должен быть направлен на согласование СК"
- [ADIRGSLSUPP-4087](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4087): Настроено логирование запрета доступа к документам adInsure

- [ADIRGSLSUPP-4088](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4088): Настройка уведомлений о необходимости предоставления дополнительных документов для андеррайтинга

- [ADIRGSLSUPP-4100](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4100): PF-3861_ОАС _Достойный век 3.0_результаты тестирования

- [ADIRGSLSUPP-4101](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4101): A24-2944_Основание быть получателем в расторжениях, доработка справочника

- [ADIRGSLSUPP-4105](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4105): Создать API тест для налоговых справок.

- [ADIRGSLSUPP-4107](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4107): Изменена валидация для атрибута «Способ подачи заявления» в дс на расторжение

- [ADIRGSLSUPP-4108](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4108): PF-3960__Корректировка Памятки ЦБ у продуктов ИСЖ

- [ADIRGSLSUPP-4112](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4112): Добавить пользователей, кому можно направлять рассылки по электрополисам на тесте и предпроде

- [ADIRGSLSUPP-4114](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4114): Исправлено падение сервера из-за появления ошибки в процессе скачивания вложений при переводе Справки для налоговой в статус "Подтверждена"

- [ADIRGSLSUPP-4117](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4117): PF-3902_Продукты типа Бонд Репак_корректировка шаблонов договоров (доб в IV раздел разбивки премии по рискам)_исправления

- [ADIRGSLSUPP-4129](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4129): PF-3916_ВТБ Прайм_новые территории_"Стратегия на пять. Гарант Ультра"_доработки по результатам тестирования

- [ADIRGSLSUPP-4131](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4131): PF-3966_ВТБ (Прайм, Привилегия и Новые территории) запуск продукта на 4 года, рубли

- [ADIRGSLSUPP-4148](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4148): Исправлен нейминг аттачментов в корректировках к Справкам для налоговой

- [ADIRGSLSUPP-4149](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4149): PF-3467_ВТБ_Розница_Стратегия на пять. Гарант_новые территории_Запуск продукта

- [ADIRGSLSUPP-4150](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4150): Исправлено заполнение чекбокса "Страховщик передает сведения в ФНС" в Справке ддля налоговой

- [ADIRGSLSUPP-4152](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4152): Доработка логики определения атрибута "reference no" для исходящих платежей.

- [ADIRGSLSUPP-4153](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4153): Исправлено массовое подтверждение корректировок к Справкам для налоговой

- [ADIRGSLSUPP-4155](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4155): Исправлены сообщения о дубликатах в документе Справка для налоговой

- [ADIRGSLSUPP-4161](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4161): Исправлено создание активити для допников к Справкам для налоговой

- [ADIRGSLSUPP-4162](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4162): Исправлен поиск дубликатов в коррективоках Справок для налоговой

- [ADIRGSLSUPP-4166](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4166): Настроено логирование событий идентификации на договора нерезидентов с теми же данными, что и при отправке уведомления на email.
    Наименование логера `NonResidentAllocationFinishedLogger`

- [ADIRGSLSUPP-4173](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4173): Доработки РНВ, категории "Расторжение"

- [ADIRGSLSUPP-4174](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4174): Работы в рамках ресертификации - группа УФО

- [ADIRGSLSUPP-4175](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4175): Работы в рамках ресертификации - группа АД и АВР
    Создание новых групп ролей для сегментов продаж ВТБ и ПСБ

- [ADIRGSLSUPP-4196](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4196): PF-3904_"Защита чемпионов 2.0"_разработка

- [ADIRGSLSUPP-4199](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4199): PF-3915_Мультисервис исправление по результатам теста

- [ADIRGSLSUPP-4213](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4213): Создание миграционных продуктов_май 2025

- [ADIRGSLSUPP-4223](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4223): ПредДСЖ: Ошибки в процессе Лесенка КВ

- [ADIRGSLSUPP-4225](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4225): Добавить e-mail и номер телефона на тестовый контур

- [ADIRGSLSUPP-4227](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4227): Скорректирован набор допустимых ролей для загрузчика пользователей. Добавлены роли "ServiceProviderOwnOU", "ServiceProviderOwnAndSubordinateOU" и "ServiceProviderAll".

- [ADIRGSLSUPP-4230](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4230): Исправлена ошибка с дубликатами на старых справках для налоговой

- [ADIRGSLSUPP-4234](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4234): Добавлен скрипт, удаляющий технические переходы по неактуальным статусам у Справок для налоговой

- [ADIRGSLSUPP-4239](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4239): ОАС. Достойный век 3.0 Обновленные тарифы

- [ADIRGSLSUPP-4247](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4247): Исправлен источник создания справки для налоговой при копировании

- [ADIRGSLSUPP-4254](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4254): Добавлен скрипт, исправляющий ошибку при формировании и вложении аттачмента в корректировке к Справкам для налоговой

- [ADIRGSLSUPP-4260](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4260): Работы в рамках ресертификации - группа Юристы

- [ADIRGSLSUPP-4270](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4270): Синхронизация конфигов с тест и GIT
    В productConfiguration.xlsx:
    Добавлен новый столбец, реализованный в задаче ADIRGSLSUPP-3276
    Зполнен столбец CONSENTTODATATRANSFERINGFNS, согласно скрипту database\sql\migration\ADIRGSLSUPP-3601-product-datafix.sql


### Fixed (44 changes)

- [ADIRGSLSUPP-2984](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2984): Исправлен текст ошибки

- [ADIRGSLSUPP-3569](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3569):
    - Убрана валидация при неизменении гражданства
- [ADIRGSLSUPP-3743](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3743): Исправлена ошибка "Body не должно иметь дополнительные свойства (system)"

- [ADIRGSLSUPP-3758](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3758): 322_A24-2437. Замечания по тестированию: По расчету НДС в АВР – НДС не считается вообще

- [ADIRGSLSUPP-3828](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3828): Исправлены ошибки при создании коллективного убытка

- [ADIRGSLSUPP-3991](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3991): Исправлена ошибка чтения функции split на неопределенном объекте для AgentVerificationsEnrichment.

- [ADIRGSLSUPP-4038](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4038): Исправлена ошибка при формировании РНВ из дс на расторжение

- [ADIRGSLSUPP-4043](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4043): Релиз 78. ADIRGSLSUPP-3678. Замечания по тестированию

- [ADIRGSLSUPP-4050](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4050): Исправлено некорректное отображение информации на карточке ЮЛ

- [ADIRGSLSUPP-4052](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4052):
    - Исправлен текст ошибки при загрузке корректировки справки
- [ADIRGSLSUPP-4059](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4059): Доработана логика определения источника справки для налоговой

- [ADIRGSLSUPP-4074](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4074): Налоговые справки. Автоматический перевод справки, созданной через ЛКК, в статус "Подтверждена"

- [ADIRGSLSUPP-4080](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4080): Налоговые справки. Массовое подтверждение налоговых справок. В журнале справок отсутствует критерий отбора справок по статусу "Проверена"

- [ADIRGSLSUPP-4085](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4085): 118_A24-1984_Уязвимость 9. GeneralContractSearchDataSource

- [ADIRGSLSUPP-4089](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4089): Исправлен экспорт АВР

- [ADIRGSLSUPP-4106](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4106): Убрать PROBLEMS-ы из AdInsure studio после upgrade на 43-ю версию.

- [ADIRGSLSUPP-4110](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4110): Исправлена ошибка при создании заявки через UI.

- [ADIRGSLSUPP-4115](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4115): Налоговые справки (ADIRGSLSUPP-3678). не срабатывают валидации по отчётному году (Обращение ЛКК)

- [ADIRGSLSUPP-4121](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4121): RC. Налоговые справки. Не подтверждаются справки при Импорте

- [ADIRGSLSUPP-4139](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4139): Исправлена ошибка отображения текста на вкладке Дополнительные условия в блоке СОЦИАЛЬНЫЙ НАЛОГОВЫЙ ВЫЧЕТ

- [ADIRGSLSUPP-4143](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4143): Релиз 79_Ошибка_Массовая замена пароля УЗ

- [ADIRGSLSUPP-4145](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4145): Релиз 79. Налоговые справки. ADIRGSLSUPP-3834. При нажатии на кнопку "Массовое подтверждение" файлы не выгружаются в папку и статус справки не меняется

- [ADIRGSLSUPP-4146](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4146): Продукт ACCIDPC (НС):
    
    * Исправлена группа salesDummyPools на DummyPools
    * Добавлена фильтрация договоров для отчета по группе продуктов

- [ADIRGSLSUPP-4160](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4160): Добавлена вкладка История для корректировки справки для налоговой

- [ADIRGSLSUPP-4167](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4167): Исправлена ошибка при отмене корректировки справки для налоговой

- [ADIRGSLSUPP-4168](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4168): Исправлен пересчет суммы расходов при создании корректировки к справке для налоговой

- [ADIRGSLSUPP-4183](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4183): Исправлена ошибка отсутствия прав доступа при создании индивидуального договора.

- [ADIRGSLSUPP-4187](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4187): Исправлена ошибка дубля при редактировании существующего поставщика услуг.

- [ADIRGSLSUPP-4201](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4201): Исправлена ошибка получения данных по платежам из 1С

- [ADIRGSLSUPP-4206](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4206): Релиз 79_Ошибка в работе ETL-сервиса ReCallQuoteRoutesETLService

- [ADIRGSLSUPP-4207](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4207): Для корректировки справки для налоговой заблокированы для редактирования поля отчетный го и застрахованный

- [ADIRGSLSUPP-4208](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4208): Исправлена возможность подтверждения справки для налоговой после копирования, если отчетный год не указан.

- [ADIRGSLSUPP-4211](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4211): Для GetMissingAssPoliciesDataProvider увеличен таймаут до 300с.

- [ADIRGSLSUPP-4215](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4215): 1) добавлено определение конфигурации продукта по коду продукта на дату заключения договора
    2) исправлено наименование окна уведомления об успешном создании договора

- [ADIRGSLSUPP-4219](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4219): Откорректирован скрипт миграции справок для налоговой. Добавлен дата фикс для уже мигрированных данных.

- [ADIRGSLSUPP-4220](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4220): Настроено отображение вкладки "Базовые параметры"

- [ADIRGSLSUPP-4229](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4229): Исправлена ошибка чтения свойства variant на неопределенном объекте при расчете комиссии при создании индивидуального договора.

- [ADIRGSLSUPP-4231](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4231): Исправлена ошибка отправки СМС

- [ADIRGSLSUPP-4241](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4241): Исправлена ошибка в карточке ФЛ при выборе одного из чекбоксов "Ввод адреса вручную"/"Иностранный адрес"

- [ADIRGSLSUPP-4244](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4244): Исправлена ошибка partyId в ДС на расторжение

- [ADIRGSLSUPP-4268](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4268): Исправлена ошибка отправки сообщений по электронной почте

- [ADIRGSLSUPP-4269](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4269): Исправлена ошибочная валидация на заявке ППО.

- [ADIRGSLSUPP-4279](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4279): Исправлена ошибка вызова enrichment при создании индивидуального договора для пользователя с ролью PolicyCreatorByService. Вызов checkData enrichment компонента BasicConditions происходил ранее enrichInsuranceProduct enrichment компонента MainInsuranceConditions. В результате параметр productGroup на тот момент не был определен.

- [ADIRGSLSUPP-4281](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4281): Исправлена установка отметки ФНС в продуктах ВТБ

# 79.0.0-rc1 (2025-05-05)

### Breaking Changes (6 changes)

- [ADIRGSLSUPP-3601](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3601): Добавление для продуктов ВТБ метки ФНС
    
    Необходимо выполнить миграционные скрипты после паблиша:
    
    database\sql\migration\ADIRGSLSUPP-3601-product-datafix.sql
    database\sql\migration\ADIRGSLSUPP-3601-datafix-consent-to-data-transfering-fns-field-on-contracts.sql
    database\sql\migration\ADIRGSLSUPP-3601-datafix-consent-to-data-transfering-fns-field-on-accounting-certificates.sql
    
    Потребуется реиндекс договоров

- [ADIRGSLSUPP-3827](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3827): Настроены продукты Оптимальный выбор Ультра (IOCVVTB) и Оптимальный выбор (IOCPVTB) для ВТБ. Добавлен новый компонент Базовые параметры Актива для ИСЖ.
    Необходимо импортировать обновлённый файл productConfiguration

- [ADIRGSLSUPP-3927](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3927): Upgraded platform to version 43.7.0. Upgraded configuration to version 43.3.0. Upgraded scheduler to version 9.0.1.

- [ADIRGSLSUPP-3978](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3978):
    * После publishing-а необходимо выполнить скрипт:
    ```database\sql\migration\ADIRGSLSUPP-3978-migrate-docs.sql```
    
    * Далее запустить reindex для ActivitySearchIndex
    
    * Изменились API пути к сервисам справки.
    Т.е. справка стала версионируемым документом поддерживающим создание ДС, нам необходимо было поменять тип справки на "версионируемый документ". Теперь всё что раньше начиналось на ```api/core/universal-documents/*```, необходимо заменить на ```api/core/universal-versioned-documents/*```.
- [ADIRGSLSUPP-4036](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4036): Корректировка набора инструментов для предДСЖ.
    
    После паблиша необходимо выполнить скрипт
    database\sql\migration\ADIRGSLSUPP-4036-unit-linked-tables.sql

- [ADIRGSLSUPP-4043](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4043): Фикс отображения наличия вложения на справках
    После паблиша необходимо выполнить миграционный скрипт database\sql\migration\ADIRGSLSUPP-4043_accounting_certificate_data_fixes.sql


### New Features (25 changes)

- [ADIRGSLSUPP-2643](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2643): Добавлен столбец с логином на вкладку вложений.
    Добавлен столбец с логином на витрину задач.

- [ADIRGSLSUPP-3276](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3276): Добавлена таблица учёта резервирования лимитов активов и сопутствующие датасурсы

- [ADIRGSLSUPP-3651](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3651): предДСЖ:
    
    * Доработан "Отчет предДСЖ", добавлен параметр MF.
    * Доработаны таблицы аналитической подсистемы инвестиционных параметров котировок и договоров.

- [ADIRGSLSUPP-3672](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3672): 120_A24-1986_Уязвимость 6. ServiceProviderDataSource

- [ADIRGSLSUPP-3673](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3673): Лесенка КВ:
    
    * Настроен импорт\экспорт лесенки КВ для договоров ДСЖ и ИСЖ.
    * На котировке ДСЖ добавлен новый блок "Дополнительные параметры инвестирования".

- [ADIRGSLSUPP-3705](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3705): Импорт ДСЖ. Данные о фондах. Ограничена загрузка более одной строки к договору.

- [ADIRGSLSUPP-3732](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3732): Добавлено поле исполнителя (ответственного) в журнал справок

- [ADIRGSLSUPP-3765](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3765): Реализован функционал импорта индивидуального договора. В пункт меню Администрация добавлена интерфейсная форма Создание договора с полем для ввода запроса в формате JSON. Добавлена роль PolicyCreatorByService с правами на открытие данной формы. Добавлен интеграционный сервис проверки параметров, валидации, создания и подписания договора.

- [ADIRGSLSUPP-3898](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3898): Обновление конфигов и ставок на период 24.03.-04.05

- [ADIRGSLSUPP-3922](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3922): ПредДСЖ.
    Добавлено ограничение по статусу договора "Действует" для отчета "Реестр ПредДСЖ".

- [ADIRGSLSUPP-3926](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3926): Изменён способ получения данных расчётных счетов с констант на подтягивание из БД

- [ADIRGSLSUPP-3932](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3932): ВТБ Прайм. СНПГ Ультра. Новые территории.

- [ADIRGSLSUPP-3937](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3937): Исправление сервиса финансовый навигатор

- [ADIRGSLSUPP-3967](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3967): Доработка документа Справочник активов

- [ADIRGSLSUPP-3970](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3970): Для РНВ где, Payment order type = Commission игнорируется валидация на проверку соответствия банковских счетов типу получателя
    Скорректировано "Назначение платежа"

- [ADIRGSLSUPP-3986](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3986): ПредДСЖ: дать возможность клиентскому менеджеру просматривать в карточке договора Информацию по инвестированию.

- [ADIRGSLSUPP-3989](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3989): Журнал договоров. Отчет ПредДСЖ. Изменены условия отбора в отчет теперь попадают договоры и ДС на нефин. изменения с типом «Изменение состава активов»

- [ADIRGSLSUPP-4024](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4024): Внесение изменений в enviromentVariables

- [ADIRGSLSUPP-4026](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4026): PF-3861_ОАС_Достойный век 3.0_добавление памятки_корректировка по результатам тестирования

- [ADIRGSLSUPP-4027](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4027): Работы в рамках ресертификации - группа ПОД/ФТ

- [ADIRGSLSUPP-4030](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4030): Изменен метод отправки СМС оповещения.

- [ADIRGSLSUPP-4034](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4034): Добавлен новый интеграционный сервис для создания Налоговых справок и корректировок

- [ADIRGSLSUPP-4041](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4041): KD-154. Поменять тип риска в АДШ

- [ADIRGSLSUPP-4044](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4044): PF-3939_Маппинг - новая схема КВ

- [ADIRGSLSUPP-4061](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4061): A24-1487_Выгрузка из ПО_Правки по результам теста


### Fixed (22 changes)

- [ADIRGSLSUPP-3104](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3104): Исправлена ошибка сохранения дивидендов внесенных с использованием «Ручной корректировки»

- [ADIRGSLSUPP-3603](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3603): Исправлена ошибка чтения функции на неопределенном объекте при изменении Даты, с которой изменения вступают в силу в ДС на финансовые изменнения.

- [ADIRGSLSUPP-3688](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3688): Параметры экономики:
    
    * Исправлены замечания после тестирования.

- [ADIRGSLSUPP-3743-1](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3743-1): Исправлена ошибка при создании проверки

- [ADIRGSLSUPP-3832-1](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3832-1): Исправлена формула расчета ндфл, исправлены тесты

- [ADIRGSLSUPP-3832-fix-test](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3832-fix-test): Исправлен тест PolicyCancellationPaymentOrder

- [ADIRGSLSUPP-3832](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3832): Скорректирован расчет НДФЛ для валютных договоров, при расторжении

- [ADIRGSLSUPP-3883](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3883): При расторжении договора корректно формируется таблица по социальному налоговому вычету

- [ADIRGSLSUPP-3886](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3886): Исправлена ошибка чтения свойства на неопределенном объекте при создании документа ДИД или Дожития для договоров с созданными ДС на финанасовые изменения.

- [ADIRGSLSUPP-3903](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3903): Параметры экономики:
    
    * Активированы чек-боксы на стройках условий при активированном документе.
    * Исправлено отображение значения для столбца Агентский договор.
    * Проверку на соответствие номера АД в условиях и договоре осуществляем только по внешнему номеру АД.

- [ADIRGSLSUPP-3907](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3907): ADS-13475_В сервисе get-contract-custom-data некорректно отображается исходящий платеж

- [ADIRGSLSUPP-3960](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3960): Не отображается ссылка на Keycloak в карточке пользователя

- [ADIRGSLSUPP-3991](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3991): Исправлены ошибка чтения свойства partyRole на неопределенном объекте и ошибка выполнения GeneralPartyEnrichment при выгрузке печатной формы Анкета ФЛ.

- [ADIRGSLSUPP-3996](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3996): Акт выполненных работ. Исправлена ошибка на UI при открытие документа и наличия дополнительного фильтра отбора данных.

- [ADIRGSLSUPP-4004](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4004): Внесены корректировки настроенной событийной модели для продукта "Защита чемпионов":
    - Событие `SportsmanContractIsActivated` удалено.
    - Событие `SportsmanContractIsCancelled` переименовано в `SportsmanContractIsCancelledOrFinished`.

- [ADIRGSLSUPP-4005](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4005): Налоговые справки. Ошибка: "Body не должно иметь дополнительные свойства (personId)" при создании справки импортом

- [ADIRGSLSUPP-4042](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4042): Исправлен процесс валидации справок из ЛКК

- [ADIRGSLSUPP-4047](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4047): Изменен маппинг для типов вложений.

- [ADIRGSLSUPP-4049](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4049): Агентский договор:
    
    * Исправлена ошибка связанная с подбором агентства.

- [ADIRGSLSUPP-4055](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4055): Исправлена ошибка чтения свойства на неопределенном объекте при открытии печатной формы Заявление для документа Защита и накопления.

- [ADIRGSLSUPP-4068](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4068): RC. Налоговые справки. Не открывается справка из витрины задач

- [ADIRGSLSUPP-4092](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-4092): RC. Налоговые справки. После рефакторинга НЕ создаётся задача в витрине задач

# 78.0.0-rc1 (2025-04-21)

### Breaking Changes (5 changes)

- [ADIRGSLSUPP-3275](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3275): Добавлен документ "дополнительное соглашение" для Справочника активов
    Для всех сред необходимо перед паблишем выполнить следующий скрипт:
    database\sql\migration\ADIRGSLSUPP-3275-published_artifacts_deletion.sql

- [ADIRGSLSUPP-3678](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3678): Переработан процесс создания налоговых справок
    Скрипт с датафиксом: database\sql\migration\ADIRGSLSUPP-3678-tax-deduction-format-fix.sql. Скрипт следует выполнять после паблиша.
    etl для второй итерации датафикса: {{SERVER_URI}}/api/core/etl-services/AccountingCertificateTaxDeductionEtlService/1

- [ADIRGSLSUPP-3688](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3688): Параметры экономики:
    
    * Настроена функциональность и хранение параметров экономики в разрезе договора страхования.
    
    Необходимо выполнить скрипт до паблиша, который удалит (тестовые данные будут утеряны) все таблицы АСС связанные с параметрами экономики:
    database\sql\migration\ADIRGSLSUPP-3755-Clean-economic-parameters-and-additional-parameters.sql
    В процессе паблиша таблицы АСС пересоздадутся с новыми\обновленными колонками.
    
    Необходимо выполнить скрипты после паблиша:
    database\sql\migration\ADIRGSLSUPP-3688-create-quote-investment-sat.sql
    database\sql\migration\ADIRGSLSUPP-3688-create-policy-investment-sat.sql
    database\sql\migration\ADIRGSLSUPP-3688-Quote-ASS-update.sql
    database\sql\migration\ADIRGSLSUPP-3688-Policy-ASS-update.sql

- [ADIRGSLSUPP-3903](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3903): Параметры экономики:
    
    * Настроена массовая корректировка параметров.

- [ADIRGSLSUPP-3947](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3947): ADS-13514_ПредДСЖ - корректировка справочника Базовых Активов.
    Необходимо выполнить скрипт database/sql/migration/ADIRGSLSUPP-3947-unit-linked-tables.sql


### New Features (30 changes)

- [ADIRGSLSUPP-2984](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2984): Добавлен на форму Постпродажное сопровождение Актер ОПЕРУ (пользователь с правами operations) для работы с заявками на расторжение и внесение изменений.

- [ADIRGSLSUPP-3399](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3399): ADS-13105_Удаление группы ВТБ

- [ADIRGSLSUPP-3404](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3404): Добавлена проверка на дубль при создании поставщика услуг с типом Partner с одинаковым кодом.

- [ADIRGSLSUPP-3672](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3672): 120_A24-1986_Уязвимость 6. ServiceProviderDataSource

- [ADIRGSLSUPP-3744](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3744): Добавлена возможность множественного выбора перечней проверки контрагентов на вкладке проверки ПОД/ФТ. Добавлен новый атрибут Номер перечня.

- [ADIRGSLSUPP-3766](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3766): Для роли OperationsGroup, добавлена возможность переводить договора из статуса подписан в отменён, без назначения задачи.

- [ADIRGSLSUPP-3771](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3771): ОАС. Создание продукта. Достойный век 3.0

- [ADIRGSLSUPP-3799](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3799): Добавлен процесс проверки КПК в функции afterSave, если сущность создаётся впервые

- [ADIRGSLSUPP-3834](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3834): Массовое подтверждение справок ФНС

- [ADIRGSLSUPP-3877](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3877): Скрыть подраздел "запросы" в дс на нефинансовые изменения

- [ADIRGSLSUPP-3891](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3891): PF-3902_PF-3903_корректировка шаблонов договоров (добавление в IV раздел разбивки премии по рискам).
    Обновлена дата вступления изменений в силу.

- [ADIRGSLSUPP-3918](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3918): Ресертификация Этап 1 (замена PartyEditor на PartyViewer)

- [ADIRGSLSUPP-3931](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3931): KD-140. Сервис по переводу платежей в статус Распределен на реестр

- [ADIRGSLSUPP-3933](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3933): PF-3913_ПСБ (масс и аффл) изменение в названии банка

- [ADIRGSLSUPP-3937](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3937): PF-3914_Удаление сервиса Налоговый вычет для продуктов на три года

- [ADIRGSLSUPP-3941](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3941): PF-3866 Зенит СНПГ исправление по результатам тестирования

- [ADIRGSLSUPP-3942](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3942): PF-3866 Зенит СНПГ исправление ошибок

- [ADIRGSLSUPP-3948](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3948): Добавление вида спорта-картинг в продукт Защита чемпионов.

- [ADIRGSLSUPP-3950](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3950): Синхронизация конфигов с тест и GIT

- [ADIRGSLSUPP-3953](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3953): EPF-3861_Настройка продукта "Достойный век 3.0" для ОАС ( обновлённая версия)_разработка

- [ADIRGSLSUPP-3956](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3956): PF-3912_"Защита чемпионов"_Изменение маппинга в части бизнес кода партнера

- [ADIRGSLSUPP-3963](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3963): PF-3854_Защита чемпионов_доработка маппинга для передачи сокращенной карточки КА

- [ADIRGSLSUPP-3968](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3968): Изменение текста в печатной форме для договоров предДСЖ с ДИД в ПО.

- [ADIRGSLSUPP-3974](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3974): предДСЖ: корректировка названия столбца "Реестре ПредДСЖ".

- [ADIRGSLSUPP-3975](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3975): ПредДСЖ-ППО: Частичный вывод ден. средств - разработка функционала заявки ППО.

- [ADIRGSLSUPP-3981](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3981): PF-3919_НС "Защита чемпионов"__корректировка тарифов на 1 день и выделение картинга_доработка

- [ADIRGSLSUPP-3982](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3982): Создание партнера DummyPools

- [ADIRGSLSUPP-3984](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3984): ПредДСЖ: добавлено ограничение 5% на минимальную долю актива в портфеле.

- [ADIRGSLSUPP-3987](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3987): Валидация на дату рождения на КК для новых ролей для коробочных продуктов

- [ADIRGSLSUPP-3998](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3998): Работы в рамках ресертификации - группа Комплаенс


### Fixed (9 changes)

- [ADIRGSLSUPP-3625](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3625): Ошибка при запросе в сервис - разработка

- [ADIRGSLSUPP-3647](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3647): 322_A24-2437. АД/АВР_добавление размера НДС на карточку АД и расчет в АВР

- [ADIRGSLSUPP-3696](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3696): Исправлена ошибка отображения, если countryFullName = "NULL"

- [ADIRGSLSUPP-3714](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3714): Ошибка в работе ETL-сервисов ReCallActivePolicyRoutesETLService и ReCallQuoteRoutesETLService

- [ADIRGSLSUPP-3743](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3743): Если не заполнено поле ID, сохранение проверки происходит без ошибок

- [ADIRGSLSUPP-3778](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3778): Платежи. Не проставляется признак реестра для платежа после отработки сервиса "api/rgsl/accounting/shared/cash-flow/bank-statement/refresh-is-registry"

- [ADIRGSLSUPP-3875](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3875): Исправлена ошибка при формировании дс на расторжение

- [ADIRGSLSUPP-3881](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3881): Исправлена ошибка "Расторжения_не срабатывает ограничение на выбор Класса события"

- [ADIRGSLSUPP-3959](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3959): Исправлена ошибка при открытии отчета

# 77.0.0-rc1 (2025-04-07)

### Breaking Changes (3 changes)

- [ADIRGSLSUPP-3800-1](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3800-1): Исправлено в экспорте с emloyee_code на employee_tab_number
    Изменен скрипт ADIRGSLSUPP-3800-contracts-report-fill.sql (Выполнить после паблиша)

- [ADIRGSLSUPP-3800](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3800): Добавлены новые столбцы в отчёт по документам 
    Скрипт обновленной процедуры FILL_REPORT_TABLES(необходимо выполнить после паблиша):
    ADIRGSLSUPP-3800-contracts-report-fill.sql

- [ADIRGSLSUPP-3879](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3879): ADS-13458_ПредДСЖ - корректировка справочника Базовых Активов
    Необходимо выполнить скрипт database/sql/migration/ADIRGSLSUPP-3879-unit-linked-tables.sql


### New Features (23 changes)

- [ADIRGSLSUPP-3271](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3271): Добавлен новый документ Справочник активов

- [ADIRGSLSUPP-3425](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3425): ADS-13151_Отображение сервисов в продукте Надежный капитал. Классика 2.0

- [ADIRGSLSUPP-3628](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3628): PF-3438_ПСБ_ОРС_Доработка в продукте "Надёжный выбор Премиум 2.0" расчета взноса

- [ADIRGSLSUPP-3637](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3637): На карточке КА во вкладке Проверки ПОФ/ФТ в таблицу добавлен столбец с наименованием «Статус»

- [ADIRGSLSUPP-3660](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3660): АД:
    Исправлена ошибка работы сервиса: Javascript system error occurred: Message: Cannot read properties of undefined (reading 'replaceAll')
    Изменено содержимое экспортируемого Excel файла

- [ADIRGSLSUPP-3682](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3682): PF-3856_ВТБ и Зенит_удаление форм банка из комплекта страховой документации_

- [ADIRGSLSUPP-3729](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3729): 161_A24-2377_Добавление раздела "вложения" - разработка

- [ADIRGSLSUPP-3742](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3742): Добавление счетов в таблицу acc_impl.ct_bsi_source_account.

- [ADIRGSLSUPP-3755](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3755): Параметры экономики:
    
    * Разработана интерфейсная форма заполнения справочника Параметров экономики.

- [ADIRGSLSUPP-3756](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3756): Сервис создания котировки возвращает некорректную валидацию вложений Страхователя

- [ADIRGSLSUPP-3816](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3816): PF-3866 Зенит СНПГ настройка процесса ПЭП

- [ADIRGSLSUPP-3822](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3822): Отключён сброс базовых активов при смене даты заключения на заявке ДСЖ если заявка находится в статусе отличном от Проект.

- [ADIRGSLSUPP-3842](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3842): Корректировки для чек-бокса Расчеты через УФК

- [ADIRGSLSUPP-3848](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3848): PF-3854_НС_Защита чемпионов_перенастройка печатных форм

- [ADIRGSLSUPP-3851](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3851): Скорректирована доступность экспорта связанных с договором платежей: экспорт доступен только пользователям с ролью SMGO.

- [ADIRGSLSUPP-3870](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3870): Заведение продуктов для миграции_март 2025

- [ADIRGSLSUPP-3873](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3873): Синхронизация конфигов с тест и GIT

- [ADIRGSLSUPP-3890](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3890): ПредДСЖ: создание новой роли для подачи Заявления на изменения состава активов.
    
    Создана роль InvestmentParametersEditor.

- [ADIRGSLSUPP-3891](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3891): PF-3902_PF-3903_корректировка шаблонов договоров (добавление в IV раздел разбивки премии по рискам)

- [ADIRGSLSUPP-3894](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3894): KD-144. Риски Жизни в справке

- [ADIRGSLSUPP-3896](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3896): ADS-13470_Отсутствует строчка "ДУЛ" в договорах ИСЖ (Драйвер Гарантия) - Лайфинвест и Инн.решения

- [ADIRGSLSUPP-3904](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3904): ПредДСЖ: начисление дополнительного дохода в период охлаждения.
    
    Внимание!
    1. В productConfiguration добавлен столбец coolOffDIDRate, необходимо заполнить на средах корректными значениями для продуктов с необходимой даты.
    2. Создана новая версия ПФ preEquityVTBPolicyPrintout2. Необходимо корректно указать в конфигурации на средах с той же даты, с которой добавится coolOffDIDRate.

- [ADIRGSLSUPP-3910](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3910): KD-144. Риски Жизни в справке


### Fixed (15 changes)

- [ADIRGSLSUPP-3510](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3510): Стал доступен справочник "Типа адреса" при создании ФЛ из карточки ЮЛ

- [ADIRGSLSUPP-3635](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3635): Исправлено поведение блокировки для ДМС

- [ADIRGSLSUPP-3640](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3640): Исправлены замечания по валидации пола в заявке и при работе с карточкой контрагена через заявку

- [ADIRGSLSUPP-3699](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3699): Исправлена ошибка fullAddress

- [ADIRGSLSUPP-3715](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3715): Исправлено создание дубликатов справок для налоговой при импорте эксель-файла с задублированными строками

- [ADIRGSLSUPP-3760](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3760): Убрано дублирование писем по задаче ADIRGSLSUPP-3760, исправлено создание писем по задаче ADIRGSLSUPP-3761

- [ADIRGSLSUPP-3761](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3761): Исправление записи среды в теме писем

- [ADIRGSLSUPP-3795](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3795): Скорректирован отображаемый текст ошибки при импорте если столбец Плательщик совпадает со страхователем = NULL

- [ADIRGSLSUPP-3804](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3804): Исправлена ошибка "Не заполняется атрибут originalDocumentNumber в момент загрузки"

- [ADIRGSLSUPP-3821](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3821): ADS-13421: Ошибка создания печатной версии договора на стадии заявки

- [ADIRGSLSUPP-3874](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3874): Скорректировано округление при загрузке ставок купонов.

- [ADIRGSLSUPP-3878](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3878): Добавлено логгирование при создании xml отчетов для налоговых справок, добавлены проверки на null при маппинге

- [ADIRGSLSUPP-3893](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3893): Продукт Защита чемпионов, ошибка формирования печатной формы.

- [ADIRGSLSUPP-3901](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3901): Релиз 76. Keycloak. Ошибка внесения изменений в чекбокс активности пользователя

- [ADIRGSLSUPP-3928](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3928): Исправлена ошибка при создании контрагента через сервис.

# 76.0.0-rc1 (2025-03-24)

### Breaking Changes (3 changes)

- [ADIRGSLSUPP-3607](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3607): Upgraded platform to version 35.11.0.
    
    Перед обновлением выполнить скрипт: database\sql\migration\UPGRADE-35-11-0-attachment_index.sql

- [ADIRGSLSUPP-3774](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3774): Запуск нового продукта Персональный фонд (предДСЖ)_ВТБ Привилегия
    
    После паблиша необходимо выполнить скрипт
    database\sql\migration\ADIRGSLSUPP-3774-unit-linked-tables.sql

- [ADIRGSLSUPP-3808](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3808): ADS-13409_предДСЖ. Добавление новых активов
    
    После паблиша необходимо выполнить скрипт:
    database\sql\migration\ADIRGSLSUPP-3808-unit-linked-tables.sql


### New Features (42 changes)

- [ADIRGSLSUPP-1476](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1476): Реквизиты Государственных и бюджетных учреждений - разработка

- [ADIRGSLSUPP-1808](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1808): A24-2085_235_Дата получения оригинала на договоре. Добавление доп. атрибута

- [ADIRGSLSUPP-3256](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3256): ADS-13004_Почта Банк_Драйвер Гарантия (все сроки)_Исправить ошибку

- [ADIRGSLSUPP-3408](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3408): Переход на Keycloak

- [ADIRGSLSUPP-3425](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3425): ADS-13441_Ошибка при расчетах страховых взносов

- [ADIRGSLSUPP-3469](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3469): Исправлена ошибка при выборе Да/Нет в указании лицензии физ. лица

- [ADIRGSLSUPP-3513](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3513): Изменено содержание уведомления на договор нерезидента

- [ADIRGSLSUPP-3519](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3519): ПредДСЖ: добавление новых видов активов - АДР/ДР.

- [ADIRGSLSUPP-3583](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3583): Теперь в уведомлении при идентификации платежа по договору с нерезидентом указывается страховая премия и частота взносов

- [- ADIRGSLSUPP-3617](https://jira.adacta-fintech.com/browse/- ADIRGSLSUPP-3617): ВТБ розница. Корректировки возраста в Драйвер гарантия.

- [ADIRGSLSUPP-3628](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3628): PF-3438_ПСБ_ОРС_Доработка в продукте "Надёжный выбор Премиум 2.0" расчета взноса

- [ADIRGSLSUPP-3635](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3635): Блокирующие предупреждение об отсутствии даты рождения изменено на неблокирующие для групп ролей operations и operationsDirector

- [ADIRGSLSUPP-3640](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3640): A24-1505_Создать новые роли для визуализации валидаций на карточке ФЛ - разработка

- [ADIRGSLSUPP-3665](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3665): Доработка Печатной формы договора  если активирован чек-бокс Лицо без Гражданства.

- [ADIRGSLSUPP-3667](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3667): Доработать маппинг по контрагентам для миграции договоров из Adinsure в SUP по продукту НС Защита чемпионов

- [ADIRGSLSUPP-3682](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3682): ВТБ. Исключение формы банка из электронного полиса.

- [ADIRGSLSUPP-3699](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3699): PF-3854_Второй этап настройки продукта "Защита чемпионов" для спортсменов_печатные формы договора

- [ADIRGSLSUPP-3712](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3712): PF-3866_Зенит_продукт "Стратегия на пять. Гарант"_настройка ПЭП_анализ

- [ADIRGSLSUPP-3723](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3723): 150_A24-494_Запрет множественной аутентификации - разработка

- [ADIRGSLSUPP-3733](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3733): PF-3665_ВТБ_Изменение процесса согласования выпуска для клиентов 70+_доработка по результатам тестирования

- [ADIRGSLSUPP-3739](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3739): 230_A24-1988_Проверка кода AdInsure_Низкий_2_CompanyBankAccount/data.csv.

- [ADIRGSLSUPP-3740](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3740): 230_A24-1988_Проверка кода AdInsure_Низкий_3_paymentOrderInternalConst.

- [ADIRGSLSUPP-3750](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3750): PF-3872_Корректировка текста письма для спортсменов "Защита чемпионов"

- [ADIRGSLSUPP-3760](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3760): Переработан процесс работы с котировкой

- [ADIRGSLSUPP-3779](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3779): PF-3837_ВТБ (розница)_"Драйвер Гарантия" с ПЭП_корректировки по результатам тестирования

- [ADIRGSLSUPP-3782](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3782): Убрана валидация "E: Необходимо выбрать хотя бы одну стратегию" в блоке "Базовые параметры инвестирования" в договоре предДСЖ.

- [ADIRGSLSUPP-3790](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3790): Маппинг Драйвер Гарантия (00794 00795 796 ВТБрозница)

- [ADIRGSLSUPP-3792](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3792): ADS-13397. Риски Жизни в справке

- [ADIRGSLSUPP-3793](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3793): Исправлена ошибка при создании справки

- [ADIRGSLSUPP-3798](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3798): Исправлены ошибки при создании ДС на фин. изменение к договору предДСЖ.

- [ADIRGSLSUPP-3805](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3805): Исправлено заполнение источника создания справки для корректировок

- [ADIRGSLSUPP-3807](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3807): Документ удостоверяющий личность (Застрахованный) в реестре из АДШ в САП

- [ADIRGSLSUPP-3812](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3812): ADS-13410. Риски Жизни в справке

- [ADIRGSLSUPP-3813](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3813): Исправлено заполнение поля Источник создания справки

- [ADIRGSLSUPP-3818](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3818): PF-3837_ВТБ (розница) корректировки настроек"Драйвер Гарантия" с ПЭП

- [ADIRGSLSUPP-3827](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3827): ВТБ. Оптимальный выбор/Ультра. Создание продукта (скрипт).

- [ADIRGSLSUPP-3830](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3830): Исправлена ошибка при импорте Банковских выписок из эксель файла

- [ADIRGSLSUPP-3839](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3839): ВТБ_розница_создание исключающей роли

- [ADIRGSLSUPP-3845](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3845): Скорректировать FULL_DESCRIPTION по рискам

- [ADIRGSLSUPP-3849](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3849): ПредДСЖ: правка печатной формы при не выборе ни одного актива.

- [ADIRGSLSUPP-3850](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3850): Добавление номера телефона для тестирования кода электро полисов на тест и препрод

- [ADIRGSLSUPP-3856](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3856): PF-3837_ВТБ_розница_Драйвер гарантия_корректировка по результатам тестирования


### Fixed (13 changes)

- [ADIRGSLSUPP-3620-1](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3620-1): Изменено названии функции во всех документах

- [ADIRGSLSUPP-3620](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3620): Скорректирована проверка и отображения валидации для застрахованного <= 14 лет

- [ADIRGSLSUPP-3653](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3653): Исправлено отображение для заявок, созданных из котировок

- [ADIRGSLSUPP-3696](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3696): Теперь для уведомления "Идентифицирован платеж на договор нерезидента", в случае, если нет "countryFullName" берётся, значение "countryShortName"

- [ADIRGSLSUPP-3701](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3701): Исправлена ошибка работы сервиса "Javascript system error occurred: Message: No criteria provided!" при переходе на вкладку "Дополнительные условия" в карточке заявки

- [ADIRGSLSUPP-3772](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3772): Исправлено отображение дробной доли активов в отчёте предДСЖ.

- [ADIRGSLSUPP-3773](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3773): ADS-13382 , Формирование заявки на расторжение.

- [ADIRGSLSUPP-3796](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3796): Всплывающие ошибки при создании котировки

- [ADIRGSLSUPP-3797](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3797): Исправлена некорректная работа валидаций на заявке по договору предДСЖ.

- [ADIRGSLSUPP-3809](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3809): КОД подтверждения и документы по эл. полису не приходят пользователю

- [ADIRGSLSUPP-3819](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3819): Исправлен процесс создания ДС на нефин. изменения

- [ADIRGSLSUPP-3836](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3836): Скорректировано округление при загрузке долей активов.

- [ADIRGSLSUPP-3841](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3841): Скорректирована валидация на locale на карточке пользователя.

# 75.0.0-rc1 (2025-03-10)

### Breaking Changes (6 changes)

- [ADIRGSLSUPP-3481](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3481): Добавлено и включено для среды ПреПрод расширенное логгирование процесса отправки уведомлений аллокации на договор с нерезидентом
    Добавлен новый файл с логом AllocationFinishedLogger. На на каждую квитовку в него записывается минимум 8 строк. Прошу проследить, как увеличивается размер файла
    Исправлена ошибка, из-за которой не отправлялось уведомление об аллокации на договор с нерезидентом

- [ADIRGSLSUPP-3528](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3528): Агентские договоры:
    
    * Исправлено отображение банковских реквизитов.
    
    Перед паблишем выполнить скрипт:
    ```database\sql\migration\ADIRGSLSUPP-3528-Agent-agreement-set-default-bank-account.sql```

- [ADIRGSLSUPP-3616](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3616): Корректировка набора инструментов для предДСЖ.
    
    После паблиша необходимо выполнить скрипт
    database\sql\migration\ADIRGSLSUPP-3616-unit-linked-tables.sql

- [ADIRGSLSUPP-3664](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3664): Дедупликация:
    
    * Исправлена ошибка при попытке дедупликации карточек через UI.
    
    После паблиша выполнить скрипт:
    ```database\sql\migration\ADIRGSLSUPP-70-execute_deduplication procedure.sql```

- [ADIRGSLSUPP-3674](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3674): Продукт ПредДСЖ - корректировка справочника Базовых Активов на 21.02.25

- [ADIRGSLSUPP-3730](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3730): Корректировка набора инструментов для предДСЖ.
    
    После паблиша необходимо выполнить скрипт
    database\sql\migration\ADIRGSLSUPP-3730-unit-linked-tables.sql


### New Features (74 changes)

- [ADIRGSL-3669](https://jira.adacta-fintech.com/browse/ADIRGSL-3669): Тестовая реализация сервиса для реиндекса конкретной сущности.

- [ADIRGSLSUPP-1476](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1476): Реквизиты Государственных и бюджетных учреждений - разработка

- [ADIRGSLSUPP-1790](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1790): Дата получения оригинала на договоре. Загрузка и получение дат из интеграционного файла

- [ADIRGSLSUPP-1808](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1808): Дата получения оригинала на договоре. Добавление доп. атрибута

- [ADIRGSLSUPP-2311](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2311): Отключена проверка почтовых сертификатов с истекшим сроком. Почтовый сервер не возвращает список сертификатов.

- [ADIRGSLSUPP-2797_1](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2797_1): add noEmail rule for naturalPerson

- [ADIRGSLSUPP-2797](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2797): Теперь возможно указать либо E-mail, либо активировать чек-бокс "нет E-mail"

- [ADIRGSLSUPP-2888](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2888): Обогащение Changelog дополнительной информацией по структурным изменениям.

- [ADIRGSLSUPP-3136](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3136): PF-3652_ВТБ_Забота о будущем_андеррайтинг_правки после тестирования

- [ADIRGSLSUPP-3172](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3172): 320_A24-705. АВР_замечания по тестированию - тех. анализ, разработка

- [ADIRGSLSUPP-3256](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3256): ADS-13004_Почта Банк_Драйвер Гарантия (все сроки)_Исправить ошибку

- [ADIRGSLSUPP-3329](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3329): PF-3758_Акцепт_Зенит_Почта Банк_Зенит_Корректировка шаблонов договоров продуктов рыночных банков (масс и аффл)

- [ADIRGSLSUPP-3386](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3386): Исправлено поведение сервиса при создании справки с некорректным отчётным годом

- [ADIRGSLSUPP-3387](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3387): Исправлено поведениие поля correctionNumber при создании справки через сервис

- [ADIRGSLSUPP-3399](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3399): ADS-13105_Удаление группы ВТБ

- [ADIRGSLSUPP-3403](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3403): Зенит_Забота о семье 2.0 правки по результатам тестирования

- [ADIRGSLSUPP-3423](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3423): PF-3786_Зенит_Забота о семье 2.0_доработка ПФ и ЭП

- [ADIRGSLSUPP-3494](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3494): Добавлена информация ОС для контейнеров.

- [ADIRGSLSUPP-3507](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3507): УБРиР. Стратегия на три.Гарант.

- [ADIRGSLSUPP-3517](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3517): предДСЖ:
    
    * Доработан процесс работы с Заявкой и внесения изменений в Договор путем автоматического создания ДС.

- [ADIRGSLSUPP-3529](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3529): Внесены доработки по ручным ставкам комиссии

- [ADIRGSLSUPP-3542](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3542): Исправлена логика чекбокса "Скрыть неназначенные задачи" на витрине задач

- [ADIRGSLSUPP-3551](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3551): Исправлена ошибка при импорте справки на договор, имеющий разных Страхователя и Застрахованного

- [ADIRGSLSUPP-3557](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3557): Исправлено отображение ошибок при работе сервиса энричмента Налоговых справок

- [ADIRGSLSUPP-3558](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3558): Изменена логика проставления значения источника создания справки

- [ADIRGSLSUPP-3559](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3559): PF-3821_ПСБ (масс и аффл) замена памятки «Финансовый навигатор» в действующие продукты

- [ADIRGSLSUPP-3563](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3563): PF-3822_ПСБ и ОАС_корректировка шаблонов (замена Медоблака на Кроссхаб)

- [ADIRGSLSUPP-3567](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3567): Удалена валидация с котировки , которая срабатывает при активации чек-бокса ПОД/ФТ на карточке клиента.  Возврат к предыдущей реализации через вызов сервиса 1С: КПК при попытке создать договор.
    Исправлен текст уведомления при активированном чек-боксе ПОД/ФТ на карточке контрагента.

- [ADIRGSLSUPP-3569](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3569): Добавлены запросы в смежные подразделения на нефинансовых допниках и проверка при изменении гражданства страховщика и(или) застрахованного

- [ADIRGSLSUPP-3575](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3575): PF-3807_Зенит (масс и аффл)_замена Формы банка_разработка

- [ADIRGSLSUPP-3580](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3580): Исправлено поведение поля OriginalDocumentNumber при создании налоговой справки через импорт/сервис

- [ADIRGSLSUPP-3584](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3584): PF-3620_НС для Федерации спорта "Защита чемпионов"

- [ADIRGSLSUPP-3586](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3586): Изменено поведение кнопки "Обновить данные" компонента "Организация" в АД

- [ADIRGSLSUPP-3597](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3597): Доработка конфигуратора additionalServicesConfiguration

- [ADIRGSLSUPP-3600](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3600): Настроена событийная модель для продукта "Защита чемпионов".

- [ADIRGSLSUPP-3604](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3604): 108_A24-1973_Уязвимость №1 Загрузка произвольных файлов - разработка

- [ADIRGSLSUPP-3611](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3611): ПредДСЖ:
    
    * Настроена ПФ "Заявление на изменение структуры ИС" в заявке ППО.

- [ADIRGSLSUPP-3614](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3614): PF-3784_Зенит_Драйвер Гарантия на 1,3 и 5 лет_доработка ПЭП

- [ADIRGSLSUPP-3617](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3617): ВТБ розница. Драйвер гарантия.

- [ADIRGSLSUPP-3621](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3621): PF-3788_УБРиР_ запуск продукта "3 года Стратегия на пять. Гарант"_разработка

- [ADIRGSLSUPP-3622](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3622): Добавление партнера в import_test_data

- [ADIRGSLSUPP-3623](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3623): Синхронизация конфигов с тест и GIT

- [ADIRGSLSUPP-3624](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3624): Добавление номера телефона для тестирования кода электро полисов на тест и препрод

- [ADIRGSLSUPP-3628](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3628): PF-3438_ПСБ_ОРС_Доработка в продукте "Надёжный выбор Премиум 2.0" расчета взноса

- [ADIRGSLSUPP-3634](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3634): Исправлено появление дубликатов при работе SendEventETLService

- [ADIRGSLSUPP-3636](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3636): Добавлены ограничения на входящие параметры GeneralPartyDataSource и синхронизация передаваемых параметров в сервис.

- [ADIRGSLSUPP-3641](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3641): PF-3698_ВТБ исправления по результатам тестирования

- [ADIRGSLSUPP-3643](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3643): Уязвимость 7. UserDataSource + GetGroupsOfUserDataSource.

- [ADIRGSLSUPP-3646](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3646): PF-3784_Зенит ПЭП_Драйвер гарантия

- [ADIRGSLSUPP-3647](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3647): 322_A24-2437. АД/АВР_добавление размера НДС на карточку АД и расчет в АВР

- [ADIRGSLSUPP-3649](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3649): Зенит. Драйвр гарантяи 2 года. Корректировка декларации.

- [ADIRGSLSUPP-3650](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3650): PF_3803_Исправить памятку при отправке на почту

- [ADIRGSLSUPP-3668](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3668): PF-3818_Зенит_Драйвер гарантия_правки печатных форм

- [ADIRGSLSUPP-3669](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3669): Уязвимость 10. RelatedRequestsDataSource. Добавлено ограничение на обязательность передачи номера договора при вызове сервиса.

- [ADIRGSLSUPP-3670](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3670): Маппинг 3года Стратегия на пять Гарант 00869 УБРиР

- [ADIRGSLSUPP-3676](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3676): ADS-13158. Реализовать настроечную таблицу для указания признака реестра для платежей - разработка

- [ADIRGSLSUPP-3677](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3677): Заведение продуктов для миграции_февраль 2025

- [ADIRGSLSUPP-3679](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3679): PF-3788_УБРиР_"3 года Стратегия на пять. Гарант"_правки по результатам тестирования

- [ADIRGSLSUPP-3680](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3680): УБРиР. 3 года Стратегия на пять. Гарант. Правила страхования.

- [ADIRGSLSUPP-3685](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3685): PF-3665_ВТБ Привилегия_Изменение процесса согласования выпуска для клиентов 70+_разработка

- [ADIRGSLSUPP-3693](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3693): PF-3837_ВТБ (розница) настройка продукта "Драйвер Гарантия" с ПЭП - разработка

- [ADIRGSLSUPP-3695](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3695): Обновление ставок на партнерах 24.02-09.03.25

- [ADIRGSLSUPP-3697](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3697): Обновлены конфигурационные файлы для промышленной среды среды.

- [ADIRGSLSUPP-3698](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3698): PF-3620_НС для Федерации спорта "Защита чемпионов"_корректировка

- [ADIRGSLSUPP-3702](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3702): Добавление номера телефона для тестирования кода электро полисов на тест и препрод

- [ADIRGSLSUPP-3707](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3707): PF-3786_PF-3784_Зенит_Забота о семье 2.0, ДГ_доработка эл. полиса

- [ADIRGSLSUPP-3719](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3719): PF-3652_ВТБ_Забота о будущем_правки КИД

- [ADIRGSLSUPP-3731](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3731): Добавлены права для перевода котировки из статусе "Проект" в статус "Создан договор" для роли System.

- [ADIRGSLSUPP-3735](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3735): Исправлена долгая отработка процесса сохранения налоговых справок

- [ADIRGSLSUPP-3736](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3736): PF-3620_"Защита чемпионов"_корректировки

- [ADIRGSLSUPP-3746](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3746): PF-3855_ВТБ Формы Банка_корректировка последовательности в расположении документов_разработка

- [ADIRGSLSUPP-3750](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3750): PF-3872_Корректировка текста письма для спортсменов "Защита чемпионов"

- [ADIRGSLSUPP-3754](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3754): Исправлена ошибка об изменении документа другим пользователем при сохранении новой налоговой справки

- [ADIRGSLSUPP-3770](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3770): ADS-13358_Доп отправки уведомления о срабатывании триггеров


### Fixed (15 changes)

- [ADIRGSLSUPP-3284](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3284): Исправлена ошибка маппинга печатки, возникавшая на rc

- [ADIRGSLSUPP-3342](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3342): Исправление маппинга основоной информации о договоре на расторжении

- [ADIRGSLSUPP-3529-1](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3529-1): Добавлено поле Manual rule description в аналитическую подсистему.

- [ADIRGSLSUPP-3529-2](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3529-2): Исправлена ошибка при выборе ручной комиссии на договоре

- [ADIRGSLSUPP-3535](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3535): Долгая загрузка перечня продуктов при оформлении договора.

- [ADIRGSLSUPP-3568](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3568): Внесение исправлений по функционалу с двойными фамилиями

- [ADIRGSLSUPP-3609](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3609): Исправлены права для DATABANK (119501).

- [ADIRGSLSUPP-3653](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3653): Исправлено некорректное отображение данных на витрине задач

- [ADIRGSLSUPP-3661](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3661): Исправлено определение источника налоговой справки при создании с помощью сервиса

- [ADIRGSLSUPP-3703](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3703): Исправлена валидация застрахованного при переводе договора в статус "Подписан"

- [ADIRGSLSUPP-3711](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3711): Ошибки в работе ETL-сервисов

- [ADIRGSLSUPP-3716](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3716): Исправлен скрипт добавления новых событий для продукта "Защита чемпионов".

- [ADIRGSLSUPP-3718](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3718): предДСЖ:
    
    * Исправлено отображение загруженных данных о фондах на вкладке информация по инвестированию.

- [ADIRGSLSUPP-3720](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3720): Исправлена ошибка при получении банковских счетов страхователя в заявке ППО.

- [ADIRGSLSUPP-3762](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3762): Агентские договоры:
    
    * Исправлена ошибка при создании АД.

# 74.0.0-rc1 (2025-02-10)

### Breaking Changes (3 changes)

- [ADIRGSLSUPP-3534](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3534): Фикс боди старых налоговых справок, в которых отсутствует поле enrichFields
    После паблиша необходимо выполнить скрипт:
    database\sql\migration\8.50_035.004.000_20250204094354_adirgslsupp_3534.sql

- [ADIRGSLSUPP-3549](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3549): Корректировка набора инструментов для предДСЖ.
    
    После паблиша необходимо выполнить скрипт
    database\sql\migration\ADIRGSLSUPP-3549-unit-linked-tables.sql

- [ADIRGSLSUPP-3556](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3556): Корректировка набора инструментов для предДСЖ.
    
    После паблиша необходимо выполнить скрипт
    database\sql\migration\ADIRGSLSUPP-3556-unit-linked-tables.sql


### New Features (35 changes)

- [ADIRGSLSUPP-2857](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2857): Исправлена ошибка при нажатии на кнопку "Найти договор" с пустым полем для номера договора

- [ADIRGSLSUPP-3147](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3147): Исправлены ошибки тестирования по внутреннему уведомлению на подразделение Комплаенс

- [ADIRGSLSUPP-3169](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3169): Испраление сохранения ручной ставки КВ

- [ADIRGSLSUPP-3258](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3258): PF_3698_ВТБ Обновить шаблоны Договоров

- [ADIRGSLSUPP-3284](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3284): Добавлена анкета для ФЛ

- [ADIRGSLSUPP-3285](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3285): Исправлена фильтрация адресов в выпадающем списке при создании физического лица

- [ADIRGSLSUPP-3312](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3312): Исправлен вывод айтемов в документе Передача портфеля

- [ADIRGSLSUPP-3313](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3313): Исправлен маппинг датасурса для айтемов в документе Передача портфеля

- [ADIRGSLSUPP-3350](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3350): Переименована переменная aaToken в aaObject.

- [ADIRGSLSUPP-3388](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3388): PF-3620_РГСЖ_НС_Защита чемпионов_результат тестирования

- [ADIRGSLSUPP-3403](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3403): Зенит_Забота о семье 2.0

- [ADIRGSLSUPP-3421](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3421): PF-3784_Зенит масс_Драйвер Гарантия" на 1,3 и 5 лет с ПЭП_настройка печатных форм и ЭП

- [ADIRGSLSUPP-3446](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3446): ADS-13164_Создание роли просмотра продуктов РСЖ для ОАС

- [ADIRGSLSUPP-3450](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3450): Добавлен кастомный сервис витрины продуктов ВТБ

- [ADIRGSLSUPP-3461](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3461): предДСЖ:
    
    * Добавлен загрузчик "Данные о фондах".
    * Добавлен загрузчик "Данные об активах в фондах".
    * На договорах ДСЖ добавлена новая вкладка «Информация по инвестированию».

- [ADIRGSLSUPP-3468](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3468): Ошибка в оформлении договора

- [ADIRGSLSUPP-3471](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3471): 360_A24-701. Доработка. Установка счетчика для поля "номер" в АД - разработка

- [ADIRGSLSUPP-3473](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3473): Создание миграционных продуктов_январь 2025

- [ADIRGSLSUPP-3480](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3480): Изменена общая информация о системе в справке. Удалена информация о базе данных.

- [ADIRGSLSUPP-3491](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3491): Обновлены конфигурационные файлы для тестовой среды.

- [ADIRGSLSUPP-3492](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3492): Обновлены конфигурационные файлы для ПРОД среды.

- [ADIRGSLSUPP-3508](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3508): PF-3803_Замена памятки Налоговый вычет

- [ADIRGSLSUPP-3521](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3521): 108_A24-1973_Уязвимость №1 Загрузка произвольных файлов - разработка

- [ADIRGSLSUPP-3523](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3523): PF-3820_ОАС_ закрытие продуктов с 01.01.2025_Генетический чек-ап для взрослых/детей

- [ADIRGSLSUPP-3530](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3530): Маппинг Драйвер Гарантия 00664 Зенит

- [ADIRGSLSUPP-3555](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3555): PF-3620_НС для Федерации спорта "Защита чемпионов"_настройка проверки один застрахованный - один действующий договор

- [ADIRGSLSUPP-3561](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3561): Зенит. Драйвер гарантия 1 год.

- [ADIRGSLSUPP-3578](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3578): Добавление номера телефона для тестирования кода электро полисов на тест и препрод

- [ADIRGSLSUPP-3579](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3579): 360_A24-701. При создании к АД -ДС на расторжение ругается на номер АД

- [ADIRGSLSUPP-3584](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3584): PF-3620_НС для Федерации спорта "Защита чемпионов"_

- [ADIRGSLSUPP-3594](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3594): ADS-13258_Инн. Решения. Доступен закрытый функционал выбора ставок

- [ADIRGSLSUPP-3599](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3599): Зенит. Драйвер гарантия 5 лет. Корретировки.

- [ADIRGSLSUPP-3604](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3604): Внесение изменений в настройки сервера AdInsure

- [ADIRGSLSUPP-3609](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3609): Не отображаются мигрированные договора

- [ADIRGSLSUPP-3610](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3610): Маппинг Забота о семье 2.0 Зенит (00868)


### Fixed (9 changes)

- [ADIRGSLSUPP-3032](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3032): Не работает фильтр поиска в АВР

- [ADIRGSLSUPP-3274](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3274): Внесены исправления по отражению на карточке клиента истории проверок 1С КПК

- [ADIRGSLSUPP-3439](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3439): Поправлены ошибки на карточке КА, связанные с доработкой по чекбоксу

- [ADIRGSLSUPP-3466](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3466): Формирование XML сообщений для РФМ:
    
    * Добавлены переменные среды для сервера Adacta RC.

- [ADIRGSLSUPP-3518](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3518): ПредДСЖ: ошибка расчета остатка суммы к распределению.

- [ADIRGSLSUPP-3535](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3535): Долгая загрузка перечня продуктов при оформлении договора.

- [ADIRGSLSUPP-3545](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3545): Агентские договоры:
    
    * Исправлена ошибка при копировании строки в таблице условий вознаграждения.

- [ADIRGSLSUPP-3550](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3550): Ошибка при оформлении договора

- [ADIRGSLSUPP-3590](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3590): Загрузка банковских выписок

# 73.0.0-rc1 (2025-01-27)

### Breaking Changes (5 changes)

- [ADIRGSLSUPP-3367](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3367): После установки запустить reindex платежей:
    BankStatementItemRgslEsSearchDataProvider

- [ADIRGSLSUPP-3380](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3380): Корректировка набора инструментов для предДСЖ.
    
    После паблиша необходимо выполнить скрипт
    database\sql\migration\ADIRGSLSUPP-3380-unit-linked-tables.sql

- [ADIRGSLSUPP-3433](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3433): Исправлено значение maxRequestSize и MaxRequestBodySize с 30000000 на 50000000. Необходимо сделать аналогичное изменение в nginx, см. ADIRGSL-831.

- [ADIRGSLSUPP-3482](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3482): Датафикс для старых налоговых справок, исправляющий ошибку при создании корректировки
    Необходимо выполнить следующий скрипт после паблиша:
    database\sql\migration\8.50_035.004.000_20250122111412_adirgslsupp_3482.sql

- [ADIRGSLSUPP-3503](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3503): A24-2176_ПредДСЖ: добавление новых активов
    
    После паблиша необходимо выполнить скрипт
    database\sql\migration\ADIRGSLSUPP-3503-unit-linked-tables.sql


### New Features (33 changes)

- [ADIRGSLSUPP-2357](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2357): В Журнале договоров по некоторым контрактам неверно отображается сумма взносов

- [ADIRGSLSUPP-3058](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3058): Обновление процесса реиндексации

- [ADIRGSLSUPP-3202](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3202): Документ удостоверяющий личность в реестре из АДШ а САП

- [ADIRGSLSUPP-3205](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3205): PF-3732_ОАС_Драйвер Гарантия_корректировка лимитов по рискам и возрастам, продукт

- [ADIRGSLSUPP-3249](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3249): Контрагенты (История изменений):
    
    * Исправлены замечания после тестирования.

- [ADIRGSLSUPP-3253](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3253): Изменён маппинг гражданства для уведомления при заключении договора с нерезидентом

- [ADIRGSLSUPP-3258](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3258): PF_3698_ВТБ Обновить шаблоны Договоров

- [ADIRGSLSUPP-3269](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3269): Ограничение на количество записей при экспорте справок в XML было убрано
    Исправлена фильтрация по номеру коррекции

- [ADIRGSLSUPP-3274](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3274): Добавлен функционал настройки и отражения проверок КПК

- [ADIRGSLSUPP-3308](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3308): Отображение сервисов в продукте Детский капитал. Классика 2.0

- [ADIRGSLSUPP-3331](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3331): Параметризована возможность автопоиска Контрагентов.

- [ADIRGSLSUPP-3370](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3370): Исправлено заполнение чекбокса "Плательщик совпадает со страхователем" во время импорта налоговых справок

- [ADIRGSLSUPP-3377](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3377): Фикс доработки сервиса массового создания справок. Исправлены права доступа на вызов интеграционного сервиса

- [ADIRGSLSUPP-3388](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3388): PF-3620_РГСЖ_НС_Защита чемпионов_результат тестирования

- [ADIRGSLSUPP-3389](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3389): 360_A24-701. Установка счетчика для поля "номер" в АД - разработка

- [ADIRGSLSUPP-3393](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3393): Добавлена возможность перевода Договора в статус Проект из Отменен, незаивисимо от того, был ли он ранее в статусе Подписан.
    Скрыт для выбора Класс изменения "Изменение ставки КВ" в ДС на нефинансовые изменения.

- [ADIRGSLSUPP-3400](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3400): Зенит. Драйвер гарантия. Электронные договоры

- [ADIRGSLSUPP-3401](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3401): В тему уведомления при заключении договора с нерезидентом добавлены динамические параметры: ФИО и договор.

- [ADIRGSLSUPP-3419](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3419): Формирование XML сообщений для РФМ:
    
    * Изменена логика формирования для идентифицированных платежей.
    * Отключен джоб по формированию не идентифицированных платежей.

- [ADIRGSLSUPP-3420](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3420): Синхронизация конфигов с тест и GIT

- [ADIRGSLSUPP-3422](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3422): PF-3785_Зенит масс_"Драйвер Гарантия" на 2 года_доработка ПЭП_доработка печатных форм и ЭП

- [ADIRGSLSUPP-3423](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3423): Зенит_Забота о семье 2.0_доработка ПФ и ЭП

- [ADIRGSLSUPP-3436](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3436): Исправлено заполнение поля "Источник создания справки"

- [ADIRGSLSUPP-3439](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3439): Доработки по чек-боксу Нерезидент РФ

- [ADIRGSLSUPP-3444](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3444): Исправлено отображение номера документа для налоговых справок в витрине задач, расширено выбираемое количество записей на странице, отключены уведомления для группы УФО

- [ADIRGSLSUPP-3447](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3447): Обновлены конфигурационные файлы для всех тестовых сред.

- [ADIRGSLSUPP-3457](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3457): Витрина задач - групповые задачи:
    
    * При выборе сотрудника для назначения задачи, выбранные документы в таблице не будут сбрасываться.
    * При назначение сотрудника, исполнитель будет изменён в таблице автоматически, без обновления страницы или повторного поиска.

- [ADIRGSLSUPP-3459](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3459): Убрана проверка на активность УЗ при отборе УЗ для обновления ДОД.

- [ADIRGSLSUPP-3463](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3463): В поисковик контрагентов добавлено правило полного совпадения ФИО.

- [ADIRGSLSUPP-3464](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3464): Отключено уведомление для группы УФО
    Разрешено двигать справки по статусам вне зависимости от назначения задачи на пользователя

- [ADIRGSLSUPP-3487](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3487): В документе Справка для налоговой добавлено заполнение поля technicalInformation.duplicates, если оно undefined

- [ADIRGSLSUPP-3502](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3502): Добавлен новый транзишн для актора System в документ Справка для налоговой

- [ADIRGSLSUPP-3511](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3511): предДСЖ: добавлена возможность поиска актива по ISIN.


### Fixed (18 changes)

- [ADIRGSLSUPP-3181](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3181): Договоры:
    
    * Исправлено создание ДС через сервис.

- [ADIRGSLSUPP-3310](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3310): Исправлены даты начала действия и вступления силы на договоре при создании допника на передачу портфеля

- [ADIRGSLSUPP-3319](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3319): ДС по нефинансовым изменениям:
    
    * Исправлена ошибка при сохранении ДС для класса изменения - замена назначение вп.

- [ADIRGSLSUPP-3342](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3342): Исправлено заполнение дат на допнике расторжения НСЖ

- [ADIRGSLSUPP-3365](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3365): В сервисе get-contract-custom-data некорректно отображается исходящий платеж

- [ADIRGSLSUPP-3369](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3369): ADS-13112 (инцидент). Не распределяется оплата на договорах

- [ADIRGSLSUPP-3372](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3372): Убрана проверка по черным спискам при сохранении карточки КК

- [ADIRGSLSUPP-3384](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3384): Договоры:
    
    * Добавлен код продукта в костанты по тарифам.

- [ADIRGSLSUPP-3385](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3385): Исправлены настройки мок-сервисов для тестирования КПК на локальной и rc средах.

- [ADIRGSLSUPP-3416](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3416): 218_A24-1987_Проверка кода AdInsure_Средний_2 - анализ

- [ADIRGSLSUPP-3418](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3418): 130_A24-539_Блокирование учетных записей при истечении срока предоставления логического доступа - Доработка

- [ADIRGSLSUPP-3438](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3438): Исправления открытия вкладки Участники.

- [ADIRGSLSUPP-3445](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3445): Договоры:
    
    * Исправлена ошибка расчета суммы премии.

- [ADIRGSLSUPP-3453](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3453): Исправлена ошибка при отправке запроса в смежное подразделение.

- [ADIRGSLSUPP-3460](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3460): Исправлена реиндексация activity.

- [ADIRGSLSUPP-3466](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3466): Формирование XML сообщений для РФМ:
    
    * Исправлена ошибка при формировании файлов через UI.

- [ADIRGSLSUPP-3470](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3470): Исправлена ошибка создания ФЛ из договора.

- [ADIRGSLSUPP-3489](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3489): Исправлена ошибка отображения графика платежей.

# 72.0.0-rc1 (2025-01-13)

### Breaking Changes (5 changes)

- [ADIRGSLSUPP-3048](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3048): Исправление разницы в результатах поиска между просмотром через ui с фильтром "Страховщик передает сведения в ФНС" и прямым запросом в БД.
    Необходимо выполнить ADIRGSLUPP-3048-accounting-certificate-datafix.sql перед паблишем или после.

- [ADIRGSLSUPP-3210](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3210): Упростить загрузку параметров конфигурационных файлов - разработка
    
    * После деплоя загружать конфигы в новом формате. Файлы находятся в configuration@config-rgsl\integration-tests\test\api\scenarios\InitialData

- [ADIRGSLSUPP-3303](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3303): Добавлен сервис массового создания налоговых справок
    
    На локальной среде перед паблишем необходимо выполнить следующие скрипты:
    database\sql\Schema\8.50_035.004.000_20241223173442_adirgslsupp_3303.sql
    database\sql\Data\Accounting\8.50_035.004.000_20241223173509_adirgslsupp_3303.sql

- [ADIRGSLSUPP-3322](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3322): Функционал энричментов для документа "Справка для налоговой" перенесён в интеграционный сервис для соблюдения последовательности выполнения энричментов
    
    Для локальной среды, перед паблишем необходимо выполнить следующие скрипты:
    database\sql\Schema\8.50_035.004.000_20241219180704_adirgslsupp_3322.sql
    database\sql\Data\Accounting\8.50_035.004.000_20241219181153_adirgslsupp_3322.sql

- [ADIRGSLSUPP-3377](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3377): Добавлена вкладка "История" в Справку для налоговой, исправлен датафикс-скрипт
    
    В рамках данной задачи был исправлен датафикс-скрипт, его необходимо выполнить после паблиша на локальной среде:
    database\sql\Data\Accounting\8.50_035.004.000_20250109114700_adirgslsupp_3377.sql


### New Features (34 changes)

- [ADIRGSLSUPP-3111](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3111): PF-3620_Настройка нового типа продуктовой линейки и продукта

- [ADIRGSLSUPP-3128](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3128): PF-3711_ОАС_Замена памяток по способам оплаты договоров страхования жизни в продуктах НСЖ + ИСЖ

- [ADIRGSLSUPP-3134](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3134): Отчет предДСЖ:
    
    * Исправлен формат "Вес инструмента" на проценты.

- [ADIRGSLSUPP-3144](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3144): Карточка физических лиц адаптирована для двойных фамилий

- [ADIRGSLSUPP-3149](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3149): PF-2942_ОАС_обновление памятки по страховому случаю

- [ADIRGSLSUPP-3153](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3153): PF_3716_ВТБ_ПСБ продление графика траншей

- [ADIRGSLSUPP-3187](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3187): PF-3620_Настройка продукта НС для Федерации спорта "Защита чемпионов"_доработка печатных форм

- [ADIRGSLSUPP-3201](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3201): Корректировка наименования мигрированного продукта

- [ADIRGSLSUPP-3205](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3205): PF-3732_ОАС_Драйвер Гарантия_корректировка лимитов по рискам и возрастам, продукт

- [ADIRGSLSUPP-3208](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3208): Исправление по требованиям к парольной политике по результатам тестирования.

- [ADIRGSLSUPP-3249](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3249): Контрагенты:
    
    * Скрыта view на вкладке "Доп. информация".
    * Добавлена новая вкладка "История изменений".

- [ADIRGSLSUPP-3258](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3258): PF_3698_ВТБ Обновить шаблоны Договоровы

- [ADIRGSLSUPP-3259](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3259): PF_3702_ОАС правки по результатам теста

- [ADIRGSLSUPP-3262](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3262): 130_A24-1694. Добавить код в справки

- [ADIRGSLSUPP-3263](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3263): 140_A24-980_Лицо без Гражданства, настройка валидаций и триггеров.

- [ADIRGSLSUPP-3268](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3268): Добавить email участника групп, для отправки уведомлений о поступлени задачи на Комплаенс

- [ADIRGSLSUPP-3277](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3277): PF-3743_ПСБ_замена реквизитов в печатных формах

- [ADIRGSLSUPP-3278](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3278): PF_3742_ПСБ Базис Актив Премиум добавление новой стратегии

- [ADIRGSLSUPP-3279](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3279): PF-3480_ИННРЕШ_ЛайфИнвест внести исправления по результатам теста

- [ADIRGSLSUPP-3298](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3298): Обновление исторических АВР после изменения подхода к хранению данных

- [ADIRGSLSUPP-3308](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3308): Отображение сервисов в продукте Детский капитал. Классика 2.0

- [ADIRGSLSUPP-3321](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3321): Обновление BrokerConfig

- [ADIRGSLSUPP-3323](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3323): KD77_Создание миграционных продутов_декабрь 2024

- [ADIRGSLSUPP-3347](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3347): 103_A24-1857_Проверка кода AdInsure_Высокий_2.

- [ADIRGSLSUPP-3354](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3354): 130_A24-773_Обновленные требования к парольной политике - доработка.

- [ADIRGSLSUPP-3355](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3355): Синхронизация конфигов с тест и GIT

- [ADIRGSLSUPP-3362](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3362): ПредДСЖ: добавлена информация о брокере.

- [ADIRGSLSUPP-3368](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3368): Исправлено приложение печатки для справок, созданных в результате импорта

- [ADIRGSLSUPP-3373](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3373): добавление тест и предпрод АДШ для оформления эл.полисов

- [ADIRGSLSUPP-3375](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3375): Маппинг Защита чемпионов 00858

- [ADIRGSLSUPP-3388](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3388): PF-3620_РГСЖ_НС_Защита чемпионов_результат тестирования

- [ADIRGSLSUPP-3391](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3391): A24-1928_Не отображаются договора с типом НС в ЖУД АДШ

- [ADIRGSLSUPP-3428](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3428): Обновлены конфигурационные файлы для среды ПРОД.

- [ADIRGSLSUPP-3429](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3429): Обновлены конфигурационные файлы для среды ПРЕПРОД.


### Fixed (22 changes)

- [ADIRGSLSUPP-2469](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2469): Исправлен текст валидации для поля "Процент от страховой суммы к выплате"

- [ADIRGSLSUPP-2761](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2761): 170_А24-573. Внутреннее уведомление при заключении договора с нерезидентом

- [ADIRGSLSUPP-2948](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2948): Договоры:
    
    * Исправлена доступность выбора атрибута "Вариант выплаты по дожитию".

- [ADIRGSLSUPP-2986](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2986): Исправлен рассчет суммы к возврату при расторжении договоров в период охлаждения

- [ADIRGSLSUPP-3028](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3028): Не заполняются данные договоров в АВР

- [ADIRGSLSUPP-3159](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3159): исправлена миграция контракта с указанием manualRule

- [ADIRGSLSUPP-3207](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3207): 120_A24-539_Блокирование учетных записей при истечении срока предоставления логического доступа - разработка

- [ADIRGSLSUPP-3224](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3224): Исправление lint предупреждений

- [ADIRGSLSUPP-3227](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3227): Перенесена валидация на переход договора из статуса "Проект" в статус "Подписан"

- [ADIRGSLSUPP-3245](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3245): Исправлена ошибка "Body не должно иметь дополнительные свойства (riskGroup)" при создании договора сервисом

- [ADIRGSLSUPP-3314](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3314): Передача портфеля: активация ДС падает с ошибкой

- [ADIRGSLSUPP-3315](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3315): Передача портфеля: обнуление партнера и инициатора

- [ADIRGSLSUPP-3316](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3316): Передача портфеля: ошибка при изменении САД

- [ADIRGSLSUPP-3317](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3317): ADD-229_Не формируется план оплат в payment plan sat по тех. доп. соглашению с фин.изменением

- [ADIRGSLSUPP-3318](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3318): ADS-13033_Настройка расширенного логирования для сервиса КПК

- [ADIRGSLSUPP-3327](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3327): Исправлена ошибка при поиске задач

- [ADIRGSLSUPP-3336](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3336): 101_A24-1843_Проверка кода AdInsure_Критический

- [ADIRGSLSUPP-3342-fix](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3342-fix): Fix api tests

- [ADIRGSLSUPP-3342](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3342): Исправлено заполнение основной информации в ДС на расторжение на карточке страхования

- [ADIRGSLSUPP-3345](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3345): Расширить значение для поля пиклиста в справках ФНС

- [ADIRGSLSUPP-3356](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3356): Персональный фонд Ультра (предДСЖ):
    
    * В ПФ Памятки ЦБ исправлена дата начала периода в таблице выкупных сумм.

- [ADIRGSLSUPP-3359](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3359): Орг. структура. Отсутствует кнопка "Сохранить" при создании/редактирования пользователя

# 71.0.0-rc1 (2024-12-16)

### Breaking Changes (8 changes)

- [ADIRGSLSUPP-3070](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3070): **ПОСЛЕ** установки необходимо выполнить скрипт:
    * database/sql/migration/ADIRGSLSUPP-3070-update-registry-income-source.sql

- [ADIRGSLSUPP-3093](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3093): предДСЖ: настройка продукта, корректировка UI.
    
    Перед паблишем необходимо выполнить скрипт:
    database\sql\migration\ADIRGSLSUPP-3093-unit-linked-tables-2.sql

- [ADIRGSLSUPP-3135](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3135): Персональный фонд Ультра (предДСЖ):
    
    * В конфигурацию продуктов (product_configuration) добавлены 2 новых атрибута.
    * Для группы продуктов ДСЖ добавлен новый компонент "Дополнительные параметры инвестирования".
    * Исправлен рабочий календарь.
    
    > После паблиша необходимо импортировать последнюю версию конфигурации продуктов.

- [ADIRGSLSUPP-3146](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3146): Добавлена автоматическая проверка сервисом КПК во время сохранения карточки контрагента
    
    До паблиша необходимо выполнить следующие скрипты в указанном порядке:
    database/sql/Schema/8.50_035.004.000_20241128144043_adirgslsupp_3146.sql
    database/sql/Data/PAS/8.50_035.004.000_20241128144719_adirgslsupp_3146.sql
    
    После паблиша необходимо выполнить следующий скрипт:
    database/sql/Data/8.50_035.004.000_20241126152919_adirgslsupp_3146.sql

- [ADIRGSLSUPP-3161](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3161): PF-3717_ВТБ_Ключевой выбор/Ультра_Корректировка страховой документации_доработка конфигуратора
    
    После паблиша для обновления данных в контрактах выполнить скрипт:
    database\sql\migration\8.50_035.004.000_20241202092342_adirgslsupp_3161_update_discount_ibakv.sql
    database\sql\migration\8.50_035.004.000_20241202105310_adirgslsupp_3161_update_discount_ibakv_quote.sql

- [ADIRGSLSUPP-3167](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3167): Исправление ошибки при создании контрагентов фл на договоре

- [ADIRGSLSUPP-3207](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3207): После установки необходимо запустить ETL:
    > {{SERVER_URI}}/api/core/etl-services/UpdateUserExpireDateEtl/1
    
    Со следующим запросом:
    ```json
    {
    	"data": {
    	}
    }
    ```
    Возможно он будет отрабатывать какое-то длительное время.

- [ADIRGSLSUPP-3232](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3232): предДСЖ: добавление эмитента и инструментов.
    
    Перед паблишем необходимо выполнить скрипт:
    database\sql\migration\ADIRGSLSUPP-3232-unit-linked-tables.sql


### New Features (46 changes)

- [ADIRGSLSUPP-2755](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2755): Правки по результатам теста ПСБ

- [ADIRGSLSUPP-2835](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2835): Кумуляция:
    
    * Исправлены расчёты по продуктам «Забота о семье» и «Забота о семье Ультра».

- [ADIRGSLSUPP-2976](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2976): ОАС. Драйвер гарантия. Добавление ручной корректировки ставок.

- [ADIRGSLSUPP-2999](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2999): Добавлен фильтр "Скрыть неназначенные задачи" на витрине задач

- [ADIRGSLSUPP-3037](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3037): Исправление ручных правил комиссии

- [ADIRGSLSUPP-3074](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3074): Валидация вложений. Св-во о рождении на карточке застрахованного при создании договоров

- [ADIRGSLSUPP-3085](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3085): PF_3702_ОАС обновление деклараций и печатных форм

- [ADIRGSLSUPP-3090](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3090): PF_3480_ИннРешения_ЛайфИнвест Обновление страховой документации и синхронизация дат

- [ADIRGSLSUPP-3092](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3092): Доработка функционала по выбору Дополнительного инициатора агентской сети - разработка

- [ADIRGSLSUPP-3101](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3101): PF-3568_создание новых типов вложений на карточке контрагента - разработка

- [ADIRGSLSUPP-3134](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3134): Доработаны отчеты предДСЖ.

- [ADIRGSLSUPP-3142](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3142): Добавлено поле "причина отсутствия TIN" на карточке контрагента. Данная доработка влияет на dataschema контрагентов.

- [ADIRGSLSUPP-3143](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3143): Настроен триггер на комплаенс при выборе страхователя-ИП на котировке

- [ADIRGSLSUPP-3147](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3147): Добавлено уведомления для комплаенс, которое отправляется при сохранении карточки контрагента

- [ADIRGSLSUPP-3164](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3164): Доработка маски при загрузке реестра платежей на шестизначный № договора

- [ADIRGSLSUPP-3168](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3168): Исправлена ошибка при создании документа "Передача портфеля"

- [ADIRGSLSUPP-3174](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3174): Исправлена генерация комментария для вложения в справке для налоговой

- [ADIRGSLSUPP-3177](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3177): Персональный фонд Ультра (предДСЖ):
    
    * Добавлена ПФ "Анкета фин. грамотности".

- [ADIRGSLSUPP-3178](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3178): Персональный фонд Ультра (предДСЖ):
    
    * Добавлена ПФ "ИНФОРМАЦИЯ, ПРЕДОСТАВЛЯЕМАЯ БАНКОМ ВТБ".

- [ADIRGSLSUPP-3182](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3182): предДСЖ: корректировка тарифа.

- [ADIRGSLSUPP-3191](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3191): Исправлено прикреплене вложения в дс на нефинансовое изменение

- [ADIRGSLSUPP-3198](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3198): Обновлены конфигурационные файлы для среды ПРЕПРОД.

- [ADIRGSLSUPP-3200](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3200): ADS-12992_НСЖ-0000173767, выкупные суммы не рассчитываются

- [ADIRGSLSUPP-3206](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3206): 120_A24-539_Учет e-mail на карточке пользователя

- [ADIRGSLSUPP-3208](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3208): Обновленные требования к парольной политике.

- [ADIRGSLSUPP-3200](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3200): PF-3731_Корректировка памятки ЦБ для продуктов ИСЖ на 2025г

- [ADIRGSLSUPP-3222](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3222): PF-3699_ПСБ (масс и аффл)_Финансовый навигатор_правки по результатам тестирования

- [ADIRGSLSUPP-3228](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3228): Персональный фонд Ультра (предДСЖ):
    
    * Скорректирован п.1 декларации страхователя и застрахованного.

- [ADIRGSLSUPP-3233](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3233): PF-3717_ВТБ_Ключевой выбор/Ультра_Корректировка страховой документации_правка по результатам тестирования

- [ADIRGSLSUPP-3234](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3234): Персональный фонд Ультра (предДСЖ):
    
    * Добавлена ПФ Инвестиционная декларация.

- [ADIRGSLSUPP-3237](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3237): PF_3734__3735_3736_PF_3740_ВТБ_ИннРеш_ЛайфИнвест Обновить ставки

- [ADIRGSLSUPP-3240](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3240): Добавление номера телефона для тестирования кода электро полисов на препрод и тест

- [ADIRGSLSUPP-3241](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3241): Исправлен баг с выгрузкой журнала платежей

- [ADIRGSLSUPP-3250](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3250): Синхронизация конфигов с тест и GIT

- [ADIRGSLSUPP-3251](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3251): Маппинг_Новое значение КВ

- [ADIRGSLSUPP-3254](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3254): PF_3613_ПСБ исправления по результатам тестирования

- [ADIRGSLSUPP-3259](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3259): PF_3702_ОАС правки по результатам теста

- [ADIRGSLSUPP-3264](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3264): Персональный фонд Ультра (предДСЖ):
    
    * Добавлена ПФ Памятка ЦБ.

- [ADIRGSLSUPP-3265](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3265): предДСЖ: Анкета 70+ корректировка процесса.

- [ADIRGSLSUPP-3269](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3269): Добавлена возможность формирования xml-справок для всех отфильтрованных строк

- [ADIRGSLSUPP-3273](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3273): предДСЖ: добавление валидаций на анкету фин. грамотности.

- [ADIRGSLSUPP-3279](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3279): PF-3480_ИННРЕШ_ЛайфИнвест внести исправления по результатам теста

- [ADIRGSLSUPP-3296](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3296): Исправлено назначение задачи на группу УФО при создании справки для налоговой

- [ADIRGSLSUPP-3297](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3297): PF_3613_ПСБ скорректировать печатные формы

- [ADIRGSLSUPP-3302](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3302): Установка времени жизни токена 15 минут для всех сред.

- [ADIRGSLSUPP-3321](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3321): ПредДСЖ: обновление конфигурации.


### Fixed (18 changes)

- [ADIRGSLSUPP-2469](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2469): Внесены исправления в функционал повреждений на убытках

- [ADIRGSLSUPP-2817](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2817): Витрина задач - ошибка отображения номера договора для "недоговоров"

- [ADIRGSLSUPP-2958](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2958): Исправление PROBLEMS-ов на 35-й платформе

- [ADIRGSLSUPP-2980](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2980): Ускорение реиндексации activities

- [ADIRGSLSUPP-3081](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3081): Исправлены ошибки при создании карточки ЮЛ

- [ADIRGSLSUPP-3163](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3163): Исправлена ошибка "Body не должно иметь дополнительные свойства (selectedClaimRisks)" на договоре при создании ДС

- [ADIRGSLSUPP-3167-fix](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3167-fix): Фикс чекбокса "предпочтительно" в разделе "телефоны" на карточке ФЛ

- [ADIRGSLSUPP-3180](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3180): Исправлена невозможность заполнения обязательных полей на расторжении

- [ADIRGSLSUPP-3183](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3183): Добавлена проверка параметров запроса для енричмента GetKPKValidationStatus.

- [ADIRGSLSUPP-3199](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3199): IS-49929_Тестирование функционала поиск потерянных задач

- [ADIRGSLSUPP-3219](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3219): Кумуляция:
    
    * Исправлена ошибка (reading 'riskPaymentForm') при удалении риска андерайтером РСЖ.

- [ADIRGSLSUPP-3226](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3226): Контрагенты. Исправлены ошибки при заполнении блоков "Адреса", "Документы" при создании КА

- [ADIRGSLSUPP-3227](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3227): Исправление валидации на обязательность документа "Свидетельство о рождении" при переводе договора в статус "Подписан", если возраст ЗЛ менее 14 лет или равен 14 годам

- [ADIRGSLSUPP-3247](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3247): Отключен автоматический результат отбора по предустановленному значению атрибута «Тип» = Физ. Лицо на view поиска Контрагента из Котировки.

- [ADIRGSLSUPP-3289](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3289): Персональный фонд Ультра (предДСЖ):
    
    * Исправлены ошибки печатных форм.

- [ADIRGSLSUPP-3300](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3300): Дополнен признак определения реестра (isRegistry = true) для банковской выписки.

- [ADIRGSLSUPP-3324](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3324): Кумуляция:
    
    * Исправлена ошибка при получении рисков по договорам.

- [ADIRGSLUPP-3293](https://jira.adacta-fintech.com/browse/ADIRGSLUPP-3293): Поправлена ошибка при заполнении анкет при создании физлиц на договоре

# 70.0.0-rc1 (2024-11-26)

### Breaking Changes (8 changes)

- [ADIRGSLSUPP-2469](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2469): Вариант исправления ошибки, связанной с отсутствием информации о группе в рисках на rc

- [ADIRGSLSUPP-2908](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2908): Исправлена ошибка заполнения банковских реквизитов при создании убытка

- [ADIRGSLSUPP-2955](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2955): Из шедулера необходимо удалить job-ы:
    SendElmaEvent
    SendElmaEventTrigger
    SendModifyDocsStatusEvent
    SendModifyDocsStatusEventTrigger
    SendPartnerIsPolicyHolderEvent
    SendPartnerIsPolicyHolderEventTrigger

- [ADIRGSLSUPP-2973](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2973): Договоры:
    
    * Ошибка при открытии старых договоров.
    
    После паблиша необходимо выполнить:
    DROP TABLE IF EXISTS PAS_IMPL.CONTRACT_BODY_PRODUCT_CONF_UPDATE_INFO
    Затем скрипты в любом порядке:
    database\sql\migration\ADIRGSLSUPP-2176-Product-configuration-update-contracts-body.sql
    database\sql\migration\ADIRGSLSUPP-2176-Product-configuration-update-canc-and-tech-amendments-body.sql
    database\sql\migration\ADIRGSLSUPP-2176-Product-configuration-update-fin-and-nonfin-amendments-body.sql
    database\sql\migration\ADIRGSLSUPP-2176-Product-configuration-clean-collectives.sql
    
    После выполнения скриптов, выполнить реиндексацию ES по договорам.

- [ADIRGSLSUPP-2985](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2985): Добавлен скрипт, создающий задачи для старых налоговых справок на группу УФО
    Необходимо выполнить скрипт: database\sql\migration\8.50_035.004.000_20241111132624_adirgslsupp_2985.sql
    Затем необходимо переиндексировать ActivitySearchIndex

- [ADIRGSLSUPP-3050](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3050): Изменён конфиг идентити сервера для теста и локальной среды
    Просьба перезагрузить идентити сервер

- [ADIRGSLSUPP-3077](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3077): Изменён порядок выполнения энричментов при создании договора через сервис.
    
    > :warning:
    > После паблиша создавать котировки\договоры через сервис согласно документации: docs\administration\PolicyEnrichments.md

- [ADIRGSLSUPP-3093](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3093): Доработка UI для предДСЖ.
    
    После паблиша необходимо выполнить скрипт:
    database\sql\migration\ADIRGSLSUPP-3093-unit-linked-tables.sql


### New Features (70 changes)

- [ADIRGSLSUPP-2216](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2216): ВТБ PB_На всякий случай Ультра_Доработки по продукту. Андерайтинг

- [ADIRGSLSUPP-2279](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2279): Фикс кнопки добавления комментария в договорах на вкладке "История"

- [ADIRGSLSUPP-2283](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2283): ПСБ_ОРС_Доработка в продукте "Надёжный выбор Премиум 2.0" расчета взноса

- [ADIRGSLSUPP-2496](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2496): Исправлен баг обновления данных организации в Агентском договоре

- [ADIRGSLSUPP-2497](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2497): Доработаны фильтры поиска агентских договоров и выгрузка в excel
    Доработан агентский договор

- [ADIRGSLSUPP-2522](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2522): Невозможно редактировать поля на договоре после реализации Автоконверсии

- [ADIRGSLSUPP-2574](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2574): Добавлен новый класс изменения "Изменение параметров инвестирования" для нефинансовых ДС.

- [ADIRGSLSUPP-2657](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2657): Корректировка ПФ предДСЖ.

- [ADIRGSLSUPP-2660](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2660): PF-3559_Изменение формы Анкеты оценки фин.грамотности_разработка

- [ADIRGSLSUPP-2662](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2662): ДМС:
    
    * Добавлена роль MedLifeGenCheckup предоставляющая возможность оформления продуктов Генетический чек-ап «Питание и спорт» и
    Генетический чек-ап «Таланты и способности» через UI.

- [ADIRGSLSUPP-2745](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2745): Добавление тригера Draft_to_OnReview_ApplicationAttachmen для продуктов IBAV3VTB,IBAV5VTB

- [ADIRGSLSUPP-2761](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2761): Добавлено новое внутреннее уведомление о заключении договора с нерезидентом
    Отключено подобное старое уведомление

- [ADIRGSLSUPP-2791](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2791): Изменение даты соц опросника у продукта EBMGNVTB

- [ADIRGSLSUPP-2799](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2799): ВТБ_Базис Актив 2.0 Ошибка в печатной форме

- [ADIRGSLSUPP-2835](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2835): Кумуляция:
    
    * Настроена кумуляция по продуктам «Забота о семье» и «Забота о семье Ультра».

- [ADIRGSLSUPP-2836](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2836): Витрина задач. Правки в конфигурации назначения задач

- [ADIRGSLSUPP-2856](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2856): Удаление из БД таблицы [BFX_IMPL].[PRODUCT_CONFIGURATION]

- [ADIRGSLSUPP-2864](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2864): ПСБ_Вектор здоровья Премиум 2.0_Отображение сервисов в продукте

- [ADIRGSLSUPP-2867](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2867): Доработка печатных форм. Инновационные решения

- [ADIRGSLSUPP-2895](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2895): Автоконверсия. В ДС недоступны в кнопке "Действия" варианты меню.

- [ADIRGSLSUPP-2905](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2905): ВТБ. Забота о будущем/Ультра. корректировка разбивки.

- [ADIRGSLSUPP-2907](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2907): Изменено поведение чекбокса "Налогоплательщик и застрахованное лицо являются одним лицом" на документе "Справка для налоговой"

- [ADIRGSLSUPP-2918](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2918): Некорректно подтянулись доп. сервисы к договору - 45300-77001188

- [ADIRGSLSUPP-2920](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2920): Проверка activities

- [ADIRGSLSUPP-2925](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2925): PF-3550_PF-3551_Увеличение срока действия программы "Забота о будущем Ультра" с 10 до 20 лет_доработка по результатам тестирования

- [ADIRGSLSUPP-2926](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2926): PF_3613_ПСБ_правка печатных форм после тестирования

- [ADIRGSLSUPP-2927](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2927): Нет кнопки сохранить на созданных до обновления платформы master entity.

- [ADIRGSLSUPP-2929](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2929): В Журнале платежей при детальном просмотре (через элемент "Глазик") элементы сворачивания разделов и кнопка "Закрыть" перенесены в левую часть экрана

- [ADIRGSLSUPP-2942](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2942): Исправлена выгрузка условий условий вознаграждения в агентском договоре

- [ADIRGSLSUPP-2975](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2975): Договоры:
    
    * Добавлено отображение кодов продукта в наименовании продукта на договорах для всех ролей, кроме роли Агент.

- [ADIRGSLSUPP-2979](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2979): PF-3612_замена реквизитов в печатных формах_кроме ВТБ

- [ADIRGSLSUPP-2982](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2982): Увеличено количество консумеров до 4 для Core.Entity.SynchroniseSearchIndex.

- [ADIRGSLSUPP-2987](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2987): PF-3612_все партнеры_Замена реквизитов в печатных формах договоров

- [ADIRGSLSUPP-2994](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2994): Корректировка выгрузки отчета ИСЖ.

- [ADIRGSLSUPP-2995](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2995): Добавлены дополнительные почтовые адреса для тестирования отправки писем с Adacta RC сервера.

- [ADIRGSLSUPP-2996](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2996): PF-3616_ ВТБ Привилегия_новые территории_обновление маппинга

- [ADIRGSLSUPP-2998](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2998): Котировки и договоры:
    
    * В раздел Администрирование добавлен функционал для обновления конфигурации продукта в теле документа.
    * Доступно обновление конфигурации продукта в теле документа через сервис, смотреть документацию docs\administration\ProductConfiguration.md

- [ADIRGSLSUPP-3007](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3007): Обновление продуктовых конфигов

- [ADIRGSLSUPP-3008](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3008): Обновление продуктовых конфигов

- [ADIRGSLSUPP-3014](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3014): PF-3559_Изменение формы Анкеты оценки фин.грамотности_адрес ПСБ

- [ADIRGSLSUPP-3022](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3022): В ДС на расторжение на таблицу "Получатели" Добавлена кнопка "Добавить Страхователя"

- [ADIRGSLSUPP-3023-fix](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3023-fix): Поправлена котировка на защиту и накопления

- [ADIRGSLSUPP-3023](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3023): Настроена неблокирующая валидация типа Note на сущностях:
    
    ДС на фин. изменение
    ДС на нефин. изменение
    ДС на расторжение
    Дожитие/ДИД

- [ADIRGSLSUPP-3035](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3035): PF-3618_УБРиР_Стратегия на пять. Гарант_маппинг

- [ADIRGSLSUPP-3055](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3055): PF-3625_Промсвязьбанк (масс и аффл)_доработка автоматического заполнения заявления на страхование_все продукты

- [ADIRGSLSUPP-3061](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3061): Сервисные коды в конфигураторе Адиншур

- [ADIRGSLSUPP-3063](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3063): PF-3697_ВТБ Драйвер Гарантия обновление ставок с 08.11

- [ADIRGSLSUPP-3065](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3065): Добавлен новый тип нефинансовых изменений "Гражданство"

- [ADIRGSLSUPP-3066](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3066): Переименован partyHelper.js в partyUtils.js

- [ADIRGSLSUPP-3071](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3071): ПСБ (масс и аффл)_внедрение сервиса «Финансовый навигатор» в действующие продукты

- [ADIRGSLSUPP-3072](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3072): Изменить URI для ELMA365 на ТЕСТ АДШ

- [ADIRGSLSUPP-3080](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3080): Изменено положение кнопок в таблице с условиями вознаграждения на АД

- [ADIRGSLSUPP-3084](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3084): ОАС Обновление кэшбэков и ставок

- [ADIRGSLSUPP-3087](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3087): PF-3701_ВТБ Привелегия_Стратегия на пять гарант_доработка Бандл

- [ADIRGSLSUPP-3103](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3103): Маппинг_ПредДСЖ_Персональный фонд Ультра

- [ADIRGSLSUPP-3112](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3112): PF-3618_УБРиР запуск продукта "Стратегия на пять. Гарант"_корректировка маркетингового наименования продукта

- [ADIRGSLSUPP-3113](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3113): Акцепт_ПБ_Зенит_УБРиР Обновление ставок и кэшбэков

- [ADIRGSLSUPP-3116](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3116): ВТБ_Драйвер Гарантия дополнить маппинг для КВ

- [ADIRGSLSUPP-3118](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3118): Скорректирован механизм подгрузки дочерних подразделений в журнале договоров.

- [ADIRGSLSUPP-3122](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3122): PF_3712_3713_3715_ВТБ_ИНН_Реш_ЛайфИнвест Обновить ставки и кэшбэк

- [ADIRGSLSUPP-3123](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3123): Создание миграционных продуктов (ноябрь 2024)

- [ADIRGSLSUPP-3131](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3131): Персональный фонд Ультра (предДСЖ):
    
    * Добавлена ПФ заявления на страхование.

- [ADIRGSLSUPP-3132](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3132): Персональный фонд Ультра (предДСЖ):
    
    * Добавлена ПФ Анкета 70+.

- [ADIRGSLSUPP-3133](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3133): Доработка sapFilesIntergationHelper.sql

- [ADIRGSLSUPP-3140](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3140): PF_3718_3719_3720_3721_ВТБ_ИннРеш_ЛайфИнвест Обновление ставок и кэшбэков

- [ADIRGSLSUPP-3150](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3150): ПСБ (масс и аффл)_Финансовый навигатор обновление памятки

- [ADIRGSLSUPP-3151](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3151): PF_3613_ПСБ внести правки по результатам тестирования

- [ADIRGSLSUPP-3160](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3160): Зенит_УБРиР Забота о будущем корректировка тарификации

- [ADIRGSLSUPP-3166](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3166): Обновление конфигурационных файлов для сред ТЕСТ и ПРЕПРОД.

- [ADIRGSLSUPP-3171](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3171): Обновление конфигурационных файлов для среды ПРОД.


### Fixed (12 changes)

- [ADIRGSLSUPP-2464](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2464): Исправлено отображение некорректного времени создания ДС

- [ADIRGSLSUPP-2900](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2900): Массовая отмена платежей. Доработка после тестирования

- [ADIRGSLSUPP-2953](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2953): Контрагенты:
    
    * Исправлена ошибка схемы данных при редактировании клиента с паспортом иностранного гражданина.

- [ADIRGSLSUPP-2958](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2958): Исправление PROBLEMS-ов на 35-й платформе

- [ADIRGSLSUPP-3019](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3019): Исправлена ошибка при попытке выгрузить отчёт по НОТАМ

- [ADIRGSLSUPP-3020](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3020): Договоры:
    
    * Исправлено смещение текста в анкете ФЛ при создании контрагента из договора.
    * Исправлена ошибка при выборе формы выпуска.
    * Заблокирована форма выпуска, пока продукт и дата заключения не указаны.

- [ADIRGSLSUPP-3024](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3024): Исправлена ошибка при перевыборе контрагента в поставщиках после изменения фамилии.

- [ADIRGSLSUPP-3038](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3038): Агентские договоры:
    
    * Исправлено отображение продуктов в условиях вознаграждения

- [ADIRGSLSUPP-3040](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3040): Ошибка_Импорт и загрузка платежей по договорам

- [ADIRGSLSUPP-3052](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3052): тестирование v.35. Ошибка в работе Job-а CompleteContracts

- [ADIRGSLSUPP-3088](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3088): тестирование v.35. Ошибка в работе Job-а AccBankStatementImport

- [ADIRGSLSUPP-3117](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3117): Добавлена проверка параметров запроса для енричмента GetKPKValidationStatus.

# 69.0.0-rc1 (2024-10-31)

### Breaking Changes (5 changes)

- [ADIRGSLSUPP-2539](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2539): Upgraded platform to version 35.4.0. Upgraded configuration to version 35.3.3.

- [ADIRGSLSUPP-2548](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2548): предДСЖ: Формирование данных и передача в Аванкор.
    
    Перед паблишем необходимо выполнить скрипт:
    database\sql\migration\ADIRGSLSUPP-2876-unit-linked-tables.sql

- [ADIRGSLSUPP-2650](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2650): Добавлены атрибуты в таблицу BFX_IMPL.SEND_EVENT_EXCEPTIONS
    
    После паблиша для заполнения новых столбцов необходимо выполнить следующий скрипт:
    database\sql\migration\8.50_035.004.000_20241025102839_adirgslsupp_2650.sql

- [ADIRGSLSUPP-2871](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2871): Универсальные продукты:
    
    * Реализован механизм создания продукта без привязки к партнеру.
    
    После паблиша необходимо импортировать конфигурацию продуктов.
    Инструкция по импорту docs\administration\ProductConfiguration.md

- [ADIRGSLSUPP-2917](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2917): Поправлено отображение информации на UI в разделе "контрагенты"


### New Features (36 changes)

- [ADIRGSLSUPP-2311](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2311): Update install script for deploy steps only.

- [ADIRGSLSUPP-2469](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2469): Изменен принцип хранения информации повреждениях.
    Добалены миграционные скрипты для создания и заполнения новой таблицы. Среди новых скриптов первым должен быть выполнен ADIRGSLUPP-2469-create-table.sql. Остальные могут выполняться в произвольном порядке.

- [ADIRGSLSUPP-2500](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2500): Не заполняется атрибут тип реестра в журнале платежей

- [ADIRGSLSUPP-2544](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2544): Добавлен тип 5 ДИД СЛП в PAS_IMPL.PAYMENT_TYPE

- [ADIRGSLSUPP-2559](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2559): Добавлено уведомление о создании задачи по Справке для налоговой

- [ADIRGSLSUPP-2560](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2560): Добавлено создание задач для сущности Налоговой справки

- [ADIRGSLSUPP-2572](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2572): предДСЖ: формирование и отправка реестра на перевод д/с.

- [ADIRGSLSUPP-2740](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2740): Доработан документ "Передача портфеля"

- [ADIRGSLSUPP-2775](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2775): предДСЖ: настройка продукта - корректировки по результатам тестирования.

- [ADIRGSLSUPP-2791](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2791): Открытие продуктов EBMGNVTB и EBMGUBRR

- [ADIRGSLSUPP-2796](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2796): УБРиР. Создание продукта Стратегия на пять. Гарант.

- [ADIRGSLSUPP-2798](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2798): PF-3529_ВТБ Прайм_Базис Актив Ультра_Настройка лесенки для 2х стратегий

- [ADIRGSLSUPP-2819](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2819): PF-3612_все партнеры_Замена реквизитов в печатных формах договоров_разработка

- [ADIRGSLSUPP-2832-fix1](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2832-fix1): Исправление в расчете годовщин периодов оплаты

- [ADIRGSLSUPP-2832](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2832): Новый Класс изменения "Изменение ставки КВ". 
    Просьба обратить внимание на измение одной из датасхем. В PolicyCommission добавилось поле isChanged типа boolean.

- [ADIRGSLSUPP-2837](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2837): Доработан документ Справка для налоговой

- [ADIRGSLSUPP-2840](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2840): Исправлено создание XML-файла для налоговой справки

- [ADIRGSLSUPP-2849](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2849): Improve CommisssionAct test assertion

- [ADIRGSLSUPP-2858](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2858): PF-3658_ВТБ Драйвер Гарантия Обновить ставки 21.10

- [ADIRGSLSUPP-2863](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2863): Update PROD confs.

- [ADIRGSLSUPP-2877](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2877): УБРиР_запуск продукта "Стратегия на пять. Гарант"_доработка печатных форм

- [ADIRGSLSUPP-2878](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2878): ВТБ_Базис Актив/Ультра(2.0)_Российские технологии_правки по результатам тестирования

- [ADIRGSLSUPP-2879](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2879): Создание новых продуктов для миграции.

- [ADIRGSLSUPP-2887](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2887): Корректировка выгрузки отчета ИСЖ.

- [ADIRGSLSUPP-2890](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2890): Договоры:
    
    * Настроена печатная форма договора для продукта "Персональный фонд Ультра" (PREEQUITYVTB).

- [ADIRGSLSUPP-2893](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2893): PF-3668_в продуктах ИСЖ из памятки ЦБ исключить информацию о рейтинге "Эксперт РА"

- [ADIRGSLSUPP-2896](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2896): Ошибка при валидации ФЛ по месту рождения. ВТБ Розница

- [ADIRGSLSUPP-2902](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2902): ВТБ (сегменты Прайм и Привилегия, в том числе новые территории) обновление ставок по продуктам "Драйвер Гарантия/Ультра"

- [ADIRGSLSUPP-2904](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2904): PF-3423_Инновационные решения_Стратегия на пять. Мой гарант_корректировка формулы расчета

- [ADIRGSLSUPP-2909](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2909): Импорт конфигураций:
    
    * Добавлено сравнение импортированных конфигураций.

- [ADIRGSLSUPP-2916](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2916): PF-3559_Изменение формы Анкеты оценки фин.грамотности_изменение даты релиза в настройке

- [ADIRGSLSUPP-2919](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2919): Поправлено отображение формы договора, добавлено лого с высотой в 97 пикселей

- [ADIRGSLSUPP-2928](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2928): Не реиндексировался платеж

- [ADIRGSLSUPP-2970](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2970): PF-3529_Маппинг_ доработка передачи схемы  лесенки КВ

- [ADIRGSLSUPP-2971](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2971): ВТБ_Базис Актив/Ультра(2.0)__новая стратегия_Российские технологии_правки по результатам тестирования

- [ADIRGSLSUPP-2977](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2977): Ошибка отображения лесенки КВ


### Fixed (9 changes)

- [ADIRGSLSUPP-2803](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2803): Не формируется план оплат как по мигрированным контрактам, так и по обычным

- [ADIRGSLSUPP-2873](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2873): Не отображается информация в документе АВР после изменения подхода к хранению данных

- [ADIRGSLSUPP-2881](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2881): Договоры:
    
    * Исправлена валидация минимального возраста застрахованного.

- [ADIRGSLSUPP-2884](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2884): В UI не обновляется информация по статусу платежей.

- [ADIRGSLSUPP-2898](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2898): Договоры:
    
    * Исправлена фильтрация договоров по activeDate.
    * Исправлена роль AccumulatedLifeVTBmass на AccumulatedLifeVTBMass

- [ADIRGSLSUPP-2937](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2937): Журнал платежей_не сортируются колонки «Номер платежа» и «Валюта»

- [ADIRGSLSUPP-2946](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2946): Кумуляция:
    
    * Исправлена ошибка подсчёта при изменении суммы риска.

- [ADIRGSLSUPP-2958](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2958): Исправление PROBLEMS-ов на 35-й платформе

- [ADIRGSLSUPP-2974](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2974): Договоры:
    
    * Исправлена ошибка фильтрации продуктов по ACTIVE_FROM и ACTIVE_TO (отображение продуктов под ролью Агент).

# 68.0.0-rc1 (2024-10-18)

### Breaking Changes (7 changes)

- [ADIRGSLSUPP-2556](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2556): Настройка продукта предДСЖ "Персональный фонд Ультра".

    После паблиша необходимо выполнить скрипт:
    database\sql\migration\ADIRGSLSUPP-2556-unit-linked-tables.sql

- [ADIRGSLSUPP-2660](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2660): PF-3559_Изменение формы Анкеты оценки фин.грамотности_разработка

    Для работы ранее созданных страхователей необходимо выполнить скрипт:

    \implementation\database\sql\migration\8.50_027.012.006_20241006221153_set_empty_fin_knowledge_questionnaire_2024.sql

    Он дополняет бодик данными новой анкеты на фин. изменение.

- [ADIRGSLSUPP-2752](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2752): Исправление генерации паролей пользователей при импорте

- [ADIRGSLSUPP-2769](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2769): Корректировочный скрипт для обновления схемы данных по ранее созданным верификаторам вложений.

    В любое время достаточно выполнить скрипт:
    database/sql/migration/ADIRGSLSUPP-2769-set-policyHolderType-property-on-old-attachment-verifiers.sql

- [ADIRGSLSUPP-2800](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2800): Fix claims creation

- [ADIRGSLSUPP-2808](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2808): Unblock user service fix

- [ADIRGSLSUPP-2826](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2826): Исправлен баг незаполения поля типа УЗ при импорте пользователей, добавлен датафикс для старых загрузок, добавлено поле пароля в выгрузке успешно загруженых УЗ

    Для датафикса любое время достаточно выполнить скрипт:
    database\sql\migration\ADIRGSLSUPP-2826-set-account-type-datafix.sql


### New Features (46 changes)

- [ADIRGSLSUPP-2102](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2102): Автоконверсия. Создание ДС. Разработка.

- [ADIRGSLSUPP-2294](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2294): ВТБ_Забота о семье/забота о семье ультра_Андерайтинг_правки по результатам повторного тестирования

- [ADIRGSLSUPP-2343-fix](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2343-fix): Fix api tests

- [ADIRGSLSUPP-2343](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2343): Реализация ручных ставок комиссии - Разработка

- [ADIRGSLSUPP-2370](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2370): Корректировка декларации в продукте "CAPCLCHILDOAS"

- [ADIRGSLSUPP-2401](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2401): Открытие продуктов EBGN IDG3NT IDG5NT

- [ADIRGSLSUPP-2456](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2456): Маппинг продукта Драйвер гарантия и Стратегия на пять Гарант ПСБ масс новые территории

- [ADIRGSLSUPP-2458](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2458): Конфигурация продуктов:

    * Все компоненты системы связанные с настройкой продукта будут использовать данные из БД (BFX_IMPL.PRODUCT_CONF) и/или из body договора, которые также были получены из БД.

- [ADIRGSLSUPP-2494](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2494): Исправление ошибки с выбором риска при его редактировании

- [ADIRGSLSUPP-2537](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2537): PF-3551_PF-3550_ВТБ_Забота о будущем/Ультра_увеличение срока действия программы

- [ADIRGSLSUPP-2542](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2542): Корректировка скрипта.

- [ADIRGSLSUPP-2589](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2589): Доработка функции impl_get_document

- [ADIRGSLSUPP-2590](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2590): Новая хранимая процедура в БД

- [ADIRGSLSUPP-2607](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2607): Добавлена возможность кастомизировать дефолтный комментарий вложения

- [ADIRGSLSUPP-2661](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2661): PF-3358_ВТБ_Базис Актив Ультра_лестничная конструкция_корректировка доработок

- [ADIRGSLSUPP-2665](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2665): Отражение и настройка сервисов по продуктам

- [ADIRGSLSUPP-2681](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2681): Изменение положения кнопки для скачивания в таблице вложений.

- [ADIRGSLSUPP-2739](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2739): PF-3536_ВТБ Розница_Стратегия на пять. Гарант_доработка триггеров комплаенс_разработка

- [ADIRGSLSUPP-2742](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2742): PF-3532-PF-3531_ВТБ_Ключевой выбор/Ультра_выплата в конце_правки по анкете

- [ADIRGSLSUPP-2747](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2747): PF-3614_Замена номера и даты доверенности Беловой Н.

- [ADIRGSLSUPP-2750](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2750): PF-3531_PF-3532_ВТБ_Ключевой выбор/Ультра_корректировка маппинга

- [ADIRGSLSUPP-2755](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2755): PF_3613_ПСБ Обновить печатные формы и декларации

- [ADIRGSLSUPP-2765](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2765): PF_3506_ВТБ_Исправление деклараций по результатам тестирования

- [ADIRGSLSUPP-2768](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2768): Таблицы конфигураций:

    * Переименованы столбцы «VERSION» в таблицах (BFX_IMPL.PRODUCT_CONF, BFX_IMPL.RATE_OF_RETURN, BFX_IMPL.STRATEGY_CONF, BFX_IMPL.STRATEGY_INSTRUMENTS) на «CONF_VERSION»

- [ADIRGSLSUPP-2771](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2771): PF_3615_ЗЕНИТ Драйвер Гарантия обновление ставок 07.10

- [ADIRGSLSUPP-2783](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2783): PF_3617_ВТБ Обновление ставок Драйвер Гарантия 08.10

- [ADIRGSLSUPP-2788](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2788): Оптимизирован запрос для выгрузки отчета по договорам.

- [ADIRGSLSUPP-2790](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2790): УБРиР_Забота о будущем_правки по результатам повторного тестирования

- [ADIRGSLSUPP-2791](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2791): ВТБ Привилегия_новые территории_ "Стратегия на пять. Гарант"_Добавление доп.сервисов + опросник по налоговому вычету

- [ADIRGSLSUPP-2793](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2793): PF-3490_Почта Банк реализация штрих-кода в печатных формах договора_Драйвер гарантия 5 лет

- [ADIRGSLSUPP-2794](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2794): PF_3490-Почта Банка корректировка печатных форм

- [ADIRGSLSUPP-2799](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2799): ВТБ_Базис Актив 2.0 Ошибка в печатной форме

- [ADIRGSLSUPP-2802](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2802): ВТБ. Ключевой выбор. Корректировка типа выплаты.

- [ADIRGSLSUPP-2805](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2805): PF_3623_PF_3621_ВТБ ПБ Обновление ставок

- [ADIRGSLSUPP-2806](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2806): PF_3622_ВТБ Привилегия и новые территории скорректировать границу лесенки

- [ADIRGSLSUPP-2812](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2812): Update PREPROD confs.

- [ADIRGSLSUPP-2820](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2820): PF-3536_ВТБ Розница(+ новые территории)_СНПГ_доработка триггеров комплаенс_доработка по результатам тестирования

- [ADIRGSLSUPP-2821](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2821): PF-3614_ПСБ_Базис Актив_ошибочно в печатной форме выводится заявления на выплату ДИД

- [ADIRGSLSUPP-2823](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2823): PF-3624_Инновационные решения "Стратегия на пять. Мой гарант" _доработка триггеров комплаенс

- [ADIRGSLSUPP-2827](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2827): Изменить email участников групп, для отправки уведомлений о поступлении задачи для групп ПОД/ФТ и Комплаенс.

- [ADIRGSLSUPP-2834](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2834): Доработка ролевой модели Заявки для Агентов ВТБ

- [ADIRGSLSUPP-2842](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2842): Update PROD confs.

- [ADIRGSLSUPP-2850](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2850): Лайф инвест/Инновационные решения_Драйвер Гарантия _ошибка печати электрополиса

- [ADIRGSLSUPP-2853](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2853): Импорт КСЖ:

    * Доработан вывод ошибок валидации на UI.

- [ADIRGSLSUPP-2862](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2862): Произведена оптимизация выгрузки отчета ИСЖ.

- [ADIRGSLSUPP-2865](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2865): ВТБ Привилегия_Забота о семье_Ошибка в системе по возрасту страхователя


### Fixed (9 changes)

- [ADIRGSLSUPP-2500](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2500): Не заполняется атрибут тип реестра в журнале платежей

- [ADIRGSLSUPP-2743](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2743): Агентские договоры:

    * Исправлена ошибка при создании АД.

- [ADIRGSLSUPP-2804](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2804): Обновление продуктов под миграцию

- [ADIRGSLSUPP-2811](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2811): массовая отмена платежей

- [ADIRGSLSUPP-2825](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2825): Коллективные договоры:

    * Исправлена ошибка при создании договора связанная с получением данных о конфигурации продукта.
    * Исправлена дата схема.

- [ADIRGSLSUPP-2828](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2828): Агентские договоры:

    * Исправлена ошибка получения конфигурации продуктов в АД на вкладке условия вознаграждения.

- [ADIRGSLSUPP-2841](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2841): Импорт КСЖ:

    * Отключена проверка тарифа при импорте, как было до переноса конфигураций в БД.
    * Добавлена конфигурация продукта при создании договора.
    * Добавлена проверка наличия вложений.

- [ADIRGSLSUPP-2845](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2845): Исправлена ошибка при создании ФЛ из карточки договора.

- [ADIRGSLSUPP-2848](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2848): Коллективные договоры:

    * Исправлена фильтрация продуктов.

# 67.0.0-rc1 (2024-10-03)

### Breaking Changes (4 changes)

- [ADIRGSLSUPP-2176](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2176): Продуктовые настройки:

    * Добавлен скрипт для старта оперативной работы.
    * Добавлено обновление product configuration в common_body.

    > :warning:
    > После паблиша выполнить по порядку:
    1. Выполнить database\sql\migration\ADIRGSLSUPP-2176-Product-configuration-update-contracts-body-cashback-only.sql
    Можно начинать работу с договорами.
    2. Выполнить database\sql\migration\ADIRGSLSUPP-2176-Product-configuration-update-contracts-body.sql

- [ADIRGSLSUPP-2391](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2391): КСЖ:

    * Исправлена ошибка при создании ДС на нефин. изменения.

    > После паблиша выполнить запрос:
    database\sql\migration\ADIRGSLSUPP-2391-Update-contracts-empty-body-from-origin-document.sql

- [ADIRGSLSUPP-2624](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2624): Вложения:

    * В утилиту по работе с вложениями, добавлен функционал сохранения вложений в хранилище в зависимости от расширения вложений.

    > Выполнить сохранить в хранилище в соответствии с документацией:
    docs\administration\AttachmentsTool.md
    > После того как вложения были сохранены в хранилище выполнить скрипт:
    database\sql\migration\ADIRGSLSUPP-2624-Update-attachments-extensions-by-media-type.sql

- [ADIRGSLSUPP-2634](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2634): После установки обновления необходимо переиндексировать activities


### New Features (52 changes)

- [ADIRGSLSUPP-2167](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2167): Передача портфеля: ETL-сервис для отбора данных - разработка - ч2

- [ADIRGSLSUPP-2260](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2260): Реестр_Стратегия на пять Гарант ВТБпривилегия передача сервисов FIN4 и MED85 (00792), СНПГУ MED96 и MED97 (00791)

- [ADIRGSLSUPP-2314](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2314): ВТБ. Стратегия на пять. Гарант.Корректировка дат.

- [ADIRGSLSUPP-2343](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2343): Реализация ручных ставок комиссии

- [ADIRGSLSUPP-2392](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2392): Почта банк_реализация штрих-кода на печатных формах договора.

- [ADIRGSLSUPP-2409](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2409): ВТБ_На всякий случай Ультра. Ошибка в номере договора

- [ADIRGSLSUPP-2437](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2437): Добавлена возможность создавать XML-файлы для ФНС на основе справок для налоговой

- [ADIRGSLSUPP-2465](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2465): PF-3506_Корректировка шаблонов договоров продуктов в соответствии с требованиями 152-ФЗ и ФНС_анализ

- [ADIRGSLSUPP-2471](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2471): Переименован блок выгодоприобретателей на случай других рисков
    Изменены ограничения по рискам для этого блока

- [ADIRGSLSUPP-2480](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2480): Update PROD confs.

- [ADIRGSLSUPP-2511](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2511): Доработки журнала платежей

- [ADIRGSLSUPP-2531](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2531): Ошибка импорта договоров КСЖ.

- [ADIRGSLSUPP-2535](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2535): Исправлен датасурс для отбора табельного номера агента в документе "передача портфеля"

- [ADIRGSLSUPP-2542](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2542): Доработан документ "Справка для налоговой"

- [ADIRGSLSUPP-2558](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2558): PF-3504_доработка отображения доп сервисов от минимального взноса

- [ADIRGSLSUPP-2561](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2561): Массовая отмена идентификаций и платежей

- [ADIRGSLSUPP-2562](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2562): УБРиР_настройка продукта «Забота о будущем»

- [ADIRGSLSUPP-2568](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2568): Создание миграционных продуктов_сентябрь 2024

- [ADIRGSLSUPP-2569](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2569): PF_3560_ВТБ_ПСБ Продление графика траншей

- [ADIRGSLSUPP-2587](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2587): Change translation for "open" word

- [ADIRGSLSUPP-2608](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2608): PF-3531_PF-3532_ВТБ_Ключевой выбор/Ультра_доработка печатных форм

- [ADIRGSLSUPP-2615](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2615): УБРиР Драйвер Гарантия 2,3,5 лет обновление ставок

- [ADIRGSLSUPP-2618](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2618): PF-3561/3562/3563/3564_Обновление ставок и кэшбэков 23.09

- [ADIRGSLSUPP-2619](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2619): Оптимизация запроса по выгрузке из ЖУД.

- [ADIRGSLSUPP-2620](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2620): Ключевой выбор/Ультра_корректировка

- [ADIRGSLSUPP-2621](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2621): PF-3226_Маппинг_Драйвер гарантия ультра 1 год

- [ADIRGSLSUPP-2625](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2625): Обновление ставок ДГ 1 год ВТБ

- [ADIRGSLSUPP-2628](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2628): ADIRGSLUPP-2628: Маппинг Ключевой выбор и Ультра (выплата в конце) ВТБ 00848 00849
    ADIRGSLUPP-2633: Маппинг Забота о будущем УБРиР 00818

- [ADIRGSLSUPP-2632](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2632): УБРиР_Драйвер Гарантия 2,3,5 лет_правка по результатам тестирования Андерайтеров

- [ADIRGSLSUPP-2635](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2635): Сбой работы триггера 70+ для продукта "Драйвер Гарантия" ПБ

- [ADIRGSLSUPP-2636](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2636): Update PREPROD confs.

- [ADIRGSLSUPP-2638](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2638): ПСБ_Драйвер Гарантия новые территории_ правка по результатам тестирования Андерайтеров

- [ADIRGSLSUPP-2639](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2639): PF-3358_ВТБ Прайм_Базис Актив Ультра_маппинг лесничной конструкции

- [ADIRGSLSUPP-2640](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2640): PF-3506_ВТБ_Базис Актив Забота о будущем внести исправления по печатным формам

- [ADIRGSLSUPP-2641](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2641): Update TEST configs.

- [ADIRGSLSUPP-2642](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2642): ОАС. Недоступны продукты

- [ADIRGSLSUPP-2645](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2645): PF-3532_PF-3531_ВТБ_Ключевой выбор_выплата в конце_корректировки печатных форм

- [ADIRGSLSUPP-2646](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2646): PF-3549_ОАС_Стань миллионером Оптима исправления по результатам тестирования

- [ADIRGSLSUPP-2649](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2649): ВТБ_Драйвер гарантия 1 год_правка по результатам тестирования

- [ADIRGSLSUPP-2652](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2652): Карточка контрагента_номер телефона_обязательное поле для заполнения

- [ADIRGSLSUPP-2654](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2654): PF-3422_Стратегия на пять. Гарант/Ультра_добавление сервисов_правки по результатам тестирования

- [ADIRGSLSUPP-2656](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2656): PF-3576_PF-3571_ОАС_ПОЧТА_БАНК Обновить ставки

- [ADIRGSLSUPP-2663](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2663): УБРиР_Забота о будущем_правки по результатам тестирования

- [ADIRGSLSUPP-2667](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2667): Дата-фикс для колонки REFERENCE NO

- [ADIRGSLSUPP-2669](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2669): Рефакторинг для использования атрибута REFERENCE NO

- [ADIRGSLSUPP-2737](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2737): ВТБ. Базис актив Ультра.корректировка дат

- [ADIRGSLSUPP-2741](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2741): PF-3422_ВТБ_Стратегия на пять. Гарант/Ультра_исправление ошибки

- [ADIRGSLSUPP-2744](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2744): Теперь XML-файлы создаются для справок только в статусе "Подтверждена"

- [ADIRGSLSUPP-2745](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2745): ВТБ_Базис Актив/Ультра(2.0)__новая стратегия_Российские технологии

- [ADIRGSLSUPP-2759](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2759): Тестирование 66.0.6. Проблемы с отображением.

- [ADIRGSLSUPP-2765](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2765): PF_3506_ВТБ_Исправления деклараций по результатам тестирования

- [ADIRGSLSUPP-2766](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2766): ВТБ(привилегия)_Драйвер гарантия 1 год_Анкета 70+


### Fixed (3 changes)

- [ADIRGSLSUPP-2174](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2174): Импорт конфигураций:

    * Добавлена проверка корректности дат при импорте.
    * Добавлен параллельный импорт строк.

- [ADIRGSLSUPP-2627](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2627): 65.0.15.Предпрод Ошибки в витрине задач

- [ADIRGSLSUPP-2659](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2659): Коллективные договоры:

    * Исправлена схема данных.

# 66.0.0-rc1 (2024-09-18)

### Breaking Changes (5 changes)

- [ADIRGSLSUPP-2174](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2174): Настройки лесенки КВ:

    * Перенесены в БД.
    * Создан документ импорта настроек из rateOfReturnRules.
    * При расчёте variant, rateOfReturn, cashback, rko, participationCoeff, manualRate в новых договорах будут использоваться значения из БД.

    > :warning:
    > Перед паблишем выполнить запрос:
    ```
    DROP TABLE IF EXISTS BFX_IMPL.PRODUCT_CONF
    ```

    > :warning:
    > После паблиша необходимо выполнить импорт конфигурации лесенки КВ в БД через UI в соответствии с документацией docs\administration\RateOfReturn.md
    > После паблиша необходимо выполнить импорт конфигурации продуктов в БД через UI в соответствии с документацией docs\administration\ProductConfiguration.md

- [ADIRGSLSUPP-2175](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2175): Настройки конфигурации и инструментов стратегий:

    * Перенесены в БД (BFX_IMPL.STRATEGY_CONF и BFX_IMPL.STRATEGY_INSTRUMENTS).
    * Создан документ импорта настроек из strategyConfiguration.
    * Создан документ импорта настроек из strategyInstruments.
    * При выборке конфигурации и инструментов стратегий в новых договорах будут использоваться значения из БД.

    > :warning:
    > После паблиша необходимо выполнить импорт конфигурации стратегий в БД через UI в соответствии с документацией docs\administration\StrategyConfiguration.md
    > После паблиша необходимо выполнить импорт конфигурации инструментов в БД через UI в соответствии с документацией docs\administration\StrategyInstruments.md

- [ADIRGSLSUPP-2176](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2176): Продуктовые настройки:

    * Перенесены в БД.
    * Создан документ импорта настроек из productConfiguration.
    * При расчёте cashBackCoeff в премиях и ПФ на новых договорах будет использоваться значение из БД.

    > :warning:
    > Перед паблишем выполнить запрос:
    ```
    DROP TABLE IF EXISTS BFX_IMPL.STRATEGY_INSTRUMENTS
    ```

    > :warning:
    > После паблиша:
    > Выполнить импорт конфигурации продуктов в БД через UI в соответствии с документацией docs\administration\ProductConfiguration.md
    > Выполнить импорт конфигурации инструментов в БД через UI в соответствии с документацией docs\administration\StrategyInstruments.md
    > Выполнить database/sql/migration/ADIRGSLSUPP-2176-Product-configuration-update-contracts-body.sql
    > Выполнить database/sql/migration/ADIRGSLSUPP-2176-Strategy-instruments-update-contracts-body.sql

- [ADIRGSLSUPP-2232](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2232): Добавлен механизм внутреннего уведомления СФМиК. При негативном срабатывании сервиса КПК при проверке страхователя на договоре, на который сквитован платёж, будет выслан e-mail.

    Следующие скрипты нужно выполнить до паблиша:
    database\sql\Data\8.50_027.012.006_20240903074926_adirgslsupp_2232.sql
    database\sql\Schema\8.50_027.012.006_20240902065133_adirgslsupp_2232.sql

- [ADIRGSLSUPP-2440](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2440): Скорректирована выгрузка отчета из журнала договоров.

    После паблиша необходимо выполнить скрипт:
    database\sql\migration\ADIRGSLSUPP-2440-contracts-report-fill.sql


### New Features (90 changes)

- [ADIRGSLSUPP-1715](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1715): Добавлены верификации на коллективные договоры

- [ADIRGSLSUPP-1908](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1908): Увеличет лимит выделяемой памяти на DB контейнер для локальных сред.

- [ADIRGSLSUPP-2077](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2077): Обновление таблицы bfx_impl.RISK_PRODUCT_RELATION

- [ADIRGSLSUPP-2102](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2102): Автоконверсия. Создание ДС. Разработка.

- [ADIRGSLSUPP-2103](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2103): Автоконверсия. Отчет в UI по договорам в случае, когда не удалось автосоздание

- [ADIRGSLSUPP-2119](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2119): ВТБ_ПСБ_Базис Актив_Замена ЛОББ по риску Смерть НС

- [ADIRGSLSUPP-2158](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2158): Обновление доп сервисов. схлопывание.

- [ADIRGSLSUPP-2160](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2160): Portfolio movement

- [ADIRGSLSUPP-2167](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2167): Передача портфеля: ETL-сервис для отбора данных - разработка - ч2

- [ADIRGSLSUPP-2218](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2218): Редактирование уровня риска сотрудниками комплайенс

- [ADIRGSLSUPP-2260](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2260): Реестр_Стратегия на пять Гарант ВТБпривилегия передача сервисов FIN4 и MED85 (00792), СНПГУ MED96 и MED97 (00791)

- [ADIRGSLSUPP-2306](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2306): ПСБ_ДГ_Особые условия договора

- [ADIRGSLSUPP-2313](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2313): изменеие даты открытия новых пунктов декларации ebmgretvtb.

- [ADIRGSLSUPP-2314](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2314): ВТБ.Стратегия на пять.Гарант/Ультра.Доп.сервисы

- [ADIRGSLSUPP-2338](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2338): Инновационные решения_видимость продуктов КСЖ БФКО для проекта "Стратегия на пять. Мой гарант"_разработка

- [ADIRGSLSUPP-2340](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2340): Корректировка рисков для кумуляции.

- [ADIRGSLSUPP-2341](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2341): Правка декрарацмй по результатам третьего тестирования

- [ADIRGSLSUPP-2342](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2342): ВТБ розница_Стратегия на пять. Гарант_печать правил страхования
    Корректировка перевода

- [ADIRGSLSUPP-2359](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2359): ВТБ.Базис Актив Ультра.Корректировка ставок.

- [ADIRGSLSUPP-2364](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2364): Корректировка деклараций в ПО для продукта "IBAP3"

- [ADIRGSLSUPP-2365](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2365): Правки в печатной форме договора для продукта "CAPCLRELOAS"

- [ADIRGSLSUPP-2368](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2368): Ошибки в ПФ декларации по продукту EHVP2

- [ADIRGSLSUPP-2370](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2370): Корректировка декларации в продукте "CAPCLCHILDOAS"

- [ADIRGSLSUPP-2390](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2390): УБРиР_запуск продукта "Драйвер Гарантия"_2,3,5 лет, рубли

- [ADIRGSLSUPP-2400](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2400): ошибка отображения статуса убытка и статуса договора в журнале Поиска убытков

- [ADIRGSLSUPP-2401](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2401): Добавление продуктов СНПГ , ДГ 3,5 лет для ПСБ масс

- [ADIRGSLSUPP-2412](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2412): Создание миграционных продуктов_август 2024

- [ADIRGSLSUPP-2418](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2418): Маппинг Стратегия на пять Гарант 00845 ВТБ новые территории

- [ADIRGSLSUPP-2419](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2419): Зенит. Забота о будущем.

- [ADIRGSLSUPP-2420](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2420): ВТБ. Ключевой выбор.

- [ADIRGSLSUPP-2421](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2421): PF-3358_ВТБ Прайм_Базис Актив Ультра_Настройка лестничной конструкции_доработка по новым требованиям

- [ADIRGSLSUPP-2425](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2425): Замена конфигурационных файлов прод и предпрод сред.

- [ADIRGSLSUPP-2428](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2428): ВТБ_Стратегия на пять.Гарант/Ультра_добавление сервисов

- [ADIRGSLSUPP-2429](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2429): Почта_Банк Драйвер Гарантия 5 лет смена ставок

- [ADIRGSLSUPP-2430](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2430): ВТБ_Стратегия на пять.Гарант/Ультра_добавление функционала сервиса

- [ADIRGSLSUPP-2432](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2432): Настройка видимости лестничной конструкции для пользователя

- [ADIRGSLSUPP-2433](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2433): Маппинг ВТБ ДГ Новые территории

- [ADIRGSLSUPP-2434](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2434): PF-3501_ВТБ_Прайм_Привелегия Драйвер гарантия обновление ставок

- [ADIRGSLSUPP-2435](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2435): ВТБ Драйвер Гарантии ошибка в лестничной конструкции

- [ADIRGSLSUPP-2438](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2438): Зенит_Забота о будущем_настройка_доработка

- [ADIRGSLSUPP-2442](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2442): Добавление допника по передаче портфеля на КСЖ, ДМС, ДСЖ, РСЖ

- [ADIRGSLSUPP-2445](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2445): PF-3502_Смена КВ Базис Актив/Забота о семье

- [ADIRGSLSUPP-2447](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2447): Исправление ошибки при попытке изменить пароль у пользователя

- [ADIRGSLSUPP-2448](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2448): Обновлены конфигурационные файлы для ТЕСТ среды.

- [ADIRGSLSUPP-2453](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2453): ВТБ Розница Привилегия Стратегия на пять. Гарант новые территории правка по результатам тестирования

- [ADIRGSLSUPP-2454](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2454): PF-3308_PF-3307_ВТБ_Ключевой выбор

- [ADIRGSLSUPP-2455](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2455): PF-3505_ВТБ_ДГ смена ставок с 02.09

- [ADIRGSLSUPP-2456](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2456): Маппинг продукта Драйвер гарантия и Стратегия на пять Гарант ПСБ масс новые территории

- [ADIRGSLSUPP-2461](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2461): PF-3497_Зенит_Забота о будущем_корректировка по результатам тестирования

- [ADIRGSLSUPP-2465](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2465): PF-3506_Корректировка шаблонов договоров продуктов в соответствии с требованиями 152-ФЗ и ФНС_анализ

- [ADIRGSLSUPP-2468](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2468): Необходимо скорректировать настройки securityScope по Росбанку

- [ADIRGSLSUPP-2470](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2470): Просьба создать риск - I36404

- [ADIRGSLSUPP-2472](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2472): Внесены корректировки в маппинг XML-файлов для РосФинМониторинга

- [ADIRGSLSUPP-2473](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2473): PF-3308_PF-3307_Маппинг_ВТБ_Ключевой выбор/Ультра 00829, 00830

- [ADIRGSLSUPP-2474](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2474): Увеличен таймаут на выгрузке отчета по договорам.

- [ADIRGSLSUPP-2475](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2475): PF-3430_ВТБ_розница_Стратегия на пять. Гарант_новые требования по триггерам

- [ADIRGSLSUPP-2477](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2477): change IDGP1VTB IDGPN1VTB

- [ADIRGSLSUPP-2481](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2481): ВТБ_Пивелегия/Розница_ПСБ_ Стратегия на пять. Еарант/ Драйвер гарантия (новые территории)_правка по результатам тестирования

- [ADIRGSLSUPP-2483](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2483): ВТБ.Ключевой выбор. Корректировка продукта.

- [ADIRGSLSUPP-2484](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2484): PF-3307_PF-3308_ВТБ_Ключевой выбор/Ультра_правки по результатам тестирования

- [ADIRGSLSUPP-2488](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2488): Маппинг Забота о будущем Зенит, 00818

- [ADIRGSLSUPP-2491](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2491): PF-3497_Зенит_Забота о будущем_доработки по результатам теста

- [ADIRGSLSUPP-2492](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2492): Зенит. Забота о будущем. Правки в продукте.

- [ADIRGSLSUPP-2493](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2493): Заполнение дочерних подразделений в журнале договоров

- [ADIRGSLSUPP-2494](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2494): Исправление ошибки с выбором риска при его редактировании

- [ADIRGSLSUPP-2498](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2498): Доработка работы подарочных сервисов после схлопывания доп сервисов

- [ADIRGSLSUPP-2501](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2501): Фикс дублирования продуктов в фильтре журнала договоров

- [ADIRGSLSUPP-2503](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2503): Доработка поисковика в орг. структуре / поиск по коду ДО

- [ADIRGSLSUPP-2505](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2505): Оптимизирована выгрузка отчета из журнала договоров.

- [ADIRGSLSUPP-2507](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2507): PF-3308_ВТБ_Ключевой выбор_корректировки по результатам тестирования

- [ADIRGSLSUPP-2508](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2508): Некорректно работает валидация на ДС на фин.изменение после разработки Автоконверсии

- [ADIRGSLSUPP-2519](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2519): Заменить ЛЛОБ в маппинге БА

- [ADIRGSLSUPP-2520](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2520): PF-3358_ВТБ_Базис актив ультра_некорректно рассчитывает информацию о размерах агентского вознаграждения_для памятки ЦБ

- [ADIRGSLSUPP-2523](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2523): Корректировка маппинга сервиса по модификации договоров

- [ADIRGSLSUPP-2525](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2525): ADS-12607_Почта Банк_Ошибка конвертации файлов JPG в PDF

- [ADIRGSLSUPP-2526](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2526): Зенит.Забота о будущем.Декларация, правки.

- [ADIRGSLSUPP-2529](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2529): Маппинг Драйвер Гарантия 00794, 00664, 00665 УБРиР

- [ADIRGSLSUPP-2530](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2530): ВТБ.Замена риска.Ключевой выбор.

- [ADIRGSLSUPP-2536](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2536): PF-3549_ОАС_Стань миллионером. Оптима

- [ADIRGSLSUPP-2538](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2538): Зенит. Забота о будущем. Открытие продукта.

- [ADIRGSLSUPP-2543](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2543): Настроен экспорт для следующих конфигурации в БД:

    * Конфигурация продуктов
    * Конфигурация лесенки КВ
    * Конфигурация стратегий
    * Конфигурация инструментов стратегий

- [ADIRGSLSUPP-2563](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2563): ВТБ.Ключевой выбор выплата в конце.

- [ADIRGSLSUPP-2570](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2570): Маппинг Драйвер Гарантия 1год новые территории ВТБ-привилегия, 00619

- [ADIRGSLSUPP-2575](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2575): PF-3422_ВТБ_Стратегия на пять. Гарант/Ультра-печатные формы сервисов

- [ADIRGSLSUPP-2576](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2576): правки по результатам тестирования доп сервисов

- [ADIRGSLSUPP-2578](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2578): Правки по результатам тестирования УБРиР и ДГ 1 год ВТБ

- [ADIRGSLSUPP-2580](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2580): PF-3467_ВТБ Розница_безбумажное оформление

- [ADIRGSLSUPP-2581](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2581): ВТБ.Ключевой выбор.Открытие продукта.

- [ADIRGSLSUPP-2610](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2610): Обновлены конфигурационные файлы для среды ПРОД.

- [ADIRGSLSUPP-2612](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2612): Доработать реестр выгрузки договоров в САП


### Fixed (8 changes)

- [ADIRGSLSUPP-2055](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2055): Analysis of big artifacts

- [ADIRGSLSUPP-2355](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2355): Не отображаются платежи при импорте реестра

- [ADIRGSLSUPP-2391](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2391): КСЖ:

    * Исправлена ошибка при создании ДС на нефин. изменения.

- [ADIRGSLSUPP-2411](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2411): Дедупликация:

    * Исправлены ошибки контекста функций.

- [ADIRGSLSUPP-2457](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2457): Ошибка отображения статуса оплаты взноса в графике платежей

- [ADIRGSLSUPP-2490](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2490): Ошибка_на среде разработке_при попытке оформить/сохранить договор

- [ADIRGSLSUPP-2611](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2611): Исправлены ошибки при открытии формы создания заявок.

- [ADIRGSLSUPP-755](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-755): Изменение сервиса загрузки платежей по опредеденному GUID

# 65.0.0-rc1 (2024-08-20)

### Breaking Changes (10 changes)

- [ADIRGSLSUPP-1391](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1391): Кумуляция:

    * Исправлены ошибки подсчета.
    * Переработан вывод результата по группам рисков.

    > :memo: **Перед паблишем выполнить скрипт:**
    > :warning: **Внимание! После выполнения скрипта все старые результаты кумуляции по всем договорам будут удалены. Сохраните котировку для получения актуальных данных кумуляции.**
    ```database\sql\migration\ADIRGSLSUPP-1391-Clean-old-cumulation-data-in-analytical-subsystem.sql```

- [ADIRGSLSUPP-1502](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1502): Исправлена гуляющая копейка в КВ в АВР, изменено поведение ссылки на АВР во всплывающем окне, исправлен баг с заполнением ручного КВ

    Необходимо выполнить следующий скрипт по добавлению нового столбца:
    database/sql/Schema/8.50_027.012.006_20240507081937_adirgslsupp_1502.sql

- [ADIRGSLSUPP-1671](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1671): Кумуляция:

    * Исправлены ошибки подсчета.
    * Переработан вывод результата по группам рисков.
    * Оптимизирована выборка документов для подсчета.

    > :memo: **После паблиша выполнить скрипт:**
    > :warning: **Внимание! После выполнения скрипта все старые результаты кумуляции по всем договорам будут удалены. Сохраните котировку для получения актуальных данных кумуляции.**
    ```database\sql\migration\ADIRGSLSUPP-1671-Clean-old-cumulation-results.sql```

- [ADIRGSLSUPP-1837](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1837): Разработка коллективных убытков. Адаптация существующего кода.

    **Доп сведения**
    Должен быть выполнен автоматический скрипт: 8.50_027.012.006_20240516133044_insured_event_types_update.sql

- [ADIRGSLSUPP-2020](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2020): Кумуляция:

    * Удалены лишние данные в ДС на отмену и восстановление.

    > :memo: **Выполнить скрипт до или после паблиша:**
    > :warning: **Внимание! Выполнить только вторую часть скрипта (ДС на отмену и восстановление).**
    ```database\sql\migration\ADIRGSLSUPP-1671-Clean-old-cumulation-results.sql```

- [ADIRGSLSUPP-2070](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2070): Кумуляция:

    **Deployment notes**

    Добавлена настройка включения кумуляции в конфигурационный файл среды environmentVariables.json.
    Для включения кумуляции значение должно быть "true"
    ```
    "rgsl.cumulation.enabled": "true"
    ```

- [ADIRGSLSUPP-2147](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2147): Кумуляция:

    * Исправлены ошибки.

    > :memo: **Перед паблишем выполнить скрипт:**
    > :warning: **Внимание! После выполнения скрипта все старые результаты кумуляции по всем договорам будут удалены. Сохраните котировку для получения актуальных данных кумуляции.**
    ```database\sql\migration\ADIRGSLSUPP-1391-Clean-old-cumulation-data-in-analytical-subsystem.sql```

- [ADIRGSLSUPP-2179](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2179): Кумуляция:

    * Удалены старые валидации схемы данных в common body (validations.schemaValidations), которые были записаны когда схема данных не соответствовала данным.

    > :memo: **До или после паблиша выполнить скрипт:**
    ```database\sql\migration\ADIRGSLSUPP-2179-Clean-common-body-schema-validation-by-message.sql```

- [ADIRGSLSUPP-2213](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2213): Кумуляция:

    * При расчете значение страховой суммы будет использоваться без учета коэффициента кэшбэка.

    > :memo: **Выполнить скрипты после паблиша строго по порядку:**
    1. ```database\sql\migration\ADIRGSLSUPP-2213-Insured-sum-without-cashback.sql```
    2. ```database\sql\migration\ADIRGSLSUPP-2213-Insured-sum-without-cashback-default.sql```
    3. ```database\sql\migration\ADIRGSLSUPP-2213-Insured-sum-without-cashback-body-default.sql```
    4. ```database\sql\migration\ADIRGSLSUPP-2213-Insured-sum-without-cashback-body.sql```

    > :warning: **Сохраните котировку для получения актуальных данных кумуляции.**

- [ADIRGSLSUPP-28](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-28): Добавлен Номер САД с инициатора в договоры страхования

    Для апдейта договоров необходимо запустить скрипт бэкапа:
    database\sql\migration\ADIRGSLSUPP-28-add-sad-to-contracts-backup.sql

    Затем нужно запустить скрипт апдейта:
    database\sql\migration\ADIRGSLSUPP-28-add-sad-to-contracts.sql


### New Features (321 changes)

- [ADIRGSLSUPP-1007](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1007): Create ETLs

- [ADIRGSLSUPP-1091](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1091): Рефакторинг кода убытков для удаления устаревшего кода

- [ADIRGSLSUPP-1146](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1146): Добавлена доп проверка авторизации для dataSource и dataExport.

- [ADIRGSLSUPP-1166](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1166): Доработка процедуры ARCHIVE_FILE_METADATA.

- [ADIRGSLSUPP-1191](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1191): Set correct organization data on click refresh button on AA's additional agreement

- [ADIRGSLSUPP-1225](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1225): корректировка таблицы доп. сервисов.

- [ADIRGSLSUPP-1268](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1268): Добавлен триггер для перенаправления в СК, в случае, если у контрагента-страхователя указан документ "Загранпаспорт"

- [ADIRGSLSUPP-1269](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1269): Налоговые справки

- [ADIRGSLSUPP-1278](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1278): Rename fields in filters and translations

- [ADIRGSLSUPP-1279](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1279): Исправлены следующие замечания по АВР:
    Удалены некоторые столбцы из грида и выгрузки
    Добавлено в грид и выгрузку поле "Класс расторжения"
    Исправлены поля "ЮРИДИЧЕСКАЯ ДАТА РАСТОРЖЕНИЯ" и "ФАКТИЧЕСКАЯ ДАТА РАСТОРЖЕНИЯ"
    Теперь АВР из журнала АВР открывается в новой вкладке

- [ADIRGSLSUPP-1280](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1280): Change client commission export format

- [ADIRGSLSUPP-1338](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1338): настройка дубликатов КСЖ БФКО, правки в ПФ revert

- [ADIRGSLSUPP-142](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-142): Agent agreement tab rework

- [ADIRGSLSUPP-1447](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1447): Change control's position on agent agreement award conditions view

- [ADIRGSLSUPP-1494](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1494): Agent agreement number by default rework

- [ADIRGSLSUPP-1513](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1513): Переработка расчета ДИД для дожитий и расторжений.

- [ADIRGSLSUPP-1523](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1523): Доработка расчета НДФЛ для ДС на расторжение

- [ADIRGSLSUPP-1527](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1527): Кастомный сервис создания РНВ на возвраты ДС - анализ и разработка

- [ADIRGSLSUPP-1541](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1541): Оценка сроков копирования продукта "Стратегия на пять. Гарант" (Инновационные решения) для нового партнера

- [ADIRGSLSUPP-1542](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1542): Editing curator in contracts

- [ADIRGSLSUPP-1546](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1546): ПФ. Признак Вариант программы для лесенки вывести в печатную форму договора

- [ADIRGSLSUPP-1584](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1584): Добавлен этап установки scheduler.

- [ADIRGSLSUPP-159](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-159): Доработка поисковика по структуре - анализ

- [ADIRGSLSUPP-1595](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1595): Настроен функционал андеррайтинга для продуктов Забота о семье, Забота о семье Ультра ВТБ

- [ADIRGSLSUPP-1597](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1597): Правки ДГ 2 года ЗЕНИТ

- [ADIRGSLSUPP-1606](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1606): Добавлены уведомления о выполнении импорта платежей.

- [ADIRGSLSUPP-1623](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1623): Правки печатных БА ПСБ

- [ADIRGSLSUPP-1631](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1631): Инновационные решения_КСЖ ПДП_Стратегия на пять. Мой гарант. Доработка текстов СМС и эл.писем - разработка

    Уведомление при создании договора:

    * Исправлена ошибка с пустым кодом продукта.
    * Добавлено изображение документа.

- [ADIRGSLSUPP-1660](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1660): Создание продуктов под миграцию

- [ADIRGSLSUPP-1662](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1662): Исправления по результатам тестирования Базис Актив Премиум 2.0

- [ADIRGSLSUPP-1672](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1672): Исправление ошибки отправки юристом убытка с причиной "Отказ".

- [ADIRGSLSUPP-1677](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1677): 63 релиз. Ошибка_Не отрабатывает джоб RepostAaCommissionChanges

- [ADIRGSLSUPP-1694](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1694): Отключение SendElmaEvent

- [ADIRGSLSUPP-1695](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1695): Лайф Инвест_запуск продукта "Драйвер Гарантия" (копия Инновационные решения)

- [ADIRGSLSUPP-1703](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1703): Исправлен расчёт НДС в АВР в строках с доп. КВ

- [ADIRGSLSUPP-1704](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1704): Исправлено поведение значения "тип кв" в выгрузке данных АВР

- [ADIRGSLSUPP-1705](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1705): Добавлена возможность изменять и сохранять дату получения оригинала АВР

- [ADIRGSLSUPP-1711](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1711): Исправлена надпись на диалоговом окне после смены статуса АВР в журнале

- [ADIRGSLSUPP-1724](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1724): Смена ставок и закрытие продукта ДГ ВТБ с 15.04

- [ADIRGSLSUPP-1726](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1726): Доработки по продукту СНПГ Лайф Инвест

- [ADIRGSLSUPP-1736](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1736): Исправлены опечатки в документе передача портфелей

- [ADIRGSLSUPP-1737](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1737): Настройка Базис Актив Ультра"Ключевой выбор" и "Ключевой выбор Ультра" для ВТБ Прайм и привелегии

- [ADIRGSLSUPP-1738](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1738): Настройка ПФ Базис Актив Ультра"Ключевой выбор" для ВТБ Прайм

- [ADIRGSLSUPP-1739](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1739): Базис Актив Ультра"Ключевой выбор" расчет и хранение графика

- [ADIRGSLSUPP-1740](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1740): Хранение дисконта по продукту Базис Актив Ультра"Ключевой выбор"

- [ADIRGSLSUPP-1743](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1743): Добавить в печатные ПЭП формы информацию о подписании договора клиентом

- [ADIRGSLSUPP-1749](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1749): ВТБ Розница_ПЭП_Печатные формы "Стратегия на пять. Гарант"

- [ADIRGSLSUPP-1766](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1766): ВТБ Привелегия_правки по результатам тест 70+

- [ADIRGSLSUPP-1771](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1771): ошибка отображения статуса убытка и статуса договора в журнале Поиска убытков

- [ADIRGSLSUPP-1779](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1779): Добавлена типизация УЗ и правлиа задания пароля.

- [ADIRGSLSUPP-1781](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1781): Черепик задач по настройке продукта Забота о семье (ECOFPVTB) / Забота о семье Ультра (ECOFVVTB)

    Изменения включены из задач:
        1) https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1620
        2) https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1699
        3) https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1731
        4) https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1763
        5) https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1772
        6) https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1806
        7) https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1781

- [ADIRGSLSUPP-1791](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1791): ВТБ Прайм Базис Актив Ультра"Ключевой выбор" Тип графика ДИД

- [ADIRGSLSUPP-1794](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1794): Инновационные решения_создание ролей для скрытия продукта

- [ADIRGSLSUPP-1795](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1795): Исправление ошибки при поиске договоров страхования пользователем с ограниченными правами.

- [ADIRGSLSUPP-1804](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1804): Add registry type field in ES and report

- [ADIRGSLSUPP-1805](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1805): Добавлен фильтр по ФИО для списка застрахованных на коллективных договорах

- [ADIRGSLSUPP-1809](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1809): НСЖ:

    * Добавлена секция "Базовые параметры инвестирования".

- [ADIRGSLSUPP-1818](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1818): Почта Банка_Драйвер гарантия_анализ

- [ADIRGSLSUPP-1819](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1819): Почта Банк_Стратегия на пять. Гарант._анализ

- [ADIRGSLSUPP-1821](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1821): ВТБ_Драйвер гарантия_анкета 70+_результат тестирования на доработку

- [ADIRGSLSUPP-1822](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1822): Пустой лист при печати заявления

- [ADIRGSLSUPP-1824](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1824): Росфинмониторинг:

    * Добавлено игнорирование незаполненных тегов при формировании файла xml для РФМ через UI.
    * Доработано дефолтное заполнение атрибутов.

- [ADIRGSLSUPP-1825](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1825): ВТБ розница_Стратегия на пять. Гарант_оценка доработок для ЭП

- [ADIRGSLSUPP-1828](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1828): ВТБ. Создание продукта Стратегия на пять. Гатант с ЭП

- [ADIRGSLSUPP-1831](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1831): ВТБ_На всякий случай Ультра_замена программ страхования

- [ADIRGSLSUPP-1832](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1832): Маппинг Забота о семье и Забота о семье Ультра для ВТБ (00825, 00826)

- [ADIRGSLSUPP-1835](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1835): ВТБ розница_Стратегия на пять. Гарант_ доработка триггера для ДУЛ

- [ADIRGSLSUPP-1839](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1839): Тесты:

    * Добавлен api тест на создание контрагента с уникальными данными.

- [ADIRGSLSUPP-1842](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1842): ВТБ Прайм и Привилегия_расширение возрастных границ_Драйвер гарантия

- [ADIRGSLSUPP-1844](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1844): ВТБ розница. Правки стратегия на пять Гарант.

- [ADIRGSLSUPP-1845](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1845): ВТБ розница_Стратегия на пять. Гарант_Результаты тестирования печатных форм

- [ADIRGSLSUPP-1846](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1846): Скорректировано обращение к библиотеке ePolicytConfiguration.

- [ADIRGSLSUPP-1848](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1848): Реализована базовая поддержка мигрированных договоров страхования для ДС на фин изменения

- [ADIRGSLSUPP-1849](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1849): Курсовые разницы при возврате платежей по валютным договорам страхования

- [ADIRGSLSUPP-1852](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1852): Исправлена обработка ошибок при выполнении сервиса модификации договоров страхования

- [ADIRGSLSUPP-1853](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1853): ВТБ Розница_Стратегия на пять. Гарант_доработки по результатам тестирования_декларация.

- [ADIRGSLSUPP-1858](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1858): Исправлена ошибка в дате во всплывающем окне с ошибкой, исправлена ошибка при дублировании строки в загрузочном файле, добавлены ДАТА ПОСТУПЛЕНИЯ, СУММА ПЛАТЕЖА, РУБ при заполнении из файла

- [ADIRGSLSUPP-1859](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1859): Дожития/ДИД замечания к Акту

- [ADIRGSLSUPP-1860](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1860): Добавлены конфигурационные файлы логов для idsrv на ТЕСТ.

- [ADIRGSLSUPP-1863](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1863): Добавление номера телефона для тестирования кода электро полисов на препрод и тест

- [ADIRGSLSUPP-1867](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1867): Правки СНПГ ВТБ Розница

- [ADIRGSLSUPP-1868](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1868): ВТБ розница_Стратегия на пять. Гарант_полис сертификат

- [ADIRGSLSUPP-1869](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1869): Забота о Семье. Отработка замечаний по результатам тестирования Андреайтинга

- [ADIRGSLSUPP-1872](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1872): Добавление номера телефона для тестирования кода электро полисов на препрод.

- [ADIRGSLSUPP-1873](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1873): Тестирование. Витрина задач, поиск по застрахованному.

- [ADIRGSLSUPP-1874](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1874): Remove date of birth validation

- [ADIRGSLSUPP-1879](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1879): Add requisites select field into participants component
    Fixed date fields in data schema

- [ADIRGSLSUPP-1880](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1880): Изменена валидация периодов банковских счетов для контрагентов, обновлён сервис апдейта контрагентов

- [ADIRGSLSUPP-1882](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1882): ВТБ розница_Стратегия на пять.Гарант_изменение текса писем

- [ADIRGSLSUPP-1883](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1883): ВТБ розница_Стратегия на пять. Гарант_корректировка текстов сообщений срабатывающих тригерров

- [ADIRGSLSUPP-1885](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1885): Фиксация изменений в implSetting.json для ТЕСТ среды.

- [ADIRGSLSUPP-1886](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1886): Среда разработки_добавление новых партнеров через команду

- [ADIRGSLSUPP-1887](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1887): ВТБ_ПСБ_Базис Актив/Ультра/Премиум_Изменение рейтинга НКР

- [ADIRGSLSUPP-1888](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1888): Обновление ставок и кэшбэка

- [ADIRGSLSUPP-1889](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1889): Исправлен процесс смены статуса АД на "расторгнут"

- [ADIRGSLSUPP-1890](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1890): ВТБ_Драйвер гарантия/Ультра_Стратегия на пять. Гарант/Ультра_изменение анкеты

- [ADIRGSLSUPP-1891](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1891): Создание риска CDH210800 для целей миграции

- [ADIRGSLSUPP-1893](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1893): ВТБ_Забота о Будущем/Забота о будущем Ультра_корректировка памятки

- [ADIRGSLSUPP-1894](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1894): Уведомление (внешние) ВТБ_доработка

- [ADIRGSLSUPP-1895](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1895): ВТБ Розница_ПЭП_Печатные формы "Стратегия на пять. Гарант "_исправление текста в письме для проверки

- [ADIRGSLSUPP-1896](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1896): Расторжения_Акт_замечания

- [ADIRGSLSUPP-1897](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1897): Создание новой роли для УФО

- [ADIRGSLSUPP-1899](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1899): Изменена сортировка для реиндекса версионируемых документов

- [ADIRGSLSUPP-1901](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1901): Электронный полис_смс сообщение_вывод обращения при отсутствии отчества

- [ADIRGSLSUPP-1902](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1902): ВТБ Привилегия_изменение минимальной премии СНПГ

- [ADIRGSLSUPP-1903](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1903): Исправлена некорректная подставновка дат при копировании АД

- [ADIRGSLSUPP-1905](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1905): Edit document in AwaitingPaymentDocuments status

- [ADIRGSLSUPP-1906](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1906): Обновлена валидация дат сроков действия в договорах

- [ADIRGSLSUPP-1907](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1907): Исправлена ошибка Body не должно иметь дополнительные свойства (salesSegment) при выборе продукта в шаблоне списка застрахованных

- [ADIRGSLSUPP-1910](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1910): Добавление номера телефона для тестирования кода электро полисов на препрод.

- [ADIRGSLSUPP-1912](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1912): Инновационные решения_Стратегия на пять. Мой гарант_доработки по продукту

- [ADIRGSLSUPP-1913](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1913): Интеграция с 1С в части формирования платежных поручений:

    * Изменен код статьи движения денежных средств в зависимости от типа риска убытка и получателя выплаты.

- [ADIRGSLSUPP-1916](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1916): Исправление ошибки при сохранении ДС на фин. изменения, когда ДС начинается с даты начала договора.

- [ADIRGSLSUPP-1919](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1919): Лесенка для реинвестов_тестирование

- [ADIRGSLSUPP-1921](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1921): Инновационные решения. Стратегия на пять. Мой гарант.

- [ADIRGSLSUPP-1922](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1922): Черепик маппинга на новую платформу

- [ADIRGSLSUPP-1928](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1928): ВТБ_Стратегия на пять. Гарант/Ультра_корректировка Страховой суммы

- [ADIRGSLSUPP-1929](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1929): ПСБ_Вектор здоровья Премиум 2.0._обновление памятки

- [ADIRGSLSUPP-1931](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1931): ВТБ масс. Добавление роли.GeneralBackOffice

- [ADIRGSLSUPP-1934](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1934): Дедупликация:

    * Исключена возможность дедуплицировать КА под группой ролей audit.

- [ADIRGSLSUPP-1936](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1936): Оптимизация АВР - анализ

- [ADIRGSLSUPP-1938](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1938): Конфигфайл_Изменение таблицы Tariff Constants

- [ADIRGSLSUPP-1939](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1939): ПСБ_Надежный выбор 2.0/Надежный выбор премиум_остановка продаж полугодового продукта и обновление экономики

- [ADIRGSLSUPP-1940](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1940): Лайф Инвест.Инновац.решения.Корректировка возраста и максСС.

- [ADIRGSLSUPP-1943](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1943): ВТБ масс.

- [ADIRGSLSUPP-1945](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1945): Продукты:

    * Добавлен справочник МСФО 17 и атрибут MAIN_LLOB в bfx_impl.products

- [ADIRGSLSUPP-1947](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1947): Добавлен актор "Бухгалтерия" для ДС на рассторжение договора.

- [ADIRGSLSUPP-1949](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1949): ВТБ. Ключевой выбор

- [ADIRGSLSUPP-1952](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1952): Создан новый раздел в меню под журналы передачи портфелей

- [ADIRGSLSUPP-1957](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1957): Инновационные решения_Стратегия на пять. Мой гарант_правки по результатам тестирования

- [ADIRGSLSUPP-1959](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1959): Изменение выгрузки договоров в SAP

- [ADIRGSLSUPP-1961](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1961): Изменен implSetting.json для среды PREPROD.

- [ADIRGSLSUPP-1962](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1962): Инновационные решения. СНП Мой гарант.

- [ADIRGSLSUPP-1967](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1967): Лайф инвест_Драйвер гарантия_Правки печатных форм

- [ADIRGSLSUPP-1968](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1968): Изменены фильтры отбора рисков для ВП договоров страхования

- [ADIRGSLSUPP-1970](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1970): ВТБ_Ошибка при печати договора_Продукт забота о семье

- [ADIRGSLSUPP-1971](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1971): Ошибка при вызове печатной формы акта РНВ

- [ADIRGSLSUPP-1974](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1974): Ошибка оформления договора нерезиденту. ВТБ прайм

- [ADIRGSLSUPP-1978](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1978): Доработка PS-скритпа для заполнения структуры настроек ДСЖ.

- [ADIRGSLSUPP-1982](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1982): Добавлен функционал изменения НДФЛ для актора "Бухгалтерия" на документе "Дожитие"

- [ADIRGSLSUPP-1984](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1984): ПСБ_Базис Актив Премиум_тестирование обновлений платформы

- [ADIRGSLSUPP-1985](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1985): Маппинг Драйвер Гарантия (ЛайфИнвест) 00619, 00664, 00665

- [ADIRGSLSUPP-1990](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1990): Add bank account into ACC

- [ADIRGSLSUPP-1993](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1993): Изменения в выгрузке по договорам в SAP

- [ADIRGSLSUPP-1995](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1995): Лайф инвест. Драйвер гарантия. Правки.

- [ADIRGSLSUPP-1996](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1996): ВТБ. Базис Актив.Ключевой выбор.

- [ADIRGSLSUPP-1997](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1997): Исправлено появление валидации условногокомиссионного вознагражения в заявках договоров

- [ADIRGSLSUPP-1999](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1999): ВТБ_Забота о семье/забота о семье ультра_исправление печатных форм

- [ADIRGSLSUPP-2001](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2001): ВТБ_Забота о семье/забота о семье ультра_исправление печатных форм

- [ADIRGSLSUPP-2002](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2002): Зенит. Нет среди документов на печать заявления

- [ADIRGSLSUPP-2003](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2003): Отсутствует кнопка для печати документов

- [ADIRGSLSUPP-2010](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2010): Инновационные решения_Стратегия на пять Мой гарант_некорректные печатные формы

- [ADIRGSLSUPP-2012](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2012): Корректировки mapping_печатные формы

- [ADIRGSLSUPP-2015](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2015): Добавление номера телефона для тестирования кода электро полисов на препрод.

- [ADIRGSLSUPP-2016](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2016): Загрузка нескольких реестров к одному платежу

- [ADIRGSLSUPP-2017](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2017): Cannot read properties of undefined (reading 'map')

- [ADIRGSLSUPP-2018](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2018): ВТБ_Базис Актив/Ультра_Ключевой выбор_результаты тестирования_печатные формы

- [ADIRGSLSUPP-2019](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2019): Добавлено предупреждение о необходимости вложения при расчете строки "Переплата" в ДС на расторжение

- [ADIRGSLSUPP-2021](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2021): ОАС_Детский капитал Классика 2.0_не срабатывает триггер на возраст Страхователя

- [ADIRGSLSUPP-2027](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2027): Исравлено поведение параметра subscriber в датапровайдере SendEventDataProvider

- [ADIRGSLSUPP-2028](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2028): ВТБ_изменение исторической доходности

- [ADIRGSLSUPP-2031](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2031): Added setting to speed up working with DB `readSync: true`.

- [ADIRGSLSUPP-2034](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2034): Лайф инвест_Драйвер гарантия 1,3,5 лет_правки по печатным формам

- [ADIRGSLSUPP-2037](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2037): Заведение продуктов для миграции

- [ADIRGSLSUPP-2039](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2039): Invalid column name 'CONTRACT_HOLDER_NAME' fix.

- [ADIRGSLSUPP-2040](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2040): ВТБ_Базис Актив/Ультра_Ключевая ставка_Правки в печатных формах заявлений и памятки ЦБ

- [ADIRGSLSUPP-2041](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2041): Добавлена функция деплоя для SignalR.

- [ADIRGSLSUPP-2042](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2042): Разделелние серверов по ролям (service, worker).

- [ADIRGSLSUPP-2051](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2051): Обновлены ссылки на имиджы для докера.

- [ADIRGSLSUPP-2052](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2052): ПСБ_Драйвер гарантия_корректировка деклараций

- [ADIRGSLSUPP-2053](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2053): Made it possible to open endowment inquiries by accountants

- [ADIRGSLSUPP-2054](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2054): Исправление по обновление ставок ВТБ ДГ 04.06.

- [ADIRGSLSUPP-2062](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2062): Автоматические UI тесты:

    * Произведена настройка.
    * Добавлен тест на создание контрагента ЮЛ.

- [ADIRGSLSUPP-2064](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2064): ПСБ_Драйвер гарантия_корректировка печатных форм

- [ADIRGSLSUPP-2066](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2066): Доработка менеджмента рисков для ДС на фин изменения.
    Доработка логики рисков.

- [ADIRGSLSUPP-2067](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2067): Разделение логирования по модулям.

- [ADIRGSLSUPP-2074](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2074): Добавлен UI тест на создание ИСЖ договора.

- [ADIRGSLSUPP-2075](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2075): Адиншур_ВТБ (сегмент Прайм и Привилегия)_обновление ставок по продуктам Бонд Репак с 13.06.2024

- [ADIRGSLSUPP-2078](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2078): Добавление сотрудников для тестирования кода электро полисов на тест

- [ADIRGSLSUPP-2079](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2079): Fix endowment inquiry workbench error

- [ADIRGSLSUPP-2081](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2081): ВТБ.Привелегия.Драйвер гарантия. 1год

- [ADIRGSLSUPP-2086](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2086): ВТБ_Ключевой выбор_Процентные периоды, даты расчета ДИД

- [ADIRGSLSUPP-2087](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2087): Анализ изменения экономики продуктов Базис Актив и Базис Актив Ультра (ВТБ Прайм и Привилегия)

- [ADIRGSLSUPP-2088](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2088): ВТБ_изменение исторической доходности_на новой платформе

- [ADIRGSLSUPP-2089](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2089): Лайф инвест. Драйвер гарантия. Изменение макс.СС

- [ADIRGSLSUPP-2091](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2091): Настройка электронного оформления для продуктов Почта Банка

- [ADIRGSLSUPP-2092](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2092): ВТБ.Ключевой выбор. Корректировка памятки ЦБ

- [ADIRGSLSUPP-2093](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2093): Лайф инвест_Драйвер гарантия_печатные формы

- [ADIRGSLSUPP-2095](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2095): Настройка элементов процесса ПЭП продуктов Почта Банка

- [ADIRGSLSUPP-2096](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2096): Зенит_Драйвер Гарантия_1 год_рубли_ настройка продукта

- [ADIRGSLSUPP-2097](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2097): Обновлены конфигурационные файлы для ПРОД среды.

- [ADIRGSLSUPP-2098](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2098): Обновлены конфигурационные файлы для ТЕСТ среды.

- [ADIRGSLSUPP-2099](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2099): Обновлены конфигурационные файлы для ПРЕПРОД среды.

- [ADIRGSLSUPP-2100](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2100): Обновлены конфигурационные файлы для MIGRATION среды.

- [ADIRGSLSUPP-2101](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2101): Доработка продуктового конфига - добавление срока для перевода в автоконверсию

- [ADIRGSLSUPP-2104](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2104): ВТБ_Драйвер Гарантия/Ультра_доработка лестничной конструкции(понижение макс СП)

- [ADIRGSLSUPP-2106](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2106): Подготовка инструкции по разворачиванию локальной среды конфигуратора.

- [ADIRGSLSUPP-2113](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2113): ВТБ_Забота о семье/забота о семье ультра_Исправление расчетов ручной корректировки

- [ADIRGSLSUPP-2116](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2116): Добавлена проверка на наличие задачи при создании РНВ
    Добавлены проверки на наличие задачи при сохранении убытков, в случае, если задача не была создана по техническим причинам.

- [ADIRGSLSUPP-2118](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2118): Ошибка печати договора при несогласии с декларацией

- [ADIRGSLSUPP-2119](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2119): ВТБ_ПСБ_Базис Актив_Замена ЛОББ по риску Смерть НС

- [ADIRGSLSUPP-2120](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2120): Добавление новых траншей

- [ADIRGSLSUPP-2122](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2122): ВТБ_Драйвер гарантия 1 год_добавление печатных форм

- [ADIRGSLSUPP-2123](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2123): ВТБ_Драйвер гарнтия_1 год_анкета 70+

- [ADIRGSLSUPP-2124](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2124): ВТБ. Драйвер гарантия 1 год. корретировки.

- [ADIRGSLSUPP-2125](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2125): Обновление ставок по ПСБ ДГ

- [ADIRGSLSUPP-2127](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2127): Реализация получения СМС кода для проверки договора при тестировании

- [ADIRGSLSUPP-2128](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2128): Маппинг Драйвер Гарантия и Ультра (00619-2021-00001) 00838

- [ADIRGSLSUPP-2129](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2129): Почта Банк_Драйвер гарантия_печать заявления на страхование

- [ADIRGSLSUPP-2133](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2133): Некорректное формирование QR-кода на оплату при печати договора

- [ADIRGSLSUPP-2135](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2135): Почта Банк_Драйвер Гарантия 5 лет_настройка продукта

- [ADIRGSLSUPP-2136](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2136): ВТБ. Новые вводные по продукту Драйвер гарантия 1год.

- [ADIRGSLSUPP-2137](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2137): ВТБ_Драйвер гарантия_анкета 70+

- [ADIRGSLSUPP-2138](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2138): ВТБ_Драйвер гарантия/Ультра_обновление печатных форм

- [ADIRGSLSUPP-2142](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2142): ВТБ. Драйвер гарантия 1 год. Изменение ставок.

- [ADIRGSLSUPP-2144](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2144): Доп. сервисы_ Корректировка памяток

- [ADIRGLSSUPP-2145](https://jira.adacta-fintech.com/browse/ADIRGLSSUPP-2145): Новые миграционные продукты

- [ADIRGSLSUPP-2152](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2152): Обновление ставок и кэшбэка ДГ и СНПГ, партнеров ЗЕНИТ, ПСБ

- [ADIRGSLSUPP-2153](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2153): ВТБ_Драйвер гарантия_1 год_заявление на страхование

- [ADIRGSLSUPP-2155](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2155): Добавление продуктов IDGV3OAS IDGV5OAS IDGV3PPOAS IDGV5PPOAS

- [ADIRGSLSUPP-2156](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2156): ВТБ.Закрытие продукта. Драйвер гарантия 1 год.

- [ADIRGSLSUPP-2163](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2163): Изменены конфиги для среды ТЕСТ, МИГРАЦИЯ.

- [ADIRGSLSUPP-2164](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2164): Необходимо скорректировать настройки securityScope

- [ADIRGSLSUPP-2168](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2168): ПСБ_Вектор здоровья Премиум 2.0_ошибка печати договора

- [ADIRGSLSUPP-2170](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2170): Маппинг Драйвер Гарантия 2-3-5 и Стратегия на пять 00794 00795 00796 00792 Почта банк

- [ADIRGSLSUPP-2173](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2173): Добавление номера телефона для тестирования кода электро полисов на тест и миграцию

- [ADIRGSLSUPP-2180](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2180): Корректировка настроек расширения лимитов по ДГ ВТБ

- [ADIRGSLSUPP-2182](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2182): Изменены конфиги для среды ПРЕПРОД.

- [ADIRGSLSUPP-2189](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2189): ВТБ_Базис Актив/Ультра_Настройка лестничной конструкции_доработка

- [ADIRGSLSUPP-2190](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2190): Обновление ставок ВТБ ДГ Ультра 1 год

- [ADIRGSLSUPP-2191](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2191): Ошибка при формировании Заявления на страхование для лица без гражданства

- [ADIRGSLSUPP-2192](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2192): Добавление почты и номера телефона для тестирования эл. полисов на MIGR

- [ADIRGSLSUPP-2195](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2195): ПСБ_Стратегия на пять. Гарант_Недоступно Заявление на страхование

- [ADIRGSLSUPP-2196](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2196): Заявление на страхование. Пустой лист при направление договора в СК

- [ADIRGSLSUPP-2200](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2200): ВТБ_Базис актив_Ключевой выбор_Историческая доходность

- [ADIRGSLSUPP-2202](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2202): Изменен скрипт установки приложения.
     - добавлен пукт публикации конфигурации;
     - добавлены скрипты для создания/удаления sql-скриптов для RUN_USER;

- [ADIRGSLSUPP-2203](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2203): ОАС_Драйвер Гарантия 3,5 лет, рубли_Добавление памяток и квитанции на оплату

- [ADIRGSLSUPP-2204](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2204): ВТБ_ПСБ_Базис Актив_Изменение страховой документации в части памятки ЦБ

- [ADIRGSLSUPP-2205](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2205): ВТБ ИНН РЕШЕНИЯ ЛАЙФ ИНВЕСТ ДГ обновления ставок 08.07

- [ADIRGSLSUPP-2208](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2208): Инновационные решения_Драйвер гарантия_ удаление валидации

- [ADIRGSLSUPP-2209](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2209): Добавлена задержка запуска консумеров (20мс) для ActiveMQ.

- [ADIRGSLSUPP-2210](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2210): ПОЧТА БАНК СНПГ правки по результатам тестирования

- [ADIRGSLSUPP-2211](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2211): Rework attributes in beneficiary owner's card

- [ADIRGSLSUPP-2217](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2217): Зенит_Драйвер гарантия_правки по декларациям

- [ADIRGSLSUPP-2221](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2221): Обновлены конфигурационные файлы ActiveMQ для всех сред.

- [ADIRGSLSUPP-2224](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2224): Обновлены конфигурационные файлы для среды ПРОД.

- [ADIRGSLSUPP-2228](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2228): Переработка расчетной части для убытков

- [ADIRGSLSUPP-2229](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2229): Обновлено формирование РНв для убытков.
    Доп исправления расчетов для дожитий, расторжений и убытков.

- [ADIRGSLSUPP-2234](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2234): Маппинг Драйвер Гарантия 00795 796 801 802 ОАС

- [ADIRGSLSUPP-2236](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2236): ПОЧТА БАНК ДГ реализовать анкету 70+

- [ADIRGSLSUPP-2240](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2240): Исправление замечаний после тестирования

- [ADIRGSLSUPP-2241](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2241): Восстановление файла Rule.js

- [ADIRGSLSUPP-2245](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2245): ВТБ ДГ корректировка лимитов до 85 лет

- [ADIRGSLSUPP-2248](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2248): ВТБ ДГ скорректировать заявление на страхование

- [ADIRGSLSUPP-2249](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2249): Почта Банк правки по результатам тестирования

- [ADIRGSLSUPP-2250](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2250): Добавлен фильтр на поле "Статус договора", изенено подтягивание ТНА, изменено отображение выбора САД, исправлено поведение столбца "номер САД" в ServiceProviderSearchView

- [ADIRGSLSUPP-2251](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2251): Кумуляция (таблица BFX_IMPL.RISKS):

    * Риски ВВ будут выбраны по условию, где PAYMENT_FORM = 'SurrenderValues'.
    * Избыточный столбец IS_CONTRIBUTION_REFUND удалён.

- [ADIRGSLSUPP-2255](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2255): Исправление маппинга в АСС для ДС договоров

- [ADIRGSLSUPP-2256](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2256): ОАС закрытие продуктов 01.08

- [ADIRGSLSUPP-2257](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2257): Создание справочника соответствия рисков САП и АДШ на основе скрипта для выгрузки договоров

- [ADIRGSLSUPP-2261](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2261): ВТБ Базис Актив 2.0 Прайм/Привелегия печатные формы

- [ADIRGSLSUPP-2263](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2263): ВТБ Базис Актив 2.0 Прайм/Привелегия доработка расчетов

- [ADIRGSLSUPP-2264](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2264): ВТБ Базис Актив 2.0 Прайм/Привелегия настройка продуктов

- [ADIRGSLSUPP-2265](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2265): Создание миграционных продуктов_июль 24

- [ADIRGSLSUPP-2266](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2266): ПСБ ДГ+СНПГ настройка продуктов для новых территорий

- [ADIRGSLSUPP-2274](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2274): Переработка валидации изменения данных контрагентов в ДС на нефин. изменения

- [ADIRGSLSUPP-2278](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2278): Корректировка доступности строк выплат на расторжениях

- [ADIRGSLSUPP-2279](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2279): Во вкладку "История" у договоров добавлено поле для комментариев. Пока что только для ОПЕРУ

- [ADIRGSLSUPP-2281](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2281): ВТБ (Прайм и Привилегия), изменение процесса с согласование УД

- [ADIRGSLSUPP-2282](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2282): ВТБ розница_добавление серых триггеров в ЭП "Стратегия на пять. Гарант"

- [ADIRGSLSUPP-2285](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2285): Ошибка печати для СНПГ

- [ADIRGSLSUPP-2286](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2286): ПСБ_ДГ+СНПГ_правки по результатам первичного тестирования

- [ADIRGSLSUPP-2287](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2287): Маппинг Стратегия на пять Драйвер Гарантия 00724, 00664, 00665 ПСБ новые территории

- [ADIRGSLSUPP-2291](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2291): ПОЧТА БАНКА правки по результатам теста

- [ADIRGSLSUPP-2292](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2292): Исправление ошибки расчета обязательств для рублевых сумм в расторжениях

- [ADIRGSLSUPP-2295](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2295): Добавлена возможность ручной корректировки фиксированного курса для расторжений

- [ADIRGSLSUPP-2299](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2299): ВТБ_ПСБ_Базис Актив/Ультра/Премиум_Изменение рейтинга НКР

- [ADIRGSLSUPP-2300](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2300): Изменение КВ и КУ

- [ADIRGSLSUPP-2301](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2301): Доработка формирования рисков для ДС на фин изменения.

- [ADIRGSLSUPP-2303](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2303): Обновлены конфигурационные файлы для ТЕСТ среды.

- [ADIRGSLSUPP-2304](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2304): Обновлены конфигурационные файлы для ПРЕПРОД среды.

- [ADIRGSLSUPP-2305](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2305): ВТБ БА 2.0 Правки по результатам тестирования

- [ADIRGSLSUPP-2312](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2312): ВТБ БА 2.0 неверный расчет выкупных сумм

- [ADIRGSLSUPP-2313](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2313): Изменение декларации для Стратегия на пять. Гарант ВТБ масс

- [ADIRGSLSUPP-2316](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2316): ВТБ БА 2.0 правки печатных форм

- [ADIRGSLSUPP-2318](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2318): Доработка валидации документов для нефин изменений

- [ADIRGSLSUPP-2319](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2319): Обновление ставок в нескольких партнеров

- [ADIRGSLSUPP-2320](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2320): ВТБ создание нового сегмента и копи

- [ADIRGSLSUPP-2327](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2327): ЗЕНИТ Драйвер гарантия 2 года ошибка в декларации

- [ADIRGSLSUPP-2328](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2328): Влсстановление лимитов по СНС

- [ADIRGSLSUPP-2332](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2332): ВТБ БА 2.0 исправление по результатам тестирования

- [ADIRGSLSUPP-2333](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2333): АВР. Доработки для актов с отрицательной суммой КВ к выплате - разработка

- [ADIRGSLSUPP-2334](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2334): Доработка формирования рисков для ДС на фин изменения

- [ADIRGSLSUPP-2335](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2335): ВТБ. Базис актив. Замена иметента.

- [ADIRGSLSUPP-2336](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2336): Добавление продуктов СНПГ ддля новых территорий ВТБ масс и привилегия

- [ADIRGSLSUPP-2341](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2341): добавление бумажного выпуска

- [ADIRGSLSUPP-2342](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2342): ВТБ розница_Стратегия на пять. Гарант_печать правил страхования

- [ADIRGSLSUPP-2344](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2344): Корректировка демо-продуктов, изменение серии на 99999.

- [ADIRGSLSUPP-2345](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2345): ПСБ_ЗЕНИТ Стратегия на пять Гарант корректировка кэшбэка

- [ADIRGSLSUPP-2347](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2347): ВТБ БА 2.0 неверный расчет СС по риску СНС

- [ADIRGSLSUPP-2348](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2348): Добавление атрибутов по представителю ЮЛ на карточке ЮЛ

- [ADIRGSLSUPP-2353](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2353): Некорректное формирование суммы на оплату по QR коду

- [ADIRGSLSUPP-2360](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2360): ПСБ_OPC_Стратегия на пять Гарант корректировка возрастных граница

- [ADIRGSLSUPP-2366](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2366): ПСБ.Вектор здоровья.Корретировка ВС

- [ADIRGSLSUPP-2379](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2379): Маппинг Базис Актив 2.0 и Базис Актив Ультра 2.0 ВТБ 00840, 00841, 00842, 00843

- [ADIRGSLSUPP-2383](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2383): Почта_Банк_Драйвер Гарантия обновление ставок 15.08

- [ADIRGSLSUPP-2395](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2395): Добавлен сервис удаления документа из ES, когда документ отсутствует в базе
    api/entity-infrastructure-ext/shared/es-indexer/erase-document

- [ADIRGSLSUPP-2399](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2399): Ошибка при импорте файла загрузки пользователей

- [ADIRGSLSUPP-2404](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2404): Исправлена ошибка с некорректным заполнением номера документа, что приводило к ошибке формирования печатной формы налоговых справок

- [ADIRGSLSUPP-2405](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2405): Добавлено поле "Комментарий (повреждения)" на сущности "убытки"

- [ADIRGSLSUPP-2406](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2406): ВТБ_ОАС СНПГ_ДГ_БГ обновление кэшбэков с 20.08

- [ADIRGSLSUPP-2422](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2422): ВТБ ДГ новые территории правки по результатам тестирования

- [ADIRGSLSUPP-2425](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2425): Обновлены конфигурационные файлы для ПРОД среды.

- [ADIRGSLSUPP-2426](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2426): Обновлены конфигурационные файлы для ТЕСТ среды.

- [ADIRGSLSUPP-29](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-29): Additional initiators
    Amendment schema fix

- [ADIRGSLSUPP-30](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-30): АВР. Расчеты по субагентам в выгрузке еxcel

- [ADIRGSLSUPP-39](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-39): Searching by roles rework

- [ADIRGSLSUPP-394](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-394): При импорте реестра САД добавлен вывод общего количества ошибок.

- [ADIRGSLSUPP-454](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-454): Настроена видимость атрибута "Согласующее подразделение" в Котировке и Договоре только пользователям с ролью GeneralBackOffice

- [ADIRGSLSUPP-497](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-497): Доработка РНВ при расторжении договора страхования

- [ADIRGSLSUPP-556](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-556): Добавлено автозаполнение даты окончания АД при заполнении даты расторжения в допнике на расторжение АД. Убрана валидация закрытого периода


### Improvements (1 changes)

- [ADIRGSLSUPP-2073](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2073): Добавлена возможность запуска UI тестов из Gitlab.


### Fixed (44 changes)

- [ADIRGSLSUPP-1575](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1575): Коллективные договоры:

    * Исправлена работа триггеров.

- [ADIRGSLSUPP-1649](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1649): Перестрахование:

    * Исправлена ошибка конвертации типов данных при импорте

- [ADIRGSLSUPP-1755](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1755): Ошибка курса валют в сервисе get-contract-custom-data на ПРОДЕ

- [ADIRGSLSUPP-1815](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1815): Не работает загрузка реестра с отрицательной суммой

- [ADIRGSLSUPP-1833](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1833): Исправлена ошибка при получении функции бизнес правил

- [ADIRGSLSUPP-1855](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1855): Базовые параметры инвестирования для НСЖ:

    * Исправлена ошибка лесенки при выборе продукта.

- [ADIRGSLSUPP-1884](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1884): Мигрированные договоры:

    * Исправлена ошибка при открытии договоров, связанная с проверкой наличия пакетов рисков.

- [ADIRGSLSUPP-1911](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1911): АВР_агент на упрощенке (без НДС)

- [ADIRGSLSUPP-1923](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1923): ДС по договорам:

    * Исправлены схемы данных по ДС: Технический, Финансовые изменения, Нефинансовые изменения.

- [ADIRGSLSUPP-1941](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1941): server build для API тестов не работает

- [ADIRGSLSUPP-1950](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1950): НСЖ:

    * Исправлен расчёт рисков для партнёра "Лайф Инвест" по продукту "СНП. Гарант".

- [ADIRGSLSUPP-1953](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1953): Электронные договоры:

    * Исправлена отправка уведомлений.

- [ADIRGSLSUPP-1954](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1954): Орг.структура:

    * Удалено сообщение о сохранении изменений при переходе из раздела Орг.структура в другой раздел в случае, если было выбрано подразделение.

- [ADIRGSLSUPP-1955](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1955): ПСБ:

    * Исправлена ошибка печатных форм.

- [ADIRGSLSUPP-1958](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1958): Таймаут на платеже при просмотре проводок на платеже

- [ADIRGSLSUPP-1966](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1966): Котировки:

    * Исправлен некорректный расчет страховой суммы по продуктам, где используется вариант и ставка доходности.

- [ADIRGSLSUPP-1977](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1977): Договоры НСЖ:

    * Исправлена возможность печати и смены статусов документа в продукте после отказа от генетического чек-апа.

- [ADIRGSLSUPP-1983](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1983): Контрагенты:

    * Добавлена проверка при получении персональных данных по контрагенту.

- [ADIRGSLSUPP-1988](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1988): Исправлена отправка уведомлений по электронным полисам.

- [ADIRGSLSUPP-1992](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1992): Электронные полисы:

    * Исправлена загрузка вложения договор с ЭЦП.

- [ADIRGSLSUPP-2009](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2009): Контрагенты:

    * Признак ручного адреса исправлен на булево значение.

- [ADIRGSLSUPP-2013](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2013): Кумуляция:

    * Исправлена ошибка при сохранении котировки без группы продуктов кумуляции.

- [ADIRGSLSUPP-2014](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2014): Договоры:

    * Добавлено обязательное поле description для выгодоприобретателей.

- [ADIRGSLSUPP-2029](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2029): Договоры:

    * Добавлена проверка наличия всех рисков в технической информации.

- [ADIRGSLSUPP-2035](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2035): Сервис get-contract-custom-data:

    * Исправлена ошибка получения данных о договоре, когда есть ДС на восстановление по договору.

- [ADIRGSLSUPP-2049](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2049): Activities query returned 7TB of data

- [ADIRGSLSUPP-2068](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2068): Правка конфигов

- [ADIRGSLSUPP-2076](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2076): Ошибка отображения статуса договора и статуса убытка

- [ADIRGSLSUPP-2121](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2121): Договоры:

    * Исправлена ошибка при оформлении дополнительной программы ДМС к договору.
    * Добавлена дополнительная информация в сообщение о доступности страховых продуктов.

- [ADIRGSLSUPP-2139](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2139): Кумуляция:

    Исправлены ошибки подсчета и группировка рисков.

- [ADIRGSLSUPP-2143](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2143): Контракт не перевелся в статус "Завершен" (срок окончания: 2023 г.)

- [ADIRGSLSUPP-2146](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2146): Не работает роль PaymentDistributionAdminExtra при расквитовке с завершенного контракта

- [ADIRGSLSUPP-2149](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2149): Ошибка генерация платежей

- [ADIRGSLSUPP-2252](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2252): Оптимизация view Связанные документы

- [ADIRGSLSUPP-2267](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2267): Ошбка при автозаполнении АВР

- [ADIRGSLSUPP-2271](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2271): Исправлена ошибка при открытии формы создания заявки КСЖ.

- [ADIRGSLSUPP-2276](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2276): Ошибки в витрине задач

- [ADIRGSLSUPP-2288](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2288): Договоры:

    * Исправлены ошибки при копировании.

- [ADIRGSLSUPP-2315](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2315): Сервис get-contract-custom-data:

    * Исправлена ошибка подсчёта insuranceTerms.

- [ADIRGSLSUPP-2356](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2356): Исправлен скрипт по обновлению riskInsuredSumWithoutCashBack в body документов.

- [ADIRGSLSUPP-2386](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2386): В Policy SAT с 30.07.2024 появляются статусы NULL

- [ADIRGSLSUPP-2410](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2410): Исправлена ошибка при выборе плательщика в налоговой справке.

- [ADIRGSLSUPP-69](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-69): Скрипт по удалению РНВ и сервис по доведению документов-источников до финального статуса без РНВ

- [ADIRGSLSUPP-755](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-755): Изменение сервиса загрузки платежей по опредеденному GUID

# 64.0.0-rc1 (2024-04-23)

### Breaking Changes (3 changes)

- [ADIRGSLSUPP-1117](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1117): Добавлен столбец с информацией о базовом активе в выгрузку отчёта из журнала договоров

    До паблиша необходимо выполнить скрипт по добавлению нового столбца:
    database\sql\Schema\8.50_006.020.007_20240314154059_adirgslsupp_1117.sql

    Для изменения хранимой процедуры подготовки данных для экспорта джобой необходимо выполнить данный скрипт:
    database\sql\migration\ADIRGSL-1947-contracts-report-fill.sql

- [ADIRGSLSUPP-1171](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1171): Реализован процесс импорта получателей для коллективного убытка

    **Доп сведения**
    Должен быть выполнен автоматический скрипт: 8.50_027.012.006_20240327151046_collective_claim_import_table.sql

- [ADIRGSLSUPP-1529](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1529): Смена технической классификации по мигрированным продуктам.

    Выполнить после паблиша скрипт: 8.50_027.012.006_20240422141039_change_contracts_migrated.sql
    Сделать реиндекс ES.


### New Features (82 changes)

- [ADIRGSLSUPP-1091](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1091): Исправление энричментов при создании ДС на расторжение.

- [ADIRGSLSUPP-1189](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1189): Исправление работы сервиса по отмене взаимозачета на РНВ

- [ADIRGSLSUPP-1221](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1221): В выпадающий список подразделений в форме "Администрирование договоров страхования" добавлен вывод кода офиса

- [ADIRGSLSUPP-1238](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1238): Добавлено автоматическое проставление чекбокса "Использовать фиксированный курс" при активации чекбокса "Ручной курс".

- [ADIRGSLSUPP-1253](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1253): Лесенка ставок:

    * Настроена конфигурация variant и cashbach

- [ADIRGSLSUPP-1281](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1281): Исправлена ошибка при поиске после очистки фильтров в АВР

- [ADIRGSLSUPP-1334](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1334): Исправлена очистка табельного номера при обновлении данных участника

- [ADIRGSLSUPP-1338](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1338): настройка дубликатов КСЖ БФКО, правки в ПФ

- [ADIRGSLSUPP-1355](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1355): Доработан сервис апдейта контрагентов: можно обновлять адреса и банковские счета больше 1 раза в день

- [ADIRGSLSUPP-1364](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1364): Копирование вью ACC_IMPL.RSD_JOB_PP_DATA в схему dbo

- [ADIRGSLSUPP-1395](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1395): Исправление логики отбора взносов для расчета НДФЛ в ДС на расторжение

- [ADIRGSLSUPP-1401](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1401): Настроено автоматическое заполнение поля "Год страхования по" в условиях вознаграждения АД

- [ADIRGSLSUPP-1424](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1424): Настройка ставок ДГ ВТБ

- [ADIRGSLSUPP-1437](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1437): Орг. структура:

    * Добавлена проверка на уникальность кода ДО в рамках одного партнёра.

- [ADIRGSLSUPP-1439](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1439): Доработка конфигуратора доп.сервисов - анализ

- [ADIRGSLSUPP-1445](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1445): Сделан запрет удалять вложения на карточке контрагента пользователям без роли GeneralBackOffice, если с момента прикрепления прошло более 1 дня.

- [ADIRGSLSUPP-1448](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1448): Исправление ошибки с расчетом обязательств

- [ADIRGSLSUPP-1450](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1450): ВТБ.Продукт Забота о семье, Забота о семье Ультра

- [ADIRGSLSUPP-1457](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1457): Доработка витрины задач для задач по убыткам - разработка

- [ADIRGSLSUPP-146](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-146): Контрагент_пересечение актуальности адресов

- [ADIRGSLSUPP-1479](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1479): Настройка продукта Базис Актив ПСБ

- [ADIRGSLSUPP-148](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-148): Карточка клиента - автоматическое определение пола по отчеству

- [ADIRGSLSUPP-1483](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1483): Зенит масс_запуск "Драйвер Гарантия" 2 года рубли, выплата в конце

- [ADIRGSLSUPP-1484](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1484): Партнеры_закрытие продуктов с 01.04.2024

- [ADIRGSLSUPP-1519](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1519): Доработка функционала по расторжению договора из убытков по рискам смерти.

- [ADIRGSLSUPP-1533](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1533): Изменить логику определения статуса договора в журнале убытков - разработка

- [ADIRGSLSUPP-1536](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1536): Инновационные решения. Стратегия на пять. Мой гарант.

- [ADIRGSLSUPP-1538](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1538): Дополнить график траншей для продуктов БИ

- [ADIRGSLSUPP-1545](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1545): Агентский договоры:

    * Настроен вариант программы для лесенки КВ.

- [ADIRGSLSUPP-1555](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1555): Создание роли/группы ролей для партнера ВТБ Розница. Включение их в загрузчик

- [ADIRGSLSUPP-1559](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1559): Маппинг Забота о семье и Забота о семье Ультра для ВТБ (00825, 00826)

- [ADIRGSLSUPP-1597](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1597): Правки ДГ 2 года ЗЕНИТ

- [ADIRGSLSUPP-1598](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1598): Заменить конфиг-файл на ПРОД среде.

- [ADIRGSLSUPP-1607](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1607): Правки ПФ КИД Забота о семье ВТБ

- [ADIRGSLSUPP-1612](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1612): Автоматическое заполнение значения категории "Стандарт" в блоке выгодоприобретатели

- [ADIRGSLSUPP-1613](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1613): Добавлен сброс всех полей при изменении продукта/партнера на коллективных договорах

- [ADIRGSLSUPP-1615](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1615): Роль ОПЕРУ. Добавление функционала

- [ADIRGSLSUPP-1616](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1616): Замена сервисной памятки

- [ADIRGSLSUPP-1618](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1618): Смена ставок ДГ ВТБ с 01.04

- [ADIRGSLSUPP-1621](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1621): Налоговый опросник, правки по результатам теста 28.03

- [ADIRGSLSUPP-1622](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1622): ПФ Забота о Семье, правки по результатам теста от 28.03

- [ADIRGSLSUPP-1623](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1623): Правки печатных БА ПСБ

- [ADIRGSLSUPP-1624](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1624): Испраление ошибок в маппингах печаток.

- [ADIRGSLSUPP-1625](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1625): ВТБ_Доработка процесса оформления договоров для клиентов 70+

- [ADIRGSLSUPP-1632](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1632): Инновационные решения_печатные формы "Стратегия на пять. Мой гарант" реинвестирование КСЖ при ПДП - разработка

- [ADIRGSLSUPP-1636](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1636): Исправление ошибки при сохранении дожития/дид

- [ADIRGSLSUPP-1638](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1638): 63й релиз. Ошибка при просмотре орг. структуры.

- [ADIRGSLSUPP-1640](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1640): Корректировка настройки сегмента продаж в продуктах.

- [ADIRGSLSUPP-1641](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1641): 63й релиз. Ошибки. Отсутствует слово "ссылка" в полезной информации.

- [ADIRGSLSUPP-1648](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1648): ВТБ_ПСБ_изменение исторической доходности

- [ADIRGSLSUPP-1653](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1653): Контрагенты_Исчезли даты изменений в адресе

- [ADIRGSLSUPP-1654](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1654): Исправлена фильтрация в условиях вознаграждения АД

- [ADIRGSLSUPP-1655](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1655): Исправлена ошибка сравнения дат в условиях вознаграждения

- [ADIRGSLSUPP-1663](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1663): Запретить выпуск договор страхования для документов водительское удостоверение и загранпаспорт.

- [ADIRGSLSUPP-1664](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1664): Не прокидываются валидации из контрагента на договор.

- [ADIRGSLSUPP-1666](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1666): Ошибка при подтягивании изображения в ПФ после обновления платформы

- [ADIRGSLSUPP-1673](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1673): 63й релиз. Ошибки. Баг в оформлении продукта.

- [ADIRGSLSUPP-1697](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1697): Исправлена ошибка Body не должно иметь дополнительные свойства (body) при копировании агентского договора

- [ADIRGSLSUPP-1700](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1700): ПФ ЗоС ВТБ правки по результатам теста

- [ADIRGSLSUPP-1702](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1702): Добавлена авторизация для продуктов группы risk и сегмента massOAS.

- [ADIRGSLSUPP-1710](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1710): 63й релиз. Ошибки. Заполнение адреса КА

- [ADIRGSLSUPP-1221](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1221): В выпадающий список подразделений в форме "Администрирование договоров страхования" добавлен вывод кода офиса

- [ADIRGSLSUPP-1718](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1718): 63й релиз. Ошибки. Ставки доходности

- [ADIRGSLSUPP-1721](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1721): Заменить конфиг на ПРЕДПРОДЕ.

- [ADIRGSLSUPP-1729](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1729): Добавить пользователей для рассылки по электрополисам на тесте и предпроде

- [ADIRGSLSUPP-1730](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1730): Обновление цены опциона продуктов Базис Актив

- [ADIRGSLSUPP-1741](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1741): Добавление Email/номера телефона в конфигуратор для теста

- [ADIRGSLSUPP-1746](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1746): Добавление номера телефона для тестирования кода электро полисов на препрод.

- [ADIRGSLSUPP-1747](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1747): ВТБ Привелегия.Изменение мин.премии.Драйвер гарантия.

- [ADIRGSLSUPP-1754](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1754): НЕфин. изменения_валидации

- [ADIRGSLSUPP-1756](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1756): Исправление ошибки при открытии формы коллективных договоров

- [ADIRGSLSUPP-1761](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1761): Скорректировать ошибку по Базис Активу ПСБ

- [ADIRGSLSUPP-1766](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1766): ВТБ Привелегия_правки по результатам тест 70+

- [ADIRGSLSUPP-1767](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1767): Обновление номера телефона в получении смс сообщений для электронного оформления

- [ADIRGSLSUPP-1769](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1769): Нефин. изменения доработки

- [ADIRGSLSUPP-1774](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1774): Исправлено отображение полей на карточке ЮЛ.

- [ADIRGSLSUPP-1776](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1776): 63_не корректное отражение согласующего подразделения в UI договора

- [ADIRGSLSUPP-1778](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1778): 63_тестирование_Правки заявления на страхование

- [ADIRGSLSUPP-1780](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1780): Исправление ошибки при выборе получателя расторжений

- [ADIRGSLSUPP-1782](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1782): Обновлены права доступа интеграционных сервисов РНВ.

- [ADIRGSLSUPP-1784](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1784): Ошибки в предупреждениях

- [ADIRGSLSUPP-1807](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1807): ВТБ, забота о семье. Правки ПФ по результатам теста


### Fixed (23 changes)

- [ADIRGSLSUPP-1337](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1337): Не критическая ошибка при выполнении взаимозачета в РНВ

- [ADIRGSLSUPP-1556](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1556): Идентификация платежей:

    * Исправлена ошибка идентификации платежа с переплатой по валютному договору

- [ADIRGSLSUPP-1570](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1570): Замечания по созданию карточки контрагента из котировки и договора

- [ADIRGSLSUPP-1574](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1574): Исправлена ошибка reindex-а договора
    Дополнительно исправлена ошибка маппинга insurance rules договора

- [ADIRGSLSUPP-1575](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1575): Коллективные договоры:

    * Исправлена работа триггеров.

- [ADIRGSLSUPP-1599](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1599): Договоры:

    * Добавлена схема данных для НСЖ по кумуляции.

- [ADIRGSLSUPP-1600](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1600): Договоры:

    * Исправлена ошибка при сохранении котировки: Отсутствует основной риск для оцениваемого объекта страхования 1

- [ADIRGSLSUPP-1601](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1601): Договоры:

    * Исправлена ошибка при сохранении договора, когда выгодоприобретатели не заполнены.

- [ADIRGSLSUPP-1617](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1617): Дополнительные соглашения:

    * Исправлена схема данных.

- [ADIRGSLSUPP-1627](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1627): Физ. лицо:

    * Исправлена ошибка при переходе на вкладку дополнительная информация.

- [ADIRGSLSUPP-1639](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1639): Исправлена ошибка при создании ДС на расторжение

- [ADIRGSLSUPP-1645](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1645): Пользователи:

    * Исправлена ошибка блокировки пользователей при импорте Excel файла.
    * Исправлена ошибка при смене пароля для пользователей при импорте Excel файла.

- [ADIRGSLSUPP-1651](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1651): Сервис get-contract-custom-data:

    * Исправлена ошибка при вызове сервиса.

- [ADIRGSLSUPP-1676](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1676): 63 релиз. Ошибка_Не отрабатывает авто квитовка джобом AutoAllocatePayments

- [ADIRGSLSUPP-1677](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1677): Use 'inner join's

- [ADIRGSLSUPP-1683](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1683): Конфиги исправлены

- [ADIRGSLSUPP-1684](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1684): Договоры:

    * Исправлены ошибки при установке выгодоприобретателей.

- [ADIRGSLSUPP-1685](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1685): Исправльена локация env файлов

- [ADIRGSLSUPP-1713](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1713): НОТА Высшая лига 4.0:

    * Исправлены коэффициенты применяемые к страховой премии с 4 месяца для рисков смерть застрахованного по любой причине и смерть застрахованного в результате несчастного случая.

- [ADIRGSLSUPP-1728](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1728): Fix printout styles

- [ADIRGSLSUPP-1742](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1742): Договоры:

    * Исправлено формирование страховых сумм

- [ADIRGSLSUPP-1760](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1760): Технические ДС:

    * Исправлена ошибка схемы данных.

- [ADIRGSLSUPP-1796](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1796): Электрополисы:

    * Исправлена отправка уведомлений на почту.

# 63.0.0-rc1 (2024-03-26)

### Breaking Changes (5 changes)

- [ADIRGSLSUPP-1160](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1160): Upgraded platform to version 27.12.6. Upgraded configuration to version 28.7.1.

- [ADIRGSLSUPP-1233](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1233): Sales Segment продуктов пересен из configuration excel файлов в БД.

    **Доп указания**

    Должны быть выполнены автоматичемкие скрипты:

    8.50_027.012.006_20240318124927_sales_segment_transfer.sql
    8.50_027.012.006_20240318125038_sales_segment_transfer_data.sql

    Должны быть выполнены ручные скрипты:

    ADIRGSL-1947-contracts-report-fill.sql - скрипт создания процедуры был дополнен колонкой с sales segment. Следует выполнить его заново, что бы пересоздать процедуру.
    ADIRGSLSUPP-1233-update_product_sales_segment.sql - заполнение значения sales segment для продукта, указанного в договорах и допникаъх.

- [ADIRGSLSUPP-1272](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1272): Коллективные договоры:

    * На вкладке Согласование СК в поле Запросы в смежные подразделения, будут отображаться запросы, автоматически сформированные при срабатывании триггеров.

    **Для отображения запросов по старым договорам, после паблиша выполнить следующие шаги:**
    1. Выполнить запрос к БД и сохранить ответ в формате .json
    ```
    SELECT
    	c.CONTRACT_NUMBER AS 'businessIdentifier',
    	pa.CODE_NAME AS 'configurationName',
    	'Active' AS 'documentStateNew'
    FROM PAS.CONTRACT c
    LEFT JOIN PAS_IMPL.POLICY_HUB ph ON ph.CONTRACT_NUMBER = c.CONTRACT_NUMBER
    LEFT JOIN CFX.PUBLISHED_ARTIFACT pa on pa.PUBLISHED_ARTIFACT_ID = c.PUBLISHED_ARTIFACT_ID
    WHERE ph.CONTRACT_NUMBER IS NULL AND pa.CODE_NAME = 'CollectiveLifeInsurancePolicy'
    FOR JSON PATH
    ```
    2. Импортировать в Postman коллекцию: docs\postman\collections\entity-routes\policy-route-multi.postman_collection.json

    3. Запустить коллекцию, выбрав файл из пункта 1 для параметра Data.

- [ADIRGSLSUPP-1340](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1340): Забота о будущем. Базовая настройка.

    После паблиша необходимо выполнить скрипт:
    database\sql\migration\ADIRGSLSUPP-1340-update-beneficiaries.sql

- [ADIRGSLSUPP-1528](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1528): Upgraded scheduler to version 6.0.0.


### New Features (71 changes)

- [ADIRGSLSUPP-1006](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1006): Добавлен документ "Перевод портфеля"

- [ADIRGSLSUPP-1067](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1067): В Журнал Договоров добавлен поиск по части номера договора

- [ADIRGSLSUPP-1091](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1091): Конвертация печатных форм в новый формат после апгрейда платформы.

- [ADIRGSLSUPP-1124](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1124): Информация о Застрахованном сохранятся на прямом и перестраховочном тарифе

- [ADIRGSLSUPP-1138](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1138): Добавлена выгрузка перевода портфеля в Excel

- [ADIRGSLSUPP-1140](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1140): Добавлены журналы поиска для документа "Перевод портфеля"

- [ADIRGSLSUPP-1165](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1165): АД_Тестирование задачи 143

- [ADIRGSLSUPP-1170](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1170): Доработки UI и мелкие правки для документа коллективный убыток

- [ADIRGSLSUPP-1241](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1241): Добавление ролей в загрузчик

- [ADIRGSLSUPP-1247](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1247): Уведомление (внешние) ВТБ о запросе в процессе оформления и верификации

- [ADIRGSLSUPP-1258](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1258): БФКО. Временная настройка для продуктов КСЖ.

- [ADIRGSLSUPP-1262](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1262): Возвращены иконки для поля Наличие лицензии

- [ADIRGSLSUPP-1263](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1263): Коллективные договоры:

    * Для договоров НСиБ пулы отключена валидация на проверку прикрепления вложений при переводе договора в статус "Подписан".

- [ADIRGSLSUPP-1270](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1270): Исправлено обновление состояния кнопок авто-заполнения в АВР при сохранении

- [ADIRGSLSUPP-1303](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1303): Справки для налоговой:

    * Настроен сервис по формированию справок

- [ADIRGSLSUPP-1306](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1306): ВТБ_На всякий случай ультра_доработка функционала андеррайтеров

- [ADIRGSLSUPP-1311](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1311): Revert eslint warnings to errors

- [ADIRGSLSUPP-1322](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1322): Исправлено некорректное обновление сумм в АВР

- [ADIRGSLSUPP-1329](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1329): Кумуляция:

    * Подготовлена базовая конфигурация

- [ADIRGSLSUPP-1339](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1339): ВТБ розница. Создание продукта Стратегия на пять. Гарант.

- [ADIRGSLSUPP-1352](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1352): Адакта_внедрение опросника по Налоговому вычету

- [ADIRGSLSUPP-1370](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1370): В АВР кнопка «Выгрузить» теперь "учитывает" все выставленные фильтры по строкам

- [ADIRGSLSUPP-1371](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1371): Настройка печатных форм для продуктов "Забота о будущем","Забота о будущем Ультра"для партнёра ВТБ

- [ADIRGSLSUPP-1375](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1375): Правки настроек Базис Актив ВТБ

- [ADIRGSLSUPP-1376](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1376): Исправления печатных форм Базис Актив ВТБ

- [ADIRGSLSUPP-1379](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1379): Автоматическое формирование справок для ФНС. Доработка

- [ADIRGSLSUPP-1383](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1383): Карточка ЮЛ:

    * Настроен атрибут Бенефициарный владелец

- [ADIRGSLSUPP-1384](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1384): Замена конфигурационных файлов Migration среды

- [ADIRGSLSUPP-1385](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1385): Правки по тестированию БА ВТБ

- [ADIRGSLSUPP-1386](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1386): Скорректировать размер полей в заявлении

- [ADIRGSLSUPP-1388](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1388): Настройка печатных форм для продуктов "Забота о будущем","Забота о будущем Ультра"для партнёра ВТБ (КИД)

- [ADIRGSLSUPP-1389](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1389): Закрытие продуктов

- [ADIRGSLSUPP-1390](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1390): Маппинг Забота о будущем, Забота о будущем Ультра ВТБ

- [ADIRGSLSUPP-1392](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1392): 70+ тестирование (правки найденых недочетов при тестировании)

- [ADIRGSLSUPP-1396](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1396): Добавлен новый атрибут "Куратор" на коллективный договор страхования.

- [ADIRGSLSUPP-1397](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1397): Коллективные договоры:

    * Изменен код Партнера для продукта ДМС "CorpDMS19633" на 192559.
    * Для партнера 192559 настроены продукты:
        * Код продукта NSIBPOOLS192559. "Коллективное страхование физических лиц от НСиБ (пулы)".
        * Код продукта MIXED192559. "НСЖ. Смешанное страхование жизни"

- [ADIRGSLSUPP-1398](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1398): Роль для коучей: нет разграничения в журнале договоров в разрезе доп.офисов.

- [ADIRGSLSUPP-1399](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1399): У ВТБ не отображается продукт Базис Актив

- [ADIRGSLSUPP-1400](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1400): Расторжения - Запросы в смежные подразделения:

    * Поле "Текст запроса" разблокировано для всех подразделений

- [ADIRGSLSUPP-1406](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1406): Корректировка ставок ДГ ВТБ

- [ADIRGSLSUPP-1407](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1407): БФКО_Защита кредита_настройка для загрузки ошибочных договоров

- [ADIRGSLSUPP-1408](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1408): Необходимо скорректировать выгрузку реестра в САП с учётом високосного года

- [ADIRGSLSUPP-1412](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1412): Доработка настроек БА ВТБ

- [ADIRGSLSUPP-1417](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1417): ВТБ_На всякий случай Ультра_корректировка тарифов по КЗ

- [ADIRGSLSUPP-1423](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1423): Конвертирована печатка "Анкета 70+" к новому формату.

- [ADIRGSLSUPP-1425](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1425): Заменить конфиг файл Scheduler предпрода.

- [ADIRGSLSUPP-1426](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1426): Коллективные договоры:

    * Отключена валидация на прикрепление любых вложений при переводе любого коллективного договоров в статус Подписан.
    * Добавлен в UI расчет строка действия договора во все коллективные договоры.

- [ADIRGSLSUPP-1430](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1430): Убрать из роли SMGO кнопку экспорт.

- [ADIRGSLSUPP-1431](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1431): Настройка ПФ Забота о будущем результаты тестирования

- [ADIRGSLSUPP-1432](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1432): Правки по КИД Забота о будущем ВТБ

- [ADIRGSLSUPP-1433](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1433): Правки по результатам тестирования по продуктам Создание нового продукта "Забота о будущем", "Забота о будущем Ультра".

- [ADIRGSLSUPP-1438](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1438): Доработка функционала электронных полисов для новой версии платформы.

- [ADIRGSLSUPP-1442](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1442): Открыть продукт для тестирования ДГ Зенит 2 года

- [ADIRGSLSUPP-1449](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1449): Заменить конфиг IdentityServer Тестовой среды.

- [ADIRGSLSUPP-1478](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1478): Партнеры_изменение исторической доходности в продуктах Базис Актив

- [ADIRGSLSUPP-1482](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1482): ВТБ_обновление формы банка ВТБ

- [ADIRGSLSUPP-1532](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1532): Правки ПФ по продуктам Забота о будущем и Забота о будущем ультра

- [ADIRGSLSUPP-1534](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1534): Настройка ПФ по продукту Забота о семье, ВТБ

- [ADIRGSLSUPP-1535](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1535): Explain your changes here

- [ADIRGSLSUPP-1553](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1553): БФКО.Откат настроек по КСЖ для ошибочных договоров.

- [ADIRGSLSUPP-1554](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1554): Декларации по продуктам Забота о будущем, Забота о будущем Ультра

- [ADIRGSLSUPP-1557](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1557): ВТБ_На всякий случай ультра_ошибка в заявлении

- [ADIRGSLSUPP-1564](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1564): ВТБ.Открытие продуктов-Забота о будущем

- [ADIRGSLSUPP-1566](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1566): Ошибка при формировании РНВ из ДС на расторжение.

- [ADIRGSLSUPP-1571](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1571): Изменение логики проводок для валютных платежей

- [ADIRGSLSUPP-1581](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1581): ВТБ_Забота о будущем/Забота о будущем Ультра

- [ADIRGSLSUPP-1588](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1588): Замените config файл Identity.Server ПРОДуктива

- [ADIRGSLSUPP-1589](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1589): Замените config файл Identity.Server ПРЕД-ПРОД среды

- [ADIRGSLSUPP-1590](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1590): Внедрение опросника по Налоговому вычету - 3 часть

- [ADIRGSLSUPP-1591](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1591): Реиндексация с учетом категории выгодоприобретателя.

- [ADIRGSLSUPP-1592](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1592): Ошибка в журнале договоров_миграционная среда на новой платформе.


### Fixed (18 changes)

- [ADIRGSLSUPP-1234](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1234): Квитовка на договор с тех. допником со сменой валюты - анализ

- [ADIRGSLSUPP-1239](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1239): Электронные договоры:

    * Добавлена обработка ситуации, при которой договор был изменён другим пользователем.

- [ADIRGSLSUPP-1248](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1248): Фиксированный курс - доработка логики

- [ADIRGSLSUPP-1331](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1331): Кумуляция:

    * Исправлена ошибка расчета кумуляция в зависимости от принадлежности риска.

- [ADIRGSLSUPP-1410](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1410): Ошибка при открытии карточки контрагента

- [ADIRGSLSUPP-1411](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1411): Ошибка Body не должно иметь дополнительные свойства (Body), блокирующая создание договора

- [ADIRGSLSUPP-1413](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1413): Ошибка при импорте банковской выписки

- [ADIRGSLSUPP-1427](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1427): Не блокирующая ошибка при загрузке ДИД после обновления платформы

- [ADIRGSLSUPP-1436](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1436): Ошибка при создании расторжения и при смене статуса

- [ADIRGSLSUPP-1477](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1477): Fix UI labels on input controls

- [ADIRGSLSUPP-1481](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1481): Исправлены ошибки при создании котировок НСЖ и КСЖ

- [ADIRGSLSUPP-1530](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1530): Ошибка при расчете премии по застрахованным

- [ADIRGSLSUPP-1552](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1552): Кумуляция:

    * Добавлено очищение информации по кумуляции при копировании котировки.
    * Исправлено согласующее подразделение на "Андеррайтеры".

- [ADIRGSLSUPP-1562](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1562): Обработка ошибки при попытке ручной идентификации

- [ADIRGSLSUPP-1570](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1570): Замечания по созданию карточки контрагента из котировки и договора

- [ADIRGSLSUPP-1573](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1573): Ошибка при загрузке реестра к двум платежам

- [ADIRGSLSUPP-1582](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1582): Справки для налоговой:

    * Исправлена ошибка при выборе договора.
    * Исправлена ошибка при поиске договора.

- [ADIRGSLSUPP-1587](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1587): Котировки:

    * Исправлен исполнитель для котировок по умолчанию на группу УКСП

# 62.0.0-rc1 (2024-02-21)

### Breaking Changes (3 changes)

- [ADIRGSLSUPP-1166](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1166): ### Архивация устаревших данных

    * Подготовлен скрипт для удаления дубликатов из таблицы ```BFX.INTEGRATION_MESSAGE_ERROR``` которые уже были добавлены в архивную таблицу ```BFX_IMPL.INTEGRATION_MESSAGE_ERROR_ARCH```
    * Удалён PK таблицы ```INTEGRATION_MESSAGE_GROUP_ARCH```

    **Выполнить скрипты:**
    1. database\sql\migration\ADIRGSLSUPP-1166-remove_undeleted_int_mes_err.sql
    2. database\sql\migration\ADIRGSLSUPP-1166-drop_pk_int_mes_gr_arch.sql

- [ADIRGSLSUPP-1295](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1295): Корректировка paymentFrequency в common body договоров.

    После паблиша необходимо выполнить скрипт:
    database\sql\migration\ADIRGSLSUPP-1295-paymentFrequency-update.sql

- [ADIRGSLSUPP-131](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-131): Изменён тип поля "Год страхования" на интервальный, обновлён Датаэкспорт условий вознаграждения

    Необходимо выполнить скрипты:
    database\sql\migration\ADIRGSLSUPP-131-change-insurance-year-create-backup.sql
    database\sql\migration\ADIRGSLSUPP-131-change-insurance-year-type.sql

    А также необходимо выполнить schame-скрипт до паблиша:
    database\sql\Schema\8.50_006.020.007_20240118112911_adirgslsupp_131.sql


### New Features (75 changes)

- [ADIRGSLSUPP-1084](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1084): Импорт реестра платежей:

    * Если в реестре платежей содержатся строки с отрицательной суммой, то реестровые платежи на такие строки не будут создаваться

- [ADIRGSLSUPP-1122](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1122): Коллективные договоры:

    * Настроен новый продукт "Коллективный ДМС"
    * Добавлен перевод на валидацию бенефициарного владельца
    * Скорректирован сегмент на общий с massNSIBPOOL на massCorp

- [ADIRGSLSUPP-1152](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1152): Обновление памятки Налоговый вычет

- [ADIRGSLSUPP-1153](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1153): Правки по печатным формам ДГ Совкомбанк

- [ADIRGSLSUPP-1157](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1157): ВТБ Прайм_На всякий случай Ультра_Печатные формы

- [ADIRGSLSUPP-1170](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1170): Базовая реализация сущности "Коллективный убыток"

    **Доп инструкции**
    Добавлена новая переменная в environmentVariables.json
    "rgsl.createCollectiveVlaimParams.defaultApplicantCode": "3" - код контрагента, который устанавливается как заявитель по-умолчанию в коллективном убытке.

- [ADIRGSLSUPP-1180](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1180): Коллективные договоры:

    * Настроены новые продукты:
        * "Коллективное страхование сотрудников ЧОП от НСиБ"
        * "Коллективное страхование детей от НСиБ без андеррайтинга"
        * "Коллективное страхование физических лиц от НСиБ (Посетители)"
        * "Коллективное страхование физических лиц от НСиБ (Взрослые)"
        * "Коллективное страхование физических лиц от НСиБ (Дети)"
        * "НСЖ. Смешанное страхование жизни"

    * Добавлен срок действия договора в виде текстовой строки

- [ADIRGSLSUPP-1193](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1193): ВТБ_На всякий случай Ультра_результат тестирования от 22.01.

- [ADIRGSLSUPP-1194](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1194): Правила_обновление справочника

- [ADIRGSLSUPP-1197](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1197): Создание продуктов под миграцию (4 продукта)

- [ADIRGSLSUPP-1202](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1202): Доработка логики использования фикс. курса: платеж всегда использует курс на дату оплаты

- [ADIRGSLSUPP-1208](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1208): Закрытие стратегии Акции ВТБ для Базис Инвест 17 БА

- [ADIRGSLSUPP-1210](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1210): Маппинг Драйвер Гарантия Ультра сегмент Прайм Евро в конце/ежегодно 00810 и 00811

- [ADIRGSLSUPP-1216](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1216): ВТБ_Лесенка.

- [ADIRGSLSUPP-1220](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1220): не заполнены значения PRODUCT_CLASS в таблице [BFX_IMPL].[PRODUCTS]

- [ADIRGSLSUPP-1222](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1222): Дополнение лимитов ДГ ВТБ

- [ADIRGSLSUPP-1223](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1223): ВТБ_лесенка_отключение заявления на страхование

- [ADIRGSLSUPP-1224](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1224): БФКО. КСЖ. Правки.

- [ADIRGSLSUPP-1225](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1225): Скорректировать период охлаждения сервисов

- [ADIRGSLSUPP-1226](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1226): Роль для Коучей.

- [- ADIRGSLSUPP-1231](https://jira.adacta-fintech.com/browse/- ADIRGSLSUPP-1231): Замена памятки НВ.

- [ADIRGSLSUPP-1232](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1232): Корректировка памятки ЦБ_результат тестирования

- [ADIRGSLSUPP-1239](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1239): Электронные договоры:

    * Добавлена информация об ошибке когда перевод договора в статус «Подписан» невозможен
    * Увеличен таймаут дата провайдера

- [ADIRGSLSUPP-1240](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1240): Скорректировать стратегию для продукта миграции

- [ADIRGSLSUPP-1249](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1249): ВТБ. Изменение ставок.

- [ADIRGSLSUPP-1251](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1251): Импорт пользователей:

    * Добавлен функционал загрузки пользователя по выбранному подразделению.

- [ADIRGSLSUPP-1257](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1257): Создание миграционных продуктов

- [ADIRGSLSUPP-1259](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1259): Правки по результатам тестирования ВТБ ДГ

- [ADIRGSLSUPP-1264](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1264): Коллективные договоры:

    * Для продуктов "Коллективное страхование физических лиц от НСиБ (пулы)" по дефолту будет заполнен чек-бокс calcFromInsuredSum.

- [ADIRGSLSUPP-1265](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1265): Коллективные договоры:

    * Скорректирована маска договора, где префикс состоит из 3 цифр: префикс 3 цифры + последние два знака года даты начала действия договора
    * Скорректирована маска договора, где значение префикса 31200: первые 3 цифры + последние два знака года даты начала действия договора

- [ADIRGSLSUPP-1269](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1269): Налоговые справки

- [ADIRGSLSUPP-127](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-127): Внутренние уведомления:

    * Настроены уведомления бухгалтерии: страхователь нерезидент, переданных актах на оплату
    * Настроены уведомления УКСП: выпуск полиса, триггеры
    * Настроены уведомления создание контрагента ЮЛ
    * Обезличен в комментариях сотрудник ПП

- [ADIRGSLSUPP-1276](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1276): Памятка ЦБ. Корректировки по результатам теста.

- [ADIRGSLSUPP-1282](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1282): ВТБ. Корректировка ставок.

- [ADIRGSLSUPP-1285](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1285): Замечания по результатам теста Тёрм лайф 05.02 ч.1

- [ADIRGSLSUPP-1286](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1286): ВТБ_На всякий случай ультра_корректировка печатных форм

- [ADIRGSLSUPP-1287](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1287): ВТБ_На всякий случай ультра_правки по настройке продукта

- [ADIRGSLSUPP-1290](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1290): ВТБ. Терм. Корректировка сервиса и возраста в пакетах.

- [ADIRGSLSUPP-1293](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1293): Корректировка памяток ЦБ

- [ADIRGSLSUPP-1296](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1296): Убрать ограничение по возрасту ДГ ВТБ

- [ADIRGSLSUPP-1297](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1297): ВТБ_На всякий случай Ультра_правки

- [ADIRGSLSUPP-1298](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1298): ВТБ_Стратегия на пять. Гарант Ультра

- [ADIRGSLSUPP-1299](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1299): Скорректировать ставки по ДГ ВТБ

- [ADIRGSLSUPP-1300](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1300): ВТБ_На всякий случай Ультра.

- [ADIRGSLSUPP-1304](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1304): ВТБ_На всякий случай ультра_корректировка заявления и КИД

- [ADIRGSLSUPP-1309](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1309): Нет памятки по подарочным мед сервисам на продуктах БФКО.

- [ADIRGSLSUPP-1310](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1310): Правки в Памятке ЦБ

- [ADIRGSLSUPP-1319](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1319): Cоздание роли для продуктов РСЖ

- [ADIRGSLSUPP-1320](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1320): Ошибка при установке 61 0 11 (тест и предпрод)

- [ADIRGSLSUPP-1323](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1323): ВТБ_На всякий случай Ультра правки по ПФ

- [ADIRGSLSUPP-1324](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1324): Корректировка сортировки реиндексации.

- [ADIRGSLSUPP-1325](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1325): Сервер Adacta RC:

    * Обновлена конфигурации почтового сервера для RC

- [ADIRGSLSUPP-1326](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1326): ВТБ_На всякий случай Ультра_правки по результатам тестирования

- [ADIRGSLSUPP-1328](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1328): Настроена валидации ВТБ для клиентов старше 70 лет

- [ADIRGSLSUPP-1333](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1333): В ошибка в договорах продукта Стратегия на пять сегмента Привилегия ВТБ

- [ADIRGSLSUPP-1335](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1335): Разработка печатных форм, для продуктов Базис Актив ВТБ

- [ADIRGSLSUPP-1343](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1343): Заменить конфиги предпрода.

- [ADIRGSLSUPP-1345](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1345): ВТБ_На всякий случай Ультра_конфигурация пакетных ограничений.

- [ADIRGSLSUPP-1348](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1348): Скорректировать пункт 2 в декларация ВТБ ДГ

- [ADIRGSLSUPP-1349](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1349): Открыть для тестирования валюту ЕВРО ДГ ВТБ

- [ADIRGSLSUPP-1350](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1350): ВТБ_На всякий случай Ультра_правки по замечаниям от 14.02.

- [ADIRGSLSUPP-1351](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1351): ВТБ_На всякий случай ультра_правки в печатных формах (замечания от 14.02.)

- [ADIRGSLSUPP-1353](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1353): Настройка продуктов Базис Актив ВТБ

- [ADIRGSLSUPP-1354](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1354): ВТБ_На всякий случай ультра_декларации в ПФ договора и в UI

- [ADIRGSLSUPP-1357](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1357): Замена конфигурационных файлов тестовой среды.

- [ADIRGSLSUPP-1365](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1365): ВТБ_На всякий случай Ультра_блокировка поля

- [ADIRGSLSUPP-1366](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1366): Правки печатных форм по результатам тестирования

- [ADIRGSLSUPP-1367](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1367): Внести исправления по результатам тестирования базис Актив ВТБ

- [ADIRGSLSUPP-1369](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1369): Маппинг Базис Актив и Базис Актив Ультра для ВТБ Премиум и Прайм 00821, 00822, 00823, 00824

- [ADIRGSLSUPP-1372](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1372): БФКО_Базис гарант 2.0_мед декларации для застрахованного 76+

- [ADIRGSLSUPP-562](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-562): Акт по расторжениям - анализ

- [ADIRGSLSUPP-698](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-698): ВТБ_TERM LIFE. Корректировка задачника и валидации на существование продукта.

- [ADIRGSLSUPP-720](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-720): Пофикшены синки в сервисе по апдейту контрагента

- [ADIRGSLSUPP-746](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-746): Отображение договоров Прайвет БФКО через API_EFR. Корректировка.

- [ADIRGSLSUPP-913](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-913): Пополнение справочника ошибок верификации в ПО Адакта


### Improvements (1 changes)

- [ADIRGSLSUPP-1332](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1332): ### Архивация устаревших данных

    * Добавлен вариант переноса записей в архив не единой транзакцией, а частями для ```ARCHIVE_CONTRACT_HISTORY ```.

    **Руководство по выполнению смотреть в пункте «Перенос записей частями» инструкции:**
    ```docs\administration\DatabaseHousekeeping.md```


### Fixed (3 changes)

- [ADIRGSLSUPP-1150](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1150): Ошибка_[object Object]

- [ADIRGSLSUPP-1196](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1196): Ошибка при привязке платежа_Zero allocation amount

- [ADIRGSLSUPP-1266](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1266): Коллективные договоры:

    * Исправлено формирование графика оплат
    * Исправлена ручная ставка при импорте застрахованных

# 61.0.0-rc1 (2024-01-24)

### Breaking Changes (2 changes)

- [ADIRGSLSUPP-1106](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1106): После publishing-а необходимо выполнить скрипт:
    - database\sql\migration\acc_impl_v_rsd_job_pp_data.sql

- [ADIRGSLSUPP-1166](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1166): ### Архивация устаревших данных

    * Добавлена архивация BFX.ATTACHMENT_RELATED_ENTITY
    * Добавлен статус (3 - Ожидает удаления) для вложений в процедуры архивации

    **После паблиша необходимо выполнить скрипты для создания\пересоздания процедур архивации:**
    ```database\sql\migration\ADIRGSLSUPP-706-archive-attachment-related-entity-procedure.sql.sql```
    ```database\sql\migration\ADIRGSLSUPP-706-archive-attachment-procedure.sql```
    ```database\sql\migration\ADIRGSLSUPP-706-archive-file-metadata-procedure.sql```

    **В планировщике заданий настроить выполнение раз в месяц следующих процедур в следующем порядке:**
    ```ARCHIVE_ATTACHMENT_RELATED_ENTITY```
    ```ARCHIVE_ATTACHMENT```
    ```ARCHIVE_FILE_METADATA```

    **Подробная инструкция:**
    ```docs\administration\DatabaseHousekeeping.md```


### New Features (59 changes)

- [ADIRGSL-3523](https://jira.adacta-fintech.com/browse/ADIRGSL-3523): Доработка системы для настройки продукта ДМС для БФКО РВ

- [ADIRGSLSUPP-1037](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1037): Исправлено появление валидации: "Необходимо указать количество возвращаемых записей на странице!" при переходе в журнал платежей из загруженного платежа и при выборе выгодоприобретателей в дожитии/ДИД.

- [ADIRGSLSUPP-1041](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1041): Increase timeout

- [ADIRGSLSUPP-1059](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1059): Реализована строка выплат "Обязательства" для ДС на расторжение.

- [ADIRGSLSUPP-1067](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1067): Исправлена ошибка при поиске, когда в списке номеров есть пробел между номерами

- [ADIRGSLSUPP-1085](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1085): ВТБ_На всякий случай Ультра (Терм)_правки по результатам тестирования

- [ADIRGSLSUPP-1087](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1087): Перенастройка типизации рисков - датафикс

- [ADIRGSLSUPP-1094](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1094): Изменение настроек передачи событий в ELMA365

- [ADIRGSLSUPP-1095](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1095): Не активна кнопка Отменить идентификацию на проде

- [ADIRGSLSUPP-1098](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1098): Справки для налоговой:

    * Дата выдачи справки обновляется на текущую дату при обновлении документа в статусе Проект.

- [ADIRGSLSUPP-1102](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1102): Налоговые справки:

    * Изменены правила отнесения риска к life/non life.

    > :warning: При появлении новых рисков нужно учитывать столбец **FNS_TYPE** таблицы **BFX_IMPL.RISKS** в скриптах!

- [ADIRGSLSUPP-1105](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1105): Налоговые справки_ПФ

- [ADIRGSLSUPP-1107](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1107): КСЖ. Изменене периода охлаждения.

- [ADIRGSLSUPP-1108](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1108): Загрузка старых платежей в Адиншур из 1С

- [ADIRGSLSUPP-1109](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1109): Изменение памятки ЦБ в продуктах ИСЖ

- [ADIRGSLSUPP-1111](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1111): Стратегия на пять. Гарант. Изменение кешбека.

- [ADIRGSLSUPP-1112](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1112): Рабочий календарь_ошибка.

- [ADIRGSLSUPP-1113](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1113): Добавлено формирование POLICY_SAT после активации технического ДС.

- [ADIRGSLSUPP-1115](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1115): Налоговые справки_ПФ_добавить печать

- [ADIRGSLSUPP-1116](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1116): Дополнение графика траншей Базис инвест

- [ADIRGSLSUPP-1118](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1118): ПСБ. Драйвер гарантия. Изменение ставок.

- [ADIRGSLSUPP-1125](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1125): Коллективные договоры:

    * Настроена новая группа продуктов "НСИБ".

- [ADIRGSLSUPP-1126](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1126): Драйвер Гарантия Ультра 4 года ЕВРО ВТБ

- [ADIRGSLSUPP-1128](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1128): Зенит. Изменение кешбека. СНПГарант.

- [ADIRGSLSUPP-1129](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1129): Исправлена ошибка с не верным запросом к сервису dadata.

- [ADIRGSLSUPP-1133](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1133): Доработка валютного курса для убытков

- [ADIRGSLSUPP-1135](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1135): Маппинг На всякий случай Ультра" (Term life) ВТБ (00807)

- [ADIRGSLSUPP-1136](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1136): Добавление номера телефона для тестирования кода электро полисов на препрод и тест

- [ADIRGSLSUPP-1137](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1137): Лесенка_обновление справочник доходности

- [ADIRGSLSUPP-1139](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1139): Fix appsettings path in plugins

- [ADIRGSLSUPP-1145](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1145): Необходимо внести изменения в файл sapFilesIntergationHelper.sql.

- [ADIRGSLSUPP-1147](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1147): Удаление паролей из конфигурационных файлов на среде RC.

- [ADIRGSLSUPP-1148](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1148): ВТБ. Изменение мин. премии в СНП Гарант

- [ADIRGSLSUPP-1149](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1149): Исправлен процесс экспорта условий вознаграждения

- [ADIRGSLSUPP-1151](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1151): Лесенка КВ:

    * Если тип выплаты "Ежегодный", то КУ/ИЧ будет равен ставке доходности.
    * Если тип выплаты "В конце срока", то КУ/ИЧ рассчитывается как ставка доходности * срок страхования.

- [ADIRGSLSUPP-1154](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1154): Маппинг_для продуктов Драйвер Гарантия_лестничная конструкция.

- [ADIRGSLSUPP-1155](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1155): БФКО. Закрыте продукта КСЖ авто.

- [ADIRGSLSUPP-1158](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1158): Исправлено отображение атрибута barrierAutoCall на юайке

- [ADIRGSLSUPP-1161](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1161): Правки по результатам тестирования ДГ Совкомбанк

- [ADIRGSLSUPP-1162](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1162): Правки по результатам тестирования ДГ Ультра ВТБ

- [ADIRGSLSUPP-1163](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1163): Оптимизация времени загрузки журнала договоров

- [ADIRGSLSUPP-1168](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1168): ВТБ.Корректировка ставок по лестничной конструкции.

- [ADIRGSLSUPP-1169](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1169): Добавлены ролевые ограничения на выгрузку отчетов. См. подробнее в задаче JIRA.

- [ADIRGSLSUPP-1174](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1174): Удаление дублей миграционных продуктов из product configuration

- [ADIRGSLSUPP-1176](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1176): Исправление схемы дата провайдера ETL сервиса по созданию рнв для убытков

- [ADIRGSLSUPP-1179](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1179): Корректировка view ALGL_2: заглавные буквы в номере договора

- [ADIRGSLSUPP-1181](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1181): Витрина задач:

    * Изменена логика работы на вкладке Групповые задачи - проверяется наличие заполненного поля с исполнителем при нажатии кнопки "Назначить", исполнитель выбирается только поиском, без возможности ввода вручную.

- [ADIRGSLSUPP-1183](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1183): ВТБ. Добавление ставки. Драйвер гарантия Ультра.

- [ADIRGSLSUPP-1186](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1186): МинБанк.Корректировка сервиса.

- [ADIRGSLSUPP-1199](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1199): Налоговые справки:

    * Реализован функционал обновления данных контрагентов.

- [ADIRGSLSUPP-1205](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1205): Корректировка заполнения доп. сервисов через API.

- [ADIRGSLSUPP-143](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-143): Добавлена ссылка на карточку партнёра в АД

- [ADIRGSLSUPP-183](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-183): АВР_Журнал строк АВР

- [ADIRGSLSUPP-51](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-51): Убытки: выплата одному выгодоприобретателю

- [ADIRGSLSUPP-605](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-605): Доработка отображения проводок

- [ADIRGSLSUPP-746](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-746): Отображение договоров Прайвет БФКО через API_EFR.

- [ADIRGSLSUPP-821](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-821): АВР:

    * Добавлены статусы в которых не должна срабатывать проверка на период при сохранении АВР:
        * Deleted (Проект / Удалён)
        * Approved (Подтвержден / Подписан)
        * CompletedPayOrder (Возврат КВ / Получен)
        * CompletedPaid (Оплачен)
        * Annulled (Подтвержден / Сторнирован)
    * Добавлена ссылка на документ во всплывающем сообщении.

- [ADIRGSLSUPP-918](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-918): Заведение стратегий в продуктах

- [ADIRGSLSUPP-970](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-970): Добавить роли партнера в загрузчик


### Fixed (10 changes)

- [ADIRGSLSUPP-1017](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1017): Ошибка при квитовке платежа_Sequence contains no matching element at System.Linq.ThrowHelper.ThrowNoMatchException

- [ADIRGSLSUPP-1104](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1104): Ошибка при установке 60.0.0

- [ADIRGSLSUPP-1127](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1127): Лестница ставок КВ:

    * Исправлена Ручная ставка КВ и расчет Комиссии при отправке заявки на Рассмотрение или перезагрузки котировки.

- [ADIRGSLSUPP-1131](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1131): Коллективные договоры:

    * При срабатывании триггера на комплаенс, задачи на согласование будут направляться напрямую на комплаенс.
    * Добавлен новый компонент формы выпуска только для коллективных договоров.

- [ADIRGSLSUPP-1143](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1143): При Ручной идентификации договора предустановлено направление платежа = Исходящий

- [ADIRGSLSUPP-1150](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1150): Ошибка_[object Object]

- [ADIRGSLSUPP-1167](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1167): Ошибка при загрузке выписки формата excel

- [ADIRGSLSUPP-1192](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-1192): Коллективные договоры:

    * Исправлена ошибка: "У пользователя нет доступа к данному документу."

- [ADIRGSLSUPP-188](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-188): АВР. Удаленные строки акта

- [ADIRGSLSUPP-641](https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-641): Завис документ РСД на тестовой среде