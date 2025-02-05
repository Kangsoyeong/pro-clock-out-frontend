import React, { useState } from "react";
import styled from "styled-components";
import SelectButtons from "../SelectButtons";
import Question from "../Question";
import TimeSlider from "./TimeSlider";
import axios from "axios";

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Popup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  padding: 30px;
  border-radius: 1.5rem;
  width: 55rem;
  height: 68rem;
  position: relative;
`;

const PopupTitle = styled.h3`
  margin-top: 3rem;
  margin-bottom: 3rem;
  font-size: 3rem;
  font-weight: bold;
  color: #6ad4dd;
`;

const PopupButton = styled.button`
  width: 20%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background-color: #6ad4dd;
  color: white;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 2rem;
`;

const TopQuestionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15rem;
`;

const MiddleQuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;

const MiddleQuestionWrapper2 = styled.div`
  justify-content: left;
  margin-left: 1.8rem;
`;

const SleepPopup = ({
  onClose,
  onSave,
  initialSleepScore,
  title = "수면 데이터를 입력해주세요",
}) => {
  // 상태 관리
  const [workDayBedtime, setWorkDayBedtime] = useState(null); // 근무일 취침 시간
  const [workDayWakeup, setWorkDayWakeup] = useState(null); // 근무일 기상 시간
  const [dayOffBedtime, setDayOffBedtime] = useState(null); // 휴무일 취침 시간
  const [dayOffWakeup, setDayOffWakeup] = useState(null); // 휴무일 기상 시간
  const [sleepScore, setSleepScore] = useState(initialSleepScore || null); // 수면 만족도

  // 근무일 수면 시간 선택 처리
  const handleWorkDayTimeSelect = (bedtime, wakeup) => {
    setWorkDayBedtime(bedtime);
    setWorkDayWakeup(wakeup);
    console.log("Selected work day sleep time:", bedtime, wakeup);
  };

  // 휴무일 수면 시간 선택 처리
  const handleDayOffTimeSelect = (bedtime, wakeup) => {
    setDayOffBedtime(bedtime);
    setDayOffWakeup(wakeup);
    console.log("Selected day off sleep time:", bedtime, wakeup);
  };

  // 수면 만족도 변경 처리
  const handleSleepScoreChange = (score) => {
    setSleepScore(score);
    console.log("수면 만족도 점수:", score);
  };

  // 유효성 검사 함수
  const isSleepFormValid = () => {
    return (
      workDayBedtime !== null &&
      workDayWakeup !== null &&
      dayOffBedtime !== null &&
      dayOffWakeup !== null &&
      sleepScore !== null
    );
  };

  // 저장 버튼 클릭 시 처리
  const handleSaveClick = async () => {
    if (isSleepFormValid()) {
      try {
        // localStorage에서 토큰 가져오기
        const token = localStorage.getItem("authorization");

        // 토큰이 존재하지 않을 경우에 대한 처리
        if (!token) {
          console.error("토큰이 없습니다.");
          alert("로그인이 필요합니다.");
          return;
        }

        const requestData = {
          workday_bedtime: workDayBedtime.startTime,
          workday_wakeup: workDayBedtime.endTime,
          dayoff_bedtime: dayOffBedtime.startTime,
          dayoff_wakeup: dayOffBedtime.endTime,
          sleep_satisfaction: sleepScore,
        };

        console.log("Request Data:", requestData);

        // API 요청 보내기
        const response = await axios.put(
          "https://www.proclockout.com/api/v1/wolibals/sleep",
          requestData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );

        console.log("Data saved successfully:", response);
        onSave(requestData);
        onClose();
      } catch (error) {
        console.error("Error while saving data:", error);

        if (error.response) {
          console.error("에러 응답 데이터:", error.response.data);
          console.error("에러 응답 상태 코드:", error.response.status);
          console.error("에러 응답 헤더:", error.response.headers);
        } else if (error.request) {
          console.error(
            "요청이 전송되었지만 응답을 받지 못했습니다:",
            error.request
          );
        } else {
          console.error("요청 설정 중 문제가 발생했습니다:", error.message);
        }

        alert("데이터를 저장하는 중 오류가 발생했습니다.");
      }
    } else {
      if (workDayBedtime === null || workDayWakeup === null) {
        alert("근무일 수면 시간을 입력해주세요.");
      } else if (dayOffBedtime === null || dayOffWakeup === null) {
        alert("휴무일 수면 시간을 입력해주세요.");
      } else if (sleepScore === null) {
        alert("수면 만족도를 입력해주세요.");
      }
    }
  };

  const colors = [
    "#FF8A8A",
    "#FF8A8A",
    "#FF8A8A",
    "#FF8A8A",
    "#CCCCCC",
    "#6AD4DD",
    "#6AD4DD",
    "#6AD4DD",
    "#6AD4DD",
  ];

  return (
    <PopupContainer onClick={onClose}>
      <Popup onClick={(e) => e.stopPropagation()}>
        <PopupTitle>{title}</PopupTitle>

        <TopQuestionWrapper>
          <MiddleQuestionWrapper>
            <Question
              title="근무일 수면 시간"
              description="근무일에는 몇시에 취침하고 몇시에 기상하시나요?"
            />
            {/* 시간 선택 시 취침 시간과 기상 시간을 전달합니다. */}
            <TimeSlider onSelect={handleWorkDayTimeSelect} />
          </MiddleQuestionWrapper>
        </TopQuestionWrapper>

        <TopQuestionWrapper>
          <MiddleQuestionWrapper>
            <Question
              title="휴무일 수면 시간"
              description="휴무일에는 몇시에 취침하고 몇시에 기상하시나요?"
            />
            {/* 시간 선택 시 취침 시간과 기상 시간을 전달합니다. */}
            <TimeSlider onSelect={handleDayOffTimeSelect} />
          </MiddleQuestionWrapper>
        </TopQuestionWrapper>

        <MiddleQuestionWrapper>
          <MiddleQuestionWrapper2>
            <Question
              title="수면 만족도"
              description="수면의 질에 대한 만족도를 나타내주세요."
            />
          </MiddleQuestionWrapper2>

          <SelectButtons
            value={sleepScore}
            onChange={handleSleepScoreChange}
            buttonColors={colors}
          />
        </MiddleQuestionWrapper>
        <PopupButton onClick={handleSaveClick}>저장</PopupButton>
      </Popup>
    </PopupContainer>
  );
};

export default SleepPopup;
