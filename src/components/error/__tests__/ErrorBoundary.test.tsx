import React from 'react'
import { render, screen } from '@testing-library/react'
import { ErrorBoundary } from '../ErrorBoundary'

// Component that throws an error for testing
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error')
  }
  return <div>No error</div>
}

// Mock console.error to avoid noise in test output
const originalError = console.error
beforeAll(() => {
  console.error = jest.fn()
})

afterAll(() => {
  console.error = originalError
})

describe('ErrorBoundary', () => {
  beforeEach(() => {
    // Clear mock calls before each test
    ;(console.error as jest.Mock).mockClear()
  })

  it('should render children when there is no error', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    )

    expect(screen.getByText('No error')).toBeInTheDocument()
  })

  it('should render error UI when there is an error', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(screen.getByText('We apologize for the inconvenience. Please try refreshing the page.')).toBeInTheDocument()
  })

  it('should display refresh button in error state', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    const refreshButton = screen.getByRole('button', { name: /refresh page/i })
    expect(refreshButton).toBeInTheDocument()
  })

  it('should display error details in development mode', () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText('Error Details (Development Only):')).toBeInTheDocument()
    expect(screen.getByText(/Test error/)).toBeInTheDocument()

    process.env.NODE_ENV = originalEnv
  })

  it('should not display error details in production mode', () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'production'

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.queryByText('Error Details (Development Only):')).not.toBeInTheDocument()
    expect(screen.queryByText(/Test error/)).not.toBeInTheDocument()

    process.env.NODE_ENV = originalEnv
  })

  it('should render custom fallback when provided', () => {
    const CustomFallback = () => <div>Custom error message</div>

    render(
      <ErrorBoundary fallback={<CustomFallback />}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText('Custom error message')).toBeInTheDocument()
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument()
  })

  it('should call console.error when an error occurs', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(console.error).toHaveBeenCalled()
  })

  it('should have proper aria attributes for accessibility', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    const errorContainer = screen.getByRole('alert')
    expect(errorContainer).toBeInTheDocument()
    expect(errorContainer).toHaveAttribute('aria-live', 'assertive')
  })

  it('should maintain error state across re-renders', () => {
    const { rerender } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()

    // Re-render with same error
    rerender(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  it('should reset error state when children change to non-error', () => {
    const { rerender } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()

    // Re-render with no error - error boundary should reset
    rerender(
      <ErrorBoundary>
        <div>New content</div>
      </ErrorBoundary>
    )

    expect(screen.getByText('New content')).toBeInTheDocument()
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument()
  })

  it('should handle string errors', () => {
    const ThrowStringError = () => {
      throw 'String error'
    }

    render(
      <ErrorBoundary>
        <ThrowStringError />
      </ErrorBoundary>
    )

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  it('should handle nested error boundaries', () => {
    const InnerThrowError = () => {
      throw new Error('Inner error')
    }

    render(
      <ErrorBoundary>
        <div>Outer boundary</div>
        <ErrorBoundary>
          <InnerThrowError />
        </ErrorBoundary>
      </ErrorBoundary>
    )

    // Inner error boundary should catch the error
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(screen.getByText('Outer boundary')).toBeInTheDocument()
  })
})