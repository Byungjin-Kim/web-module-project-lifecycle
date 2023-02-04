import React from 'react'
import axios from 'axios';

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
        <div id="todos">
          <h2>Todos:</h2>
          {this.state.todos.reduce((acc, td) => {

            if (this.state.displayCompleteds || !td.completed) return acc.concat(
              <div onClick={this.toggleCompleted(td.id)} key={td.id}>{td.name}{td.completed ? ' ✔️' : ' '}</div>
            )
            return acc
          }, [])}

          {/* return (<div onClick={this.toggleCompleted(td.id)} key={td.id}>{td.name}{td.completed ? ' ✔️' : ' '}</div>) */}

          {/* <li>Walking with my Dog</li>
          <li>Taking care of my kids</li>
          <li>Studying React!</li> 
          미리 직접 HTML 만들어 보기!*/}
        </div>

        <form id="todoForm" onSubmit={this.onTodoFormSubmit}>
          <input value={this.state.todoNameInput} onChange={this.onTodoChange} />
          <button>Submit</button>
        </form>
        <button onClick={this.toggleDisplayComplteds}>{this.state.displayCompleteds ? 'Hide' : 'Show'} Completed</button>
      </div>



    )
  }
}
