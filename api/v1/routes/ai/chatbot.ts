import axios from "axios";
import { Router } from "express";

const router = Router();

router.get("/chatbot", (req, res) => {
  let message = req.query.message;

  if (!message || typeof message !== "string") {
    return res.status(404).json({
      error: "please Provide A message Param",
    });
  }

  // make an http get request to the ai api
  axios
    .get(
      `https://api.affiliateplus.xyz/api/chatbot?message=${encodeURI(
        message
      )}&botname=funcsz&ownername=ali ghamdan&user=1`
    )
    .then(({ data }) => {
      return res.json(data);
    })
    .catch((err) => {
      return res.status(404).json({
        error: "Some Thing Went Wrong",
        err,
      });
    });
});

export default router;
