const express = require('express'),
    cors =  require('cors'),
    bodyParser = require('body-parser'),
    massive =  require('massive');
require('dotenv').config();

const app = express();

massive(process.env.CONNECTION_STRING)
    .then((dbinstance)=>{
        app.set('db', dbinstance);
        console.log(`DB is up and running!`)
    })

app.use(cors());
app.use(bodyParser.json());

//////////////////Endpoint CODE ///////////////////
    
    app.get(`/api/todo/:userId`, (req, res, next)=>{
        const db = app.get('db');
        db.todo.find({user_id:req.params.userId})
            .then((todos)=>{
                res.send(todos);
            })
    })

    app.post('/api/login', (req, res, next)=>{
        const db = app.get('db');
        db.user_table.findOne({email:req.body.email, password:req.body.password})
            .then((response)=>{
                if(response){
                    res.send(response)
                }else{
                   return  db.user_table.insert({email: req.body.email, password: req.body.password})
                }
            })
            .then((newUser)=>{
                res.send(newUser) 
            })
    })
    
    app.post(`/api/todo`, (req, res, next)=>{
        const todo  = { user_id: req.body.user_id, description: req.body.description, is_completed: false}
        const db = app.get('db');
        db.todo.insert(todo)
            .then((todo)=>{
                return db.todo.find({user_id:req.body.user_id})
            })
            .then((todos)=>{
                res.send(todos);
            })

    })
    
    app.put(`/api/todo`, (req, res, next)=>{
    
        const db = app.get('db');
        if(req.body.shouldComplete){
            db.todo.update({id: req.body.id}, {is_completed:true})
                .then((todo)=>{
                    res.send(todo);
                })
        }else{
            db.todo.update({id:req.body.id}, {description:req.body.description})
                .then((todo)=>{
                    res.send(todo);
                })
        }
    })
    
    app.delete(`/api/todo/:id`, (req, res, next)=>{
        const db = app.get('db');
        db.todo.destroy({id:req.params.id})
        .then((todo)=>{
           return db.todo.find({user_id:req.params.userId})
        })
        .then((todos)=>{
            res.send(todos);
        })
    })

///////////////////////////////////////////////////

const port = process.env.PORT || 7001

app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})
