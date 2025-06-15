<template>
	<view class="testing-container">
		<!-- 总进度显示 -->
		<view class="progress-section">
			<view class="progress-title">测试进度</view>
			<view class="progress-bar">
				<view class="progress-fill" :style="{width: totalProgress + '%'}"></view>
			</view>
			<text class="progress-text">{{Math.round(totalProgress)}}%</text>
		</view>

		<!-- 当前测试项目 -->
		<view class="current-test">
			<view class="test-icon" :style="{backgroundColor: currentTest.color}">
				<text class="icon-text">{{currentTest.icon}}</text>
			</view>
			<view class="test-info">
				<text class="test-name">{{currentTest.name}}测试</text>
				<text class="test-description">{{currentTest.description}}</text>
			</view>
		</view>

		<!-- 测试状态动画 -->
		<view class="animation-area">
			<view class="pulse-circle" :class="{active: testing}"></view>
			<view class="status-text">{{statusText}}</view>
		</view>

		<!-- 实时测试数据 -->
		<view class="realtime-data">
			<view class="data-item">
				<text class="data-label">当前得分</text>
				<text class="data-value">{{currentScore}}</text>
			</view>
			<view class="data-item">
				<text class="data-label">已用时间</text>
				<text class="data-value">{{elapsedTime}}s</text>
			</view>
		</view>

		<!-- Canvas 用于GPU测试 -->
		<canvas canvas-id="gpuCanvas" class="gpu-canvas" v-show="currentTestIndex === 1"></canvas>

		<!-- 测试结果预览 -->
		<view class="test-results">
			<view class="result-item" v-for="(result, index) in testResults" :key="index">
				<view class="result-icon" :style="{backgroundColor: testItems[index].color}">
					<text class="result-icon-text">{{testItems[index].icon}}</text>
				</view>
				<view class="result-info">
					<text class="result-name">{{testItems[index].name}}</text>
					<text class="result-score">{{result > 0 ? result + '分' : '待测试'}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				testing: false,
				currentTestIndex: 0,
				totalProgress: 0,
				currentScore: 0,
				elapsedTime: 0,
				startTime: 0,
				statusText: '准备开始测试',
				testResults: [0, 0, 0, 0], // CPU, GPU, 内存, 存储
				testItems: [
					{
						id: 1,
						name: 'CPU',
						icon: '⚡',
						color: '#FF6B6B',
						description: '测试复杂算法运算能力'
					},
					{
						id: 2,
						name: 'GPU',
						icon: '🎮',
						color: '#4ECDC4',
						description: '测试图形处理能力'
					},
					{
						id: 3,
						name: '内存',
						icon: '💾',
						color: '#45B7D1',
						description: '测试内存读写速度'
					},
					{
						id: 4,
						name: '存储',
						icon: '💿',
						color: '#96CEB4',
						description: '测试存储读写性能'
					}
				],
				timer: null,
				elapsedTimer: null
			}
		},
		computed: {
			currentTest() {
				return this.testItems[this.currentTestIndex] || this.testItems[0];
			}
		},
		onLoad() {
			this.startTesting();
		},
		onUnload() {
			// 清理定时器
			if (this.timer) clearTimeout(this.timer);
			if (this.elapsedTimer) clearInterval(this.elapsedTimer);
		},
		methods: {
			startTesting() {
				this.testing = true;
				this.startTime = Date.now();
				this.startElapsedTimer();
				this.runNextTest();
			},
			
			startElapsedTimer() {
				this.elapsedTimer = setInterval(() => {
					this.elapsedTime = Math.round((Date.now() - this.startTime) / 1000);
				}, 1000);
			},
			
			async runNextTest() {
				if (this.currentTestIndex >= this.testItems.length) {
					this.completeAllTests();
					return;
				}
				
				const testName = this.testItems[this.currentTestIndex].name;
				this.statusText = `正在测试${testName}...`;
				
				let score = 0;
				
				switch (this.currentTestIndex) {
					case 0:
						score = await this.testCPU();
						break;
					case 1:
						score = await this.testGPU();
						break;
					case 2:
						score = await this.testMemory();
						break;
					case 3:
						score = await this.testStorage();
						break;
				}
				
				this.testResults[this.currentTestIndex] = score;
				this.currentScore = score;
				this.totalProgress = ((this.currentTestIndex + 1) / this.testItems.length) * 100;
				
				// 延迟一下显示结果
				await this.delay(1000);
				
				this.currentTestIndex++;
				this.runNextTest();
			},
			
			// CPU测试 - 超复杂算法综合测试
			async testCPU() {
				return new Promise((resolve) => {
					const startTime = Date.now();
					let totalOperations = 0;
					let algorithmScores = [];
					const duration = 1000; // 1秒
					
					const calculate = () => {
						const endTime = startTime + duration;
						
						while (Date.now() < endTime) {
							// 第一类：强化数学运算
							const mathScore = this.ultraMathOperations();
							algorithmScores.push(mathScore.score);
							totalOperations += mathScore.operations;
							
							// 第二类：深度递归算法
							const recursionScore = this.deepRecursiveAlgorithms();
							algorithmScores.push(recursionScore.score);
							totalOperations += recursionScore.operations;
							
							// 第三类：高级排序算法
							const sortScore = this.advancedSortingAlgorithms();
							algorithmScores.push(sortScore.score);
							totalOperations += sortScore.operations;
							
							// 第四类：复杂字符串算法
							const stringScore = this.complexStringProcessing();
							algorithmScores.push(stringScore.score);
							totalOperations += stringScore.operations;
							
							// 第五类：高维矩阵运算
							const matrixScore = this.heavyMatrixOperations();
							algorithmScores.push(matrixScore.score);
							totalOperations += matrixScore.operations;
							
							// 第六类：高强度数值计算
							const numericScore = this.intensiveNumericComputation();
							algorithmScores.push(numericScore.score);
							totalOperations += numericScore.operations;
							
							// 第七类：图论算法
							const graphScore = this.graphAlgorithms();
							algorithmScores.push(graphScore.score);
							totalOperations += graphScore.operations;
							
							// 第八类：并发模拟计算
							const concurrentScore = this.concurrentSimulation();
							algorithmScores.push(concurrentScore.score);
							totalOperations += concurrentScore.operations;
						}
						
						const actualTime = Date.now() - startTime;
						
						// 过滤无效分数
						const validScores = algorithmScores.filter(score => !isNaN(score) && isFinite(score));
						if (validScores.length === 0) {
							resolve(1); // 保底分数
							return;
						}
						
						// 综合评分算法
						const throughput = totalOperations / actualTime;
						const avgAlgorithmScore = validScores.reduce((a, b) => a + b, 0) / validScores.length;
						const maxScore = Math.max(...validScores);
						const minScore = Math.min(...validScores);
						const stabilityBonus = maxScore > minScore ? (1 - (maxScore - minScore) / avgAlgorithmScore) : 1;
						
						// 基准分数计算
						let score = Math.round(
							(throughput * 600) + 
							(avgAlgorithmScore * 3) + 
							(stabilityBonus * 800)
						);

						score = Math.max(1, parseInt(score / 1000));
						
						resolve(score);
					};
					
					// 异步执行避免阻塞UI
					setTimeout(calculate, 100);
				});
			},
			
			// 超强化数学运算
			ultraMathOperations() {
				let operations = 0;
				const startTime = Date.now();
				
				for (let i = 0; i < 80; i++) {
					// 安全的高阶三角函数运算
					const x = Math.random() * Math.PI * 0.8; // 避免极值
					const y = Math.random() * Math.PI * 0.8;
					const trigResult = Math.sin(x) * Math.cos(y) + Math.sin(x + y) * Math.cos(x - y);
					const asinResult = Math.asin(Math.sin(x) * 0.9); // 确保在[-1,1]范围内
					const atanResult = Math.atan(trigResult);
					
					// 安全的指数对数运算
					const base1 = Math.random() * 90 + 10; // 10-100范围，避免接近0
					const base2 = Math.random() * 90 + 10;
					const exp1 = Math.random() * 3 + 1; // 1-4范围
					const logResult = Math.log(base1) * Math.log(base2);
					const powResult = Math.pow(base1, exp1 / 10); // 小指数避免溢出
					const expResult = Math.exp(Math.log(base1) / base2);
					
					// 复杂代数运算 - 牛顿法求根
					const a = Math.random() * 50 + 1;
					const b = Math.random() * 50 + 1;
					const c = Math.random() * 50 + 1;
					let x_newton = Math.random() * 10 + 1;
					for (let iter = 0; iter < 5; iter++) {
						const fx = a * x_newton * x_newton + b * x_newton + c;
						const fpx = 2 * a * x_newton + b;
						if (Math.abs(fpx) > 0.001) { // 避免除零
							x_newton = x_newton - fx / fpx;
						}
						operations++;
					}
					
					// 高精度数值积分 - 辛普森法则
					let simpson_integral = 0;
					const n = 50;
					const h = 1.0 / n;
					for (let j = 0; j <= n; j++) {
						const x_int = j * h;
						const weight = (j === 0 || j === n) ? 1 : (j % 2 === 1 ? 4 : 2);
						simpson_integral += weight * Math.sin(Math.PI * x_int) * Math.cos(Math.PI * x_int);
						operations++;
					}
					simpson_integral *= h / 3;
					
					// 复数运算模拟
					const real1 = Math.random() * 20 - 10;
					const imag1 = Math.random() * 20 - 10;
					const real2 = Math.random() * 20 - 10;
					const imag2 = Math.random() * 20 - 10;
					// 复数乘法
					const real_mult = real1 * real2 - imag1 * imag2;
					const imag_mult = real1 * imag2 + imag1 * real2;
					// 复数模长
					const magnitude = Math.sqrt(real_mult * real_mult + imag_mult * imag_mult);
					
					// 泰勒级数展开 - sin(x)
					let taylor_sin = 0;
					const x_taylor = Math.random() * 2;
					for (let n = 0; n < 10; n++) {
						const term = Math.pow(-1, n) * Math.pow(x_taylor, 2*n + 1) / this.factorial(2*n + 1);
						taylor_sin += term;
						operations++;
					}
					
					operations += 15;
				}
				
				const time = Date.now() - startTime;
				const safeTime = Math.max(time, 0.001); // 防止除零
				return { score: Math.round(operations / safeTime), operations };
			},
			
			// 计算阶乘的辅助函数
			factorial(n) {
				if (n <= 1) return 1;
				let result = 1;
				for (let i = 2; i <= Math.min(n, 20); i++) { // 限制最大值防止溢出
					result *= i;
				}
				return result;
			},
			
			// 深度递归算法测试
			deepRecursiveAlgorithms() {
				let operations = 0;
				const startTime = Date.now();
				
				// 高阶斐波那契变种 - 三项式递归
				const tribonacci = (n, memo = {}) => {
					if (n in memo) return memo[n];
					if (n <= 0) return 0;
					if (n === 1 || n === 2) return 1;
					if (n === 3) return 2;
					memo[n] = tribonacci(n - 1, memo) + tribonacci(n - 2, memo) + tribonacci(n - 3, memo);
					operations++;
					return memo[n];
				};
				
				// 快速幂算法（递归版）
				const fastPower = (base, exp, mod = 1000000007) => {
					operations++;
					if (exp === 0) return 1;
					if (exp === 1) return base % mod;
					if (exp % 2 === 0) {
						const half = fastPower(base, Math.floor(exp / 2), mod);
						return (half * half) % mod;
					} else {
						return (base * fastPower(base, exp - 1, mod)) % mod;
					}
				};
				
				// 分治算法 - 最大子数组和
				const maxSubarraySum = (arr, left, right) => {
					operations++;
					if (left === right) return arr[left];
					
					const mid = Math.floor((left + right) / 2);
					const leftSum = maxSubarraySum(arr, left, mid);
					const rightSum = maxSubarraySum(arr, mid + 1, right);
					
					// 跨中点的最大子数组
					let leftCrossSum = -Infinity;
					let sum = 0;
					for (let i = mid; i >= left; i--) {
						sum += arr[i];
						leftCrossSum = Math.max(leftCrossSum, sum);
						operations++;
					}
					
					let rightCrossSum = -Infinity;
					sum = 0;
					for (let i = mid + 1; i <= right; i++) {
						sum += arr[i];
						rightCrossSum = Math.max(rightCrossSum, sum);
						operations++;
					}
					
					const crossSum = leftCrossSum + rightCrossSum;
					return Math.max(leftSum, rightSum, crossSum);
				};
				
				// 回溯算法 - N皇后问题（小规模）
				const nQueens = (n, board = [], row = 0) => {
					operations++;
					if (row === n) return 1;
					
					let solutions = 0;
					for (let col = 0; col < n; col++) {
						if (this.isSafeQueen(board, row, col)) {
							board[row] = col;
							solutions += nQueens(n, [...board], row + 1);
						}
						operations++;
					}
					return solutions;
				};
				
				// 数组全排列生成（递归）
				const permutations = (arr, current = [], used = [], result = []) => {
					operations++;
					if (current.length === arr.length) {
						result.push([...current]);
						return result;
					}
					
					for (let i = 0; i < arr.length; i++) {
						if (!used[i]) {
							used[i] = true;
							current.push(arr[i]);
							permutations(arr, current, used, result);
							current.pop();
							used[i] = false;
						}
						operations++;
					}
					return result;
				};
				
				// 组合数计算（递归）
				const combination = (n, k, memo = {}) => {
					const key = `${n},${k}`;
					if (key in memo) return memo[key];
					operations++;
					
					if (k === 0 || k === n) return 1;
					if (k > n) return 0;
					
					memo[key] = combination(n - 1, k - 1, memo) + combination(n - 1, k, memo);
					return memo[key];
				};
				
				for (let i = 0; i < 15; i++) {
					// Tribonacci测试
					tribonacci(Math.floor(Math.random() * 15) + 8);
					
					// 快速幂测试
					const base = Math.floor(Math.random() * 10) + 2;
					const exp = Math.floor(Math.random() * 20) + 5;
					fastPower(base, exp);
					
					// 最大子数组测试
					const testArray = Array.from({length: 20}, () => Math.floor(Math.random() * 200) - 100);
					maxSubarraySum(testArray, 0, testArray.length - 1);
					
					// N皇后测试（小规模）
					const queensN = Math.floor(Math.random() * 3) + 4; // 4-6皇后
					nQueens(queensN);
					
					// 排列测试（小数组）
					const permArray = Array.from({length: 5}, (_, i) => i + 1);
					permutations(permArray);
					
					// 组合数测试
					const n = Math.floor(Math.random() * 10) + 8;
					const k = Math.floor(Math.random() * 5) + 2;
					combination(n, k);
				}
				
				const time = Date.now() - startTime;
				const safeTime = Math.max(time, 0.001);
				return { score: Math.round(operations / safeTime), operations };
			},
			
			// N皇后安全检查辅助函数
			isSafeQueen(board, row, col) {
				for (let i = 0; i < row; i++) {
					if (board[i] === col || 
						board[i] - i === col - row || 
						board[i] + i === col + row) {
						return false;
					}
				}
				return true;
			},
			
			// 高级排序算法测试
			advancedSortingAlgorithms() {
				let operations = 0;
				const startTime = Date.now();
				
				// 三路快速排序（处理重复元素）
				const quickSort3Way = (arr, low = 0, high = arr.length - 1) => {
					if (low >= high) return;
					operations++;
					
					const pivot = arr[low];
					let lt = low, gt = high, i = low + 1;
					
					while (i <= gt) {
						operations++;
						if (arr[i] < pivot) {
							[arr[lt], arr[i]] = [arr[i], arr[lt]];
							lt++;
							i++;
						} else if (arr[i] > pivot) {
							[arr[i], arr[gt]] = [arr[gt], arr[i]];
							gt--;
						} else {
							i++;
						}
					}
					
					quickSort3Way(arr, low, lt - 1);
					quickSort3Way(arr, gt + 1, high);
				};
				
				// 内省排序（Introsort）
				const introSort = (arr, maxDepth = Math.floor(Math.log2(arr.length)) * 2) => {
					const introSortUtil = (arr, low, high, maxDepth) => {
						operations++;
						if (high - low < 16) {
							// 小数组用插入排序
							insertionSort(arr, low, high);
						} else if (maxDepth === 0) {
							// 递归深度过深时用堆排序
							heapSortRange(arr, low, high);
						} else {
							// 否则用快速排序
							const pi = partition(arr, low, high);
							introSortUtil(arr, low, pi - 1, maxDepth - 1);
							introSortUtil(arr, pi + 1, high, maxDepth - 1);
						}
					};
					
					introSortUtil(arr, 0, arr.length - 1, maxDepth);
				};
				
				// 插入排序（用于小数组）
				const insertionSort = (arr, low = 0, high = arr.length - 1) => {
					for (let i = low + 1; i <= high; i++) {
						operations++;
						const key = arr[i];
						let j = i - 1;
						while (j >= low && arr[j] > key) {
							operations++;
							arr[j + 1] = arr[j];
							j--;
						}
						arr[j + 1] = key;
					}
				};
				
				// 分区函数
				const partition = (arr, low, high) => {
					const pivot = arr[high];
					let i = low - 1;
					
					for (let j = low; j < high; j++) {
						operations++;
						if (arr[j] <= pivot) {
							i++;
							[arr[i], arr[j]] = [arr[j], arr[i]];
						}
					}
					[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
					return i + 1;
				};
				
				// 堆排序范围版本
				const heapSortRange = (arr, low, high) => {
					const heapify = (arr, n, i, offset) => {
						operations++;
						let largest = i;
						const left = 2 * i + 1;
						const right = 2 * i + 2;
						
						if (left < n && arr[offset + left] > arr[offset + largest]) {
							largest = left;
						}
						if (right < n && arr[offset + right] > arr[offset + largest]) {
							largest = right;
						}
						
						if (largest !== i) {
							[arr[offset + i], arr[offset + largest]] = [arr[offset + largest], arr[offset + i]];
							heapify(arr, n, largest, offset);
						}
					};
					
					const n = high - low + 1;
					for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
						heapify(arr, n, i, low);
					}
					
					for (let i = n - 1; i > 0; i--) {
						[arr[low], arr[low + i]] = [arr[low + i], arr[low]];
						heapify(arr, i, 0, low);
					}
				};
				
				// 计数排序（适用于小范围整数）
				const countingSort = (arr, max = 1000) => {
					const count = new Array(max + 1).fill(0);
					const output = new Array(arr.length);
					
					// 计数
					for (let i = 0; i < arr.length; i++) {
						operations++;
						count[arr[i]]++;
					}
					
					// 累积计数
					for (let i = 1; i <= max; i++) {
						operations++;
						count[i] += count[i - 1];
					}
					
					// 构建输出数组
					for (let i = arr.length - 1; i >= 0; i--) {
						operations++;
						output[count[arr[i]] - 1] = arr[i];
						count[arr[i]]--;
					}
					
					return output;
				};
				
				// 基数排序
				const radixSort = (arr) => {
					const getMax = (arr) => {
						let max = arr[0];
						for (let i = 1; i < arr.length; i++) {
							operations++;
							if (arr[i] > max) max = arr[i];
						}
						return max;
					};
					
					const countingSortByDigit = (arr, exp) => {
						const output = new Array(arr.length);
						const count = new Array(10).fill(0);
						
						for (let i = 0; i < arr.length; i++) {
							operations++;
							count[Math.floor(arr[i] / exp) % 10]++;
						}
						
						for (let i = 1; i < 10; i++) {
							count[i] += count[i - 1];
						}
						
						for (let i = arr.length - 1; i >= 0; i--) {
							operations++;
							const digit = Math.floor(arr[i] / exp) % 10;
							output[count[digit] - 1] = arr[i];
							count[digit]--;
						}
						
						for (let i = 0; i < arr.length; i++) {
							arr[i] = output[i];
						}
					};
					
					const max = getMax(arr);
					for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
						countingSortByDigit(arr, exp);
					}
				};
				
				// 桶排序
				const bucketSort = (arr, bucketCount = 10) => {
					if (arr.length <= 1) return arr;
					
					const max = Math.max(...arr);
					const min = Math.min(...arr);
					const bucketSize = Math.floor((max - min) / bucketCount) + 1;
					const buckets = Array.from({length: bucketCount}, () => []);
					
					// 分配到桶中
					for (let i = 0; i < arr.length; i++) {
						operations++;
						const bucketIndex = Math.floor((arr[i] - min) / bucketSize);
						const safeBucketIndex = Math.min(bucketIndex, bucketCount - 1);
						buckets[safeBucketIndex].push(arr[i]);
					}
					
					// 对每个桶排序并合并
					let result = [];
					for (let i = 0; i < bucketCount; i++) {
						operations++;
						if (buckets[i].length > 0) {
							buckets[i].sort((a, b) => a - b);
							result = result.concat(buckets[i]);
						}
					}
					
					return result;
				};
				
				// 执行测试
				for (let i = 0; i < 8; i++) {
					// 创建不同类型的测试数组
					const randomArray = Array.from({length: 150}, () => Math.floor(Math.random() * 1000));
					const duplicateArray = Array.from({length: 150}, () => Math.floor(Math.random() * 50));
					const smallRangeArray = Array.from({length: 150}, () => Math.floor(Math.random() * 100));
					
					// 测试各种排序算法
					const testArray1 = [...randomArray];
					quickSort3Way(testArray1);
					
					const testArray2 = [...randomArray];
					introSort(testArray2);
					
					const testArray3 = [...duplicateArray];
					countingSort(testArray3, 50);
					
					const testArray4 = [...smallRangeArray];
					radixSort(testArray4);
					
					const testArray5 = [...randomArray];
					bucketSort(testArray5);
				}
				
				const time = Date.now() - startTime;
				const safeTime = Math.max(time, 0.001);
				return { score: Math.round(operations / safeTime), operations };
			},
			
			// 复杂字符串算法
			complexStringProcessing() {
				let operations = 0;
				const startTime = Date.now();
				
				// Z算法（线性时间字符串匹配）
				const zAlgorithm = (str) => {
					const n = str.length;
					const z = new Array(n).fill(0);
					let l = 0, r = 0;
					
					for (let i = 1; i < n; i++) {
						operations++;
						if (i <= r) {
							z[i] = Math.min(r - i + 1, z[i - l]);
						}
						
						while (i + z[i] < n && str[z[i]] === str[i + z[i]]) {
							operations++;
							z[i]++;
						}
						
						if (i + z[i] - 1 > r) {
							l = i;
							r = i + z[i] - 1;
						}
					}
					return z;
				};
				
				// Manacher算法（回文子串）
				const manacher = (s) => {
					let processedStr = '#';
					for (let char of s) {
						processedStr += char + '#';
					}
					
					const n = processedStr.length;
					const p = new Array(n).fill(0);
					let center = 0, right = 0;
					
					for (let i = 0; i < n; i++) {
						operations++;
						if (i < right) {
							p[i] = Math.min(right - i, p[2 * center - i]);
						}
						
						while (i - p[i] - 1 >= 0 && i + p[i] + 1 < n && 
							   processedStr[i - p[i] - 1] === processedStr[i + p[i] + 1]) {
							operations++;
							p[i]++;
						}
						
						if (i + p[i] > right) {
							center = i;
							right = i + p[i];
						}
					}
					
					return Math.max(...p);
				};
				
				// 后缀数组构建
				const buildSuffixArray = (s) => {
					const n = s.length;
					const suffixes = [];
					
					for (let i = 0; i < n; i++) {
						operations++;
						suffixes.push({ index: i, suffix: s.substring(i) });
					}
					
					suffixes.sort((a, b) => {
						operations++;
						return a.suffix.localeCompare(b.suffix);
					});
					
					return suffixes.map(item => item.index);
				};
				
				// Rabin-Karp多模式匹配
				const rabinKarp = (text, patterns) => {
					const base = 256;
					const prime = 101;
					const results = [];
					
					for (let pattern of patterns) {
						operations++;
						const m = pattern.length;
						const n = text.length;
						let patternHash = 0;
						let textHash = 0;
						let h = 1;
						
						// 计算h = base^(m-1) % prime
						for (let i = 0; i < m - 1; i++) {
							h = (h * base) % prime;
						}
						
						// 计算模式和第一个窗口的哈希值
						for (let i = 0; i < m; i++) {
							operations++;
							patternHash = (base * patternHash + pattern.charCodeAt(i)) % prime;
							textHash = (base * textHash + text.charCodeAt(i)) % prime;
						}
						
						// 滑动窗口
						for (let i = 0; i <= n - m; i++) {
							operations++;
							if (patternHash === textHash) {
								let match = true;
								for (let j = 0; j < m; j++) {
									operations++;
									if (text[i + j] !== pattern[j]) {
										match = false;
										break;
									}
								}
								if (match) results.push({ pattern, position: i });
							}
							
							if (i < n - m) {
								textHash = (base * (textHash - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % prime;
								if (textHash < 0) textHash += prime;
							}
						}
					}
					return results;
				};
				
				// 编辑距离（Wagner-Fischer算法）
				const editDistance = (str1, str2) => {
					const m = str1.length;
					const n = str2.length;
					const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
					
					for (let i = 0; i <= m; i++) dp[i][0] = i;
					for (let j = 0; j <= n; j++) dp[0][j] = j;
					
					for (let i = 1; i <= m; i++) {
						for (let j = 1; j <= n; j++) {
							operations++;
							if (str1[i - 1] === str2[j - 1]) {
								dp[i][j] = dp[i - 1][j - 1];
							} else {
								dp[i][j] = 1 + Math.min(
									dp[i - 1][j],     // 删除
									dp[i][j - 1],     // 插入
									dp[i - 1][j - 1]  // 替换
								);
							}
						}
					}
					return dp[m][n];
				};
				
				// Aho-Corasick算法（多模式匹配）
				const ahoCorasick = (text, patterns) => {
					// 构建trie树
					const trie = { children: {}, isEnd: false, pattern: '', failure: null };
					
					// 插入所有模式
					for (let pattern of patterns) {
						operations++;
						let node = trie;
						for (let char of pattern) {
							if (!node.children[char]) {
								node.children[char] = { children: {}, isEnd: false, pattern: '', failure: null };
							}
							node = node.children[char];
						}
						node.isEnd = true;
						node.pattern = pattern;
					}
					
					// 构建失败函数
					const queue = [];
					for (let char in trie.children) {
						trie.children[char].failure = trie;
						queue.push(trie.children[char]);
					}
					
					while (queue.length > 0) {
						operations++;
						const current = queue.shift();
						
						for (let char in current.children) {
							const child = current.children[char];
							queue.push(child);
							
							let failure = current.failure;
							while (failure && !failure.children[char]) {
								failure = failure.failure;
							}
							
							child.failure = failure ? failure.children[char] : trie;
						}
					}
					
					// 搜索
					const matches = [];
					let node = trie;
					
					for (let i = 0; i < text.length; i++) {
						operations++;
						const char = text[i];
						
						while (node && !node.children[char]) {
							node = node.failure;
						}
						
						node = node ? node.children[char] : trie;
						
						let temp = node;
						while (temp) {
							if (temp.isEnd) {
								matches.push({ pattern: temp.pattern, position: i - temp.pattern.length + 1 });
							}
							temp = temp.failure;
						}
					}
					
					return matches;
				};
				
				// 执行测试
				for (let i = 0; i < 12; i++) {
					// 生成测试字符串
					const text = Array.from({length: 100}, () => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');
					const pattern = Array.from({length: 8}, () => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');
					
					// Z算法测试
					zAlgorithm(text);
					
					// Manacher算法测试
					manacher(text.substring(0, 50));
					
					// 后缀数组测试
					buildSuffixArray(text.substring(0, 30));
					
					// Rabin-Karp测试
					const patterns = [pattern, pattern.substring(0, 5), pattern.substring(2)];
					rabinKarp(text, patterns);
					
					// 编辑距离测试
					const str1 = text.substring(0, 20);
					const str2 = text.substring(10, 30);
					editDistance(str1, str2);
					
					// Aho-Corasick测试
					ahoCorasick(text, patterns);
				}
				
				const time = Date.now() - startTime;
				const safeTime = Math.max(time, 0.001);
				return { score: Math.round(operations / safeTime), operations };
			},
			
			// 高维矩阵运算
			heavyMatrixOperations() {
				let operations = 0;
				const startTime = Date.now();
				
				// Strassen矩阵乘法（分治算法）
				const strassenMultiply = (a, b, n = a.length) => {
					if (n <= 2) {
						// 基础情况：普通矩阵乘法
						const result = Array(n).fill().map(() => Array(n).fill(0));
						for (let i = 0; i < n; i++) {
							for (let j = 0; j < n; j++) {
								for (let k = 0; k < n; k++) {
									operations++;
									result[i][j] += a[i][k] * b[k][j];
								}
							}
						}
						return result;
					}
					
					const half = Math.floor(n / 2);
					const a11 = [], a12 = [], a21 = [], a22 = [];
					const b11 = [], b12 = [], b21 = [], b22 = [];
					
					// 分割矩阵
					for (let i = 0; i < half; i++) {
						operations++;
						a11[i] = a[i].slice(0, half);
						a12[i] = a[i].slice(half);
						a21[i] = a[i + half].slice(0, half);
						a22[i] = a[i + half].slice(half);
						b11[i] = b[i].slice(0, half);
						b12[i] = b[i].slice(half);
						b21[i] = b[i + half].slice(0, half);
						b22[i] = b[i + half].slice(half);
					}
					
					// Strassen的7个乘法
					const m1 = strassenMultiply(this.matrixAdd(a11, a22), this.matrixAdd(b11, b22), half);
					const m2 = strassenMultiply(this.matrixAdd(a21, a22), b11, half);
					const m3 = strassenMultiply(a11, this.matrixSubtract(b12, b22), half);
					const m4 = strassenMultiply(a22, this.matrixSubtract(b21, b11), half);
					const m5 = strassenMultiply(this.matrixAdd(a11, a12), b22, half);
					const m6 = strassenMultiply(this.matrixSubtract(a21, a11), this.matrixAdd(b11, b12), half);
					const m7 = strassenMultiply(this.matrixSubtract(a12, a22), this.matrixAdd(b21, b22), half);
					
					// 计算结果的四个象限
					const c11 = this.matrixSubtract(this.matrixAdd(this.matrixAdd(m1, m4), m7), m5);
					const c12 = this.matrixAdd(m3, m5);
					const c21 = this.matrixAdd(m2, m4);
					const c22 = this.matrixSubtract(this.matrixSubtract(this.matrixAdd(m1, m3), m2), m6);
					
					// 合并结果
					const result = Array(n).fill().map(() => Array(n).fill(0));
					for (let i = 0; i < half; i++) {
						for (let j = 0; j < half; j++) {
							result[i][j] = c11[i][j];
							result[i][j + half] = c12[i][j];
							result[i + half][j] = c21[i][j];
							result[i + half][j + half] = c22[i][j];
						}
					}
					
					return result;
				};
				
				// LU分解
				const luDecomposition = (matrix) => {
					const n = matrix.length;
					const L = Array(n).fill().map(() => Array(n).fill(0));
					const U = Array(n).fill().map(() => Array(n).fill(0));
					
					for (let i = 0; i < n; i++) {
						operations++;
						// 上三角矩阵U
						for (let k = i; k < n; k++) {
							operations++;
							let sum = 0;
							for (let j = 0; j < i; j++) {
								sum += L[i][j] * U[j][k];
							}
							U[i][k] = matrix[i][k] - sum;
						}
						
						// 下三角矩阵L
						for (let k = i; k < n; k++) {
							operations++;
							if (i === k) {
								L[i][i] = 1;
							} else {
								let sum = 0;
								for (let j = 0; j < i; j++) {
									sum += L[k][j] * U[j][i];
								}
								if (Math.abs(U[i][i]) > 1e-10) {
									L[k][i] = (matrix[k][i] - sum) / U[i][i];
								}
							}
						}
					}
					
					return { L, U };
				};
				
				// QR分解（Gram-Schmidt过程）
				const qrDecomposition = (matrix) => {
					const m = matrix.length;
					const n = matrix[0].length;
					const Q = Array(m).fill().map(() => Array(n).fill(0));
					const R = Array(n).fill().map(() => Array(n).fill(0));
					
					for (let j = 0; j < n; j++) {
						operations++;
						// 复制第j列
						let v = [];
						for (let i = 0; i < m; i++) {
							v[i] = matrix[i][j];
						}
						
						// 正交化
						for (let i = 0; i < j; i++) {
							operations++;
							let dot = 0;
							for (let k = 0; k < m; k++) {
								dot += Q[k][i] * matrix[k][j];
							}
							R[i][j] = dot;
							
							for (let k = 0; k < m; k++) {
								v[k] -= dot * Q[k][i];
							}
						}
						
						// 归一化
						let norm = 0;
						for (let k = 0; k < m; k++) {
							norm += v[k] * v[k];
						}
						norm = Math.sqrt(norm);
						R[j][j] = norm;
						
						if (norm > 1e-10) {
							for (let k = 0; k < m; k++) {
								Q[k][j] = v[k] / norm;
							}
						}
					}
					
					return { Q, R };
				};
				
				// 特征值计算（幂方法）
				const powerMethod = (matrix, iterations = 20) => {
					const n = matrix.length;
					let v = Array(n).fill().map(() => Math.random());
					
					for (let iter = 0; iter < iterations; iter++) {
						operations++;
						// 矩阵向量乘法
						const newV = Array(n).fill(0);
						for (let i = 0; i < n; i++) {
							for (let j = 0; j < n; j++) {
								operations++;
								newV[i] += matrix[i][j] * v[j];
							}
						}
						
						// 归一化
						let norm = 0;
						for (let i = 0; i < n; i++) {
							norm += newV[i] * newV[i];
						}
						norm = Math.sqrt(norm);
						
						if (norm > 1e-10) {
							for (let i = 0; i < n; i++) {
								v[i] = newV[i] / norm;
							}
						}
					}
					
					// 计算特征值
					let eigenvalue = 0;
					for (let i = 0; i < n; i++) {
						let sum = 0;
						for (let j = 0; j < n; j++) {
							sum += matrix[i][j] * v[j];
						}
						eigenvalue += v[i] * sum;
					}
					
					return { eigenvalue, eigenvector: v };
				};
				
				// 矩阵求逆（高斯-约旦消元法）
				const matrixInverse = (matrix) => {
					const n = matrix.length;
					const augmented = Array(n).fill().map((_, i) => 
						[...matrix[i], ...Array(n).fill(0).map((_, j) => i === j ? 1 : 0)]
					);
					
					// 前向消元
					for (let i = 0; i < n; i++) {
						operations++;
						// 选择主元
						let maxRow = i;
						for (let k = i + 1; k < n; k++) {
							if (Math.abs(augmented[k][i]) > Math.abs(augmented[maxRow][i])) {
								maxRow = k;
							}
						}
						
						// 交换行
						if (maxRow !== i) {
							[augmented[i], augmented[maxRow]] = [augmented[maxRow], augmented[i]];
						}
						
						// 检查是否可逆
						if (Math.abs(augmented[i][i]) < 1e-10) {
							return null; // 矩阵不可逆
						}
						
						// 消元
						for (let k = 0; k < n; k++) {
							if (k !== i) {
								operations++;
								const factor = augmented[k][i] / augmented[i][i];
								for (let j = 0; j < 2 * n; j++) {
									augmented[k][j] -= factor * augmented[i][j];
								}
							}
						}
						
						// 主对角线元素归一化
						const diagonal = augmented[i][i];
						for (let j = 0; j < 2 * n; j++) {
							augmented[i][j] /= diagonal;
						}
					}
					
					// 提取逆矩阵
					const inverse = Array(n).fill().map((_, i) => 
						augmented[i].slice(n)
					);
					
					return inverse;
				};
				
				// 执行测试
				for (let i = 0; i < 6; i++) {
					// 创建不同规模的测试矩阵
					const size = 8;
					const matrix1 = Array(size).fill().map(() => 
						Array(size).fill().map(() => Math.random() * 20 - 10)
					);
					const matrix2 = Array(size).fill().map(() => 
						Array(size).fill().map(() => Math.random() * 20 - 10)
					);
					
					// Strassen乘法测试
					if (size <= 8) { // 限制规模避免过度递归
						strassenMultiply(matrix1, matrix2);
					}
					
					// LU分解测试
					luDecomposition(matrix1);
					
					// QR分解测试
					qrDecomposition(matrix1);
					
					// 特征值计算测试
					const symmetricMatrix = Array(size).fill().map((_, i) => 
						Array(size).fill().map((_, j) => 
							i === j ? Math.random() * 10 + 1 : Math.random() * 2 - 1
						)
					);
					powerMethod(symmetricMatrix, 10);
					
					// 矩阵求逆测试（小矩阵）
					const smallMatrix = Array(4).fill().map(() => 
						Array(4).fill().map(() => Math.random() * 10 - 5)
					);
					// 确保矩阵可逆
					for (let j = 0; j < 4; j++) {
						smallMatrix[j][j] += 10;
					}
					matrixInverse(smallMatrix);
				}
				
				const time = Date.now() - startTime;
				const safeTime = Math.max(time, 0.001);
				return { score: Math.round(operations / safeTime), operations };
			},
			
			// 矩阵加法辅助函数
			matrixAdd(a, b) {
				const result = [];
				for (let i = 0; i < a.length; i++) {
					result[i] = [];
					for (let j = 0; j < a[i].length; j++) {
						result[i][j] = a[i][j] + b[i][j];
					}
				}
				return result;
			},
			
			// 矩阵减法辅助函数
			matrixSubtract(a, b) {
				const result = [];
				for (let i = 0; i < a.length; i++) {
					result[i] = [];
					for (let j = 0; j < a[i].length; j++) {
						result[i][j] = a[i][j] - b[i][j];
					}
				}
				return result;
			},
			
			// 高强度数值计算
			intensiveNumericComputation() {
				let operations = 0;
				const startTime = Date.now();
				
				// 蒙特卡罗π值估算
				const monteCarloPi = (samples = 50000) => {
					let insideCircle = 0;
					for (let i = 0; i < samples; i++) {
						operations++;
						const x = Math.random() * 2 - 1;
						const y = Math.random() * 2 - 1;
						if (x * x + y * y <= 1) {
							insideCircle++;
						}
					}
					return (4 * insideCircle) / samples;
				};
				
				// 数值微分（中心差分法）
				const numericalDerivative = (func, x, h = 1e-5) => {
					operations++;
					return (func(x + h) - func(x - h)) / (2 * h);
				};
				
				// 龙格-库塔法求解常微分方程
				const rungeKutta4 = (f, x0, y0, h, n) => {
					let x = x0;
					let y = y0;
					
					for (let i = 0; i < n; i++) {
						operations++;
						const k1 = h * f(x, y);
						const k2 = h * f(x + h/2, y + k1/2);
						const k3 = h * f(x + h/2, y + k2/2);
						const k4 = h * f(x + h, y + k3);
						
						y = y + (k1 + 2*k2 + 2*k3 + k4) / 6;
						x = x + h;
					}
					
					return { x, y };
				};
				
				// 牛顿-拉夫逊法求根
				const newtonRaphson = (f, df, x0, tolerance = 1e-6, maxIterations = 50) => {
					let x = x0;
					
					for (let i = 0; i < maxIterations; i++) {
						operations++;
						const fx = f(x);
						const dfx = df(x);
						
						if (Math.abs(fx) < tolerance) break;
						if (Math.abs(dfx) < 1e-12) break; // 防止除零
						
						x = x - fx / dfx;
					}
					
					return x;
				};
				
				// 快速傅里叶变换（FFT）
				const fft = (signal) => {
					const n = signal.length;
					if (n <= 1) return signal;
					
					operations++;
					
					// 分离偶数和奇数索引
					const even = [];
					const odd = [];
					for (let i = 0; i < n; i++) {
						if (i % 2 === 0) {
							even.push(signal[i]);
						} else {
							odd.push(signal[i]);
						}
					}
					
					// 递归计算
					const evenFFT = fft(even);
					const oddFFT = fft(odd);
					
					const result = new Array(n);
					const halfN = n / 2;
					
					for (let k = 0; k < halfN; k++) {
						operations++;
						const angle = -2 * Math.PI * k / n;
						const wk = { real: Math.cos(angle), imag: Math.sin(angle) };
						
						// 复数乘法: wk * oddFFT[k]
						const wkOdd = {
							real: wk.real * oddFFT[k].real - wk.imag * oddFFT[k].imag,
							imag: wk.real * oddFFT[k].imag + wk.imag * oddFFT[k].real
						};
						
						// 复数加法和减法
						result[k] = {
							real: evenFFT[k].real + wkOdd.real,
							imag: evenFFT[k].imag + wkOdd.imag
						};
						
						result[k + halfN] = {
							real: evenFFT[k].real - wkOdd.real,
							imag: evenFFT[k].imag - wkOdd.imag
						};
					}
					
					return result;
				};
				
				// 数值积分（辛普森3/8法则）
				const simpson38 = (f, a, b, n = 300) => {
					const h = (b - a) / n;
					let sum = f(a) + f(b);
					
					for (let i = 1; i < n; i++) {
						operations++;
						const x = a + i * h;
						const weight = (i % 3 === 0) ? 2 : 3;
						sum += weight * f(x);
					}
					
					return (3 * h / 8) * sum;
				};
				
				// 高斯消元法解线性方程组
				const gaussianElimination = (A, b) => {
					const n = A.length;
					const augmented = A.map((row, i) => [...row, b[i]]);
					
					// 前向消元
					for (let i = 0; i < n; i++) {
						operations++;
						
						// 选择主元
						let maxRow = i;
						for (let k = i + 1; k < n; k++) {
							if (Math.abs(augmented[k][i]) > Math.abs(augmented[maxRow][i])) {
								maxRow = k;
							}
						}
						
						// 交换行
						if (maxRow !== i) {
							[augmented[i], augmented[maxRow]] = [augmented[maxRow], augmented[i]];
						}
						
						// 消元
						for (let k = i + 1; k < n; k++) {
							operations++;
							if (Math.abs(augmented[i][i]) < 1e-10) continue;
							
							const factor = augmented[k][i] / augmented[i][i];
							for (let j = i; j <= n; j++) {
								augmented[k][j] -= factor * augmented[i][j];
							}
						}
					}
					
					// 回代
					const x = new Array(n);
					for (let i = n - 1; i >= 0; i--) {
						operations++;
						x[i] = augmented[i][n];
						for (let j = i + 1; j < n; j++) {
							x[i] -= augmented[i][j] * x[j];
						}
						if (Math.abs(augmented[i][i]) > 1e-10) {
							x[i] /= augmented[i][i];
						}
					}
					
					return x;
				};
				
				// 执行测试
				for (let i = 0; i < 10; i++) {
					// 蒙特卡罗测试
					monteCarloPi(10000);
					
					// 数值微分测试
					const testFunc = (x) => x * x * x + 2 * x * x + x + 1;
					numericalDerivative(testFunc, Math.random() * 10);
					
					// 龙格-库塔测试
					const odeFunc = (x, y) => x + y; // dy/dx = x + y
					rungeKutta4(odeFunc, 0, 1, 0.1, 20);
					
					// 牛顿-拉夫逊测试
					const f = (x) => x * x - 2; // 求sqrt(2)
					const df = (x) => 2 * x;
					newtonRaphson(f, df, 1.5);
					
					// FFT测试（需要2的幂次长度）
					const signal = [];
					for (let j = 0; j < 16; j++) {
						signal.push({ real: Math.sin(2 * Math.PI * j / 16), imag: 0 });
					}
					fft(signal);
					
					// 数值积分测试
					const integrandFunc = (x) => x * x + Math.sin(x);
					simpson38(integrandFunc, 0, Math.PI, 100);
					
					// 高斯消元测试
					const matrixA = Array(5).fill().map(() => 
						Array(5).fill().map(() => Math.random() * 10 - 5)
					);
					const vectorB = Array(5).fill().map(() => Math.random() * 10 - 5);
					// 确保矩阵可逆
					for (let j = 0; j < 5; j++) {
						matrixA[j][j] += 10;
					}
					gaussianElimination(matrixA, vectorB);
				}
				
				const time = Date.now() - startTime;
				const safeTime = Math.max(time, 0.001);
				return { score: Math.round(operations / safeTime), operations };
			},
			
			// 图论算法
			graphAlgorithms() {
				let operations = 0;
				const startTime = Date.now();
				
				// Dijkstra最短路径算法
				const dijkstra = (graph, start) => {
					const n = graph.length;
					const dist = new Array(n).fill(Infinity);
					const visited = new Array(n).fill(false);
					dist[start] = 0;
					
					for (let count = 0; count < n - 1; count++) {
						operations++;
						
						// 找到最小距离的未访问顶点
						let u = -1;
						for (let v = 0; v < n; v++) {
							if (!visited[v] && (u === -1 || dist[v] < dist[u])) {
								u = v;
							}
						}
						
						visited[u] = true;
						
						// 更新相邻顶点的距离
						for (let v = 0; v < n; v++) {
							operations++;
							if (!visited[v] && graph[u][v] > 0 && 
								dist[u] !== Infinity && dist[u] + graph[u][v] < dist[v]) {
								dist[v] = dist[u] + graph[u][v];
							}
						}
					}
					
					return dist;
				};
				
				// Floyd-Warshall全源最短路径
				const floydWarshall = (graph) => {
					const n = graph.length;
					const dist = graph.map(row => [...row]);
					
					for (let k = 0; k < n; k++) {
						for (let i = 0; i < n; i++) {
							for (let j = 0; j < n; j++) {
								operations++;
								if (dist[i][k] !== Infinity && dist[k][j] !== Infinity) {
									dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
								}
							}
						}
					}
					
					return dist;
				};
				
				// 深度优先搜索
				const dfs = (graph, start, visited = new Set()) => {
					operations++;
					visited.add(start);
					
					for (let neighbor = 0; neighbor < graph[start].length; neighbor++) {
						if (graph[start][neighbor] > 0 && !visited.has(neighbor)) {
							dfs(graph, neighbor, visited);
						}
					}
					
					return visited;
				};
				
				// 广度优先搜索
				const bfs = (graph, start) => {
					const visited = new Set();
					const queue = [start];
					visited.add(start);
					
					while (queue.length > 0) {
						operations++;
						const current = queue.shift();
						
						for (let neighbor = 0; neighbor < graph[current].length; neighbor++) {
							if (graph[current][neighbor] > 0 && !visited.has(neighbor)) {
								visited.add(neighbor);
								queue.push(neighbor);
							}
						}
					}
					
					return visited;
				};
				
				// Kruskal最小生成树
				const kruskal = (edges, n) => {
					// 边按权重排序
					edges.sort((a, b) => a.weight - b.weight);
					
					// 并查集
					const parent = Array.from({length: n}, (_, i) => i);
					const rank = new Array(n).fill(0);
					
					const find = (x) => {
						if (parent[x] !== x) {
							parent[x] = find(parent[x]);
						}
						return parent[x];
					};
					
					const union = (x, y) => {
						const px = find(x);
						const py = find(y);
						
						if (px === py) return false;
						
						if (rank[px] < rank[py]) {
							parent[px] = py;
						} else if (rank[px] > rank[py]) {
							parent[py] = px;
						} else {
							parent[py] = px;
							rank[px]++;
						}
						
						return true;
					};
					
					const mst = [];
					for (let edge of edges) {
						operations++;
						if (union(edge.from, edge.to)) {
							mst.push(edge);
							if (mst.length === n - 1) break;
						}
					}
					
					return mst;
				};
				
				// 拓扑排序
				const topologicalSort = (graph) => {
					const n = graph.length;
					const inDegree = new Array(n).fill(0);
					
					// 计算入度
					for (let i = 0; i < n; i++) {
						for (let j = 0; j < n; j++) {
							operations++;
							if (graph[i][j] > 0) {
								inDegree[j]++;
							}
						}
					}
					
					const queue = [];
					for (let i = 0; i < n; i++) {
						if (inDegree[i] === 0) {
							queue.push(i);
						}
					}
					
					const result = [];
					while (queue.length > 0) {
						operations++;
						const current = queue.shift();
						result.push(current);
						
						for (let neighbor = 0; neighbor < n; neighbor++) {
							if (graph[current][neighbor] > 0) {
								inDegree[neighbor]--;
								if (inDegree[neighbor] === 0) {
									queue.push(neighbor);
								}
							}
						}
					}
					
					return result.length === n ? result : null; // 检测环
				};
				
				// 执行测试
				for (let i = 0; i < 8; i++) {
					// 创建随机图
					const n = 10;
					const graph = Array(n).fill().map(() => Array(n).fill(0));
					const edges = [];
					
					// 生成随机边
					for (let u = 0; u < n; u++) {
						for (let v = u + 1; v < n; v++) {
							if (Math.random() < 0.3) { // 30%概率有边
								const weight = Math.floor(Math.random() * 50) + 1;
								graph[u][v] = weight;
								graph[v][u] = weight; // 无向图
								edges.push({from: u, to: v, weight});
							}
						}
					}
					
					// 确保图连通
					for (let u = 0; u < n - 1; u++) {
						if (graph[u][u + 1] === 0) {
							const weight = Math.floor(Math.random() * 10) + 1;
							graph[u][u + 1] = weight;
							graph[u + 1][u] = weight;
							edges.push({from: u, to: u + 1, weight});
						}
					}
					
					// 测试各种算法
					dijkstra(graph, 0);
					floydWarshall(graph);
					dfs(graph, 0);
					bfs(graph, 0);
					kruskal(edges, n);
					
					// 创建有向无环图进行拓扑排序
					const dagGraph = Array(n).fill().map(() => Array(n).fill(0));
					for (let u = 0; u < n - 1; u++) {
						for (let v = u + 1; v < n; v++) {
							if (Math.random() < 0.2) {
								dagGraph[u][v] = 1;
							}
						}
					}
					topologicalSort(dagGraph);
				}
				
				const time = Date.now() - startTime;
				const safeTime = Math.max(time, 0.001);
				return { score: Math.round(operations / safeTime), operations };
			},
			
			// 并发模拟计算
			concurrentSimulation() {
				let operations = 0;
				const startTime = Date.now();
				
				// 生产者-消费者问题模拟
				const producerConsumer = (bufferSize = 10, producers = 3, consumers = 2, iterations = 100) => {
					let buffer = [];
					let produced = 0;
					let consumed = 0;
					
					for (let iter = 0; iter < iterations; iter++) {
						operations++;
						
						// 生产者操作
						for (let p = 0; p < producers; p++) {
							if (buffer.length < bufferSize && Math.random() < 0.7) {
								buffer.push(produced++);
							}
						}
						
						// 消费者操作
						for (let c = 0; c < consumers; c++) {
							if (buffer.length > 0 && Math.random() < 0.8) {
								buffer.shift();
								consumed++;
							}
						}
					}
					
					return { produced, consumed, bufferSize: buffer.length };
				};
				
				// 哲学家就餐问题模拟
				const diningPhilosophers = (numPhilosophers = 5, rounds = 50) => {
					const forks = new Array(numPhilosophers).fill(true); // true表示可用
					const philosophers = new Array(numPhilosophers).fill(0); // 记录用餐次数
					
					for (let round = 0; round < rounds; round++) {
						operations++;
						
						for (let i = 0; i < numPhilosophers; i++) {
							const leftFork = i;
							const rightFork = (i + 1) % numPhilosophers;
							
							// 尝试同时获得两个叉子
							if (forks[leftFork] && forks[rightFork] && Math.random() < 0.3) {
								forks[leftFork] = false;
								forks[rightFork] = false;
								philosophers[i]++;
								
								// 模拟用餐时间
								setTimeout(() => {
									forks[leftFork] = true;
									forks[rightFork] = true;
								}, 0);
							}
						}
					}
					
					return philosophers;
				};
				
				// 读写者问题模拟
				const readersWriters = (readers = 5, writers = 2, iterations = 100) => {
					let readerCount = 0;
					let isWriting = false;
					let readOperations = 0;
					let writeOperations = 0;
					
					for (let iter = 0; iter < iterations; iter++) {
						operations++;
						
						// 写者尝试写入
						for (let w = 0; w < writers; w++) {
							if (!isWriting && readerCount === 0 && Math.random() < 0.2) {
								isWriting = true;
								writeOperations++;
								
								// 模拟写入时间
								setTimeout(() => {
									isWriting = false;
								}, 0);
								break;
							}
						}
						
						// 读者尝试读取
						for (let r = 0; r < readers; r++) {
							if (!isWriting && Math.random() < 0.6) {
								readerCount++;
								readOperations++;
								
								setTimeout(() => {
									readerCount--;
								}, 0);
							}
						}
					}
					
					return { readOperations, writeOperations };
				};
				
				// 银行家算法安全性检查
				const bankersAlgorithm = (processes, resources, allocation, max, available) => {
					const n = processes;
					const m = resources;
					const need = allocation.map((row, i) => 
						row.map((cell, j) => max[i][j] - cell)
					);
					
					const work = [...available];
					const finish = new Array(n).fill(false);
					const safeSequence = [];
					
					while (safeSequence.length < n) {
						operations++;
						let found = false;
						
						for (let i = 0; i < n; i++) {
							if (!finish[i]) {
								let canExecute = true;
								for (let j = 0; j < m; j++) {
									if (need[i][j] > work[j]) {
										canExecute = false;
										break;
									}
								}
								
								if (canExecute) {
									for (let j = 0; j < m; j++) {
										work[j] += allocation[i][j];
									}
									finish[i] = true;
									safeSequence.push(i);
									found = true;
									break;
								}
							}
						}
						
						if (!found) break; // 死锁
					}
					
					return safeSequence.length === n ? safeSequence : null;
				};
				
				// 进程调度模拟（轮转调度）
				const roundRobinScheduling = (processes, burstTimes, quantum = 3) => {
					const n = processes.length;
					const remainingTime = [...burstTimes];
					const waitingTime = new Array(n).fill(0);
					const turnaroundTime = new Array(n).fill(0);
					let currentTime = 0;
					
					const queue = [...Array(n).keys()];
					
					while (queue.length > 0) {
						operations++;
						const process = queue.shift();
						
						if (remainingTime[process] <= quantum) {
							currentTime += remainingTime[process];
							turnaroundTime[process] = currentTime;
							remainingTime[process] = 0;
						} else {
							currentTime += quantum;
							remainingTime[process] -= quantum;
							queue.push(process);
						}
					}
					
					for (let i = 0; i < n; i++) {
						waitingTime[i] = turnaroundTime[i] - burstTimes[i];
					}
					
					return { waitingTime, turnaroundTime };
				};
				
				// 页面替换算法（LRU）
				const lruPageReplacement = (pages, frameSize = 4) => {
					const frames = [];
					const lastUsed = {};
					let pageFaults = 0;
					let currentTime = 0;
					
					for (let page of pages) {
						operations++;
						currentTime++;
						
						if (!frames.includes(page)) {
							pageFaults++;
							
							if (frames.length < frameSize) {
								frames.push(page);
							} else {
								// 找到最久未使用的页面
								let lruIndex = 0;
								let lruTime = lastUsed[frames[0]] || 0;
								
								for (let i = 1; i < frames.length; i++) {
									const time = lastUsed[frames[i]] || 0;
									if (time < lruTime) {
										lruTime = time;
										lruIndex = i;
									}
								}
								
								frames[lruIndex] = page;
							}
						}
						
						lastUsed[page] = currentTime;
					}
					
					return { pageFaults, hitRate: (pages.length - pageFaults) / pages.length };
				};
				
				// 执行测试
				for (let i = 0; i < 12; i++) {
					// 生产者-消费者测试
					producerConsumer(8, 2, 3, 50);
					
					// 哲学家就餐测试
					diningPhilosophers(5, 30);
					
					// 读写者测试
					readersWriters(4, 2, 60);
					
					// 银行家算法测试
					const allocation = [[0, 1, 0], [2, 0, 0], [3, 0, 2], [2, 1, 1], [0, 0, 2]];
					const max = [[7, 5, 3], [3, 2, 2], [9, 0, 2], [2, 2, 2], [4, 3, 3]];
					const available = [3, 3, 2];
					bankersAlgorithm(5, 3, allocation, max, available);
					
					// 轮转调度测试
					const processes = [0, 1, 2, 3, 4];
					const burstTimes = [10, 5, 8, 6, 3];
					roundRobinScheduling(processes, burstTimes, 2);
					
					// LRU页面替换测试
					const pageSequence = Array.from({length: 20}, () => Math.floor(Math.random() * 8) + 1);
					lruPageReplacement(pageSequence, 3);
				}
				
				const time = Date.now() - startTime;
				const safeTime = Math.max(time, 0.001);
				return { score: Math.round(operations / safeTime), operations };
			},
			
			// GPU测试 - Canvas绘制
			async testGPU() {
				this.statusText = 'GPU测试：绘制复杂图形...';
				
				return new Promise((resolve) => {
					const ctx = uni.createCanvasContext('gpuCanvas', this);
					const startTime = Date.now();
					let frames = 0;
					let operations = 0;
					const duration = 3000;
					
					const draw = () => {
						if (Date.now() - startTime > duration) {
							const actualTime = (Date.now() - startTime) / 1000;
							const fps = frames / actualTime;
							const opsPerSecond = operations / actualTime;
							
							// 综合评分：基于帧率和操作数
							let score = Math.round((fps * 20) + (opsPerSecond / 100));
							
							// 分数区间调整：500-5000分为合理范围
							score = Math.max(500, Math.min(score, 5000));
							
							resolve(score);
							return;
						}
						
						// 清空画布
						ctx.clearRect(0, 0, 300, 200);
						
						// 绘制更复杂的图形组合
						const elementsPerFrame = 30 + Math.floor(Math.random() * 20);
						
						for (let i = 0; i < elementsPerFrame; i++) {
							// 随机选择绘制类型
							const drawType = Math.floor(Math.random() * 4);
							
							switch (drawType) {
								case 0: // 圆形
									ctx.beginPath();
									ctx.arc(
										Math.random() * 300,
										Math.random() * 200,
										Math.random() * 15 + 3,
										0,
										2 * Math.PI
									);
									ctx.fillStyle = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
									ctx.fill();
									break;
									
								case 1: // 矩形
									ctx.fillStyle = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
									ctx.fillRect(
										Math.random() * 280,
										Math.random() * 180,
										Math.random() * 20 + 5,
										Math.random() * 20 + 5
									);
									break;
									
								case 2: // 线条
									ctx.beginPath();
									ctx.moveTo(Math.random() * 300, Math.random() * 200);
									ctx.lineTo(Math.random() * 300, Math.random() * 200);
									ctx.strokeStyle = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
									ctx.lineWidth = Math.random() * 3 + 1;
									ctx.stroke();
									break;
									
								case 3: // 路径
									ctx.beginPath();
									const centerX = Math.random() * 300;
									const centerY = Math.random() * 200;
									const radius = Math.random() * 20 + 5;
									const sides = Math.floor(Math.random() * 6) + 3;
									
									for (let j = 0; j < sides; j++) {
										const angle = (j / sides) * 2 * Math.PI;
										const x = centerX + Math.cos(angle) * radius;
										const y = centerY + Math.sin(angle) * radius;
										if (j === 0) {
											ctx.moveTo(x, y);
										} else {
											ctx.lineTo(x, y);
										}
									}
									ctx.closePath();
									ctx.fillStyle = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
									ctx.fill();
									break;
							}
							operations++;
						}
						
						ctx.draw();
						frames++;
						
						// 使用setTimeout模拟requestAnimationFrame
						setTimeout(draw, 3);
						// requestAnimationFrame(draw);
						// cancelAnimationFrame(draw);
					};
					
					draw();
				});
			},
			
			// 内存测试 - 大数组操作
			async testMemory() {
				this.statusText = '内存测试：大数组读写操作...';
				
				return new Promise((resolve) => {
					setTimeout(() => {
						const startTime = Date.now();
						let totalOperations = 0;
						let memoryEfficiency = 0;
						
						try {
							// 第一轮：基础数组操作测试
							const arraySize1 = 50000;
							const testArray1 = new Array(arraySize1);
							
							// 写入测试 - 复杂对象
							for (let i = 0; i < arraySize1; i++) {
								testArray1[i] = {
									id: i,
									value: Math.random() * 1000,
									nested: {
										data: Math.random().toString(36),
										timestamp: Date.now() + i
									}
								};
								totalOperations++;
							}
							
							// 第二轮：多维数组操作
							const matrix = [];
							const matrixSize = 200;
							for (let i = 0; i < matrixSize; i++) {
								matrix[i] = [];
								for (let j = 0; j < matrixSize; j++) {
									matrix[i][j] = Math.random() * 100;
									totalOperations++;
								}
							}
							
							// 矩阵转置操作（内存密集）
							for (let i = 0; i < matrixSize; i++) {
								for (let j = 0; j < i; j++) {
									const temp = matrix[i][j];
									matrix[i][j] = matrix[j][i];
									matrix[j][i] = temp;
									totalOperations++;
								}
							}
							
							// 第三轮：排序和查找测试
							const sortArray = testArray1.map(item => item.value);
							const sortStartTime = Date.now();
							sortArray.sort((a, b) => a - b);
							const sortTime = Date.now() - sortStartTime;
							
							// 计算排序效率分数
							const sortEfficiency = arraySize1 / sortTime;
							memoryEfficiency += sortEfficiency;
							
							// 第四轮：随机访问测试
							let randomAccessSum = 0;
							for (let i = 0; i < 5000; i++) {
								const randomIndex = Math.floor(Math.random() * arraySize1);
								randomAccessSum += testArray1[randomIndex].value;
								totalOperations++;
							}
							
							// 第五轮：内存垃圾回收测试
							const tempArrays = [];
							for (let i = 0; i < 100; i++) {
								tempArrays.push(new Array(1000).fill(Math.random()));
								totalOperations += 1000;
							}
							
							const totalTime = Date.now() - startTime;
							
							// 综合评分算法
							const throughput = totalOperations / totalTime; // 吞吐量
							const memoryScore = memoryEfficiency / 1000; // 内存效率
							
							// 基准分数计算
							let score = Math.round((throughput * 50) + (memoryScore * 100));
							
							score = Math.max(1, parseInt(score / 100));
							
							resolve(score);
							
						} catch (e) {
							console.error('内存测试出错:', e);
							resolve(1); // 如果内存不足，给个基础分
						}
					}, 100);
				});
			},
			
			// 存储测试 - 本地存储读写
			async testStorage() {
				this.statusText = '存储测试：本地存储读写...';
				
				return new Promise((resolve) => {
					setTimeout(() => {
						const startTime = Date.now();
						const testKey = 'storage_test_';
						let totalOperations = 0;
						let writeTime = 0;
						let readTime = 0;
						
						try {
							// 第一轮：小数据写入测试
							const smallWriteStart = Date.now();
							for (let i = 0; i < 50; i++) {
								const smallData = {
									id: i,
									value: Math.random(),
									text: Math.random().toString(36).substring(7)
								};
								uni.setStorageSync(testKey + 'small_' + i, JSON.stringify(smallData));
								totalOperations++;
							}
							const smallWriteTime = Date.now() - smallWriteStart;
							
							// 第二轮：大数据写入测试
							const largeWriteStart = Date.now();
							for (let i = 0; i < 20; i++) {
								const largeData = {
									id: i,
									bigArray: new Array(500).fill().map(() => Math.random()),
									bigString: new Array(200).fill().map(() => Math.random().toString(36)).join(''),
									metadata: {
										created: Date.now(),
										type: 'large_test',
										version: Math.floor(Math.random() * 100)
									}
								};
								uni.setStorageSync(testKey + 'large_' + i, JSON.stringify(largeData));
								totalOperations++;
							}
							const largeWriteTime = Date.now() - largeWriteStart;
							writeTime = smallWriteTime + largeWriteTime;
							
							// 第三轮：随机读取测试
							const readStart = Date.now();
							for (let i = 0; i < 30; i++) {
								// 随机读取小数据
								const smallIndex = Math.floor(Math.random() * 50);
								const smallData = uni.getStorageSync(testKey + 'small_' + smallIndex);
								if (smallData) {
									JSON.parse(smallData);
									totalOperations++;
								}
								
								// 随机读取大数据
								const largeIndex = Math.floor(Math.random() * 20);
								const largeData = uni.getStorageSync(testKey + 'large_' + largeIndex);
								if (largeData) {
									JSON.parse(largeData);
									totalOperations++;
								}
							}
							readTime = Date.now() - readStart;
							
							// 第四轮：批量删除测试
							const deleteStart = Date.now();
							for (let i = 0; i < 50; i++) {
								uni.removeStorageSync(testKey + 'small_' + i);
								totalOperations++;
							}
							for (let i = 0; i < 20; i++) {
								uni.removeStorageSync(testKey + 'large_' + i);
								totalOperations++;
							}
							const deleteTime = Date.now() - deleteStart;
							
							const totalTime = Date.now() - startTime;
							
							// 综合评分算法
							const throughput = totalOperations / totalTime; // 总吞吐量
							const writeEfficiency = 70 / writeTime; // 写入效率
							const readEfficiency = 60 / readTime; // 读取效率
							const deleteEfficiency = 70 / deleteTime; // 删除效率
							
							// 基准分数计算
							let score = Math.round(
								(throughput * 200) + 
								(writeEfficiency * 100) + 
								(readEfficiency * 150) + 
								(deleteEfficiency * 50)
							);
							
							// 分数区间调整：400-4000分为合理范围
							score = Math.max(400, Math.min(score, 4000));
							
							resolve(score);
							
						} catch (e) {
							console.error('存储测试出错:', e);
							// 清理可能残留的测试数据
							try {
								for (let i = 0; i < 50; i++) {
									uni.removeStorageSync(testKey + 'small_' + i);
								}
								for (let i = 0; i < 20; i++) {
									uni.removeStorageSync(testKey + 'large_' + i);
								}
							} catch (cleanupError) {
								console.error('清理测试数据失败:', cleanupError);
							}
							resolve(400); // 如果存储操作失败，给个基础分
						}
					}, 100);
				});
			},
			
			delay(ms) {
				return new Promise(resolve => setTimeout(resolve, ms));
			},
			
			completeAllTests() {
				this.testing = false;
				this.statusText = '测试完成！';
				this.totalProgress = 100;
				
				if (this.elapsedTimer) {
					clearInterval(this.elapsedTimer);
				}
				
				// 计算总分
				const totalScore = this.testResults.reduce((sum, score) => sum + score, 0);
				
				// 保存测试结果
				const testResult = {
					timestamp: Date.now(),
					cpuScore: this.testResults[0],
					gpuScore: this.testResults[1],
					memoryScore: this.testResults[2],
					storageScore: this.testResults[3],
					totalScore: totalScore,
					duration: this.elapsedTime
				};
				
				// 保存到历史记录
				const history = uni.getStorageSync('test_history') || [];
				history.push(testResult);
				uni.setStorageSync('test_history', history);
				
				// 延迟跳转到结果页
				setTimeout(() => {
					uni.redirectTo({
						url: `/pages/result/result?result=${encodeURIComponent(JSON.stringify(testResult))}`
					});
				}, 2000);
			}
		}
	}
</script>

<style>
	.testing-container {
		min-height: 100vh;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		padding: 40rpx 30rpx;
	}

	.progress-section {
		background: rgba(255, 255, 255, 0.9);
		border-radius: 20rpx;
		padding: 30rpx;
		margin-bottom: 30rpx;
		text-align: center;
	}

	.progress-title {
		font-size: 32rpx;
		font-weight: bold;
		color: #2C3E50;
		margin-bottom: 20rpx;
	}

	.progress-bar {
		width: 100%;
		height: 20rpx;
		background: #ECF0F1;
		border-radius: 10rpx;
		overflow: hidden;
		margin-bottom: 15rpx;
	}

	.progress-fill {
		height: 100%;
		background: linear-gradient(45deg, #FF6B6B, #FF8E53);
		border-radius: 10rpx;
		transition: width 0.3s ease;
	}

	.progress-text {
		font-size: 28rpx;
		color: #7F8C8D;
		font-weight: 500;
	}

	.current-test {
		background: rgba(255, 255, 255, 0.9);
		border-radius: 20rpx;
		padding: 30rpx;
		margin-bottom: 30rpx;
		display: flex;
		align-items: center;
	}

	.test-icon {
		width: 80rpx;
		height: 80rpx;
		border-radius: 40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 20rpx;
	}

	.icon-text {
		font-size: 36rpx;
	}

	.test-info {
		flex: 1;
	}

	.test-name {
		display: block;
		font-size: 32rpx;
		font-weight: bold;
		color: #2C3E50;
		margin-bottom: 5rpx;
	}

	.test-description {
		font-size: 24rpx;
		color: #7F8C8D;
	}

	.animation-area {
		text-align: center;
		margin-bottom: 30rpx;
		padding: 40rpx 0;
	}

	.pulse-circle {
		width: 120rpx;
		height: 120rpx;
		border-radius: 60rpx;
		background: rgba(255, 255, 255, 0.3);
		margin: 0 auto 20rpx;
		transition: all 0.3s ease;
	}

	.pulse-circle.active {
		animation: pulse 2s infinite;
	}

	@keyframes pulse {
		0% {
			transform: scale(1);
			background: rgba(255, 255, 255, 0.3);
		}
		50% {
			transform: scale(1.1);
			background: rgba(255, 255, 255, 0.6);
		}
		100% {
			transform: scale(1);
			background: rgba(255, 255, 255, 0.3);
		}
	}

	.status-text {
		font-size: 28rpx;
		color: white;
		font-weight: 500;
	}

	.realtime-data {
		background: rgba(255, 255, 255, 0.9);
		border-radius: 20rpx;
		padding: 30rpx;
		margin-bottom: 30rpx;
		display: flex;
		justify-content: space-around;
	}

	.data-item {
		text-align: center;
	}

	.data-label {
		display: block;
		font-size: 24rpx;
		color: #7F8C8D;
		margin-bottom: 5rpx;
	}

	.data-value {
		font-size: 36rpx;
		font-weight: bold;
		color: #2C3E50;
	}

	.gpu-canvas {
		width: 300rpx;
		height: 200rpx;
		background: rgba(255, 255, 255, 0.9);
		border-radius: 15rpx;
		margin: 0 auto 30rpx;
		display: block;
	}

	.test-results {
		background: rgba(255, 255, 255, 0.9);
		border-radius: 20rpx;
		padding: 30rpx;
	}

	.result-item {
		display: flex;
		align-items: center;
		padding: 20rpx 0;
		border-bottom: 1rpx solid #ECF0F1;
	}

	.result-item:last-child {
		border-bottom: none;
	}

	.result-icon {
		width: 60rpx;
		height: 60rpx;
		border-radius: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 20rpx;
	}

	.result-icon-text {
		font-size: 24rpx;
	}

	.result-info {
		flex: 1;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.result-name {
		font-size: 28rpx;
		color: #2C3E50;
		font-weight: 500;
	}

	.result-score {
		font-size: 28rpx;
		color: #FF6B6B;
		font-weight: bold;
	}
</style> 