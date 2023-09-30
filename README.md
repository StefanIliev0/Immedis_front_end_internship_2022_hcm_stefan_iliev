# Human Capital Management App bY Stefan Iliev.

## Overview.

This is an app for Human Capital Management.The purpose of the application is to use it to manage the human capital of a small or large company located in a single country. In order to manage the company, you must first create a new one from the Admin account. Where a company record is created specifying a tree structure of the company with each of the structural levels, what positions the employees in that level will be assigned to and what powers the position will have. Then set the rules according to which the salaries will be calculated and features that will keep the newly appointed employees.

When creating a new company, a company administrator profile is added to it, from which the already appointed employees can be added.As with any employee added, the employee's company account is created with an initial password ("newEmployee").At the first login, the employee is redirected to a page where the password can be changed.

When a user logs in, according to the permissions he has for the position to which he is assigned, it is sent to the corresponding dashboard (if there are no permissions, it is sent to his personal profile).

The dashboard has the following functionalities depending on the path and permissions of the employee:

1. View human capital spend for the last month separately for each structure and employee.
2. Appointment of a new employee. 
3. Changing the position of an already appointed employee.
4. View employee details.
5. Addition of data on overtime, sick leave, used annual leave, payable bonus, etc. for the current month.
6. Termination of an employee's contract. 
7. Review and approve monthly employee salary supplements.
8. Movement through the various structures of the company.

The personal profile has the following features depending on the permissions:
1. Review and change the information reserved for the employee.
2. View all contracts of the employee and the ability to change the last active contract.
3. Review of the specific employee's payslips.

## Contents
1. [Startup](#startup)
2. [Application structure](#application-structure)
3. [Modules](#modules)
4. [Guards](#guards)
5. [Interseptors](#interseptors)
6. [Store](#store)
