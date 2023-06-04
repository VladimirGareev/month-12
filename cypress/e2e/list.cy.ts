import { CircleStyles, button, circle, circleInner, head, tail } from "../const";

describe("string page testing", () => {
  beforeEach(() => cy.visit("list"));

    it('если в инпуте текста пусто - кнопки "Добавить в head", "Добавить в Tail" и "Добавить по индексу" неактивны', () => {
      cy.get("input").eq(0).should("be.empty");
      cy.get(button).eq(0).should("be.disabled");
      cy.get(button).eq(1).should("be.disabled");
      cy.get(button).eq(4).should("be.disabled");
    });

    it('если в инпуте индекса пусто - кнопки "Добавить по индексу" и "Удалить по ндексу" неактивны', () => {
      cy.get("input").eq(1).should("be.empty");
      cy.get(button).eq(4).should("be.disabled");
      cy.get(button).eq(5).should("be.disabled");
      cy.get(button).eq(4).should("be.disabled");
    });

    it("проверка отрисовки дефолтного списка ARRAY", () => {
      cy.get(circleInner).should("have.length", 5);
      cy.get(circleInner).each((element, index) => {
        switch (index) {
          case 0:
            cy.wrap(element)
              .should("contain", "A")
              .get(head)
              .should("contain", "head");
            cy.wrap(element).get(tail).should("be.empty");
            break;
          case 1:
            cy.wrap(element)
              .should("contain", "R")
              .get(head)
              .should("be.empty");
            cy.wrap(element).get(tail).should("be.empty");
            break;
          case 2:
            cy.wrap(element)
              .should("contain", "R")
              .get(head)
              .should("be.empty");
            cy.wrap(element).get(tail).should("be.empty");
            break;
          case 3:
            cy.wrap(element)
              .should("contain", "A")
              .get(head)
              .should("be.empty");
            cy.wrap(element).get(tail).should("be.empty");
            break;
          case 4:
            cy.wrap(element)
              .should("contain", "Y")
              .get(head)
              .should("be.empty");
            cy.wrap(element)
              .get(tail)
              .should("contain", "tail");
            break;
        }
      });
    });

    it("проверка добавления элемента в HEAD", () => {
      cy.get("input").eq(0).type("S");
      cy.get(button).eq(0).click();
      cy.get(head)
        .eq(0)
        .within(() => {
          cy.get(circleInner)
            .should("contain", "S")
            .should("have.css", "border", CircleStyles.Changing);
        });
      cy.get(head).eq(0).should("contain", "head");
      cy.get(circleInner)
        .should("have.length", 6)
        .eq(0)
        .should("contain", "S");
    });

    it("проверка добавления элемента в TAIL", () => {
      cy.get("input").eq(0).type("S");
      cy.get(button).eq(1).click();
      cy.get(head)
        .eq(5)
        .within(() => {
          cy.get(circleInner)
            .should("contain", "S")
            .should("have.css", "border", CircleStyles.Changing);
        });
      cy.get(head).eq(5).should("be.empty");
      cy.get(circleInner)
        .should("have.length", 6)
        .eq(5)
        .should("contain", "S");
    });

    it("проверка добавления элемента по индексу", () => {
      cy.get("input").eq(0).type("S");
      cy.get("input").eq(1).type("2");
      cy.get(button).eq(4).click();
      cy.get(head)
        .eq(0)
        .within(() => {
          cy.get(circleInner)
            .should("contain", "S")
            .should("have.css", "border", CircleStyles.Changing);
        });
      cy.get(head)
        .eq(1)
        .within(() => {
          cy.get(circleInner)
            .should("contain", "S")
            .should("have.css", "border", CircleStyles.Changing);
        });
      cy.get(head)
        .eq(2)
        .within(() => {
          cy.get(circleInner)
            .should("contain", "S")
            .should("have.css", "border", CircleStyles.Changing);
        });
      cy.get(circle).eq(2).should("contain", "S");
      cy.get(circle).should("have.length", 6);
    });

    it("проверка удаления элемента из head", () => {
      cy.get(button).eq(2).click();
      cy.get(circle)
        .eq(0)
        .within(() => {
          cy.get("p").should("be.empty");
          cy.get(tail)
            .eq(0)
            .should("contain", "A")
            .within(() => {
              cy.get(circleInner).and(
                "have.css",
                "border",
                CircleStyles.Changing
              );
            });
        });
      cy.get(circle)
        .should("have.length", 4)
        .eq(0)
        .should("contain", "R").within(()=>{
          cy.get(head).should('contain', 'head');
        })
    });
    it("проверка удаления элемента из tail", () => {
      cy.get(button).eq(3).click();
      cy.get(circleInner)
        .eq(0)
        .should("have.css", "border", CircleStyles.Changing);
      cy.get(circleInner)
        .eq(1)
        .should("have.css", "border", CircleStyles.Changing);
      cy.get(circleInner)
        .eq(2)
        .should("have.css", "border", CircleStyles.Changing);
      cy.get(circleInner)
        .eq(3)
        .should("have.css", "border", CircleStyles.Changing);
      cy.get(circle)
        .eq(4)
        .within(() => {
          cy.get(tail)
            .eq(0)
            .should("contain", "Y")
            .within(() => {
              cy.get(circleInner).and(
                "have.css",
                "border",
                CircleStyles.Changing
              );
            });
          cy.get("p").should("be.empty");
        });
        cy.get(circle).should('have.length',4).eq(3).within(()=>{
          cy.get(tail).should('contain','tail');
        })
    });

  it("проверка удаления элемента по индексу", () => {
    cy.get("input").eq(1).type("2");
    cy.get(button).eq(5).click();
    cy.get(circleInner)
      .eq(0)
      .should("have.css", "border", CircleStyles.Changing);
    cy.get(circleInner)
      .eq(1)
      .should("have.css", "border", CircleStyles.Changing);
    cy.get(circle)
      .eq(2)
      .within(() => {
        cy.get(tail)
          .eq(0)
          .should("contain", "R")
          .within(() => {
            cy.get(circleInner).and(
              "have.css",
              "border",
              CircleStyles.Changing
            );
          });
        cy.get("p").should("be.empty");
      });
    cy.get(circle)
      .should("have.length", 4)
      .eq(2)
      .should("contain", "A");
  });
});
