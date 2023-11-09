const express = require("express");
const router = express.Router();
const {
    getContacts,
    getContact,
    createContact,
    deleteContact,
    updateContact
} = require("../controllers/contact_controller");
const validToken = require("../errorHandlers/validationHandler");

router.use(validToken);

router.route("/").get(getContacts);

router.route("/").post(createContact);

router.route("/:id").put(updateContact);

router.route("/:id").get(getContact);

router.route("/:id").delete(deleteContact);

module.exports = router;