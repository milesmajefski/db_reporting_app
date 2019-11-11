-- List albums grouped by artist
CREATE TEMPORARY TABLE temp.result AS
SELECT
  albums.title,
  artists.name
FROM artists
JOIN albums ON artists.ArtistID = albums.ArtistID
ORDER BY
  artists.name;