create table PAS_IMPL.CONTRACT_SEARCH_EXCLUDE_PRODUCT
(
  ID int identity(1, 1) not null,
  PRODUCT_CODE NVARCHAR(255) not null,
  constraint PK_CONTRACT_SEARCH_EXCLUDE_PRODUCT primary key (ID asc)
)