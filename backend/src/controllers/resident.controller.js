const express = require("express");

const Flat = require("../models/flat.model")

const router = express.Router();

const Resident = require( "../models/resident.model" );

router.get("/", async(req,res) => {
    try{
        const resident = await Resident.find().lean().exec();
        res.status(200).send(resident)
    }catch(e){
        return res.status(500).send(e.message);
    }
})

router.post("/", async(req,res) => {
    console.log(req.body)
    try{
        const resident = await Resident.create(req.body);

        const flat = await Flat.findById(resident.id).lean().exec();
        flat.staus = false;

        Flat.findByIdAndUpdate(resident.id, flat,{new:true})

        res.status(201).send(resident)

    }catch(e){
        return res.status(500).send(e.message);
    }
})

module.exports = router