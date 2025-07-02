update bsi_small
set REGISTRY_REFERENCE_NO = reg.IMPORT_DOCUMENT_NUMBER
from
	ACC_IMPL.BANK_STATEMENT_ITEM bsi_small
	join ACC_IMPL.BANK_STATEMENT_ITEM bsi_big on bsi_big.BANK_STATEMENT_ITEM_ID = bsi_small.REGISTRY_REFERENCE_ID and bsi_big.STATUS_ID = 4 --AllocatedToRegistry
	join (
		select
			JSON_VALUE(doc.BODY, '$.bankStatementItem.id') bsi_id,
			doc.IMPORT_DOCUMENT_NUMBER
		from BFX.IMPORT_DOCUMENT doc
			join CFX.PUBLISHED_ARTIFACT art on art.PUBLISHED_ARTIFACT_ID = doc.PUBLISHED_ARTIFACT_ID
			join cfg.PROCESS_STATE ps on ps.PROCESS_STATE_ID = doc.STATE_ID
		where art.CODE_NAME = 'AggregatedPaymentRegisterImport' and ps.CODE_NAME = 'Allocated'
	) reg on reg.bsi_id = bsi_big.BANK_STATEMENT_ITEM_ID