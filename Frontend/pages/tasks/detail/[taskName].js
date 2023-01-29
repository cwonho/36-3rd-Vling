import styled from 'styled-components';
import client from '../../../components/apollo-client';
import { useEffect, useState, useMemo } from 'react';
import { useMutation } from '@apollo/client';
import {
  TASK_DETAIL,
  GET_ALL_LABELERS,
  DELETE_TASK_OF_LABELER,
  ADD_TASK_TO_LABELER,
} from '../../../components/gql';
import DetailNav from './components/DetailNav';
import CurrLabelersList from './components/CurrLabelersList';
import AllLabelersList from './components/AllLabelersList';
import Progress from './components/Progress';

const TaskDetail = ({ taskName, allLabelers, taskInfo }) => {
  const [taskDetail, setTaskDetail] = useState([]);
  const [currLabelersList, setCurrLabelersList] = useState([]);
  const [labelersList, setLabelersList] = useState([]);

  const [deleteTaskOfLabeler] = useMutation(DELETE_TASK_OF_LABELER);
  const [addTaskToLabeler] = useMutation(ADD_TASK_TO_LABELER);

  if (taskDetail === undefined) {
    return;
  }

  const { status, totalVideos, doneVideos } = taskDetail;

  useEffect(() => {
    setTaskDetail(taskInfo.data.getTaskDetail);
    setCurrLabelersList(taskInfo.data.getTaskDetail.labelers);
    setLabelersList(allLabelers.data.getAllLabelers);
  }, []);

  const onDeleteLabeler = async (e, id) => {
    await deleteTaskOfLabeler({
      variables: { id: id, email: e.target.value, name: taskName },
    });

    setCurrLabelersList(
      currLabelersList.filter(labeler => labeler.email !== e.target.value)
    );
  };

  const onAddLabeler = async (e, id) => {
    await addTaskToLabeler({
      variables: { id: id, email: e.target.value, name: taskName },
    });

    setCurrLabelersList([
      ...currLabelersList,
      { _id: id, email: e.target.value },
    ]);
  };

  const ProgressCalculation = useMemo(() => {
    const rateNumber = ((doneVideos / totalVideos) * 100).toFixed(2);
    const rate = Math.round((doneVideos / totalVideos) * 100);

    return { rateNumber, rate };
  }, [doneVideos, totalVideos]);

  const { rateNumber, rate } = ProgressCalculation;

  return (
    <>
      <InnerWrap>
        <DetailNav {...taskDetail} />
        <LabelersInfoWrap>
          <CurrLabelersList
            taskName={taskName}
            currLabelersList={currLabelersList}
            onDeleteLabeler={onDeleteLabeler}
          />
          <AllLabelersList
            allLabelers={labelersList}
            currLabelersList={currLabelersList}
            onAddLabeler={onAddLabeler}
          />
        </LabelersInfoWrap>
        <ProgressInfo>
          <RateNumber>{rateNumber}%</RateNumber>
          <ProgressWrap>
            <FullBar status={status}></FullBar>
            <RateBar status={status} rate={rate}></RateBar>
          </ProgressWrap>
        </ProgressInfo>
        <Progress />
      </InnerWrap>
    </>
  );
};

export async function getServerSideProps({ params }) {
  const taskInfo = await client.query({
    query: TASK_DETAIL,
    variables: { name: params.taskName },
    fetchPolicy: 'network-only',
  });

  const allLabelers = await client.query({
    query: GET_ALL_LABELERS,
    fetchPolicy: 'network-only',
  });

  const taskName = params.taskName;

  return {
    props: { taskName, allLabelers, taskInfo },
  };
}

export default TaskDetail;

const InnerWrap = styled.div`
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem;
`;

const LabelersInfoWrap = styled.div`
  width: 100%;
  height: 70%;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-column-gap: 20px;
`;

const ProgressInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProgressWrap = styled.div`
  position: relative;
  width: 100%;
  margin: 10px 0;
`;

const RateNumber = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: #353b48;
`;

const FullBar = styled.div`
  position: absolute;
  max-width: 100%;
  height: 1rem;
  border: 0.5px solid
    ${props =>
      props.status
        ? 'linear-gradient(.25turn, #b0ff57, 50%, #32cb00)'
        : 'linear-gradient(.25turn, #ffff56, 50%, #c7b800)'};
  background-color: none;
`;

const RateBar = styled.div`
  position: relative;
  max-width: ${props => props.rate}%;
  height: 1rem;
  border: 0.5px solid
    ${props =>
      props.status
        ? 'linear-gradient(.25turn, #b0ff57, 50%, #32cb00)'
        : 'linear-gradient(.25turn, #ffff56, 50%, #c7b800)'};
  background: ${props =>
    props.status
      ? 'linear-gradient(.25turn, #b0ff57, 50%, #32cb00)'
      : 'linear-gradient(.25turn, #ffff56, 50%, #c7b800)'};
`;
