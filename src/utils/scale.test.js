import { toPixelX, toPixelY } from './scale.js'

describe('toPixelX', () => {
  test('maps minX to the left padding', () => {
    // Arrange
    const minX = 0
    const maxX = 100
    const width = 500
    const padding = 20

    // Act
    const result = toPixelX(minX, minX, maxX, width, padding)

    // Assert
    expect(result).toBe(20) // sits exactly on the left padding
  })

  test('maps maxX to the right padding', () => {
    expect(toPixelX(100, 0, 100, 500, 20)).toBe(480) // 500 - 20
  })

  test('maps the midpoint to the center of the plot area', () => {
    expect(toPixelX(50, 0, 100, 500, 20)).toBe(250)
  })

  test('centers the value when minX equals maxX (degenerate range)', () => {
    // avoids division by zero — everything sits in the middle
    expect(toPixelX(42, 42, 42, 500, 20)).toBe(250)
  })
})

describe('toPixelY', () => {
  test('maps minY to the bottom of the plot area (Y is flipped)', () => {
    expect(toPixelY(0, 0, 100, 400, 20)).toBe(380) // 400 - 20
  })

  test('maps maxY to the top of the plot area', () => {
    expect(toPixelY(100, 0, 100, 400, 20)).toBe(20)
  })

  test('maps the midpoint to the center of the plot area', () => {
    expect(toPixelY(50, 0, 100, 400, 20)).toBe(200)
  })

  test('centers the value when minY equals maxY (degenerate range)', () => {
    // avoids division by zero — flat series sits in the middle
    expect(toPixelY(42, 42, 42, 400, 20)).toBe(200)
  })
})
