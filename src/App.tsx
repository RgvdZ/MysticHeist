import { useState } from "react";

import GameScreen from "~/screens/GameScreen.tsx";
import IntroductionScreen from "~/screens/IntroductionScreen.tsx";

function App() {
    const [isGameStarted, setIsGameStarted] = useState(false);

    return (
        <>
            {isGameStarted ? <GameScreen /> : <IntroductionScreen onContinue={() => setIsGameStarted(true)} />}
        </>
    );
}

export default App;
