
// Include config file
const config    = require('./config/config.json');
const axios     = require('axios');

let iterationCount = 0;

const intervalIdentifier = setInterval(() => {

    iterationCount++;
    if(iterationCount >= config.limit)
        clearInterval(intervalIdentifier);

    var randomMessageId = Math.floor(Math.random() * config.messages.length);
    var message = config.messages[randomMessageId];

    axios.get(config.settings.url, {
        params: {
            owner_id    :   config.group_id,
            post_id     :   config.post_id,
            from_group  :   config.settings.from_group,
            message     :   message,
            v           :   config.settings.vk_api_version,
            access_token:   config.group_api_token
        }
    }).then( (response) => {

        var data = response.data;

        if('error' in data)
        {
            console.log('!!! ERROR !!!');
            console.log('[VK-SPAM] error code - ', data.error.error_code);
            console.log('[VK-SPAM] error msg  - ', data.error.error_msg);
            console.log('[VK-SPAM] stop spamming..');
            clearInterval(intervalIdentifier);
        } else {
            console.log('[VK-SPAM] --- --- --- ---');
            console.log(`[${iterationCount}]`, " Message: ", message);
            console.log('[VK-SPAM] --- --- --- ---', "\n");
        }

    }).catch( (error) => {

        console.log(error);
        clearInterval(intervalIdentifier);

    });

}, config.interval);