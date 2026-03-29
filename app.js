const express=require("express");
const app=express();
const path=require('path');
const mongoose=require('mongoose');
const listing=require('./models/createmodel.js');
const wrapAsync=require('./util/wrapAsync.js');
let port=8080;
app.use(express.urlencoded({ extended: true }));
const methodOverride=require('method-override');
const ejsMate=require("ejs-mate");
app.engine('ejs', ejsMate);
const urlofmongoose='mongodb://127.0.0.1:27017/hamroghar';
async function main(){
    await mongoose.connect(urlofmongoose);
}
main()
.then(()=>{
    console.log("Hamro Ghar db Connected!")
})
.catch(()=>{
    console.log("Hamro ghar db is not connected!");
});
app.set('view engine',"ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"/public")));

app.get("/",(req,res)=>{
    res.send("I am from the root");
});
app.use(methodOverride("_method"));

// For the index route to show the all lists:
app.get('/listings', wrapAsync(async (req,res)=>{
    const listingValues= await listing.find();
    res.render("listings/index.ejs",{listingValues});
}));

// To add the new route (create new list)
app.get('/listings/new',(req,res)=>{
    console.log("It is working!");
    res.render("listings/newform.ejs");
});

// To save the new listing:
app.post('/listings/new/add', async(req,res,next)=>{
    try{
        console.log('Working!');
        let {Title, Description, Price, Location, Country} = req.body;
        const savingValue = new listing({
            Title,
             Description, 
             Price:Number(Price),
              Location,
               Country
        });
        await savingValue.save();
        res.redirect('/listings');
    } catch(err){
        next(err); // 👈 sends error to your error middleware
    }
});

// Update: To show the Forms
app.get("/listings/:id/editthis", wrapAsync(async(req,res)=>{
    let id=req.params.id;
    const detailValue= await listing.findById(id);
    res.render("listings/editfrom.ejs",{detailValue});
}));

// Update: To edit the forms 
app.put("/listings/:id/update", wrapAsync(async(req,res)=>{ 
    let { id } = req.params;
    let data = req.body;
    await listing.findByIdAndUpdate(id, data);
    res.redirect("/listings");
}));

// For show route to show the value in the details:
app.get("/listings/:id", wrapAsync(async(req,res)=>{ 
    let id=req.params.id;
    const detailValue= await listing.findById(id);
    res.render("listings/showdetails",{detailValue});
}));

// Error Handler:
app.use((err, req, res, next) => {
    let { status = 500, message = "Something went wrong!" } = err;
    console.log("Error coming:", err.message);
    res.status(status).send(err.message || message);
});

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});