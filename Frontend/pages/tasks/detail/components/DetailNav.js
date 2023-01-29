import styled from 'styled-components';
import Link from 'next/link';
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { DELETE_TASK, UPDATE_TASK } from '../../../../components/gql';
import { toast } from 'react-toastify';
import DeleteModal from './DeleteModal';

const DetailNav = ({
  kind,
  status,
  expiration_date,
  totalVideos,
  doneVideos,
  name,
}) => {
  const [deleteModal, setDeleteModal] = useState(false);

  const router = useRouter();

  const [deleteTask] = useMutation(DELETE_TASK);
  const [updateTask] = useMutation(UPDATE_TASK);

  const onDeleteClick = () => {
    setDeleteModal(true);
  };

  const handleDeleteTask = async () => {
    try {
      await deleteTask({ variables: { name: name } });
      toast.success(`${name}이 삭제 되었습니다.`);
    } catch (err) {
      toast.error(err);
    }
    setDeleteModal(false);
    router.push('/tasks');
  };

  const setTaskDone = async () => {
    try {
      await updateTask({ variables: { name: name, status: !status } });
      toast.success(`"${name}" 을 완료하였습니다.`);
    } catch (err) {
      toast.error(err);
    }
    router.push('/tasks');
  };

  return (
    <DetailTop>
      <TaskInfo>
        <TaskNameNav>
          <TaskName>{name}</TaskName>
        </TaskNameNav>
        <TaskCategory>Kind: {kind}</TaskCategory>
        <ExpireDate>Exp.Date: {expiration_date}</ExpireDate>
      </TaskInfo>
      <ButtonsWrap>
        <Link href="/tasks">
          <GoBackBtn>뒤로가기</GoBackBtn>
        </Link>
        <DeleteBtn onClick={onDeleteClick}>Task 삭제</DeleteBtn>
        {deleteModal && (
          <DeleteModal
            taskName={name}
            taskKind={kind}
            expDate={expiration_date}
            setDeleteModal={setDeleteModal}
            handleDeleteTask={handleDeleteTask}
          />
        )}
        <CompleteBtn
          disabled={
            Math.round((doneVideos / totalVideos) * 100) == 100 &&
            status === false
              ? false
              : true
          }
          onClick={setTaskDone}
        >
          Task 완료
        </CompleteBtn>
      </ButtonsWrap>
    </DetailTop>
  );
};

export default React.memo(DetailNav);

const DetailTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const TaskInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const TaskNameNav = styled.div`
  display: flex;
  align-items: center;
`;
const TaskNameInput = styled.input`
  width: 100%;
  margin-bottom: 1rem;
  padding-bottom: 5px;
  font-size: 16px;
  border: none;
  border-bottom: 2px solid black;
  background-color: transparent;
  &:focus {
    outline: none;
  }
  &:focus::placeholder {
    color: transparent;
  }
`;

const CloseIcon = styled.img`
  width: 15px;
  height: 15px;
  margin-left: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
`;

const CheckIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
`;

const EditIcon = styled.img`
  width: 15px;
  height: 15px;
  margin-right: 10px;
  cursor: pointer;
`;

const TaskName = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const ExpireDate = styled.p`
  font-size: 14px;
  color: #353b48;
`;

const TaskCategory = styled(ExpireDate)`
  margin-bottom: 5px;
  font-size: 14px;
  color: #353b48;
`;

const ButtonsWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const GoBackBtn = styled.button`
  margin-right: 5px;
  cursor: pointer;
`;

const DeleteBtn = styled(GoBackBtn)`
  margin-top: 3px;
`;

const CompleteBtn = styled.button`
  margin-right: 5px;
  margin-top: 3px;
  cursor: ${props => (props.disabled ? 'null' : 'pointer')};
`;
