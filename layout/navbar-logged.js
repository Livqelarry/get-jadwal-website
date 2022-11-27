import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function NavbarLogged() {
  const router = useRouter();
  const [email, setEmail] = useState("yourmail@mail.com");
  const logout = () => {
    localStorage.clear();
    router.push("/");
  };

  const checkloggin = () => {
    const email = localStorage.getItem("email");
    if (email == null) {
      router.push("/");
    }
  };
  useEffect(() => {
    setEmail(localStorage.getItem("email"));
    checkloggin();
  }, []);

  return (
    <div className="navbar navbar--logged text-white">
      <div className="container d-flex justify-content-between align-items-center">
        <h1 className="fw-bold display-6 navbar__text-logo">GetJadwal</h1>
        <button onClick={() => logout()} className="btn btn-primary fs-5 fw-bold btn-checkout">
          Check out | {email}
        </button>
      </div>
    </div>
  );
}
