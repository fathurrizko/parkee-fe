import './gate-out.css'
import type { Member, PaymentMethod, PosConfig, Tariff } from '../../types';

type Props = {
  paymentMethod: PaymentMethod[];
  tariff: Tariff;
  member: Member;
  posConfig: PosConfig;
  date: string;
  time: string;
  selectedVehicleType: string;
  printErrorMessage: string;
  selectedVehicleNumber: string
  selectedVoucherCode: string
  selectedPaymentMethod: string
  selectedVoucherAmount: number
  setVehicleNumber: (vehicleType: string) => void;
  handleSubmitVehicleNo: (vehicleNo: string) => void;
  onPrintPressed: () => void;
  downloadingMember: boolean;
  submitingClockOut: boolean;

  handleInput: (value: string | number, type: string) => void
}

export default function GateOutPresentation({
  date,
  time,
  tariff,
  member,
  posConfig,
  paymentMethod,
  printErrorMessage,
  selectedVehicleType,
  selectedVehicleNumber,
  setVehicleNumber,
  handleSubmitVehicleNo,
  onPrintPressed,
  handleInput,
  submitingClockOut,
  downloadingMember,
  selectedVoucherCode,
  selectedVoucherAmount,
  selectedPaymentMethod
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
                  value={selectedVehicleNumber}
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
                  value={selectedPaymentMethod}
                  // onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  onChange={(e) => handleInput(e.target.value, 'paycode')}
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
                  value={selectedVoucherCode}
                  placeholder="PRKE|V01234"
                  // onChange={(e) => setSelectedVoucherCode(e.target.value)}
                  onChange={(e) => handleInput(e.target.value, 'vcode')}
                />
              </div>
              <div className='form-group flex-column col-lg-5'>
                <label>Nominal Voucher</label>
                <input
                  type="number"
                  className="form-control"
                  value={selectedVoucherAmount}
                  placeholder="10000"
                  // min={0}
                  // max={tariff?.billDetail?.billAmount || 0}
                  onChange={(e) => handleInput(e.target.value, 'vamt')}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='middle-right p-2'>
          <div style={{ height: '85%' }}>
            <p className='text-center'>{downloadingMember ? 'Memuat member..' : 'Member'}</p>
            <div className='detail-container'>
              <p>Nama</p><p>: {member?.memberName} </p>
              <p>Kedaluwarsa</p><p>: {member?.expiredDate}</p>
              <p>Jenis Parkir</p><p>: {member?.vehicleDesc}</p>
            </div>
            <p className='text-center'>{downloadingMember ? 'Memuat..' : 'Waktu Masuk dan Keluar'}</p>
            <div className='member-container'>
              <p>Jam Masuk</p><p>: {tariff?.clockIn} </p>
              <p>Jam Keluar</p><p>: {tariff?.clockOut} </p>
              <p>Durasi</p> {tariff.billDetail ? <p>: {tariff?.billDetail?.hours || 0} Jam, {tariff?.billDetail?.minutes || 0} menit, {tariff?.billDetail?.seconds || 0} detik</p> : <p>:</p>}
              <p>Tarif per jam</p><p>: {tariff?.rates}</p>
              <p>Biaya Parkir</p><p>: {tariff?.billDetail?.billAmount}</p>
              <p>Voucher</p><p>: {tariff?.billDetail ? selectedVoucherAmount : null}</p>
            </div>
            {tariff?.billDetail && (
              <p className='text-center mt-4 gran-total'>
                Total Bayar {tariff?.billDetail?.billAmount - selectedVoucherAmount}
              </p>
            )}

          </div>

          <div className='flex-column d-flex align-items-center justify-content-center'>
            <button
              className='btn btn-success w-28'
              onClick={onPrintPressed}
              disabled={!!printErrorMessage || submitingClockOut}
            >
              {submitingClockOut ? 'Mengirim..' : 'Cetak'}
            </button>

            {printErrorMessage && (
              <div><p>{printErrorMessage}</p></div>
            )}
          </div>
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
