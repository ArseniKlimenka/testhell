using Adacta.AdInsure.RGSL.Accounting.API.Shared.Constants;

namespace Adacta.AdInsure.RGSL.Accounting.Infrastructure.Commission.Act.Queries
{
    static class CommissionActQueries
    {
        public static string InsertAct()
        {
            return @"
insert into acc_impl.CA_ACT
(
	ACT_NO,
	LAST_UPDATED,
	ISSUE_DATE,
	PAY_DATE,
	ORIGINAL_RECEIPT_DATE,
	ACT_TYPE_ID,
	AGENT_SERVICE_PROVIDER_CODE,
	AGENT_AGREEMENT_NUMBER,
	HISTORICAL_AGENT_AGREEMENT,
	PERIOD_FROM,
	PERIOD_TO,
	REPORTING_PERIOD_FROM,
	REPORTING_PERIOD_TO,
	PREMIUM_AMOUNT_LC,
	COMM_AMOUNT_LC,
	VAT_RATE,
	VAT_AMOUNT_LC,
	ITEMS_COUNT,
	NOTES,
	IS_DOC_CORRECT,
	PRODUCT_GROUP_INCLUDE,
	PRODUCT_GROUP_EXCLUDE
)
values
(
	@ActNo,
	@LastUpdated,
	@IssueDate,
	@PayDate,
	@OriginalReceiptDate,
	@ActTypeId,
	@AgentServiceProviderCode,
	@AgentAgreementNumber,
	@HistoricalAgentAgreement,
	@PeriodFrom,
	@PeriodTo,
	@ReportingPeriodFrom,
	@ReportingPeriodTo,
	@PremiumAmountLc,
	@CommAmountLc,
	@VatRate,
	@VatAmountLc,
	@ItemsCount,
	@Notes,
	@IsDocCorrect,
	@ProductGroupInclude,
	@ProductGroupExclude
)";
        }

        public static string SelectProductFilters()
        {
            return @"
select
    ACT_ID,
    CODE,
    EXCLUSIVE
from
    acc_impl.CA_ACT_PRODUCT_FILTER
where act_id in (@0)";
        }

        public static string SelectVatRate()
        {
            return @"
select top 1 vat.VAT_RATE
from
	pas.AGENT_AGREEMENT aaM
	inner join pas_impl.AA_HUB aah on aah.AA_NUMBER = aaM.AGENT_AGREEMENT_NUMBER
	inner join pas_impl.AA_SAT_LATEST aas on aas.AA_HKEY = aah.AA_HKEY
	inner join pas_impl.AA_VAT_RATE_SAT vat on vat.AA_VAT_RATE_HKEY = aah.AA_HKEY
where 1=1
	and aas.USE_NDS = 1
	and vat.IS_DELETED = 0
	and vat.START_DATE <= @1
	and aaM.AGENT_AGREEMENT_ID = (
		select top 1
			aaA2.AGENT_AGREEMENT_ID
		from
			pas.AGENT_AGREEMENT aaM2
			inner join pas.AGENT_AGREEMENT aaA2 on aaA2.ORIGINAL_DOCUMENT_ID = aaM2.ORIGINAL_DOCUMENT_ID and (aaA2.SEQ_NUMBER = 0 or aaA2.VERSION_STATE = 'Applied')
		where 1=1
			and aaM2.AGENT_AGREEMENT_NUMBER = @0
		order by aaA2.SEQ_NUMBER desc
	)
order by vat.START_DATE desc
";
        }

        public static string InsertProductFilters(string tempTable)
        {
            return $@"
insert into {tempTable}
(
	ACT_ID,
	CODE,
	EXCLUSIVE
)
values
(
	@ActId,
	@Code,
	@Exclusive
)";
        }

        public static string ExecuteUpdateProductFilters(string tempTable)
        {
            return $@"
delete from acc_impl.CA_ACT_PRODUCT_FILTER
from acc_impl.CA_ACT_PRODUCT_FILTER pf
where pf.ACT_ID = @0
and not exists
(
	select * from {tempTable} f
	where f.ACT_ID = @0 and f.CODE = pf.CODE and f.EXCLUSIVE = pf.EXCLUSIVE
);

insert into acc_impl.CA_ACT_PRODUCT_FILTER(ACT_ID, CODE, EXCLUSIVE)
select ACT_ID, CODE, EXCLUSIVE
from {tempTable} f
where not exists
(
	select * from acc_impl.CA_ACT_PRODUCT_FILTER pf
	where pf.ACT_ID = @0 and pf.CODE = f.CODE
);";
        }

