import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'

const router = express.Router() 

router.post('/register' , (req , res) => {
    const {username , password} = req.body
    console.log(`Username ${username} created an account`)

    const hashed_password = bcrypt.hashSync(password , 8)

    try{
        const insertUser = db.prepare(`INSERT INTO users (username , password) VALUES (? , ?)`)
        const result = insertUser.run(username , hashed_password)

        const default_todo = 'Hello ! This is your first todo! '
        const insertTodo = db.prepare(`INSERT INTO todo (user_id , task) VALUES (? , ?)`)

        insertTodo.run(result.lastInsertRowid , default_todo)

        const token = jwt.sign({ id : result.lastInsertRowid} , process.env.JWT_SECRET , {expiresIn : '24h'})

        return res.status(201).json({ token })
    }
    catch(err){
        console.log(err.message)
        res.sendStatus(503)
    }

})

router.post('/login' , (req , res) => {
    const {username , password} = req.body
    console.log(`Username ${username} created an account`)

    try{
        const getUser = db.prepare(`SELECT * FROM users where username = ?`)
        const user = getUser.get(username)

        if(!user){
            return res.status(404).send({message : "user not found"})
        }
        console.log(`Username ${username} logged in`)

        const password_is_valid = bcrypt.compareSync(password , user.password)
        if(!password_is_valid) 
             return status(503).send({message : "wrong password"})

        const token = jwt.sign({ id : user.id } , process.env.JWT_SECRET , {expiresIn : '24h'})
        res.json({token})

    }
    catch(err){
        res.sendStatus(503)
        console.log(err.message )
    }
})

export default router