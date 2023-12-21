import mongoose from "mongoose";

const itemWomenSchema = mongoose.Schema(
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
        }
        
    },
);

export const ItemWomen = mongoose.model('clothesItemWomen', itemWomenSchema)