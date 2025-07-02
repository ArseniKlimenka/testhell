DELETE FROM BFX_IMPL.DOCUMENT_TYPE
INSERT INTO BFX_IMPL.DOCUMENT_TYPE
(CODE, DESCRIPTION, CLASS_CODE)
VALUES
(N'passport', N'Паспорт гражданина Российской Федерации', N'identity'),
(N'foreignCitPassport', N'Паспорт иностранного гражданина', N'identity'),
(N'incurredIdentityCard', N'Временное удостоверение личности гражданина Российской Федерации (Форма 2П)', N'identity'),
(N'militaryCard', N'Военный билет', N'identity'),
(N'militaryID', N'Удостоверение личности военнослужащего Российской Федерации', N'identity'),
(N'birthCertificate', N'Свидетельство о рождении', N'identity'),
(N'foreignBirthCertificate', N'Свидетельство о рождении, выданное уполномоченным органом иностранного государства', N'identity'),
(N'foreignTravelPassport', N'Заграничный паспорт', N'identity'),
(N'driverID', N'Водительское удостоверение', N'identity'),
(N'registrationDocuments', N'Документы, подтверждающие факт регистрации по месту жительства', N'identity'),
(N'registrationCertificate', N'Свидетельство о регистрации по месту жительства', N'identity'),
(N'residence', N'Вид на жительство', N'residence'),
(N'migrationCard', N'Миграционная карта', N'residence'),
(N'viza', N'Виза', N'residence'),
(N'temporaryResidencePermit', N'Разрешение на временное проживание/пребывание', N'residence'),
(N'refugeeID', N'Удостоверение беженца', N'residence'),
(N'refugeeCertificate', N'Свидетельство о предоставлении временного убежища на территории Российской Федерации', N'residence'),
(N'otherDocument', N'Иной вид документа', N'residence')