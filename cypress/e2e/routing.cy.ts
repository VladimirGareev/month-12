describe("сайт запускается, роутинг работает", () => {
  it("сайт запускается на порте 3000", () => {
    cy.visit("http://localhost:3000");
  });
  it("страница с разворотом строки открывается", () => {
    cy.visit("http://localhost:3000/recursion");
    cy.get("button").contains("К оглавлению").click();
  });
  it("страница с числами фибоначчи открывается", () => {
    cy.visit("http://localhost:3000/fibonacci");
    cy.get("button").contains("К оглавлению").click();
  });
  it("страница с сортировкой массива открывается", () => {
    cy.visit("http://localhost:3000/sorting");
    cy.get("button").contains("К оглавлению").click();
  });
  it("страница со стаком открывается", () => {
    cy.visit("http://localhost:3000/stack");
    cy.get("button").contains("К оглавлению").click();
  });
  it("страница с очередью открывается", () => {
    cy.visit("http://localhost:3000/queue");
    cy.get("button").contains("К оглавлению").click();
  });
  it("страница со связным списком открывается", () => {
    cy.visit("http://localhost:3000/list");
    cy.get("button").contains("К оглавлению").click();
  });
});
