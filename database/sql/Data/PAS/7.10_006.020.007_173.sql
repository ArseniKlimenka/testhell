delete from bfx_impl.risks
 where code in ('DC1A20700','DC12A20700','DC1I20700','DC12I20700','DC123I20700','DDTPA20700','DDTP20700','DCDTP20700','IA20700','CD4A20700','CD7A20700','CD11A20700','CD18A20700','CD27A20700','CD38A20700')
insert into bfx_impl.risks
(ID, CODE, TYPE, BUSINESS_LINE, SHORT_DESCRIPTION, FULL_DESCRIPTION)
values
('96738E52-F54F-40EE-AD37-25CDA7CAE612', N'DC1A20700', N'nonLife', N'20700', N'ИНС 1, дет', N'Инвалидность Застрахованного с установлением категории «ребенок-инвалид» или I группы инвалидности в результате несчастного случая'),
('A090A7A2-D4DC-4850-B738-273EE22353B5', N'DC12A20700', N'nonLife', N'20700', N'ИНС 1,2, дет', N'Инвалидность Застрахованного с установлением категории «ребенок-инвалид» или I, II группы инвалидности в результате несчастного случая'),
('CE816F6C-604C-4C02-8D92-402DA22BD80C', N'DC1I20700', N'nonLife', N'20700', N'ИБ 1, дет', N'Инвалидность Застрахованного с установлением категории «ребенок-инвалид» или I группы инвалидности в результате болезни'),
('D3E3A3CE-2AFF-4244-8C2B-49B12DEA4ABF', N'DC12I20700', N'nonLife', N'20700', N'ИБ 1,2, дет', N'Инвалидность Застрахованного с установлением категории «ребенок-инвалид» или I, II группы инвалидности в результате болезни'),
('9E9CFBA8-B632-416E-910B-62F95F516617', N'DC123I20700', N'nonLife', N'20700', N'ИБ 1,2,3, дет', N'Инвалидность Застрахованного с установлением категории «ребенок-инвалид» или I, II, III группы инвалидности в результате болезни'),
('748A10B4-073D-47C6-B2E3-94357E760557', N'DDTPA20700', N'nonLife', N'20700', N'Смерть авиа', N'Смерть Застрахованного Лица в результате несчастного случая – аварии авиаперевозчика'),
('7AF9DA25-1A42-44DA-9EF8-A29ED260A049', N'DDTP20700', N'nonLife', N'20700', N'Смерть ДТП', N'Смерть Застрахованного Лица в результате несчастного случая – дорожно-транспортного происшествия'),
('0CC71EBD-341D-48FF-AA3D-268DF8AE8FA9', N'DCDTP20700', N'nonLife', N'20700', N'ИДТП 1,2,3, дет', N'Установление инвалидности Застрахованному Лицу в результате несчастного случая – дорожно-транспортного происшествия'),
('543ECFD9-FB06-46F8-A8B2-CC31E0C9270C', N'IA20700', N'nonLife', N'20700', N'Травма Асистанс', N'Травматические повреждения Застрахованного Лица, предусмотренные Таблицей страховых выплат при травматических повреждениях (согласно приложению к Правилам страхования) с возможностью направления страховой выплаты или её части на оплату услуг по Ассистансу'),
('7D4E1E94-E511-4F7C-AFF6-CCAC46F5D55A', N'CD4A20700', N'nonLife', N'20700', N'КЗ-4, ХО Б,ХО Б реком  Ассистанс', N'Наступление критического заболевания Застрахованного Лица, предусмотренного Договором страхования и определенного в соответствии с Перечнем критических заболеваний Дополнительных условий страхования на случай критических заболеваний – вариант Асистанс, (согласно приложению к Правилам страхования), впервые диагностированного врачом в течение срока страхования, с возможностью направления страховой выплаты или её части на оплату услуг по Ассистансу (4 заболевания): Злокачественные онкологические заболевания, Инфаркт миокарда, Почечная недостаточность, Инсульт.'),
('D0CC8982-3722-46BD-9B87-D0DA93936651', N'CD7A20700', N'nonLife', N'20700', N'КЗ-7 , ХО Б,ХО Б реком  Ассистанс', N'Наступление критического заболевания Застрахованного Лица, предусмотренного Договором страхования и определенного в соответствии с Перечнем критических заболеваний Дополнительных условий страхования на случай критических заболеваний – вариант Асистанс, (согласно приложению к Правилам страхования), впервые диагностированного врачом в течение срока страхования, с возможностью направления страховой выплаты или её части на оплату услуг по Ассистансу (7 заболеваний): Злокачественные онкологические заболевания, Инфаркт миокарда, Почечная недостаточность, Инсульт, Слепота (потеря зрения), Рассеянный склероз, Паралич.'),
('AB9C1E4F-B0D7-4CFA-8A8A-E3C32F66FABB', N'CD11A20700', N'nonLife', N'20700', N'КЗ-11, ХО Б,ХО Б реком  Асисстанс', N'Наступление критического заболевания Застрахованного Лица, предусмотренного Договором страхования и определенного в соответствии с Перечнем критических заболеваний Дополнительных условий страхования на случай критических заболеваний – вариант Асистанс, (согласно приложению к Правилам страхования), впервые диагностированного врачом в течение срока страхования, с возможностью направления страховой выплаты или её части на оплату услуг по Ассистансу (11 заболеваний): Злокачественные онкологические заболевания, Инфаркт миокарда, Почечная недостаточность, Инсульт, Слепота (потеря зрения), Рассеянный склероз, Паралич, Доброкачественная опухоль головного мозга, ВИЧ/СПИД вследствие переливания крови, Молниеносный вирусный гепатит, Терминальная стадия заболевания легких.'),
('079CA8CB-F771-4042-880F-EDDCEBBA6DC1', N'CD18A20700', N'nonLife', N'20700', N'КЗ-18, ХО Б,ХО Б реком  Асисстанс', N'Наступление критического заболевания Застрахованного Лица, предусмотренного Договором страхования и определенного в соответствии с Перечнем критических заболеваний Дополнительных условий страхования на случай критических заболеваний – вариант Асистанс, (согласно приложению к Правилам страхования), впервые диагностированного врачом в течение срока страхования, с возможностью направления страховой выплаты или её части на оплату услуг по Ассистансу (18 заболевания): Злокачественные онкологические заболевания, Инфаркт миокарда, Почечная недостаточность, Инсульт, Слепота (потеря зрения), Рассеянный склероз, Паралич, Доброкачественная опухоль головного мозга, ВИЧ/СПИД вследствие переливания крови, Молниеносный вирусный гепатит, Терминальная стадия заболевания легких, Апаллический синдром (вегетативное состояние), Бактериальный менингит, Глухота (Потеря слуха), Энцефалит (в том числе клещевой), Утрата способности к произношению речи, Обширные ожоги, Полиомиелит.'),
('71ED2DE8-9BD8-4222-ADC3-EF35C2793690', N'CD27A20700', N'nonLife', N'20700', N'КЗ-27, ХО Б,ХО Б реком  Асисстанс', N'Наступление критического заболевания Застрахованного Лица, предусмотренного Договором страхования и определенного в соответствии с Перечнем критических заболеваний Дополнительных условий страхования на случай критических заболеваний – вариант Асистанс, (согласно приложению к Правилам страхования), впервые диагностированного врачом в течение срока страхования, с возможностью направления страховой выплаты или её части на оплату услуг по Ассистансу (27 заболеваний): Злокачественные онкологические заболевания, Инфаркт миокарда, Почечная недостаточность, Инсульт, Слепота (потеря зрения), Рассеянный склероз, Паралич, Доброкачественная опухоль головного мозга, ВИЧ/СПИД вследствие переливания крови, Молниеносный вирусный гепатит, Терминальная стадия заболевания легких, Апаллический синдром (вегетативное состояние), Бактериальный менингит, Глухота (Потеря слуха), Энцефалит (в том числе клещевой), Утрата способности к произношению речи, Обширные ожоги, Полиомиелит, ВИЧинфицирование вследствие профессиональной медицинской деятельности, Кома, Заболевания мотонейронов, Болезнь Паркинсона (до 65 лет), Болезнь Альцгеймера (до 65 лет), Кардиомиопатия, Терминальная стадия заболевания печени, Мышечная дистрофия, Апластическая анемия.'),
('A65962F6-5A80-45EE-8EA0-F1402A8AF701', N'CD38A20700', N'nonLife', N'20700', N'КЗ-38, ХО Б,ХО Б реком  Асисстанс', N'Наступление критического заболевания Застрахованного Лица, предусмотренного Договором страхования и определенного в соответствии с Перечнем критических заболеваний Дополнительных условий страхования на случай критических заболеваний – вариант Асистанс, (согласно приложению к Правилам страхования), впервые диагностированного врачом в течение срока страхования, с возможностью направления страховой выплаты или её части на оплату услуг по Ассистансу (38 заболеваний): Злокачественные онкологические заболевания, Инфаркт миокарда, Почечная недостаточность, Инсульт, Слепота (потеря зрения), Рассеянный склероз, Паралич, Доброкачественная опухоль головного мозга, ВИЧ/СПИД вследствие переливания крови, Молниеносный вирусный гепатит, Терминальная стадия заболевания легких, Апаллический синдром (вегетативное состояние), Бактериальный менингит, Глухота (Потеря слуха), Энцефалит (в том числе клещевой), Утрата способности к произношению речи, Обширные ожоги, Полиомиелит, ВИЧинфицирование вследствие профессиональной медицинской деятельности, Кома, Заболевания мотонейронов, Болезнь Паркинсона (до 65 лет), Болезнь Альцгеймера (до 65 лет), Кардиомиопатия, Терминальная стадия заболевания печени, Мышечная дистрофия, Апластическая анемия, Острая лучевая болезнь, Острая печеночноклеточная недостаточность, Туберкулез, Сахарный диабет 1-го типа (инсулинозависимый), Ревматоидный артрит, Системная красная волчанка, Доброкачественная опухоль спинного мозга, Болезнь Крейтцфельдта – Якоба, Оптикомиелит (болезнь Девика), Спинальный инсульт, Анкилозирующий спондилоартрит (болезнь Бехтерева).')


