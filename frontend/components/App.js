import React from 'react'
import axios from 'axios';

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      error: ''

    }
  }

  fetchAllTodos = () => {
    axios.get(URL)
      .then(res => {
        this.setState({ ...this.state, todos: res.data.data })
      })
      .catch(err => {
        this.setState({ ...this.state, error: err.response.data.message })
      })
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
          {this.state.todos.map(td => {
            return (<div key={td.id}>{td.name}</div>)
          })}



          {/* <li>Walking with my Dog</li>
          <li>Taking care of my kids</li>
          <li>Studying React!</li> 
          미리 직접 HTML 만들어 보기!*/}
        </div>

        <form>
          <input />
          <button>Submit</button>
        </form>
        <button>Hide Completed</button>
      </div>



    )
  }
}
