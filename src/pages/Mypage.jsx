// Mypage.jsx

import React, { useState } from "react";
import styled from "styled-components";
import defaultImage from "../img/mypage-default.png";
import cameraLogo from "../img/cameraLogo.png";
import theme from "../styles/theme";
import { useNavigate } from "react-router-dom";
import Lifelist from "../components/mypage/Lifelist";

const Mypage = () => {
  const navigate = useNavigate();

  // 이미지 업로드 state
  const [uploadedImage, setUploadedImage] = useState(null);

  // Lifelist 컴포넌트 state
  const [isLifelistVisible, setIsLifelistVisible] = useState(false);

  // 선택된 추구하는 삶 저장
  const [selectedLifestyles, setSelectedLifestyles] = useState([]);

  const onChangeImage = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
  };

  const goToAnalytics = () => {
    navigate("/analytics");
  };

  const goToLogin = () => {
    navigate("/login");
  };

  //추후 조건문을 통해 5단계로 멘트 나눠야 함
  let life = "균형 잡힌";

  //서버에서 닉네임 받아와야 함
  let nickname = "헥스코드";

  //서버에서 점수 받아와야함
  let score = 88;

  //서버에서 백분율 받아와야 함
  let percentage = 11;

  //추후 AI 개선사항 동적으로 받아와야 함
  let aiSolutionContent =
    "밥도 잘 먹고 공부도 열심히 하고 잠을 잘 자세요. 어디까지나 AI 솔루션이므로 자세한 진단은 병원에 가서 받아보세요. 어제 저녁에는 매운 음식을 드셨군요. 매운 음식은 소화기관에 좋지 않으니 자제하기 바랍니다. 회사에서 너무 심한 압박감을 느낀다면 휴가를 내고 쉬는 것을 권장합니다.";

  // Lifelist 버튼 클릭 시 상태 변경 (클릭시 렌더링)
  const toggleLifelistVisibility = () => {
    setIsLifelistVisible(!isLifelistVisible);
  };

  // Lifelist 관리
  const handleLifelistSelect = (selectedLifestyles) => {
    setSelectedLifestyles(selectedLifestyles);
    setIsLifelistVisible(false);
  };

  return (
    <div>
      <Wrapper>
        <LeftWrapper>
          <ImageWrapper>
            {uploadedImage ? (
              <ProfileImage src={uploadedImage} alt="default" />
            ) : (
              <ProfileImage src={defaultImage} alt="userProfile" />
            )}
            <HiddenInput type="file" id="fileInput" onChange={onChangeImage} />
            <StyledLabel htmlFor="fileInput">
              <ImageChangeWrapper>
                <ChangeImage>프로필 사진 변경하기</ChangeImage>
                <CameraIcon src={cameraLogo} alt="Upload" />
              </ImageChangeWrapper>
            </StyledLabel>
          </ImageWrapper>

          <TextArea>
            <TextWrapper>
              <Text>닉네임 | </Text>
              <br></br>
              <Text>이메일 | </Text>
              <br></br>
              <Text>추구하는 삶 | </Text>
              <br></br>
            </TextWrapper>
            <InfoWrapper>
              <Text> 헥스코드</Text>
              <br></br>
              <Text> example@email.kr</Text>
              <br></br>

              <LifestyleTags>
                {selectedLifestyles.length > 0 ? (
                  selectedLifestyles.map((lifestyle) => (
                    <LifestyleTag key={lifestyle.id}>
                      {lifestyle.data}
                    </LifestyleTag>
                  ))
                ) : (
                  <NoSelection>추구하는 삶을 선택해주세요</NoSelection>
                )}
                <LifelistButton onClick={toggleLifelistVisibility}>
                  +
                </LifelistButton>
              </LifestyleTags>
            </InfoWrapper>
          </TextArea>
        </LeftWrapper>

        <Divider></Divider>
        <RightWrapper>
          <Cheer>시작이 반이다. 화이팅!</Cheer>
          <RightText>나의 워라벨</RightText>
          <Balance>
            <BalanceTitle>
              {life} 삶을 사는 <Nickname>{nickname}</Nickname>님
            </BalanceTitle>
            <Score>{score}점</Score>
            <Percentage>상위 {percentage}%</Percentage>
            <DetailView onClick={goToAnalytics}>상세보기</DetailView>
          </Balance>
          <RightText>AI 개선 방향 제안</RightText>
          <AiSolution>
            <AiSolutionContent>{aiSolutionContent}</AiSolutionContent>
          </AiSolution>
          <Logout onClick={goToLogin}>로그아웃</Logout>
          <Withdrawal>회원 탈퇴</Withdrawal>
        </RightWrapper>
      </Wrapper>

      {/* Lifelist 컴포넌트 조건부 렌더링 */}
      {isLifelistVisible && <Lifelist onSelect={handleLifelistSelect} />}
    </div>
  );
};

export default Mypage;

//전체 감싸는 Wrapper
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 8rem;
  margin-bottom: 2rem;
  margin-top: 10rem;
`;

//왼쪽 (Divider 미포함) 감싸는 Wrapper
const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Divider = styled.div`
  width: 0.3rem;
  height: 70rem;
  margin-left: 0rem;
  background-color: lightgray;
