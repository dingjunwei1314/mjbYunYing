<template>
	<div>
		<h3 style="text-align: center;margin-top: 100px">页面不存在</h3>
		<div style="text-align: center;margin-top: 50px;">
			<el-button type="text">
				<router-link to="/login">返回登录页</router-link>	
			</el-button>
			<el-button type="text" @click="$router.go(-1)">
				返回上一页
			</el-button>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		}
	}
</script>

