const Since= require('../lib/since')
const Helper = require('./support/database-helpers')

describe('Since', () => {
  describe('.timeSince', () => {
    it('should return a string of time since', () => {
      let result = Since.timeSince(new Date())

      expect(result).toEqual('Just now')
    })

    it('should return a string of time since (morning)', () => {
      let result = Since.timeSince(Helper.mockNewSecondDate(), Helper.mockNewDate())

      expect(result).toEqual('Yesterday at 08:03')
    })

    it('should return a string of time since (morning)', () => {
      let result = Since.timeSince(Helper.mockNewThirdDate(), Helper.mockNewDate())

      expect(result).toEqual('13 April at 08:03')
    })

    it('should return a string of time since (afternoon)', () => {
      let result = Since.timeSince(Helper.mockNewFourthDate(), Helper.mockNewThirdDate())

      expect(result).toEqual('Yesterday at 18:13')
    })

    it('should return a string of time since (afternoon)', () => {
      let result = Since.timeSince(Helper.mockNewFourthDate(), Helper.mockNewSecondDate())

      expect(result).toEqual('12 April at 18:13')
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

    it('should return a string of time since', () => {
      let result = Since.timeAgo(7200)

      expect(result).toEqual('2 hrs')
    })
  })

  describe('.minuteAgo', () => {
    it('should return a string of time since', () => {
      let result = Since.minutesAgo(30)

      expect(result).toEqual('Just now')
    })

    it('should return a string of time since', () => {
      let result = Since.minutesAgo(90)

      expect(result).toEqual('1 min')
    })

    it('should return a string of time since', () => {
      let result = Since.minutesAgo(150)

      expect(result).toEqual('2 mins')
    })
  })

  describe('.hoursAgo', () => {
    it('should return a string of time since', () => {
      let result = Since.hoursAgo(3600)

      expect(result).toEqual('1 hr')
    })

    it('should return a string of time since', () => {
      let result = Since.hoursAgo(7200)

      expect(result).toEqual('2 hrs')
    })
  })
})
