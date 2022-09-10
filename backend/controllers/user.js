const {
  Location,
  User
} = require("../model/user");
const joi = require('joi')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const fs = require('fs')

const locationSchema = joi.object({
  description: joi.string().required(),
  longitude: joi.number().required(),
  latitude: joi.number().required(),
  image: joi.string().required()
})

const loginSchema = joi.object({
  email: joi.string().email({
    minDomainSegments: 2
  }).required(),
  password: joi.string().required()
})
exports.LocationController = class LocationController {

  static async create(req, res, next) {
    const {
      longitude,
      latitude
    } = req.body;

    try {
      await locationSchema.validateAsync(req.body)

      const isExist = await Location.findOne({
        longitude,
        latitude
      });
      if (isExist) {
        res.status(403).json({
          success: false,
          message: "Location already exist"
        })
      }
      const location = Location.create(req.body);

      res.status(201).json({
        success: true,
        message: "Location added successfully",
        location
      })
    } catch (error) {
      console.error(error);
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

  static async getAll(req, res, next) {
    try {

      let { page, pageSize } = req.query;
      page = parseInt(page) || 1
      pageSize = parseInt(pageSize) || Infinity;

      const filter = {
        limit: pageSize,
        skip: Math.round((page - 1) * pageSize),
      }
      
      const total = await Location.countDocuments(filter)
      const locations = await Location.find().skip(filter.skip).limit(filter.limit).sort({createdAt: -1});
      
      res.status(200).json({
        success: true,
        message: "Locations retrieved successfully",
        data: {locations, page, pageSize, total}
      })
     
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve locations, please reload the page"
      })
    }
  }

  static async deleteOne(req, res, next) {
    try {
      const deleted = await Location.findByIdAndDelete(req.params.id, {new: true})
      if(deleted) res.status(200).json({success: true, data: deleted, message: "Location deleted successfully"})
      else res.status(500).json({success: false, message: "Failed to delete location, please try again"});
    } catch(error) {
      res.status(500).json({success: false, message: "Failed to delete location, please try again", error});
    }
  }

  static async deleteBulk(req, res, next) {
    try {
      let count=[];
      for(let id of  req.body.locationIds){
         let  data = await Location.findByIdAndDelete(id)
         if(data) count.push(data._id)
      }
      if(count.length) res.status(200).json({success: true, data: count.length, message: "Locations deleted successfully"})
      else res.status(500).json({success: false, message: "Failed to delete locations, please try again"});
    } catch(error) {
      console.log(error);
      res.status(500).json({success: false, message: "Failed to delete locations, please try again", error});
    }
  }

}

exports.UserController = class UserController {
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