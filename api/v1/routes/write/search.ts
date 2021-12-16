import { Router } from 'express';
import bins from '../../../../src/data/schemas/bins';

const router = Router();

router.get('/search/:query', (req,res) => {
    let query = req.params.query;

    if(!query) {
        return res.status(404).json({
            error: "Please Provide A query"
        })
    }

    if(typeof query !== 'string') {
        return res.status(404).json({
            error:"please Provide The query As String"
        })
    }

    bins.find({isprivate:false})
    .then((r) => {
        let results = r.filter((i:any) => {
            return i.title.toLowerCase().indexOf(String(query).toLowerCase()) !== -1;
        })
        .map((e:any) => {
            return {
                title:e.title,
                havePassword: e.password != null,
                Language: e.language,
                Code: e.Code,
                ID: e.ID,
                createdAt: e.createdAt,
                updatedAt: e.updatedAt
            }
        })
        return res.json({
            Bins: results,
            length: results.length
        })
    })
    .catch((err) => console.error(err))
})

export default router;