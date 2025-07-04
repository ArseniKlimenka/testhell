# Экспорт Пользователей через загрузку Excel файла (Массовое создание пользователей)
## Загрузчик файлов для создания пользователей
- Страница загрузчика находиться в основном меню, во вкладке "ОРГ.СТРУКТУРА".
### 1 шаг. Выбор файла.
- Выбрать файл для загрузки. Описания полей в задаче в [Jira](https://jira.adacta-fintech.com/browse/ADIRGSL-479).
- Нажать на кнопку "Сохранить"(правый нижний угол) для передачи на сервер и присвоению номера для документа загрузки.
- Нажать на выбор "Действия"(правый верхний угол) и выбрать "Начать загрузку" для начало импорта данных. Подтвердить действие в выпавших диалоговом окне.
### 2 шаг. Загруженная Информация.
- После успешного импорта файла, появляется вкладка "Загруженная информация". В поле "Загруженные данные" отражаются строки успешно прошедшие валидацию на заполненность. В поле "Ошибки по загруженной информации" отражаются строки не прошедшие валидацию на заполненность. Т.е. строки где отсутствовали поля обязательные для заполнения попадают в ошибочно загрузочные и не учувствуют в дальнейшей загрузке в систему. Отчет об ошибках можно выгрузить нажав на советующий импорт.
- Иногда если файл слишком большой процесс загрузки может остановиться на статусе "Загружаю" требуется в ручную обновить страницу(F5), до получения статуса "Загружено", для отображения результата и выбора дальнейшего действия. После ознакомления с отчетами по выгрузке нужно выбрать следующее действие. Для продолжения импорта пользователей надо выбрать "Начать импорт". 
### 3 шаг. Загруженные данные.
- После выбора "Начать импорт" появляется вкладка "Загруженные данные". До получения документом статуса "Импортировано" в нем будут отражаться статусы выполненных загрузок строк на данный момент времени. Иногда в случаи зависания сервиса на сервере статус "Импортировано" не присвоятся.
- Все успешные загрузки отражаются в поле "Импортированные данные", их можно загрузить нажав на соответствующую кнопку в интерфейсе поля.
- Все неуспешные загрузки отражаются в поле "Ошибка импорта",  их можно загрузить нажав на соответствующую кнопку в интерфейсе поля. По тексту сообщения об ошибки и месту ошибки можно определить какие данные не подошли системе для выполнения цепочки действий по созданию пользователя.