import mongoose from "mongoose";

const connection = async (dbUrl) => {
    try{
        const conn = await mongoose.connect(dbUrl);
        console.log(`DB connectin successfully ${conn.connection.host}`)
    }catch(error){
        console.log('MongoDB connection error : ' + error);
    }
}

export default connection