IF
	EXISTS (SELECT 1 FROM sys.objects WHERE OBJECT_ID = OBJECT_ID(N'[PAS_IMPL].[AA_SAT]') AND TYPE IN (N'U'))
	AND
	EXISTS (SELECT 1 FROM sys.columns WHERE NAME = N'IS_DOC_CORRECT' AND Object_ID = Object_ID(N'[PAS_IMPL].[AA_SAT]'))
BEGIN
	UPDATE PAS_IMPL.AA_SAT SET IS_DOC_CORRECT = 1
END
GO

UPDATE PAS.AGENT_AGREEMENT
SET
	common_body = json_modify(common_body, '$.attributes.additionalAttributes.isDocCorrect', CAST(1 as BIT)),
	body = json_modify(body, '$.additionalAttributes.isDocCorrect', CAST(1 as BIT))
GO