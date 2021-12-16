import { format,getSupportInfo } from "prettier";
import { Router } from "express";

const router = Router();

router.post("/prettie", (req, res) => {
  let code = req.body.code;
  let lang = req.body.language;

  if(!code) {
      return res.status(404).json({
          error:"Please Send Your Code In code Body"
      })
  }
  let parsersTypes = [
    "babel",
    "babel-flow",
    "babel-ts",
    "flow",
    "typescript",
    "espree",
    "meriyah",
    "css",
    "scss",
    "less",
    "json",
    "json5",
    "json-stringify",
    "graphql",
    "markfown",
    "mdx",
    "html",
    "vue",
    "anular",
    "lwc",
    "yaml",
  ];
  if(lang) {
    if(lang.toLowerCase() === 'javascript') {
        return res.status(404).json({
            error:"Use 'babel' Instead Of Javascript"
        })
    }

      if(!parsersTypes.includes(lang.toLowerCase())) {
          return res.status(404).json({
              error:"lang body Has No Supported Check All Supported Types",
              supportedTypes: getSupportInfo()
          })
      }
  }
  let formatted = format(
    typeof code !== "string" ? JSON.stringify(code) : code,
    {
        parser: !lang ? null:lang
    }
  );
  if(formatted === code) {
    return res.json({
      status:"This Code Is Already Formatted"
    })
  }
  return res.json({formatted})
});

export default router;
