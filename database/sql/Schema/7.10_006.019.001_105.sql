-- tables for report
IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[PAS_IMPL].[REPORT_ORG_STRUCTURE]') AND TYPE IN (N'U'))
BEGIN
DROP TABLE [PAS_IMPL].[REPORT_ORG_STRUCTURE];
END
GO

CREATE TABLE [PAS_IMPL].[REPORT_ORG_STRUCTURE] (
[organisationUnitId] uniqueidentifier NOT NULL,
[organisationUnitCode] nvarchar(max) NOT NULL,
[organisationUnitName] nvarchar(max) NULL,
[organisationUnitFullName] nvarchar(max) NULL,
[organisationUnitBusinessCode] nvarchar(max) NULL,
[parentId] uniqueidentifier NULL,
[parentCode] nvarchar(max) NULL,
[parentName] nvarchar(max) NULL,
[parentFullName] nvarchar(max) NULL,
[parentBusinessCode] nvarchar(max) NULL,
[topParentId] uniqueidentifier NULL,
[topParentCode] nvarchar(max) NULL,
[topParentName] nvarchar(max) NULL,
[topParentFullName] nvarchar(max) NULL,
[topParentBusinessCode] nvarchar(max) NULL,
[level] int NULL,
[coach] nvarchar(max) NULL,
[territorialChief] nvarchar(max) NULL,
[regionalChief] nvarchar(max) NULL)
GO


IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[PAS_IMPL].[REPORT_VERIFICATION_INFO]') AND TYPE IN (N'U'))
BEGIN
DROP TABLE [PAS_IMPL].[REPORT_VERIFICATION_INFO];
END
GO

CREATE TABLE [PAS_IMPL].[REPORT_VERIFICATION_INFO] (
[CONTRACT_NUMBER] nvarchar(max) NULL,
[VERIFICATION_NUMBER] nvarchar(max) NULL,
[VERIFICATION_STATE] nvarchar(max) NULL,
[ERRORS_LIST] nvarchar(max) NULL)
GO


IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[PAS_IMPL].[REPORT_CONTRACT]') AND TYPE IN (N'U'))
BEGIN
DROP TABLE [PAS_IMPL].[REPORT_CONTRACT];
END
GO

CREATE TABLE [PAS_IMPL].[REPORT_CONTRACT] (
[PRODUCT_GROUP] nvarchar(max) NULL,
[PRODUCT_CODE] nvarchar(max) NULL,
[PRODUCT_DESCRIPTION] nvarchar(max) NULL,
[CONTRACT_NUMBER] nvarchar(max) NULL,
[STATE] nvarchar(max) NULL,
[ISSUE_DATE] date NULL,
[START_DATE] date NULL,
[END_DATE] date NULL,
[PAYMENT_FREQUENCY_DESC] nvarchar(MAX) NULL,
[RISK_PREMIUM] decimal(15, 2) NULL,
[HOLDER_NAME] nvarchar(max) NULL,
[HOLDER_EMAIL] nvarchar(max) NULL,
[INSURED_EMAIL] nvarchar(max) NULL,
[INITIATOR_NAME] nvarchar(max) NULL,
[NON_STANDART_CONTRACT] nvarchar(max) NULL,
[INSURANCE_TERMS] int NULL,
[CURRENCY] nvarchar(max) NULL,
[RISK_PREMIUM_ALL] decimal(15, 2) NULL,
[HOLDER_BIRTH_DATE] date NULL,
[IS_POLICY] int NULL,
[HOLDER_CODE] nvarchar(max) NULL,
[INSURED_CODE] nvarchar(max) NULL,
[INITIATOR_EMPLOYEE_CODE] nvarchar(max) NULL,
[INITIATOR_ORGUNIT_CODE] nvarchar(max) NULL,
[IS_REINVEST] bit NULL,
[ISSUE_FORM_CODE] nvarchar(max) NULL)
GO