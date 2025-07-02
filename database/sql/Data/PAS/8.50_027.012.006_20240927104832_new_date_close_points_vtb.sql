--point 18
delete from bfx_impl.declaration_main_questions where id = 'A4D94948-1848-4387-AA65-2CAE274BDC79'; insert into bfx_impl.declaration_main_questions values ('A4D94948-1848-4387-AA65-2CAE274BDC79', N'Страхователь и Застрахованный дают свое согласие Обществу с ограниченной ответственностью Страховая компания «Росгосстрах Жизнь» (121059, г. Москва, вн.тер.г. муниципальный округ Дорогомилово, ул. Киевская, д. 7, к. 1), Публичному акционерному обществу Страховая Компания «Росгосстрах» (140002, Московская область, г. Люберцы, ул. Парковая, д. 3) на обработку и использование указанного в настоящем договоре страхования номера мобильного телефона, адреса электронной почты с целью оповещения/информирования об услугах и страховых продуктах Общества с ограниченной ответственностью Страховая компания «Росгосстрах Жизнь» (121059, г. Москва, вн.тер.г. муниципальный округ Дорогомилово, ул. Киевская, д. 7, к. 1), Публичного акционерного общества Страховая Компания «Росгосстрах» (140002, Московская область, г. Люберцы, ул. Парковая, д. 3), сообщения информации в отношении настоящего договора страхования, заключенного со Страхователем, и/или информации по страховому случаю, а также для поздравления с официальными праздниками и маркетинговых исследований. Согласие на получение информации по каналам связи дано без ограничения срока действия и может быть отозвано в любой момент времени путем направления Страховщику письменного заявления.');

--IDGV5PPVTB
update BFX_IMPL.DECLARATION_MAIN
set ACTIVE_TO_DATE = '2024-10-02'
where ITEM_NUMBER IN(14,15,16,17,18,19,20) AND PRODUCT_CODE IN('IDGVPP5VTB') AND ACTIVE_FROM_DATE = '1900-01-01'

UPDATE BFX_IMPL.DECLARATION_MAIN
set ACTIVE_FROM_DATE = '2024-10-03'
where product_code IN('IDGV1VTB','IDGP1VTB','IDGP2VTB','IDGP3VTB','IDGP4VTB','IDGP5VTB','IDGP2PPVTB','IDGP3PPVTB','IDGP4PPVTB','IDGP5PPVTB',
'IDGV2VTB','IDGV3VTB','IDGV4VTB','IDGV5VTB','IDGV2PPVTB','IDGV3PPVTB','IDGV4PPVTB','IDGV5PPVTB',
'IDGPN1VTB','IDGPN2VTB','IDGPN3VTB','IDGPN4VTB','IDGPN5VTB','IDGPN2PPVTB','IDGPN3PPVTB','IDGPN4PPVTB','IDGPN5PPVTB',
'IBA2V3VTB', 'IBA2V5VTB', 'IBA2P3VTB', 'IBA2P5VTB', 
'ECOFVVTB', 'ECOFPVTB',
'ECATFVVTB', 'ECATFPVTB',
'IBA2V3VTB', 'IBAV5VTB', 'IBAP3VTB', 'IBAP5VTB', 
'EBMGVTB','EBMGVVTB','EBMGRETVTB', 'EBMGNVTB','EBMGNRETVTB') AND ACTIVE_FROM_DATE = '2024-09-26'

UPDATE BFX_IMPL.DECLARATION_MAIN
set ACTIVE_TO_DATE = '2024-10-02'
where product_code IN('IDGV1VTB','IDGP1VTB','IDGP2VTB','IDGP3VTB','IDGP4VTB','IDGP5VTB','IDGP2PPVTB','IDGP3PPVTB','IDGP4PPVTB','IDGP5PPVTB',
'IDGV2VTB','IDGV3VTB','IDGV4VTB','IDGV5VTB','IDGV2PPVTB','IDGV3PPVTB','IDGV4PPVTB','IDGV5PPVTB',
'IDGPN1VTB','IDGPN2VTB','IDGPN3VTB','IDGPN4VTB','IDGPN5VTB','IDGPN2PPVTB','IDGPN3PPVTB','IDGPN4PPVTB','IDGPN5PPVTB',
'IBA2V3VTB', 'IBA2V5VTB', 'IBA2P3VTB', 'IBA2P5VTB', 
'ECOFVVTB', 'ECOFPVTB',
'ECATFVVTB', 'ECATFPVTB',
'IBA2V3VTB', 'IBAV5VTB', 'IBAP3VTB', 'IBAP5VTB', 
'EBMGVTB','EBMGVVTB','EBMGRETVTB','EBMGNVTB','EBMGNRETVTB') AND ACTIVE_TO_DATE = '2024-09-25'


--IDV2PPVTB, IDGV3PPVTB, IDGV4PPVTB, IDGV5PPVTB
update BFX_IMPL.DECLARATION_MAIN
set ACTIVE_TO_DATE = '2024-10-02'
where ITEM_NUMBER IN(14,15,16,17,18,19,20) AND PRODUCT_CODE IN('IDGPN2PPVTB', 'IDGPN3PPVTB','IDGPN4PPVTB','IDGPNPP5VTB','IDGPN2VTB','IDGPN3VTB','IDGPN4VTB','IDGPN5VTB') AND ACTIVE_TO_DATE = '2099-12-31'