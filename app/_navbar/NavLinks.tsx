import classnames from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'


const NavLinks = () => {
    const pathName = usePathname()

    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Bugs', href: '/bugs/list' }
    ]

    return (
        <ul className='flex space-x-6'>
            {links.map(link =>
                <li key={link.href}>
                    <Link
                        className={classnames({
                            "nav-link": true,
                            "!text-zinc-900": link.href === pathName,
                        })}
                        href={link.href}>
                        {link.label}
                    </Link>
                </li>
            )}

        </ul>
    )
}

export default NavLinks