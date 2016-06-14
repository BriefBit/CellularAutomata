// MapGen v0.5, March 25, 2016
// MapGen v0.4, March 14, 2016
// 	This script accepts number of rows and collumns,step count and fill percent
// 	to produce a procedurally generated terrain tilemap array
// 
// Written by Samuel Becker (original written sometime in February 2016) 
// Please email any suggestions or bugs to Sam@briefbit.com 

var MapGen = function(width, height, stepCount, fillPercent) {
    this.width = width;
    this.height = height;
    this.stepCount = stepCount;
    this.fillPercent = fillPercent;
	// gives random int from min (inclusive) to max (inclusive)
    var getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max + 1 - min)) + min; //plus one to include max
    };
	
    this.updateMap = function(width,height,stepCount,fillPercent) {
    	this.fillPercent = fillPercent;
    	this.width = width;
    	this.height = height;
    	this.stepCount = stepCount;
        // create a "2d" array with an array of arrays 
        this.map = [];
        for (var i = 0; i < this.width; i++) {
            this.map[i] = [];
        }


        //fill map with fillRate in fill percent of 1's
        this.randomFill = function() {
            for (var i = 0; i < this.width; i++) {
                for (var j = 0; j < this.height; j++) {
                    if (getRandomInt(0, 100) < this.fillPercent) {
                        this.map[i][j] = 1;
                    } else {
                        this.map[i][j] = 0;
                    }
                }
            }
        };

        //check surrounding cells and output neighbor count (!== 0) 
        this.checkNeighbors = function(row, col) {
            var row = row;
            var col = col;
            var neighborCount = 0;
            //use nested for loop to iterate over surrounding cells
            /*	r=row c=column 
            	[[r-1,c-1],[r-1,c],[r-1,c+1],
            	[r,c-1],[r  ,  c],[r,c+1],
            	[r+1,c-1],[r+1,c+1],[r+1,c+1]]
            */
            for (var i = row - 1; i <= row + 1; i++) {
                for (var j = col - 1; j <= col + 1; j++) {
                    if (this.map[i][j] !== 0) {
                        neighborCount += 1;
                    }
                }
            }
            return (neighborCount);
        };
        
        
        
        // generates a single step for celluar automata 
        // loops through map array and kills or creates a cell
        // based on neighbor count	
        this.genStep = function() {
            var checkCount = 0;
            var genMap = this.map.slice(); //create CLONE of map array instead of reference

            for (var i = 1; i < this.width - 1; i++) {
                for (var j = 1; j < this.height - 1; j++) {
                    checkCount = this.checkNeighbors(i, j);
                    if ((genMap[i][j] == 1 && checkCount > 3) || (genMap[i][j] == 0 && checkCount > 4)) {
                        genMap[i][j] = 1;
                    } else {
                        genMap[i][j] = 0;
                    }
                }
            }
            this.map = genMap;
        };


        //contruct object 
        //first fill with randomly placed 1's based on fill percentage
        this.randomFill();
        // perform gen steps based on step count 
        for (var i = 0; i < this.stepCount; i++) {
            this.genStep();
        }
    };
    

    
    
    this.updateMap(this.width,this.height,this.stepCount,this.fillPercent);




};
