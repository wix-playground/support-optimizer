import React from 'react';
import { translate } from 'react-i18next';
import s from './App.scss';
import c from '../Calendar/Calendar.scss';
import Calendar from 'react-calendar';
import {Switch, Route} from 'react-router-dom';
import Page from 'wix-style-react/Page';
import {Container, Row, Col} from 'wix-style-react/Grid';
import Nav from '../Nav';
import Loader from "wix-style-react/Loader";
import {BarChart, Bar,  XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import Fetcher from '../../api/fetcher';


const sampleData = [
  {name: '10-11', max: 4000, min: 1400, mid: 2400},
  {name: '11-12', max: 3000, min: 1398, mid: 2210},
  {name: '12-13', max: 2400, min: 1800, mid: 2290},
  {name: '14-15', max: 2780, min: 1908, mid: 2000},
  {name: '15-16', max: 2000, min: 1600, mid: 2181},
  {name: '16-17', max: 2390, min: 1800, mid: 2500},
  {name: '17-18', max: 3490, min: 1300, mid: 2100},
];

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      fetcher: new Fetcher(),
      maxDate: new Date(),
      minDate: new Date(),
      ticketsData: {},
      callsData: {},
    };
  }

  onCalendarChange = date => this.setState({ date });
  setMaxDate = dayCount => {
    this.setState({
      maxDate: new Date(new Date().setDate(new Date().getDate() + dayCount)),
    });
  };

  async componentDidMount() {
    this.setIsLoading(true);
    try {
      const { data: {max_predict_days} } = await this.state.fetcher.getDateRange();
      const { data: ticketsData } = await this.state.fetcher.getTickets();
      const { data: callsData } = await this.state.fetcher.getCalls();

      this.setMaxDate({
        ticketsData,
        callsData,
      });
      this.setMaxDate(max_predict_days);
      this.setIsLoading(false);
    }
    catch (e) {
      console.log('Error in didMount', e);
      this.setIsLoading(false);
    }
  }

  setIsLoading = isLoading =>
    this.setState({isLoading});

  render() {
    if (this.state.isLoading) {
      return <div className={s.loaderWrapper}><Loader/></div>;
    }

    const { t } = this.props;
    const { date } = this.state;

    return (
      <Page upgrade>
        <Page.Header key="header" title={t('app.title')}/>
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
                  minDetail='month'
                />
              </Col>
              <Col span={1}/>
              <Col span={7}>
                <Switch>
                  <Route exact path="/tickets" component={() => 'tickets'} />
                  <Route path="/calls" component={() => 'calls'} />
                </Switch>

                <BarChart
                  width={500}
                  height={300}
                  data={sampleData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5}}
                >
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="min" stackId="a" fill="#C70039" />
                  <Bar dataKey="max" stackId="a" fill="#DAF7A6" />
                  <Bar dataKey="mid" stackId="a" fill="#FFC300" />
                </BarChart>
              </Col>
            </Row>
          </Container>
        </Page.Content>
      </Page>
    );
  }
}

export default translate()(App);
