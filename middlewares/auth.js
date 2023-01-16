const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')
module.exports = (req, res, next)=>{
    const authHeader = req.headers.authorization

    if(!authHeader)
        return res.status(401).send({error:'Sem acesso(token)'})

    const parts = authHeader.split(' ')

    if(!parts.length === 2)
        return res.status(401).send({error:'Sem acesso(token)'})

    const [scheme, token] = parts

    if(!/^Bearer$/i.test(scheme))
        return res.status(401).send({error:'Sem acesso(token)'})
    
    jwt.verify(token, authConfig.secret,(err, decoded)=>{
        if(err) return res.status(401).send({error:'Sem acesso(token)'})

        req.userId = decoded.id
        return next()
    })
 };