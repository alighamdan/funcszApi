import { Router } from "express";
import BinsSchema from "../../../../src/data/schemas/bins";

const router = Router();

router.post("/create", async (req, res) => {
  let code = req.body.code;
  let language = req.body.language;
  let title = req.body.title;
  let password = req.body.password;
  let isprivate = Boolean(req.body.private);

  if (!code) {
    return res.status(404).json({
      error: "Please Provide code Body",
    });
  }

  if (typeof code !== "string") {
    return res.status(404).json({
      error: "Please Send The Code As String",
    });
  }

  if (!title) {
    return res.status(404).json({
      error: "Please Provide title Body",
    });
  }

  if (typeof title !== "string") {
    return res.status(404).json({
      error: "Please Provide The Title Body As String",
    });
  }

  if (!language) language = "PlainText";
  if (!isprivate) isprivate = false;
  var id = RandomID();
  let Token = RandomToken();
  let isThere = (await BinsSchema.find({ ID: id })).length !== 0;
  let isThereToken = (await BinsSchema.find({ Token: Token })).length !== 0;

  while (isThere) {
    id = RandomID();
  }

  while (isThereToken) {
    Token = RandomToken();
  }

  BinsSchema.create({
    title: title,
    password: password ? password : null,
    language: language,
    Code: code,
    ID: id,
    isprivate: isprivate,
    Token,
  })
    .then((data) => {
      return res.json({
        status: "Created SuccessFully!",
        data: {
          title: data.title,
          havePassword: data.password != null,
          language: data.language,
          Code: data.Code,
          ID: data.ID,
          Token: data.Token,
          CreatedAt: data.createdAt,
          UpdatedAt: data.updatedAt,
        },
        note: "Do Not Show The Token For Any One You Can Only Edit This Bin And Deleted Only With This Token",
      });
    })
    .catch((err) => {
      return res.status(404).json({
        error: "Some Thing Went Wrong",
        err,
      });
    });
});

export default router;

function RandomID() {
  let result = "";
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123465789";
  for (let i = 0; i < 30; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function RandomToken() {
  let result = "";
  let chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123465789.-";
  for (let i = 0; i < 50; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
