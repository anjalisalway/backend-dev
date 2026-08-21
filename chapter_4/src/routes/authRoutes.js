import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../prismaClient.js'


const router = express.Router() 

router.post('/register' , async(req , res) => {
    const {username , password} = req.body
    console.log(`Username ${username} created an account`)

    const hashed_password = bcrypt.hashSync(password , 8)

    try{
        const user = await prisma.user.create({
            data : {
                username : username , 
                password : hashed_password
            }
        })
        const default_todo = 'Hello ! This is your first todo! '
        await prisma.todo.create({
            data : {
                task : default_todo , 
                userId : user.id
            }
        })

        const token = jwt.sign({ id : user.id} , process.env.JWT_SECRET , {expiresIn : '24h'})

        return res.status(201).json({ token })
    }
    catch(err){
        console.log(err.message)
        res.sendStatus(503)
    }

})

router.post('/login' , async(req , res) => {
    const {username , password} = req.body
    console.log(`Username ${username} created an account`)

    try{

        const user = await prisma.user.findUnique({ 
            where:{
                username : username
            }
        })

        if(!user){
            return res.status(404).send({message : "user not found"})
        }
        console.log(`Username ${username} logged in`)

        const password_is_valid = bcrypt.compareSync(password , user.password)
        if(!password_is_valid) 
             return res.status(503).send({message : "wrong password"})

        const token = jwt.sign({ id : user.id } , process.env.JWT_SECRET , {expiresIn : '24h'})
        res.json({token})

    }
    catch(err){
        res.sendStatus(503)
        console.log(err.message )
    }
})

export default router