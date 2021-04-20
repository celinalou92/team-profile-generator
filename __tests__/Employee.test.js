const Employee = require('../lib/Employee.js');

test('create an employee object', () => {
    const employee = new Employee('Dave', 12345, 'email@email.com')
})


test("get employee's name", () => {
    const name = 'Dave'
    const employee = new Employee(name, 12345, 'email@email.com');
    expect(employee.getName()).toEqual(expect.any(String));
    expect(employee.getName()).toEqual(name)
});

test("get employee's employee ID", () => {
    const id = 12344;
    const employee = new Employee('Dave', id, 'email@email.com');
    expect(employee.getId()).toEqual(expect.any(Number));
    expect(employee.getId()).toEqual(id)
});

test("get employee's email address", () => {
    const email = 'email@email.com'
    const employee = new Employee('Dave', 12345, email);
    expect(employee.getEmail()).toEqual(expect.any(String));
    expect(employee.getEmail()).toEqual(email)
});

test("get employee's role", () => {
    const role = 'Employee';
    const employee = new Employee('Dave', 12345, 'email@email.com');
    expect(employee.getRole()).toEqual(expect.any(String));
    expect(employee.getRole()).toEqual(role)
});