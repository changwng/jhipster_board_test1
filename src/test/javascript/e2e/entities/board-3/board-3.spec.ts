// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Board3ComponentsPage, Board3DeleteDialog, Board3UpdatePage } from './board-3.page-object';

const expect = chai.expect;

describe('Board3 e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let board3ComponentsPage: Board3ComponentsPage;
  let board3UpdatePage: Board3UpdatePage;
  let board3DeleteDialog: Board3DeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Board3S', async () => {
    await navBarPage.goToEntity('board-3');
    board3ComponentsPage = new Board3ComponentsPage();
    await browser.wait(ec.visibilityOf(board3ComponentsPage.title), 5000);
    expect(await board3ComponentsPage.getTitle()).to.eq('Board 3 S');
  });

  it('should load create Board3 page', async () => {
    await board3ComponentsPage.clickOnCreateButton();
    board3UpdatePage = new Board3UpdatePage();
    expect(await board3UpdatePage.getPageTitle()).to.eq('Create or edit a Board 3');
    await board3UpdatePage.cancel();
  });

  it('should create and save Board3S', async () => {
    const nbButtonsBeforeCreate = await board3ComponentsPage.countDeleteButtons();

    await board3ComponentsPage.clickOnCreateButton();
    await promise.all([
      board3UpdatePage.setTitleInput('title'),
      board3UpdatePage.setContentsInput('contents'),
      board3UpdatePage.setCreatedDateInput('2000-12-31')
    ]);
    expect(await board3UpdatePage.getTitleInput()).to.eq('title', 'Expected Title value to be equals to title');
    expect(await board3UpdatePage.getContentsInput()).to.eq('contents', 'Expected Contents value to be equals to contents');
    expect(await board3UpdatePage.getCreatedDateInput()).to.eq('2000-12-31', 'Expected createdDate value to be equals to 2000-12-31');
    await board3UpdatePage.save();
    expect(await board3UpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await board3ComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Board3', async () => {
    const nbButtonsBeforeDelete = await board3ComponentsPage.countDeleteButtons();
    await board3ComponentsPage.clickOnLastDeleteButton();

    board3DeleteDialog = new Board3DeleteDialog();
    expect(await board3DeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Board 3?');
    await board3DeleteDialog.clickOnConfirmButton();

    expect(await board3ComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
