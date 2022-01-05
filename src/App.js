import React, {Component} from 'react';
import EditPage from './components/EditPage';

class App extends Component {
  constructor() {
    super();
    this.state = {
      pageStatus: 'edit',
      sectionStatus: {
        PersonalInfo: 'edit',
        Education: 'edit',
        WorkExperience: 'edit',
      },
    };
    this.handlePageStatus.bind(this);
    this.handleSectionStatus.bind(this);
  }

  handlePageStatus = () => {
    if (this.state.pageStatus === 'preview') {
      this.setState({pageStatus: 'edit'});
    } else {
      this.setState({pageStatus: 'preview'});
    }
  };

  handleSectionStatus = (section, newStatus) => {
    this.setState({
      sectionStatus: {...this.state.sectionStatus, [section]: newStatus},
    });
  };

  render() {
    if (this.state.pageStatus === 'preview') {
      return <div></div>;
    }
    // Edit Mode
    return (
      <div>
        <EditPage
          sectionStatus={this.state.sectionStatus}
          onPageStatusChange={this.handlePageStatus}
          onSectionStatusChange={this.handleSectionStatus}
        />
      </div>
    );
  }
}

export default App;
