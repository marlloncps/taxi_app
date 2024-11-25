import dotenv from "dotenv";
import app from "./app";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const PORT = process.env.PORT || 8080;

app.listen(PORT, () =>
  console.log(`[TAXI APP] Servidor inicializado na porta ${PORT}.`)
);
