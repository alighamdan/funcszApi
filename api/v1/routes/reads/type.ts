import { Router } from "express";
const wd: {
  getDef: (
    word: string,
    language: "en" | "fr" | "de",
    options: null,
    cb: (definition: {
      word: string;
      category: string;
      definition: string;
      err: string | null;
    }) => void
  ) => void;
} = require("word-definition");

const router = Router();

router.post("/type", async (req, res) => {
  let word = req.body.word;
  let language = req.body.language;

  if(!language || !['en','fr','de'].includes(language)) language = 'en'

  if (!word) {
    return res.status(404).json({
      error: "Please Provide In word param",
    });
  }

  var words: string[];
  if (Array.isArray(word)) {
    words = word;
  } else if (String(word).split(" ").length > 1) {
    words = String(word).split(" ");
  } else if (typeof word === "string") {
    words = [word];
  }
  let all: any[] = [];

  setTimeout(() => {
    importAll(all, words,language).then(() => {
      let i = setInterval(() => {
        if (all.length !== words.length) return;
        clearInterval(i);
        return res.json({
          isArray: Array.isArray(word),
          words: all.filter((e: any) => {
            return e.err == null;
          }),
          unknownWords: all.filter((e: any) => {
            return e.err != null && e.word !== ''
          }),
        });
      }, 300);
    });
  }, 1000);
});

export default router;

function importAll(array: any[], words: string[],language:'en'|'fr'|'de'): Promise<void> {
  return new Promise((resolve, reject) => {
    words.forEach((word, index, list) => {
      wd.getDef(cleanedText(word), language, null, (def) => {
        array.push(def);
      });
      if (index === list.length - 1) return resolve();
    });
  });
}

function cleanedText(string:string) {
    let al = [
        ".",
        "`",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "0",
        "-",
        "=",
        "!",
        "@",
        "#",
        "$",
        "%",
        "^",
        "&",
        "*",
        "(",
        ")",
        "_",
        "+",
        " ",
        ";",
        ".",
        "/",
        "'",
        ":",
        "<",
        ">",
        "?",
        "}",
        "{",
        "[",
        "]",
        "|",
        "َ",
        "ً",
        "ُ",
        "ُ",
        "ٌ",
        "ْ",
        "ٍ",
        "ِ",
        "ْ",
        "~",
        "َ"
    ]

    al.forEach((e) => {
        string = string.replace(e,'');
    });
    
    return string
}