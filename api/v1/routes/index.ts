import { Router } from "express";
import { readdirs } from "../../../src/functions";

const router = Router();


// loop over all routes
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
      }- Loaded V1: ${`/${d.type}`} ${`Router: ${route.stack[0].route.path}`}`.rainbow
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
