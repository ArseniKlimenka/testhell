  UPDATE BFX_IMPL.RISKS
   SET [SHORT_DESCRIPTION] = N'Критические заболевания'
 where [CODE] = 'CD5C36404'

   UPDATE BFX_IMPL.RISKS
   SET [SHORT_DESCRIPTION] = N'Смерть ЛП ОУСВ'
 where [CODE] = 'DLPW36404'

   UPDATE BFX_IMPL.RISKS
   SET [SHORT_DESCRIPTION] = N'Инвалидность 1,2 ЛП ОУСВ'
 where [CODE] = 'D36404'

   UPDATE BFX_IMPL.RISKS
   SET [SHORT_DESCRIPTION] = N'Инвалидность 1,2 НС ОУСВ'
 where [CODE] = 'DA36404'

   UPDATE BFX_IMPL.RISKS
   SET [SHORT_DESCRIPTION] = N'Травма НС'
 where [CODE] = 'IH36404'

   UPDATE BFX_IMPL.RISKS
   SET [SHORT_DESCRIPTION] = N'Критические заболевания ОУСВ'
 where [CODE] = 'CD636404'

  UPDATE BFX_IMPL.RISKS
   SET [FULL_DESCRIPTION] = N'Смерть Застрахованного по любой причине с возвратом взносов'
 where [CODE] = 'DLPVV36404'

  UPDATE BFX_IMPL.RISKS
   SET [FULL_DESCRIPTION] = N'Первичное диагностирование Застрахованному критического заболевания'
 where [CODE] = 'CD5C36404'

  UPDATE BFX_IMPL.RISKS
   SET [FULL_DESCRIPTION] = N'Первичное диагностирование Страхователю критического заболевания с освобождением от уплаты страховых взносов'
 where [CODE] = 'CD636404'