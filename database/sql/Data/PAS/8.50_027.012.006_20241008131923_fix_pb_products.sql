update bfx_impl.products
set description = 'Драйвер Гарантия (2 года)'
where code = 'IDGP2PB'

update bfx_impl.products
set description = 'Драйвер Гарантия (3 года)'
where code = 'IDGP3PB'

update bfx_impl.declaration_main
set departament = 'underwritting'
where product_code = 'EBMGPB' AND ITEM_NUMBER IN(1,2)

update bfx_impl.declaration_main
set departament = 'compliance'
where product_code = 'EBMGPB' AND ITEM_NUMBER IN(3,4,5,6,7,8,9,10)

update bfx_impl.declaration_main
set departament = 'legal'
where product_code = 'EBMGPB' AND ITEM_NUMBER IN(11,14,17)

update bfx_impl.declaration_main
set departament = 'block'
where product_code = 'EBMGPB' AND ITEM_NUMBER IN(12,13,15,16)