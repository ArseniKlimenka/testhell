-- fill table bfx_impl.risk_program
delete from bfx_impl.risk_program
insert into bfx_impl.risk_program
values
(N'462bd9f9-6497-4f72-8a64-f7c2959b54bf', N'main', N'Основная'),
(N'cbc0dbfa-484a-41d5-89f9-7b1cf37824cc', N'additional', N'Дополнительная')


-- fill table bfx_impl.risk_person
delete from bfx_impl.risk_person
insert into bfx_impl.risk_person
values
(N'9c3d6395-a94e-4459-a591-62e54b7a0b66', N'policyHolder', N'Страхователь'),
(N'2786cc5c-942b-4f44-8ff1-c4cd6dd96706', N'insuredPerson', N'Застрахованный')


-- fill column risk_program in table bfx_impl.risk_product_relation
update bfx_impl.risk_product_relation
   set risk_program = null;
 
update bfx_impl.risk_product_relation
   set risk_program = 'additional'
 where (product_code = 'EFRBFKO' and risk_code in ('DNS36404', 'DTP36404', 'CTDA36404', 'DASS36404', 'CDP36404', 'CDHR10800', 'CDHW10800', 'CDVV36404'))
    or (product_code = 'ERCP' and risk_code in ('CDP36102', 'HI36102'))
    or (product_code = 'ERCP2' and risk_code in ('CD36404', 'HI36404'));
    
update bfx_impl.risk_product_relation
   set risk_program = 'main'
 where risk_program is null;


-- fill column risk_person in table bfx_impl.risk_product_relation
update bfx_impl.risk_product_relation
   set risk_person = null;
 
update bfx_impl.risk_product_relation
   set risk_person = 'policyHolder'
 where (product_code = 'EFRBFKO' and risk_code in ('CDVV36404'))
    or (product_code = 'EHVP' and risk_code in ('DA36102'))
    or (product_code = 'EHVP2' and risk_code in ('DA36404'))
    or (product_code = 'EPCLZENIT' and risk_code in ('D36404'))
    or (product_code = 'EPGPAKBARS' and risk_code in ('D36404', 'JL36404'))
    or (product_code = 'EPGPZENIT' and risk_code in ('D36404', 'JL36404'))
    or (product_code = 'ERC' and risk_code in ('D36102'))
    or (product_code = 'ERC2' and risk_code in ('D36404'))
    or (product_code = 'ERCP' and risk_code in ('D36102', 'JL36102'))
    or (product_code = 'ERCP2' and risk_code in ('D36404', 'JL36404'))
    
update bfx_impl.risk_product_relation
   set risk_person = 'insuredPerson'
 where risk_person is null;