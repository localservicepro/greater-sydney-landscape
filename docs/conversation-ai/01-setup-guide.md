# Setting Up Kiley: GHL Conversation AI for Greater Sydney Landscapes

**Goal:** when a visitor uses the website chat widget, Kiley answers their questions. If they want work done, she collects the same details as the website quote form, asks a few qualifying questions, confirms a summary, saves everything to the contact, and alerts Daniel.

**Files in this folder:**

| File | What it is | Where it goes in GHL |
|---|---|---|
| 01-setup-guide.md | This guide | |
| 02-kiley-prompt.txt | The bot prompt | Kiley → Build → prompt box |
| 03-knowledge-base.md / .pdf | Business facts and FAQs | AI Agents → Knowledge Base |
| 04-custom-fields.md | Fields, options and Contact Info action text | Settings → Custom Fields, and Kiley's actions |

Allow about 60 to 90 minutes. Do the steps in order, because later steps need the fields and workflow to exist.

---

## Before you start: two facts to confirm with Daniel

1. **Opening hours.** The website and knowledge base say Mon–Fri 7am–5pm, Sat 7am–2pm, Sunday closed. These were placeholders when the site was built. If they are wrong, fix them in the knowledge base, the prompt (APPROVED FACTS section) and the website.
2. **"Fully insured" and "within the week".** Both are claims on the website, and Kiley repeats them. Make sure Daniel is happy to stand behind them.

---

## Step 1: Create the custom fields

1. Go to **Settings → Custom Fields**, Contact tab.
2. Click **Add Folder** and name it **Quote Enquiry**.
3. Create each field in **04-custom-fields.md**, fields 4 to 18, with the exact name, type and options shown.
4. If a field already exists (Suburb, Service Needed, Property Address, Property Size and Job Notes probably do), check its type and options match. Do not duplicate it.
5. Open each field and note its key, for example `{{contact.service_needed}}`. You need the keys in Step 3.

**Check the website form at the same time.** Submit a test quote on www.greatersydneylandscapes.com.au/contact/ and open the new contact in GHL. Name, phone and email should be filled in. Check whether Property Address, Property Size, Service Needed and Job Notes were also filled. If they were not, GHL's form tracking did not match those inputs to the custom fields. Tell me and I will adjust the website form's field names to match the keys GHL generated.

---

## Step 2: Build the knowledge base

1. Go to **AI Agents → Knowledge Base** and click **Create Knowledge Base**. Name it **Greater Sydney Landscapes**.
2. **Upload the file:** add a file source and upload **03-knowledge-base.pdf**. If your account offers a Rich Text source instead, paste in the contents of **03-knowledge-base.md**.
3. **Add the website:** add a **Web Crawler** source with `https://www.greatersydneylandscapes.com.au/`. Crawl the whole domain and leave out `/thank-you/`. The website and the file say the same things, so the crawler mainly keeps Kiley current when the site changes.
4. **Optional, add FAQ pairs:** add the 10 to 15 questions customers ask most from section 7 of the knowledge base as **FAQ** entries. GHL treats FAQ entries as the preferred answer when a question matches closely. Good candidates are pricing, free quotes, hours, areas, clippings, strata, insurance and photos.
5. Wait for the sources to finish training (status shows as trained or complete). Then ask the knowledge base tester a few questions, such as "do you take the clippings away?" and "what areas do you cover?".

**When anything changes** (hours, services, areas), update the file and re-upload it, then re-run the crawler. Delete the old file so two versions don't conflict.

---

## Step 3: Create the notification workflow

Kiley triggers this workflow when a customer confirms their enquiry. Build and publish it before you add the action in Step 4.

**Important:** this workflow must only notify the team. Do not send the customer an SMS or email from it. GHL can pause the bot when a workflow messages the contact, which would leave Kiley silent mid-chat.

