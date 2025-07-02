insert into acc.CT_JOURNAL_TYPE (JOURNAL_TYPE_ID, DESCRIPTION, JOURNAL_CATEGORY_ID, ENTRY_TYPE_ID) values (1000, 'Revaluation', 3, null)
go

insert into acc.CT_BUSINESS_EVENT_TYPE (BUSINESS_EVENT_TYPE_ID, DESCRIPTION) values (1001, 'Revaluation')
go

insert into acc.CT_GL_ACCOUNT_TYPE (GL_ACCOUNT_TYPE_ID, DESCRIPTION, ATTRIBUTE_SET_ID, FROM_PAYMENT) values (1015, 'Revaluation', null, 0)
go


insert into acc.GL_ACCOUNT (GL_ACCOUNT_TYPE_ID, GL_ACCOUNT_NO, DESCRIPTION, PARENT_ACCOUNT_ID, SYNTHETIC)
values
	(1015, '71511', N'Доходы от операций с иностранной валютой', null, 0),
	(1015, '71512', N'Расходы по операциям с иностранной валютой', null, 0),
	(1015, '72511', N'Доходы от операций с иностранной валютой', null, 0),
	(1015, '72512', N'Расходы по операциям с иностранной валютой', null, 0)
go

insert into acc.CT_DOCUMENT_TYPE (DOCUMENT_TYPE_ID, DESCRIPTION) values (1022, 'Revalation')
go

insert into acc_impl.TRANSACTION_TYPE (TRANSACTION_TYPE_ID, DESCRIPTION, TRANSACTION_DOCUMENT_TYPE_ID, LOCAL_DIMENSION_3_ID)
values
(
	6,
	N'Валютная переоценка',
	(select TRANSACTION_DOCUMENT_TYPE_ID from ACC_IMPL.CT_TRANSACTION_DOCUMENT_TYPE where TRANSACTION_DOCUMENT_TYPE_CODE = '2H'),
	(select LOCAL_DIMENSION_3_ID from ACC_IMPL.CT_LOCAL_DIMENSION_3 where LOCAL_DIMENSION_3_CODE = 'TX20')
)
go

--OFR CODE
insert into acc_impl.CT_OFR (OFR_ID, OFR_CODE, DESCRIPTION)
values
(32, N'37201', N'37201'),
(33, N'37202', N'37202'),
(34, N'37203', N'37203'),
(35, N'37204', N'37204'),
(36, N'37205', N'37205'),
(37, N'37206', N'37206')
go

