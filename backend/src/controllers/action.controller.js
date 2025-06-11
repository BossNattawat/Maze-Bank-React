import { User, Transaction } from "../models/user.model.js";

// Utility: common response helper
const sendError = (res, status, message) =>
  res.status(status).json({ message });

export const withdraw = async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.user._id;

    if (!amount || amount <= 0) {
      return sendError(res, 400, "Invalid withdrawal amount.");
    }

    const user = await User.findById(userId);
    if (!user) return sendError(res, 404, "User not found.");

    if (user.accountBalance < amount) {
      return sendError(res, 400, "Insufficient funds.");
    }

    user.accountBalance -= amount;
    const transaction = await Transaction.create({
      userId,
      type: "WITHDRAW",
      amount,
    });

    user.transactionHistory.push(transaction._id);
    await user.save();

    res.status(200).json({
      message: "Withdrawal successful",
      newBalance: user.accountBalance,
      transaction,
    });
  } catch (error) {
    console.error("Withdraw error:", error);
    sendError(res, 500, "Internal server error.");
  }
};

export const deposit = async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.user._id;

    if (!amount || amount <= 0) {
      return sendError(res, 400, "Invalid deposit amount.");
    }

    const user = await User.findById(userId);
    if (!user) return sendError(res, 404, "User not found.");

    user.accountBalance += amount;
    const transaction = await Transaction.create({
      userId,
      type: "DEPOSIT",
      amount,
    });

    user.transactionHistory.push(transaction._id);
    await user.save();

    res.status(200).json({
      message: "Deposit successful",
      newBalance: user.accountBalance,
      transaction,
    });
  } catch (error) {
    console.error("Deposit error:", error);
    sendError(res, 500, "Internal server error.");
  }
};

export const transfer = async (req, res) => {
  try {
    const { amount, targetCardNumber } = req.body;
    const userId = req.user._id;

    if (!amount || amount <= 0 || !targetCardNumber) {
      return sendError(res, 400, "Invalid transfer request.");
    }

    const sender = await User.findById(userId);
    if (!sender) return sendError(res, 404, "Sender not found.");

    const recipient = await User.findOne({ cardNumber: targetCardNumber });
    if (!recipient) return sendError(res, 404, "Recipient not found.");

    if (sender._id.equals(recipient._id)) {
      return sendError(res, 400, "Cannot transfer to the same account.");
    }

    if (sender.accountBalance < amount) {
      return sendError(res, 400, "Insufficient funds.");
    }

    // Perform transfer
    sender.accountBalance -= amount;
    recipient.accountBalance += amount;

    // Create transactions
    const senderTransaction = await Transaction.create({
      userId: sender._id,
      type: "TRANSFER",
      to: recipient._id,
      amount,
    });

    const recipientTransaction = await Transaction.create({
      userId: recipient._id,
      type: "TRANSFER",
      to: recipient._id, // Show where it came from
      amount,
    });

    // Save transaction history
    sender.transactionHistory.push(senderTransaction._id);
    recipient.transactionHistory.push(recipientTransaction._id);

    await sender.save();
    await recipient.save();

    res.status(200).json({
      message: "Transfer successful",
      newBalance: sender.accountBalance,
      transaction: senderTransaction,
    });
  } catch (error) {
    console.error("Transfer error:", error);
    sendError(res, 500, "Internal server error.");
  }
};


export const getTransactionLog = async (req, res) => {
  try {
    const userId = req.user._id;

    const logs = await Transaction.find({ userId: userId })

    res.status(200).json(logs)
  }
  catch (error) {
    console.error("Transfer error:", error);
    sendError(res, 500, "Internal server error.");
  }
}