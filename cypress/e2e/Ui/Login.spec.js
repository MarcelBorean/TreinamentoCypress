/// <reference types="cypress" />

describe('TCD-3030 -> Login', () => {

    beforeEach(() => {
        cy.visit('login');
    });

    it('deve fazer login com sucesso', () => {
        //arrange        
        cy.get('[data-test="login-email"] > .MuiInputBase-root > .MuiInputBase-input')
            .type('MDFFDTE@GMAIL.COM');
        cy.get('[data-test="login-password"] > .MuiInputBase-root > .MuiInputBase-input')
            .type('teste01');

        //action
        cy.get('[data-test="login-submit"]')
            .click();

        //assert
        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo Marcel');
    });

    it('Senha Inválida', () => {
        //arrange        
        cy.login('MDFFDTE@GMAIL.COM', 'dddddd');

        //assert
        cy.get('[data-test="alert"]').should('contain', 'Credenciais inválidas');
    });
});