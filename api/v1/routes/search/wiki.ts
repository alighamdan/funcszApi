import { Router } from 'express';
import axios from 'axios';

const router = Router();

router.get('/wiki',(req,res) => {
    let question = req.query.q;
    if(!question) {
        return res.status(404)
        .json({
            error:"Please Provide A q Param"
        })
    }
    axios.get(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${question}`
    )
    .then(({data}) => {
        return res.json(data)
    })
    .catch((err) => {
        return res.status(404).json({
            error:"Cannot Find This Question",err
        })
    })
})
export default router;