import React, {Component} from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import uniqid from 'uniqid';
import WorkExperienceForm from './WorkExperienceForm';
import WorkExperienceText from './WorkExperienceText';
import '../styles/style.css';

class WorkExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyArr: [],
      editState: this.initEditState(),
    };
    this.resetEditState.bind(this);
    this.handleSubmit.bind(this);
    this.handleInputChange.bind(this);
  }

  initEditState = () => {
    return {
      id: '',
      company: '',
      city: '',
      position: '',
      from: '',
      to: '',
      details: '',
    };
  };

  setPreviousState = (companyState) => {
    this.setState({editState: companyState});
  };

  resetEditState = () => {
    this.props.onSectionStatusChange('WorkExperience', 'submitted');
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // Check if the user has filled in all the form fields
    const editState = this.state.editState;
    if (
      editState.company === '' ||
      editState.city === '' ||
      editState.position === '' ||
      editState.from === '' ||
      editState.to === '' ||
      editState.details === ''
    ) {
      const errorDiv = document.getElementById(
        'work-experience-field-empty-error'
      );
      errorDiv.textContent = 'Please fill in all of the fields';
      return;
    }

    const companyArr = this.state.companyArr;
    let newCompanyState;
    const index = companyArr.findIndex(
      (companyObj) => companyObj.id === editState.id
    );
    // If the user is editing a company's information, replace it
    if (index >= 0) {
      newCompanyState = editState;
      this.setState({
        companyArr: companyArr
          .slice(0, index)
          .concat(newCompanyState)
          .concat(companyArr.slice(index + 1)),
      });
    }
    // Else, the user is adding a new company
    else {
      newCompanyState = {...editState, id: uniqid()};
      this.setState({
        companyArr: [...this.state.companyArr, newCompanyState],
      });
    }
    this.setPreviousState(newCompanyState);
    this.props.onSectionStatusChange('WorkExperience', 'submitted');
  };

  handleInputChange = (e) => {
    const {name, value} = e.target;
    this.setState({editState: {...this.state.editState, [name]: value}});
  };

  render() {
    const sectionStatus = this.props.sectionStatus;
    if (sectionStatus === 'preview') {
      return (
        <div className="preview-work-experience">
          <div
            className="preview-section-header"
            onClick={this.props.changeToEditMode}
          >
            <h3>Work Experience</h3>
          </div>
          {this.state.companyArr.map((companyObj) => {
            return (
              <div
                className="preview-entry-container"
                key={companyObj.id}
                onClick={(e) => {
                  this.setState({editState: companyObj});
                  this.props.changeToEditEntry('WorkExperience');
                }}
              >
                <div className="preview-date">
                  {companyObj.from} - {companyObj.to}
                </div>
                <div className="preview-info-container">
                  <div className="preview-company-city">
                    {companyObj.company}, {companyObj.city}
                  </div>
                  <div className="preview-position">{companyObj.position}</div>
                  <div className="preview-details">{companyObj.details}</div>
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
            <h3>Work Experience</h3>
          </div>
          {this.state.companyArr.map((companyObj) => {
            return (
              <div className="entry-container" key={companyObj.id}>
                <div className="edit-delete-container">
                  <button
                    className="edit-button"
                    onClick={(e) => {
                      this.setState({editState: companyObj});
                      this.props.onSectionStatusChange(
                        'WorkExperience',
                        'edit'
                      );
                    }}
                  >
                    <EditOutlinedIcon />
                  </button>
                  <button
                    className="delete-button"
                    onClick={(e) => {
                      const companyArr = this.state.companyArr;
                      const index = companyArr.findIndex(
                        (companyElem) => companyElem.id === companyObj.id
                      );
                      this.setState({
                        companyArr: companyArr
                          .slice(0, index)
                          .concat(companyArr.slice(index + 1)),
                      });
                    }}
                  >
                    <DeleteIcon />
                  </button>
                </div>
                <WorkExperienceText companyObj={companyObj} />
              </div>
            );
          })}
          <button
            className="add-button"
            onClick={(e) => {
              this.setState({editState: this.initEditState()});
              this.props.onSectionStatusChange('WorkExperience', 'add');
            }}
          >
            Add Company
          </button>
        </div>
      );
    } else if (sectionStatus === 'edit') {
      return (
        <div className="section">
          <div className="section-header">
            <h3>Work Experience</h3>
          </div>
          {this.state.companyArr.map((companyObj) => {
            if (companyObj.id === this.state.editState.id) {
              return (
                <div className="entry-container" key={companyObj.id}>
                  <WorkExperienceForm
                    companyArr={this.state.companyArr}
                    editState={this.state.editState}
                    onEditStateReset={this.resetEditState}
                    onFormSubmit={this.handleSubmit}
                    onInputChange={this.handleInputChange}
                  />
                </div>
              );
            } else {
              return (
                <WorkExperienceText
                  companyObj={companyObj}
                  key={companyObj.id}
                />
              );
            }
          })}
        </div>
      );
    } else {
      // Add Mode
      return (
        <div className="section">
          <div className="section-header">
            <h3>Work Experience</h3>
          </div>
          {this.state.companyArr.map((companyObj) => {
            return (
              <WorkExperienceText companyObj={companyObj} key={companyObj.id} />
            );
          })}
          <WorkExperienceForm
            companyArr={this.state.companyArr}
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

export default WorkExperience;
