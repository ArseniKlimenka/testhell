delete from BFX_IMPL.DECLARATION_MEDICAL
where PRODUCT_CODE = 'EBMGPB'

delete from bfx_impl.declaration_medical where id = 'AB2F89F1-9D12-4E1D-9A5A-F6026B6BB009'; insert into bfx_impl.declaration_medical values ('AB2F89F1-9D12-4E1D-9A5A-F6026B6BB009', 'EBMGPB', '1', 'E1CBC910-420F-4930-BA0E-99D0DF1F0695', 'underwriting','1900-01-01','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = '0200E171-CA1A-41A6-B422-985C0ABC7D36'; insert into bfx_impl.declaration_medical values ('0200E171-CA1A-41A6-B422-985C0ABC7D36', 'EBMGPB', '2', 'DD35DF9A-06FF-4E3B-895E-C8054E5646A5', 'underwriting','1900-01-01','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = 'D4C50B3F-BF4C-4670-A30B-EF95E36ECFCC'; insert into bfx_impl.declaration_medical values ('D4C50B3F-BF4C-4670-A30B-EF95E36ECFCC', 'EBMGPB', '3', 'F0C6B2EA-CF5E-47A4-80B3-C00B3A214DB2', 'underwriting','1900-01-01','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = '32E7C67D-2341-47C2-99E8-99923B2E49A5'; insert into bfx_impl.declaration_medical values ('32E7C67D-2341-47C2-99E8-99923B2E49A5', 'EBMGPB', '4', '344135E1-6F70-447C-8C56-0A0C684FC93A', 'underwriting','1900-01-01','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = '78241359-9C81-44CE-A13A-422AACF1E2E4'; insert into bfx_impl.declaration_medical values ('78241359-9C81-44CE-A13A-422AACF1E2E4', 'EBMGPB', '5', '28D2C65A-A2D3-41E7-89A6-25E5A40FD334', 'underwriting','1900-01-01','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = '5E941CF9-5FFF-462A-B29A-3BE463AE58AB'; insert into bfx_impl.declaration_medical values ('5E941CF9-5FFF-462A-B29A-3BE463AE58AB', 'EBMGPB', '6', 'AEA5B4AC-ABE6-42BD-9A6F-2733DFEE2E20', 'underwriting','1900-01-01','2099-12-31', 0);
delete from bfx_impl.declaration_medical where id = 'DC3D16D4-852C-401E-8AAE-376543542934'; insert into bfx_impl.declaration_medical values ('DC3D16D4-852C-401E-8AAE-376543542934', 'EBMGPB', '7', 'F6CD8FE4-4B77-4E4D-896B-1F4C02F04D4D', 'underwriting','1900-01-01','2099-12-31', 0);

delete from bfx_impl.declaration_main_questions where id = 'A36016B7-4975-4B48-971E-6330E295BB1B'; insert into bfx_impl.declaration_main_questions values ('A36016B7-4975-4B48-971E-6330E295BB1B', N'Общая страховая сумма в отношении Застрахованного по всем договорам страхования, заключенным с ООО СК «Росгосстрах Жизнь», включая настоящий договор страхования, не превышает: 
- 15 000 000 рублей в сумме по рискам «Смерть Застрахованного по любой причине», «Смерть Застрахованного по любой причине с отложенной страховой выплатой» и «Смерть Застрахованного по любой причине с освобождением от уплаты страховых взносов»;
- 15 000 000 рублей для Застрахованных в возрасте от 18 до 65 полных лет (включительно) на дату заключения договора страхования по риску «Смерть Застрахованного в результате несчастного случая».');

UPDATE BFX_IMPL.PRODUCTS
set DESCRIPTION = 'Драйвер Гарантия (2 года)'
where CODE = 'IDGP2PB'

UPDATE BFX_IMPL.PRODUCTS
set DESCRIPTION = 'Драйвер Гарантия (3 года)'
where CODE = 'IDGP3PB'

UPDATE BFX_IMPL.PRODUCTS
set DESCRIPTION = 'Драйвер Гарантия (5 лет)'
where CODE = 'IDGP5PB'