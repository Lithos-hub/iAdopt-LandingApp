import { ILink } from "@/interfaces";
import mongoose, { Model, Schema } from "mongoose";

const linkSchema = new Schema({
  description: { type: String, required: true },
  email: { type: String, required: true },
  isSubmitted: { type: Boolean, default: false },
  url: { type: String, required: true },
});

const LinkModel: Model<ILink> =
  mongoose.models.Link || mongoose.model("Link", linkSchema);

export default LinkModel;
