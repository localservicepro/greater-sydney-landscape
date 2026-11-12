# Kiley API setup log (2026-11-11)

Done through the HighLevel API. Location `hxBiznDzJDX1axVNbS9J`, agent Kiley `DWddiXECUA3yLyBpkQhM`. Backups taken first are in `backup/`.

## Custom fields

The API cannot create contact-field folders, so the new fields were put in the folder that already holds Suburb, Service Needed, Property Address, Property Size and Job Notes (folder id `Zr6TkhBWGhQ1junMTMJ3`). Rename it to "Quote Enquiry" in Settings → Custom Fields if wanted. All keys match `04-custom-fields.md`.

| # | Field | Key | Type | Field id | Status |
|---|---|---|---|---|---|
| 4 | Service Needed | contact.service_needed | Single line text | yJ4xU0gUmg8Iwmpg3Bar | Existing. Doc says dropdown; left as text |
| 5 | Property Address | contact.property_address | Multi line | ZZrF0imXQPqcpzdNYyqV | Existing |
| 6 | Property Size | contact.property_size | Single line text | IdH2CnHRwUEWIebcMtai | Existing. Doc says dropdown; left as text |
| 7 | Job Notes | contact.job_notes | Multi line | soFjjT266Z4iPom8gV3Z | Existing |
| 8 | Suburb | contact.suburb | Single line | n840OVh6hd6Z0P4GfGIh | Existing |
| 9 | Additional Services | contact.additional_services | Checkbox | xPQ4xffPdzozoJw47Aqn | Created |
| 10 | Property Type | contact.property_type | Dropdown | 37rjjhA1UUZ2TjdYErHI | Created |
| 11 | Customer Role | contact.customer_role | Dropdown | S9X5Y7YXrvaHM5HrdmMn | Created |
| 12 | Service Frequency | contact.service_frequency | Dropdown | I4WSKRqf5Laa6pKbEjwX | Created |
| 13 | Property Condition | contact.property_condition | Dropdown | ajxyojBuN7SdLPXSRTyt | Created |
| 14 | Start Timeframe | contact.start_timeframe | Dropdown | FXGtIHeoMaxIDbPXelNO | Created |
| 15 | Site Access | contact.site_access | Checkbox | rMozY7UDOXvuY0pC5yEq | Created |
| 16 | Landscaping Budget | contact.landscaping_budget | Dropdown | jlarCmkAcLwuxi89y4oE | Created |
| 17 | Preferred Contact Method | contact.preferred_contact_method | Radio | q8thgjLduqfgWIz9e3xi | Created |
| 18 | Chat Lead Status | contact.chat_lead_status | Dropdown | lvXhhpoTpSa0JCujOogp | Created |

Options on the created fields were checked against the doc and match exactly.

## Knowledge base "Greater Sydney Landscapes" (`nahmwrUTbo3e1GZ1P4e8`)

Already existed with `03-knowledge-base.pdf` (processed, 12 chunks). Added: web crawl of the whole domain (11 pages discovered and trained; no /thank-you/ page was found) and 15 FAQ entries copied word for word from section 7.

## Kiley

- Prompt replaced with `02-kiley-prompt.txt` (read back and confirmed identical). Business name, Auto-Pilot mode and channels unchanged (all six channels were already on, including Live Chat).
- Sleep on workflow message: off. Knowledge base connected.
- Contact Info: one action per field (the API maps one field per action), 15 in total, named by the four groups in the doc. The old "Suburb" and "Service Needed" actions were updated in place with the new text rather than deleted. Dropdown, checkbox and radio fields take no output examples in the API; GHL uses the field options instead.
- Trigger a Workflow: "When to trigger" text replaced with the guide's text. Still points at the existing workflow "GSL - AI Confirmed Enquiry - Daniel Alerts" (see below).
- Human Handover: condition replaced with the guide's text, three examples added. Still assigns to Daniel and creates a task.
- Opt-out on, Goodbye detection off: unchanged.

## Not possible through the API

- **Workflow.** The public API can list workflows but not create or edit them. Build "Kiley | Chat quote enquiry → Daniel" by hand from step 3 of the setup guide (keys above are correct), or check that the existing "GSL - AI Confirmed Enquiry - Daniel Alerts" already does what step 3 says. Then point Kiley's Trigger a Workflow action at whichever one you keep.
- **Testing.** Needs the Conversations and Conversation Messages scopes on the token.

## Custom values (business details used in Kiley's prompt)

Edit these in **Settings → Custom Values** to change what Kiley says; no prompt edit needed. Six existed and were empty, so they were filled in rather than duplicated; the rest are new.

