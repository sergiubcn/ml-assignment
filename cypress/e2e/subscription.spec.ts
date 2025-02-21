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

  it("Should allow the subscriber to unsubscribe and show that in the app - TC_0002", () => {
    // Warning: use cy.origin() if loading cross-domain.
    cy.visit(Cypress.env("unsubscribe_link"));

    const unsub = unsubscribePage();
    unsub.unsubscribe();

    const unsubReason = unsubscribeReasonPage();
    unsubReason.selectReasonAndUnsubscribe();

    const signIn = signInPage();
    signIn.loadPage();
    signIn.signIn(Cypress.env("email"), Cypress.env("password"));
    cy.dismissCookieBanner();

    const sidebar = sidebarNav();
    sidebar.visitLink("subscribers");

    const subs = subscribersPage();
    subs
      .getUnsubscribers()
      .contains(Cypress.env("testmail_email"))
      .should("be.visible");
  });
});
