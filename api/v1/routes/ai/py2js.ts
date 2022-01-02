import { Router } from "express";
import { format } from "prettier";
const rapydscript = require("rapydscript");
const router = Router();

router.post("/py-to-js", (req, res) => {
  let code = req.body.code;
  if (!code || typeof code !== "string") {
    return res.status(404).json({
      error: "Please Provide code Body",
    });
  }

  try {
    var result = rapydscript.compile(code, { omit_baseli: "" });
  } catch (err) {
    return res.status(404).json({
      error: "Some Thing Went Wrong While Converting",
      err,
    });
  }

  return res.json({
    code: result,
    prettied: format(result, { parser: "babel" }),
  });
});

export default router;
