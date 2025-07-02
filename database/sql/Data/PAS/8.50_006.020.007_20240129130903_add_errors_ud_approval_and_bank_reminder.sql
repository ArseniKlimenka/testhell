DELETE FROM BFX_IMPL.ATTACHMENTS_ERROR
WHERE id = '4E594110-E65C-4419-B583-9E83DD2BDA46' OR id = 'C5670A7F-E048-4415-A622-B0250115C2C6';

INSERT INTO BFX_IMPL.ATTACHMENTS_ERROR
    (ID, CODE, DESCRIPTION_FULL, DESCRIPTION_SHORT, TYPE_OF_ERROR, CLASS_OF_ERROR)
VALUES
    ('4E594110-E65C-4419-B583-9E83DD2BDA46', N'36', N'Отсутствует согласование Управляющего директора', N'КП:СогласованиеУД', N'Комплектность пакета', N'Критичные ошибки'),
    ('C5670A7F-E048-4415-A622-B0250115C2C6', N'37', N'Отсутствует памятка по форме банка', N'КП:ПамяткаБанка', N'Комплектность пакета', N'Критичные ошибки');