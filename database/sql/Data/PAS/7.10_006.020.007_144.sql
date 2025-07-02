--Изменение декларации Базис гарант БФКО
delete from bfx_impl.declaration_medical WHERE PRODUCT_CODE = 'IBG5BFKOY' AND ITEM_NUMBER = '1' 
insert into bfx_impl.declaration_medical values ('1B77F8E8-90F1-4A96-B661-4574C8874C71', 'IBG5BFKOY', '1', '441c87ab-ad5e-4b10-88fe-3797468c5f78', 'underwriting');
 
delete from bfx_impl.declaration_medical WHERE PRODUCT_CODE = 'IBG5BFKOO' AND ITEM_NUMBER = '1' 
insert into bfx_impl.declaration_medical values ('3E5E7258-E64E-4631-A096-5E52950AC174', 'IBG5BFKOO', '1', '441c87ab-ad5e-4b10-88fe-3797468c5f78', 'underwriting');

delete from bfx_impl.declaration_medical WHERE PRODUCT_CODE = 'IBG5BFKOY' AND ITEM_NUMBER = '2' 
insert into bfx_impl.declaration_medical values ('E56179FF-CF93-44E6-8CE8-5935E3139427', 'IBG5BFKOY', '2', '7dd4dd8a-ef2d-443e-897b-663b5079d9a2', 'underwriting');
 
delete from bfx_impl.declaration_medical WHERE PRODUCT_CODE = 'IBG5BFKOO' AND ITEM_NUMBER = '2' 
insert into bfx_impl.declaration_medical values ('DDBE67BC-EB5F-497A-BB3C-66F84795A211', 'IBG5BFKOO', '2', '318dbfb7-ff59-4f12-8800-6bd34b911574', 'underwriting');
