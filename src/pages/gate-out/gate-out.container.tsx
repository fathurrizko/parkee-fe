import { useEffect, useState } from 'react';
import GateOutPresentation from './gate-out.presentation';
import { doFetch, post } from '../../helper/api';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import {
  setDownloadingPaymentMethod, setPaymentMethod, setMember,
  setDownloadingPosConfig, setPosConfig, setDownloadingMember,
  clearMember, setTariff, clearTariff, setCheckingClockOutTariff,
  setSelectedVoucherCode, setSelectedVoucherAmount, setSelectedPaymentMethod,
  setSubmitingClokOut
} from '../../store/exit/exit.slice';
import moment from 'moment';
import { isEmpty, toNumber } from 'lodash';
import { setVehicleType } from '../../store/gate/gate.slice';

export default function GateOutContainer() {
  const POS_CODE = '002';
  const dispatch = useDispatch();
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [selectedVehicleType, setSelectedVehicleType] = useState<string>('');
  const [selectedVehicleNumber, setVehicleNumber] = useState<string>('');
  const [printErrorMessage, setPrintErrorMessage] = useState<string>('');
  const {
    posConfig, paymentMethod, member, downloadingMember, tariff,
    selectedVoucherCode, selectedVoucherAmount, selectedPaymentMethod,
    submitingClockOut
  } = useSelector((state: RootState) => state.exit)

  const getPaymentMethod = async () => {
    try {
      dispatch(setDownloadingPaymentMethod(true));
      const res = await doFetch('/config/PAY_METHOD');
      dispatch(setPaymentMethod(res));
      dispatch(setSelectedPaymentMethod(res[0]?.value))
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setVehicleTypeFromMember = (res: any) => {
    if (!isEmpty(res.data)) {
      return setSelectedVehicleType(res.data.vehicleDescription)
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
    } catch (err) {
      dispatch(clearMember())
      console.error(err);
    } finally {
      dispatch(setDownloadingMember(false));
    }
  }

  const getClockOutTariff = async (vehicleNo: string) => {
    const v = vehicleNo.toLocaleUpperCase().replace(/\s/g, '');
    try {
      dispatch(setCheckingClockOutTariff(true))
      const res = await doFetch(`/clock-out/${v}`);
      if (res.success) {
        const transformedResult = {
          ...res.data,
          clockOut: moment(res.clockOut).format('DD MMM yyyy HH:mm:ss'),
          clockIn: moment(res.clockIn).format('DD MMM yyyy HH:mm:ss')
        }
        dispatch(setTariff(transformedResult));
      } else {
        dispatch(clearTariff(res.data));
        setPrintErrorMessage(res.message);
      }
      setVehicleTypeFromMember(res)

    } catch (err) {
      console.error(err);
    } finally {
      dispatch(setCheckingClockOutTariff(false))
    }
  }

  const handleSubmitVehicleNo = (vehicleNo: string) => {
    if (isEmpty(vehicleNo)) {
      return
    }
    setPrintErrorMessage('');
    getMember(vehicleNo);
    getClockOutTariff(vehicleNo);
  };

  const handleInput = (value: string | number, type: string) => {
    switch (type) {
      case 'vcode': {
        dispatch(setSelectedVoucherCode(value.toString()));
        break;
      }
      case 'vamt': {
        const maxValue = tariff?.billDetail?.billAmount || 0;
        if (Number(value) > maxValue) {
          value = maxValue;
        }
        if (Number(value) < 0) {
          value = 0;
        }
        dispatch(setSelectedVoucherAmount(toNumber(value)))
        break;

      }
      case 'paycode': {
        dispatch(setSelectedPaymentMethod(value.toString()))
        break;
      }
      default: break;
    }
  }

  const onPrintPressed = async () => {
    if (isEmpty(selectedVehicleNumber)) {
      return setPrintErrorMessage('Silakan isi Nomor Polisi Kendaraan');
    }

    try {
      dispatch(setSubmitingClokOut(true))
      const params = {
        clockOut: moment(tariff.clockOut).format('YYYY-MM-DD HH:mm:ss'),
        posCode: POS_CODE,
        paymentMethod: selectedPaymentMethod,
        ratesAmount: tariff.billDetail.billAmount,
        discountAmount: selectedVoucherAmount,
        transactionId: tariff.transactionId,
        vehicleNo: selectedVehicleNumber.toLocaleUpperCase().replace(/\s/g, '')
      }
      const response = await post('/clock-out/insert', params);
      if (response.success) {
        setVehicleNumber('');
        // dispatch(setSelectedPaymentMethod(''));
        dispatch(setSelectedVoucherAmount(0));
        dispatch(setSelectedVoucherCode(''));
        setSelectedVehicleType('');
        dispatch(clearTariff());
        dispatch(clearMember());
      } else {
        setPrintErrorMessage(response.message)
      }
    } catch (err) {
      console.error(err);

    } finally {
      dispatch(setSubmitingClokOut(false))

    }
  }

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
      tariff={tariff}
      member={member}
      posConfig={posConfig}
      paymentMethod={paymentMethod}
      printErrorMessage={printErrorMessage}
      selectedVehicleNumber={selectedVehicleNumber}
      setVehicleNumber={setVehicleNumber}
      selectedVehicleType={selectedVehicleType}
      handleSubmitVehicleNo={handleSubmitVehicleNo}
      onPrintPressed={onPrintPressed}
      downloadingMember={downloadingMember}
      submitingClockOut={submitingClockOut}

      selectedVoucherCode={selectedVoucherCode}
      selectedVoucherAmount={selectedVoucherAmount}
      selectedPaymentMethod={selectedPaymentMethod}
      handleInput={handleInput}
    />
  );
}
