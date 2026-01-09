import mongoose, { model, Schema } from "mongoose";
const subscriptionSchema = new mongoose.Schema({
  subsriber: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Subscrition = mongoose.model("Subscription", subscriptionSchema);
