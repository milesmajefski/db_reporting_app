-- List all invoices, highest first
CREATE TEMPORARY TABLE temp.result AS
SELECT
  I.InvoiceId,
  I.InvoiceDate,
  I.CustomerId,
  customers.FirstName,
  customers.LastName,
  customers.Company,
  I.Total
FROM invoices as I
JOIN customers ON I.CustomerId = customers.CustomerId
WHERE
  I.InvoiceDate BETWEEN '2013-10-01T00:00:00Z'
  AND '2014-01-01T00:00:00Z'
ORDER BY
  I.InvoiceDate DESC;