IF
EXISTS (SELECT 1 FROM sys.objects WHERE OBJECT_ID = OBJECT_ID(N'[BFX_IMPL].[RISKS]') AND TYPE IN (N'U'))
AND
EXISTS (SELECT 1 FROM sys.columns WHERE NAME = N'IS_CONTRIBUTION_REFUND' AND OBJECT_ID = OBJECT_ID(N'[BFX_IMPL].[RISKS]'))
BEGIN

	declare @table_name sysname, @column_name sysname
	set @table_name = N'BFX_IMPL.RISKS'
	set @column_name = N'IS_CONTRIBUTION_REFUND'

	declare @default_constraint_name sysname, @sql nvarchar(max)

	if exists (
	 select *
	 from sys.default_constraints
	 where
	  parent_object_id = OBJECT_ID(@table_name)
	  AND type = 'D'
	  AND parent_column_id = (
	   select column_id
	   from sys.columns
	   where
	   object_id = OBJECT_ID(@table_name)
	   and name = @column_name
	  )
	)
	begin

	 select @default_constraint_name = name
	 from sys.default_constraints
	  where
	   parent_object_id = OBJECT_ID(@table_name)
	   AND type = 'D'
	   AND parent_column_id = (
		select column_id
		from sys.columns
		where
		object_id = OBJECT_ID(@table_name)
		and name = @column_name
	   )

	 SET @sql = N'ALTER TABLE ' + @table_name + ' DROP Constraint ' + @default_constraint_name
	 PRINT @sql
	 exec sp_executesql @sql
	end

	ALTER TABLE BFX_IMPL.RISKS DROP COLUMN IS_CONTRIBUTION_REFUND
END
