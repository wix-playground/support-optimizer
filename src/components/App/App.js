import React from 'react';
import { translate } from 'react-i18next';
import s from './App.scss';
import c from '../Calendar/Calendar.scss';
import Calendar from 'react-calendar';
import { Switch, Route } from 'react-router-dom';
import Page from 'wix-style-react/Page';
import { Container, Row, Col } from 'wix-style-react/Grid';
import Nav from '../Nav';
import Loader from 'wix-style-react/Loader';
import Fetcher from '../../api/fetcher';

import CallsChart from '../CallsChart';
import TicketsChart from '../TicketsChart';
import { getTomorrowDate } from '../../utils';
import Costs from '../Costs';
import FullScreenModal from '../FullScreenModal';


class App extends React.Component {
  constructor() {
    super();

    const tomorrowDate = getTomorrowDate();

    this.state = {
      fetcher: new Fetcher(),
      maxDate: null,
      minDate: tomorrowDate,
      selectedDate: tomorrowDate,
      timezone: null,
      costs: {
        quota: 60,
        supportCost: 1,
        customerWaitingCost: 1,
      },
    };
  }

  onCalendarChange = selectedDate => this.setState({ selectedDate });
  setMaxDate = maxDate => {
    this.setState({
      maxDate: new Date(maxDate),
    });
  };

  onDropdownSelect = ({ value }) => this.setState({ timezone: value });

  onCostsInputChange = e => {
    const updateValue = {};
    updateValue[e.target.name] = e.target.value;
    this.setState({
      costs: {
        ...this.state.costs,
        ...updateValue,
      },
    });
  };

  setIsLoading = isLoading =>
    this.setState({isLoading});

  componentWillMount() {
    this.setIsLoading(true);
  }

  async componentDidMount() {
    const { data: {max_predict_date} } = await this.state.fetcher.getDateRange();

    this.setMaxDate(max_predict_date);
    this.setIsLoading(false);
  }

  render() {
    if (this.state.isLoading) {
      return <div className={s.loaderWrapper}><Loader/></div>;
    }
    const { t } = this.props;
    const {fetcher, selectedDate, minDate, maxDate, timezone, costs  } = this.state;
    return (
      <>
      <FullScreenModal t={t} onSelect={this.onDropdownSelect} selected={timezone}/>
      <Page upgrade>
        <Page.Header
          title={t('app.title')}
          data-testid="app-title"
          actionsBar={() => <div key="logo" className={s.logo} />}
        />
        <Page.Content key="content">
          <Container>
            <Row>
              <Nav />
            </Row>
            <Row>
              <Col span={1} />
              <Col span={4}>
                <Calendar
                  className={c.reactCalendar}
                  onChange={this.onCalendarChange}
                  value={selectedDate}
                  selectRange={false}
                  minDate={minDate}
                  maxDate={maxDate}
                  minDetail={'month'}
                />

              </Col>
              <Col span={2} />
              <Col span={4}>
                <Costs
                  onChange={this.onCostsInputChange}
                  costs={costs}
                />
              </Col>
            </Row>
            <Row>
              <Switch>
                <Route
                  path="/tickets"
                  component={() =>
                    <TicketsChart
                      selectedDate={selectedDate}
                      fetcher={fetcher}
                      title={'Tickets'}
                      costs={costs}
                    />
                  }
                />
                <Route
                  path="/calls"
                  component={() =>
                    <CallsChart
                      selectedDate={selectedDate}
                      fetcher={fetcher}
                      title={'Calls'}
                      costs={costs}
                    />
                  }
                />
              </Switch>
            </Row>
          </Container>
        </Page.Content>
      </Page>
      </>
    );
  }
}

export default translate()(App);
