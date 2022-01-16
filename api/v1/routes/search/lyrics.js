const { Router } = require("express");
const Genius = require("genius-lyrics");

const client = new Genius.Client();
const router = Router();

router.get("/lyrics", async (req, res) => {
  let SongName = req.query.title;
  if (!SongName || typeof SongName !== "string") {
    return res.status(404).json({
      error: "Please Provide A title Param",
    });
  }

  let songs = await client.songs.search(String(SongName));
  let all = [];

  for await (const song of songs) {
      all.push({
          title: song.title,
          image: song.image,
          thumbnail: song.thumbnail,
          lyrics: (await song.lyrics()),
          id: song.id,
          url: song.url,
          artist: {
              name: song.artist.name,
              url: song.artist.url,
              image: song.artist.image
          }
      })
  }
  
  setTimeout(() => {
      setTimeout(() => {
          return res.json({
              songs: all
          })
      }, 1000);
  })
  
});

module.exports.default = router;
