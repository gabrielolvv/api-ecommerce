const mongoose = require('mongoose')

const ProdutoSchema = new mongoose.Schema({
    nome:{
        type:String,
        required:true,
    },
    descricao:{
        type:String,
        required:true,
    },
    preco:{
        type:Number,
        required:true,
    },
    quantidade:{
        type:Number,
        required:true,
    },
    tamanho:{
        type:String,
        required:true,
    },
    categoria:{
        type:String,
        required:true,
    },
    marca:{
        type:String,
        required:true,
    },
    foto:{
        type:String
    },
    status:{
        type:Boolean,
        require:true
    }, 
})

const Produto = mongoose.model('Produto',ProdutoSchema)

module.exports = Produto