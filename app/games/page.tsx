// components
import GameItem from '@/components/gameItem/GameItem'

export default function GamesPage() {

    return (
        <div className="page games-page">
            <div className="page__header">
                <h2>게임목록</h2>
            </div>

            <ul className="games-page__game-list">
                <li>
                    <GameItem/>
                </li>
                <li>
                    <GameItem/>
                </li>
                <li>
                    <GameItem/>
                </li>
            </ul>
        </div>
    )
}