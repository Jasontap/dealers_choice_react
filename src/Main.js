import React from "react";
import Axios from "axios";
import Lists from "./Lists";
import Reminders from "./Reminders";
import Completed from "./Completed";

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
      <div>
        <h3>what?</h3>
      </div>
    );
  }
}