import express from 'express'
import prisma from '../prismaClient.js'

const router = express.Router()

// get all todos
router.get('/' , async(req , res) => {
    const todos = await prisma.todo.findMany({
        where : {
            userId : req.userId
        }
    })
 
    res.json(todos)

})

// create todo
router.post('/' , async(req , res) => {
    const { task } = req.body
    const result = await prisma.todo.create({
        data : {
            task , 
            userId : req.userId
        }
    })

    res.json(result)
    console.log(`New todo created`)
})

// update todo. dynamic id. only the todo with id will be deleted
router.put('/:id' , async(req , res) => {
    const { completed } = req.body
    const { id } = req.params

    const result = await prisma.todo.update({
        where : {
            id : parseInt(id) , 
            userId : req.userId
        } , 
        data : {
            completed : !!completed
        }
    })

    console.log(`Todo ${id} updated`)
    res.json(result)
})

// delete todo
router.delete('/:id' , async(req , res) => {
    const { id } = req.params
    const userId = req.userId

    await prisma.todo.delete({
        where : {
            id : parseInt(id) , 
            userId
        }
    })

    console.log(`Todo ${id} deleted`)
    res.send({message : "Todo deleted" })
})

export default router 