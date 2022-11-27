import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import NavbarLogged from "../../layout/navbar-logged";

export default function Home() {
  const [schedule, setSchedule] = useState(null);
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];
  const [monday, setMonday] = useState(null);
  const [tuesday, setTuesday] = useState(null);
  const [wednesday, setWednesday] = useState(null);
  const [thursday, setThursday] = useState(null);
  const [friday, setFriday] = useState(null);

  const [mataKuliah, setMataKuliah] = useState("");
  const [dayMatkul, setDayMatkul] = useState("");

  const getAllSchedule = async () => {
    const email = localStorage.getItem("email");
    const options = { method: "GET" };

    await fetch(`https://getjadwal.api.devcode.gethired.id/schedule?email=${email}`, options)
      .then((response) => response.json())
      .then((response) => setSchedule(response.data))
      .then(() => {
        days.forEach((day) => {
          getDaySchedule(day);
        });
      })
      .catch((err) => console.error(err));
  };

  const getDaySchedule = async (day) => {
    const email = localStorage.getItem("email");
    const options = { method: "GET" };

    await fetch(
      `https://getjadwal.api.devcode.gethired.id/schedule?email=${email}&day=${day}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        if (day === "monday") {
          setMonday(response.data);
        } else if (day === "tuesday") {
          setTuesday(response.data);
        } else if (day === "wednesday") {
          setWednesday(response.data);
        } else if (day === "thursday") {
          setThursday(response.data);
        } else if (day === "friday") {
          setFriday(response.data);
        }
      })
      .catch((err) => console.error(err));
  };

  const addSchedule = async () => {
    const email = localStorage.getItem("email");
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: mataKuliah,
        day: dayMatkul,
      }),
    };

    fetch("https://getjadwal.api.devcode.gethired.id/schedule?email=" + email, options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        getAllSchedule();
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    getAllSchedule();
  }, []);
  return (
    <div className="home-page">
      <Head>
        <title>Home - GetJadwal</title>
      </Head>
      <NavbarLogged />

      <main className="container d-flex flex-column">
        <button
          className="btn btn-primary rounded-pill fs-5 fw-bold ms-auto mb-5 px-4 d-flex align-items-center gap-3"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <img src="/img/plus.svg" />
          <span>Buat Jadwal Kuliah</span>
        </button>
        <div className="schedules d-flex gap-3 justify-content-between">
          {schedule == null ? (
            false
          ) : (
            <>
              <CardJadwal dayEn="monday" day="Senin" matkul={schedule.monday} />
              <CardJadwal dayEn="tuesday" day="Selasa" matkul={schedule.tuesday} />
              <CardJadwal dayEn="wednesday" day="Rabu" matkul={schedule.wednesday} />
              <CardJadwal dayEn="thursday" day="Kamis" matkul={schedule.thursday} />
              <CardJadwal dayEn="friday" day="Jumat" matkul={schedule.friday} />
            </>
          )}
        </div>
        <div className="wrapper-list-schedules pb-5">
          <div className="list-schedules d-flex gap-3 justify-content-between">
            {schedule == null ? (
              false
            ) : (
              <>
                <CardListJadwal matkul={monday} />
                <CardListJadwal matkul={tuesday} />
                <CardListJadwal matkul={wednesday} />
                <CardListJadwal matkul={thursday} />
                <CardListJadwal matkul={friday} />
              </>
            )}
          </div>
        </div>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content" data-cy="form-add">
              <div className="modal-header">
                <h5 className="modal-title fw-bold" id="exampleModalLabel">
                  Buat Jadwal Kuliah
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  data-cy="close-modal"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="fw-bold mb-1" htmlFor="mataKuliah">
                    Mata Kuliah
                  </label>
                  <input
                    type="text"
                    className="form-control form-control--filled"
                    placeholder="Masukkan Mata Kuliah"
                    data-cy="form-matkul"
                    value={mataKuliah}
                    onChange={(e) => {
                      setMataKuliah(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label className="fw-bold mb-1" htmlFor="mataKuliah">
                    Pilih hari
                  </label>
                  <select
                    className="form-select form-control form-control--filled"
                    aria-label="Default select example"
                    data-cy="form-day"
                    value={dayMatkul}
                    onChange={(e) => {
                      setDayMatkul(e.target.value);
                    }}
                  >
                    <option selected>Pilih Hari</option>
                    <option value="monday">Senin</option>
                    <option value="tuesday">Selasa</option>
                    <option value="wednesday">Rabu</option>
                    <option value="thursday">Kamis</option>
                    <option value="friday">Jumat</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary ms-auto rounded-pill"
                  data-cy="btn-submit"
                  onClick={() => {
                    addSchedule();
                  }}
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export function CardJadwal(props) {
  return (
    <Link href={`/schedule/${props.dayEn}`} className="card card-schedule mb-4">
      <div data-cy="card-day">
        <h3 className="fw-bold" data-cy={`card-title-${props.day}`}>
          {props.day}
        </h3>
        {props.matkul > 0 ? (
          <p className="card-subtitle mb-0 text-primary fs-6" data-cy={`card-desc-${props.day}`}>
            {props.matkul} Mata Kuliah
          </p>
        ) : (
          <p className="card-subtitle mb-0 text-secondary fs-7" data-cy={`card-desc-${props.day}`}>
            Belum ada mata kuliah
          </p>
        )}
      </div>
    </Link>
  );
}

export function CardListJadwal(props) {
  if (props.matkul !== null) {
    return (
      <div
        className={`card card-list-schedule d-flex flex-column gap-2 ${
          props.matkul.length == 0 ? "p-0" : false
        }`}
      >
        {props.matkul.map((data, index) => {
          return (
            <div className="p-3 bg-secondary rounded-12" key={index}>
              <span>{data.title}</span>
            </div>
          );
        })}
      </div>
    );
  }
}
