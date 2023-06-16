// Write your JS code here
import {Component} from 'react'
import './index.css'

class RegistrationForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    isFormSubmitted: false,
    showFirstNameError: false,
    showLastNameError: false,
  }

  onBlurLastName = () => {
    const isValidLastName = this.validLastName()
    this.setState({showLastNameError: !isValidLastName})
  }

  changeLastName = event => {
    const {target} = event
    const {value} = target

    this.setState({lastName: value})
  }

  onBlurFirstName = () => {
    const isValidFirstName = this.validFirstName()
    this.setState({showFirstNameError: !isValidFirstName})
  }

  changeFirstName = event => {
    const {target} = event
    const {value} = target

    this.setState({firstName: value})
  }

  validFirstName = () => {
    const {firstName} = this.state
    return firstName !== ''
  }

  validLastName = () => {
    const {lastName} = this.state
    return lastName !== ''
  }

  onSubmitForm = event => {
    event.preventDefault()

    const isValidFirstName = this.validFirstName()
    const isValidLastName = this.validLastName()

    if (isValidFirstName && isValidLastName) {
      this.setState({isFormSubmitted: true})
    } else {
      this.setState({
        showFirstNameError: !isValidFirstName,
        showLastNameError: !isValidLastName,
        isFormSubmitted: false,
      })
    }
  }

  renderSubmitRegistrationForm = () => {
    const {
      showFirstNameError,
      showLastNameError,
      firstName,
      lastName,
    } = this.state
    return (
      <form className="form-container" onSubmit={this.onSubmitForm}>
        <div className="input-container">
          <label className="label" htmlFor="firstName">
            FIRST NAME
          </label>
          <input
            type="text"
            className="input"
            value={firstName}
            placeholder="First name"
            onChange={this.changeFirstName}
            onBlur={this.onBlurFirstName}
          />
        </div>
        {showFirstNameError && <p className="error-msg">Required</p>}
        <div className="input-container">
          <label className="label" htmlFor="secondName">
            LAST NAME
          </label>
          <input
            type="text"
            className="input"
            value={lastName}
            placeholder="Last name"
            onChange={this.changeLastName}
            onBlur={this.onBlurLastName}
          />
        </div>
        {showLastNameError && <p className="error-msg">Required</p>}
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    )
  }

  onSubmissionAnotherResponse = () => {
    this.setState(prevState => ({
      isFormSubmitted: !prevState.isFormSubmitted,
      firstName: '',
      lastName: '',
    }))
  }

  renderSubmissionForm = () => (
    <div className="success-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
        alt=" success"
      />
      <p className="success-text">Submitted Successfully</p>
      <button
        type="submit"
        className="submit-another-response-button"
        onClick={this.onSubmissionAnotherResponse}
      >
        Submit Another Response
      </button>
    </div>
  )

  render() {
    const {isFormSubmitted} = this.state
    return (
      <div className="registration-container">
        <h1 className="main-heading">Registration</h1>
        {isFormSubmitted
          ? this.renderSubmissionForm()
          : this.renderSubmitRegistrationForm()}
      </div>
    )
  }
}
export default RegistrationForm
