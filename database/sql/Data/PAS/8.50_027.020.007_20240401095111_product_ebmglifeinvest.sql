-- products
delete from bfx_impl.products
where code in ('EBMGLIFEINVEST')
insert into bfx_impl.products
(id, code, product_group, description, product_class, sales_segment)
values
('192E119C-C013-41DD-89FF-0EF97C27C46F', N'EBMGLIFEINVEST', N'endowment', N'Стратегия на пять. Гарант', N'НСЖ', N'massLIFEINVEST')

-- risk product relation
delete from bfx_impl.risk_product_relation
 where product_code in ('EBMGLIFEINVEST')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order, risk_program, risk_person)
values
-- Стратегия на пять. Гарант реинвест
('CE654CDC-3478-464A-808D-32494E2AA703', N'E36404', N'EBMGLIFEINVEST', '0', NULL, NULL, N'01', 1, 'main', 'insuredPerson'),
('07154436-7CD1-4DFE-A95B-4C94C703B5A9', N'DLPVV36404', N'EBMGLIFEINVEST', '0', NULL, NULL, N'01', 2, 'main', 'insuredPerson'),
('6030DDE8-8B71-47A2-8177-F4FCF57AEB9C', N'DNSVV36404', N'EBMGLIFEINVEST', '0', NULL, NULL, N'01', 3, 'main', 'insuredPerson')

