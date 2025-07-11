update acc_impl.BANK_STATEMENT_ITEM set PAYMENT_SOURCE_ID = 1 where PAYMENT_SOURCE_ID not in (1,2,3)

CREATE TABLE [ACC_IMPL].[CT_PAYMENT_SOURCE] (
	[PAYMENT_SOURCE_ID] int PRIMARY KEY,
	[DESCRIPTION] [nvarchar](250) NOT NULL
)
GO

insert into [ACC_IMPL].[CT_PAYMENT_SOURCE]
values
(1, 'BankStatement'),
(2, 'Registry'),
(3, 'PaymentOrder')
GO

ALTER TABLE [ACC_IMPL].[BANK_STATEMENT_ITEM] WITH CHECK ADD CONSTRAINT [FK_ACC_IMPL_PAYMENT_SOURCE_ID] FOREIGN KEY([PAYMENT_SOURCE_ID])
REFERENCES [ACC_IMPL].[CT_PAYMENT_SOURCE] ([PAYMENT_SOURCE_ID])
GO
