const express = require('express')
const router = express.Router()
const rp = require('request-promise')

const url = 'https://eos.greymass.com:443/v1/chain/get_info';

router.get('/loadblock', async (req, res) => {
    const options = {
        url: url,
        json: true
    };

    let finalArray = [];

    while (finalArray.length < 10) {
        let priorResult;
        let finalResult;
        try {
            priorResult = await rp(options);
            try {
                finalResult = await rp({
                    uri: 'https://eos.greymass.com:443/v1/chain/get_block',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;',

                    },
                    body: {
                        "block_num_or_id": priorResult.head_block_num
                    },
                    json: true
                });
            }
            catch{
                return res.send({ errorMessage: 'There is an error. Please try again later.' });
            }
        } catch (error) {
            return res.send({ errorMessage: 'There is an error. Please try again later.' });
        }


        let finalcount = 0;
        finalResult.transactions.forEach(function (single) {
            if (single.trx.transaction) {
                finalcount += single.trx.transaction.actions.length;
            }
        });
        finalResult.actionCount = finalcount;

        if (!finalArray.some(item => item.block_num === finalResult.block_num))
            finalArray.push(finalResult);

    }

    res.send({ data: finalArray });
})

module.exports = router