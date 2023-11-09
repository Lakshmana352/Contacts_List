const asyncHandler = require("express-async-handler");
const contactsSchema = require("../models/contactSchema");


const getContacts = asyncHandler(async(req,res) => {
    const contacts = await contactsSchema.find({user_id:req.user.id});
    res.status(200);
    res.json(contacts);
});

const getContact = asyncHandler(async(req,res)=>{
    const contact = await contactsSchema.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found.");
    }
    if(contact.user_id.toString() != req.user.id){
        res.status(403);
        throw new Error("Dont try to fetch other member contacts.")
    }
    res.status(200);
    res.json(contact);
});

const updateContact = asyncHandler(async(req,res)=>{
    const contact = await contactsSchema.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found.");
    }
    if(contact.user_id.toString() != req.user.id){
        res.status(403);
        throw new Error("Dont try to make changes in other member contacts.")
    }
    const updatedContact = await contactsSchema.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    );
    res.status(202);
    res.json(updatedContact);
});

const createContact = asyncHandler(async(req,res)=>{
    // console.log(req.body);
    const {name,email,phone} = req.body;
    if(!name || !email || !phone){
        res.status(500);
        throw new Error("All feilds are mandatory.");
    }

    const contact = await contactsSchema.create({
        name,
        email,
        phone,
        user_id:req.user.id
    });
    res.status(201);
    res.json(contact);
});

const deleteContact = asyncHandler(async(req,res)=>{
    const contact = await contactsSchema.findByIdAndDelete(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found.");
    }
    if(contact.user_id.toString() != req.user.id){
        res.status(401);
        throw new Error("Dont try to make changes in other member contacts.")
    }
    // await contactsSchema.remove();
    res.status(202);
    res.json(contact);
});


module.exports = {
    getContacts,
    getContact,
    createContact,
    deleteContact,
    updateContact
};