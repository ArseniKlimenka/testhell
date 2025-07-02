INSERT INTO BFX_IMPL.DOCUMENT_TYPE
(CODE, DESCRIPTION, CLASS_CODE, ALLOW_TO_SALERS)
VALUES
(N'passport', N'Паспорт гражданина Российской Федерации', N'identity', 1),
(N'foreignCitPassport', N'Паспорт иностранного гражданина', N'identity', 1),
(N'incurredIdentityCard', N'Временное удостоверение личности гражданина Российской Федерации (Форма 2П)', N'identity', 1),
(N'militaryID', N'Удостоверение личности военнослужащего Российской Федерации', N'identity', 0),
(N'birthCertificate', N'Свидетельство о рождении (для РФ)', N'identity', 1),
(N'foreignBirthCertificate', N'Свидетельство о рождении, выданное уполномоченным органом иностранного государства', N'identity', 1),
(N'foreignTravelPassport', N'Заграничный паспорт', N'identity', 0),
(N'driverID', N'Водительское удостоверение', N'identity', 0),
(N'registrationDocuments', N'Документы, подтверждающие факт регистрации по месту жительства', N'identity', 0),
(N'registrationCertificate', N'Свидетельство о регистрации по месту жительства', N'identity', 0),
(N'residence', N'Вид на жительство', N'residence', 0),
(N'migrationCard', N'Миграционная карта', N'residence', 0),
(N'viza', N'Виза', N'residence', 0),
(N'temporaryResidencePermit', N'Разрешение на временное проживание/пребывание', N'residence', 0),
(N'refugeeID', N'Удостоверение беженца', N'residence', 1),
(N'refugeeCertificate', N'Свидетельство о предоставлении временного убежища на территории Российской Федерации', N'residence', 0),
(N'otherDocument', N'Иной вид документа', N'residence', 0)