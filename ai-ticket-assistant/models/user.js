import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, default: "user", enum: ["user", "moderator", "admin"]},
    skills: [String],
    createdAt: {type: Date, default: Date.now}
})

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();

//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// // check and match password method
// userSchema.methods.matchPassword = async function (enteredPassword) {
//   const isPasswordCorrect = await bcrypt.compare(enteredPassword, this.password);
//   return isPasswordCorrect;
// };

export default mongoose.model("User", userSchema)