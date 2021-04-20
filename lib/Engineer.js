const Employee = require('../lib/Employee.js');

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email)

        this.github = github;
    }
    // over ride parent method
    getRole() {
        return 'Engineer';
    }

    getGithub() {
        return this.github;
    }
}

module.exports = Engineer;