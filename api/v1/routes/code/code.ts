import { Router } from "express";
import { GithubGistCodes, stackoverflowCodes, TabnineCodes } from "./functions";

const router = Router();

router.get("/snippet", async (req, res) => {
  let q = req.query.q;
  let limit = req.query.limit;
  let start = Date.now();
  if (!q) return res.status(404).json({ msg: "Please Provide q Param" });
  let array:any[];
  try {
    array = [
      ...(await GithubGistCodes(String(q))),
      ...(await stackoverflowCodes(String(q))),
      ...(await TabnineCodes(String(q))).map((e: any) => {
        return {
          code: e.code,
          sourceURL: e.sourceURL,
        };
      }),
    ];
  } catch (error) {
    console.error(error);
  }
  let endtime = Date.now();
  let elapsed = endtime - start;

  let i:any = setInterval(() => {
    if (typeof array === "undefined") return;
    if (limit && !isNaN(Number(limit))) {
      res.json({
        elapsedTimeInMS: elapsed,
        codes: array.slice(0, Number(limit)),
      });
    } else res.json({ elapsedTimeInMS: elapsed, codes: array });
    return clearInterval(i);
  });
});

export default router;
