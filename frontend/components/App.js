import React from 'react'
import axios from 'axios';

import Form from './Form';
import TodoList from './TodoList';

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      error: '',
      todoNameInput: '',
      displayCompleteds: true
    }
  }

  //for reset todo form
  resetForm = () => {
    this.setState({ ...this.state, todoNameInput: '' })
  }

  // for Error form
  setAxiosResponseError = err => {
    this.setState({ ...this.state, error: err.response.data.message })
  }


  // for onChange 
  onTodoChange = evt => {
    const { value } = evt.target;
    this.setState({ ...this.state, todoNameInput: value });
  }

  // Put New Todos for onSubmit
  postNewTodo = () => {
    axios.post(URL, { name: this.state.todoNameInput })
      .then(res => {
        this.setState({ ...this.state, todos: this.state.todos.concat(res.data.data) })
        this.resetForm(); // for reset todo form
      })
      .catch(this.setAxiosResponseError); // for Error form
  }

  onTodoFormSubmit = evt => {
    evt.preventDefault();
    this.postNewTodo(); // Put New Todos for onSubmit
  }

  // for onClick - just id access!
  toggleCompleted = id => () => {
    axios.patch(`${URL}/${id}`)
      .then(res => {
        this.setState({
          ...this.state, todos: this.state.todos.map(td => {
            if (td.id !== id) return td
            return res.data.data
          })
        })
      })
      .catch(this.setAxiosResponseError); // for Error form
  }

  toggleDisplayComplteds = () => {
    this.setState({ ...this.state, displayCompleteds: !this.state.displayCompleteds })
  }

  fetchAllTodos = () => {
    axios.get(URL)
      .then(res => {
        this.setState({ ...this.state, todos: res.data.data })
      })
      .catch(this.setAxiosResponseError); // for Error form
  }

  componentDidMount() {
    // fetch all todos from the server
    this.fetchAllTodos();
  }


  render() {
    return (
      <div>
        <div id="error">Error: {this.state.error}</div>

        <TodoList
          todos={this.state.todos}
          displayCompleteds={this.state.displayCompleteds}
          toggleCompleted={this.toggleCompleted}
        />
        <Form
          onTodoFormSubmit={this.onTodoFormSubmit}
          todoNameInput={this.state.todoNameInput}
          onTodoChange={this.onTodoChange}
          toggleDisplayComplteds={this.toggleDisplayComplteds}
          displayCompleteds={this.state.displayCompleteds}
        />

      </div>



    )
  }
}