update bfx_impl.risks
   set SHORT_DESCRIPTION = N'ППНТ НС таб/опр'
 where code = N'PDATD20700'
update bfx_impl.risks
   set SHORT_DESCRIPTION = N'ХО Б'
 where code = N'SOI20700'
update bfx_impl.risks
   set SHORT_DESCRIPTION = N'Госп НС'
 where code = N'HA20700'
update bfx_impl.risks
   set SHORT_DESCRIPTION = N'Тяжёлая травма'
 where code = N'HIA20700'
update bfx_impl.risks
   set SHORT_DESCRIPTION = N'Смерть Б'
 where code = N'DIL20700'
update bfx_impl.risks
   set SHORT_DESCRIPTION = N'ПЧУТ НС'
 where code = N'PPDA20700'
update bfx_impl.risks
   set SHORT_DESCRIPTION = N'Смерть НС'
 where code = N'DA20700'
update bfx_impl.risks
   set SHORT_DESCRIPTION = N'КЗ-15'
 where code = N'CD1520700'
update bfx_impl.risks
   set SHORT_DESCRIPTION = N'КЗ-6'
 where code = N'CD620700'
update bfx_impl.risks
   set SHORT_DESCRIPTION = N'КЗ-31'
 where code = N'CD3320700'
update bfx_impl.risks
   set SHORT_DESCRIPTION = N'ВНТ Б'
 where code = N'TDI20700'
