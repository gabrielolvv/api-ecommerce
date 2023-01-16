const express = require('express');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/Usuario');
const router = express.Router();
const authConfig = require('../config/auth.json')
router.post('/register', async(req, res)=>{
    const {email} = req.body
    try{

        if(await User.findOne({email}))
            return res.status(400).json({error:'Usuário já existe !'})

        const user = User.create(req.body);


        return res.send({ user } )
    }catch(error){
        res.status(400).json({error:'registro falhou'})
    }
});

router.get('/', async(req,res)=>{
    try {
        const user = await User.find()
        res.send(user)
    } catch (error) {
        res.status(500).json({error:error})
    }
})

router.post('/authenticate', async (req, res)=>{
    const { email, senha } = req.body

    const user = await User.findOne({email}).select('+senha')

    if(!user)
        return res.status(400).send({error:'Usuário não foi encontrado !'})

    if(!await bcrypt.compare(senha, user.senha))
        return res.status(400).send({error:'Senha inválida!'})

    user.senha = undefined

    const token = jwt.sign({ id: user.id},authConfig.secret,{
        expiresIn: 86400
    })

    res.send({user,token})
});

module.exports = app => app.use('/auth', router);