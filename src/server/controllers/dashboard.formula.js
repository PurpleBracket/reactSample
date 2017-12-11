import moment from 'moment'

export default class DashboardFormula {
  constructor (data, start, end) {
    // this.data = data.filter(d => !Array.isArray(d))
    this.data = data
    this.start = start
    this.end = end

    this.subtype = {
      brokerage: ['401k', 'brokerage', 'ira', 'retirement', 'roth', 'ugma'],
      credit: ['credit card', 'paypal', 'line of credit', 'rewards'],
      depository: ['checking', 'savings', 'money market', 'paypal', 'prepaid'],
      loan: ['auto', 'commercial', 'construction', 'consumer', 'home', 'home equity', 'loan', 'mortgage', 'overdraft', 'line of credit', 'student'],
      mortgage: ['home'],
      other: ['403B', 'cash management', 'cd', 'hsa', 'keogh', 'money market', 'mutual fund', 'prepaid', 'recurring', 'rewards', 'safe deposit', 'sarsep', 'other']
    }

    this.__calculate()
  }

  __calculate () {
    this.accounts = this.data.map(d => {
      return d.map(i => {
        return [...i.accounts]
      })

      // // We return the first element only because all accounts for each of the elements in the array at that index is the same
      // return d[0].accounts
    })

    this.accounts = [].concat(...this.accounts)
    this.accounts = [].concat(...this.accounts)
    this.accounts = this.accounts.filter(a => typeof (a) !== 'undefined')
    this.checking = [].concat(...this.data.filter(acc => acc[0].accounts[0].subtype === 'checking'))

    this.availableCash = this.accounts.filter(a => a.subtype === 'checking').reduce((prev, next) => prev + next.balances.available, 0)
    this.treasure = this.accounts.filter(a => a.subtype === 'money market').reduce((prev, next) => prev + next.balances.available, 0)
    this.credit = this.accounts.filter(a => a.subtype === 'credit card').reduce((prev, next) => prev + next.balances.available, 0)

    this.__calculateTotalDebitsInChecking()
    this.__calculateCashflowChart()
  }

  __calculateTotalDebitsInChecking () {
    let debit = []

    for (let i = 0; i < this.checking.length; i++) {
      debit[i] = 0

      for (let j = 0; j < this.checking[i].transactions.length; j++) {
        let transaction = this.checking[i].transactions[j]

        if (transaction.amount > 0) {
          debit[i] += transaction.amount
        }
      }
    }

    this.totalDebitsInChecking = debit.reduce((p, n) => p + n, 0)
  }

  __calculateCashflowChart () {
    // For given time frame - go to the past year
    // Create buckets
    let buckets = {}
    let start = this.start.clone()
    for (let i = 0; i < 13; i++) {
      buckets[start.add(i === 0 ? 0 : 1, 'month').format('YYYY-MMM')] = {
        name: start.format('MMM'),
        bucket: start.format('YYYY-MMM'),
        inflow: 0,
        outflow: 0,
        ratio: 0
      }
    }

    // Calculate inflow / outflow and group into buckets

    for (let i = 0; i < this.checking.length; i++) {
      for (let j = 0; j < this.checking[i].transactions.length; j++) {
        let transaction = this.checking[i].transactions[j]
        let bucket = moment(transaction.date).format('YYYY-MMM')

        // outflow
        if (transaction.amount > 0) {
          buckets[bucket].outflow += transaction.amount
        } else {
          buckets[bucket].inflow += Math.abs(transaction.amount)
        }
      }
    }

    let values = Object.entries(buckets).map(v => v[1])
    values = values.map(v => {
      let val = v
      val.outflow = -1 * val.outflow
      return val
    })

    this.cashflowChart = values
  }

  getTotalCapital () {
    return this.availableCash + this.treasure - this.credit
  }

  getAvailableCash () {
    return this.availableCash
  }

  getTreasure () {
    return this.treasure
  }

  getTotalOutflow () {
    return this.totalDebitsInChecking
  }

  getCashflowChart () {
    return this.cashflowChart
  }
}
