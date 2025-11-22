import { useEffect, useState } from 'react';
import GateOutPresentation from './gate-out.presentation';
import { doFetch } from '../../helper/api';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import {
  setDownloadingPaymentMethod, setPaymentMethod, setMember,
  setDownloadingPosConfig, setPosConfig, setDownloadingMember,
  clearMember
} from '../../store/exit/exit.slice';
import moment from 'moment';
import { isEmpty } from 'lodash';
import type { Member } from '../../types';

export default function GateOutContainer() {
  const POS_CODE = '002';
  const dispatch = useDispatch();
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [selectedVehicleType, setSelectedVehicleType] = useState<string>('');
  const [selectedVehicleNumber, setVehicleNumber] = useState<string>('');
  const [printErrorMessage, setPrintErrorMessage] = useState<string>('');
  const { posConfig, paymentMethod, member } = useSelector((state: RootState) => state.exit)

  const getPaymentMethod = async () => {
    try {
      dispatch(setDownloadingPaymentMethod(true));
      const res = await doFetch('/config/PAY_METHOD');
      dispatch(setPaymentMethod(res));
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(setDownloadingPaymentMethod(false));
    }
  }

  const fetchPosConfig = async () => {
    try {
      dispatch(setDownloadingPosConfig(true));
      const res = await doFetch(`/pos/${POS_CODE}`);
      dispatch(setPosConfig(res));
    } catch (error) {
      console.error("Failed to fetch pos config", error);
    } finally {
      dispatch(setDownloadingPosConfig(false));
    }
  }

  const setVehicleTypeFromMember = (member: Member) => {
    if (!isEmpty(member.vehicleDesc)) {
      console.log('select: ', member.vehicleDesc)
      return setSelectedVehicleType(member.vehicleDesc)
    } 
    return setSelectedVehicleType('')
  }
  const getMember = async (vehicleNo: string) => {
    const v = vehicleNo.toLocaleUpperCase().replace(/\s/g, '');
    try {
      dispatch(setDownloadingMember(true));
      const res = await doFetch(`/member/vehicle/${v}`);
      const transformedResult = {
        ...res,
        expiredDate: res.expiredDate
          ? moment(res.expiredDate).format('DD MMM yyyy')
          : ''
      }
      dispatch(setMember(transformedResult));
      setVehicleTypeFromMember(transformedResult)
    } catch (err) {
      dispatch(clearMember())
      console.error(err);
    } finally {
      dispatch(setDownloadingMember(false));
    }
  }

  const handleSubmitVehicleNo = (vehicleNo: string) => {
    if (isEmpty(vehicleNo)) {
      return
    }
    setPrintErrorMessage('');
    getMember(vehicleNo);
    // getRaces(vehicleNo);
  };

  useEffect(() => {
    fetchPosConfig();
    getPaymentMethod();
    const interval = setInterval(() => {
      setDate(moment().format("DD MMM YYYY"));
      setTime(moment().format("HH:mm:ss"));
    }, 1_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <GateOutPresentation
      date={date}
      time={time}
      member={member}
      posConfig={posConfig}
      paymentMethod={paymentMethod}
      printErrorMessage={printErrorMessage}
      setVehicleNumber={setVehicleNumber}
      selectedVehicleType={selectedVehicleType}
      handleSubmitVehicleNo={handleSubmitVehicleNo}
    />
  );
}
