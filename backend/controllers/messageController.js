const Message = require('../models/Message');

// @desc    Submit a new contact message
// @route   POST /api/messages
// @access  Public
const createMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      res.status(400);
      throw new Error('Please fill in all required fields (Name, Email, Message).');
    }

    const newMessage = await Message.create({
      name,
      email,
      subject: subject || 'General Inquiry',
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Your message has been received! I will get back to you shortly.',
      data: newMessage,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact messages
// @route   GET /api/messages
// @access  Private / Admin
const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a contact message
// @route   DELETE /api/messages/:id
// @access  Private / Admin
const deleteMessage = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      res.status(404);
      throw new Error('Message not found');
    }

    await message.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Message deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle message read status
// @route   PATCH /api/messages/:id/read
// @access  Private / Admin
const toggleReadStatus = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      res.status(404);
      throw new Error('Message not found');
    }

    message.read = !message.read;
    const updatedMessage = await message.save();

    res.status(200).json({
      success: true,
      message: `Message marked as ${updatedMessage.read ? 'read' : 'unread'}`,
      data: updatedMessage,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createMessage,
  getMessages,
  deleteMessage,
  toggleReadStatus,
};
