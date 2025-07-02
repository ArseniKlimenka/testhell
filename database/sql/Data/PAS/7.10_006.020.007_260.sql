-- products Базис гарант 2.0 3 ГОДА

delete from bfx_impl.PRODUCTS
 where CODE in ('IBG3BFKO2')
 insert into bfx_impl.PRODUCTS
 (ID, CODE, PRODUCT_GROUP, DESCRIPTION)
 VALUES
('03163EAB-91B5-4227-9E2B-5601DE909FD2', N'IBG3BFKO2', N'investment', N'Базис гарант 2.0 (3 года)')

  -- product risks
delete from bfx_impl.risk_product_relation
 where product_code in ('IBG3BFKO2')
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order)
values
('74AB5402-DF67-4F9F-941D-3025AC640FC1', N'E36404', N'IBG3BFKO2', '0', NULL, NULL, N'01', 1),
('DEC0F8E1-7F57-4DA9-94DA-E3739D977086', N'DLPT36404', N'IBG3BFKO2', '1', NULL, NULL, N'01', 2),
('5C4CD1EB-8B0C-4808-A657-ADE6B2E87F34', N'DLPDP36404', N'IBG3BFKO2', '0','DLPT36404', NULL, N'03', 3),
('BF07F9FF-D38D-4E37-A7C2-AE6E4FCC1839', N'DNS36404', N'IBG3BFKO2', '0', NULL, NULL, N'01', 4)


