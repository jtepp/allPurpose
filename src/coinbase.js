var coinbase = require( "coinbase")
const mykey = 'C03pZ0mAghpNz57R'
const mysecret = '4BMpY5woIlEiYh7RGmKhNgokNnepqnoz'
var Client = coinbase.Client
var client = new Client({apiKey:mykey, apiSecret:mysecret, strictSSL: false})


const IDs = [   '30b4a69a-411c-51b1-b5c7-0f401c14904a',
                '08bb18ee-f550-51fc-b015-ef5b06dae8e3', 
                'f4a370eb-f647-504c-b696-3195390f277b',
                '9fd0ffbe-70bf-5499-80b3-d0d7cf7e998d'
            ]


exports.handler = async (event, context) => {
    var a = []

    // for (var id in IDs) {
        await new Promise((resolve, reject) => {client.getAccounts({},function (err, accounts) {
                if (err != null) {
                    console.log(err)
                    console.log(false)
                }
                accounts.forEach((acct)=>{
                    console.log(acct.balance)
                    a.push(new Account(acct.name, acct.balance, acct.native_balance, acct.id))}
                    )
                
                resolve()
            })}
            
            
            )
        // }
       
   
    
    
    return ({
        statusCode: 200,
        body: JSON.stringify(a)
    })
    
}

class Account {
    constructor(name, balance, native, id){
        this.name = name
        this.cryptoName = balance["currency"]
        this.cryptoAmount = balance["amount"]
        this.realName = native["currency"]
        this.realAmount = native["amount"]
        this.id = id
    }
}