import type { ClaimEvent, Detail, StartKyoku, Tile } from './data'
import { TileUtils } from './utils'

interface Hand {
  tehai: Tile[]
  tsumo: Tile
  claimed: ClaimEvent[]
}

interface Discard {
  tiles: DiscardTile[]
}

interface DiscardTile {
  type: 'normal' | 'riichi'
  pai: Tile
  tsumogiri: boolean
  claimed: boolean
}

interface GameInfo {
  bakaze: 'E' | 'S'
  kyoku: number
  honba: number
  kyotaku: number
  heroId: number
  doraMarkers: Tile[]
  uraMarkers: Tile[]
  scores: number[]
  deltasQueue: number[][]
  endOfKyoku: boolean
}

interface MortalReview {
  show: boolean
  tehaiProb: { [key: string]: number }
  tsumoProb: number
  isEqual: boolean
  claimAdvice: Detail[]
}

class UIState {
  hands: Hand[] = []
  discards: Discard[] = []
  info: GameInfo = {
    bakaze: 'E',
    kyoku: 1,
    honba: 0,
    kyotaku: 0,
    heroId: 0,
    doraMarkers: [],
    uraMarkers: [],
    scores: [],
    deltasQueue: [],
    endOfKyoku: false,
  }

  mortalReview: MortalReview = {
    show: false,
    tehaiProb: {},
    tsumoProb: 0,
    isEqual: true,
    claimAdvice: [],
  }

  constructor(event?: StartKyoku) {
    if (event) {
      const {
        tehais,
        bakaze,
        kyoku,
        honba,
        kyotaku,
        heroId,
        dora_marker,
        scores,
      } = event

      for (const [actor, tehai] of tehais.entries()) {
        const position = TileUtils.getRelativePosition(heroId, actor)
        const handTiles = tehai.map(tile => TileUtils.get(tile))
        TileUtils.sort(handTiles)
        this.hands[position] = { tehai: handTiles, tsumo: '', claimed: [] }
        this.discards[position] = { tiles: [] }
      }

      const normalizedScores: number[] = []

      for (let i = 0; i < 4; i++) normalizedScores[i] = scores[(i + heroId) % 4]

      this.info = {
        bakaze,
        kyoku,
        honba,
        kyotaku,
        heroId,
        doraMarkers: [TileUtils.get(dora_marker)],
        uraMarkers: [],
        scores: normalizedScores,
        deltasQueue: [],
        endOfKyoku: false,
      }
    }
  }
}

export { UIState }
export type { GameInfo, MortalReview }
