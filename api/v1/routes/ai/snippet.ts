import { Router } from "express";
import axios from "axios";

const router = Router();

router.get("/snippet", (req, res) => {
  let q = req.query.q;
  if (!q || typeof q !== "string") {
    return res.status(404).json({
      error: "Please Provide q Param",
    });
  }

  axios
    .post("https://app-api.quod.ai/query_questions?offset=0&limit=10", {
      term: "repo:[github/mayeaux/nodetube] " + String(q),
      scope: ["github/mayeaux/nodetube"],
      allows_skipped: true,
      allows_low_impact: false,
      sort: [],
      aggregated_by_tag: false,
      aggregated_by_repo: false,
      aggregated_by_folder_path: false,
      aggregated_by_file_path: false,
      aggregated_by_file_type: false,
      aggregated_by_last_modified: false,
      with_collections: true,
      with_highlight: true,
    })
    .then(({ data:{data} }) => {
      return res.json({
        data: data
          .filter((e: any) => e.snippets[0]?.code != null)
          .map((e: any) => {
            return {
              snippet: e.snippets[0].code,
            };
          }).sort((a:any,b:any) => {
              return b.snippet?.length - a.snippet?.length
          }),
      });
    })
});

export default router;
