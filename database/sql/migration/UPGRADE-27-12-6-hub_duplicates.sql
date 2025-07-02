/* based on stackoverflow post https://stackoverflow.com/questions/9089700/generate-script-of-all-the-indexes-in-a-database */
/* temporary table for drop sql script and create sql script */
create table #include_dup_key_rebuild_temp
(
    id int primary key,
    drop_sql nvarchar(1000) not null,
    create_sql nvarchar(1000) not null
)

go

/* get all hubs, lins, and sats */
with base_objects as
(   Select Name, object_ID, schema_ID, type_desc
    from sys.tables
    where Name LIKE CONCAT('%', '_HUB')
)
insert into #include_dup_key_rebuild_temp
/* construct drop sql scripts and create sql scripts */
SELECT
    row_number() over(order by index_name) as id
    ,drop_sql = 'ALTER TABLE ' + SCHEMA_NAME(schema_id) + '.' + Table_name + ' DROP CONSTRAINT ' + index_name
    ,create_sql = 'ALTER TABLE ' + SCHEMA_NAME(schema_id) + '.' + Table_name + ' ADD CONSTRAINT ' + index_name + [unique_or_primary_key] + ' ' + idx.[type_desc] + ' '
            + ' ( ' +  key_cols + ' )'
            + ' WITH (' + [options] + ' )'
FROM Sys.Indexes idx
    join base_objects tbl
        on tbl.object_id = idx.object_ID
    join sys.stats stat
        ON  stat.object_id = idx.object_id
        AND stat.stats_id = idx.index_id
    JOIN sys.data_spaces dat
        ON  idx.data_space_id = dat.data_space_id
    cross apply (Select
        [Table_name] = OBJECT_NAME(idx.Object_ID)
    ,   [Table_object_ID] = idx.Object_ID
    ,   [Index_name] = idx.Name
    ,   [unique_or_primary_key] = case when is_primary_key = 1 then ' PRIMARY KEY ' when is_unique = 1 then ' UNIQUE ' else '' end
    ) labels
    /* primary key columns */
    cross apply (Select
        key_cols = string_agg(key_col_name, ', ') collate DATABASE_DEFAULT
        from
            sys.index_columns sub_ic
            join sys.columns sub_col
                on sub_col.object_ID = sub_ic.object_id and sub_col.column_id = sub_ic.column_id
            cross apply (Select
                key_col_name = case when is_included_column = 0 then sub_col.name end
            ) keys
        where sub_ic.object_id = idx.object_id and sub_ic.index_id = idx.index_id
            and is_included_column = 0
    ) cols
    /* options */
    cross apply (Select
        options = string_agg([option] + on_off, ', ')
        from (values
          ( 'PAD_INDEX = ' , idx.is_padded)
        , ( 'FILLFACTOR = ', nullif(idx.fill_factor, 0))
        /* set ignore duplicates hint */
        , ( 'IGNORE_DUP_KEY = ', 1)
        , ( 'STATISTICS_NORECOMPUTE = ', stat.no_recompute)
        , ( 'ALLOW_ROW_LOCKS = ', idx.allow_row_locks)
        , ( 'ALLOW_PAGE_LOCKS = ', idx.allow_page_locks)
        ) opts([option], val)
        cross apply (Select
            on_off = case val when 1 then 'ON' when 0 then 'OFF' else CONVERT( CHAR(5), val) end
        ) on_off_calc
    ) options_calc
    /* only interested in primary keys */
where idx.name is not null and idx.is_primary_key = 1 and idx.ignore_dup_key = 0

go

/* loop over scripts and executed in a transaction*/
begin

declare @drop_sql nvarchar(1000)
declare @create_sql nvarchar(1000)
declare @totalrows int = (select count(*) from #include_dup_key_rebuild_temp)
declare @currentrow int = 0

while @currentrow <  @totalrows
    begin 
        select @drop_sql = drop_sql,@create_sql = create_sql from #include_dup_key_rebuild_temp where id = @currentrow + 1

        begin try
            begin tran
                execute sp_executesql @drop_sql
                execute sp_executesql @create_sql
            commit
        end try
        begin catch
            if @@TRANCOUNT > 0 
                rollback; 
            throw;
        end catch

        set @currentrow = @currentrow +1
    end
end

go

drop table #include_dup_key_rebuild_temp

go
