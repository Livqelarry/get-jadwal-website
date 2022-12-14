import Head from "next/head";
import Navbar from "../layout/navbar";
import { useState } from "react";
import { useRouter } from "next/router";
import validator from "validator";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [statusBtn, setStatusBtn] = useState(true);

  const handleCheckin = () => {
    if (!validator.isEmail(email)) {
      document.getElementById("msgErrorEmail").classList.replace("d-none", "d-flex");
      document.getElementById("inputEmail").classList.add("form-control-danger");
      return false;
    }

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    };

    fetch("https://getjadwal.api.devcode.gethired.id/checkin", options)
      .then((response) => response.json())
      .then((response) => {
        localStorage.setItem("email", email);
        if (response.status === "Success") {
          router.push("/home");
        }
      })
      .catch((err) => console.error(err));
  };

  const checkEmail = (value) => {
    const input = document.getElementById("inputEmail");
    setEmail(value);
    document.getElementById("msgErrorEmail").classList.replace("d-flex", "d-none");
    if (value.length > 0) {
      input.classList.add("form-control--filled");
      setStatusBtn(false);
    } else {
      input.classList.remove("form-control--filled");
      setStatusBtn(true);
    }
  };

  return (
    <div>
      <Head>
        <title>Check In</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-5">
            <div className="card card-checkin d-flex flex-column align-items-stretch">
              <h2 className="h3 py-0 text-center fw-bold title-text" data-cy="text-login">
                Check In
              </h2>
              <div className="mb-4">
                <label className="mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  id="inputEmail"
                  type="email"
                  className="form-control  mb-2"
                  placeholder="Masukkan email anda"
                  value={email}
                  onChange={(e) => {
                    checkEmail(e.target.value);
                  }}
                  data-cy="input-email"
                />
                <div
                  id="msgErrorEmail"
                  className="d-none gap-2 align-items-center"
                  data-cy="error-email"
                >
                  <img src="/img/warning-red.svg" />
                  <p className="mb-0 text-danger">Format email tidak sesuai</p>
                </div>
              </div>
              <button
                id="btnStart"
                className="btn btn-primary rounded-pill fw-bold"
                onClick={() => handleCheckin()}
                data-cy="btn-login"
                disabled={statusBtn}
              >
                Mulai Sesi
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