        public static string InsertActItem()
        {
            return @"
insert into acc_impl.CA_ACT_ITEM
(
	ACT_ITEM_ID,
	ACT_ID,
	STATUS_ID,
	REFERENCE_NO,
	SOURCE_LINE_ID,
	DOC_CURRENCY_CODE,
	PAYMENT_TRANSACTION_DATE,
	DUE_DATE,
	BANK_STATEMENT_ITEM_ID,
	INSTALLMENT_DOC_AMOUNT,
	INSTALLMENT_LC_AMOUNT,
	PAYMENT_DOC_AMOUNT,
	PAYMENT_LC_AMOUNT,
	INV_COMM_FINAL_RATE,
	INV_COMM_DOC_AMOUNT,
	INV_COMM_LC_AMOUNT,
	AA_COMM_RATE,
	DOC_COMM_RATE,
	COMM_RATE_MANUAL,
	COMM_RATE_FINAL,
	AA_EXPENSES_RATE,
	AA_NATURAL_PERSON_RATE,
	AA_SOLE_PROPRIATOR_RATE,
	DOC_EXPENSES_RATE,
	DOC_NATURAL_PERSON_RATE,
	DOC_SOLE_PROPRIATOR_RATE,
	EXPENSES_RATE_FINAL,
	NATURAL_PERSON_RATE_FINAL,
	SOLE_PROPRIATOR_RATE_FINAL,
	EXPENSES_AMOUNT,
	NATURAL_PERSON_AMOUNT,
	SOLE_PROPRIATOR_AMOUNT,
	LC_COMM_AMOUNT_CALC,
	LC_COMM_AMOUNT_EXTRA,
	LC_COMM_AMOUNT_FINAL,
	LC_VAT_AMOUNT,
	IS_TECHNICAL,
	NOTES,
	COMM_RATE_CALC
)
values
(
	@ActItemId,
	@ActId,
	@StatusId,
	@ReferenceNo,
	@SourceLineId,
	@DocCurrencyCode,
	@PaymentTransactionDate,
	@DueDate,
	@BankStatementItemId,
	@InstallmentDocAmount,
	@InstallmentLcAmount,
	@PaymentDocAmount,
	@PaymentLcAmount,
	@InvCommFinalRate,
	@InvCommDocAmount,
	@InvCommLcAmount,
	@AaCommRate,
	@DocCommRate,
	@CommRateManual,
	@CommRateFinal,
	@AaExpensesRate,
	@AaNaturalPersonRate,
	@AaSolePropriatorRate,
	@DocExpensesRate,
	@DocNaturalPersonRate,
	@DocSolePropriatorRate,
	@ExpensesRateFinal,
	@NaturalPersonRateFinal,
	@SolePropriatorRateFinal,
	@ExpensesAmount,
	@NaturalPersonAmount,
	@SolePropriatorAmount,
	@LcCommAmountCalc,
	@LcCommAmountExtra,
	@LcCommAmountFinal,
	@LcVatAmount,
	@IsTechnical,
	@Notes,
	@CommRateCalc
)";
        }

        public static string InsertActItemPc()
        {
            return @"insert into acc_impl.ca_act_item_pc
(
	ACT_ID,
	ACT_ITEM_ID,
	PAYABLE_COMMISSION_ID,
	CANCELLED
)
values
(
	@ActId,
	@ActItemId,
	@PayableCommissionId,
	@Cancelled
)";
        }

        public static string DeleteItemsAndItemPcs()
        {
            return @"
delete from acc_impl.CA_ACT_ITEM_PC
where ACT_ITEM_ID in
(
	select ACT_ITEM_ID from acc_impl.CA_ACT_ITEM where /**where**/
);
delete from acc_impl.CA_ACT_ITEM where /**where**/;
";
        }

        public static string Delete_UnleashPcFromAct()
        {
            return @"delete from acc_impl.CA_ACT_ITEM_PC where ACT_ID = @0";
        }

