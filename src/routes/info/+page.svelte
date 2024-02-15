<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { onMount } from 'svelte';
	let temp = 'T000096';
	let temp2 = 'EM00027791';
	onMount(() => {
		console.log(document.cookie);
	});
	let currentUser: IUserInfo | null = null;
	let loan_list: ILoanBook[] = [];
	const enhanceForm: SubmitFunction = ({ formData, formElement, cancel }) => {
		const input = formElement.querySelector('input') as HTMLInputElement;
		if (currentUser) {
			formData.append('user_key', `${currentUser.user_key}`);
		}
		return async ({ result, update }) => {
			if (result.type === 'success' && result.data) {
				const data = result.data['body'] as IUserSearch;
				console.log(data);
				loan_list = data.loan_list ?? [];
				if (
					data.resultCode &&
					(data.resultCode === 'KEYWORD_USER_SEARCH' || data.resultCode === 'STRAIGHT_RTN') &&
					data.user_loan_info &&
					data.user_loan_info.length == 1
				) {
					const user = data.user_loan_info[0];

					// loan_list = data.loan_list;
					if (currentUser && currentUser.user_key === user.user_key) {
						currentUser = null;
					} else if (currentUser === null) {
						currentUser = user;
					} else if (currentUser && currentUser.user_key !== user.user_key) {
						currentUser = user;
					}
				}
			}
		};
	};
</script>

{#if currentUser}
	<div>
		<p>{currentUser.name}</p>
		{currentUser.user_key}
	</div>
	{#each loan_list as loan}
		<div>
			<p>{loan.title}</p>
			<p>{loan.loan_date}</p>
			<p>{loan.rtn_plan_date}</p>
		</div>
	{/each}
{/if}

<form method="post" use:enhance={enhanceForm}>
	<label class="text-2xl" for="username">사용자명</label>
	<input
		class="input input-primary"
		type="text"
		id="keyword"
		name="keyword"
		required
		bind:value={temp}
	/>
	<input type="hidden" name="rtn_straight_yn" id="rtn_straight_yn" value="Y" />
	<button type="submit" class="btn btn-primary">제출</button>
</form>
