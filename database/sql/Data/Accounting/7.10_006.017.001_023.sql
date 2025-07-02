delete from acc.GL_SUBLEDGER_ENTRY where GL_ACCOUNT_ID in (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO like '___.___');
delete from acc.GL_POSTING_PROFILE where GL_ACCOUNT_ID in (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO like '___.___');
delete from acc.GL_ACCOUNT_BALANCE where GL_ACCOUNT_ID in (select GL_ACCOUNT_ID from acc.GL_ACCOUNT where GL_ACCOUNT_NO like '___.___');
delete from acc.GL_ACCOUNT where GL_ACCOUNT_NO like '___.___';