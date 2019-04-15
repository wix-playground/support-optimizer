import axios from 'axios';

const apiConfig = {
  baseURL: `https://35.244.207.35:8080/`,
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
    return this.api.get(apiConfig.dateRange);
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
