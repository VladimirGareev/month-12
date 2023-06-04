import { CircleStyles, button, circle, circleInner, head, index, tail } from "../const";

describe("string page testing", () => {
  beforeEach(() => cy.visit("stack"));
  it('если в инпуте пусто - кнопка "Добавить" неактивна', () => {
    cy.get("input").eq(0).should("be.empty");
    cy.get(button).should("be.disabled");
  });
  it("добавление элемента в стэк работает корректно", () => {
    cy.get("input").type("10");
    cy.get("button").contains("Добавить").click();
    cy.get(circleInner)
      .should("have.length", 1)
      .and("contain", "10")
      .and("have.css", "border", CircleStyles.Changing);
    cy.get(head).should("contain", "top");
    cy.get(index).should("contain", "0");
    cy.get(circleInner).should(
      "have.css",
      "border",
      CircleStyles.Default
    );
    cy.get("input").type("1");
    cy.get("button").contains("Добавить").click();
    cy.get(circleInner)
      .should("have.length", 2)
      .eq(1)
      .should("contain", "1")
      .and("have.css", "border", CircleStyles.Changing);
    cy.get(circle).eq(0).should("not.contain", "top");
    cy.get(circle).eq(1).should("contain", "top");
    cy.get(index).each((element, index) => {
      cy.wrap(element).contains(`${index}`);
    });
  });

  it("удаление элемента работает корректно", () => {
    cy.get("input").type("10");
    cy.get("button").contains("Добавить").click();
    cy.get("input").type("1");
    cy.get("button").contains("Добавить").click();
    cy.get(circleInner)
      .should("have.length", 2)
      .eq(1)
      .should("contain", "1")
      .and("have.css", "border", CircleStyles.Default);
    cy.get("button").contains("Удалить").click();
    cy.get(circleInner)
      .eq(1)
      .should("have.css", "border", CircleStyles.Changing);
    cy.get(head)
      .should("have.length", 1)
      .and("contain", "top");
    cy.get("button").contains("Удалить").click();
    cy.get(circleInner).should(
      "have.css",
      "border",
      CircleStyles.Changing
    );
    cy.get(circleInner).should("not.exist");
  });
  it("кнопка очистить работает корректно", () => {
    cy.get(button).eq(2).should("be.disabled");
    cy.get("input").type("10");
    cy.get("button").contains("Добавить").click();
    cy.get(button).eq(2).should("not.be.disabled");
    cy.get("input").type("1");
    cy.get("button").contains("Добавить").click();
    cy.get(circleInner)
      .should("have.length", 2)
      .eq(1)
      .should("contain", "1")
      .and("have.css", "border", CircleStyles.Default);
    cy.get("button").contains("Очистить").click();
    cy.get(circleInner).should("not.exist");
    cy.get(button).eq(2).should("be.disabled");
  });
});
