import env from './env';
class HomeController
{
	constructor($scope)
	{
		this.$scope = $scope;
		this.$scope.status = 0; //inital state
		this.$scope.env = env;		
		$scope.onClick = this.onClick.bind(this);
		$scope.restart = this.restart.bind(this);
		this.init();
	}

	init()
	{
		this.$scope.game_name = env.GAME_NAME;
		this.$scope.correct_ans_array = [];
		this.$scope.wrong_ans_array = [];
		this.$scope.heigh_light = 0;
		this.$scope.final_score = '';

		const rows = env.ROWS_COUNT;
		const col = env.COLUMNS_COUNT;
		let rows_array = [];
		let col_array = [];
		let random_array =[];
		while(random_array.length < env.DIMONDS_COUNT){
		    let randomnumber = Math.floor(Math.random()*(rows*col)) + 1;
		    if(random_array.indexOf(randomnumber) > -1) continue;
		    random_array[random_array.length] = randomnumber;
		}
		//console.log(random_array);
		this.$scope.random_array = random_array;

		for (let i = 1; i <= rows; i++) {
			rows_array.push(i);
		}
		for (let j = 1; j <= col; j++) {
			col_array.push(j);
		}
		this.$scope.table_details = {
			rows : rows_array,
			col : col_array
		}

	}

	onClick(index)
	{
		this.$scope.status = 1; //dirty
		
		if(this.$scope.correct_ans_array.length<this.$scope.env.DIMONDS_COUNT){
			if(this.$scope.random_array.indexOf(index)>=0)
			{
				if(this.$scope.correct_ans_array.indexOf(index)==-1){
					this.$scope.correct_ans_array.push(index);
					this.$scope.heigh_light = 0;
				}
				//console.log(this.$scope.random_array)
				this.scoreFinder();
			}
			else
			{
				if(this.$scope.wrong_ans_array.indexOf(index)==-1)
				this.$scope.wrong_ans_array.push(index);

				let remaing = [];

				for (let i = 0; i < this.$scope.random_array.length; i++) {
					let item = this.$scope.random_array[i];
					if(this.$scope.correct_ans_array.indexOf(item)===-1)
						remaing.push(item);
				}
				
				this.$scope.heigh_light = remaing.reduce(function(prev, curr) {
				  let score =  (Math.abs(curr - index) < Math.abs(prev - index) ? curr : prev);
				  return (score<0) ? 0 : score;
				});

			//console.log(remaing);

			}
		}
	}
	restart()
	{
		this.$scope.status = 2; //restarted
		this.init();
	}
	scoreFinder()
	{
		if(this.$scope.correct_ans_array.length==env.DIMONDS_COUNT)
		{
			let total = env.ROWS_COUNT*env.COLUMNS_COUNT;
			let dimonds = env.DIMONDS_COUNT;
			let wrong_ans = total-dimonds;

			this.$scope.final_score = 100-Math.round((this.$scope.wrong_ans_array.length/wrong_ans)*100);
		}
	}
}
export default HomeController;