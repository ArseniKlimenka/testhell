update BFX.UNIVERSAL_DOCUMENT 
set BODY = JSON_MODIFY(BODY, '$.amendmentReason', NULL) 
where JSON_VALUE(BODY, '$.typeOfRequest') = 'Modification'