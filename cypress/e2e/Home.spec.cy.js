describe('Home', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays the correct number of podcasts', () => {
    cy.get('#podcast-container').should('not.be.empty');

    cy.get('#podcast-count').should('have.text', '100');

    cy.get('#podcast-container').find('.thumbnail').should('have.length', 100);
  });

  it('filters by podcast name', () => {
    cy.get('.podcast-name')
      .first()
      .then(($podcastName) => {
        const podcastName = $podcastName.text().trim();

        cy.get('#search').type(podcastName);

        cy.get('#podcast-count').should('have.text', '1');

        cy.get('#podcast-container')
          .find('.thumbnail')
          .should('have.length', 1);
      });
  });

  it('filters by podcast author', () => {
    cy.get('.podcast-author')
      .first()
      .then(($podcastName) => {
        const podcastAuthor = $podcastName.text().trim();

        cy.get('#search').type(podcastAuthor);

        cy.get('#podcast-count').should('have.text', '1');

        cy.get('#podcast-container')
          .find('.thumbnail')
          .should('have.length', 1);
      });
  });

  it('click on the thumbnail redirects to podcast details view', () => {
    cy.get('.thumbnail').first().click();

    cy.url().should('include', '/podcast/');
  });
});
