const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const pool = require("./db");
const { readdirSync } = require("fs");

// middleware
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', parameterLimit: 100000, extended: true }));


const PORT = process.env.PORT || 5001
// //ROUTES//

// // Create a todo
// app.post("/todos", async(req, res) => {
//     try {
//        const  { description } = req.body;
//        const newTodo = await pool.query("INSERT INTO todo(description) VALUES($1) RETURNING *", [description]
//        );
//        res.json(newTodo.rows[0]);
//     } catch (error) {
//         console.error(err.message);
//     }
// });


// route
readdirSync('./routes').map((r) => 
    app.use('/api', require(`./routes/${r}`))
);
// get all to

// app.get("/api/pets", async(req, res) => {
//     try {
//         const allUsers = await pool.query("SELECT * FROM pets");
//         //console.log('db users =>', allUsers);
//         res.status(200).json(allUsers.rows);
//     } catch (error) {
//         console.error(err.message);    
//     }
// });

// // get a to do
// app.get("/todos/:id",  async(req, res) => {
//     try {
//       const { id } = req.params;
//       const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);  
//       res.json(todo.rows[0]);
//     } catch (error) {
//         console.error(err.message);
//     }
// })

// // update a todo

// app.put("/todos/:id", async(req, res) => {
//     try {
//         const { id } = req.params;
//         const { description } =  req.body;
//         const updateTodo = await pool.
//         query(
//             "UPDATE todo SET description = $1 WHERE todo_id = $2",  
//             [description, id]);
//         res.json("Todo was updated!");
//     } catch (error) {
//         console.error(err.message);
//     }
// })


// // delete a todo

// app.delete("/todos/:id", async(req, res) => {
//     try {
//         const { id } = req.params;
//         const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
//         res.json("Todo was deleted!"); 
//     } catch (error) {
//         console.error(err.message);
//     }
// })
app.listen(PORT, () => {
    console.log("Server has started on port", PORT);
});


/*
Terminal commands:
npm init
npm i express pg cors 

*/