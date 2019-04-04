import express from 'express';
import cors from 'cors';
var app = express();
import bodyParser from 'body-parser';
var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-east-1",
    endpoint: "https://dynamodb.us-east-1.amazonaws.com"
  });

var docClient = new AWS.DynamoDB.DocumentClient();

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", 
   "Origin, X-Requested-With, Content-Type, Accept"); 
   next(); 
  });


app.get('/',(req,res)=>{
    res.header("Access-Control-Allow-Origin: *");
    console.log("body is : "+JSON.stringify(req.body));
    res.status(200).send("Hello from backend server");
});

app.get('/Items',(req,res)=>{
    res.header("Access-Control-Allow-Origin: *");
    console.log("body is : "+JSON.stringify(req.body));
    var items = [
        {
            "Name":"Shirt",
            "Price":11
        },
        {
            "Name":"Shorts",
            "Price":21
        }
    ]
    res.status(200).send(items);
});


app.get('/getUser',(req,res)=>{
    res.header("Access-Control-Allow-Origin: *");
    console.log("body is : "+JSON.stringify(req.body));
    var params = {
        TableName: 'Demo',
        KeyConditionExpression: "#usrID = :val",
        ExpressionAttributeNames:{
            "#usrID": "userID"
        },
        ExpressionAttributeValues: {
            ":val": '1',

        }
    };

    docClient.query(params, function(err, data) {
        if (err) {
            console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
            res.status(500).send("Error in Query");
        } else {
            console.log("Query succeeded.");
            console.log(data)
            res.status(200).send(data);
        }
    });
    
});

app.listen(8080, () => console.log('Backend API listening on port 8080!'))