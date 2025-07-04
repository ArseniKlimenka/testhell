IF 
EXISTS (SELECT 1 FROM sys.objects WHERE OBJECT_ID = OBJECT_ID(N'[BFX_IMPL].[PRODUCTS]') AND TYPE IN (N'U'))
AND
NOT EXISTS (SELECT 1 FROM sys.columns WHERE NAME = N'PRODUCT_CLASS' AND OBJECT_ID = OBJECT_ID(N'[BFX_IMPL].[PRODUCTS]')) 
BEGIN
	ALTER TABLE [BFX_IMPL].[PRODUCTS] ADD [PRODUCT_CLASS] nvarchar(MAX)
END
GO

update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = '789CD192-EA16-4B2D-9791-0462B06A8079'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = 'C6B17952-069F-43AE-A809-0CA85D86A2F9'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = '94FA4B56-2A48-46EE-A4F5-0D37251979AF'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ДМС' where ID = '33C2FB9F-F39C-4F53-AB73-1367D34D3C55'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = 'E46F759E-B8AE-4613-A10B-16B88198E0DE'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ДМС' where ID = 'E7E35111-76F8-44CF-8139-180FC946C62C'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ИСЖ' where ID = '0B73D088-6105-4FEB-9A66-19274525050B'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = '0B2C2878-B14B-48D1-BA6C-22A7EDE4A970'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = '5EC77638-1DDD-4426-A974-22C442431846'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = '073793C9-EB54-4114-970A-28975C51A8B3'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = '0E6E491B-F88A-412F-82A0-2BBFDE7A5EA8'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = '9C87100B-2D8B-4C61-9B01-2C2988E37FA8'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = '7F5D7849-2102-4D65-9C57-2D90EB39D338'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = 'A89D23DC-D1D5-4731-8001-2F5FD61D8B68'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'КСЖ' where ID = '9A159088-93D2-44C5-B147-3A067F072BFC'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = 'D78CC97B-B663-44A6-AA28-3DA0E596E0A9'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = '45B2B7ED-8508-4E6A-924A-411859153E61'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = '0D92E82D-1716-4C46-A64D-46F2340FECDE'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = '9F7B38E0-B7F3-470E-83DA-486B9495A232'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = 'E40ACDD0-BB45-4C0A-92E7-48E3C4788C81'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = '9FA27E49-73C8-40F5-BBF7-49BE0ABA2981'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'РСЖ' where ID = '89AF524D-FAB3-430E-B450-51A674801064'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ИСЖ' where ID = 'AA41D4D6-C19D-4284-9FC0-52DFAD6A9578'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = 'E6F924CA-F84E-43F5-9501-5455A7773096'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = '5E56BAA4-9D7D-4BF3-962B-547B62795931'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'КСЖ' where ID = '52A016E6-68F1-4F9F-8A77-54AD550808E8'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = 'E2AEC768-92A6-4F9B-AF1D-5673A672E411'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = 'DF985CB9-0770-4A61-B010-5ADD6ECE12CF'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = '460E6E88-F1CD-4ABC-BBBA-61A2038782B0'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = 'B5F5AFC5-3F43-4E96-9403-638C724E412D'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'КСЖ' where ID = 'D933F9F4-6B31-4A72-8844-63E75DC19284'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ИСЖ' where ID = '1F842487-4F01-4C6C-901D-64A52BAB0682'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ИСЖ' where ID = 'D1CFF1CF-462A-4C20-A8D4-6AD87CE75985'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ИСЖ' where ID = '9EDC5F1F-40F9-43A9-BCDF-6CDFE43A7F45'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ИСЖ' where ID = '4C6307DB-56F7-4F98-91D7-6E2FBC5BFABF'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ИСЖ' where ID = 'C4151658-663E-4824-A912-718F115C72FA'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = '2097B944-266B-496B-B968-72097C8D57F8'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = '095BF813-D034-4EB6-9379-79BFD9060ED3'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ДМС' where ID = 'F571A5CB-2ED4-4D6C-AC33-7DCA4EDB8071'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = '3BFA0347-E070-487B-B415-8038A511BCF7'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = '6A925FF9-065D-4C7C-9A74-823FDA801F8F'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = 'B502B980-96B3-4F5A-8CDF-825FA0576A1C'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = '2020DA59-1A03-4288-8909-82B63EA36D49'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = 'C2F56D7C-B92B-434D-9746-870F1EFACE8F'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ИСЖ' where ID = '8E10AE31-076A-4330-AFF9-87B2B3BB5C91'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ИСЖ' where ID = '10E52E4F-02C7-4B49-9E3B-89317F0C903A'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = '0DFE59A7-CEE2-4F73-87BD-8A245F680802'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ИСЖ' where ID = '9052FA88-7D09-41A8-8337-8D89FD8AE23F'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = '9FD55CBA-12B0-4048-ACCA-90CE12F931FF'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ДМС' where ID = 'F765AE69-9753-4565-BD1D-93B7A386A05D'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = 'BC1C9D6E-6ADE-4569-92C9-948588AF0C0D'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = '716A1298-C915-4F79-8D88-94E62769F4FE'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ДМС' where ID = '22CBEA75-6B3F-4ABC-B33C-97105BBF503E'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ИСЖ' where ID = 'C676816A-C170-4508-AECA-A270AABE7B91'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ИСЖ' where ID = '334EA4CE-6DB8-4035-853E-A4C399E9E843'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ИСЖ' where ID = '4875E9FB-9318-43AE-9785-A6FC4BEB7B59'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ИСЖ' where ID = 'CE22F05D-2611-4797-83F0-AAFFBF29A147'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ИСЖ' where ID = 'AB246E46-4E27-4019-800A-AB362FF5C058'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ИСЖ' where ID = 'BD63A122-A314-4EB1-9701-AEC0C4B598EC'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = 'E0F646FA-221A-46B2-98B1-B0347D8C7A02'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ИСЖ' where ID = 'D9E02BFE-28D3-4D99-9D18-B09803624AA0'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = 'A5CF10D1-9C1C-4C11-84C8-B256398DF492'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ИСЖ' where ID = '5E894932-90C4-4F39-B811-B8683DC8D0A9'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'КСЖ' where ID = '80F05402-F9F9-472B-A803-B9E24F361B6C'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ИСЖ' where ID = '728AC823-4428-47C8-B677-BB2D209AE148'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = '6721A67B-9C2F-45A5-B3E7-BB313CAE5B33'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = 'A1D5090F-CF8D-4FF3-A9DC-C15A12BF8DBD'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ИСЖ' where ID = '2055F9F1-D74E-405A-A2F2-C1F0D9817077'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = '7170FDA7-7ECF-4092-B0AA-C5F4FDCB8602'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'КСЖ' where ID = 'B04C1F6C-676D-4648-820C-C87C2270CD3A'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = '1D6CFDF0-65C7-4E1E-ABCF-C8EF270F8364'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ДМС' where ID = '94CC2B73-11AB-4931-9FEE-C9C2543522DD'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ИСЖ' where ID = 'CCEA50FB-F974-4D08-973D-CAD031558007'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = 'F332B7A9-ACE5-4601-9BB3-CD4D22FD09BD'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = '2B20197E-1082-4006-88C6-D302DBF8B8B1'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ДМС' where ID = 'A4B0F822-E342-4568-9316-D30AEE500721'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ИСЖ' where ID = 'C0691CE1-2EEA-495E-ACA3-D42D217EFFE1'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = '70E9E9C5-9010-4B90-BBC5-D5A6AEEB9C1D'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ИСЖ' where ID = 'AA971553-CE10-4F47-9765-D773AC979E01'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ИСЖ' where ID = 'F2000675-A0AE-4028-9DC0-D88EBFAB4B9E'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ИСЖ' where ID = 'C730F5F2-D291-4DD6-9ACF-DAE213EFE1E1'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ИСЖ' where ID = 'DF452EB8-1817-46E3-BB6E-DE095AA5ED12'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = '085BDFAB-AF63-49EB-9D17-E6E666DF254C'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ИСЖ' where ID = '681E6BF0-B226-47BB-8A79-E7C1E65D51F3'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ИСЖ' where ID = '03D200DF-01E2-4EB5-BB5F-EBCC884C9346'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ИСЖ' where ID = 'AC96F9D5-224F-414B-81B7-ED6F033254EB'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = 'E8D3A775-6550-49A4-BB1F-EF5AF72714A0'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ИСЖ' where ID = 'D3BDFD5A-9EE4-4AC3-B298-F09867B80F81'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = '121B2A64-4C18-481B-8D12-F1F130BD2EFA'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'КСЖ' where ID = '3643063D-0FD1-468E-8FE7-F4F3343C32D8'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'КСЖ' where ID = 'D2E1D849-E1E6-426E-B181-F5A9C2932408'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ИСЖ' where ID = '92F84D6D-1E29-4ADF-9048-F64A4A11AE8F'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = '9B9E9245-AD1D-42C6-9041-F6B0D2C2D576'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = 'DD6CA085-B40B-4404-B5DC-F74865960A97'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = '035D9EDF-F031-4AAA-8CC5-FC538F60A96D'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ИСЖ' where ID = '7237D02A-4716-4CD5-B090-FFAB5E58CBFA'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = '03FF4EAC-5782-44AE-9DD1-1239DE081869'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = 'A2867DD7-CF04-4F9B-84C1-16EC5714100D'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ДМС' where ID = '3813DF1A-129A-4825-B1E3-30296893A6B3'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ИСЖ' where ID = 'FFDE1B3C-2661-41A2-81D0-3088B281714A'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ИСЖ' where ID = '2C9B586B-ACF5-496B-84B7-33FD6F6A103B'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ИСЖ' where ID = '7CB9E4A6-7C39-4289-8230-35E97D1B1E66'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ИСЖ' where ID = '93A395EA-528C-4676-8E93-37667DB996D5'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ИСЖ' where ID = '8EFF83F1-D8EB-4DBE-B19C-3FDE36784123'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ИСЖ' where ID = '327CD10F-D307-4D8B-AB83-458A97ACB400'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ИСЖ' where ID = '0B5630C2-6AF1-4459-92A3-599D0D212DA8'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ИСЖ' where ID = '7C686E9E-916B-42DD-B326-A2CD3F7E84C4'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = 'DC4C0BC4-5AC2-48BB-9BF1-AFDAD1FB6091'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = 'D0B09147-70F2-4568-A5A3-B0812A3A3EDD'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = 'EFA381D1-8E46-4737-B96E-B82DCEBBB56C'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ИСЖ' where ID = '93B8AD72-1018-4904-A73F-C873259E6F50'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ИСЖ' where ID = 'AD36DA2B-E957-44F9-BF36-E40624D8B60D'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ИСЖ' where ID = 'FB1FEB1F-516A-42A4-AEEA-E4CE247CF6E0'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ИСЖ' where ID = '49A98EFB-CDB8-4034-B855-E86866F49682'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'ИСЖ' where ID = '06AE5737-55E5-460A-B7FD-F1BA5C971F2B'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'НСЖ' where ID = '4950A363-C35B-4568-B5FD-F5EFF497470D'
update [BFX_IMPL].[PRODUCTS] set PRODUCT_CLASS = N'РСЖ' where ID = '218EC956-844E-4365-B67D-FD8F979C574B'