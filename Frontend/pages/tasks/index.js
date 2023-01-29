import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GET_ALL_TASKS } from '../../components/gql';
import TaskContainer from './components/TaskContainer';
import client from '../../components/apollo-client';

const Tasks = ({ allTasks }) => {
  const [tasksAll, setTasksAll] = useState([]);

  const router = useRouter();

  useEffect(() => {
    setTasksAll(allTasks.data.getAllTasks);
  }, []);

  const goMain = () => {
    router.push('/');
  };

  const goAddTask = () => {
    router.push('/tasks/addTask');
  };

  return (
    <InnerWrap>
      <TaskNav>
        <div>
          <AddTaskBtn onClick={goMain}>메인으로</AddTaskBtn>
        </div>
        <AddTaskBtn onClick={goAddTask}>Task 등록</AddTaskBtn>
      </TaskNav>
      {tasksAll.map(task => (
        <TaskContainer key={task._id} {...task} />
      ))}
    </InnerWrap>
  );
};

export async function getServerSideProps() {
  const allTasks = await client.query({
    query: GET_ALL_TASKS,
    fetchPolicy: 'network-only',
  });
  return {
    props: { allTasks },
  };
}

export default Tasks;

const InnerWrap = styled.div`
  width: 90%;
  height: 90%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem;
  overflow-y: scroll;
`;

const TaskNav = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const AddTaskBtn = styled.button``;
