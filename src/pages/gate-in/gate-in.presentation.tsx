import { useState } from 'react';
import './gate-in.css'

export default function GateInPresentation() {
  const [parkingType, setParkingType] = useState('');
  return (
    <div className='container-fluid min-vh-100 min-vw-100 p-0 m-0'>
      <div className='header bg-primary w-100 d-flex flex-column align-items-center justify-content-center'>
        <h1>This is datetime</h1>

        <h5>Main Entrance East Lobby</h5>

      </div>

      <div className='content d-flex m-0 p-0 justify-content-between'>
        <div style={{ width: '64%', backgroundColor: 'green' }}>
          <div style={{ height: '80%' }}>
            <h1>top left</h1>
          </div>
          <div className='d-flex align-items-center gap-4 p-2' style={{ height: '20%', backgroundColor: 'brown' }}>
            <div className='col-2'>
              <div className="form-group">
                <label className="mb-1">Jenis Kendaraan</label>
                <select
                  className="form-select"
                  value={parkingType}
                  onChange={(e) => setParkingType(e.target.value)}
                >
                  <option value="mobil">Mobil</option>
                  <option value="motor">Motor</option>
                  <option value="box">Box/Pick Up</option>
                  <option value="van">Van 5meter</option>
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
                  placeholder="B1123VMC"
                />
              </div>
            </div>
          </div>
        </div>
        <div style={{ width: '36%', backgroundColor: 'gray' }}>
          <div style={{ height: '80%' }}>

            <p>Member</p>
            <p>Nama </p>
            <p>Kedaluwarsa</p>
            <p>Jenis Parkir</p>
          </div>
          <div className='d-flex align-items-center justify-content-center' style={{ height: '20%' }}>
            <button>Cetak Tiket</button>
          </div>
        </div>
      </div>

      <div className="d-flex bg-warning footer m-0 p-0 justify-content-between">
        <div className="d-flex flex-column justify-content-center m-0 px-2 bg-secondary">
          <p className="m-0">Parkee System</p>
          <p className="m-0">v2.0.1</p>
        </div>

        <div className="bg-danger d-flex align-items-center justify-content-end m-0 px-2 gap-2">
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