        public static string Update_CancelActItems()
        {
            return @"update acc_impl.CA_ACT_ITEM_PC set CANCELLED = 1 where /**where**/";
        }

        public static string UpdateAct()
        {
            return @"
update acc_impl.CA_ACT
set
	LAST_UPDATED = GETUTCDATE(),
	ACT_TYPE_ID = @ActTypeId,
	ISSUE_DATE = @IssueDate,
	PAY_DATE = @PayDate,
	ORIGINAL_RECEIPT_DATE = @OriginalReceiptDate,
	AGENT_SERVICE_PROVIDER_CODE = @AgentServiceProviderCode,
	AGENT_AGREEMENT_NUMBER = @AgentAgreementNumber,
	HISTORICAL_AGENT_AGREEMENT = @HistoricalAgentAgreement,
	PERIOD_FROM = @PeriodFrom,
	PERIOD_TO = @PeriodTo,
	REPORTING_PERIOD_FROM = @ReportingPeriodFrom,
	REPORTING_PERIOD_TO = @ReportingPeriodTo,
	NOTES = @Notes,
	IS_DOC_CORRECT = @IsDocCorrect,
	PRODUCT_GROUP_INCLUDE = @ProductGroupInclude,
	PRODUCT_GROUP_EXCLUDE = @ProductGroupExclude
where ACT_ID = @ActId";
        }

        public static string UpdateItemCommRate()
        {
            return @"
update acc_impl.CA_ACT_ITEM
set
	COMM_RATE_MANUAL = @CommRateManual,
	COMM_RATE_FINAL = @CommRateFinal,
	LC_COMM_AMOUNT_MANUAL = @LcCommAmountManual,
	LC_COMM_AMOUNT_FINAL = @LcCommAmountFinal,
	LC_VAT_AMOUNT = @LcVatAmount
where ACT_ITEM_ID = @ActItemId
;";
        }

        public static string SelectAct()
        {
            return @"
select
	act.ACT_ID,
	act.ACT_NO,
	act.LAST_UPDATED,
	act.ISSUE_DATE,
	act.PAY_DATE,
	act.ORIGINAL_RECEIPT_DATE,
	ps.CODE_NAME as STATE_CODE,
	act.AGENT_SERVICE_PROVIDER_CODE,
	act.AGENT_AGREEMENT_NUMBER,
	act.PERIOD_FROM,
	act.PERIOD_TO,
	act.REPORTING_PERIOD_FROM,
	act.REPORTING_PERIOD_TO,
	act.PREMIUM_AMOUNT_LC,
	act.COMM_AMOUNT_LC,
	act.VAT_RATE,
	act.VAT_AMOUNT_LC,
	act.ITEMS_COUNT,
	act.NOTES,
	act.IS_DOC_CORRECT,
	act.PRODUCT_GROUP_INCLUDE,
	act.PRODUCT_GROUP_EXCLUDE
from
	acc_impl.CA_ACT act
	inner join bfx.UNIVERSAL_DOCUMENT ud on ud.UNIVERSAL_DOCUMENT_NUMBER = act.ACT_NO
	inner join cfx.PUBLISHED_ARTIFACT pa on pa.PUBLISHED_ARTIFACT_ID = ud.PUBLISHED_ARTIFACT_ID and pa.CODE_NAME = 'CommissionAct'
	inner join cfg.PROCESS_STATE ps on ps.PROCESS_STATE_ID = ud.STATE_ID
where 1=1
	and /**where**/
";
        }

