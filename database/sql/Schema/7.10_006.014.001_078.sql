create table ACC_IMPL.ATTR_MAPPING_KONTOAC
(
	GL_ACCOUNT_ID bigint not null,
	KONTOAC nvarchar(3) not null,

	constraint [PK_ACC_ATTR_MAPPING_KONTOAC_ID] primary key clustered
	(
		GL_ACCOUNT_ID asc
	)
)
go

alter table ACC_IMPL.ATTR_MAPPING_KONTOAC with check add constraint [FK_ACC_ATTR_MAPPING_KONTOAC_GL_ACCOUNT_ID] foreign key(GL_ACCOUNT_ID)
references acc.GL_ACCOUNT (GL_ACCOUNT_ID)
go

insert into ACC_IMPL.ATTR_MAPPING_KONTOAC (GL_ACCOUNT_ID, KONTOAC)
values
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '47416'), 3),
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '47417'), 3),
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48001'), 1),
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48002'), 1),
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48003'), 1),
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48021'), 1),
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48022'), 1),
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48023'), 1),
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48024'), 1),
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48028'), 3),
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '48029'), 3),
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71401'), 1),
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71402'), 1),
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71403'), 1),
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71404'), 1),
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71406'), 1),
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71410'), 1),
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71411'), 1),
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71412'), 1),
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71413'), 1),
((select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO = '71414'), 1)
go
