const moment = require('moment')

const Outcomes = require('./Outcomes')

module.exports = {
  Virus: {
    duration: moment.duration(15, 'seconds'),
    successRate: 0.8,
    defendedBy: ['Antivirus'],
    outcomes: [Outcomes.Money, Outcomes.Item]
  },
  Phishing: {
    duration: moment.duration(15, 'seconds'),
    successRate: 0.8,
    defendedBy: ['AdBlocker', 'Detector'],
    outcomes: [Outcomes.Money, Outcomes.Item]
  }
}
