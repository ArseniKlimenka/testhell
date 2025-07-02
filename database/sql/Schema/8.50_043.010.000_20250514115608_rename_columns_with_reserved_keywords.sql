if exists (select * from sys.columns where [OBJECT_ID] = object_id(N'BFX_IMPL.SINK_ERROR') and [NAME] = N'NUMBER')
	exec sp_rename 'BFX_IMPL.SINK_ERROR.NUMBER', 'DOCUMENT_NUMBER', 'COLUMN';
go

if exists (select * from sys.columns where [OBJECT_ID] = object_id(N'PAS_IMPL.AMENDMENT_LINES_SAT') and [NAME] = N'SUM')
	exec sp_rename 'PAS_IMPL.AMENDMENT_LINES_SAT.SUM', 'PAYMENT_SUM', 'COLUMN';
go

if exists (select * from sys.columns where [OBJECT_ID] = object_id(N'PAS_IMPL.AMENDMENT_LINES_SAT') and [NAME] = N'SUM_IN_RUB')
	exec sp_rename 'PAS_IMPL.AMENDMENT_LINES_SAT.SUM_IN_RUB', 'PAYMENT_SUM_IN_RUB', 'COLUMN';
go