1. Go to **Automation → Workflows → Create Workflow → Start from scratch**.
2. Name it **Kiley | Chat quote enquiry → Daniel**.
3. **Trigger:** leave it with no trigger. Kiley starts it directly.
4. Add these actions in order:
   1. **Wait** 1 minute. This gives Kiley's field updates time to save before the notification reads them.
   2. **Add Tag:** `chat-enquiry`.
   3. **If/Else** on **Chat Lead Status**, with branches:
      - *Qualified*: add tag `chat-qualified`.
      - *Needs Daniel Review*: add tag `chat-review`.
      - *Outside Service Area*: add tag `chat-out-of-area`.
      - *Not a Fit*: add tag `chat-not-a-fit`, then **End** (no notification).
   4. **Create/Update Opportunity**: your sales pipeline, stage **New Enquiry**. Opportunity name `{{contact.name}} – {{contact.service_needed}} – {{contact.suburb}}`, source `Website Chat`. Create the pipeline stage first if it doesn't exist.
   5. **Assign to User:** Daniel.
   6. **Internal Notification (SMS)** to Daniel:
      ```
      New chat quote: {{contact.name}}, {{contact.service_needed}} in {{contact.suburb}}. {{contact.phone}}. Status: {{contact.chat_lead_status}}. Prefers {{contact.preferred_contact_method}}.
      ```
   7. **Internal Notification (Email)** to Daniel, subject `New chat quote – {{contact.name}} – {{contact.suburb}}`, body:
      ```
      Name: {{contact.name}}
      Phone: {{contact.phone}}
      Email: {{contact.email}}
      Preferred contact: {{contact.preferred_contact_method}}

      Service: {{contact.service_needed}}
      Additional services: {{contact.additional_services}}
      Suburb: {{contact.suburb}}
      Address: {{contact.property_address}}
      Property size: {{contact.property_size}}
      Property type: {{contact.property_type}}
      Customer role: {{contact.customer_role}}
      Frequency: {{contact.service_frequency}}
      Condition: {{contact.property_condition}}
      Timeframe: {{contact.start_timeframe}}
      Access: {{contact.site_access}}
      Landscaping budget: {{contact.landscaping_budget}}
      Lead status: {{contact.chat_lead_status}}

      Job notes:
      {{contact.job_notes}}
      ```
5. Swap any key that GHL generated differently in Step 1. Click **Publish**.

---

## Step 4: Configure Kiley (Build tab)

Open **AI Agents → Conversation AI → Kiley**.

### 4a. Basics
- **Business Name:** Greater Sydney Landscapes.
- **Model:** keep your current model.
- **Prompt:** select everything in the prompt box and replace it with the contents of **02-kiley-prompt.txt**. Make a copy of the old prompt first in case you want to compare. Do not run Prompt Optimizer on it before testing. It can rewrite away rules that matter, such as "never give prices".

### 4b. Actions

Under **Setup Your Actions**:

1. **Contact Info.** Delete the existing "Suburb" and "Service Needed" actions. Then create the four actions in **04-custom-fields.md**: Quote details, Property and timing, Access, budget and contact preference, and Lead status. Paste each field's "what to update" text and output examples. Use **Add new field** to put several fields in one action.

2. **Trigger a Workflow.** Edit your existing "Confirmed quote enquiry – notify Daniel" action:
   - **Workflow:** Kiley | Chat quote enquiry → Daniel
   - **When to trigger:**
     ```
     The customer has just confirmed that Kiley's enquiry summary is correct (for example "yes", "that's right", "all good"), and their name plus a phone number or email have been collected. Trigger only once per enquiry. Do not trigger for general questions, existing customers, or before the summary is confirmed.
     ```

3. **Human Handover.** Keep it on. Set its condition to:
   ```
   The customer asks to speak to Daniel or a person, or is an existing customer asking about a booked visit, rescheduling, an invoice, a payment or a complaint.
   ```
   Make sure the handover notifies Daniel and assigns the conversation to him.

4. **Stop Bot: Opt-out.** Keep it on as it is.

5. **Stop Bot: Goodbye detection.** Leave it off. With it on, Kiley can stop at "thanks!" before the summary is confirmed.

### 4c. Knowledge Base Triggers
Connect the **Greater Sydney Landscapes** knowledge base from Step 2.

### 4d. Mode
Set the mode to **Auto-Pilot**. GHL only saves Contact Info fields in Auto-Pilot. Suggestive mode only drafts replies for a person to send.

