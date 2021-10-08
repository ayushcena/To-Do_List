var express=require("express");
var mongoose=require("mongoose");
var bodyParser=require("body-parser");
var app=express();
app.set('view engine','ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser:true,useUnifiedTopology:true});
const itemSchema={
    name:String
}
const Item=mongoose.model("Item",itemSchema);
const item1=new Item({
    name:"Welcome Item1",
});
const item2=new Item({
    name:"Welcome Item2",
});
const item3=new Item({
    name:"Welcome Item3",
});
const d=[item1,item2,item3];

/*
Item.insertMany(d, function(err)
{
    if(err){
        console.log(err);
    }
    else{
        console.log("Successfully saved items to database");
    }
});
*/


app.get("/",function(req,res)
{
    //res.send("Hey guys");
    Item.find({},function(err,f)
    {
        //console.log(f);
        if(f.length===0)
        {
            Item.insertMany(d, function(err)
            {
                if(err){
                    console.log(err);
                }
                else{
                    console.log("Successfully saved items to database");
                }
            });
        res.redirect("/");
        }
        else
        {
            res.render("list",{newListItems:f});
        }
    })
});


app.post("/",function(req,res)
{
    const itemName=req.body.n;
    //i1.push(i);
    //console.log(i);
    //res.render("list",{newListItem:i});
    res.redirect("/");
    const item=new Item({
        name:itemName
    });
item.save();
});


app.post("/delete",function(req,res)
{
    //console.log(req.body.checkbox);
    const check=req.body.checkbox;
    Item.findByIdAndRemove(check,function(err)
    {
        if(!err)
        {
            console.log("Done deleted");
            res.redirect("/");
        }
    })
}); 





app.listen(3000,function()
{
    console.log("Welcome to port 3000");
});
