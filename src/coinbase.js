var coinbase = require( "coinbase")
//read only keys, don't try messing with them lol
var Client = coinbase.Client

exports.handler = async (event, context) => {
    const mykey = event.queryStringParameters["key"] ?? ""
    const mysecret = event.queryStringParameters["secret"] ?? ""
    if (mykey == "" || mykey == undefined || mysecret == "" || mysecret == undefined) {
        return ({
            statusCode: 400,
            body: "error"
        })
    }
    var client = new Client({apiKey:mykey, apiSecret:mysecret, strictSSL: false})
    var a = []
        try {

        await new Promise((resolve, reject) => {client.getAccounts({},function (err, accounts) {
                if (err != null) {
                    console.log(err)
                    console.log(false)
                }
                accounts.forEach((acct)=>{
                    console.log(acct.balance)
                    a.push(new Account(acct.name, "0",acct.balance, acct.native_balance, acct.id))}
                    )
                
                resolve()
            })} )

            await new Promise((resolve)=>{
                a.forEach((acct)=>{
                    client.getBuyPrice({'currencyPair':a.cryptoName+'-'+a.realName}, function(err,price){
                        a.buy = price.data.amount
                    })
                })
                
            })
            
            
           
        // }
       
   
    
    
    return ({
        statusCode: 200,
        body: JSON.stringify(a)
    })
    } catch {
        return ({
            statusCode: 400,
            body: "error"
        })
    }
}

class Account {
    constructor(name, buy, balance, native, id){
        this.name = name
        this.buy = buy
        this.cryptoName = balance["currency"]
        this.cryptoAmount = balance["amount"]
        this.realName = native["currency"]
        this.realAmount = native["amount"]
        this.id = id
    }
}