namespace Adacta.AdInsure.RGSL.Accounting.Infrastructure.CashFlow.BankStatement.Queries
{
    static class BankStatementQueriesRGSL
    {
        public static string InsertBankStatementItem()
        {
            return @"
insert into acc_impl.BANK_STATEMENT_ITEM
(
	IMPORT_DOCUMENT_ID,
	REGISTRY_REFERENCE_NO,
	AGGREGATED_PAYMENT_REGISTER_ID,
	BANK_STATEMENT_ITEM_NO,
	INCOME_SOURCE_ID,
	DIRECTION,
	PAYMENT_DESCRIPTION,
	ORIGINAL_PAYMENT_DESCRIPTION,
	CURRENCY_CODE,
	STATUS_ID,
	AMOUNT,
	OPEN_AMOUNT,
	PAYMENT_DATE,
	CREATE_DATE,
	TRANSACTION_DATE,
	IS_REGISTRY,
	IS_ACQUIRING,
	NON_ACCEPTANCE,
	TOLERANCE_TYPE,
	DEBTOR_NAME,
	DEBTOR_TYPE,
	DEBTOR_BANK_ACCOUNT_NO,
	CREDITOR_NAME,
	CREDITOR_TYPE,
	CREDITOR_BANK_ACCOUNT_NO,
	SEGMENT,
	PAYMENT_SOURCE_ID,
	FAKE,
	IS_MIGRATED,
	RGSL_GUID,
	RGSL_DOCUMENT_TYPE_ID,
	RGSL_DOCUMENT_DATE,
	RELOAD_REQUIRED
)
values
(
	@ImportDocumentId,
	@RegistryReferenceNo,
	@AggregatedPaymentRegisterId,
	@BankStatementItemNo,
	@IncomeSourceId,
	@Direction,
	@PaymentDescription,
	@OriginalPaymentDescription,
	@CurrencyCode,
	@StatusId,
	@Amount,
	@OpenAmount,
	@PaymentDate,
	@CreateDate,
	@TransactionDate,
	@IsRegistry,
	@IsAcquiring,
	@NonAcceptance,
	@ToleranceType,
	@DebtorName,
	@DebtorType,
	@DebtorBankAccountNo,
	@CreditorName,
	@CreditorType,
	@CreditorBankAccountNo,
	@Segment,
	@PaymentSourceId,
	@Fake,
	@IsMigrated,
	@RgslGuid,
	@RgslDocumentTypeId,
	@RgslDocumentDate,
	@ReloadRequired
)
";
        }

        public static string UpdateBankStatementItem()
        {
            return @"
update acc_impl.BANK_STATEMENT_ITEM
set
	REGISTRY_REFERENCE_NO = @RegistryReferenceNo,
	AGGREGATED_PAYMENT_REGISTER_ID = @AggregatedPaymentRegisterId,
	BANK_STATEMENT_ITEM_NO = @BankStatementItemNo,
	INCOME_SOURCE_ID = @IncomeSourceId,
	DIRECTION = @Direction,
	PAYMENT_DESCRIPTION = @PaymentDescription,
	ORIGINAL_PAYMENT_DESCRIPTION = @OriginalPaymentDescription,
	CURRENCY_CODE = @CurrencyCode,
	STATUS_ID = @StatusId,
	AMOUNT = @Amount,
	OPEN_AMOUNT = @OpenAmount,
	PAYMENT_DATE = @PaymentDate,
	CREATE_DATE = @CreateDate,
	TRANSACTION_DATE = @TransactionDate,
	IS_REGISTRY = @IsRegistry,
	IS_ACQUIRING = @IsAcquiring,
	NON_ACCEPTANCE = @NonAcceptance,
	TOLERANCE_TYPE = @ToleranceType,
	DEBTOR_NAME = @DebtorName,
	DEBTOR_TYPE = @DebtorType,
	DEBTOR_BANK_ACCOUNT_NO = @DebtorBankAccountNo,
	CREDITOR_NAME = @CreditorName,
	CREDITOR_TYPE = @CreditorType,
	CREDITOR_BANK_ACCOUNT_NO = @CreditorBankAccountNo,
	SEGMENT = @Segment,
	PAYMENT_SOURCE_ID = @PaymentSourceId,
	FAKE = @Fake,
	IS_MIGRATED = @IsMigrated,
	RGSL_GUID = @RgslGuid,
	RGSL_DOCUMENT_TYPE_ID = @RgslDocumentTypeId,
	RGSL_DOCUMENT_DATE = @RgslDocumentDate,
	RELOAD_REQUIRED = @ReloadRequired
where BANK_STATEMENT_ITEM_ID = @BankStatementItemId";
        }

