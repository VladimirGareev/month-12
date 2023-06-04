import { should } from "chai";
import { CircleStyles, button, circleInner } from "../const";

describe("string page testing", () => {
  beforeEach(() => cy.visit("recursion"));
  it('если в инпуте пусто - кнопка "Развернуть" неактивна', () => {
    cy.get("input").should("be.empty");
    cy.get(button).should("be.disabled");
  });

  it("проверка работы алгоритма разворота строки", () => {
    cy.get("input").type("12345");
    cy.get(button).click();
    cy.get(circleInner)
      .should("have.length", 5)
      .each((element, index) => {
        cy.wrap(element)
          .should("contain", `${index + 1}`)
          .and("have.css", "border", CircleStyles.Default);
      });
    cy.get(circleInner).each((element, index) => {
      if (index === 0 || index === 4) {
        cy.wrap(element).should(
          "have.css",
          "border",
          CircleStyles.Changing
        );
      }
    });
    cy.get(circleInner).each((element, index) => {
      if (index === 0 || index === 4) {
        cy.wrap(element).should(
          "have.css",
          "border",
          CircleStyles.Modified
        );
      }
    });
    cy.get(circleInner).each((element, index) => {
      if (index === 0) {
        cy.wrap(element).should("contain", `5`);
      }
      if (index === 4) {
        cy.wrap(element).should("contain", `1`);
      }
    });
    cy.get(circleInner).each((element, index) => {
      if (index === 1 || index === 3) {
        cy.wrap(element).should(
          "have.css",
          "border",
          CircleStyles.Changing
        );
      }
    });
    cy.get(circleInner).each((element, index) => {
      if (index === 1 || index === 3) {
        cy.wrap(element).should(
          "have.css",
          "border",
          CircleStyles.Modified
        );
      }
    });
    cy.get(circleInner).each((element, index) => {
      if (index === 1) {
        cy.wrap(element).should("contain", `4`);
      }
      if (index === 3) {
        cy.wrap(element).should("contain", `2`);
      }
    });
    cy.get(circleInner).each((element, index) => {
      if (index === 2) {
        cy.wrap(element).should(
          "have.css",
          "border",
          CircleStyles.Changing
        );
      }
    });
    cy.get(circleInner).each((element, index) => {
      if (index === 2) {
        cy.wrap(element).should(
          "have.css",
          "border",
          CircleStyles.Modified
        );
      }
    });
    cy.get(circleInner).each((element, index) => {
      if (index === 2) {
        cy.wrap(element).should("contain", `3`);
      }
    });
  });
});
