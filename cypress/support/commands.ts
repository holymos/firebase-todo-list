import { attachCustomCommands } from 'cypress-firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';

const fbConfig = {
  apiKey: Cypress.env('apiKey'),
  authDomain: Cypress.env('authDomain'),
  projectId: Cypress.env('projectId'),
  storageBucket: Cypress.env('storageBucket'),
  messagingSenderId: Cypress.env('messagingSenderId'),
  appId: Cypress.env('appId'),
};

firebase.initializeApp(fbConfig);

attachCustomCommands({ Cypress, cy, firebase });

Cypress.Commands.add('addTodo', (title: string) => {
  cy.get('input[name="title"]').type(title);
  cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('deleteTodo', (title: string) => {
  cy.contains(title)
    .parent()
    .siblings('div')
    .find('button[title="Delete"]')
    .click();
});

Cypress.Commands.add('completeTodo', (title: string) => {
  cy.contains(title).parent().siblings('div[data-testid="Checkbox"]').click();
});
