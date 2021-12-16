import { Router } from 'express';
import axios from 'axios';

const router = Router();

router.get('/qr-read',(req,res) => {
    let url = req.query.url;
    if(!url) {
        return res.status(404).json({
            msg:"Please Provide A url Param"
        })
    }
    axios.get(`http://api.qrserver.com/v1/read-qr-code/?fileurl=${url}`)
    .then(({data}) => {
        res.json(data)
    }).catch(err=>{
        res.status(404).send(err)
    })
})

export default router;