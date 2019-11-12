-- List the customer count for all employees
CREATE TEMPORARY TABLE temp.result AS
SELECT
  employees.LastName,
  employees.FirstName,
  COUNT(*) as CustomerCounts
FROM employees
JOIN customers ON customers.SupportRepId = employees.EmployeeId
GROUP BY
  employees.EmployeeId
ORDER BY
  employees.LastName;