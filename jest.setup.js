import '@testing-library/jest-dom'

// Mock Intersection Observer
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock HTMLCanvasElement.getContext
HTMLCanvasElement.prototype.getContext = jest.fn()

// Mock requestAnimationFrame and cancelAnimationFrame
global.requestAnimationFrame = jest.fn((cb) => setTimeout(cb, 0))
global.cancelAnimationFrame = jest.fn((id) => clearTimeout(id))

// Mock Solana wallet adapter
jest.mock('@solana/wallet-adapter-react', () => ({
  useWallet: () => ({
    wallet: null,
    publicKey: null,
    connected: false,
    connecting: false,
    disconnecting: false,
    connect: jest.fn(),
    disconnect: jest.fn(),
  }),
  useConnection: () => ({
    connection: {
      getBalance: jest.fn().mockResolvedValue(1000000000),
      getAccountInfo: jest.fn().mockResolvedValue(null),
    },
  }),
}))

// Mock crypto global for Node.js environment
const crypto = require('crypto')
Object.defineProperty(globalThis, 'crypto', {
  value: {
    randomUUID: crypto.randomUUID,
    getRandomValues: (arr) => crypto.randomBytes(arr.length),
  },
})

// Suppress console errors during tests
const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is deprecated')
    ) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})