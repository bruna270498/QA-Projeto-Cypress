import dadosInvalido from "../../fixtures/dadosInvalidos.json";
import mensagem from "../../fixtures/mensagens.json";

describe('CT 001 - Cadastro de Usuário', () => {

  beforeEach(() => {
    cy.generateFixture();
    cy.fixture('usuarios.json').as('usuariosData');  
  })
  it('Test 01 - Cadastro realizado com sucesso', () => {
    cy.get('@usuariosData').then((usuariosData) => {
      const { email, senha, nome } = usuariosData.hits[0]
      cy.cadastroUsuario(email, senha, nome,senha);
    });
  })

  it('Test 02 - Cadastro realizado com saldo', () => {
    cy.get('@usuariosData').then((usuariosData) => {
      const { email, senha, nome } = usuariosData.hits[1]
      cy.visit('/');
      cy.cadastroUsuario(email, senha, nome,senha, true);
    });
  })

  it('Test 03 - Cadastro com error email inválidos', () => {
    cy.get('@usuariosData').then((usuariosData) => {
      const { email, senha, nome } = usuariosData.hits[1];
      cy.cadastroUsuario(dadosInvalido.emailInvalido, senha, nome,senha);
      cy.retornoMensagem('.kOeYBn > .input__warging', mensagem.messageErroEmail)
    });
  })

  it('Test 04 - Cadastro com error senha diferente', () => {
    cy.get('@usuariosData').then((usuariosData) => {
      const { email, senha, nome } = usuariosData.hits[1]
      cy.cadastroUsuario(email, senha, nome,dadosInvalido.senhaInvalida);
      cy.retornoMensagem('#modalText', mensagem.messageErroSenha);
    });
  })
})