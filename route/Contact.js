const express = require("express");
const contact_route = express.Router();

const contact_controller = require("../controller/Contact")

const auth = require("../middleware/auth");

contact_route.use(auth);
contact_route.post("/", auth, contact_controller.create_contact);
contact_route.get("/", auth, contact_controller.getContacts);
contact_route.put("/:id", auth, contact_controller.updateContact);
contact_route.delete("/:id", auth, contact_controller.deleteContact);
contact_route.get("/:id", auth, contact_controller.getContact);


module.exports= contact_route;
