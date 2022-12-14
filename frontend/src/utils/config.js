const environment = {}; 
environment.development = {
 backendUrl: "http://192.168.100.90:9000",
cloudinary_cloudName:"remilekunelijah",
 cloudinary_preset: "ixp9w0hy",
 cloudinary_folder: "Mapify"
}

environment.staging = {
 backendUrl: "https://api-staging-mapify.onrender.com",
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

export default environment[process.env.REACT_APP_NODE_ENV]