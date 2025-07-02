-- change description of products
update bfx_impl.products set DESCRIPTION = N'Драйвер Гарантия (3 года)'
where code in ( 'IDG3REINVEST');
update bfx_impl.products set DESCRIPTION = N'Драйвер Гарантия (5 лет)'
where code in ('IDG5REINVEST');

--change  order medical declaration
--
--update BFX_IMPL.DECLARATION_MEDICAL set ACTIVE_TO_DATE = '2024-08-21' where PRODUCT_CODE in ('IDG5REINVESTY','IDG5REINVESTO','IDG3REINVESTY','IDG3REINVESTO')  and ACTIVE_TO_DATE = '2099-12-31';
--delete from BFX_IMPL.DECLARATION_MEDICAL where id in('AAD8B0D7-F9B9-4F63-99F6-D5ECDAA345FB','8F85E2A7-F014-41D5-8131-021AE5AA9043','DB9B1D70-438A-4526-9175-767DFA0817DA','065A9AF8-2287-40AA-AA09-C1C8012E1AA0',
--'E6383792-043C-4113-A1F5-6771386749EA','26606874-791E-4BCA-94A0-6BEAA09485E5','7EE7485C-5E37-4D67-930B-2358159EA85B','18B9A6AD-218D-4D3A-B1B2-9176A898CF50',
--'4BF3ECC9-DC0E-447C-9DB6-F2BA2759D15F','21DBABD9-EEB2-4190-8B4C-8AD20BB51B12','DEC8EA54-1487-4B26-8750-B336C4223FE0','3BED8F08-6837-45D5-A15E-6FF59F464FEF',
--'250B866B-D702-4FFA-8134-9483E84BEABE','2A989DDF-67FC-41E6-973C-089A760D3C0D','85AFA2AE-1661-4A48-B8AD-341978604C99','B3FD3E42-3BD3-4DE0-8251-0CF60BE30005',
--'58BD0A66-5BBE-4A56-9B8C-698FC817C8A8','155B08A4-1AFA-4794-B25E-10F82195DE33','CE0CDD12-AEE4-423C-AD20-90B0A7C9D6FB','22678D04-58D5-4A91-85C2-0260A6E54152');
--insert into BFX_IMPL.DECLARATION_MEDICAL values
--('AAD8B0D7-F9B9-4F63-99F6-D5ECDAA345FB','IDG5REINVESTY',1,'41FABBF1-D996-4257-BB29-5EE6E70DE22B','underwriting','2024-08-22','2099-12-31',0),
--('8F85E2A7-F014-41D5-8131-021AE5AA9043','IDG5REINVESTY',2,'2F447F7C-7044-4E21-8E02-F13B13EEBEF2','underwriting','2024-08-22','2099-12-31',0),
--('DB9B1D70-438A-4526-9175-767DFA0817DA','IDG5REINVESTY',3,'C4B2DBCB-C906-4270-9F30-8729695C43E0','underwriting','2024-08-22','2099-12-31',0),
--('065A9AF8-2287-40AA-AA09-C1C8012E1AA0','IDG5REINVESTY',4,'8253AD8E-91B6-47B7-998E-E7306FE9C3AE','underwriting','2024-08-22','2099-12-31',0),
--('E6383792-043C-4113-A1F5-6771386749EA','IDG5REINVESTY',5,'DDB767ED-AC9B-4DAB-BC5C-D55E824047BB','underwriting','2024-08-22','2099-12-31',0),
--('26606874-791E-4BCA-94A0-6BEAA09485E5','IDG5REINVESTO',1,'41FABBF1-D996-4257-BB29-5EE6E70DE22B','underwriting','2024-08-22','2099-12-31',0),
--('7EE7485C-5E37-4D67-930B-2358159EA85B','IDG5REINVESTO',2,'2F447F7C-7044-4E21-8E02-F13B13EEBEF2','underwriting','2024-08-22','2099-12-31',0),
--('18B9A6AD-218D-4D3A-B1B2-9176A898CF50','IDG5REINVESTO',3,'C4B2DBCB-C906-4270-9F30-8729695C43E0','underwriting','2024-08-22','2099-12-31',0),
--('4BF3ECC9-DC0E-447C-9DB6-F2BA2759D15F','IDG5REINVESTO',4,'8253AD8E-91B6-47B7-998E-E7306FE9C3AE','underwriting','2024-08-22','2099-12-31',0),
--('21DBABD9-EEB2-4190-8B4C-8AD20BB51B12','IDG5REINVESTO',5,'DDB767ED-AC9B-4DAB-BC5C-D55E824047BB','underwriting','2024-08-22','2099-12-31',0),
--('DEC8EA54-1487-4B26-8750-B336C4223FE0','IDG3REINVESTY',1,'41FABBF1-D996-4257-BB29-5EE6E70DE22B','underwriting','2024-08-22','2099-12-31',0),
--('3BED8F08-6837-45D5-A15E-6FF59F464FEF','IDG3REINVESTY',2,'2F447F7C-7044-4E21-8E02-F13B13EEBEF2','underwriting','2024-08-22','2099-12-31',0),
--('250B866B-D702-4FFA-8134-9483E84BEABE','IDG3REINVESTY',3,'C4B2DBCB-C906-4270-9F30-8729695C43E0','underwriting','2024-08-22','2099-12-31',0),
--('2A989DDF-67FC-41E6-973C-089A760D3C0D','IDG3REINVESTY',4,'8253AD8E-91B6-47B7-998E-E7306FE9C3AE','underwriting','2024-08-22','2099-12-31',0),
--('85AFA2AE-1661-4A48-B8AD-341978604C99','IDG3REINVESTY',5,'DDB767ED-AC9B-4DAB-BC5C-D55E824047BB','underwriting','2024-08-22','2099-12-31',0),
--('B3FD3E42-3BD3-4DE0-8251-0CF60BE30005','IDG3REINVESTO',1,'41FABBF1-D996-4257-BB29-5EE6E70DE22B','underwriting','2024-08-22','2099-12-31',0),
--('58BD0A66-5BBE-4A56-9B8C-698FC817C8A8','IDG3REINVESTO',2,'2F447F7C-7044-4E21-8E02-F13B13EEBEF2','underwriting','2024-08-22','2099-12-31',0),
--('155B08A4-1AFA-4794-B25E-10F82195DE33','IDG3REINVESTO',3,'C4B2DBCB-C906-4270-9F30-8729695C43E0','underwriting','2024-08-22','2099-12-31',0),
--('CE0CDD12-AEE4-423C-AD20-90B0A7C9D6FB','IDG3REINVESTO',4,'8253AD8E-91B6-47B7-998E-E7306FE9C3AE','underwriting','2024-08-22','2099-12-31',0),
--('22678D04-58D5-4A91-85C2-0260A6E54152','IDG3REINVESTO',5,'DDB767ED-AC9B-4DAB-BC5C-D55E824047BB','underwriting','2024-08-22','2099-12-31',0);
--

