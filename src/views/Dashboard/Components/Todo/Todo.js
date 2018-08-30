import React, {Component} from 'react';
import { Link } from 'react-router-dom';

const Todo = (props) =>{
    console.log(props)
    return (
        <div className="todo">
            <p>{props.text}</p>
            <p>Is Complete {props.IsComplete ? 'YES' : 'NO'}</p>
            <Link to={`/edit/${props.id}`}>
                <button>
                    Edit
                </button>
            </Link>
            <button onClick={()=>{props.Complete(props.id)}}>
                Complete
            </button>
            <button onClick={()=>{props.Delete(props.id)}}>
                Delete
            </button>
        </div>
    )
}

export default Todo;