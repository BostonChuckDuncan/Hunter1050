import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display prereg Toolbar with link to this page', () => {
    // page.navigateTo();
    browser.get('http://localhost:4200');
    browser.waitForAngular();

//    var hunterLink = (by.link('/splashPage'));
    expect(page.getTitleText()).toEqual('Hunter-SPA app is running!');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
