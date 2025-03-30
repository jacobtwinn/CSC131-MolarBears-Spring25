const connect = require("./db")
const express = require("express")
const cors = require("cors")
const VisitHistory = require("./VisitHistoryRoutes")

const app = express()
const PORT = 3000

app.get("/products",(req, res) => { })
app.use(cors())
app.use(express.json())
app.use(VisitHistory)

app.listen(PORT, () => {
    connect.connectToServer()
    console.log("Server started at http://localhost:3000")
})