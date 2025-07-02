# Staging Environments

## rgsl-test

| Service | URL |
| --- | --- |
| Server Name | adins-tst-app-1.life.rgs.local |
| IdentityServer | <https://adinsure-test-auth.adins-tst-app-1.life.rgs.local/auth/identity> |
| WebClient | <https://adinsure-test.adins-tst-app-1.life.rgs.local> |
| Database | "Data Source=lifedb21\\lifedb21;Initial Catalog=AdInsure;Integrated Security=true;MultipleActiveResultSets=True" |
| ElasticSearch | <http://localhost:9200> |
| ElasticSearch index | adinsure_index |
| ActiveMQ | <http://localhost:8161/> |
| Log location | <C:\AdInsure\Logs> |

## rgsl-pre-prod

| Service | URL |
| --- | --- |
| Server Name | adins-prpd-app1.life.rgs.local |
| IdentityServer | <https://adinsure-prpd-auth.rgsl.ru/auth/identity> |
| WebClient | <https://adinsure-prpd.rgsl.ru> |
| Database | "Data Source=lifedb21\\lifedb21;Initial Catalog=AdInsure_pre_prod;Integrated Security=true;MultipleActiveResultSets=True" |
| ElasticSearch | <http://localhost:9200> |
| ElasticSearch index | adinsure_index |
| ActiveMQ | <http://localhost:8161/> |
| Log location | <C:\AdInsure\Logs> |

## rgsl-migr

| Service | URL |
| --- | --- |
| Server Name | adins-migrate.life.rgs.local |
| IdentityServer | <https://adinsure-migr-auth.adins-migrate.life.rgs.local/auth/identity> |
| WebClient | <https://adinsure-migr.adins-migrate.life.rgs.local> |
| Database | "Data Source=ADINS-MIGRATE;Initial Catalog=AdInsure_PRD_migr;Integrated Security=true;MultipleActiveResultSets=True" |
| ElasticSearch | <http://localhost:9200> |
| ElasticSearch index | adinsure_index |
| ActiveMQ | <http://localhost:8161/> |
| Log location | <C:\AdInsure\Logs> |

## rgsl-prod

| Service | URL |
| --- | --- |
| Server Name | adins-prd-app01.life.rgs.local |
| IdentityServer | <https://adinsure-auth.adins-prd-app01.life.rgs.local/auth/identity> |
| WebClient | <https://adinsure.adins-prd-app01.life.rgs.local> |
| Database | "Data Source=lifedb22\\lifedb22;Initial Catalog=AdInsure_PRD;Integrated Security=true;MultipleActiveResultSets=True" |
| Printouts | adins-prd-app03.life.rgs.local |
| ElasticSearch | <http://adins-prd-app02.life.rgs.local:9200> |
| ElasticSearch index | adinsure_index |
| ActiveMQ | <http://adins-prd-app02.life.rgs.local:8161/> |
| Log location | <E:\AdInsure\Logs> |
