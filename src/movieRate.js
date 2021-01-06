exports.handler = function (event, context, callback) {
try{
const path = JSON.parse(event.body).path

callback(null, {
    statusCode: 200,
    headers: {

        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':
            'Origin, X-Requested-With, Content-Type, Accept',
    },
    body: "path: "+path
})


}
catch(e)
    {callback(null, {
        statusCode: 200,
        headers: {

            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers':
                'Origin, X-Requested-With, Content-Type, Accept',
        },
        body: "didn't work: "+e
    })
}
}

