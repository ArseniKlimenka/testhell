-- Application roles
if not exists(select * from CFG.APPLICATION_ROLE where CODE_NAME = N'PaymentDistributionAdminExtra')
begin
	insert into CFG.APPLICATION_ROLE (APPLICATION_ROLE_ID, CODE_NAME, DESCRIPTION, SYS_CREATED_ON, SYS_CREATED_BY_ID, SYS_UPDATED_ON, SYS_UPDATED_BY_ID, SYS_CLIENT_ID, SYS_VERSION)
	values ( NEWID(), N'PaymentDistributionAdminExtra', N'Payment distribution administrator extra', getdate(), N'00000000-0000-0000-0000-000000000000', getdate(), N'00000000-0000-0000-0000-000000000000', N'Data script', 0);
end;
go

-- System permissions roles
update CFX.SYSTEM_PERMISSION_ROLE
set APPLICATION_ROLE_ID = (select APPLICATION_ROLE_ID from CFG.APPLICATION_ROLE where CODE_NAME = 'PaymentDistributionAdminExtra')
where APPLICATION_ROLE_ID = (select APPLICATION_ROLE_ID from CFG.APPLICATION_ROLE where CODE_NAME = 'AllocationAdministratorExtra')
go

-- Assign roles to the user Administrator
update CFX.USER_APPLICATION_ROLE
set APPLICATION_ROLE_ID = (select APPLICATION_ROLE_ID from CFG.APPLICATION_ROLE where CODE_NAME = 'PaymentDistributionAdminExtra')
where APPLICATION_ROLE_ID = (select APPLICATION_ROLE_ID from CFG.APPLICATION_ROLE where CODE_NAME = 'AllocationAdministratorExtra')
go

delete from CFG.APPLICATION_ROLE where CODE_NAME = 'AllocationAdministratorExtra'
go
