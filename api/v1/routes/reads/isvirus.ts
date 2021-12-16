import { Router } from "express";
const { URL } = require("url");
const lookup: {
  checkMulti: (urls: string[]) => Promise<{ [key: string]: boolean }>;
  checkSingle: (url: string) => Promise<boolean>;
} = require("safe-browse-url-lookup")({
  apiKey: "AIzaSyAmdZcPvL7Mc09iDRkQKoaf50UiF6-mJkE",
});

const router = Router();

router.post("/isvirus", async (req, res) => {
  const url = req.body.url;
  if (!url) {
    return res.status(404).json({
      error: "Please Provide url Param",
    });
  }
  let validurls: any[] = [];
  let invalidurls: any[] = [];
  try {
    if (Array.isArray(url)) {
      url.forEach((ur: any) => {
        try {
          new URL(String(ur));
          validurls.push(ur);
        } catch (error) {
          invalidurls.push(ur);
        }
      });
    } else new URL(String(url));
  } catch (error) {
    res.status(404).json({
      error: "Please Send A Valid URL",
    });
  }
  let safeUrls: any[] = [];
  let unsafeUrls: any[] = [];
  var theURL: any = {};
  if (Array.isArray(url)) {
    await lookup
      .checkMulti(validurls)
      .then((urls) => {
        for (let url in urls) {
          let isvirus = urls[url];
          if (isvirus) {
            unsafeUrls.push({
              url: url,
              isvirus: isvirus,
            });
          } else {
            safeUrls.push({
              url: url,
              isvirus: isvirus,
            });
          }
        }
      })
      .catch((err) => {
        return res.status(404).json({
          error: "Some Thing Went Wrong",
          err,
        });
      });
  } else {
    await lookup
      .checkSingle(String(url))
      .then((isvirus) => {
        theURL = {
          url: url,
          isvirus,
        };
      })
      .catch((err) => {
        return res.status(404).json({
          error: "Some Thing Went Wrong",
          err,
        });
      });
  }

  let l = setInterval(() => {
    if (Array.isArray(url)) {
      if (validurls.length === 0) return;
      clearInterval(l);
      return res.json({
        urls: url,
        data: {
          safeUrls,
          unsafeUrls,
        },
        validUrls: validurls,
        invalidurls: invalidurls,
      });
    } else {
      if (theURL?.isvirus == null) return;
      clearInterval(l);
      return res.json({
        urls: url,
        data: theURL,
      });
    }
  }, 300);
});

export default router;
