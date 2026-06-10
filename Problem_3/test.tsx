interface WalletBalance {
  currency: string;
  amount: number;
}

interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

type WalletRowProps = {
  className: string;
  amount: string;
  usdValue: string;
  formattedAmount: string;
};

function WalletRow (props: WalletRowProps) {
}

const getPriority = (blockchain: any): number => {
	  switch (blockchain) {
	    case 'Osmosis':
	      return 100
	    case 'Ethereum':
	      return 50
	    case 'Arbitrum':
	      return 30
	    case 'Zilliqa':
	      return 20
	    case 'Neo':
	      return 20
	    default:
	      return -99
	  }
	}

const balances = [{currency: 'Osmosis', amount: 0}, {currency: 'Osmosis', amount: 9}]
const results = balances.filter((balance: WalletBalance) => {
		  const balancePriority = getPriority(balance.currency); /*interface WalletBalance doesn't have blockchain*/
		  if (balancePriority > -99) { /* lhsPriority is not defined anywhere */
		     if (balance.amount <= 0) {
		       return true;
		     }
		  }
		  return false
		}).sort((lhs: WalletBalance, rhs: WalletBalance) => {
			const leftPriority = getPriority(lhs.currency);
		  const rightPriority = getPriority(rhs.currency);
		  if (leftPriority > rightPriority) {
		    return -1;
		  } else if (rightPriority > leftPriority) {
		    return 1;
		  } else {
			return 0
		  }
    });
const formattedBalances = results.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    }
  })

const rows = formattedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow // not imported anywhere 
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    )
  })