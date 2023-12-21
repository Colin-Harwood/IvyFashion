import mongoose from "mongoose";

const wishListSchema = mongoose.Schema(
    {
        userId: {
            type: String
        },
        userName: {
            type: String
        },
        itemsList: {
            type: Array
        },
    },
);

export const wishList = mongoose.model('wishList', wishListSchema)