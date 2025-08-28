describe('Contact List Suite', () => {
  let credentials
  let buttons
  let signUpData
  let addContactData

  beforeEach(() => {
    cy.fixture('locators').then((data) => {
      credentials = data.credentials;
      buttons = data.buttons
      signUpData = data.signUpData
      addContactData = data.addContact
    });
  });

  it('Sign Up', () => {
    cy.log("User has to sign up");

    // Navigate to Contact List Site
    cy.visit('/');
    cy.log("Navigated to Contact List Site");

    // Click on the Sign Up button
    cy.get(buttons.signUp).click();
   

    // Fill out the sign-up form. Remember to change details to rerun test if not you get an error of "This email is already registered"
    cy.get(credentials.firstName).type(signUpData.firstName);
    cy.get(credentials.lastName).type(signUpData.lastName);
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
    cy.get(credentials.firstName).type(addContactData.firstName);
    cy.get(credentials.lastName).type(addContactData.lastName);
    cy.get(credentials.birthDate).type(addContactData.birthDate);
    cy.get(credentials.userEmail).type(addContactData.userEmail);
    cy.get(credentials.phoneNumber).type(addContactData.phoneNumber);

    // Address details
    cy.get(credentials.userStreet1).type(addContactData.userStreet1);
    cy.get(credentials.userStreet2).type(addContactData.userStreet2);
    cy.get(credentials.userCity).type(addContactData.userCity);
    cy.get(credentials.userProvince).type(addContactData.userProvince);
    cy.get(credentials.userPostalcode).type(addContactData.userPostalcode);

    // Country details
    cy.get(credentials.userCountry).type(addContactData.userCountry);

    // Submit the contact form
    cy.get(buttons.submitButton).click();
    
    cy.log('User has Successfully Added a New Contact');

    //Adding another contact
    cy.get(buttons.addContact).click()

    // Fill out the contact form
    cy.get(credentials.firstName).type('David');
    cy.get(credentials.lastName).type('Barnes');
    cy.get(credentials.birthDate).type('1841-01-23');
    cy.get(credentials.userEmail).type('barnes@mailinator.com');
    cy.get(credentials.phoneNumber).type('09020554654');
    
    // Address details
    cy.get(credentials.userStreet1).type('Elitor');
    cy.get(credentials.userStreet2).type('G.R.A.');
    cy.get(credentials.userCity).type('Port Harcourt');
    cy.get(credentials.userProvince).type('Rivers');
    cy.get(credentials.userPostalcode).type('500102');
    
    // Country details
    cy.get(credentials.userCountry).type('Nigeria');

    // Submit the contact form
    cy.get(buttons.submitButton).click();
    cy.log('User has Successfully Added another Contact');

    // Submit the contact form 
    cy.wait(2000)
    cy.get(buttons.logOut).click()
  });

});