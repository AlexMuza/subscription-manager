type EqChain<T> = {
  eq: (column: string, value: string) => T;
};

export function filterOwnedSubscription<T extends EqChain<T>>(
  query: T,
  subscriptionId: string,
  userId: string,
): T {
  return query.eq('id', subscriptionId).eq('user_id', userId);
}
