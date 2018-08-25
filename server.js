const express = require('express'),
    cors =  require('cors'),
    bodyParser = require('body-parser');
require('dotenv').config();

const app = express();


app.use(cors());
app.use(bodyParser.json());

//////////////////Endpoint CODE ///////////////////

let todos = [];
let id = 1;

app.get(`/api/todo`, (req, res, next)=>{
    res.send(todos);
})

app.post(`/api/todo`, (req, res, next)=>{
    const todo  = {id: id, todo: req.body.todo, isCompleted: false}
    todos.push(todo)
    id++;
    res.send(todos);
})

app.put(`/api/todo`, (req, res, next)=>{

    const editTodo = todos.reduce((obj, todo)=>{
        if(Number(req.body.id) === todo.id){
            obj = todo
        }
        return obj;
    }, {})

    if(editTodo.id){
        if(req.body.shouldComplete){
            editTodo.isCompleted = true;
        }else{
            editTodo.todo = req.body.todo;
        }
    
        todos = todos.filter((todo)=>{
            return todo.id != req.body.id
        })
    
        todos.push(editTodo);
    }

    
    res.send(todos);
})

app.delete(`/api/todo/:id`, (req, res, next)=>{
    todos = todos.filter((todo)=>{
        return todo.id != req.params.id
    })
    res.send(todos);
})
///////////////////////////////////////////////////

const port = process.env.PORT || 7001

app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})
