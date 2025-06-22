import express,{Request , Response} from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config";
import bookRoute from "./modules/book/book.route";
import borrowRoute from "./modules/borrow /borrow.route";


const app = express();


app.use(cors());
app.use(express.json());
app.use(bookRoute);
app.use(borrowRoute);


app.get('/',(req: Request, res: Response )=>{
res.send({success: true, Message: "I am here"})
})

app.listen(config.port, ()=> {
console.log(`✅ server is Running on port ${config.port}`);
});

//Create Server
async function server (){
    try {
        //console.log(config);
        await mongoose.connect( config.database_url!)

        console.log(`📊 connected to database`);

    }catch (error) {
        console.error(`server  error ${server}`)
    }
 }


server();