import type { CheckResult, Provider, UserStatus } from '@/stores/signin-store'

// Mock directory of users by email
// You can adjust this list to test different flows
const users: Record<string, { providers: Provider[]; status: UserStatus }> = {
  'active.email@example.com': { providers: ['email'], status: 'active' },
  'active.google@example.com': { providers: ['google'], status: 'active' },
  'active.telegram@example.com': { providers: ['telegram'], status: 'active' },
  'active.mixed@example.com': {
    providers: ['email', 'google', 'telegram'],
    status: 'active',
  },
  'inactive.email@example.com': { providers: ['email'], status: 'inactive' },
}

export async function checkUser(email: string): Promise<CheckResult> {
  // Simulate network latency
  await new Promise((r) => setTimeout(r, 600))
  const rec = users[email.toLowerCase()]
  if (!rec) {
    return { exists: false, providers: ['email'], status: 'inactive' }
  }
  return { exists: true, providers: rec.providers, status: rec.status }
}
