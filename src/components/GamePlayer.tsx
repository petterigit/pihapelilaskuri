import { Component, createSignal, useContext } from 'solid-js'
import { Player } from '../types'
import { TextButton } from './TextButton'
import { ModalContext } from './ModalContext'
import { NumberEditor } from './NumberEditor'
import { setPlayerMisses, setPlayerScore } from '../GameManager'
import { ChangeInformation } from './ChangeInformation'

interface Props {
  player: Player
}

export const GamePlayer: Component<Props> = (props) => {
  const [, { createModal }] = useContext(ModalContext)
  const [score, setScore] = createSignal<number>(0)
  const [misses, setMisses] = createSignal<number>(0)

  const handleEdit = () => {
    setScore(props.player.score)
    setMisses(props.player.misses)
    createModal({
      title: `Pelaaja: ${props.player.name}`,
      content: () => (
        <div class="mb-16">
          <h3 class="font-bold mb-2">Pisteet</h3>
          <NumberEditor value={score()} onChange={setScore} buttons={[1, 5]} />
          <ChangeInformation original={props.player.score} new={score()} />
          <h3 class="font-bold mt-8 mb-2">Ohi</h3>
          <NumberEditor value={misses()} onChange={setMisses} buttons={[1]} />
          <ChangeInformation original={props.player.misses} new={misses()} />
        </div>
      ),
      onOk: () => {
        setPlayerScore(props.player.id, score())
        setPlayerMisses(props.player.id, misses())
      },
    })
  }

  return (
    <div class="flex justify-stretch px-4 py-2">
      <div class="flex-grow">
        <p class="font-bold text-xl">{props.player.name}</p>
        <span class="mr-8">
          Pisteet: <span class="font-bold">{props.player.score}</span>
        </span>
        <span>
          Ohi: <span class="font-bold">{props.player.misses}</span>
        </span>
      </div>
      <div class="flex items-center">
        <TextButton text="Muokkaa" onClick={() => handleEdit()} />
      </div>
    </div>
  )
}
