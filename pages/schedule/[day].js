import Head from "next/head";
import NavbarLogged from "../../layout/navbar-logged";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Details() {
  const router = useRouter();
  const { day } = router.query;
  const [data, setData] = useState(null);
  const [id, setId] = useState("");

  const getDetailSchedule = async () => {
    const email = localStorage.getItem("email");
    const day = window.location.href.split("/").pop();

    const options = { method: "GET" };
    await fetch(
      `https://getjadwal.api.devcode.gethired.id/schedule?email=${email}&day=${day}`,
      options
    )
      .then((response) => response.json())
      .then((response) => setData(response.data))
      .catch((err) => console.error(err));
  };

  const del = async () => {
    const email = localStorage.getItem("email");
    const options = {
      method: "DELETE",
    };

    await fetch(
      `https://getjadwal.api.devcode.gethired.id/schedule?email=${email}&id=${id}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        document.getElementById("btnClose").click();
        getDetailSchedule();
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getDetailSchedule();
  }, []);
  return (
    <div>
      <Head>
        <title>Jadwal {day}</title>
      </Head>
      <NavbarLogged />
      <main className="container d-flex flex-column pb-5">
        <div className="d-flex justify-content-between mb-4">
          <div className="d-flex align-items-center gap-3">
            <a href="#" onClick={() => router.push("/home")} data-cy="btn-back">
              <img src="/img/back.svg" alt="back button" />
            </a>
            <h3 className="fw-bold fs-1 mb-0" data-cy="detail-title">
              {day == "monday"
                ? "Senin"
                : day == "tuesday"
                ? "Selasa"
                : day == "wednesday"
                ? "Rabu"
                : day == "thursday"
                ? "Kamis"
                : day == "friday"
                ? "Jumat"
                : false}
            </h3>
          </div>
          <button
            className="btn btn-primary rounded-pill fs-5 fw-bold  px-4 d-flex align-items-center gap-3"
            data-bs-toggle="modal"
            data-bs-target="#add"
            data-cy="btn-create-schedule"
          >
            <img src="/img/plus.svg" />
            <span>Tambah Mata Kuliah</span>
          </button>
        </div>
        <hr />
        {data != null && data.length > 0 ? (
          <div className="card-items py-4">
            {data.map((item, index) => {
              return (
                <div
                  className="card card-item flex-row rounded-12 d-flex justify-content-between align-items-center py-4 px-5 mb-3"
                  key={index}
                  data-cy="card-item-title"
                >
                  <p className="fs-5 mb-0">{item.title}</p>
                  <div className="d-flex gap-4 align-items-center">
                    <a href="javascript:void(0)">
                      <img src="/img/card-item-edit.svg" alt="edit" data-cy="card-item-edit" />
                    </a>
                    <a
                      href="javascript:void(0)"
                      data-bs-toggle="modal"
                      data-bs-target="#delete"
                      onClick={() => {
                        setId(item.id);
                      }}
                    >
                      <img
                        src="/img/card-item-delete.svg"
                        alt="delete"
                        data-cy="card-item-delete"
                      />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <img
            className="img-illus-empty align-self-center"
            src="/img/illus.svg"
            alt="empty illustration"
            data-cy="todo-empty-state"
          />
        )}
      </main>

      <div
        className="modal fade"
        id="delete"
        tabIndex="-1"
        aria-labelledby="deleteLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content" data-cy="form-add">
            {/* <div className="modal-header">
              <h5 className="modal-title fw-bold" id="deleteeLabel">
                Buat Jadwal Kuliah
              </h5>
              <button type="button" data-cy="close-modal"></button>
            </div> */}
            <div className="modal-body text-center pt-5 px-5">
              <img className="img-trash mb-4" src="/img/trash-illus.svg" alt="trash" />
              <h4 className="fw-bold mb-2">Hapus Mata Kuliah</h4>
              <p className="text-secondary-2">
                Apakah anda yakin menghapus mata kuliah Statistika?
              </p>
            </div>
            <div className="modal-footer border-0 d-flex justify-content-center gap-3">
              <button
                type="button"
                className="btn btn-secondary rounded-pill fw-bold"
                data-cy="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="btnClose"
              >
                Batal
              </button>
              <button
                type="button"
                className="btn btn-danger rounded-pill fw-bold"
                data-cy="btn-submit"
                onClick={() => del()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
