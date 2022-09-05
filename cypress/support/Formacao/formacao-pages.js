class FormacaoPage {

    //campos
    get #escola      () { return cy.get('[data-test="education-school"]'); }
    get #grau        () { return cy.get('[data-test="education-degree"]'); }
    get #curso       () { return cy.get('[data-test="education-fieldOfStudy"]'); }
    get #dataInicio  () { return cy.get('[data-test="education-from"]'); }
    get #chkCursando () { return cy.get('[data-test="education-current"] > span > input'); }
    get #dataFim     () { return cy.get('[data-test="education-to"]'); }
    get #descricao   () { return cy.get('[data-test="education-description"]'); }    

    //botões
    get #btnAdicionar  () { return cy.get('[data-test="education-submit"]'); }    

    addFormacao(escola, grau, curso, dataInicio, dataFim, descricao, valida = true, submit = true) {

        this.#escola.type(escola);
        this.#grau.type(grau);
        this.#curso.type(curso);
        this.#dataInicio.type(dataInicio);        
        this.#descricao.type(descricao);

        if (dataFim != null) {
            this.#dataFim.type(dataFim);
        }

        if (!valida) {
            this.#escola.clear();
        }

        if (submit) {
            this.#btnAdicionar.click();
        }
    }

    addFormacaoAtual(escola, grau, curso, dataInicio, descricao, valida = true) {
       
        this.addFormacao(escola, grau, curso, dataInicio, null, descricao, valida, false);
        
        this.#chkCursando.check();

        this.#btnAdicionar.click();
    }    
}

module.exports = new FormacaoPage()