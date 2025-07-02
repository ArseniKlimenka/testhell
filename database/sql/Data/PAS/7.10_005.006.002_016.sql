-- remove risk E36404, replace with existing E36102
update bfx_impl.risk_product_relation
   set risk_code = 'E36102'
 where risk_code = 'E36404'
delete from bfx_impl.risks
 where code = 'E36404'

-- remove risk DNS36404, replace with existing DNS36102
update bfx_impl.risk_product_relation
   set risk_code = 'DNS36102'
 where risk_code = 'DNS36404'
delete from bfx_impl.risks
 where code = 'DNS36404'

-- remove risk DLPVV36404, replace with existing DPVV36102
update bfx_impl.risk_product_relation
   set risk_code = 'DPVV36102',
       conditions_function = null
 where risk_code = 'DLPVV36404'
delete from bfx_impl.risks
 where code = 'DLPVV36404'

-- remove risk CD36102, replace with existing CDP36404
update bfx_impl.risk_product_relation
   set risk_code = 'CDP36404',
       conditions_function = 'CDP36404ERCP'
 where risk_code = 'CD36102'
delete from bfx_impl.risks
 where code = 'CD36102'
 
 
 
-- change risk code from D36404 to DA36102
update bfx_impl.risk_product_relation
   set risk_code = 'DA36102',
       conditions_function = 'DA36102EHVP'
 where risk_code = 'D36404'
update bfx_impl.risks
   set code = 'DA36102',
       business_line = '36102'
 where code = 'D36404'

-- change risk code from CDP36404 to CDP36102
update bfx_impl.risk_product_relation
   set risk_code = 'CDP36102'
 where risk_code = 'CDP36404'
   and product_code = 'EHVP'
   and conditions_function is null
update bfx_impl.risk_product_relation
   set risk_code = 'CDP36102',
       conditions_function = 'CDP36102ERCP'
 where risk_code = 'CDP36404'
   and product_code = 'ERCP'
update bfx_impl.risk_product_relation
   set risk_code = 'CDP36102',
       conditions_function = 'CDP36102EHVP'
 where risk_code = 'CDP36404'
   and product_code = 'EHVP'
   and conditions_function is not null
update bfx_impl.risks
   set code = 'CDP36102',
       business_line = '36102'
 where code = 'CDP36404'
 
-- change risk code from CDH36404 to CDH10800
update bfx_impl.risk_product_relation
   set risk_code = 'CDH10800',
       conditions_function = 'CDH10800EHVP'
 where risk_code = 'CDH36404'
update bfx_impl.risk_product_relation
   set parent_risk = 'CDH10800'
 where parent_risk = 'CDH36404' 
update bfx_impl.risks
   set code = 'CDH10800',
       business_line = '10800',
       type = 'nonLife'
 where code = 'CDH36404'
 
-- change risk code from CU36404 to CU10800
update bfx_impl.risk_product_relation
   set risk_code = 'CU10800'
 where risk_code = 'CU36404'
update bfx_impl.risks
   set code = 'CU10800',
       business_line = '10800',
       type = 'nonLife'
 where code = 'CU36404'
 
 
-- risk full description update
update bfx_impl.risks
   set full_description = N'Инвалидность застрахованного с установлением I, II группы инвалидности по любой причине с освобождением от уплаты страховых взносов'
 where code = 'D36102'
update bfx_impl.risks
   set full_description = N'Инвалидность Застрахованного с установлением I, II группы инвалидности в результате несчастного случая с освобождением от уплаты страховых взносов'
 where code = 'DA36102' 
update bfx_impl.risks
   set full_description = N'Тяжкие телесные повреждения Застрахованного в результате несчастного случая'
 where code = 'HI36102'  
update bfx_impl.risks
   set full_description = N'Обращение Застрахованного за предоставлением медицинских или иных услуг, предусмотренных Программой ДМС «Диагностирование и лечение критического заболевания», вследствие расстройства здоровья или состояния Застрахованного, требующих получения таких услуг'
 where code = 'CDH10800'  
update bfx_impl.risks
   set full_description = N'Обращение Застрахованного за предоставлением медицинских или иных услуг, предусмотренных Программой ДМС «Медицинские обследования», в связи с необходимостью проведения профилактических мероприятий, снижающих степень опасных для жизни или здоровья Застрахованного угроз и/или устраняющих их'
 where code = 'CU10800'   