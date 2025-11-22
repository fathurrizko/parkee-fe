import './gate-out.css'
import type { Member, PaymentMethod, PosConfig } from '../../types';

type Props = {
  paymentMethod: PaymentMethod[];
  posConfig: PosConfig;
  member: Member;
  date: string;
  time: string;
  selectedVehicleType: string;
  printErrorMessage: string;
  setVehicleNumber: (vehicleType: string) => void;
  handleSubmitVehicleNo: (vehicleNo: string) => void;
}

export default function GateOutPresentation({
  date,
  time,
  member,
  posConfig,
  paymentMethod,
  printErrorMessage,
  selectedVehicleType,
  setVehicleNumber,
  handleSubmitVehicleNo,
}: Props) {
  return (
    <div className='container-fluid min-vh-100 min-vw-100 p-0 m-0'>
      <div className='upper w-100 d-flex flex-column align-items-center justify-content-center'>
        <h5>{date} - {posConfig.posLocation}</h5>
        <h1>{time}</h1>
      </div>
      <div className='middle d-flex m-0 p-0'>
        <div className='middle-left'>
          <div className='exit-cam m-2 p-2'>
            <div className='box d-flex align-items-center justify-content-center'>Entrance cam 1</div>
            <div className='box d-flex align-items-center justify-content-center'>Entrance cam 2</div>
            <div className='box d-flex align-items-center justify-content-center'>Exit cam 1</div>
            <div className='box d-flex align-items-center justify-content-center'>Exit cam 2</div>
          </div>
          <div className='d-flex flex-column align-items-center gap-2 mx-2 p-2 input-voucher'>
            <div className='w-100'>
              <div className='form-group flex-column'>
                <label>Nomor Polisi</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="B1123VMC"
                onBlur={(e) => handleSubmitVehicleNo(e.target.value)}
                onChange={(e) => setVehicleNumber(e.target.value)}
                />
              </div>
            </div>
            <div className='w-100 d-flex flex-row gap-4'>
              <div className="form-group col-lg-6">
                <label>Jenis Kendaraan</label>
                <select
                  className="form-select"
                  disabled={true}
                >
                  <option key={1}>{selectedVehicleType}</option>
                </select>
              </div>
              <div className="form-group col-lg-5">
                <label>Metode Pembayaran</label>
                {/* belum ada loading */}
                <select
                  className="form-select"
                  value={''}
                // onChange={(e) => setSelectedVehicleType(e.target.value)}
                >
                  {paymentMethod.map(e => (
                    <option key={e.value} value={e.value}>{e.value}</option>
                  ))}
                </select>
              </div>

            </div>
            <div className='w-100 d-flex flex-row gap-4'>
              <div className='form-group flex-column col-lg-6'>
                <label>Kode Voucher</label>
                <input
                  type="text"
                  className="form-control"
                  // style={{ width: '80%' }}
                  placeholder="PRKE|V01234"
                // onBlur={(e) => handleSubmitVehicleNo(e.target.value)}
                // onChange={(e) => setVehicleNumber(e.target.value)}
                />
              </div>
              <div className='form-group flex-column col-lg-5'>
                <label>Nominal Voucher</label>
                <input
                  type="text"
                  className="form-control"
                  inputMode='numeric'
                  // style={{ width: '80%' }}
                  placeholder="10000"
                // onBlur={(e) => handleSubmitVehicleNo(e.target.value)}
                // onChange={(e) => setVehicleNumber(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='middle-right'>
          right
            <p>Nama</p><p>: {member.memberName ?? ''} </p>

          {printErrorMessage && (
              <div>
                <p>{printErrorMessage}</p>
              </div>
            )}
        </div>
      </div>
      <div className="d-flex lower m-0 p-0 justify-content-between">
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
    </div>
  );
}
