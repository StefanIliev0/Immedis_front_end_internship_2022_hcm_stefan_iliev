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
2. [Modules](#modules)
3. [Guards](#guards)
4. [Interseptors](#interseptors)
5. [Store](#store)


## Startup 

## Modules

The application has one main and four additional modules.Each Module has its necessary components, services and router.

1. [App Module](#app-module)
2. [Shared Module](#shared-module)
3. [Auth Module](#auth-module)
4. [Admin module](#admin-module)
5. [Company Module](#company-module)

### App Module 

#### Components 

##### App Component 
This component is an entry point to the application. It initializes the main template of the application, respectively header and footer.

##### Footer Component 

This is a simple component that renders a footer without any functionality.

##### Header Component 

This component renders the application header.

###### Workflow

On initialization, it subscribes to the presence of an active user. If there is a user, renders two links - to the user's personal profile and to logout from the application.When the component is removed, it is unsubscribed.

###### Responsibilities.

Visually indicates the presence of a user.

###### Dependencies

It depends on the user registered in the Store.

##### Wild Component 

This is a simple component that indicates that a problem has occurred or the path is incorrect and asks the user to log in again.


#### Services 

##### Back-end Service 

This service composes the requests to the server. It has four methods for four types of requests respectively.Returs Observable.


#### Interceptor 

##### Workflow 

Checks for an active user. If the request is to the specified server, add a token to the Header. If the server responds with a bad response, it stores the error in the Error Store.

###### Responsibilities.

Responsible for sending the information about the current user to the server and catching the errors from the server.

###### Dependencies

It depends on the current status of User Store


#### Guard 

Check for User in User Store.If not have User, redirect to Login page.

Depends on Auth Service.

#### Routing Module 

The module serves five routes.

1. Start Route - redirect to Login page.
2. 'auth' - loading Auth Module.
3. 'admin' - loading Admin Module. 
4. ':company' - loading Company module.
5. "**" - render Wild Component.

### Shared Module 

#### Components 

##### Button component 

This is a simple component that renders a button with predefined styles. During initialization it appears gradually, when clicking and pointing it changes its color.

###### Responsibilities 
Is responsible for rendering a button with the selected text and, when pressed, firing an event in the parent component.

###### Dependencies

Gets from the parent component as Input `text` , `type` and `disabled`.

Gets from the parent component as Output  `newEvent` . 

##### Dynamic form component 

###### Responsibilities 

Based on the given parameters, it must render a form with a certain composition, as well as, when performing some action, transmit the information in the form to the parent component.

###### Dependencies

Gets from the parent component as Input `fromModel` as Array of Arrays with formdata objects.

Gets from the parent component as Output  `getFormValue` and `onSubmit` . 

Uses `form builder` and `form service` obtained through the constructor function.

###### Workflow 

During initialization, it saves variables through the form service with which it generates the form of the template. When a change occurs, it sends information to the parent component. When the input parameters are changed, it renders the newly changed form.
When submitting the form, it checks if it is valid and if it is valid, it sends the information to the parent element.


##### Error message component 

###### Responsibilities 

If there is an Error in the Error Store display a message on the screen.

###### Dependencies

Gets Error message from Error Store ; 


##### Spiner component 

This is a simple component that should render an animation on the screen until the data arrives from the server.

#### Services

##### Form service

This is a two-method service that accepts an array of form objects and returns the same information in a suitable format for either rendering on the screen or being processed by the form builder.

### Auth Module 

### Admin Module 

### Company Module