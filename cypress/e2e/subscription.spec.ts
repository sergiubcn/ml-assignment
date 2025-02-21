import { sidebarNav } from "../page-component-objects/sidebar-nav";
import { signInPage } from "../page-component-objects/signin-page";
import { subscribersPage } from "../page-component-objects/subscribers-page";
import { unsubscribePage } from "../page-component-objects/unsubscribe-page";
import { unsubscribeReasonPage } from "../page-component-objects/unsubscribe-reason-page";

describe("Subscription", () => {
  // In an ideal situation we would generate the unsubscribe link programmatically for speed of execution 
  // and to not cause Cypress any suffering due to cross-origin requests.
  // before(() => {});

  after(() => {
    cy.subscribeUserViaAPI(
      Cypress.env("testmail_email"),
      Cypress.env("group_campaign_creation"),
    );
  });

  it("Should allow the audience to unsubscribe - TC_0002", () => {
    // Warning: if the link is not programmatically generated, then use cy.origin() when loading cross-domain.
    // The last link I used for testing: https://unsubscribe.mailerlite.io/unsubscribe/1331231/146882258045765124/confirm?signature=9fd478a16ca59bdc7cd6c44690c18d0db43fb827e4d67738596ce53c8d8c8e19
    cy.visit(Cypress.env("unsubscribe_link"));
    /**
     * Alternatively use the `cy.getUnsubscribeLinkFromEmailBody()` custom command to extract the link from the email body.
     * const tstmp = Date.now();
     * const email = cy.getTestMailEmails(tstmp);
     * cy.getUnsubscribeLinkFromEmailBody(email[0]);
     */

    const unsub = unsubscribePage();
    unsub.unsubscribe();

    const unsubReason = unsubscribeReasonPage();
    unsubReason.selectReasonAndUnsubscribe();
  });

  it("Should allow the user to see unsubscribed audience - TC_0002", () => {
    const signIn = signInPage();
    signIn.loadPage();
    signIn.signIn(Cypress.env("email"), Cypress.env("password"));
    cy.dismissCookieBanner();

    const sidebar = sidebarNav();
    sidebar.visitLink("subscribers");

    // TODO: find workaround for cross-origin request: https://aura.mailerlite.com/...
    const subs = subscribersPage();
    subs
      .getUnsubscribers()
      .contains(Cypress.env("testmail_email"))
      .should("be.visible");
  });
});
