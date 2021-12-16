import { Router } from 'express';
import { stackoverflowCodes } from './functions';

const router = Router();

router.get('/stackoverflow', (req, res) => {
    let q = req.query.q;
    let limit = req.query.limit;
    if (!q) return res.status(404).json({ msg: "Please Provide q Param" })
    let start = Date.now();
    stackoverflowCodes(String(q))
        .then((codes) => {
            console.log(codes)
            let endtime = Date.now();
            let elapsed = endtime - start;
            if (limit && !isNaN(Number(limit))) {
                res.json({ elapsedTimeInMS: elapsed, codes: codes.slice(0, Number(limit)) })
            } else res.json({ elapsedTimeInMS: elapsed, codes: codes })
        })
        .catch((err) => {
            res.status(500).json(err)
        });
});

export default router;