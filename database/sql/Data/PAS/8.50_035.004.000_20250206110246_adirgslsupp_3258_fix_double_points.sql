update BFX_IMPL.DECLARATION_MAIN
set ACTIVE_TO_DATE = '2025-02-20'
where PRODUCT_CODE in(
		'IBAKVP5PEVTB','IBAKVV5VTB',
		'IBAKVP5VTB','IBAKVV5PEVTB')
AND ACTIVE_FROM_DATE = '1900-01-01'
AND ITEM_NUMBER in(13,14,15,16,17,18,19,20,21)

update BFX_IMPL.DECLARATION_MAIN
set ACTIVE_TO_DATE = '2025-02-20'
where PRODUCT_CODE in(
		'IBAP5VTB','IBAV5VTB',
		'IBAP3VTB','IBAV3VTB')
AND ACTIVE_FROM_DATE in('2024-10-03', '2024-10-10')
AND ITEM_NUMBER in(13,14,15,16,17,18,19,20,21)

update BFX_IMPL.DECLARATION_MAIN
set ACTIVE_TO_DATE = '2025-02-20'
where PRODUCT_CODE in(
		'IDGP2VTB','IDGP2PPVTB',
		'IDGP3VTB','IDGP3PPVTB',
		'IDGP4VTB','IDGP4PPVTB',
		'IDGP5VTB','IDGP5PPVTB',
		'IDGP1VTB')
AND ACTIVE_FROM_DATE in('2024-10-03', '2024-10-10')
AND ITEM_NUMBER in(14,15,16,17,18,19,20,21)

update BFX_IMPL.DECLARATION_MAIN
set ACTIVE_TO_DATE = '2025-02-20'
where PRODUCT_CODE in(
		'IDGV2VTB','IDGV2PPVTB',
		'IDGV3VTB','IDGV3PPVTB',
		'IDGV4VTB','IDGV4PPVTB',
		'IDGV5VTB','IDGV5PPVTB',
		'IDGV1VTB')
AND ACTIVE_FROM_DATE in('2024-10-03', '2024-10-10')
AND ITEM_NUMBER in(14,15,16,17,18,19,20,21)

update BFX_IMPL.DECLARATION_MAIN
set ACTIVE_TO_DATE = '2025-02-20'
where PRODUCT_CODE in(
		'IDGPN2VTB','IDGPN2PPVTB',
		'IDGPN3VTB','IDGPN3PPVTB',
		'IDGPN4VTB','IDGPN4PPVTB',
		'IDGPN5VTB','IDGPN5PPVTB',
		'IDGPN1VTB')
AND ACTIVE_FROM_DATE in('2024-10-03', '2024-10-10')
AND ITEM_NUMBER in(14,15,16,17,18,19,20,21)

delete from BFX_IMPL.DECLARATION_MAIN 
where PRODUCT_CODE IN
		('IDGPN2VTB','IDGPN2PPVTB',
		'IDGPN3VTB','IDGPN3PPVTB',
		'IDGPN4VTB','IDGPN4PPVTB',
		'IDGPN5VTB','IDGPN5PPVTB',
		'IDGPN1VTB') AND ACTIVE_FROM_DATE IN('2025-02-01', '2025-02-21')

