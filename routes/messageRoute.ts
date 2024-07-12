import express from "express";
import { addMessage, getLastMessage, getMessages } from "../controllers/messageController";
import requireAuth from "../middlewares/requireAuth";
import User from "../models/messageModel";

const router = express.Router();

router.use(requireAuth);

router.post("/", addMessage);

router.get("/:senderId/:receiverId", getMessages);

router.get("/lastMessage/:senderId/:receiverId", getLastMessage);
// Fetch user by MetaMask address
router.get('/byAddress/:address', async (req, res) => {
    const { address } = req.params;
    try {
      const user = await User.findOne({ metaMaskAddress: address });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });
export default router;
