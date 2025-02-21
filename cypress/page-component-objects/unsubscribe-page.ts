import { UIElements } from "../types";

const unsubscribePageElements: UIElements = {
  optOutLink: () => cy.get("optout_link"),
};

/**
 * Represents the available elements and interactions on the Unsubscribe page.
 * @returns An object with access to the elements and interactions.
 */
export const unsubscribePage = () => ({
  /**
   * Confirms the unsubscription action.
   */
  unsubscribe: (): void => {
    unsubscribePageElements.optOutLink().click();
  },
});
