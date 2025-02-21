import { UIElements } from "../types";

const sidebarNavElements: UIElements = {
  sidebarNav: () => cy.get("[data-test-id=sidebar-navigation]"),
  sidebarNavLink: (pathPattern: string = "") =>
    cy.get(`a[href*=${pathPattern}]`),
};

/**
 * Represents the available Sidebar nav menu elements and interactions.
 * @returns An object with access to the Sidebar nav menu elements and interactions.
 */
export const sidebarNav = () => ({
  /**
   * Navigates to the target page by full or partial path.
   * @param pathPattern Part or the full path of the anchor in the sidebar nav.
   */
  visitLink: (pathPattern: string): void => {
    sidebarNavElements.sidebarNav().within(() => {
      sidebarNavElements.sidebarNavLink(pathPattern).click();
    });
  },
});
