// tests/move/identity_guardian.test.move
#[test_only]
module movedid_ai_guardian::identity_guardian_tests {
    use std::signer;
    use movedid_ai_guardian::identity_guardian;

    #[test]
    fun test_initialize_identity_profile() {
        let account = signer::create_signer_for_test(@0x123);
        identity_guardian::initialize(&account);
        
        // Assert profile is created
        assert!(exists<IdentityProfile>(signer::address_of(&account)), 1);
    }

    #[test]
    fun test_update_risk_score() {
        let account = signer::create_signer_for_test(@0x123);
        identity_guardian::initialize(&account);
        
        identity_guardian::update_risk_score(&account, 2);
        
        // Retrieve and assert risk score update
        let profile = borrow_global<IdentityProfile>(signer::address_of(&account));
        assert!(profile.risk_score == 2, 2);
    }
}

// tests/frontend/identity-dashboard.test.tsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import { IdentityDashboard } from '@/components/identity-dashboard'
import { useWallet } from '@aptos-labs/wallet-adapter-react'

// Mock wallet hook
jest.mock('@aptos-labs/wallet-adapter-react', () => ({
  useWallet: jest.fn()
}))

describe('IdentityDashboard', () => {
  it('renders dashboard when account is connected', () => {
    const mockAccount = {
      address: '0x123456789'
    }
    
    // @ts-ignore
    useWallet.mockReturnValue({ account: mockAccount })

    render(<IdentityDashboard />)
    
    expect(screen.getByText(/Connected Account/i)).toBeInTheDocument()
    expect(screen.getByText('0x123456789')).toBeInTheDocument()
  })
})

// tests/ai/risk-analysis.test.ts
import { analyzeIdentityRisk } from '@/utils/ai-risk-analysis'

describe('AI Risk Analysis', () => {
  it('returns a valid risk score', async () => {
    const riskScore = await analyzeIdentityRisk()
    
    expect(riskScore).toBeGreaterThanOrEqual(0)
    expect(riskScore).toBeLessThanOrEqual(100)
  })
})
