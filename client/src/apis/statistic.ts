import { requestWithAuth } from '@/apis';
import { isEmptyObj } from '@/utils/object';

const ALL_STATISTIC_URL = '/statistics/all';
const SPEED_STATISTIC_URL = '/statistics/speed';
const SPEED_ACCURACY_URL = '/statistics/accuracy';

export const getAllStatistic = async () => {
  const res = await requestWithAuth.get(ALL_STATISTIC_URL);

  return res.data;
};

export const getSpeedStatistic = async ({ startDay, endDay }: { startDay: string; endDay: string }) => {
  const res = await requestWithAuth.get(`${SPEED_STATISTIC_URL}?startDay=${startDay}&endDay=${endDay}`);
  if (isEmptyObj(res.data.result.accuracyDataMap)) return null;
  return res.data.result.accuracyDataMap;
};

export const getAccuracyStatistic = async ({ startDay, endDay }: { startDay: string; endDay: string }) => {
  const res = await requestWithAuth.get(`${SPEED_ACCURACY_URL}?startDay=${startDay}&endDay=${endDay}`);

  if (isEmptyObj(res.data.result.accuracyDataMap)) return null;
  return res.data.result.accuracyDataMap;
};
