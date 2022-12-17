const environment = {};

environment.staging = {
 mongodbUrl: process.env.STAGING_DB_URL,
 port: process.env.PORT
}

environment.development = {
 mongodbUrl: process.env.LOCAL_DB_URL,
 port: process.env.PORT || 9000
}

environment.production = {
 mongodbUrl: process.env.DB_URL,
 port: process.env.PORT
}

module.exports = environment[process.env.NODE_ENV] 