// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Board2ComponentsPage, Board2DeleteDialog, Board2UpdatePage } from './board-2.page-object';

const expect = chai.expect;

describe('Board2 e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let board2ComponentsPage: Board2ComponentsPage;
  let board2UpdatePage: Board2UpdatePage;
  let board2DeleteDialog: Board2DeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Board2S', async () => {
    await navBarPage.goToEntity('board-2');
    board2ComponentsPage = new Board2ComponentsPage();
    await browser.wait(ec.visibilityOf(board2ComponentsPage.title), 5000);
    expect(await board2ComponentsPage.getTitle()).to.eq('Board 2 S');
  });

  it('should load create Board2 page', async () => {
    await board2ComponentsPage.clickOnCreateButton();
    board2UpdatePage = new Board2UpdatePage();
    expect(await board2UpdatePage.getPageTitle()).to.eq('Create or edit a Board 2');
    await board2UpdatePage.cancel();
  });

  it('should create and save Board2S', async () => {
    const nbButtonsBeforeCreate = await board2ComponentsPage.countDeleteButtons();

    await board2ComponentsPage.clickOnCreateButton();
    await promise.all([
      board2UpdatePage.setTitleInput('title'),
      board2UpdatePage.setContentsInput('contents'),
      board2UpdatePage.setCreatedDateInput('2000-12-31')
    ]);
    expect(await board2UpdatePage.getTitleInput()).to.eq('title', 'Expected Title value to be equals to title');
    expect(await board2UpdatePage.getContentsInput()).to.eq('contents', 'Expected Contents value to be equals to contents');
    expect(await board2UpdatePage.getCreatedDateInput()).to.eq('2000-12-31', 'Expected createdDate value to be equals to 2000-12-31');
    await board2UpdatePage.save();
    expect(await board2UpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await board2ComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Board2', async () => {
    const nbButtonsBeforeDelete = await board2ComponentsPage.countDeleteButtons();
    await board2ComponentsPage.clickOnLastDeleteButton();

    board2DeleteDialog = new Board2DeleteDialog();
    expect(await board2DeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Board 2?');
    await board2DeleteDialog.clickOnConfirmButton();

    expect(await board2ComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
