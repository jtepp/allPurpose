var coinbase = require( "coinbase")
//read only keys, don't try messing with them lol
var Client = coinbase.Client

exports.handler = async (event, context) => {
    const mykey = event.queryStringParameters["key"] ?? ""
    const mysecret = event.queryStringParameters["secret"] ?? ""
    if (mykey == "" || mykey == undefined || mysecret == "" || mysecret == undefined) {
        console.log("top")
        return ({
            statusCode: 400,
            body: "error"
        })
    }
    var client = new Client({apiKey:mykey, apiSecret:mysecret, strictSSL: false})
    var a = []
    var buys = []
        try {

        await new Promise((resolve, reject) => {client.getAccounts({},function (err, accounts) {
                if (err != null) {
                    console.log(err)
                    console.log(false)
                }
                accounts.forEach(async (acct)=>{
                    a.push(new Account(acct.name, `${parseFloat(acct.native_balance.amount)/parseFloat(acct.balance.amount)}` ,acct.balance, acct.native_balance, acct.id))}
                    )
                
                resolve()
            })} )
           
   


    return ({
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
            "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
        },
        body: JSON.stringify(a)
    })
    } catch(err) {
        console.log(err)
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

// async function getChange() {
//     return await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=CAD&include_24hr_change=true')
//     .then(res => res.json())
//     .then(data => data['ethereum']["cad_24h_change"])
// }