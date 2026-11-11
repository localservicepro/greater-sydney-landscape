# Daniel's chat alerts: workflows and summary settings

Daniel gets a text and an email for every website chat lead: straight away when the customer confirms, or about 15 minutes after they leave a chat unfinished. This takes two workflows with one If/Else between them.

| | Workflow 1: Confirmed lead | Workflow 2: Unfinished chat |
|---|---|---|
| Name | Kiley \| Confirmed lead → Daniel (the existing workflow `42be1832…`, renamed) | Kiley \| Unfinished chat → Daniel (new) |
| Started by | Kiley's "Confirmed quote enquiry – notify Daniel" action | Kiley's Summary Settings, 15 min after a chat goes quiet |
| Summary used | `{{contact.chat_summary}}` (Kiley writes it at confirmation) | `{{contact.conversation_ai_summary}}` (GHL writes it) |

A confirmed chat also produces a summary later. Workflow 1 adds the tag `kiley-confirmed`; Workflow 2 sees it, sends nothing, and removes the tag so the next enquiry from that person works normally.

## Workflow 1: Confirmed lead

Open the existing workflow, rename it **Kiley | Confirmed lead → Daniel**, remove the old steps, and add:

1. No trigger.
2. **Wait**: time delay, 1 minute.
3. **Add Contact Tag**: `kiley-confirmed`, `chat-enquiry`.
4. **Create/Update Opportunity**: Operations Pipeline, stage New Enquiry, name `{{contact.name}} – {{contact.service_needed}} – {{contact.suburb}}`, source `Website Chat`.
5. **Assign to User**: Daniel Longo (only unassigned, if offered).
6. **Internal Notification, SMS** to Daniel Longo:
   ```
   New chat lead: {{contact.name}} {{contact.phone}}
   {{contact.service_needed}} in {{contact.suburb}}
   {{contact.chat_summary}}
   ```
7. **Internal Notification, Email** to Daniel Longo. Subject `New chat lead – {{contact.name}} – {{contact.suburb}}`:
   ```
   {{contact.name}} confirmed a quote enquiry in the website chat.

   Name: {{contact.name}}
   Mobile: {{contact.phone}}
   Email: {{contact.email}}
   Service: {{contact.service_needed}}
   Suburb: {{contact.suburb}}

   Summary:
   {{contact.chat_summary}}

   Job notes:
   {{contact.job_notes}}
   ```
8. Settings: Allow re-entry **On**, Stop on response **Off**. Publish.

## Workflow 2: Unfinished chat

Create from scratch, name **Kiley | Unfinished chat → Daniel**:

1. No trigger.
2. **Wait**: time delay, 1 minute.
3. **If/Else**: branch "Already confirmed", condition Contact Tag includes `kiley-confirmed`.
   - **Already confirmed** path: **Remove Contact Tag** `kiley-confirmed`. Nothing else.
   - **None** path: steps 4 and 5.
4. **Internal Notification, SMS** to Daniel Longo:
   ```
   Unfinished website chat: {{contact.name}} {{contact.phone}} left before confirming.
   {{contact.conversation_ai_summary}}
   ```
5. **Internal Notification, Email** to Daniel Longo. Subject `Unfinished chat – {{contact.name}} – follow up`:
   ```
   {{contact.name}} started a website chat but left before confirming an enquiry.

   Name: {{contact.name}}
   Mobile: {{contact.phone}}
   Email: {{contact.email}}
   Service: {{contact.service_needed}}
   Suburb: {{contact.suburb}}

   Chat summary:
   {{contact.conversation_ai_summary}}
   ```
6. Settings: Allow re-entry **On**, Stop on response **Off**. Publish.

## Kiley → Summary Settings

| Setting | Value |
|---|---|
| Enable Conversation Summary | On |
| When to generate | 15 minutes of inactivity, minimum 3 messages |
| Custom field | Conversation AI Summary (not Chat Summary) |
| Email notification | Off (Workflow 2 emails Daniel) |
| Workflow | Kiley \| Unfinished chat → Daniel |

## Rules and test

- Never add a step that messages the customer.
- Switch "Lead Qualification Menu" to Draft before testing, or it sends its menu into these chats.
- Test on the live site in a private window (the "Test your agent" panel doesn't start workflows):
  1. A confirmed chat produces one "New chat lead" alert, and Workflow 2 later takes the Already confirmed path with no second message.
  2. A chat abandoned after giving a name and mobile produces "Unfinished website chat" about 15 minutes later.
  3. Delete the test contacts.

**Known limit:** Kiley's Contact Info actions only fill empty fields, so a returning customer's Chat Summary keeps their first enquiry's text. If that becomes a problem, add an Update Contact Field step at the end of Workflow 1 that clears Chat Summary, and check it actually clears.
