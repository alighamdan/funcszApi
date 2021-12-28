const tsCompiler: {
    compileString: (tscode:string)=> string
} = require('typescript-compiler');
import { Router } from 'express';
import { format } from 'prettier'

const router = Router();

router.post('/ts-compiler', function (req, res) {
    let code = req.body.code;

    if(!code || typeof code !== 'string') { 
        return res.status(404).json({
            error: "Please Provide a valid typescript code"
        });
    }

    return res.json({
        code: tsCompiler.compileString(code), 
        prettied: format(tsCompiler.compileString(code), { parser: "babel"})
    })
})

export default router;