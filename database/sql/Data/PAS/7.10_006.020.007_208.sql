if exists(select * from ORG.APPLICATION_USER where USERNAME = 'API_EFR')
begin
  insert into BFX_IMPL.GET_PH_CUSTOM_SERVICE_USERS values ('API_EFR', '["3-23819", "3-23472", "3-22521"]')
end

if exists(select * from ORG.APPLICATION_USER where USERNAME = 'Administrator')
begin
  insert into BFX_IMPL.GET_PH_CUSTOM_SERVICE_USERS values ('Administrator', '[]')
end