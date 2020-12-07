import React from "react";
import axios from "axios";
import lists from "./lists";
import reminders from "./reminders";
import completed from "./completed";
// import Player from "./Player";

export default class Main extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     albums: [],
  //     albumId: ''
  //   };
  // }

  // async componentDidMount(){
  //   this.setState({ albums: (await axios.get('/api/albums')).data });
  //   window.addEventListener('hashchange', () => {
  //     this.setState({ albumId: window.location.hash.slice(1)})
  //   });
  //   this.setState({ albumId: window.location.hash.slice(1)})
  // }

  render() {
    // const { albums, albumId } = this.state;
    // console.log(albumId);
    return (
      <div id="main" className="row container">
        <h1>Here we GO!</h1>
      </div>
    );
  }
}