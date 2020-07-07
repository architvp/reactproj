# GraphQL Project

## Getting started

Install dependencies
```
npm i
```

Run dev server
```
npm run dev
```

## Examples

### Example input
*You can hange the value of currency to any of the following:*
 - *USD*
 - *GBP*
 - *EUR*

```
query {
  bitcoinRates(currency: "USD") {
    code
    symbol
    rate_float
  }
}
```

### Example output

```
{
  "data": {
    "bitcoinRates": {
      "code": "USD",
      "symbol": "&#36;",
      "rate_float": 9082.0704
    }
  }
}
```