Click **Save**.

---

## Step 5: Connect the website chat widget (Deploy tab)

1. In Kiley's **Deploy** tab, turn on the **Live Chat** (web chat) channel. Leave SMS, Facebook and Instagram off until the chat is working well. You can add them later with the same prompt.
2. Go to **Sites → Chat Widget** and open the widget already installed on the website (widget ID ending `…217466f4`).
3. **Widget type:** Live Chat, so the conversation happens in the chat window.
4. **Pre-chat contact form.** Choose one:
   - **Option A (recommended for reliability):** keep the widget's contact form on, asking for name and phone. GHL then always creates the contact with a phone number before the chat starts. Kiley sees those details and skips straight to the job questions.
   - **Option B (what you described):** turn the contact form off, or allow chat without contact details. Kiley asks for name, phone and email herself. In testing (Step 6), confirm they land in the standard Name, Phone and Email fields. GHL's help docs say these are collected through the prompt rather than a Contact Info action, so check before relying on it.
5. Set the widget's greeting to something short and natural, such as "Hi! Got a question or after a quote? Ask away." Save and publish the widget. The website already loads it on every page, so nothing needs to change on the site.

---

## Step 6: Test before going live

Use **Test your agent** in the Build tab first, then a real chat on the live website in a private browser window. After each test, open the contact in GHL and check the fields.

| # | Send this | Expect |
|---|---|---|
| 1 | "Do you take the grass clippings away?" | Answers yes, green waste included. Doesn't push a quote. |
| 2 | "How much to mow a lawn in Blacktown?" | No price or range. Explains what affects price and offers a fixed quote. |
| 3 | "Hi, I need my lawn mowed in Seven Hills" | Starts Part A. One question at a time. Never re-asks what you've already said. |
| 4 | Give name, phone and email all in one message | Accepts all three and moves on |
| 5 | Decline to give the street address | Accepts the suburb only and carries on |
| 6 | Complete the full flow and confirm the summary | Fields saved, workflow runs once, Daniel gets SMS and email, Kiley's closing message names your preferred contact method |
| 7 | "Can you do landscaping in Katoomba?" | Says Daniel will confirm coverage and still collects details. Lead status Outside Service Area or Needs Daniel Review. |
| 8 | "Do you do tree removal?" | Says it isn't a listed service and Daniel can say if he can help. Doesn't invent a yes or no. |
| 9 | "I'm an existing customer, can I move Thursday's mow?" | No quote questions. Human handover fires. |
| 10 | "Can you come Tuesday at 10?" | Doesn't promise a date for the job. Offers a quote call with Daniel instead, using only times the calendar shows. |
| 11 | "Are you a bot?" | Honest yes and offers Daniel |
| 12 | "STOP" | Opt-out fires and messages stop |
| 13 | "Hi, are you open right now?" (outside hours) | Gives the hours in a few words, says she can take details now, and asks what they need done in the same message. Never stops at "we're closed". |
| 14 | After giving name and phone, say "yes" to a quote call | Books a slot from the calendar, then carries on with the remaining questions and includes the call time in the summary |

**After test 6, check:**
- The contact has every field filled in (Contact → Quote Enquiry folder).
- The workflow's **Execution Log** shows one run, not two.
- Daniel received the SMS and email with real values, not blank `{{ }}` tags.
- An opportunity is in the New Enquiry stage.

**If a field doesn't save:** the field may already have had a value (Contact Info never overwrites), or the answer didn't match an option. Use a fresh test contact each time. Delete test contacts afterwards.

---

## Step 7: Go live and keep it sharp

- Read the first week's chats in **Conversations**. Note any question Kiley couldn't answer, then add the answer to the knowledge base file or as a FAQ entry.
- If Kiley asks questions in an awkward order or repeats herself, adjust only the relevant part of the prompt, then re-test.
- When you add SMS, Facebook or Instagram to the Deploy tab, run tests 3, 6 and 9 again on that channel.
- Review the **Chat Lead Status** values monthly. If lots of enquiries land in Needs Daniel Review for the same reason, add that answer to the knowledge base.
