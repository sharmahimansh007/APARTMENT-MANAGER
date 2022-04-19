const express = require("express");

const Flat = require("../models/flat.model")

const router = express.Router();

const Resident = require( "../models/resident.model" );



router.get("/", async(req,res) => {
    // const block = req.query.block;
    const sort = req.query.sort;
    // const type = req.query.type;
    try{
        if(sort){
            await Resident.find().populate('id').exec((e,residents) => {
                
                if(e){
                 
                    return res.status(500).send(e.message);
                }
                
                if(sort === "asc"){
                    const sorted = [...residents].sort(
                      (a, b) => +a.id.flat_number - +b.id.flat_number
                    );

                    return res.status(200).send(sorted);
                }else{
                    const sorted = [...residents].sort(
                      (a, b) => +b.id.flat_number - +a.id.flat_number
                    );

                    return res.status(200).send(sorted);
                }
                
            });
         }
       
        else{
            const residents = await Resident.find().populate("id").lean().exec();

            res.status(200).send(residents);
        }
        
    }catch(e){
        console.log(e)
        return res.status(500).send(e.message);
    }
})



router.get("/:id", async(req,res) => {
    try{
        const resident = await Resident.findById(req.params.id).populate("id").lean().exec();
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
        flat.status = false;

        Flat.findByIdAndUpdate(resident.id, flat,{new:true})

        res.status(201).send(resident)

    }catch(e){
        return res.status(500).send(e.message);
    }
})

module.exports = router