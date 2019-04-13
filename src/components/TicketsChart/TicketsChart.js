import React from 'react';
import { translate } from 'react-i18next';
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts';
import { Col, Row } from 'wix-style-react/dist/src/Grid';
import Loader from 'wix-style-react/Loader';
import { convertDate } from '../../utils';

class CallsChart extends React.Component {
  constructor() {
    super();

    this.state = {
      issues: [],
      support: [],
      isLoading: null,
    };
  }

  setIsLoading = isLoading => this.setState({isLoading});

  async componentDidMount() {
    const { costs, selectedDate } = this.props;
    this.setIsLoading(true);
    const convertedDateToRightFormat = convertDate(selectedDate);

    const { data: { issues, support} } =
      await this.props.fetcher.getTickets({
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
          <Row>Tickets</Row>
          <LineChart
            width={500}
            height={300}
            data={issues}
            margin={{
              top: 5, right: 30, left: 20, bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 6 }} />
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
            <Bar dataKey="count" stackId="count" fill="#e25d47" />
          </BarChart>
        </Col>
      </Row>
    );
  }
};


export default translate()(CallsChart);
