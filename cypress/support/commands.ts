/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

declare global {
  namespace Cypress {
    interface Chainable {
      deleteCampaignViaAPI(
        campaignId: string,
      ): Cypress.Chainable<Cypress.Response<any>>;
      getCampaignsViaAPI(
        status: string,
      ): Cypress.Chainable<Cypress.Response<any>>;
      dismissCookieBanner(): void;
      getTestMailEmails(
        timestamp: number,
      ): Cypress.Chainable<Cypress.Response<any>>;
      subscribeUserViaAPI(
        email: string,
        group: string,
      ): Cypress.Chainable<Cypress.Response<any>>;
    }
  }
}

Cypress.Commands.add(
  "deleteCampaignViaAPI",
  (campaignId: string): Cypress.Chainable<Cypress.Response<any>> => {
    return cy.request({
      headers: {
        authorization: `Bearer ${Cypress.env("api_key")}`,
      },
      method: "DELETE",
      url: `${Cypress.env("api_base_url")}/campaigns/${campaignId}`,
    });
  },
);

Cypress.Commands.add(
  "getCampaignsViaAPI",
  (status: string): Cypress.Chainable<Cypress.Response<any>> => {
    return cy.request({
      headers: {
        authorization: `Bearer ${Cypress.env("api_key")}`,
      },
      method: "GET",
      url: `${Cypress.env("api_base_url")}/campaigns?filter[status]=${status}`,
    });
  },
);

Cypress.Commands.add(
  "getTestMailEmails",
  (timestamp: number): Cypress.Chainable<Cypress.Response<any>> => {
    return cy.request({
      qs: {
        apikey: Cypress.env("testmail_api_key"),
        livequery: true,
        namespace: Cypress.env("testmail_namespace"),
        timestamp_from: timestamp,
      },
      method: "GET",
      url: Cypress.env("testmail_rest_url"),
    });
  },
);

Cypress.Commands.add("dismissCookieBanner", () => {
  // TODO: figure out how to generate these IDs programmatically.
  cy.setCookie(
    "CookieConsent",
    "{stamp:%27PWjxzmOOSUanlWqoLxwog3bKVCSHvBdqhRZuKRy+9mHRuyPcg9n6NA==%27%2Cnecessary:true%2Cpreferences:false%2Cstatistics:false%2Cmarketing:false%2Cmethod:%27explicit%27%2Cver:1%2Cutc:1740070073594%2Cregion:%27ro%27}",
  );
});

Cypress.Commands.add("subscribeUserViaAPI", (email: string, group: string) => {
  return cy.request({
    headers: {
      authorization: `Bearer ${Cypress.env("api_key")}`,
    },
    body: {
      email: email,
      groups: [group],
    },
    method: "POST",
    url: `${Cypress.env("api_base_url")}/subscribers`,
  });
});

export {};
