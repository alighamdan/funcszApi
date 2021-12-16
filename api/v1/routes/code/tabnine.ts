import { Router } from 'express';
import { TabnineCodes } from './functions'

const router = Router();

router.get('/tabnine', (req, res) => {
    let q = req.query.q;
    let type = req.query.type;
    let limit = req.query.limit;
    if (!q) return res.status(404).json({
        "msg": "q Param Is Missing"
    });
    let start = Date.now();
    if (!type) type = 'javascript';
    TabnineCodes(String(q), String(type))
        .then((codes) => {
            let endtime = Date.now();
            let elapsed = endtime - start
            if (limit && !isNaN(Number(limit))) {
                res.json({
                    elapsedTimeInMS: elapsed,
                    codes: codes.slice(0, Number(limit))
                })
            } else res.json({
                elapsedTimeInMS: elapsed,
                codes: codes
            })
        })
        .catch((error) => {
            res.status(404).json(error)
        })
});

export default router;