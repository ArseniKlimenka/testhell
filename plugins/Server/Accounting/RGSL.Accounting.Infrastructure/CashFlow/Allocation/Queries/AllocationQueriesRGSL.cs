namespace Adacta.AdInsure.RGSL.Accounting.Infrastructure.CashFlow.Allocation.Queries
{
    static class AllocationQueriesRGSL
    {
        public static string CreateAllocation()
        {
            return @"
insert into acc_impl.allocation (
	CANCELLED,
	CANCELLED_ALLOCATION_ID,
	BANK_STATEMENT_ITEM_ID,
	PAY_AMOUNT,
	DOC_AMOUNT,
	TOLERANCE_DOC_AMOUNT,
	PAY_CURRENCY_CODE,
	DOC_CURRENCY_CODE,
	PAY_RATE,
	DOC_RATE,
	CREATE_DATE,
	DOCUMENT_NO,
	DOCUMENT_TYPE_ID
)
values (
	@Cancelled,
	@CancelledAllocationId,
	@BankStatementItemId,
	@PayAmount,
	@DocAmount,
	@ToleranceDocAmount,
	@PayCurrencyCode,
	@DocCurrencyCode,
	@PayRate,
	@DocRate,
	@CreateDate,
	@DocumentNo,
	@DocumentTypeId
)";
        }

        public static string GetAllocation()
        {
            return @"
select
	alc.ALLOCATION_ID,
	alc.CANCELLED,
	alc.CANCELLED_ALLOCATION_ID,
	alc.BANK_STATEMENT_ITEM_ID,
	alc.PAY_AMOUNT,
	alc.DOC_AMOUNT,
	alc.TOLERANCE_DOC_AMOUNT,
	alc.PAY_CURRENCY_CODE,
	alc.DOC_CURRENCY_CODE,
	alc.PAY_RATE,
	alc.DOC_RATE,
	alc.CREATE_DATE,
	alc.DOCUMENT_NO,
	alc.DOCUMENT_TYPE_ID
from acc_impl.ALLOCATION alc
where /**where**/
";
        }

        public static string GetAllocationPayAmount()
        {
            return @"
select coalesce(sum(alc.PAY_AMOUNT), 0)
from acc_impl.ALLOCATION alc
where /**where**/
";
        }
    }
}
