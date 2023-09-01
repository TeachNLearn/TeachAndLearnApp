import axios from 'axios';
import {DATA_LIMIT, months} from './globalContants';

export const getHeaders = (token: string) => {
  return {
    Authorization: `Bearer ${token}`,
    'Content-type': 'application/json',
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
  const dateWithOffset = new Date(timestampWithOffset);

  let hours = dateWithOffset.getHours();
  let minutes = dateWithOffset.getMinutes();

  let concatedTime;

  if (minutes < 10) {
    if (hours < 10) concatedTime = String('0' + hours + ':' + '0' + minutes);
    else concatedTime = String(hours + ':' + '0' + minutes);
  } else {
    if (hours < 10) concatedTime = String('0' + hours + ':' + minutes);
    else concatedTime = String(hours + ':' + minutes);
  }
  return concatedTime;
};

export async function autoGenerateImage(
  subject: string,
  tags: string[],
  topic?: string
) {
  // console.log(process.env.REACT_APP_UNSPASH_ACCESS_KEY);

  let res = await axios.get(
    `https://api.unsplash.com/search/photos?page=1&query=${subject}&client_id=s26KY0b_ODGcUA1jZP4aqy-NPGIYX5qa-z8ZwJg49VU`
  );

  const resultLength = res.data.results.length;

  if (res.data.results.length == 0) {
    console.log("Nothing from subject");

    if (tags?.length != 0) {
      for (let i = 0; i < tags?.length; i++) {
        console.log(`Checking tag ${i}`);
        res = await axios.get(
          `https://api.unsplash.com/search/photos?page=1&query=${tags[i]}&client_id=s26KY0b_ODGcUA1jZP4aqy-NPGIYX5qa-z8ZwJg49VU`
        );
        if (res.data.results.length != 0) break;
      }
    } else {
      console.log(`Checking Topic`);
      res = await axios.get(
        `https://api.unsplash.com/search/photos?page=1&query=${topic}&client_id=s26KY0b_ODGcUA1jZP4aqy-NPGIYX5qa-z8ZwJg49VU`
      );
    }
  }

  const randomImg = Math.floor(Math.random() * resultLength);
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

export const getReadableTime2 = (ISOString: string) => {
  const date = new Date(ISOString);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return String(hours + ':' + minutes);
};
