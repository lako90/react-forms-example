import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  ListGroupItem,
  ListGroup,
  Glyphicon,
} from 'react-bootstrap';

/**
 * Mock data
 */
const users = [
  { name: 'userOne', value: 1 },
  { name: 'userTwo', value: 2 },
  { name: 'userThree', value: 3 },
];

class CreateConfigurationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      environmentFields: [],
      portFields: [],
    };

    this.formValues = {
      name: createRef(),
      reference: createRef(),
      user: createRef(),
    };
  }

  static propTypes = {
    createConfiguration: PropTypes.func.isRequired,
    applications: PropTypes.array,
    alert: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
  }

  validateForm = () => {
    const {
      name: { current: { value: name } },
      reference: { current: { value: reference } },
      user: { current: { value: user } },
    } = this.formValues;
    const { environmentFields, portFields } = this.state;

    return (
      (
        name
        && reference !== '-1'
        && user !== '-1'
      )
        ? {
          name,
          reference,
          user,
          env: environmentFields,
          ports: portFields,
        }
        : false
    );
  }

  handleFormSubmit = () => {
    const validatedForm = this.validateForm();

    if (validatedForm) {
      this.formValues.name.current.value = '';
      this.formValues.reference.current.value = '-1';
      this.formValues.user.current.value = '-1';
    }

    this.props.createConfiguration(validatedForm);
  }

  addEnvironment = () => {
    const { environmentFields } = this.state;

    environmentFields.push({
      name: '',
      value:'',
    });

    this.setState(environmentFields);
  }

  addPort = () => {
    const { portFields } = this.state;

    portFields.push({
      name: '',
      protocol: '',
      port: 0,
    });

    this.setState(portFields);
  }

  handleEnvironmentFields = (field, index) => ({ target: { value } }) => {
    const { environmentFields } = this.state;

    environmentFields[index][field] = value;

    this.setState({ environmentFields });
  }

  handlePortFields = (field, index) => ({ target: { value } }) => {
    const { portFields } = this.state;

    portFields[index][field] = value;

    this.setState({ portFields });
  }

  renderEnvironmentList = ({ name, value }, index) => (
    <ListGroupItem key={index}>
      <FormGroup bsSize={'small'}>
        <FormControl
          type={'text'}
          placeholder={'Name'}
          value={name}
          onChange={this.handleEnvironmentFields('name', index)}
        />
      </FormGroup>
      <FormGroup bsSize={'small'} style={{ marginBottom: 0 }}>
        <FormControl
          type={'text'}
          placeholder={'Value'}
          value={value}
          onChange={this.handleEnvironmentFields('value', index)}
        />
      </FormGroup>
    </ListGroupItem>
  )

  renderPortList = ({ name, protocol, port }, index) => (
    <ListGroupItem key={index}>
      <FormGroup bsSize={'small'}>
        <FormControl
          type={'text'}
          placeholder={'Name'}
          value={name}
          onChange={this.handlePortFields('name', index)}
        />
      </FormGroup>
      <FormGroup bsSize={'small'}>
        <FormControl
          type={'text'}
          placeholder={'Protocol'}
          value={protocol}
          onChange={this.handlePortFields('protocol', index)}
        />
      </FormGroup>
      <FormGroup bsSize={'small'} bsClass={'mb0'}>
        <FormControl
          type={'text'}
          placeholder={'Port'}
          value={port}
          onChange={this.handlePortFields('port', index)}
        />
      </FormGroup>
    </ListGroupItem>
  )

  render() {
    const { applications, alert } = this.props;
    const { environmentFields, portFields } = this.state;
    const { name, reference, user } = this.formValues;

    return (
      <form>
        <FormGroup>
          <ControlLabel>{'Name'}</ControlLabel>
          <FormControl
            type={'text'}
            placeholder={'Configuration name'}
            inputRef={name}
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel>{'Application reference'}</ControlLabel>
          <FormControl
            componentClass={'select'}
            inputRef={reference}
            defaultValue={-1}
          >
            <option disabled value={-1} key={-1} />
            {applications.map(({ name }) => (
              <option
                key={name}
                value={name}
              >
                {name}
              </option>
            ))}
          </FormControl>
        </FormGroup>

        <FormGroup>
          <ControlLabel>{'User'}</ControlLabel>
          <FormControl
            componentClass={'select'}
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

        <FormGroup>
          <ControlLabel>
            {'Environments'}
            <Glyphicon
              glyph={'plus'}
              style={{ marginLeft: 15, cursor: 'pointer' }}
              onClick={this.addEnvironment}
            />
          </ControlLabel>
          <ListGroup>
            {environmentFields.map(this.renderEnvironmentList)}
          </ListGroup>
        </FormGroup>

        <FormGroup>
          <ControlLabel>
            {'Ports'}
            <Glyphicon
              glyph={'plus'}
              style={{ marginLeft: 15, cursor: 'pointer' }}
              onClick={this.addPort}
            />
          </ControlLabel>
          <ListGroup>
            {portFields.map(this.renderPortList)}
          </ListGroup>
        </FormGroup>

        {alert && <Alert bsStyle={'danger'}>{alert}</Alert>}

        <Button onClick={this.handleFormSubmit}>{'Submit'}</Button>
      </form>
    );
  }
}

export default CreateConfigurationForm;