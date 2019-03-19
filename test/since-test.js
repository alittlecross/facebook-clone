const Since = require('../lib/since')
const Helper = require('./test-helpers')

const expect = require('chai').expect

describe('Since', () => {
  describe('.timeSince', () => {
    it('should return a string of time since', () => {
      let result = Since.timeSince(new Date())

      expect(result).equal('Just now')
    })

    it('should return a string of time since (morning)', () => {
      let result = Since.timeSince(Helper.mockNewSecondDate(), Helper.mockNewDate())

      expect(result).equal('Yesterday at 08:03')
    })

    it('should return a string of time since (morning)', () => {
      let result = Since.timeSince(Helper.mockNewThirdDate(), Helper.mockNewDate())

      expect(result).equal('13 April at 08:03')
    })

    it('should return a string of time since (afternoon)', () => {
      let result = Since.timeSince(Helper.mockNewFourthDate(), Helper.mockNewThirdDate())

      expect(result).equal('Yesterday at 18:13')
    })

    it('should return a string of time since (afternoon)', () => {
      let result = Since.timeSince(Helper.mockNewFourthDate(), Helper.mockNewSecondDate())

      expect(result).equal('12 April at 18:13')
    })
  })

  describe('.formatAsDate', () => {
    it('should return a string of a date', () => {
      let result = Since.formatAsDate(Helper.mockNewDate())

      expect(result).equal('15 April at 08:03')
    })
  })

  describe('.formateAsYesterday', () => {
    it('should return a string of "yesterday" and a time', () => {
      let result = Since.formatAsYesterday(Helper.mockNewDate())

      expect(result).equal('Yesterday at 08:03')
    })
  })

  describe('.formateAsTime', () => {
    it('should return a string of time since', () => {
      let result = Since.formatAsTime(new Date())

      expect(result).equal('Just now')
    })
  })

  describe('.timeAgo', () => {
    it('should return a string of time since', () => {
      let result = Since.timeAgo(30)

      expect(result).equal('Just now')
    })

    it('should return a string of time since', () => {
      let result = Since.timeAgo(7200)

      expect(result).equal('2 hrs')
    })
  })

  describe('.minuteAgo', () => {
    it('should return a string of time since', () => {
      let result = Since.minutesAgo(30)

      expect(result).equal('Just now')
    })

    it('should return a string of time since', () => {
      let result = Since.minutesAgo(90)

      expect(result).equal('1 min')
    })

    it('should return a string of time since', () => {
      let result = Since.minutesAgo(150)

      expect(result).equal('2 mins')
    })
  })

  describe('.hoursAgo', () => {
    it('should return a string of time since', () => {
      let result = Since.hoursAgo(3600)

      expect(result).equal('1 hr')
    })

    it('should return a string of time since', () => {
      let result = Since.hoursAgo(7200)

      expect(result).equal('2 hrs')
    })
  })
})
