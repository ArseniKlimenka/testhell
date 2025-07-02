update pty.party
   set sys_source_system = 'AI'
 where sys_source_system is null;

update org.organisation_unit
   set sys_source_system = 'AI'
 where sys_source_system is null;