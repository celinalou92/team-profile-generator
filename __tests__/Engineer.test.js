const Engineer = require('../lib/Engineer.js');

test('get Engineer github username', () => {
    const github = 'username';
    const engineer = new Engineer('Dave', 12345, 'email@email.com', github);
    expect(engineer.getGithub()).toEqual(expect.any(String));
    expect(engineer.getGithub()).toEqual(github);
})

test("get Engineer's role", () => {
    const role = 'Engineer';
    const engineer = new Engineer('Dave', 12345, 'email@email.com', 45);
    expect(engineer.getRole()).toEqual(expect.any(String));
    expect(engineer.getRole()).toEqual(role)
});