update bfx_impl.risks
   set SHORT_DESCRIPTION = N'ВНТ НС'
 where code = N'TDA20700'
update bfx_impl.risks
   set SHORT_DESCRIPTION = N'Госп Б'
 where code = N'HI20700'
update bfx_impl.risks
   set SHORT_DESCRIPTION = N'Травма'
 where code = N'I20700'
update bfx_impl.risks
   set SHORT_DESCRIPTION = N'ХО НС'
 where code = N'SOA20700'
update bfx_impl.risks
   set SHORT_DESCRIPTION = N'ПЧУТ ЛП'
 where code = N'PPDAI20700'
update bfx_impl.risks
   set SHORT_DESCRIPTION = N'КЗ-22'
 where code = N'CD2220700'
update bfx_impl.risks
   set SHORT_DESCRIPTION = N'КЗ-11'
 where code = N'CD1120700'
update bfx_impl.risks
   set SHORT_DESCRIPTION = N'КЗ-44'
 where code = N'CD4720700'
update bfx_impl.risks
   set SHORT_DESCRIPTION = N'ИНС 1,2,3, дет'
 where code = N'DC123A20700'
update bfx_impl.risks
   set SHORT_DESCRIPTION = N'ППНТ НС таб'
 where code = N'PDAT20700'
update bfx_impl.risks
   set SHORT_DESCRIPTION = N'ППНТ Б таб'
 where code = N'PDIT20700'
 update bfx_impl.risks
   set SHORT_DESCRIPTION = N'ППНТ Б таб/опр'
 where code = N'PDITD20700'



 update bfx_impl.risks
   set full_description = N'Постоянная полная утрата трудоспособности Застрахованным Лицом произошедшая в результате несчастного случая, за исключением случаев, предусмотренных Правилами страхования, подпадающих под перечень нарушений здоровья, указанный в Таблице страховых выплат при постоянной полной утрате трудоспособности, либо повлекшая за собой нарушения здоровья, не указанные в Таблице страховых выплат при постоянной полной утрате трудоспособности (Приложении №2.5 к Правилам) и соответствующие определению понятия «Постоянная полная утрата трудоспособности», указанному в Правилах страхования.'
 where code = N'PDATD20700'
