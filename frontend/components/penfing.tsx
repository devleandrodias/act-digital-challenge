import HashLoader from "react-spinners/HashLoader";

export function Pending() {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <HashLoader color="#50b860" />
    </div>
  );
}
