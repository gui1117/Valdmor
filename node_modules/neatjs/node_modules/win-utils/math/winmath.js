
var mathHelper = {};

module.exports = mathHelper;

mathHelper.next = function(max)
{
    return Math.floor(Math.random()*max);
};
