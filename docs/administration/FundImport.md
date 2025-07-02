---
issue: ADIRGSLSUPP-3461
link: https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-3461
---

<style>
red { color: Red; font-weight: bold; }
darkBlue { color: DarkBlue; font-weight: bold; }
green { color: Green; font-weight: bold; }
blue { color: Blue; font-weight: bold; }
</style>

# Импорт ДСЖ

## Импорт происходит через загрузку Excel файла *.xlsx
- Документы импорта находятся в основном меню, во вкладке **Импорт ДСЖ**.
    - **Данные о фондах.**
    - **Данные об активах в фондах.**

### 1 шаг. Выбор файла.
- Выбрать файл для загрузки, пример есть в задаче ADIRGSLSUPP-3461.
- Нажать на кнопку "Сохранить"(правый нижний угол) для передачи на сервер и присвоению номера для документа загрузки.
- Нажать на выбор "Действия"(правый верхний угол) и выбрать "Начать загрузку" для начало импорта данных. Подтвердить действие в выпавшем  диалоговом окне.

### 2 шаг. Загруженная Информация.
- После успешного импорта файла, появляется вкладка "Загруженная информация". В поле "Загруженные данные" отражаются строки успешно прошедшие валидацию на заполненность. В поле "Ошибки по загруженной информации" отражаются строки не прошедшие валидацию. Данные строки нужно скорректировать в соответствии с сообщением об ошибке в файле импорта и загрузить корректный файл заново.

- Иногда если файл слишком большой процесс загрузки может остановиться на статусе "Загружаю" требуется в ручную обновить страницу(F5), до получения статуса "Загружено", для отображения результата и выбора дальнейшего действия.

### 3 шаг. Загруженные данные.
- Импорт данных в БД начнётся автоматически, если ошибок валидации в загружаемом файле не будет найдено.
- После того как был запущен процесс импорта появляется вкладка "Загруженные данные". До получения документом статуса "Импортировано" в нем будут отражаться статусы выполненных загрузок строк на данный момент времени. В случае зависания сервиса на сервере статус "Импортировано" не присваевается.
- Все успешные загрузки отражаются в поле "Импортированные данные".
- Все неуспешные загрузки отражаются в поле "Ошибка импорта".

## Наименование таблицы в БД.
- BFX_IMPL.FUND (Данные о фондах)
- BFX_IMPL.FUND_ASSETS (Данные об активах в фондах)
- BFX_IMPL.FUND_STATUS (Справочник доступных статусов фонда)
    |ID	|CODE	                        |DESCRIPTION                              |
    |---|-------------------------------|-----------------------------------------|
    |1	|NOT_SET	                    |-                                        |
    |2	|CREATED_COOLING_PERIOD	        |Создан, идет период охлж.                |
    |3	|FORMING	                    |Формируется                              |
    |4	|FORMED_MATCHED_DECLARATION	    |Сформирован, соответствует декларации    |
    |5	|FORMED_NOT_MATCHED_DECLARATION	|Сформирован, не соответствует декларации |
    |6	|DISBANDMENT	                |Расформирование                          |
    |7	|SOLD_OUT	                    |Распродан                                |
    |8	|DISSOLVED	                    |Расформирован                            |

- BFX_IMPL.FUND_ALLOW_IMPORT (Справочник разрешенных конфигураций документов)
    |ID	|CODE                     |	DESCRIPTION                     |
    |---|-------------------------|---------------------------------|
    |1	|EquityLifeInsurancePolicy|	Импорт разрешен для договора ДСЖ|

## Роли обладающие правами на загрузку.
- Administrator (Данные о фондах и данные об активах в фондах)
- FundImportSpecialist (Данные о фондах)
- FundAssetsImportSpecialist (Данные об активах в фондах)

## Загрузка данных через сервис

<darkBlue>Переменная CONFIGURATION_CODE_NAME используется в адресе сервиса, WorkUnitActorCode в Headers:<darkBlue>

- **Данные о фондах:**
  - CONFIGURATION_CODE_NAME = FundImport
  - WorkUnitActorCode = FundImportSpecialist
- **Данные об активах в фондах:**
  - CONFIGURATION_CODE_NAME = FundAssetsImport
  - WorkUnitActorCode = FundAssetsImportSpecialist

### 1. Загрузка файла с данными в хранилище.

##### Сервис:
<blue>POST (form-data):</blue>
```{{SERVER_URI}}/api/document-management/files```

|Key	    |Key type   |Value                            |
|-----------|-----------|---------------------------------|
|content	|File       |Выбрать файл для загрузки        |
|metadata	|Text       |metadataRequest                  |


##### Запрос metadataRequest:
```
{
    "FileName": "Данные о фондах",
    "MediaType": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
}
```
##### Ответ:
```
{
    "FileId": "FILE_ID_FOR_IMPORT_DOCUMENT"
}
```
> Данные о загруженном в хранилище файле хранятся в таблице:
```
SELECT * FROM BFX.FILE_METADATA
WHERE FILE_METADATA_ID = FILE_ID_FOR_IMPORT_DOCUMENT
```

### 2. Создать документ импорта.

##### Сервис:
<blue>POST:</blue>
```{{SERVER_URI}}/api/core/import-documents/CONFIGURATION_CODE_NAME/1```

##### Запрос:
```
{
    "data": {
        "file": {
            "fileId": FILE_ID_FOR_IMPORT_DOCUMENT,
            "fileName": "Данные о фондах.xlsx"
        },
        "sourceFileFormatData": [{
                "fileFormat": 1,
                "formatName": "Excel",
                "dataSourceName": "FundXlsxFileLoaderDataSource"
            }
        ],
        "summary": {},
        "sourceFileFormat": 1,
        "reportDate": REPORT_DATE
    }
}
```
<darkBlue>В запросе:
REPORT_DATE - дата отчёта в формате YYYY-MM-DD (Пример: "2025-01-28"),
FILE_ID_FOR_IMPORT_DOCUMENT - id загруженного файла из ответа шага 1 (Пример: "ed828e59-cfa7-49a5-8efc-699abe55263c").
</darkBlue>

### 3. Получить ETag созданного документа импорта.

##### Сервис:
<green>GET:</green>
```{{SERVER_URI}}/api/core/import-documents/CONFIGURATION_CODE_NAME/1/IMPORT_DOCUMENT_NUMBER```

##### Запрос:
```
{}
```

### 4. Загрузить документ.

##### Сервис:
<blue>POST:</blue>
```{{SERVER_URI}}/api/core/import-documents/CONFIGURATION_CODE_NAME/1/IMPORT_DOCUMENT_NUMBER/transitions/StartLoading```

##### Запрос:
```
{}
```
<darkBlue>В Headers указать Key = If-Match со значем ETag из Headers шага 3.<darkBlue>

### 5. Проверить StateCode документа импорта.

##### Сервис:
<green>GET:</green>
```{{SERVER_URI}}/api/core/import-documents/CONFIGURATION_CODE_NAME/1/IMPORT_DOCUMENT_NUMBER```

##### Запрос:
```
{}
```
##### Ответ:
```
{
    "id": "IMPORT_DOCUMENT_ID",
    "Number": "IMPORT_DOCUMENT_NUMBER",
    "Data": {
        "body": {}
    },
    "StateId": 5,
    "VersionState": null,
    "StateCode": "Imported"
}
```
<green>StateCode == "Imported" - успешный импорт документа.</green>
