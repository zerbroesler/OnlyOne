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
			2:{
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
			3:{
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
	};
	
	this.getPersons =function(){
					return levels[level].persons;
	};
	this.getPresents=function(){
					return levels[level].presents;
	};
}