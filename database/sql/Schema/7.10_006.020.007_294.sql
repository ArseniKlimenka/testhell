create table [ACC_IMPL].[BOK_OUTGOING_PAYMENT]
(
	[INTERNAL_NUMBER] [nvarchar](64) null,--внутренний номер договора
	[CONTRACT_NUMBER] [nvarchar](64) not null,--внешний номер договора
	[PAYOUT_TYPE] [nvarchar](64) null,--тип выплаты (выкупная сумма/убыток/возврат премии)
	[COLLECTION_NUMBER] [nvarchar](10) null,--Номер коллекшена
	[CLAIM_NUMBER] int null,--Номер убытка
	[ACT_NUMBER] [nvarchar](8) null,--Номер акта
	[APPLICATION_DATE] date null,--Дата заявления
	[CANCELLATION_DATE] date null,--Дата расторжения
	[BENEFICIARY_NAME] [nvarchar](64) null,--Выгодоприобретатель
	[CURRENCY_CODE] [varchar](3) null,--Валюта договора
	[RESERVE_AMOUNT_LC] [decimal](15, 2) null,--Сумма резерва в руб.
	[RESERVE_AMOUNT_DOC] [decimal](15, 2) null,--Сумма резерва в валюте
	[POSTING_DATE] date null,--Дата проводки
	[PAYMENT_DATE] date null,--Дата платежа
	[PAYOUT_AMOUNT_LC] [decimal](15, 2) null,--Сумма выплаты в руб.
	[PAYOUT_AMOUNT_DOC] [decimal](15, 2) null,--Сумма выплаты в валюте договоре
	[WITHOLD_PIT_LC] [decimal](15, 2) null,--Сумма удержанного налога в руб.
	[WITHOLD_PIT_DOC] [decimal](15, 2) null,--Сумма удержанного налога в валюте договора
	[AMOUNT_LC] [decimal](15, 2) null,--Сумма на договор, руб.
	[AMOUNT_DOC] [decimal](15, 2) null,--Сумма на договор в валюте
	[BONUS_AMOUNT_LC] [decimal](15, 2) null,--Бонус в рублях
	[BONUS_AMOUNT_DOC] [decimal](15, 2) null,--Бонус в валюте

	constraint [PK_ACC_IMPL_BOK_OUTGOING_PAYMENT_CONTRACT_NUMBER] primary key clustered
	(
		[CONTRACT_NUMBER] asc
	)
)
go
