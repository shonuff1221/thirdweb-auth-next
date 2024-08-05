// app/layout.tsx

import { ReactNode } from "react";
import "./global.css";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <ul>
              <li>
                <a href="/contracts">Contracts</a>
              </li>
              <li>
                <a href="/transactions">Transactions</a>
              </li>
              <li>
                <a href="/user">User</a>
              </li>
            </ul>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
