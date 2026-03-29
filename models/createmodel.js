const mongoose=require('mongoose');
const Schema_define=mongoose.Schema({
    Title:{
        type:String,
        // required:true
    },
     Description:{
        type:String,
        // required:true,
    },
     Image:{
        type:String
    },
     Price:{
        type:Number,
        cast: false,
        // required:true
    },
    Location:{
        type:String,
        // required:true
    },
    Country:{
        type:String,
        // required:true
    }
});

const listing=mongoose.model("listing",Schema_define);
module.exports=listing;


