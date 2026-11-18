# Daniel's chat alerts: workflows and summary settings

Daniel gets a text and an email for every website chat lead: straight away when the customer confirms, or about 15 minutes after they leave a chat unfinished. This takes two workflows with one If/Else between them.

| | Workflow 1: Confirmed lead | Workflow 2: Unfinished chat |
|---|---|---|
| Name | Kiley \| Confirmed lead → Daniel (the existing workflow `42be1832…`, renamed) | Kiley \| Unfinished chat → Daniel (new) |
| Started by | Kiley's "Lead captured – notify Daniel" action, as soon as she has the name and number | Kiley's Summary Settings, 15 min after a chat goes quiet |
| Summary used | `{{contact.chat_summary}}`, written by Kiley at confirmation | `{{contact.chat_summary}}`, written by GHL's summary when Kiley didn't |

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
   {{contact.service_needed}} in {{contact.suburb}} ({{contact.property_type}})
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
   Home or commercial: {{contact.property_type}}

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
   {{contact.chat_summary}}
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
   {{contact.chat_summary}}
   ```
6. **Both paths, last step: Update Contact Field.** Clear Service Needed, Additional Services, Job Notes, Chat Summary, Chat Lead Status and Best Time to Call. On the left path it goes after Remove Contact Tag; on the right, after the email. Keep name, phone, email, Suburb, Property Address and Property Type, which Kiley uses to welcome returning customers and confirm their details. Kiley can only fill empty fields, so without this a repeat enquiry would keep the first job's details and Daniel's alert would show the old summary. Check a test contact to confirm the fields really clear.
7. Settings: Allow re-entry **On**, Stop on response **Off**. Publish.

## Kiley → Summary Settings

| Setting | Value |
|---|---|
| Enable Conversation Summary | On |
| When to generate | 15 minutes of inactivity, minimum 3 messages |
| Save to custom field | On, Chat Summary (the same field Kiley writes, so both workflows use `{{contact.chat_summary}}`) |
| Email notification | Off (Workflow 2 emails Daniel) |
| Trigger a workflow when summary is ready | On, Kiley \| Unfinished chat → Daniel (publish Workflow 2 first; only published workflows are listed) |

## Rules and test

- Never add a step that messages the customer.
- Switch "Lead Qualification Menu" to Draft before testing, or it sends its menu into these chats.
- Test on the live site in a private window (the "Test your agent" panel doesn't start workflows):
  1. A confirmed chat produces one "New chat lead" alert, and Workflow 2 later takes the Already confirmed path with no second message.
  2. A chat abandoned after giving a name and mobile produces "Unfinished website chat" about 15 minutes later.
  3. Delete the test contacts.


**Address and best time to call** are collected after the alert is sent, so they are not in it. Daniel sees them on the contact (Property Address, Best Time to Call), along with any photos in the conversation.
