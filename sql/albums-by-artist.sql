-- List albums grouped by artist
CREATE TEMPORARY TABLE temp.result AS
SELECT
  artists.name,
  group_concat(albums.title, " | ") AS Albums
FROM artists
JOIN albums ON artists.ArtistID = albums.ArtistID
GROUP BY
  artists.name
ORDER BY
  artists.name;