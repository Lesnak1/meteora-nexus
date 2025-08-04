import {
  sanitizeInput,
  validateNumericInput,
  createRateLimiter,
  apiRateLimiter,
  SECURITY_HEADERS,
} from '../security'

describe('Security Utilities', () => {
  describe('sanitizeInput', () => {
    it('should remove HTML tags', () => {
      expect(sanitizeInput('<script>alert("xss")</script>')).toBe('alert("xss")')
      expect(sanitizeInput('<div>content</div>')).toBe('content')
      expect(sanitizeInput('Hello <b>world</b>')).toBe('Hello world')
    })

    it('should remove javascript: protocols', () => {
      expect(sanitizeInput('javascript:alert("xss")')).toBe('alert("xss")')
      expect(sanitizeInput('JAVASCRIPT:void(0)')).toBe('void(0)')
    })

    it('should remove on-event handlers', () => {
      expect(sanitizeInput('onclick=alert(1)')).toBe('')
      expect(sanitizeInput('onload=malicious()')).toBe('')
      expect(sanitizeInput('onmouseover=hack()')).toBe('')
    })

    it('should trim whitespace', () => {
      expect(sanitizeInput('  hello world  ')).toBe('hello world')
      expect(sanitizeInput('\n\t text \r\n')).toBe('text')
    })

    it('should handle empty and null inputs', () => {
      expect(sanitizeInput('')).toBe('')
      expect(sanitizeInput('   ')).toBe('')
    })

    it('should preserve safe content', () => {
      expect(sanitizeInput('Hello World 123')).toBe('Hello World 123')
      expect(sanitizeInput('user@example.com')).toBe('user@example.com')
      expect(sanitizeInput('$SOL-USDC Pool')).toBe('$SOL-USDC Pool')
    })
  })

  describe('validateNumericInput', () => {
    it('should validate positive numbers', () => {
      expect(validateNumericInput(123)).toBe(true)
      expect(validateNumericInput(0.5)).toBe(true)
      expect(validateNumericInput(1000000)).toBe(true)
    })

    it('should handle zero', () => {
      expect(validateNumericInput(0)).toBe(true)
    })

    it('should reject negative numbers', () => {
      expect(validateNumericInput(-1)).toBe(false)
      expect(validateNumericInput(-0.1)).toBe(false)
    })

    it('should reject non-numbers', () => {
      expect(validateNumericInput('123')).toBe(false)
      expect(validateNumericInput(null)).toBe(false)
      expect(validateNumericInput(undefined)).toBe(false)
      expect(validateNumericInput({})).toBe(false)
      expect(validateNumericInput([])).toBe(false)
    })

    it('should reject NaN and Infinity', () => {
      expect(validateNumericInput(NaN)).toBe(false)
      expect(validateNumericInput(Infinity)).toBe(false)
      expect(validateNumericInput(-Infinity)).toBe(false)
    })

    it('should reject numbers that are too large', () => {
      expect(validateNumericInput(Number.MAX_SAFE_INTEGER + 1)).toBe(false)
      expect(validateNumericInput(1e20)).toBe(false)
    })
  })

  describe('createRateLimiter', () => {
    it('should allow requests within limit', () => {
      const limiter = createRateLimiter(5, 60000) // 5 requests per minute
      
      expect(limiter.isAllowed('client1')).toBe(true)
      expect(limiter.isAllowed('client1')).toBe(true)
      expect(limiter.isAllowed('client1')).toBe(true)
    })

    it('should block requests exceeding limit', () => {
      const limiter = createRateLimiter(2, 60000) // 2 requests per minute
      
      expect(limiter.isAllowed('client1')).toBe(true)
      expect(limiter.isAllowed('client1')).toBe(true)
      expect(limiter.isAllowed('client1')).toBe(false) // Third request blocked
    })

    it('should handle different clients separately', () => {
      const limiter = createRateLimiter(2, 60000)
      
      expect(limiter.isAllowed('client1')).toBe(true)
      expect(limiter.isAllowed('client2')).toBe(true)
      expect(limiter.isAllowed('client1')).toBe(true)
      expect(limiter.isAllowed('client2')).toBe(true)
      expect(limiter.isAllowed('client1')).toBe(false)
      expect(limiter.isAllowed('client2')).toBe(false)
    })

    it('should reset after time window', (done) => {
      const limiter = createRateLimiter(1, 100) // 1 request per 100ms
      
      expect(limiter.isAllowed('client1')).toBe(true)
      expect(limiter.isAllowed('client1')).toBe(false)
      
      setTimeout(() => {
        expect(limiter.isAllowed('client1')).toBe(true)
        done()
      }, 150)
    })

    it('should clean up old entries', () => {
      const limiter = createRateLimiter(5, 60000)
      const cleanupSpy = jest.spyOn(limiter as { cleanup: () => void }, 'cleanup')
      
      // Make multiple requests to trigger cleanup
      for (let i = 0; i < 12; i++) {
        limiter.isAllowed(`client${i}`)
      }
      
      expect(cleanupSpy).toHaveBeenCalled()
    })
  })

  describe('apiRateLimiter', () => {
    it('should be properly configured', () => {
      expect(apiRateLimiter).toBeDefined()
      expect(typeof apiRateLimiter.isAllowed).toBe('function')
    })

    it('should work with default configuration', () => {
      // Should allow initial requests
      expect(apiRateLimiter.isAllowed('test-client')).toBe(true)
    })
  })

  describe('SECURITY_HEADERS', () => {
    it('should include essential security headers', () => {
      const headerKeys = SECURITY_HEADERS.map(h => h.key.toLowerCase())
      
      expect(headerKeys).toContain('x-dns-prefetch-control')
      expect(headerKeys).toContain('x-frame-options')
      expect(headerKeys).toContain('x-content-type-options')
      expect(headerKeys).toContain('referrer-policy')
      expect(headerKeys).toContain('permissions-policy')
    })

    it('should have proper CSP configuration', () => {
      const cspHeader = SECURITY_HEADERS.find(h => 
        h.key.toLowerCase() === 'content-security-policy'
      )
      
      expect(cspHeader).toBeDefined()
      expect(cspHeader!.value).toContain("default-src 'self'")
      expect(cspHeader!.value).toContain('connect-src')
      expect(cspHeader!.value).toContain('img-src')
    })

    it('should prevent clickjacking', () => {
      const frameOptions = SECURITY_HEADERS.find(h => 
        h.key.toLowerCase() === 'x-frame-options'
      )
      
      expect(frameOptions).toBeDefined()
      expect(frameOptions!.value).toBe('DENY')
    })

    it('should prevent MIME type sniffing', () => {
      const contentTypeOptions = SECURITY_HEADERS.find(h => 
        h.key.toLowerCase() === 'x-content-type-options'
      )
      
      expect(contentTypeOptions).toBeDefined()
      expect(contentTypeOptions!.value).toBe('nosniff')
    })
  })
})