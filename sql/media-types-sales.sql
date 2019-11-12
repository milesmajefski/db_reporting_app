-- List the sales per media type descending
CREATE TEMPORARY TABLE temp.result AS
SELECT
  media_types.MediaTypeId,
  ROUND (
    SUM(invoice_items.UnitPrice * invoice_items.Quantity),
    2
  ) as Sales
FROM invoice_items
JOIN tracks ON invoice_items.TrackId = tracks.TrackId
JOIN media_types ON tracks.MediaTypeId = media_types.MediaTypeId
GROUP BY
  media_types.MediaTypeId;