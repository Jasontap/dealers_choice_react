import React, { Component } from "react";
import axios from "axios";
// import Lists from "./Lists";
// import Reminders from "./Reminders";
// import Completed from "./Completed";


const Lists = ({ lists }) => { 
  return (
    <div>
      <h4>
        <a href=''>Home</a>
      </h4>
      <h1>Lists</h1>
      <div>
        <ul>
          {
            lists.map((list, idx) => {
              return(
                <li key={ list.id }>
                  <a href={ `#${ list.id }` }>{ list.name }</a>
                  <form method='POST' action={ `/api/lists/${ list.id }?_method=DELETE` }>
                    <button>X</button>
                  </form>
                </li>
              )
            })
          }
        </ul>
      </div>
      <div>
        <form action='/api/lists' method='POST'>
          <input name='name' placeholder='enter list name' />
          <button>Add New List</button>
        </form>
      </div>
    </div>
  )
}


class Reminders extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      selectedReminder: ''
    }
  }
  
  async componentDidUpdate(prevProps){
    if(prevProps.selectedList !== this.props.selectedList){
      const list = (await axios.get(`/api/lists/${this.props.selectedList}/active`)).data;
      this.setState({ list });
    }
  }
  
  async componentDidMount(){
    const list = (await axios.get(`/api/lists/${this.props.selectedList}/active`)).data;
    this.setState({ list });
    window.addEventListener('hashchange', () => {
      this.setState({ selectedReminder: window.location.hash.slice(1)})
    });
    this.setState({ selectedReminder: window.location.hash.slice(1)});
  }
  

  render () {
    const { list } = this.state;
    return (
      <div>
        <h1>Reminders</h1>
        <a href=''>Close</a>
        <div>
          <ul>
            {
              list.map((reminder, idx) => {
                return(
                  <li key={ reminder.id }>
                    <a href={ `#${ reminder.listId }` }>{ reminder.name }</a>
                    <form method='POST' action={ `/api/lists/${ reminder.listId }/${ reminder.id }?_method=DELETE` }>
                      <button>X</button>
                    </form>
                  </li>
                )
              })
            }
          </ul>
        </div>
        <div>
          <form action={ `/api/lists/${ this.props.selectedList }` } method='POST'>
            <input name='name' placeholder='enter new reminder' />
            <button>Add Reminder</button>
          </form>
        </div>
      </div>
    )
  }
}


class Completed extends React.Component {
  constructor() {
    super();
    this.state = {
      list: []
    }
  }
  
  async componentDidUpdate(prevProps){
    if(prevProps.selectedList !== this.props.selectedList){
      const list = (await axios.get(`/api/lists/${this.props.selectedList}/completed`)).data;
      this.setState({ list });
    }
  }
  
  async componentDidMount(){
    const list = (await axios.get(`/api/lists/${this.props.selectedList}/completed`)).data;
    this.setState({ list });
  }
  


  render () {
    const { list } = this.state;
    
    return (
      <div>
        <h1>Completed</h1>
        <a href=''>Close</a>
        <div>
          <ul>
            {
              list.map(reminder => {
                return(
                  <li key={ reminder.id }>
                    <a href={ `${ reminder.id }` }>{ reminder.name }</a>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      lists: [],
      selectedList: ''
    };
  }

  async componentDidMount(){
    this.setState({ lists: (await axios.get('/api/lists')).data });
    window.addEventListener('hashchange', () => {
      this.setState({ selectedList: window.location.hash.slice(1)});
    });
    this.setState({ selectedList: window.location.hash.slice(1)});
  }

  
  render() {
    const { lists, selectedList } = this.state;
   
    return (
      <div>
        { <Lists lists={ lists } /> }
        <div>
          { !!selectedList && <Reminders selectedList={ selectedList } /> }
          { !!selectedList && <Completed selectedList={ selectedList } /> }
        </div>
      </div>
    );
  }
}