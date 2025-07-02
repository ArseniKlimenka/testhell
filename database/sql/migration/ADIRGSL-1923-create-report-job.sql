USE msdb;
DECLARE @user_name NVARCHAR(MAX) = 
(
   select
      top 1 sp.name 
   from
      sys.server_principals sp 
      left join
         sys.sql_logins sl 
         on sp.principal_id = sl.principal_id 
   where
      1 = 1 
      and sp.type IN
      (
         'S',
         'U'
      )
      and sp.is_disabled != 1 
   order by
      sp.create_date desc 
);

EXEC dbo.sp_add_job 
@job_name = N'Fill Report Job',
@owner_login_name = @user_name;
GO 

EXEC sp_add_jobstep 
@job_name = N'Fill Report Job',
@step_name = N'Call Stored Procedure',
@subsystem = N'TSQL',
@database_name = N'AdInsure',
@command = N'EXEC [dbo].[FILL_REPORT_TABLES]',
@retry_attempts = 5,
@retry_interval = 5 ;
GO 

EXEC dbo.sp_add_schedule 
@schedule_name = N'Fill Report Scheduler',
@freq_interval = 1,
@freq_subday_interval = 1,
@freq_type = 4,            -- every @freq_interval days
@freq_subday_type = 8    -- every @freq_subday_interval hours
GO 

EXEC sp_attach_schedule 
@job_name = N'Fill Report Job',
@schedule_name = N'Fill Report Scheduler';
GO 

EXEC dbo.sp_add_jobserver 
@job_name = N'Fill Report Job';
GO