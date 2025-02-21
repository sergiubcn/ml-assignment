import { UIElements } from "../types";

/**
 * ======================
 * Functional POM pattern.
 * !Demo purposes only. Don't implement both patterns for the same elements!
 */

const signInPageElements: UIElements = {
  emailTextField: () => cy.get("#email"),
  passwordTextField: () => cy.get("#password"),
  signInButton: () => cy.get("button[type=submit]"),
};

/**
 * Represents the available elements and interactions available to the anonymous user on the SignIn page.
 * @returns An object with access to the page elements and interactions.
 */
export const signInPage = () => ({
  /**
   * Loads the SignIn page.
   */
  loadPage: (): void => {
    cy.visit(Cypress.env("signin_url"));
  },
  /**
   * Signs the user into the account.
   * @param email The account email.
   * @param password The account password.
   */
  signIn: (email: string, password: string): void => {
    signInPageElements.emailTextField().type(email);
    signInPageElements.passwordTextField().type(password);
    signInPageElements.signInButton().click();
    cy.intercept("*/campaigns*").as("getCampaigns");
    cy.wait("@getCampaigns", { timeout: 15000 });
  },
});

/**
 * ==============================================================
 * Object oriented POM pattern - just syntactical sugar in JS/ TS.
 * !Demo purposes only. Don't implement both patterns for the same elements!
 */

/**
 * Represents the SignIn page
 */
export class SignInPage {
  constructor() {}

  private get emailTextFieldElement(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get("#email");
  }

  private get passwordTextFieldElement(): Cypress.Chainable<
    JQuery<HTMLElement>
  > {
    return cy.get("#password");
  }

  private get signInButtonElement(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get("button[type=submit]");
  }

  /**
   * Loads the SignIn page.
   */
  loadPage(): void {
    cy.visit(Cypress.env("signin_url"));
  }

  /**
   * Signs the user into the account.
   * @param email The account email.
   * @param password The account password.
   */
  signIn(email: string, password: string): void {
    this.emailTextFieldElement.type(email);
    this.passwordTextFieldElement.type(password);
    this.signInButtonElement.click();
  }
}
