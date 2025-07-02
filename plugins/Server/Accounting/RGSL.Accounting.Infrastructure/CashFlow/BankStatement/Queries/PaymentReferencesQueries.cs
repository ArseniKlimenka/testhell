namespace Adacta.AdInsure.RGSL.Accounting.Infrastructure.CashFlow.BankStatement.Queries
{
    static class PaymentReferencesQueries
    {
        public static string InsertPaymentReference()
        {
            return @"
insert into ACC_IMPL.PAYMENT_REFERENCE
(
	BANK_STATEMENT_ITEM_ID,
	REFERENCE_NO,
	ORDER_NO,
	ERROR_CODE,
	ERROR_MESSAGE,
	IS_ERROR,
	LAST_UPDATED
)
values
(
	@BankStatementItemId,
	@ReferenceNo,
	@OrderNo,
	@ErrorCode,
	@ErrorMessage,
	@IsError,
	@LastUpdated
)";
        }

        public static string DeletePaymentReferences()
        {
            return @"delete from ACC_IMPL.PAYMENT_REFERENCE where BANK_STATEMENT_ITEM_ID = @0";
        }


        public static string SelectPaymentReferences()
        {
            return @"
select
	BANK_STATEMENT_ITEM_ID,
	REFERENCE_NO,
	ORDER_NO,
	ERROR_CODE,
	ERROR_MESSAGE,
	IS_ERROR,
	LAST_UPDATED
from ACC_IMPL.PAYMENT_REFERENCE
where bank_statement_item_id = @bankStatementItemId
order by ORDER_NO";
        }


        public static string SelectPaymentReferencesMany()
        {
            return @"
select
	BANK_STATEMENT_ITEM_ID,
	REFERENCE_NO,
	ORDER_NO,
	ERROR_CODE,
	ERROR_MESSAGE,
	IS_ERROR,
	LAST_UPDATED
from ACC_IMPL.PAYMENT_REFERENCE
where /**where**/";
        }

        public static string UpdatePaymentReferenceMessage()
        {
            return @"
update pr
set
	ERROR_CODE = @ErrorCode,
	ERROR_MESSAGE = @ErrorMessage,
	IS_ERROR = case when @ErrorMessage is null then 0 else 1 end,
	LAST_UPDATED = @LastUpdated
from 
	acc_impl.PAYMENT_REFERENCE pr
	inner join acc_impl.BANK_STATEMENT_ITEM bsi on bsi.BANK_STATEMENT_ITEM_ID = pr.BANK_STATEMENT_ITEM_ID
where 1=1
	and pr.BANK_STATEMENT_ITEM_ID = @BankStatementItemId
	and pr.REFERENCE_NO = @ReferenceNo";
        }
    }
}
