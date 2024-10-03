const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// @desc Get all contacts
// @routes GET /api/contacts
// @access private

const getContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

// @desc create contacts
// @routes POST /api/contacts
// @access private

const postContact = asyncHandler(async (req, res) => {
  console.log("req body is", req.body);
  const { name, email, phone } = req.body;
  if (!name || !phone || !email) {
    res.status(400);
    throw new Error("all fields are required");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json(contact);
});

// @desc Get  contacts by id
// @routes GET /api/contacts
// @access private

const getContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Couldn't find contact");
  }
  res.status(200).json(contact);
});

// @desc update  contacts by id
// @routes PUT /api/contacts
// @access private

const updateContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Couldn't find contact");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Permission denied");
  }
  const updatedContact = Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedContact);
});

// @desc delete  contacts by id
// @routes DELETE /api/contacts
// @access private

const deleteContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  console.log(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Couldn't find contact");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Permission denied");
  }
  await Contact.deleteOne({ _id: req.params.id });
  console.log("Contact deleted");
  res.status(200).json(contact);
});

module.exports = {
  getContact,
  postContact,
  getContactById,
  updateContactById,
  deleteContactById,
};
