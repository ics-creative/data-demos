var WARMUP = 8;
var FRAMES = 32;

function warmup() {
	for (var i = 0; i < WARMUP; ++i) {
		step();
	}
}

function mean(values) {
	var total = 0;
	for (var i = 0; i < FRAMES; ++i) {
		total += values[i];
	}
	return total / FRAMES;
}

function stddev(values, mean) {
	var variance = 0;
	for (var i = 0; i < values.length; ++i) {
		var diff = values[i] - mean;
		variance += diff * diff;
	}
	return Math.sqrt(variance / FRAMES);
}

function bench() {
	var times = [];
	for (var i = 0; i < FRAMES; ++i) {
		var begin = new Date().getTime();
		step();
		times[i] = new Date().getTime() - begin;
	}

	var avg = mean(times);
	var stddevVal = stddev(times, avg);

	var avg2 = Math.round(avg);
	var stddev2 = Math.round(stddevVal);

	print("<h1>ベンチマークが完了しました</h1><ul><li>平均値(M) : " + avg2 + " msec</li><li>標準偏差(SD) : " + stddev2 + "</li></ul>");
}

function bench_start() {
	init();
	warmup();

	setTimeout(mainBench, 500); // 遅延させて実行
}

function mainBench(){
	bench();
}

