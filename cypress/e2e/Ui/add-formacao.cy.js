/// <reference types="cypress" />

const formacaoPage = require('../../support/Formacao/formacao-pages');

describe('Funcionalidade: Adicionar formação', () => {

    beforeEach(() => {
        cy.fixture("usuarios").then((usuarios) => {
            cy.visit('login');
            cy.login(usuarios[0].email, usuarios[0].senha);
        });        
    });

    it('Deve adicionar uma formação com sucesso', () => {        
        //arrange        
        var formacoesExistentes = 0;
        cy.get('#root > .container > .table')
            .eq(1)
            .find('tr')
            .its('length')
            .then(n => {
                formacoesExistentes += n;
            });         
        cy.visit('adicionar-formacao');    
        
        //act
        formacaoPage.addFormacao("Faculdade Focus", "pós", "Pós graduação em Engenharia de Software", "01/01/2022", "01/12/2022", "Engenharia da Computação" );        

        //assert        
        cy.get('#root > .container > .table')
            .eq(1)
            .find('tr')
            .its('length')
            .should('be.gt', formacoesExistentes);
        
    });

    it('Não deve adicionar uma formação com sucesso (Escola requerida)', () => {        
        //arrange               
        cy.visit('adicionar-formacao');    
        
        //act
        formacaoPage.addFormacaoAtual("Faculdade Focus", "pós", "Pós graduação em Engenharia de Software", "01/01/2022", "Engenharia da Computação", false);        

        //assert        
        cy.get('.MuiFormHelperText-root').should("contain", "Escola é obrigatória")
        
    });

});

//npx cypress open