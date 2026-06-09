import mensagem from "../../fixtures/mensagens.json";

describe('CT 003 - Transferencia', () => {

    const btnEntrarTransferencia = '#btn-TRANSFERÊNCIA';
    const btnSairConta = '.home__ContainerLink-sc-1auj767-2';
    const btnTransferir = '.style__ContainerButton-sc-1wsixal-0';
    const mesagemModal = '#modalText';
    const elementValor = '.styles__ContainerFormTransfer-sc-1oow0wh-0 > :nth-child(2) > .input__default';
    const elementNumeroConta = ':nth-child(1) > .input__default';
    const elementDescricao = ':nth-child(3) > .input__default';
    const elementDigConta = '.account__data > :nth-child(2) > .input__default';
    

    beforeEach(() => {
        cy.generateFixture();
        cy.fixture('usuarios.json').as('usuariosData');
      
        cy.get('@usuariosData').then((usuariosData) => {
          const toggleSaldo = [false, true];
          usuariosData.hits.forEach((usuario, index) => {
            const { email, senha, nome } = usuario;
            cy.cadastroUsuario(email, nome, senha, senha, toggleSaldo[index]);
          });
          const {email, senha} = usuariosData.hits[0];
          cy.login(email, senha);
        })
      })

    function pegarNumeroConta(){
        return cy.pegarTexto('#textAccountNumber > span')
        .then((conta) => {
            const [numero, digito] = conta.split("-");
            cy.wrap(numero).as("numeroConta");
            cy.wrap(digito).as("digitoConta");
        });
    }

    function preencherContDig() {
        cy.get('@numeroConta').then((numeroConta) => {
            cy.log('numero: '+ numeroConta)
            cy.preencherCampo(elementNumeroConta, numeroConta);
        });
        cy.get('@digitoConta').then((digitoConta) => {
            cy.log('digito: ' + digitoConta)
            cy.preencherCampo(elementDigConta, digitoConta);
        });
    }

    it('Test 01 - Transferencia com sucesso', () => {
        pegarNumeroConta();
        cy.clicarBtn(btnSairConta);
        cy.get('@usuariosData').then((usuariosData) => {
            const {email, senha} = usuariosData.hits[1];
            cy.login(email, senha)
        });
        cy.clicarBtn(btnEntrarTransferencia);
        preencherContDig();
        cy.preencherCampo(elementValor,100);
        cy.clicarBtn(btnTransferir);
        cy.retornoMensagem(mesagemModal, mensagem.messagemTransferencia);
    })

    
    it('Test 02 - Transferencia conta inexistente', () => {
        cy.clicarBtn(btnEntrarTransferencia);
        cy.preencherCampo(elementNumeroConta, '111');
        cy.preencherCampo(elementDigConta, '9');
        cy.preencherCampo(elementValor,100);
        cy.clicarBtn(btnTransferir);
        cy.retornoMensagem('#modalText', mensagem.messageContaInvalida);
    })

    it('Test 03 - Transferencia com saldo insuficiênte', () => {
        pegarNumeroConta();
        cy.clicarBtn(btnSairConta);
        cy.get('@usuariosData').then((usuariosData) => {
            const {email, senha} = usuariosData.hits[1];
            cy.login(email, senha)
        });
        cy.clicarBtn(btnEntrarTransferencia);
        preencherContDig();
        cy.preencherCampo(elementValor,1500);
        cy.clicarBtn(btnTransferir);
        cy.retornoMensagem(mesagemModal, mensagem.messageSemSaldo);
    })

    it('Test 04 - Transferencia com uma descrição', () => {
        pegarNumeroConta();
        cy.clicarBtn(btnSairConta);
        cy.get('@usuariosData').then((usuariosData) => {
            const {email, senha} = usuariosData.hits[1];
            cy.login(email, senha)
        });
        cy.clicarBtn(btnEntrarTransferencia);
        preencherContDig();
        cy.preencherCampo(elementValor,800);
        cy.preencherCampo(elementDescricao, mensagem.descricaoTransferencia);
        cy.clicarBtn(btnTransferir);
        cy.retornoMensagem(mesagemModal, mensagem.messagemTransferencia);
    })
})