/* eslint-disable no-param-reassign */
import {
  useConference,
  IconButton,
  Space,
  ConferenceName,
  useTheme,
  useCamera,
  useAudio,
} from '@dolbyio/comms-uikit-react';
import cx from 'classnames';
import React from 'react';

import Timer from '../Timer';

import styles from './MobileTopActionBar.module.scss';

const ua = navigator.userAgent;

const isDeviceTablet = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua);
const isDeviceMobile =
  /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua);

export const MobileTopActionBar = () => {
  const { conference } = useConference();
  const { isMobile, isMobileSmall } = useTheme();
  const { swapCamera } = useCamera();
  const { toggleMuteParticipants, isPageMuted } = useAudio();

  const reverseCamera = async () => {
    await swapCamera();
  };

  if (conference === null) {
    return null;
  }

  return (
    <Space
      testID="MobileTopActionBar"
      className={cx(styles.actionBar, { [styles.mobileSmall]: isMobileSmall })}
      pv={isMobile ? 's' : 'm'}
      ph={isMobile ? 's' : 'm'}
    >
      {(isDeviceMobile || isDeviceTablet) && (
        <Space className={styles.leftSection}>
          <IconButton icon="cameraReverse" onClick={reverseCamera} />
        </Space>
      )}
      <Space className={styles.middleSection}>
        <Space>
          <ConferenceName type="h6" />
        </Space>
        <Space>
          <Timer />
        </Space>
      </Space>
      <Space className={styles.rightSection}>
        <IconButton icon={isPageMuted ? 'speakerOff' : 'speaker'} onClick={toggleMuteParticipants} />
      </Space>
    </Space>
  );
};
