import axios from 'axios';
import {DATA_LIMIT, months} from './globalContants';

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

export const getReadableDate = (ISODate: string) => {
  const readable = new Date(ISODate);
  const month = readable.getMonth();
  const date = readable.getDate();
  const year = readable.getFullYear();

  const monthLong = months[month];
  const fulldate = monthLong + ' ' + date;
  return fulldate;
};

function toHoursAndMinutes(totalMinutes: number) {
  const timezoneHours = Math.floor(totalMinutes / 60);
  const timezoneMinutes = totalMinutes % 60;

  // console.log(timezoneHours, timezoneMinutes);

  return {timezoneHours, timezoneMinutes};
}

export const getReadableTime = (ISODate: string) => {
  const date = new Date(ISODate);

  let timestampWithOffset = date.getTime();

  let diff = date.getTimezoneOffset();
  console.log('DIFF');
  console.log(diff);

  let unsignedDiff;

  if (diff > 0) {
    unsignedDiff = diff;
  } else {
    unsignedDiff = -diff;
  }

  const {timezoneHours, timezoneMinutes} = toHoursAndMinutes(unsignedDiff);

  const dateWithOffset = new Date(timestampWithOffset);

  const hours = dateWithOffset.getHours();
  let minutes = dateWithOffset.getMinutes();

  let exactHours;
  let exactMinutes;

  if (timezoneHours > hours) {
    if (diff < 0) {
      exactHours = 24 + hours - timezoneHours;
    } else {
      exactHours = 24 + hours + timezoneHours;
    }
  } else {
    if (diff < 0) {
      exactHours = hours - timezoneHours;
    } else {
      exactHours = hours + timezoneHours;
    }
  }

  if (timezoneMinutes > minutes) {
    if (diff < 0) {
      exactMinutes = 60 + minutes - timezoneMinutes;
    } else {
      exactMinutes = 60 + minutes + timezoneMinutes;
    }
  } else {
    if (diff < 0) {
      exactMinutes = minutes - timezoneMinutes;
    } else {
      exactMinutes = minutes + timezoneMinutes;
    }
  }

  let concatedTime;
  if (exactMinutes < 10) {
    concatedTime = String(exactHours + ':' + '0' + exactMinutes);
  } else {
    concatedTime = String(exactHours + ':' + exactMinutes);
  }
  return concatedTime;
};

export async function autoGenerateImage(topic: string) {
  // console.log(process.env.REACT_APP_UNSPASH_ACCESS_KEY);

  const res = await axios.get(
    `https://api.unsplash.com/search/photos?page=1&query=${topic}&client_id=s26KY0b_ODGcUA1jZP4aqy-NPGIYX5qa-z8ZwJg49VU`
  );
  const randomImg = Math.floor(Math.random() * 10);
  let img = res.data.results[randomImg].urls.full;
  if (!img) {
    for (let index = 0; index < res.data.results.length; index++) {
      if (res.data.results[randomImg].urls.full) {
        img = res.data.results[randomImg].urls.full;
        break;
      }
    }
  }
  return img;
}
