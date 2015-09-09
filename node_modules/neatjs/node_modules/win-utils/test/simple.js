//here we test the insert functions
//making sure the database is filled with objects of the schema type

var assert = require('assert');
var should = require('should');
var utils = require('../');
var uuid = utils.cuid;

describe('Testing win-utils uuid -',function(){

    //if we need to do something beforehand
    before(function(done){
    	done();
    });

    it('Should return less than for IDs generated after each other',function(done){

    	var ids = [];
    	var superCount = 1000;//Math.pow(36, 4) + 35;
    	for(var i=0; i < superCount; i++)
    		ids.push(uuid());


    	for(var i=0; i < ids.length-1; i++)
    	{
    		// console.log("Id: ", ids[i], " above: ", ids[i+1]);
    	 	var lt = uuid.isLessThan(ids[i], ids[i+1]);
    	 	if(!lt)
    	 	{
    	 		console.log("Less than fail: ", i, " first: ", ids[i], " second: ", ids[i+1]);
    	 	}
    	 	lt.should.equal(true);
    	}

    	done();
    	
    });

    it('Should return less than for number IDs generated before string IDs -- backwards compat',function(done){

    	var superCount = 1000;
    	for(var i=0; i < superCount; i++)
    	{
    		// console.log("Id: ", ids[i], " above: ", ids[i+1]);
    	 	var lt = "" + Math.random()*10000000;
    	 	var ltPlus = "" + parseInt(lt) + 10;
    	 	var gt = uuid();
    	 	var compare = uuid.isLessThan(lt, gt);
    	 	compare.should.equal(true);
    	 	
    	 	compare = uuid.isLessThan(gt, lt);
    	 	compare.should.equal(false);

    	 	compare = uuid.isLessThan(gt, gt);
    	 	compare.should.equal(false);

    	}

    	done();
    	
    });


    it('Should compare numbers to numbers -- backwards compat',function(done){

    	var superCount = 1000;
    	for(var i=0; i < superCount; i++)
    	{
    		// console.log("Id: ", ids[i], " above: ", ids[i+1]);
    	 	var lt = "" + Math.random()*10000000;
    	 	var ltPlus = "" + parseInt(lt) + 10;
    	 	
    	 	compare = uuid.isLessThan(lt, ltPlus);
    	 	compare.should.equal(true);

    	 	compare = uuid.isLessThan(ltPlus, lt);
    	 	compare.should.equal(false);

    	 	compare = uuid.isLessThan(lt, lt);
    	 	compare.should.equal(false);

    	 	compare = uuid.isLessThan(ltPlus, ltPlus);
    	 	compare.should.equal(false);

    	}

    	done();
    	
    });

});







