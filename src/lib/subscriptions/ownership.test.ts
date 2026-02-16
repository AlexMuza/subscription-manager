import { describe, expect, it, vi } from 'vitest';
import { filterOwnedSubscription } from './ownership';

describe('filterOwnedSubscription', () => {
  it('adds both id and user_id filters', () => {
    interface QueryMock {
      eq: (column: string, value: string) => QueryMock;
    }

    const eq = vi.fn();
    const query: QueryMock = { eq };
    eq.mockImplementation(() => query);

    filterOwnedSubscription(query, 'sub-1', 'user-1');

    expect(eq).toHaveBeenNthCalledWith(1, 'id', 'sub-1');
    expect(eq).toHaveBeenNthCalledWith(2, 'user_id', 'user-1');
  });
});
