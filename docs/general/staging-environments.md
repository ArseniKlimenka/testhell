
# Staging Environments

## AdInsure RGSL-RC (MSSQL)

| Service | URL |
| --- | --- |
| IdentityServer | <https://rgsl-rc-auth.adacta-fintech.com/> |
| WebClient | <https://rgsl-rc.adacta-fintech.com/> |
| Server name | pi-rgsl-mo-01.adacta-fintech.com |
| Database |  Data Source=localhost;Initial Catalog=AdInsure;User ID=adinsure;Password=adinsure;MultipleActiveResultSets=True
| ElasticSearch | <http://localhost:9200> |
| ElasticSearch index | adinsure_index |
| ActiveMQ | activemq:tcp://localhost:61616 ([management](http://localhost:8161/admin/queues.jsp) , credentials: admin/admin) |xrf
| Log location | C:\AdInsure\Logs |
