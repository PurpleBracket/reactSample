import React, { Component } from 'react'
import config from '../../../config/client'
import { connect } from 'react-redux'
import { createPlaidItem } from '../plaid/plaid.action'
import Button from '../../atoms/button/button'
import { fetchAccounts } from '../../components/account/account.list/account.list.action'

const plaidConfig = config[typeof(CONFIG_ENV)==="undefined" ? 'test' : CONFIG_ENV].plaid  // eslint-disable-line

class Plaid extends Component {
  constructor (props) {
    super(props)
    console.log(window.Plaid)

    this.onSuccess = this.onSuccess.bind(this)

    window.plaidHandler = this.handler = window.Plaid.create({
      apiVersion: 'v2',
      clientName: 'Treasure',
      env: plaidConfig.env,
      product: ['transactions'],
      key: plaidConfig.publickey,

      onSuccess: this.onSuccess,

      onLoad: () => {
        console.log('Plaid loaded...')
      },

      onExit: (err, metadata) => {
        console.log(err)
        console.log(metadata)
      },

      onEvent: (eventName, metadata) => {
        console.log(eventName)
        console.log(metadata)
      }
    })
  }

  onSuccess (publicToken, metadata) {
    this.props.createPlaidItem({
      companyId: window.globalState.getCompanyId(),
      metadata,
      publicToken
    }, (err, res) => {
      if (err) {
        console.error(err)
      } else {
        console.log('Calling create account...')
        // if (this.props.onCreate) {
        //   this.props.onCreate()
        // }

        this.props.fetchAccounts(window.globalState.getCompanyId())

        return res
      }
    })

    // request.post('/get_access_token')
    //   $.post('/get_access_token', {
    //     public_token: public_token
    //   }, function() {
    //     $('#container').fadeOut('fast', function() {
    //       $('#intro').hide();
    //       $('#app, #steps').fadeIn('slow');
    //     });
    //   });
  }

  render () {
    return (
      <Button color={'primary'} onClick={() => {
        window.plaidHandler.open()
      }}>Connect Accounts
      </Button>
    )
  }
}

export default connect(null, {fetchAccounts, createPlaidItem})(Plaid)
