const {
 User
} = require('../model/user');
const email = "remilekunelijah97@gmail.com"
User.findOne({
 email
}).then(data => {
 if (data) console.log("User already seeded!")
 else {
  const user = new User();
  user.name = "Super Admin"
  user.email = email
  user.password = "superAdmin1#"
  user.role = "superadmin"

  user.save().then((doc, error) => {
   console.log("DOCS", doc);
   console.error("ERROR", error);
  })
 }
})