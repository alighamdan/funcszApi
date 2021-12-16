import { Schema, model } from "mongoose";

const schema = new Schema({
    title: String,
    password: String || null,
    language: String,
    Code: String,
    ID: String,
    isprivate: Boolean,
    Token: String
},{
    timestamps: true
});

export default model('bins',schema);