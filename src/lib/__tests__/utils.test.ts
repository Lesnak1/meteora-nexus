import {
  cn,
  formatNumber,
  formatCurrency,
  formatPercentage,
  truncateAddress,
  sleep,
} from '../utils'

describe('Utility Functions', () => {
  describe('cn (className merger)', () => {
    it('should merge class names correctly', () => {
      expect(cn('px-2 py-1', 'text-sm')).toBe('px-2 py-1 text-sm')
    })

    it('should handle conditional classes', () => {
      expect(cn('base-class', true && 'conditional-class')).toBe('base-class conditional-class')
      expect(cn('base-class', false && 'conditional-class')).toBe('base-class')
    })

    it('should handle Tailwind conflicts', () => {
      expect(cn('px-2 px-4')).toBe('px-4')
      expect(cn('text-red-500 text-blue-500')).toBe('text-blue-500')
    })

    it('should handle empty inputs', () => {
      expect(cn()).toBe('')
      expect(cn('')).toBe('')
      expect(cn(null, undefined, false)).toBe('')
    })
  })

  describe('formatNumber', () => {
    it('should format zero correctly', () => {
      expect(formatNumber(0)).toBe('0')
    })

    it('should format small numbers', () => {
      expect(formatNumber(0.001)).toBe('< 0.01')
      expect(formatNumber(0.005)).toBe('< 0.01')
      expect(formatNumber(0.01)).toBe('0.01')
      expect(formatNumber(1.23)).toBe('1.23')
      expect(formatNumber(999)).toBe('999.00')
    })

    it('should format thousands', () => {
      expect(formatNumber(1000)).toBe('1.00K')
      expect(formatNumber(1500)).toBe('1.50K')
      expect(formatNumber(999999)).toBe('999.00K')
    })

    it('should format millions', () => {
      expect(formatNumber(1000000)).toBe('1.00M')
      expect(formatNumber(1500000)).toBe('1.50M')
      expect(formatNumber(999999999)).toBe('999.00M')
    })

    it('should format billions', () => {
      expect(formatNumber(1000000000)).toBe('1.00B')
      expect(formatNumber(1500000000)).toBe('1.50B')
    })

    it('should respect custom decimal places', () => {
      expect(formatNumber(1234, 0)).toBe('1K')
      expect(formatNumber(1234, 1)).toBe('1.2K')
      expect(formatNumber(1234, 3)).toBe('1.234K')
    })

    it('should handle negative numbers', () => {
      expect(formatNumber(-1000)).toBe('-1.00K')
      expect(formatNumber(-1500000)).toBe('-1.50M')
    })
  })

  describe('formatCurrency', () => {
    it('should format USD by default', () => {
      expect(formatCurrency(123.45)).toBe('$123.45')
      expect(formatCurrency(1000)).toBe('$1,000.00')
    })

    it('should handle different currencies', () => {
      expect(formatCurrency(123.45, 'EUR')).toMatch(/€123.45|123.45\s*€/)
      expect(formatCurrency(123.45, 'GBP')).toMatch(/£123.45/)
    })

    it('should handle small amounts with proper precision', () => {
      expect(formatCurrency(0.123456)).toBe('$0.123456')
      expect(formatCurrency(0.000001)).toBe('$0.000001')
    })

    it('should handle large amounts', () => {
      expect(formatCurrency(1234567.89)).toBe('$1,234,567.89')
    })

    it('should handle zero', () => {
      expect(formatCurrency(0)).toBe('$0.00')
    })

    it('should handle negative amounts', () => {
      expect(formatCurrency(-123.45)).toBe('-$123.45')
    })
  })

  describe('formatPercentage', () => {
    it('should format positive percentages', () => {
      expect(formatPercentage(5)).toBe('+5.00%')
      expect(formatPercentage(0.5)).toBe('+0.50%')
      expect(formatPercentage(123.456)).toBe('+123.46%')
    })

    it('should format negative percentages', () => {
      expect(formatPercentage(-5)).toBe('-5.00%')
      expect(formatPercentage(-0.5)).toBe('-0.50%')
      expect(formatPercentage(-123.456)).toBe('-123.46%')
    })

    it('should format zero', () => {
      expect(formatPercentage(0)).toBe('+0.00%')
    })

    it('should round to 2 decimal places', () => {
      expect(formatPercentage(1.234567)).toBe('+1.23%')
      expect(formatPercentage(-1.999)).toBe('-2.00%')
    })
  })

  describe('truncateAddress', () => {
    const fullAddress = 'So11111111111111111111111111111111111111112'

    it('should truncate with default 4 characters', () => {
      expect(truncateAddress(fullAddress)).toBe('So11...1112')
    })

    it('should truncate with custom character count', () => {
      expect(truncateAddress(fullAddress, 6)).toBe('So1111...111112')
      expect(truncateAddress(fullAddress, 2)).toBe('So...12')
    })

    it('should handle short addresses', () => {
      expect(truncateAddress('short', 4)).toBe('shor...hort')
      expect(truncateAddress('abc', 2)).toBe('ab...bc')
    })

    it('should handle edge cases', () => {
      expect(truncateAddress('a', 1)).toBe('a...a')
      expect(truncateAddress('', 4)).toBe('...')
    })
  })

  describe('sleep', () => {
    it('should resolve after specified time', async () => {
      const start = Date.now()
      await sleep(100)
      const end = Date.now()
      
      expect(end - start).toBeGreaterThanOrEqual(95) // Allow some timing variance
      expect(end - start).toBeLessThan(150)
    })

    it('should resolve immediately for zero time', async () => {
      const start = Date.now()
      await sleep(0)
      const end = Date.now()
      
      expect(end - start).toBeLessThan(10)
    })

    it('should return a promise', () => {
      const result = sleep(1)
      expect(result).toBeInstanceOf(Promise)
    })
  })
})