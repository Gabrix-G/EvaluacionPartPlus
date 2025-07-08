/*
    Campos:
        clientId
        vehicle
        service
        status
*/

import { Schema, model } from "mongoose";

const reservaSchema = new Schema(
  {
    clientId: { type: Schema.Types.ObjectId, ref: "Cliente", required: true },
    vehicle: { type: String, required: true },
    service: { type: String, required: true },
    status: { type: String, default: "pendiente" }
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("Reserva", reservaSchema);