-- update main declaration



update BFX_IMPL.DECLARATION_MAIN set ACTIVE_TO_DATE = '2023-07-31' where id in ('5C9CDFCF-E086-4A5F-BA79-7B5E01780E72','D11CBC2D-96DA-4458-BC9A-C1E7EE5C518C');
--1
DELETE FROM BFX_IMPL.DECLARATION_MAIN_QUESTIONS WHERE ID='5AFF2BEB-362F-4146-B62E-24816C1FD948';
INSERT INTO [BFX_IMPL].[DECLARATION_MAIN_QUESTIONS] VALUES('5AFF2BEB-362F-4146-B62E-24816C1FD948',N'Общая страховая сумма в отношении Застрахованного в сумме по рискам «Смерть Застрахованного по любой причине» и «Смерть Застрахованного по любой причине с отложенной страховой выплатой» по всем договорам страхования ООО СК «Росгосстрах Жизнь» по продуктам инвестиционного страхования жизни и продуктам, договоры страхования по которым заключаются на основании Правил добровольного инвестиционного страхования жизни физических лиц №1 (в редакции от любого числа) и/или Правил страхования жизни (в редакции от любого числа), включая настоящий договор страхования не превышает 60 000 000 рублей для Застрахованных в возрасте от 18 до 65 полных лет (включительно) на дату заключения договора страхования (15 000 000 рублей для Застрахованных в возрасте от 66 до 70 полных лет (включительно) на дату заключения договора страхования; 10 000 000 рублей для Застрахованных в возрасте от 71 года до 75 полных лет (включительно) на дату заключения договора страхования; 1 000 000 рублей для Застрахованных в возрасте от 76 лет на дату заключения договора страхования.');
--2
DELETE FROM BFX_IMPL.DECLARATION_MAIN_QUESTIONS WHERE ID='DBF1B8A4-425F-457A-8029-BE7185C8EA1C';
INSERT INTO [BFX_IMPL].[DECLARATION_MAIN_QUESTIONS] VALUES('DBF1B8A4-425F-457A-8029-BE7185C8EA1C',N'Общая страховая сумма в отношении Застрахованного по риску «Смерть Застрахованного в результате несчастного случая» по всем договорам страхования ООО СК «Росгосстрах Жизнь» по продуктам инвестиционного страхования жизни и продуктам, договоры страхования по которым заключаются на основании Правил добровольного инвестиционного страхования жизни физических лиц №1 (в редакции от любого числа) и/или Правил страхования жизни (в редакции от любого числа), включая настоящий договор страхования не превышает 20 000 000 рублей для Застрахованных в возрасте от 18 до 65 полных лет (включительно) на дату заключения договора страхования (15 000 000 рублей для Застрахованных в возрасте от 66 до 70 полных лет (включительно) на дату заключения договора страхования; 5 000 000 рублей для Застрахованных в возрасте от 71 года до 75 полных лет (включительно) на дату заключения договора страхования; 1 000 000 рублей для Застрахованных в возрасте от 76 лет на дату заключения договора страхования.');
--19
DELETE FROM BFX_IMPL.DECLARATION_MAIN_QUESTIONS WHERE ID='DB54C114-663F-4833-B4FF-B6B25D7D5E94';
INSERT INTO [BFX_IMPL].[DECLARATION_MAIN_QUESTIONS] VALUES('DB54C114-663F-4833-B4FF-B6B25D7D5E94',N'Страхователь дает свое согласие на получение рекламы, рекламной информации (в том числе в форме рекламной рассылки) Общества с ограниченной ответственностью Страховая компания «Росгосстрах Жизнь» (121059, г. Москва, вн.тер.г. муниципальный округ Дорогомилово, ул. Киевская, д. 7, к. 1) по сетям электросвязи, в том числе посредством телефонной, подвижной радиотелефонной связи, по электронной почте, с использованием номера мобильного телефона (для направления СМС-сообщений, Push-сообщений, сообщений в мессенджерах и иных приложениях, передающих и принимающих информацию с использованием сетей электросвязи, звонков по телефону) и адреса электронной почты (для направления сообщений по электронной почте). Согласие на получение рекламы, рекламной информации (в том числе в форме рекламной рассылки) по сетям электросвязи дано без ограничения срока действия и может быть отозвано в любой момент времени путем направления Страховщику письменного заявления.');

