import { UIElements } from "../types";

const unsubscribeReasonPageElements: UIElements = {
  confirmUnsubscribeButton: () => cy.get(".unsubscribe-reason-save"),
  confirmUnsubscribeText: () => cy.get("#confirmedReasonMessage"),
  noLongerWantRadioButton: () => cy.get("#customRadio1"),
};

/**
 * Represents the available elements and interactions on the Unsubscribe reason page.
 * @returns An object with access to the elements and interactions.
 */
export const unsubscribeReasonPage = () => ({
  /**
   * Selects the "no longer want to receive" reason, confirms the action and waits for the confirmation text.
   */
  selectReasonAndUnsubscribe: (): void => {
    // The radio button seems to be covered by a hidden element.
    unsubscribeReasonPageElements.noLongerWantRadioButton().click({ force: true });
    unsubscribeReasonPageElements.confirmUnsubscribeButton().click();
    unsubscribeReasonPageElements.confirmUnsubscribeText().should("be.visible");
  },
});
