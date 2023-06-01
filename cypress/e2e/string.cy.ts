import { should } from "chai"

describe ("string page testing", ()=>{
    beforeEach(()=>(cy.visit('http://localhost:3000/recursion')))
    it('если в инпуте пусто - кнопка "Развернуть" неактивна',()=>{
        cy.get('input').should("be.empty");
        cy.get('[data-testid="button"]').should('be.disabled')
    })

    it('проверка работы алгоритма разворота строки',()=>{
        cy.get('input').type('12345')
        cy.get('[data-testid="button"]').click();
        cy.get('[data-testid="small"]').should('have.length', 5)
        .each((element, index)=>{
            cy.wrap(element)
            .should('contain',`${index+1}`)
            .and("have.css","border", "4px solid rgb(0, 50, 255)");
        });
        cy.get('[data-testid="small"]').each((element, index)=>{
            if (index === 0||index=== 4) {
                cy.wrap(element).should("have.css", "border","4px solid rgb(210, 82, 225)")
            }
        })
        cy.get('[data-testid="small"]').each((element, index)=>{
            if (index === 0||index=== 4) {
                cy.wrap(element).should("have.css", "border","4px solid rgb(127, 224, 81)")
            }
        })
        cy.get('[data-testid="small"]').each((element, index)=>{
            if (index === 0) {
                cy.wrap(element).should('contain',`5`);
            }
            if (index === 4) {
                cy.wrap(element).should('contain',`1`);
            }
        })
        cy.get('[data-testid="small"]').each((element, index)=>{
            if (index === 1||index=== 3) {
                cy.wrap(element).should("have.css", "border","4px solid rgb(210, 82, 225)")
            }
        })
        cy.get('[data-testid="small"]').each((element, index)=>{
            if (index === 1||index=== 3) {
                cy.wrap(element).should("have.css", "border","4px solid rgb(127, 224, 81)")
            }
        })
        cy.get('[data-testid="small"]').each((element, index)=>{
            if (index === 1) {
                cy.wrap(element).should('contain',`4`);
            }
            if (index === 3) {
                cy.wrap(element).should('contain',`2`);
            }
        })
        cy.get('[data-testid="small"]').each((element, index)=>{
            if (index === 2) {
                cy.wrap(element).should("have.css", "border","4px solid rgb(210, 82, 225)")
            }
        })
        cy.get('[data-testid="small"]').each((element, index)=>{
            if (index === 2) {
                cy.wrap(element).should("have.css", "border","4px solid rgb(127, 224, 81)")
            }
        })
        cy.get('[data-testid="small"]').each((element, index)=>{
            if (index === 2) {
                cy.wrap(element).should('contain',`3`);
            }
        })
    })
})