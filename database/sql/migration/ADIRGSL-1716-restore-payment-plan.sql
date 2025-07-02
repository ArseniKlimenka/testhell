-- ############### check PAS.CONTRACT_TABLE_BACKUP2 exists
IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[PAS].[CONTRACT_TABLE_BACKUP2]') AND TYPE IN (N'U'))
BEGIN
EXEC ('
-- ############### some declarations

declare @contractNumber nvarchar(64);
declare @body nvarchar(MAX);
declare @backupBody nvarchar(MAX);
declare @commItems nvarchar(MAX);
declare @getContract cursor;
declare @count int;
declare @backupcount int;

-- ############### update BODY

set @getContract = cursor for
	select c.CONTRACT_NUMBER, c.BODY, back.BODY
	from pas.CONTRACT c
	join pas.CONTRACT_TABLE_BACKUP2 back on back.CONTRACT_NUMBER = c.CONTRACT_NUMBER;

OPEN @getContract;
while 1=1
begin
	fetch next from @getContract into @contractNumber, @body, @backupBody;
	if @@FETCH_STATUS < 0 break;

	select @count = count(*) from OpenJson(@body, ''$.paymentPlan'');
	select @backupcount = count(*) from OpenJson(@backupBody, ''$.paymentPlan'');

	if (@count = 0 and @backupcount > 0)
	begin
		set @commItems = json_query(@backupBody, ''$.paymentPlan'');
		update pas.CONTRACT set BODY = json_modify(@body, ''$.paymentPlan'', json_query(@commItems)) where CONTRACT_NUMBER = @contractNumber;
	end;
end;

close @getContract;
deallocate @getContract;

-- ############### update SNAPSHOT_BODY

set @getContract = cursor for
	select c.CONTRACT_NUMBER, c.SNAPSHOT_BODY, back.SNAPSHOT_BODY
	from pas.CONTRACT c
	join pas.CONTRACT_TABLE_BACKUP2 back on back.CONTRACT_NUMBER = c.CONTRACT_NUMBER;

OPEN @getContract;
while 1=1
begin
	fetch next from @getContract into @contractNumber, @body, @backupBody;
	if @@FETCH_STATUS < 0 break;
	
	select @count = count(*) from OpenJson(@body, ''$.paymentPlan'');
	select @backupcount = count(*) from OpenJson(@backupBody, ''$.paymentPlan'');

	if (@count = 0 and @backupcount > 0)
	begin
		set @commItems = json_query(@backupBody, ''$.paymentPlan'');
		update pas.CONTRACT set SNAPSHOT_BODY = json_modify(@body, ''$.paymentPlan'', json_query(@commItems)) where CONTRACT_NUMBER = @contractNumber;
	end;
end;

close @getContract;
deallocate @getContract;')

END;