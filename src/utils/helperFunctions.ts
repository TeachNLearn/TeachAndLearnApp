import {DATA_LIMIT} from './globalContants';

export const getHeaders = (token: string) => {
  return {
    Authorization: `Bearer ${token}`,
  };
};

export function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

export const checkMoreData = (
  arr: Array<any>,
  func: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  if (arr.length == 0) {
    func(false);
    return;
  } else if (arr.length % DATA_LIMIT != 0) {
    func(false);
    return;
  }
  func(true);
};
