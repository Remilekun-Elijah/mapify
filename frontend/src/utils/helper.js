import config from "./config";

/**
 * @param {object} data   takes in an object of boolean and number values
 * @param {boolean} data.previewInConsole  whether to preview the data/size in the console, default is true
 * @param {number} data.size  the actual size of the data/file in byte, default is 50000000
 * @returns  {number}  The size of the data/file
 **/
 export const getFileSize = function (data = {}) {
  data.previewInConsole = data.previewInConsole ? data.previewInConsole : false;
  data.size = data.size !== (undefined || null || "") ? data.size : 50000000; // 50mb
  data.size = Number(data.size);
  const k = 1000;
  const format = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(data.size) / Math.log(k));
  const size = parseFloat(data.size / Math.pow(k, i)).toFixed(1);

  if (data.previewInConsole === true)
      console.info(data.size, " = ", size + format[i]);
  return size +' '+ format[i];
};

export class Cloudinary {
  constructor({ crop } = {}) {
    this.cloudName = config.cloudinary_cloudName;
    this.uploadPreset = config.cloudinary_preset;
    this.folder = config.cloudinary_folder;
    this.cropping = crop||false;
  }
  upload (cb) {
		const myWidget = window.cloudinary.createUploadWidget(
			this,
			(error, result) => {
				if (!error && result && result.event === "success") {
          result.info.url = result.info.secure_url;
          if(cb) cb(result.info);
          return result.info.secure_url
				}
			},
		);
		myWidget.open();
	}
}

export const capitalize = (string) => {
  const final = string
  ?.replace(/\w\S*/g, (txt) => {
    let val = txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    return val;
  })
  return final;
}

export const handleSearch = ({value, useCaps, cb}) => {
  const branch = useCaps ? capitalize(value) : value;
  cb(branch.trim());
};

export const format = val => Intl.NumberFormat().format(val)

export const lgas = [
  "Agege",
  "Alimosho",
  "Apapa",
  "Ifako-Ijaye",
  "Ikeja",
  "Kosofe",
  "Mushin",
  "Oshodi-Isolo",
  "Shomolu",
  "Eti-Osa",
  "Lagos Island",
  "Lagos Mainland",
  "Surulere",
  "Ojo",
  "Ajeromi-Ifelodun",
  "Amuwo-Odofin",
  "Badagry",
  "Ikorodu",
  "Ibeju-Lekki",
  "Epe"
]