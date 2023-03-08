import fetch from 'cross-fetch';

describe('Podcast details', () => {
  let podcastId;

  before(async () => {
    const response = await fetch(
      'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'
    );
    const data = await response.json();

    const podcastData = data.feed.entry;

    podcastId = podcastData[0].id.attributes['im:id'];
  });

  beforeEach(() => {
    cy.visit(`/podcast/${podcastId}`);
  });

  it('displays the header with the episode count', () => {
    cy.get('#podcast-header').should('exist');

    cy.get('#podcast-header').then(($header) => {
      const episodeCount = parseInt(
        $header.find('#episode-count').text().trim(),
        10
      );
      expect(episodeCount).to.be.a('number');
    });
  });

  it('displays the table with the episodes', () => {
    cy.get('#episode-table').should('exist');
    cy.get('#episode-table #episode-title').should(
      'have.length.greaterThan',
      0
    );
  });

  it('displays the left section with podcast information', () => {
    cy.get('#sidebar').should('exist');
  });

  it('click on one episode redirects to episode details view', () => {
    cy.get('#episode-title').first().click();

    cy.url().should('include', '/episode/');
  });

  it("click on the app 'logo' redirects to the main view", () => {
    cy.get('.logo').first().click();

    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});
