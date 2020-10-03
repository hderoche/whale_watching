//// Interface

import { IfStmt } from '@angular/compiler';

export interface TransactionRecord {
    blockchain: string;
    symbol: string;
    id: string;
    transactionType: string;
    hash: string;
    from: Wallet;
    to: Wallet;
    timestamp: number;
    amount: number;
    amount_usd: number;
    transactionCount: number;
}

export interface ResponseTransactionsRecord {
    // success or error
    result: string;
    // cursor
    cursor: string;
    // number of transactions contains in the json
    count: number;
    // transactions
    transactions: Array<Transaction>;
}

export interface WalletRecord {
    address: string;
    owner_type: string;
}


//// Classes


export class Wallet implements WalletRecord {
    address: string = null;
    // tslint:disable-next-line: variable-name
    owner_type: string = null;

    constructor(input: any = {}) {
        Object.keys(this).forEach(p => this[p] = (input as any)[p]);
    }
    unhash = () => this.address + 4;
}

export class ResponseTransactions implements ResponseTransactionsRecord {
    result: string = null;
    cursor: string = null;
    count: number = null;
    transactions: Transaction[] = null;

    // tslint:disable-next-line: variable-name
    _unique_address: string[];
    constructor(input: any = {}) {
        // Prends les attributs de la classe et les map avec les champs du Json correspondant
        Object.keys(this).forEach(p => this[p] = (input as any)[p]);
        // Si le tableau de transaction est de type tableau et de longueur > 0
        // Appelle chaque constructeur de la classe Transaction pour faire la meme chose (recursivite)
        this.transactions = [];
        if (toString.call(input.transactions) === '[object Array]' && input.transactions.length > 0) {
            input.transactions.forEach((e: TransactionRecord) => this.transactions.push(new Transaction(e)));
        }
    }

    occurenceTransactions(): string[] {
        this._unique_address = [];
        this.transactions?.forEach((t) => {
            if (!this._unique_address.includes(t.to.address)) {
                this._unique_address.push(t.to.address);
            }
            if (!this._unique_address.includes(t.from.address)) {
                this._unique_address.push(t.from.address);
            }
        });
        console.log(this._unique_address);
        return this._unique_address;
    }
}

export class Transaction implements TransactionRecord {
    blockchain: string = null;
    symbol: string = null;
    id: string = null;
    transactionType: string = null;
    hash: string = null;
    from: Wallet = null;
    to: Wallet = null;
    timestamp: number = null;
    amount: number = null;
    // tslint:disable-next-line: variable-name
    amount_usd: number = null;
    transactionCount: number = null;

    constructor(input: any = {}) {
        Object.keys(this).forEach(p => this[p] = (input as any)[p]);
        this.from = new Wallet(input.from);
        this.to = new Wallet(input.to);
    }
}
