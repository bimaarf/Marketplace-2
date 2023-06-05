export const CircleMenuModal = () => {
  return (
    <>
      <input type="checkbox" id="my-modal-help" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box bg-slate-800 transition-all delay-300 duration-300 ease-in-out">
          <div className="bg-slate-800 rounded-2xl p-2 pb-10">
            <div className="px-4 py-4border-b flex justify-between">
              <h1 className="text-xl font-semibold text-gray-300">Bantuan</h1>
              <i className="fa fa-ellipsis-v text-xl self-end text-gray-300"></i>
            </div>
            <div
              tabIndex="0"
              className="collapse  collapse-arrow border-b mt-4 hover:bg-gray-700 hover:border-b-gray-50 px-1 py-1 hover:rounded-lg">
              <div className="collapse-title text-lg font-medium text-gray-300">
                <i className=" fa fa-snowflake-o mr-1"></i>
                Hubungi Kami
              </div>
              <div className="collapse-content text-gray-300">
                <p>
                  Silahkan hubungi Customer Service kami di : 089587827495
                  (WhatsApp Only) Senin s/d Jum'at, pada pukul 09.00 WIB s/d
                  17.00 WIB.
                </p>
              </div>
            </div>
            <div
              tabIndex="0"
              className="collapse  collapse-arrow border-b mt-4 hover:bg-gray-700 hover:border-b-gray-50 px-1 py-1 hover:rounded-lg">
              <div className="collapse-title text-lg font-medium text-gray-300">
                <i className=" fa fa-snowflake-o mr-1"></i>
                Waktu Pembayaran
              </div>
              <div className="collapse-content text-gray-300">
                <p>
                  Batas waktu pembayaran yang kami tentukan sebagai berikut :
                </p>
                <p>
                  - Pembelian pada jam 08.00 WIB s/d 16.59 WIB (dihari yang
                  sama), kamu harus menyelesaikan PEMBAYARAN maksimal pada pukul
                  20.00 WIB.
                </p>
              </div>
            </div>
            <div
              tabIndex="0"
              className="collapse  collapse-arrow border-b mt-4 hover:bg-gray-700 hover:border-b-gray-50 px-1 py-1 hover:rounded-lg">
              <div className="collapse-title text-lg font-medium text-gray-300">
                <i className=" fa fa-snowflake-o mr-1"></i>
                Metode Pembayaran
              </div>
              <div className="collapse-content text-gray-300">
                <p>
                  Metode pembayaran melalui transfer Bank BCA : 6045089654825336
                  a/n Calvin Arya Buntara
                </p>
              </div>
            </div>
          </div>
          <div className="modal-action">
            <label htmlFor="my-modal-help" className="btn">
              Tutup
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
