IF NOT EXISTS(SELECT NAME FROM sys.columns WHERE NAME = N'EVENT_CREATED_ON' AND Object_ID = Object_ID(N'BFX.ACTIVITY'))
BEGIN
	alter table BFX.ACTIVITY add EVENT_CREATED_ON datetime null
	
	exec usp_comment 'BFX', 'ACTIVITY', 'EVENT_CREATED_ON', 'Timestamp of when the transition event that resulted in activity creation happened.'
END
GO

-------------------------------------------------------------------------

IF (select count(*) from BFX.ACTIVITY where EVENT_CREATED_ON is null) > 0
BEGIN
	update BFX.ACTIVITY set EVENT_CREATED_ON = CREATED_ON where EVENT_CREATED_ON is null
END
GO

-------------------------------------------------------------------------

IF EXISTS(SELECT NAME FROM sys.columns WHERE NAME = N'EVENT_CREATED_ON' AND Object_ID = Object_ID(N'BFX.ACTIVITY'))
BEGIN
	alter table BFX.ACTIVITY alter column EVENT_CREATED_ON datetime not null
END
GO