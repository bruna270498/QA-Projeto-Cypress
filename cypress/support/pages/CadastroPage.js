import BasePage from './BasePage';

const elementNome = ':nth-child(3) > .input__default';
const elementSenha = ':nth-child(4) > .style__ContainerFieldInput-sc-s3e9ea-0 > .input__default';
const elementEmail = ':nth-child(2) > .input__default';
const elementConfSenha = ':nth-child(5) > .style__ContainerFieldInput-sc-s3e9ea-0 > .input__default';
const elementToggle = '#toggleAddBalance';
const btnCadastrar = '.styles__ContainerFormRegister-sc-7fhc7g-0 > .style__ContainerButton-sc-1wsixal-0';
const btnRegistrar = '.ihdmxA';

Cypress.Commands.add('cadastroUsuario', (email, nome, senha,confSenha, toggleSaldo = false) => {
    cy.visit('/');
    cy.clicarBtn(btnRegistrar);
    cy.preencherCampo(elementEmail, email);
    cy.preencherCampo(elementNome, nome);
    cy.preencherCampo(elementSenha, senha);
    cy.preencherCampo(elementConfSenha, confSenha);
    if(toggleSaldo) cy.clicarBtn(elementToggle);
    cy.clicarBtn(btnCadastrar);
});