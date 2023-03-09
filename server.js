const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

mongoose.connect(`mongodb://127.0.0.1:27017/himanshuDB`).then(()=>{console.log("DB connected")})
.catch(err=>console.log("DB connection error",err));


const userSchema = new mongoose.Schema({
  name: String,
  id: Number,
  gender: String
});
const User = mongoose.model('User', userSchema);


app.get("/users", async function(req,res) {

const users = await User.find({});
res.send(users);

});



app.post("/create", async function (req,res) {
  console.log("get the req");
  const user = await User.create({
    name: req.body.name,
    id: req.body.id,
    gender: req.body.gender
  });

  res.send("user created: "+ user)
});



app.post("/update/:id", async function(req,res) {


try {

  const user = await User.findOne({id: req.params.id});

  if(user == null){
    res.send("no user with this id found");
    return;
  }
  user.name = req.body.name;
  user.save();
  res.send("user successfully updated");

} catch (e) {
  res.send("please send a vaid number id");
}



})




app.listen(3000,function() {
  console.log("server running on port 3000");
})
