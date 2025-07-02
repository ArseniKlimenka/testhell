update cc
   set cc.BODY = json_modify(cc.BODY, '$.creditProgram.creditProgramVersion', cp.PROGRAM_VERSION)
  from pas.contract cc
  join bfx_impl.CREDIT_PROGRAM cp on json_value(cc.BODY, '$.creditProgram.creditProgramId') = cp.CODE
  join cfx.PUBLISHED_ARTIFACT pa on pa.PUBLISHED_ARTIFACT_ID = cc.PUBLISHED_ARTIFACT_ID
where pa.CODE_NAME like 'Credit%'
go