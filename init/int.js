const mongoose=require('mongoose');
const listing=require('../models/createmodel.js')
const listingsData=require("./data.js");
const urlofmongoose='mongodb://127.0.0.1:27017/hamroghar';
async function main(){
    await mongoose.connect(urlofmongoose);
}
main() // calling the function
.then(()=>{
    console.log("Hamro Ghar db Connected!")
})
.catch(()=>{
    console.log("Hamro ghar db is not connected!");
});

async function int(){
    await listing.deleteMany({});
    
    await listing.insertMany(listingsData)
    console.log("down");

}
int();
