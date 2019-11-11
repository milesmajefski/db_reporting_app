-- List all artists, in no particular order
CREATE TEMPORARY TABLE temp.result AS
SELECT
  artists.name
FROM artists;