import env from './env';
class HomeController
{
	constructor($scope)
	{
		this.$scope = $scope;
		this.$scope.game_name = env.GAME_NAME;
		this.$scope.correct_ans_array = [];
		this.$scope.wrong_ans_array = [];
		this.$scope.final_score = '';
		$scope.onClick = this.onClick.bind(this);
		this.init();
	}

	init()
	{
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
		console.log(random_array);
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
		if(this.$scope.correct_ans_array.length<env.DIMONDS_COUNT){
			if(this.$scope.random_array.indexOf(index)!=-1)
			{
				this.$scope.correct_ans_array.push(index);
				this.$scope.heigh_light = 0;
				this.scoreFinder();
			}
			else
			{
				this.$scope.wrong_ans_array.push(index);

				let remaing = [];

				for (let i = 0; i < this.$scope.random_array.length; i++) {
					let item = this.$scope.random_array[i];
					if(this.$scope.correct_ans_array.indexOf(item)===-1)
						remaing.push(item);
				}
				
				this.$scope.heigh_light = remaing.reduce(function(prev, curr) {
				  return (Math.abs(curr - index) < Math.abs(prev - index) ? curr : prev);
				});

			console.log(remaing);

			}
		}
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