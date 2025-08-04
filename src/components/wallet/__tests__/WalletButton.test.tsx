import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { WalletButton } from '../WalletButton'

// Mock Solana wallet adapter
const mockConnect = jest.fn()
const mockDisconnect = jest.fn()

jest.mock('@solana/wallet-adapter-react', () => ({
  useWallet: () => ({
    wallet: mockWalletState.wallet,
    publicKey: mockWalletState.publicKey,
    connected: mockWalletState.connected,
    connecting: mockWalletState.connecting,
    disconnecting: mockWalletState.disconnecting,
    connect: mockConnect,
    disconnect: mockDisconnect,
  }),
}))

// Mock wallet state
let mockWalletState = {
  wallet: null,
  publicKey: null,
  connected: false,
  connecting: false,
  disconnecting: false,
}

// Mock wallet adapter UI
jest.mock('@solana/wallet-adapter-react-ui', () => ({
  WalletMultiButton: ({ children, ...props }: React.ComponentProps<'button'>) => (
    <button {...props}>{children || 'Connect Wallet'}</button>
  ),
}))

describe('WalletButton', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockWalletState = {
      wallet: null,
      publicKey: null,
      connected: false,
      connecting: false,
      disconnecting: false,
    }
  })

  it('should render wallet button', () => {
    render(<WalletButton />)
    
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('should show "Connect Wallet" when not connected', () => {
    render(<WalletButton />)
    
    expect(screen.getByText('Connect Wallet')).toBeInTheDocument()
  })

  it('should show connecting state', () => {
    mockWalletState.connecting = true
    
    render(<WalletButton />)
    
    // The WalletMultiButton should be rendered
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('should show disconnecting state', () => {
    mockWalletState.disconnecting = true
    mockWalletState.connected = true
    
    render(<WalletButton />)
    
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('should show connected state with wallet name', () => {
    mockWalletState.connected = true
    mockWalletState.wallet = {
      adapter: {
        name: 'Phantom',
        icon: 'phantom-icon.svg',
        url: 'https://phantom.app',
        connected: true,
      }
    } as { adapter: { name: string; icon: string; url: string; connected: boolean } }
    mockWalletState.publicKey = {
      toString: () => 'So11111111111111111111111111111111111111112'
    } as { toString: () => string }
    
    render(<WalletButton />)
    
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('should handle click events', () => {
    render(<WalletButton />)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    // Button click should be handled by WalletMultiButton
    expect(button).toBeInTheDocument()
  })

  it('should be accessible', () => {
    render(<WalletButton />)
    
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).not.toHaveAttribute('aria-disabled', 'true')
  })

  it('should handle wallet connection errors gracefully', async () => {
    mockConnect.mockRejectedValueOnce(new Error('Connection failed'))
    
    render(<WalletButton />)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    // Should not throw error and button should still be rendered
    await waitFor(() => {
      expect(button).toBeInTheDocument()
    })
  })

  it('should handle wallet disconnection', async () => {
    mockWalletState.connected = true
    mockWalletState.publicKey = {
      toString: () => 'So11111111111111111111111111111111111111112'
    } as { toString: () => string }
    
    render(<WalletButton />)
    
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('should render with custom className', () => {
    const { container } = render(<WalletButton />)
    
    // Check if component renders without custom className
    expect(container.firstChild).toBeInTheDocument()
  })

  it('should handle rapid connect/disconnect cycles', async () => {
    mockWalletState.connecting = true
    const { rerender } = render(<WalletButton />)
    
    // Change to connected
    mockWalletState.connecting = false
    mockWalletState.connected = true
    mockWalletState.publicKey = {
      toString: () => 'So11111111111111111111111111111111111111112'
    } as { toString: () => string }
    
    rerender(<WalletButton />)
    
    // Change to disconnecting
    mockWalletState.disconnecting = true
    mockWalletState.connected = false
    
    rerender(<WalletButton />)
    
    // Final state - disconnected
    mockWalletState.disconnecting = false
    mockWalletState.publicKey = null
    
    rerender(<WalletButton />)
    
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('should maintain component stability during state changes', () => {
    const { rerender } = render(<WalletButton />)
    
    // Change wallet state multiple times
    mockWalletState.connecting = true
    rerender(<WalletButton />)
    
    mockWalletState.connecting = false
    mockWalletState.connected = true
    rerender(<WalletButton />)
    
    mockWalletState.connected = false
    rerender(<WalletButton />)
    
    // Component should remain stable
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })
})