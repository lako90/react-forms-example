import React, { Component } from 'react';
import {
  ListGroupItem,
  ListGroup,
  ButtonGroup,
  Button,
  Grid,
  Row,
  Col,
} from 'react-bootstrap';

import CreateApplicationForm from '../CreateApplicationForm';
import CreateConfigurationForm from '../CreateConfigurationForm';

import logo from '../../logo.svg';
import './style.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      scene: 'application',
      applications: [],
      configurations: [],
      alerts: {
        applicationForm: false,
        configurationForm: false,
      },
    };
  }

  insertApplication = (application) => {
    const { applications } = this.state;

    if (application) {
      applications.push(application);
  
      this.setState({
        applications,
        alerts: { applicationForm: false },
      }, () => { console.log('applications', this.state.applications) });
    } else {
      this.setState({ alerts: { applicationForm: "All fields required!!" } });
    }
  }

  insertConfiguration = (configuration) => {
    const { configurations } = this.state;

    if (configuration) {
      configurations.push(configuration);
  
      this.setState({
        configurations,
        alerts: { configurationForm: false },
      }, () => { console.log('configurations', this.state.configurations) });
    } else {
      this.setState({ alerts: { configurationForm: "All fields required!!" } });
    }
  }

  handleChangeScene = scene => () => {
    this.setState({ scene });
  }

  renderListItem = ({ name }) => <ListGroupItem key={name}>{name}</ListGroupItem>

  render() {
    const {
      scene,
      applications,
      configurations,
      alerts: {
        applicationForm,
        configurationForm,
      },
    } = this.state;

    return (
      <div className={'App'}>
        <header className={'App-header'}>
          <img src={logo} className={'App-logo'} alt={'logo'} />
          <h1 className={'App-title'}>{'Welcome to React'}</h1>
        </header>

        <div className={'container'}>
          <ButtonGroup>
            <Button
              className={scene === 'application' && 'active'}
              onClick={this.handleChangeScene('application')}
            >
              {'Create application'}
            </Button>
            <Button
              className={scene === 'configuration' && 'active'}
              onClick={this.handleChangeScene('configuration')}
            >
              {'Create configuration'}
            </Button>
          </ButtonGroup>

          <div className={'form-container'}>
            <Grid>
              <Row>
                <Col xs={8}>
                  {
                    scene === 'application'
                      ? (
                        <CreateApplicationForm
                          createApplication={this.insertApplication}
                          alert={applicationForm}
                        />
                      )
                      : (
                        <CreateConfigurationForm
                          createConfiguration={this.insertConfiguration}
                          applications={applications}
                          alert={configurationForm}
                        />
                      )
                  }
                </Col>

                <Col xs={4}>
                  <h4>{'Applications'}</h4>
                  <ListGroup>
                    {applications.map(this.renderListItem)}
                  </ListGroup>
                  
                  <hr />
                  <h4>{'Configuration'}</h4>
                  <ListGroup>
                    {configurations.map(this.renderListItem)}
                  </ListGroup>
                </Col>
              </Row>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
