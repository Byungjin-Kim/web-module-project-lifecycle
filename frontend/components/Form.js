import React from 'react'

export default class Form extends React.Component {
  render() {
    return (
      <>
        <form id="todoForm" onSubmit={this.props.onTodoFormSubmit}>
          <input
            value={this.props.todoNameInput}
            onChange={this.props.onTodoChange}
            type="text"
            placeholder="Type todo" />
          <button>Submit</button>
        </form>
        <button
          onClick={this.props.toggleDisplayComplteds}>
          {this.props.displayCompleteds ? 'Hide' : 'Show'} Completed
        </button>
      </>
    )
  }
}
