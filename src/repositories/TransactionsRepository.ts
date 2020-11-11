import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    const sumIncome = transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((acc, currentValue) => acc + Number(currentValue.value), 0);

    const sumOutcome = transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((acc, currentValue) => acc + Number(currentValue.value), 0);

    const balance = {
      income: sumIncome,
      outcome: sumOutcome,
      total: sumIncome - sumOutcome,
    };

    return balance;
  }
}

export default TransactionsRepository;