--IDGPN2PPVTB
delete from bfx_impl.declaration_main where id = '6CEB77DB-6FAD-4777-9BEE-FB45C0BA9B29'; insert into bfx_impl.declaration_main values ('6CEB77DB-6FAD-4777-9BEE-FB45C0BA9B29', 'IDGPN2PPVTB', '14', 'B8C8E53C-A654-466D-A790-0FFA1C88821F', 'legal','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = '6DE8F526-D9D1-44EE-9509-6CA14AE28E39'; insert into bfx_impl.declaration_main values ('6DE8F526-D9D1-44EE-9509-6CA14AE28E39', 'IDGPN2PPVTB', '15', 'F2C806BC-2A0E-4E0A-87A4-3A27CCB60D56', 'block','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = '58A5F886-1256-4D58-B7D0-35BC04811697'; insert into bfx_impl.declaration_main values ('58A5F886-1256-4D58-B7D0-35BC04811697', 'IDGPN2PPVTB', '16', 'C4C7D671-884A-4F2C-8A43-78E724EC0A46', 'block','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = 'C784444A-4C52-4F42-9223-E8BECCAC2C63'; insert into bfx_impl.declaration_main values ('C784444A-4C52-4F42-9223-E8BECCAC2C63', 'IDGPN2PPVTB', '17', '6B4D5A74-5195-4D1E-A8F0-818ACB048505', 'block','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = '680EFC4F-2FF2-4C69-B5B5-7DD0DCFCDB39'; insert into bfx_impl.declaration_main values ('680EFC4F-2FF2-4C69-B5B5-7DD0DCFCDB39', 'IDGPN2PPVTB', '18', '3AFDB7F0-6596-46C8-8903-5509A1D040DD', 'block','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = 'B50C58D1-CEA4-4FAD-8C12-881E4E40FFDD'; insert into bfx_impl.declaration_main values ('B50C58D1-CEA4-4FAD-8C12-881E4E40FFDD', 'IDGPN2PPVTB', '19', '3E868ECE-DA87-4F58-8B44-BC5B242DF53D', 'legal','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = '37DC09B2-D5F1-4D29-8FE2-AC13C1C15E86'; insert into bfx_impl.declaration_main values ('37DC09B2-D5F1-4D29-8FE2-AC13C1C15E86', 'IDGPN2PPVTB', '20', '2EF4FDBB-9DE8-425B-9E37-5AC1F147C9F4', 'block','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = 'B9E70B51-8F60-4D21-8891-FABB741ACB5B'; insert into bfx_impl.declaration_main values ('B9E70B51-8F60-4D21-8891-FABB741ACB5B', 'IDGPN2PPVTB', '21', '59F5D7C3-0E62-49DA-AD51-E343E5B8910A', 'block','2025-02-21','2099-01-01');

--IDGPN3PPVTB
delete from bfx_impl.declaration_main where id = '1B2F03CB-D792-4C39-B412-1C3AC1C5DAB9'; insert into bfx_impl.declaration_main values ('1B2F03CB-D792-4C39-B412-1C3AC1C5DAB9', 'IDGPN3PPVTB', '14', 'B8C8E53C-A654-466D-A790-0FFA1C88821F', 'legal','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = '87012BD7-AC26-40BD-8B3C-CD050D5A84FD'; insert into bfx_impl.declaration_main values ('87012BD7-AC26-40BD-8B3C-CD050D5A84FD', 'IDGPN3PPVTB', '15', 'F2C806BC-2A0E-4E0A-87A4-3A27CCB60D56', 'block','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = 'D11C8F03-6A0D-4F4D-93CE-1554A1AFE7A6'; insert into bfx_impl.declaration_main values ('D11C8F03-6A0D-4F4D-93CE-1554A1AFE7A6', 'IDGPN3PPVTB', '16', 'C4C7D671-884A-4F2C-8A43-78E724EC0A46', 'block','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = 'E9A7F7B1-BB5E-47A9-A08A-609BFFA7597D'; insert into bfx_impl.declaration_main values ('E9A7F7B1-BB5E-47A9-A08A-609BFFA7597D', 'IDGPN3PPVTB', '17', '6B4D5A74-5195-4D1E-A8F0-818ACB048505', 'block','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = 'E77C3B8A-B09A-46D1-B48C-4EE02A7C1959'; insert into bfx_impl.declaration_main values ('E77C3B8A-B09A-46D1-B48C-4EE02A7C1959', 'IDGPN3PPVTB', '18', '3AFDB7F0-6596-46C8-8903-5509A1D040DD', 'block','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = '28BE9FC1-7AE8-4E7A-8C12-71FDB894C3D1'; insert into bfx_impl.declaration_main values ('28BE9FC1-7AE8-4E7A-8C12-71FDB894C3D1', 'IDGPN3PPVTB', '19', '3E868ECE-DA87-4F58-8B44-BC5B242DF53D', 'legal','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = '42924366-4EEA-4AA4-AF5F-BCB19E479FDE'; insert into bfx_impl.declaration_main values ('42924366-4EEA-4AA4-AF5F-BCB19E479FDE', 'IDGPN3PPVTB', '20', '2EF4FDBB-9DE8-425B-9E37-5AC1F147C9F4', 'block','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = '6DD0C085-C6F5-4C64-95F9-D5AF9E2E2A35'; insert into bfx_impl.declaration_main values ('6DD0C085-C6F5-4C64-95F9-D5AF9E2E2A35', 'IDGPN3PPVTB', '21', '59F5D7C3-0E62-49DA-AD51-E343E5B8910A', 'block','2025-02-21','2099-01-01');

--IDGPN4PPVTB
delete from bfx_impl.declaration_main where id = '6344BEAA-0A11-4788-B41A-4FE2014F6550'; insert into bfx_impl.declaration_main values ('6344BEAA-0A11-4788-B41A-4FE2014F6550', 'IDGPN4PPVTB', '14', 'B8C8E53C-A654-466D-A790-0FFA1C88821F', 'legal','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = 'AED46450-E7CF-4213-B58E-3D439D0D1205'; insert into bfx_impl.declaration_main values ('AED46450-E7CF-4213-B58E-3D439D0D1205', 'IDGPN4PPVTB', '15', 'F2C806BC-2A0E-4E0A-87A4-3A27CCB60D56', 'block','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = 'C7C4CEE7-D22D-4DBB-89D0-650CF16B90A6'; insert into bfx_impl.declaration_main values ('C7C4CEE7-D22D-4DBB-89D0-650CF16B90A6', 'IDGPN4PPVTB', '16', 'C4C7D671-884A-4F2C-8A43-78E724EC0A46', 'block','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = '72FE7189-D073-432E-9A88-44810DD44A94'; insert into bfx_impl.declaration_main values ('72FE7189-D073-432E-9A88-44810DD44A94', 'IDGPN4PPVTB', '17', '6B4D5A74-5195-4D1E-A8F0-818ACB048505', 'block','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = 'D63FDC8D-5D00-4B22-9ED7-A5883D0B52F6'; insert into bfx_impl.declaration_main values ('D63FDC8D-5D00-4B22-9ED7-A5883D0B52F6', 'IDGPN4PPVTB', '18', '3AFDB7F0-6596-46C8-8903-5509A1D040DD', 'block','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = 'E79FBAB8-092B-4F04-8802-0BC5DDE572E5'; insert into bfx_impl.declaration_main values ('E79FBAB8-092B-4F04-8802-0BC5DDE572E5', 'IDGPN4PPVTB', '19', '3E868ECE-DA87-4F58-8B44-BC5B242DF53D', 'legal','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = '073EF8C4-D32D-4CBB-A762-4D753199CD90'; insert into bfx_impl.declaration_main values ('073EF8C4-D32D-4CBB-A762-4D753199CD90', 'IDGPN4PPVTB', '20', '2EF4FDBB-9DE8-425B-9E37-5AC1F147C9F4', 'block','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = '0CE8820F-3954-46E0-8D42-63876C210EA2'; insert into bfx_impl.declaration_main values ('0CE8820F-3954-46E0-8D42-63876C210EA2', 'IDGPN4PPVTB', '21', '59F5D7C3-0E62-49DA-AD51-E343E5B8910A', 'block','2025-02-21','2099-01-01');

--IDGPN5PPVTB
delete from bfx_impl.declaration_main where id = 'AABB232D-0E05-4013-9284-3624BE22DED0'; insert into bfx_impl.declaration_main values ('AABB232D-0E05-4013-9284-3624BE22DED0', 'IDGPN5PPVTB', '14', 'B8C8E53C-A654-466D-A790-0FFA1C88821F', 'legal','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = '75573A8D-E267-46A8-9383-502BC1D6D8F8'; insert into bfx_impl.declaration_main values ('75573A8D-E267-46A8-9383-502BC1D6D8F8', 'IDGPN5PPVTB', '15', 'F2C806BC-2A0E-4E0A-87A4-3A27CCB60D56', 'block','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = '3F1D4FE6-2E9D-4EC8-BB5D-F111ED6FE646'; insert into bfx_impl.declaration_main values ('3F1D4FE6-2E9D-4EC8-BB5D-F111ED6FE646', 'IDGPN5PPVTB', '16', 'C4C7D671-884A-4F2C-8A43-78E724EC0A46', 'block','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = '61E78638-0FB5-4E9E-AFDB-A3E02E8B9EC6'; insert into bfx_impl.declaration_main values ('61E78638-0FB5-4E9E-AFDB-A3E02E8B9EC6', 'IDGPN5PPVTB', '17', '6B4D5A74-5195-4D1E-A8F0-818ACB048505', 'block','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = '309F15D7-D667-4907-855E-21298CE7EC5E'; insert into bfx_impl.declaration_main values ('309F15D7-D667-4907-855E-21298CE7EC5E', 'IDGPN5PPVTB', '18', '3AFDB7F0-6596-46C8-8903-5509A1D040DD', 'block','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = '331E1AB5-0C28-49AE-BB76-93C31D623B6C'; insert into bfx_impl.declaration_main values ('331E1AB5-0C28-49AE-BB76-93C31D623B6C', 'IDGPN5PPVTB', '19', '3E868ECE-DA87-4F58-8B44-BC5B242DF53D', 'legal','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = '400FFBE2-E81D-4A64-9FE2-0BF428A8DDDF'; insert into bfx_impl.declaration_main values ('400FFBE2-E81D-4A64-9FE2-0BF428A8DDDF', 'IDGPN5PPVTB', '20', '2EF4FDBB-9DE8-425B-9E37-5AC1F147C9F4', 'block','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = '911902CC-0A7B-44E4-BBBB-56F61DBED8E2'; insert into bfx_impl.declaration_main values ('911902CC-0A7B-44E4-BBBB-56F61DBED8E2', 'IDGPN5PPVTB', '21', '59F5D7C3-0E62-49DA-AD51-E343E5B8910A', 'block','2025-02-21','2099-01-01');

--IDGPN2VTB
delete from bfx_impl.declaration_main where id = '37EB875A-14FB-454C-8252-2D4DFE464DD1'; insert into bfx_impl.declaration_main values ('37EB875A-14FB-454C-8252-2D4DFE464DD1', 'IDGPN2VTB', '14', '11664153-59DE-4529-9CDE-F0B248587E2F', 'legal','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = '254883F9-2324-4762-96DD-B380F8BB567A'; insert into bfx_impl.declaration_main values ('254883F9-2324-4762-96DD-B380F8BB567A', 'IDGPN2VTB', '15', 'E96FA5F9-A0C1-43DA-8197-A7BA90C54A02', 'block','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = '0630D447-CFE7-4AD7-A478-71BF66A1E47E'; insert into bfx_impl.declaration_main values ('0630D447-CFE7-4AD7-A478-71BF66A1E47E', 'IDGPN2VTB', '16', 'BB258FFA-8625-44EA-A825-4497C7459B78', 'block','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = 'EC553EDE-819D-40D7-88F8-D04FB549B7B9'; insert into bfx_impl.declaration_main values ('EC553EDE-819D-40D7-88F8-D04FB549B7B9', 'IDGPN2VTB', '17', 'E1A97824-B902-49A8-9E61-B35D9245526A', 'block','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = '4793DD92-426D-494D-8EB5-AF3A12EED613'; insert into bfx_impl.declaration_main values ('4793DD92-426D-494D-8EB5-AF3A12EED613', 'IDGPN2VTB', '18', 'C7B114F4-D5D8-4A8D-BCDE-B933775E25D9', 'block','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = '7171A865-DACA-4F0D-96E9-F8D10E45552D'; insert into bfx_impl.declaration_main values ('7171A865-DACA-4F0D-96E9-F8D10E45552D', 'IDGPN2VTB', '19', 'D7E5748C-2348-41A7-AA3F-7C91FF12DF69', 'legal','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = 'E1BA9DB5-AE86-4DFB-8976-B953B0F4ABCE'; insert into bfx_impl.declaration_main values ('E1BA9DB5-AE86-4DFB-8976-B953B0F4ABCE', 'IDGPN2VTB', '20', 'F21E052A-1B22-439E-8715-AE9C2B8F649C', 'block','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = 'DE06DD0A-754F-4D3A-A6A2-A488293D388A'; insert into bfx_impl.declaration_main values ('DE06DD0A-754F-4D3A-A6A2-A488293D388A', 'IDGPN2VTB', '21', 'C892052A-F001-4224-B6B8-F12010FBD00B', 'block','2025-02-21','2099-01-01');

--IDGPN3VTB
delete from bfx_impl.declaration_main where id = 'D5364C1A-A4CE-4616-94F2-2FCAE62FE2E7'; insert into bfx_impl.declaration_main values ('D5364C1A-A4CE-4616-94F2-2FCAE62FE2E7', 'IDGPN3VTB', '14', '11664153-59DE-4529-9CDE-F0B248587E2F', 'legal','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = 'C5D488B7-AE18-48EF-8EC9-64584BF78441'; insert into bfx_impl.declaration_main values ('C5D488B7-AE18-48EF-8EC9-64584BF78441', 'IDGPN3VTB', '15', 'E96FA5F9-A0C1-43DA-8197-A7BA90C54A02', 'block','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = 'BAD198E0-5F29-4F4A-A8E3-6627A1153557'; insert into bfx_impl.declaration_main values ('BAD198E0-5F29-4F4A-A8E3-6627A1153557', 'IDGPN3VTB', '16', 'BB258FFA-8625-44EA-A825-4497C7459B78', 'block','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = '236FEC3B-5401-451B-98BD-E3F88DE21E00'; insert into bfx_impl.declaration_main values ('236FEC3B-5401-451B-98BD-E3F88DE21E00', 'IDGPN3VTB', '17', 'E1A97824-B902-49A8-9E61-B35D9245526A', 'block','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = 'C22FF2F2-8849-4059-ADFA-FC1D8E9F64E9'; insert into bfx_impl.declaration_main values ('C22FF2F2-8849-4059-ADFA-FC1D8E9F64E9', 'IDGPN3VTB', '18', 'C7B114F4-D5D8-4A8D-BCDE-B933775E25D9', 'block','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = 'D64B78A2-D163-4C0C-AE70-5861A37E6BEE'; insert into bfx_impl.declaration_main values ('D64B78A2-D163-4C0C-AE70-5861A37E6BEE', 'IDGPN3VTB', '19', 'D7E5748C-2348-41A7-AA3F-7C91FF12DF69', 'legal','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = '128975AA-8924-4E26-BBBF-83876F030316'; insert into bfx_impl.declaration_main values ('128975AA-8924-4E26-BBBF-83876F030316', 'IDGPN3VTB', '20', 'F21E052A-1B22-439E-8715-AE9C2B8F649C', 'block','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = 'B5807FFB-538D-4C4D-8644-0EDE0DAEF2B9'; insert into bfx_impl.declaration_main values ('B5807FFB-538D-4C4D-8644-0EDE0DAEF2B9', 'IDGPN3VTB', '21', 'C892052A-F001-4224-B6B8-F12010FBD00B', 'block','2025-02-21','2099-01-01');

--IPDGN4VTB
delete from bfx_impl.declaration_main where id = '13D34ECB-3D95-41F8-88CE-6AD73DBC623F'; insert into bfx_impl.declaration_main values ('13D34ECB-3D95-41F8-88CE-6AD73DBC623F', 'IDGPN4VTB', '14', '11664153-59DE-4529-9CDE-F0B248587E2F', 'legal','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = 'EDAEF67D-7B29-4ADB-91F6-9C67AE18CC43'; insert into bfx_impl.declaration_main values ('EDAEF67D-7B29-4ADB-91F6-9C67AE18CC43', 'IDGPN4VTB', '15', 'E96FA5F9-A0C1-43DA-8197-A7BA90C54A02', 'block','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = 'C9AFBE0D-B917-4E3A-8879-2C5863195278'; insert into bfx_impl.declaration_main values ('C9AFBE0D-B917-4E3A-8879-2C5863195278', 'IDGPN4VTB', '16', 'BB258FFA-8625-44EA-A825-4497C7459B78', 'block','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = '3217DCB0-945B-4896-9001-F02CF4D96E85'; insert into bfx_impl.declaration_main values ('3217DCB0-945B-4896-9001-F02CF4D96E85', 'IDGPN4VTB', '17', 'E1A97824-B902-49A8-9E61-B35D9245526A', 'block','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = 'F843216F-9526-4D4D-83E0-0D790414A9D4'; insert into bfx_impl.declaration_main values ('F843216F-9526-4D4D-83E0-0D790414A9D4', 'IDGPN4VTB', '18', 'C7B114F4-D5D8-4A8D-BCDE-B933775E25D9', 'block','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = '7F573ED3-2963-4856-94BE-E53F344D8CBC'; insert into bfx_impl.declaration_main values ('7F573ED3-2963-4856-94BE-E53F344D8CBC', 'IDGPN4VTB', '19', 'D7E5748C-2348-41A7-AA3F-7C91FF12DF69', 'legal','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = '4F13B324-099A-4D2D-B130-31CDCA64D3F6'; insert into bfx_impl.declaration_main values ('4F13B324-099A-4D2D-B130-31CDCA64D3F6', 'IDGPN4VTB', '20', 'F21E052A-1B22-439E-8715-AE9C2B8F649C', 'block','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = '53055033-A9B5-473C-82AD-BC0E7A692CAD'; insert into bfx_impl.declaration_main values ('53055033-A9B5-473C-82AD-BC0E7A692CAD', 'IDGPN4VTB', '21', 'C892052A-F001-4224-B6B8-F12010FBD00B', 'block','2025-02-21','2099-01-01');

--IDGPN5VTB
delete from bfx_impl.declaration_main where id = '2A723C1D-9355-4E5F-A837-A305D0A1180E'; insert into bfx_impl.declaration_main values ('2A723C1D-9355-4E5F-A837-A305D0A1180E', 'IDGPN5VTB', '14', '11664153-59DE-4529-9CDE-F0B248587E2F', 'legal','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = '1001BEE7-B617-4795-97DC-A2884977012C'; insert into bfx_impl.declaration_main values ('1001BEE7-B617-4795-97DC-A2884977012C', 'IDGPN5VTB', '15', 'E96FA5F9-A0C1-43DA-8197-A7BA90C54A02', 'block','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = 'BD71276B-9F52-4B42-AA9C-D6C6B0630D78'; insert into bfx_impl.declaration_main values ('BD71276B-9F52-4B42-AA9C-D6C6B0630D78', 'IDGPN5VTB', '16', 'BB258FFA-8625-44EA-A825-4497C7459B78', 'block','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = '0733633C-F217-40F7-A88B-6131716F4192'; insert into bfx_impl.declaration_main values ('0733633C-F217-40F7-A88B-6131716F4192', 'IDGPN5VTB', '17', 'E1A97824-B902-49A8-9E61-B35D9245526A', 'block','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = 'CACF2D05-4302-4736-901B-C463DE39F9C2'; insert into bfx_impl.declaration_main values ('CACF2D05-4302-4736-901B-C463DE39F9C2', 'IDGPN5VTB', '18', 'C7B114F4-D5D8-4A8D-BCDE-B933775E25D9', 'block','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = '4285E032-34E9-42E1-9381-A619EAF36EB7'; insert into bfx_impl.declaration_main values ('4285E032-34E9-42E1-9381-A619EAF36EB7', 'IDGPN5VTB', '19', 'D7E5748C-2348-41A7-AA3F-7C91FF12DF69', 'legal','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = '7098A351-526B-47FE-8722-F46207E8A829'; insert into bfx_impl.declaration_main values ('7098A351-526B-47FE-8722-F46207E8A829', 'IDGPN5VTB', '20', 'F21E052A-1B22-439E-8715-AE9C2B8F649C', 'block','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = 'ADB2AF84-112E-40E7-A1B9-7EDA8936E66D'; insert into bfx_impl.declaration_main values ('ADB2AF84-112E-40E7-A1B9-7EDA8936E66D', 'IDGPN5VTB', '21', 'C892052A-F001-4224-B6B8-F12010FBD00B', 'block','2025-02-21','2099-01-01');

--IDGPN1VTB
delete from bfx_impl.declaration_main where id = '6BD33DC5-4217-4821-8D56-828A9C380268'; insert into bfx_impl.declaration_main values ('6BD33DC5-4217-4821-8D56-828A9C380268', 'IDGPN1VTB', '14', '6FF5A463-A327-4854-A7BB-333FFF09AEF8', 'legal','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = 'A1DD897B-4846-4C37-B92E-925993430363'; insert into bfx_impl.declaration_main values ('A1DD897B-4846-4C37-B92E-925993430363', 'IDGPN1VTB', '15', 'E903BE5D-571E-41C4-B589-54B270209B15', 'block','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = 'C1451974-CEC3-4064-940C-481421C70242'; insert into bfx_impl.declaration_main values ('C1451974-CEC3-4064-940C-481421C70242', 'IDGPN1VTB', '16', '0626175B-86E4-44F7-A818-5653160AB92C', 'block','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = '66F37884-DF01-4F5B-93A3-4A842FC82D3C'; insert into bfx_impl.declaration_main values ('66F37884-DF01-4F5B-93A3-4A842FC82D3C', 'IDGPN1VTB', '17', 'C803CFC2-E770-4A26-B1EE-265A1561060E', 'block','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = '7B564A05-E576-407A-99C1-D83E8C7C89DD'; insert into bfx_impl.declaration_main values ('7B564A05-E576-407A-99C1-D83E8C7C89DD', 'IDGPN1VTB', '18', 'EF742385-E4FF-48AE-A64D-A4C6960A047C', 'block','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = 'A1EB391B-224B-4083-AE1B-4A64ACFD703D'; insert into bfx_impl.declaration_main values ('A1EB391B-224B-4083-AE1B-4A64ACFD703D', 'IDGPN1VTB', '19', '0B746533-F48F-43E4-B514-0FBF89F1D27A', 'legal','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = '6FD85C00-CD79-4D43-A4BD-212116C20214'; insert into bfx_impl.declaration_main values ('6FD85C00-CD79-4D43-A4BD-212116C20214', 'IDGPN1VTB', '20', '3096E0DD-A60A-4DA8-9FE5-7B11DC181356', 'block','2025-02-21','2099-01-01');
delete from bfx_impl.declaration_main where id = '45744EB5-359E-47C5-877C-C7D2299C31F5'; insert into bfx_impl.declaration_main values ('45744EB5-359E-47C5-877C-C7D2299C31F5', 'IDGPN1VTB', '21', '8AC7720D-020F-4876-BCD4-31AAA34BA4F6', 'block','2025-02-21','2099-01-01');


