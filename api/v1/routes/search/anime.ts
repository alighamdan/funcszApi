import { Router } from 'express';
import axios from 'axios';

const router = Router();

router.get('/anime',(req,res) => {
    let image = req.query.url;
    if(!image){
        return res.status(404)
        .json({
            error:"Please Provide url Param"
        })
    }
    axios.get(`https://api.trace.moe/search?url=${encodeURIComponent(String(image))}`)
    .then(({data})=>{
        return res.json(data)
    }).catch((err) => {
        return res.status(404).json({
            error:true,err
        })
    })
})

export default router;