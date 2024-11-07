const express = require("express");
const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema({
    name : {required:true,type :String},
    email:{required:true,type :String,unique:true},
    mobile:{required:true,type :String},
    password:{required:true,type :String}
});

let signupmodel=mongoose.model("Signupdetails",signupSchema);
module.exports=signupmodel;
