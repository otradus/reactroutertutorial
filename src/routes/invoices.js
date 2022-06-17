import {
  useLocation,
  NavLink,
  Outlet,
  useSearchParams
} from "react-router-dom";
import { getInvoices } from "../data";

function QueryNavLink({ to, ...props }) {
  let location = useLocation();
  return <NavLink to={to + location.search} {...props} />;
}

export default function Invoices() {
  let invoices = getInvoices();
  let [searchParams, setSearchParams] = useSearchParams();

  return (
    <div style={{ display: "flex" }}>
      <nav style={{ borderRight: "solid 1px", padding: "1rem" }}>
        <input
          type="text"
          value={searchParams.get("filter") || ""}
          onChange={(e) => {
            let filter = e.target.value;
            if (filter) {
              setSearchParams({ filter });
            } else {
              setSearchParams({});
            }
          }}
        />
        {invoices
          .filter((invoice) => {
            let filter = searchParams.get("filter");
            if (!filter) return true;
            let name = invoice.name.toLowerCase();
            return name.startsWith(filter.toLowerCase());
          })
          .map((x) => (
            <QueryNavLink
              style={({ isActive }) => {
                return {
                  display: "block",
                  margin: "1rem 0",
                  color: isActive ? "pink" : ""
                };
              }}
              className={({ isActive }) => (isActive ? "aktif" : "")}
              to={`/invoices/${x.number}`}
              key={x.number}
            >
              {x.name}
            </QueryNavLink>
          ))}
      </nav>
      <Outlet />
    </div>
  );
}
