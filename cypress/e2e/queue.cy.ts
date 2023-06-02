describe("string page testing", () => {
  beforeEach(() => cy.visit("http://localhost:3000/queue"));
  it('если в инпуте пусто - кнопка "Добавить" неактивна', () => {
    cy.get("input").eq(0).should("be.empty");
    cy.get('[data-testid="button"]').should("be.disabled");
  });
  it("добавление элемента в очередь работает корректно", () => {
    cy.get("input").type("10");
    cy.get("button").contains("Добавить").click();
    cy.get('[data-testid="small"]')
      .eq(0)
      .and("contain", "10")
      .and("have.css", "border", "4px solid rgb(210, 82, 225)");
    cy.get('[data-testid="head"]').eq(0).should("contain", "head");
    cy.get('[data-testid="tail"]').eq(0).should("contain", "tail");
    cy.get('[data-testid="small"]')
      .eq(0)
      .should("have.css", "border", "4px solid rgb(0, 50, 255)");
    cy.get("input").type("1");
    cy.get("button").contains("Добавить").click();
    cy.get('[data-testid="small"]')
      .eq(1)
      .and("contain", "1")
      .and("have.css", "border", "4px solid rgb(210, 82, 225)");
    cy.get('[data-testid="tail"]').eq(0).should("not.contain", "tail");
    cy.get('[data-testid="tail"]').eq(1).should("contain", "tail");
    cy.get('[data-testid="small"]')
      .eq(1)
      .should("have.css", "border", "4px solid rgb(0, 50, 255)");
    cy.get("input").type("2");
    cy.get("button").contains("Добавить").click();
    cy.get('[data-testid="small"]')
      .eq(2)
      .and("contain", "2")
      .and("have.css", "border", "4px solid rgb(210, 82, 225)");
    cy.get('[data-testid="tail"]').eq(1).should("not.contain", "tail");
    cy.get('[data-testid="tail"]').eq(2).should("contain", "tail");
    cy.get('[data-testid="small"]')
      .eq(2)
      .should("have.css", "border", "4px solid rgb(0, 50, 255)");
    cy.get("input").type("3");
    cy.get("button").contains("Добавить").click();
    cy.get('[data-testid="small"]')
      .eq(3)
      .and("contain", "3")
      .and("have.css", "border", "4px solid rgb(210, 82, 225)");
    cy.get('[data-testid="tail"]').eq(2).should("not.contain", "tail");
    cy.get('[data-testid="tail"]').eq(3).should("contain", "tail");
    cy.get('[data-testid="small"]')
      .eq(3)
      .should("have.css", "border", "4px solid rgb(0, 50, 255)");
  });
  it("удаление элементов работает корректно", () => {
    cy.get("input").type("10");
    cy.get("button").contains("Добавить").click();
    cy.get("input").type("10");
    cy.get("button").contains("Добавить").click();
    cy.get("input").type("10");
    cy.get("button").contains("Добавить").click();
    cy.get("input").type("10");
    cy.get("button").contains("Добавить").click();
    cy.get("input").type("10");
    cy.get("button").eq(2).click();
    cy.get('[data-testid="small"]')
      .eq(0)
      .and("contain", "10")
      .and("have.css", "border", "4px solid rgb(210, 82, 225)");
    cy.get('[data-testid="head"]').eq(0).should("contain", "head");
    cy.get('[data-testid="small"]')
      .eq(0)
      .and("contain", "")
      .and("have.css", "border", "4px solid rgb(0, 50, 255)");
    cy.get('[data-testid="head"]').eq(0).should("not.contain", "head");
    cy.get('[data-testid="head"]').eq(1).should("contain", "head");
    cy.get("button").eq(2).click();
    cy.get('[data-testid="small"]')
      .eq(1)
      .and("contain", "10")
      .and("have.css", "border", "4px solid rgb(210, 82, 225)");
    cy.get('[data-testid="small"]')
      .eq(1)
      .and("contain", "")
      .and("have.css", "border", "4px solid rgb(0, 50, 255)");
    cy.get('[data-testid="head"]').eq(1).should("not.contain", "head");
    cy.get('[data-testid="head"]').eq(2).should("contain", "head");
  });

  it('кнопка "Очистить" работает корректно', () => {
    cy.get("input").type("10");
    cy.get("button").contains("Добавить").click();
    cy.get("input").type("10");
    cy.get("button").contains("Добавить").click();
    cy.get("input").type("10");
    cy.get("button").contains("Добавить").click();
    cy.get("input").type("10");
    cy.get("button").contains("Добавить").click();
    cy.get('[data-testid="small"]').each((element, index) => {
      if (index < 4) {
        cy.wrap(element).should("contain", "10");
      } else {
        cy.wrap(element).within(() => {
          cy.get("p").should("be.empty");
        });
      }
    });
    cy.get("button").eq(3).click();
    cy.get('[data-testid="small"]').each((element, index) => {
      cy.wrap(element).within(() => {
        cy.get("p").should("be.empty");
      });
    });
  });
});
