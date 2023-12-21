import express from "express";
import { Item } from '../models/clothingItem.js'
import { ItemWomen } from "../models/clothingItemWomen.js";

const router = express.Router()

router.post('/', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.brand ||
            !request.body.image ||
            !request.body.clothingType ||
            !request.body.itemLink
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, brand, image (the name), clothingType, link'
            });
        }
        const newClothingItem = {
            title: request.body.title,
            brand: request.body.brand,
            image: request.body.image,
            clothingType: request.body.clothingType,
            itemLink: request.body.itemLink,
            sex: request.body.sex
        };

        const clothingPiece = await Item.create(newClothingItem);

        return response.status(201).send(clothingPiece);
    }   catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
});

router.get('/', async (request, response) => {
    try{
        const items = await Item.find({});

        return response.status(200).json({
            count: items.length,
            data: items
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message})
    }
})

router.post('/women', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.brand ||
            !request.body.image ||
            !request.body.clothingType ||
            !request.body.itemLink
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, brand, image (the name), clothingType, link'
            });
        }
        const newClothingItem = {
            title: request.body.title,
            brand: request.body.brand,
            image: request.body.image,
            clothingType: request.body.clothingType,
            itemLink: request.body.itemLink
        };

        const clothingPiece = await ItemWomen.create(newClothingItem);

        return response.status(201).send(clothingPiece);
    }   catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
});

router.get('/women', async (request, response) => {
    try{
        const items = await ItemWomen.find({});

        return response.status(200).json({
            count: items.length,
            data: items
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message})
    }
})

router.get('/women/:id', async (request, response) => {
    try{
        const { id } = request.params;
        console.log(id)

        const item = await ItemWomen.findById(id);

        return response.status(200).json({item
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message})
    }
})

router.delete("/women/:id", async (request, response) => {
    try{
        const { id } = request.params;

        const result = await ItemWomen.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({message: "Book not found"})
        }

        return response.status(200).send({ message: 'Book deleted successfuly'})

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message});
    }
});

router.put('/women/:id', async (request, response) => {
    try{
        if (
            !request.body.title ||
            !request.body.brand ||
            !request.body.image ||
            !request.body.clothingType ||
            !request.body.itemLink
        ) { 
          return response.status(400).send({
            message: 'Send all required fields: title, author, publishYear',
          });  
        }

        const { id } = request.params;

        const result = await Item.findByIdAndUpdate(id, request.body)
        
        if (!result) {
            return response.status(404).json({message: "Book not found"})
        }

        return response.status(200).send({message: 'Book updated succesfuly'})
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message})
    }
})


router.get('/:id', async (request, response) => {
    try{
        const { id } = request.params;

        const item = await Item.findById(id);

        return response.status(200).json({item
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message})
    }
})

router.delete("/:id", async (request, response) => {
    try{
        const { id } = request.params;

        const result = await Item.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({message: "Book not found"})
        }

        return response.status(200).send({ message: 'Book deleted successfuly'})

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message});
    }
});

router.put('/:id', async (request, response) => {
    try{
        if (
            !request.body.title ||
            !request.body.brand ||
            !request.body.image ||
            !request.body.clothingType ||
            !request.body.itemLink
        ) { 
          return response.status(400).send({
            message: 'Send all required fields: title, author, publishYear',
          });  
        }

        const { id } = request.params;

        const result = await Item.findByIdAndUpdate(id, request.body)
        
        if (!result) {
            return response.status(404).json({message: "Book not found"})
        }

        return response.status(200).send({message: 'Book updated succesfuly'})
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message})
    }
})





export default router;