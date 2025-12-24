<template>
	<div class="header">
		<div class="left">
			<px-avatar :size="40">
				<px-image src="/favicon.ico" alt="Image"></px-image>
			</px-avatar>
			<div>我的宝物</div>
			<px-input placeholder="查找我的宝物">
				<template #prefix>
					<img src="@/assets/images/search.png" width="18px" alt="" />
				</template>
			</px-input>
		</div>
		<div class="right">
			<div>宝物：45</div>
			<div>|</div>
			<div>宝物分类：20</div>
			<div>|</div>
			<div>有<span>99999</span>个勇士参观了这里</div>
			<div>|</div>
			<div>站点已运行<span>45天10小时35分钟30秒</span></div>
		</div>
	</div>
</template>

<script lang="ts" src="./index.ts"></script>
<style src="./index.css" scoped></style>
