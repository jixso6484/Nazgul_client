const supabase = require("./superbase");

const checkLoginStatus = async () => {
    try {
        // Supabase 클라이언트와 메서드가 올바른지 확인
        if (!supabase?.auth?.getSession) {
            console.error("Supabase auth 또는 getSession 메서드가 정의되지 않았습니다.");
            return false;
        }

        // getSession을 호출하여 세션 가져오기
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
            console.error("세션 가져오기 중 오류 발생:", error);
            return false;
        }

        if (session) {
            console.log("로그인 상태입니다.");
            return true;
        } else {
            console.log("로그아웃 상태입니다.");
            return false;
        }
    } catch (err) {
        console.error("로그인 상태 확인 중 예기치 못한 오류 발생:", err);
        return false;
    }
};

module.exports = checkLoginStatus;
