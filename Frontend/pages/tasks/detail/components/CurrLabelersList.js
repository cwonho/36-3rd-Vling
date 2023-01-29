import styled from 'styled-components';
import Link from 'next/link';

export default function CurrLabelersList({
  currLabelersList,
  onDeleteLabeler,
}) {
  return (
    <CurrentLabelersWrap>
      <CurrentLabelersTitle>
        Current Labelers ({currLabelersList?.length}):
      </CurrentLabelersTitle>
      <CurrentLabelers>
        {currLabelersList?.map(labeler => (
          <CurrentListWrap key={labeler._id}>
            <LabelerListNav>
              <Link href={`/labeler/detail/${labeler._id}`}>
                <LabelerName>{labeler.email}</LabelerName>
              </Link>
              <AddButton
                value={labeler.email}
                onClick={e => onDeleteLabeler(e, labeler._id)}
              >
                삭제
              </AddButton>
            </LabelerListNav>
          </CurrentListWrap>
        ))}
      </CurrentLabelers>
    </CurrentLabelersWrap>
  );
}

const CurrentLabelersWrap = styled.div``;

const CurrentLabelersTitle = styled.h1`
  margin-bottom: 30px;
  font-size: 18px;
  font-weight: bold;
`;

const CurrentLabelers = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 70%;
  overflow-y: scroll;
`;

const CurrentListWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const LabelerListNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 3rem;
  padding: 1rem;
  border-bottom: 1px solid #fff;
`;

const LabelerName = styled.p`
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

const AddButton = styled.button``;
