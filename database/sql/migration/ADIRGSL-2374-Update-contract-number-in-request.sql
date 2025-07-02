DECLARE @contractNumber NVARCHAR(max) = N'96400-54448824';
DECLARE @contractAppendix NVARCHAR(max) = '2';
DECLARE @requestNumber NVARCHAR(max) = N'ЗАЯВКА-0000000231';

UPDATE BFX.UNIVERSAL_DOCUMENT
SET BODY = REPLACE(JSON_MODIFY(BODY, '$.contract.number', @contractNumber + '-' + @contractAppendix), @contractNumber + '-' + @contractAppendix, @contractNumber + '/' + @contractAppendix)
WHERE UNIVERSAL_DOCUMENT_NUMBER = @requestNumber;

UPDATE BFX.UNIVERSAL_DOCUMENT
SET COMMON_BODY = REPLACE(JSON_MODIFY(COMMON_BODY, '$.contract.number', @contractNumber + '-' + @contractAppendix), @contractNumber + '-' + @contractAppendix, @contractNumber + '/' + @contractAppendix)
WHERE UNIVERSAL_DOCUMENT_NUMBER = @requestNumber;

UPDATE BFX.UNIVERSAL_DOCUMENT
SET BODY = JSON_MODIFY(BODY, '$.contract.lastAmendmentNumber', null)
WHERE UNIVERSAL_DOCUMENT_NUMBER = @requestNumber;
