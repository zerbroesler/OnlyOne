function Levels(level){

	var levels={
			1:{
				persons:[
		               {col:1,	patt:0,	band:0,},
		               {col:0, 	patt:2,	band:0,},
		               {col:0, 	patt:0,	band:3,},
		               {col:4,	patt:1,	band:2,},
			         ],
		         presents:[
		             {col:1,	patt:1,	band:1,},
		             {col:2,	patt:2,	band:2,},
		             {col:3,	patt:3,	band:3,},
		             {col:4,	patt:1,	band:2,},
			         ]
			},
			2:{ // Easy
				persons:[
		               {col:4,	patt:1, band:0,},
		               {col:0, 	patt:0, band:2,},
		               {col:0, 	patt:1, band:0,},
		               {col:2,	patt:0, band:0,},
			         ],
		         presents:[
		             {col:4,	patt:1,	band:3,},
		             {col:3,	patt:1,	band:2,},
		             {col:3,	patt:1,	band:3,},
		             {col:2,	patt:1,	band:1,},
			         ]
			},
			3:{ // Easy
				  persons:[
				    {col:0, patt:2, band:0},
				    {col:0, patt:0, band:2},
				    {col:2, patt:0, band:0},
				    {col:0, patt:1, band:0},
				  ],
				  presents:[
				    {col:1, patt:2, band:2},
				    {col:2, patt:3, band:2},
				    {col:2, patt:1, band:3},
				    {col:4, patt:1, band:1},
				  ],
				},
			4:{ // Easy
				  persons:[
				    {col:2, patt:0, band:0},
				    {col:0, patt:0, band:-2},
				    {col:-3, patt:0, band:0},
				    {col:0, patt:0, band:2},
				  ],
				  presents:[
				    {col:2, patt:3, band:3},
				    {col:3, patt:2, band:3},
				    {col:1, patt:3, band:2},
				    {col:3, patt:2, band:2},
				  ],
				},
			5:{ // Easy
				  persons:[
				    {col:-1, patt:0, band:0},
				    {col:0, patt:0, band:2},
				    {col:2, patt:0, band:0},
				    {col:0, patt:-1, band:0},
				  ],
				  presents:[
				    {col:4, patt:1, band:1},
				    {col:4, patt:3, band:2},
				    {col:2, patt:2, band:3},
				    {col:3, patt:3, band:1},
				  ],
				},
			6:{ // Easy
				persons:[
		               {col:0,	patt:2,band:1,},
		               {col:3, 	patt:0,	band:0,},
		               {col:0, 	patt:1,	band:0,},
		               {col:0,	patt:0,band:1,},
			         ],
		         presents:[
		             {col:1,	patt:2,	band:1,},
		             {col:3,	patt:1,	band:2,},
		             {col:2,	patt:1,	band:3,},
		             {col:1,	patt:1,	band:1,},
			         ]
			},
			7:{ // Easy
				persons:[
		               {col:1,	patt:0,	band:0,},
		               {col:0, 	patt:0,	band:2,},
		               {col:0, 	patt:0,	band:1,},
		               {col:0,	patt:1,	band:0,},
			         ],
		         presents:[
		             {col:1,	patt:2,	band:1,},
		             {col:2,	patt:3,	band:2,},
		             {col:3,	patt:0,	band:1,},
		             {col:1,	patt:1,	band:3,},
			         ]
			},
			8:{ // Easy
				  persons:[
				    {col:0, patt:1, band:0},
				    {col:0, patt:0, band:1},
				    {col:1, patt:0, band:0},
				    {col:0, patt:2, band:0},
				  ],
				  presents:[
				    {col:2, patt:1, band:1},
				    {col:4, patt:3, band:1},
				    {col:1, patt:1, band:3},
				    {col:3, patt:2, band:2},
				  ],
				},
			
			9:{  //Medium
				persons:[
		               {col:0,	patt:2,band:1,},
		               {col:3, 	patt:0,	band:0,},
		               {col:0, 	patt:0,	band:-1,},
		               {col:0,	patt:1,band:0,},
			         ],
		         presents:[
		             {col:3,	patt:2,	band:1,},
		             {col:3,	patt:1,	band:3,},
		             {col:3,	patt:0,	band:1,},
		             {col:1,	patt:1,	band:1,},
			         ]
			},
			10:{ // Medium
				persons:[
		               {col:0,	patt:2, band:0,},
		               {col:2, 	patt:0,	band:0,},
		               {col:0, 	patt:3,	band:1,},
		               {col:0,	patt:0, band:1,},
			         ],
		         presents:[
		             {col:3,	patt:2,	band:2,},
		             {col:2,	patt:1,	band:3,},
		             {col:4,	patt:3,	band:1,},
		             {col:1,	patt:2,	band:1,},
			         ]
			},
			11:{ // Medium
				persons:[
		               {col:0,	patt:0, band:1,},
		               {col:0, 	patt:1,	band:0,},
		               {col:4, 	patt:0,	band:3,},
		               {col:0,	patt:0, band:-3,},
			         ],
		         presents:[
		             {col:1,	patt:1,	band:1,},
		             {col:4,	patt:1,	band:3,},
		             {col:4,	patt:2,	band:3,},
		             {col:4,	patt:2,	band:1,},
			         ]
			},
			12:{ // Medium
				  persons:[
				    {col:-1, patt:0, band:0},
				    {col:0, patt:0, band:3},
				    {col:4, patt:0, band:0},
				    {col:0, patt:-1, band:0},
				  ],
				  presents:[
				    {col:2, patt:1, band:2},
				    {col:3, patt:3, band:3},
				    {col:4, patt:3, band:2},
				    {col:3, patt:3, band:2},
				  ],
				},
			13:{ // Medium
				  persons:[
				    {col:-3, patt:0, band:0},
				    {col:0, patt:0, band:-1},
				    {col:-2, patt:0, band:0},
				    {col:0, patt:0, band:3},
				  ],
				  presents:[
				    {col:2, patt:2, band:1},
				    {col:2, patt:2, band:2},
				    {col:3, patt:1, band:2},
				    {col:4, patt:3, band:3},
				  ],
				},
			14:{ // Medium
				  persons:[
				    {col:0, patt:-1, band:0},
				    {col:-1, patt:0, band:0},
				    {col:0, patt:2, band:0},
				    {col:0, patt:-2, band:0},
				  ],
				  presents:[
				    {col:1, patt:3, band:1},
				    {col:4, patt:1, band:3},
				    {col:2, patt:2, band:3},
				    {col:1, patt:1, band:1},
				  ],
				},
			15:{ // Medium
				  persons:[
				    {col:0, patt:0, band:1},
				    {col:1, patt:0, band:0},
				    {col:0, patt:1, band:0},
				    {col:0, patt:2, band:0},
				  ],
				  presents:[
				    {col:1, patt:1, band:1},
				    {col:1, patt:1, band:3},
				    {col:2, patt:1, band:2},
				    {col:1, patt:2, band:1},
				  ],
				},
			16:{ // Medium
				persons:[
		               {col:0,	patt:0,	band:1,},
		               {col:0, 	patt:0,	band:2,},
		               {col:0, 	patt:1,	band:0,},
		               {col:0,	patt:-1,band:-2,},
			         ],
		         presents:[
		             {col:1,	patt:2,	band:1,},
		             {col:3,	patt:1,	band:2,},
		             {col:1,	patt:0,	band:2,},
		             {col:1,	patt:1,	band:1,},
			         ]
			},
			17:{ // Medium
				  persons:[
				    {col:-3, patt:0, band:0},
				    {col:0, patt:-2, band:0},
				    {col:-1, patt:0, band:0},
				    {col:0, patt:3, band:0},
				  ],
				  presents:[
				    {col:1, patt:2, band:3},
				    {col:1, patt:1, band:2},
				    {col:4, patt:1, band:1},
				    {col:1, patt:3, band:3},
				  ],
				},
			
				
			18:{ // Hard
					persons:[
			               {col:0,	patt:-3,band:-1,},
			               {col:0, 	patt:0,	band:-3,},
			               {col:0, 	patt:1,	band:0,},
			               {col:0,	patt:-1,band:-2,},
				         ],
			         presents:[
			             {col:1,	patt:2,	band:1,},
			             {col:3,	patt:1,	band:2,},
			             {col:2,	patt:3,	band:3,},
			             {col:1,	patt:1,	band:2,},
				         ]
				},
			19:{ // Hard
				  persons:[
				    {col:0, patt:1, band:0},
				    {col:0, patt:0, band:-1},
				    {col:-2, patt:0, band:0},
				    {col:0, patt:2, band:0},
				  ],
				  presents:[
				    {col:1, patt:1, band:2},
				    {col:1, patt:2, band:3},
				    {col:4, patt:3, band:1},
				    {col:2, patt:2, band:1},
				  ],
				},
			20:{ //
				  persons:[
				    {col:0, patt:3, band:0},
				    {col:0, patt:-2, band:0},
				    {col:-1, patt:0, band:0},
				    {col:0, patt:0, band:-2},
				  ],
				  presents:[
				    {col:2, patt:3, band:2},
				    {col:1, patt:1, band:2},
				    {col:2, patt:2, band:2},
				    {col:2, patt:1, band:1},
				  ],
				},
				21:{ // Hard
					  persons:[
					    {col:0, patt:2, band:0},
					    {col:0, patt:0, band:-2},
					    {col:-3, patt:0, band:0},
					    {col:0, patt:-2, band:0},
					  ],
					  presents:[
					    {col:3, patt:2, band:2},
					    {col:3, patt:2, band:3},
					    {col:2, patt:2, band:2},
					    {col:3, patt:3, band:3},
					  ],
					},			
////////////////			
				22:{ //
					  persons:[
					    {col:0, patt:-1, band:0},
					    {col:-1, patt:0, band:0},
					    {col:0, patt:3, band:0},
					    {col:0, patt:0, band:2},
					  ],
					  presents:[
					    {col:4, patt:2, band:3},
					    {col:4, patt:1, band:3},
					    {col:1, patt:3, band:3},
					    {col:1, patt:2, band:2},
					  ],
					},
					23:{ //
					  persons:[
					    {col:0, patt:1, band:0},
					    {col:0, patt:0, band:-1},
					    {col:-2, patt:0, band:0},
					    {col:0, patt:3, band:0},
					  ],
					  presents:[
					    {col:2, patt:1, band:1},
					    {col:2, patt:2, band:3},
					    {col:1, patt:1, band:2},
					    {col:3, patt:3, band:1},
					  ],
					},
					24:{ //
					  persons:[
					    {col:-2, patt:0, band:0},
					    {col:0, patt:1, band:0},
					    {col:0, patt:2, band:0},
					    {col:0, patt:-2, band:0},
					  ],
					  presents:[
					    {col:1, patt:2, band:2},
					    {col:4, patt:1, band:1},
					    {col:2, patt:2, band:2},
					    {col:4, patt:3, band:3},
					  ],
					},
////////////////			
	};
	var randomLevels;
	this.randomize = function (){
		randomLevels={};
		for ( var number in levels) {
			randomLevels[number]={};
			randomLevels[number].persons=shuffle(levels[number].persons);
			randomLevels[number].presents=levels[number].presents;
		}
	};
	
	this.getMaxLevel=function(){
		var count = 0;
		for (var k in levels) {
			if (levels.hasOwnProperty(k)) {
				++count;
			}
		}
		return count;
	};
	this.randomize();
	
	this.getPersons =function(){
		// Randomize the sequence
		return randomLevels[level].persons;
	};
	function shuffle(array) {
		  var currentIndex = array.length;
		  var temporaryValue;
		  var randomIndex;

		  // While there remain elements to shuffle...
		  while (0 !== currentIndex) {

		    // Pick a remaining element...
		    randomIndex = Math.floor(Math.random() * currentIndex);
		    currentIndex -= 1;

		    // And swap it with the current element.
		    temporaryValue = array[currentIndex];
		    array[currentIndex] = array[randomIndex];
		    array[randomIndex] = temporaryValue;
		  }
		  return array;
		}	
	this.getPresents=function(){
					return randomLevels[level].presents;
	};
}