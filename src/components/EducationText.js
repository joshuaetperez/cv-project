import React, {Component} from 'react';
import '../styles/style.css';

class EducationText extends Component {
  render() {
    const schoolObj = this.props.schoolObj;
    return (
      <div className="info-container">
        <div className="text-container">
          <div className="text-field-container">School: </div>
          <div className="text-div">{schoolObj.school}</div>
        </div>
        <div className="text-container">
          <div className="text-field-container">City: </div>
          <div className="text-div">{schoolObj.city}</div>
        </div>
        <div className="text-container">
          <div className="text-field-container">Degree: </div>
          <div className="text-div">{schoolObj.degree}</div>
        </div>
        <div className="text-container">
          <div className="text-field-container">From: </div>
          <div className="text-div">
            {schoolObj.from} - {schoolObj.to}
          </div>
        </div>
      </div>
    );
  }
}

export default EducationText;
