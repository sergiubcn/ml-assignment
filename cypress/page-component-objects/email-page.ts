import { UIElements } from "../types";

const emailPageElements: UIElements = {
  doneEditingButton: () => cy.get(".builder-header").get("btn-green"),
};

/**
 * Represents the available Email editing page elements and interactions.
 * @returns An object with access to elements and interactions.
 */
export const emailPage = () => ({
  /**
   * Ends the editing process.
   */
  // TODO(1): extend function with editing interactions as needed.
  // TODO(2): investigate why the iframe content isn't loading. All requests to https://groot.mailerlite.com return 404.
  editEmailDesignAndSubmit: (): void => {
    cy.get("iframe#content-builder-iframe")
      .its("0.contentDocument")
      .should("exist");
    cy.origin("https://groot.mailerlite.com", () => {
      // cy.reload();
      emailPageElements.doneEditingButton().click();
    });
    cy.intercept("*/campaigns*").as("getCampaigns");
    cy.wait("@getCampaigns", { timeout: 15000 });
  },
});
