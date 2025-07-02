/*
select * from bfx_impl.investment_strategy
*/

delete from bfx_impl.investment_strategy
 where code in (N'woRubGazpromPgBarrickDanoneSpotify', N'globalEconomic', N'sectorLeaders2')
insert into  bfx_impl.investment_strategy
(id, code, description)
values
('4887c2b4-4d43-40d3-9f21-5d3977096a45', N'woRubGazpromPgBarrickDanoneSpotify', N'Лидеры сектора 3.0'),
('b733b26f-9e3b-4e49-a2ff-ad3d25f86fb2', N'globalEconomic', N'Глобальная экономика'),
('0dd7f2fa-dd59-41a9-abee-b5144a11ccd8', N'sectorLeaders2', N'Лидеры Сектора 2.0')


/*
select * from bfx_impl.products
*/

delete from bfx_impl.products
 where code in (
N'E703BFKOP',
N'E703SAS',
N'M701OAS',
N'I516BFKO',
N'I575BFKO',
N'I575OAS',
N'I568BFKO',
N'I568Zenit',
N'I568OAS',
N'I568Akcept',
N'I497BFKO',
N'E1OAS',
N'E1SAS',
N'I423PSB',
N'I425PSBPrivate',
N'I425PSB',
N'I455BFKO',
N'I455ATBbank',
N'E400BFKO',
N'R532OAS',
N'E641BFKOP'
)
insert into bfx_impl.products
(id, code, product_group, description)
values
('03ff4eac-5782-44ae-9dd1-1239de081869', N'E703BFKOP', N'endowment', N'Стратегия на пять RUB'),
('a2867dd7-cf04-4f9b-84c1-16ec5714100d', N'E703SAS', N'endowment', N'Стратегия на пять RUB'),
('3813df1a-129a-4825-b1e3-30296893a6b3', N'M701OAS', N'med', N'Восстанови здоровье Лайт RUB'),
('ffde1b3c-2661-41a2-81d0-3088b281714a', N'I516BFKO', N'investment', N'БФКО Страйк Лидеры сектора 3.0 RUB 5'),
('2c9b586b-acf5-496b-84b7-33fd6f6a103b', N'I575BFKO', N'investment', N'Страйк Всемир Телекомы RUB5'),
('7cb9e4a6-7c39-4289-8230-35e97d1b1e66', N'I575OAS', N'investment', N'Страйк Всемир Телекомы RUB5'),
('93a395ea-528c-4676-8e93-37667db996d5', N'I568BFKO', N'investment', N'Драйвер ВсемирТелекомы АКолл 5RUB'),
('8eff83f1-d8eb-4dbe-b19c-3fde36784123', N'I568Zenit', N'investment', N'Драйвер ВсемирТелекомы АКолл 5RUB'),
('327cd10f-d307-4d8b-ab83-458a97acb400', N'I568OAS', N'investment', N'Драйвер ВсемирТелекомы АКолл 5RUB'),
('0b5630c2-6af1-4459-92a3-599d0d212da8', N'I568Akcept', N'investment', N'Драйвер ВсемирТелекомы АКолл 5RUB'),
('7c686e9e-916b-42dd-b326-a2cd3f7e84c4', N'I497BFKO', N'investment', N'БФКО Драйвер Лидеры сектора 3.0 RUB3'),
('dc4c0bc4-5ac2-48bb-9bf1-afdad1fb6091', N'E1OAS', N'endowment', N'Страхование жизни на случай смерти'),
('d0b09147-70f2-4568-a5a3-b0812a3a3edd', N'E1SAS', N'endowment', N'Страхование жизни на случай смерти'),
('93b8ad72-1018-4904-a73f-c873259e6f50', N'I423PSB', N'investment', N'ПСБ Драйвер Глобальная экономика RUB3'),
('ad36da2b-e957-44f9-bf36-e40624d8b60d', N'I425PSBPrivate', N'investment', N'ПСБ Драйвер Лидеры Сектора 2.0 RUB5'),
('fb1feb1f-516a-42a4-aeea-e4ce247cf6e0', N'I425PSB', N'investment', N'ПСБ Драйвер Лидеры Сектора 2.0 RUB5'),
('49a98efb-cdb8-4034-b855-e86866f49682', N'I455BFKO', N'investment', N'БФКО Лидеры Сектора автоотзыв 2.0 RUB7'),
('06ae5737-55e5-460a-b7fd-f1ba5c971f2b', N'I455ATBbank', N'investment', N'БФКО Лидеры Сектора автоотзыв 2.0 RUB7'),
('4950a363-c35b-4568-b5fd-f5eff497470d', N'E400BFKO', N'endowment', N'БФКО mass Надежное будущее - ед.выплата RUB'),
('218ec956-844e-4365-b67d-fd8f979c574b', N'R532OAS', N'endowment', N'Достойный век Оптима RUB'),
('efa381d1-8e46-4737-b96e-b82dcebbb56c', N'E641BFKOP', N'endowment', N'Финансовый резерв БФКО RUB')


