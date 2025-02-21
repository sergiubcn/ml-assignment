export type UIElements = Record<
  string,
  (arg?: string) => Cypress.Chainable<JQuery<HTMLElement>>
>;

export type campaignDetails = {
  campaignName: string;
  campaignSubject: string;
  campaignType: string;
  sender: string;
};
