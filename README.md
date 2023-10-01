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
3. [Store](#store)


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

#### Components 

##### Auth component 

It is a simple component that serves as a container for the other components in the module.

##### Change password component 

###### Responsibilities 

This component should render a view that holds a form, the acceptance of which will change the password of the corresponding user.

###### Dependencies


Uses `Store` , `Router` and `AuthService` obtained through the constructor function.

###### Workflow 

During initialization, it takes the data of the specific user from the Store and saves variables to help it redirect after the submission of the form. Upon submission, it checks whether the two passwords are available and the same. If so, it sends a password change request to the server and redirects the user according to his permissions. When removed, the component is unsubscribed.

##### Login component 

###### Responsibilities 

This component must render a view that contains a form whose acceptance logs the user.

###### Dependencies


Uses `Store` , `Router` and `AuthService` obtained through the constructor function.

###### Workflow 

When sending, it checks whether the data is correct. If so, it sends a user login request to the server. If it receives a negative response, it displays the error as a message, if it receives a positive response, it saves the user in the Store, generates the redirect paths and redirects the user to the correct page. When it is removed, the component is unsubscribed.


##### Logout component 

This is a simple component that serves to clear the data for the user. After clearing the data from the Store, it redirects the user to the login page.

#### Services 

##### Auth Service 

###### Methods 

1. `addErr` - adds error message to Error store 

2. `loginUser` - sends a request to the backend server to log in the user.

3. `changePassword` - sends a request to the backend server to change password for this user.

4. `generatePath` - generates a primary path to redirect the user.

5. `isAuth` - returs boolean observable for the presence of a user. 

6. `navigateTohome` - redirects to home page.

#### Routing module 

The module contains one main path that has five children paths 

1. Start Route - container route.
    * login - shows Login page . 
    * change_password - shows Change password page. 
    * logout - execute logout page. 

### Admin Module  

#### Components 

##### Admin component 

This component is a simple component, it aims to be a module container and render the child components.
It should also render a button that redirects to the Create a new company page.

##### New company component 

###### Responsibilities 

The responsibility of this component is to derive the logic for creating a new record in the database, construct a New Company object and send it to the server.

###### Dependencies


Uses `AdminService` obtained through the constructor function.

###### Workflow 
During the initial rendering of the element, a form is displayed where the name and number of levels of the new company are noted.
The next step is to name the individual levels in a vertical line, with the first level being `Company' or the first level of the hierarchy.

After which, in three repeated steps, a tree-like structure of the company begins to be described. In the first step, the positions that can be hired at this level are defined along with their permissions. In the second step, it is verified whether this structure has substructures. If the answer is positive, a form is generated where the names of the structures are defined.
After that, everything starts to repeat for the first sub-structure, until they are all defined down, then it goes to the next one until the entire structure of the company is defined.

After the structure is defined, a form is generated in which the basic rules are filled according to which the workers will be assigned and their salaries will be calculated.

After this the generated object is sent to the server and the user will be redirected to the Dashbord company page.


#### Services 

##### Admin Service 

###### Methods 

1. `nextRoute` - redirect to new company dashboard .

2. `createCompany` - make request  to server for creating new company.

3. `formatCompanyObj` - formating final form object.

4. `addPositions` - add direct employees positioons to corect level in CompStructureObject.

5. `getStrNames` - get corect names of substructuries from CompStructureObject. 

6. `addNamesToStruObj` -  add names to substructories in this level on  CompStructureObject.

7. `generateFirstStructureFormModel` - generate form for adds new employee position to stucture. 

8. `addName` - adds new name field to substructure form template.

9. `generateSecondStructureFormModel` - generate substructure form template. 

10. `addPosition` - add new position field to direct employes  form template.

11. `generateCompLevelsStructure` - generate vertical hierarchy title field . 

12. `generateAskForSubstruct` -   generate ask for substucture form model object. 

13. `generateBasicCompanyInfoModel` - generate basic info  form model object.

14. `generateRuleFormModel` - generate rules form object. 

#### Routing Module 

The module contains two main paths

1. `admin` - container route.
    * `dashboard` routes - shows admins company dashboard . 

2. `new` - shows new company page.

### Company Module

#### Components 

##### Company component 

This is a container component that displays on one side the aside component and on the other side the child components.

##### Aprove paycheck data component 


###### Responsibilities 

This component should render a table of all company employees with their monthly reports. At the end of the table, it should display two buttons for confirming or rejecting the reports, respectively.

###### Dependencies


Uses `CompanyService` , `Router` and `ActivatedRoute` obtained through the constructor function.

###### Workflow 

On initialization, the component retrieves the table data from the server and renders it. As the cursor moves across the table, it changes the style of the cells to help the user focus on certain fields. When the table is approved, it sends a request to the server and redirects the user to the company's dashboard page. In case of failure, it only redirects the user.

##### Aside component 


###### Responsibilities 

This component should visualize the side navigation of the page to help the user know where in the company structure he is and redirect where he wants to perform some actions according to the permissions the user has.

###### Dependencies


Uses `CompanyService` , `Router` and `Store` obtained through the constructor function.

###### Workflow 

On initialization, it subscribes to the user's data and generates the initial state based on the specific user's permissions. It then subscribes to the store for path changes. If a change occurs, generate the new path based on similarities and differences with the old one. If there are options for changing the path, clicking on the corresponding cell displays a submenu with options for changing the path.


##### Dashboard component 


###### Responsibilities 

This is the main component for state control in the company. Its purpose is to render the corresponding company structure. And depending on the permission of the user, give him the opportunity to fill, read, add or change data for individual employees in this structure, as well as to navigate to another structure that is lower than the current one.

###### Dependencies

Gets from the parents component params `company`

Gets levels from params as Inputs. 

Uses `Router` , `ActivatedRoute` , `CompanyService` , `FormGeneratorService` and `Store` obtained through the constructor function.


###### Workflow 

During initialization, it takes the parameters from the URL, takes from the server the data of the specific structure in a company, renders the information on the screen and updates the information in the store so that the aside navigation can be updated. When the input parameters are changed, it makes a new request to the server and updates the data. Depending on the user's permissions, different buttons are displayed. When clicked, they redirect to the correct page or show a form to fill in at the appropriate place. If there are substructures, when clicking on the name, the user is redirected to the corresponding dashboard page.

##### Hire employee component 


###### Responsibilities 

This component renders a dynamic form in which the data for the appointment of a new employee is filled.

###### Dependencies

Uses `Router` , `ActivatedRoute` , `CompanyService` , `FormGeneratorService` and `Store` obtained through the constructor function.


###### Workflow 

During initialization, it takes from the server the possible positions for appointment in the specific structure of the company, after which it generates the form for the appointment of a new employee. Upon confirmation of the form, it displays a message with the email of the new employee. Finally, it redirects to the dashboard.

##### New contract component 


###### Responsibilities 

This Component visualizes a table for the reassignment of an existing employee, to another company structure, or to the same one when conditions change.

###### Dependencies

Gets the user Id as Input from the component's parameters.

Uses `Router` , `ActivatedRoute` , `CompanyService` , `FormGeneratorService` and `Store` obtained through the constructor function.


###### Workflow 

During initialization, it makes a request to the server in takes the possible structures and positions for each of them, when the path changes, they are updated.



##### Employee details component 

This is a container component that renders navigation buttons between child components and components.


