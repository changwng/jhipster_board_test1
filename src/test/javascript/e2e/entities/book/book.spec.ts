// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BookComponentsPage, BookDeleteDialog, BookUpdatePage } from './book.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Book e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let bookComponentsPage: BookComponentsPage;
  let bookUpdatePage: BookUpdatePage;
  let bookDeleteDialog: BookDeleteDialog;
  const fileNameToUpload = 'logo-jhipster.png';
  const fileToUpload = '../../../../../../src/main/webapp/content/images/' + fileNameToUpload;
  const absolutePath = path.resolve(__dirname, fileToUpload);

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Books', async () => {
    await navBarPage.goToEntity('book');
    bookComponentsPage = new BookComponentsPage();
    await browser.wait(ec.visibilityOf(bookComponentsPage.title), 5000);
    expect(await bookComponentsPage.getTitle()).to.eq('Books');
  });

  it('should load create Book page', async () => {
    await bookComponentsPage.clickOnCreateButton();
    bookUpdatePage = new BookUpdatePage();
    expect(await bookUpdatePage.getPageTitle()).to.eq('Create or edit a Book');
    await bookUpdatePage.cancel();
  });

  it('should create and save Books', async () => {
    const nbButtonsBeforeCreate = await bookComponentsPage.countDeleteButtons();

    await bookComponentsPage.clickOnCreateButton();
    await promise.all([
      bookUpdatePage.setNameInput('name'),
      bookUpdatePage.setDescriptionInput('description'),
      bookUpdatePage.setImageInput(absolutePath)
    ]);
    expect(await bookUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await bookUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    expect(await bookUpdatePage.getImageInput()).to.endsWith(fileNameToUpload, 'Expected Image value to be end with ' + fileNameToUpload);
    await bookUpdatePage.save();
    expect(await bookUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await bookComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Book', async () => {
    const nbButtonsBeforeDelete = await bookComponentsPage.countDeleteButtons();
    await bookComponentsPage.clickOnLastDeleteButton();

    bookDeleteDialog = new BookDeleteDialog();
    expect(await bookDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Book?');
    await bookDeleteDialog.clickOnConfirmButton();

    expect(await bookComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
