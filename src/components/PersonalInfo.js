import React, {Component} from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
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
    // Check if the user has filled in all the form fields
    const editState = this.state.editState;
    if (
      editState.name === '' ||
      editState.email === '' ||
      editState.phoneNum === ''
    ) {
      const errorDiv = document.getElementById(
        'personal-info-field-empty-error'
      );
      errorDiv.textContent = 'Please fill in all of the fields';
      return;
    }
    // Replace previous information with the new information
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
      return (
        <div
          className="preview-personal-info"
          onClick={this.props.editPersonalInfo}
        >
          <div className="preview-name">{previousState.name}</div>
          <div className="preview-email-phone-container">
            <div className="preview-email">
              <EmailIcon /> {previousState.email}
            </div>
            <div className="preview-phone">
              <PhoneIcon /> {previousState.phoneNum}
            </div>
          </div>
        </div>
      );
    } else if (sectionStatus === 'submitted') {
      return (
        <div className="section">
          <div className="section-header">
            <h3>Personal Info</h3>
            <button
              className="edit-button"
              onClick={(e) =>
                this.props.onSectionStatusChange('PersonalInfo', 'edit')
              }
            >
              <EditOutlinedIcon />
            </button>
          </div>
          <div className="personal-info-container">
            <div className="text-container">
              <div className="text-field-container">Name: </div>
              <div className="text-div">{previousState.name}</div>
            </div>
            <div className="text-container">
              <div className="text-field-container">Email: </div>
              <div className="text-div">{previousState.email}</div>
            </div>
            <div className="text-container">
              <div className="text-field-container">Phone Number: </div>
              <div className="text-div">{previousState.phoneNum}</div>
            </div>
          </div>
        </div>
      );
    }
    // Edit Mode
    const inputs = this.state.editState;
    return (
      <div className="section">
        <div className="section-header">
          <h3>Personal Info</h3>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="input-container">
            <div className="label-container">
              <label htmlFor="personal-info-name">Name: </label>
            </div>
            <input
              type="text"
              id="personal-info-name"
              name="name"
              value={inputs.name}
              onChange={this.handleInputChange}
            ></input>
          </div>
          <div className="input-container">
            <div className="label-container">
              <label htmlFor="personal-info-email">Email: </label>
            </div>
            <input
              type="text"
              id="personal-info-email"
              name="email"
              value={inputs.email}
              onChange={this.handleInputChange}
            ></input>
          </div>
          <div className="input-container">
            <div className="label-container">
              <label htmlFor="personal-info-phone-num">Phone Number: </label>
            </div>
            <input
              type="text"
              id="personal-info-phone-num"
              name="phoneNum"
              value={inputs.phoneNum}
              onChange={this.handleInputChange}
            ></input>
          </div>
          <div className="button-container">
            <input type="submit" value="Submit"></input>
            <input
              type="button"
              value="Cancel"
              onClick={this.resetEditState}
            ></input>
          </div>
          <div id="personal-info-field-empty-error"></div>
        </form>
      </div>
    );
  }
}

export default PersonalInfo;
