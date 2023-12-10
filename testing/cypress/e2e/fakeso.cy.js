// Template test file. Change the file to add more tests.
describe('Fake SO Test Suite', () => {
    beforeEach(() => {
        // Seed the database before each test
//        cy.exec('node /path/to/server/init.js');
        cy.exec('node ../server/init.js mongodb://127.0.0.1:27017/fake_so');
        cy.wait(2000);
    });

    afterEach(() => {
    // Clear the database after each test
    cy.exec('node ../server/destroy.js mongodb://127.0.0.1:27017/fake_so')
    });

    //register user success
    it('successfully register user', () => {
        cy.visit('http://localhost:3000');
        cy.get('.signup-btn').click();

        cy.get("#username").type("Xyz");
        cy.get("#email").type("xyz@gmail.com");
        cy.get("#password").type("qwerty", { sensitive: true });
        cy.get("#cpassword").type("qwerty", { sensitive: true });
        cy.get('#signup-submit-btn').click();
        cy.url().should('include', '/login');
    });

    //register user with same email
    it('register user with same email', ()=>{

        cy.visit('http://localhost:3000');
        cy.get('.signup-btn').click();

        cy.get("#username").type("Xyz");
        cy.get("#email").type("xyz@gmail.com");
        cy.get("#password").type("qwerty", { sensitive: true });
        cy.get("#cpassword").type("qwerty", { sensitive: true });
        cy.get('#signup-submit-btn').click();

        cy.visit('http://localhost:3000');
        cy.get('.signup-btn').click();

        cy.get("#username").type("abc");
        cy.get("#email").type("xyz@gmail.com");
        cy.get("#password").type("qwerty1", { sensitive: true });
        cy.get("#cpassword").type("qwerty1", { sensitive: true });
        cy.get('#signup-submit-btn').click();

        cy.get('#signup-email-error').should('be.visible');
    });

    it('register user with same username', ()=>{

        cy.visit('http://localhost:3000');
        cy.get('.signup-btn').click();

        cy.get("#username").type("Xyz");
        cy.get("#email").type("xyz@gmail.com");
        cy.get("#password").type("qwerty", { sensitive: true });
        cy.get("#cpassword").type("qwerty", { sensitive: true });
        cy.get('#signup-submit-btn').click();

        cy.visit('http://localhost:3000');
        cy.get('.signup-btn').click();

        cy.get("#username").type("Xyz");
        cy.get("#email").type("abc@gmail.com");
        cy.get("#password").type("qwerty1", { sensitive: true });
        cy.get("#cpassword").type("qwerty1", { sensitive: true });
        cy.get('#signup-submit-btn').click();

        cy.get('#signup-username-error').should('be.visible');
    });

    it('register user with invalid email', () => {
        cy.visit('http://localhost:3000');
        cy.get('.signup-btn').click();

        cy.get("#username").type("Xyz");
        cy.get("#email").type("xyz@gmail");
        cy.get("#password").type("qwerty", { sensitive: true });
        cy.get("#cpassword").type("qwerty", { sensitive: true });
        cy.get('#signup-submit-btn').click();
        
        cy.get('#signup-email-error').should('be.visible');
    });

    it('register user with password as username', () => {
        cy.visit('http://localhost:3000');
        cy.get('.signup-btn').click();

        cy.get("#username").type("Xyz");
        cy.get("#email").type("xyz@gmail.com");
        cy.get("#password").type("Xyz123", { sensitive: true });
        cy.get("#cpassword").type("Xyz123", { sensitive: true });
        cy.get('#signup-submit-btn').click();
        
        cy.get('#signup-password-error').should('be.visible');
    });

    it('register user with password as email', () => {
        cy.visit('http://localhost:3000');
        cy.get('.signup-btn').click();

        cy.get("#username").type("Xyz");
        cy.get("#email").type("xyz@gmail.com");
        cy.get("#password").type("xyz123", { sensitive: true });
        cy.get("#cpassword").type("xyz123", { sensitive: true });
        cy.get('#signup-submit-btn').click();
        
        cy.get('#signup-password-error').should('be.visible');
    });

    it('register user with repeat password different from password', () => {
        cy.visit('http://localhost:3000');
        cy.get('.signup-btn').click();

        cy.get("#username").type("Xyz");
        cy.get("#email").type("xyz@gmail.com");
        cy.get("#password").type("qwerty", { sensitive: true });
        cy.get("#cpassword").type("qwerty1", { sensitive: true });
        cy.get('#signup-submit-btn').click();
        
        cy.get('#signup-cpassword-error').should('be.visible');
    });

    it('successfully login user', () => {

        cy.visit('http://localhost:3000');
        cy.get('.signup-btn').click();

        cy.get("#username").type("Xyz");
        cy.get("#email").type("xyz@gmail.com");
        cy.get("#password").type("qwerty", { sensitive: true });
        cy.get("#cpassword").type("qwerty", { sensitive: true });
        cy.get('#signup-submit-btn').click();
        // cy.url().should('include', '/login');

        cy.visit('http://localhost:3000');
        cy.get('.login-btn').click();
        cy.get("#username").type("Xyz");
        cy.get("#password").type("qwerty", { sensitive: true });
        cy.get('#login-submit-btn').click();
        cy.url().should('include', '/home');
    });

    it('login user with different username', () => {

        cy.visit('http://localhost:3000');
        cy.get('.signup-btn').click();

        cy.get("#username").type("Xyz");
        cy.get("#email").type("xyz@gmail.com");
        cy.get("#password").type("qwerty", { sensitive: true });
        cy.get("#cpassword").type("qwerty", { sensitive: true });
        cy.get('#signup-submit-btn').click();
        // cy.url().should('include', '/login');

        cy.visit('http://localhost:3000');
        cy.get('.login-btn').click();
        cy.get("#username").type("abc");
        cy.get("#password").type("qwerty", { sensitive: true });
        cy.get('#login-submit-btn').click();

        cy.get('#login-username-error').should('be.visible');
    });

    it('login user with invalid password', () => {

        cy.visit('http://localhost:3000');
        cy.get('.signup-btn').click();

        cy.get("#username").type("Xyz");
        cy.get("#email").type("xyz@gmail.com");
        cy.get("#password").type("qwerty", { sensitive: true });
        cy.get("#cpassword").type("qwerty", { sensitive: true });
        cy.get('#signup-submit-btn').click();
        // cy.url().should('include', '/login');

        cy.visit('http://localhost:3000');
        cy.get('.login-btn').click();
        cy.get("#username").type("Xyz");
        cy.get("#password").type("abc", { sensitive: true });
        cy.get('#login-submit-btn').click();

        cy.get('#login-password-error').should('be.visible');
    });

    it('successfully logout user', () => {

        cy.visit('http://localhost:3000');
        cy.get('.signup-btn').click();

        cy.get("#username").type("Xyz");
        cy.get("#email").type("xyz@gmail.com");
        cy.get("#password").type("qwerty", { sensitive: true });
        cy.get("#cpassword").type("qwerty", { sensitive: true });
        cy.get('#signup-submit-btn').click();
        // cy.url().should('include', '/login');

        cy.visit('http://localhost:3000');
        cy.get('.login-btn').click();
        cy.get("#username").type("Xyz");
        cy.get("#password").type("qwerty", { sensitive: true });
        cy.get('#login-submit-btn').click();
        cy.url().should('include', '/home');

        cy.get('#logout-btn').click();
        cy.url().should('include', '/');
    });

    it.only('guest user', ()=>{
        cy.visit('http://localhost:3000');
        cy.get('.guest-btn').click();
        cy.url().should('include', '/home');
    })

    
    // it('successfully shows All Questions string', () => {
    //     cy.visit('http://localhost:3000');
    //     cy.contains('All Questions');
    // });
    // it('successfully shows Ask a Question button', () => {
    //     cy.visit('http://localhost:3000');
    //     cy.contains('Ask a Question');
    // });
})