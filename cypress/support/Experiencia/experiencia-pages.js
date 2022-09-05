class ExperienciaPage {

    //campos
    get #posicao    () { return cy.get('[data-test="experience-title"]'); }
    get #empresa    () { return cy.get('[data-test="experience-company"]'); }
    get #local      () { return cy.get('[data-test="experience-location"]'); }
    get #dataInicio () { return cy.get('[data-test="experience-from"]'); }
    get #chkAtual   () { return cy.get('[data-test="experience-current"] > span > input'); }
    get #dataFim    () { return cy.get('[data-test="experience-to"]'); }
    get #descricao  () { return cy.get('[data-test="experience-description"]'); }    

    //botões
    get #btnAdicionar  () { return cy.get('[data-test="experience-submit"]'); }    

    addExperiencia(posicao, empresa, local, dataInicio, dataFim, descricao) {

        this.#posicao.type(posicao);
        this.#empresa.type(empresa);
        this.#local.type(local);
        this.#dataInicio.type(dataInicio);
        this.#dataFim.type(dataFim);
        this.#descricao.type(descricao);

        this.#btnAdicionar.click();
    }

    addExperienciaAtual(posicao, empresa, local, dataInicio, descricao, valida = true) {
       
        this.#posicao.type(posicao);
        this.#empresa.type(empresa);
        this.#local.type(local);
        this.#dataInicio.type(dataInicio);
        this.#chkAtual.check();
        this.#descricao.type(descricao);
       
        if (!valida) {
            this.#posicao.clear();
        }

        this.#btnAdicionar.click();
    }

}

module.exports = new ExperienciaPage()