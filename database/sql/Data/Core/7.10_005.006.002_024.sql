update [CFX].[PUBLISHED_ARTIFACT]
set   [CONCEPT_TYPE_ID] = (select [CONCEPT_TYPE_ID] from [CFG].[CONCEPT_TYPE] where [CONCEPT_TYPE].[CODE_NAME] = 'DocumentConfiguration')
where [CODE_NAME] = 'AggregatedPaymentRegisterImport'
  and [CONCEPT_TYPE_ID] = (select [CONCEPT_TYPE_ID] from [CFG].[CONCEPT_TYPE] where [CONCEPT_TYPE].[CODE_NAME] = 'RouteConfiguration')