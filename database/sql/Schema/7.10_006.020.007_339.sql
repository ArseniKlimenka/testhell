create table PAS_IMPL.PAYMENT_TYPE (
    PAYMENT_TYPE_ID INT identity(1, 1) primary key,
    PAYMENT_TYPE_CODE INT not null,
    PAYMENT_TYPE_DESCRIPTION NVARCHAR(MAX) not null
)