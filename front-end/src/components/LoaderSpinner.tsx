import { ClipLoader } from "react-spinners";

interface LoadingComponentProps {
  loading: boolean;
}

function LoadingComponent({ loading }: LoadingComponentProps) {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
    >
      <ClipLoader size={50} color={"#36D7B7"} loading={loading} />
    </div>
  );
}

export default LoadingComponent;
