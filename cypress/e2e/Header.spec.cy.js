import fetch from 'cross-fetch';

describe('Header', () => {
  beforeEach(async () => {
    cy.visit('/');
  });

  it('shows loading animation when loading', () => {
    cy.get('.header-loading').should('exist');
  });

  it('does not show loading animation after loading', () => {
    cy.get('.thumbnail').then(() => {
      cy.get('.header-loading').should('not.exist');
    });
  });

  it('redirects home when clicking on the logo', () => {
    cy.get('.logo').should('exist');

    cy.get('.logo').click();

    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});
