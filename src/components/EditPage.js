import React, {Component} from 'react';
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
      </div>
    );
  }
}

export default EditPage;
