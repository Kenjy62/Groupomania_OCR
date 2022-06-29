const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var postHistorySchema = new mongoose.Schema({
    originalId: {type:Object, required: true},
    text:{ type:String, required:true },
    imageUrl:{ type:String, required: false },
    updateAt:{ type:Date, required:true },
});

//Export the model
module.exports = mongoose.model('PostHistory', postHistorySchema);