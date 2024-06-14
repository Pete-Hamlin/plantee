import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import Header from "../components/Header.tsx";

const PLANTS = [
  "African Violet",
  "Alocasia",
  "Aloe",
  "Amaryllis"
]

export default function Home() {
  const count = useSignal(3);
  return (
    <div>
      <Header />
      <div class="px-4 py-8 mx-auto bg-[#86efac]">
        <div class="max-w-screen-md mx-auto flex flex-col">
          <img
            class="my-6"
            src="/logo.svg"
            width="128"
            height="128"
            alt="the Fresh logo: a sliced lemon dripping with juice"
          />
          <h1 class="text-4xl font-bold">Welcome to Plantee</h1>
          <p class="my-4">
            Try adding a plant to get started.
          </p>
          <Counter count={count} />
          <ul>
            {PLANTS.map((name) => <li key={name}>{name}</li>)}
          </ul>
        </div>
        <div class="max-w-screen-md mx-auto flex flex-col justify-between relative">
          <button>Add</button>
          <button>Export</button>
        </div>
      </div>
    </div>
  );
}
