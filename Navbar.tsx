import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link href="./index">Home</Link></li>
        <li><Link href="/products">Products</Link></li>
      </ul>
    </nav>
  );
}
