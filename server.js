const inquirer = require('inquirer');
const pool = require('./db/connection');

function askQuestions() {

    inquirer.prompt([
        {
            type: 'list',
            name: 'directory',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'Add Department',
                'Delete Department',
                'View All Roles',
                'Add Role',
                'Delete Role',
                'View All Employees',
                'Add Employee',
                'Delete Employee',
                'Update Employee Role',
            ],
        },
    ])
        .then((answers) => {
            // Look into a "switch" in JavaScript
            if (answers.directory == 'View All Departments') {
                viewDepartments();
            };
            if (answers.directory == 'Add Department') {
                addDepartment();
            };
            if (answers.directory == 'Delete Department') {
                deleteDepartment();
            }
            if (answers.directory == 'View All Roles') {
                viewRoles();
            };
            if (answers.directory == 'Add Role') {
                addRole();
            };
            if (answers.directory == 'Delete Role') {
                deleteRole();
            }
            if (answers.directory == 'View All Employees') {
                viewEmployees();
            };
            if (answers.directory == 'Add Employee') {
                addEmployee();
            };
            if (answers.directory == 'Delete Employee') {
                deleteEmployee();
            }
            if (answers.directory == 'Update Employee Role') {
                updateEmployee();
            };
        });
}


// Get ALL Departments
function viewDepartments() {
    // we make our DATABASE Query
    pool.query('SELECT id, department_name FROM departments;', function (err, data) {
        if (err) {
            console.log("err: ", err);
        }
        // console.log("Data: ", data.rows);
        console.table(data.rows);
        askQuestions();
    });
}

//ADD department
function addDepartment() {
    inquirer.prompt(
        {
            type: 'input',
            name: 'department_name',
            message: 'What is the name of the new Department?',

        }
    ).then(answers => {

        // we make our DATABASE Query
        pool.query('INSERT INTO departments (department_name) VALUES ($1)', [answers.department_name], function (err, data) {
            if (err) {
                console.log("err: ", err);
            }
            console.log("New Department Added");
            viewDepartments()
        });
    })
        .catch(err => {
            console.log("err: ", err);
        })
}

//delete department
function deleteDepartment() {
    inquirer.prompt(
        {
            type: 'input',
            name: 'department_id',
            message: 'What is the ID of the Department to be removed?',

        }
    ).then(answers => {

        // we make our DATABASE Query
        pool.query('DELETE FROM departments WHERE id = $1', [answers.department_id], function (err, data) {
            if (err) {
                console.log("err: ", err);
            }
            console.log("Department Removed");
            viewDepartments()
        });
    })
        .catch(err => {
            console.log("err: ", err);
        })
}

// Get ALL Roles
function viewRoles() {
    pool.query('SELECT * FROM roles;', function (err, data) {
        if (err) {
            console.log("err: ", err);
        }
        console.table(data.rows);
        askQuestions();
    });
}

//add role
function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the new Role?',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the new Role?',
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'Enter the Department ID for the new Role',
        }
    ]).then(answers => {

        // we make our DATABASE Query
        pool.query('INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)', [answers.title, answers.salary, answers.department_id], function (err, data) {
            if (err) {
                console.log("err: ", err);
            }
            console.log("New Role Added");
            viewRoles()
        });
    })
        .catch(err => {
            console.log("err: ", err);
        });
}

function deleteRole() {
    inquirer.prompt(
        {
            type: 'input',
            name: 'role_id',
            message: 'What is the ID of the Role to be removed?',

        }
    ).then(answers => {

        // we make our DATABASE Query
        pool.query('DELETE FROM roles WHERE id = $1', [answers.role_id], function (err, data) {
            if (err) {
                console.log("err: ", err);
            }
            console.log("Role Removed");
            viewRoles()
        });
    })
        .catch(err => {
            console.log("err: ", err);
        })
}

// Get ALL Employees
function viewEmployees() {
    pool.query('SELECT * FROM employees;', function (err, data) {
        if (err) {
            console.log("err: ", err);
        }
        console.table(data.rows);
        askQuestions();
    });
}

//Add employee
function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the first name of the new Employee?',
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the last name of the new Employee?',
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Enter the Role ID for the new Employee',
        }
    ]).then(answers => {

        // we make our DATABASE Query
        pool.query('INSERT INTO employees (first_name, last_name, role_id) VALUES ($1, $2, $3)', [answers.first_name, answers.last_name, answers.role_id], function (err, data) {
            if (err) {
                console.log("err: ", err);
            }
            console.log("New Employee Added");
            viewEmployees()
        });
    })
        .catch(err => {
            console.log("err: ", err);
        });
}

function deleteEmployee() {
    inquirer.prompt(
        {
            type: 'input',
            name: 'employee_id',
            message: 'What is the ID of the Employee to be removed?',

        }
    ).then(answers => {

        // we make our DATABASE Query
        pool.query('DELETE FROM employees WHERE id = $1', [answers.employee_id], function (err, data) {
            if (err) {
                console.log("err: ", err);
            }
            console.log("Employee Removed");
            viewEmployees()
        });
    })
        .catch(err => {
            console.log("err: ", err);
        })
}

function updateEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employee_id',
            message: 'Enter the Employee ID you want to update',
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Enter the new Role ID for the Employee',
        }
    ]).then(answers => {

        // we make our DATABASE Query
        pool.query('UPDATE employees SET role_id = $1 WHERE id = $2', [answers.role_id, answers.employee_id], function (err, data) {
            if (err) {
                console.log("err: ", err);
            }
            console.log("Employee Updated");
            viewEmployees()
        });
    })
        .catch(err => {
            console.log("err: ", err);
        });
}

// kick things off
askQuestions();