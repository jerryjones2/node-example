
const env  = process.env.ENVIRONMENT    || 'dev';
const port         = process.env.PORT    || '3000';


var toString = () => {
    var result = '';
    result += `env : ${env}\n`;
    result += `port : ${port}\n`;
    return result;
}

module.exports = {
    toString,
    env,
    port
};