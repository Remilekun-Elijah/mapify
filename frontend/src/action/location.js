import Backend from '../utils/backend'

class Location {
 static API = new Backend()

 static async add (payload) {
  return await this.API.send({
   type: "post",
   to: "/location",
   payload: payload,
  });
 }

 static async edit (payload, id) {
  return await this.API.send({
   type: "put",
   to: `/location/${id}`,
   payload: payload,
  });
 }

static bulkDelete(locationIds){

  return this.API.send({
  type: "patch",
  to: `/location`,
  useAlert: false,
  payload: {locationIds}
 })
}

static async getAll(pagination) {
 return this.API.send({
  type: "get",
  to: `/location/?lga=${pagination.lga}&search=${pagination.search}`,
  useAlert: false,
 })
}

static delete(locationId){

 return this.API.send({
 type: "delete",
 to: `/location/${locationId}`,
 useAlert: false,
})
}
}

export default Location;