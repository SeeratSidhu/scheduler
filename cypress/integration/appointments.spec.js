const { CYCLIC_KEY } = require("@storybook/addon-actions/dist/constants");


describe("Appointments", () => {

  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("[data-testid=day]", "Monday");
  })

  it("should book an interview", () => {

    cy.get("[alt=Add]")
      .first()
      .click();
    
    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones");

    cy.get("[alt='Sylvia Palmer']")
      .click();

    cy.get("button").contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });
});