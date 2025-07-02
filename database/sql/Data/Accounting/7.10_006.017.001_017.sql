update acc.CT_GL_POSTING_SCHEME set JOURNAL_TYPE_ID = 3, SCHEME_NAME = 'Policy cancellation - CreditRepayment' where JOURNAL_TYPE_ID = 16 and POSTING_SCHEME_ID = 60;

insert INTO acc.CT_GL_ACCOUNT_TYPE (GL_ACCOUNT_TYPE_ID,DESCRIPTION, IS_DEBIT, ATTRIBUTE_SET_ID, FROM_PAYMENT)
values (1009,'Revenue decrease',1,2,0);

update acc.GL_ACCOUNT set GL_ACCOUNT_TYPE_ID = 1009 where GL_ACCOUNT_NO = '71402';
update acc.GL_ACCOUNT set GL_ACCOUNT_TYPE_ID = 1009 where GL_ACCOUNT_NO = '71404';

INSERT INTO ACC.GL_POSTING_PROFILE(GL_ACCOUNT_TYPE_ID, ATTRIBUTE_VALUE_SET_ID, GL_ACCOUNT_ID, ATTRIBUTE_SET_ID, PREVIOUS_PERIOD, BA_ACCOUNT_TYPE_ID, PAYMENT_DOCUMENT_TYPE_ID, ANALYTICS_ATTRIBUTE_SET_ID, VALIDITY_START, VALIDITY_END, INVOICE_DOCUMENT_TYPE_ID)
VALUES (1009, (select attribute_value_set_id from acc.attribute_value_set where AVS_PURPOSE_ID=3 and IS_LIFE=1), (select gl_account_id from acc.gl_account where gl_account_no='71402'), 6, NULL, null, null, null, '19000101', '99991231', null),
       (1009, (select attribute_value_set_id from acc.attribute_value_set where AVS_PURPOSE_ID=3 and IS_LIFE=0), (select gl_account_id from acc.gl_account where gl_account_no='71404'), 6, NULL, null, null, null, '19000101', '99991231', null);

update acc.GL_POSTING_SCHEME set GL_ACCOUNT_TYPE_ID = 1009 where GL_ACCOUNT_TYPE_ID = 1007 and POSTING_SCHEME_ID = 60 and SEQ_NUMBER = 1;

insert into ACC_IMPL.OFR_RULE (GL_ACCOUNT_ID, PREVIOUS_PERIOD, DOCUMENT_TYPE_ID, OFR_ID)
    values ((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71402'), 0, null, (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '21105')),
           ((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71402'), 1, null, (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '21107'));


update acc_impl.SAP_GL_ACCOUNT_RULE set PREVIOUS_PERIOD = 0 where PREVIOUS_PERIOD is null
                                                             and SAP_GL_ACCOUNT_ID = (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3110002010')
                                                             and OFR_ID = (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '21107')
                                                             and GL_ACCOUNT_ID = (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71402');

update acc_impl.SAP_GL_ACCOUNT_RULE set PREVIOUS_PERIOD = 1 where PREVIOUS_PERIOD is null
                                                             and SAP_GL_ACCOUNT_ID = (select SAP_GL_ACCOUNT_ID from ACC_IMPL.SAP_GL_ACCOUNT where SAP_GL_ACCOUNT_NO = '3110002220')
                                                             and OFR_ID = (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '21107')
                                                             and GL_ACCOUNT_ID = (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71402');
