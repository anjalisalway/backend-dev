// address = http://localhost:8383
const express = require('express')
const app = express()
const PORT = 8383


// HTTP verbs and routes: 
// verbs : get , etc 
// routes : dashboard/auth 
// routes are basically endpoints 
app.use(express.json())
let users = ["Joey King"]
app.get("/" , (req , res)=> {
    console.log(`Someone hit the endpoint` , req.method)
    res.send(`<h1>${JSON.stringify(users)}</h1>`)
})

app.get("/dashboard" , (req , res) =>{
    console.log(`This is the dashboard section`)
    res.send(`<h1> DASHBOARD </h1>`)
})
app.post("/login" , (req , res) => {
    const new_entry = req.body
    users.push(new_entry.name)
    res.send(users)
})
app.listen(PORT , ()=> console.log(`Server has started on : ${PORT}`) )