| Custom value | Key | Value |
|---|---|---|
| Company Name | `{{custom_values.company_name}}` | Greater Sydney Landscapes |
| Owner Name | `{{custom_values.owner_name}}` | Daniel Longo |
| Company Location | `{{custom_values.company_location}}` | Toongabbie NSW 2146 (never a street address) |
| Company Phone | `{{custom_values.company_phone}}` | 0452 586 355 |
| Company WhatsApp | `{{custom_values.company_whatsapp}}` | 0452 586 355 |
| Company Email | `{{custom_values.company_email}}` | info@greatersydneylandscapes.com.au |
| Company Website | `{{custom_values.company_website}}` | www.greatersydneylandscapes.com.au |
| Service Area | `{{custom_values.service_area}}` | Toongabbie (home base), Parramatta, Blacktown, The Hills, Hornsby, Dural, the Inner West, and wider Sydney for larger landscaping and commercial jobs by arrangement |
| Our Services | `{{custom_values.our_services}}` | Lawn Mowing, Hedge Trimming, Garden Maintenance, Weed Spraying, Plant & Lawn Fertilising, Pressure Washing, Landscaping Projects, Ride-On Mowing |
| Business Hours | `{{custom_values.business_hours}}` | Monday to Friday 7am to 5pm, Saturday 7am to 2pm, Sunday closed |
| Reply Time | `{{custom_values.reply_time}}` | within one business day, usually the same day |

`02-kiley-prompt.txt` now uses these keys instead of typed-in details, and that version is what Kiley has.

When a value changes, also update the knowledge base (FAQ entries and the PDF/file) and the website, since Kiley reads those too. If **Our Services** changes, update the Service Needed and Additional Services field options to match.

## Always-on lead capture (update)

- Prompt: Kiley now works 24/7. Business hours are described as Daniel's working hours, not chat hours. After answering any question she asks one question that moves towards an enquiry. Outside hours she never stops at "we're closed" and goes straight into taking the enquiry. She offers a quote call with Daniel once she has a name and phone number, and keeps qualifying after the call is booked.
- Auto-pilot message limit raised from 10 to 30 so a full quote conversation (about 18 replies) isn't cut off. Kiley has no working-hours restriction set.
- Quote-call booking action: not added yet. It needs a calendar ID, and the token lacks the Calendars scope.
- Testing: messages added through the API (Live Chat, WebChat and SMS types were tried) do not trigger Conversation AI, so tests must be run in Kiley's "Test your agent" panel or on the live site.

## Quote-call booking

- Booking action "Book a quote call with Daniel" (`gTFOadCl5dWY7Ln6hqlg`) uses the "2 Minute Quote Calls" calendar (`1Eskvi4eJZfBJ0jTvj41`). It triggers no workflow, does not pause Kiley after booking, and does not allow rescheduling or cancelling in chat. Backup of the calendar before any change: `backup/calendar-quote-calls.json`.
- **Not bookable yet:** the calendar has no user assigned, so GHL returns "No users found in the calendar" and offers no times. Assign Daniel in Calendars → 2 Minute Quote Calls → Team/Availability.

## Knowledge base PDF refresh

`03-knowledge-base.pdf` was rebuilt from `03-knowledge-base.md` (pandoc to HTML, printed to A4 PDF in Chromium) after the photos answer changed. The new file (`QJSOV4lermUZ1oAlShfK`, 11 chunks) is processed in the knowledge base, and the old upload (`GGEQeRwEsXepxkCeAjNS`) was removed so the two versions don't conflict.

## Shorter quote flow

Testing showed leads dropping off at the length of the old flow (8 form questions plus up to 8 qualifying questions), and Kiley re-asking details. The prompt now asks only: service, suburb, first name, mobile (email only if no mobile), a quick job description with an invitation to attach photos, and at most one of "one-off or regular?" / "when are you hoping to get it done?". Then a quote-call offer, a one-line confirmation and a one-sentence close. Messages are capped at about 25 words. Address, size, property type, role, condition, access, budget and contact preference are no longer asked, but are still saved if the customer mentions them.

## Chat summary for Daniel's alert

- New field **Chat Summary** (`contact.chat_summary`, multi line, id `tOWyHbRSfbWSR6Eaw74q`) and Contact Info action "Confirmation – Chat Summary" (`3y2CUkMEVPWV3xYGaSb0`). Kiley writes a two or three sentence summary when the customer confirms, before triggering the workflow.
- The Trigger a Workflow action still uses "GSL - AI Confirmed Enquiry - Daniel Alerts"; its condition now requires the Chat Summary to be saved first.
- GHL's built-in conversation summary (`contact.conversation_ai_summary`) is written only after 15 minutes of inactivity, so it can't be used in an alert sent at confirmation. Its settings can't be changed through the API.
- Contact Info only fills empty fields, so a returning contact's Chat Summary keeps the first enquiry's text. Clear it in the workflow after the alert if repeat enquiries matter.

## Lead-first question order

Kiley now asks, in order: suburb, home or commercial (saved to Property Type), the work (Service Needed, Job Notes), mobile, first name. She then saves Chat Lead Status and Chat Summary and triggers the alert straight away, with no confirmation step. After that she asks for the address and "anything else that would help us quote", such as a photo (paperclip) or the best time to call (new field **Best Time to Call**, `contact.best_time_to_call`, id `wwfdWUcm20cprS5T37SA`), and can book a quote call if they want a set time. The Trigger a Workflow action is now named "Lead captured – notify Daniel" and fires at that point. Not a Fit leads are not sent.
