# Daniel's chat alerts: workflow and summary settings

One workflow, **Kiley | Chat summary → Daniel**, sends every chat alert. Two things start it:

1. **Kiley's "Confirmed quote enquiry – notify Daniel" action**, the moment a customer confirms. Kiley has already saved her **Chat Summary**.
2. **Conversation Summary** (Kiley's Summary Settings), after a chat has gone quiet. GHL saves the **Conversation AI Summary**. This catches people who left before confirming.

Tags stop Daniel getting the same lead twice: a confirmed lead is not alerted again when the summary arrives later.

## Fields used

| Field | Key | Filled by |
|---|---|---|
| Name, Phone, Email | `{{contact.name}}` `{{contact.phone}}` `{{contact.email}}` | Kiley (standard fields) |
| Service Needed | `{{contact.service_needed}}` | Kiley |
| Suburb | `{{contact.suburb}}` | Kiley |
| Job Notes | `{{contact.job_notes}}` | Kiley |
| Chat Lead Status | `{{contact.chat_lead_status}}` | Kiley, at confirmation |
| Chat Summary | `{{contact.chat_summary}}` | Kiley, at confirmation |
| Conversation AI Summary | `{{contact.conversation_ai_summary}}` | GHL, after the chat goes quiet |

## Part 1: Kiley → Summary Settings

| Setting | Value |
|---|---|
| Enable Conversation Summary | On |
| When to generate | After **15 minutes** of inactivity, minimum **3** messages |
| Custom field | **Conversation AI Summary** (not Chat Summary, which is Kiley's own) |
| Email notification for conversation summary | **Off**. The workflow below emails Daniel, so this would double up |
| Workflow | **Kiley \| Chat summary → Daniel** |

Save.

## Part 2: The workflow

Open **Automation → Workflows → Kiley | Chat summary → Daniel**. Remove the old steps (or turn the workflow to Draft while you rebuild it), then set it up as follows.

### Settings tab
- **Allow re-entry:** On. The same contact can come through more than once (confirmation, then summary, then a new job months later).
- **Stop on response:** Off.

### Trigger
None. Kiley's action and the Summary Settings start it.

### Steps

1. **Wait** 1 minute, so Kiley's fields finish saving.

2. **If/Else: "Confirmed?"**, with condition **Chat Summary is not empty**.

#### Branch A: Confirmed (Chat Summary is not empty)

A1. **If/Else: "Already alerted?"**, with condition **Contact Tags include `kiley-confirmed`**.
- Yes → **End** (the later summary run lands here).
- No → carry on.

A2. **Add Tags:** `kiley-confirmed`, `kiley-alerted`, `chat-enquiry`.

A3. **If/Else: "Not a fit?"**, with condition **Chat Lead Status is Not a Fit**.
- Yes → **Add Tag** `chat-not-a-fit` → go to step 3 (no alert).
- No → carry on.

A4. **Create/Update Opportunity**
- Pipeline: **Operations Pipeline**. Stage: **New Enquiry**.
- Name: `{{contact.name}} – {{contact.service_needed}} – {{contact.suburb}}`
- Source: `Website Chat`

A5. **Assign to User:** Daniel Longo. Turn on "only apply to unassigned contacts" if you see that option.

A6. **Internal Notification: SMS** to user Daniel Longo:
```
New chat lead: {{contact.name}} {{contact.phone}}
{{contact.service_needed}} in {{contact.suburb}} ({{contact.chat_lead_status}})
{{contact.chat_summary}}
```

A7. **Internal Notification: Email** to user Daniel Longo.
Subject: `New chat lead – {{contact.name}} – {{contact.suburb}}`
```
{{contact.name}} confirmed a quote enquiry in the website chat.

Name: {{contact.name}}
Mobile: {{contact.phone}}
Email: {{contact.email}}
Service: {{contact.service_needed}}
Suburb: {{contact.suburb}}
Lead status: {{contact.chat_lead_status}}

Summary:
{{contact.chat_summary}}

Job notes:
{{contact.job_notes}}
```
Then go to step 3.

#### Branch B: Not confirmed (Chat Summary is empty)

B1. **If/Else: "Already alerted?"**, with condition **Contact Tags include `kiley-alerted`**.
- Yes → **End**.
- No → carry on.

B2. **If/Else: "Can Daniel reach them?"**, with condition **Phone is not empty OR Email is not empty**.
- No → **End**. An anonymous chat with no contact details can't be followed up; Daniel can still read it in Conversations.
- Yes → carry on.

B3. **Add Tags:** `kiley-alerted`, `chat-unconfirmed`.

B4. **Internal Notification: SMS** to user Daniel Longo:
```
Unfinished chat: {{contact.name}} {{contact.phone}} left before confirming.
{{contact.conversation_ai_summary}}
```

B5. **Internal Notification: Email** to user Daniel Longo.
Subject: `Unfinished chat – {{contact.name}} – follow up`
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
Then go to step 3.

#### 3. Reset for the next enquiry (both branches)

3a. **Wait** 2 hours.

3b. **Remove Tags:** `kiley-confirmed`, `kiley-alerted`.

3c. **Update Contact Field:** clear **Chat Summary** and **Chat Lead Status** (set them to empty). Kiley's Contact Info actions only fill empty fields, so without this a returning customer's next enquiry would keep the old summary.

**Publish.**

## Rules

- Do not add any step that messages the customer (SMS, email or chat). A workflow message to the contact can interrupt Kiley mid-chat.
- In If/Else steps, pick the fields from the list rather than typing them.

## Test

1. In Kiley's "Test your agent" panel, run a quote to confirmation. Open the workflow's **Execution logs**: one run should take Branch A, and Daniel gets the SMS and email with the summary filled in. About 15 minutes later a second run should stop at A1.
2. On the live site in a private window, give a name and mobile, then stop replying. After about 15 minutes, a run should take Branch B and Daniel gets the "Unfinished chat" alert.
3. After 2 hours, check the test contact: both tags removed, Chat Summary and Chat Lead Status empty. If step 3c doesn't clear the fields, tell Claude.
4. Delete the test contacts.

The test panel may not save fields or start workflows. If test 1 shows nothing in the Execution logs, use the live site instead.
