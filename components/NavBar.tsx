import { siteConfig } from "@/config/site";
import { Link } from "@heroui/link";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@heroui/navbar";
export default function NavBar() {
  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">KOVA</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {siteConfig.navItems.map((n, i) => {
        return <NavbarItem key={`navItem${i}`}>
          <Link color="foreground" href={n.href}>
            {n.label}
          </Link>
        </NavbarItem>
        })}
      </NavbarContent>
    </Navbar>
  );
}