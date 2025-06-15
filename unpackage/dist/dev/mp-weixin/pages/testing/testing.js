"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      testing: false,
      currentTestIndex: 0,
      totalProgress: 0,
      currentScore: 0,
      elapsedTime: 0,
      startTime: 0,
      statusText: "准备开始测试",
      testResults: [0, 0, 0, 0],
      // CPU, GPU, 内存, 存储
      testItems: [
        {
          id: 1,
          name: "CPU",
          icon: "⚡",
          color: "#FF6B6B",
          description: "测试复杂算法运算能力"
        },
        {
          id: 2,
          name: "GPU",
          icon: "🎮",
          color: "#4ECDC4",
          description: "测试图形处理能力"
        },
        {
          id: 3,
          name: "内存",
          icon: "💾",
          color: "#45B7D1",
          description: "测试内存读写速度"
        },
        {
          id: 4,
          name: "存储",
          icon: "💿",
          color: "#96CEB4",
          description: "测试存储读写性能"
        }
      ],
      timer: null,
      elapsedTimer: null
    };
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
    if (this.timer)
      clearTimeout(this.timer);
    if (this.elapsedTimer)
      clearInterval(this.elapsedTimer);
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
        this.elapsedTime = Math.round((Date.now() - this.startTime) / 1e3);
      }, 1e3);
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
      this.totalProgress = (this.currentTestIndex + 1) / this.testItems.length * 100;
      await this.delay(1e3);
      this.currentTestIndex++;
      this.runNextTest();
    },
    // CPU测试 - 超复杂算法综合测试
    async testCPU() {
      return new Promise((resolve) => {
        const startTime = Date.now();
        let totalOperations = 0;
        let algorithmScores = [];
        const duration = 1e3;
        const calculate = () => {
          const endTime = startTime + duration;
          while (Date.now() < endTime) {
            const mathScore = this.ultraMathOperations();
            algorithmScores.push(mathScore.score);
            totalOperations += mathScore.operations;
            const recursionScore = this.deepRecursiveAlgorithms();
            algorithmScores.push(recursionScore.score);
            totalOperations += recursionScore.operations;
            const sortScore = this.advancedSortingAlgorithms();
            algorithmScores.push(sortScore.score);
            totalOperations += sortScore.operations;
            const stringScore = this.complexStringProcessing();
            algorithmScores.push(stringScore.score);
            totalOperations += stringScore.operations;
            const matrixScore = this.heavyMatrixOperations();
            algorithmScores.push(matrixScore.score);
            totalOperations += matrixScore.operations;
            const numericScore = this.intensiveNumericComputation();
            algorithmScores.push(numericScore.score);
            totalOperations += numericScore.operations;
            const graphScore = this.graphAlgorithms();
            algorithmScores.push(graphScore.score);
            totalOperations += graphScore.operations;
            const concurrentScore = this.concurrentSimulation();
            algorithmScores.push(concurrentScore.score);
            totalOperations += concurrentScore.operations;
          }
          const actualTime = Date.now() - startTime;
          const validScores = algorithmScores.filter((score2) => !isNaN(score2) && isFinite(score2));
          if (validScores.length === 0) {
            resolve(1);
            return;
          }
          const throughput = totalOperations / actualTime;
          const avgAlgorithmScore = validScores.reduce((a, b) => a + b, 0) / validScores.length;
          const maxScore = Math.max(...validScores);
          const minScore = Math.min(...validScores);
          const stabilityBonus = maxScore > minScore ? 1 - (maxScore - minScore) / avgAlgorithmScore : 1;
          let score = Math.round(
            throughput * 600 + avgAlgorithmScore * 3 + stabilityBonus * 800
          );
          score = Math.max(1, parseInt(score / 1e3));
          resolve(score);
        };
        setTimeout(calculate, 100);
      });
    },
    // 超强化数学运算
    ultraMathOperations() {
      let operations = 0;
      const startTime = Date.now();
      for (let i = 0; i < 80; i++) {
        for (let iter = 0; iter < 5; iter++) {
          operations++;
        }
        const n = 50;
        for (let j = 0; j <= n; j++) {
          operations++;
        }
        const x_taylor = Math.random() * 2;
        for (let n2 = 0; n2 < 10; n2++) {
          Math.pow(-1, n2) * Math.pow(x_taylor, 2 * n2 + 1) / this.factorial(2 * n2 + 1);
          operations++;
        }
        operations += 15;
      }
      const time = Date.now() - startTime;
      const safeTime = Math.max(time, 1e-3);
      return { score: Math.round(operations / safeTime), operations };
    },
    // 计算阶乘的辅助函数
    factorial(n) {
      if (n <= 1)
        return 1;
      let result = 1;
      for (let i = 2; i <= Math.min(n, 20); i++) {
        result *= i;
      }
      return result;
    },
    // 深度递归算法测试
    deepRecursiveAlgorithms() {
      let operations = 0;
      const startTime = Date.now();
      const tribonacci = (n, memo = {}) => {
        if (n in memo)
          return memo[n];
        if (n <= 0)
          return 0;
        if (n === 1 || n === 2)
          return 1;
        if (n === 3)
          return 2;
        memo[n] = tribonacci(n - 1, memo) + tribonacci(n - 2, memo) + tribonacci(n - 3, memo);
        operations++;
        return memo[n];
      };
      const fastPower = (base, exp, mod = 1000000007) => {
        operations++;
        if (exp === 0)
          return 1;
        if (exp === 1)
          return base % mod;
        if (exp % 2 === 0) {
          const half = fastPower(base, Math.floor(exp / 2), mod);
          return half * half % mod;
        } else {
          return base * fastPower(base, exp - 1, mod) % mod;
        }
      };
      const maxSubarraySum = (arr, left, right) => {
        operations++;
        if (left === right)
          return arr[left];
        const mid = Math.floor((left + right) / 2);
        const leftSum = maxSubarraySum(arr, left, mid);
        const rightSum = maxSubarraySum(arr, mid + 1, right);
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
      const nQueens = (n, board = [], row = 0) => {
        operations++;
        if (row === n)
          return 1;
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
      const combination = (n, k, memo = {}) => {
        const key = `${n},${k}`;
        if (key in memo)
          return memo[key];
        operations++;
        if (k === 0 || k === n)
          return 1;
        if (k > n)
          return 0;
        memo[key] = combination(n - 1, k - 1, memo) + combination(n - 1, k, memo);
        return memo[key];
      };
      for (let i = 0; i < 15; i++) {
        tribonacci(Math.floor(Math.random() * 15) + 8);
        const base = Math.floor(Math.random() * 10) + 2;
        const exp = Math.floor(Math.random() * 20) + 5;
        fastPower(base, exp);
        const testArray = Array.from({ length: 20 }, () => Math.floor(Math.random() * 200) - 100);
        maxSubarraySum(testArray, 0, testArray.length - 1);
        const queensN = Math.floor(Math.random() * 3) + 4;
        nQueens(queensN);
        const permArray = Array.from({ length: 5 }, (_, i2) => i2 + 1);
        permutations(permArray);
        const n = Math.floor(Math.random() * 10) + 8;
        const k = Math.floor(Math.random() * 5) + 2;
        combination(n, k);
      }
      const time = Date.now() - startTime;
      const safeTime = Math.max(time, 1e-3);
      return { score: Math.round(operations / safeTime), operations };
    },
    // N皇后安全检查辅助函数
    isSafeQueen(board, row, col) {
      for (let i = 0; i < row; i++) {
        if (board[i] === col || board[i] - i === col - row || board[i] + i === col + row) {
          return false;
        }
      }
      return true;
    },
    // 高级排序算法测试
    advancedSortingAlgorithms() {
      let operations = 0;
      const startTime = Date.now();
      const quickSort3Way = (arr, low = 0, high = arr.length - 1) => {
        if (low >= high)
          return;
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
      const introSort = (arr, maxDepth = Math.floor(Math.log2(arr.length)) * 2) => {
        const introSortUtil = (arr2, low, high, maxDepth2) => {
          operations++;
          if (high - low < 16) {
            insertionSort(arr2, low, high);
          } else if (maxDepth2 === 0) {
            heapSortRange(arr2, low, high);
          } else {
            const pi = partition(arr2, low, high);
            introSortUtil(arr2, low, pi - 1, maxDepth2 - 1);
            introSortUtil(arr2, pi + 1, high, maxDepth2 - 1);
          }
        };
        introSortUtil(arr, 0, arr.length - 1, maxDepth);
      };
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
      const heapSortRange = (arr, low, high) => {
        const heapify = (arr2, n2, i, offset) => {
          operations++;
          let largest = i;
          const left = 2 * i + 1;
          const right = 2 * i + 2;
          if (left < n2 && arr2[offset + left] > arr2[offset + largest]) {
            largest = left;
          }
          if (right < n2 && arr2[offset + right] > arr2[offset + largest]) {
            largest = right;
          }
          if (largest !== i) {
            [arr2[offset + i], arr2[offset + largest]] = [arr2[offset + largest], arr2[offset + i]];
            heapify(arr2, n2, largest, offset);
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
      const countingSort = (arr, max = 1e3) => {
        const count = new Array(max + 1).fill(0);
        const output = new Array(arr.length);
        for (let i = 0; i < arr.length; i++) {
          operations++;
          count[arr[i]]++;
        }
        for (let i = 1; i <= max; i++) {
          operations++;
          count[i] += count[i - 1];
        }
        for (let i = arr.length - 1; i >= 0; i--) {
          operations++;
          output[count[arr[i]] - 1] = arr[i];
          count[arr[i]]--;
        }
        return output;
      };
      const radixSort = (arr) => {
        const getMax = (arr2) => {
          let max2 = arr2[0];
          for (let i = 1; i < arr2.length; i++) {
            operations++;
            if (arr2[i] > max2)
              max2 = arr2[i];
          }
          return max2;
        };
        const countingSortByDigit = (arr2, exp) => {
          const output = new Array(arr2.length);
          const count = new Array(10).fill(0);
          for (let i = 0; i < arr2.length; i++) {
            operations++;
            count[Math.floor(arr2[i] / exp) % 10]++;
          }
          for (let i = 1; i < 10; i++) {
            count[i] += count[i - 1];
          }
          for (let i = arr2.length - 1; i >= 0; i--) {
            operations++;
            const digit = Math.floor(arr2[i] / exp) % 10;
            output[count[digit] - 1] = arr2[i];
            count[digit]--;
          }
          for (let i = 0; i < arr2.length; i++) {
            arr2[i] = output[i];
          }
        };
        const max = getMax(arr);
        for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
          countingSortByDigit(arr, exp);
        }
      };
      const bucketSort = (arr, bucketCount = 10) => {
        if (arr.length <= 1)
          return arr;
        const max = Math.max(...arr);
        const min = Math.min(...arr);
        const bucketSize = Math.floor((max - min) / bucketCount) + 1;
        const buckets = Array.from({ length: bucketCount }, () => []);
        for (let i = 0; i < arr.length; i++) {
          operations++;
          const bucketIndex = Math.floor((arr[i] - min) / bucketSize);
          const safeBucketIndex = Math.min(bucketIndex, bucketCount - 1);
          buckets[safeBucketIndex].push(arr[i]);
        }
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
      for (let i = 0; i < 8; i++) {
        const randomArray = Array.from({ length: 150 }, () => Math.floor(Math.random() * 1e3));
        const duplicateArray = Array.from({ length: 150 }, () => Math.floor(Math.random() * 50));
        const smallRangeArray = Array.from({ length: 150 }, () => Math.floor(Math.random() * 100));
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
      const safeTime = Math.max(time, 1e-3);
      return { score: Math.round(operations / safeTime), operations };
    },
    // 复杂字符串算法
    complexStringProcessing() {
      let operations = 0;
      const startTime = Date.now();
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
      const manacher = (s) => {
        let processedStr = "#";
        for (let char of s) {
          processedStr += char + "#";
        }
        const n = processedStr.length;
        const p = new Array(n).fill(0);
        let center = 0, right = 0;
        for (let i = 0; i < n; i++) {
          operations++;
          if (i < right) {
            p[i] = Math.min(right - i, p[2 * center - i]);
          }
          while (i - p[i] - 1 >= 0 && i + p[i] + 1 < n && processedStr[i - p[i] - 1] === processedStr[i + p[i] + 1]) {
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
        return suffixes.map((item) => item.index);
      };
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
          for (let i = 0; i < m - 1; i++) {
            h = h * base % prime;
          }
          for (let i = 0; i < m; i++) {
            operations++;
            patternHash = (base * patternHash + pattern.charCodeAt(i)) % prime;
            textHash = (base * textHash + text.charCodeAt(i)) % prime;
          }
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
              if (match)
                results.push({ pattern, position: i });
            }
            if (i < n - m) {
              textHash = (base * (textHash - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % prime;
              if (textHash < 0)
                textHash += prime;
            }
          }
        }
        return results;
      };
      const editDistance = (str1, str2) => {
        const m = str1.length;
        const n = str2.length;
        const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
        for (let i = 0; i <= m; i++)
          dp[i][0] = i;
        for (let j = 0; j <= n; j++)
          dp[0][j] = j;
        for (let i = 1; i <= m; i++) {
          for (let j = 1; j <= n; j++) {
            operations++;
            if (str1[i - 1] === str2[j - 1]) {
              dp[i][j] = dp[i - 1][j - 1];
            } else {
              dp[i][j] = 1 + Math.min(
                dp[i - 1][j],
                // 删除
                dp[i][j - 1],
                // 插入
                dp[i - 1][j - 1]
                // 替换
              );
            }
          }
        }
        return dp[m][n];
      };
      const ahoCorasick = (text, patterns) => {
        const trie = { children: {}, isEnd: false, pattern: "", failure: null };
        for (let pattern of patterns) {
          operations++;
          let node2 = trie;
          for (let char of pattern) {
            if (!node2.children[char]) {
              node2.children[char] = { children: {}, isEnd: false, pattern: "", failure: null };
            }
            node2 = node2.children[char];
          }
          node2.isEnd = true;
          node2.pattern = pattern;
        }
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
      for (let i = 0; i < 12; i++) {
        const text = Array.from({ length: 100 }, () => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join("");
        const pattern = Array.from({ length: 8 }, () => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join("");
        zAlgorithm(text);
        manacher(text.substring(0, 50));
        buildSuffixArray(text.substring(0, 30));
        const patterns = [pattern, pattern.substring(0, 5), pattern.substring(2)];
        rabinKarp(text, patterns);
        const str1 = text.substring(0, 20);
        const str2 = text.substring(10, 30);
        editDistance(str1, str2);
        ahoCorasick(text, patterns);
      }
      const time = Date.now() - startTime;
      const safeTime = Math.max(time, 1e-3);
      return { score: Math.round(operations / safeTime), operations };
    },
    // 高维矩阵运算
    heavyMatrixOperations() {
      let operations = 0;
      const startTime = Date.now();
      const strassenMultiply = (a, b, n = a.length) => {
        if (n <= 2) {
          const result2 = Array(n).fill().map(() => Array(n).fill(0));
          for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
              for (let k = 0; k < n; k++) {
                operations++;
                result2[i][j] += a[i][k] * b[k][j];
              }
            }
          }
          return result2;
        }
        const half = Math.floor(n / 2);
        const a11 = [], a12 = [], a21 = [], a22 = [];
        const b11 = [], b12 = [], b21 = [], b22 = [];
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
        const m1 = strassenMultiply(this.matrixAdd(a11, a22), this.matrixAdd(b11, b22), half);
        const m2 = strassenMultiply(this.matrixAdd(a21, a22), b11, half);
        const m3 = strassenMultiply(a11, this.matrixSubtract(b12, b22), half);
        const m4 = strassenMultiply(a22, this.matrixSubtract(b21, b11), half);
        const m5 = strassenMultiply(this.matrixAdd(a11, a12), b22, half);
        const m6 = strassenMultiply(this.matrixSubtract(a21, a11), this.matrixAdd(b11, b12), half);
        const m7 = strassenMultiply(this.matrixSubtract(a12, a22), this.matrixAdd(b21, b22), half);
        const c11 = this.matrixSubtract(this.matrixAdd(this.matrixAdd(m1, m4), m7), m5);
        const c12 = this.matrixAdd(m3, m5);
        const c21 = this.matrixAdd(m2, m4);
        const c22 = this.matrixSubtract(this.matrixSubtract(this.matrixAdd(m1, m3), m2), m6);
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
      const luDecomposition = (matrix) => {
        const n = matrix.length;
        const L = Array(n).fill().map(() => Array(n).fill(0));
        const U = Array(n).fill().map(() => Array(n).fill(0));
        for (let i = 0; i < n; i++) {
          operations++;
          for (let k = i; k < n; k++) {
            operations++;
            let sum = 0;
            for (let j = 0; j < i; j++) {
              sum += L[i][j] * U[j][k];
            }
            U[i][k] = matrix[i][k] - sum;
          }
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
      const qrDecomposition = (matrix) => {
        const m = matrix.length;
        const n = matrix[0].length;
        const Q = Array(m).fill().map(() => Array(n).fill(0));
        const R = Array(n).fill().map(() => Array(n).fill(0));
        for (let j = 0; j < n; j++) {
          operations++;
          let v = [];
          for (let i = 0; i < m; i++) {
            v[i] = matrix[i][j];
          }
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
      const powerMethod = (matrix, iterations = 20) => {
        const n = matrix.length;
        let v = Array(n).fill().map(() => Math.random());
        for (let iter = 0; iter < iterations; iter++) {
          operations++;
          const newV = Array(n).fill(0);
          for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
              operations++;
              newV[i] += matrix[i][j] * v[j];
            }
          }
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
      const matrixInverse = (matrix) => {
        const n = matrix.length;
        const augmented = Array(n).fill().map(
          (_, i) => [...matrix[i], ...Array(n).fill(0).map((_2, j) => i === j ? 1 : 0)]
        );
        for (let i = 0; i < n; i++) {
          operations++;
          let maxRow = i;
          for (let k = i + 1; k < n; k++) {
            if (Math.abs(augmented[k][i]) > Math.abs(augmented[maxRow][i])) {
              maxRow = k;
            }
          }
          if (maxRow !== i) {
            [augmented[i], augmented[maxRow]] = [augmented[maxRow], augmented[i]];
          }
          if (Math.abs(augmented[i][i]) < 1e-10) {
            return null;
          }
          for (let k = 0; k < n; k++) {
            if (k !== i) {
              operations++;
              const factor = augmented[k][i] / augmented[i][i];
              for (let j = 0; j < 2 * n; j++) {
                augmented[k][j] -= factor * augmented[i][j];
              }
            }
          }
          const diagonal = augmented[i][i];
          for (let j = 0; j < 2 * n; j++) {
            augmented[i][j] /= diagonal;
          }
        }
        const inverse = Array(n).fill().map(
          (_, i) => augmented[i].slice(n)
        );
        return inverse;
      };
      for (let i = 0; i < 6; i++) {
        const size = 8;
        const matrix1 = Array(size).fill().map(
          () => Array(size).fill().map(() => Math.random() * 20 - 10)
        );
        const matrix2 = Array(size).fill().map(
          () => Array(size).fill().map(() => Math.random() * 20 - 10)
        );
        {
          strassenMultiply(matrix1, matrix2);
        }
        luDecomposition(matrix1);
        qrDecomposition(matrix1);
        const symmetricMatrix = Array(size).fill().map(
          (_, i2) => Array(size).fill().map(
            (_2, j) => i2 === j ? Math.random() * 10 + 1 : Math.random() * 2 - 1
          )
        );
        powerMethod(symmetricMatrix, 10);
        const smallMatrix = Array(4).fill().map(
          () => Array(4).fill().map(() => Math.random() * 10 - 5)
        );
        for (let j = 0; j < 4; j++) {
          smallMatrix[j][j] += 10;
        }
        matrixInverse(smallMatrix);
      }
      const time = Date.now() - startTime;
      const safeTime = Math.max(time, 1e-3);
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
      const monteCarloPi = (samples = 5e4) => {
        let insideCircle = 0;
        for (let i = 0; i < samples; i++) {
          operations++;
          const x = Math.random() * 2 - 1;
          const y = Math.random() * 2 - 1;
          if (x * x + y * y <= 1) {
            insideCircle++;
          }
        }
        return 4 * insideCircle / samples;
      };
      const numericalDerivative = (func, x, h = 1e-5) => {
        operations++;
        return (func(x + h) - func(x - h)) / (2 * h);
      };
      const rungeKutta4 = (f, x0, y0, h, n) => {
        let x = x0;
        let y = y0;
        for (let i = 0; i < n; i++) {
          operations++;
          const k1 = h * f(x, y);
          const k2 = h * f(x + h / 2, y + k1 / 2);
          const k3 = h * f(x + h / 2, y + k2 / 2);
          const k4 = h * f(x + h, y + k3);
          y = y + (k1 + 2 * k2 + 2 * k3 + k4) / 6;
          x = x + h;
        }
        return { x, y };
      };
      const newtonRaphson = (f, df, x0, tolerance = 1e-6, maxIterations = 50) => {
        let x = x0;
        for (let i = 0; i < maxIterations; i++) {
          operations++;
          const fx = f(x);
          const dfx = df(x);
          if (Math.abs(fx) < tolerance)
            break;
          if (Math.abs(dfx) < 1e-12)
            break;
          x = x - fx / dfx;
        }
        return x;
      };
      const fft = (signal) => {
        const n = signal.length;
        if (n <= 1)
          return signal;
        operations++;
        const even = [];
        const odd = [];
        for (let i = 0; i < n; i++) {
          if (i % 2 === 0) {
            even.push(signal[i]);
          } else {
            odd.push(signal[i]);
          }
        }
        const evenFFT = fft(even);
        const oddFFT = fft(odd);
        const result = new Array(n);
        const halfN = n / 2;
        for (let k = 0; k < halfN; k++) {
          operations++;
          const angle = -2 * Math.PI * k / n;
          const wk = { real: Math.cos(angle), imag: Math.sin(angle) };
          const wkOdd = {
            real: wk.real * oddFFT[k].real - wk.imag * oddFFT[k].imag,
            imag: wk.real * oddFFT[k].imag + wk.imag * oddFFT[k].real
          };
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
      const simpson38 = (f, a, b, n = 300) => {
        const h = (b - a) / n;
        let sum = f(a) + f(b);
        for (let i = 1; i < n; i++) {
          operations++;
          const x = a + i * h;
          const weight = i % 3 === 0 ? 2 : 3;
          sum += weight * f(x);
        }
        return 3 * h / 8 * sum;
      };
      const gaussianElimination = (A, b) => {
        const n = A.length;
        const augmented = A.map((row, i) => [...row, b[i]]);
        for (let i = 0; i < n; i++) {
          operations++;
          let maxRow = i;
          for (let k = i + 1; k < n; k++) {
            if (Math.abs(augmented[k][i]) > Math.abs(augmented[maxRow][i])) {
              maxRow = k;
            }
          }
          if (maxRow !== i) {
            [augmented[i], augmented[maxRow]] = [augmented[maxRow], augmented[i]];
          }
          for (let k = i + 1; k < n; k++) {
            operations++;
            if (Math.abs(augmented[i][i]) < 1e-10)
              continue;
            const factor = augmented[k][i] / augmented[i][i];
            for (let j = i; j <= n; j++) {
              augmented[k][j] -= factor * augmented[i][j];
            }
          }
        }
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
      for (let i = 0; i < 10; i++) {
        monteCarloPi(1e4);
        const testFunc = (x) => x * x * x + 2 * x * x + x + 1;
        numericalDerivative(testFunc, Math.random() * 10);
        const odeFunc = (x, y) => x + y;
        rungeKutta4(odeFunc, 0, 1, 0.1, 20);
        const f = (x) => x * x - 2;
        const df = (x) => 2 * x;
        newtonRaphson(f, df, 1.5);
        const signal = [];
        for (let j = 0; j < 16; j++) {
          signal.push({ real: Math.sin(2 * Math.PI * j / 16), imag: 0 });
        }
        fft(signal);
        const integrandFunc = (x) => x * x + Math.sin(x);
        simpson38(integrandFunc, 0, Math.PI, 100);
        const matrixA = Array(5).fill().map(
          () => Array(5).fill().map(() => Math.random() * 10 - 5)
        );
        const vectorB = Array(5).fill().map(() => Math.random() * 10 - 5);
        for (let j = 0; j < 5; j++) {
          matrixA[j][j] += 10;
        }
        gaussianElimination(matrixA, vectorB);
      }
      const time = Date.now() - startTime;
      const safeTime = Math.max(time, 1e-3);
      return { score: Math.round(operations / safeTime), operations };
    },
    // 图论算法
    graphAlgorithms() {
      let operations = 0;
      const startTime = Date.now();
      const dijkstra = (graph, start) => {
        const n = graph.length;
        const dist = new Array(n).fill(Infinity);
        const visited = new Array(n).fill(false);
        dist[start] = 0;
        for (let count = 0; count < n - 1; count++) {
          operations++;
          let u = -1;
          for (let v = 0; v < n; v++) {
            if (!visited[v] && (u === -1 || dist[v] < dist[u])) {
              u = v;
            }
          }
          visited[u] = true;
          for (let v = 0; v < n; v++) {
            operations++;
            if (!visited[v] && graph[u][v] > 0 && dist[u] !== Infinity && dist[u] + graph[u][v] < dist[v]) {
              dist[v] = dist[u] + graph[u][v];
            }
          }
        }
        return dist;
      };
      const floydWarshall = (graph) => {
        const n = graph.length;
        const dist = graph.map((row) => [...row]);
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
      const dfs = (graph, start, visited = /* @__PURE__ */ new Set()) => {
        operations++;
        visited.add(start);
        for (let neighbor = 0; neighbor < graph[start].length; neighbor++) {
          if (graph[start][neighbor] > 0 && !visited.has(neighbor)) {
            dfs(graph, neighbor, visited);
          }
        }
        return visited;
      };
      const bfs = (graph, start) => {
        const visited = /* @__PURE__ */ new Set();
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
      const kruskal = (edges, n) => {
        edges.sort((a, b) => a.weight - b.weight);
        const parent = Array.from({ length: n }, (_, i) => i);
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
          if (px === py)
            return false;
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
            if (mst.length === n - 1)
              break;
          }
        }
        return mst;
      };
      const topologicalSort = (graph) => {
        const n = graph.length;
        const inDegree = new Array(n).fill(0);
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
        return result.length === n ? result : null;
      };
      for (let i = 0; i < 8; i++) {
        const n = 10;
        const graph = Array(n).fill().map(() => Array(n).fill(0));
        const edges = [];
        for (let u = 0; u < n; u++) {
          for (let v = u + 1; v < n; v++) {
            if (Math.random() < 0.3) {
              const weight = Math.floor(Math.random() * 50) + 1;
              graph[u][v] = weight;
              graph[v][u] = weight;
              edges.push({ from: u, to: v, weight });
            }
          }
        }
        for (let u = 0; u < n - 1; u++) {
          if (graph[u][u + 1] === 0) {
            const weight = Math.floor(Math.random() * 10) + 1;
            graph[u][u + 1] = weight;
            graph[u + 1][u] = weight;
            edges.push({ from: u, to: u + 1, weight });
          }
        }
        dijkstra(graph, 0);
        floydWarshall(graph);
        dfs(graph, 0);
        bfs(graph, 0);
        kruskal(edges, n);
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
      const safeTime = Math.max(time, 1e-3);
      return { score: Math.round(operations / safeTime), operations };
    },
    // 并发模拟计算
    concurrentSimulation() {
      let operations = 0;
      const startTime = Date.now();
      const producerConsumer = (bufferSize = 10, producers = 3, consumers = 2, iterations = 100) => {
        let buffer = [];
        let produced = 0;
        let consumed = 0;
        for (let iter = 0; iter < iterations; iter++) {
          operations++;
          for (let p = 0; p < producers; p++) {
            if (buffer.length < bufferSize && Math.random() < 0.7) {
              buffer.push(produced++);
            }
          }
          for (let c = 0; c < consumers; c++) {
            if (buffer.length > 0 && Math.random() < 0.8) {
              buffer.shift();
              consumed++;
            }
          }
        }
        return { produced, consumed, bufferSize: buffer.length };
      };
      const diningPhilosophers = (numPhilosophers = 5, rounds = 50) => {
        const forks = new Array(numPhilosophers).fill(true);
        const philosophers = new Array(numPhilosophers).fill(0);
        for (let round = 0; round < rounds; round++) {
          operations++;
          for (let i = 0; i < numPhilosophers; i++) {
            const leftFork = i;
            const rightFork = (i + 1) % numPhilosophers;
            if (forks[leftFork] && forks[rightFork] && Math.random() < 0.3) {
              forks[leftFork] = false;
              forks[rightFork] = false;
              philosophers[i]++;
              setTimeout(() => {
                forks[leftFork] = true;
                forks[rightFork] = true;
              }, 0);
            }
          }
        }
        return philosophers;
      };
      const readersWriters = (readers = 5, writers = 2, iterations = 100) => {
        let readerCount = 0;
        let isWriting = false;
        let readOperations = 0;
        let writeOperations = 0;
        for (let iter = 0; iter < iterations; iter++) {
          operations++;
          for (let w = 0; w < writers; w++) {
            if (!isWriting && readerCount === 0 && Math.random() < 0.2) {
              isWriting = true;
              writeOperations++;
              setTimeout(() => {
                isWriting = false;
              }, 0);
              break;
            }
          }
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
      const bankersAlgorithm = (processes, resources, allocation, max, available) => {
        const n = processes;
        const m = resources;
        const need = allocation.map(
          (row, i) => row.map((cell, j) => max[i][j] - cell)
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
          if (!found)
            break;
        }
        return safeSequence.length === n ? safeSequence : null;
      };
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
              let lruIndex = 0;
              let lruTime = lastUsed[frames[0]] || 0;
              for (let i = 1; i < frames.length; i++) {
                const time2 = lastUsed[frames[i]] || 0;
                if (time2 < lruTime) {
                  lruTime = time2;
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
      for (let i = 0; i < 12; i++) {
        producerConsumer(8, 2, 3, 50);
        diningPhilosophers(5, 30);
        readersWriters(4, 2, 60);
        const allocation = [[0, 1, 0], [2, 0, 0], [3, 0, 2], [2, 1, 1], [0, 0, 2]];
        const max = [[7, 5, 3], [3, 2, 2], [9, 0, 2], [2, 2, 2], [4, 3, 3]];
        const available = [3, 3, 2];
        bankersAlgorithm(5, 3, allocation, max, available);
        const processes = [0, 1, 2, 3, 4];
        const burstTimes = [10, 5, 8, 6, 3];
        roundRobinScheduling(processes, burstTimes, 2);
        const pageSequence = Array.from({ length: 20 }, () => Math.floor(Math.random() * 8) + 1);
        lruPageReplacement(pageSequence, 3);
      }
      const time = Date.now() - startTime;
      const safeTime = Math.max(time, 1e-3);
      return { score: Math.round(operations / safeTime), operations };
    },
    // GPU测试 - Canvas绘制
    async testGPU() {
      this.statusText = "GPU测试：绘制复杂图形...";
      return new Promise((resolve) => {
        const ctx = common_vendor.index.createCanvasContext("gpuCanvas", this);
        const startTime = Date.now();
        let frames = 0;
        let operations = 0;
        const duration = 3e3;
        const draw = () => {
          if (Date.now() - startTime > duration) {
            const actualTime = (Date.now() - startTime) / 1e3;
            const fps = frames / actualTime;
            const opsPerSecond = operations / actualTime;
            let score = Math.round(fps * 20 + opsPerSecond / 100);
            score = Math.max(500, Math.min(score, 5e3));
            resolve(score);
            return;
          }
          ctx.clearRect(0, 0, 300, 200);
          const elementsPerFrame = 30 + Math.floor(Math.random() * 20);
          for (let i = 0; i < elementsPerFrame; i++) {
            const drawType = Math.floor(Math.random() * 4);
            switch (drawType) {
              case 0:
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
              case 1:
                ctx.fillStyle = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
                ctx.fillRect(
                  Math.random() * 280,
                  Math.random() * 180,
                  Math.random() * 20 + 5,
                  Math.random() * 20 + 5
                );
                break;
              case 2:
                ctx.beginPath();
                ctx.moveTo(Math.random() * 300, Math.random() * 200);
                ctx.lineTo(Math.random() * 300, Math.random() * 200);
                ctx.strokeStyle = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
                ctx.lineWidth = Math.random() * 3 + 1;
                ctx.stroke();
                break;
              case 3:
                ctx.beginPath();
                const centerX = Math.random() * 300;
                const centerY = Math.random() * 200;
                const radius = Math.random() * 20 + 5;
                const sides = Math.floor(Math.random() * 6) + 3;
                for (let j = 0; j < sides; j++) {
                  const angle = j / sides * 2 * Math.PI;
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
          setTimeout(draw, 3);
        };
        draw();
      });
    },
    // 内存测试 - 大数组操作
    async testMemory() {
      this.statusText = "内存测试：大数组读写操作...";
      return new Promise((resolve) => {
        setTimeout(() => {
          const startTime = Date.now();
          let totalOperations = 0;
          let memoryEfficiency = 0;
          try {
            const arraySize1 = 5e4;
            const testArray1 = new Array(arraySize1);
            for (let i = 0; i < arraySize1; i++) {
              testArray1[i] = {
                id: i,
                value: Math.random() * 1e3,
                nested: {
                  data: Math.random().toString(36),
                  timestamp: Date.now() + i
                }
              };
              totalOperations++;
            }
            const matrix = [];
            const matrixSize = 200;
            for (let i = 0; i < matrixSize; i++) {
              matrix[i] = [];
              for (let j = 0; j < matrixSize; j++) {
                matrix[i][j] = Math.random() * 100;
                totalOperations++;
              }
            }
            for (let i = 0; i < matrixSize; i++) {
              for (let j = 0; j < i; j++) {
                const temp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = temp;
                totalOperations++;
              }
            }
            const sortArray = testArray1.map((item) => item.value);
            const sortStartTime = Date.now();
            sortArray.sort((a, b) => a - b);
            const sortTime = Date.now() - sortStartTime;
            const sortEfficiency = arraySize1 / sortTime;
            memoryEfficiency += sortEfficiency;
            let randomAccessSum = 0;
            for (let i = 0; i < 5e3; i++) {
              const randomIndex = Math.floor(Math.random() * arraySize1);
              randomAccessSum += testArray1[randomIndex].value;
              totalOperations++;
            }
            const tempArrays = [];
            for (let i = 0; i < 100; i++) {
              tempArrays.push(new Array(1e3).fill(Math.random()));
              totalOperations += 1e3;
            }
            const totalTime = Date.now() - startTime;
            const throughput = totalOperations / totalTime;
            const memoryScore = memoryEfficiency / 1e3;
            let score = Math.round(throughput * 50 + memoryScore * 100);
            score = Math.max(1, parseInt(score / 100));
            resolve(score);
          } catch (e) {
            common_vendor.index.__f__("error", "at pages/testing/testing.vue:2215", "内存测试出错:", e);
            resolve(1);
          }
        }, 100);
      });
    },
    // 存储测试 - 本地存储读写
    async testStorage() {
      this.statusText = "存储测试：本地存储读写...";
      return new Promise((resolve) => {
        setTimeout(() => {
          const startTime = Date.now();
          const testKey = "storage_test_";
          let totalOperations = 0;
          let writeTime = 0;
          let readTime = 0;
          try {
            const smallWriteStart = Date.now();
            for (let i = 0; i < 50; i++) {
              const smallData = {
                id: i,
                value: Math.random(),
                text: Math.random().toString(36).substring(7)
              };
              common_vendor.index.setStorageSync(testKey + "small_" + i, JSON.stringify(smallData));
              totalOperations++;
            }
            const smallWriteTime = Date.now() - smallWriteStart;
            const largeWriteStart = Date.now();
            for (let i = 0; i < 20; i++) {
              const largeData = {
                id: i,
                bigArray: new Array(500).fill().map(() => Math.random()),
                bigString: new Array(200).fill().map(() => Math.random().toString(36)).join(""),
                metadata: {
                  created: Date.now(),
                  type: "large_test",
                  version: Math.floor(Math.random() * 100)
                }
              };
              common_vendor.index.setStorageSync(testKey + "large_" + i, JSON.stringify(largeData));
              totalOperations++;
            }
            const largeWriteTime = Date.now() - largeWriteStart;
            writeTime = smallWriteTime + largeWriteTime;
            const readStart = Date.now();
            for (let i = 0; i < 30; i++) {
              const smallIndex = Math.floor(Math.random() * 50);
              const smallData = common_vendor.index.getStorageSync(testKey + "small_" + smallIndex);
              if (smallData) {
                JSON.parse(smallData);
                totalOperations++;
              }
              const largeIndex = Math.floor(Math.random() * 20);
              const largeData = common_vendor.index.getStorageSync(testKey + "large_" + largeIndex);
              if (largeData) {
                JSON.parse(largeData);
                totalOperations++;
              }
            }
            readTime = Date.now() - readStart;
            const deleteStart = Date.now();
            for (let i = 0; i < 50; i++) {
              common_vendor.index.removeStorageSync(testKey + "small_" + i);
              totalOperations++;
            }
            for (let i = 0; i < 20; i++) {
              common_vendor.index.removeStorageSync(testKey + "large_" + i);
              totalOperations++;
            }
            const deleteTime = Date.now() - deleteStart;
            const totalTime = Date.now() - startTime;
            const throughput = totalOperations / totalTime;
            const writeEfficiency = 70 / writeTime;
            const readEfficiency = 60 / readTime;
            const deleteEfficiency = 70 / deleteTime;
            let score = Math.round(
              throughput * 200 + writeEfficiency * 100 + readEfficiency * 150 + deleteEfficiency * 50
            );
            score = Math.max(400, Math.min(score, 4e3));
            resolve(score);
          } catch (e) {
            common_vendor.index.__f__("error", "at pages/testing/testing.vue:2322", "存储测试出错:", e);
            try {
              for (let i = 0; i < 50; i++) {
                common_vendor.index.removeStorageSync(testKey + "small_" + i);
              }
              for (let i = 0; i < 20; i++) {
                common_vendor.index.removeStorageSync(testKey + "large_" + i);
              }
            } catch (cleanupError) {
              common_vendor.index.__f__("error", "at pages/testing/testing.vue:2332", "清理测试数据失败:", cleanupError);
            }
            resolve(400);
          }
        }, 100);
      });
    },
    delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    completeAllTests() {
      this.testing = false;
      this.statusText = "测试完成！";
      this.totalProgress = 100;
      if (this.elapsedTimer) {
        clearInterval(this.elapsedTimer);
      }
      const totalScore = this.testResults.reduce((sum, score) => sum + score, 0);
      const testResult = {
        timestamp: Date.now(),
        cpuScore: this.testResults[0],
        gpuScore: this.testResults[1],
        memoryScore: this.testResults[2],
        storageScore: this.testResults[3],
        totalScore,
        duration: this.elapsedTime
      };
      const history = common_vendor.index.getStorageSync("test_history") || [];
      history.push(testResult);
      common_vendor.index.setStorageSync("test_history", history);
      setTimeout(() => {
        common_vendor.index.redirectTo({
          url: `/pages/result/result?result=${encodeURIComponent(JSON.stringify(testResult))}`
        });
      }, 2e3);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.totalProgress + "%",
    b: common_vendor.t(Math.round($data.totalProgress)),
    c: common_vendor.t($options.currentTest.icon),
    d: $options.currentTest.color,
    e: common_vendor.t($options.currentTest.name),
    f: common_vendor.t($options.currentTest.description),
    g: $data.testing ? 1 : "",
    h: common_vendor.t($data.statusText),
    i: common_vendor.t($data.currentScore),
    j: common_vendor.t($data.elapsedTime),
    k: $data.currentTestIndex === 1,
    l: common_vendor.f($data.testResults, (result, index, i0) => {
      return {
        a: common_vendor.t($data.testItems[index].icon),
        b: $data.testItems[index].color,
        c: common_vendor.t($data.testItems[index].name),
        d: common_vendor.t(result > 0 ? result + "分" : "待测试"),
        e: index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/testing/testing.js.map
