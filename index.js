const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const { Checkout } = require('checkout-sdk-node');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
// API Keys
const cko = new Checkout('sk_test_75c814e0-d073-4ee6-a432-61b678bd1ae7', {
    pk: 'pk_XXXXXXX'
});

const csvWriter = createCsvWriter({
    path: 'Export.csv',
    header: [
        { id: 'paymentid', title: 'Payment_ID' },
        { id: 'schemeid', title: 'Scheme_ID' },
    ]
});

var data = [];
var obj = {};
var csvData = [];
fs.createReadStream(path.resolve(__dirname, 'Exportfrommerchant.csv'))
    .pipe(csv.parse({ headers: false }))
    .on('error', error => console.error(error))
    .on('data', function(csvrow) {
        csvData.push(csvrow);
    })
    .on('end', async function() {
        console.log('Number of payment ID : ', csvData.length);
        await getPaymentDetails();
        console.log('Export data number : ', data.length);
        //console.log(data);
        if (csvData.length === data.length) {
            csvWriter
                .writeRecords(data)
            console.log(__dirname + '/Export.csv');
        } else {
            console.log("ERROR")
        }
    });

async function getPaymentDetails() {
    for (let i = 0; i < csvData.length; i++) {
        var paymentID = csvData[i].toString();
        //console.log(paymentID);
        const getPaymentDetails = await cko.payments.get(paymentID)
        if (getPaymentDetails.status === "Authorized") {
            obj["paymentid"] = paymentID;
            obj["schemeid"] = getPaymentDetails.scheme_id;
            console.log("Running : ", obj);
            data.push(obj);
            obj = {};
        }
    }
}