-- SAP GL ACCOUNT RULE
insert into acc_impl.SAP_GL_ACCOUNT_RULE (GL_ACCOUNT_ID, OFR_ID, PREVIOUS_PERIOD, PERSON_TYPE_ID, SAP_GL_ACCOUNT_ID)
values
((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71511'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '37201'), 0, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3400002030')),
((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71511'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '37202'), 0, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3400002030')),
((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71511'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '37203'), 0, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3400002030')),
((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71511'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '37204'), 0, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3400002030')),
((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71511'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '37205'), 0, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3400002030')),
((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71511'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '37206'), 0, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3400002030')),
((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71512'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '37201'), 0, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3500002020')),
((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71512'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '37202'), 0, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3500002020')),
((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71512'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '37203'), 0, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3500002020')),
((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71512'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '37204'), 0, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3500002020')),
((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71512'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '37205'), 0, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3500002020')),
((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '71512'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '37206'), 0, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3500002020')),
((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '72511'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '37201'), 1, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3400002030')),
((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '72511'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '37202'), 1, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3400002030')),
((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '72511'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '37203'), 1, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3400002030')),
((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '72511'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '37204'), 1, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3400002030')),
((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '72511'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '37205'), 1, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3400002030')),
((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '72511'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '37206'), 1, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3400002030')),
((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '72512'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '37201'), 1, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3500002020')),
((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '72512'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '37202'), 1, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3500002020')),
((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '72512'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '37203'), 1, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3500002020')),
((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '72512'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '37204'), 1, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3500002020')),
((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '72512'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '37205'), 1, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3500002020')),
((select GL_ACCOUNT_ID from ACC.GL_ACCOUNT where GL_ACCOUNT_NO = '72512'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '37206'), 1, null, (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3500002020'));

-- TRANSACTION DEFINITION
alter table acc_impl.TRANSACTION_DEFINITION add TRANSACTION_TYPE_ID int null constraint FK_ACC_IMPL_TRANS_DEF_TRANS_TYPE_ID foreign key references acc_impl.TRANSACTION_TYPE (TRANSACTION_TYPE_ID)
go
alter table acc_impl.TRANSACTION_DEFINITION add [SIGN] int null
go
alter table acc_impl.TRANSACTION_DEFINITION add IS_PREVIOUS_PERIOD bit null
go
alter table acc_impl.TRANSACTION_DEFINITION add IS_LIFE bit null
go

create table ACC_IMPL.TRANSACTION_DEFINITION_STEP
(
    TRANSACTION_DEFINITION_NO [nvarchar](10) not null,
    IS_DEBIT [bit] not null,
    PAIR_NO [int] not null,
    PAIR_SEQ_NO [int] not null,
    GL_ACCOUNT_ID [bigint] not null references ACC.GL_ACCOUNT(GL_ACCOUNT_ID),
    ATTRIBUTE_SET_ID [bigint] null,
    [SIGN] [int] not null,
)
go

alter table ACC_IMPL.OFR_RULE add CURRENCY_CODE nvarchar(3) null
go

--delete from ACC_IMPL.TRANSACTION_DEFINITION where TRANSACTION_DEFINITION_NO in ('8.1.1','8.1.2','8.1.3','8.1.4','8.1.5','8.1.6','8.1.7','8.1.8');
insert into acc_impl.TRANSACTION_DEFINITION (TRANSACTION_DEFINITION_NO, TRANSACTION_TYPE_ID, [SIGN], IS_PREVIOUS_PERIOD, IS_LIFE, GL_ACCOUNT_ID_DT, GL_ACCOUNT_ID_CT, DOCUMENT_TYPE_ID, BELEGTC, BELEGSC_ALGL_2, BELEGSC_ALGL_3, BUCHUGC, VORGAST_ALGL_2, VORGAST_ALGL_3)
values
('8.1.1', 6, 1, 0, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48001'), (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71511'), 1022, '09', '09702', '09702', '10', null, null),
('8.1.2', 6,-1, 0, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71512'), (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48001'), 1022, '09', '09702', '09702', '10', null, null),
('8.1.3', 6, 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48001'), (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '72511'), 1022, '09', '09702', '09702', '10', null, null),
('8.1.4', 6,-1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '72512'), (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48001'), 1022, '09', '09702', '09702', '10', null, null),
('8.1.5', 6, 1, 0, 0, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48003'), (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71511'), 1022, '09', '09702', '09702', '10', null, null),
('8.1.6', 6,-1, 0, 0, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71512'), (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48003'), 1022, '09', '09702', '09702', '10', null, null),
('8.1.7', 6, 1, 1, 0, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48003'), (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '72511'), 1022, '09', '09702', '09702', '10', null, null),
('8.1.8', 6,-1, 1, 0, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '72512'), (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48003'), 1022, '09', '09702', '09702', '10', null, null)
go

--delete from ACC_IMPL.TRANSACTION_DEFINITION_STEP where TRANSACTION_DEFINITION_NO in ('8.1.1','8.1.2','8.1.3','8.1.4','8.1.5','8.1.6','8.1.7','8.1.8');
insert into acc_impl.TRANSACTION_DEFINITION_STEP (TRANSACTION_DEFINITION_NO, IS_DEBIT, PAIR_NO, PAIR_SEQ_NO, GL_ACCOUNT_ID, ATTRIBUTE_SET_ID, [SIGN])
values
('8.1.1', 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48001'), null, 1),
('8.1.1', 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71511'),    6, 1),
('8.1.2', 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71512'), null, -1),
('8.1.2', 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48001'),    6, -1),
('8.1.3', 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48001'), null, 1),
('8.1.3', 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '72511'),    6, 1),
('8.1.4', 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '72512'), null, -1),
('8.1.4', 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48001'),    6, -1),
('8.1.5', 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48003'), null, 1),
('8.1.5', 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71511'),    6, 1),
('8.1.6', 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71512'), null, -1),
('8.1.6', 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48003'),    6, -1),
('8.1.7', 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48003'), null, 1),
('8.1.7', 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '72511'),    6, 1),
('8.1.8', 1, 1, 1, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '72512'), null, -1),
('8.1.8', 0, 1, 2, (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48003'),    6, -1)
go

insert into acc_impl.OFR_RULE (GL_ACCOUNT_ID, PREVIOUS_PERIOD, DOCUMENT_TYPE_ID, CURRENCY_CODE, OFR_ID)
values
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71511'), null, null, 'USD', (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '37201')),
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71511'), null, null, 'EUR', (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '37202')),
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71511'), null, null, 'GBP', (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '37203')),
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71511'), null, null, 'CHF', (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '37204')),
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71511'), null, null, 'JPY', (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '37205')),
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71511'), null, null,  null, (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '37206')),
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71512'), null, null, 'USD', (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '37201')),
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71512'), null, null, 'EUR', (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '37202')),
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71512'), null, null, 'GBP', (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '37203')),
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71512'), null, null, 'CHF', (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '37204')),
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71512'), null, null, 'JPY', (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '37205')),
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71512'), null, null,  null, (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '37206'))
go

delete from acc.ATTRIBUTE_SET
where 1=1
	and ATTRIBUTE_SET_ID in (1, 2, 6)
	and ATTRIBUTE_DEFINITION_ID in (select ATTRIBUTE_DEFINITION_ID from acc.ATTRIBUTE_DEFINITION where NAME in ('BankStatementItemId','CommissionActId','ContractNumber','PaymentOrderNumber'))
go

alter table acc.GL_ADDITIONAL_ATTRIBUTES add TRANSACTION_DEFINITION_NO [nvarchar](10) null
go

insert into ACC.ATTRIBUTE_DEFINITION (NAME, ATTRIBUTE_VALUE_TYPE_ID, DESCRIPTION) values ('TransactionDefinitionNo', 1, N'Transaction definition no')
go

insert into acc.ATTRIBUTE_SET (ATTRIBUTE_SET_ID, ATTRIBUTE_DEFINITION_ID, REQUIRED, SOURCE_ID, NAME, DESCRIPTION)
values (3, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'TransactionDefinitionNo'), 0, null, 'SAP GL Account attributes 1', 'Other not validated attributes'),
       (4, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'TransactionDefinitionNo'), 0, null, 'SAP GL Account attributes 2', 'Other not validated attributes'),
       (5, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'TransactionDefinitionNo'), 0, null, 'SAP GL Account attributes 3', 'Other not validated attributes'),
       (7, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'TransactionDefinitionNo'), 0, null, 'SAP GL Account attributes 4', 'Other not validated attributes'),
       (8, (select ATTRIBUTE_DEFINITION_ID from ACC.ATTRIBUTE_DEFINITION where ATTRIBUTE_DEFINITION.NAME = 'TransactionDefinitionNo'), 0, null, 'SAP GL Account attributes 5', 'Other not validated attributes')
go

if exists (select * from sys.tables t
	inner join sys.partitions p on t.object_id = p.object_id
	where t.object_id = object_id(N'[ACC_IMPL].[POSTED_PAYMENT_PLAN_SAT]') and p.rows > 0)
begin
	exec sp_rename 'ACC_IMPL.POSTED_PAYMENT_PLAN_SAT.POSTED_UNTIL_DUE_DATE', 'POSTED_UNTIL_POSTING_DATE', 'COLUMN';
end
go

if object_id(N'ACC_IMPL.REVALUATION_DATA', N'U') is not null
	drop table ACC_IMPL.REVALUATION_DATA;
go

CREATE TABLE ACC_IMPL.REVALUATION_DATA
(
	REVALUATION_DATA_ID bigint not null,
	LOAD_DATE datetime2(7) not null,
	CONTRACT_NUMBER nvarchar(50) not null,
	DUE_DATE date not null,
	OBJECT_CODE nvarchar(250) not null,
	ITEM_NO varchar(250) not null,
	AMOUNT decimal(15, 2) not null,
	OPEN_AMOUNT decimal(15, 2) not null,
	EXCHANGE_RATE decimal(15, 7) not null,
	REVALUATION_AMOUNT decimal(15, 2) not null,

	CONSTRAINT PK_ACC_IMPL_REVALUATION_DATA PRIMARY KEY CLUSTERED ( REVALUATION_DATA_ID )
)
go
