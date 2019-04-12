import React from 'react';
import { translate } from 'react-i18next';
import {Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts';
import { Col, Row } from 'wix-style-react/dist/src/Grid';
import Loader from 'wix-style-react/Loader';
import { convertDate } from '../../utils';


class CallsChart extends React.Component {
  constructor() {
    super();

    this.state = {
      ticketsData: {},
      isLoading: null,
    };
  }

  setIsLoading = isLoading => this.setState({isLoading});

  async componentDidMount() {
    this.setIsLoading(true);
    const convertedDateToRightFormat = convertDate(this.props.selectedDate);

    const { data: ticketsData } =
      await this.props.fetcher.getTickets(convertedDateToRightFormat);

    this.setState({
      ticketsData,
    });
    this.setIsLoading(false);
  }

  render() {
    if (this.state.isLoading) {
      return <Loader />;
    }
    return (
      <Col span={7}>
        <Row>Selected date - {convertDate(this.props.selectedDate)}</Row>
        <Row>

          <LineChart
            width={500}
            height={300}
            data={this.state.ticketsData.tickets}
            margin={{
              top: 5, right: 30, left: 20, bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis label="Hours" dataKey="hour" />
            <YAxis label="Count"/>
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 6 }} />
          </LineChart>
        </Row>

        <Row>
          <BarChart
            width={500}
            height={300}
            data={this.state.ticketsData.support}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" stackId="count" fill="#e25d47" />
          </BarChart>
        </Row>
      </Col>
    );
  }
};


export default translate()(CallsChart);
