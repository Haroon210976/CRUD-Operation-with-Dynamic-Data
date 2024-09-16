import express from "express";
import userModel from "./models/user.js";

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));




app.get("/", (req, res) => {
  res.render("index");
});
app.post("/create", async (req, res) => {
  const {name,email,image} = req.body;
  const newUser = await userModel.create({
    name,
    email,
    image
  });
  res.redirect("/read");
})
app.get("/read", async (req, res) => {
  const users = await userModel.find();
  res.render("read",{users})
})

app.get("/edit/:id",async (req,res)=>{
  const _id = req.params.id;
  const user = await userModel.findById(_id);
  res.render("edit",{user})
})

app.post("/edit/:id",async (req,res)=>{
  const {name,email,image} = req.body;
  const _id = req.params.id;
  await userModel.findByIdAndUpdate(_id , {name,email,image})
  res.redirect("/read");
})

app.get("/delete/:id",async (req,res)=>{
  const _id = req.params.id
  await userModel.findByIdAndDelete({_id});
  res.redirect("/read");
})



app.listen(3000);