        public static string SelectActItems()
        {
            return @"
select
	ACT_ITEM_ID,
	ACT_ID,
	STATUS_ID,
	REFERENCE_NO,
	DOC_CURRENCY_CODE,
	SOURCE_LINE_ID,
	PAYMENT_TRANSACTION_DATE,
	DUE_DATE,
	BANK_STATEMENT_ITEM_ID,
	INSTALLMENT_DOC_AMOUNT,
	INSTALLMENT_LC_AMOUNT,
	PAYMENT_DOC_AMOUNT,
	PAYMENT_LC_AMOUNT,
	INV_COMM_FINAL_RATE,
	INV_COMM_DOC_AMOUNT,
	INV_COMM_LC_AMOUNT,
	AA_COMM_RATE,
	DOC_COMM_RATE,
	COMM_RATE_MANUAL,
	COMM_RATE_FINAL,
	AA_EXPENSES_RATE,
	AA_NATURAL_PERSON_RATE,
	AA_SOLE_PROPRIATOR_RATE,
	DOC_EXPENSES_RATE,
	DOC_NATURAL_PERSON_RATE,
	DOC_SOLE_PROPRIATOR_RATE,
	EXPENSES_RATE_FINAL,
	NATURAL_PERSON_RATE_FINAL,
	SOLE_PROPRIATOR_RATE_FINAL,
	EXPENSES_AMOUNT,
	NATURAL_PERSON_AMOUNT,
	SOLE_PROPRIATOR_AMOUNT,
	LC_COMM_AMOUNT_CALC,
	LC_COMM_AMOUNT_EXTRA,
	LC_COMM_AMOUNT_MANUAL,
	LC_COMM_AMOUNT_FINAL,
	LC_VAT_AMOUNT,
	IS_TECHNICAL,
	NOTES
from
	ACC_IMPL.CA_ACT_ITEM
where 1=1
	and ACT_ID = @actId
	and /**where**/
order by act_item_id
";
        }

