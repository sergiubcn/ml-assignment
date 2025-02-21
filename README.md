# MailerLite Assignment

## Solution overview

- Cypress was chosen for this assignment, because it is my understanding that it is already used within the company.
- Typescript is used just for demo purposes. We can use plain Javascript if the strong typing is not necessary or adds overhead.
- Eslint & Prettier are used for code styling and syntax checks, including the `eslint` plugin for Cypress to add extra checks.
- Test data management is done via the API due to lack of access to the DB. Ideally this would be done via DB scripts, but not mandatory.
- JSDoc comments used on all application interaction functions to provide nice auto-complete and make writing spec files really fast.
- Mochawesome is installed for reporting in CI https://github.com/LironEr/cypress-mochawesome-reporter

The structure of the files and folders:

- The `e2e` folder contains the spec files;
- UI elements are organised in a logical order in files under `page-component-objects`. We would follow the naming convention used by the FE developers wherever possible, as this would make debugging and root cause analysis faster.
- Custom commands are added just for utility functions. Ideally we'd want to separate application interactions from utils for easier maintenance and debugging.

Test design pattern:

- The `signin-page.ts` file contains element definitions in 2 paradigms just for demo purposes: functional and object-oriented POM definitions. In the real solution we'd use the one which makes most sense.
- This could easily be extended into the Screenplay test design pattern and organise the solution as follows: Actor -> Interaction -> Interrogation -> SUT; which adds another layer of abstraction in the sense that it organises actions and interrogations about the system in orchestrator files which would then be associated to each user class.

## Test execution

Environment variables:

- The `cypress.env.json` file is used for collecting environment specific variables. This is not committed to the repo, but generated automatically in CI for each environment, while each engineer has one locally.
- The template file is `cypress.env.json.example`.
- Other methods can be used if necessary, but starting from the one recommended by Cypress is a great start. https://docs.cypress.io/app/references/environment-variables#Option-2-cypressenvjson

Organising test suites:

- There are multiple ways to do this, but 2 common ones are: create separate config files for each execution and feed the file name via CLI with the flag `--configFile` OR write NodeJS scripts for each execution and run those as needed - Module API explained here https://docs.cypress.io/app/references/module-api#cypressrun
- Depending on which of the methods explained above is chosen either extend the `cy:ci` script I have already provided in `package.json` OR create a folder with specific NodeJS scripts and execute them in CI as needed. Don't forget to configure CI to save reports generated in `test-results` as artifacts! (These are not committed to the repo.)

## Known issues & next steps

- Implement a way to programmatically generate/ seed test data - access to the DB and info about the CI & test environments are required;
- CypressIO struggles with iframes - https://github.com/cypress-io/cypress/issues/136. This is the reason why the email builder doesn't load in the iframe - all requests to `groot.mailerlite.com` return 404. This part of the tests doesn't work right now. Access to the app code would be really helpful to find a way to bypass this.
- The Testmail free offering was used for email testing, but this is limited to only a few emails per month and this makes it difficult to troubleshoot and implement tests - https://testmail.app/
- Access to the app code is also required to programmatically dimiss all the banners, notifications and captcha. For the moment I hard-coded the cookie banner dismissal body (see custom commands) and dismissed others manually.
