import Link from "next/link";
import { cn } from "@/lib/utils";

type BaseProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost" | "danger";
};

type ButtonAsButton = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

type ButtonAsLink = BaseProps & {
  href: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variants = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 shadow-[0_16px_30px_-16px_rgba(37,99,235,0.8)]",
  secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
  ghost: "bg-white/60 text-slate-700 hover:bg-white",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

const baseClass =
  "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold";

export function Button(props: ButtonProps) {
  const className = cn(baseClass, variants[props.variant || "primary"], props.className);

  if ("href" in props && props.href) {
    const { href, children, variant, className: _, ...rest } = props as ButtonAsLink;
    return (
      <Link href={href} className={className} {...rest}>
        {children}
      </Link>
    );
  }

  const { children, variant, className: _, ...rest } = props as ButtonAsButton;
  return (
    <button className={className} {...rest}>
      {children}
    </button>
  );
}
