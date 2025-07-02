# Introduction

##### Document: Tasks for newcomers
##### Author: Ivan Mkhitaryan
<br>
These are introduction tasks for newcomers. Their purpose is to introduce the newcomer to the Configuration framework and its basic features.
<br><br>

# Links

 - [documentation](https://docs.adinsure.com) <br>
Here you will find comprehensive information about Configuration, its structure, elements, and features.
 - [gitLab](https://git.adacta-fintech.com) <br>
Here you can check out existing implementation projects.

# Task 1. The Array Sorting

## Description
Create a table that is representing an array of numbers. It needs to implement generation and sorting functions for this array.

## UI

It needs to create:
 - a DataGrid with 5 x 3 size; 
 - three buttons below the table that should call functions Clear, Generate and Sort respectively;

# Task 2. The Duration Calculator

## Description
Calculate the duration between two dates. The result should be represented in years, months and days.
## UI
It needs to create:
 - a two input controls for dates between which the duration will be calculated;
 - a button that will calculate the duration;
 - three controls that will represent the result in years, months, and days respectively;

## Validation
1. The result must be set into read-only mode;
2. It needs to throw an error in case of missing input parameters with the text: "Not all parameters are entered. Please check and try again".
# Task 3. MotorPolicy

## Description
The task is to create a simple vehicle insurance policy. The document should be available from both the menu and the dashboard.

## UI
It needs to create a document with three tabs and the following properties on them:

*Insurer Data:*

- Full name 
- Age
- Driving experience

*Vehicle Data*

- Mark
- Model
- Production year
- Price

*Calculation Data*

Here we need to create a table that will represent document summary data and the result of the Premium calculation.

Table properties: Insurer's full name , Mark and Model of the Vehicle, Price, Premium.
 
## Validation

1. Production year should be between 2018 and 2020.
2. Available Model values should be dependant on chosen Mark value.
3. Insurer age should be in between 0 and 100 years.
4. Driving experience should be in between 0 and 100 years.
5. Price of the vehicle should be between 0 and 100 000 000

## Tables

<br>

*Marks and Models table*

| Mark        |          Model          | Coefficient |
| ----------- | :---------------------: | ----------: |
| Ferrari     |       GTC4 Lusso        |         0.1 |
| Ferrari     |        LaFerrari        |         0.2 |
| Ferrari     |        Portofino        |         0.3 |
| Lamborghini |       Triumph 100       |         0.4 |
| Lamborghini | Twin System 90 DT Turbo |         0.5 |
| Lamborghini |          Urus           |         0.6 |

<br>

*kProduction table*

| Year | Coefficient |
| ---- | ----------: |
| 2018 |         0.3 |
| 2019 |         0.4 |
| 2020 |         0.5 |


## Formulas

kExp = exp_years / 100;

Premium = price * kExp * kProduction * kModel;
