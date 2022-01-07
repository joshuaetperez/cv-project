import React, {Component} from 'react';
import '../styles/style.css';

class EducationForm extends Component {
  render() {
    const inputs = this.props.editState;
    return (
      <form onSubmit={this.props.onFormSubmit}>
        <div className="input-container">
          <label htmlFor="education-school">School: </label>
          <input
            type="text"
            id="education-school"
            name="school"
            value={inputs.school}
            onChange={this.props.onInputChange}
          ></input>
        </div>
        <div className="input-container">
          <label htmlFor="education-city">City: </label>
          <input
            type="text"
            id="education-city"
            name="city"
            value={inputs.city}
            onChange={this.props.onInputChange}
          ></input>
        </div>
        <div className="input-container">
          <label htmlFor="education-degree">Degree: </label>
          <input
            type="text"
            id="education-degree"
            name="degree"
            value={inputs.degree}
            onChange={this.props.onInputChange}
          ></input>
        </div>
        <div className="from-to-container">
          <div>
            <label htmlFor="education-from">From - </label>
            <label htmlFor="education-to">To: </label>
          </div>
          <div>
            <input
              type="text"
              id="education-from"
              name="from"
              value={inputs.from}
              onChange={this.props.onInputChange}
            ></input>
            <span> - </span>
            <input
              type="text"
              id="education-to"
              name="to"
              value={inputs.to}
              onChange={this.props.onInputChange}
            ></input>
          </div>
        </div>
        <div className="button-container">
          <input type="submit" value="Submit"></input>
          <button type="button" onClick={this.props.onEditStateReset}>
            Cancel
          </button>
        </div>
        <div id="education-field-empty-error"></div>
      </form>
    );
  }
}

export default EducationForm;
