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

    it('register user with password mismatch', () => {
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

        cy.contains('Logout').click();
        cy.url().should('include', '/');
    });

    it('guest user', ()=>{
        cy.visit('http://localhost:3000');
        cy.get('.guest-btn').click();
        cy.url().should('include', '/home');
    })

    it('guest user homepage', ()=>{
        cy.visit('http://localhost:3000');
        cy.get('.guest-btn').click();
        cy.url().should('include', '/home');
        cy.contains('Fake Stack Overflow');
        cy.contains('All Questions');
        cy.contains('4 questions');
        cy.contains('Newest');
        cy.contains('Active');
        cy.contains('Unanswered');
        cy.contains('Questions');
        cy.contains('Tags');
        cy.get('#searchBar');
        cy.get('.postStats');
        cy.get('#question-length')
        cy.get('.quesLinks');
        cy.get('.lastActivity');
    })

    it('guest user homepage with no ask a question button', () => {
        cy.visit('http://localhost:3000');
        cy.get('.guest-btn').click();
        cy.url().should('include', '/home');
        cy.get('#ask-question').should('not.exist');
    })

    it('guest user homepage with no answer question button', () => {
        cy.visit('http://localhost:3000');
        cy.get('.guest-btn').click();
        cy.url().should('include', '/home');
        cy.contains('Programmatically navigate using React router').click();
        cy.get('#answer-question').should('not.exist');
    })

    it('Registered User - Add question, click next if questions are more than 5', () => {
        cy.visit('http://localhost:3000');
       
        cy.get('.login-btn').click();
        cy.get("#username").type("abaya");
        cy.get("#password").type("abc@1234", { sensitive: true });
        cy.get('#login-submit-btn').click();
        cy.url().should('include', '/home');
        
        // add a question
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question A');
        cy.get('#formTextInput').type('Test Question A Text');
        cy.get('#formTagInput').type('javascript');
        cy.contains('Post Question').click();

        cy.contains('Questions').click();

        // add another question
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question B');
        cy.get('#formTextInput').type('Test Question B Text');
        cy.get('#formTagInput').type('javascript');
        cy.contains('Post Question').click();

        // go back to main page
        cy.contains('Questions').click();

        const firstPage = ['Test Question B', 'Test Question A', 'Quick question about storage on android', 'Object storage for a web application', 'android studio save string shared preference, start activity and load the saved string'];
        const secondPage = ['Programmatically navigate using React router']

        //first page
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', firstPage[index]);
        })
        // clicks unanswered
        cy.contains('Next').click();
     
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', secondPage[index]);
        })
    })

    it('Registered User - Add question, go to next, click previous to display first Page questions', () => {
        cy.visit('http://localhost:3000');
       
        cy.get('.login-btn').click();
        cy.get("#username").type("abaya");
        cy.get("#password").type("abc@1234", { sensitive: true });
        cy.get('#login-submit-btn').click();
        cy.url().should('include', '/home');
        
        // add a question
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question A');
        cy.get('#formTextInput').type('Test Question A Text');
        cy.get('#formTagInput').type('javascript');
        cy.contains('Post Question').click();

        cy.contains('Questions').click();

        // add another question
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question B');
        cy.get('#formTextInput').type('Test Question B Text');
        cy.get('#formTagInput').type('javascript');
        cy.contains('Post Question').click();

        // go back to main page
        cy.contains('Questions').click();

        const firstPage = ['Test Question B', 'Test Question A', 'Quick question about storage on android', 'Object storage for a web application', 'android studio save string shared preference, start activity and load the saved string'];
        const secondPage = ['Programmatically navigate using React router']

        cy.contains('Next').click();
     
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', secondPage[index]);
        })

        cy.contains('Previous').click();
     
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', firstPage[index]);
        })
    })

    it('Registered User - Add question, go to next, click previous to display first Page questions', () => {
        cy.visit('http://localhost:3000');
       
        cy.get('.login-btn').click();
        cy.get("#username").type("abaya");
        cy.get("#password").type("abc@1234", { sensitive: true });
        cy.get('#login-submit-btn').click();
        cy.url().should('include', '/home');
        
        // add a question
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question A');
        cy.get('#formTextInput').type('Test Question A Text');
        cy.get('#formTagInput').type('javascript');
        cy.contains('Post Question').click();

        cy.contains('Questions').click();

        // add another question
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question B');
        cy.get('#formTextInput').type('Test Question B Text');
        cy.get('#formTagInput').type('javascript');
        cy.contains('Post Question').click();

        // go back to main page
        cy.contains('Questions').click();

        const firstPage = ['Test Question B', 'Test Question A', 'Quick question about storage on android', 'Object storage for a web application', 'android studio save string shared preference, start activity and load the saved string'];
        const secondPage = ['Programmatically navigate using React router']

        cy.contains('Next').click();
     
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', secondPage[index]);
        })

        cy.contains('Previous').click();
     
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', firstPage[index]);
        })
    })

    it('Registered User - Add question, clicking next on last page will redirect to first page', () => {
        cy.visit('http://localhost:3000');
       
        cy.get('.login-btn').click();
        cy.get("#username").type("abaya");
        cy.get("#password").type("abc@1234", { sensitive: true });
        cy.get('#login-submit-btn').click();
        cy.url().should('include', '/home');
        
        // add a question
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question A');
        cy.get('#formTextInput').type('Test Question A Text');
        cy.get('#formTagInput').type('javascript');
        cy.contains('Post Question').click();

        cy.contains('Questions').click();

        // add another question
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question B');
        cy.get('#formTextInput').type('Test Question B Text');
        cy.get('#formTagInput').type('javascript');
        cy.contains('Post Question').click();

        // go back to main page
        cy.contains('Questions').click();

       
        const secondPage = ['Programmatically navigate using React router']

        cy.contains('Next').click();
     
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', secondPage[index]);
        })

        cy.contains('Next').click();
        cy.contains('Next').click();
        const firstPage = ['Test Question B', 'Test Question A', 'Quick question about storage on android', 'Object storage for a web application', 'android studio save string shared preference, start activity and load the saved string'];
        
        // cy.contains('Previous').click();
     
        // cy.get('.postTitle').each(($el, index, $list) => {
        //     cy.wrap($el).should('contain', firstPage[index]);
        // })
    })




    it('Registered User - Adds three questions and one answer, then click "Questions", then click unanswered button, verifies the sequence', () => {
        cy.visit('http://localhost:3000');
       
        cy.get('.login-btn').click();
        cy.get("#username").type("abaya");
        cy.get("#password").type("abc@1234", { sensitive: true });
        cy.get('#login-submit-btn').click();
        cy.url().should('include', '/home');
        
        // add a question
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question A');
        cy.get('#formTextInput').type('Test Question A Text');
        cy.get('#formTagInput').type('javascript');
        cy.contains('Post Question').click();

        // add another question
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question B');
        cy.get('#formTextInput').type('Test Question B Text');
        cy.get('#formTagInput').type('javascript');
        cy.contains('Post Question').click();

        // add another question
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question C');
        cy.get('#formTextInput').type('Test Question C Text');
        cy.get('#formTagInput').type('javascript');
        cy.contains('Post Question').click();

        // add an answer to question A
        cy.contains('Test Question A').click();
        cy.contains('Answer Question').click();
        cy.get('#answerTextInput').type('Answer Question A');
        cy.contains('Post Answer').click();

        // go back to main page
        cy.contains('Questions').click();

        // clicks unanswered
        cy.contains('Unanswered').click();
        const qTitles = ['Test Question C', 'Test Question B']
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })
    })

    it('Guest User - Adds three questions and one answer, then click "Questions", then click unanswered button, verifies the sequence', () => {
    
        cy.visit('http://localhost:3000');
       
        cy.get('.login-btn').click();
        cy.get("#username").type("abaya");
        cy.get("#password").type("abc@1234", { sensitive: true });
        cy.get('#login-submit-btn').click();
        cy.url().should('include', '/home');
        
        // add a question
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question A');
        cy.get('#formTextInput').type('Test Question A Text');
        cy.get('#formTagInput').type('javascript');
        cy.contains('Post Question').click();

        // add another question
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question B');
        cy.get('#formTextInput').type('Test Question B Text');
        cy.get('#formTagInput').type('javascript');
        cy.contains('Post Question').click();

        // add another question
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question C');
        cy.get('#formTextInput').type('Test Question C Text');
        cy.get('#formTagInput').type('javascript');
        cy.contains('Post Question').click();

        // add an answer to question A
        cy.contains('Test Question A').click();
        cy.contains('Answer Question').click();
        cy.get('#answerTextInput').type('Answer Question A');
        cy.contains('Post Answer').click();

        // go back to main page
        cy.contains('Questions').click();

        cy.contains('Logout').click();
        cy.url().should('include', '/');

        cy.get('.guest-btn').click();
        cy.url().should('include', '/home');

        // clicks unanswered
        cy.contains('Unanswered').click();
        const qTitles = ['Test Question C', 'Test Question B']
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })
    })

    it('Registered User - Check if questions are displayed in descending order of dates.', () => {
        cy.visit('http://localhost:3000');
       
        cy.get('.login-btn').click();
        cy.get("#username").type("abaya");
        cy.get("#password").type("abc@1234", { sensitive: true });
        cy.get('#login-submit-btn').click();
        cy.url().should('include', '/home');

        const qTitles = ['Quick question about storage on android','Object storage for a web application','android studio save string shared preference, start activity and load the saved string', 'Programmatically navigate using React router'];
      
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })
    })

    it('Guest User - Check if questions are displayed in descending order of dates.', () => {
        cy.visit('http://localhost:3000');
        cy.get('.guest-btn').click();
        cy.url().should('include', '/home');

        const qTitles = ['Quick question about storage on android','Object storage for a web application','android studio save string shared preference, start activity and load the saved string', 'Programmatically navigate using React router'];
      
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })
    })

    it('Guest User - Add question as registered user and check questions along with newly added are displayed in descending order of dates ', () => {
    
        cy.visit('http://localhost:3000');
       
        cy.get('.login-btn').click();
        cy.get("#username").type("abaya");
        cy.get("#password").type("abc@1234", { sensitive: true });
        cy.get('#login-submit-btn').click();
        cy.url().should('include', '/home');
        
        // add a question
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question A');
        cy.get('#formTextInput').type('Test Question A Text');
        cy.get('#formTagInput').type('javascript');
        cy.contains('Post Question').click();

        cy.contains('Logout').click();
        cy.url().should('include', '/');

        cy.get('.guest-btn').click();
        cy.url().should('include', '/home');

        const qTitles = ['Test Question A', 'Quick question about storage on android','Object storage for a web application','android studio save string shared preference, start activity and load the saved string', 'Programmatically navigate using React router'];
      
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })
    })

    it('Registered User - Adds multiple questions one by one and displays them in All Questions', () => {
        cy.visit('http://localhost:3000');
       
        cy.get('.login-btn').click();
        cy.get("#username").type("abaya");
        cy.get("#password").type("abc@1234", { sensitive: true });
        cy.get('#login-submit-btn').click();
        cy.url().should('include', '/home');

        // Add multiple questions
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question 1');
        cy.get('#formTextInput').type('Test Question 1 Text');
        cy.get('#formTagInput').type('javascript');
        cy.contains('Post Question').click();

        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question 2');
        cy.get('#formTextInput').type('Test Question 2 Text');
        cy.get('#formTagInput').type('react');
        cy.contains('Post Question').click();


        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question 3');
        cy.get('#formTextInput').type('Test Question 3 Text');
        cy.get('#formTagInput').type('java');
        cy.contains('Post Question').click();

        // verify the presence of multiple questions in most recently added order.
        cy.contains('Fake Stack Overflow');
        const qTitles = ['Test Question 3', 'Test Question 2', 'Test Question 1','Quick question about storage on android','Object storage for a web application','android studio save string shared preference, start activity and load the saved string', 'Programmatically navigate using React router'];
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        });
        
        // verify that when clicking "Unanswered", the unanswered questions are shown
        cy.contains('Unanswered').click();
        const qTitlesUnanswered = ['Test Question 3', 'Test Question 2', 'Test Question 1']
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitlesUnanswered[index]);
        })

    });

    it('Guest User - Adds multiple questions one by one as registered user and displays them in All Questions', () => {
        cy.visit('http://localhost:3000');
       
        cy.get('.login-btn').click();
        cy.get("#username").type("abaya");
        cy.get("#password").type("abc@1234", { sensitive: true });
        cy.get('#login-submit-btn').click();
        cy.url().should('include', '/home');

        // Add multiple questions
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question 1');
        cy.get('#formTextInput').type('Test Question 1 Text');
        cy.get('#formTagInput').type('javascript');
        cy.contains('Post Question').click();

        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question 2');
        cy.get('#formTextInput').type('Test Question 2 Text');
        cy.get('#formTagInput').type('react');
        cy.contains('Post Question').click();


        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question 3');
        cy.get('#formTextInput').type('Test Question 3 Text');
        cy.get('#formTagInput').type('java');
        cy.contains('Post Question').click();

        cy.contains('Logout').click();
        cy.url().should('include', '/');

        cy.get('.guest-btn').click();
        cy.url().should('include', '/home');

        // verify the presence of multiple questions in most recently added order.
        cy.contains('Fake Stack Overflow');
        const qTitles = ['Test Question 3', 'Test Question 2', 'Test Question 1','Quick question about storage on android','Object storage for a web application','android studio save string shared preference, start activity and load the saved string', 'Programmatically navigate using React router'];
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        });
        
        // verify that when clicking "Unanswered", the unanswered questions are shown
        cy.contains('Unanswered').click();
        const qTitlesUnanswered = ['Test Question 3', 'Test Question 2', 'Test Question 1']
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitlesUnanswered[index]);
        })

    });

    it('Search for a question using text content that does not exist', () => {
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

        const searchText = "Web3";
        cy.get('#searchBar').type(`${searchText}{enter}`);
        cy.get('.postTitle').should('have.length', 0);

        cy.contains('Logout').click();
        cy.url().should('include', '/');

        cy.get('.guest-btn').click();
        cy.url().should('include', '/home');

        const guestSearchText = "Web3";
        cy.get('#searchBar').type(`${guestSearchText}{enter}`);
        cy.get('.postTitle').should('have.length', 0);

    })

    it('Search string in question title', () => {
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

        const qTitles = ['Quick question about storage on android'];
        cy.get('#searchBar').type('quick{enter}');
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })

        cy.contains('Logout').click();
        cy.url().should('include', '/');

        cy.get('.guest-btn').click();
        cy.url().should('include', '/home');

        const guestQTitles = ['Quick question about storage on android'];
        cy.get('#searchBar').type('quick{enter}');
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', guestQTitles[index]);
        });

    })

    it('Search string in question text', () => {
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

        const qText= ['I am currently working on a website where, roughly 40 million documents and images should be served to its users. I need suggestions on which method is the most suitable for storing content with subject to these requirements.'];
        cy.get('#searchBar').type('40 million{enter}');
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qText[index]);
        })

        cy.contains('Logout').click();
        cy.url().should('include', '/');

        cy.get('.guest-btn').click();
        cy.url().should('include', '/home');

        const guestQText= ['I am currently working on a website where, roughly 40 million documents and images should be served to its users. I need suggestions on which method is the most suitable for storing content with subject to these requirements.'];
        cy.get('#searchBar').type('40 million{enter}');
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', guestQText[index]);
        })

    })

    it('Search string in question tag', () => {
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

        const qTitles = ['Programmatically navigate using React router'];
        cy.get('#searchBar').type('[react]{enter}');
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })

        cy.contains('Logout').click();
        cy.url().should('include', '/');

        cy.get('.guest-btn').click();
        cy.url().should('include', '/home');

        const guestQTitles = ['Programmatically navigate using React router'];
        cy.get('#searchBar').type('[react]{enter}');
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', guestQTitles[index]);
        });

    })

    it('Search string with question tag and title', () => {
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

        const qTitles = ['Quick question about storage on android', 'Programmatically navigate using React router'];
        cy.get('#searchBar').type('quick [react]{enter}');
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })

        cy.contains('Logout').click();
        cy.url().should('include', '/');

        cy.get('.guest-btn').click();
        cy.url().should('include', '/home');

        const guestQTitles = ['Quick question about storage on android', 'Programmatically navigate using React router'];
        cy.get('#searchBar').type('quick [react]{enter}');
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', guestQTitles[index]);
        });

    })

    it('Search string with question tag and text', () => {
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

        const qTitles = ['Quick question about storage on android', 'Programmatically navigate using React router'];
        cy.get('#searchBar').type('remains [react]{enter}');
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })

        cy.contains('Logout').click();
        cy.url().should('include', '/');

        cy.get('.guest-btn').click();
        cy.url().should('include', '/home');

        const guestQTitles = ['Quick question about storage on android', 'Programmatically navigate using React router'];
        cy.get('#searchBar').type('remains [react]{enter}');
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', guestQTitles[index]);
        });

    })

    it('Search string with question title and text', () => {
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

        const qTitles = ['Quick question about storage on android', 'Programmatically navigate using React router'];
        cy.get('#searchBar').type('remains programmatically{enter}');
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })

        cy.contains('Logout').click();
        cy.url().should('include', '/');

        cy.get('.guest-btn').click();
        cy.url().should('include', '/home');

        const guestQTitles = ['Quick question about storage on android', 'Programmatically navigate using React router'];
        cy.get('#searchBar').type('remains programmatically{enter}');
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', guestQTitles[index]);
        });

    })

    it('Search string with question title, text and tag', () => {
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

        const qTitles = ['Quick question about storage on android', 'android studio save string shared preference, start activity and load the saved string', 'Programmatically navigate using React router'];
        cy.get('#searchBar').type('remains [android-studio] programmatically{enter}');
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })

        cy.contains('Logout').click();
        cy.url().should('include', '/');

        cy.get('.guest-btn').click();
        cy.url().should('include', '/home');

        const guestQTitles = ['Quick question about storage on android', 'android studio save string shared preference, start activity and load the saved string', 'Programmatically navigate using React router'];
        cy.get('#searchBar').type('remains [android-studio] programmatically{enter}');
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', guestQTitles[index]);
        });

    })

    it('Search string with multiple tags', () => {
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

        const qTitles = ['android studio save string shared preference, start activity and load the saved string', 'Programmatically navigate using React router'];
        cy.get('#searchBar').type('[react] [javascript]{enter}');
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })

        cy.contains('Logout').click();
        cy.url().should('include', '/');

        cy.get('.guest-btn').click();
        cy.url().should('include', '/home');

        const guestQTitles = ['android studio save string shared preference, start activity and load the saved string', 'Programmatically navigate using React router'];
        cy.get('#searchBar').type('[react] [javascript]{enter}');
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', guestQTitles[index]);
        });

    })

    it('Search for a question using a tag that does not exist', () => {
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

        cy.get('#searchBar').type('[nonExistentTag]{enter}');
        cy.get('.postTitle').should('have.length', 0);

        cy.contains('Logout').click();
        cy.url().should('include', '/');

        cy.get('.guest-btn').click();
        cy.url().should('include', '/home');

        cy.get('#searchBar').type('[nonExistentTag]{enter}');
        cy.get('.postTitle').should('have.length', 0);
    })

    it('Search string with question title, text and tag and check newest sorting order', () => {
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

        const qTitles = ['Quick question about storage on android', 'android studio save string shared preference, start activity and load the saved string', 'Programmatically navigate using React router'];
        cy.get('#searchBar').type('remains [android-studio] programmatically{enter}');
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })

        cy.contains('Newest').click();
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })

        cy.contains('Logout').click();
        cy.url().should('include', '/');

        cy.get('.guest-btn').click();
        cy.url().should('include', '/home');

        const guestQTitles = ['Quick question about storage on android', 'android studio save string shared preference, start activity and load the saved string', 'Programmatically navigate using React router'];
        cy.get('#searchBar').type('remains [android-studio] programmatically{enter}');
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', guestQTitles[index]);
        });

        cy.contains('Newest').click();
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })

    })


    it('Add answer, search string with question title, text and tag and check unanswered sorting order', () => {
        cy.visit('http://localhost:3000');
       
        cy.get('.login-btn').click();
        cy.get("#username").type("abaya");
        cy.get("#password").type("abc@1234", { sensitive: true });
        cy.get('#login-submit-btn').click();
        cy.url().should('include', '/home');

        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question A');
        cy.get('#formTextInput').type('Test Question A Text');
        cy.get('#formTagInput').type('javascript');
        cy.contains('Post Question').click();

        const qTitles = ['Test Question A', 'Quick question about storage on android', 'android studio save string shared preference, start activity and load the saved string', 'Programmatically navigate using React router'];
        cy.get('#searchBar').type('Question remains [android-studio] programmatically{enter}');
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })
        
        cy.contains('Unanswered').click();
        const qSortTitles = ['Test Question A']
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qSortTitles[index]);
        })

        cy.contains('Logout').click();
        cy.url().should('include', '/');

        cy.get('.guest-btn').click();
        cy.url().should('include', '/home');

        const guestQTitles = ['Test Question A', 'Quick question about storage on android', 'android studio save string shared preference, start activity and load the saved string', 'Programmatically navigate using React router'];
        cy.get('#searchBar').type('Question remains [android-studio] programmatically{enter}');
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', guestQTitles[index]);
        });

        cy.contains('Unanswered').click();
        const qGSortTitles = ['Test Question A']
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qGSortTitles[index]);
        })

    })

    it('Registered user - Adds a question with tags, checks the tags existed', () => {
        cy.visit('http://localhost:3000');
       
        cy.get('.login-btn').click();
        cy.get("#username").type("abaya");
        cy.get("#password").type("abc@1234", { sensitive: true });
        cy.get('#login-submit-btn').click();
        cy.url().should('include', '/home');
        
        // add a question with tags
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question A');
        cy.get('#formTextInput').type('Test Question A Text');
        cy.get('#formTagInput').type('test1 test2 test3');
        cy.contains('Post Question').click();

        // clicks tags
        cy.contains('Tags').click();
        cy.contains('test1');
        cy.contains('test2');
        cy.contains('test3');
        
    })

    it('Guest user - Adds a question with tags as registered user, checks the tags existed in guest user profile', () => {
        cy.visit('http://localhost:3000');
       
        cy.get('.login-btn').click();
        cy.get("#username").type("abaya");
        cy.get("#password").type("abc@1234", { sensitive: true });
        cy.get('#login-submit-btn').click();
        cy.url().should('include', '/home');
        
        // add a question with tags
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question A');
        cy.get('#formTextInput').type('Test Question A Text');
        cy.get('#formTagInput').type('test1 test2 test3');
        cy.contains('Post Question').click();

        cy.contains('Logout').click();
        cy.url().should('include', '/');

        cy.get('.guest-btn').click();
        cy.url().should('include', '/home');

        // clicks tags
        cy.contains('Tags').click();
        cy.contains('test1');
        cy.contains('test2');
        cy.contains('test3');
        
    })

    it('Checks if all tags exist', () => {
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
        // all tags exist in the page
        cy.contains('Tags').click();
        cy.contains('react', {matchCase: false});
        cy.contains('javascript', {matchCase: false});
        cy.contains('android-studio', {matchCase: false});
        cy.contains('shared-preferences', {matchCase: false});
        cy.contains('storage', {matchCase: false});
        cy.contains('website', {matchCase: false});
        cy.contains('Flutter', {matchCase: false});

        cy.contains('Logout').click();
        cy.url().should('include', '/');

        cy.get('.guest-btn').click();
        cy.url().should('include', '/home');

        cy.contains('Tags').click();
        cy.contains('react', {matchCase: false});
        cy.contains('javascript', {matchCase: false});
        cy.contains('android-studio', {matchCase: false});
        cy.contains('shared-preferences', {matchCase: false});
        cy.contains('storage', {matchCase: false});
        cy.contains('website', {matchCase: false});
        cy.contains('Flutter', {matchCase: false});
    })


    it('Checks if all questions exist inside tags', () => {
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
        // all question no. should be in the page
        cy.contains('Tags').click();
        cy.contains('7 Tags');
        cy.contains('1 question');
        cy.contains('2 questions');

        cy.contains('Logout').click();
        cy.url().should('include', '/');

        cy.get('.guest-btn').click();
        cy.url().should('include', '/home');

        cy.contains('Tags').click();
        cy.contains('7 Tags');
        cy.contains('1 question');
        cy.contains('2 questions');
    })

    it('go to question in tag react', () => {
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
        // all question no. should be in the page
        cy.contains('Tags').click();
        cy.contains('react').click();
        cy.contains('Programmatically navigate using React router')

        cy.contains('Logout').click();
        cy.url().should('include', '/');

        //guest user
        cy.get('.guest-btn').click();
        cy.url().should('include', '/home');
        cy.contains('Tags').click();
        cy.contains('react').click();
        cy.contains('Programmatically navigate using React router')
    })

    it('go to question in tag storage', () => {
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
        // all question no. should be in the page
        cy.contains('Tags').click();
        cy.contains('storage').click();
        cy.contains('Quick question about storage on android')
        cy.contains('Object storage for a web application')

        cy.contains('Logout').click();
        cy.url().should('include', '/');

        //guest user
        cy.get('.guest-btn').click();
        cy.url().should('include', '/home');
        cy.contains('Tags').click();
        cy.contains('storage').click();
        cy.contains('Quick question about storage on android')
        cy.contains('Object storage for a web application')
    })

    it('create a new question with a new tag and finds the question through tag', () => {
        cy.visit('http://localhost:3000');
       
        cy.get('.login-btn').click();
        cy.get("#username").type("abaya");
        cy.get("#password").type("abc@1234", { sensitive: true });
        cy.get('#login-submit-btn').click();
        cy.url().should('include', '/home');
        // all question no. should be in the page
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question A');
        cy.get('#formTextInput').type('Test Question A Text');
        cy.get('#formTagInput').type('test1-tag1');
        cy.contains('Post Question').click();

        // clicks tags
        cy.contains('Tags').click();
        cy.contains('test1-tag1').click();
        cy.contains('Test Question A')  

        cy.contains('Logout').click();
        cy.url().should('include', '/');

        //guest user
        cy.get('.guest-btn').click();
        cy.url().should('include', '/home');
        cy.contains('Tags').click();
        cy.contains('test1-tag1').click();
        cy.contains('Test Question A')  
    })

    it('Click on tag, check if questions related to tag are displayed in newest order', () => {
        cy.visit('http://localhost:3000');
       
        cy.get('.login-btn').click();
        cy.get("#username").type("abaya");
        cy.get("#password").type("abc@1234", { sensitive: true });
        cy.get('#login-submit-btn').click();
        cy.url().should('include', '/home');
        // all question no. should be in the page
        cy.contains('Tags').click();
        cy.contains('storage').click();
        cy.contains('Quick question about storage on android')
        cy.contains('Object storage for a web application')

        const qTitles = ['Quick question about storage on android', 'Object storage for a web application'];

        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })

        cy.contains('Logout').click();
        cy.url().should('include', '/');

        //guest user
        cy.get('.guest-btn').click();
        cy.url().should('include', '/home');

        cy.contains('Tags').click();
        cy.contains('storage').click();
        cy.contains('Quick question about storage on android')
        cy.contains('Object storage for a web application')
        
        const guestQTitles = ['Quick question about storage on android', 'Object storage for a web application'];

        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', guestQTitles[index]);
        })
    })

    it('Registered User - Adds Questions', () => {
        cy.visit('http://localhost:3000');
       
        cy.get('.login-btn').click();
        cy.get("#username").type("abaya");
        cy.get("#password").type("abc@1234", { sensitive: true });
        cy.get('#login-submit-btn').click();
        cy.url().should('include', '/home');
        
        // add a question
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question A');
        cy.get('#formTextInput').type('Test Question A Text');
        cy.get('#formTagInput').type('javascript');
        cy.contains('Post Question').click();

        // go back to main page
        cy.contains('Questions').click();

        // clicks unanswered
        const qTitles = ['Test Question A', 'Quick question about storage on android', 'Object storage for a web application', 'android studio save string shared preference, start activity and load the saved string', 'Programmatically navigate using React router']
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })
    })

    it('Guest User - Newly added question should appear with list of questions', () => {
        cy.visit('http://localhost:3000');
       
        cy.get('.login-btn').click();
        cy.get("#username").type("abaya");
        cy.get("#password").type("abc@1234", { sensitive: true });
        cy.get('#login-submit-btn').click();
        cy.url().should('include', '/home');
        
        // add a question
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question A');
        cy.get('#formTextInput').type('Test Question A Text');
        cy.get('#formTagInput').type('javascript');
        cy.contains('Post Question').click();

        cy.contains('Logout').click();
        cy.url().should('include', '/');

        //guest user
        cy.get('.guest-btn').click();
        cy.url().should('include', '/home');

        // go back to main page
        cy.contains('Questions').click();

        // clicks unanswered
        const qTitles = ['Test Question A', 'Quick question about storage on android', 'Object storage for a web application', 'android studio save string shared preference, start activity and load the saved string', 'Programmatically navigate using React router']
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })
    })

    it('Registered User - Adds Question should display in unanswered sort', () => {
        cy.visit('http://localhost:3000');
       
        cy.get('.login-btn').click();
        cy.get("#username").type("abaya");
        cy.get("#password").type("abc@1234", { sensitive: true });
        cy.get('#login-submit-btn').click();
        cy.url().should('include', '/home');
        
        // add a question
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question A');
        cy.get('#formTextInput').type('Test Question A Text');
        cy.get('#formTagInput').type('javascript');
        cy.contains('Post Question').click();

        // go back to main page
        cy.contains('Questions').click();

        // clicks unanswered
        const qTitles = ['Test Question A']
        cy.contains('Unanswered').click();
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })
    })

    it('Guest User - Adds Question should display on clicking unanswered sort in guest user profile', () => {
        cy.visit('http://localhost:3000');
       
        cy.get('.login-btn').click();
        cy.get("#username").type("abaya");
        cy.get("#password").type("abc@1234", { sensitive: true });
        cy.get('#login-submit-btn').click();
        cy.url().should('include', '/home');
        
        // add a question
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question A');
        cy.get('#formTextInput').type('Test Question A Text');
        cy.get('#formTagInput').type('javascript');
        cy.contains('Post Question').click();

        // go back to main page
        cy.contains('Questions').click();

        cy.contains('Logout').click();
        cy.url().should('include', '/');

        //guest user
        cy.get('.guest-btn').click();
        cy.url().should('include', '/home');

        // clicks unanswered
        const qTitles = ['Test Question A']
        cy.contains('Unanswered').click();
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })
    })



    it('Registered User - Adds Question with empty title error', () => {
        cy.visit('http://localhost:3000');
       
        cy.get('.login-btn').click();
        cy.get("#username").type("abaya");
        cy.get("#password").type("abc@1234", { sensitive: true });
        cy.get('#login-submit-btn').click();
        cy.url().should('include', '/home');
        
        // add a question
        cy.contains('Ask a Question').click();
        cy.get('#formTextInput').type('Test Question 1 Text Q1');
        cy.get('#formTagInput').type('javascript');
        cy.contains('Post Question').click();
        cy.contains('Title cannot be empty');

        })

        it('Registered User - Adds Question with empty text error', () => {
            cy.visit('http://localhost:3000');
       
            cy.get('.login-btn').click();
            cy.get("#username").type("abaya");
            cy.get("#password").type("abc@1234", { sensitive: true });
            cy.get('#login-submit-btn').click();
            cy.url().should('include', '/home');
            
            // add a question
            cy.contains('Ask a Question').click();
            cy.get('#formTitleInput').type('Test Question 1 Title Q1');
            cy.get('#formTagInput').type('javascript');
            cy.contains('Post Question').click();
            cy.contains('Question text cannot be empty');
    
        })

        it('Tries to add a question with an invalid hyperlink and verifies failure', () => {

            cy.visit('http://localhost:3000');
        
            cy.get('.login-btn').click();
            cy.get("#username").type("abaya");
            cy.get("#password").type("abc@1234", { sensitive: true });
            cy.get('#login-submit-btn').click();
            cy.url().should('include', '/home');

            const invalidUrls = [
                '[Google](htt://www.google.com)',
                '[Microsoft](microsoft.com)',
                '[](https://www.google.com/)',
                '[link]()',
                'dfv[]()',
                '[link](http://www.google.com/)',
                '[Google](https//www.google.com)',
                '[GitHub](http//github.com)',
                '[Facebook](https:/facebook.com)',
                '[Twitter](://twitter.com)',
                '[Netflix](htps://www.netflix)',
                '[Google](htts://www.goo<gle.com)',
                '[Google](http://www.google)',
                '[Dropbox](ttps://www.dropbox.c-m)',
                '[LinkedIn](ps:/www.linkedin.com)',
                '[Adobe](ttps://www.adobe..com)',
                '[Spotify](ttp:///www.spotify.com)',
                '[Reddit](http://reddit)',
                '[Wikipedia](tps://www.wikipedia=com)'
            ];

            cy.contains('Ask a Question').click();
            cy.get('#formTitleInput').type('How to add an invalid hyperlink in Markdown?');
            invalidUrls.forEach((url) => {
                cy.get('#formTextInput').clear().type(`This is an invalid link: ${url}`);
                cy.get('#formTagInput').clear().type('markdown');
                cy.contains('Post Question').click();
                cy.contains('Invalid hyperlink');
            });
           
        });

        it('Registered User - Adds Question with tag greater than 20 error', () => {
            cy.visit('http://localhost:3000');
       
            cy.get('.login-btn').click();
            cy.get("#username").type("abaya");
            cy.get("#password").type("abc@1234", { sensitive: true });
            cy.get('#login-submit-btn').click();
            cy.url().should('include', '/home');
            
            // add a question
            cy.contains('Ask a Question').click();
            cy.get('#formTitleInput').type('Test Question 1 Title Q1');
            cy.get('#formTextInput').type('Test Question 1 Text Q1');
            cy.get('#formTagInput').type('javascriptrecathtmlnodevanillarestjavapython');
            cy.contains('Post Question').click();
            cy.contains("Long tag: 'New tag length cannot be more than 20'");
    
        })

        it('Registered User - Adds Question with more than 5 tags', () => {
            
            cy.get('.login-btn').click();
            cy.get("#username").type("abaya");
            cy.get("#password").type("abc@1234", { sensitive: true });
            cy.get('#login-submit-btn').click();
            cy.url().should('include', '/home');
            
            
            // add a question
            cy.contains('Ask a Question').click();
            cy.get('#formTitleInput').type('Test Question 1 Title Q1');
            cy.get('#formTextInput').type('Test Question 1 Text Q1');
            cy.get('#formTagInput').type('javascript react html vanilla python css');
            cy.contains('Post Question').click();
            cy.contains("Extra tags: 'Cannot have more than 5 tags'");
        })

        it('Registered User - cannot add tags with user reputation < 50', () => {
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
            
            // add a question
            cy.contains('Ask a Question').click();
            cy.get('#formTitleInput').type('Test Question 1 Title Q1');
            cy.get('#formTextInput').type('Test Question 1 Text Q1');
            cy.get('#formTagInput').type('javascript react html vanilla python css');
            cy.contains('Post Question').click();
            cy.contains("user reputation is less than 50");
        })

        it('Registered User - Upvote question', () => {
            cy.visit('http://localhost:3000');
       
            cy.get('.login-btn').click();
            cy.get("#username").type("abaya");
            cy.get("#password").type("abc@1234", { sensitive: true });
            cy.get('#login-submit-btn').click();
            cy.url().should('include', '/home');
            
            // add a question
            cy.contains('Ask a Question').click();
            cy.get('#formTitleInput').type('Test Question 1 Title Q1');
            cy.get('#formTextInput').type('Test Question 1 Text Q1');
            cy.get('#formTagInput').type('javascript react');
            cy.contains('Post Question').click();
           
            cy.contains('Questions').click();

            cy.contains('Test Question 1 Title Q1').click();
            cy.get('.arrow-up').click();
            cy.get('#question-votes').contains('1 votes');
        })

        it('Guest User - Upvoted question votes', () => {
            cy.visit('http://localhost:3000');
       
            cy.get('.login-btn').click();
            cy.get("#username").type("abaya");
            cy.get("#password").type("abc@1234", { sensitive: true });
            cy.get('#login-submit-btn').click();
            cy.url().should('include', '/home');
            
            // add a question
            cy.contains('Ask a Question').click();
            cy.get('#formTitleInput').type('Test Question 1 Title Q1');
            cy.get('#formTextInput').type('Test Question 1 Text Q1');
            cy.get('#formTagInput').type('javascript react');
            cy.contains('Post Question').click();
           
            cy.contains('Questions').click();

            cy.contains('Test Question 1 Title Q1').click();
            cy.get('.arrow-up').click();
            cy.get('#question-votes').contains('1 votes');

            cy.contains('Logout').click();
            cy.url().should('include', '/');

            cy.get('.guest-btn').click();
            cy.url().should('include', '/home');

            cy.contains('Test Question 1 Title Q1').click();
            cy.get('#guest-question-votes').contains('1 votes');
            
        })

        it('Registered User - downvote question', () => {
            cy.visit('http://localhost:3000');
       
            cy.get('.login-btn').click();
            cy.get("#username").type("abaya");
            cy.get("#password").type("abc@1234", { sensitive: true });
            cy.get('#login-submit-btn').click();
            cy.url().should('include', '/home');
            
            // add a question
            cy.contains('Ask a Question').click();
            cy.get('#formTitleInput').type('Test Question 1 Title Q1');
            cy.get('#formTextInput').type('Test Question 1 Text Q1');
            cy.get('#formTagInput').type('javascript react');
            cy.contains('Post Question').click();
           
            cy.contains('Questions').click();

            cy.contains('Test Question 1 Title Q1').click();
            cy.get('.arrow-down').click();
            cy.get('#question-votes').contains('-1 votes');
        })

        it('Guest User - downvote question', () => {
            cy.visit('http://localhost:3000');
       
            cy.get('.login-btn').click();
            cy.get("#username").type("abaya");
            cy.get("#password").type("abc@1234", { sensitive: true });
            cy.get('#login-submit-btn').click();
            cy.url().should('include', '/home');
            
            // add a question
            cy.contains('Ask a Question').click();
            cy.get('#formTitleInput').type('Test Question 1 Title Q1');
            cy.get('#formTextInput').type('Test Question 1 Text Q1');
            cy.get('#formTagInput').type('javascript react');
            cy.contains('Post Question').click();
           
            cy.contains('Questions').click();

            cy.contains('Test Question 1 Title Q1').click();
            cy.get('.arrow-down').click();
            cy.get('#question-votes').contains('-1 votes');
        })

        it('Registered User - Upvote answer', () => {
            cy.visit('http://localhost:3000');
       
            cy.get('.login-btn').click();
            cy.get("#username").type("abaya");
            cy.get("#password").type("abc@1234", { sensitive: true });
            cy.get('#login-submit-btn').click();
            cy.url().should('include', '/home');
            

            cy.contains('Quick question about storage on android').click();
            cy.get(':nth-child(3) > #arrowContainer > .arrow-up').click();
            cy.get(':nth-child(3) > #arrowContainer > div').contains('36 votes')
        })

        it('Guest User - Upvoted answer votes', () => {
            cy.visit('http://localhost:3000');
       
            cy.get('.login-btn').click();
            cy.get("#username").type("abaya");
            cy.get("#password").type("abc@1234", { sensitive: true });
            cy.get('#login-submit-btn').click();
            cy.url().should('include', '/home');
            

            cy.contains('Quick question about storage on android').click();
            cy.get(':nth-child(3) > #arrowContainer > .arrow-up').click();
            cy.get(':nth-child(3) > #arrowContainer > div').contains('36 votes')

            cy.contains('Logout').click();
            cy.url().should('include', '/');

            cy.get('.guest-btn').click();
            cy.url().should('include', '/home');

            cy.contains('Quick question about storage on android').click();
            cy.get('#answer-row > h5').contains('36 votes');
            
        })

        it('Registered User - downvote answer', () => {
            cy.visit('http://localhost:3000');
       
            cy.get('.login-btn').click();
            cy.get("#username").type("abaya");
            cy.get("#password").type("abc@1234", { sensitive: true });
            cy.get('#login-submit-btn').click();
            cy.url().should('include', '/home');
            

            cy.contains('Quick question about storage on android').click();
            cy.get(':nth-child(3) > #arrowContainer > .arrow-down').click();
            cy.get(':nth-child(3) > #arrowContainer > div').contains('34 votes')
        })

        it('Guest User - Downvote answer votes', () => {
            cy.visit('http://localhost:3000');
       
            cy.get('.login-btn').click();
            cy.get("#username").type("abaya");
            cy.get("#password").type("abc@1234", { sensitive: true });
            cy.get('#login-submit-btn').click();
            cy.url().should('include', '/home');
            

            cy.contains('Quick question about storage on android').click();
            cy.get(':nth-child(3) > #arrowContainer > .arrow-down').click();
            cy.get(':nth-child(3) > #arrowContainer > div').contains('34 votes')

            cy.contains('Logout').click();
            cy.url().should('include', '/');

            cy.get('.guest-btn').click();
            cy.url().should('include', '/home');

            cy.contains('Quick question about storage on android').click();
            cy.get('#answer-row > h5').contains('34 votes');
            
        })

        it('Testing active order after adding answers', () => {
    
            cy.visit('http://localhost:3000');
            cy.get('.login-btn').click();
     
            cy.get("#username").type("sana");
            cy.get("#password").type("abc@1234", { sensitive: true });
            cy.get('#login-submit-btn').click();
            // cy.url().should('include', '/login');
     
            
            // add a question
            cy.contains('Ask a Question').click();
            cy.get('#formTitleInput').type('Test Question A');
            cy.get('#formTextInput').type('Test Question A Text');
            cy.get('#formTagInput').type('javascript');
            cy.contains('Post Question').click();
     
            // add another question
            cy.contains('Ask a Question').click();
            cy.get('#formTitleInput').type('Test Question B');
            cy.get('#formTextInput').type('Test Question B Text');
            cy.get('#formTagInput').type('javascript');
            cy.contains('Post Question').click();
     
            // add another question
            cy.contains('Ask a Question').click();
            cy.get('#formTitleInput').type('Test Question C');
            cy.get('#formTextInput').type('Test Question C Text');
            cy.get('#formTagInput').type('javascript');
            cy.contains('Post Question').click();
     
            // add an answer to question A
            cy.contains('Test Question A').click();
            cy.contains('Answer Question').click();
            cy.get('#answerTextInput').type('Answer Question A');
            cy.contains('Post Answer').click();
            
            // go back to main page
            cy.contains('Questions').click();
            cy.contains('Active').click();
            cy.get('.question').first().contains('Test Question A');
     
     
            cy.contains('Logout').click();
        })
     
        it('Testing adding comments and increase voting', () => {
        
            cy.visit('http://localhost:3000');
            cy.get('.login-btn').click();
     
            cy.get("#username").type("sana");
            cy.get("#password").type("abc@1234", { sensitive: true });
            cy.get('#login-submit-btn').click();
            // cy.url().should('include', '/login');
     
            
            // add a question
            cy.contains('Ask a Question').click();
            cy.get('#formTitleInput').type('Test Question A');
            cy.get('#formTextInput').type('Test Question A Text');
            cy.get('#formTagInput').type('javascript');
            cy.contains('Post Question').click();
     
            // add another question
            cy.contains('Ask a Question').click();
            cy.get('#formTitleInput').type('Test Question B');
            cy.get('#formTextInput').type('Test Question B Text');
            cy.get('#formTagInput').type('javascript');
            cy.contains('Post Question').click();
     
            // add another question
            cy.contains('Ask a Question').click();
            cy.get('#formTitleInput').type('Test Question C');
            cy.get('#formTextInput').type('Test Question C Text');
            cy.get('#formTagInput').type('javascript');
            cy.contains('Post Question').click();
     
            // add an answer to question A
            cy.contains('Test Question A').click();
            cy.contains('Answer Question').click();
            cy.get('#answerTextInput').type('Answer Question A');
            cy.contains('Post Answer').click();
            cy.get('.type-comment').type('comment typed');
            cy.contains("Add Comment").click();
            cy.contains("comment typed");
            cy.get('#comment-upvote').click();
            cy.contains('votes : 1');
            
            cy.contains('Logout').click();
        })
     
        it('Testing User Profile Questions', () => {
        
            cy.visit('http://localhost:3000');
            cy.get('.login-btn').click();
     
            cy.get("#username").type("sana");
            cy.get("#password").type("abc@1234", { sensitive: true });
            cy.get('#login-submit-btn').click();
            // cy.url().should('include', '/login');
     
            
            // add a question
            cy.contains('Ask a Question').click();
            cy.get('#formTitleInput').type('Test Question A');
            cy.get('#formTextInput').type('Test Question A Text');
            cy.get('#formTagInput').type('javascript');
            cy.contains('Post Question').click();
     
            // add another question
            cy.contains('Ask a Question').click();
            cy.get('#formTitleInput').type('Test Question B');
            cy.get('#formTextInput').type('Test Question B Text');
            cy.get('#formTagInput').type('javascript');
            cy.contains('Post Question').click();
     
            // add another question
            cy.contains('Ask a Question').click();
            cy.get('#formTitleInput').type('Test Question C');
            cy.get('#formTextInput').type('Test Question C Text');
            cy.get('#formTagInput').type('javascript');
            cy.contains('Post Question').click();
     
            // add an answer to question A
            cy.contains('Profile').click();
            cy.contains('Questions').click();
            cy.contains("Test Question A")
            
            cy.contains('Logout').click();
        })
     
     
        it('Testing User Tags delete', () => {
        
            cy.visit('http://localhost:3000');
            cy.get('.login-btn').click();
     
            cy.get("#username").type("sana");
            cy.get("#password").type("abc@1234", { sensitive: true });
            cy.get('#login-submit-btn').click();
            // cy.url().should('include', '/login');
     
            
            // add a question
            cy.contains('Ask a Question').click();
            cy.get('#formTitleInput').type('Test Question A');
            cy.get('#formTextInput').type('Test Question A Text');
            cy.get('#formTagInput').type('javascript');
            cy.contains('Post Question').click();
     
            // add another question
            cy.contains('Ask a Question').click();
            cy.get('#formTitleInput').type('Test Question B');
            cy.get('#formTextInput').type('Test Question B Text');
            cy.get('#formTagInput').type('javascript');
            cy.contains('Post Question').click();
     
            // add another question
            cy.contains('Ask a Question').click();
            cy.get('#formTitleInput').type('Test Question C');
            cy.get('#formTextInput').type('Test Question C Text');
            cy.get('#formTagInput').type('React');
            cy.contains('Post Question').click();
     
            // add an answer to question A
            cy.contains('Profile').click();
            cy.contains('Tags').click();
            cy.get("#profileEditTag").first().click();
            // cy.not.to.contains()
            
            cy.contains('Logout').click();
        })







})