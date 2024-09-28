const express = require("express");
const {
  getContact,
  postContact,
  getContactById,
  updateContactById,
  deleteContactById,
} = require("../controllers/contactController");
const router = express.Router();

router.route("/").get(getContact).post(postContact);
router
  .route("/:id")
  .get(getContactById)
  .put(updateContactById)
  .delete(deleteContactById);

module.exports = router;
