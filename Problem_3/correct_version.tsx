interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string; // added because it is used below
}

const WalletPage: React.FC<Props> = (props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  // move getPriority outside, change blockchain to accept string not any
  const getPriority = (blockchain: string): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance) => {
        const priority = getPriority(balance.blockchain);

        // keep only supported blockchains with a positive balance
        return priority > -99 && balance.amount > 0;
      })
      .sort((lhs, rhs) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);

        return rightPriority - leftPriority;
        /*
        negative: rightPriority < leftPriority => lhs before rhs
        positive: rightPriority > leftPriority => rhs before lhs
        */
      });
  }, [balances]); // removed prices since it is not used

  const formattedBalances = sortedBalances.map((balance) => ({
    ...balance,
    formatted: balance.amount.toFixed(),
  }));

  const rows = formattedBalances.map((balance) => {
    const usdValue =
      (prices[balance.currency] ?? 0) * balance.amount;

    return (
      <WalletRow
        // get rid of className prop
        key={balance.currency} // not use index anymore
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });

  return <div {...rest}>{rows}</div>;
};