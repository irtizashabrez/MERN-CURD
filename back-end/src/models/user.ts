import { Schema, InferSchemaType, model} from "mongoose";


const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true, select: false},
    // this select is so that email and password won't return to us
    // if we want to get them we have to call it like getter and setter
    password: {type: String, required: true, select: false},
});

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);