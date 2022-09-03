/// <reference types="cypress" />

describe('Testeo exchange', () => {
  before('Visita la pagina del exchange', () => {
    cy.visit(' http://127.0.0.1:8080')
  })

  it('Comprueba disposicion incial', () => {
    cy.get('#base-monetaria').should('not.be.visible');
    cy.contains('Seleccionar').should('be.visible');
    cy.contains('Seleccione una base monetaria').should('be.visible');
    cy.get('#opciones-fechas').should('be.visible');
    
  })

  it('Selecciona moneda y fecha de cambios', () => {
    cy.get('#opciones-monedas').select('ARS').should('have.value', 'ARS');
    cy.get('#opciones-fechas').type('2020-08-25');
    cy.get('#seleccionar').click();

  })

  it('Comprueba resultados', () => {
    const cantidadMonedas = cy.get('#opciones-monedas').length;
    cy.get('#base-monetaria').should('be.visible');
    cy.get('#lista-cambios')
      .should('be.visible')
      .should(($li) => {
        expect($li).to.have.length(cantidadMonedas);
      })

  })

})
