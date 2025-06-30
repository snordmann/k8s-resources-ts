import { MemoryResource } from '../../src/resources/MemoryResource';

describe('MemoryResource', () => {
  describe('constructor', () => {
    it('should create from bytes', () => {
      const mem = new MemoryResource('100B');
      expect(mem.valueOf()).toBe(100);
    });

    it('should create from kibibytes', () => {
      const mem = new MemoryResource('128Ki');
      expect(mem.valueOf()).toBe(128 * 1024);
    });

    it('should create from mebibytes', () => {
      const mem = new MemoryResource('128Mi');
      expect(mem.valueOf()).toBe(128 * 1024 ** 2);
    });

    it('should create from gibibytes', () => {
      const mem = new MemoryResource('1Gi');
      expect(mem.valueOf()).toBe(1024 ** 3);
    });

    it('should create from tebibytes', () => {
      const mem = new MemoryResource('1Ti');
      expect(mem.valueOf()).toBe(1024 ** 4);
    });

    it('should create from petibytes', () => {
      const mem = new MemoryResource('1Pi');
      expect(mem.valueOf()).toBe(1024 ** 5);
    });

    it('should create from exibytes', () => {
      const mem = new MemoryResource('1Ei');
      expect(mem.valueOf()).toBe(1024 ** 6);
    });

    it('should create from bytes without unit', () => {
      const mem = new MemoryResource('100');
      expect(mem.valueOf()).toBe(100);
    });

    it('should create from kilobytes', () => {
      const mem = new MemoryResource('128k');
      expect(mem.valueOf()).toBe(128 * 1000);
    });

    it('should create from megabytes', () => {
      const mem = new MemoryResource('128M');
      expect(mem.valueOf()).toBe(128 * 1000 ** 2);
    });

    it('should create from gigabytes', () => {
      const mem = new MemoryResource('1G');
      expect(mem.valueOf()).toBe(1000 ** 3);
    });

    it('should create from terabytes', () => {
      const mem = new MemoryResource('1T');
      expect(mem.valueOf()).toBe(1000 ** 4);
    });

    it('should create from petabytes', () => {
      const mem = new MemoryResource('1P');
      expect(mem.valueOf()).toBe(1000 ** 5);
    });

    it('should create from exabytes', () => {
      const mem = new MemoryResource('1E');
      expect(mem.valueOf()).toBe(1000 ** 6);
    });

    it('should throw on invalid format', () => {
      expect(() => new MemoryResource('invalid')).toThrow('Invalid memory resource format');
    });

    it('should throw on invalid unit', () => {
      expect(() => new MemoryResource('100x')).toThrow('Invalid memory unit');
    });

    it('should throw on negative value', () => {
      expect(() => new MemoryResource('-100Mi')).toThrow('Memory resources cannot be negative');
    });

    // Edge cases
    it('should handle decimal values', () => {
      const mem = new MemoryResource('0.5Gi');
      expect(mem.valueOf()).toBe(0.5 * 1024**3);
    });

    it('should handle zero with unit', () => {
      const mem = new MemoryResource('0B');
      expect(mem.valueOf()).toBe(0);
    });

    it('should handle zero without unit', () => {
      const mem = new MemoryResource('0');
      expect(mem.valueOf()).toBe(0);
    });

    it('should handle empty string', () => {
      expect(() => new MemoryResource('')).toThrow('Invalid memory resource format');
    });

    it('should handle whitespace', () => {
      expect(() => new MemoryResource(' 100Mi')).toThrow('Invalid memory resource format');
    });

    it('should handle very large values', () => {
      const mem = new MemoryResource('2Ei');
      expect(mem.valueOf()).toBe(2 * 1024 ** 6);
    });

    it('should throw on values larger than 2**63-1', () => {
      // 8 exibyte is 2**63 - 1, so we test 9 exibyte
      expect(() => new MemoryResource('9Ei')).toThrow("Memory resources must not be larger than 2^63-1");
    });
  });

  describe('static methods', () => {
    it('should create zero resource', () => {
      const mem = MemoryResource.zero();
      expect(mem.valueOf()).toBe(0);
    });

    it('should create from bytes', () => {
      const mem = MemoryResource.fromBytes(1024);
      expect(mem.valueOf()).toBe(1024);
    });

    it('should create from kibibytes', () => {
      const mem = MemoryResource.fromKiB(128);
      expect(mem.valueOf()).toBe(128 * 1024);
    });

    it('should create from mebibytes', () => {
      const mem = MemoryResource.fromMiB(128);
      expect(mem.valueOf()).toBe(128 * 1024 ** 2);
    });

    it('should create from gibibytes', () => {
      const mem = MemoryResource.fromGiB(1);
      expect(mem.valueOf()).toBe(1024 ** 3);
    });

    // Edge cases
    it('should throw on negative bytes', () => {
      expect(() => MemoryResource.fromBytes(-100)).toThrow('Memory resources cannot be negative');
    });

    it('should throw on negative kibibytes', () => {
      expect(() => MemoryResource.fromKiB(-100)).toThrow('Memory resources cannot be negative');
    });

    it('should throw on negative mebibytes', () => {
      expect(() => MemoryResource.fromMiB(-100)).toThrow('Memory resources cannot be negative');
    });

    it('should throw on negative gibibytes', () => {
      expect(() => MemoryResource.fromGiB(-100)).toThrow('Memory resources cannot be negative');
    });

    it('should throw on non-finite bytes', () => {
      expect(() => MemoryResource.fromBytes(Infinity)).toThrow('Memory resources must be finite numbers');
    });

    it('should throw on non-finite kibibytes', () => {
      expect(() => MemoryResource.fromKiB(Infinity)).toThrow('Memory resources must be finite numbers');
    });

    it('should throw on non-finite mebibytes', () => {
      expect(() => MemoryResource.fromMiB(Infinity)).toThrow('Memory resources must be finite numbers');
    });

    it('should throw on non-finite gibibytes', () => {
      expect(() => MemoryResource.fromGiB(Infinity)).toThrow('Memory resources must be finite numbers');
    });
  });

  describe('arithmetic operations', () => {
    it('should add resources', () => {
      const mem1 = new MemoryResource('128Mi');
      const mem2 = new MemoryResource('1Gi');
      const sum = mem1.plus(mem2);
      expect(sum.valueOf()).toBe(128 * 1024 ** 2 + 1024 ** 3);
    });

    it('should subtract resources', () => {
      const mem1 = new MemoryResource('1Gi');
      const mem2 = new MemoryResource('512Mi');
      const diff = mem1.minus(mem2);
      expect(diff.valueOf()).toBe(1024 ** 3 - 512 * 1024 ** 2);
    });

    it('should multiply by factor', () => {
      const mem = new MemoryResource('512Mi');
      const result = mem.times(2);
      expect(result.valueOf()).toBe(2 * 512 * 1024 ** 2);
    });

    it('should throw on negative result', () => {
      const mem1 = new MemoryResource('100Mi');
      const mem2 = new MemoryResource('200Mi');
      expect(() => mem1.minus(mem2)).toThrow('Memory resources cannot be negative');
    });

    // Edge cases
    it('should handle adding zero', () => {
      const mem = new MemoryResource('1Gi');
      const sum = mem.plus(MemoryResource.zero());
      expect(sum.valueOf()).toBe(1024 ** 3);
    });

    it('should handle subtracting zero', () => {
      const mem = new MemoryResource('1Gi');
      const diff = mem.minus(MemoryResource.zero());
      expect(diff.valueOf()).toBe(1024 ** 3);
    });

    it('should handle multiplying by zero', () => {
      const mem = new MemoryResource('1Gi');
      const result = mem.times(0);
      expect(result.valueOf()).toBe(0);
    });

    it('should handle multiplying by one', () => {
      const mem = new MemoryResource('1Gi');
      const result = mem.times(1);
      expect(result.valueOf()).toBe(1024 ** 3);
    });

    it('should throw on multiplying by negative factor', () => {
      const mem = new MemoryResource('1Gi');
      expect(() => mem.times(-1)).toThrow('Memory resources cannot be negative');
    });

    it('should throw on multiplying by non-finite factor', () => {
      const mem = new MemoryResource('1Gi');
      expect(() => mem.times(Infinity)).toThrow('Multiplication factor must be a finite number');
    });

    it('should handle unit conversion in addition', () => {
      const mem1 = new MemoryResource('1024Mi');
      const mem2 = new MemoryResource('1Gi');
      const sum = mem1.plus(mem2);
      expect(sum.valueOf()).toBe(2 * 1024 ** 3);
    });
  });

  describe('comparison operations', () => {
    it('should compare equal resources', () => {
      const mem1 = new MemoryResource('1Gi');
      const mem2 = new MemoryResource('1024Mi');
      expect(mem1.equals(mem2)).toBe(true);
    });

    it('should compare less than', () => {
      const mem1 = new MemoryResource('512Mi');
      const mem2 = new MemoryResource('1Gi');
      expect(mem1.isLessThan(mem2)).toBe(true);
    });

    it('should compare greater than', () => {
      const mem1 = new MemoryResource('2Gi');
      const mem2 = new MemoryResource('1Gi');
      expect(mem1.isGreaterThan(mem2)).toBe(true);
    });

    // Edge cases
    it('should compare equal zero values', () => {
      const mem1 = new MemoryResource('0');
      const mem2 = new MemoryResource('0B');
      expect(mem1.equals(mem2)).toBe(true);
    });

    it('should compare equal values with different units', () => {
      const mem1 = new MemoryResource('1Gi');
      const mem2 = new MemoryResource('1024Mi');
      expect(mem1.equals(mem2)).toBe(true);
    });

    it('should handle comparing with zero', () => {
      const mem = new MemoryResource('1Gi');
      expect(mem.isGreaterThan(MemoryResource.zero())).toBe(true);
    });

    it('should compare values across multiple unit conversions', () => {
      const mem1 = new MemoryResource('1Ti');
      const mem2 = new MemoryResource('1024Gi');
      expect(mem1.equals(mem2)).toBe(true);
    });
  });

  describe('string formatting', () => {
    it('should use sourceFormat as default (binarySI)', () => {
      const mem = new MemoryResource('2.5Gi');
      expect(mem.toString("BinarySI")).toBe(mem.toString());
      expect(mem.toString("DecimalSI")).not.toBe(mem.toString());
    });

    it('should use sourceFormat as default (decimalSI)', () => {
      const mem = new MemoryResource('2.5G');
      expect(mem.toString("DecimalSI")).toBe(mem.toString());
      expect(mem.toString("BinarySI")).not.toBe(mem.toString());
    });

    it('should format zero bytes in binary SI units', () => {
      const mem = new MemoryResource('0B');
      expect(mem.toString()).toBe('0B');
    });

    it('should format as binary SI units when creating from bytes', () => {
      const mem = MemoryResource.fromBytes(0);
      expect(mem.toString()).toBe('0B');
    });

    it('should format zero bytes in decimal SI units', () => {
      const mem = new MemoryResource('0');
      expect(mem.toString("DecimalSI")).toBe('0');
    });

    it('should format gigabytes bytes in binary SI units', () => {
      const mem = new MemoryResource('2Gi');
      expect(mem.toString("BinarySI")).toBe('2Gi');
    });
    it('should format gigabytes bytes in decimal SI units', () => {
      const mem = new MemoryResource('2G');
      expect(mem.toString("DecimalSI")).toBe('2G');
    });

    it('should format large byte values', () => {
      const mem = new MemoryResource('9999B');
      expect(mem.toString()).toBe('9.7646484375Ki');
    });
  });
}); 