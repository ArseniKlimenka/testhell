namespace Adacta.AdInsure.RGSL.Accounting.Infrastructure.CashFlow.PaymentOrder.Queries
{
    public static class PaymentOrderQueriesRGSL
    {
        public static string GetDocumentsForNetting()
        {
            return @"SELECT d.PAYMENT_ORDER_NUMBER as PaymentOrderNo,
			r.DOCUMENT_NUMBER as DocumentNo,
			r.DOCUMENT_CURRENCY as DocumentCurrency,
			r.INITIAL_OPEN_AMOUNT as InitialOpenAmount,	    
			r.EXCHANGE_RATE as ExchangeRate,
			r.NETTED_AMOUNT as NettedAmount,
			r.NETTED_AMOUNT_DOC_CUR as NettedAmountInDocCurrency,
			r.BANK_STATEMENT_ID as BankStatementId,
			r.IS_FUTURE_CONTRACT as IsFutureContract,
			JSON_VALUE(d.BODY, '$.paymentOrderAmounts.paymentCurrencyCode') as PaymentCurrency,
			JSON_VALUE(d.BODY, '$.paymentOrderInformation.paymentOrderDate') as PaymentOrderDate,
			JSON_VALUE(d.BODY, '$.paymentOrderInformation.payerBankAccountNumber') as PayerBankAccountNo,
			JSON_VALUE(d.BODY, '$.recipientInformation.partyFullName') as RecipientFullName
			FROM
			(SELECT po.PAYMENT_ORDER_NUMBER,
					 po.BODY,
					 po.COMMON_BODY
			 FROM ACC.PAYMENT_ORDER po
			 WHERE /**where**/) d
			 CROSS APPLY OPENJSON(d.BODY,'$.paymentOrderNetting.nettedDocuments')
			 with  
			 (    
				 DOCUMENT_NUMBER NVARCHAR(50) N'lax $.documentNumber',
				 INITIAL_OPEN_AMOUNT DECIMAL(15,2) N'lax $.initialOpenAmount',
				 DOCUMENT_CURRENCY NVARCHAR(50) N'lax $.documentCurrency',
				 EXCHANGE_RATE DECIMAL(15,7) N'lax $.exchangeRate',
				 NETTED_AMOUNT DECIMAL(15,2) N'lax $.nettedAmount',
				 NETTED_AMOUNT_DOC_CUR DECIMAL(15,2) N'lax $.nettedAmountInDocCurrency',
				 BANK_STATEMENT_ID INT N'lax $.currentBankStatementId',
				 IS_FUTURE_CONTRACT BIT N'lax $.isFutureContract'
			 ) r";
        }

        public static string GetPaymentOrderInfo()
        {
            return @"
select
	poh.PAYMENT_ORDER_NUMBER,
	pos.PAYMENT_ORDER_TYPE,
	pos.PAYMENT_ORDER_SUBTYPE,
	pos.REFERENCE_NUMBER,
	pos.CONTRACT_NUMBER,
	pos.PAYMENT_ORDER_DATE,
	ph.PARTY_CODE as RECIPIENT_PARTY_CODE,
	pos.PO_CURRENCY_CODE as PAYMENT_ORDER_CURRENCY_CODE,
	ias.ACT_NUMBER as INSURANCE_ACT_NUMBER,
	pos.CONTRACT_AMENDMENT_NUMBER,
	asat.AMENDMENT_TYPE,
	asat.AMENDMENT_REASON,
	asat.ISSUE_DATE as AMENDMENT_ISSUE_DATE,
	rpr.RISK_CODE as MAIN_RISK_CODE
from
	ACC_IMPL.PAYMENT_ORDER_HUB poh
	inner join ACC_IMPL.PAYMENT_ORDER_SAT_LATEST pos on poh.PAYMENT_ORDER_HKEY = pos.PAYMENT_ORDER_HKEY
	inner join ACC_IMPL.PO_RECIPIENT_LINK rl on pos.PAYMENT_ORDER_HKEY = rl.PAYMENT_ORDER_HKEY
	inner join PTY_IMPL.PARTY_HUB ph on rl.PARTY_HKEY = ph.PARTY_HKEY
	left join ACC_IMPL.PO_INSURANCE_ACT_SAT_LATEST ias on poh.PAYMENT_ORDER_HKEY = ias.PO_INSURANCE_ACT_HKEY
	left join PAS_IMPL.AMENDMENT_HUB ah on ah.AMENDMENT_NUMBER = pos.CONTRACT_AMENDMENT_NUMBER
	left join PAS_IMPL.AMENDMENT_SAT_LATEST asat on ah.AMENDMENT_HKEY = asat.AMENDMENT_HKEY
	left join PAS_IMPL.POLICY_HUB polh on polh.CONTRACT_NUMBER = pos.CONTRACT_NUMBER
	left join pas_impl.POLICY_SAT_LATEST ps on ps.POLICY_HKEY = polh.POLICY_HKEY
	left join bfx_impl.RISK_PRODUCT_RELATION rpr on rpr.PRODUCT_CODE = ps.PRODUCT_CODE and rpr.RISK_ORDER = 1
where poh.PAYMENT_ORDER_NUMBER = @paymentOrderNumber 
			";
        }

        public static string GetPaymentOrderItemInfo()
        {
            return @"
select
	pois.ITEM_TYPE,
	PO_CURRENCY_AMOUNT,
	PAYMENT_CURRENCY_AMOUNT
from
	ACC_IMPL.PAYMENT_ORDER_HUB poh
	inner join ACC_IMPL.PAYMENT_ORDER_ITEM_SAT pois on pois.PAYMENT_ORDER_ITEM_HKEY = poh.PAYMENT_ORDER_HKEY
where poh.PAYMENT_ORDER_NUMBER = @paymentOrderNumber
order by pois.ITEM_TYPE, PO_CURRENCY_AMOUNT
			";
        }

        public static string GetPaymentOrderAndRisksInfoByBankStatementId()
        {
            return @"
select
	pos.PAYMENT_ORDER_TYPE,
	pos.PAYMENT_ORDER_SUBTYPE,
	r.CODE,
	r.RISKS_GROUP
from ACC_IMPL.BANK_STATEMENT_ITEM bsi
join ACC_IMPL.ALLOCATION a ON a.BANK_STATEMENT_ITEM_ID = bsi.BANK_STATEMENT_ITEM_ID
join ACC.PAYMENT_ORDER po ON po.PAYMENT_ORDER_NUMBER = a.DOCUMENT_NO
join ACC_IMPL.PAYMENT_ORDER_HUB poh ON poh.PAYMENT_ORDER_NUMBER = po.PAYMENT_ORDER_NUMBER
join ACC_IMPL.PAYMENT_ORDER_SAT_LATEST pos on poh.PAYMENT_ORDER_HKEY = pos.PAYMENT_ORDER_HKEY
left join CLM.CLAIM c ON c.CLAIM_NUMBER = pos.REFERENCE_NUMBER
left join CLM_IMPL.CLM_HUB clh ON clh.CLAIM_NUMBER = c.CLAIM_NUMBER
left join CLM_IMPL.CLM_RISK_SAT_LATEST clrs ON clrs.CLM_RISK_HKEY = clh.CLM_HKEY
left join BFX_IMPL.RISKS r ON r.CODE = clrs.CODE
where bsi.BANK_STATEMENT_ITEM_ID = @bankStatementItemId
			";
        }
    }
}