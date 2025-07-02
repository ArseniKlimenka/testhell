# Elastic Search re-indexation helper

## How to maintain the re-indexation

In most cases re-indexation will be triggered by the platform when needed. Beside automatic trigger we also have manual trigger via API.
In either case, you must check that re-indexation successfully completed. The following sections describe how to do that.

### Status of re-indexation tasks

To check if any re-indexation jobs is in progress you can use the following query:

```sql
select lr.*
from BFX.LONG_RUNNING_TASK_EXECUTION lr
where lr.TYPE = 'Reindexation' AND lr.STATE in (1,2)
order by lr.UPDATED_ON desc;
```

This will return any re-indexation tasks currently processing and requested. When nothing is returned, it means all re-indexation tasks are finished.

> To retrieve all re-indexation tasks adjust or omit the STATE in where condition.

State mapping:

| State | Description |
|-------|-------------|
|   1   | Requested   |
|   2   | Processing  |
|   3   | Completed   |
|   4   | Canceled    |
|   5   | Paused      |
|   6   | Failed      |

In case you have any tasks in failed state, you should fix the chunks and retry to re-index them.

### Identify the failing chunks

To check the failing chunks, execute:

```sql
select *
from BFX.REINDEXATION_CHUNK
where STATUS = 2
order by interval_start;
```

Any failing chunks will be retrieved.

State mapping:

| State | Description |
|-------|-------------|
|   0   | Scheduled   |
|   1   | Processed   |
|   2   | Failed      |

### Find the error of a failing chunk

To fix the failing chunk, we must first understand why it is failing. First, we should check the id of the chunk and search for it in the error log of the server. There should be additional details which entity failed (id and type) and the reason. Check these details and fix the failing entities.

Once fixed find the re-indexation task id for the chunk you fixed. You will find it in column `REINDEXATION_TASK_ID` in table `BFX.REINDEXATION_CHUNK`.

### Re-run the re-indexation

Once you fix all the entities in failing chunks you can retry re-indexation. To do that, trigger API with the ID of the job:

```text
POST: {{SERVER_URI}}/api/entity-infrastructure/reindexation/retry
BODY:
{
  "taskId": "34c739f6-bd04-4c97-890f-cd69ee6e4b39"
}
```

The GUID in `taskId` comes from table `BFX.LONG_RUNNING_TASK_EXECUTION` from column `ID`. You can use the following query to get the id of the long running task (make sure you enter the GUID of the re-indexation task that you want to retry):

```sql
select lr.*
from BFX.LONG_RUNNING_TASK_EXECUTION lr
where lr.REQUEST_INPUT like '{"Id":"e68d2d71-99e7-4a17-90cd-76ae4f5e580f",%'
order by lr.REQUESTED_ON desc;
```

> On Oracle, make sure you convert the value from RAW(16) to GUID and vice versa.

## Manual trigger of re-indexation

To manually trigger re-indexation call the following API:

```text
POST: {{SERVER_URI}}/api/entity-infrastructure/reindexation/reindex
BODY:
{
  "target": {
    "searchEngineDataProviderConfigurationName": [
      "string"
    ],
    "entityType": "string",
    "all": true
  },
  "interval": {
    "start": "2023-01-31T09:51:11.852Z",
    "end": "2023-01-31T09:51:11.852Z"
  }
}

Example body:
{
  "target": {
    "searchEngineDataProviderConfigurationName": [
      "MICPointSearchDataProvider",
      "ContractSearchDataProvider"
    ]
  }
}

Example body to reindex all indices (use after DB restore):
{
  "target": {
    "all": true
  }
}
```

> Note: Manual re-indexation will not re-create indices, nor drop any data. It will only send the chunks of data to the index. So, if you have wrong data in the index, you should first clear it manually.

## Useful ES API requests

> Note: Examples below are using local host. You should adapt the URLs below to the host that you are using e.g.: `https://admin:admin@adinsure-dev-es.adacta-fintech.com`.

### Alias

To check the aliases on ES you can use `_alias` endpoint, e.g. `http://localhost:9200/_alias`.
It will return something like:

