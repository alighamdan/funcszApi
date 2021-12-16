import axios from "axios";
import { parseHTML } from "linkedom";
import { clearInterval } from "timers";

function GithubGistCodes(query: string): Promise<
  Array<{
    code: string;
    sourceURL: string;
  }>
> {
  return new Promise(async (resolve, reject) => {
    let array: any[] = [];
    let urls = await GithubGistsUrls(query);
    for await (const url of urls) {
      try {
        let data = await GithubGistsSnippet(url);
        array.push(data);
      } catch (error) {}
    }
    return resolve(
      array.map((e: any) => {
        return { code: e.code, sourceURL: e.sourceURL };
      })
    );
  });
}

function GithubGistsSnippet(url: string): Promise<{
  code: string;
  sourceURL: string;
  author: string;
  projectName: string;
  stars: number;
  forks: number;
}> {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((response) => {
        let doc = parseHTML(response.data).window.document;
        if (
          doc
            .querySelector("table.highlight")
            ?.textContent.replace(/\n {6}\n {8}\n {8}/g, "") == null
        ) {
          return reject(new Error(`No Snippet found In ${url}`));
        }
        return resolve({
          code: doc
            .querySelector("table.highlight")
            ?.textContent.replace(/\n {6}\n {8}\n {8}/g, ""),
          sourceURL: url,
          author: doc.querySelector(".author").textContent,
          projectName: Array.from(doc.querySelectorAll("strong"))
            .map((e: any) => e.textContent.trim())
            .reverse()[0]
            .trim(),
          stars: Array.from(doc.querySelectorAll(".social-count"))
            .map((e: any) => e.textContent.trim())
            .slice(1)[0],
          forks: Array.from(doc.querySelectorAll(".social-count"))
            .map((e: any) => e.textContent.trim())
            .slice(1)
            .reverse()[0],
        });
      })
      .catch(reject);
  });
}

function GithubGistsUrls(query: string): Promise<string[]> {
  return new Promise<string[]>((resolve, reject) => {
    axios
      .get(getSearchURL("gist.github.com", query))
      .then((response) => {
        let regex = new RegExp("(https://gist.github.com/[a-z0-9-/]+)", "gi");
        let urls = response.data.match(regex);
        if (urls.length === 0)
          return reject(new Error(`Cannot Find Any Gist With ${query}`));
        return resolve(urls.slice(0, 10));
      })
      .catch(reject);
  });
}

function stackoverflowCodes(
  query: string
): Promise<Array<{ code: string; sourceURL: string }>> {
  return new Promise(async (resolve, reject) => {
    let array: any[] = [];
    var lnkoke: any[] = await getAllstackoverflowurls(query);

    for await (const link of lnkoke) {
      GetStackoverFlowUrlCodesData(link)
        .then(async (snippet) => {
          for await (const snip of snippet) {
            array.push(snip);
          }
        })
        .catch(console.error);
    }
    let a = setInterval(() => {
      if (array.length === 0) return;
      setTimeout(() => {
        clearInterval(a);
        return resolve(array);
      }, 3000);
    }, 300);
  });
}
async function GetStackoverFlowUrlCodesData(
  url: string
): Promise<{ code: string; sourceURL: string }[]> {
  let array: any[] = [];
  let a = new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(({ data }) => {
        let docs = parseHTML(data).window.document;
        let answers = Array.from(docs.querySelectorAll(".answer")).filter(
          (e: any) => {
            return e.querySelector("code") !== null;
          }
        );
        if (answers.length === 0) return reject("No Answers In This Url");
        answers
          .map((item: any) => {
            return {
              code: item.querySelector("code").textContent,
              sourceURL: `https://stackoverflow.com${
                item.querySelector(".js-share-link")?.href
              }`,
            };
          })
          .forEach((snippet, index, list) => {
            array.push(snippet);
            if (index === list.length - 1) return resolve("Done");
          });
      })
      .catch(reject);
  });
  return new Promise((resolve, reject) => {
    a.then(() => {
      return resolve(array);
    }).catch(reject);
  });
}

function getAllstackoverflowurls(query: string): Promise<string[]> {
  return new Promise<string[]>((resolve, reject) => {
    axios
      .get(getSearchURL("stackoverflow.com", query))
      .then((response) => {
        let regex = new RegExp(`(https://stackoverflow.com/[a-z0-9-/]+)`, "gi");
        let urls = response.data.match(regex);
        return resolve(urls || []);
      })
      .catch(reject);
  });
}

function getSearchURL(site: string, keyword: string) {
  return `https://www.google.com/search?q=site%3A${site}+${keyword.replace(
    /\s/g,
    "+"
  )}`;
}

function TabnineCodes(
  query: string,
  type: string = "javascript"
): Promise<
  Array<{
    code: string;
    author: string;
    projectName: string;
    fileName: string;
    sourceURL: string;
  }>
> {
  return new Promise((resolve, reject) => {
    if (!["javascript", "java"].includes(type))
      return reject(new Error(`Please Only Java Or Javascript`));
    axios
      .get(SearchTabnine(query, type))
      .then((data) => {
        if (data.data.toLowerCase().includes("No snippets found...")) {
          return reject(new Error(`No Snippet Has Been Found`));
        }
        let doc = parseHTML(data.data).window.document;
        let codes = Array.from(doc.querySelectorAll(".SnippetCard")).map(
          (item: any) => {
            return {
              code: item.getElementsByClassName("SnippetCode-wrapper")[0]
                .textContent,
              author: item
                .getElementsByClassName("source")[0]
                .querySelector("div a b")
                .textContent.split("")
                .reverse()
                .slice(1)
                .reverse()
                .join(""),
              projectName: item
                .getElementsByClassName("source")[0]
                .querySelectorAll("a b")[1].textContent,
              fileName: item.querySelector(".label").textContent,
              sourceURL: item.querySelector(".source").querySelector("a").href,
            };
          }
        );
        return resolve(codes);
      })
      .catch(reject);
  });
}

function SearchTabnine(query: string, type: string) {
  return `https://www.tabnine.com/code/${type}/query/"${encodeURI(query)}"`;
}

export { TabnineCodes, stackoverflowCodes, GithubGistCodes };
