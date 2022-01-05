import React, {Component} from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import '../styles/style.css';

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
    this.props.onSectionStatusChange('PersonalInfo', 'submitted');
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({previousState: this.state.editState});
    this.props.onSectionStatusChange('PersonalInfo', 'submitted');
  };

  handleInputChange = (e) => {
    const {name, value} = e.target;
    this.setState({editState: {...this.state.editState, [name]: value}});
  };

  render() {
    const sectionStatus = this.props.sectionStatus;
    const previousState = this.state.previousState;
    if (sectionStatus === 'preview') {
      return <div></div>;
    } else if (sectionStatus === 'submitted') {
      return (
        <div>
          <div className="edit-section-header">
            <h3>Personal Info</h3>
            <button
              className="edit-button"
              onClick={(e) =>
                this.props.onSectionStatusChange('PersonalInfo', 'edit')
              }
            >
              <EditOutlinedIcon fontSize="small" />
            </button>
          </div>
          <p>Name: {previousState.name}</p>
          <p>Email: {previousState.email}</p>
          <p>Phone Number: {previousState.phoneNum}</p>
        </div>
      );
    }
    // Edit Mode
    const inputs = this.state.editState;
    return (
      <div>
        <h3>Personal Info</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="input-container">
            <label htmlFor="personal-info-name">Name: </label>
            <input
              type="text"
              id="personal-info-name"
              name="name"
              value={inputs.name}
              onChange={this.handleInputChange}
            ></input>
          </div>
          <div className="input-container">
            <label htmlFor="personal-info-email">Email: </label>
            <input
              type="text"
              id="personal-info-email"
              name="email"
              value={inputs.email}
              onChange={this.handleInputChange}
            ></input>
          </div>
          <div className="input-container">
            <label htmlFor="personal-info-phone-num">Phone Number: </label>
            <input
              type="text"
              id="personal-info-phone-num"
              name="phoneNum"
              value={inputs.phoneNum}
              onChange={this.handleInputChange}
            ></input>
          </div>
          <input type="submit" value="Submit"></input>
          <button type="button" onClick={this.resetEditState}>
            Cancel
          </button>
        </form>
      </div>
    );
  }
}

export default PersonalInfo;
