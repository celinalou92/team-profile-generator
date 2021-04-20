const Employee = require('../lib/Employee.js');

class Intern extends Employee {
    constructor(name, id, email, school){
        super(name, id, email)

        this.school = school;
    }
    // overrides parent method
    getRole() {
        return 'Intern';
    }

    getSchool() {
        return this.school;
    }
}

module.exports = Intern;