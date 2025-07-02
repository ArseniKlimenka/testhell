IF EXISTS (SELECT * FROM SYS.INDEXES WHERE OBJECT_ID = OBJECT_ID(N'BFX_IMPL.FUND_STATUS'))
BEGIN

	TRUNCATE TABLE BFX_IMPL.FUND_STATUS

	INSERT INTO
    BFX_IMPL.FUND_STATUS (CODE, DESCRIPTION)
	VALUES
		('NOT_SET', N'-'),
		('CREATED_COOLING_PERIOD', N'Создан, идет период охлж.'),
		('FORMING', N'Формируется'),
		('FORMED_MATCHED_DECLARATION', N'Сформирован, соответствует декларации'),
		('FORMED_NOT_MATCHED_DECLARATION', N'Сформирован, не соответствует декларации'),
		('DISBANDMENT', N'Расформирование'),
		('SOLD_OUT', N'Распродан'),
		('DISSOLVED', N'Расформирован')

END