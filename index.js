const express = require('express');

const port = 8081;

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));

app.set('view engine','ejs');

let id = 1;

let data = [
  {
    id: 1,
    task: "Task-1",
    dsc: "developing App",
    date: "2024-09-06",
  }
]

app.get("/" , (req, res)=>{
  return res.render('form');
})

app.post("/insert",(req , res) => {
  let AddData = {
    id: id++,
    task: req.body.task,
    dsc: req.body.dsc,
    date:req.body.date,
  };

  data.push(AddData);
  console.log(AddData);
  return res.redirect("back");
})

app.get("/edit" , (req , res) => {
  if(req.qurey.id){
    let editData = data.find((task) => task.id == req.qurey.id);
    res.render("edit", {editData: editData});
  }
})

app.get("/delete", (req, res) => {
  data = data.filter((val) => val.id != req.query.id);
  return res.redirect("back");
});

app.post("/edit", (req, res) => {
  let editId = req.body.id;
  console.log(editId);
  let EditData = data.filter((val) => {
    if (val.id == editId) {
      val.task = req.body.task;
      val.dsc = req.body.dsc;
      val.date = req.body.date;
    }
    return val;
  });

  data = EditData;
  res.redirect("/");
});

app.get("/show", (req, res) => {
  return res.render("table", {
    data: data,
  });
});

app.listen(port , (err)=>{
  if(err){
    console.log("server failed to start!!");
  } else{
    console.log(`server start on http://localhost:${port}`);
  }
})