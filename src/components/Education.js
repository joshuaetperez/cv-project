import React, {Component} from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import uniqid from 'uniqid';
import EducationForm from './EducationForm';
import EducationText from './EducationText';
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
      return (
        <div className="preview-education">
          <div
            className="preview-section-header"
            onClick={this.props.changeToEditMode}
          >
            <h3>Education</h3>
          </div>
          {this.state.schoolArr.map((schoolObj) => {
            return (
              <div
                className="preview-entry-container"
                key={schoolObj.id}
                onClick={(e) => {
                  this.setState({editState: schoolObj});
                  this.props.changeToEditEntry('Education');
                }}
              >
                <div className="preview-date">
                  {schoolObj.from} - {schoolObj.to}
                </div>
                <div className="preview-info-container">
                  <div className="preview-school">{schoolObj.school}</div>
                  <div className="preview-degree">{schoolObj.degree}</div>
                </div>
              </div>
            );
          })}
        </div>
      );
    } else if (sectionStatus === 'submitted') {
      return (
        <div className="section">
          <div className="section-header">
            <h3>Education</h3>
          </div>
          {this.state.schoolArr.map((schoolObj) => {
            return (
              <div className="entry-container" key={schoolObj.id}>
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
                <EducationText schoolObj={schoolObj} />
              </div>
            );
          })}
          <button
            className="add-button"
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
        <div className="section">
          <div className="section-header">
            <h3>Education</h3>
          </div>
          {this.state.schoolArr.map((schoolObj) => {
            if (schoolObj.id === this.state.editState.id) {
              return (
                <div className="entry-container" key={schoolObj.id}>
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
              return <EducationText schoolObj={schoolObj} key={schoolObj.id} />;
            }
          })}
        </div>
      );
    } else {
      // Add Mode
      return (
        <div className="section">
          <div className="section-header">
            <h3>Education</h3>
          </div>
          {this.state.schoolArr.map((schoolObj) => {
            return <EducationText schoolObj={schoolObj} key={schoolObj.id} />;
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
