import { useEffect } from 'react';
import GateInPresentation from './gate-in.presentation';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { increment } from '../../store/gate/gate.slice';

export default function GateInContainer() {
  const dispatch = useDispatch();
  const counter = useSelector((state: RootState) => state.gate.counter);

  const handleIncrement = () => {
    dispatch(increment());
  };

  useEffect(() => {
    console.log('gate in page run');
  }, []);

  return (
    <GateInPresentation
      counter={counter}
      onIncrement={handleIncrement}
    />
  );
}
