import { setGameState } from '../GameManager'

export const AddPlayersLargeButton = () => {
  return (
    <div class="h-26">
      <button
        onClick={() => setGameState('adding-players')}
        class="flex pt-24 flex-col justify-center items-center w-full"
      >
        <svg class="h-48 w-48 i-tabler-user-plus"> </svg>
        <p>Lisää pelaajia</p>
      </button>
    </div>
  )
}
