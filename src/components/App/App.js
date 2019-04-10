import React from 'react';
import { translate } from 'react-i18next';
import s from './App.scss';
import Calendar  from 'react-calendar';
import Tabs from 'wix-style-react/Tabs';
import Heading from 'wix-style-react/Heading';
import {Container, Row, Col} from 'wix-style-react/Grid';
import PropTypes from 'prop-types';
import {BarChart, Bar,  XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

const sampleData = [
  {name: '10-11', max: 4000, min: 2400, mid: 2400},
  {name: '11-12', max: 3000, min: 1398, mid: 2210},
  {name: '12-13', max: 2000, min: 9800, mid: 2290},
  {name: '14-15', max: 2780, min: 3908, mid: 2000},
  {name: '15-16', max: 1890, min: 4800, mid: 2181},
  {name: '16-17', max: 2390, min: 3800, mid: 2500},
  {name: '17-18', max: 3490, min: 4300, mid: 2100},
];

class App extends React.Component {
  static propTypes = {
    t: PropTypes.func,
  };

  state = {
    date: new Date(),
  };

  onCalendarChange = date => this.setState({ date });

  render() {
    const { t } = this.props;
    const { date } = this.state;
    const maxDate = new Date(new Date().setDate(new Date().getDate() + 3));
    const minDate = new Date(new Date().setDate(new Date().getDate() - 1));
    return (
      <div className={s.root}>
        <div className={s.header}>
          <Heading appearance="H1">
            {t('app.title')}
          </Heading>
          <Tabs
            activeId={1}
            dataHook="story-tabs"
            items={[{id: 1, title: t('app.tickets')}, {id: 2, title: t('app.calls')}]}
            sideContent={undefined}
          />
        </div>
        <Container>
          <Row>
            <Col span={4}>
              <Calendar
                onChange={this.onCalendarChange}
                value={date}
                selectRange={false}
                minDate={minDate}
                maxDate={maxDate}
                minDetail='month'
              />
            </Col>
            <Col span={8}>
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
                <Bar dataKey="min" stackId="a" fill="#e25d47" />
                <Bar dataKey="max" stackId="a" fill="#eb8404" />
                <Bar dataKey="mid" stackId="a" fill="#199384" />
              </BarChart>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default translate()(App);
