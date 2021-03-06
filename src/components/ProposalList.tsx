import { Badge, Box, LinkBox, LinkOverlay, Spinner } from '@chakra-ui/react';
import { useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';

import { ProposalStatus, useProposals } from '../hooks';

const colorForStatus = (status: ProposalStatus) => {
  switch (status) {
    case 'PENDING':
      return 'blue';
    case 'ACTIVE':
      return 'purple';
    case 'CANCELED':
      return 'red';
    case 'DEFEATED':
      return 'red';
    case 'QUEUED':
      return 'yellow';
    case 'EXPIRED':
      return 'red';
    case 'SUCCEEDED':
      return 'green';
    case 'EXECUTED':
      return 'green';
    default:
      return 'grey';
  }
};

export function ProposalList() {
  const { proposals, loading } = useProposals();
  const navigate = useNavigate();

  const goToProposal = useCallback(
    (id: string) => {
      navigate(`/proposals/${id}`);
    },
    [navigate]
  );

  if (loading) {
    return <Spinner />;
  }

  return (
    <Box flexDirection="column" gap="6px" display="flex">
      {proposals.map(proposal => (
        <LinkBox
          key={proposal.id}
          padding="16px"
          fontWeight="bold"
          borderWidth="1px"
          borderStyle="solid"
          borderColor="lightgrey"
          borderRadius="4px"
          cursor="pointer"
        >
          <LinkOverlay onClick={() => goToProposal(proposal.id)}>
            <Box justifyContent="space-between" display="flex">
              <ReactMarkdown>{proposal.description.split('\n')[0]}</ReactMarkdown>
              <Badge alignItems="center" display="flex" colorScheme={colorForStatus(proposal.status)}>
                {proposal.status}
              </Badge>
            </Box>
          </LinkOverlay>
        </LinkBox>
      ))}
    </Box>
  );
}
