import { Binary } from "mongodb";
import mongoose from "mongoose";

const itemSchema = mongoose.Schema(
    {
        title: {
            type: String,
        },
        brand: {
            type: String,
        },
        image: {
            type: String
          },
        clothingType: {
            type: String,
        },
        itemLink: {
            type: String,
        },
        sex : {
            type: String,
        }
        
    },
);

export const Item = mongoose.model('clothesItem', itemSchema)