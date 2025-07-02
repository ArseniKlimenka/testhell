/**
* Description: Update Risk-Product related data
* Auth: IvanM
*/

UPDATE BFX_IMPL.RISK_PRODUCT_RELATION SET RELATION_TYPE = 'optional' WHERE RISK_CODE IN ('CD36102', 'HI36102')

UPDATE BFX_IMPL.RISKS SET FULL_DESCRIPTION = 'Первичное диагностирование Застрахованному критического заболевания (выплата)' WHERE RISKS.CODE  = 'CDP36404'
UPDATE BFX_IMPL.RISKS SET FULL_DESCRIPTION = 'Первичное диагностирование Застрахованному критического заболевания (лечение)' WHERE RISKS.CODE  = 'CDH36404'

UPDATE BFX_IMPL.RISK_PRODUCT_RELATION SET RELATION_TYPE = 'additional' WHERE RELATION_TYPE = 'optional' AND REPLACEMENT_RISKS IS NULL
UPDATE BFX_IMPL.RISK_PRODUCT_RELATION SET RELATION_TYPE = 'replacement' WHERE RELATION_TYPE = 'optional' AND REPLACEMENT_RISKS IS NOT NULL
