import supabase from "./superbase";

const checkLoginStatus = async () => {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error('세션 정보를 가져오는 중 에러 발생:', error.message);
    return null;
  }

  return data.session ? data.session.user : null; // 세션이 존재하면 사용자 정보 반환
};

export default checkLoginStatus;