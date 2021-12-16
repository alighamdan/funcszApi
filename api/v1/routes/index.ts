import { Router } from "express";
import { readdirs } from "../../../src/functions";
// import tabnine from "./code/tabnine";
// import stackoverflow from "./code/stackoverflow";
// import githubgist from "./code/gistgithub";
// import code from "./code/code";
// import prettie from "./code/prettie";
// import image from "./reads/image";
// import tts from "./reads/tts";
// import alternative from "./reads/alternative";
// import qrRead from "./reads/readQR";
// import isvirus from "./reads/isvirus";
// import anime from "./search/anime";
// import question from "./search/question";
// import wiki from "./search/wiki";
// import weather from "./search/weather";
// import createBin from "./write/create";
// import deleteBin from "./write/delete";
// import searchBin from "./write/search";
// import GetBin from "./write/get";
// import chatbot from "./ai/chatbot";
// import snippet from './ai/snippet';
// import lyrics from './search/lyrics';

const router = Router();

// router.use("/code", tabnine);
// router.use("/code", githubgist);
// router.use("/code", stackoverflow);
// router.use("/code", code);
// router.use("/code", prettie);
// router.use("/read", image);
// router.use("/read", tts);
// router.use("/read", alternative);
// router.use("/read", qrRead);
// router.use("/read", isvirus);
// router.use("/search", anime);
// router.use("/search", question);
// router.use("/search", wiki);
// router.use("/search", weather);
// router.use('/search', lyrics)
// router.use("/bin", createBin);
// router.use("/bin", deleteBin);
// router.use("/bin", searchBin);
// router.use("/bin", GetBin);
// router.use("/ai", chatbot);
// router.use("/ai", snippet);

readdirs(__dirname, ".ts")
  .filter((e) => !e.includes("index.ts"))
  .filter((e) => !e.includes("functions.ts"))
  .filter((e) => e.endsWith(".ts"))
  .forEach((dir, i) => {
    let route = require(dir).default;
    if (!route) return;
    let d = extract(dir);
    router.use(`/${d.type}`, route);
    console.log(
      `${
        i + 1 > 9 ? i + 1 : i + 1 + " "
      }- Loaded V1: ${`/${d.type}`} ${`Router: ${`/${d.RouterName}`}`}`.rainbow
        .bold,
      "  Method: ".white,
      `${Object.keys(
        require(dir).default.stack[0].route.methods
      )[0].toUpperCase()}`.rainbow.bgBlack.italic
    );
  });

export default router;

function extract(string: string) {
  let type = string.split("/").reverse().slice(1)[0];
  let RouterName = string.split("/").reverse()[0].replace(".ts", "");
  return {
    type,
    RouterName,
  };
}
