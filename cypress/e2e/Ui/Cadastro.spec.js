/// <reference types="cypress" />
const faker = require('faker-br');

describe('TCD-XXXX - Cadastro', () => {

    beforeEach(() => {
        cy.visit('cadastrar');
    });    

    it('Deve Fazer cadastro com sucesso', () => {        
        //arrange
        var nome = faker.internet.userName();
        
        cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input')
            .type(nome);
        cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input')
            .type(faker.internet.email());
        cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input')
            .type(123456);
        cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input')
            .type(123456);        

        //action
        cy.get('[data-test="register-submit"]')
            .click();

        //assert
        cy.get('[data-test="dashboard-welcome"]').should('contain', nome);
    });
});         