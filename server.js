const express = require(`express`)
const app = express()
const path = require(`path`)
const notes = require(`./routes/notes`)
const PORT = process.env.PORT || 3001

app.use(express.static(`public`))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(`/routes`, notes)
app.get(`/notes`,(req,res)=>res.sendFile(path.join(__dirname, `./public/notes.html`)))
app.listen(PORT,()=>console.log(`App listening at http://localhost:${PORT}`))