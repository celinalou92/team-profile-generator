
const Employee = require('../lib/Employee');
const Manager = require('../lib/Manager');
const Engineer = require('../lib/Engineer');
const Intern = require('../lib/Intern');


//  ---------- Function to define third value featured in the card -----------//
function thirdValue(employee){
    // conditional function to generate the third value to display in employee card
    if(employee.getRole() === 'Manager'){
        // if manager return office number
        return `Office Number: ${employee.getOfficeNumber()}`;
    } else if(employee.getRole() === 'Engineer'){
        // if engineer return github
        return `Github: <a target="_blank" href="https://github.com/${employee.getGithub()}">${employee.getGithub()}</a>`;
    } else {
        // if intern return school
        return employee.getSchool();
    }
};

// ---------------- Function to generate the employe cards ----------------//
function employeeCard(teamData){
    let card  = ''
    teamData.forEach(employee => {
        card += `
        <div class="card mx-2 text-center" style="width: 18rem;">
            <div class="card-header bg-primary text-light" style="height: 5rem;">
                <h4>${employee.name}</h4>
                 <h5>${employee.getRole()}</h5>
             </div>
            <div class="card-body">
                  <ul class="list-group list-group-flush">
                     <li class="list-group-item">ID: ${employee.id}</li>
                     <li class="list-group-item"><a target="_blank" href="mailto:${employee.email}">Email: ${employee.email}</a></li>
                       <li class="list-group-item">${thirdValue(employee)}</li>
                 </ul>
           </div>
        </div>
        `
    });
    return card
};

// ---------------- Function to generate the page html ----------------//
function generatePage(teamData) {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Team Profile</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css"></link>
</head>
<body>
    <header class="bg-danger text-center" style="height: 10rem;">
        <h1 class="text-light pt-5">My Team</h1>
    </header>
    <main>
        <div class="container">
            <div class="row">
                <div class="col d-flex pt-4">
                    ${employeeCard(teamData)}
                  </div>
                </div>
            </div>
        </div>
    </main>
</body>
</html>
    `
};

module.exports = generatePage;