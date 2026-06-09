import dadosInvalido  from "../../fixtures/dadosInvalidos.json";
import mensagem from "../../fixtures/mensagens.json";

describe('CT 002 - Login', () => {
  const sletorMessagemError = '#modalText';
  const seletorEmailInvalido = '.kOeYBn > .input__warging';
  const seletorBoasVindas = '.home__ContainerText-sc-1auj767-7';

  beforeEach(() => {
    cy.generateFixture();
    cy.fixture('usuarios.json').as('usuariosData');
  })
  
  it('Test 01 - Login com dados Não cadastrados', () => {
      cy.login(dadosInvalido.emailInvalido, dadosInvalido.senhaInvalida);
      cy.retornoMensagem(seletorEmailInvalido, mensagem.messageErroEmail);
    })

    it('Test 02 - Login com senha inválida', () => {
      cy.get('@usuariosData').then((usuariosData) => {
        const {email, nome, senha} = usuariosData.hits[0];
        cy.cadastroUsuario(email, senha, nome, senha);
        cy.login(email, dadosInvalido.senhaInvalida);
      })
        cy.retornoMensagem(sletorMessagemError, mensagem.mensagemErroLogin);
      })

    it('Test 03 - Login com Sucesso', () => {
      cy.get('@usuariosData').then((usuariosData) => {
        const {email, senha, nome} = usuariosData.hits[0];
        cy.log('email:' + email)
        cy.log('senha: '+ senha)
        cy.cadastroUsuario(email, nome, senha, senha);
        cy.login(email, senha);
      })
        cy.retornoMensagem(seletorBoasVindas, mensagem.messageBemVindoAoBanco );
      })
  })