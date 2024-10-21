import Userform from "./components/Userform";
import PageTwo from "./components/PageTwo";

export default function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="flex flex-col items-center">
      <Userform />
      <PageTwo />
    </div>
  </div>
  );
}
