const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// @desc Get all contacts
// @routes GET /api/contacts
// @access public

const getContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

// @desc create contacts
// @routes POST /api/contacts
// @access public

const postContact = asyncHandler(async (req, res) => {
  console.log("req body is", req.body);
  const { name, phone, email } = req.body;
  if (!name || !phone || !email) {
    res.status(400);
    throw new Error("all fields are required");
  }
  res.status(201).json({ mess: "create contacts" });
});

// @desc Get  contacts by id
// @routes GET /api/contacts
// @access public

const getContactById = asyncHandler(async (req, res) => {
  res.status(200).json({ mess: `get contact by id ${req.params.id}` });
});

// @desc update  contacts by id
// @routes PUT /api/contacts
// @access public

const updateContactById = asyncHandler((req, res) => {
  res.status(200).json({ mess: `update contact by id ${req.params.id}` });
});

// @desc delete  contacts by id
// @routes DELETE /api/contacts
// @access public

const deleteContactById = asyncHandler((req, res) => {
  res.status(200).json({ mess: `delete contact by id ${req.params.id}` });
});

module.exports = {
  getContact,
  postContact,
  getContactById,
  updateContactById,
  deleteContactById,
};
