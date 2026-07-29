Exit code: 0
Wall time: 0.3 seconds
Output:
# KoraFlow

**School approvals without the chase.**

KoraFlow is a lightweight procurement and approval workflow for growing schools. It replaces scattered email, chat messages, and paper forms with smart routing, one-click decisions, and a live audit trail.

## The problem

School administrators lose hours chasing routine approvals. Requests get buried, finance teams lack context, and there is no reliable record of who approved what. Generic enterprise workflow tools are too complex and expensive for small schools.

## The solution

KoraFlow gives a school one calm workspace to:

- submit a purchase or operational request in under a minute;
- route it automatically by amount and category;
- see exactly where it is in the approval flow;
- approve or ask for clarification;
- retain a searchable activity log.

The demo includes realistic school procurement data and a complete interactive path: create a request, inspect its workflow, and approve it.

## Why it matters

The product is intentionally low-friction and mobile responsive. It is designed for schools where administrators need accountability without adopting a heavy ERP. Clear states and compact pages also make it practical on lower-bandwidth connections.

## Technology

- **Frontend:** Next.js 16, React 19, TypeScript, responsive CSS
- **Backend:** Sub0 declarative API engine
- **Database:** PostgreSQL through Sub0
- **Hosting:** LingoQL

## Sub0 architecture

The declarative backend specification is in [`sub0/koraflow-backend.json`](sub0/koraflow-backend.json). It defines:

- `requests` and `activity` PostgreSQL models;
- list and create request endpoints;
- a transactional approval endpoint;
- request validation and indexed activity queries.

Sub0 is the only application backend. The browser demo uses seeded state when no hosted Sub0 URL is configured so judges can still evaluate the entire workflow without credentials.

### Deploy the backend

1. Create a project in Sub0/LingoQL.
2. Ask LingoAI to import or reproduce `sub0/koraflow-backend.json`.
3. Connect a PostgreSQL database and deploy.
4. Add the deployed API URL as `NEXT_PUBLIC_SUB0_API_URL` in the frontend environment.

Suggested LingoAI prompt:

> Create a PostgreSQL backend for KoraFlow using the attached specification. It needs requests and immutable activity records, GET and POST /requests, POST /requests/:id/approve in a transaction, and GET /activity. Validate required fields, index status and timestamps, and return JSON with CORS enabled for the LingoQL frontend.

## Local development

```bash
pnpm install
pnpm dev
```

Then open the local URL shown in the terminal.

## Production build

```bash
pnpm build
```

## Demo flow

1. Introduce the problem: school teams chase approvals across email and chat.
2. Show the overview and the live workflow for ?쏶cience lab supplies.??3. Click **New request**, create a realistic purchase, and show automatic routing.
4. Select the request and click **Approve request**.
5. Point out the audit trail, time-saved metric, mobile layout, and Sub0 specification.

## Hackathon fit

- **Innovation:** a focused, lower-bandwidth workflow built for underserved schools.
- **Technical implementation:** interactive responsive frontend plus a declarative transactional Sub0 backend.
- **Practical utility:** solves a frequent, expensive administrative problem.
- **Presentation:** coherent seeded demo, visible live workflow, and clear documentation.

## Roadmap

- role-based authentication for requester, finance reviewer, and administrator;
- WebSocket activity updates;
- email/SMS approval links;
- budget guardrails and monthly reporting;
- reusable visual workflow editor.

