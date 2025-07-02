/*
	Application 1
	http://www.consultant.ru/document/cons_doc_LAW_351408/be0cee4d4f33397d76b20fe9a5a2f42247815ea0/
*/

UPDATE [BFX_IMPL].[DOCUMENT_TYPE]
SET [OFFICIAL_CODE] = 21,
	[IS_OFFICIAL_OTHER] = 0
WHERE [CODE] = 'passport'
GO

UPDATE [BFX_IMPL].[DOCUMENT_TYPE]
SET [OFFICIAL_CODE] = 22,
	[IS_OFFICIAL_OTHER] = 0
WHERE [CODE] = 'foreignTravelPassport'
GO

UPDATE [BFX_IMPL].[DOCUMENT_TYPE]
SET [OFFICIAL_CODE] = 26,
	[IS_OFFICIAL_OTHER] = 0
WHERE [CODE] = 'incurredIdentityCard'
GO

UPDATE [BFX_IMPL].[DOCUMENT_TYPE]
SET [OFFICIAL_CODE] = 27,
	[IS_OFFICIAL_OTHER] = 0
WHERE [CODE] = 'birthCertificate'
GO

UPDATE [BFX_IMPL].[DOCUMENT_TYPE]
SET [OFFICIAL_CODE] = 28,
	[IS_OFFICIAL_OTHER] = 1
WHERE [CODE] = 'otherDocument'
GO

UPDATE [BFX_IMPL].[DOCUMENT_TYPE]
SET [OFFICIAL_CODE] = 31,
	[IS_OFFICIAL_OTHER] = 0
WHERE [CODE] = 'foreignCitPassport'
GO

/*
	Документ, выданный иностранным государством и признаваемый в соответствии с международным договором Российской Федерации в качестве документа, удостоверяющего личность лица без гражданства
	[OFFICIAL_CODE] = 32
	[IS_OFFICIAL_OTHER] = 0
*/

UPDATE [BFX_IMPL].[DOCUMENT_TYPE]
SET [OFFICIAL_CODE] = 33,
	[IS_OFFICIAL_OTHER] = 0
WHERE [CODE] = 'residence'
GO

UPDATE [BFX_IMPL].[DOCUMENT_TYPE]
SET [OFFICIAL_CODE] = 34,
	[IS_OFFICIAL_OTHER] = 0
WHERE [CODE] = 'temporaryResidencePermit'
GO

/*
	Иные документы, признаваемые документами, удостоверяющими личность лиц без гражданства в соответствии с законодательством Российской Федерации и международным договором Российской Федерации.
	[OFFICIAL_CODE] = 35
	[IS_OFFICIAL_OTHER] = 1
*/

UPDATE [BFX_IMPL].[DOCUMENT_TYPE]
SET [OFFICIAL_CODE] = 36,
	[IS_OFFICIAL_OTHER] = 0
WHERE [CODE] = 'refugeeCertificate'
GO

UPDATE [BFX_IMPL].[DOCUMENT_TYPE]
SET [OFFICIAL_CODE] = 37,
	[IS_OFFICIAL_OTHER] = 0
WHERE [CODE] = 'refugeeID'
GO

UPDATE [BFX_IMPL].[DOCUMENT_TYPE]
SET [OFFICIAL_CODE] = 39,
	[IS_OFFICIAL_OTHER] = 0
WHERE [CODE] = 'migrationCard'
GO

/*
	Иной документ, подтверждающий в соответствии с законодательством Российской Федерации право иностранного гражданина или лица без гражданства на пребывание (проживание) в Российской Федерации
	[OFFICIAL_CODE] = 40
	[IS_OFFICIAL_OTHER] = 1
*/

/*
	Документ, удостоверяющий личность лица, не имеющего действительного документа, удостоверяющего личность, на период рассмотрения заявления о признании гражданином Российской Федерации или о приеме в гражданство Российской Федерации
	[OFFICIAL_CODE] = 99
	[IS_OFFICIAL_OTHER] = 1
*/