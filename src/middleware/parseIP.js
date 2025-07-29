export const parseIP = (event) => {
  try {
    const userIP = event.requestContext.identity.sourceIp;
    event.userIP = userIP;
  } catch {
    throw new Error('Error parsing User IP');
  }
};
