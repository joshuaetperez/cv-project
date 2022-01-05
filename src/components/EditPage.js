import React, {Component} from 'react';
import Education from './Education';
import PersonalInfo from './PersonalInfo';

class EditPage extends Component {
  render() {
    return (
      <div>
        <PersonalInfo
          sectionStatus={this.props.sectionStatus.PersonalInfo}
          onPageStatusChange={this.onPageStatusChange}
          onSectionStatusChange={this.props.onSectionStatusChange}
        />
        <Education
          sectionStatus={this.props.sectionStatus.Education}
          onPageStatusChange={this.onPageStatusChange}
          onSectionStatusChange={this.props.onSectionStatusChange}
        />
      </div>
    );
  }
}

export default EditPage;
