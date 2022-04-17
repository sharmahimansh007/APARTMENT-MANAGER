const Flat = require("../models/flat.model")

const express = require("express");

const router = express.Router();

router.post("/", async(req,res) => {
    try{

        const flat = await Flat.create(req.body);

        res.status(201).send(flat);

    }catch(e){
        console.log(e.message)
        return res.status(500).send(e.message)
    }
});

router.get("/", async(req,res) => {
    try{
        const flats = await Flat.find().lean().exec()

        res.status(201).send(flats)
    }catch(e){
        return res.status(500).send(e.message);
    }
});



module.exports = router;

