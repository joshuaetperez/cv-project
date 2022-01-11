import React, {Component} from 'react';
import Education from './components/Education';
import PersonalInfo from './components/PersonalInfo';
import WorkExperience from './components/WorkExperience';

class App extends Component {
  constructor() {
    super();
    this.state = {
      sectionStatus: {
        PersonalInfo: 'edit',
        Education: 'submitted',
        WorkExperience: 'submitted',
      },
    };
    this.handleSectionStatus.bind(this);
    this.editPersonalInfo.bind(this);
    this.changeToEditEntry.bind(this);
    this.changeToEditMode.bind(this);
  }

  handleSectionStatus = (section, newStatus) => {
    this.setState({
      sectionStatus: {...this.state.sectionStatus, [section]: newStatus},
    });
  };

  editPersonalInfo = () => {
    this.setState({
      sectionStatus: {
        PersonalInfo: 'edit',
        Education: 'submitted',
        WorkExperience: 'submitted',
      },
    });
  };

  changeToEditEntry = (section) => {
    this.setState({
      sectionStatus: {
        ...(section === 'PersonalInfo'
          ? {PersonalInfo: 'edit'}
          : {PersonalInfo: 'submitted'}),
        ...(section === 'Education'
          ? {Education: 'edit'}
          : {Education: 'submitted'}),
        ...(section === 'WorkExperience'
          ? {WorkExperience: 'edit'}
          : {WorkExperience: 'submitted'}),
      },
    });
  };

  changeToEditMode = () => {
    this.setState({
      sectionStatus: {
        PersonalInfo: 'submitted',
        Education: 'submitted',
        WorkExperience: 'submitted',
      },
    });
  };

  changeToPreviewMode = () => {
    this.setState({
      sectionStatus: {
        PersonalInfo: 'preview',
        Education: 'preview',
        WorkExperience: 'preview',
      },
    });
  };

  checkIfInPreviewMode = () => {
    const sectionStatus = this.state.sectionStatus;
    for (let status in sectionStatus) {
      if (sectionStatus[status] !== 'preview') {
        return false;
      }
    }
    return true;
  };

  render() {
    return (
      <div className="page">
        <PersonalInfo
          sectionStatus={this.state.sectionStatus.PersonalInfo}
          onSectionStatusChange={this.handleSectionStatus}
          editPersonalInfo={this.editPersonalInfo}
        />
        <Education
          sectionStatus={this.state.sectionStatus.Education}
          onSectionStatusChange={this.handleSectionStatus}
          changeToEditEntry={this.changeToEditEntry}
          changeToEditMode={this.changeToEditMode}
        />
        <WorkExperience
          sectionStatus={this.state.sectionStatus.WorkExperience}
          onSectionStatusChange={this.handleSectionStatus}
          changeToEditEntry={this.changeToEditEntry}
          changeToEditMode={this.changeToEditMode}
        />
        {!this.checkIfInPreviewMode() && (
          <div className="button-container">
            <button
              className="preview-button"
              onClick={this.changeToPreviewMode}
            >
              Preview
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
