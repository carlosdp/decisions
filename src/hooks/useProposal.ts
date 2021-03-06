import { useEffect, useState } from 'react';

import { ProposalStatus } from './useProposals';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const querySubgraph = (query: string, variables: Record<string, any>) => {
  return fetch('https://api.studio.thegraph.com/query/344/ens-governance/v0.1.2', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
};

export type ProposalDetails = {
  id: string;
  description: string;
  status: ProposalStatus;
};

export function useProposal(id: string) {
  const [proposal, setProposal] = useState<ProposalDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await querySubgraph(
          `
          query GetProposal($id: String!) {
            proposal(id: $id) {
              id
              description
              status
            }
          }
        `,
          { id }
        );

        const body = await res.json();

        setProposal(body.data.proposal);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  return { proposal, loading };
}
