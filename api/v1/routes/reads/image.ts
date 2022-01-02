import { Router } from "express";
import { recognize } from "tesseract.js";
import { URL } from "url";

const router = Router();

router.post("/image", async (req, res) => {
    let image = req.body.image;
    if (!image)
        return res.status(404).send({ msg: "Cannot Find image Body Must Be URL" });
    let start = Date.now();
    try {
        let aaaurl = new URL(image);
        if (!["http:", "https:"].includes(aaaurl.protocol)) {
            return res.status(404).json({
                msg: "Please Send A Image Url",
            });
        }
    } catch (error) {
        return res.status(404).json({
            msg: "Please Send A Image Url",
        });
    }
    try {
        recognize(
            image,
            "eng",// export as english language
            {
                errorHandler: (ar: any) => {
                    res.json({ msg: "Some Thing Went Wrong", error: ar })
                    return false
                },
                langPath: __dirname + "/lang-data"// the train data folder
            }
        )
            .then(({ data: { text } }) => {
                let endtime = Date.now();
                let elapsed = endtime - start
                res.json({
                    elapsedTimeInMS: elapsed,
                    content: text,
                });
            })
            .catch((error: any) => {
                res.json({
                    msg: "Something went wrong",
                    error,
                });
            });
    } catch (error) {
        res.status(400).json({
            msg: "Please Check Your Image Status",
            error,
        });
    }
});


export default router;
