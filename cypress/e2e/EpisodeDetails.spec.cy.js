import fetch from 'cross-fetch';

describe('Episode details', () => {
  const JSONP_URL = 'https://cors-anywhere.herokuapp.com/';

  const URL = JSONP_URL + 'https://itunes.apple.com/lookup?id=';

  let podcastId;
  let episodeId;

  before(async () => {
    const response = await fetch(
      'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'
    );
    const data = await response.json();
    const podcastData = data.feed.entry;
    podcastId = podcastData[0].id.attributes['im:id'];
    const episodeResponse = await fetch(
      `${URL}${podcastId}&entity=podcastEpisode`
    );
    const episodeData = await episodeResponse.json();
    episodeId = episodeData.results[1].trackId;
  });

  beforeEach(() => {
    cy.visit(`/podcast/${podcastId}/episode/${episodeId}`);
  });

  it('displays the title of the episode', () => {
    cy.get('#episode-title').should('exist');
  });

  it('displays the description of the episode', () => {
    cy.get('#episode-description').should('exist');
  });

  it('displays the audio player of the episode', () => {
    cy.get('.audio').should('exist');
  });

  it('displays the left section with podcast information', () => {
    cy.get('#sidebar').should('exist');
  });

  it('click on one podcast name on the left bar redirects to podcast details view', () => {
    cy.get('#sidebar-podcast-name').first().click();

    cy.url().should('eq', Cypress.config().baseUrl + '/podcast/' + podcastId);
  });

  it('click on one podcast author on the left bar redirects to podcast details view', () => {
    cy.get('#sidebar-podcast-author').first().click();

    cy.url().should('eq', Cypress.config().baseUrl + '/podcast/' + podcastId);
  });
});
