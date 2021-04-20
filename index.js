const Employee = require('./lib/Employee');
const inquirer = require('inquirer');
const fs = require('fs');

// init function to start asking questions 

// ask if they have more people to add 

// function to generate page
const initPrompt = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: "What is the team manager's name?",
      validate: nameInput => {
        if(nameInput) {
          return true;
        } else {
          console.log('Please enter their name.');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'employeeId',
      message: "What is their employee ID?",
      validate: idInput => {
        if(idInput) {
          return true;
        } else {
          console.log('Please answer the prompt.');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'email',
      message: "What is the team manager's email address?",
      validate: emailInput => {
        if(emailInput) {
          return true;
        } else {
          console.log('Please answer the prompt.');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'officeNumber',
      message: "What is the team manager's office number?",
      validate: officeNumberInput => {
        if(officeNumberInput) {
          return true;
        } else {
          console.log('Please answer the prompt.');
          return false;
        }
      }
    },
  ])
  // pass values into Employee constructor
}

const promptTeam = teamData


initPrompt()
.then(data => {
  console.log(data)
})
.catch(err => {
  console.log(err);
})

// WHEN I start the application
// THEN I am prompted to enter the team manager’s name, employee ID, email address, and office number

// WHEN I enter the team manager’s name, employee ID, email address, and office number

// THEN I am presented with a menu with the option to add an engineer or an intern or to finish building my team
// WHEN I select the engineer option
// THEN I am prompted to enter the engineer’s name, ID, email, and GitHub username, and I am taken back to the menu
// WHEN I select the intern option
// THEN I am prompted to enter the intern’s name, ID, email, and school, and I am taken back to the menu
// WHEN I decide to finish building my team
// THEN I exit the application, and the HTML is generated
// GIVEN a command-line application that accepts user input
// WHEN I am prompted for my team members and their information
// THEN an HTML file is generated that displays a nicely formatted team roster based on user input
// WHEN I click on an email address in the HTML
// THEN my default email program opens and populates the TO field of the email with the address
// WHEN I click on the GitHub username
// THEN that GitHub profile opens in a new tab