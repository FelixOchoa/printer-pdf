import express from "express";
import printController from "./controllers/printController.js";
import { ERR_BAD_REQUEST, ERR_NOT_FOUND } from "./utils/validationUtils.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/", printController);

app.use((err, req, res, next) => {
  if (err.code === ERR_BAD_REQUEST) {
    res.status(400).send("Error: la URL del PDF es inválida.");
  } else if (err.code === ERR_NOT_FOUND) {
    res.status(404).send("Error: no se ha podido encontrar la impresora.");
  } else {
    res.status(500).send("Error interno del servidor.");
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
