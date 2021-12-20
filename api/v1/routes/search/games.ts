import { Router } from "express";
import axios from "axios";
import { parseHTML } from "linkedom";

const router = Router();

router.get("/games", (req, res) => {
    let q = req.query.q;
    if (!q || typeof q !== "string") {
        return res.status(404).json({
            error: "Please Provide q Param",
        });
    }
    getGames(String(q).replace(/%20/g,'+').replace(/\s/g,'+'))
    .then(data => {
        return res.json(data)
    })
    .catch(err => {
        return res.status(404).json({
            error:"Cannot Load the Games",err
        })
    })

});

export default router;

async function getGames(query: string) {
    return new Promise(async (resolve, reject) => {
        let response: any = await axios.get(
            `https://www.game-debate.com/search/games?t=games&query=${query
                .replace(/\s/g, "+")
                .replace(/%20/g, "+")}`
        );

        let doc: any = parseHTML(response.data).document;

        let urls: any = Array.from(doc.querySelectorAll("a")).filter((url: any) =>
            url.href.startsWith(`/games/index.php?`)
        );

        if (urls.length === 0) return reject(new Error("No Search Found"));

        let array: any[] = [];

        Array.from(doc.querySelectorAll(".search-result"))
            .map((item: any, index: any) => {
                return {
                    url: `https://www.game-debate.com` + urls[index].href || null,
                    image: item.querySelector(".search-result-image img").src,
                    name: item.querySelector(".search-result-detail h2")?.textContent,
                    description: item.querySelector(".search-result-detail p")
                        ?.textContent,
                };
            })
            .forEach((item: any) => {
                gameRequirments(item.url).then((GameReqs) => {
                    array.push(GameReqs);
                });
            });

        let i = setInterval(() => {
            if (array.length === 0) return;

            clearInterval(i);

            setTimeout(() => {
                return resolve(array);
            }, 1000);
        }, 300);
    });
}


function gameRequirments(url: string) {
    return new Promise((resolev) => {
        axios.get(url).then(({ data }) => {
            let doc: any = parseHTML(data).window.document;
            let minmumRequirments: any = doc
                .querySelector(".devDefSysReqMinWrapper")
                ?.textContent.replace(/\n\n/g, "\n")
                .replace(/\n\n\n/g, "\n");
            let maxmumRequirments: any = doc
                .querySelector(".devDefSysReqRecWrapper")
                ?.textContent.replace(/\n\n/g, "\n")
                .replace(/\n\n\n/g, "\n");

            let aboutGameRequirment: any = doc.querySelector(
                ".hardwareDescriptionNew"
            )?.textContent;
            let a: any = Array.from(
                doc.querySelectorAll(".game-release-date p")
            )
            let GameRelase: any = a[1]?.textContent;
            let lolow: any = Array.from(doc.querySelectorAll(".gameFpsGraph div"))
            let GameGraphicsCardCanRunFPS: any = {
                "Graphic Card": {
                    name: lolow[1]
                        ?.textContent.trim()
                        ?.replace(/\n/g, ""),
                    Url:
                        `https://www.game-debate.com` +
                        doc.querySelector(".gameFpsGraph div a")?.href,
                },
                FPS: doc
                    .querySelector(".gameFpsValFigure")
                    ?.textContent.trim()
                    ?.replace(/\n/g, ""),
            };
            let res: any = {
                name: doc
                    .querySelector("head title")
                    .textContent.split("|")[0]
                    .trim()
                    .replace(/\n/g, "")
                    .replace(" System Requirements", ""),
                url: url,
                GameRelase,
                aboutGameRequirment,
            };
            if (doc.querySelector(".gameFpsGraph div a")?.href !== undefined)
                res.BestGrapicCardForGame = GameGraphicsCardCanRunFPS;
            if (minmumRequirments) {
                getRequirment(minmumRequirments)
                    .then((data) => {
                        res.minmiumRequirments = data;
                    })
                    .catch((string) => {
                        res.minmiumRequirments = string;
                    });
            }
            if (maxmumRequirments) {
                getRequirment(maxmumRequirments)
                    .then((data) => {
                        res.maxmiumRequirments = data;
                    })
                    .catch((string) => {
                        res.maxmiumRequirments = string;
                    });
            }

            return resolev(res);
        });
    });
}

