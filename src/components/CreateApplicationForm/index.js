import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
} from 'react-bootstrap';

/**
 * Mock data
 */
const kinds = [
  { name: 'kindOne', value: 1 },
  { name: 'kindTwo', value: 2 },
  { name: 'kindThree', value: 3 },
];

const users = [
  { name: 'userOne', value: 1 },
  { name: 'userTwo', value: 2 },
  { name: 'userThree', value: 3 },
];

class CreateApplicationForm extends Component {
  constructor(props) {
    super(props);

    this.formValues = {
      kind: createRef(),
      name: createRef(),
      repository: createRef(),
      user: createRef(),
    };
  }

  static propTypes = {
    createApplication: PropTypes.func.isRequired,
    alert: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
  }

  validateForm = () => {
    const {
      kind: { current: { value: kind } },
      name: { current: { value: name } },
      repository: { current: { value: repository } },
      user: { current: { value: user } },
    } = this.formValues;

    return (
      (
        kind !== '-1'
        && name
        && repository
        && user !== '-1'
      )
        ? { kind, name, repository, user }
        : false
    );
  }

  handleFormSubmit = () => {
    const validatedForm = this.validateForm();

    if (validatedForm) {
      this.formValues.kind.current.value = '-1';
      this.formValues.name.current.value = '';
      this.formValues.repository.current.value = '';
      this.formValues.user.current.value = '-1';
    }

    this.props.createApplication(validatedForm);
  }

  render() {
    const { alert } = this.props;
    const { kind, name, repository, user } = this.formValues;

    return (
      <form>
        <FormGroup>
          <ControlLabel>{'Kind'}</ControlLabel>
          <FormControl
            componentClass="select"
            inputRef={kind}
            defaultValue={-1}
          > 
            <option disabled value={-1} key={-1} />
            {kinds.map(({ name, value }) => (
              <option
                key={value}
                value={value}
              >
                {name}
              </option>
            ))}
          </FormControl>
        </FormGroup>

        <FormGroup>
          <ControlLabel>{'Name'}</ControlLabel>
          <FormControl
            type="text"
            placeholder={'Application name'}
            inputRef={name}
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel>{'Repository'}</ControlLabel>
          <FormControl
            type="text"
            placeholder={'Application repository'}
            inputRef={repository}
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel>{'User'}</ControlLabel>
          <FormControl
            componentClass="select"
            inputRef={user}
            defaultValue={-1}
          > 
            <option disabled value={-1} key={-1} />
            {users.map(({ name, value }) => (
              <option
                key={value}
                value={value}
              >
                {name}
              </option>
            ))}
          </FormControl>
        </FormGroup>

        {alert && <Alert bsStyle={'danger'}>{alert}</Alert>}

        <Button onClick={this.handleFormSubmit}>{'Submit'}</Button>
      </form>
    );
  }
}

export default CreateApplicationForm;