import { Home } from "./home";

export default function Profile() {
  return (
    <main
      className="animate__animated animate__flash"
      style={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
        paddingLeft: "5%",
        paddingRight: "5%",
      }}
    >
      <Home />
    </main>
  );
}
