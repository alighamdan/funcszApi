import { Router } from "express";
import axios from "axios";

const router = Router();

router.get("/geeks-for-geeks", (req, res) => {
  let q = req.query.q;
  if (!q || typeof q !== "string") {
    return res.status(404).json({
      error: "Please Provide a valid query",
    });
  }
  let formbody = new FormData();
  formbody.append("query", String(q));
  axios
    .post(`https://api.geeksforgeeks.org/post/api/googlesearch/`, formbody)
    .then(({ data }) => {
      return res.json({
        data: data.items,
      });
    })
    .catch((err) => {
      return res.status(404).json({ error: "Some Thing Went Wrong", err });
    });
});

export default router;
