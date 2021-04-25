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
        let html = generatePage(teamData)
        
        writeToFile('team-profile.html', html);
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