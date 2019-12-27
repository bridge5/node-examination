import mongoose from "./database/mongodb";

const schema = mongoose.Schema(
  {
    id: {
      type: Number
    },
    name: {
      type: String,
      required: [true, "name is required"]
    },
    position: {
      type: String,
      enum: ["C", "PF", "SF", "PG", "SG"]
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Player", schema);
