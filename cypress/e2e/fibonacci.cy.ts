describe("string page testing", () => {
  beforeEach(() => cy.visit("http://localhost:3000/fibonacci"));
  it('если в инпуте пусто - кнопка "Развернуть" неактивна', () => {
    cy.get("input").should("be.empty");
    cy.get('[data-testid="button"]').should("be.disabled");
  });
  it("проверка генерации чисел Фибоначчи", () => {
    cy.get("input").type("5");
    cy.get("button").contains("Развернуть").click();

    cy.get('[data-testid="small"]')
      .should("have.length", 1)
      .and("contain", "1");
    cy.get('[data-testid="small"]')
      .should("have.length", 2)
      .each((element, index) => {
        if (index === 0 || index === 1) {
          cy.wrap(element).contains("1");
        }
      });
    cy.get('[data-testid="small"]')
      .should("have.length", 3)
      .each((element, index) => {
        if (index === 0 || index === 1) {
          cy.wrap(element).contains("1");
        }
        if (index === 2) {
          cy.wrap(element).contains("2");
        }
      });
    cy.get('[data-testid="small"]')
      .should("have.length", 4)
      .each((element, index) => {
        if (index === 0 || index === 1) {
          cy.wrap(element).contains("1");
        }
        if (index === 2) {
          cy.wrap(element).contains("2");
        }
        if (index === 3) {
          cy.wrap(element).contains("3");
        }
      });
    cy.get('[data-testid="small"]')
      .should("have.length", 5)
      .each((element, index) => {
        if (index === 0 || index === 1) {
          cy.wrap(element).contains("1");
        }
        if (index === 2) {
          cy.wrap(element).contains("2");
        }
        if (index === 3) {
          cy.wrap(element).contains("3");
        }
        if (index === 4) {
          cy.wrap(element).contains("5");
        }
      });
  });
});
