import moment from "moment";
import "moment/locale/vi";

export const momentToPost = (mDate: moment.Moment): string => {
  try {
    if (mDate && moment.isMoment(mDate)) {
      return mDate.format("YYYY-MM-DDTHH:mm:ss");
    }
    throw new Error();
  } catch {
    return undefined;
  }
};

export const dateToPost = (date: Date): string => {
  try {
    if (date) {
      const result = moment(date).format("YYYY-MM-DDTHH:mm:ss");
      return result;
    }
    throw new Error();
  } catch {
    return undefined;
  }
};

export const formatTimeInEntity = (date: string | Date) => {
  return moment.utc(date).local().locale("vi").format("LLL");
};

export const removeTime = (date: Date) => {
  return moment.utc(date).local().locale("vi").format("L");
};

export const momentDate = (date: string) => {
  return moment(date, "DD-MM-YYYY");
};

export const momentDateToDate = (date: string) => {
  return moment(date).toDate();
};

export const momentSubtractDays = (date: Date, days: number) => {
  return moment(date).subtract(days, "days");
};

export const momentSubtractMonths = (date: Date, months: number) => {
  return moment(date).subtract(months, "months");
};

export const displayDateTime = (date: Date) => {
  return moment(date).format("DD/MM/YYYY HH:mm");
};

export const displayDate = (date: Date | string) => {
  return moment(date).format("DD/MM/YYYY");
};

export const getStartOfDate = (date: Date) => {
  const dateDate = moment(date).startOf("day");
  const stringDate = moment(dateDate).format("YYYY-MM-DD HH:mm:ss");
  return moment.utc(stringDate).local().locale("vi").toDate();
};

export const getEndOfDate = (date: Date) => {
  const dateDate = moment(date).endOf("day");
  const stringDate = moment(dateDate).format("YYYY-MM-DD HH:mm:ss");
  return moment.utc(stringDate).local().locale("vi").toDate();
};