function getRequirment(string: string) {
    let reqs: any = {};

    let allreqs = string.toLowerCase().split("\n");

    if (string.includes("OS: ")) {
        let os = string.split("OS: ")[1].split("\n")[0].trim().replace(/\n/g, "");
        reqs.os = os;
    }

    if (
        allreqs.some(
            (e) =>
                e.includes("os") ||
                e.includes("windows") ||
                e.includes("mac") ||
                e.includes("linux")
        )
    ) {
        if (reqs.os == null) {
            reqs.os = allreqs.find(
                (e) =>
                    e.includes("os") ||
                    e.includes("windows") ||
                    e.includes("mac") ||
                    e.includes("linux")
            );
        }
    }

    if (string.includes("Processor: ")) {
        let processor = string
            .split("Processor: ")[1]
            .split("\n")[0]
            .trim()
            .replace(/\n/g, "");
        reqs.processor = processor;
    }

    if (
        allreqs.some(
            (e) =>
                e.includes("processor") || e.includes("intel") || e.includes("core")
        )
    ) {
        if (reqs.processor == null) {
            reqs.processor = allreqs
                .filter(
                    (e) =>
                        e.includes("processor") || e.includes("intel") || e.includes("core")
                )
                .join(", ");
        }
    }

    if (string.includes("Memory: ")) {
        let ram = string
            .split("Memory: ")[1]
            .split("\n")[0]
            .trim()
            .replace(/\n/g, "");
        reqs.ram = ram;
    }

    if (allreqs.some((e) => e.includes("memory"))) {
        if (reqs.ram == null) {
            reqs.ram = allreqs.find((e) => e.includes("memory"));
        }
    }

    if (string.includes("\nRAM: ")) {
        let ram = string
            .split("\nRAM: ")[1]
            .split("\n")[0]
            .trim()
            .replace(/\n/g, "");
        reqs.ram = ram;
    }

    if (allreqs.some((e) => e.includes("ram") && !e.includes("vram"))) {
        if (reqs.ram == null) {
            reqs.ram = allreqs.find((e) => e.includes("ram") && !e.includes("vram"));
        }
    }

    if (string.includes("Graphics: ")) {
        let Graphics = string
            .split("Graphics: ")[1]
            .split("\n")[0]
            .trim()
            .replace(/\n/g, "");
        reqs.graphics = Graphics;
    }

    if (allreqs.some((e) => e.includes("nivdia"))) {
        if (reqs.graphics == null) {
            reqs.graphics = allreqs.find((e) => e.includes("nivdia"));
        }
    }

    if (string.includes("DirectX: ")) {
        let DirectX = string
            .split("DirectX: ")[1]
            .split("\n")[0]
            .trim()
            .replace(/\n/g, "");
        reqs.directx = DirectX;
    }

    if (allreqs.some((e) => e.includes("directx"))) {
        if (reqs.directx == null) {
            reqs.directx = allreqs.find((e) => e.includes("directx"));
        }
    }

    if (string.includes("Network: ")) {
        let Graphics = string
            .split("Network: ")[1]
            .split("\n")[0]
            .trim()
            .replace(/\n/g, "");
        reqs.network = Graphics;
    }

    if (allreqs.some((e) => e.includes("network"))) {
        if (reqs.network == null) {
            reqs.network = allreqs.find((e) => e.includes("network"));
        }
    }

    if (string.includes("Storage: ")) {
        let Storage = string
            .split("Storage: ")[1]
            .split("\n")[0]
            .trim()
            .replace(/\n/g, "");
        reqs.storage = Storage;
    }

    if (allreqs.some((e) => e.includes("storage"))) {
        if (reqs.storage == null) {
            reqs.storage = allreqs.find((e) => e.includes("storage"));
        }
    }

    if (string.includes("VRAM: ")) {
        let VRAM = string
            .split("VRAM: ")[1]
            .split("\n")[0]
            .trim()
            .replace(/\n/g, "");
        reqs.vram = VRAM;
    }

    if (allreqs.some((e) => e.includes("vram"))) {
        if (reqs.vram == null) {
            reqs.vram = allreqs.find((e) => e.includes("vram"));
        }
    }

    if (string.includes("HDD: ")) {
        let HDD = string.split("HDD: ")[1].split("\n")[0].trim().replace(/\n/g, "");
        reqs.hdd = HDD;
    }

    if (allreqs.some((e) => e.includes("hdd"))) {
        if (reqs.hdd == null) {
            reqs.hdd = allreqs.find((e) => e.includes("hdd"));
        }
    }

    return new Promise((resolve, reject) => {
        if (Object.keys(reqs).length === 0) {
            return reject(string);
        } else return resolve(reqs);
    });
}
