const Manager = require("../models/manager.model");

const jwt = require("jsonwebtoken");

const express = require("express");

require("dotenv").config();

const Token = (user) => {
    return jwt.sign({user}, process.env.JWT_SECRET_KEY);
}

const Login = async (req, res) => {
    try{
        const {email, password} = req.body;

        const manager = await Manager.findOne({email});

        if(!manager) {
            return res.status(400).json({
                message: "Incorrect email or password"
            })
        }

        const matchPassword = await manager.comparePassword(password);

        if(!matchPassword){
            return res.status(400).json({
                message : "Incorrect email or password"
            })
        }

        const token = Token(manager);

        return res.status(200).send({
            token, manager
        })

    }catch(e){
        console.log(e.message)
    }
}

const Register = async (req, res) => {
    try{
         const manager = await Manager.findOne({email:req.body.email});

         if(manager){
             return res.status(400).json({
                 message: "emailis exists"
             })
         }

         const newManager = await Manager.create(req.body);

         return res.status(200).send(newManager);
    }catch(e){
         console.log(e.message);
    }
}

module.exports = {Login, Register};