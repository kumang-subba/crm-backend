import { Schema, model } from "mongoose";

const LeadSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    order: { type: Number, required: true },
    column: {
      type: Schema.Types.ObjectId,
      ref: "column",
      required: true,
    },
  },
  { timestamps: true },
);

LeadSchema.set("toJSON", {
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default model("Lead", LeadSchema);
