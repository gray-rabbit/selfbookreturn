import { redirect, type Actions } from "@sveltejs/kit";
export const actions: Actions = {
    default: async ({ fetch, request, locals, cookies }) => {
        const formData = await request.formData()
        const username = formData.get("id") as string;
        const password = formData.get("pw") as string;

        formData.set("id", username.toUpperCase())
        console.log(username, password);
        let result = await fetch("https://dls1.edunet.net/DLS/totalLogin.do", { method: "POST", body: formData })
        // console.log(await result.text())
        const { loginUrl } = await result.json() as { loginUrl: string }
        console.log(loginUrl)
        result = await fetch("https://dls1.edunet.net/DLS/login.do", { method: "POST", body: formData })
        console.log(await result.text())
        const cookie = result.headers.get("set-cookie") ?? "";
        // const t = { "useIllYn": 0, "statusDescription": "로그인처리를 완료했습니다.", "member_info": { "school_code": 100083, "pw": "ec4f461e0e95c92e8f16dc4e951925fb6ca4fef3f58537fdfe1d27f9e8f4bece", "librarian_rfid": "N", "ip": "1.246.222.88, 172.17.136.8, 175.45.211.146, 192.168.5.40", "user_key": 18021596870, "menu_key_list": "AP,AP010,AP050,AP020,AP030,AP040,AP060,SE,SE010,SE020,CO,CO010,CO020,CO040,LR,LR010,LR020,LR030,LR040,LR050,LR070,LR080", "prov_code": "M10", "member_key": 18021596876, "gubun": null, "auth_code": "402", "logout_timer": 3600, "logincnt": 4, "rsvt_setting": "0", "lib_code": 100083, "fail_cnt": 0, "org_school_code": 100083, "school_nm": "한국교원대학교부설월곡초등학교", "ill_only_yn": "N", "id": "WGBOOK3", "organ_code": null, "max_fail_cnt": 10 }, "status": "SUCCESS" }
        result = await fetch("https://dls1.edunet.net/DLS/Main", {
            headers: {
                // cookie
            }
        });
        locals.cookie = cookie;
        cookies.set("dls", cookie, { path: "/" })
        return redirect(300, "/info")
    }


}