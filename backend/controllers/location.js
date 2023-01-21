const Jimp = require("jimp")
const joi = require('joi');
const Location = require("../model/location");

const locationSchema = joi.object({
 description: joi.string().required(),
 longitude: joi.number().required(),
 latitude: joi.number().required(),
 image: joi.string().allow(""),
 address: joi.string().required(),
 pollingUnit: joi.number().required(),
 agentParty: joi.string().required(),
 phoneNumber: joi.string().required(),
 lga: joi.string().required()
})

class LocationController {

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
   const location = await Location.create(req.body);

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

 static async edit(req, res, next) {
  const {
   longitude,
   latitude
  } = req.body;

  try {
   await locationSchema.validateAsync(req.body)
   const isLocation = await Location.findById(req.params.id);

   if (longitude !== isLocation.longitude || latitude !== isLocation.latitude) {
    const isExist = await Location.findOne({
     longitude,
     latitude
    });
    if (isExist) {
     return res.status(409).json({
      success: false,
      message: "Location with the specified coordinates already exit"
     })
    }
   }

   const location = await Location.findByIdAndUpdate(req.params.id, {
    $set: req.body
   })

   if (location) {
    res.status(200).json({
     success: true,
     message: "Location updated successfully",
     location
    })
   } else {
    res.status(404).json({
     success: false,
     message: "Location not found"
    })
   }
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

   let {
    page,
    pageSize,
    lga,
    search
   } = req.query;
   page = parseInt(page) || 1
   pageSize = parseInt(pageSize) || 1e10;

   const filter = {
    limit: pageSize,
    skip: Math.round((page - 1) * pageSize),
   }
   if (lga) filter.lga = lga
   if (search) filter.description = {
    $regex: new RegExp(`.*${search}*.`),
    $options: 'i'
   }
   if (search) filter.address = {
    $regex: new RegExp(`.*${search}*.`),
    $options: 'i'
   }

   const total = await Location.countDocuments(filter)
   let {
    limit,
    skip,
    address,
    ...rest
   } = filter
   let locations;
   if (search) {
    locations = await Location.find(rest).skip(skip).limit(limit).sort({
     createdAt: -1
    });
    if (locations.length === 0) {
     let {
      limit,
      skip,
      description,
      ...rest
     } = filter;
     locations = await Location.find(rest).skip(skip).limit(limit).sort({
      createdAt: -1
     });
    }
   } else {
    locations = await Location.find(rest).skip(skip).limit(limit).sort({
     createdAt: -1
    });
   }

   res.status(200).json({
    success: true,
    message: "Locations retrieved successfully",
    data: {
     locations,
     page,
     pageSize,
     total
    }
   })

  } catch (err) {
   console.error(err);
   res.status(500).json({
    success: false,
    message: "Failed to retrieve locations"
   })
  }
 }

 static async deleteOne(req, res, next) {
  try {
   const deleted = await Location.findByIdAndDelete(req.params.id, {
    new: true
   })
   if (deleted) res.status(200).json({
    success: true,
    data: deleted,
    message: "Location deleted successfully"
   })
   else res.status(500).json({
    success: false,
    message: "Failed to delete location, please try again"
   });
  } catch (error) {
   res.status(500).json({
    success: false,
    message: "Failed to delete location, please try again",
    error
   });
  }
 }

 static async deleteBulk(req, res, next) {
  try {
   let count = [];
   for (let id of req.body.locationIds) {
    let data = await Location.findByIdAndDelete(id)
    if (data) count.push(data._id)
   }
   if (count.length) res.status(200).json({
    success: true,
    data: count.length,
    message: "Locations deleted successfully"
   })
   else res.status(500).json({
    success: false,
    message: "Failed to delete locations, please try again"
   });
  } catch (error) {
   console.log(error);
   res.status(500).json({
    success: false,
    message: "Failed to delete locations, please try again",
    error
   });
  }
 }

 static async uploadImage(req, res, next) {
  const {
   base64
  } = req.body, {
   id
  } = req.params;

  const buffer = Buffer.from(base64, "base64");

  Jimp.read(buffer, async (err, resp) => {
   if (err) {
    console.error(err);
    return res.status(500).json({
     success: false,
     data: null,
     message: "Failed to capture image"
    })
   } else {

    const filepath = "uploads/" + Date.now() + "-location-image.jpg";

    let image = process.env.NODE_ENV === 'development' ? `${req.protocol}://${req.hostname}:9000/${filepath}` : `${req.protocol}://${req.hostname}/${filepath}`

    resp.quality(60).write(filepath)

    Location.findByIdAndUpdate(id, {
     $set: {
      image
     }
    }, {
     new: true
    }).then(doc => {
     if (doc) return res.status(201).json({
      success: true,
      data: image,
      message: "Image captured successfully"
     })
     else return res.status(500).json({
      success: false,
      data: null,
      message: "Failed to capture image"
     })
    }).catch(err => {
     console.error(err);
     return res.status(500).json({
      success: false,
      data: err,
      message: "Something went wrong"
     })
    })
   }
  })
 }
}

module.exports = LocationController;