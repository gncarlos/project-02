context('Actions', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })
  
    // https://on.cypress.io/interacting-with-elements
  
    it('.type() - type into a DOM element', () => {
      // https://on.cypress.io/type
      // id="first_name_field"
      cy.get('#first_name_field')
        .type('Joshua').should('have.value', 'Joshua')

      cy.get('#last_name_field')
        .type('mark zuckerburg').should('have.value', 'mark zuckerburg')
    
      cy.get('#age_field')
        .type('25').should('have.value', '25')


        cy.get('.radio_field [type="radio"]')
        .check('male', { force: true }).should('be.checked')
        
        cy.get('.radio_field [type="radio"]')
        .check('female', { force: true }).should('be.checked')
  
      cy.get('.continue_field')
        .click()
        cy.location('pathname').should('include', 'ScoreInput')

      cy.get('#pushUps_field')
        .type('67').should('have.value', '67')

      cy.get('#sitUps_field')
        .type('70').should('have.value', '70')
    
      cy.get('#min_field')
        .type('9').should('have.value', '9')

      cy.get('#sec_field')
        .type('00').should('have.value', '00')

      cy.get('#calendar_field')
       .type('2021-07-08').should('have.value', '2021-07-08')

      cy.get('.calculate_field')
        .click()
      cy.get('#total_score_field').should('have.text', 'Your score is 100')
    })
})