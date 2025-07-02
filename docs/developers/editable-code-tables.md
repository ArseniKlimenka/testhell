# Editable Code Tables

## Introduction

Currently, in order to make some (even small) changes in a desicion table that is used for Calculation process the Customer needs to register a jira-task, then a developer must prepare a merge request with the required changes. These changes will be delivered to the Customer only after deploying release. This is very long, time consuming process. Especially, in case it needs to change only a row in the whole table.

In order to avoid that process the Customer requested to implement a functionality that incorporates the following requirements:

 - ability for the System Administrator to change data in online mode from the AdInsure UI;
 - the interface should not be too complex and mainly contain a table with editable rows;
 - data type should vary from simple types to arrays, objects and arrays of objects.
 - it is also required to have an ability for importing multyple rows from scratch;
 - ability to make dependency between such editable tables, which in Configuration terminology means that the data from one such code table can be taken as a  chosen parameter of another code table (e.g. vehicle Model can be taken according to chosen Mark)
 - in case of multiple users it needs to support concurrent saving mechanism, so that changes from different users that are editing at the same time whould not be  lost.

## Concept

Mainly the functionality consists of two parts Code Table and a Data Import.
Code tables implemented as a search view where each row is implemented as a Universal document. All data from code table is stored in the Analytical Sub system.
Data import implemented as a Excel import in Configuration.

## Implementation steps

In order to implement a new editional code table you need to go through following steps:

1. Implement Universal Document as a row of the code table. You can add any required amount of the data of any types of any compleity. There is no need to add all of them to the code table though. They will be available only in adding/edition process.
2. Add route to store Universal Document data in Analytical Sub system.
3. Implement search view that will represent editable code table and appropriate data source that must be used on the view load.
4. Implement excel Data import by using "document"-type sink for saving each row as a Universal Document. 