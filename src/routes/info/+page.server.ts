import type { Actions } from "@sveltejs/kit";

export const actions: Actions = {
    default: async ({ cookies, request, fetch }) => {
        const formData = await request.formData()
        const keyword = formData.get("keyword");
        if (keyword === null) return {
            status: 400,
            body: "Bad Request"
        }
        const cookie = cookies.get("dls")
        if (cookie === undefined) return {
            status: 401,
            body: "Unauthorized"
        }
        let result = await fetch(`https://dls1.edunet.net/DLS/loanReturn/keywordSearch.do`, {
            headers: {
                cookie
            },
            body: formData,
            method: "POST"
        })
        const data = await result.json()
        console.log(data);
        if (data.resultCode === "KEYWORD_USER_SEARCH" && data.status === "SUCCESS") {
            const user = data.user_loan_info[0]
            console.log(`https://dls1.edunet.net/DLS/loanReturn/getCurrentLoanList.do?user_key=${user.user_key}&user_no=${user.user_no}`)
            result = await fetch(`https://dls1.edunet.net/DLS/loanReturn/getCurrentLoanList.do?user_key=${user.user_key}&user_no=${user.user_no}`, {
                headers: {
                    cookie
                }
            })
            const { user_loan_list } = await result.json()
            if (user_loan_list) data["loan_list"] = user_loan_list
            else data["loan_list"] = []
        } else if (data.resultCode === "KEYWORD_EXECUTE_RTN" && data.status === "SUCCESS") {
            const user_key = data["rtn_info"]["user_key"]
            const user_no = data["rtn_info"]["user_no"]
            result = await fetch(`https://dls1.edunet.net/DLS/loanReturn/getCurrentLoanList.do?user_key=${user_key}&user_no=${user_no}`, {
                headers: {
                    cookie
                }
            });
            const { user_loan_list } = await result.json()
            if (user_loan_list) data["loan_list"] = user_loan_list
            else data["loan_list"] = []

        } else if (data.resultCode === "KEYWORD_EXECUTE_LOAN" && data.status === "SUCCESS") {
            const user_key = formData.get("user_key")
            const user_no = data["loan_info"]["user_no"]
            result = await fetch(`https://dls1.edunet.net/DLS/loanReturn/getCurrentLoanList.do?user_key=${user_key}&user_no=${user_no}`, {
                headers: {
                    cookie
                }
            });
            const { user_loan_list } = await result.json()
            console.log("여기", user_loan_list);
            if (user_loan_list) data["loan_list"] = user_loan_list
            else data["loan_list"] = []
        } else if (data.resultCode === "STRAIGHT_RTN" && data.status === "SUCCESS") {

            data["user_loan_info"] = data["rtn_user_info"]["user_loan_info"]
            const user_key = data["rtn_info"]["user_key"]
            const user_no = data["rtn_info"]["user_no"]
            result = await fetch(`https://dls1.edunet.net/DLS/loanReturn/getCurrentLoanList.do?user_key=${user_key}&user_no=${user_no}`, {
                headers: {
                    cookie
                }
            });

            const { user_loan_list } = await result.json()
            if (user_loan_list) data["loan_list"] = user_loan_list
            else data["loan_list"] = []

        }

        return {
            status: 200,
            body: data,
        }
    }
}