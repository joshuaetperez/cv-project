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
        Education: 'add',
        WorkExperience: 'add',
      },
    };
    this.handleSectionStatus.bind(this);
  }

  handleSectionStatus = (section, newStatus) => {
    this.setState({
      sectionStatus: {...this.state.sectionStatus, [section]: newStatus},
    });
  };

  togglePreviewMode = () => {
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
      <div className="page-container">
        <div className="info-container">
          <PersonalInfo
            sectionStatus={this.state.sectionStatus.PersonalInfo}
            onSectionStatusChange={this.handleSectionStatus}
          />
          <Education
            sectionStatus={this.state.sectionStatus.Education}
            onSectionStatusChange={this.handleSectionStatus}
          />
          <WorkExperience
            sectionStatus={this.state.sectionStatus.WorkExperience}
            onSectionStatusChange={this.handleSectionStatus}
          />
          {!this.checkIfInPreviewMode() && (
            <div className="button-container">
              <button onClick={this.togglePreviewMode}>Preview</button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