-- declaration EBMGLIFEINVEST
delete from bfx_impl.declaration_main where id = '8BD1944C-532D-4CFA-9AA8-92FF2614EC19'; insert into bfx_impl.declaration_main values ('8BD1944C-532D-4CFA-9AA8-92FF2614EC19', 'EBMGLIFEINVEST', '1', '6A7225BD-8ADA-475D-B688-411119072DF9', 'underwriting','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '92678428-689C-4556-916A-AA4B563DB269'; insert into bfx_impl.declaration_main values ('92678428-689C-4556-916A-AA4B563DB269', 'EBMGLIFEINVEST', '2', '03861869-025F-435B-BF5F-0CC813CDCBB9', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'A304B2F5-9E93-4A8D-9675-BDD603CA9B91'; insert into bfx_impl.declaration_main values ('A304B2F5-9E93-4A8D-9675-BDD603CA9B91', 'EBMGLIFEINVEST', '3', '2D94E4E3-E76B-44D5-91C8-1FCCF7449CA6', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '4C65B24B-1E32-435A-A9E7-4033D92B9DB3'; insert into bfx_impl.declaration_main values ('4C65B24B-1E32-435A-A9E7-4033D92B9DB3', 'EBMGLIFEINVEST', '4', '86DB44A7-AD0B-4417-AF98-65A228E83DB6', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '8E577778-3595-42EB-A294-A123813D4BFF'; insert into bfx_impl.declaration_main values ('8E577778-3595-42EB-A294-A123813D4BFF', 'EBMGLIFEINVEST', '5', 'D097989F-E540-4ED6-AED4-BD3D72948C78', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '515C18F5-0F18-4AD4-B9F4-4AA2D04DCE30'; insert into bfx_impl.declaration_main values ('515C18F5-0F18-4AD4-B9F4-4AA2D04DCE30', 'EBMGLIFEINVEST', '6', '00FDD0BF-AE15-4C35-BB6F-A60A4074C427', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'C213E04D-18E3-4B71-BB50-81258D928086'; insert into bfx_impl.declaration_main values ('C213E04D-18E3-4B71-BB50-81258D928086', 'EBMGLIFEINVEST', '7', '8985EAD0-96AB-4B70-9B12-C350B3D66ABD', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '9619D3C1-6583-46ED-AF5B-F9029E8E9251'; insert into bfx_impl.declaration_main values ('9619D3C1-6583-46ED-AF5B-F9029E8E9251', 'EBMGLIFEINVEST', '8', 'CC7FFF01-09C5-44B3-B603-1089E0F29F55', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '91FD8D43-E167-4082-9FF7-0AF90C9E59DA'; insert into bfx_impl.declaration_main values ('91FD8D43-E167-4082-9FF7-0AF90C9E59DA', 'EBMGLIFEINVEST', '9', 'D9E7097C-186D-4A69-A21B-B4A3B02B9B0D', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '2ED8C651-62AD-4641-8908-B23EA7A44BFB'; insert into bfx_impl.declaration_main values ('2ED8C651-62AD-4641-8908-B23EA7A44BFB', 'EBMGLIFEINVEST', '10', '1B1CD2F0-C525-4451-993F-7BA652EC1B63', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '55005BCC-287F-4974-8BB3-DBE4343F67B8'; insert into bfx_impl.declaration_main values ('55005BCC-287F-4974-8BB3-DBE4343F67B8', 'EBMGLIFEINVEST', '11', '2FA86700-4561-4D9E-895F-FC62F0E7A0B2', 'legal','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'C4357D75-D5B4-455E-8409-24101A0BD138'; insert into bfx_impl.declaration_main values ('C4357D75-D5B4-455E-8409-24101A0BD138', 'EBMGLIFEINVEST', '12', '72B451EC-D296-41DD-9BB2-ADB25611551D', 'block','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '8B49C8FE-67CD-453A-8A7E-E07656B01F07'; insert into bfx_impl.declaration_main values ('8B49C8FE-67CD-453A-8A7E-E07656B01F07', 'EBMGLIFEINVEST', '13', 'F273F5D7-F630-4BE5-BED9-D77ADC47BCB6', 'legal','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '634A7094-8317-4AA0-807F-89C9A4068669'; insert into bfx_impl.declaration_main values ('634A7094-8317-4AA0-807F-89C9A4068669', 'EBMGLIFEINVEST', '14', '3D02D2B6-A767-4079-B459-CD3C01A72646', 'block','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'C52CEC9E-1A81-422B-8863-0EBA4DD7417D'; insert into bfx_impl.declaration_main values ('C52CEC9E-1A81-422B-8863-0EBA4DD7417D', 'EBMGLIFEINVEST', '15', 'E662B540-3573-4074-B242-A1BD0692BA29', 'block','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '741F6480-05D3-42A3-9C67-28C35CA7FD48'; insert into bfx_impl.declaration_main values ('741F6480-05D3-42A3-9C67-28C35CA7FD48', 'EBMGLIFEINVEST', '16', 'B1ABE729-4008-41E9-8425-FF945194C72C', 'legal','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '8BC18A16-24CF-4643-A3AC-6F4AA998CB98'; insert into bfx_impl.declaration_main values ('8BC18A16-24CF-4643-A3AC-6F4AA998CB98', 'EBMGLIFEINVEST', '17', '02B588CE-E866-4961-9ECA-4EB5B8904E6A', 'block','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '3D90D0F7-64CA-440A-BC24-EFA69EDC5472'; insert into bfx_impl.declaration_main values ('3D90D0F7-64CA-440A-BC24-EFA69EDC5472', 'EBMGLIFEINVEST', '18', 'B0571E90-C8D5-4968-9EFF-3EDD68764AEA', 'block','1900-01-01','2099-12-31');

-- declaration medical EBMGLIFEINVEST
delete from bfx_impl.declaration_medical where id = '6563A475-4EBB-4146-8AF1-956647B2EEC7'; insert into bfx_impl.declaration_medical values ('6563A475-4EBB-4146-8AF1-956647B2EEC7', 'EBMGLIFEINVEST', '1', 'CFA7B5A9-23E6-4D83-83BB-95247D2DB5C9', 'underwriting','1900-01-01','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = '4EEF65F9-6492-4172-BD59-D6417A6FA42B'; insert into bfx_impl.declaration_medical values ('4EEF65F9-6492-4172-BD59-D6417A6FA42B', 'EBMGLIFEINVEST', '2', 'DEB878E0-638A-4D23-B103-4A8312EA21F6', 'underwriting','1900-01-01','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = 'FC8BAF40-CD87-4457-A903-2945FF0CF466'; insert into bfx_impl.declaration_medical values ('FC8BAF40-CD87-4457-A903-2945FF0CF466', 'EBMGLIFEINVEST', '3', '68146BB1-1183-4B52-9EDC-F025234A4349', 'underwriting','1900-01-01','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = '6EDCCF25-A61E-4BB6-9365-6E37FF88E929'; insert into bfx_impl.declaration_medical values ('6EDCCF25-A61E-4BB6-9365-6E37FF88E929', 'EBMGLIFEINVEST', '4', '83B2259E-87E1-4D4E-A0CD-E89EB701946D', 'underwriting','1900-01-01','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = '356D3E1B-A133-4105-A4F7-99EE0B02E6DF'; insert into bfx_impl.declaration_medical values ('356D3E1B-A133-4105-A4F7-99EE0B02E6DF', 'EBMGLIFEINVEST', '5', '83D7051A-605A-4D6A-B755-E4A62B5C93AA', 'underwriting','1900-01-01','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = '27C68CCE-AE19-4BF6-A687-D62BD3594C79'; insert into bfx_impl.declaration_medical values ('27C68CCE-AE19-4BF6-A687-D62BD3594C79', 'EBMGLIFEINVEST', '6', '780E9C89-6B17-4CAF-BA0C-3697A0F669DE', 'underwriting','1900-01-01','2099-12-31', 0);