import React, {Component} from 'react';
import './Create_Todo_styles.css';
import axios from 'axios';
import {Link} from 'react-router-dom'
class CreateTodo extends Component {
    constructor(props){
        super(props)
        this.state={
            todo:'',
        }
        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this)
    }
    
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    save(){
        const body = {
            todo: this.state.todo,
        }
        axios.post(`/api/todo`, body)
            .then((response)=>{
                console.log(this.props)
                this.props.history.push('/')
            })
    }

    render(){
        return(
            <div>
                <h1>Create A Todo</h1>
                <input name="todo" value={this.state.todo} onChange={this.handleChange}/>
                <Link to={'/'}>
                    <button>
                        Cancel
                    </button>
                </Link>

                <button onClick={this.save}>Save</button>
            </div>
        )
    }
}
export default CreateTodo