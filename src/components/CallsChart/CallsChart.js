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
} from 'recharts';
import { Col } from 'wix-style-react/dist/src/Grid';
import Loader from 'wix-style-react/Loader';
import { convertDate } from '../../utils';

const sampleData = [
  {name: '10-11', max: 4000, min: 2400, mid: 2400},
  {name: '11-12', max: 3000, min: 1398, mid: 2210},
  {name: '12-13', max: 2000, min: 9800, mid: 2290},
  {name: '14-15', max: 2780, min: 3908, mid: 2000},
  {name: '15-16', max: 1890, min: 4800, mid: 2181},
  {name: '16-17', max: 2390, min: 3800, mid: 2500},
  {name: '17-18', max: 3490, min: 4300, mid: 2100},
];

class CallsChart extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      callsData: {},
      isLoading: null,
    };
  }

  setIsLoading = isLoading => this.setState({ isLoading });

  async componentDidMount() {
    this.setIsLoading(true);

    const convertedDateToRightFormat = convertDate(this.props.selectedDate);

    const { data: callsData } =
      await this.props.fetcher.getCalls(convertedDateToRightFormat);

    this.setState({
      callsData,
    });
    this.setIsLoading(false);
  }

  render() {
    if (this.state.isLoading) {
      return <Loader />;
    }
    return (
      <Col span={7}>
        <BarChart
          width={500}
          height={300}
          data={sampleData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="min" stackId="a" fill="#e25d47" />
          <Bar dataKey="max" stackId="a" fill="#eb8404" />
          <Bar dataKey="mid" stackId="a" fill="#199384" />
        </BarChart>
      </Col>
    );
  }
};


export default translate()(CallsChart);
