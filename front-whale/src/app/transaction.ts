//// Interface



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

export interface WalletTransactionRecord {
    wallet: Wallet;
    transactions: Array<Transaction>;
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
    _unique_address: Wallet[];
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

    occurenceTransactions(): Wallet[] {
        this._unique_address = [];
        this.transactions.forEach((t) => {
            if (!(this._unique_address.includes(t.to))){
                this._unique_address.push(t.to);
            }
            if (!(this._unique_address.includes(t.from))){
                this._unique_address.push(t.from);
            }
        });
        return this._unique_address;
    }

    allTransactionByWallet(wallet: Wallet): Transaction[] {
        const tr: Transaction[] = [];
        this.transactions.forEach((t) => {
            if (t.from.address === wallet.address || t.to.address === wallet.address) {
                tr.push(t);
            }
        });
        return tr;
    }

    imgPathSetup(): void {
        this.transactions.forEach((t) =>{
            t.pathImg = '../../assets/' + t.blockchain + '.svg';
        });
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

    pathImg: string;

    constructor(input: any = {}) {
        Object.keys(this).forEach(p => this[p] = (input as any)[p]);
        this.from = new Wallet(input.from);
        this.to = new Wallet(input.to);
    }
}

export class WalletTransaction implements WalletTransactionRecord{
    wallet: Wallet = null;
    transactions: Transaction[] = null;

    constructor(input: any = {}) {
        Object.keys(this).forEach(p => this[p] = (input as any)[p]);
        this.wallet = new Wallet(input.wallet);
        this.transactions = [];
        if (toString.call(input.transactions) === '[object Array]' && input.transactions.length > 0) {
            input.transactions.forEach((e: TransactionRecord) => this.transactions.push(new Transaction(e)));
        }
    }
}
