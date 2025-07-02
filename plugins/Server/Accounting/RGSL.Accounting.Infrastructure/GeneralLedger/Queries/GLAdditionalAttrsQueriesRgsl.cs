using Adacta.AdInsure.Accounting.Infrastructure.GeneralLedger.Queries;

namespace Adacta.AdInsure.RGSL.Accounting.Infrastructure.GeneralLedger.Queries
{
    public class GLAdditionalAttrsQueriesRgsl : LedgerAdditionalAttrsQueries
    {
        /// <summary>
        /// Returns SQL statement to insert additional attributes into database.
        /// Implementation must override this query if using additional attributes on subledger and balance account entries.
        /// </summary>
        /// <returns></returns>
        public override string Insert_AdditionalAttributes()
        {
            return @"
            insert into ACC.GL_ADDITIONAL_ATTRIBUTES
            (
                PROPOSED_POST_DATE,
                TRANSACTION_DEFINITION_NO,
                BALANCE_UNIT,
                BANK_STATEMENT_ITEM_ID,
                COMMISSION_ACT_ID,
                CONTRACT_NUMBER,
                PAYMENT_ORDER_NUMBER,
                TRANSACTION_CODE_2,
                TRANSACTION_TYPE_ID,
                OFR_ID,
                TRANSACTION_CODE_1,
                REGISTER,
                SAP_GL_ACCOUNT_ID,
                COST_CENTER,
                TRADING_PARTNER,
                DOCUMENT_NO,
                AA_ORDER_NO,
                XREF2,
                PERSONAL_ACCOUNT_NUMBER,
                BUSINESS_LINE,
                CEDENTS_COUNTRY,
                LOCAL_DIMENSION_1,
                LOCAL_DIMENSION_2,
                LOCAL_DIMENSION_3_ID,
                PARTY_CODE,
                TRANSACTION_DOCUMENT_TYPE_ID,
                DATE_TO_CHECK_PREV_PERIOD,
                CANCELLED_DOCUMENT_NO,
                COMMISSION_RATE
            )
            values
            (
                @ProposedPostDate,
                @TransactionDefinitionNo,
                @BalanceUnit,
                @BankStatementItemId,
                @CommissionActId,
                @ContractNumber,
                @PaymentOrderNumber,
                @TransactionCode2,
                @TransactionTypeId,
                @OfrId,
                @TransactionCode1,
                @Register,
                @SapGlAccountId,
                @CostCenter,
                @TradingPartner,
                @DocumentNo,
                @AAOrderNo,
                @XRef2,
                @PersonalAccountNumber,
                @BusinessLine,
                @CedentsCountry,
                @LocalDimension1,
                @LocalDimension2,
                @LocalDimension3Id,
                @PartyCode,
                @TransactionDocumentTypeId,
                @DateToCheckPrevPeriod,
                @CancelledDocumentNo,
                @CommissionRate
            )";
        }

        /// <summary>
        /// Returns SQL statement to select additional attributes row based on it's Id.
        /// Implementation must override this query if using additional attributes on subledger and balance account entries.
        /// </summary>
        /// <returns></returns>
        public override string Select_AdditionalAttributesById()
        {
            return @"
            select 
                GL_ADDITIONAL_ATTRIBUTE_ID as Id,
                PROPOSED_POST_DATE,
                TRANSACTION_DEFINITION_NO,
                BANK_STATEMENT_ITEM_ID as BankStatementItemId,
                COMMISSION_ACT_ID as CommissionActId,
                CONTRACT_NUMBER as ContractNumber,
                PAYMENT_ORDER_NUMBER as PaymentOrderNumber,
                BALANCE_UNIT as BalanceUnit,
                TRANSACTION_CODE_2 as TransactionCode2,
                TRANSACTION_TYPE_ID as TransactionTypeId,
                OFR_ID as OfrId,
                TRANSACTION_CODE_1 as TransactionCode1,
                REGISTER as Register,
                SAP_GL_ACCOUNT_ID as SapGlAccountId,
                COST_CENTER as CostCenter,
                TRADING_PARTNER as TradingPartner,
                DOCUMENT_NO as DocumentNo,
                AA_ORDER_NO as AAOrderNo,
                XREF2 as XRef2,
                PERSONAL_ACCOUNT_NUMBER as PersonalAccountNumber,
                BUSINESS_LINE as BusinessLine,
                CEDENTS_COUNTRY as CedentsCountry,
                LOCAL_DIMENSION_1 as LocalDimension1,
                LOCAL_DIMENSION_2 as LocalDimension2,
                LOCAL_DIMENSION_3_ID as LocalDimension3Id, 
                PARTY_CODE as PartyCode,
                TRANSACTION_DOCUMENT_TYPE_ID as TransactionDocumentTypeId,
                DATE_TO_CHECK_PREV_PERIOD as DateToCheckPrevPeriod,
                CANCELLED_DOCUMENT_NO as CancelledDocumentNo,
                COMMISSION_RATE as CommissionRate
            from
	            ACC.GL_ADDITIONAL_ATTRIBUTES
            where
                GL_ADDITIONAL_ATTRIBUTE_ID = @attrsId
            ";
        }
    }
}