/*
select * from bfx_impl.risk_product_relation
*/

/*
delete from bfx_impl.risk_product_relation
 where product_code in (
N'E703BFKOP',
N'E703SAS',
N'M701OAS',
N'I516BFKO',
N'I575BFKO',
N'I575OAS',
N'I568BFKO',
N'I568Zenit',
N'I568OAS',
N'I568Akcept',
N'I497BFKO',
N'E1OAS',
N'E1SAS',
N'I423PSB',
N'I425PSBPrivate',
N'I425PSB',
N'I455BFKO',
N'I455ATBbank',
N'E400BFKO',
N'R532OAS',
N'E641BFKOP'
)
insert into bfx_impl.risk_product_relation
(ID, RISK_CODE, PRODUCT_CODE, IS_REPLACEABLE, PARENT_RISK, CONDITIONS_FUNCTION, RELATION_TYPE_CODE, RISK_ORDER, RISK_PROGRAM, RISK_PERSON)
VALUES
(N'4c7e3e18-c146-41f4-8143-0249f799d7dc', N'DLPVV7036404', N'E703BFKOP', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'bd7250cc-c220-498d-8e5d-05344f30c7fa', N'DNSVV36404', N'E703BFKOP', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'54086355-f444-4e4c-be0b-066c7994ba09', N'DLP36404', N'E703BFKOP', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'45e7ecdd-89cd-4976-8b82-07cb7569db0e', N'DLPVV6536404', N'E703BFKOP', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'2c4f5dc6-6043-4409-9b0f-09400d91b840', N'E36404', N'E703BFKOP', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'a91f5a1d-6920-4e3b-8ddf-0a66bdb550ef', N'DLPVV7036404', N'E703SAS', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'0a84d0fb-5559-465f-8013-2137f88d922d', N'DNSVV36404', N'E703SAS', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'fe16cdd1-31a6-4995-acc0-2148c99c5738', N'DLP36404', N'E703SAS', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'0f65bc59-ec62-43b3-9718-2b11d8d23e71', N'DLPVV6536404', N'E703SAS', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'b26e1cb1-6915-4e34-be71-2cbd14681ece', N'E36404', N'E703SAS', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'01babe21-c8a8-4b2d-8cd3-2e426885d769', N'R10800', N'M701OAS', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'01dac1e0-a27f-47ce-8d39-2e6147527785', N'E36904', N'I516BFKO', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'b415d2f3-2b46-43b4-9cd2-34d87f816937', N'DLPVV36904', N'I516BFKO', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'a1af8823-1a2d-4212-b982-365ebb2ead6e', N'DAT36904', N'I516BFKO', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'7965d6fa-645e-449a-9ae3-36797a142c15', N'E36904', N'I575BFKO', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'4734b19e-0110-4d13-acba-3c4eeb1789a7', N'DLPVV36904', N'I575BFKO', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'8e0ef964-f94c-4aa0-bb5a-3c9995a61ff9', N'DAT36904', N'I575BFKO', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'75240546-9488-4fed-a417-41b580367580', N'E36904', N'I575OAS', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'11094c21-91ef-4c65-bd6c-41d717bb73b0', N'DLPVV36904', N'I575OAS', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'e08cfa10-cdae-4ddb-a766-43e855ff8c75', N'DAT36904', N'I575OAS', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'04a26b37-065c-4e1d-bb3e-456047d32c00', N'DLPDP36904', N'I568BFKO', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'aec740ad-d094-4cb5-b3ee-47d9b6c3b223', N'E36904', N'I568BFKO', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'7607f790-e47c-45af-b4c5-4df09afb0483', N'DLP36904', N'I568BFKO', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'f85f3e2f-fae2-4416-947f-51174e933de4', N'DNS36904', N'I568BFKO', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'cdd418a9-0a3a-4839-8792-52d8b54271af', N'DLPDP36904', N'I568Zenit', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'1a405436-d5ac-4bac-afa3-53ad491f5c61', N'E36904', N'I568Zenit', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'8c6dea10-d6c6-4b19-b949-55473fc457ea', N'DLP36904', N'I568Zenit', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'f4a9c64b-ed31-4958-817b-56adda97b1a0', N'DNS36904', N'I568Zenit', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'c24ff6ea-dcc3-4f63-bce0-593e602888b1', N'DLPDP36904', N'I568OAS', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'715e397c-7b4b-48ce-a71e-5c556383b408', N'E36904', N'I568OAS', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'30d452bd-0b0d-4dd0-9181-5d2f3e37374b', N'DLP36904', N'I568OAS', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'7d166d2f-4edf-47a5-979c-5ed5832ce3db', N'DNS36904', N'I568OAS', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'e60ef48a-62fa-414a-98de-60395bc2bcc1', N'DLPDP36904', N'I568Akcept', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'ffcb1c13-9c15-4481-86e6-65bdd00fb9bd', N'E36904', N'I568Akcept', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'db9181aa-8ec3-44ba-b6a4-65e864421584', N'DLP36904', N'I568Akcept', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'f3127de5-07a3-4c85-9208-679ecc89e2c1', N'DNS36904', N'I568Akcept', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'446d479b-780f-4567-b11c-6888c35333e7', N'DLP36904', N'I497BFKO', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'75c4330d-1211-4a68-9d30-75ef26e95795', N'E36904', N'I497BFKO', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'bec3a8d8-ade2-4b1a-9510-77ee8c438c52', N'DNS36904', N'I497BFKO', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'a658d9bc-546f-4b2e-81dc-78e724b96036', N'DLP31102', N'E1OAS', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'c35762ef-caed-49f2-984e-7a6efa7a70b9', N'DLP242204', N'E1OAS', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'7863d57b-0796-48fa-ba59-7b234d7cf4e8', N'DLP31102', N'E1SAS', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'06c656c8-8d7c-4c14-b1f8-7e11fd008932', N'DLP242204', N'E1SAS', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'e19b8a2b-cda9-4a5b-b65e-815ce09126a8', N'E36904', N'I423PSB', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'f1ee0fc6-095b-429b-bb1a-840956d45a0e', N'DLP36904', N'I423PSB', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'e11aaef2-272f-4d5c-af28-84566019b045', N'DLPDP36904', N'I423PSB', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'1745fc5e-ffe4-4ac3-9f9c-850735cde1df', N'DNS36904', N'I423PSB', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'ead375ac-46c1-4b3b-89ed-8627d1720897', N'E36904', N'I425PSBPrivate', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'f4da3f2e-7794-4627-bddb-8946eb3c99ec', N'DLP236904', N'I425PSBPrivate', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'21765ee1-5269-44df-9446-8d2177d30e03', N'A36904', N'I425PSBPrivate', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'39392d5f-d701-4668-8efe-8f52db5ef215', N'DNS36904', N'I425PSBPrivate', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'a6106f5d-6212-4d24-8241-931efa5aa2ad', N'DLP36904', N'I425PSBPrivate', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'9bbd1f8c-5aee-4c67-8282-93e81549958f', N'DLPDP36904', N'I425PSBPrivate', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'e8f4d0b2-f4cb-489d-90e8-93ebffc80257', N'E36904', N'I425PSB', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'a864f3b7-3394-4ca5-a3b3-93f39ed5d6c5', N'DLP236904', N'I425PSB', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'e386e40b-1113-4562-8797-97a02ca02832', N'A36904', N'I425PSB', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'8714d944-f087-40d6-aff0-9f508e18bb78', N'DNS36904', N'I425PSB', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'81d1f6e8-4685-4e2f-80b5-a552a8030c13', N'DLP36904', N'I425PSB', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'd6bb71fd-35a9-421e-b9cf-a675bf7beae1', N'DLPDP36904', N'I425PSB', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'b587f02b-fd68-48b0-83a2-aecf7cb9c9a2', N'DNS36904', N'I455BFKO', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'e34f72f3-6e73-41cb-9f64-b06642627b83', N'E36904', N'I455BFKO', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'351f1da5-0416-45ca-8dd4-b877ce5d94d2', N'DLP36904', N'I455BFKO', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'e7adc32b-3de0-4015-ba01-b981fc15724d', N'DNS36904', N'I455ATBbank', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'0f3a5687-2b7e-47c9-9e3e-ba76a79c3451', N'E36904', N'I455ATBbank', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'37ca7bce-43dd-4f6e-9146-ba9c01831d2d', N'DLP36904', N'I455ATBbank', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'cdf5074d-77dc-4a15-9c07-baaa08086d47', N'CD1136102', N'E400BFKO', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'4e5ac567-62db-44a0-b8ea-bb1b8b554155', N'DA36102', N'E400BFKO', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'49f5444b-eb32-4e1f-a244-bd1b06a86161', N'DLP36102', N'E400BFKO', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'872e06de-6950-47b3-8295-bd9c75c01211', N'TDA36102', N'E400BFKO', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'b5e11b8c-cf13-40a4-b714-c2b28faaf6d0', N'DTP36102', N'E400BFKO', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'35fc287c-7131-4385-baa7-c2cab3e886d7', N'D12A36102', N'E400BFKO', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'410561c7-8c9b-4ec1-926c-c4b4a9e61e8a', N'TCU10800', N'E400BFKO', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'4fd7a040-1906-4c3e-b338-c4de487cd176', N'TM10800', N'E400BFKO', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'890d7d26-f7f2-42ec-9123-c59e4151e695', N'JL36102', N'E400BFKO', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'c8ea66b0-7d5d-4e57-9987-c6faa95d6e40', N'CDH10800', N'E400BFKO', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'4dc94bc3-4d5d-46e7-9601-cb39b1d66369', N'CDP36102', N'E400BFKO', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'ab3d2273-6d92-4a58-9479-ccb48abfef6c', N'DLP36102', N'E400BFKO', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'68542fc7-566f-457d-b2c3-d3296abbd280', N'DPVV36102', N'E400BFKO', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'8b663b15-2999-4a10-bdc9-d46a265eed71', N'DNS36102', N'E400BFKO', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'f2dabccb-b887-4058-af46-d69fd78e626a', N'E36102', N'E400BFKO', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'ba945015-2488-423f-8023-d8560af666d9', N'DLP46204', N'R532OAS', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'8752332e-7be9-4a68-a605-e60b6c369adc', N'DAVV36404', N'E641BFKOP', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'6d7af988-2e4f-48a8-8e13-e7f09bd59495', N'DTP36404', N'E641BFKOP', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'df997e15-7b64-4846-9ed5-ea8b30e49b68', N'CTDA36404', N'E641BFKOP', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'cb04cb9d-29a9-424a-a30b-eaaa91e39c64', N'E36404', N'E641BFKOP', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'd9d87c9c-1dab-444e-92a7-ee70bf65fdca', N'DLPSS36404', N'E641BFKOP', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'eab4a46a-a2c7-460a-92be-efc77f6d5f70', N'CDVV36404', N'E641BFKOP', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'256bb9e1-d38a-4134-9a5b-f2e83a8a787d', N'DVV36404', N'E641BFKOP', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'd729fae2-6dd5-46ea-b6b3-f5fe41a7736c', N'CDHR10800', N'E641BFKOP', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'6ba2f178-9d16-403a-ad06-f790b79918fc', N'CDP36404', N'E641BFKOP', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'b8bf6143-b807-4479-af05-fbb6168ab9e2', N'DNS36404', N'E641BFKOP', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson'),
(N'0d901625-d394-4f2a-aa2d-fd94de155747', N'DASS36404', N'E641BFKOP', '0', NULL, NULL, N'01', 1, N'main', N'insuredPerson')
*/