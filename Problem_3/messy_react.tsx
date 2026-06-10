interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {

}
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

	const getPriority = (blockchain: any): number => { //any is unsafe
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

  const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => { // getPriority can be placed outside component
		  const balancePriority = getPriority(balance.blockchain); /*interface WalletBalance doesn't have blockchain*/
		  if (lhsPriority > -99) { /* lhsPriority is not defined anywhere */
		     if (balance.amount <= 0) { //logic could be wrong here, the amount should be greater than 0?
		       return true;
		     }
		  }
		  return false
		}).sort((lhs: WalletBalance, rhs: WalletBalance) => {
      /* There is no case for rightPriority === leftPriority*/
			const leftPriority = getPriority(lhs.blockchain);
		  const rightPriority = getPriority(rhs.blockchain);
		  if (leftPriority > rightPriority) {
		    return -1;
		  } else if (rightPriority > leftPriority) {
		    return 1;
		  }
    });
  }, [balances, prices]); //prices is not used

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => { // can also use memo for this
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    }
  })

  //sortedBalances is wrong, should be formattedBalances
  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount; //prices[balance.currency] could be undefined
    return (
      <WalletRow // not imported anywhere 
        className={classes.row} //clasess not defined anywhere
        key={index} // poor React practice, antipattern
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    )
  })

  return (
    <div {...rest}>
      {rows}
    </div>
  )
}