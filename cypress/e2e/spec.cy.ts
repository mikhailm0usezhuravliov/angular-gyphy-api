describe('My First Test', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('check search input', () => {
    cy.get('input.search-input').should('be.visible');
  })

  it('check search button', () => {
    cy.get('button.search-button').should('be.visible');
  })

  it('search vo images and check for results', () => {
    cy.get('input.search-input').type('text');
    cy.get('button.search-button').click();
    cy.get('div.result-item').should('be.visible')
  })
})
