Cypress.Commands.add('preencherCampo', (selector, value) => {
    cy.get(selector).type(value, { force: true });
})

Cypress.Commands.add('clicarBtn', (selector) => {
    cy.get(selector).click({ force: true });
})

Cypress.Commands.add('retornoMensagem', (element, message) => {
    cy.get(element).should('contain.text', message, { force: true });
})

Cypress.Commands.add('pegarTexto', (element) => {
    return cy.get(element).invoke('text').wait(1000);
})