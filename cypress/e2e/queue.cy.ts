import { CircleStyles, button, circleInner, head, tail } from "../const";

describe("string page testing", () => {
  beforeEach(() => cy.visit("queue"));
  it('если в инпуте пусто - кнопка "Добавить" неактивна', () => {
    cy.get("input").eq(0).should("be.empty");
    cy.get(button).should("be.disabled");
  });
  it("добавление элемента в очередь работает корректно", () => {
    cy.get("input").type("10");
    cy.get("button").contains("Добавить").click();
    cy.get(circleInner)
      .eq(0)
      .and("contain", "10")
      .and("have.css", "border", CircleStyles.Changing);
    cy.get(head).eq(0).should("contain", "head");
    cy.get(tail).eq(0).should("contain", "tail");
    cy.get(circleInner)
      .eq(0)
      .should("have.css", "border", CircleStyles.Default);
    cy.get("input").type("1");
    cy.get("button").contains("Добавить").click();
    cy.get(circleInner)
      .eq(1)
      .and("contain", "1")
      .and("have.css", "border", CircleStyles.Changing);
    cy.get(tail).eq(0).should("not.contain", "tail");
    cy.get(tail).eq(1).should("contain", "tail");
    cy.get(circleInner)
      .eq(1)
      .should("have.css", "border", CircleStyles.Default);
    cy.get("input").type("2");
    cy.get("button").contains("Добавить").click();
    cy.get(circleInner)
      .eq(2)
      .and("contain", "2")
      .and("have.css", "border", CircleStyles.Changing);
    cy.get(tail).eq(1).should("not.contain", "tail");
    cy.get(tail).eq(2).should("contain", "tail");
    cy.get(circleInner)
      .eq(2)
      .should("have.css", "border", CircleStyles.Default);
    cy.get("input").type("3");
    cy.get("button").contains("Добавить").click();
    cy.get(circleInner)
      .eq(3)
      .and("contain", "3")
      .and("have.css", "border", CircleStyles.Changing);
    cy.get(tail).eq(2).should("not.contain", "tail");
    cy.get(tail).eq(3).should("contain", "tail");
    cy.get(circleInner)
      .eq(3)
      .should("have.css", "border", CircleStyles.Default);
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
    cy.get(circleInner)
      .eq(0)
      .and("contain", "10")
      .and("have.css", "border", CircleStyles.Changing);
    cy.get(head).eq(0).should("contain", "head");
    cy.get(circleInner)
      .eq(0)
      .and("contain", "")
      .and("have.css", "border", CircleStyles.Default);
    cy.get(head).eq(0).should("not.contain", "head");
    cy.get(head).eq(1).should("contain", "head");
    cy.get("button").eq(2).click();
    cy.get(circleInner)
      .eq(1)
      .and("contain", "10")
      .and("have.css", "border", CircleStyles.Changing);
    cy.get(circleInner)
      .eq(1)
      .and("contain", "")
      .and("have.css", "border", CircleStyles.Default);
    cy.get(head).eq(1).should("not.contain", "head");
    cy.get(head).eq(2).should("contain", "head");
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
    cy.get(circleInner).each((element, index) => {
      if (index < 4) {
        cy.wrap(element).should("contain", "10");
      } else {
        cy.wrap(element).within(() => {
          cy.get("p").should("be.empty");
        });
      }
    });
    cy.get("button").eq(3).click();
    cy.get(circleInner).each((element, index) => {
      cy.wrap(element).within(() => {
        cy.get("p").should("be.empty");
      });
    });
  });
});
