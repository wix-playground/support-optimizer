import React from 'react';
import { translate } from 'react-i18next';
import s from './App.scss';
import c from '../Calendar/Calendar.scss';
import Calendar from 'react-calendar';
import {Switch, Route} from 'react-router-dom';
import Page from 'wix-style-react/Page';
import {Container, Row, Col} from 'wix-style-react/Grid';
import Nav from '../Nav';
import Loader from 'wix-style-react/Loader';
import Fetcher from '../../api/fetcher';

import CallsChart from '../CallsChart';
import TicketsChart from '../TicketsChart';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      fetcher: new Fetcher(),
      maxDate: new Date(),
      minDate: new Date(),
      selectedDate: null,
    };
  }

  onCalendarChange = selectedDate => {

    console.log(selectedDate, 'selectedDate');
    console.log(new Date(selectedDate).toISOString(), 'formated');
    this.setState({ selectedDate: selectedDate.toISOString().split('T')[0] })
  };
  setMaxDate = dayCount => {
    this.setState({
      maxDate: new Date(new Date().setDate(new Date().getDate() + dayCount)),
    });
  };
  setIsLoading = isLoading =>
    this.setState({isLoading});

  async componentDidMount() {
    this.setIsLoading(true);

    const {data: {max_predict_days} } = await this.state.fetcher.getDateRange();

    this.setMaxDate(max_predict_days);
    this.setIsLoading(false);
  }

  render() {
    if (this.state.isLoading) {
      return <div className={s.loaderWrapper}><Loader/></div>;
    }
    const { t } = this.props;
    const { date, fetcher } = this.state;

    return (
      <Page upgrade>
        <Page.Header
          title={t('app.title')}
          actionsBar={() => <div key="logo" className={s.logo}></div>}
        />
        <Page.Content key="content">
          <Container>
            <Row>
              <Nav/>
            </Row>
            <Row>
              <Col span={4}>
                <Calendar
                  className={c.reactCalendar}
                  onChange={this.onCalendarChange}
                  value={date}
                  selectRange={false}
                  minDate={this.state.minDate}
                  maxDate={this.state.maxDate}
                  minDetail={'month'}
                />
              </Col>
              <Col span={1} />
              <Switch>
                <Route
                  exact
                  path="/tickets"
                  component={() =>
                    <TicketsChart
                      selectedDate={this.state.selectedDate}
                      fetcher={fetcher}
                      title={'Tickets'}
                    />
                  }
                />
                <Route
                  path="/calls"
                  component={() =>
                    <CallsChart
                      selectedDate={this.state.selectedDate}
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
    );
  }
}

export default translate()(App);
