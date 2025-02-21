import { campaignDetails } from "../types";
import { campaignsPage } from "../page-component-objects/campaigns-page";
import { emailPage } from "../page-component-objects/email-page";
import { sidebarNav } from "../page-component-objects/sidebar-nav";
import { signInPage } from "../page-component-objects/signin-page";

describe("Campaign", () => {
  // Using a unique string such as the Date.now() timestamp ensures the uniqueness of an entity.
  // This is necessary when running tests in parallel. Ideally we want to build with this purpose in mind from the start.
  const campaignInfo: campaignDetails = {
    campaignName: `cy-campaign-creation-tc001-${Date.now()}`,
    campaignSubject: `cy-campaign-creation-tc001-${Date.now()}`,
    campaignType: "regular-campaign",
    sender: Cypress.env("email"),
  };

  before(() => {
    const signIn = signInPage();
    signIn.loadPage();
    signIn.signIn(Cypress.env("email"), Cypress.env("password"));
    cy.dismissCookieBanner();
  });

  after(() => {
    cy.getCampaignsViaAPI("draft")
      .its("body")
      .then((campaignsResp) => {
        const newCampaign = campaignsResp.data.find(
          (elem: Record<string, any>) =>
            elem.name === campaignInfo.campaignName,
        );
        return cy.deleteCampaignViaAPI(newCampaign.id).its("status");
      })
      .then((deleteCampaignResp) => {
        // Throw an error so that we know when the entity was not deleted.
        expect(deleteCampaignResp).to.eq(204);
      });
  });

  it("Should allow the user to send a campaign and receive the email - TC_0001", () => {
    const sidebar = sidebarNav();
    sidebar.visitLink("campaigns");

    const campaign = campaignsPage();

    // Used to retrieve the latest email.
    const timestamp = Date.now();
    campaign.createCampaign(campaignInfo);

    // TODO: investigate the app code and find a workaround to make the content builder load in the iframe.
    const emailEditingPage = emailPage();
    emailEditingPage.editEmailDesignAndSubmit();

    const reviewInfo = campaign.getReviewDetails();
    reviewInfo.recipients.should("contain", Cypress.env("recipients_group"));
    reviewInfo.replyTo.should("contain", campaignInfo.sender);
    reviewInfo.subject.should("contain", campaignInfo.campaignSubject);
    reviewInfo.sender.should("contain", campaignInfo.sender);

    campaign.sendCampaignImmediately();

    cy.getTestMailEmails(timestamp);
  });
});
