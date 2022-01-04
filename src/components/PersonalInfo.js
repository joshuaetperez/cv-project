import React, {Component} from 'react';

class PersonalInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previousState: {name: '', email: '', phoneNum: ''},
      editState: {name: '', email: '', phoneNum: ''},
    };
  }

  resetEditState = () => {
    this.setState({editState: this.state.previousState});
  };

  resetPreviousState = () => {
    this.setState({previousState: this.state.editState});
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({previousState: this.state.editState});
  };

  handleInputChange = (e) => {
    const {name, value} = e.target;
    this.setState({editState: {...this.state.editState, [name]: value}});
  };

  render() {
    const inputs = this.state.editState;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              id="name"
              name="name"
              value={inputs.name}
              onChange={this.handleInputChange}
            ></input>
          </div>
          <div>
            <label htmlFor="email">Email: </label>
            <input
              type="text"
              id="email"
              name="email"
              value={inputs.email}
              onChange={this.handleInputChange}
            ></input>
          </div>
          <div>
            <label htmlFor="phone-num">Phone Number: </label>
            <input
              type="text"
              id="phone-num"
              name="phoneNum"
              value={inputs.phoneNum}
              onChange={this.handleInputChange}
            ></input>
          </div>
          <input type="submit" value="Submit"></input>
          <button onClick={this.resetEditState}>Cancel</button>
        </form>
      </div>
    );
  }
}

export default PersonalInfo;
