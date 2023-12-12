import { GlobeIcon, UserGroupIcon, UserIcon, HeartIcon, ChatAltIcon} from '@heroicons/react/outline';
import styles from '../../styles/Activity.module.css';
import { useContext } from 'react';
import { TransactionContext } from '../../operations/context';
import {shortner} from '../../settings/shortner'

function ActivityCard() {
  const { getPeerToPeerTransactions, currentAccount } = useContext(TransactionContext);
  
  const generateRandomAvatar = (currentAccount) =>{
    const randomAvatar = Math.floor(Math.random() * 1000)
    return `https://avatars.dicebear.com/api/adventurer/${randomAvatar + currentAccount}.svg`;
  }
  return (<div className={styles.container}>
          <div className={styles.tabContainer}>
            <p className={styles.tabTitle }> Activity </p>
            <div className={styles.navigationContainer}>
              <div className={styles.navigationItem} data-current> 
                <GlobeIcon className={styles.navigationIcon} />
              </div>
              <div className={styles.navigationItem}>
                <UserIcon className={styles.navigationIcon} />
              </div>
              <div className={styles.navigationItem}>
                <UserGroupIcon className={styles.navigationIcon} />
              </div>
            </div>
          </div>
          <div className={styles.feedList}>
            {getPeerToPeerTransactions.map(
              ({id, addressFrom, timestamp, message, addressTo}, index) =>(
              <div key={index} className={styles.feedItem}>
                <div className={styles.avatarContainer}>
                  <img className ={styles.avatarImage} src={generateRandomAvatar(currentAccount)} />
                </div>
                <div className={styles.feedDetails}>
                  <h3 className={styles.feedAuthor}>{shortner(addressFrom)} to {shortner(addressTo)} </h3>
                <span className={styles.feedCreatedAt}>
                  {timestamp}
                  <GlobeIcon className={styles.globeIcon} />
                </span>
                <p className={styles.feedBody}>{message}</p>
                </div>
                <div className={styles.feedCta}>
                  <HeartIcon className={styles.likeIcon} />
                  <ChatAltIcon className={styles.commentIcon} />
                </div>
              </div>
            ),
          
        
        )}
      </div>
    </div>
  )}
export default ActivityCard
