import supabase from './superbase'; // Supabase 클라이언트 경로 확인

const login = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) { // 매개변수를 error로 명시
    console.error('예기치 않은 오류 발생:', error.message); // error 사용
    return { success: false, error: error.message };
  }
};

export default login;
