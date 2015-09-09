/**
 * cuid.js
 * Collision-resistant UID generator for browsers and node.
 * Sequential for fast db lookups and recency sorting.
 * Safe for element IDs and server-side lookups.
 *
 * Extracted from CLCTR
 * 
 * Copyright (c) Eric Elliott 2012
 * MIT License
 */
//From: https://github.com/dilvie/cuid

//note that module.exports is at the end -- it exports the api variable

/*global window, navigator, document, require, process, module */
var c = 0,
    blockSize = 4,
    base = 36,
    discreteValues = Math.pow(base, blockSize),

    pad = function pad(num, size) {
      var s = "000000000" + num;
      return s.substr(s.length-size);
    },

    randomBlock = function randomBlock() {
      return pad((Math.random() *
            discreteValues << 0)
            .toString(base), blockSize);
    },

    api = function cuid() {
      // Starting with a lowercase letter makes
      // it HTML element ID friendly.
      var letter = 'c', // hard-coded allows for sequential access

        // timestamp
        // warning: this exposes the exact date and time
        // that the uid was created.
        timestamp = (new Date().getTime()).toString(base),

        // Prevent same-machine collisions.
        counter,

        // A few chars to generate distinct ids for different
        // clients (so different computers are far less
        // likely to generate the same id)
        fingerprint = api.fingerprint(),

        // Grab some more chars from Math.random()
        random = randomBlock() + randomBlock() + randomBlock() + randomBlock();

        c = (c < discreteValues) ? c : 0;
        counter = pad(c.toString(base), blockSize);

      c++; // this is not subliminal

      return  (letter + timestamp + counter + fingerprint + random);
    };

api.slug = function slug() {
  var date = new Date().getTime().toString(36),
    counter = c.toString(36).slice(-1),
    print = api.fingerprint().slice(0,1) +
      api.fingerprint().slice(-1),
    random = randomBlock().slice(-1);

  c++;

  return date.slice(2,4) + date.slice(-2) + 
    counter + print + random;
};

//fingerprint changes based on nodejs or component setup
var isBrowser = (typeof process == 'undefined');

api.fingerprint = isBrowser ?
  function browserPrint() {
      return pad((navigator.mimeTypes.length +
          navigator.userAgent.length).toString(36) +
          api.globalCount().toString(36), 4);
  }
: function nodePrint() {
  var os = require('os'),

  padding = 2,
  pid = pad((process.pid).toString(36), padding),
  hostname = os.hostname(),
  length = hostname.length,
  hostId = pad((hostname)
    .split('')
    .reduce(function (prev, char) {
      return +prev + char.charCodeAt(0);
    }, +length + 36)
    .toString(36),
  padding);
return pid + hostId;
};

api.globalCount = function globalCount() {
    // We want to cache the results of this
    var cache = (function calc() {
        var i,
            count = 0;

            //global count only ever called inside browser environment
            //lets loop through and count the keys in window -- then cahce that as part of our fingerprint
        for (i in window) {
            count++;
        }

        return count;
    }());

    api.globalCount = function () { return cache; };
    return cache;
};

api.isLessThan = function(first, second)
{
  var fParse= parseInt(first);
  var sParse = parseInt(second);
  if(isNaN(fParse) && isNaN(sParse))
  {
     //tease apart first, second to determine which ID came first
    //counter + fingerprint + random = 6 blocks of 4 = 24
    var dateEnd = 6*blockSize;
    var counterEnd = 5*blockSize;
    var charStart = 1;

    //convert the base-36 time string to base 10 number -- parseint handles this by sending in the original radix
    var firstTime = parseInt(first.slice(charStart, first.length - dateEnd), base);
    //ditto for counter
    var firstCounter = parseInt(first.slice(first.length - dateEnd, first.length - counterEnd),base);

    //convert the base-36 time string to base 10 number -- parseint handles this by sending in the original radix
    var secondTime =  parseInt(second.slice(charStart, second.length - dateEnd), base);
    
    //ditto for counter 
    var secondCounter = parseInt(second.slice(second.length - dateEnd, second.length - counterEnd), base);

    //either the first time is less than the second time, and we answer this question immediately
    //or the times are equal -- then we pull the lower counter
    //techincially counters can wrap, but this won't happen very often AND this is all for measuring disjoint/excess behavior
    //the time should be enough of an ordering principal for this not to matter
    return firstTime < secondTime || (firstTime == secondTime && firstCounter < secondCounter);

  }
  else if(isNaN(sParse))
  {
    //if sParse is a string, then the first is a number and the second is a string UUID
    //to maintain backwards compat -- number come before strings in neatjs ordering
    return true;
  }//both are not NaN -- we have two numbers to compare
  else
  {
    return fParse < sParse;
  }
}

//we send out API
module.exports = api;



