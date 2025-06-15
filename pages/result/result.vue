<template>
	<view class="result-container">
		<!-- 总分显示 -->
		<view class="total-score-section">
			<view class="score-circle">
				<text class="score-number">{{result.totalScore}}</text>
				<text class="score-label">总分</text>
			</view>
			<view class="performance-level">
				<text class="level-text">{{performanceLevel.text}}</text>
				<text class="level-desc">{{performanceLevel.description}}</text>
			</view>
		</view>

		<!-- 测试时间 -->
		<view class="test-info">
			<text class="test-time">测试用时: {{result.duration}}秒</text>
			<text class="test-date">{{formatDate(result.timestamp)}}</text>
		</view>

		<!-- 详细得分 -->
		<view class="detailed-scores">
			<view class="section-title">详细得分</view>
			<view class="score-item" v-for="(item, index) in scoreItems" :key="index">
				<view class="score-icon" :style="{backgroundColor: item.color}">
					<text class="icon-text">{{item.icon}}</text>
				</view>
				<view class="score-info">
					<view class="score-row">
						<text class="score-name">{{item.name}}</text>
						<text class="score-value">{{item.score}}分</text>
					</view>
					<view class="score-bar">
						<view class="score-fill" :style="{width: (item.score / maxScore * 100) + '%', backgroundColor: item.color}"></view>
					</view>
				</view>
			</view>
		</view>

		<!-- 操作按钮 -->
		<view class="action-buttons">
			<button class="action-btn primary" @click="shareResult">
				<text class="btn-text">分享结果</text>
			</button>
			<button class="action-btn secondary" @click="testAgain">
				<text class="btn-text">再次测试</text>
			</button>
			<button class="action-btn tertiary" @click="backHome">
				<text class="btn-text">返回首页</text>
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				result: {
					timestamp: Date.now(),
					cpuScore: 0,
					gpuScore: 0,
					memoryScore: 0,
					storageScore: 0,
					totalScore: 0,
					duration: 0
				},
				maxScore: 8000
			}
		},
		computed: {
			scoreItems() {
				return [
					{
						name: 'CPU性能',
						icon: '⚡',
						color: '#FF6B6B',
						score: this.result.cpuScore
					},
					{
						name: 'GPU性能',
						icon: '🎮',
						color: '#4ECDC4',
						score: this.result.gpuScore
					},
					{
						name: '内存性能',
						icon: '💾',
						color: '#45B7D1',
						score: this.result.memoryScore
					},
					{
						name: '存储性能',
						icon: '💿',
						color: '#96CEB4',
						score: this.result.storageScore
					}
				];
			},
			performanceLevel() {
				const score = this.result.totalScore;
				if (score >= 18000) {
					return {
						text: '顶级性能',
						description: '哪来的三体科技？',
						color: '#FF6B6B'
					};
				} else if (score >= 12000) {
					return {
						text: '高端性能',
						description: '非常优秀的性能，可以借我打游戏吗？',
						color: '#4ECDC4'
					};
				} else if (score >= 8000) {
					return {
						text: '中高端性能',
						description: '性能表现良好，可以满足日常使用需求',
						color: '#45B7D1'
					};
				} else if (score >= 5000) {
					return {
						text: '中端性能',
						description: '性能OK，可以满足日常使用需求',
						color: '#96CEB4'
					};
				} else if (score >= 3000) {
					return {
						text: '入门性能',
						description: '平常刷刷视频，看看小说还是不错的',
						color: '#F39C12'
					};
				} else {
					return {
						text: '较低性能',
						description: '建议换锅碗瓢盆',
						color: '#BDC3C7'
					};
				}
			}
		},
		onLoad(options) {
			if (options.result) {
				try {
					this.result = JSON.parse(decodeURIComponent(options.result));
				} catch (e) {
					console.error('解析测试结果失败:', e);
					this.backHome();
				}
			}
		},
		methods: {
			formatDate(timestamp) {
				const date = new Date(timestamp);
				return date.toLocaleString('zh-CN', {
					year: 'numeric',
					month: '2-digit',
					day: '2-digit',
					hour: '2-digit',
					minute: '2-digit'
				});
			},
			shareResult() {
				const shareText = `我在【跑个分】测试中获得了 ${this.result.totalScore} 分！\n` +
					`CPU: ${this.result.cpuScore}分\n` +
					`GPU: ${this.result.gpuScore}分\n` +
					`内存: ${this.result.memoryScore}分\n` +
					`存储: ${this.result.storageScore}分\n` +
					`性能等级: ${this.performanceLevel.text}`;
				
				// 复制到剪贴板
				uni.setClipboardData({
					data: shareText,
					success: () => {
						uni.showToast({
							title: '结果已复制到剪贴板',
							icon: 'success'
						});
					}
				});
			},
			testAgain() {
				uni.showModal({
					title: '确认重新测试',
					content: '是否要进行新的性能测试？',
					success: (res) => {
						if (res.confirm) {
							uni.redirectTo({
								url: '/pages/testing/testing'
							});
						}
					}
				});
			},
			backHome() {
				uni.switchTab ? uni.switchTab({
					url: '/pages/index/index'
				}) : uni.redirectTo({
					url: '/pages/index/index'
				});
			}
		}
	}
