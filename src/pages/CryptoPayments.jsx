import React, { useEffect, useState } from 'react'

import NowPaymentsApi from '@nowpaymentsio/nowpayments-api-js'

const npApi = new NowPaymentsApi({ apiKey: 'A7M40XV-CG1448Z-KVVED3G-NW3V0TK' })

export default function CryptoPayments() {
    const [currenciesArr, setCurrenciesArr] = useState(null);


    useEffect(() => {
        async function fetchCurrencies() {
          const { currencies } = await npApi.getCurrencies()
          setCurrenciesArr(currencies)
        }
        fetchCurrencies()
      }, [])
  return (
    <div style={{
        minHeight: "100vh"
    }}>
        <h1>CryptoPayments</h1>
        <h2>Available currencies</h2>
      <br />
      { currenciesArr && currenciesArr.map((currency) => (
        <p>{currency}</p>
      ))}
    </div>
  )
}
