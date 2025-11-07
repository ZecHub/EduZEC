import { createContext, useReducer } from 'react'
import { WebWallet, WalletSummary } from '@webzjs/webz-wallet';
import { Receive } from './Receive'

export type State = {
  webWallet?: WebWallet;
  activeAccount?: number;
  summary?: WalletSummary;
  chainHeight?: bigint;
  accountSeeds: Map<number, string>;
  syncInProgress: boolean;
  loading: boolean;
};

const initialState: State = {
  activeAccount: undefined,
  summary: undefined,
  chainHeight: undefined,
  accountSeeds: new Map<number, string>(),
  syncInProgress: false,
  loading: true,
};

export type Action =
  | { type: 'set-active-account'; payload: number }
  | { type: 'add-account-seed'; payload: [number, string] }
  | { type: 'set-web-wallet'; payload: WebWallet }
  | { type: 'set-summary'; payload: WalletSummary }
  | { type: 'set-chain-height'; payload: bigint }
  | { type: 'set-account-seeds'; payload: Map<number, string> }
  | { type: 'set-sync-in-progress'; payload: boolean }
  | { type: 'set-loading'; payload: boolean };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'set-active-account': {
      return { ...state, activeAccount: action.payload };
    }
    case 'add-account-seed': {
      return {
        ...state,
        accountSeeds: state.accountSeeds.set(
          action.payload[0],
          action.payload[1],
        ),
      };
    }
    case 'set-web-wallet': {
      return { ...state, webWallet: action.payload };
    }
    case 'set-summary': {
      return { ...state, summary: action.payload };
    }
    case 'set-chain-height': {
      return { ...state, chainHeight: action.payload };
    }
    case 'set-account-seeds': {
      return { ...state, accountSeeds: action.payload };
    }
    case 'set-sync-in-progress': {
      return { ...state, syncInProgress: action.payload };
    }
    case 'set-loading': {
      return { ...state, loading: action.payload };
    }
    default:
      return state;
  }
};

export const WalletContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => { } });

const AppWallet = () => {
  const [_state, _dispatch] = useReducer(reducer, initialState);

/*   useEffect(() => {
    init(state, dispatch)
  }, [dispatch]) */


  return (
    <div className="flex w-full">
      <div className="flex  p-20 w-full h-auto">
        <div className="flex flex-row bg-orange-300   w-full h-full">
          <div className='flex items-center justify-center w-1/2 bg-orange-500'>
            <Receive />
          </div>
          <div className='flex items-center justify-center w-1/2'>
            <h1>Test</h1>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AppWallet