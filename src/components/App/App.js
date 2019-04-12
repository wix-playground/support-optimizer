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

const defaultCosts = {
  quota: 10,
  support: 20,
  customer: 30,
};

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
      ...defaultCosts
    };
  }

  onCalendarChange = selectedDate => this.setState({ selectedDate });
  setMaxDate = dayCount => {
    this.setState({
      maxDate: new Date(new Date().setDate(new Date().getDate() + dayCount)),
    });
  };

  onDropdownSelect = option => {
    console.log('onDropdownSelect', option.value);
    this.setState({ timezone: option.value });
  }

  onCostsInputChange = el => {
    const obj = {};
    const val = el.value !== '' ? parseInt(el.value) : defaultCosts[el.name];
    obj[el.name] = val;
    this.setState({ ...obj });
  }

  setIsLoading = isLoading =>
    this.setState({isLoading});

  async componentDidMount() {
    this.setIsLoading(true);

    const {data: {max_predict_days} } = await this.state.fetcher.getDateRange();

    this.setMaxDate(max_predict_days);
    this.setIsLoading(false);
  }

  render() {
    if (this.state.isLoading || this.state.maxDate === null) {
      return <div className={s.loaderWrapper}><Loader/></div>;
    }
    const { t } = this.props;
    const { fetcher, selectedDate, minDate, maxDate, timezone } = this.state;
    return (
      <>
        <FullScreenModal t={t} onSelect={this.onDropdownSelect} selected={timezone}/>
      <Page upgrade>
        <Page.Header
          title={t('app.title')}
          actionsBar={() => <div key="logo" className={s.logo} />}
        />
        <Page.Content key="content">
          <Container>
            <Row>
              <Nav />
            </Row>
            <Row>
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
                <Costs onChange={this.onCostsInputChange}/>
              </Col>
              <Col span={1} />
              <Switch>
                <Route
                  path="/tickets"
                  component={() =>
                    <TicketsChart
                      selectedDate={selectedDate}
                      fetcher={fetcher}
                      title={'Tickets'}
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
