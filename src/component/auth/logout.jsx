import supabase from "./superbase"

// 사용해야 하는 경우 (로직 추가)
const logout = async () => {
  const { error } = await supabase.auth.signOut(); // 예: Supabase 로그아웃 호출
  if (error) {
    console.error('Logout error:', error);
  }
};
export default logout;