describe("сайт запускается, роутинг работает", () => {
  it("сайт запускается на порте 3000", () => {
    cy.visit("/");
  });
  it("страница с разворотом строки открывается", () => {
    cy.visit("recursion");
    cy.get("button").contains("К оглавлению").click();
  });
  it("страница с числами фибоначчи открывается", () => {
    cy.visit("fibonacci");
    cy.get("button").contains("К оглавлению").click();
  });
  it("страница с сортировкой массива открывается", () => {
    cy.visit("sorting");
    cy.get("button").contains("К оглавлению").click();
  });
  it("страница со стаком открывается", () => {
    cy.visit("stack");
    cy.get("button").contains("К оглавлению").click();
  });
  it("страница с очередью открывается", () => {
    cy.visit("queue");
    cy.get("button").contains("К оглавлению").click();
  });
  it("страница со связным списком открывается", () => {
    cy.visit("list");
    cy.get("button").contains("К оглавлению").click();
  });
});
