import React from 'react'
import axios from 'axios';

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],

    }
  }

  fetchAllTodos = () => {
    axios.get(URL)
      .then(res => {
        this.setState({ ...this.state, todos: res.data.data })
      })
      .catch(err => {
        debugger
      })
  }

  componentDidMount() {
    // fetch all todos from the server
    this.fetchAllTodos();
  }

  render() {
    return (
      <div>
        <div id="todos">
          <h2>Todos:</h2>
          {this.state.todos.map(td => {
            return (<div key={td.id}>{td.name}</div>)
          })}



          {/* <li>Walking with my Dog</li>
          <li>Taking care of my kids</li>
          <li>Studying React!</li> */}
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
