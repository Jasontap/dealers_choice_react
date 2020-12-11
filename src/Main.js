import React, { Component } from "react";
import axios from "axios";
// import Lists from "./Lists";
// import Reminders from "./Reminders";
// import Completed from "./Completed";


const Lists = ({ lists, removeList }) => { 
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
                  <a href={ `#${ list.id }` }>{ list.name }</a><button onClick={ ()=> removeList(idx, list.id) }>X</button>
                </li>
              )
            })
          }
        </ul>
      </div>
      <div>
        <form method='POST'>
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
      list: []
    }
    this.removeItem = this.removeItem.bind(this);
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
  }
  
  removeItem(idx){
    const list = this.state.list.filter((_, _idx)=> _idx !== idx);
    this.setState({ list });
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
                    <a href={ `${ reminder.id }` }>{ reminder.name }</a><button onClick={ ()=> this.removeItem(idx) }>X</button>
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
    this.removeList = this.removeList.bind(this);
  }

  async componentDidMount(){
    this.setState({ lists: (await axios.get('/api/lists')).data });
    window.addEventListener('hashchange', () => {
      this.setState({ selectedList: window.location.hash.slice(1)})
    });
    this.setState({ selectedList: window.location.hash.slice(1)});
  }

  // addList(){

  //   this.setState({ lists: [...this.state.lists, ]})
  // }

  removeList(idx, listId){
    // await axios.delete('/api/lists/')
    // const lists = this.state.lists.filter((_, _idx)=> _idx !== idx);
    this.setState({ lists });
  }
  
  render() {
    const { lists, selectedList } = this.state;
    const { removeList } = this;
    // console.log(lists)
    return (
      <div>
        { <Lists lists={ lists } removeList={ removeList } /> }
        <div>
          { !!selectedList && <Reminders selectedList={ selectedList } /> }
          { !!selectedList && <Completed selectedList={ selectedList } /> }
        </div>
      </div>
    );
  }
}