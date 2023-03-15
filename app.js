const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const request=require("request")
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
const https=require("https");

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    const firstName=req.body.firstName;
    const lastName=req.body.lastName;
    const email=req.body.email;
    const data={
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    const jsonData=JSON.stringify(data);
    const url="https://us5.api.mailchimp.com/3.0/lists/f80234aaa3";
    const options={
        method: "POST",
        auth: "nikhil:85829e053135aa766c4327d36a7dc5c9-us5"
    }
    const request=https.request(url,options,function(response){
        if (response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html")
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
});
app.post("/failure",function(req,res){
    res.redirect("/");
});



app.listen(process.env.PORT||3000,function(){
    console.log("server is running at port 3000");
});


// API Key
// 85829e053135aa766c4327d36a7dc5c9-us5

// list id
// f80234aaa3