import Image from "next/image";

import WeatherWidget from "./components/WeatherWidget";

export default function Home() {
  return (
    <div className="container">
      <WeatherWidget/>
    </div>
  );
}
