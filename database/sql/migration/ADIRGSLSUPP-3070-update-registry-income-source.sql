update bsi
set INCOME_SOURCE_ID = JSON_VALUE(cti.BODY, '$.incomeSourceId')
from
	acc_impl.BANK_STATEMENT_ITEM bsi
	cross apply (select top 1 convert(nvarchar(max), SOURCE_FILE_FORMAT) as SOURCE_FILE_FORMAT from acc_impl.AGGREGATED_PAYMENT_REGISTER apr where apr.AGGREGATED_PAYMENT_NUMBER = bsi.REGISTRY_REFERENCE_NO) sourceType
	inner join cfx.PUBLISHED_ARTIFACT pa on pa.CODE_NAME = 'BsiRegistryType'
	inner join bfx.CODE_TABLE_ITEM cti on cti.PUBLISHED_ARTIFACT_ID = pa.PUBLISHED_ARTIFACT_ID and cti.CODE=sourceType.SOURCE_FILE_FORMAT
where 1=1
	and bsi.PAYMENT_SOURCE_ID = 2 and bsi.IS_MIGRATED != 1
	and bsi.INCOME_SOURCE_ID != JSON_VALUE(cti.BODY, '$.incomeSourceId')
