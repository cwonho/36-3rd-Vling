import React from 'react';
import styled from 'styled-components';
import ModalPortal from '../../../../components/ModalPortal';

export default function CreateModal({
  toggleModal,
  taskName,
  taskKind,
  expDate,
  labelerList,
  handleAddTask,
}) {
  return (
    <ModalPortal>
      <BlurWrap />
      <Wrap>
        <Title>Task를 등록 하시겠습니까?</Title>
        <Text>등록할 Task:</Text>
        <SubWrap>
          <Text>Name: </Text>
          <TextValue>{taskName}</TextValue>
          <Text>Kind: </Text>
          <TextValue>{taskKind}</TextValue>
          <Text>ExpDate: </Text>
          <TextValue>{expDate}</TextValue>
          <Text>Labelers ({labelerList.length}): </Text>
          {labelerList.map(labeler => (
            <TextValue key={labeler._id}>{labeler.email}</TextValue>
          ))}
        </SubWrap>
        <BtnWrap>
          <DeleteBtn onClick={handleAddTask}>등록하기</DeleteBtn>
          <CancleBtn onClick={toggleModal}>취소</CancleBtn>
        </BtnWrap>
      </Wrap>
    </ModalPortal>
  );
}

const Wrap = styled.div`
  background-color: #606060;
  width: 30%;
  height: 50%;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  border-radius: 15px;
  justify-content: space-between;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Title = styled.div`
  color: white;
  font-size: 1.4rem;
`;

const Text = styled.div`
  margin-top: 0.7rem;
  font-size: 1rem;
  color: #ccccff;
`;

const TextValue = styled.span`
  margin-top: 0.7rem;
  font-size: 1rem;
  color: #fff;
`;

const SubWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  border: 1px solid #ccccff;
  height: 9rem;
  border-radius: 7px;
  padding: 0.3rem;
  color: #ccccff;
  width: 400px;
  height: 250px;
`;

const BtnWrap = styled.div`
  display: flex;
`;

const DeleteBtn = styled.button`
  height: 3rem;
  width: 7rem;
  margin-right: 2rem;
`;

const CancleBtn = styled.button`
  height: 3rem;
  width: 7rem;
`;

const BlurWrap = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
`;
