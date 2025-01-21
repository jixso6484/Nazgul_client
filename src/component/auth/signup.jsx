import supabase from "./superbase";

async function signup(email, password, nickname, isEmailAvailable) {
    if (isEmailAvailable) {
        console.log('회원가입 오류: 이메일 중복 체크가 필요합니다.');
        return { success: false, error: '이메일 중복 체크가 필요합니다.' };
    }

    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { nickname },
            },
        });

        if (error) {
            console.error('회원가입 오류:', error.message);
            return { success: false, error: error.message };
        }

        console.log('회원가입 성공:', data);
        return { success: true, data };
    } catch (err) {
        console.error('예상치 못한 오류 발생:', err);
        return { success: false, error: 'Unexpected error occurred.' };
    }
}

export default signup;
