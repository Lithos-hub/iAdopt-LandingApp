import { Link } from "@/interfaces";
import mongoose, { Model, Schema } from "mongoose";

export interface ILink extends Link {}

const linkSchema = new Schema({
  description: { type: String, required: true },
  email: { type: String, required: true },
  isSubmitted: { type: Boolean, default: false },
});

const LinkModel: Model<ILink> =
  mongoose.models.Link || mongoose.model("Link", linkSchema);

export default LinkModel;
