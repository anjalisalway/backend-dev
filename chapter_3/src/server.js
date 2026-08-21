// http://localhost:8383/
import express from 'express'
import path , { dirname } from 'path'
import {fileURLToPath} from 'url'
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
import authMiddleware from './middleware/authMiddleware.js'

const PORT = process.env.PORT || 8383
const app = express()

// middlewares
app.use(express.static(path.join(__dirname , '../public')))
app.use(express.json())

// external routes for backend API
app.use("/auth" , authRoutes)
app.use("/todos" , authMiddleware , todoRoutes)

// UI APIS 
app.get("/" , (req , res) => {
    res.sendFile(path.join(__dirname , 'public' , 'index.html'))
})

app.listen(PORT , () => {
    console.log(`Server has started on port : ${PORT}`)
})