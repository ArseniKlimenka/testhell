-- System permissions
if not exists(select * from CFG.SYSTEM_PERMISSION where CODE_NAME = N'ForcedCheckKPK')
begin
	insert into CFG.SYSTEM_PERMISSION (SYSTEM_PERMISSION_ID, CODE_NAME, DESCRIPTION, SYS_CREATED_ON, SYS_CREATED_BY_ID, SYS_UPDATED_ON, SYS_UPDATED_BY_ID, SYS_CLIENT_ID, SYS_VERSION)
	values (NEWID(), N'ForcedCheckKPK', N'Auto KPK check on Natural person save process', getdate(), N'00000000-0000-0000-0000-000000000000', getdate(), N'00000000-0000-0000-0000-000000000000', N'Data script', 0);
end
go

-- Application roles
if not exists(select * from CFG.APPLICATION_ROLE where CODE_NAME = N'checkKPKForced')
begin
	insert into CFG.APPLICATION_ROLE (APPLICATION_ROLE_ID, CODE_NAME, DESCRIPTION, SYS_CREATED_ON, SYS_CREATED_BY_ID, SYS_UPDATED_ON, SYS_UPDATED_BY_ID, SYS_CLIENT_ID, SYS_VERSION)
	values ( NEWID(), N'checkKPKForced', N'Forced check KPK', getdate(), N'00000000-0000-0000-0000-000000000000', getdate(), N'00000000-0000-0000-0000-000000000000', N'Data script', 0);
end
go

-- System permissions roles
insert into CFX.SYSTEM_PERMISSION_ROLE (SYSTEM_PERMISSION_ROLE_ID, SYSTEM_PERMISSION_ID, APPLICATION_ROLE_ID, SYS_CREATED_ON, SYS_CREATED_BY_ID, SYS_UPDATED_ON, SYS_UPDATED_BY_ID, SYS_CLIENT_ID, SYS_VERSION)
select NEWID(), sp.SYSTEM_PERMISSION_ID, ar.APPLICATION_ROLE_ID, getdate(), N'00000000-0000-0000-0000-000000000000', getdate(), N'00000000-0000-0000-0000-000000000000', N'Data script', 0
from CFG.APPLICATION_ROLE ar, CFG.SYSTEM_PERMISSION sp
where
    (ar.CODE_NAME = 'checkKPKForced' and sp.CODE_NAME = 'ForcedCheckKPK')
go

-- Assign roles to the user Administrator
insert into CFX.USER_APPLICATION_ROLE (APPLICATION_ROLE_ID, APPLICATION_USER_ID, APPLICATION_USER_ROLE_ASSIGNMENT_ID, SYS_CREATED_ON, SYS_CREATED_BY_ID, SYS_UPDATED_ON, SYS_UPDATED_BY_ID, SYS_CLIENT_ID, SYS_VERSION)
select ar.APPLICATION_ROLE_ID, au.APPLICATION_USER_ID, NEWID(), getdate(), N'00000000-0000-0000-0000-000000000000', getdate(), N'00000000-0000-0000-0000-000000000000', N'Data script', 0
from CFG.APPLICATION_ROLE ar, ORG.APPLICATION_USER au
where
    au.USERNAME in ('System','Administrator') and ar.CODE_NAME in ('checkKPKForced')
go