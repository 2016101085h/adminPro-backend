const mongoose = require('mongoose');
require('dotenv').config();

const dbConection = async () => {
    try{
        await mongoose.connect(process.env.DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('db online')

    }catch (error) {
        console.log(error);
        throw new Error('Error ala hora de iniciar');
    }
}

module.exports ={
    dbConection
}