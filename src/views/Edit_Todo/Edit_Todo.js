import React, {Component} from 'react';
import './Edit_Todo_styles.css';
import axios from 'axios';
class EditTodo extends Component {
    constructor(props){
        super(props)
        this.state = {
            todo: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
    }

    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value,
        })
    }
    save(){
        const body = {
            id: this.props.match.params.id,
            description: this.state.todo,
            shouldComplete: false
        }
        axios.put(`/api/todo`, body)
            .then((response)=>{
                this.props.history.push('/')
            })

    }
    
    render(){
        console.log(this.props)
        return(
            <div>
                <h1>Edit Todo</h1>
                <input type="text" value={this.state.todo} onChange={this.handleChange} name="todo"/>
                <button onClick={this.save}>Save</button>
            </div>
        )
    }
}
export default EditTodo