UPDATE BFX_IMPL.DECLARATION_MAIN set ACTIVE_TO_DATE = '2024-08-21' where ITEM_NUMBER in (1,2,19)  and PRODUCT_CODE in('IDG5REINVEST','IDG3REINVEST') and ACTIVE_TO_DATE = '2099-12-31'; 

delete from bfx_impl.declaration_main where id = 'B88D451B-D123-4704-9903-36D93BEBC1D3'; insert into bfx_impl.declaration_main values ('B88D451B-D123-4704-9903-36D93BEBC1D3','IDG5REINVEST',1, '5AFF2BEB-362F-4146-B62E-24816C1FD948','underwriting',	'2024-08-22','2099-12-31');
delete from bfx_impl.declaration_main where id = 'F07A0B6E-B743-48AC-8896-CB5ED11844F2'; insert into bfx_impl.declaration_main values ('F07A0B6E-B743-48AC-8896-CB5ED11844F2','IDG5REINVEST',2, 'DBF1B8A4-425F-457A-8029-BE7185C8EA1C','compliance',   '2024-08-22','2099-12-31');
delete from bfx_impl.declaration_main where id = 'B462B398-8C46-45F9-96DE-06ADD400EC5B'; insert into bfx_impl.declaration_main values ('B462B398-8C46-45F9-96DE-06ADD400EC5B','IDG5REINVEST',19,'DB54C114-663F-4833-B4FF-B6B25D7D5E94','block'	,       '2024-08-22','2099-12-31');
delete from bfx_impl.declaration_main where id = '51C29D3B-FD73-4F84-B1AF-07D256774A95'; insert into bfx_impl.declaration_main values ('51C29D3B-FD73-4F84-B1AF-07D256774A95','IDG5REINVEST',20,'53C4E1D1-31F3-45C6-A786-F27A2392FCA2','block',        '2024-08-22','2099-12-31');

delete from bfx_impl.declaration_main where id = 'FE513743-0010-484E-B7A4-4DEF7D9E3D7A'; insert into bfx_impl.declaration_main values ('FE513743-0010-484E-B7A4-4DEF7D9E3D7A','IDG3REINVEST',1, '5AFF2BEB-362F-4146-B62E-24816C1FD948','underwriting',	'2024-08-22','2099-12-31');
delete from bfx_impl.declaration_main where id = 'AA8BA5AE-C00E-42A8-998C-262506704EFD'; insert into bfx_impl.declaration_main values ('AA8BA5AE-C00E-42A8-998C-262506704EFD','IDG3REINVEST',2, 'DBF1B8A4-425F-457A-8029-BE7185C8EA1C','compliance',   '2024-08-22','2099-12-31');
delete from bfx_impl.declaration_main where id = 'CF1A5346-BE23-4252-B39C-4883FDC958AA'; insert into bfx_impl.declaration_main values ('CF1A5346-BE23-4252-B39C-4883FDC958AA','IDG3REINVEST',19,'DB54C114-663F-4833-B4FF-B6B25D7D5E94','block'	,       '2024-08-22','2099-12-31');
delete from bfx_impl.declaration_main where id = '75CD7CBF-5348-4F20-ACBA-750B370D2D4F'; insert into bfx_impl.declaration_main values ('75CD7CBF-5348-4F20-ACBA-750B370D2D4F','IDG3REINVEST',20,'53C4E1D1-31F3-45C6-A786-F27A2392FCA2','block',        '2024-08-22','2099-12-31');