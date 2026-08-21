import express from 'express'
import db from '../db.js'

const router = express.Router()

// router.get('/' , (req , res) => {
    // ` CREATE TABLE todo(
    //     id INTEGER PRIMARY KEY AUTOINCREMENT, 
    //     user_id TEXT UNIQUE , 
    //     task TEXT , 
    //     completed BOOLEAN DEFAULT 0 , 
    //     FOREIGN KEY (user_id) REFERENCES users(id)
    // )                                             
    // `
// })                                                   

router.get('/' , (req , res) => {
    const getToDos = db.prepare(`SELECT * FROM todo where user_id = ?`)
    const todos = getToDos.all(req.userId)

    res.json(todos)

})
// create todo
router.post('/' , (req , res) => {
    const { task } = req.body
    const insertToDo = db.prepare(`INSERT INTO todo (user_id , task) VALUES(? , ?)`)
    const result = insertToDo.run(req.userId , task)

    res.json({id : result.lastInsertRowid  , task , completed : 0  })
    console.log(`New todo created`)
})

// update todo. dynamic id. only the todo with id will be deleted
router.put('/:id' , (req , res) => {
    const { completed } = req.body
    const { id } = req.params

    const updateTodo = db.prepare(`UPDATE todo SET completed = ? WHERE id = ?`)
    const result = updateTodo.run(completed , id) 

    console.log(`Todo ${id} updated`)
    res.json({message : "Todo updated"})
})

// delete todo
router.delete('/:id' , (req , res) => {
    const { id } = req.params
    const userId = req.userId

    const deleteTodo = db.prepare(`DELETE FROM todo WHERE id = ? and user_id = ?`)
    deleteTodo.run(id , userId) 

    console.log(`Todo ${id} deleted`)
    res.json({message : "Todo deleted" })
})

export default router 