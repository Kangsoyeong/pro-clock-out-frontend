import React, { useState } from "react";
import styled from "styled-components";

// 선택지 배열
const LIFESTYLE_LIST = [
  { id: 0, data: "건강한 삶" },
  { id: 1, data: "부유한 삶" },
  { id: 2, data: "발전하는 삶" },
  { id: 3, data: "목표를 잘 실천하는 삶" },
  { id: 4, data: "행복한 삶" },
];

const Lifelist = ({ onSelect }) => {
  // 선택된 항목 상태
  const [selectedItems, setSelectedItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(true); // Modal open state

  // 체크박스 상태 변경
  const handleCheckboxChange = (id) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(id)
        ? prevSelectedItems.filter((item) => item !== id)
        : [...prevSelectedItems, id]
    );
  };

  // "선택 저장" 버튼 클릭 시 호출
  const handleSaveSelection = () => {
    const selectedLifestyles = LIFESTYLE_LIST.filter((item) =>
      selectedItems.includes(item.id)
    );
    onSelect(selectedLifestyles); // 부모 컴포넌트로 선택된 항목 전달
    setIsModalOpen(false); // 저장 버튼 누르면 모달 닫기
  };

  // 오버레이 클릭 시 모달 닫기
  const handleOverlayClick = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <Overlay onClick={handleOverlayClick}>
          <Container onClick={(e) => e.stopPropagation()}>
            <Title>추구하는 삶</Title>
            <CheckboxList>
              {LIFESTYLE_LIST.map((item) => (
                <CheckboxItem key={item.id}>
                  <StyledLabel>
                    <StyledCheckbox
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleCheckboxChange(item.id)}
                    />
                    <CustomCheckbox checked={selectedItems.includes(item.id)} />
                    {item.data}
                  </StyledLabel>
                </CheckboxItem>
              ))}
            </CheckboxList>
            <SaveButton onClick={handleSaveSelection}>저장</SaveButton>
          </Container>
        </Overlay>
      )}
    </>
  );
};

//+ 버튼 눌렀을 때 배경 흐려지게 (컴포넌트화 해야함)
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4); // 배경 흐리게
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

//추구하는 삶 선택하는 팝업
const Container = styled.div`
  background-color: white;
  width: 30rem;
  height: 50rem;
  border-radius: 1rem;
  padding: 2rem;
  z-index: 1000;
  position: relative;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;
`;

//추구하는 삶 체크리스트
const CheckboxList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const CheckboxItem = styled.li`
  margin-bottom: 1rem;
  font-size: 1.8rem;
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const StyledCheckbox = styled.input`
  display: none; // 기본 체크박스 스타일 숨기기
`;

const CustomCheckbox = styled.span`
  width: 2rem;
  height: 2rem;
  display: inline-block;
  border: 2px solid #7aa2e3;
  border-radius: 4px;
  margin-right: 0.5rem;
  background-color: ${(props) => (props.checked ? "#7aa2e3" : "transparent")};
  position: relative;
  transition: background-color 0.2s ease;

  // 체크 상태에서 체크마크 추가
  &::after {
    content: "";
    position: absolute;
    left: 0.7rem;
    top: 0.4rem;
    width: 0.5rem;
    height: 0.8rem;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
    opacity: ${(props) => (props.checked ? 1 : 0)};
    transition: opacity 0.2s ease;
  }
`;

const SaveButton = styled.button`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: #458cff;
  font-weight: bold;
  color: white;
  font-size: 1.8rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
`;

export default Lifelist;