`;

//프로필 사진, "프로필 사진 변경하기", 카메라 로고 Wrapper
const ImageWrapper = styled.div`
  margin-left: 7rem;
  display: flex;
  flex-direction: column;
`;

//"프로필 사진 변경하기", 카메라 로고 Wrapper
const ImageChangeWrapper = styled.div`
  display: flex;
  height: 5rem;
  flex-direction: row;
  margin-top: 0rem;
  margin-left: 20rem;
`;

//프로필 사진 스타일
const ProfileImage = styled.img`
  width: 42rem;
  height: 42rem;
  border: 0.8rem solid;
  border-color: ${theme.colors["main-purple"]};
  border-radius: 5rem;
`;

//input 기본값인 "파일 선택" 및 "선택된 파일 없음" 가리는 코드
const HiddenInput = styled.input`
  display: none;
`;

const StyledLabel = styled.label`
  display: inline-block;
  cursor: pointer;
  margin-top: 1rem;
`;

const ChangeImage = styled.p`
  margin-top: 0.8rem;
  font-size: 2rem;
  font-weight: bold;
`;

const CameraIcon = styled.img`
  width: 4rem;
  height: 4rem;
  margin-left: 0.7rem;
`;

//닉네임 | 헥스코드, 이메일 | example , 추구하는 삶 Wrapper
const TextArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
//닉네임, 이메일, 추구하는 삶 Wrapper
const TextWrapper = styled.div`
  text-align: right;
  width: 18rem;
`;

const Text = styled.p`
  margin-top: 0.7rem;
  margin-bottom: -0.2rem;
  font-size: 2.4rem;
  font-weight: bold;
  white-space: pre;
`;

//헥스코드, example, 추구하는 삶 버튼 Wrapper
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 48rem;
`;

// 추구하는 삶 태그들
const LifestyleTags = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 0.5rem;
`;

//추구하는 삶 선택 버튼.
const LifelistButton = styled.button`
  font-size: 1.8rem;
  font-weight: 100;
  border-radius: 1rem;
  border: none;
  color: #afafaf;
  background: transparent;
  cursor: pointer;
  margin-left: 0.5rem;
  margin-top: -0.1rem;
`;

//여기까지 왼쪽

//여기부터 오른쪽
const RightWrapper = styled.div`
  margin-left: 7rem;
  margin-top: -4.5rem;
`;

//AI 활용한 응원 문구. 우선 Static하게 넣어둠.
const Cheer = styled.h1`
  font-size: 4.5rem;
  margin-top: 0;
  margin-bottom: 5rem;
  text-align: center;
`;

//"나의 워라벨", "AI 개선 방향 제안" 텍스트 조정 코드
const RightText = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.2rem;
  margin-left: 0.1rem;
  margin-top: 0rem;
`;

//워라벨 div
const Balance = styled.div`
  align-items: center;
  text-align: center;
  width: 68rem;
  height: 30rem;
  border: 0.3rem solid;
  border-radius: 2rem;
  border-color: lightgray;
  margin-bottom: 4.5rem;
`;

//OO한 삶을 사는 {닉네임} 님
const BalanceTitle = styled.p`
  margin-bottom: 0;
  margin-top: 4rem;
  font-size: 3rem;
  font-weight: 500;
`;

//닉네임
const Nickname = styled.span`
  font-weight: bold;
  color: ${theme.colors["main-purple"]};
`;

//점수
const Score = styled.h1`
  font-size: 6rem;
  margin-bottom: 0;
  margin-top: 0rem;
`;

//상위 n%
const Percentage = styled.p`
  margin-top: 0rem;
  margin-bottom: 1.3rem;
  font-size: 2rem;
`;

const DetailView = styled.button`
  width: 13rem;
  height: 4rem;
  border: none;
  font-size: 1.7rem;
  font-weight: bold;
  border-radius: 0.8rem;
  color: white;
  background-color: ${theme.colors["main-purple"]};
  cursor: pointer;
`;

const AiSolution = styled.div`
  width: 68rem;
  height: 15rem;
  border: 0.3rem solid;
  border-radius: 2rem;
  border-color: lightgray;
`;

const AiSolutionContent = styled.p`
  font-size: 2.2rem;
  margin-top: 0.9rem;
  margin-left: 0.7rem;
`;

const Logout = styled.button`
  width: 12rem;
  height: 5rem;
  background-color: lightgrey;
  border: none;
  border-radius: 1rem;
  margin-top: 4rem;
  margin-left: 45rem;
  font-size: 2.3rem;
  font-weight: bold;
  color: white;
`;

//탈퇴
const Withdrawal = styled.button`
  background: transparent;
  border: none;
  color: lightgray;
  font-size: 2.3rem;
  font-weight: bold;
  margin-left: 1rem;
`;

const LifestyleTag = styled.div`
  background-color: ${theme.colors["main-light-green"]};
  color: #373a80;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  margin-right: 0.5rem;
  margin-top: 0.5rem;
`;

const NoSelection = styled.p`
  font-size: 1.5rem;
  color: grey;
  margin-top: 1rem;
  margin-left: 0.6rem;
  display: inline;
`;
