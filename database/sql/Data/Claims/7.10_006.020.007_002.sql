DELETE FROM BFX_IMPL.INSURED_EVENT_REASON WHERE TYPE_CODE = '300'
GO
INSERT INTO BFX_IMPL.INSURED_EVENT_TYPE (CODE, DESCRIPTION) VALUES ('700', N'ДИД')
GO
INSERT INTO BFX_IMPL.INSURED_EVENT_REASON (CODE, DESCRIPTION, TYPE_CODE) VALUES ('301', N'Аннуитет/Гарантированный купон', '300')
GO
INSERT INTO BFX_IMPL.INSURED_EVENT_REASON (CODE, DESCRIPTION, TYPE_CODE) VALUES ('302', N'Окончание срока действия договора', '300')
GO
INSERT INTO BFX_IMPL.INSURED_EVENT_REASON (CODE, DESCRIPTION, TYPE_CODE) VALUES ('701', N'Не гарантированный купон', '700')
GO