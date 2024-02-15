<script lang="ts">
	import { enhance } from '$app/forms';
	let username = '';
	let password = '';
</script>

<div class="flex min-h-screen items-center justify-center">
	<div
		class="border-2xl w-[360px] rounded-2xl border-2 border-solid bg-gray-200 p-4 drop-shadow-2xl"
	>
		<form
			method="post"
			class="w-360px form-control"
			use:enhance={() => {
				document.documentElement.requestFullscreen();
				return async ({ result, update }) => {
					await update();
				};
			}}
		>
			<label class="text-2xl" for="username">사용자명</label>
			<input
				class="input input-primary"
				type="text"
				id="id"
				name="id"
				required
				bind:value={username}
			/>
			<label class="text-2xl" for="password">password</label>
			<input
				class="input input-primary"
				type="password"
				id="pw"
				name="pw"
				required
				bind:value={password}
			/>
			<br />
			<input type="hidden" name="page_id" id="page_id" value="ALL" />
			<input type="hidden" name="prov_code" id="prov_code" value="" />
			<button type="submit" class="btn btn-primary">Submit</button>
		</form>
	</div>
</div>
