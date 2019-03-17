const Since= require('../lib/since')
const Helper = require('./support/database-helpers')

describe('Since', () => {
  describe('.timeSince', () => {
    it('should return a string of time since', () => {
      let result = Since.timeSince(new Date())

      expect(result).toEqual('Just now')
    })
  })

  describe('.formatAsDate', () => {
    it('should return a string of a date', () => {
      let result = Since.formatAsDate(Helper.mockNewDate())

      expect(result).toEqual('15 April at 08:03')
    })
  })

  describe('.formateAsYesterday', () => {
    it('should return a string of "yesterday" and a time', () => {
      let result = Since.formatAsYesterday(Helper.mockNewDate())

      expect(result).toEqual('Yesterday at 08:03')
    })
  })

  describe('.formateAsTime', () => {
    it('should return a string of time since', () => {
      let result = Since.formatAsTime(new Date())

      expect(result).toEqual('Just now')
    })
  })

  describe('.timeAgo', () => {
    it('should return a string of time since', () => {
      let result = Since.timeAgo(30)

      expect(result).toEqual('Just now')
    })
  })

  describe('.minuteAgo', () => {
    it('should return a string of time since', () => {
      let result = Since.minutesAgo(30)

      expect(result).toEqual('Just now')
    })
  })

  describe('.hoursAgo', () => {
    it('should return a string of time since', () => {
      let result = Since.hoursAgo(7200)

      expect(result).toEqual('2 hrs')
    })
  })
})
