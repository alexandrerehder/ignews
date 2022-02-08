import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { ReactElement, cloneElement } from "react";

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  activeClassName: string;
} 

export function ActiveLink({ children, activeClassName, ...rest}: ActiveLinkProps) {
  const { asPath } = useRouter()

  const className = asPath === rest.href ? activeClassName : '';

  return (
    //...rest Tudo que existe em ActiveLinkProps menos os parâmetros passados (children, activeClassName)
    <Link {...rest}> 
      {cloneElement(children, { // Ótimo para alterar o comportamento de componentes que recebemos com children
        className,
      })}
    </Link>
  )
}