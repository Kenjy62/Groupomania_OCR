const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var adminHistorySchema = new mongoose.Schema({
    id:{
        type:String,
        required:true,
    },
    action:{
        type:String,
        required: true,
    },
    performAt:{
        type:Date,
        required:true,
    },
});

//Export the model
module.exports = mongoose.model('AdminHistory', adminHistorySchema);