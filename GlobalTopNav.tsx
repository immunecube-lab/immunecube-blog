'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';

type NavItem = { href: string; label: string };

const NAV: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/docs', label: 'Docs' },
];

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ');
}

function Breadcrumbs({ pathname }: { pathname: string }) {
  const crumbs = useMemo(() => {
    const clean = pathname.split('?')[0].split('#')[0];
    const parts = clean.split('/').filter(Boolean);

    if (parts.length === 0) return [];

    const prettify = (s: string) =>
      decodeURIComponent(s)
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());

    const result: Array<{ href: string; label: string }> = [];
    let acc = '';
    for (const p of parts) {
      acc += `/${p}`;
      result.push({ href: acc, label: prettify(p) });
    }
    return result;
  }, [pathname]);

  if (crumbs.length === 0) return null;

  return (
    <div className="hidden md:flex items-center gap-2 text-xs text-foreground/60">
      <span className="select-none">/</span>
      {crumbs.map((c, idx) => (
        <div key={c.href} className="flex items-center gap-2">
          <Link href={c.href} className="hover:text-foreground/90 transition">
            {c.label}
          </Link>
          {idx < crumbs.length - 1 && <span className="select-none">/</span>}
        </div>
      ))}
    </div>
  );
}

export function GlobalTopNav() {
  const pathname = usePathname() || '/';
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="border-b bg-background">
      <div className="mx-auto max-w-5xl px-4 py-2">
        <div className="flex items-center justify-between gap-3">
          {/* 왼쪽: 로고/사이트명 + 기본 네비 */}
          <div className="flex items-center gap-3">
            <Link href="/" className="font-semibold tracking-tight">
              생활면역
            </Link>

            <nav className="hidden md:flex items-center gap-2">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cx(
                    'rounded-lg px-3 py-1.5 text-sm transition',
                    isActive(item.href)
                      ? 'bg-foreground text-background'
                      : 'text-foreground/80 hover:bg-muted'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Breadcrumbs (데스크탑에서만) */}
            <Breadcrumbs pathname={pathname} />
          </div>

          {/* 오른쪽: 모바일 메뉴만 남김 */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="md:hidden inline-flex items-center rounded-lg border px-3 py-1.5 text-sm hover:bg-muted transition"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="Open menu"
            >
              Menu
            </button>
          </div>
        </div>

        {/* 모바일 드롭다운 */}
        {open && (
          <div className="md:hidden mt-3 flex flex-col gap-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cx(
                  'rounded-lg px-3 py-2 text-sm transition',
                  isActive(item.href)
                    ? 'bg-foreground text-background'
                    : 'text-foreground/80 hover:bg-muted'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
