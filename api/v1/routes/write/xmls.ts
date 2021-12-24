import { Router } from "express";
import { format } from "prettier";
import X2JS from "x2js";

const router = Router();

router.post("/xml2json", (req, res) => {
  var code = req.body.code;
  if (!code) {
    return res.status(404).json({
      error: "Please Provide a valid Json Code",
    });
  }
  const regex = new RegExp('<[^>]*>[a-z0-9-/-\s]+?<\/>','gi')
  try {
    new X2JS().xml2js(code.replace(regex,''));
  } catch (error) {
    return res.status(500).json({
      error: "Some Thing Wrong In Your JSON Syntax",
    });
  }

  const XML = new X2JS({ keepText: true, skipEmptyTextNodesForObj: true });
  return res.json({
    code: new X2JS({ skipEmptyTextNodesForObj: true }).xml2js(code.replace(regex,'')),
    prettied: {
      json: format(JSON.stringify(XML.xml2js(code.replace(regex,''))), {
        parser: "json",
      }),
      xml: format(code.replace(regex,''), {
        parser: "html",
      })
    },
    details: XML.xml2js(code.replace(regex,'')),
  });
});

export default router;
