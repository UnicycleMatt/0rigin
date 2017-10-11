import React, { Component } from 'react'
import { render } from 'react-dom'

import contractService from '../services/contract-service'
import ipfsService from '../services/ipfs-service'

class DemoStep3 extends Component {
  handleSubmitToBlockchain(ipfsHash, listingJson, onSubmitToBlockchain) {
    // TODO: Extract price and unitsAvailable from listingJson
    const price = 3.141596;
    const unitsAvailable = 42;
    contractService.submitListing(ipfsHash, price, unitsAvailable)
    .then((transactionReceipt) => {
      onSubmitToBlockchain(transactionReceipt.tx)
    })
    .catch((error) => {
      console.error(error)
      if (error === 'Error: invalid address') {
        alert(error + "\nAre you logged in to MetaMask?")
      } else {
        alert(error)
      }
    });
  }

  render() {
    return (
      <section className="step">
        <h4>Your listing is now on the IPFS network</h4>
        <p>
          We've uploaded your listing to our IPFS gateway. This gateway is currently
          connected to hundreds of peers that can serve your listing.
        </p>
        <div className="btn-wrapper">
          <button className="btn btn-info" onClick={() => {
            window.open(
              "http://" + ipfsService.ipfsDomain + ":" + ipfsService.ipfsGatewayPort + "/ipfs/" + this.props.ipfsHash,
              "_blank"
            )
          }}>
            See your listing on IPFS
          </button>
        </div>
        <h4>Add your listing to the blockchain</h4>
        <p>
          Next, we will submit your IPFS content address to the Ethereum blockchain.
          The Ethereum smart contract will be responsible for allowing buyers to
          transact with your listing. In this demo, generating the listing JSON,
          posting the data to IPFS, and making your listing live on the Ethereum
          blockchain are all separate steps to illustrate how everything works.
          In practice, this would all happen as a single step.
        </p>
        <div className="btn-wrapper">
          <button className="btn btn-primary" onClick={() => {
            console.log(this.props)
            this.handleSubmitToBlockchain(this.props.ipfsHash, this.props.listingJson, this.props.onStep3Completion)
          }}>
            Submit listing to Ethereum
          </button>
        </div>
      </section>
    );
  }
}

export default DemoStep3
