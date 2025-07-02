# Конфигурация продуктов в БД

## Импорт через загрузку Excel файла productConfiguration.xlsx
- Документ импорта находиться в основном меню, во вкладке "Конфигурация -> Продукты".
![Импорт конфигурации продуктов](images\productConfiguration\productConfigurationImport.png "Импорт конфигурации продуктов")

### 1 шаг. Выбор файла.
- Выбрать файл для загрузки configuration\@config-rgsl\integration-tests\test\api\scenarios\InitialData\productConfiguration.xlsx.
- Нажать на кнопку "Сохранить"(правый нижний угол) для передачи на сервер и присвоению номера для документа загрузки.
- Нажать на выбор "Действия"(правый верхний угол) и выбрать "Начать загрузку" для начало импорта данных. Подтвердить действие в выпавшем  диалоговом окне.

### 2 шаг. Загруженная Информация.
- После успешного импорта файла, появляется вкладка "Загруженная информация". В поле "Загруженные данные" отражаются строки успешно прошедшие валидацию на заполненность. В поле "Ошибки по загруженной информации" отражаются строки не прошедшие валидацию. Данные строки нужно скорректировать в соответствии с сообщением об ошибке в файле productConfiguration.xlsx и загрузить корректный файл заново.

- Иногда если файл слишком большой процесс загрузки может остановиться на статусе "Загружаю" требуется в ручную обновить страницу(F5), до получения статуса "Загружено", для отображения результата и выбора дальнейшего действия.

### 3 шаг. Загруженные данные.
- Импорт данных в БД начнётся автоматически, если ошибок валидации в загружаемом файле не будет найдено.
- После того как был запущен процесс импорта появляется вкладка "Загруженные данные". До получения документом статуса "Импортировано" в нем будут отражаться статусы выполненных загрузок строк на данный момент времени. В случае зависания сервиса на сервере статус "Импортировано" не присваевается.
- Все успешные загрузки отражаются в поле "Импортированные данные".
- Все неуспешные загрузки отражаются в поле "Ошибка импорта".

## Наименование таблицы в БД.
- BFX_IMPL.PRODUCT_CONF

## Роли обладающие правами на загрузку.
- Administrator
- ProductConfigurationImportSpecialist

## Создание договора через сервис
- В body необходимо указать пустой объект productConfiguration, в enrichFields вызвать энричмент /productConfiguration.

> "productConfiguration": {},
> "enrichFields": [
>     "/productConfiguration"
> ]

![Создание договора через сервис](images\productConfiguration\productConfigurationService.png "Создание договора через сервис")

## Скрипты
#### Получить конфигурацию продукта в JSON формате
> database\sql\migration\ADIRGSLSUPP-2458-Get-product-configuration-json-by-issue-date-and-product-code.sql

## Обновление конфигурации продукта в Body документа через UI

- Администрирование -> Изменение конфигурации продукта
- Выбрать договор
- Автоматически подберётся номер последней версии конфигурации продуктов, который можно изменить в случае крайней необходимости
- Выполнить, дождаться сообщения об успешном обновлении договора.

## Обновление конфигурации продукта в Body документа через сервис

> {{SERVER_URI}}/api/core/shared/integration-services/GeneralUpdateContract/1

##### Пример запроса
```json
{
    "data": {
        "contractNumber": "47100-99000001",
        "productConfigurationVersion": 5,
        "modificationType": "productConfiguration"
    }
}
```

## Добавление нового столбца в конфигурацию

#### Необходимо внести изменения в следующие файлы:

##### Product configuration
```
configuration/@config-rgsl/integration-tests/test/api/scenarios/InitialData/productConfiguration.xlsx
```

##### Lib
```
configuration\@config-rgsl\life-insurance\lib\productConfigurationHelper.js
```

##### DS + DP
```
configuration\@config-rgsl\life-insurance\dataSource\ProductConfigurationXlsxFileLoaderDataSource\resultMapping.js
configuration\@config-rgsl\life-insurance\dataSource\ProductConfigurationXlsxFileLoaderDataSource\resultSchema.json
configuration\@config-rgsl\life-insurance\dataProvider\xlsxFileDataProvider\ProductConfigurationXlsxFileLoaderDataProvider\configuration.json
configuration\@config-rgsl\life-insurance\dataProvider\database\GetProductConfigurationImportDataProvider\query.handlebars
configuration\@config-rgsl\life-insurance\dataSource\GetProductConfigurationDataSource\resultMapping.js
configuration\@config-rgsl\life-insurance\dataSource\GetProductConfigurationDataSource\resultSchema.json
configuration\@config-rgsl\life-insurance\dataSource\GetProductConfigurationImportDataSource\resultMapping.js
configuration\@config-rgsl\life-insurance\dataSource\GetProductConfigurationImportDataSource\resultSchema.json
```

##### DE
```
configuration\@config-rgsl\life-insurance\dataExport\ExportProductConfiguration\dataSchema.json
configuration\@config-rgsl\life-insurance\dataExport\ExportProductConfiguration\resultMapping.js
configuration\@config-rgsl\life-insurance\dataExport\ExportProductConfiguration\dataFormats\ExportExcelProductConfiguration\template.xlsx
```

##### View
```
configuration\@config-rgsl\life-insurance\view\ProductConfigurationLoadedDataFromExcel\UI\UiSchema.json
configuration\@config-rgsl\life-insurance\view\SuccessfullyImportedProductConfiguration\UI\uiSchema.json
configuration\@config-rgsl\life-insurance\view\ProductConfigurationSearch\UI\ResultsContent.json
```

##### ASS
```
configuration\@config-rgsl\life-insurance\model\BFX_IMPL\PRODUCT_CONF.json
configuration\@config-rgsl\life-insurance\etlService\ProductConfigurationImportEtlService\sinkMappings\WriteToProductConfigurationTable\mapping.js
```

##### DB
```
database\sql\migration\ADIRGSLSUPP-2176-Product-configuration-update-contracts-body.sql
database\sql\migration\ADIRGSLSUPP-2176-Product-configuration-update-canc-and-tech-amendments-body.sql
database\sql\migration\ADIRGSLSUPP-2176-Product-configuration-update-fin-and-nonfin-amendments-body.sql
database\sql\migration\ADIRGSLSUPP-2458-Get-product-configuration-json-by-issue-date-and-product-code.sql
```

##### DataSchema
```
configuration\@config-rgsl\life-insurance\component\ProductConfiguration\dataSchema.json
```

##### New script - Add new column
```sql
IF
EXISTS (SELECT 1 FROM sys.objects WHERE OBJECT_ID = OBJECT_ID(N'[BFX_IMPL].[PRODUCT_CONF]') AND TYPE IN (N'U'))
AND
NOT EXISTS (SELECT 1 FROM sys.columns WHERE NAME = N'NEW_COLUMN_NAME' AND OBJECT_ID = OBJECT_ID(N'[BFX_IMPL].[PRODUCT_CONF]'))
BEGIN
	ALTER TABLE BFX_IMPL.PRODUCT_CONF ADD NEW_COLUMN_NAME NEW_COLUMN_TYPE NULL
END
GO
```