import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

const transactionSchema = new Schema({
  userId: { type: Types.ObjectId, ref: "User", required: true },
  type: { type: String, required: true },
  to: { type: Types.ObjectId, ref: "User" },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  cardNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accountBalance: { type: Number, default: 1000 },
  transactionHistory: [{ type: Types.ObjectId, ref: "Transaction" }],
});

// Models
const User = model("User", userSchema);
const Transaction = model("Transaction", transactionSchema);

export { User, Transaction };