-- Добавление строк деклараций продукта Базис Гарант 2.0 3 года 
delete from bfx_impl.declaration_main where id = 'BB981D0E-7326-4AEB-8329-AF81C9F1C2F7'; insert into bfx_impl.declaration_main values ('BB981D0E-7326-4AEB-8329-AF81C9F1C2F7', 'IBG3BFKO2', '1', '5BDFFCBF-3BD8-442E-BCD1-0E7344DD37A5', 'underwriting','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'E5EE6AA5-21B5-4615-B9D7-34DF14674982'; insert into bfx_impl.declaration_main values ('E5EE6AA5-21B5-4615-B9D7-34DF14674982', 'IBG3BFKO2', '2', 'CB191336-3FD0-42F8-906E-BE1500D284A3', 'underwriting','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'EEA24FC8-0F45-40FF-9B22-294E0F825C47'; insert into bfx_impl.declaration_main values ('EEA24FC8-0F45-40FF-9B22-294E0F825C47', 'IBG3BFKO2', '3', 'B959537D-D10A-467F-B7B3-096292A2ACB1', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'E3CEBF95-E9B1-47D5-8E94-83CA1E81CF24'; insert into bfx_impl.declaration_main values ('E3CEBF95-E9B1-47D5-8E94-83CA1E81CF24', 'IBG3BFKO2', '4', '466BBC6B-2ABE-4A12-AAF6-0FDD925F8CEE', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'E7C56497-8F37-4F43-A5AD-9C91C5603518'; insert into bfx_impl.declaration_main values ('E7C56497-8F37-4F43-A5AD-9C91C5603518', 'IBG3BFKO2', '5', '9E5C30A5-6D29-4E7A-85FB-1C4B8B55AC7D', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '1C655212-8D99-4F9C-834C-0107718BF0DE'; insert into bfx_impl.declaration_main values ('1C655212-8D99-4F9C-834C-0107718BF0DE', 'IBG3BFKO2', '6', 'E3EA19A2-76F2-4F6F-BD54-1DFC54B65638', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'BDFBAF28-84B6-47C9-AA47-4B1F5D59E96B'; insert into bfx_impl.declaration_main values ('BDFBAF28-84B6-47C9-AA47-4B1F5D59E96B', 'IBG3BFKO2', '7', 'C9FCF151-6211-4515-A13C-58C52856D94B', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'F1409C8E-E10A-4665-93DE-87CE5DE25E0A'; insert into bfx_impl.declaration_main values ('F1409C8E-E10A-4665-93DE-87CE5DE25E0A', 'IBG3BFKO2', '8', '248DC6EA-2F3A-4927-80EF-6AEFDE889F66', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '3D88EC88-860B-4E2D-8FAD-CD428D82075D'; insert into bfx_impl.declaration_main values ('3D88EC88-860B-4E2D-8FAD-CD428D82075D', 'IBG3BFKO2', '9', '3FAD7948-B449-4E3C-A4B2-70C56439C781', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'F65EA9E6-A7A0-49F5-B0F2-D3D22D7759C1'; insert into bfx_impl.declaration_main values ('F65EA9E6-A7A0-49F5-B0F2-D3D22D7759C1', 'IBG3BFKO2', '10', 'ED9A3214-171F-4BD7-8C06-769C6EBE25CA', 'compliance','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '00760ECA-B920-43C0-AA87-7C36823AE1ED'; insert into bfx_impl.declaration_main values ('00760ECA-B920-43C0-AA87-7C36823AE1ED', 'IBG3BFKO2', '11', '9117948A-4D6B-4392-B976-87BE11C77E1F', 'legal','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '1583917B-5B72-446C-A864-9915202FEF27'; insert into bfx_impl.declaration_main values ('1583917B-5B72-446C-A864-9915202FEF27', 'IBG3BFKO2', '12', '9CCA970E-ECAF-4398-85D3-8C35D6F6B7F9', 'block','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'E9CC712D-6FEB-45DF-95BF-CC77EA3D4371'; insert into bfx_impl.declaration_main values ('E9CC712D-6FEB-45DF-95BF-CC77EA3D4371', 'IBG3BFKO2', '13', '09F40351-5356-476A-8A92-9144060732D0', 'block','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '45506DB9-B284-49C1-9A0D-D591640C7D8D'; insert into bfx_impl.declaration_main values ('45506DB9-B284-49C1-9A0D-D591640C7D8D', 'IBG3BFKO2', '14', '66E62F4E-115E-4F89-81D9-9BB97C0CECA5', 'legal','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'CF40F830-F1E1-4098-84C2-34EC0350BA1B'; insert into bfx_impl.declaration_main values ('CF40F830-F1E1-4098-84C2-34EC0350BA1B', 'IBG3BFKO2', '15', '601BAAC2-ABDC-4653-8136-DB905565F515', 'block','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '892D6329-E051-4836-BBA7-F8ACDD5747BA'; insert into bfx_impl.declaration_main values ('892D6329-E051-4836-BBA7-F8ACDD5747BA', 'IBG3BFKO2', '16', '388FF2C8-5AA9-4C12-B925-E11C02BF17CB', 'block','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = 'BCABDBA1-ADCB-40CC-AE32-BABA71F06A9A'; insert into bfx_impl.declaration_main values ('BCABDBA1-ADCB-40CC-AE32-BABA71F06A9A', 'IBG3BFKO2', '17', '89263462-564F-4053-A957-E18B69853A8A', 'legal','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '13392BB3-0B3D-4029-8926-E11B4B5DE46A'; insert into bfx_impl.declaration_main values ('13392BB3-0B3D-4029-8926-E11B4B5DE46A', 'IBG3BFKO2', '18', '5B0A2C95-48A6-474A-8EAC-E20136E0D586', 'block','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_main where id = '51A1BCB6-A32D-4CDF-8123-9475F47FC12A'; insert into bfx_impl.declaration_main values ('51A1BCB6-A32D-4CDF-8123-9475F47FC12A', 'IBG3BFKO2', '19', '29BCA012-F2CD-45B6-AC53-F05B4702F690', 'block','1900-01-01','2099-12-31');

-- Добавление строк мед деклараций Базис гарант 2.0 3 года
delete from bfx_impl.declaration_medical where id = '6C3CDF88-A21B-4DCF-9678-1289C6DA83C8'; insert into bfx_impl.declaration_medical values ('6C3CDF88-A21B-4DCF-9678-1289C6DA83C8', 'IBG3BFKO2Y', '1', '5BB87163-20AA-44C0-89B8-B2592A8DA1BF', 'underwriting','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_medical where id = '1453BE32-5F0F-4EE0-B63A-144FDB9A5838'; insert into bfx_impl.declaration_medical values ('1453BE32-5F0F-4EE0-B63A-144FDB9A5838', 'IBG3BFKO2Y', '2', 'F4456529-B33D-44E1-81FE-2F8B926447E2', 'underwriting','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_medical where id = '25ECEB77-219F-4272-B442-533EB95890AF'; insert into bfx_impl.declaration_medical values ('25ECEB77-219F-4272-B442-533EB95890AF', 'IBG3BFKO2Y', '2', '69A5FE4D-E101-41A8-A788-A26F9B31EED3', 'underwriting','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_medical where id = '8F537A9F-128E-4515-8A82-BA60F7CCE635'; insert into bfx_impl.declaration_medical values ('8F537A9F-128E-4515-8A82-BA60F7CCE635', 'IBG3BFKO2Y', '3', '82A21F00-3F43-42B1-82DD-FEFD034223AF', 'underwriting','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_medical where id = '34BE14AF-968A-4759-90EE-F979DE0077C6'; insert into bfx_impl.declaration_medical values ('34BE14AF-968A-4759-90EE-F979DE0077C6', 'IBG3BFKO2Y', '4', '9AC560C8-E14E-4B71-8F32-17FD9EBEFC65', 'underwriting','1900-01-01','2099-12-31');

delete from bfx_impl.declaration_medical where id = '3A6A335B-CCE3-49BB-90C5-D0B7C361FAC8'; insert into bfx_impl.declaration_medical values ('3A6A335B-CCE3-49BB-90C5-D0B7C361FAC8', 'IBG3BFKO2O', '1', '5BB87163-20AA-44C0-89B8-B2592A8DA1BF', 'underwriting','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_medical where id = '6B8B049D-691C-4C26-A7CF-49C2DEF38E04'; insert into bfx_impl.declaration_medical values ('6B8B049D-691C-4C26-A7CF-49C2DEF38E04', 'IBG3BFKO2O', '2', 'F4456529-B33D-44E1-81FE-2F8B926447E2', 'underwriting','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_medical where id = 'CF2DB7CF-3802-4540-92B2-6580C9FC2C75'; insert into bfx_impl.declaration_medical values ('CF2DB7CF-3802-4540-92B2-6580C9FC2C75', 'IBG3BFKO2O', '2', '69A5FE4D-E101-41A8-A788-A26F9B31EED3', 'underwriting','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_medical where id = 'B8A20A3D-9514-4340-9DCF-55A42AF82720'; insert into bfx_impl.declaration_medical values ('B8A20A3D-9514-4340-9DCF-55A42AF82720', 'IBG3BFKO2O', '3', '82A21F00-3F43-42B1-82DD-FEFD034223AF', 'underwriting','1900-01-01','2099-12-31');
delete from bfx_impl.declaration_medical where id = '37976832-74F2-41D8-8153-F0E08337E95A'; insert into bfx_impl.declaration_medical values ('37976832-74F2-41D8-8153-F0E08337E95A', 'IBG3BFKO2O', '4', '9AC560C8-E14E-4B71-8F32-17FD9EBEFC65', 'underwriting','1900-01-01','2099-12-31');
