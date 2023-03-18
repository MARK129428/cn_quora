/* eslint-disable no-shadow */
import { useState } from 'react';

export type Choice = 'PENDDING' | 'LIKE' | 'DISLIKE'

function useCtrl(): [Function, React.Dispatch<React.SetStateAction<Choice>>] {
  const [choice, setChoice] = useState<Choice>('PENDDING');
  function Ctrl({
    styles,
    Like,
    DisLike,
    likeSVG,
    disLikeSVG,
    inLikeSVG,
    inDisLikeSVG,
    handleLike,
    handleDislike,
  } : any): JSX.Element {
    return (
      <div className={styles.ctrl}>
        <div
          role="presentation"
          className={styles.like}
          onClick={() => { handleLike(choice); }}
        >
          { choice === 'LIKE'
            ? (
              <img
                src={inLikeSVG}
                alt="稀饭"
              />
            )
            : (
              <img
                src={likeSVG}
                alt="稀饭"
              />
            )}
          {Like}
        </div>
        <div
          role="presentation"
          className={styles.dislike}
          onClick={() => { handleDislike(choice); }}
        >
          { choice === 'DISLIKE' ? (
            <img
              src={inDisLikeSVG}
              alt="漏漏漏"
            />
          )
            : (
              <img
                src={disLikeSVG}
                alt="漏漏漏"
              />
            )}
          {DisLike}
        </div>
      </div>
    );
  }
  // const MemoCtrl = useCallback(Ctrl, [choice]);
  return [Ctrl, setChoice];
}

export default useCtrl;
