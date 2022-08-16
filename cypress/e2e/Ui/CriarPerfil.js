/// <reference types="cypress" />

const faker = require('faker-br');

function getRandomInt(min, max){      
    return Math.floor(Math.random() * (max - min + 1)) + min;
} 

describe('PreencherPerfil', () => {

    context('Dado que crio um usuário', () => {
        it('Preencher Perfil com dados válidos deve resultar em sucesso', () => {
            
            //arrange
            var nome = faker.internet.userName();
            cy.criarUsuarioEAcessarPaginaDePerfil(nome, faker.internet.email(), faker.internet.password());            

            //act
            //exemplo pego em https://www.youtube.com/watch?v=JyaiwAokZBc
            cy.get('#status')
                .as('options')
                .its('length')
                .then(n => {
                    cy.get('@options')
                        .then($options => {
                            const randomOptionIndex = getRandomInt(0, n -1);
                            const randomOptionText = $options[randomOptionIndex].innerText;
                            cy.get('#mui-component-select-status').type(randomOptionText);
                            cy.get('[data-test="status-' + randomOptionIndex + '"]').click();
                        });                    
                });
            cy.get('[data-test="profile-company"] > .MuiInputBase-root > .MuiInputBase-input')
                .type(faker.company.companyName());
            cy.get('[data-test="profile-webSite"] > .MuiInputBase-root > .MuiInputBase-input')
                .type(faker.internet.url());
            cy.get('[data-test="profile-location"] > .MuiInputBase-root > .MuiInputBase-input')
                .type(faker.address.city() + ' - ' + faker.address.country());
            cy.get('[data-test="profile-skills"] > .MuiInputBase-root > .MuiInputBase-input')
                .type(faker.lorem.sentences());
            cy.get('[data-test="profile-gitHub"] > .MuiInputBase-root > .MuiInputBase-input')
                .type(faker.internet.userName());
            cy.get('[data-test="profile-bio"]')
                .type(faker.lorem.text());
            cy.get('[data-test="profile-submit"]').click();

            //assert
            cy.get('[data-test="alert"]').should('contain', 'Perfil Criado');
            cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo ' + nome);
        });   
        
        it('Preencher Perfil Campo Conhecimentos vazio deve resultar em erro', () => {            
            //arrange
            var nome = faker.internet.userName();
            cy.criarUsuarioEAcessarPaginaDePerfil(nome, faker.internet.email(), faker.internet.password());            

            //act            
            cy.get('[data-test="profile-submit"]').click();

            //assert
            cy.get('.MuiFormHelperText-root').should('contain', 'Conhecimentos é obrigatório');
        }); 
        
        it('Preencher Perfil com url inválida deve resultar em erro', () => {
            //arrange
            var nome = faker.internet.userName();
            cy.criarUsuarioEAcessarPaginaDePerfil(nome, faker.internet.email(), faker.internet.password());            

            //act
            //exemplo pego em https://www.youtube.com/watch?v=JyaiwAokZBc
            cy.get('#status')
                .as('options')
                .its('length')
                .then(n => {
                    cy.get('@options')
                        .then($options => {
                            const randomOptionIndex = getRandomInt(0, n -1);
                            const randomOptionText = $options[randomOptionIndex].innerText;
                            cy.get('#mui-component-select-status').type(randomOptionText);
                            cy.get('[data-test="status-' + randomOptionIndex + '"]').click();
                        });                    
                });
            cy.get('[data-test="profile-company"] > .MuiInputBase-root > .MuiInputBase-input')
                .type(faker.company.companyName());
            cy.get('[data-test="profile-webSite"] > .MuiInputBase-root > .MuiInputBase-input')
                .type('urlinválida.com');
            cy.get('[data-test="profile-location"] > .MuiInputBase-root > .MuiInputBase-input')
                .type(faker.address.city() + ' - ' + faker.address.country());
            cy.get('[data-test="profile-skills"] > .MuiInputBase-root > .MuiInputBase-input')
                .type(faker.lorem.sentences());
            cy.get('[data-test="profile-gitHub"] > .MuiInputBase-root > .MuiInputBase-input')
                .type(faker.internet.userName());
            cy.get('[data-test="profile-bio"]')
                .type(faker.lorem.text());
            cy.get('[data-test="profile-submit"]').click();

            //assert
            cy.get('.MuiFormHelperText-root').should('contain', 'Digite uma url válida');
        });  
    });
});