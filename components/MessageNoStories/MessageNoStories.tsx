'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

type MessageNoStoriesProps = {
  text?: string;
  buttonText?: string;
  route?: '/stories' | '/new-story' | string;
  // Опціональний обробник кліку (замінює стандартну навігацію).
  onClick?: () => void;
};

const MessageNoStories = ({
  text = 'Цей користувач ще не публікував історій',
  buttonText = 'До історій',
  route = '/stories',
  onClick,
}: MessageNoStoriesProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    // Стандартна навігація
    router.push(route);
  };

  return (
    <div>
      <p>{text}</p>
      <button type="button" onClick={handleClick}>
        {buttonText}
      </button>
    </div>
  );
};

export default MessageNoStories;
