import React from 'react';
import axios from "axios";
import './App.css';

  class App extends React.Component {
    constructor() {
      console.log("Constructor");
      super();
      this.state = {
        users: [] ,
        login: ""
      }
    }
  componentDidMount() {
    console.log("CDM running");
    axios
    .get ("https://api.github.com/users/aplank14")
    .then((res) => {
      this.setState({ users: res.data};
      console.log(this.state);
    })
    .catch((err) => console.log(err));
  }

  componentDidUpdate(prevState) {
    if (prevState.users !== this.state.users) {
      console.log("User has changed!");
    }
    if (prevState.login !== this.state.login) {
      console.log("State updated, followers:", this.state.followers);
    }
  }
  fetchUsers = () => {
    axios
    .get(`https://api.github.com/users/${this.state.login}`)
    .then((res) => {
      this.setState({ users: res.data});
    })
    catch((err) => console.log(err));
  };

  handleChanges = (e) => {
    console.log("handleChanges called");
    this.setState({
      // take the previous state, and just change the followers text
      ...this.state,
      login: e.target.value
    })
  }
  render() {
    console.log("Render");
    return (
    <div className="App">
      <h1>GitHub Users & Followers</h1>
      <input
          type="text"
          value={this.state.login}
          onChange={this.handleChanges}
        />
        <button onClick={this.fetchUsers}>Search Users</button>
        <div>
          <img src={this.state.users.avatar_url} alt='profile '/>
          <div>
            <p>Bio: {this.state.users.bio}</p>
            <p>Followers: {this.state.users.followers}</p>
            <p>Following: {this.state.users.following}</p>
            <a href={this.state.users.html_url}>Visit Their Profile!</a>
          </div>
        </div>
      </div>
      );
  }
 
}

export default App;