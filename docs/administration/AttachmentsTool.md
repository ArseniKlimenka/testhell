---
version 1-2: https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2033
version 3: https://jira.adacta-fintech.com/browse/ADIRGSLSUPP-2624
---

### Работа с вложениями через утилиту AdInsure_Attachments
- Последняя версия находится в задаче Jira, см. ссылки выше.

![AdInsure_Attachments](images\attachments\adinsure_attachments_tool.png "AdInsure_Attachments")
- Для начала работы необходимо заполнить:
    - Путь к хранилищу с вложениями
    - Папка для извлечения вложений из хранилища, если будет использован функционал извлечь вложения.
    - FILE_METADATA_ID
    - FILENAME
    - MEDIA_TYPE
- После заполнения данных, доступен следующий функционал:
    - Извлечь вложения - сохраняет в папку вложение на основе FILENAME, MEDIA_TYPE не учитывается. Добавляет к имени извлеченного файла Номер договора, если указан в поле.
    - Получить информацию о вложении - выводит информацию о гипотетическом расположении файла в хранилище, на основе (FILE_METADATA_ID, FILENAME) и о гипотетическом расположении файла в хранилище на основе его (FILE_METADATA_ID, FILENAME, MEDIA_TYPE).
    - Сохранить в хранилище - Создаёт папки в хранилище при необходимости и копирует файл из  расположении файла в хранилище на основе (FILE_METADATA_ID, FILENAME) в расположении файла в хранилище на основе его (FILE_METADATA_ID, FILENAME, MEDIA_TYPE).
- Работа с группой вложений:
    - Отметить чекбокс - Использовать *.csv файл.
    - Выполнить запрос к БД для получения данных о вложениях:
        - Пример для отбора вложений, у которых расширение в FILENAME не совпадает с MEDIA_TYPE:
        <code>
            SELECT meta.FILE_METADATA_ID, meta.FILENAME, meta.MEDIA_TYPE
            FROM BFX.FILE_METADATA meta
            INNER JOIN BFX.ATTACHMENT attachment on meta.FILE_METADATA_ID = attachment.FILE_METADATA_ID
            WHERE 1=1
            AND meta.MEDIA_TYPE='image/jpeg'
            AND meta.FILENAME like '%.pdf'
            AND attachment.ATTACHMENT_TYPE='contractSigned'
            -- Check conditions to update!!!
        </code>
        - Пример для отбора вложений по номеру договора:
        <code>
            DECLARE @POLICY_NUMBER AS NVARCHAR(MAX) = N'INSERT_DOCUMENT_NUMBER';

            SELECT FILE_METADATA_ID, FILENAME, MEDIA_TYPE FROM BFX.FILE_METADATA
            WHERE FILE_METADATA_ID IN (SELECT FILE_METADATA_ID FROM BFX.ATTACHMENT WHERE ATTACHMENT_ID IN (SELECT ATTACHMENT_ID FROM BFX.ATTACHMENT_RELATED_ENTITY
            WHERE ENTITY_REF_ID = (SELECT CONTRACT_ID FROM pas.contract WHERE CONTRACT_NUMBER = @POLICY_NUMBER)));
        </code>
    - Выполнить экспорт данных в csv (убедиться, что разделители в файле точка с запятой ";"):
    ![Attachments_export_csv](images\attachments\adinsure_attachments_csv_export.png "Attachments_export_csv")
    - Положить в папку с программой.
    - Воспользоваться функционалом, который требуется: Получить информацию о вложении, Извлечь вложения, Сохранить в хранилище.

> :warning:
> После использования функционала Сохранить в хранилище, необходимо выполнить скрипт, который исправляет расширения в имени файла (FILENAME) на основе (MEDIA_TYPE), при этом проверить и скорректировать условия в UPDATE.
database\sql\migration\ADIRGSLSUPP-2624-Update-attachments-extensions-by-media-type.sql
