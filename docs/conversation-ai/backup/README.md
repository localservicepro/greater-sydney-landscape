# GHL backup before the Kiley setup (2026-11-11)

Read-only snapshots taken through the HighLevel API before anything was changed. Location `hxBiznDzJDX1axVNbS9J`, Kiley agent `DWddiXECUA3yLyBpkQhM`.

- `kiley-agent.json`: the agent config (prompt, mode, channels, sleep settings, knowledge bases)
- `action-*.json`: each of Kiley's actions (two Contact Info, Human Handover, two Stop Bot, Trigger a Workflow)
- `custom-fields-v1.json`: the contact custom fields
- `custom-values.json`: custom value names (the list endpoint returns no values)
- `workflows.json`, `pipelines.json`: workflow list and pipelines with stages
- `knowledge-bases.json`, `kb-greater-sydney-landscapes*.json`: knowledge bases and the files in the GSL one
- `custom-fields-v2-contact.json`: an error response, kept to record that the v2 custom-fields API does not serve contact fields
