import { campaignDetails, UIElements } from "../types";
import { popover } from "./popover";

const draftTabElements: UIElements = {
  createCampaignButton: () => cy.get("[data-test-id=create-campaign-button]"),
};

const campaignCreationFormElements: UIElements = {
  campaignNameTextField: () =>
    cy.get("input[data-test-id=campaign-name-input]"),
  campaignRecipientsSelectionBox: () =>
    cy.get("[data-test-id=recipients-selection-box]"),
  campaignSenderTextField: () =>
    cy.get("input[data-test-id=sender-email-input]"),
  campaignSubjectTextField: () => cy.get("input[data-test-id=subject-input]"),
  campaignTypeButton: (type: string = "") =>
    cy.get(`[data-test-id=create-${type}-block] button`),
  dragAndDropEditor: () => cy.get("[data-test-id=drag-drop-editor]"),
  editEmailContentButton: () => cy.get("[data-test-id=edit-content-button]"),
  nextButton: () => cy.get("[data-test-id=create-campaign-next-button]"),
  sendEmailsButton: () => cy.get("[data-test-id=button-send]"),
};

const recipientsModalElements: UIElements = {
  modalContent: () => cy.get(".modal-content"),
  saveRecipientsButton: () => cy.get("[data-test-id=save-recipients-button]"),
  subscriberGroupCheckbox: () =>
    cy
      .get(".modal-content")
      .get("[data-test-id=subscriber-group-row]")
      .get("[data-test-id=subscribers-group-checkbox]"),
  subscriberGroupRow: () =>
    cy.get(".modal-content").get("[data-test-id=subscriber-group-row]"),
};

const reviewCampaignDetailsTable: UIElements = {
  recipientsRow: () => cy.get("[data-test-id=recipents-section]"),
  replyToRow: () => cy.get("[data-test-id=reply-to]"),
  senderRow: () => cy.get("[data-test-id=sender]"),
  subjectRow: () => cy.get("[data-test-id=subject]"),
};

/**
 * Represents the available Campaigns elements and interactions.
 * @returns An object with access to the elements and interactions.
 */
export const campaignsPage = () => ({
  /**
   * Navigates to the Campaigns Drafts page.
   */
  loadPage: (): void => {
    cy.visit("/campaigns/status/draft");
  },
  /**
   * Creates a campaign with the given details.
   * @param campaign The campaign details.
   */
  createCampaign: (campaign: campaignDetails): void => {
    // Initiate campaign creation
    draftTabElements.createCampaignButton().click();
    // Campaign details
    campaignCreationFormElements
      .campaignTypeButton(campaign.campaignType)
      .click();

    const po = popover();
    po.closePopover();

    campaignCreationFormElements
      .campaignNameTextField()
      .type(campaign.campaignName);
    campaignCreationFormElements
      .campaignSubjectTextField()
      .type(campaign.campaignSubject);
    campaignCreationFormElements
      .campaignSenderTextField()
      .clear()
      .type(campaign.sender);
    campaignCreationFormElements.campaignRecipientsSelectionBox().click();
    //Recipients
    recipientsModalElements.subscriberGroupCheckbox().click();
    recipientsModalElements.saveRecipientsButton().click();
    // Proceed
    campaignCreationFormElements.nextButton().click();
    // Email design
    campaignCreationFormElements.dragAndDropEditor().click();
    cy.url().should("include", "/edit");
  },
  /**
   * Retrieves the Review table elements containing the campaign information.
   * @returns An object with access to the review table elements.
   */
  getReviewDetails: (): Record<
    "recipients" | "replyTo" | "sender" | "subject",
    Cypress.Chainable<JQuery<HTMLElement>>
  > => ({
    recipients: reviewCampaignDetailsTable.recipientsRow(),
    replyTo: reviewCampaignDetailsTable.replyToRow(),
    sender: reviewCampaignDetailsTable.senderRow(),
    subject: reviewCampaignDetailsTable.subjectRow(),
  }),
  /**
   * Sends the campaign emails immediately.
   */
  sendCampaignImmediately: (): void => {
    reviewCampaignDetailsTable.sendEmailsButton();
  },
});
