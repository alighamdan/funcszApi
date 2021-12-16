import axios from 'axios';
import { Router } from 'express';

const router = Router();

router.get('/alternative', (req,res) => {
    let query = req.query.query;
    let limit = req.query.limit;
    if(!query) return res.status(404).json({
        msg:"Please Provide query Param"
    });
    if(!limit) limit = "10";
    let start = Date.now();
    axios.post(`https://zidpns2vb0-dsn.algolia.net/1/indexes/fullitems/query?x-algolia-agent=Algolia for JavaScript (4.11.0); Browser (lite)&x-algolia-api-key=88489cdf3a8fbfe07a2f607bf1568330&x-algolia-application-id=ZIDPNS2VB0`,{
        query,
        "hitsPerPage": Number(limit)
    })
    .then(({data}) => {
        let end = Date.now();
        let elapsed = end - start;
        res.json({
            elapsedTimeInMS:elapsed,
            data: data.hits
        })
    }) 
})

export default router;