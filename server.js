const fs = require("fs/promises")
const express = require("express")
const database = require("./modules/database.js")


const db = new database()
const app = express()


app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json())

app.use(express.static("public"));

app.get("/", async (req, res) => {
    let response = await fs.readFile("index.html",
        "utf-8")
    res.send(response)

})
app.get("/todos", async (req, res) => {

    let data = await db.readFile();
    // console.log(data)
    res.json({
        data: data,
    })
});


app.post("/add_todo", async (req, res) => {
    // console.log(req.body)
    const added_todo = await db.addData(req.body.name, req.body.number, req.body.kurs, req.body.kursTuri, req.body.ishJoyi, req.body.darsVaqti, req.body.kelishManbasi)
    res.json(added_todo)
})

app.delete("/delete/:id", async (req, res) =>{
    // console.log(req.params);
    await db.deleteTodo(req.params.id);
    res.json({
        ok:true,
    })
})


app.listen(3000, () => {
    console.log("App running at 3000")
    db.readFile()
})