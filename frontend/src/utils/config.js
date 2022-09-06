const environment = {}; 
environment.development = {
 backendUrl: "http://localhost:9000",
cloudinary_cloudName:"remilekunelijah",
 cloudinary_preset: "ixp9w0hy",
 cloudinary_folder: "Mapify"
}

environment.production = {
 backendUrl: "https://api-mapify.onrender.com",
 cloudinary_cloudName:"remilekunelijah",
 cloudinary_preset: "ixp9w0hy",
 cloudinary_folder: "Mapify"
}
export default environment[process.env.NODE_ENV]