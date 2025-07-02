--Добавление рисков для продуктв КСЖ CMP3
insert into bfx_impl.risk_product_relation
(id, risk_code, product_code, is_replaceable, parent_risk, conditions_function, relation_type_code, risk_order, risk_program, risk_person)
values
('E13628A2-C56A-4378-890D-7AC9DBE71A9E', N'DI12012042204', N'CMP3', '0', NULL, N'DI12012042204', N'01', 5, N'main', N'insuredPerson'),
('E7B120D9-FC26-4D25-BA17-AB7154D61BCA', N'DIL42204', N'CMP3', '0', NULL, N'DIL42204', N'01', 6, N'main', N'insuredPerson'),
('7619F7B8-6415-4666-BF58-1794CFCCC658', N'DI10010042204', N'CMP3', '0', NULL, N'DI10010042204', N'01', 7, N'main', N'insuredPerson'),
('E1AD0FD5-68D4-4B7A-81E3-806F263A4285', N'DI1005042204', N'CMP3', '0', NULL, N'DI1005042204', N'01', 8, N'main', N'insuredPerson'),
('9D6D3382-721C-42C1-B9BC-90F9F3B50C97', N'JL42204', N'CMP3', '0', NULL, N'JL42204', N'01', 9, N'main', N'insuredPerson'),
('99F5039C-D4CD-4DF8-B293-93FBB16980DE', N'CD42204', N'CMP3', '0', NULL, N'CD42204', N'01', 10, N'main', N'insuredPerson'),
('2F648C5C-539C-4D55-BCD1-BF2930396AC0', N'D42204', N'CMP3', '0', NULL, N'D42204', N'01', 11, N'main', N'insuredPerson'),
('920929AB-A1C3-44F3-B902-D8959A02FF62', N'DLP42204', N'CMP3', '0', NULL, N'DLP42204', N'01', 12, N'main', N'insuredPerson')