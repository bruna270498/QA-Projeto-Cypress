import { faker} from '@faker-js/faker';

Cypress.Commands.add('generateFixture', () => {
    cy.writeFile('cypress/fixtures/usuarios.json', {
      'hits':Cypress._.times(2, () => {
         return {
          'nome':`${faker.person.fullName()}`,
          'email':`${faker.internet.email()}`,
          'senha':`${faker.internet.password()}`
        }
      })
    })
  })