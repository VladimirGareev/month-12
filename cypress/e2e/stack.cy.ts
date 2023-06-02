describe("string page testing", () => {
  beforeEach(() => cy.visit("http://localhost:3000/stack"));
  it('если в инпуте пусто - кнопка "Добавить" неактивна', () => {
    cy.get("input").eq(0).should("be.empty");
    cy.get('[data-testid="button"]').should("be.disabled");
  });
  it("добавление элемента в стэк работает корректно", () => {
    cy.get("input").type("10");
    cy.get("button").contains("Добавить").click();
    cy.get('[data-testid="small"]')
      .should("have.length", 1)
      .and("contain", "10")
      .and("have.css", "border", "4px solid rgb(210, 82, 225)");
    cy.get('[data-testid="head"]').should("contain", "top");
    cy.get('[data-testid="index"]').should("contain", "0");
    cy.get('[data-testid="small"]').should(
      "have.css",
      "border",
      "4px solid rgb(0, 50, 255)"
    );
    cy.get("input").type("1");
    cy.get("button").contains("Добавить").click();
    cy.get('[data-testid="small"]')
      .should("have.length", 2)
      .eq(1)
      .should("contain", "1")
      .and("have.css", "border", "4px solid rgb(210, 82, 225)");
    cy.get('[data-testid="circle"]').eq(0).should("not.contain", "top");
    cy.get('[data-testid="circle"]').eq(1).should("contain", "top");
    cy.get('[data-testid="index"]').each((element, index) => {
      cy.wrap(element).contains(`${index}`);
    });
  });

  it("удаление элемента работает корректно", () => {
    cy.get("input").type("10");
    cy.get("button").contains("Добавить").click();
    cy.get("input").type("1");
    cy.get("button").contains("Добавить").click();
    cy.get('[data-testid="small"]')
      .should("have.length", 2)
      .eq(1)
      .should("contain", "1")
      .and("have.css", "border", "4px solid rgb(0, 50, 255)");
    cy.get("button").contains("Удалить").click();
    cy.get('[data-testid="small"]')
      .eq(1)
      .should("have.css", "border", "4px solid rgb(210, 82, 225)");
    cy.get('[data-testid="head"]')
      .should("have.length", 1)
      .and("contain", "top");
    cy.get("button").contains("Удалить").click();
    cy.get('[data-testid="small"]').should(
      "have.css",
      "border",
      "4px solid rgb(210, 82, 225)"
    );
    cy.get('[data-testid="small"]').should("not.exist");
  });
  it("кнопка очистить работает корректно", () => {
    cy.get('[data-testid="button"]').eq(2).should("be.disabled");
    cy.get("input").type("10");
    cy.get("button").contains("Добавить").click();
    cy.get('[data-testid="button"]').eq(2).should("not.be.disabled");
    cy.get("input").type("1");
    cy.get("button").contains("Добавить").click();
    cy.get('[data-testid="small"]')
      .should("have.length", 2)
      .eq(1)
      .should("contain", "1")
      .and("have.css", "border", "4px solid rgb(0, 50, 255)");
    cy.get("button").contains("Очистить").click();
    cy.get('[data-testid="small"]').should("not.exist");
    cy.get('[data-testid="button"]').eq(2).should("be.disabled");
  });
});
