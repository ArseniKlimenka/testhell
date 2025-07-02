delete from bfx_impl.declaration_main_questions where id = 'ED9A3214-171F-4BD7-8C06-769C6EBE25CA'; 
insert into bfx_impl.declaration_main_questions values ('ED9A3214-171F-4BD7-8C06-769C6EBE25CA', N'Страхователь обязуется не реже одного раза в год и/или по мере изменения идентификационных данных, указанных в настоящем договоре страхования, направлять Страховщику обновленные персональные данные по форме, предложенной Страховщиком. Непредоставление соответствующей информации Страховщик вправе расценить как неизменность сведений о Страхователе, установленных при его идентификации, и обновить идентификационные сведения на основе данных, представленных Страхователем ранее в сроки, установленные Федеральным законом от 07.08.2001 N 115-ФЗ «О противодействии легализации (отмыванию) доходов, полученных преступным путем, и финансированию терроризма».');

delete from bfx_impl.declaration_main where id = '2576A490-22A3-4EF1-960B-DB5024D926CC'; 
insert into bfx_impl.declaration_main values ('2576A490-22A3-4EF1-960B-DB5024D926CC', 'IBG5BFKO2', '10', 'ED9A3214-171F-4BD7-8C06-769C6EBE25CA', 'compliance','1900-01-01','2099-12-31');

UPDATE BFX_IMPL.DECLARATION_MAIN
SET ITEM_TEXT_ID = 'ED9A3214-171F-4BD7-8C06-769C6EBE25CA'   
WHERE ITEM_TEXT_ID = 'F064BCF0-BD96-40F1-AF0A-871E9D8022DC'
AND ITEM_NUMBER = '10' AND PRODUCT_CODE = 'IBG5BFKO2'
