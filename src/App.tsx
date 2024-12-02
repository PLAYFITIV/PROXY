import spashIcon from "@/assets/splash-icon.png";

function App() {
  window.location.href = "playfit-indivisualiv://";

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black">
      <img src={spashIcon} alt="Centered PNG" className="w-[200px]" />
    </div>
  );
}

export default App;
