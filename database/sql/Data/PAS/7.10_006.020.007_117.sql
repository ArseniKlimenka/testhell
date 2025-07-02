
--Декларация Базис гарант 5 БФКО 80лет
delete from bfx_impl.declaration_medical_questions where id = '599FB9E4-D488-424B-9AE2-B0187BE1EE40'; insert into bfx_impl.declaration_medical_questions values ('599FB9E4-D488-424B-9AE2-B0187BE1EE40', N'Являюсь лицом в возрасте от 18 и до 80 полных лет на дату заключения договора страхования.');
delete from bfx_impl.declaration_medical_questions where id = '1A3DEF9D-18FD-4FE1-A1F4-952726F1D44F'; insert into bfx_impl.declaration_medical_questions values ('1A3DEF9D-18FD-4FE1-A1F4-952726F1D44F', N'Не являюсь и не являлся (не являлась) инвалидом и не подавал(а) документы на освидетельствование для получения группы инвалидности, не имел(а), не проходил(а) лечения и не страдаю в настоящее время от онкологических заболеваний, болезней сердечно-сосудистой системы (инфаркт миокарда, инсульт, стенокардия, тромбоз, сердечно-сосудистая недостаточность), каких-либо заболеваний головного мозга, печени (гепатит В или С, цирроз печени), сахарного диабета I типа; неврологических или психических расстройств (эпилепсия, паралич, алкоголизм, наркомания), СПИД или ВИЧ-инфекции.');
delete from bfx_impl.declaration_medical_questions where id = 'B327BB98-0456-40B5-81B5-17894AA5A66C'; insert into bfx_impl.declaration_medical_questions values ('B327BB98-0456-40B5-81B5-17894AA5A66C', N'Не являюсь и не являлся (не являлась) инвалидом I группы и не подавал(а) документы на освидетельствование для получения группы инвалидности, не имел(а), не проходил(а) лечения и не страдаю в настоящее время от онкологических заболеваний, болезней сердечно-сосудистой системы (инфаркт миокарда, инсульт, стенокардия, тромбоз, сердечно-сосудистая недостаточность), каких-либо заболеваний головного мозга, печени (гепатит В или С, цирроз печени), сахарного диабета I типа; неврологических или психических расстройств (эпилепсия, паралич, алкоголизм, наркомания), СПИД или ВИЧ-инфекции.');

delete from bfx_impl.declaration_medical where id = '7EE0692F-E7AF-4025-AE29-B807B1F43B90'; insert into bfx_impl.declaration_medical values ('7EE0692F-E7AF-4025-AE29-B807B1F43B90', 'IBG5BFKOY', '1', '599FB9E4-D488-424B-9AE2-B0187BE1EE40', 'underwriting');	delete from bfx_impl.declaration_medical where id = '0C7CAAA5-5A65-41B0-A236-F3EDC114BE20'; insert into bfx_impl.declaration_medical values ('0C7CAAA5-5A65-41B0-A236-F3EDC114BE20', 'IBG5BFKOO', '1', '599FB9E4-D488-424B-9AE2-B0187BE1EE40', 'underwriting');
delete from bfx_impl.declaration_medical where id = '73002DC1-A8AB-4CEE-A7D9-155D949D9CEA'; insert into bfx_impl.declaration_medical values ('73002DC1-A8AB-4CEE-A7D9-155D949D9CEA', 'IBG5BFKOY', '2', '1A3DEF9D-18FD-4FE1-A1F4-952726F1D44F', 'underwriting');	
delete from bfx_impl.declaration_medical where id = '81612820-233F-4D72-B849-9DDB55AEF297'; insert into bfx_impl.declaration_medical values ('81612820-233F-4D72-B849-9DDB55AEF297', 'IBG5BFKOO', '2', 'B327BB98-0456-40B5-81B5-17894AA5A66C', 'underwriting');


UPDATE BFX_IMPL.DECLARATION_MEDICAL
   SET ITEM_TEXT_ID = '599FB9E4-D488-424B-9AE2-B0187BE1EE40'   
 WHERE PRODUCT_CODE = 'IBG5BFKOY'
   AND ITEM_NUMBER = '1'
   UPDATE BFX_IMPL.DECLARATION_MEDICAL
   SET ITEM_TEXT_ID = '599FB9E4-D488-424B-9AE2-B0187BE1EE40'   
 WHERE PRODUCT_CODE = 'IBG5BFKOO'
   AND ITEM_NUMBER = '1'
   UPDATE BFX_IMPL.DECLARATION_MEDICAL
   SET ITEM_TEXT_ID = '1A3DEF9D-18FD-4FE1-A1F4-952726F1D44F'   
 WHERE PRODUCT_CODE = 'IBG5BFKOY'
   AND ITEM_NUMBER = '2'
   UPDATE BFX_IMPL.DECLARATION_MEDICAL
   SET ITEM_TEXT_ID = 'B327BB98-0456-40B5-81B5-17894AA5A66C'   
 WHERE PRODUCT_CODE = 'IBG5BFKOO'
   AND ITEM_NUMBER = '2'