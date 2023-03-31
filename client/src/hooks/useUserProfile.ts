import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { getUserProfileAPI } from '@/apis/auth';
import { userProfileState } from '@/atom/userProfile';

const useUserProfile = () => {
  const [userProfile, setUserProfile] = useRecoilState(userProfileState);

  const fetchUserProfile = async () => {
    const accessToken = localStorage.getItem('accessToken');

    // 전역 상태는 없고 토큰은 있는 경우 (ex. 새로고침)
    // 토큰을 이용해서 유저 정보 받기
    // 토큰이 인증이 안될 경우 토큰 삭제 후 로그아웃
    if (!userProfile && accessToken) {
      try {
        const userProfile = await getUserProfileAPI();
        setUserProfile(userProfile);
      } catch (error) {
        localStorage.removeItem('accessToken');
        setUserProfile(null);
      }
    }

    // 토큰이 없을 경우
    // 로그아웃 상태로 변경
    if (!accessToken) {
      setUserProfile(null);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return userProfile;
};

export default useUserProfile;