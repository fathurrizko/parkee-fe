import './gate-in.css'
import type { VehicleType, PosConfig, Member } from '../../types';
import { ParkingTicket } from '../index';

type Props = {
  date: string;
  time: string;
  selectedVehicleType: string;
  selectedVehicleNumber: string;
  printErrorMessage: string;
  member: Member;
  posConfig: PosConfig;
  vehicleType: VehicleType[];
  downloadingPosConfig: boolean
  downloadingVehicleType: boolean
  downloadingMember: boolean
  checkingClockIn: boolean
  disablePrintButton: boolean
  savingTicket: boolean
  handleSubmitVehicleNo: (vehicleNo: string) => void;
  setSelectedVehicleType: (vehicleType: string) => void;
  setVehicleNumber: (vehicleType: string) => void;
  onPrintPressed: () => void;
};

export default function GateInPresentation({
  savingTicket,
  date,
  time,
  member,
  posConfig,
  vehicleType,
  selectedVehicleType,
  printErrorMessage,
  downloadingPosConfig,
  downloadingVehicleType,
  downloadingMember,
  checkingClockIn,
  disablePrintButton,
  selectedVehicleNumber,
  setSelectedVehicleType,
  handleSubmitVehicleNo,
  onPrintPressed,
  setVehicleNumber
}: Props) {
  return (
    <div className='container-fluid min-vh-100 min-vw-100 p-0 m-0'>
      <div className='header w-100 d-flex flex-column align-items-center justify-content-center'>
        {downloadingPosConfig
          ? <h5>Memuat Lokasi</h5>
          : <h5>{date} - {posConfig.posLocation}</h5>
        }
        <h1>{time}</h1>
      </div>

      <div className='content d-flex m-0 p-0'>
        <div className='content-left-container'>
          <div className='input-camera m-2 p-2 justify-content-center align-items-center'>
            <div className='box d-flex align-items-center justify-content-center'>Entrance cam 1</div>
            <div className='box d-flex align-items-center justify-content-center'>Entrance cam 2</div>
          </div>
          <div className='d-flex align-items-center gap-4 mx-2 p-2 input-vehicle-no'>
            <div className='col-2'>
              <div className="form-group">
                <label className="mb-1">Jenis Kendaraan</label>
                <select
                  className="form-select"
                  value={selectedVehicleType}
                  disabled={downloadingVehicleType}
                  onChange={(e) => setSelectedVehicleType(e.target.value)}
                >
                  {downloadingVehicleType
                    ? <option key={1}>Memuat..</option>
                    : vehicleType?.map(e => <option key={e.vehicleType} value={e.vehicleType}>{e.description}</option>)
                  }
                </select>
              </div>
            </div>
            <div className='col-10'>
              <div className='form-group flex-column'>
                <label className="form-label">Nomor Polisi</label>
                <input
                  type="text"
                  className="form-control"
                  style={{ width: '80%' }}
                  value={selectedVehicleNumber}
                  placeholder="B1123VMC"
                  onBlur={(e) => handleSubmitVehicleNo(e.target.value)}
                  onChange={(e) => setVehicleNumber(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='content-right-container p-2'>
          <div className='member'>
            <p className='text-center'>{downloadingMember ? 'Memuat member..' : 'Member'}</p>
            <div className='member-container'>
              <p>Nama</p><p>: {member.memberName ?? ''} </p>
              <p>Kedaluwarsa</p><p>: {member.expiredDate}</p>
              <p>Jenis Parkir</p><p>: {member.vehicleDesc}</p>
            </div>
          </div>
          <div className='flex-column d-flex align-items-center button-cont'>
            {checkingClockIn || savingTicket
              ? <p>Memuat</p>
              : <button
                className='btn btn-success btn-print'
                disabled={checkingClockIn || disablePrintButton}
                onClick={onPrintPressed}
              >Cetak Tiket</button>
            }
            {printErrorMessage && (
              <div>
                <p>{printErrorMessage}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="d-flex footer m-0 p-0 justify-content-between">
        <div className="d-flex flex-column justify-content-center m-0 px-2">
          <p className="m-0">Parkee System</p>
          <p className="m-0">{posConfig.posCode} {posConfig.posType} - v2.0.1</p>
        </div>

        <div className="d-flex align-items-center justify-content-end m-0 px-2 gap-2">
          <button>
            Conventional<br />(F1)
          </button>
          <button>
            Casual Member<br />(F12)
          </button>
          <button>
            Manual Entry<br />(F2)
          </button>
          <button>
            Manual Exit<br />(F11)
          </button>
        </div>
      </div>
      {/* <div id="ticket-print-area" style={{visibility: 'hidden'}}>
        <ParkingTicket
          clockIn="21 Nov 2025 09:15:00"
          vehicleType="Motor"
          vehicleNo="B 1234 CD"
        />
      </div> */}
    </div>
  );
}
