import { useEffect } from 'react';
import GateOutPresentation from './gate-out.presentation';

export default function GateOutContainer() {
//   const [data, setData] = useState<string>("Loading...");

//   const fetchGateIn = useCallback(async () => {
//     try {
//       const res = await fetch('https://api.example.com/gate-in');
//       const json = await res.json();
//       setData(json.message);
//     } catch (e) {
//       setData("Failed to load");
//     }
//   }, []);

  useEffect(() => {
    console.log('gate out page run');
  }, []);

  return (
    <GateOutPresentation />
  );
}