</script>

<style>
	.result-container {
		min-height: 100vh;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		padding: 40rpx 30rpx;
	}

	.total-score-section {
		text-align: center;
		margin-bottom: 40rpx;
	}

	.score-circle {
		width: 200rpx;
		height: 200rpx;
		border-radius: 100rpx;
		background: rgba(255, 255, 255, 0.9);
		margin: 0 auto 30rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		box-shadow: 0 20rpx 40rpx rgba(0, 0, 0, 0.1);
	}

	.score-number {
		font-size: 48rpx;
		font-weight: bold;
		color: #2C3E50;
		margin-bottom: 5rpx;
	}

	.score-label {
		font-size: 24rpx;
		color: #7F8C8D;
	}

	.performance-level {
		background: rgba(255, 255, 255, 0.9);
		border-radius: 20rpx;
		padding: 20rpx 30rpx;
		margin: 0 auto;
		display: inline-block;
	}

	.level-text {
		font-size: 32rpx;
		font-weight: bold;
		color: #2C3E50;
		display: block;
		margin-bottom: 5rpx;
	}

	.level-desc {
		font-size: 24rpx;
		color: #7F8C8D;
	}

	.test-info {
		background: rgba(255, 255, 255, 0.9);
		border-radius: 15rpx;
		padding: 20rpx 30rpx;
		margin-bottom: 30rpx;
		text-align: center;
	}

	.test-time {
		font-size: 28rpx;
		color: #2C3E50;
		font-weight: 500;
		display: block;
		margin-bottom: 5rpx;
	}

	.test-date {
		font-size: 24rpx;
		color: #7F8C8D;
	}

	.detailed-scores {
		background: rgba(255, 255, 255, 0.9);
		border-radius: 20rpx;
		padding: 30rpx;
		margin-bottom: 30rpx;
	}

	.section-title {
		font-size: 32rpx;
		font-weight: bold;
		color: #2C3E50;
		margin-bottom: 30rpx;
		text-align: center;
	}

	.score-item {
		display: flex;
		align-items: center;
		margin-bottom: 30rpx;
	}

	.score-item:last-child {
		margin-bottom: 0;
	}

	.score-icon {
		width: 60rpx;
		height: 60rpx;
		border-radius: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 20rpx;
	}

	.icon-text {
		font-size: 24rpx;
	}

	.score-info {
		flex: 1;
	}

	.score-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10rpx;
	}

	.score-name {
		font-size: 28rpx;
		color: #2C3E50;
		font-weight: 500;
	}

	.score-value {
		font-size: 28rpx;
		color: #FF6B6B;
		font-weight: bold;
	}

	.score-bar {
		width: 100%;
		height: 8rpx;
		background: #ECF0F1;
		border-radius: 4rpx;
		overflow: hidden;
	}

	.score-fill {
		height: 100%;
		border-radius: 4rpx;
		transition: width 0.5s ease;
	}

	.action-buttons {
		margin-bottom: 30rpx;
	}

	.action-btn {
		width: 100%;
		height: 90rpx;
		border-radius: 45rpx;
		border: none;
		margin-bottom: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		font-weight: bold;
	}

	.action-btn.primary {
		background: linear-gradient(45deg, #FF6B6B, #FF8E53);
		color: white;
		box-shadow: 0 10rpx 30rpx rgba(255, 107, 107, 0.3);
	}

	.action-btn.secondary {
		background: rgba(255, 255, 255, 0.9);
		color: #2C3E50;
	}

	.action-btn.tertiary {
		background: transparent;
		border: 2rpx solid rgba(255, 255, 255, 0.5);
		color: rgba(255, 255, 255, 0.8);
	}

	.btn-text {
		font-size: 28rpx;
		font-weight: bold;
	}
</style> 