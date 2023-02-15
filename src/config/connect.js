
import mongoose from "mongoose"

const connectMongo = async () => {
    console.log(process.env.MONGO_URI);
    try {
        const { connection } = await mongoose.connect(process.env.MONGO_URI)

        if(connection.readyState == 1) {
            console.log('Database connected');
        }
    } catch (e) {
        console.log(e)
    }
}

export default connectMongo