import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Navbar() {
  const router = useRouter();
  const checkloggin = () => {
    const email = localStorage.getItem("email");
    if (email != null) {
      router.push("/home");
    }
  };
  useEffect(() => {
    checkloggin();
  }, []);
  return (
    <div className="navbar text-white">
      <div className="container d-flex justify-content-center align-items-center">
        <h1 className="fw-bold display-6 navbar__text-logo">GetJadwal</h1>
      </div>
    </div>
  );
}
