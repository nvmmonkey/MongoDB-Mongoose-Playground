// IMPORT ////
const mongoose = require("mongoose")
const { run } = require("node:test")

// SETUP ////
mongoose.set("strictQuery",false)
mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser: true}, ()=>{
    console.log("Connected to MongoDB ")
    confirm()
})

// Mongoose Schema ////
const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please check your data entry, no name specified!"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10 
    },
    review: String
})

const personSchema = new mongoose.Schema({
    name: String,
    age: Number
})

// add item using Schema + *lodash npm* will purnous item  ////

const Fruit = mongoose.model("Fruit", fruitSchema)
const fruit = new Fruit ({

    rating: 10,
    review: "Peaches are sweet"
}) //fruit become "fruits" collection in MongoDB

const Person = mongoose.model("Person", personSchema)
const person = new Person ({
    name: "John",
    age: 37
}) //person become "people" collection in MongoDB


// Aux confirm log function ////
function confirm () {
    const i = 1
    if (i ==1){
        fruit.save()
        // person.save()
        console.log("Item added!")
    } else {
        console.log("Nothing to add!")
    }
}


// insertMany practice ////
const kiwi = new Fruit({
    name: "Kiwi",
    score: 10,
    review: "The best fruit!"
})

const orange = new Fruit({
    name: "Orange",
    score: 4,
    review: "Too sour!"
})

const banana = new Fruit({
    name: "Banana",
    score: 3,
    review: "Solid!"
})

// fruits collection operator & error callback() ////
// Fruit.insertMany([kiwi, orange, banana], function(err){
//     if(err){
//         console.log(err)
//     }else{
//         console.log("Successfully saved all the fruits to fruitsDB!")
//     }
// })

Fruit.find(function(err, fruits){
    
    if(err){
        console.log(err)
    }else{
        mongoose.connection.close()
        fruits.forEach(function(fruit){
        console.log(fruit.name)
    })
    
}
})




   