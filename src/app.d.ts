// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			cookie: string;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	interface IUserSearch {
		resultCode: string;
		statue: string;
		statusDescription: string;
		user_loan_info: IUserInfo[]
		loan_list: ILoanBook[]
	}
	interface IUserInfo {
		user_status: string;
		loan_status: number;
		lib_code: number;
		name: string,
		loan_status_desc: string;
		loan_stop_date: string | null;
		school_code: number;
		user_key: number;
		user_no: string;
	}
	interface ILoanBook {
		title: string;
		loan_date: string;
		rtn_plan_date: string;
		call_no: string;
	}
}
export { IUserSearch, IUserInfo };
