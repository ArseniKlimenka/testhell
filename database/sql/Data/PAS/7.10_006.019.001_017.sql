if exists (select * from sys.tables t
	INNER JOIN sys.partitions p on t.object_id = p.object_id
	WHERE t.object_id = OBJECT_ID(N'[PAS_IMPL].[AA_BASE_COMM_SAT]') and p.rows > 0)
BEGIN
	EXEC(N'
-- ############### backup

select AGENT_AGREEMENT_NUMBER, BODY, COMMON_BODY, SNAPSHOT_BODY
into PAS.AA_TABLE_BACKUP
from pas.AGENT_AGREEMENT
;

-- ############### update ASS
update pas_impl.AA_BASE_COMM_SAT set MIN_RATE = MIN_RATE / 100, MAX_RATE = MAX_RATE / 100, RATE = RATE / 100;
update pas_impl.POLICY_COMMISSION_SAT set CALCULATED_RATE = CALCULATED_RATE / 100, MANUAL_RATE = MANUAL_RATE / 100, MIN_RATE = MIN_RATE / 100, MAX_RATE = MAX_RATE / 100;

-- ############### some declarations
declare @aaNumber nvarchar(64);
declare @body nvarchar(MAX);
declare @rule nvarchar(MAX);
declare @rules nvarchar(MAX);
declare @getAa cursor;
declare @count int;
declare @i int;

-- ############### update BODY

set @getAa = cursor for
	select AGENT_AGREEMENT_NUMBER, BODY
	from pas.AGENT_AGREEMENT;

OPEN @getAa;
while 1=1
begin
	fetch next from @getAa into @aaNumber, @body;
	if @@FETCH_STATUS < 0 break;

	set @rules = json_query(''[]'');
	select @count = count(*) from OpenJson(@body, ''$.commissionRules'');

	set @i = 0;
	while (@i < @count)
	begin
		set @rule = json_query(@body, concat(''$.commissionRules['', @i, '']''));

		if (json_value(@rule, ''$.minRate'') is not null)
		begin
			set @rule = json_modify(@rule, ''$.minRate'', json_value(@rule, ''$.minRate'') / 100.0);
		end;

		if (json_value(@rule, ''$.maxRate'') is not null)
		begin
			set @rule = json_modify(@rule, ''$.maxRate'', json_value(@rule, ''$.maxRate'') / 100.0);
		end;

		if (json_value(@rule, ''$.rate'') is not null)
		begin
			set @rule = json_modify(@rule, ''$.rate'', json_value(@rule, ''$.rate'') / 100.0);
		end;

		set @rules = json_modify(@rules, ''append $'', json_query(@rule));
		set @i = @i + 1;
	end;
	update pas.AGENT_AGREEMENT set BODY = json_modify(BODY, ''$.commissionRules'', json_query(@rules)) where AGENT_AGREEMENT_NUMBER = @aaNumber;
end;

close @getAa;
deallocate @getAa;

-- ############### update COMMON_BODY

set @getAa = cursor for
	select AGENT_AGREEMENT_NUMBER, COMMON_BODY
	from pas.AGENT_AGREEMENT;

OPEN @getAa;
while 1=1
begin
	fetch next from @getAa into @aaNumber, @body;
	if @@FETCH_STATUS < 0 break;

	set @rules = json_query(''[]'');
	select @count = count(*) from OpenJson(@body, ''$.rules'');

	set @i = 0;
	while (@i < @count)
	begin
		set @rule = json_query(@body, concat(''$.rules['', @i, '']''));

		if (json_value(@rule, ''$.attributes.minRate'') is not null)
		begin
			set @rule = json_modify(@rule, ''$.attributes.minRate'', json_value(@rule, ''$.attributes.minRate'') / 100.0);
		end;

		if (json_value(@rule, ''$.attributes.maxRate'') is not null)
		begin
			set @rule = json_modify(@rule, ''$.attributes.maxRate'', json_value(@rule, ''$.attributes.maxRate'') / 100.0);
		end;

		if (json_value(@rule, ''$.attributes.rate'') is not null)
		begin
			set @rule = json_modify(@rule, ''$.attributes.rate'', json_value(@rule, ''$.attributes.rate'') / 100.0);
		end;

		set @rules = json_modify(@rules, ''append $'', json_query(@rule));
		set @i = @i + 1;
	end;
	update pas.AGENT_AGREEMENT set COMMON_BODY = json_modify(COMMON_BODY, ''$.rules'', json_query(@rules)) where AGENT_AGREEMENT_NUMBER = @aaNumber;
end;

close @getAa;
deallocate @getAa;

-- ############### update SNAPSHOT_BODY

set @getAa = cursor for
	select AGENT_AGREEMENT_NUMBER, SNAPSHOT_BODY
	from pas.AGENT_AGREEMENT;

OPEN @getAa;
while 1=1
begin
	fetch next from @getAa into @aaNumber, @body;
	if @@FETCH_STATUS < 0 break;

	set @rules = json_query(''[]'');
	select @count = count(*) from OpenJson(@body, ''$.commissionRules'');

	set @i = 0;
	while (@i < @count)
	begin
		set @rule = json_query(@body, concat(''$.commissionRules['', @i, '']''));

		if (json_value(@rule, ''$.minRate'') is not null)
		begin
			set @rule = json_modify(@rule, ''$.minRate'', json_value(@rule, ''$.minRate'') / 100.0);
		end;

		if (json_value(@rule, ''$.maxRate'') is not null)
		begin
			set @rule = json_modify(@rule, ''$.maxRate'', json_value(@rule, ''$.maxRate'') / 100.0);
		end;

		if (json_value(@rule, ''$.rate'') is not null)
		begin
			set @rule = json_modify(@rule, ''$.rate'', json_value(@rule, ''$.rate'') / 100.0);
		end;

		set @rules = json_modify(@rules, ''append $'', json_query(@rule));
		set @i = @i + 1;
	end;
	update pas.AGENT_AGREEMENT set SNAPSHOT_BODY = json_modify(SNAPSHOT_BODY, ''$.commissionRules'', json_query(@rules)) where AGENT_AGREEMENT_NUMBER = @aaNumber;
end;

close @getAa;
deallocate @getAa;');
END
GO