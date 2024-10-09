INSERT INTO departments (department_name)
VALUES  ('Legal'),
        ('Sales'),
        ('Engineering');

INSERT INTO roles (title, salary, department_id)
VALUES  ('Lawyer', 100000, 1),
        ('Salesperson', 50000, 2),
        ('Sales Manager', 80000, 2),
        ('Jr Engineer', 75000, 3),
        ('Sr Engineer', 125000, 3);

INSERT INTO employees (first_name, last_name, role_id)
VALUES  ('Tom', 'Jones', 1),
        ('Mary', 'Green', 2),
        ('Jim', 'Young', 2),
        ('Tony', 'Dungy', 3),
        ('Pete', 'Carroll', 4),
        ('Lance', 'Reddick', 4),
        ('Geno', 'Smith', 5);