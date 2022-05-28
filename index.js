import express from "express";
import { helloService } from "./service.js";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  var id = helloService();
  res.send(id);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
