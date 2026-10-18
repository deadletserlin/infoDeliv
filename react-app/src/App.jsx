
import { useState } from 'react'

const dataLayanan = [
  {
    nama: 'Warung Sugema',
    wilayah: 'Bandung',
    kontak: '0813-1605-093',
    harga: 'Mulai Rp2.000-17.000',
  },
  {
    nama: 'Lestari',
    wilayah: 'Bandung',
    kontak: '0813-1330-8864',
    harga: 'Mulai Rp2.000-14.000',
  },
  {
    nama: 'Dongmoon',
    wilayah: 'Bandung / Jakarta',
    kontak: '0851-2104-0012',
    harga: 'Mulai Rp17.000',
  },
]

function App() {
  const [halaman, setHalaman] = useState('dashboard')
  const [layanan, setLayanan] = useState(dataLayanan)
  const [nama, setNama] = useState('')
  const [wilayah, setWilayah] = useState('')
  const [kontak, setKontak] = useState('')
  const [harga, setHarga] = useState('')

  function tambahLayanan(e) {
    e.preventDefault()

    setLayanan([
      ...layanan,
      { nama, wilayah, kontak, harga },
    ])

    setNama('')
    setWilayah('')
    setKontak('')
    setHarga('')
    setHalaman('layanan')
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <a
            className="navbar-brand fw-bold"
            href="#dashboard"
            onClick={() => setHalaman('dashboard')}
          >
            infoDeliv
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#menuNavigasi"
            aria-controls="menuNavigasi"
            aria-expanded="false"
            aria-label="Buka navigasi"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="menuNavigasi">
            <div className="navbar-nav ms-auto">
              <button
                className="nav-link btn"
                onClick={() => setHalaman('dashboard')}
              >
                Dashboard
              </button>
              <button
                className="nav-link btn"
                onClick={() => setHalaman('layanan')}
              >
                Daftar Layanan
              </button>
              <button
                className="nav-link btn"
                onClick={() => setHalaman('form')}
              >
                Tambah Layanan
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container py-4">
        {halaman === 'dashboard' && (
          <>
            <div className="p-4 p-md-5 mb-4 bg-light rounded-3">
              <h1 className="fw-bold">Selamat datang di infoDeliv!</h1>
              <p className="lead">
                Temukan informasi layanan delivery, daftar harga,
                kontak, dan wilayah tujuan dalam satu tempat.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => setHalaman('layanan')}
              >
                Lihat Layanan
              </button>
            </div>

            <h2 className="mb-3">Ringkasan Layanan</h2>
            <div className="row g-3">
              <div className="col-12 col-md-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">Total Layanan</h5>
                    <p className="display-5 fw-bold text-primary">
                      {layanan.length}
                    </p>
                    <p className="card-text">
                      Layanan delivery yang tercatat.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">Informasi Harga</h5>
                    <p className="card-text">
                      Lihat informasi harga awal setiap layanan.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">Wilayah Layanan</h5>
                    <p className="card-text">
                      Periksa wilayah yang dijangkau layanan delivery.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {halaman === 'layanan' && (
          <>
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
              <h1 className="fw-bold">Daftar Layanan</h1>
              <button
                className="btn btn-primary"
                onClick={() => setHalaman('form')}
              >
                + Tambah Layanan
              </button>
            </div>

            <div className="table-responsive">
              <table className="table table-bordered table-striped align-middle">
                <thead className="table-primary">
                  <tr>
                    <th>No.</th>
                    <th>Nama Layanan</th>
                    <th>Wilayah</th>
                    <th>Kontak</th>
                    <th>Harga Awal</th>
                  </tr>
                </thead>
                <tbody>
                  {layanan.map((item, index) => (
                    <tr key={`${item.nama}-${index}`}>
                      <td>{index + 1}</td>
                      <td>{item.nama}</td>
                      <td>{item.wilayah}</td>
                      <td>{item.kontak}</td>
                      <td>{item.harga}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {halaman === 'form' && (
          <>
            <h1 className="fw-bold mb-4">Tambah Layanan</h1>

            <form
              className="card shadow-sm p-3 p-md-4"
              onSubmit={tambahLayanan}
            >
              <div className="mb-3">
                <label htmlFor="nama" className="form-label">
                  Nama layanan
                </label>
                <input
                  id="nama"
                  className="form-control"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="wilayah" className="form-label">
                  Wilayah layanan
                </label>
                <input
                  id="wilayah"
                  className="form-control"
                  value={wilayah}
                  onChange={(e) => setWilayah(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="kontak" className="form-label">
                  Nomor kontak
                </label>
                <input
                  id="kontak"
                  className="form-control"
                  value={kontak}
                  onChange={(e) => setKontak(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="harga" className="form-label">
                  Informasi harga
                </label>
                <input
                  id="harga"
                  className="form-control"
                  placeholder="Contoh: Mulai Rp10.000"
                  value={harga}
                  onChange={(e) => setHarga(e.target.value)}
                  required
                />
              </div>

              <div className="d-flex flex-wrap gap-2">
                <button type="submit" className="btn btn-primary">
                  Simpan Layanan
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setHalaman('layanan')}
                >
                  Batal
                </button>
              </div>
            </form>
          </>
        )}
      </main>

      <footer className="bg-primary text-white text-center py-3 mt-4">
        <div className="container">
          <p className="mb-0">
            infoDeliv — Informasi Layanan Delivery
          </p>
        </div>
      </footer>
    </>
  )
}

export default App
