begin try
    begin transaction

    delete org.APPLICATION_USER_GROUP_ASSIGNMENT
    from org.APPLICATION_USER_GROUP_ASSIGNMENT auga
    join [ORG].[APPLICATION_USER_GROUP] aug
    on auga.APPLICATION_USER_GROUP_ID = aug.APPLICATION_USER_GROUP_ID
    where aug.APPLICATION_USER_GROUP_CODE = 'salesVTBRozn'

    delete [ORG].[APPLICATION_USER_GROUP_ASSIGNMENT_HISTORY]
    from [ORG].[APPLICATION_USER_GROUP_ASSIGNMENT_HISTORY] augah
    join [ORG].[APPLICATION_USER_GROUP] aug
    on augah.APPLICATION_USER_GROUP_ID = aug.APPLICATION_USER_GROUP_ID
    where aug.APPLICATION_USER_GROUP_CODE = 'salesVTBRozn'

    delete [ORG_IMPL].[APPLICATION_USER_GROUP_ASSIGNMENT_HISTORY_ARCH]
    from [ORG_IMPL].[APPLICATION_USER_GROUP_ASSIGNMENT_HISTORY_ARCH] augaha
    join [ORG].[APPLICATION_USER_GROUP] aug
    on augaha.APPLICATION_USER_GROUP_ID = aug.APPLICATION_USER_GROUP_ID
    where aug.APPLICATION_USER_GROUP_CODE = 'salesVTBRozn'

    delete [ORG].[EXT_DIRECTORY_GROUP_MAPPING]
    from [ORG].[EXT_DIRECTORY_GROUP_MAPPING] exgm
    join [ORG].[APPLICATION_USER_GROUP] aug
    on exgm.APPLICATION_USER_GROUP_ID = aug.APPLICATION_USER_GROUP_ID
    where aug.APPLICATION_USER_GROUP_CODE = 'salesVTBRozn'

    delete [CFX].[USER_GROUP_APPLICATION_ROLE]
    from [CFX].[USER_GROUP_APPLICATION_ROLE] ugar
    join [ORG].[APPLICATION_USER_GROUP] aug
    on ugar.APPLICATION_USER_GROUP_ID = aug.APPLICATION_USER_GROUP_ID
    where aug.APPLICATION_USER_GROUP_CODE = 'salesVTBRozn'

    delete [CFX].[USER_GROUP_APPLICATION_ROLE_HISTORY]
    from [CFX].[USER_GROUP_APPLICATION_ROLE_HISTORY] ugarh
    join [ORG].[APPLICATION_USER_GROUP] aug
    on ugarh.APPLICATION_USER_GROUP_ID = aug.APPLICATION_USER_GROUP_ID
    where aug.APPLICATION_USER_GROUP_CODE = 'salesVTBRozn'

    delete from org.application_user_group where APPLICATION_USER_GROUP_CODE = 'salesVTBRozn'

    commit
end try

begin catch
    rollback
end catch