describe('Contact List Suite', () => {
  let credentials
  let buttons
  let signUp
  let addContact1
  let addContact2

  before(() => {
    cy.fixture('locators').then((data) => {
      credentials = data.credentials;
      buttons = data.buttons
      signUp = data.signUp
      addContact1 = data.addContact1
      addContact2 = data.addContact2
    });
  });

  it('Sign Up', () => {
    cy.log("User has to sign up");

    // Navigate to Contact List Site
    cy.visit('/');
    cy.log("Navigated to Contact List Site");

    // Click on the Sign Up button
    cy.get(buttons.signUp).click();

    // Fill out the sign-up form. Remember to change the email to rerun test if not you get an error of "This email is already registered"
    cy.get(credentials.firstName).type(signUp.firstName);
    cy.get(credentials.lastName).type(signUp.lastName);
    cy.get(credentials.userEmail).type(credentials.userEmailValue);
    cy.get(credentials.userPassword).should('be.visible').type(credentials.userPasswordValue);
    // Submit the sign-up form
    cy.get(buttons.submitButton).click();
    cy.log("User has Successfully Signed Up");
    
    // Log out after signing up
    cy.wait(2000);
    cy.get(buttons.logOut).click();
    // To rerun test, change sign up details 
  });

  it('Login with existing details and Add Contact', () => {
    // Visit the Contact List Site
    cy.visit('/');

    // Log in with existing credentials
    cy.get(credentials.userEmail).type(credentials.userEmailValue);
    cy.get(credentials.userPassword).type(credentials.userPasswordValue);
    cy.get(buttons.submitButton).click();
    
    cy.log("User has Successfully Signed In");

    // Navigate to add a new contact
    cy.get(buttons.addContact).click();
    cy.log('User wants to add a contact');

    // Fill out the contact form
    // To rerun test, edit contact details so as not have the same contact multiple times
    cy.get(credentials.firstName).type(addContact1.firstName);
    cy.get(credentials.lastName).type(addContact1.lastName);
    cy.get(credentials.birthDate).type(addContact1.birthDate);
    cy.get(credentials.userEmail).type(addContact1.userEmail);
    cy.get(credentials.phoneNumber).type(addContact1.phoneNumber);

    // Address details
    cy.get(credentials.userStreet1).type(addContact1.userStreet1);
    cy.get(credentials.userStreet2).type(addContact1.userStreet2);
    cy.get(credentials.userCity).type(addContact1.userCity);
    cy.get(credentials.userProvince).type(addContact1.userProvince);
    cy.get(credentials.userPostalcode).type(addContact1.userPostalcode);

    // Country details
    cy.get(credentials.userCountry).type(addContact1.userCountry);

    // Submit the contact form
    cy.get(buttons.submitButton).click();
    
    cy.log('User has Successfully Added a New Contact');

    //Adding another contact
    cy.get(buttons.addContact).click()

    // Fill out the contact form
    cy.get(credentials.firstName).type(addContact2.firstName);
    cy.get(credentials.lastName).type(addContact2.lastName);
    cy.get(credentials.birthDate).type(addContact2.birthDate);
    cy.get(credentials.userEmail).type(addContact2.userEmail);
    cy.get(credentials.phoneNumber).type(addContact2.phoneNumber);

    // Address details
    cy.get(credentials.userStreet1).type(addContact2.userStreet1);
    cy.get(credentials.userStreet2).type(addContact2.userStreet2);
    cy.get(credentials.userCity).type(addContact2.userCity);
    cy.get(credentials.userProvince).type(addContact2.userProvince);
    cy.get(credentials.userPostalcode).type(addContact2.userPostalcode);

    // Country details
    cy.get(credentials.userCountry).type(addContact2.userCountry);

    // Submit the contact form
    cy.get(buttons.submitButton).click();
    cy.log('User has Successfully Added another Contact');

    // Submit the contact form 
    cy.wait(2000)
    cy.get(buttons.logOut).click()
  });

});