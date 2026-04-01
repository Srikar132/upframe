"use client";

import Link from "next/link";
import { ReactNode, RefObject } from "react";

type Props = {
  children: ReactNode;
  onClick?: () => void;
  animationRef?: RefObject<any>;
  className?: string;
  href?: string; // 👈 NEW
};

const Button = ({
  children,
  onClick,
  animationRef,
  className = "",
  href,
}: Props) => {
  const commonProps = {
    onMouseEnter: () => animationRef?.current?.play(),
    onMouseLeave: () => animationRef?.current?.reverse(),
    className: `h-full group rounded-lg transition-transform duration-500 ease-out hover:scale-95 ${className}`,
  };

  const content = (
    <div className="flex h-full items-center gap-5 px-4 transition-transform duration-200 group-hover:scale-105">
      {children}
    </div>
  );

  // 👉 If href exists → Link
  if (href) {
    return (
      <Link href={href} {...commonProps}>
        {content}
      </Link>
    );
  }

  // 👉 Otherwise → Button
  return (
    <button onClick={onClick} {...commonProps}>
      {content}
    </button>
  );
};

export default Button;