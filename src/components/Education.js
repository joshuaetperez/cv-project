import React, {Component} from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import uniqid from 'uniqid';
import '../styles/style.css';

class Education extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schoolArr: [],
      editState: this.initEditState(),
    };
  }

  initEditState = () => {
    return {id: '', school: '', city: '', degree: '', from: '', to: ''};
  };

  setPreviousState = (schoolState) => {
    this.setState({editState: schoolState});
  };

  resetEditState = () => {
    // this.setState({editState: this.initEditState()});
    this.props.onSectionStatusChange('Education', 'submitted');
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const schoolArr = this.state.schoolArr;
    let newSchoolState;
    const index = schoolArr.findIndex(
      (schoolObj) => schoolObj.id === this.state.editState.id
    );
    if (index >= 0) {
      newSchoolState = this.state.editState;
      this.setState(
        {
          schoolArr: schoolArr
            .slice(0, index)
            .concat(newSchoolState)
            .concat(schoolArr.slice(index + 1)),
        },
        () => console.log(this.state.schoolArr)
      );
    } else {
      newSchoolState = {...this.state.editState, id: uniqid()};
      this.setState(
        {
          schoolArr: [...this.state.schoolArr, newSchoolState],
        },
        () => console.log(this.state.schoolArr)
      );
    }
    this.setPreviousState(newSchoolState);
    this.props.onSectionStatusChange('Education', 'submitted');
  };

  handleInputChange = (e) => {
    const {name, value} = e.target;
    this.setState({editState: {...this.state.editState, [name]: value}});
  };

  render() {
    const sectionStatus = this.props.sectionStatus;
    if (sectionStatus === 'preview') {
      return <div></div>;
    } else if (sectionStatus === 'submitted') {
      return (
        <div>
          <h3>Education</h3>
          {this.state.schoolArr.map((schoolObj) => {
            return (
              <div key={schoolObj.id}>
                <div className="edit-delete-container">
                  <button
                    className="edit-button"
                    onClick={(e) => {
                      this.setState({editState: schoolObj});
                      this.props.onSectionStatusChange('Education', 'edit');
                    }}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </button>
                  <button
                    className="delete-button"
                    onClick={(e) => console.log('Delete not implemented yet.')}
                  >
                    <DeleteIcon fontSize="small" />
                  </button>
                </div>
                <p>School: {schoolObj.school}</p>
                <p>City: {schoolObj.city}</p>
                <p>Degree: {schoolObj.degree}</p>
                <p>From: {schoolObj.from}</p>
                <p>To: {schoolObj.to}</p>
              </div>
            );
          })}
          <button
            onClick={(e) => {
              this.setState({editState: this.initEditState()});
              this.props.onSectionStatusChange('Education', 'edit');
            }}
          >
            Add New School
          </button>
        </div>
      );
    }
    // Edit Mode
    const inputs = this.state.editState;
    return (
      <div>
        <h3>Education</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="input-container">
            <label htmlFor="school">School: </label>
            <input
              type="text"
              id="education-name"
              name="school"
              value={inputs.school}
              onChange={this.handleInputChange}
            ></input>
          </div>
          <div className="input-container">
            <label htmlFor="education-city">City: </label>
            <input
              type="text"
              id="education-city"
              name="city"
              value={inputs.city}
              onChange={this.handleInputChange}
            ></input>
          </div>
          <div className="input-container">
            <label htmlFor="education-degree">Degree: </label>
            <input
              type="text"
              id="education-degree"
              name="degree"
              value={inputs.degree}
              onChange={this.handleInputChange}
            ></input>
          </div>
          <div className="from-to-container">
            <div>
              <label htmlFor="education-from">From - </label>
              <label htmlFor="education-to">To: </label>
            </div>
            <div>
              <input
                type="text"
                id="education-from"
                name="from"
                value={inputs.from}
                onChange={this.handleInputChange}
              ></input>
              <span> - </span>
              <input
                type="text"
                id="education-to"
                name="to"
                value={inputs.to}
                onChange={this.handleInputChange}
              ></input>
            </div>
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

export default Education;
