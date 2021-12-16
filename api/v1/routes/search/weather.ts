import { Router } from "express";
const weather: {
  find: (
    options: {
      search: string;
      degreeType: string;
    },
    callback: (error: any | null, result: any[]) => void
  ) => void;
} = require("weather-js");

const router = Router();

router.get('/weather',(req,res) => {
    let query = req.query.q;
    let degreeType = req.query.degreeType;
    if(!query) {
        return res.status(404).json({
            error: "Please Provide a valid query (q ) Parameters"
        })
    }
    if(!degreeType) degreeType = 'c';
    degreeType = String(degreeType).toUpperCase();

    weather.find({
        search:String(query),
        degreeType
    },(error,result) => {
        if(error) return res.status(404).send(error);
        else return res.status(200).json(result);
    })
})

export default router;
