import { Angular2ShopPage } from './app.po';

describe('angular2-shop App', function() {
  let page: Angular2ShopPage;

  beforeEach(() => {
    page = new Angular2ShopPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
