<template>
	<view class="container">
		<!-- 头部logo和标题 -->
		<view class="header">
			<image class="logo" src="/static/logo.png"></image>
			<text class="title">性能跑分测试</text>
			<text class="subtitle">测试你的设备性能</text>
		</view>

		<!-- 测试统计卡片 -->
		<view class="stats-card">
			<view class="stat-item">
				<text class="stat-number">{{totalTests}}</text>
				<text class="stat-label">总测试次数</text>
			</view>
			<view class="stat-divider"></view>
			<view class="stat-item">
				<text class="stat-number">{{bestScore}}</text>
				<text class="stat-label">最高分数</text>
			</view>
		</view>

		<!-- 测试项目预览 -->
		<view class="test-items">
			<view class="section-title">测试项目</view>
			<view class="items-grid">
				<view class="test-item" v-for="item in testItems" :key="item.id">
					<view class="item-icon" :style="{backgroundColor: item.color}">
						<text class="icon-text">{{item.icon}}</text>
					</view>
					<text class="item-name">{{item.name}}</text>
				</view>
			</view>
		</view>

		<!-- 开始测试按钮 -->
		<view class="button-area">
			<button class="start-btn" @click="startTest" :disabled="testing">
				<text class="btn-text">{{testing ? '测试中...' : '开始跑分'}}</text>
			</button>
		</view>

		<!-- 历史记录入口 -->
		<view class="history-section">
			<button class="history-btn" @click="viewHistory">
				<text class="history-text">查看历史记录</text>
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				testing: false,
				totalTests: 0,
				bestScore: 0,
				testItems: [
					{
						id: 1,
						name: 'CPU',
						icon: '⚡',
						color: '#FF6B6B'
					},
					{
						id: 2,
						name: 'GPU',
						icon: '🎮',
						color: '#4ECDC4'
					},
					{
						id: 3,
						name: '内存',
						icon: '💾',
						color: '#45B7D1'
					},
					{
						id: 4,
						name: '存储',
						icon: '💿',
						color: '#96CEB4'
					}
				]
			}
		},
		onLoad() {
			this.loadHistory();
		},
		onShow() {
			this.loadHistory();
		},
		methods: {
			loadHistory() {
				// 从本地存储读取历史记录
				const history = uni.getStorageSync('test_history') || [];
				this.totalTests = history.length;
				if (history.length > 0) {
					this.bestScore = Math.max(...history.map(item => item.totalScore));
				}
			},
			startTest() {
				if (this.testing) return;
				
				this.testing = true;
				
				// 显示加载提示
				uni.showLoading({
					title: '准备测试中...'
				});
				
				setTimeout(() => {
					uni.hideLoading();
					this.testing = false;
					
					// 跳转到测试页面
					uni.navigateTo({
						url: '/pages/testing/testing'
					});
				}, 1000);
			},
			viewHistory() {
				const history = uni.getStorageSync('test_history') || [];
				if (history.length === 0) {
					uni.showToast({
						title: '暂无历史记录',
						icon: 'none'
					});
					return;
				}
				
				// 显示历史记录
				const historyText = history.slice(-5).reverse().map((item, index) => {
					const date = new Date(item.timestamp).toLocaleString();
					return `第${history.length - index}次: ${item.totalScore}分 (${date})`;
				}).join('\n');
				
				uni.showModal({
					title: '最近5次测试记录',
					content: historyText,
					showCancel: false
				});
			}
		}
	}
</script>

<style>
	.container {
		min-height: 100vh;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		padding: 40rpx 30rpx;
	}

	.header {
		text-align: center;
		margin-bottom: 60rpx;
	}

	.logo {
		width: 120rpx;
		height: 120rpx;
		border-radius: 60rpx;
		margin-bottom: 30rpx;
	}

	.title {
		display: block;
		font-size: 48rpx;
		font-weight: bold;
		color: white;
		margin-bottom: 10rpx;
	}

	.subtitle {
		display: block;
		font-size: 28rpx;
		color: rgba(255, 255, 255, 0.8);
	}

	.stats-card {
		background: rgba(255, 255, 255, 0.9);
		border-radius: 20rpx;
		padding: 40rpx 30rpx;
		margin-bottom: 40rpx;
		display: flex;
		align-items: center;
		box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.1);
	}

	.stat-item {
		flex: 1;
		text-align: center;
	}

	.stat-number {
		display: block;
		font-size: 48rpx;
		font-weight: bold;
		color: #2C3E50;
		margin-bottom: 10rpx;
	}

	.stat-label {
		font-size: 24rpx;
		color: #7F8C8D;
	}

	.stat-divider {
		width: 2rpx;
		height: 60rpx;
		background: #ECF0F1;
	}

	.test-items {
		margin-bottom: 60rpx;
	}

	.section-title {
		font-size: 32rpx;
		font-weight: bold;
		color: white;
		margin-bottom: 30rpx;
		text-align: center;
	}

	.items-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 20rpx;
	}

	.test-item {
		background: rgba(255, 255, 255, 0.9);
		border-radius: 15rpx;
		padding: 30rpx;
		text-align: center;
		box-shadow: 0 5rpx 15rpx rgba(0, 0, 0, 0.1);
	}

	.item-icon {
		width: 80rpx;
		height: 80rpx;
		border-radius: 40rpx;
		margin: 0 auto 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.icon-text {
		font-size: 36rpx;
	}

	.item-name {
		font-size: 26rpx;
		color: #2C3E50;
		font-weight: 500;
	}

	.button-area {
		margin-bottom: 40rpx;
	}

	.start-btn {
		width: 100%;
		height: 100rpx;
		background: linear-gradient(45deg, #FF6B6B, #FF8E53);
		border-radius: 50rpx;
		border: none;
		box-shadow: 0 10rpx 30rpx rgba(255, 107, 107, 0.3);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.start-btn[disabled] {
		background: #BDC3C7;
		box-shadow: none;
	}

	.btn-text {
		font-size: 32rpx;
		color: white;
		font-weight: bold;
	}

	.history-section {
		text-align: center;
	}

	.history-btn {
		background: transparent;
		border: 2rpx solid rgba(255, 255, 255, 0.5);
		border-radius: 50rpx;
		padding: 20rpx 60rpx;
	}

	.history-text {
		font-size: 28rpx;
		color: rgba(255, 255, 255, 0.8);
	}
</style>
