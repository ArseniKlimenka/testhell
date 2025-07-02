create table ACC_IMPL.TRANSACTION_DEFINITION
(
    TRANSACTION_DEFINITION_NO [nvarchar](10) primary key,
    GL_ACCOUNT_ID_DT [bigint] not null references ACC.GL_ACCOUNT(GL_ACCOUNT_ID),
    GL_ACCOUNT_ID_CT [bigint] not null references ACC.GL_ACCOUNT(GL_ACCOUNT_ID),
    OFR_ID_DT [int] null references ACC_IMPL.CT_OFR(OFR_ID),
    OFR_ID_CT [int] null references ACC_IMPL.CT_OFR(OFR_ID),
    DOCUMENT_TYPE_ID [int] null references ACC.CT_DOCUMENT_TYPE(DOCUMENT_TYPE_ID),

    DESCRIPTION [nvarchar](250) null,
    BELEGTC [nvarchar](2) null,
    BELEGSC_ALGL_2 [nvarchar](5) null,
    BELEGSC_ALGL_3 [nvarchar](5) null,
    BUCHUGC [nvarchar](2) null,
    VORGAST_ALGL_2 [nvarchar] (3) null,
    VORGAST_ALGL_3 [nvarchar] (3) null
);

ALTER TABLE ACC_IMPL.TRANSACTION_DEFINITION ADD CONSTRAINT TRANSACTION_DEFINITION_UNIQUE_RULE UNIQUE (GL_ACCOUNT_ID_DT, GL_ACCOUNT_ID_CT, OFR_ID_DT, OFR_ID_CT, DOCUMENT_TYPE_ID);

INSERT INTO ACC_IMPL.TRANSACTION_DEFINITION (TRANSACTION_DEFINITION_NO, GL_ACCOUNT_ID_DT, OFR_ID_DT, GL_ACCOUNT_ID_CT, OFR_ID_CT, DOCUMENT_TYPE_ID, BELEGTC, BELEGSC_ALGL_2, BELEGSC_ALGL_3, BUCHUGC, VORGAST_ALGL_2, VORGAST_ALGL_3)
VALUES
('1.1.1', (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48001'),	null,	                                                        (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71401'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '11101'),   null, '01', '01010', '01001', '10', '13', '13'),
('1.1.2', (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48001'),	null,	                                                        (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71401'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '11105'),   null, '01', '01012', '01001', '10', '13', '13'),
('1.2.1', (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48003'),	null,	                                                        (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71403'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '12101'),   null, '01', '01010', '01001', '10', '14', '14'),
('1.2.2', (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48003'),	null,	                                                        (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71403'), (select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '12105'),   null, '01', '01012', '01001', '10', '14', '14'),
('2.1.1', (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71412'),	(select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '26101'),	(select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48022'), null, 		                                                   1002, '03', '03011', '03001', '20', '13', '13'),
('2.1.2', (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71412'),	(select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '26109'),	(select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48022'), null, 		                                                   1002, '03', '03011', '03001', '20', '13', '13'),
('2.2.1', (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71414'),	(select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '27101'),	(select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48022'), null, 		                                                   1002, '03', '03011', '03001', '20', '14', '14'),
('2.2.2', (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71414'),	(select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '27109'),	(select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48022'), null, 		                                                   1002, '03', '03011', '03001', '20', '14', '14'),
('3.1.0', (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '47416'),	null, 	                                                        (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48029'), null, 		                                                   null, '09', '09700', '09700', '50', null, null),
('3.3.1', (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48029'),	null, 	                                                        (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48001'), null, 		                                                   null, '09', '09705', '09705', '10', null, null),
('3.4.1', (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48029'),	null, 	                                                        (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48003'), null, 		                                                   null, '09', '09705', '09705', '10', null, null),
('4.1.1', (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71412'),	(select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '26101'),	(select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48022'), null, 		                                                   1003, '09', '09301', '09301', '20', '13', '13'),
('4.1.2', (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71412'),	(select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '26109'),	(select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48022'), null, 		                                                   1003, '09', '09301', '09301', '20', '13', '13'),
('4.2.1', (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71414'),	(select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '27101'),	(select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48022'), null, 		                                                   1003, '09', '09301', '09301', '20', '14', '14'),
('4.2.2', (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71414'),	(select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '27109'),	(select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48022'), null, 		                                                   1003, '09', '09301', '09301', '20', '14', '14'),
('5.0.1', (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48022'),	null,	                                                        (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '47417'), null, 		                                                   null, '09', '09705', '09705', '30', null, null),
('5.0.3', (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48028'),	null,	                                                        (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '47417'), null, 		                                                   null, '09', '09705', '09705', '30', null, null),
('5.1.1', (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71406'),	(select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '23103'),	(select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48028'), null, 		                                                   null, '09', '09108', '09108', '10', '32', '32'),
('5.2.1', (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71410'),	(select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '25101'),	(select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48028'), null, 		                                                   1009, '09', '09108', '09108', '10', '33', '33'),
('5.3.1', (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71406'),	(select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '23101'),	(select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48028'), null, 		                                                   null, '09', '09504', '09504', '30', '13', '13'),
('5.4.1', (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71410'),	(select OFR_ID from ACC_IMPL.CT_OFR where OFR_CODE = '25101'),	(select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48028'), null, 		                                                   1004, '09', '09504', '09504', '30', '14', '14')
;