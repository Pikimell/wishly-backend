const parseGroups = (event) => {
  const claims = event.requestContext.authorizer.claims;
  const groups = claims['cognito:groups']
    ? claims['cognito:groups'].split(',')
    : [];
  return groups;
};

export const userAcces = (userGroups) => {
  return (event) => {
    const groups = parseGroups(event);
    const hasAccess = userGroups.some((el) => {
      return groups.includes(el);
    });
    return hasAccess || adminAccess(event);
  };
};
