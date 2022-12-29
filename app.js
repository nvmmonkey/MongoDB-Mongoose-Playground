// IMPORT ////
const { formatUnits } = require("ethers/lib/utils.js")
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
    age: Number,
    favFruit: fruitSchema
})

// add item using Schema + *lodash npm* will purnous item  ////

const Fruit = mongoose.model("Fruit", fruitSchema)
const fruit = new Fruit ({

    rating: 10,
    review: "Peaches are sweet"
}) //fruit become "fruits" collection in MongoDB



// confirm log function ////
function confirm () {
    const i = 0
    if (i ==1){
        // fruit.save()
        // person.save()
        console.log("Item added!")
    } else {
        console.log("Nothing to add!")
    }
}


// insertMany mongoose ////
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

const pineapple = new Fruit({
    name: "Pineapple",
    score: 9,
    review: "Great fruit!"
})

const watermelon = new Fruit({
    name: "Watermelon",
    score: 8,
    review: "Juicy!"
})

watermelon.save() //save new pineapple to fruits

// add item using Schema + *lodash npm* will purnous item  ////
const Person = mongoose.model("Person", personSchema)
const person = new Person ({
    name: "Amy",
    age: 12,
    favFruit: pineapple
}) //person become "people" collection in MongoDB


// fruits collection operator & error callback() ////
// Fruit.insertMany([kiwi, orange, banana], function(err){
//     if(err){
//         console.log(err)
//     }else{
//         console.log("Successfully saved all the fruits to fruitsDB!")
//     }
// })


// FIND mongoose ////
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

// updateOne mongoose ////
// Fruit.updateOne({_id: "63adb72a60ad8299c92fc934"}, {name: "Peach"}, function(err){
//     if(err){
//         console.log(err)
//     }else{
//         console.log("Successfully updated the document!")
//     }
// }) 

Person.updateOne({name: "John"}, {favFruit: watermelon}, function(err) {
    if (err) {
        console.log(err)
    } else {
        console.log("Successfully update John's favFruit!")
    }
})


// deleteOne mongoose ////
// Fruit.deleteOne({_id: "63adb72a60ad8299c92fc934"}, function(err){
//     if(err){
//         console.log(err)
//     }else{
//         console.log("Successfully deleted!")
//     }
// })

// deleteMany mongoose ////
// Person.deleteMany({name: "John"}, function(err){
//     if (err) {
//         console.log(err)
//     } else {
//         console.log("Successfully deleted all documents!")
//     }
// })



   