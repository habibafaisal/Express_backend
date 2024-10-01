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
  const { name, email, phone } = req.body;
  if (!name || !phone || !email) {
    res.status(400);
    throw new Error("all fields are required");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
  });
  res.status(201).json(contact);
});

// @desc Get  contacts by id
// @routes GET /api/contacts
// @access public

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
// @access public

const updateContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Couldn't find contact");
  }
  console.log("Contact", contact);

  const updatedContact = Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedContact);
});

// @desc delete  contacts by id
// @routes DELETE /api/contacts
// @access public

const deleteContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  console.log(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Couldn't find contact");
  }

  await Contact.remove();
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
