// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import '@shelex/cypress-allure-plugin'
import './commands'


// Alternatively you can use CommonJS syntax:
// require('./commands')
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
  return false
})

/*beforeEach(() => {
  cy.generateFixture();
  cy.fixture('usuarios.json').as('usuariosData');

  const btnCadastrar = '.styles__ContainerFormRegister-sc-7fhc7g-0 > .style__ContainerButton-sc-1wsixal-0';
  const btnRegistrar = '.ihdmxA';

  cy.get('@usuariosData').then((usuariosData) => {
    const toggleSaldo = [false, true];
    usuariosData.hits.forEach((usuario, index) => {
      const { email, senha, nome } = usuario;
      cy.cadastroUsuario(email, senha, nome,senha, btnRegistrar, btnCadastrar, toggleSaldo[index]);
    });
  })
})*/

