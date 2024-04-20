import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Please provide fullName"],
    },
    userName: {
        type: String,
        required: [true, "Please provide userName"],
        unique: [true, "UserName must be unique"],
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        minlength: [8, "Password should be at least 8 characters"],
        //   maxlength: [20, "Password should not exceed 20 characters"],
    },
    imageUrl: {
        type: String,
        required: [true, "Please provide imageUrl"],
        default: "https://avatar.iran.liara.run/public",
    },
    gender: {
        type: String,
        required: [true, "Please provide gender"],
        enum: ["male", "female"],
    },
    // email: {
    //   type: String,
    //   required: [true, "Please provide email"],
    //   unique: [true, "This email is already registered"],
    //   match: [
    //     /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
    //     "Please provide a valid email",
    //   ],
    // },
}, {
    timestamps: true,
});
const User = mongoose.model("User", userSchema);
export default User;
