const Intern = require('../lib/Intern.js');

test('get Intern school name', () => {
    const school = 'USC';
    const intern = new Intern('Dave', 12345, 'email@email.com', school);
    expect(intern.getSchool()).toEqual(expect.any(String));
    expect(intern.getSchool()).toEqual(school);
});

test("get Intern's role", () => {
    const role = 'Intern';
    const intern = new Intern('Dave', 12345, 'email@email.com', 45);
    expect(intern.getRole()).toEqual(expect.any(String));
    expect(intern.getRole()).toEqual(role)
});