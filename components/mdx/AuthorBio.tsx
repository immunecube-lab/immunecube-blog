import type { ReactNode } from "react";
import { getPerson } from "@/data/people";

type AuthorBioProps = {
  person?: string;
  name?: string;
  image?: string;
  years?: string;
  role?: string;
  roleItems?: readonly string[];
  summaryItems?: readonly string[];
  children?: ReactNode;
  imageAlt?: string;
};

export function AuthorBio({
  person,
  name,
  image,
  years,
  role,
  roleItems,
  summaryItems,
  children,
  imageAlt,
}: AuthorBioProps) {
  const stored = (person ? getPerson(person) : undefined) as
    | {
        name?: string;
        image?: string;
        years?: string;
        role?: string;
        roleItems?: readonly string[];
        summaryItems?: readonly string[];
      }
    | undefined;
  const displayName = name ?? stored?.name ?? person ?? "";
  const displayImage = image ?? stored?.image ?? "";
  const displayYears = years ?? stored?.years;
  const displayRole = role ?? stored?.role;
  const displayRoleItems = roleItems ?? stored?.roleItems;
  const displaySummaryItems = summaryItems ?? stored?.summaryItems;

  if (!displayName || !displayImage) {
    return null;
  }

  return (
    <aside
      data-author-bio="true"
      aria-label={`${displayName} author bio`}
      className="not-prose"
    >
      <style>{`
        aside[data-author-bio="true"] {
          margin: 2.25rem 0;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          background: #ffffff;
          padding: 1rem;
        }

        aside[data-author-bio="true"] .author-bio-inner {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        aside[data-author-bio="true"] .author-bio-image {
          width: min(25rem, 100%);
          aspect-ratio: 1 / 1;
          flex: 0 0 auto;
          overflow: hidden;
          border-radius: 8px;
          background: #f3f4f6;
        }

        aside[data-author-bio="true"] img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        aside[data-author-bio="true"] .author-bio-name {
          margin: 0;
          font-size: 1.05rem;
          font-weight: 700;
          line-height: 1.35;
          color: #111827;
        }

        aside[data-author-bio="true"] .author-bio-role {
          margin: 0.25rem 0 0;
          font-size: 0.9rem;
          line-height: 1.55;
          color: #4b5563;
        }

        aside[data-author-bio="true"] .author-bio-years {
          margin: 0.15rem 0 0;
          font-size: 0.86rem;
          line-height: 1.45;
          color: #6b7280;
        }

        aside[data-author-bio="true"] .author-bio-role-list {
          margin: 0.55rem 0 0;
          padding-left: 1.15rem;
          list-style: disc;
          font-size: 0.9rem;
          line-height: 1.55;
          color: #4b5563;
        }

        aside[data-author-bio="true"] .author-bio-role-list li {
          margin: 0.18rem 0;
          display: list-item;
        }

        aside[data-author-bio="true"] .author-bio-body {
          margin-top: 1.15rem;
          font-size: 0.92rem;
          line-height: 1.75;
          color: #374151;
        }

        aside[data-author-bio="true"] .author-bio-body.with-divider {
          border-top: 1px solid #e5e7eb;
          padding-top: 1rem;
        }

        aside[data-author-bio="true"] .author-bio-body > :first-child {
          margin-top: 0;
        }

        aside[data-author-bio="true"] .author-bio-body > :last-child {
          margin-bottom: 0;
        }

        aside[data-author-bio="true"] .author-bio-body ul {
          margin: 0.7rem 0 0;
          padding-left: 1.15rem;
          list-style: disc;
        }

        aside[data-author-bio="true"] .author-bio-body li {
          margin: 0.25rem 0;
          padding-left: 0.1rem;
          display: list-item;
        }

        @media (min-width: 640px) {
          aside[data-author-bio="true"] {
            padding: 1.15rem;
          }

          aside[data-author-bio="true"] .author-bio-inner {
            flex-direction: row;
            align-items: flex-start;
          }

          aside[data-author-bio="true"] .author-bio-image {
            width: 25rem;
          }
        }
      `}</style>

      <div className="author-bio-inner">
        <div className="author-bio-image">
          <img src={displayImage} alt={imageAlt ?? displayName} loading="lazy" />
        </div>

        <div>
          <h3 className="author-bio-name">{displayName}</h3>
          {displayYears && <p className="author-bio-years">{displayYears}</p>}
          {displayRoleItems && displayRoleItems.length > 0 ? (
            <ul className="author-bio-role-list">
              {displayRoleItems.map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            displayRole && <p className="author-bio-role">{displayRole}</p>
          )}
          {(children || (displaySummaryItems && displaySummaryItems.length > 0)) && (
            <div
              className={
                displayRoleItems && displayRoleItems.length > 0
                  ? "author-bio-body with-divider"
                  : "author-bio-body"
              }
            >
              {children ?? (
                <ul>
                  {displaySummaryItems?.map((item: string) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

export default AuthorBio;
