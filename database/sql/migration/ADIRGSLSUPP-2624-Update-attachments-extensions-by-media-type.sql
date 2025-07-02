CREATE TABLE #MimeTypeExtensions (
    ID INT PRIMARY KEY,
    MIME_TYPE VARCHAR(255),
    EXTENSION VARCHAR(50)
);

INSERT INTO #MimeTypeExtensions (ID, MIME_TYPE, EXTENSION)
VALUES
(1, 'application/zip', 'zip'),
(2, 'application/msword', 'doc'),
(3, 'image/jpeg', 'jpg'),
(4, 'application/vnd.ms-xpsdocument', 'xps'),
(5, 'text/html', 'html'),
(6, 'image/heic', 'heic'),
(7, 'application/vnd.collabio.xodocuments.document', 'odb'),
(8, 'application/vnd.oasis.opendocument.graphics', 'odg'),
(9, 'message/rfc822', 'eml'),
(10, 'image/tiff', 'tiff'),
(11, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'xlsx'),
(12, 'multipart/related', '.part'),
(13, 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'pptx'),
(14, 'application/x-ms-application', 'application'),
(15, 'text/x-dsrc', 'asm'),
(16, 'text/x-pascal', 'pas'),
(17, 'image/vnd.ms-modi', 'mdi'),
(18, 'image/png', 'png'),
(19, 'application/vnd.ms-excel', 'xls'),
(20, 'text/csv', 'csv'),
(21, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'docx'),
(22, 'text/xml', 'xml'),
(23, 'application/vnd.oasis.opendocument.text', 'odt'),
(24, 'text/plain', 'txt'),
(25, 'application/vnd.ms-excel.sheet.macroEnabled.12', 'xlsm'),
(26, 'application/octet-stream', 'obj'),
(27, 'application/vnd.rar', 'rar'),
(28, 'application/x-msdownload', 'exe'),
(29, 'application/rtf', 'rtf'),
(30, 'application/x-msdos-program', 'exe'),
(31, 'application/x-zip-compressed', 'zip'),
(32, 'application/xml', 'xml'),
(33, 'application/vnd.oasis.opendocument.presentation', 'odp'),
(34, 'application/vnd.wolfram.mathematica.package', 'frame'),
(35, 'image/gif', 'gif'),
(36, 'application/vnd.openxmlformats-officedocument.presentationml.slideshow', 'ppsx'),
(37, 'application/pdf', 'pdf'),
(38, 'image/bmp', 'bmp'),
(39, 'application/x-7z-compressed', '7z'),
(40, 'application/vnd.ms-excel.sheet.binary.macroenabled.12', 'xlsb');

UPDATE meta
SET meta.FILENAME = CONCAT(PARSENAME(REPLACE(meta.FILENAME, '.', '.'), 2), '.', mte.Extension)
FROM BFX.FILE_METADATA meta
INNER JOIN BFX.ATTACHMENT attachment on meta.FILE_METADATA_ID = attachment.FILE_METADATA_ID
LEFT JOIN #MimeTypeExtensions mte ON mte.MIME_TYPE = meta.MEDIA_TYPE
WHERE 1=1
AND meta.MEDIA_TYPE = 'image/jpeg'
AND meta.FILENAME like '%.pdf'
AND attachment.ATTACHMENT_TYPE = 'contractSigned'
-- Check conditions to update!!!

DROP TABLE #MimeTypeExtensions