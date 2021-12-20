import { Router } from "express";
import ytsr from "../../../../src/youtube-sr";

const router = Router();

router.get("/ytpl", async (req, res) => {
  let q = req.query.q;
  if (!q || typeof q !== "string") {
    return res.status(404).json({
      error: "Please provide a q Parameter",
    });
  }

  ytsr
    .search(String(q), { type: "playlist", safeSearch: false })
    .then((playlistVideos) => {
        return res.json(playlistVideos)
    })
    .catch((err) => {
      return res.status(404).json({
        error: "Cannot Get Playlist Videos",
        err,
      });
    });
});

export default router;
