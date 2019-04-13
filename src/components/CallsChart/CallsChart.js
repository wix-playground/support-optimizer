import React from 'react';
import { translate } from 'react-i18next';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  Line,
  LineChart,
} from 'recharts';
import { Col, Row } from 'wix-style-react/dist/src/Grid';
import Loader from 'wix-style-react/Loader';
import { convertDate } from '../../utils';

class CallsChart extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      issues: [],
      support: [],
      isLoading: null,
    };
  }

  setIsLoading = isLoading => this.setState({ isLoading });

  async componentDidMount() {
    this.setIsLoading(true);

    const { costs, selectedDate } = this.props;

    const convertedDateToRightFormat = convertDate(selectedDate);

    const { data: { issues, support} } =
      await this.props.fetcher.getCalls({
        date: convertedDateToRightFormat,
        ...costs,
      });

    this.setState({
      issues,
      support,
    });
    this.setIsLoading(false);
  }

  render() {
    if (this.state.isLoading) {
        return <div style={{ display: 'flex', justifyContent: 'center'}}><Loader /></div>;
    }

    const { issues, support } = this.state;
    return (
      <Row>
        <Col span={5}>
          <Row>Calls</Row>
          <LineChart
            width={500}
            height={300}
            data={issues}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 6  }} />
            <Line type="monotone" dataKey="max_count" stroke="#f22b46" activeDot={{ r: 5 }} />
            <Line type="monotone" dataKey="min_count" stroke="#f29f2b" activeDot={{ r: 5 }} />
          </LineChart>
        </Col>
        <Col span={2} />
        <Col span={5}>
          <Row>Support</Row>
          <BarChart
            width={500}
            height={300}
            data={support}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" stackId="count" fill="#8884d8" />
            <Bar dataKey="max_count" stackId="count" fill="#f22b46" />
            <Bar dataKey="min_count" stackId="count" fill="#f29f2b" />
          </BarChart>
        </Col>

      </Row>
    );
  }
};


export default translate()(CallsChart);
