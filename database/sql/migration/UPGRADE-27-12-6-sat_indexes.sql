IF OBJECT_ID('tempdb..#index_data_tmp') IS NOT NULL DROP TABLE #index_data_tmp
go

WITH schemas (name, TableSchema)
AS
(
	select distinct 
		Name = TABLE_NAME, 
		TableSchema = TABLE_SCHEMA
	from INFORMATION_SCHEMA.COLUMNS
),
index_data 
AS 
(
	SELECT 		
		s.TableSchema,
		TableName = t.Name,
		IndexName = i.Name,
		ColumnName = c.name,
		ColumnPosition = ic.index_column_id
	FROM sys.indexes i
		INNER JOIN sys.tables t ON t.object_id = i.object_id
		INNER JOIN sys.schemas ss on ss.schema_id = t.schema_id
		INNER JOIN schemas s on s.name = t.name and s.TableSchema = ss.name
		INNER JOIN sys.index_columns ic ON ic.object_id = t.object_id AND ic.index_id = i.index_id
		INNER JOIN sys.columns c ON c.object_id = t.object_id AND c.column_id = ic.column_id
	WHERE 
		t.name like '%_SAT'
)
SELECT id.*
INTO #index_data_tmp
FROM index_data id;

go

declare @createIndex int;
select top 1
	@createIndex = (CASE
		when count(*) = (select ColumnPosition from #index_data_tmp where TableName = 'P_BILLING_SAT' and TableSchema = 'PAS' and ColumnName = 'LOAD_DATE') 
		then 1
		else 0
    end)
from #index_data_tmp
where TableName = 'P_BILLING_SAT'
	and TableSchema = 'PAS'

if ((select count(*) from sys.indexes i where i.name = 'PK_PAS_P_BILLING_SAT') > 0 and @createIndex = 0)
begin
	PRINT 'Altering index for PAS.P_BILLING_SAT'

    ALTER TABLE PAS.P_BILLING_SAT DROP CONSTRAINT PK_PAS_P_BILLING_SAT
	ALTER TABLE PAS.P_BILLING_SAT ADD CONSTRAINT PK_PAS_P_BILLING_SAT PRIMARY KEY NONCLUSTERED (P_BILLING_HKEY, START_DATE, LOAD_DATE)
end
go

declare @createIndex int;
select top 1
	@createIndex = (CASE
		when count(*) = (select ColumnPosition from #index_data_tmp where TableName = 'P_ITEM_DEDUCTIBLE_SAT' and TableSchema = 'PAS' and ColumnName = 'LOAD_DATE') 
		then 1
		else 0
    end)
from #index_data_tmp
where TableName = 'P_ITEM_DEDUCTIBLE_SAT'
	and TableSchema = 'PAS'


if ((select count(*) from sys.indexes i where i.name = 'PK_PAS_P_ITEM_DEDUCTIBLE_SAT') > 0 and @createIndex = 0)
begin
	PRINT 'Altering index for PAS.P_ITEM_DEDUCTIBLE_SAT'

    ALTER TABLE PAS.P_ITEM_DEDUCTIBLE_SAT DROP CONSTRAINT PK_PAS_P_ITEM_DEDUCTIBLE_SAT
	ALTER TABLE PAS.P_ITEM_DEDUCTIBLE_SAT ADD CONSTRAINT PK_PAS_P_ITEM_DEDUCTIBLE_SAT PRIMARY KEY NONCLUSTERED (P_ITEM_DEDUCTIBLE_HKEY, SEQ_CODE, LOAD_DATE)
end
go

declare @createIndex int;
select top 1
	@createIndex = (CASE
		when count(*) = (select ColumnPosition from #index_data_tmp where TableName = 'P_ITEM_LIMIT_SAT' and TableSchema = 'PAS' and ColumnName = 'LOAD_DATE') 
		then 1
		else 0
    end)
from #index_data_tmp
where TableName = 'P_ITEM_LIMIT_SAT'
	and TableSchema = 'PAS'

if ((select count(*) from sys.indexes i where i.name = 'PK_PAS_P_ITEM_LIMIT_SAT') > 0 and @createIndex = 0)
begin
	PRINT 'Altering index for PAS.P_ITEM_LIMIT_SAT'

    ALTER TABLE PAS.P_ITEM_LIMIT_SAT DROP CONSTRAINT PK_PAS_P_ITEM_LIMIT_SAT
	ALTER TABLE PAS.P_ITEM_LIMIT_SAT ADD CONSTRAINT PK_PAS_P_ITEM_LIMIT_SAT PRIMARY KEY NONCLUSTERED (P_ITEM_LIMIT_HKEY, SEQ_CODE, LOAD_DATE)
end
go

declare @createIndex int;
select top 1
	@createIndex = (CASE
		when count(*) = (select ColumnPosition from #index_data_tmp where TableName = 'DEDUP_PROPOSAL_CANDIDATE_SAT' and TableSchema = 'PTY' and ColumnName = 'LOAD_DATE') 
		then 1
		else 0
    end)
from #index_data_tmp
where TableName = 'DEDUP_PROPOSAL_CANDIDATE_SAT'
	and TableSchema = 'PTY'

if ((select count(*) from sys.indexes i where i.name = 'PK_PTY_DEDUP_PROPOSAL_CANDIDATE_SAT') > 0 and @createIndex = 0)
begin
	PRINT 'Altering index for PTY.DEDUP_PROPOSAL_CANDIDATE_SAT'

    ALTER TABLE PTY.DEDUP_PROPOSAL_CANDIDATE_SAT DROP CONSTRAINT PK_PTY_DEDUP_PROPOSAL_CANDIDATE_SAT
	ALTER TABLE PTY.DEDUP_PROPOSAL_CANDIDATE_SAT ADD CONSTRAINT PK_PTY_DEDUP_PROPOSAL_CANDIDATE_SAT PRIMARY KEY NONCLUSTERED (DEDUP_PROPOSAL_CANDIDATE_HKEY, DUPLICATE_CANDIDATE_CODE, LOAD_DATE)
end
go

declare @createIndex int;
select top 1
	@createIndex = (CASE
		when count(*) = (select ColumnPosition from #index_data_tmp where TableName = 'BANK_ACCOUNTS_SAT' and TableSchema = 'PTY' and ColumnName = 'LOAD_DATE') 
		then 1
		else 0
    end)
from #index_data_tmp
where TableName = 'BANK_ACCOUNTS_SAT'
	and TableSchema = 'PTY'

if ((select count(*) from sys.indexes i where i.name = 'PK_PTY_BANK_ACCOUNTS_SAT') > 0 and @createIndex = 0)
begin
	PRINT 'Altering index for PTY.BANK_ACCOUNTS_SAT'

    ALTER TABLE PTY.BANK_ACCOUNTS_SAT DROP CONSTRAINT PK_PTY_BANK_ACCOUNTS_SAT
	ALTER TABLE PTY.BANK_ACCOUNTS_SAT ADD CONSTRAINT PK_PTY_BANK_ACCOUNTS_SAT PRIMARY KEY NONCLUSTERED (BANK_ACCOUNTS_HKEY, ACCOUNT_NUMBER, LOAD_DATE)
end
go

declare @createIndex int;
select top 1
	@createIndex = (CASE
		when count(*) = (select ColumnPosition from #index_data_tmp where TableName = 'PERSON_ADDRESSES_SAT' and TableSchema = 'PTY' and ColumnName = 'LOAD_DATE') 
		then 1
		else 0
    end)
from #index_data_tmp
where TableName = 'PERSON_ADDRESSES_SAT'
	and TableSchema = 'PTY'

if ((select count(*) from sys.indexes i where i.name = 'PK_PTY_PERSON_ADDRESSES_SAT') > 0 and @createIndex = 0)
begin
	PRINT 'Altering index for PTY.PERSON_ADDRESSES_SAT'

    ALTER TABLE PTY.PERSON_ADDRESSES_SAT DROP CONSTRAINT PK_PTY_PERSON_ADDRESSES_SAT
	ALTER TABLE PTY.PERSON_ADDRESSES_SAT ADD CONSTRAINT PK_PTY_PERSON_ADDRESSES_SAT PRIMARY KEY NONCLUSTERED (PERSON_ADDRESSES_HKEY, PURPOSE, LOAD_DATE)
end
go

IF OBJECT_ID('tempdb..#index_data_tmp') IS NOT NULL DROP TABLE #index_data_tmp