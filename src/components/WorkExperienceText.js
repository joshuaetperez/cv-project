import React, {Component} from 'react';
import '../styles/style.css';

class WorkExperienceText extends Component {
  render() {
    const companyObj = this.props.companyObj;
    return (
      <div className="info-container">
        <div className="text-container">
          <div className="text-field-container">Company: </div>
          <div className="text-div">{companyObj.company}</div>
        </div>
        <div className="text-container">
          <div className="text-field-container">City: </div>
          <div className="text-div">{companyObj.city}</div>
        </div>
        <div className="text-container">
          <div className="text-field-container">Position: </div>
          <div className="text-div">{companyObj.position}</div>
        </div>
        <div className="text-container">
          <div className="text-field-container">From: </div>
          <div className="text-div">
            {companyObj.from} - {companyObj.to}
          </div>
        </div>
        <div className="text-container">
          <div className="text-field-container">Details: </div>
          <div className="text-div">{companyObj.details}</div>
        </div>
      </div>
    );
  }
}

export default WorkExperienceText;
