class Since {
  static timeSince (data) {
    let postDate = new Date(data.getFullYear(), data.getMonth(), data.getDate())
    let nowDateTime = new Date()
    let nowDate = new Date(nowDateTime.getFullYear(), nowDateTime.getMonth(), nowDateTime.getDate())
    let days = nowDate - postDate

    if (days > 86400000) {
      return this.formatAsDate(data)
    } else if (days === 86400000) {
      return this.formatAsYesterday(data)
    } else {
      return this.formatAsTime(data)
    }
  }

  static formatAsDate (data) {
    let day = data.getDate()
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let month = months[data.getMonth()]
    let hours = (data.getHours().toString().length === 1) ? `0${data.getHours()}` : data.getHours()
    let minutes = (data.getMinutes().toString().length === 1) ? `0${data.getMinutes()}` : data.getMinutes()
    return `${day} ${month} at ${hours}:${minutes}`
  }

  static formatAsYesterday (data) {
    let hours = (data.getHours().toString().length === 1) ? `0${data.getHours()}` : data.getHours()
    let minutes = (data.getMinutes().toString().length === 1) ? `0${data.getMinutes()}` : data.getMinutes()
    return `Yesterday at ${hours}:${minutes}`
  }

  static formatAsTime (data) {
    let milliseconds = data.getTime()
    let elapsed = Date.now() - milliseconds
    let seconds = elapsed / 1000
    return this.timeAgo(seconds)
  }

  static timeAgo (seconds) {
    if (seconds < 3600) {
      return this.minutesAgo(seconds)
    } else {
      return this.hoursAgo(seconds)
    }
  }

  static minutesAgo (seconds) {
    if (seconds < 60) {
      return `Just now`
    } else if (seconds < 120) {
      return `${Math.floor(seconds / 60)} min`
    } else {
      return `${Math.floor(seconds / 60)} mins`
    }
  }

  static hoursAgo (seconds) {
    if (seconds < 7200) {
      return `${Math.floor(seconds / 60 / 60)} hr`
    } else {
      return `${Math.floor(seconds / 60 / 60)} hrs`
    }
  }
}

module.exports = Since