```json
{
    "adinsure_index_agentsearchdocument": {
        "aliases": {}
    },
    "adinsure_index_clientrequest@7knq2xyk": {
        "aliases": {
            "adinsure_index_clientrequest": {}
        }
    },
    "adinsure_index_contract@xyhpcmmi": {
        "aliases": {
            "adinsure_index_contract": {}
        }
    },
    "adinsure_index_serviceprovidersearchdocument@uvhnqprc": {
        "aliases": {
            "adinsure_index_serviceprovidersearchdocument": {}
        }
    },
    "adinsure_index_serviceprovidersearchdocument@rtlyyyta": {
        "aliases": {}
    }
}
```

Make sure each index has a unique name and alias. If the index name is not unique, then it does not need an alias. For example, `adinsure_index_serviceprovidersearchdocument` might have a problem, because it appears twice. This is normal if it is being re-indexed. Otherwise, you need to fix it manually.

#### Remove alias from an index

``` text
curl -X POST "http://localhost:9200/_aliases?pretty" -H 'Content-Type: application/json' -d'
{
  "actions": [
    {
      "remove": {
        "index": "adinsure_index_serviceprovidersearchdocument@uvhnqprc",
        "alias": "adinsure_index_serviceprovidersearchdocument"
      }
    }
  ]
}
'
```

#### Add alias to an index

```text
curl -X POST "http://localhost:9200/_aliases?pretty" -H 'Content-Type: application/json' -d'
{
  "actions": [
    {
      "add": {
        "index": "adinsure_index_serviceprovidersearchdocument@rtlyyyta",
        "alias": "adinsure_index_serviceprovidersearchdocument"
      }
    }
  ]
}
'
```

### Index

To see number of documents in an index use: `curl -X GET "http://localhost:9200/adinsure_index_contract@qaampuxj/_count"`.

#### Remove all documents from an index (clean/clear index)

```text
curl -X POST "http://localhost:9200/adinsure_index_contract@qaampuxj/_delete_by_query?conflicts=proceed&pretty" -H 'Content-Type: application/json' -d'
{
  "query": {
    "match_all": {}
  }
}
'
```

#### Remove index (delete index)

```text
curl -X DELETE "http://localhost:9200/adinsure_index_contract@tetqu5pe?pretty"
```

## Useful DB queries

### Is any data provider in indexation status

```sql
select *
from CFX.PUBLISHED_ARTIFACT
where STATUS = 'ActiveForIndexation';
```

### All records of one data provider

The following query shows all records on specified data provider (e.g. ContractSearchDataProvider). In normal situation all should be Disabled

```sql
select pai.CODE_NAME, pai.BODY, pa.STATUS, pa.PUBLISHED_ARTIFACT_ID, pa.SYS_UPDATED_ON
from CFX.PUBLISHED_ARTIFACT pa
inner join CFX.PUBLISHED_ARTIFACT_ITEM pai on pa.PUBLISHED_ARTIFACT_ID = pai.PUBLISHED_ARTIFACT_ID and pai.concept_type_id = 51
where pa.CODE_NAME = 'ContractSearchDataProvider'
order by pa.SYS_UPDATED_ON desc;
```

When you have Active and ActiveForIndexation data providers like:

| CODE_NAME                  | BODY | STATUS              | PUBLISHED_ARTIFACT_ID |
|----------------------------|------|---------------------|-----------------------|
| ContractSearchDataProvider | CLOB | Disabled            | 1                     |
| ContractSearchDataProvider | CLOB | Disabled            | 2                     |
| ContractSearchDataProvider | CLOB | Active              | 3                     |
| ContractSearchDataProvider | CLOB | ActiveForIndexation | 4                     |

Then you can use the following to disable old and activate the new data provider:

```sql
update CFX.PUBLISHED_ARTIFACT
set STATUS = 'Disabled'
where PUBLISHED_ARTIFACT_ID = '3'; -- id of the DP in status Active

update CFX.PUBLISHED_ARTIFACT
set STATUS = 'Active'
where PUBLISHED_ARTIFACT_ID = '4'; -- id of the DP in status ActiveForIndexation
```

## Re-indexation of custom indices

When custom filled ES index schema changes it needs to be reindexed. The platform will detect this on publish of ES data provider and trigger re-indexation. No manual action is needed at deployment time.