update bfx_impl.risks
   set full_description = N'Хирургические вмешательства в организм Застрахованного лица в связи с болезнью, предусмотренные таблицей выплат'
 where code = N'SOI20700'
update bfx_impl.risks
   set full_description = N'Госпитализация Застрахованного в результате несчастного случая'
 where code = N'HA20700'
update bfx_impl.risks
   set full_description = N'Тяжкие телесные повреждения Застрахованного в результате несчастного случая'
 where code = N'HIA20700'
update bfx_impl.risks
   set full_description = N'Постоянная частичная утрата трудоспособности Застрахованным Лицом в результате несчастного случая, за исключением случаев, предусмотренных Правилами страхования'
 where code = N'PPDA20700'
update bfx_impl.risks
   set full_description = N'Наступление критического заболевания Застрахованного Лица (15 заболеваний): Злокачественные онкологические заболевания, Хирургическое лечение коронарных артерий (коронарное шунтирование), Инфаркт миокарда, Почечная недостаточность, Инсульт, Трансплантация жизненно важных органов, Хирургическое лечение заболеваний аорты, Слепота (потеря зрения), Пересадка клапанов сердца, Рассеянный склероз, Паралич, Доброкачественная опухоль головного мозга, ВИЧ/СПИД вследствие переливания крови, Молниеносный вирусный гепатит, Терминальная стадия заболевания легких.'
 where code = N'CD1520700'
update bfx_impl.risks
   set full_description = N'Наступление критического заболевания Застрахованного Лица (6 заболеваний): Злокачественные онкологические заболевания, Хирургическое лечение коронарных артерий (коронарное шунтирование), Инфаркт миокарда, Почечная недостаточность, Инсульт, Трансплантация жизненно важных органов.'
 where code = N'CD620700'
update bfx_impl.risks
   set full_description = N'Наступление критического заболевания Застрахованного Лица (31 заболевание): Злокачественные онкологические заболевания, Хирургическое лечение коронарных артерий (коронарное шунтирование), Инфаркт 58 миокарда, Почечная недостаточность, Инсульт, Трансплантация жизненно важных органов, Хирургическое лечение заболеваний аорты, Слепота (потеря зрения), Пересадка клапанов сердца, Рассеянный склероз, Паралич, Доброкачественная опухоль головного мозга, ВИЧ/СПИД вследствие переливания крови, Молниеносный вирусный гепатит, Терминальная стадия заболевания легких, Апаллический синдром (вегетативное состояние), Бактериальный менингит, Глухота (Потеря слуха), Энцефалит (в том числе клещевой), Утрата способности к произношению речи, Обширные ожоги, Полиомиелит, ВИЧ-инфицирование вследствие профессиональной медицинской деятельности, Кома, Заболевания мотонейронов, Болезнь Паркинсона (до 65 лет), Болезнь Альцгеймера (до 65 лет), Кардиомиопатия, Терминальная стадия заболевания печени, Мышечная дистрофия, Апластическая анемия.'
 where code = N'CD3320700'
update bfx_impl.risks
   set full_description = N'Переломы, предусмотренные Таблицей страховых выплат при переломах согласно приложению к Правилам страхования за исключением случаев, предусмотренных Правилами страхования'
 where code = N'F20700'
update bfx_impl.risks
   set full_description = N'Госпитализация Застрахованного в результате болезни'
 where code = N'HI20700'
update bfx_impl.risks
   set full_description = N'Хирургические вмешательства в организм Застрахованного лица в связи с произошедшим с ним несчастным случаем, предусмотренные таблицей выплат'
 where code = N'SOA20700'
update bfx_impl.risks
   set full_description = N'Постоянная частичная утрата трудоспособности Застрахованным Лицом в результате несчастного случая или болезни, за исключением случаев, предусмотренных Правилами страхования'
 where code = N'PPDAI20700'