        public static string SelectBankStatementItem()
        {
            return @"
select
	bsi.BANK_STATEMENT_ITEM_ID,
	bsi.REGISTRY_REFERENCE_NO,
	bsi.IMPORT_DOCUMENT_ID,
	bsi.BANK_STATEMENT_ITEM_NO,
	bsi.INCOME_SOURCE_ID,
	bsi.DIRECTION,
	bsi.PAYMENT_DESCRIPTION,
	bsi.ORIGINAL_PAYMENT_DESCRIPTION,
	bsi.CURRENCY_CODE,
	bsi.STATUS_ID,
	bsi.AMOUNT,
	bsi.OPEN_AMOUNT,
	cast(
		case when exists
		(
			select * from acc_impl.ALLOCATION alc where 1=1
				and alc.CANCELLED = 0
				and alc.CANCELLED_ALLOCATION_ID is null
				and alc.BANK_STATEMENT_ITEM_ID = bsi.BANK_STATEMENT_ITEM_ID
				and alc.DOCUMENT_TYPE_ID = 2
		) then 1 else 0 end as bit
	) as HAS_REFUNDS,
	bsi.PAYMENT_DATE,
	bsi.CREATE_DATE,
	bsi.TRANSACTION_DATE,
	bsi.IS_REGISTRY,
	bsi.IS_ACQUIRING,
	bsi.NON_ACCEPTANCE,
	bsi.TOLERANCE_TYPE,
	bsi.DEBTOR_NAME,
	bsi.DEBTOR_TYPE,
	bsi.DEBTOR_BANK_ACCOUNT_NO,
	bsi.CREDITOR_NAME,
	bsi.CREDITOR_TYPE,
	bsi.CREDITOR_BANK_ACCOUNT_NO,
	bsi.SEGMENT,
	bsi.PAYMENT_SOURCE_ID,
	bsi.FAKE,
	bsi.IS_MIGRATED,
	bsi.RGSL_GUID,
	bsi.RGSL_DOCUMENT_TYPE_ID,
	bsi.RGSL_DOCUMENT_DATE
from
	acc_impl.BANK_STATEMENT_ITEM bsi
where /**where**/
";
        }

        public static string UpdateStatusAndOpenAmount()
        {
            return @"
update acc_impl.bank_statement_item
set open_amount = @OpenAmount,
    status_id = @StatusId
where bank_statement_item_id = @BankStatementItemId
";
        }

        public static string UpdateStatus()
        {
            return @"
update acc_impl.bank_statement_item
set status_id = @StatusId
where bank_statement_item_id = @BankStatementItemId
";
        }

        public static string UpdatePaymentDescription()
        {
            return @"
update acc_impl.bank_statement_item
set payment_description = @newPaymentDescription
where bank_statement_item_id = @bankStatementItemId
";
        }

        public static string InsertBankStatementItemHistory()
        {
            return @"
insert into acc_impl.BANK_STATEMENT_ITEM_HISTORY
(
	bank_statement_item_id,
	status_id_from,
	status_id_to,
    payment_description_from,
    payment_description_to,
	create_date,
	user_id
)
values
(
	@BankStatementItemId,
	@StatusIdFrom,
	@StatusIdTo,
    @PaymentDescriptionFrom,
    @PaymentDescriptionTo,
	@CreateDate,
	@UserId
)";
        }

		public static string InsertXMLMessageItemHistory()
        {
            return @"
insert into acc_impl.XML_MESSAGE_ITEM_HISTORY
(
	bank_statement_item_id,
	bank_statement_item_no,
    authorized_person_tab_number,
    allocation_id,
	document_no,
	create_date,
	user_id
)
values
(
	@BankStatementItemId,
	@BankStatementItemNo,
    @AuthorizedPersonTabNumber,
    @AllocationId,
	@DocumentNo,
	@CreateDate,
	@UserId
)";
        }

		public static string MarkPaymentToReload()
		{
			return @"
update acc_impl.BANK_STATEMENT_ITEM
set
	RELOAD_REQUIRED = 1
where RGSL_GUID = @rgslGuid
	and STATUS_ID in (@statusIds)
";
		}
	}
}
