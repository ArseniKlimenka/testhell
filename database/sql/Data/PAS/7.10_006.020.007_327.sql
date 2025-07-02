-- Правка кода продукта мед деклараций Стратегия на пять гарант реинвест
update bfx_impl.declaration_medical
   set product_code = 'EBMGREINVEST'
where product_code = 'EBMGREINVESTY'
