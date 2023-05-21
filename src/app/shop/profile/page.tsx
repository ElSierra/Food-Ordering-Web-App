import { Home } from "./home";

export default function Profile() {
  return (
    <main
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
