import { useCallback, useEffect } from 'react';
import { Divider } from 'antd';
import { IQuestion } from '@page/User/Question';
import styles from './index.module.scss';
import likeSVG from '@/assets/img/like.svg';
import disLikeSVG from '@/assets/img/dislike.svg';
import inLikeSVG from '@/assets/img/inLike.svg';
import inDisLikeSVG from '@/assets/img/inDislike.svg';
import useCtrl, { Choice } from '@/hooks/useCTrl';

function QuestionCard({
  id,
  UserId,
  IsUserLike,
  Content,
  LikeNum,
  DislikeNum,
  handleUserLike,
  handleUserDislike,
} : any) {
  const [Ctrl, setChoice] = useCtrl();
  useEffect(() => {
    if (IsUserLike === null) {
      setChoice('PENDDING');
    }
    if (IsUserLike === true) {
      setChoice('LIKE');
    }
    if (IsUserLike === false) {
      setChoice('DISLIKE');
    }
  }, []);
  const handleLike = useCallback((choice: Choice) => {
    if (choice !== 'LIKE') {
      setChoice('LIKE');
      handleUserLike(id);
      return undefined;
    }
    setChoice('PENDDING');
    handleUserLike(id);
    return undefined;
  }, []);
  const handleDislike = useCallback((choice: Choice) => {
    if (choice !== 'DISLIKE') {
      setChoice('DISLIKE');
      handleUserDislike(id);
      return undefined;
    }
    handleUserDislike(id);
    setChoice('PENDDING');
    return undefined;
  }, []);
  return (
    <>
      <div className={styles['question-card']}>
        <div className={styles.info}>
          <div className={styles.id}>{id}</div>
          <div className={styles.content}>{Content}</div>
        </div>
        <div style={!localStorage.getItem('token') ? { pointerEvents: 'none' } : {}}>
          <Ctrl
            styles={styles}
            Like={LikeNum}
            DisLike={DislikeNum}
            likeSVG={likeSVG}
            disLikeSVG={disLikeSVG}
            inLikeSVG={inLikeSVG}
            inDisLikeSVG={inDisLikeSVG}
            handleLike={handleLike}
            handleDislike={handleDislike}
          />
        </div>
      </div>
      <Divider />
    </>
  );
}

export default QuestionCard;
