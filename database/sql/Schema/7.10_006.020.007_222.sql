alter table acc_impl.CA_ACT_ITEM add
	AA_EXPENSES_RATE decimal(15,6) null,
	AA_NATURAL_PERSON_RATE decimal(15,6) null,
	AA_SOLE_PROPRIATOR_RATE decimal(15,6) null,
	DOC_EXPENSES_RATE decimal(15,6) null,
	DOC_NATURAL_PERSON_RATE decimal(15,6) null,
	DOC_SOLE_PROPRIATOR_RATE decimal(15,6) null,
	EXPENSES_RATE_FINAL decimal(15,6) null,
	NATURAL_PERSON_RATE_FINAL decimal(15,6) null,
	SOLE_PROPRIATOR_RATE_FINAL decimal(15,6) null,
	EXPENSES_AMOUNT decimal(15,6) null,
	NATURAL_PERSON_AMOUNT decimal(15,6) null,
	SOLE_PROPRIATOR_AMOUNT decimal(15,6) null
go

update acc_impl.CA_ACT_ITEM set
	AA_EXPENSES_RATE = 0, AA_NATURAL_PERSON_RATE = 0, AA_SOLE_PROPRIATOR_RATE = 0,
	EXPENSES_RATE_FINAL = 0, NATURAL_PERSON_RATE_FINAL = 0, SOLE_PROPRIATOR_RATE_FINAL = 0,
	EXPENSES_AMOUNT = 0, NATURAL_PERSON_AMOUNT = 0, SOLE_PROPRIATOR_AMOUNT = 0
where AA_EXPENSES_RATE is null
go

alter table acc_impl.CA_ACT_ITEM alter column AA_EXPENSES_RATE decimal(15,6) not null
go
alter table acc_impl.CA_ACT_ITEM alter column AA_NATURAL_PERSON_RATE decimal(15,6) not null
go
alter table acc_impl.CA_ACT_ITEM alter column AA_SOLE_PROPRIATOR_RATE decimal(15,6) not null
go
alter table acc_impl.CA_ACT_ITEM alter column EXPENSES_RATE_FINAL decimal(15,6) not null
go
alter table acc_impl.CA_ACT_ITEM alter column NATURAL_PERSON_RATE_FINAL decimal(15,6) not null
go
alter table acc_impl.CA_ACT_ITEM alter column SOLE_PROPRIATOR_RATE_FINAL decimal(15,6) not null
go
alter table acc_impl.CA_ACT_ITEM alter column EXPENSES_AMOUNT decimal(15,6) not null
go
alter table acc_impl.CA_ACT_ITEM alter column NATURAL_PERSON_AMOUNT decimal(15,6) not null
go
alter table acc_impl.CA_ACT_ITEM alter column SOLE_PROPRIATOR_AMOUNT decimal(15,6) not null
go