        public static string SelectAutoPopulation(bool checkAttachments)
        {
            return @"
create table #AA_HKEYS
(
    AA_HKEY char(32)
);

create table #PC_OUT_DATA
(
	PAYABLE_COMMISSION_ID bigint,
	CANCELLED_PC_ID bigint,
	DOCUMENT_NO nvarchar(64),
	DOC_CURRENCY_CODE nvarchar(3),
	BANK_STATEMENT_ITEM_ID bigint,
	PAYMENT_TRANSACTION_DATE date,
	INSTALLMENT_DUE_DATE date,
	SOURCE_LINE_ID nvarchar(50),
	MATCHING_DOC_AMOUNT decimal(15,2),
	DOC_COMM_RATE decimal(15,6),
	DOC_EXPENSES_RATE decimal(15,6),
	DOC_NP_RATE decimal(15,6),
	DOC_SP_RATE decimal(15,6),
	ISSUE_FORM_CODE nvarchar(20),
	INITIATOR_IS_DBO bit,
	PRODUCT_GROUP nvarchar(255),
	IS_TECHNICAL bit
);

create table #MANUAL_PC_VALUE
(
	PAYABLE_COMMISSION_ID bigint,
	MANUAL_COMM_RATE decimal(15,6),
);
" + (checkAttachments ? @"
create table #ATTACHMENTS_VERIFICATIONS
(
	DOCUMENT_NO nvarchar(64),
	NOT_ISSUED int
);
" : string.Empty) + @"
insert into #AA_HKEYS
select aaHub.AA_HKEY
from
	pas.AGENT_AGREEMENT aa
	inner join pas.AGENT_AGREEMENT aaAm on aaAm.ORIGINAL_DOCUMENT_ID = aa.ORIGINAL_DOCUMENT_ID
	inner join pas_impl.AA_HUB aaHub on aaHub.AA_NUMBER = aaAm.AGENT_AGREEMENT_NUMBER
where 1=1
	and /**where(aa)**/;

insert into #PC_OUT_DATA
select
	pc.PAYABLE_COMMISSION_ID,
	pc.CANCELLED_PC_ID,
	alc.DOCUMENT_NO,
	alc.DOC_CURRENCY_CODE,
	bsi.BANK_STATEMENT_ITEM_ID,
	bsi.TRANSACTION_DATE as PAYMENT_TRANSACTION_DATE,
	alcp.DUE_DATE as INSTALLMENT_DUE_DATE,
	matp.SOURCE_LINE_ID,
	pc.DOC_BASE_AMOUNT as MATCHING_DOC_AMOUNT,
	pCommSatl.MANUAL_RATE as DOC_COMM_RATE,
	pCommSatl.MANUAL_EXPENSES_RATE as DOC_EXPENSES_RATE,
	pCommSatl.MANUAL_NP_RATE as DOC_NP_RATE,
	pCommSatl.MANUAL_SP_RATE as DOC_SP_RATE,
	polsl.ISSUE_FORM_CODE,
	polsl.INITIATOR_IS_DBO,
	prod.PRODUCT_GROUP,
	aas.IS_TECHNICAL
from
	acc_impl.PAYABLE_COMMISSION pc
	inner join pas_impl.POLICY_COMMISSION_SAT_LATEST pCommSatl on
		pCommSatl.POLICY_COMMISSION_HKEY = pc.POLICY_COMMISSION_HKEY
		and pCommSatl.OBJECT_CODE = pc.OBJECT_CODE
		and pCommSatl.ITEM_CODE = pc.ITEM_CODE
		and pCommSatl.PERIOD_NUMBER = pc.PERIOD_NUMBER
	inner join pas_impl.POLICY_COMMISSION_LINK pCommLink on pCommLink.POLICY_COMMISSION_HKEY = pCommSatl.POLICY_COMMISSION_HKEY
	inner join pas_impl.AA_SAT_LATEST aas on aas.AA_HKEY = pCommLink.AA_HKEY
	inner join org_impl.SERVICE_PROVIDER_HUB agentServPrv on agentServPrv.SERVICE_PROVIDER_HKEY = pCommLink.SERVICE_PROVIDER_HKEY
	inner join acc_impl.MATCHING mat on mat.MATCHING_ID = pc.MATCHING_ID
	inner join acc_impl.MATCHING_POLICY matp on matp.MATCHING_ID = mat.MATCHING_ID
	inner join acc_impl.ALLOCATION alc on alc.ALLOCATION_ID = mat.ALLOCATION_ID
	inner join acc_impl.ALLOCATION_POLICY alcp on alcp.ALLOCATION_ID = alc.ALLOCATION_ID
	inner join acc_impl.BANK_STATEMENT_ITEM bsi on bsi.BANK_STATEMENT_ITEM_ID = alc.BANK_STATEMENT_ITEM_ID
	inner join pas_impl.POLICY_HUB polh on polh.CONTRACT_NUMBER = alc.DOCUMENT_NO
	inner join pas_impl.POLICY_SAT_LATEST polsl on polsl.POLICY_HKEY = polh.POLICY_HKEY
	inner join bfx_impl.PRODUCTS prod on prod.CODE = polsl.product_code
where 1=1
	and /**where(pc)**/
	and pCommLink.AA_HKEY in (select * from #AA_HKEYS)
	and pc.IS_MIGRATED = 0
	and not exists (select * from acc_impl.CA_ACT_ITEM_PC incPc where incPc.PAYABLE_COMMISSION_ID = pc.PAYABLE_COMMISSION_ID and incPc.CANCELLED = 0)
	and not exists (
		select *
		from
			acc_impl.CA_ACT_ITEM_PC incPc
		where 1=1
			and incPc.act_id = @0
			and incPc.PAYABLE_COMMISSION_ID = pc.PAYABLE_COMMISSION_ID
			and incPc.CANCELLED = 1
	);

insert into #MANUAL_PC_VALUE
select
	pcod.PAYABLE_COMMISSION_ID,
	min(cai.COMM_RATE_MANUAL) as MANUAL_COMM_RATE
from
	acc_impl.CA_ACT_ITEM_PC caipc
	join acc_impl.CA_ACT_ITEM cai on cai.ACT_ITEM_ID = caipc.ACT_ITEM_ID
	join #PC_OUT_DATA pcod on pcod.CANCELLED_PC_ID = caipc.PAYABLE_COMMISSION_ID
where caipc.CANCELLED = 0
group by pcod.PAYABLE_COMMISSION_ID
having count(distinct cai.COMM_RATE_MANUAL) = 1 and min(cai.COMM_RATE_MANUAL) is not null;
" + (checkAttachments ? @"
insert into #ATTACHMENTS_VERIFICATIONS
select
	pcod.DOCUMENT_NO,
	count(vs.STATE) - sum(case vs.STATE when 'Issued' then 1 else 0 end) NOT_ISSUED
from
	pas_impl.VERIFICATION_HUB vh
	join PAS_IMPL.VERIFICATION_SAT_LATEST vs on vs.VERIFICATION_HKEY = vh.VERIFICATION_HKEY
	join PAS_IMPL.POLICY_VERIFICATION_LINK pvl on pvl.VERIFICATION_HKEY = vh.VERIFICATION_HKEY
	join PAS_IMPL.POLICY_HUB ph on ph.POLICY_HKEY = pvl.POLICY_HKEY
	join #PC_OUT_DATA pcod on pcod.DOCUMENT_NO = ph.CONTRACT_NUMBER
where 1=1
	and (pcod.ISSUE_FORM_CODE != 'offer' and pcod.INITIATOR_IS_DBO = 0 and pcod.PRODUCT_GROUP not in ('credit', 'risk'))
group by pcod.DOCUMENT_NO
union all
select distinct
	pcod.DOCUMENT_NO,
	0 NOT_ISSUED
from #PC_OUT_DATA pcod
where 1=1
	and (pcod.ISSUE_FORM_CODE = 'offer' or pcod.INITIATOR_IS_DBO = 1 or pcod.PRODUCT_GROUP in ('credit', 'risk'));
" : string.Empty) + @"
select
	od.*,
	mv.MANUAL_COMM_RATE
from
	#PC_OUT_DATA od
	left join #MANUAL_PC_VALUE mv on mv.PAYABLE_COMMISSION_ID = od.PAYABLE_COMMISSION_ID
	" + (checkAttachments ? "inner join #ATTACHMENTS_VERIFICATIONS av on av.DOCUMENT_NO = od.DOCUMENT_NO and av.NOT_ISSUED = 0" : string.Empty) + @"
	;

drop table #AA_HKEYS;

drop table #PC_OUT_DATA;

drop table #MANUAL_PC_VALUE;

" + (checkAttachments ? "drop table #ATTACHMENTS_VERIFICATIONS;" : string.Empty);
        }

        public static string SelectInstallmentAmounts(string tempTable)
        {
            return $@"
select
	ph.CONTRACT_NUMBER as REFERENCE_NO,
	ppl.DUE_DATE,
	ppsl.ITEM_NO as SOURCE_LINE_ID,
	ppsl.AMOUNT as INSTALLMENT_AMOUNT
from
	pas_impl.POLICY_HUB ph
	inner join pas_impl.P_PAYMENT_PLAN_LINK ppl on ppl.POLICY_HKEY = ph.POLICY_HKEY
	inner join pas_impl.P_PAYMENT_PLAN_SAT_LATEST ppsl on ppsl.P_PAYMENT_PLAN_HKEY = ppl.P_PAYMENT_PLAN_HKEY
where 1=1
	and exists (select * from {tempTable} f where f.REFERENCE_NO = ph.CONTRACT_NUMBER and ppl.DUE_DATE = f.DUE_DATE)
";
        }

        public static string MigrateActHistory()
        {
            return $@"
declare @@actNumber nvarchar(max) = @0;
declare @@actId nvarchar(max);
declare @@entityId nvarchar(max);

select @@actId = ACT_ID from acc_impl.CA_ACT where ACT_NO = @@actNumber
select @@entityId = UNIVERSAL_DOCUMENT_ID from bfx.UNIVERSAL_DOCUMENT where UNIVERSAL_DOCUMENT_NUMBER = @@actNumber;

delete from bfx.ENTITY_HISTORY where ENTITY_ID = @@entityId;

insert into bfx.ENTITY_HISTORY (ENTITY_HISTORY_ID, ENTITY_TYPE_ID, [ENTITY_ID], HISTORY_VERSION, CHANGED_BY, CHANGE_CAUSED_BY, CHANGED_ON, STATE_CHANGED, NUMBER_CHANGED, OWNERSHIP_CHANGED, OWNER_USERNAME, ORGANISATION_UNIT_CODE, BUSINESS_ID, TRANSITION, OLD_STATE, NEW_STATE)
select
	NEWID() as ENTITY_HISTORY_ID,
	(select ENTITY_TYPE_ID from cfg.ENTITY_TYPE where CODE_NAME = N'UniversalDocument') as ENTITY_TYPE_ID,
	@@entityId as [ENTITY_ID],
	ROW_NUMBER() OVER (PARTITION BY ACT_ID order by ACT_HISTORY_ID) as HISTORY_VERSION,
	[USER_ID] as CHANGED_BY,
	[USER_ID] as CHANGE_CAUSED_BY,
	CREATE_DATE as CHANGED_ON,
	1 as STATE_CHANGED,
	case when STATUS_ID_FROM = 0 then 1 else 0 end as NUMBER_CHANGED,
	0 as OWNERSHIP_CHANGED,
	null as OWNER_USERNAME,
	null as ORGANISATION_UNIT_CODE,
	@@actNumber as BUSINESS_ID,
	case
		when STATUS_ID_FROM = 0 and STATUS_ID_TO = 1 then '$Create'
		when STATUS_ID_FROM = 1 and STATUS_ID_TO = 3 then 'Draft_To_Confirming'
		when STATUS_ID_FROM = 1 and STATUS_ID_TO = 2 then 'Draft_To_Deleted'
		when STATUS_ID_FROM = 3 and STATUS_ID_TO = 4 then 'Confirming_To_Confirmed'
		when STATUS_ID_FROM = 3 and STATUS_ID_TO = 1 then 'Confirming_To_Draft'
		when STATUS_ID_FROM = 4 and STATUS_ID_TO = 5 then 'Confirmed_To_Approved'
		when STATUS_ID_FROM = 5 and STATUS_ID_TO = 6 then 'Approved_To_CompletedPayOrder'
		when STATUS_ID_FROM = 5 and STATUS_ID_TO = 7 then 'Approved_To_CompletedPaid'
	end TRANSITION,
	case
		when STATUS_ID_FROM = 1 then 'Draft'
		when STATUS_ID_FROM = 2 then 'Deleted'
		when STATUS_ID_FROM = 3 then 'Confirming'
		when STATUS_ID_FROM = 4 then 'Confirmed'
		when STATUS_ID_FROM = 5 then 'Approved'
		when STATUS_ID_FROM = 6 then 'CompletedPayOrder'
		when STATUS_ID_FROM = 7 then 'CompletedPaid'
		when STATUS_ID_FROM = 8 then 'Annulled'
		when STATUS_ID_FROM = 9 then 'Generating'
	end OLD_STATE,
	case
		when STATUS_ID_TO = 1 then 'Draft'
		when STATUS_ID_TO = 2 then 'Deleted'
		when STATUS_ID_TO = 3 then 'Confirming'
		when STATUS_ID_TO = 4 then 'Confirmed'
		when STATUS_ID_TO = 5 then 'Approved'
		when STATUS_ID_TO = 6 then 'CompletedPayOrder'
		when STATUS_ID_TO = 7 then 'CompletedPaid'
		when STATUS_ID_TO = 8 then 'Annulled'
		when STATUS_ID_TO = 9 then 'Generating'
	end NEW_STATE
from acc_impl.CA_ACT_HISTORY where ACT_ID = @@actId;
";
        }

        public static string UpdateActHeader()
        {
            return $@"
update acc_impl.CA_ACT
set
	LAST_UPDATED = GETUTCDATE(),
	PREMIUM_AMOUNT_LC = isnull(items.PREMIUM_AMOUNT_LC, 0),
	COMM_AMOUNT_LC = isnull(items.COMM_AMOUNT_LC, 0),
	VAT_AMOUNT_LC = isnull(items.VAT_AMOUNT_LC, 0),
	ITEMS_COUNT = isnull(items.ITEMS_COUNT, 0)
from (
	select
		count(case when (LC_COMM_AMOUNT_CALC != 0 or LC_COMM_AMOUNT_EXTRA != 0 or IS_TECHNICAL = 1) then ai.ACT_ITEM_ID end) as ITEMS_COUNT,
		sum(ai.LC_VAT_AMOUNT) as VAT_AMOUNT_LC,
		sum(ai.LC_COMM_AMOUNT_FINAL) as COMM_AMOUNT_LC,
		sum(ai.PAYMENT_LC_AMOUNT) as PREMIUM_AMOUNT_LC
	from acc_impl.CA_ACT_ITEM ai
		inner join acc_impl.CA_ACT act on act.ACT_ID = ai.ACT_ID
	where 1=1
		and ai.STATUS_ID != {(int) CommissionActItemStatusId.Annulled}
		and ai.ACT_ID = @0
) items
where ACT_ID = @0";
        }

        public static string UpdateActItemJson()
        {
			return "update acc_impl.CA_ACT_ITEM set JSON_DATA = @1 where ACT_ITEM_ID = @0";
        }
    }
}
