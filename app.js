const express = require("express");
const mysql = require("mysql");
const path = require("path");

const app = express();

app.set('views',path.join(__dirname , 'views'));
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const conn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Tejas@6504",
    database:"aj_fitness"
})


app.get("/",(req,res) =>{

    const query = "SHOW TABLES";

    conn.query(query, (err,result) => {
          if (err) {
      console.error('Error fetching events:', err);
      return res.status(500).send('Database error');
    }

    console.log(result);
    res.render("index");

    })
})

app.get("/login",(req,res) =>{
    res.render("register.ejs");
})

app.post("/loginin",(req,res) =>{
    const { username, email, mob } = req.body;
    console.log(req.body);



     res.redirect('/login');
})


app.get("/event",(req,res) =>{
    res.render("event");
})

app.get("/participants",(req,res) =>{

    const query = "SELECT * FROM registered_users";

    conn.query(query, (err , result) => {
        if(err){
            console.error("Error fetching data");
        }
    console.log(result);
    res.render("participants",{data : result});
})

});

app.get("/checkevent",(req,res) =>{
    res.render("checkevent");
})



app.listen(3000);