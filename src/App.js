import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';
import './App.css';

class App extends Component {
  id = 3 

  state = {
    input: '',
    todos: [
      { id: 0, text: "프로그라피 지원하기", checked: false },
      { id: 1, text: "프로그라피 과제 준비하기", checked: false },
      { id: 2, text: "프로그라피 친구들한테 알려주기", checked: false },
      { id: 3, text: "사랑해요 프로그라피", checked: false }
    ],
    fold: false
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value 
    });
  }

  handleCreate = () => {
    const { input, todos } = this.state;
    this.setState({
      input: '', 
      todos: todos.concat({
        id: this.id++,
        text: input,
        checked: false
      })
    });
  }

  handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      this.handleCreate();
    }
  }

  handleToggle = (id) => {
    const { todos } = this.state;
    
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index];
    const nextTodos = [...todos];    
    nextTodos[index] = { 
      ...selected, 
      checked: !selected.checked
    };

    this.setState({
      todos: nextTodos
    });
  }

  handleRemove = (id) => {
    const { todos } = this.state;
    this.setState({
      todos: todos.filter(todo => todo.id !== id)
    });
  }

  render() {
    const { input, todos } = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove
    } = this;

    return (
      <TodoListTemplate form={(
        <Form 
          value={input}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          onCreate={handleCreate}
        />
      )}>
        <button className="toggle-button" onClick={() => this.setState({ fold: !this.state.fold})}>{this.state.fold ? "펼치기" : "접기" }</button>
        {!this.state.fold ? <TodoItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove}/> : null}
      </TodoListTemplate>
    );
  }
}

export default App;
