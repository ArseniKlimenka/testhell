-- Риски для миграции
IF 
EXISTS (SELECT 1 FROM sys.objects WHERE OBJECT_ID = OBJECT_ID(N'[BFX_IMPL].[RISKS]') AND TYPE IN (N'U'))
AND
NOT EXISTS (SELECT 1 FROM sys.columns WHERE NAME = N'NOTE' AND OBJECT_ID = OBJECT_ID(N'[BFX_IMPL].[RISKS]')) 
BEGIN
	ALTER TABLE BFX_IMPL.RISKS ADD NOTE nvarchar(MAX)
END
GO

delete from bfx_impl.risks
where bfx_impl.risks.ID = '1E4DDB55-EDD2-46D3-9218-67A0B71C079C'

insert into bfx_impl.risks
(ID, CODE, TYPE, BUSINESS_LINE, SHORT_DESCRIPTION, FULL_DESCRIPTION, NOTE)
values
('1E4DDB55-EDD2-46D3-9218-67A0B71C079C', N'MJL36404', N'life', N'36404', N'Потеря работы ОУСВ (за период)', N'Дожитие Застрахованного до недобровольной потери работы с освобождением от уплаты страховых взносов на определенный период', N'Не использовать – риски для миграции')