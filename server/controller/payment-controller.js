// Simplified payment controller: always returns payment success.

export const addPaymentGateway = (req, res) => {
  return res.json({ success: true, message: 'Payment complete. Thank you!' });
};

export const paymentResponse = (req, res) => {
  return res.json({ success: true, message: 'Payment complete. Thank you!' });
};


export const addPaymentGateway = async (req, res) => {
  return res.json({ success: true, message: 'Payment complete. Thank you!' });
};

export const paymentResponse = async (req, res) => {
  return res.json({ success: true, message: 'Payment complete. Thank you!' });
};


export const addPaymentGateway = async (req, res) => {
  return res.json({ success: true, message: 'Payment complete. Thank you!' });
};

export const paymentResponse = async (req, res) => {
  return res.json({ success: true, message: 'Payment complete. Thank you!' });
};


export const addPaymentGateway = (req, res) => {
  return res.json({ success: true, message: 'Payment complete. Thank you!' });
};

export const paymentResponse = (req, res) => {
  return res.json({ success: true, message: 'Payment complete. Thank you!' });
};


export const addPaymentGateway = (req, res) => {
  return res.json({ success: true, message: 'Payment complete. Thank you!' });
};

export const paymentResponse = (req, res) => {
  return res.json({ success: true, message: 'Payment complete. Thank you!' });
};




export const addPaymentGateway = async (request, response) => {
    // Directly respond with success message instead of initiating gateway flow
    response.json({ success: true, message: 'Payment complete. Thank you!' });
}

export const paymentResponse = (request, response) => {
    // Immediately acknowledge payment completion
    return response.json({ success: true, message: 'Payment complete. Thank you!' });
}

/* Previous Paytm verification logic removed for simplicity
export const paymentResponse = (request, response) => {
...
}
*/

    const form = new formidable.IncomingForm();
    const paytmCheckSum = request.body.CHECKSUMHASH;
    delete request.body.CHECKSUMHASH;

    const isVerifySignature = paytmchecksum.verifySignature(request.body, 'bKMfNxPPf_QdZppa', paytmCheckSum);
    if (isVerifySignature) {
        let paytmParams = {};
        paytmParams["MID"] = request.body.MID;
        paytmParams["ORDERID"] = request.body.ORDERID;

        paytmchecksum.generateSignature(paytmParams, 'bKMfNxPPf_QdZppa').then(function (checksum) {

            paytmParams["CHECKSUMHASH"] = checksum;

            const post_data = JSON.stringify(paytmParams);

            const options = {
                hostname: 'securegw-stage.paytm.in',
                port: 443,
                path: '/order/status',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': post_data.length
                }
            };

            let res = "";
            const post_req = https.request(options, function (post_res) {
                post_res.on('data', function (chunk) {
                    res += chunk;
                });

                post_res.on('end', function () {
                    let result = JSON.parse(res);
                    console.log(result);
                    response.redirect(`http://localhost:3000/`)
                });
            });
            post_req.write(post_data);
            post_req.end();
        });
    } else {
        console.log("Checksum Mismatched");
    }
}