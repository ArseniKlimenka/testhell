update org.work_calendar
   set sys_source_system = 'AI'
 where sys_source_system is null;

update org.service_provider
   set sys_source_system = 'AI'
 where sys_source_system is null;