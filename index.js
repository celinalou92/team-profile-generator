const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');

const fs = require('fs');
const generatePage = require('./src/page-template');

const teamData = [];
const message = `Please answer the prompt`;

const basePrompt = [
  {
    type: 'input',
    name: 'name',
    message: "What is the employee's name?",
    validate: nameInput => {
      if(nameInput) {
        return true;
      } else {
        console.log(message);
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'id',
    message: "What is their employee ID?",
    validate: idInput => {
      if(idInput) {
        return true;
      } else {
        console.log(message);
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'email',
    message: "What is their email address?",
    validate: emailInput => {
      if(emailInput) {
        return true;
      } else {
        console.log(message);
        return false;
      }
    }
  },
]
// ------------------- function to generate html ------------------ //
const writeToFile = (fileName, teamData) => {
  return new Promise((resolve, reject) => {
    // create page in dist directory
    fs.writeFile('./dist/team-profile.html', (fileName,teamData), err => {
      // if there's an error, reject the Promise and send the error to the Promise's `.catch()` method
      if (err) {
        reject(err);
         // return out of the function here to make sure the Promise doesn't accidentally execute the resolve() function as well
        return;
      }
       // if everything went well, resolve the Promise and send the successful data to the `.then()` method
      resolve({
         ok: true,
         message: 'File created!'
      });
    })
  })
};


// ------------------- function to add another employee ------------------ //
const addNewPrompt = () => {
  inquirer.prompt(
    {
    type: 'confirm',
    name: 'addConfirm',
    message: "Do you want to add another employee?",
    validate: addConfirmInput => {
      if(addConfirmInput) {
        return true;
      } else {
        console.log(message);
        return false;
      }
    }
   })
   .then(response => {
    if(response.addConfirm) {
      //  addConfirm = true prompt for role
        inquirer.prompt({
          type: 'list',
          name: 'role',
          message: "What is the employee's role?",
          choices: ['Engineer', 'Intern'],
          validate: addConfirmInput => {
              if(addConfirmInput) {
                return true;
              } else {
                console.log(message);
                return false;
              }
            }
        })
        .then( response => {
                  // pass into enginner and intern prompt functions
        if(response.role === 'Engineer') {
            promptEngineer();
        } else {
            promptIntern();
          }
        })
      } else {
        //  addConfirm = false generate page
        console.log(teamData)
        console.log(
          `
           =================================
           your team page has been generated
           =================================
           `
        )
        // pass data into generate page function
        generatePage(teamData)
        writeToFile('team-profile.html', );
      }
   })
};


// ------------------- function engineer questions ------------------ //
 const promptEngineer = async () => {
   // need add base prompts
   let response = await inquirer.prompt([
     ...basePrompt,
    {
      type: 'input',
      name: 'github',
      message: "What is the engineer's github username?",
      validate: githubInput => {
        if(githubInput) {
          return true;
        } else {
          console.log(message);
          return false;
        }
      }
     },
    ]);
  // ------ add to teamData ------ //
  const engineer = new Engineer(response.name, response.id, response.email, response.github);
  teamData.push(engineer);
  addNewPrompt();
 };

// ------------------- function intern questions ------------------- //
const promptIntern = async () => {
  // need add base prompts
  let response = await inquirer.prompt ([
    ...basePrompt,
    {
     type: 'input',
     name: 'school',
     message: "What school does the intern attend?",
     validate: schoolInput => {
       if(schoolInput) {
         return true;
       } else {
         console.log(message);
         return false;
       }
     }
    }
  ]);
  // ------ add to teamData ------ //
  const intern = new Intern(response.name, response.id, response.email, response.school);
  teamData.push(intern);
  addNewPrompt();
};

// ------------------ function to start questions ------------------ //
const initPrompt = () => { 
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: "What is the team manager's name?",
      validate: nameInput => {
        if(nameInput) {
          return true;
        } else {
          console.log(message);
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'id',
      message: "What is their employee ID?",
      validate: idInput => {
        if(idInput) {
          return true;
        } else {
          console.log(message);
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
          console.log(message);
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
          console.log(message);
          return false;
        }
      }
    },
  ])
  .then(response => {
    // add to teamData
  const manager = new Manager(response.name, response.id, response.email, response.officeNumber);
  teamData.push(manager);
  console.log(teamData)
  })
}




initPrompt()
.then(addNewPrompt)
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