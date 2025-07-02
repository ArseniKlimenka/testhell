-- clean
delete from bfx_impl.declaration_medical
 where product_code = N'EBMBFKO' 
delete from bfx_impl.declaration_medical_questions
 where id not in (select item_text_id from bfx_impl.declaration_medical) 

-- bfx_impl.declaration_medical_questions
delete from bfx_impl.declaration_medical_questions where id = '8fb7dd5a-d614-420e-b704-1f0a63d7e802'; insert into bfx_impl.declaration_medical_questions values ('8fb7dd5a-d614-420e-b704-1f0a63d7e802', N'не являюсь и не являлся (не являлась) ранее инвалидом');
delete from bfx_impl.declaration_medical_questions where id = '388ce7f3-c8db-4c6e-8bcb-1fedf514ce92'; insert into bfx_impl.declaration_medical_questions values ('388ce7f3-c8db-4c6e-8bcb-1fedf514ce92', N'не являюсь и не являлся (не являлась) ранее инвалидом I - II группы');
delete from bfx_impl.declaration_medical_questions where id = '0f865628-9e29-46b3-b422-27a58b1c044a'; insert into bfx_impl.declaration_medical_questions values ('0f865628-9e29-46b3-b422-27a58b1c044a', N'не подавал(а) документы на освидетельствование для получения группы инвалидности и не имею оснований для присвоения группы инвалидности');
delete from bfx_impl.declaration_medical_questions where id = '4d873f10-7e95-410d-8737-371f90705468'; insert into bfx_impl.declaration_medical_questions values ('4d873f10-7e95-410d-8737-371f90705468', N'не употребляю и не употреблял(а) ранее наркотики, токсичные вещества, не страдаю алкоголизмом, не состою и не состоял(а) ранее на учете в наркологическом диспансере, психоневрологическом, туберкулезном диспансере, центрах профилактики борьбы со СПИДом');
delete from bfx_impl.declaration_medical_questions where id = '58249a4a-1a05-49be-a63d-3c212e52fb80'; insert into bfx_impl.declaration_medical_questions values ('58249a4a-1a05-49be-a63d-3c212e52fb80', N'не имел(а), не обращался (не обращалась) за медицинской помощью по нижеперечисленным заболеваниям и не страдаю ими в настоящее время:
- доброкачественные или злокачественные опухоли;
- заболевания, вызванные воздействием радиации;
- СПИД и другие заболевания, связанные с вирусом иммунодефицита человека;
- нервные или психические расстройства или заболевания (например: эпилепсия, паралич, болезнь Паркинсона);
- заболевания сердечно-сосудистой системы (например: гипертоническая болезнь II-III степени, ишемическая болезнь сердца, стенокардия, инфаркт миокарда, порок сердца, нарушения сердечного ритма, инсульт, тромбоз);
- заболевания дыхательной системы (например: хроническая обструктивная болезнь легких, саркоидоз, туберкулез легких);
- заболевания крови и кроветворной системы;
- заболевания почек (например: хроническая почечная недостаточность, поликистоз почек, гломерулонефрит);
- заболевания печени (цирроз печени, гепатит В, С, D, E);
- заболевания желудочно-кишечного тракта (за исключением пищевых отравлений, гастрита);
- заболевания эндокринной системы (например: тиреотоксикоз, сахарный диабет I-II типа, заболевания гипофиза)');
delete from bfx_impl.declaration_medical_questions where id = 'a89be899-dfab-4d38-aafb-89cd9e3e5c42'; insert into bfx_impl.declaration_medical_questions values ('a89be899-dfab-4d38-aafb-89cd9e3e5c42', N'не имел(а), не обращался (не обращалась) за медицинской помощью по нижеперечисленным заболеваниям и не страдаю ими в настоящее время:
- доброкачественные или злокачественные опухоли;
- заболевания, вызванные воздействием радиации;
- СПИД и другие заболевания, связанные с вирусом иммунодефицита человека;
- нервные или психические расстройства или заболевания (например: эпилепсия, паралич, болезнь Паркинсона);
- заболевания сердечно-сосудистой системы (например: ишемическая болезнь сердца, стенокардия, инфаркт миокарда, порок сердца, нарушения сердечного ритма, инсульт, тромбоз);
- заболевания печени (цирроз печени, гепатит В, С, D, E)');
delete from bfx_impl.declaration_medical_questions where id = 'c0883fda-4302-4031-9976-9156c80d83f3'; insert into bfx_impl.declaration_medical_questions values ('c0883fda-4302-4031-9976-9156c80d83f3', N'не имел(а), не обращался (не обращалась) за медицинской помощью по нижеперечисленным заболеваниям и не страдаю ими в настоящее время:
- злокачественные опухоли;
- нервные или психические расстройства или заболевания (например: эпилепсия, паралич, болезнь Паркинсона);
- заболевания сердечно-сосудистой системы (например: ишемическая болезнь сердца, стенокардия, инфаркт миокарда, инсульт)');
delete from bfx_impl.declaration_medical_questions where id = 'f6d94e77-e38e-46c9-897c-92d401e1c5ad'; insert into bfx_impl.declaration_medical_questions values ('f6d94e77-e38e-46c9-897c-92d401e1c5ad', N'не прохожу службу в вооруженных силах, не занят(а) в профессиональной или непрофессиональной авиации, в работах со взрывчатыми и радиоактивными веществами, подземных работах, не являюсь водолазом, пожарным, скалолазом, работником ядерной промышленности, нефтяником (за исключением офисных сотрудников), охранником и профессиональным спортсменом, не работаю с оружием');
delete from bfx_impl.declaration_medical_questions where id = '1b758e2b-659f-4e8a-962f-d8ea5e5d4518'; insert into bfx_impl.declaration_medical_questions values ('1b758e2b-659f-4e8a-962f-d8ea5e5d4518', N'не намереваюсь путешествовать на территории, на которой объявлено чрезвычайное положение или проводятся боевые действия');
delete from bfx_impl.declaration_medical_questions where id = '773585c9-02a1-4a07-af33-dfdfe6ab179a'; insert into bfx_impl.declaration_medical_questions values ('773585c9-02a1-4a07-af33-dfdfe6ab179a', N'не нахожусь под следствием и не являюсь осужденным к лишению свободы.');

-- bfx_impl.declaration_medical
delete from bfx_impl.declaration_medical where id = '9fa6cf72-4aa0-40cc-b317-047175d5763d'; insert into bfx_impl.declaration_medical values ('9fa6cf72-4aa0-40cc-b317-047175d5763d', 'EBMBFKO', '1', '8fb7dd5a-d614-420e-b704-1f0a63d7e802', 'underwriting');
delete from bfx_impl.declaration_medical where id = 'b499c857-c278-43aa-bf64-15e20d6e08f9'; insert into bfx_impl.declaration_medical values ('b499c857-c278-43aa-bf64-15e20d6e08f9', 'EBMBFKO', '2', '388ce7f3-c8db-4c6e-8bcb-1fedf514ce92', 'underwriting');
delete from bfx_impl.declaration_medical where id = 'eb32a355-a74e-4db9-b88f-3b34a962fae1'; insert into bfx_impl.declaration_medical values ('eb32a355-a74e-4db9-b88f-3b34a962fae1', 'EBMBFKO', '3', '0f865628-9e29-46b3-b422-27a58b1c044a', 'underwriting');
delete from bfx_impl.declaration_medical where id = 'f8ad7782-c762-45d6-b72a-41b3f693cb56'; insert into bfx_impl.declaration_medical values ('f8ad7782-c762-45d6-b72a-41b3f693cb56', 'EBMBFKO', '4', '4d873f10-7e95-410d-8737-371f90705468', 'underwriting');
delete from bfx_impl.declaration_medical where id = '962a8758-1c0d-4fd6-af07-540e121e8254'; insert into bfx_impl.declaration_medical values ('962a8758-1c0d-4fd6-af07-540e121e8254', 'EBMBFKO', '5', '58249a4a-1a05-49be-a63d-3c212e52fb80', 'underwriting');
delete from bfx_impl.declaration_medical where id = 'ca62c158-05dc-4801-8aca-6c56e49b6e56'; insert into bfx_impl.declaration_medical values ('ca62c158-05dc-4801-8aca-6c56e49b6e56', 'EBMBFKO', '6', 'a89be899-dfab-4d38-aafb-89cd9e3e5c42', 'underwriting');
delete from bfx_impl.declaration_medical where id = 'e6876c22-9bee-4100-a917-718e6ab88c14'; insert into bfx_impl.declaration_medical values ('e6876c22-9bee-4100-a917-718e6ab88c14', 'EBMBFKO', '7', 'c0883fda-4302-4031-9976-9156c80d83f3', 'underwriting');
delete from bfx_impl.declaration_medical where id = '55a89733-d0e1-4cc8-b286-8fbdd8b93961'; insert into bfx_impl.declaration_medical values ('55a89733-d0e1-4cc8-b286-8fbdd8b93961', 'EBMBFKO', '8', 'f6d94e77-e38e-46c9-897c-92d401e1c5ad', 'underwriting');
delete from bfx_impl.declaration_medical where id = '1786ea21-da37-48b8-9aac-90d7c15a621c'; insert into bfx_impl.declaration_medical values ('1786ea21-da37-48b8-9aac-90d7c15a621c', 'EBMBFKO', '9', '1b758e2b-659f-4e8a-962f-d8ea5e5d4518', 'underwriting');
delete from bfx_impl.declaration_medical where id = '3bb4281e-3353-44d6-87c5-e58a543f3560'; insert into bfx_impl.declaration_medical values ('3bb4281e-3353-44d6-87c5-e58a543f3560', 'EBMBFKO', '10', '773585c9-02a1-4a07-af33-dfdfe6ab179a', 'underwriting');
