import { useEffect, useState } from 'react';
import GateInPresentation from './gate-in.presentation';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import {
  setDownloadingVehicleType, setDownloadingPosConfig,
  setVehicleType, setPosConfig, setDownloadingMember,
  setMember, clearMember, setCheckingClockIn
} from '../../store/gate/gate.slice';
import { isEmpty } from 'lodash';
import { post, doFetch } from '../../helper/api';
import moment from 'moment';
import type { Member } from '../../types';

export default function GateInContainer() {
  const dispatch = useDispatch();
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [selectedVehicleNumber, setVehicleNumber] = useState<string>('');
  const [printErrorMessage, setPrintErrorMessage] = useState<string>('');
  const [selectedVehicleType, setSelectedVehicleType] = useState<string>('');
  const [isDisabledPrintButton, setPrintButtonDisabled] = useState<boolean>(false);
  const {
    member,
    posConfig,
    vehicleType,
    downloadingMember,
    downloadingPosConfig,
    downloadingVehicleType,
    checkingClockIn
  } = useSelector((state: RootState) => state.gate);
  const POS_CODE = '001';

  const setVehicleTypeFromMember = (member: Member) => {
    if (!isEmpty(member.vehicleType)) {
      setSelectedVehicleType(member.vehicleType)
    }
  }
  const getMember = async (vehicleNo: string) => {
    const v = vehicleNo.toLocaleUpperCase();
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

  const getClockIn = async (vehicleNo: string) => {
    const v = vehicleNo.toLocaleUpperCase();
    try {
      dispatch(setCheckingClockIn(true));
      const res = await doFetch(`/clock-in/${v}`);
      if (res.isClockIn) {
        setPrintButtonDisabled(true);
        const clockInDate = moment(res.clockInDate).format('DD MMM YYYY HH:mm:ss');
        setPrintErrorMessage('Sudah Parkir sejak ' + clockInDate);
      } else {
        setPrintButtonDisabled(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(setCheckingClockIn(false));
    }
  }

  const handleSubmitVehicleNo = (vehicleNo: string) => {
    if (isEmpty(vehicleNo)) {
      return
    }
    setPrintErrorMessage('');
    getMember(vehicleNo);
    getClockIn(vehicleNo);
  };

  const fetchVehicleType = async () => {
    try {
      dispatch(setDownloadingVehicleType(true));
      const res = await doFetch('/vehicle/active');
      dispatch(setVehicleType(res));
      setSelectedVehicleType(res[0]?.vehicleType);
    } catch (error) {
      console.error("Failed to fetch vehicle types", error);
    } finally {
      dispatch(setDownloadingVehicleType(false));
    }
  }

  const onPrintPressed = async () => {
    if (isEmpty(selectedVehicleNumber)) {
      return setPrintErrorMessage('Silakan isi Nomor Polisi Kendaraan');
    }

    const body = {
      posCode: POS_CODE,
      vehicleType: selectedVehicleType,
      vehicleNo: selectedVehicleNumber
    }
    await post('/clock-in/insert', body);
  }

  const fetchPosConfig = async () => {
    try {
      dispatch(setDownloadingPosConfig(true));
      const res = await fetch(`http://localhost:9001/api/pos/${POS_CODE}`);
      const json = await res.json();
      dispatch(setPosConfig(json));
    } catch (error) {
      console.error("Failed to fetch pos config", error);
    } finally {
      dispatch(setDownloadingPosConfig(false));
    }
  }

  useEffect(() => {
    fetchPosConfig();
    fetchVehicleType();
    const interval = setInterval(() => {
      setDate(moment().format("DD MMM YYYY"));
      setTime(moment().format("HH:mm:ss"));
    }, 1_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <GateInPresentation
      printErrorMessage={printErrorMessage}
      date={date}
      time={time}
      member={member}
      posConfig={posConfig}
      vehicleType={vehicleType}
      selectedVehicleType={selectedVehicleType}
      setSelectedVehicleType={setSelectedVehicleType}
      downloadingPosConfig={downloadingPosConfig}
      downloadingVehicleType={downloadingVehicleType}
      downloadingMember={downloadingMember}
      checkingClockIn={checkingClockIn}
      disablePrintButton={isDisabledPrintButton}
      handleSubmitVehicleNo={handleSubmitVehicleNo}
      setVehicleNumber={setVehicleNumber}
      onPrintPressed={onPrintPressed}
    />
  );
}
