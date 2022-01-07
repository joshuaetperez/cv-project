import React, {Component} from 'react';
import '../styles/style.css';

class WorkExperienceForm extends Component {
  render() {
    const inputs = this.props.editState;
    return (
      <form onSubmit={this.props.onFormSubmit}>
        <div className="input-container">
          <label htmlFor="work-experience-company">Company: </label>
          <input
            type="text"
            id="work-experience-company"
            name="company"
            value={inputs.company}
            onChange={this.props.onInputChange}
          ></input>
        </div>
        <div className="input-container">
          <label htmlFor="work-experience-city">City: </label>
          <input
            type="text"
            id="work-experience-city"
            name="city"
            value={inputs.city}
            onChange={this.props.onInputChange}
          ></input>
        </div>
        <div className="input-container">
          <label htmlFor="work-experience-position">Position: </label>
          <input
            type="text"
            id="work-experience-position"
            name="position"
            value={inputs.position}
            onChange={this.props.onInputChange}
          ></input>
        </div>
        <div className="from-to-container">
          <div>
            <label htmlFor="work-experience-from">From - </label>
            <label htmlFor="work-experience-to">To: </label>
          </div>
          <div>
            <input
              type="text"
              id="work-experience-from"
              name="from"
              value={inputs.from}
              onChange={this.props.onInputChange}
            ></input>
            <span> - </span>
            <input
              type="text"
              id="work-experience-to"
              name="to"
              value={inputs.to}
              onChange={this.props.onInputChange}
            ></input>
          </div>
        </div>
        <div className="details-container">
          <label htmlFor="work-experience-details">Details: </label>
          <textarea
            id="work-experience-details"
            name="details"
            value={inputs.details}
            onChange={this.props.onInputChange}
            rows="4"
            cols="50"
          ></textarea>
        </div>
        <div className="button-container">
          <input type="submit" value="Submit"></input>
          <button type="button" onClick={this.props.onEditStateReset}>
            Cancel
          </button>
        </div>
        <div id="work-experience-field-empty-error"></div>
      </form>
    );
  }
}

export default WorkExperienceForm;
