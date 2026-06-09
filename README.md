# 🐛 BugBank — Automação de Testes com Cypress

[![Node Version](https://img.shields.io/badge/node-v20.x-green)](https://nodejs.org/)
[![Cypress Version](https://img.shields.io/badge/cypress-13.14.1-blue)](https://www.cypress.io/)

> Projeto de automação de testes End-to-End (E2E) desenvolvido para a aplicação [BugBank](https://bugbank.netlify.app/) utilizando Cypress.

O objetivo deste projeto é validar os principais fluxos da aplicação, incluindo cadastro, autenticação e transferências bancárias, garantindo que as funcionalidades atendam aos comportamentos esperados.

Além da automação dos cenários de teste, o projeto conta com geração de evidências e relatórios através do Allure Report, proporcionando maior rastreabilidade e visibilidade dos resultados obtidos durante as execuções.  utilizando Cypress, com relatórios gerados pelo Allure Report.

---

##  Relatório de Testes

🔗 [Ver Relatório Allure](https://bruna270498.github.io/QA-Projeto-Cypress/)

---

##  Estrutura do Projeto

```
📦 projeto
├── 📁 cypress
│   ├── 📁 e2e
│   │   ├── CadastroUsuario.spec.cy.js
│   │   ├── Login.spec.cy.js
│   │   └── Transferencia.spec.cy.js
│   ├── 📁 fixtures
│   │   ├── dadosInvalidos.json
│   │   ├── mensagens.json
│   │   └── usuarios.json
│   └── 📁 support
│       ├── 📁 pages
│       ├── commands.js
│       └── e2e.js
├── .github/
│   └── workflows/
│       └── cypress.yml
├── cypress.config.js
├── package.json
└── README.md
```

---

##  Casos de Teste — BDD

### CT 001 — Cadastro de Usuário

---

**Test 01 — Cadastro realizado com sucesso**

```gherkin
Feature: Cadastro de Usuário
  Scenario: Cadastro realizado com sucesso
    Given que o usuário acessa a página de cadastro do BugBank
    When preenche os campos de nome, e-mail e senha com dados válidos
    And confirma a senha corretamente
    And clica no botão de cadastrar
    Then o sistema deve cadastrar o usuário com sucesso
```

---

**Test 02 — Cadastro realizado com saldo**

```gherkin
  Scenario: Cadastro realizado com saldo inicial
    Given que o usuário acessa a página de cadastro do BugBank
    When preenche os campos de nome, e-mail e senha com dados válidos
    And ativa a opção de criar conta com saldo
    And clica no botão de cadastrar
    Then o sistema deve cadastrar o usuário com saldo disponível na conta
```

---

**Test 03 — Cadastro com e-mail inválido**

```gherkin
  Scenario: Cadastro com e-mail inválido
    Given que o usuário acessa a página de cadastro do BugBank
    When preenche o campo de e-mail com um valor inválido
    And preenche os demais campos corretamente
    And clica no botão de cadastrar
    Then o sistema deve exibir mensagem de erro de e-mail inválido
```

---

**Test 04 — Cadastro com senhas diferentes**

```gherkin
  Scenario: Cadastro com senhas não correspondentes
    Given que o usuário acessa a página de cadastro do BugBank
    When preenche os campos de nome e e-mail com dados válidos
    And informa senhas diferentes nos campos de senha e confirmação
    And clica no botão de cadastrar
    Then o sistema deve exibir mensagem de erro informando que as senhas não coincidem
```

---

### CT 002 — Login

---

**Test 01 — Login com dados não cadastrados**

```gherkin
Feature: Login
  Scenario: Login com dados não cadastrados
    Given que o usuário acessa a página de login do BugBank
    When preenche o campo e-mail com um e-mail inválido
    And preenche o campo senha com uma senha inválida
    And clica no botão de entrar
    Then o sistema deve exibir mensagem de erro de e-mail inválido
```

---

**Test 02 — Login com senha inválida**

```gherkin
  Scenario: Login com senha inválida
    Given que o usuário possui cadastro ativo no BugBank
    When acessa a página de login
    And informa o e-mail cadastrado corretamente
    And informa uma senha incorreta
    And clica no botão de entrar
    Then o sistema deve exibir mensagem de erro de credenciais inválidas
```

---

**Test 03 — Login com sucesso**

```gherkin
  Scenario: Login com sucesso
    Given que o usuário possui cadastro ativo no BugBank
    When acessa a página de login
    And preenche e-mail e senha cadastrados corretamente
    And clica no botão de entrar
    Then o sistema deve redirecionar para a página inicial
    And exibir mensagem de boas-vindas ao banco
```

---

### CT 003 — Transferência

---

**Test 01 — Transferência com sucesso**

```gherkin
Feature: Transferência
  Scenario: Transferência realizada com sucesso
    Given que dois usuários estão cadastrados no BugBank
    And o usuário destino possui número de conta válido
    And o usuário origem está logado e possui saldo suficiente
    When acessa a tela de transferência
    And informa o número e dígito da conta destino
    And informa o valor de R$ 100,00
    And clica no botão transferir
    Then o sistema deve exibir mensagem de transferência realizada com sucesso
```

---

**Test 02 — Transferência para conta inexistente**

```gherkin
  Scenario: Transferência para conta inexistente
    Given que o usuário está logado no BugBank
    When acessa a tela de transferência
    And informa o número de conta "111" e dígito "9" inexistentes
    And informa o valor de R$ 100,00
    And clica no botão transferir
    Then o sistema deve exibir mensagem de conta inválida
```

---

**Test 03 — Transferência com saldo insuficiente**

```gherkin
  Scenario: Transferência com saldo insuficiente
    Given que o usuário está logado no BugBank sem saldo suficiente
    When acessa a tela de transferência
    And informa uma conta destino válida
    And informa o valor de R$ 1.500,00
    And clica no botão transferir
    Then o sistema deve exibir mensagem de saldo insuficiente
```

---

**Test 04 — Transferência com descrição**

```gherkin
  Scenario: Transferência com descrição
    Given que o usuário está logado no BugBank com saldo disponível
    When acessa a tela de transferência
    And informa uma conta destino válida
    And informa o valor de R$ 800,00
    And preenche o campo de descrição da transferência
    And clica no botão transferir
    Then o sistema deve exibir mensagem de transferência realizada com sucesso
```

---

##  Matriz de Riscos

 Funcionalidade      | Risco                                                                                    | Probabilidade | Impacto | Nível    | Mitigação                                                              |
 ------------------- | ---------------------------------------------------------------------------------------- | ------------- | ------- | -------- | ---------------------------------------------------------------------- |
 Cadastro de Usuário | Usuários conseguirem se cadastrar com e-mails inválidos                                  | Média         | Alto    | 🔴 Alto  | Validar formatos inválidos durante os testes de cadastro               |
 Cadastro de Usuário | Cadastro aceitar senhas que não atendem aos critérios mínimos de segurança               | Alta          | Médio   | 🟡 Médio | Validar regras de complexidade e tamanho mínimo da senha               |
Login               | Usuários conseguirem realizar várias tentativas de acesso sem restrição                  | Média         | Alto    | 🔴 Alto  | Verificar limite de tentativas e mensagens de bloqueio                 |
 Login               | Sessão permanecer ativa por tempo excessivo após inatividade                             | Baixa         | Médio   | 🟡 Médio | Validar expiração automática da sessão                                 |
 Transferência       | Não ser possível concluir transferências devido à ausência dos dados da conta de destino | Alta          | Alto    | 🔴 Alto  | Corrigir a obtenção dos dados da conta e validar o fluxo completo      |
 Transferência       | Sistema permitir transferências com valores inválidos (zero ou negativos)                | Média         | Alto    | 🔴 Alto  | Criar cenários para validação de valores inválidos                     |
 Transferência       | Saldo exibido ao usuário não refletir corretamente a transferência realizada             | Baixa         | Alto    | 🟡 Médio | Validar atualização do saldo após a operação                           |
 Transferência       | Uma mesma transferência ser processada mais de uma vez por ação repetida do usuário      | Média         | Alto    | 🔴 Alto  | Validar proteção contra envios duplicados                              |
 Disponibilidade     | Aplicação ficar indisponível para os usuários                                            | Baixa         | Alto    | 🟡 Médio | Monitorar disponibilidade e incluir verificações de saúde da aplicação |
 Dados de Teste      | Massa de dados reutilizada causar interferência entre execuções de testes                | Baixa         | Médio   | 🟢 Baixo | Garantir geração de dados únicos para cada execução                    |


### Legenda

| Nível      | Critério                          |
|------------|-----------------------------------|
| 🔴 Alto    | Probabilidade × Impacto elevados  |
| 🟡 Médio   | Risco controlável com atenção     |
| 🟢 Baixo   | Pouco impacto ou improvável       |

---

## 🔴 Bugs Encontrados

### BUG-001 — Transferência com sucesso falha ao digitar número de conta

| Campo          | Detalhe                                                                   |
| -------------- | ------------------------------------------------------------------------- |
| **Cenário**    | CT 003 - Test 01 - Transferência com sucesso                              |
| **Erro**       | Transferência não realizada devido à falta do número da conta de destino. |
| **Causa**      | O número da conta não foi disponibilizado durante a execução do fluxo.    |
| **Severidade** | 🔴 Alta — impede a conclusão da transferência.                            |


---

## 📈 Resultado Geral

| Suite                  | Total | ✅ Pass | ❌ Fail | Taxa    |
|------------------------|-------|---------|---------|---------|
| CT 001 - Cadastro      | 4     | 4       | 0       | 100%    |
| CT 002 - Login         | 3     | 3       | 0       | 100%    |
| CT 003 - Transferência | 4     | 3       | 1       | 75%     |
| **Total**              | **11**| **10**  | **1**   | **91%** |

---

## Como Executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18+
- [Google Chrome](https://www.google.com/chrome/)
- [Allure CLI](https://docs.qameta.io/allure/) `npm install -g allure-commandline`

### Instalação

```bash
# Clonar o repositório
git clone git@github.com:bruna270498/QA-Projeto-Cypress.git

# Instalar dependências
npm install
```

### Comandos disponíveis

```bash
# Abrir interface visual do Cypress
npm run cy:open

# Rodar todos os testes headless
npm run cy:run

# Rodar todos os testes com browser visível
npm run cy:run:browser

# Rodar um teste específico
npm run cy:run:test -- "cypress/e2e/Login.spec.cy.js"

# Rodar testes e gerar + abrir relatório Allure
npm run allure:run
```

---

## Tecnologias

| Tecnologia                    | Versão   | Uso                               |
|-------------------------------|----------|-----------------------------------|
| Cypress                       | 13.14.1  | Framework de testes E2E           |
| @faker-js/faker               | 8.4.1    | Geração de dados dinâmicos        |
| @shelex/cypress-allure-plugin | latest   | Integração com Allure Report      |
| allure-commandline            | latest   | Geração do relatório HTML         |


