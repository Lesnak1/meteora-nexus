import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import { CustomCursor } from '../CustomCursor'

// Mock requestAnimationFrame and cancelAnimationFrame
let rafCallback: FrameRequestCallback | null = null
const mockRaf = jest.fn((callback: FrameRequestCallback) => {
  rafCallback = callback
  return 1
})
const mockCancelRaf = jest.fn()

beforeAll(() => {
  global.requestAnimationFrame = mockRaf
  global.cancelAnimationFrame = mockCancelRaf
})

afterAll(() => {
  global.requestAnimationFrame = jest.fn()
  global.cancelAnimationFrame = jest.fn()
})

// Mock MutationObserver
const mockObserve = jest.fn()
const mockDisconnect = jest.fn()
const mockMutationObserver = jest.fn(function(this: { observe: jest.Mock; disconnect: jest.Mock; callback: MutationCallback }, callback: MutationCallback) {
  this.observe = mockObserve
  this.disconnect = mockDisconnect
  this.callback = callback
})
global.MutationObserver = mockMutationObserver as jest.MockedClass<typeof MutationObserver>

describe('CustomCursor', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockRaf.mockClear()
    mockCancelRaf.mockClear()
    mockObserve.mockClear()
    mockDisconnect.mockClear()
    rafCallback = null
  })

  it('should render cursor elements', () => {
    render(<CustomCursor />)
    
    // The cursor should be rendered but may not be visible in test environment
    const cursorElements = document.querySelectorAll('[aria-hidden="true"]')
    expect(cursorElements.length).toBeGreaterThan(0)
  })

  it('should not render when user prefers reduced motion', () => {
    // Mock matchMedia to return reduced motion preference
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })

    const { container } = render(<CustomCursor />)
    expect(container.firstChild).toBeNull()
  })

  it('should update position on mouse move', () => {
    // Mock matchMedia to return no reduced motion preference
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })

    render(<CustomCursor />)

    // Simulate mouse move
    const mouseEvent = new MouseEvent('mousemove', {
      clientX: 100,
      clientY: 200,
    })

    act(() => {
      fireEvent(document, mouseEvent)
    })

    // Verify RAF was called
    expect(mockRaf).toHaveBeenCalled()

    // Execute the RAF callback
    if (rafCallback) {
      act(() => {
        rafCallback(0)
      })
    }

    // Check if cursor position updated
    const cursorElement = document.querySelector('[style*="translate3d"]')
    expect(cursorElement).toBeTruthy()
  })

  it('should throttle mouse move events', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
        matches: false,
        media: '',
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })

    render(<CustomCursor />)

    // Mock Date.now to control throttling
    const originalNow = Date.now
    let mockTime = 0
    Date.now = jest.fn(() => mockTime)

    // First move should be processed
    act(() => {
      fireEvent(document, new MouseEvent('mousemove', { clientX: 100, clientY: 200 }))
    })
    expect(mockRaf).toHaveBeenCalledTimes(1)

    // Second move within throttle window should be ignored
    mockTime = 10 // Less than 16ms
    act(() => {
      fireEvent(document, new MouseEvent('mousemove', { clientX: 110, clientY: 210 }))
    })
    expect(mockRaf).toHaveBeenCalledTimes(1) // Still 1

    // Third move after throttle window should be processed
    mockTime = 20 // More than 16ms
    act(() => {
      fireEvent(document, new MouseEvent('mousemove', { clientX: 120, clientY: 220 }))
    })
    expect(mockRaf).toHaveBeenCalledTimes(2)

    Date.now = originalNow
  })

  it('should handle mouse down and up events', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
        matches: false,
        media: '',
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })

    render(<CustomCursor />)

    // Simulate mouse down
    act(() => {
      fireEvent(document, new MouseEvent('mousedown'))
    })

    // Simulate mouse up
    act(() => {
      fireEvent(document, new MouseEvent('mouseup'))
    })

    // Events should be handled without errors
    expect(document.addEventListener).toHaveBeenCalledWith('mousedown', expect.any(Function), { passive: true })
    expect(document.addEventListener).toHaveBeenCalledWith('mouseup', expect.any(Function), { passive: true })
  })

  it('should detect interactive elements', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
        matches: false,
        media: '',
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })

    // Add some interactive elements to the document
    const button = document.createElement('button')
    button.textContent = 'Test Button'
    document.body.appendChild(button)

    const link = document.createElement('a')
    link.href = '#'
    link.textContent = 'Test Link'
    document.body.appendChild(link)

    render(<CustomCursor />)

    // Verify MutationObserver was set up
    expect(mockMutationObserver).toHaveBeenCalled()
    expect(mockObserve).toHaveBeenCalledWith(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['disabled', 'aria-disabled', 'tabindex']
    })

    // Clean up
    document.body.removeChild(button)
    document.body.removeChild(link)
  })

  it('should cancel RAF on cleanup', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
        matches: false,
        media: '',
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })

    const { unmount } = render(<CustomCursor />)

    // Trigger a mouse move to create a RAF request
    act(() => {
      fireEvent(document, new MouseEvent('mousemove', { clientX: 100, clientY: 200 }))
    })

    // Unmount component
    unmount()

    // Verify cleanup was called
    expect(mockCancelRaf).toHaveBeenCalled()
    expect(mockDisconnect).toHaveBeenCalled()
  })

  it('should have proper CSS classes for styling', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
        matches: false,
        media: '',
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })

    render(<CustomCursor />)

    const cursorContainer = document.querySelector('.fixed.top-0.left-0.pointer-events-none')
    expect(cursorContainer).toBeTruthy()
    expect(cursorContainer).toHaveClass('z-[9999]', 'will-change-transform')
  })

  it('should update interactive elements when DOM changes', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
        matches: false,
        media: '',
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })

    render(<CustomCursor />)

    // Get the MutationObserver callback
    const observerCallback = mockMutationObserver.mock.calls[0][0]

    // Mock setTimeout for debouncing
    const originalSetTimeout = global.setTimeout
    const mockSetTimeout = jest.fn((callback) => {
      // Execute immediately for test
      callback()
      return 1
    })
    global.setTimeout = mockSetTimeout as typeof setTimeout

    // Simulate DOM mutation
    act(() => {
      observerCallback([{ type: 'childList' }])
    })

    expect(mockSetTimeout).toHaveBeenCalledWith(expect.any(Function), 100)

    global.setTimeout = originalSetTimeout
  })
})