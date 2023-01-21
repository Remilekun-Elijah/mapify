const User = require("../model/user");
const joi = require('joi');
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const loginSchema = joi.object({
  email: joi.string().email({
    minDomainSegments: 2
  }).required(),
  password: joi.string().required()
})

class UserController {
  static async login(req, res, next) {
    try {
      const {
        email,
        password
      } = req.body;
      await loginSchema.validateAsync(req.body);
      const user = await User.findOne({
        email: new RegExp(email, 'i')
      });
      if (user) {
        if (bcrypt.compareSync(password, user.password)) {
          const authToken = jwt.sign({
            id: user._id,
            role: user.role
          }, "mY_Wicked_SecereT_123", {
            expiresIn: '3d'
          });
          res.status(200).json({
            success: true,
            message: "User logged in successfully",
            authToken
          })
        } else {
          res.status(400).json({
            success: false,
            message: "Incorrect password"
          })
        }
      } else {
        res.status(404).json({
          success: false,
          message: "User not found in the system"
        })
      }
    } catch (error) {
      let status = 500,
        message = "Internal server error"
      if (error.details) {
        status = 422
        message = error.details[0].message
      }
      res.status(status).json({
        success: false,
        message
      })
    }
  }
}

module.exports = UserController;