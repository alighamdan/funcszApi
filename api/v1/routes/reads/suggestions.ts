import { Router } from 'express';
import axios from 'axios';

const router = Router();

router.get('/idea', (req,res) => {
    axios.get(
        `https://kq4z97l2ba.execute-api.ap-northeast-1.amazonaws.com/dev/get`
    )
    .then(({data}) => {
        return res.json({
            idea: data.idea
        })
    })
    .catch((err) =>{
        return res.status(404).json({
            error:"Some Thing Went Wrong"
        })
    })
})

export default router;