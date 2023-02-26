import React from 'react';
import { Timeline } from 'react-twitter-widgets';

import styles from './TwitterTimeline.module.scss';

export const TwitterTimeline = () => (
    <>
        <a href="https://twitter.com/brianbehrens" className="header-bar">
            <h2 className="header-bar__text">Tweets</h2>
        </a>
        <div className={styles.timeline}>
            <Timeline
                dataSource={{
                    sourceType: 'profile',
                    screenName: 'brianbehrens',
                }}
                // https://developer.twitter.com/en/docs/twitter-for-websites/timelines/guides/parameter-reference
                options={{
                    chrome: 'noborders nofooter noheader noscrollbar transparent',
                    dnt: true,
                    showReplies: false,
                    theme: 'dark',
                    tweetLimit: 5,
                }}
            />
        </div>
    </>
);
