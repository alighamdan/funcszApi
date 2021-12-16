import { Router } from "express";
import bins from "../../../../src/data/schemas/bins";

const router = Router();

router.get("/get/:id", async (req, res) => {
  let id = req.params.id;

  if (!id) {
    return res.status(404).json({
      error: "Please Provide The id",
    });
  }

  let data: {
    title: String;
    password: String | null;
    language: String;
    Code: String;
    ID: String;
    isprivate: Boolean;
    Token: String;
    createdAt: Date;
    updatedAt: Date;
  } = await bins.findOne({ isprivate: false, id: id });

  if (!data) {
    return res.status(404).json({
      error: "There Is No Bin With This ID",
    });
  }

  return res.json({
    title: data.title,
    havePassword: data.password != null,
    language: data.language,
    Code: data.Code,
    ID: data.ID,
    CreatedAt: data.createdAt,
    UpdatedAt: data.updatedAt,
  });
});

export default router;
