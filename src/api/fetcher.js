import axios from 'axios';

const apiConfig = {
  baseURL: `https://bo.wix.com/support-optimizer-backend`,
  dateRange: '/date_range',
  tickets: '/tickets',
  calls: '/calls',
};

export default class Fetcher {
  constructor() {
    this.api = axios.create({
      baseURL: apiConfig.baseURL,
      responseType: 'json',
    });
  }

  async getDateRange() {
    return this.api.get(apiConfig.baseURL + apiConfig.dateRange);
  }

  getTickets = async ({date = '2019-04-10', ...costs}) =>
    this.api.get(apiConfig.tickets, {
      params: {
        day: date, ...costs
      },
    });


  getCalls = async ({date = '2019-04-10', ...costs}) =>
    this.api.get(apiConfig.calls, {
      params: {
        day: date,
        ...costs
      },
    });
}
