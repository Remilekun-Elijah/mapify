const environment = {}; 
environment.development = {
 backendUrl: "http://localhost:9000",
 // backendUrl: "http://138.68.130.181:9000/",

//  cloudinary_cloudName: process.env.REACT_APP_CLOUDINARY_CLOUDNAME,
//  cloudinary_preset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
//  cloudinary_folder: process.env.REACT_APP_CLOUDINARY_UPLOAD_FOLDER
cloudinary_cloudName:"remilekunelijah",
 cloudinary_preset: "ixp9w0hy",
 cloudinary_folder: "Mapify"
}

environment.production = {
 backendUrl: "http://138.68.130.181:5000/",
 
 cloudinary_cloudName:"remilekunelijah",
 cloudinary_preset: "ixp9w0hy",
 cloudinary_folder: "Mapify"
}
export default environment[process.env.NODE_ENV]