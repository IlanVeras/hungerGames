const express = require("express")
const mongoose = require("mongoose")
const tributeRoute = require(`./routes/tributeRoutes`)
const path = require("path")
const app = express()
const Tribute = require("../20hungerGames/models/Tribute")





const url = 'mongodb+srv://ilanVeras:3b56z9HH2020@cluster0.srlb0js.mongodb.net/';

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
let db = mongoose.connection;
db.on("error", () => console.log('Aconteceu um erro'));
db.once("open", () => {
console.log('Banco carregado:', db.name);
})

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "templates"))
app.use(express.static(path.join(__dirname, "public")))

app.use(`/`, tributeRoute)

app.listen(3000, () => {console.log("Server running. . .")})
