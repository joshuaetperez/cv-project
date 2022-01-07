import React, {Component} from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import uniqid from 'uniqid';
import EducationForm from './EducationForm';
import '../styles/style.css';

class Education extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schoolArr: [],
      editState: this.initEditState(),
    };
    this.resetEditState.bind(this);
    this.handleSubmit.bind(this);
    this.handleInputChange.bind(this);
  }

  initEditState = () => {
    return {id: '', school: '', city: '', degree: '', from: '', to: ''};
  };

  setPreviousState = (schoolState) => {
    this.setState({editState: schoolState});
  };

  resetEditState = () => {
    this.props.onSectionStatusChange('Education', 'submitted');
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // Check if the user has filled in all the form fields
    const editState = this.state.editState;
    if (
      editState.school === '' ||
      editState.city === '' ||
      editState.degree === '' ||
      editState.from === '' ||
      editState.to === ''
    ) {
      const errorDiv = document.getElementById('education-field-empty-error');
      errorDiv.textContent = 'Please fill in all of the fields';
      return;
    }

    const schoolArr = this.state.schoolArr;
    let newSchoolState;
    const index = schoolArr.findIndex(
      (schoolObj) => schoolObj.id === editState.id
    );
    // If the user is editing a school's information, replace it
    if (index >= 0) {
      newSchoolState = editState;
      this.setState({
        schoolArr: schoolArr
          .slice(0, index)
          .concat(newSchoolState)
          .concat(schoolArr.slice(index + 1)),
      });
    }
    // Else, the user is adding a new school
    else {
      newSchoolState = {...editState, id: uniqid()};
      this.setState({
        schoolArr: [...this.state.schoolArr, newSchoolState],
      });
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
      return <div>Education Preview</div>;
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
                    onClick={(e) => {
                      const schoolArr = this.state.schoolArr;
                      const index = schoolArr.findIndex(
                        (schoolElem) => schoolElem.id === schoolObj.id
                      );
                      this.setState({
                        schoolArr: schoolArr
                          .slice(0, index)
                          .concat(schoolArr.slice(index + 1)),
                      });
                    }}
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
              this.props.onSectionStatusChange('Education', 'add');
            }}
          >
            Add School
          </button>
        </div>
      );
    } else if (sectionStatus === 'edit') {
      return (
        <div>
          <h3>Education</h3>
          {this.state.schoolArr.map((schoolObj) => {
            if (schoolObj.id === this.state.editState.id) {
              return (
                <div key={schoolObj.id}>
                  <EducationForm
                    schoolArr={this.state.schoolArr}
                    editState={this.state.editState}
                    onEditStateReset={this.resetEditState}
                    onFormSubmit={this.handleSubmit}
                    onInputChange={this.handleInputChange}
                  />
                </div>
              );
            } else {
              return (
                <div key={schoolObj.id}>
                  <p>School: {schoolObj.school}</p>
                  <p>City: {schoolObj.city}</p>
                  <p>Degree: {schoolObj.degree}</p>
                  <p>From: {schoolObj.from}</p>
                  <p>To: {schoolObj.to}</p>
                </div>
              );
            }
          })}
        </div>
      );
    } else {
      // Add Mode
      return (
        <div>
          <h3>Education</h3>
          {this.state.schoolArr.map((schoolObj) => {
            return (
              <div key={schoolObj.id}>
                <p>School: {schoolObj.school}</p>
                <p>City: {schoolObj.city}</p>
                <p>Degree: {schoolObj.degree}</p>
                <p>From: {schoolObj.from}</p>
                <p>To: {schoolObj.to}</p>
              </div>
            );
          })}
          <EducationForm
            schoolArr={this.state.schoolArr}
            editState={this.state.editState}
            onEditStateReset={this.resetEditState}
            onFormSubmit={this.handleSubmit}
            onInputChange={this.handleInputChange}
          />
        </div>
      );
    }
  }
}

export default Education;
