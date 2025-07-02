update BFX.UNIVERSAL_DOCUMENT 
set COMMON_BODY = JSON_MODIFY(COMMON_BODY, '$.request.amendmentReason', NULL) 
where JSON_VALUE(COMMON_BODY, '$.request.typeOfRequest') = 'Modification'