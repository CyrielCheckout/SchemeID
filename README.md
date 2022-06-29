# SchemeID

## Installation

SchemeID requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd SchemeID
npm install
node index.js
```

In the index.js file line 7 insert the private key of the merchant.
Paste the merchant export to the root of the project (in the SchemeID folder).
Before launching the export : 
1. Make sure that the file contains only the target PaymentIDs. 
1. Make sure there is no header and that the file is named :Exportmerchant.csv.

------------

Then run the command: node index.js
The batch will then be launched, without any significant risk for the platform, since it waits for the end of a request before launching a new one.
Once the export is finished a new Export.csv file will appear in the SchemeID folder.
Beware, if a transaction is in refused status among the paymentIDs, the schemeID column will contain the mention: "ERROR PAYMENT REFUSED".
The export also checks the number of incoming and outgoing paymentIDs.
If there is not a perfect match, then the batch returns an error.
You will have to restart it, or contact me.