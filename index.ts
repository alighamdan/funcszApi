import { table } from "table";
import express from "express";
import colors from "colors";
import { readdirs } from "./src/functions";
import mongoose from "mongoose";
import { readdirSync, writeFileSync } from "fs";
import { format } from "prettier";

mongoose.connect("mongodb://localhost:27017/funcszApi", (err) => {
  if (err)
    return console.error("Some Thing Went Wrong When Connecting With mongoDB");
  else return console.log(`Mongodb Connected Successfully!`);
});

// setup express routes
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

readdirSync("./api", {
  withFileTypes: true,
})
  .filter((e) => {
    return e.isDirectory() && e.name.toLowerCase().startsWith("v");
  })
  .forEach((folder, index, mainList) => {
    let ver = require(`./api/${folder.name}/routes/index`).default;
    app.use(`/api/${folder.name}`, ver);
    let apiroutes = readdirs(`./api/${folder.name}/routes`, ".ts")
      .filter((e) => !e.includes("functions.ts"))
      .filter((e) => !e.includes("index.ts"))
      .filter((e) => e.endsWith(".ts"));
    let all: any = {};
    apiroutes.forEach((fileDir) => {
      let route = require(fileDir).default;
      if (!route || !route.stack[0]) return;
      if (!all[folder.name]) all[folder.name] = [];
      if (
        all[folder.name]
          .map((e: any) => e.router.path)
          .includes(route.stack[0].route.path) &&
        all[folder.name]
          .map((e: any) => e.routeType)
          .includes("/" + fileDir.split("/").reverse().slice(1)[0])
      ) {
        return;
      }
      return all[folder.name].push({
        version: folder.name,
        routeType: "/" + fileDir.split("/").reverse().slice(1)[0],
        router: {
          method: Object.keys(route.stack[0].route.methods)[0].toUpperCase(),
          path: route.stack[0].route.path,
        },
        example: `/api/${folder.name}/${
          fileDir.split("/").reverse().slice(1)[0]
        }${route.stack[0].route.path}`,
      });
    });

    writeFileSync(
      "./apiVersionRequest.json",
      format(JSON.stringify(all), {
        parser: "json",
      })
    );

    app.listen(3000, () => {
      console.log(
        table(
          [
            [colors.bold("Version"), colors.bold("EndPoints")],
            ...mainList.map(() => {
              return [
                colors.bold(folder.name),
                apiroutes.length > 20
                  ? `${colors.bold.green(apiroutes.length.toString())}`
                  : `${colors.bold.red(apiroutes.length.toString())}`,
              ];
            }),
          ],
          {
            header: {
              content: colors.yellow.bold(
                "All Api Versions And EndPoints Length"
              ),
            },
            columnDefault: {
              width: 20,
            },
          }
        )
      );
    });
  });
