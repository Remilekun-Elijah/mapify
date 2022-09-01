const {
 Schema,
 model
} = require("mongoose");
const bcrypt = require("bcryptjs")

const salt = bcrypt.genSaltSync(10);

const userSchema = new Schema({
 name: String,
 email: {
  type: String,
  unique: true,
  
 },
 role: String,
 password: String
}, {
 timestamps: true
})

const locationSchema = new Schema({
 address: String,
 longitude: Number,
 latitude: Number,
 image: String
}, {
 timestamps: true
})

userSchema.pre("save", function (next, option) {
 const pass = this.password;
 if (pass) this.password = bcrypt.hashSync(pass, salt);
 next()
})

exports.User =  model("user", userSchema);
exports.Location =  model("location", locationSchema)