// src/api/automations.ts
export interface AutomationDefinition {
  id: string;
  label: string;
  params: string[];
}

// simple local mock of GET /automations
const MOCK_AUTOMATIONS: AutomationDefinition[] = [
  { id: 'send_email', label: 'Send Email', params: ['to', 'subject'] },
  { id: 'generate_doc', label: 'Generate Document', params: ['template', 'recipient'] },
];

export async function fetchAutomations(): Promise<AutomationDefinition[]> {
  // simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return MOCK_AUTOMATIONS;
}
