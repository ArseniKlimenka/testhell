-- ############### backup

select CONTRACT_NUMBER, BODY, SNAPSHOT_BODY
into PAS.CONTRACT_TABLE_BACKUP
from pas.CONTRACT

-- ############### some declarations

declare @contractNumber nvarchar(64);
declare @body nvarchar(MAX);
declare @commItems nvarchar(MAX);
declare @commItem nvarchar(MAX);
declare @v decimal(15,6);
declare @getContract cursor;
declare @count int;
declare @i int;

-- ############### update BODY

set @getContract = cursor for
	select CONTRACT_NUMBER, BODY
	from pas.CONTRACT;

OPEN @getContract;
while 1=1
begin
	fetch next from @getContract into @contractNumber, @body;
	if @@FETCH_STATUS < 0 break;

	set @commItems = json_query('[]');
	select @count = count(*) from OpenJson(@body, '$.commission.policyCommissionItems');

	set @i = 0;
	while (@i < @count)
	begin
		set @commItem = json_query(@body, concat('$.commission.policyCommissionItems[', @i, ']'));

		set @v = json_value(@commItem, '$.calculatedRate');
		if (@v is not null and @v >= 1)
		begin
			set @commItem = json_modify(@commItem, '$.calculatedRate', @v / 100.0);
		end;

		set @v = json_value(@commItem, '$.manualRate');
		if (@v is not null and @v >= 1)
		begin
			set @commItem = json_modify(@commItem, '$.manualRate', @v / 100.0);
		end;

		set @commItems = json_modify(@commItems, 'append $', json_query(@commItem));
		set @i = @i + 1;
	end;
	update pas.CONTRACT set BODY = json_modify(@body, '$.commission.policyCommissionItems', json_query(@commItems)) where CONTRACT_NUMBER = @contractNumber;
end;

close @getContract;
deallocate @getContract;

-- ############### update SNAPSHOT_BODY

set @getContract = cursor for
	select CONTRACT_NUMBER, SNAPSHOT_BODY
	from pas.CONTRACT;

OPEN @getContract;
while 1=1
begin
	fetch next from @getContract into @contractNumber, @body;
	if @@FETCH_STATUS < 0 break;

	set @commItems = json_query('[]');
	select @count = count(*) from OpenJson(@body, '$.commission.policyCommissionItems');

	set @i = 0;
	while (@i < @count)
	begin
		set @commItem = json_query(@body, concat('$.commission.policyCommissionItems[', @i, ']'));

		set @v = json_value(@commItem, '$.calculatedRate');
		if (@v is not null and @v >= 1)
		begin
			set @commItem = json_modify(@commItem, '$.calculatedRate', @v / 100.0);
		end;

		set @v = json_value(@commItem, '$.manualRate');
		if (@v is not null and @v >= 1)
		begin
			set @commItem = json_modify(@commItem, '$.manualRate', @v / 100.0);
		end;

		set @commItems = json_modify(@commItems, 'append $', json_query(@commItem));
		set @i = @i + 1;
	end;
	update pas.CONTRACT set SNAPSHOT_BODY = json_modify(@body, '$.commission.policyCommissionItems', json_query(@commItems)) where CONTRACT_NUMBER = @contractNumber;
end;

close @getContract;
deallocate @getContract;
