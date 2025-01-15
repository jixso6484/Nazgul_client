import supabase from "./supabase"; // 상대 경로 맞게 수정

const signupFun = async () => {
    try {
        // 회원가입 처리
        const { data, error } = await supabase.auth.signUp({
            email: emailRef.current.value,
            password: passwordRef.current.value,
        });

        if (error) {
            console.error("회원가입 중 에러 발생:", error.message);
            return;
        }

        // 데이터 삽입
        const userData = await supabase.from("userInfo").insert({
            id: data.user?.id,
            email: data.user?.email,
            created_at: data.user?.created_at,
            username: usernameRef.current.value,
        });

        if (userData.error) {
            console.error("데이터 삽입 중 에러 발생:", userData.error.message);
        } else {
            console.log("유저 데이터 삽입 완료:", userData.data);
        }
    } catch (err) {
        console.error("예기치 않은 에러:", err.message);
    }
};
