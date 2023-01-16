const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    nome:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
    },
    senha:{
        type:String,
        required:true,
        select: false
    },
    createdAt:{
        type:Date,
        default:Date.now 
    }
})
UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.senha, 10);
    this.senha = hash;

    next();
})

const Usuario = mongoose.model('Usuario',UserSchema)

module.exports = Usuario