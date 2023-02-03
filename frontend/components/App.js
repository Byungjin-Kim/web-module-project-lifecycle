import React from 'react'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li>Walking with my Dog</li>
          <li>Taking care of my kids</li>
          <li>Studying React!</li>
        </ul>

        <form>
          <input />
          <button>Submit</button>
        </form>
        <button>Hide Completed</button>
      </div>



    )
  }
}
