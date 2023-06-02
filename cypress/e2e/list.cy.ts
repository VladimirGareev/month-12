describe("string page testing", () => {
    beforeEach(() => cy.visit("http://localhost:3000/list"));

    it('если в инпуте текста пусто - кнопки "Добавить в head", "Добавить в Tail" и "Добавить по индексу" неактивны', () => {
      cy.get("input").eq(0).should("be.empty");
      cy.get('[data-testid="button"]').eq(0).should("be.disabled");
      cy.get('[data-testid="button"]').eq(1).should("be.disabled");
      cy.get('[data-testid="button"]').eq(4).should("be.disabled");

    })

    it('если в инпуте индекса пусто - кнопки "Добавить по индексу" и "Удалить по ндексу" неактивны', () => {
      cy.get("input").eq(1).should("be.empty");
      cy.get('[data-testid="button"]').eq(4).should("be.disabled");
      cy.get('[data-testid="button"]').eq(5).should("be.disabled");
      cy.get('[data-testid="button"]').eq(4).should("be.disabled");
    });
    
    it('проверка отрисовки дефолтного списка ARRAY', () => {
        cy.get('[data-testid="small"]').should('have.length', 5);
        cy.get('[data-testid="small"]').each((element, index)=>{
            switch(index){
                case 0: 
                cy.wrap(element).should('contain', 'A').get('[data-testid="head"]').should('contain','head');
                cy.wrap(element).get('[data-testid="tail"]').should('be.empty');
                break;
                case 1: 
                cy.wrap(element).should('contain', 'R').get('[data-testid="head"]').should('be.empty');
                cy.wrap(element).get('[data-testid="tail"]').should('be.empty');
                break;
                case 2: 
                cy.wrap(element).should('contain', 'R').get('[data-testid="head"]').should('be.empty');
                cy.wrap(element).get('[data-testid="tail"]').should('be.empty');
                break;
                case 3: 
                cy.wrap(element).should('contain', 'A').get('[data-testid="head"]').should('be.empty');
                cy.wrap(element).get('[data-testid="tail"]').should('be.empty');
                break;
                case 4: 
                cy.wrap(element).should('contain', 'Y').get('[data-testid="head"]').should('be.empty');
                cy.wrap(element).get('[data-testid="tail"]').should('contain','tail');
                break;
            }
        })

  });

  
  it('проверка добавления элемента в HEAD', () => {
    cy.get("input").eq(0).type("S");
    cy.get('[data-testid="button"]').eq(0).click();
    cy.get('[data-testid="head"]').eq(0).within(()=>{
        cy.get('[data-testid="small"]').should('contain', 'S').should('have.css','border',"3.84px solid rgb(210, 82, 225)");
    })
    cy.get('[data-testid="head"]').eq(0).should('contain', 'head');
    cy.get('[data-testid="small"]').should('have.length', 6).eq(0).should('contain', 'S');
});

it('проверка добавления элемента в TAIL', () => {
    cy.get("input").eq(0).type("S");
    cy.get('[data-testid="button"]').eq(1).click();
    cy.get('[data-testid="head"]').eq(5).within(()=>{
        cy.get('[data-testid="small"]').should('contain', 'S').should('have.css','border',"3.84px solid rgb(210, 82, 225)");
    })
    cy.get('[data-testid="head"]').eq(5).should('be.empty');
    cy.get('[data-testid="small"]').should('have.length', 6).eq(5).should('contain', 'S');
});

it('проверка добавления элемента по индексу', () => {
    cy.get("input").eq(0).type("S");
    cy.get("input").eq(1).type("2");
    cy.get('[data-testid="button"]').eq(4).click();
    cy.get('[data-testid="head"]').eq(0).within(()=>{
        cy.get('[data-testid="small"]').should('contain', 'S').should('have.css','border',"3.84px solid rgb(210, 82, 225)");
    })
    cy.get('[data-testid="head"]').eq(1).within(()=>{
        cy.get('[data-testid="small"]').should('contain', 'S').should('have.css','border',"3.84px solid rgb(210, 82, 225)");
    })
    cy.get('[data-testid="head"]').eq(2).within(()=>{
        cy.get('[data-testid="small"]').should('contain', 'S').should('have.css','border',"3.84px solid rgb(210, 82, 225)");
    })
    cy.get('[data-testid="circle"]').eq(2).should('contain', 'S');
});

})
  