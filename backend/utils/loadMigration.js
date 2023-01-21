const User = require('../model/user');
const emails = ["remilekunelijah97@gmail.com", "babsfadeyi@gmail.com"]
const passwords = ["09023007389", "superAdmin1#"]
const names = ["Remilekun Elijah", "Babs Fadeyi"];
emails.forEach((email, indx)=>{
 User.findOne({
  email
 }).then(data => {
  if (data) console.log(email, "already seeded!")
  else {
   const user = new User();
   user.name = names[indx]
   user.email = email
   user.password = passwords[indx]
   user.role = "superadmin"
 
   user.save().then((doc, error) => {
    console.log( doc.email, "seeded successfully");
    if(error) console.error("ERROR", error);
   })
  }
 })
})
