IF
EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'CFG.CERTIFICATE_DESCRIPTION') AND TYPE IN (N'U'))
BEGIN
    INSERT INTO CFG.CERTIFICATE_DESCRIPTION
    (
    	DESCRIPTION_ID,
    	CODE_NAME,
    	DESCRIPTION
    )
    VALUES
    (
    	1,
    	N'AccountingCertificate',
    	N'Справка для налоговой'
    )
END