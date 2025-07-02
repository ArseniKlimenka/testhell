insert into org.application_user_claim 
select newid (), au.application_user_id, N'AccountType', N'Standard', getdate(), getdate(), N'web-client-vnext', 1, '00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000000'   
from org.application_user au left join org.application_user_claim auc on auc.application_user_id = au.application_user_id and auc.claim_type = N'AccountType'  
where auc.application_user_claim_id is null