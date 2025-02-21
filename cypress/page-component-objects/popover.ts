import { UIElements } from "../types";

const popoverElements: UIElements = {
  closeButton: () => cy.get("button.select-none"),
  popoverContent: () => cy.get(".popover-input-right"),
};

/**
 * Represents the elements and interactions available for popovers.
 */
export const popover = () => ({
  /**
   * Closes a popover.
   */
  closePopover: (): void => {
    popoverElements.popoverContent().within(() => {
      popoverElements.closeButton().click();
    });
  },
});
