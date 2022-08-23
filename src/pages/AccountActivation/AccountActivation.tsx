import { useState } from 'react';

import { useLocation } from 'wouter';
import { ShieldCheck } from 'react-bootstrap-icons';
import { useMutation } from 'react-query';

import {
  AlternateLoader,
  AuthNotificationMessage,
  AuthNotificationMessageType,
  Button,
  ButtonAction,
  ButtonSize,
  SuccessAnimation,
} from '@/components';
import { activateAccount, ActivationResponseDto } from '@/api';
import styles from './AccountActivation.module.scss';
import { AxiosError } from 'axios';

export const AccountActivation = () => {
  const [, setLocation] = useLocation();

  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const [error, setError] = useState<string>('');

  const { mutate, isLoading } = useMutation(
    () => activateAccount(window.location.search.split('=')[1]),
    {
      onSuccess: () => {
        setIsSuccess(true);
      },
      onError: (err: AxiosError) => {
        const message = (err.response?.data as ActivationResponseDto).message!;
        setError(message);
      },
    },
  );

  const handleActivation = () => {
    mutate();
  };

  const handleSuccessfulActivation = () => {
    setLocation('/signin');
    localStorage.removeItem('activation');
  };

  return (
    <>
      <div className={styles.root}>
        {error && (
          <AuthNotificationMessage
            message={error}
            type={AuthNotificationMessageType.error}
          />
        )}
        <div className={styles.root__textContainer}>
          <span className={styles.root__text}>
            Thank you for registering on{' '}
            <span className={styles.root__logo}>raven</span>!
          </span>
          <span className={styles.root__text}>
            Activate your account by clicking the button below:
          </span>
        </div>
        <Button
          onClick={handleActivation}
          size={ButtonSize.small}
          action={ButtonAction.primary}
          Icon={ShieldCheck}
        >
          <div className={styles.root__submitContainer}>
            <span>Verify email</span>
            <AlternateLoader isLoading={isLoading} />
          </div>
        </Button>
      </div>
      <SuccessAnimation
        show={isSuccess}
        onAnimationFinish={handleSuccessfulActivation}
      />
    </>
  );
};
