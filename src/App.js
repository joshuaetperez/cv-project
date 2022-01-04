import React, {Component} from 'react';
import EditPage from './components/EditPage';

class App extends Component {
  constructor() {
    super();
    this.state = {
      pageStatus: {
        PersonalInfo: 'empty',
        Education: 'empty',
        WorkExperience: 'empty',
      },
    };
    // this.handleDelete.bind(this);
  }

  render() {
    return (
      <div>
        <EditPage />
      </div>
    );
  }
}

export default App;
