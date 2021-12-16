import { Router } from "express";
import { GithubGistCodes } from "./functions";

const router = Router();

router.get('/github-gist',(req,res) => {
    let q= req.query.q;
    let limit = req.query.limit;
    let start = Date.now()
    if(!q) return res.status(404).json({msg:"Please Provide q Param"});
    GithubGistCodes(String(q))
    .then((snippets) => {
        let endtime = Date.now();
        let elapsed = endtime- start
        if(limit && !isNaN(Number(limit))) {
            res.json({elapsedTimeInMS:elapsed,codes:snippets.slice(0,Number(snippets))})
        }else res.json({elapsedTimeInMS:elapsed,codes:snippets});
    })
    .catch((err) => {
        res.status(500).json({msg:'Some Thing Went Wrong',err})
    });
});

export default router;
