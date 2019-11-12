-- List every invoice with all the tracks with artists
CREATE TEMPORARY TABLE temp.result AS
SELECT
  invoices.InvoiceId,
  invoices.InvoiceDate,
  tracks.name as Track,
  artists.name as Artist
FROM invoices
JOIN invoice_items ON invoices.InvoiceId = invoice_items.InvoiceId
JOIN tracks ON invoice_items.TrackId = tracks.TrackId
JOIN albums ON tracks.AlbumId = albums.AlbumId
JOIN artists ON albums.ArtistId = artists.ArtistId
ORDER BY
  invoices.InvoiceDate;