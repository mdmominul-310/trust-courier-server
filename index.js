const express=require('express');
const {MongoClient} =require('mongodb');
const cors=require('cors');
require('dotenv').config();


const app=express();
const port=process.env.PORT|| 5000;
app.use(cors());
app.use(express.json());

// user : mominul-310
//pass: SNGib7goI7Gi0i8d

app.get('/',(req,res)=>{
    res.send("server working")
})


// mongodatabase uri 

const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ugy5t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri);


// database connection function start
async function run(){
    try{
        await client.connect();
        console.log('database-connected successfully');
        const database=client.db("trust_services");
        //collection for services
        const servicesCollection=database.collection("services");
        //collection for booking
        const bookingCollection=database.collection("booking")
    //post services to database
        app.post('/services',async(req,res)=>{
            const newService=req.body;
            const result =await servicesCollection.insertOne(newService)
            console.log(result)
            res.json(result)
            
        })
    //get services to database
    app.get('/services',async(req,res)=>{
        const result=await servicesCollection.find({}).toArray();
        res.json(result)
    })
    //post for booking
    app.post('/booking',async(req,res)=>{
        const newBooking=req.body;
        // console.log(newBooking);
        const result=await bookingCollection.insertOne(newBooking);
        res.json(result);
        console.log('data inserted succesfully',result)
    })
    
    app.get('/bookings',async(req,res)=>{
        const result=await bookingCollection.find({}).toArray();
        res.json(result)
        console.log(result)
    })
}
    finally{
        // await client.close()
    }
}
run();

app.listen(port,()=>{
    console.log('listingin port:',port)
})