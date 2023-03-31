import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { getUserProfileAPI } from '@/apis/auth';
import { userProfileState } from '@/atom/userProfile';

const useUserProfile = (path: string) => {
  const [userProfile, setUserProfile] = useRecoilState(userProfileState);

  const fetchUserProfile = async () => {
    const accessToken = localStorage.getItem('accessToken');

    // 전역 상태는 없고 토큰은 있는 경우 (ex. 새로고침)
    // 토큰을 이용해서 유저 정보 받기
    // 토큰이 인증이 안될 경우 토큰 삭제 후 로그아웃
    if (!userProfile && accessToken) {
      try {
        const { result: userProfile } = await getUserProfileAPI();
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
    // 실행 위치에 대해 고려해봐야 함
    console.log('useUserProfile 실행: ' + path);
    fetchUserProfile();
  }, [path]);

  return userProfile;
};

export default useUserProfile;
