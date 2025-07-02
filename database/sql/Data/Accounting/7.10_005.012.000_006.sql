insert into ACC_IMPL.PAYMENT_REFERENCE (bank_statement_item_id, reference_no, order_no)
select
       bank_statement_item_id,
       reference_no,
       0 as order_no
from ACC_IMPL.BANK_STATEMENT_ITEM bsi
where REGISTRY_REFERENCE_ID is not null
and REFERENCE_NO is not null
and not exists(select 1 from ACC_IMPL.PAYMENT_REFERENCE where PAYMENT_REFERENCE.BANK_STATEMENT_ITEM_ID = bsi.BANK_STATEMENT_ITEM_ID)