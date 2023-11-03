const Contact = require("../model/contact");

const create_contact = async(req, res) => {
    console.log("the req body is :", req.body);
    const { name, email, phone } = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("all fields are required");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.body.user_id,
    });
    res.status(201).json(contact);
}

const getContacts = async(req,res) =>{
    const contact = await Contact.find({ user_id: req.body.user_id });
    res.status(200).json(contact);
}

const getContact = async(req,res) =>{
    const contact = await Contact.findById(req.param.user_id);
    if(!contact) {
        res.status(404);
        throw new Error("contact not found");
    }
    res.status(200).json(contact);
}

const updateContact = async(req,res) => {
    const contact = await Contact.findById(req.param.user_id);
    if(!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.body.user_id) {
        res.status(403);
        throw new Error("User don't have permission to update other user contacts");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.user_id,
        req.body,{ new: true}
    );
    res.status(200).json(updatedContact);
}

const deleteContact = async(req,res) =>{
    const contact = await Contact.findById(req.params.user_id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    } 
    if(contact.user_id.toString() !== req.body.user_id){
        res.status(403);
        throw new Error("User don't have permission to delete contact")
    }
    await Contact.deleteOne({ user_id: req.params.user_id});
    res.status(200).json(contact);
}

module.exports = { create_contact, getContact, 
             getContacts, updateContact, deleteContact}