import { Router } from "express";
import bins from "../../../../src/data/schemas/bins";

const router = Router();

router.put("/delete", async (req, res) => {
  let Token = req.body.token;

  if (!Token) {
    return res.status(404).json({
      error: "Please Provide id Body",
    });
  }

  if (typeof Token !== "string") {
    return res.status(404).json({
      error: "Please Provide id body as String",
    });
  }

  let data: {
    title: String;
    password: String | null;
    language: String;
    Code: String;
    ID: String;
    isprivate: Boolean;
    createdAt: Date;
    updatedAt: Date;
  } = await bins.findOne({ Token: Token });

  if (!data) {
    return res.status(404).json({
      error: "Cannot Find Bin With This Token: " + Token,
    });
  }

  if (data.password !== null) {
    let password = req.body.password;
    if (password === data.password) {
      return bins
        .findOneAndDelete({
          Token: Token,
        })
        .then(() => {
          return res.json({
            status: "Bin Has Been Deleted!",
            data: {
              title: data.title,
              havePassword: data.password,
              language: data.language,
              Code: data.Code,
              ID: data.ID,
              CreatedAt: data.createdAt,
              UpdatedAt: data.updatedAt,
            },
          });
        })
        .catch(console.error);
    } else {
      return res.status(404).json({
        error: "This Is Not The Correct Password",
      });
    }
  } else {
    return bins
      .findOneAndDelete({
        Token: Token,
      })
      .then(() => {
        return res.json({
          status: "Bin Has Been Deleted!",
          data: {
            title: data.title,
            havePassword: data.password !== null,
            language: data.language,
            Code: data.Code,
            ID: data.ID,
            CreatedAt: data.createdAt,
            UpdatedAt: data.updatedAt,
          },
        });
      })
      .catch(console.error);
  }
});

export default router;
