-- List all invoices, in no particular order
CREATE TEMPORARY TABLE temp.result AS
SELECT
  invoices.InvoiceId,
  invoices.InvoiceDate,
  invoices.CustomerId,
  customers.FirstName,
  customers.LastName,
  customers.Company,
  invoices.Total
FROM invoices
JOIN customers ON invoices.CustomerId = customers.CustomerId
ORDER BY invoices.Total DESC;