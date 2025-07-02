create table BFX_IMPL.RISK_TYPE
(
	RISK_TYPE nvarchar(255) NOT NULL,
	IS_LIFE bit NOT NULL,

	constraint [PK_ACC_IMPL_ALLOCATION_POLICY_ALLOCATION_ID] primary key clustered
	(
		[RISK_TYPE] asc
	)
)
go

insert into BFX_IMPL.RISK_TYPE(RISK_TYPE, IS_LIFE)
values
('life', 1),
('nonLife', 0),
('investmentContractWithDPF', 1)
go

alter table BFX_IMPL.RISKS with check add constraint [FK_BFX_IMPL_RISKS_TYPE] foreign key([TYPE])
references BFX_IMPL.RISK_TYPE (RISK_TYPE)
go

alter table BFX_IMPL.RISKS check constraint [FK_BFX_IMPL_RISKS_TYPE]
go
