import { Component } from 'react'
import { BlockSizeChart } from '../cmps/BlockSizeChart'
import { BtcToUsd } from '../cmps/BtcToUsd'

import { bitcoinService } from '../services/bitcoin.service'

export class StatisticPage extends Component {
  state = {
    avgBlockSizeData: null,
    avgBtcToUsd: null,
  }
  async componentDidMount() {
    this.initStats()
  }

  async initStats() {
    const avgBlockSize = await bitcoinService.getAvgBlockSize()
    const btcUsd = await bitcoinService.getAvgBtcToUsd()
    this.setState({ avgBlockSizeData: avgBlockSize, avgBtcToUsd: btcUsd })
  }
  render() {
    const { avgBlockSizeData, avgBtcToUsd } = this.state
    return (
      <section className='statistic-page'>
        <BlockSizeChart data={avgBlockSizeData} />
        <BtcToUsd data={avgBtcToUsd}></BtcToUsd>
      </section>
    )
  }
}