update bfx_impl.risks
   set full_description = N'Наступление критического заболевания Застрахованного Лица (22 заболевания): Злокачественные онкологические заболевания, Хирургическое лечение коронарных артерий (коронарное шунтирование), Инфаркт миокарда, Почечная недостаточность, Инсульт, Трансплантация жизненно важных органов, Хирургическое лечение заболеваний аорты, Слепота (потеря зрения), Пересадка клапанов сердца, Рассеянный склероз, Паралич, Доброкачественная опухоль головного мозга, ВИЧ/СПИД вследствие переливания крови, Молниеносный вирусный гепатит, Терминальная стадия заболевания легких, Апаллический синдром (вегетативное состояние), Бактериальный менингит, Глухота (Потеря слуха), Энцефалит (в том числе клещевой), Утрата способности к произношению речи, Обширные ожоги, Полиомиелит.'
 where code = N'CD2220700'
update bfx_impl.risks
   set full_description = N'Ожоги, предусмотренные Таблицей страховых выплат при переломах согласно приложению к Правилам страхования за исключением случаев, предусмотренных Правилами страхования'
 where code = N'B20700'
update bfx_impl.risks
   set full_description = N'Наступление критического заболевания Застрахованного Лица (11 заболеваний): Злокачественные онкологические заболевания, Хирургическое лечение коронарных артерий (коронарное шунтирование), Инфаркт миокарда, Почечная недостаточность, Инсульт, Трансплантация жизненно важных органов, Хирургическое лечение заболеваний аорты, Слепота (потеря зрения), Пересадка клапанов сердца, Рассеянный склероз, Паралич.'
 where code = N'CD1120700'
update bfx_impl.risks
   set full_description = N'Наступление критического заболевания Застрахованного Лица (44 заболевания): Злокачественные онкологические заболевания, Хирургическое лечение коронарных артерий (коронарное шунтирование), Инфаркт миокарда, Почечная недостаточность, Инсульт, Трансплантация жизненно важных органов, Хирургическое лечение заболеваний аорты, Слепота (потеря зрения), Пересадка клапанов сердца, Рассеянный склероз, Паралич, Доброкачественная опухоль головного мозга, ВИЧ/СПИД вследствие переливания крови, Молниеносный вирусный гепатит, Терминальная стадия заболевания легких, Апаллический синдром (вегетативное состояние), Бактериальный менингит, Глухота (Потеря слуха), Энцефалит (в том числе клещевой), Утрата способности к произношению речи, Обширные ожоги, Полиомиелит, ВИЧ-инфицирование вследствие профессиональной медицинской деятельности, Кома, Заболевания мотонейронов, Болезнь Паркинсона (до 65 лет), Болезнь Альцгеймера (до 65 лет), Кардиомиопатия, Терминальная стадия заболевания печени, Мышечная дистрофия, Апластическая анемия, Острая лучевая болезнь, Острая печеночно-клеточная недостаточность, Туберкулез, Сахарный диабет 1-го типа (инсулинозависимый), Оперативное лечение панкреонекроза, Ревматоидный артрит, Системная красная волчанка, Доброкачественная опухоль спинного мозга, Болезнь Крейтцфельдта – Якоба, Оптикомиелит (болезнь Девика), Спинальный инсульт, Хирургическое лечение легочной артерии, Анкилозирующий спондилоартрит (болезнь Бехтерева).'
 where code = N'CD4720700'
update bfx_impl.risks
   set full_description = N'Постоянная полная утрата трудоспособности Застрахованным Лицом произошедшая в результате несчастного случая, за исключением случаев, предусмотренных Правилами страхования, и подпадающая под перечень нарушений здоровья, указанный в Таблице страховых выплат при постоянной полной утрате трудоспособности.'
 where code = N'PDAT20700'
update bfx_impl.risks
   set full_description = N'Постоянная полная утрата трудоспособности Застрахованным Лицом произошедшая в результате болезни, за исключением случаев, предусмотренных Правилами страхования, и подпадающая под перечень нарушений здоровья, указанный в Таблице страховых выплат при постоянной полной утрате трудоспособности.'
 where code = N'PDIT20700'
update bfx_impl.risks
   set full_description = N'Постоянная полная утрата трудоспособности Застрахованным Лицом произошедшая в результате болезни, за исключением случаев, предусмотренных Правилами страхования, подпадающая под перечень нарушений здоровья, указанный в Таблице страховых выплат при постоянной полной утрате трудоспособности, либо повлекшая за собой нарушения здоровья, не указанные в Таблице страховых выплат при постоянной полной утрате трудоспособности и соответствующие определению понятия «Постоянная полная утрата трудоспособности», указанному в Правилах страхования.'
 where code = N'PDITD20700'