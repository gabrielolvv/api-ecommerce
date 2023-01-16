const express = require('express');
const Produto = require('../models/Produto');
const router = express.Router();


router.post('/register', async(req, res)=>{
    console.log('entreiiii v')
    try{
        const produto = Produto.create(req.body);
            return res.send({ produto } )
    }catch(error){
        res.status(400).json({error:'registro falhou'})
    }
});


router.get('/masculino', async(req,res)=>{
    try {
        const produto = await Produto.find({categoria:{$in:['masculino']}})
        console.log(produto)
        res.send(produto)
    } catch (error) {
        res.status(500).json({error:error})
    }
})
router.get('/feminino', async(req,res)=>{
    
    try {
        const produto = await Produto.find({categoria:{$in:['feminino']}})
        console.log(produto)
        res.send(produto)
    } catch (error) {
        res.status(500).json({error:error})
    }
})
router.get('/promocao', async(req,res)=>{
    try {
        const produto = await Produto.find({categoria:{$in:['promocao']}})
        console.log(produto)
        res.send(produto)
    } catch (error) {
        res.status(500).json({error:error})
    }
})
router.get('/disponiveis', async(req,res)=>{
    
    try {
        const produto = await Produto.find({status:{$in:['true']}})
        console.log(produto)
        res.send(produto)
    } catch (error) {
        res.status(500).json({error:error})
    }
})

router.get('/', async(req,res)=>{
    try {
        const produto = await Produto.find()
        res.send(produto)
    } catch (error) {
        res.status(500).json({error:error})
    }
})

router.get('/:id', async(req,res)=>{
    const id = req.params.id
    try {
        const produto = await Produto.findOne({_id:id})
        if(!produto){
            res.status(422).json({message:'o produto não foi encontrado'})
            return
        }
        res.status(200).json(produto)
    } catch (error) {
        res.status(500).json({error:error})
    }
})

router.patch('/:id', async(req,res)=>{
    const id = req.params.id

    const {nome, descricao, valorAtual,valorAnterior,valorOferta,nomeRestaurante,status} = req.body

    const produto ={nome, descricao, valorAtual,valorAnterior,valorOferta,nomeRestaurante,status}
    try {
        const updateCardapio = await Produto.updateOne({_id:id}, produto)
        if(updateCardapio.matchedCount === 0){
            res.status(422).json({message:'o produto não foi encontrado'})
            return
        }
        if(!produto){
            res.status(422).json({message:'o produto não foi encontrado'})
            return
        }
        res.status(200).json(produto)
    } catch (error) {
        res.status(500).json({error:error})
    }
})

router.delete('/:id', async(req,res)=>{
    const id = req.params.id
    try {
        await Produto.deleteOne({_id: id})
       res.status(200).json({message:'Apagado com sucesso'})
    } catch (error) {
        res.status(500).json({error:error})
    }
})




module.exports = app => app.use('/produto', router);