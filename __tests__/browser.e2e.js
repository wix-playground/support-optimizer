
describe('React application', () => {
  it('should display title', async () => {
    await page.goto(app.getUrl('/'));
    await page.waitForSelector('body');
  });
});
