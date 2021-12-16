import { Router } from 'express';
import axios from 'axios';

const router = Router();

router.get('/question',(req,res) => {
    let q = req.query.q;

    if(!q) {
        return res.status(404)
        .json({
            error:"Please Provide q Param"
        })
    }

    axios.get(`https://api.stackexchange.com/2.3/search/advanced?order=desc&sort=activity&q=${encodeURI(String(q))}&site=stackoverflow`)
    .then(({data}) => {
        return res.json(
            data
        )
    })
    .catch(err=>{
        return res.status(404).json({
            err
        })
    })
});

export default router;
