# Custom Fields for Kiley's Quote Enquiry

Create these in **Settings → Custom Fields → Contact**, inside a new folder called **Quote Enquiry**. Type the field names exactly as written, so GHL generates the keys shown. The website quote form and Kiley then write to the same fields.

**Check first:** fields 4 to 8 may already exist because the website form and your current bot use them. Your bot already has actions for "Suburb" and "Service Needed". If a field already exists, keep it and only check its type and options. Do not create a duplicate.

**Option wording matters.** Conversation AI matches what the customer says to the nearest option, so copy the options exactly. The Property Size and Service Needed options must match the website form word for word.

## Standard contact fields (already in GHL, do not create)

| # | Field | Where it comes from |
|---|---|---|
| 1 | First Name / Last Name (full name) | Website form and Kiley |
| 2 | Phone | Website form and Kiley |
| 3 | Email | Website form and Kiley |

GHL's help docs say not to use a Contact Info action for name, phone or email. The prompt tells Kiley to collect them. See step 6 of the setup guide for how to check they save.

## Website form fields (shared with Kiley)

| # | Field name | Key | Type | Options |
|---|---|---|---|---|
| 4 | Service Needed | `contact.service_needed` | Dropdown (single) | Lawn Mowing · Hedge Trimming · Garden Maintenance · Weed Spraying · Plant & Lawn Fertilising · Pressure Washing · Landscaping Projects · Ride-On Mowing · Other |
| 5 | Property Address | `contact.property_address` | Single line | |
| 6 | Property Size | `contact.property_size` | Dropdown (single) | Small (under 300 m²) · Medium (300 – 700 m²) · Large (700 m² – 1,500 m²) · Acreage / over 1,500 m² · Strata or commercial site · Not sure |
| 7 | Job Notes | `contact.job_notes` | Multi line | |

## Qualifying fields (new, filled by Kiley)

| # | Field name | Key | Type | Options |
|---|---|---|---|---|
| 8 | Suburb | `contact.suburb` | Single line | |
| 9 | Additional Services | `contact.additional_services` | Checkbox | Lawn Mowing · Hedge Trimming · Garden Maintenance · Weed Spraying · Plant & Lawn Fertilising · Pressure Washing · Landscaping Projects · Ride-On Mowing |
| 10 | Property Type | `contact.property_type` | Dropdown (single) | House · Townhouse / Villa / Duplex · Strata / Apartment Complex · Commercial Site · Acreage / Rural-Residential · New Build / Bare Block · Other |
| 11 | Customer Role | `contact.customer_role` | Dropdown (single) | Owner-Occupier · Landlord / Investor · Tenant · Strata / Property Manager · Real Estate Agent · Business / Facility Manager · Other |
| 12 | Service Frequency | `contact.service_frequency` | Dropdown (single) | One-off Job · Weekly · Fortnightly · Three-weekly · Monthly · As Needed / Seasonal · Not Sure Yet |
| 13 | Property Condition | `contact.property_condition` | Dropdown (single) | Well Maintained · Slightly Overgrown · Very Overgrown · Bare Block / New Build · Not Applicable |
| 14 | Start Timeframe | `contact.start_timeframe` | Dropdown (single) | ASAP (this week) · Within 2 Weeks · Within a Month · Flexible / Comparing Prices · Specific Date (see notes) |
| 15 | Site Access | `contact.site_access` | Checkbox | Easy Access · Side Gate · Locked Gate / Code Needed · Dog on Property · Steep or Sloped Block · Narrow Access · Not Sure |
| 16 | Landscaping Budget | `contact.landscaping_budget` | Dropdown (single) | Under $5,000 · $5,000 – $15,000 · $15,000 – $30,000 · Over $30,000 · Not Sure Yet |
| 17 | Preferred Contact Method | `contact.preferred_contact_method` | Radio select | Phone Call · SMS · Email · WhatsApp |
| 18 | Chat Lead Status | `contact.chat_lead_status` | Dropdown (single) | Qualified · Needs Daniel Review · Outside Service Area · Not a Fit |

If GHL generates a slightly different key, for example because a field with that name already exists, use the key GHL shows. Update the custom values in the notification workflow to match.

## Contact Info actions to set up in Kiley

A single Contact Info action can only map a limited number of fields. Split them into the four actions below, and delete your current separate "Suburb" and "Service Needed" actions so the same field isn't mapped twice. If GHL won't let you add every field to one action, split it into two.

For each field, GHL asks **"What to update in the field"**, and for custom fields, at least two **output examples**. Paste the text below.

### Action 1: Quote details

| Field | What to update in the field | Output examples |
|---|---|---|
| Service Needed | The main service the customer wants a quote for. If they want several, this is the first or main one. | Lawn Mowing / Hedge Trimming |
| Suburb | The suburb where the job is, not the customer's home suburb if different. | Castle Hill / Toongabbie |
| Property Address | The street address of the job, only if the customer chose to give it. | 12 Smith Street, Seven Hills / 4/18 Station Road, Westmead |
| Property Size | The approximate size of the lawn, garden or site. | Medium (300 – 700 m²) / Not sure |
| Job Notes | A short plain summary of the job in the customer's terms: what needs doing, size, specific dates, photos sent, and anything that does not fit another field. | Front and back lawn, overgrown since owner moved out, wants edges done and green waste taken. Sent 2 photos. / Double driveway and front path, moss on the path, house going to auction on 6 December. |
| Additional Services | Any extra services the customer wants on top of the main one. | Hedge Trimming / Weed Spraying, Pressure Washing |

### Action 2: Property and timing

| Field | What to update in the field | Output examples |
|---|---|---|
| Property Type | The kind of property the job is at. | House / Strata / Apartment Complex |
| Customer Role | The customer's relationship to the property. | Owner-Occupier / Strata / Property Manager |
| Service Frequency | Whether this is a one-off job or a regular service, and how often. | Fortnightly / One-off Job |
| Property Condition | The current state of the lawn, garden or hedge. | Slightly Overgrown / Well Maintained |
| Start Timeframe | When the customer would like the work done. | Within 2 Weeks / ASAP (this week) |

### Action 3: Access, budget and contact preference

| Field | What to update in the field | Output examples |
|---|---|---|
| Site Access | Anything about getting into the property. | Side Gate, Dog on Property / Easy Access |
| Landscaping Budget | Rough budget for a landscaping project. Only for Landscaping Projects. | $5,000 – $15,000 / Not Sure Yet |
| Preferred Contact Method | How the customer wants Daniel to get back to them. | SMS / Phone Call |

### Action 4: Lead status

| Field | What to update in the field | Output examples |
|---|---|---|
| Chat Lead Status | Set once, when the customer confirms the enquiry summary. Qualified if the service is offered, the suburb is in or near the service areas, and a name plus phone or email were given. Outside Service Area if the suburb is clearly outside Greater Sydney. Needs Daniel Review if coverage, scope or the request is uncertain. Not a Fit for spam, job seekers, suppliers or sales pitches. | Qualified / Needs Daniel Review |

## Note on how Contact Info saves

GHL's Contact Info action **only fills empty fields**. It never overwrites a value. A website form submission followed by a chat therefore keeps the website answers. If a customer corrects an answer in the chat, Daniel updates the field by hand, or a workflow step can overwrite it.
