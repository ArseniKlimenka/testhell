delete from acc_impl.PAYABLE_COMMISSION
go
alter table acc_impl.PAYABLE_COMMISSION drop column AA_COMM_RATE
go
alter table acc_impl.PAYABLE_COMMISSION drop column DOC_COMM_RATE
go

alter table acc_impl.PAYABLE_COMMISSION
add
	POLICY_COMMISSION_HKEY char(32) not null,
	OBJECT_CODE nvarchar(100) not null,
	ITEM_CODE nvarchar(100) not null,
	PERIOD_NUMBER int not null
go

alter table acc_impl.PAYABLE_COMMISSION add DOC_BASE_AMOUNT decimal(15,2) not null
go

alter table acc_impl.PAYABLE_COMMISSION
add
	DOC_COMM_RATE decimal(15,6) null,
	DOC_COMM_FIXED_AMOUNT decimal(15,2) null,
	DOC_COMM_CALC_AMOUNT decimal(15,2) null
go

alter table acc_impl.PAYABLE_COMMISSION
add
	AA_COMM_RATE decimal(15,6) null,
	AA_COMM_FIXED_AMOUNT decimal(15,2) null,
	AA_COMM_CALC_AMOUNT decimal(15,2) null
go
