const express = require("express")
const { verify } = require("./auth")
const { mailer } = require("./mail")
const cors = require("cors")
const app = express()

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

app.use(cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}))

app.get("/", (req, res) => {
    res.send({ message: "Hello" })
})

app.post("/mail", verify, async (req, res) => {
    const { email } = req.userData
    try {
        if (!email) throw { status: 404, message: "No Email Found" }
        let mailRes = await mailer({
            userEmail: email,
            data: req.userData
        })
        res.send({ mailRes, message: "Email Sent Successfully" }).status(201)
    } catch (error) {
        res.send(error).status(403)
    }
})

app.listen(process.env.KEY || "8080")