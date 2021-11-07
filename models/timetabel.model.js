const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Member schema
const timetableSchema = new mongoose.Schema({
    b1monbs:{
        type:String,
        required:true
    },
    b1monbe:{
        type:String,
        required:true
    },
    b1mongs:{
        type:String,
        required:true
    },
    b1monge:{
        type:String,
        required:true
    },
    b2monbs:{
        type:String,
        required:true
    },
    b2monbe:{
        type:String,
        required:true
    },
    b2mongs:{
        type:String,
        required:true
    },
    b2monge:{
        type:String,
        required:true
    },
    b1tuebs:{ 
        type:String,
        required:true
    },
    b1tuebe:{ 
        type:String,
        required:true
    },
    b1tuegs:{ 
        type:String,
        required:true
    },
    b1tuege:{ 
        type:String,
        required:true
    },
    b2tuebs:{
        type:String,
        required:true
    },
    b2tuebe:{
        type:String,
        required:true
    },
    b2tuegs:{
        type:String,
        required:true
    },
    b2tuege:{
        type:String,
        required:true
    },
    b1wedbs:{
        type:String,
        required:true
    },
    b1wedbe:{
        type:String,
        required:true
    },
    b1wedgs:{
        type:String,
        required:true
    },
    b1wedge:{
        type:String,
        required:true
    },
    b2wedbs:{
        type:String,
        required:true
    },
    b2wedbe:{
        type:String,
        required:true
    },
    b2wedgs:{
        type:String,
        required:true
    },
    b2wedge:{
        type:String,
        required:true
    },
    b1thurbs:{
        type:String,
        required:true
    },
    b1thurbe:{
        type:String,
        required:true
    },
    b1thurgs:{
        type:String,
        required:true
    },
    b1thurge:{
        type:String,
        required:true
    },
    b2thurbs:{
        type:String,
        required:true
    },
    b2thurbe:{
        type:String,
        required:true
    },
    b2thurgs:{
        type:String,
        required:true
    },
    b2thurge:{
        type:String,
        required:true
    },
    b1fribe:{
        type:String,
        required:true
    },
    b1fribs:{
        type:String,
        required:true
    },
    b1frigs :{
        type:String,
        required:true
    },
    b1frige:{
        type:String,
        required:true
    },
    b2fribs:{
        type:String,
        required:true
    },
    b2fribe:{
        type:String,
        required:true
    },
    b2frigs:{
        type:String,
        required:true
    },
    b2frige:{
        type:String,
        required:true
    },
    b1satbs:{
        type:String,
        required:true
    },
    b1satbe:{
        type:String,
        required:true
    },
    b1satgs:{
        type:String,
        required:true
    },
    b1satge:{
        type:String,
        required:true
    },
    b2satbs:{
        type:String,
        required:true
    },
    b2satbe:{
        type:String,
        required:true
    },
    b2satgs:{
        type:String,
        required:true
    },
    b2satgs:{
        type:String,
        required:true
    },
    b1sunbs:{
        type:String,
        required:true
    },
    b1sunbe:{
        type:String,
        required:true
    },
    b1sungs:{
        type:String,
        required:true
    },
    b1sungse:{
        type:String,
        required:true
    },
    b2sunbs:{
        type:String,
        required:true
    },
    b2sunbe:{
        type:String,
        required:true
    },
    b2sungs:{
        type:String,
        required:true
    },
    b2sunge:{
        type:String,
        required:true
    }
});

const Timetable = mongoose.model('Timetable',timetableSchema);
module.exports = Timetable;

// b1monbs,
// b1monbe,
// b1mongs,
// b1monge,
// b2monbs,
// b2monbe,
// b2mongs,
// b2monge,
// b1tuebs,
// b1tuebe,
// b1tuegs,
// b1tuege,
// b2tuebs,
// b2tuebe,
// b2tuegs,
// b2tuege,
// b1wedbs,
// b1wedbse,
// b1wedgs,
// b1wedge,
// b2wedbs,
// b2wedbe,
// b2wedgs,
// b2wedge,
// b1thurbs,
// b1thurbe,
// b1thurgs,
// b1thurge,
// b2thurbs,
// b2thurbe,
// b2thurgs,
// b2thurge,
// b1frie,
// b1fris,
// b2fribs,
// b2fribe,
// b2frigs,
// b2frige,
// b1satbs,
// b1satbe,
// b1satgs,
// b1satge,
// b2satbs,
// b2satbe,
// b2satgs,
// b1sunbs,
// b1sunbe,
// b1sungs,
// b1sungse,
// b2sunbs,
// b2sunbe,
// b2sungs,
// b2sunge