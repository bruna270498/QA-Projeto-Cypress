import BasePage from './BasePage';

const emailElement = '.style__ContainerFormLogin-sc-1wbjw6k-0 > :nth-child(1) > .input__default';
const senhaElement = '.style__ContainerFormLogin-sc-1wbjw6k-0 > .login__password > .style__ContainerFieldInput-sc-s3e9ea-0 > .input__default';
const btnLogin = '.otUnI';

Cypress.Commands.add('login', (email, senha) => {
    cy.visit('/');
    cy.preencherCampo(emailElement, email);
    cy.preencherCampo(senhaElement, senha);
    cy.clicarBtn(btnLogin);
});