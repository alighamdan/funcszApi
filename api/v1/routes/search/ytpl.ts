import { Router } from 'express';
import ytsr from 'youtube-sr';

const router = Router();

router.get('/ytpl',async(req,res) => {
    let id = req.query.id;
    if (!id || typeof id !== 'string') {
        return res.status(404).json({
            error:"Please provide a id Parameters"
        })
    }

    ytsr.getPlaylist(String(id))
    .then((p) => p.fetch())
    .then((playlistVideos) => {
        return res.json(playlistVideos)
    })
    .catch((err) => {
        return res.status(500).json({
            error:"Cannot Get Playlist Videos",
            err
        })
    })
})

export default router;