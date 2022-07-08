# Project Labebank

This is a simplified version of a banking system that uses Node.JS and Typescript to create endpoints for API requests.
## Data Structure
### Accounts:
* name
* CPF (unique)
* birthDate(age must be > 18 years)
* balance (starts from zero)
* statement (array of transactions)
    * value
    * date
    * description
## Features
### Create Account:
- Insert name, CPF and birthDate
### Get balance:
- Insert user ID
### Add balance:
- Insert ID and balance value
### Pay the bill:
- Insert value, description and (optional) date of payment;
- If the payment date is not entered, it is considered payment on the current day;
- Payment schedules are for future dates only;
- Payment is only made if there is sufficient balance.