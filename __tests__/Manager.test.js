const Manager = require('../lib/Manager.js');

test('get Manager office number', () => {
    const officeNumber = 45;
    const manager = new Manager('Dave', 12345, 'email@email.com', officeNumber);
    expect(manager.getOfficeNumber()).toEqual(expect.any(Number));
    expect(manager.getOfficeNumber()).toEqual(officeNumber)
});

test("get Manager's role", () => {
    const role = 'Manager';
    const manager = new Manager('Dave', 12345, 'email@email.com', 45);
    expect(manager.getRole()).toEqual(expect.any(String));
    expect(manager.getRole()).toEqual(role)
});