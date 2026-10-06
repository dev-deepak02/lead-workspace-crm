# Lead research and Gmail setup

The Find leads module is tenant-scoped and starts in draft-only mode. No organization or contact is seeded. Business-specific text comes from the saved business profile.

Configure these production hosting secrets:

- `BRAVE_SEARCH_API_KEY`: Brave Web Search API credential.
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`: Google OAuth web application credentials. Enable Gmail API and register `https://lead-workspace.deepakkr0331.chatgpt.site/api/gmail` as an authorized redirect URI for this deployment. Use the corresponding origin when self-hosting.
- `TOKEN_ENCRYPTION_KEY`: base64 encoding of 32 cryptographically random bytes. Keep the key stable; rotating it requires reconnecting Gmail.

An owner/admin connects Gmail from Find leads. The app requests Gmail compose permission, including draft management and sending. Refresh tokens are AES-GCM encrypted in a dedicated table excluded from CRM exports and public endpoints. Never put credentials in business settings, source control or chat.

## Implemented workflow

Location/type search → source candidates → manual source/e-mail/fact verification → deduplication review → personalized preview → Gmail draft → admin approval → individually confirmed send. Each search page is a provider batch, not a total limit of 20. Up to ten pages per query are available; coverage is not exhaustive. Search titles and snippets remain explicitly unverified until a user reviews the source.

Gmail drafts retain lead IDs, provider IDs and creation dates. Atomic record locks and recipient claims prevent concurrent duplicate draft creation. Uncertain external writes remain locked for manual reconciliation. Sending requires recorded outreach consent, current approval and a matching Gmail draft. External edits invalidate sending. Unsubscribe links suppress later outreach. Reply recording, do-not-contact and unsubscribe stop follow-up tasks. JSON/CSV/XLSX/PDF exports contain research and draft fields.

## Not yet implemented or not live-verified

Credentials are not configured in the current deployment; public search and Gmail round trips remain unverified. These are app integrations, independent of the operator's browser login or connected chat tools.

Automated official-page/PDF extraction, CBSE/CISCE directory adapters, geospatial radius filtering, complete district enumeration, Gmail reply synchronization, multi-step scheduled follow-up drafts, bulk Gmail sending, CAPTCHA, configurable retention and recipient-side attachment access checks are not implemented. Research uses explicit source review and brochure links; no claim of exhaustive coverage, automatic verification or inbox deliverability is made. Existing sign-in remains ChatGPT-based. Google OAuth may require provider verification before unrestricted public use.

## Verification

Run `node --experimental-strip-types --test tests/prospecting.test.mjs`, `node node_modules/typescript/bin/tsc --noEmit`, and the production build. Live provider testing must use an authorized test account after the secrets are configured; do not send test messages to researched prospects.

Provider documentation: https://developers.google.com/workspace/gmail/api/guides/drafts and https://api-dashboard.search.brave.com/documentation.
