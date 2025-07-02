INSERT INTO
    BFX_IMPL.FUND_STATUS (CODE, DESCRIPTION)
VALUES
    ('FORMING', N'Формируется'),
	('FORMED_MATCHED_DECLARATION', N'Сформирован, соответствует декларации'),
	('FORMED_NOT_MATCHED_DECLARATION', N'Сформирован, не соответствует декларации'),
	('DISSOLVED', N'Расформирован')

INSERT INTO
    BFX_IMPL.FUND_ALLOW_IMPORT (CODE, DESCRIPTION)
VALUES
    ('EquityLifeInsurancePolicy', N'Импорт разрешен для договора ДСЖ')