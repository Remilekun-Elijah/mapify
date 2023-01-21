import Alert from "./alert";

class Menu {
  constructor ({action, setModal, type, refresh}) {

  this.action = action;
  // this.setModalAction = setModalAction;
  this.refresh = refresh;
  this.setModal = setModal;
  // this.setFormData = setFormData;
  this.type = type;
 }

 editLocation ({
  navigate
 },) {
  return {  
    text: "Edit",
    action: (_, data) => navigate('/add-new-location', {state: data})
   }
 }

 deleteLocation({model, actionName, cb}) {
  return {
   text: "Delete",
   action: (_, data) => {
    const name = [];
    if(model?.length){
      model.forEach(item => name.push(data[item]))
    }
    cb({name: name.join(' ') || this.type,
    action: (onSuccess, onError)=>{
      this.action[actionName](data._id).then((res) => {
        if (res.success) {
          this.refresh();
          onSuccess()
        }else {
          Alert({
            type: "error",
            message: res.message,
          });
          onError()
        }
       }); 
    }})
   },
  };
 }

 viewLocation({ navigate }){
   return {
     text: "View",
     action: (_, state) => navigate("/locations/" + state._id, {state})
   }
  }
}
export default Menu;