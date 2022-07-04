import { LevelComponent } from "./components/Level";
import { Bottle } from "./game/bottle";
import { Color } from "./game/colors";
import { Level } from "./game/levels";

const testLevel: Level = {
  index: 0,
  state: [
    new Bottle(3, [Color.Cyan, Color.Blue, Color.Purple]),
    new Bottle(3, [Color.Cyan, Color.Red]),
    new Bottle(3, [Color.Red, Color.Red]),
    new Bottle(3, [Color.Purple]),
    new Bottle(1, [])
  ],
  start: []
};

export const App: React.FC = () => {
  return (
    <div className="flex flex-col">
      <header className="bg-sky-600 py-8 border-b-8 border-sky-700 text-center">
        <h1 className="text-4xl font-black text-sky-100">The Alchemist</h1>
      </header>
      <main>
        <LevelComponent index={testLevel.index} state={testLevel.state}/>
      </main>
    </div>
  );
};