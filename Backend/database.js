import mongoose from "mongoose";

// importo las variables
// desde mi archivo config.js
import { config } from "./src/config.js";

// 2- Conecto la base de datos
mongoose.connect(config.db.URI);
