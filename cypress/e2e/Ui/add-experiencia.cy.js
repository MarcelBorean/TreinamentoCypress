/// <reference types="cypress" />

const experienciaPage = require('../../support/Experiencia/experiencia-pages');

describe('Funcionalidade: Adicionar experiência', () => {

    beforeEach(() => {
        cy.fixture("usuarios").then((usuarios) => {
            cy.visit('login');
            cy.login(usuarios[0].email, usuarios[0].senha);
        });        
    });

    it('Deve adicionar uma experiencia com sucesso', () => {        
        //arrange        
        var experienciasExistentes = 0;
        cy.get('#root > .container > .table')
            .first()
            .find('tr')
            .its('length')
            .then(n => {
                experienciasExistentes += n;
            });         
        cy.visit('adicionar-experiencia');    
        
        //act
        experienciaPage.addExperienciaAtual("Dev Baixa", "Via", "Home Office", "01/01/2021", "Desenvolvedor .Net Senior." );        

        //assert        
        cy.get('#root > .container > .table')
            .first()
            .find('tr')
            .its('length')
            .should('be.gt', experienciasExistentes);
        
    });

    it('Não deve adicionar uma experiencia com sucesso (Posição requerida)', () => {        
        //arrange        
        var experienciasExistentes = 0;
        cy.get('#root > .container > .table')
            .first()
            .find('tr')
            .its('length')
            .then(n => {
                experienciasExistentes += n;
            });         
        cy.visit('adicionar-experiencia');    
        
        //act
        experienciaPage.addExperienciaAtual("Dev Baixa", "Via", "Home Office", "01/01/2021", "Desenvolvedor .Net Senior.", false);        

        //assert        
        cy.get('.MuiFormHelperText-root').should("contain", "Posição é obrigatória")
        
    });

});

//npx cypress open