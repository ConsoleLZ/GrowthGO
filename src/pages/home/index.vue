<template>
	<div class="header">
		<px-avatar :size="40">
			<px-image src="/favicon.ico" alt="Image"></px-image>
		</px-avatar>
		<div>我的宝物</div>
		<px-input placeholder="Please input">
			<template #prefix>
				<img src="@/assets/images/search.svg" width="18px" alt="" />
			</template>
		</px-input>
	</div>
</template>

<script lang="ts" src="./index.ts"></script>
<style src="./index.css" scoped></style>
