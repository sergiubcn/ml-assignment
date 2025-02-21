import { UIElements } from "../types";

const subscribersPageElements: UIElements = {
  subscriberAnchor: () => cy.get("a[href*=subscribers]"),
  subscribersFilterDropdown: () => cy.get("[data-test-id=dropdown-button]"),
  subscribersFilterOption: () =>
    cy.get("button[data-test-id=dropdown-list-item]"),
  subscribersTable: () => cy.get("#subscribers"),
};

/**
 * Represents the available elements and interactions on the Subscribers page.
 * @returns An object with access to the elements and interactions.
 */
export const subscribersPage = () => ({
  /**
   * Retrieves a list of unsubscriber emails from the listing table.
   * @returns A list of unsubscriber anchors.
   */
  getUnsubscribers: (): Cypress.Chainable<JQuery<HTMLElement>> => {
    subscribersPageElements.subscribersFilterDropdown().click();
    // Ideally we'd use a unique test-id instead of repeating ones.
    subscribersPageElements
      .subscribersFilterOption()
      .contains("Unsubscribed")
      .click();
    return subscribersPageElements
      .subscribersTable()
      .within(() => subscribersPageElements.subscriberAnchor());
  },
});
