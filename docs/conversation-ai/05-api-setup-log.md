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
